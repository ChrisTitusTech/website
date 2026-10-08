import { afterEach, describe, expect, it, vi } from "vitest";
import {
  mkdtemp,
  mkdir,
  readFile,
  writeFile,
  rm,
  symlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import policyFile from "../../data/content-refresh-policy.json";
import { main } from "../../scripts/content-refresh.mjs";
import {
  hash,
  publicUrl,
  safePath,
  validatePolicy,
  withLock,
} from "../../scripts/content-refresh/common.mjs";
import {
  inventory,
  extractLinks,
} from "../../scripts/content-refresh/inventory.mjs";
import {
  normalizeEvidence,
  evidenceFresh,
  firecrawlClient,
} from "../../scripts/content-refresh/evidence.mjs";
import {
  validateFindings,
  modelFindings,
} from "../../scripts/content-refresh/findings.mjs";
import {
  createPatches,
  approve,
  applyPatches,
} from "../../scripts/content-refresh/patches.mjs";
import {
  startRun,
  scan,
  propose,
  report,
  runPath,
  recordHistory,
} from "../../scripts/content-refresh/runner.mjs";

const roots: string[] = [];
const policy = {
  ...policyFile,
  domains: ["docs.example.com"],
  historical: [],
  reportOnly: [],
};
const sourceUrl = "https://docs.example.com/guide";
const source =
  '---\ntitle: "Guide"\ndate: 2020-01-01\nurl: /guide/\ncategories: [Linux]\ntables: { sample: [[A], [B]] }\n---\nOld guidance.\n<!--more-->\n\n```sh\nold-command\n```\n';
const file = "src/content/posts/2020/guide.md";
const payload = {
  markdown: "Official replacement guidance.",
  metadata: { statusCode: 200, url: sourceUrl },
};
const now = () => new Date().toISOString();
const capture = (url = sourceUrl) => ({
  provider: "firecrawl",
  url,
  retrievedAt: now(),
  options: { maxAge: 0, onlyMainContent: true },
  data: { ...payload, metadata: { statusCode: 200, url } },
});

async function fixture() {
  const root = await mkdtemp(path.join(tmpdir(), "refresh-test-"));
  roots.push(root);
  await mkdir(path.join(root, "src/content/posts/2020"), { recursive: true });
  await mkdir(path.join(root, "public"));
  await writeFile(path.join(root, "public/_redirects"), "");
  await writeFile(path.join(root, file), source);
  execFileSync("git", ["init", "-q"], { cwd: root });
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.com",
      "commit",
      "-qm",
      "fixture",
    ],
    { cwd: root },
  );
  const run = await startRun(root, "test", policy, [
    { url: "/guide/", sources: [sourceUrl] },
  ]);
  await scan(root, run, policy, { captures: [capture()] });
  return { root, run };
}

function finding(run: any, overrides = {}) {
  return {
    url: "/guide/",
    section: "Introduction",
    classification: "confirmed-outdated",
    kind: "prose",
    original: "Old guidance.",
    replacement: "Corrected guidance.",
    reason: "Upstream documents the replacement.",
    context: "The current platform.",
    evidence: [
      {
        id: run.documents[0].evidenceIds[0],
        excerpt: "Official replacement guidance.",
      },
    ],
    ...overrides,
  };
}
async function proposed() {
  const data = await fixture();
  await propose(data.root, data.run, policy, { findings: [finding(data.run)] });
  return data;
}
afterEach(async () => {
  for (const root of roots.splice(0))
    await rm(root, { recursive: true, force: true });
});

describe("production inventory", () => {
  it("excludes drafts, future, render-never, and generated routes under one Chicago instant", async () => {
    const { root } = await fixture();
    for (const [name, meta] of [
      ["draft", "draft: true"],
      ["future", "date: 2099-01-01"],
      ["never", "build: { render: never }"],
      ["today", "date: 2026-10-07"],
      ["tomorrow", "date: 2026-10-08"],
    ]) {
      await writeFile(
        path.join(root, `src/content/${name}.md`),
        `---\ntitle: ${name}\n${meta}\n---\nText\n`,
      );
    }
    await writeFile(
      path.join(root, "src/content/search.md"),
      "---\ntitle: Search\n---\n",
    );
    const result = await inventory(
      root,
      policy,
      new Date("2026-10-08T02:00:00Z"),
    );
    expect(result.documents.map((d) => d.url).sort()).toEqual([
      "/guide/",
      "/today/",
    ]);
    expect(result.excluded.map((d) => d.reason).sort()).toEqual([
      "draft",
      "future",
      "future",
      "generated-route",
      "render-never",
    ]);
  });
  it("rejects offsetless dates and duplicate canonical ownership", async () => {
    const { root } = await fixture();
    await writeFile(
      path.join(root, "src/content/bad.md"),
      "---\ntitle: Bad\ndate: 2026-01-01T00:00:00\n---\n",
    );
    await expect(inventory(root, policy)).rejects.toThrow("offset");
    await writeFile(
      path.join(root, "src/content/bad.md"),
      "---\ntitle: Duplicate\nurl: /guide/\n---\n",
    );
    await expect(inventory(root, policy)).rejects.toThrow("Ambiguous");
  });
  it("includes image destinations for validation but never extracts code examples", () => {
    expect(
      extractLinks(
        "[docs](https://docs.example.com/guide)\n```sh\ncurl https://evil.test/\n```\n![image](https://evil.test/i.png)",
      ),
    ).toEqual([sourceUrl, "https://evil.test/i.png"]);
  });
  it("invalidates check history after a content edit", async () => {
    const { root } = await fixture();
    const history = {
      "/guide/": { contentHash: hash(source), checkedAt: now() },
    };
    expect(
      (await inventory(root, policy, new Date(), history)).documents[0].due,
    ).toBe(false);
    await writeFile(path.join(root, file), source + "Edited\n");
    expect(
      (await inventory(root, policy, new Date(), history)).documents[0].due,
    ).toBe(true);
  });
});

describe("network and evidence boundaries", () => {
  it.each([undefined, null, "not-a-date", "2026-10-07"])(
    "does not assign a new timestamp to an import with %s",
    async (retrievedAt) => {
      const { root } = await fixture();
      const run = await startRun(root, "bad-time", policy, [
        { url: "/guide/", sources: [sourceUrl] },
      ]);
      await scan(root, run, policy, {
        captures: [{ ...capture(), retrievedAt }],
      });
      expect(run.status).toBe("partial");
      expect(run.evidence[hash(sourceUrl).slice(0, 16)].outcome).toBe(
        "unverifiable",
      );
    },
  );
  it.each([
    "file:///etc/passwd",
    "http://127.0.0.1/",
    "https://[::1]/",
    "https://docs.example.com.evil.test/",
    "https://user:secret@docs.example.com/",
    "https://docs.example.com/?token=secret",
    "https://docs.example.com:8443/",
  ])("rejects %s", (url) =>
    expect(() => publicUrl(url, policy.domains)).toThrow(),
  );
  it("rejects unapproved redirect destinations", () =>
    expect(() =>
      normalizeEvidence(
        sourceUrl,
        {
          ...payload,
          metadata: { statusCode: 200, url: "https://evil.test/" },
        },
        policy,
      ),
    ).toThrow());
  it.each([401, 403, 404, 410, 429, 500])(
    "keeps HTTP %s unverifiable",
    (status) =>
      expect(
        normalizeEvidence(
          sourceUrl,
          { ...payload, metadata: { statusCode: status, url: sourceUrl } },
          policy,
        ).outcome,
      ).toBe("unverifiable"),
  );
  it("rejects empty, challenged, missing-status, stale and warned evidence", () => {
    for (const p of [
      { markdown: "", metadata: payload.metadata },
      { markdown: "Sign in to continue", metadata: payload.metadata },
      { markdown: "Content" },
    ])
      expect(normalizeEvidence(sourceUrl, p, policy).outcome).toBe(
        "unverifiable",
      );
    expect(
      evidenceFresh(
        normalizeEvidence(sourceUrl, payload, policy, "2020-01-01T00:00:00Z"),
        policy,
      ),
    ).toBe(false);
    expect(
      evidenceFresh(
        normalizeEvidence(
          sourceUrl,
          { ...payload, warning: "lookup failed" },
          policy,
        ),
        policy,
      ),
    ).toBe(false);
  });
  it("retries transient failures within a persisted request budget and never prints secrets", async () => {
    let calls = 0,
      reserved = 0;
    const client = firecrawlClient({
      key: "test-secret",
      policy,
      reserve: async () => {
        reserved++;
      },
      sleep: async () => {},
      fetchImpl: async () => {
        calls++;
        return calls < 3
          ? new Response("", { status: 429 })
          : Response.json({ success: true, data: payload });
      },
    });
    expect((await client.scrape(sourceUrl)).outcome).toBe("retrieved");
    expect(calls).toBe(3);
    expect(reserved).toBe(3);
    const bad = firecrawlClient({
      key: "test-secret",
      policy,
      reserve: async () => {},
      sleep: async () => {},
      fetchImpl: async () => {
        throw new Error("test-secret");
      },
    });
    await expect(bad.scrape(sourceUrl)).rejects.toThrow(
      "Firecrawl request failed or timed out",
    );
  });
  it("does not make a network call after budget exhaustion", async () => {
    let called = false;
    const client = firecrawlClient({
      key: "test",
      policy,
      reserve: async () => {
        throw new Error("budget");
      },
      fetchImpl: async () => {
        called = true;
        return Response.json(payload);
      },
    });
    await expect(client.scrape(sourceUrl)).rejects.toThrow("budget");
    expect(called).toBe(false);
  });
  it("filters search results and does not treat snippets as verified content", async () => {
    const client = firecrawlClient({
      key: "test",
      policy,
      reserve: async () => {},
      fetchImpl: async () =>
        Response.json({
          data: {
            web: [
              { url: sourceUrl, title: "Docs" },
              { url: "https://evil.test/", title: "Bad" },
            ],
          },
        }),
    });
    expect(await client.search("guide")).toEqual([
      { url: sourceUrl, title: "Docs" },
    ]);
  });
  it("deduplicates and resumes captures without consuming the budget again", async () => {
    const { root, run } = await fixture();
    const count = run.requests;
    await scan(root, run, policy, { captures: [capture()] });
    expect(run.requests).toBe(count);
    expect(run.documents[0].evidenceIds).toHaveLength(1);
  });
  it("records partial sources and does not label a partial scan collected", async () => {
    const { root } = await fixture();
    const run = await startRun(root, "partial", policy, [
      {
        url: "/guide/",
        sources: [sourceUrl, "https://docs.example.com/missing"],
      },
    ]);
    await scan(root, run, policy, { captures: [capture()] });
    expect(run.status).toBe("partial");
    expect(report(run, policy)).toContain("incomplete");
  });
  it("stops at the processing budget with unprocessed sources visible", async () => {
    const { root } = await fixture();
    const limited = { ...policy, maxRequests: 1 };
    const run = await startRun(root, "bounded", limited, [
      { url: "/guide/", sources: [sourceUrl] },
    ]);
    run.requests = 1;
    await scan(root, run, limited, { captures: [capture()] });
    expect(run.status).toBe("budget-limited");
    expect(run.documents[0].status).toBe("pending");
  });
});

describe("claim comparison", () => {
  it("creates a CLI report and patches when report-only and editable findings are mixed", async () => {
    const { root, run } = await fixture();
    await mkdir(path.join(root, "data"));
    await writeFile(
      path.join(root, "data/content-refresh-policy.json"),
      JSON.stringify(policy),
    );
    const reportOnly = finding(run, {
      section: "A different confirmed claim",
      kind: "none",
      original: "",
      replacement: "",
      reason: "Known outdated claim, but no safe replacement yet.",
    });
    await writeFile(
      path.join(root, "findings.json"),
      JSON.stringify({ findings: [finding(run), reportOnly] }),
    );
    await main(
      ["propose", "--run", "test", "--findings", "findings.json"],
      root,
    );
    const patches = JSON.parse(
      await readFile(
        path.join(root, ".content-refresh/runs/test.patches.json"),
        "utf8",
      ),
    );
    expect(patches).toHaveLength(1);
    expect(
      await readFile(path.join(root, ".content-refresh/runs/test.md"), "utf8"),
    ).toContain("Known outdated claim");
    expect(() =>
      validateFindings(
        { findings: [{ ...reportOnly, evidence: [] }] },
        run,
        policy,
      ),
    ).toThrow("requires evidence");
  });
  it("requires exact evidence, context, known fields, and selected articles", async () => {
    const { run } = await fixture();
    for (const update of [
      { evidence: [] },
      { evidence: [{ id: "fabricated", excerpt: "x" }] },
      { context: "" },
      { url: "/other/" },
      { extra: true },
      {
        evidence: [
          { id: run.documents[0].evidenceIds[0], excerpt: "Fabricated claim" },
        ],
      },
    ])
      expect(() =>
        validateFindings({ findings: [finding(run, update)] }, run, policy),
      ).toThrow();
  });
  it("preserves historical guidance and rejects patches from uncertain claims", async () => {
    const { run } = await fixture();
    run.documents[0].policy = "historical";
    expect(() =>
      validateFindings({ findings: [finding(run)] }, run, policy),
    ).toThrow("Historical");
    expect(() =>
      validateFindings(
        { findings: [finding(run, { classification: "needs-review" })] },
        run,
        policy,
      ),
    ).toThrow();
    expect(
      validateFindings(
        {
          findings: [
            finding(run, {
              classification: "historical",
              kind: "none",
              original: "",
              replacement: "",
            }),
          ],
        },
        run,
        policy,
      ),
    ).toHaveLength(1);
  });
  it("keeps changed navigation or old dates from becoming automatic corrections", async () => {
    const { root, run } = await fixture();
    await propose(root, run, policy, {
      findings: [
        finding(run, {
          classification: "current",
          kind: "none",
          original: "",
          replacement: "",
          reason: "Only navigation changed; the claim is still supported.",
        }),
      ],
    });
    await expect(createPatches(root, run, policy)).rejects.toThrow("Select");
  });
  it("requires a disposition for every selected article", async () => {
    const { root, run } = await fixture();
    await expect(propose(root, run, policy, { findings: [] })).rejects.toThrow(
      "Every selected",
    );
  });
  it("uses schema-constrained model output without tools, retaining no API response state", async () => {
    const { run } = await fixture();
    let body: any;
    const input = { findings: [finding(run)] };
    const result = await modelFindings(run, policy, {
      model: "operator-selected-model",
      key: "test",
      reserve: async () => {},
      fetchImpl: async (_url, options) => {
        body = JSON.parse(options.body);
        return Response.json({
          status: "completed",
          output: [
            { content: [{ type: "output_text", text: JSON.stringify(input) }] },
          ],
        });
      },
    });
    expect(result).toEqual(input);
    expect(body.store).toBe(false);
    expect(body.tools).toBeUndefined();
    expect(body.text.format.strict).toBe(true);
    await expect(
      modelFindings(run, policy, {
        model: "test",
        key: "test",
        reserve: async () => {},
        fetchImpl: async () => Response.json({ status: "incomplete" }),
      }),
    ).rejects.toThrow("incomplete");
  });
});

describe("patch approval and recovery", () => {
  it.each([
    "//unapproved.example/download",
    "HTTPS://unapproved.example/download",
    "//docs.example.com/unverified",
    "javascript:alert(1)",
    "data:text/html,unsafe",
    "ftp://unapproved.example/download",
    "https:unapproved.example/download",
  ])("validates external replacement destination %s", async (url) => {
    const { root, run } = await fixture();
    run.findings = validateFindings(
      { findings: [finding(run, { replacement: `[Download](${url})` })] },
      run,
      policy,
    );
    await expect(createPatches(root, run, policy)).rejects.toThrow();
  });
  it("rejects unverified image destinations", async () => {
    const { root, run } = await fixture();
    run.findings = validateFindings(
      {
        findings: [
          finding(run, {
            replacement: "![Image](https://unapproved.example/tracker.png)",
          }),
        ],
      },
      run,
      policy,
    );
    await expect(createPatches(root, run, policy)).rejects.toThrow();
  });
  it("normalizes approved protocol-relative links before evidence matching", async () => {
    const { root, run } = await fixture();
    run.findings = validateFindings(
      {
        findings: [
          finding(run, { replacement: "[Guide](//docs.example.com/guide)" }),
        ],
      },
      run,
      policy,
    );
    expect(await createPatches(root, run, policy)).toHaveLength(1);
  });
  it("cannot disguise a historical rewrite as a link edit or hide a code edit beside a command", async () => {
    const { root, run } = await fixture();
    run.documents[0].policy = "historical";
    run.findings = validateFindings(
      { findings: [finding(run, { kind: "link" })] },
      run,
      policy,
    );
    await expect(createPatches(root, run, policy)).rejects.toThrow(
      "only a URL",
    );
    run.documents[0].policy = "editable";
    run.findings = validateFindings(
      {
        findings: [
          finding(run, { kind: "command" }),
          finding(run, {
            original: "old-command",
            replacement: "unsafe-command",
          }),
        ],
      },
      run,
      policy,
    );
    await expect(createPatches(root, run, policy)).rejects.toThrow(
      "Each code block",
    );
  });
  it("does not refresh evidence behind reviewed findings", async () => {
    const { root, run } = await proposed();
    await expect(
      scan(root, run, policy, { captures: [capture()] }),
    ).rejects.toThrow("immutable");
  });
  it("applies only approved body bytes, defaults to dry-run, and is idempotent", async () => {
    const { root, run } = await proposed();
    const patches = await createPatches(root, run, policy);
    const approval = approve(run, patches, { reviewer: "Test" });
    expect((await applyPatches(root, run, policy, approval)).status).toBe(
      "dry-run",
    );
    expect(await readFile(path.join(root, file), "utf8")).toBe(source);
    expect((await applyPatches(root, run, policy, approval, true)).status).toBe(
      "applied",
    );
    expect(await readFile(path.join(root, file), "utf8")).toBe(
      source.replace("Old guidance.", "Corrected guidance."),
    );
    expect((await applyPatches(root, run, policy, approval, true)).status).toBe(
      "already-applied",
    );
  });
  it("rejects stale source hashes instead of overwriting", async () => {
    const { root, run } = await proposed();
    const approval = approve(run, await createPatches(root, run, policy), {
      reviewer: "Test",
    });
    await writeFile(path.join(root, file), source + "User edit\n");
    await expect(
      applyPatches(root, run, policy, approval, true),
    ).rejects.toThrow("changed since scan");
    expect(await readFile(path.join(root, file), "utf8")).toContain(
      "User edit",
    );
  });
  it("invalidates approvals when findings, policy, or patch digests change", async () => {
    const { root, run } = await proposed();
    const approval = approve(run, await createPatches(root, run, policy), {
      reviewer: "Test",
    });
    await expect(
      applyPatches(root, run, { ...policy, recheckDays: 5 }, approval, true),
    ).rejects.toThrow("Approval");
    approval.patches[0].digest = "tampered";
    await expect(
      applyPatches(root, run, policy, approval, true),
    ).rejects.toThrow("Approved patch changed");
    run.findings[0].replacement = "Different";
    await expect(
      applyPatches(root, run, policy, approval, true),
    ).rejects.toThrow("Approval");
  });
  it("rejects front matter, duplicated text, raw HTML, markers, shortcodes, and implicit code changes", async () => {
    const { root, run } = await fixture();
    for (const update of [
      { original: 'title: "Guide"', replacement: 'title: "Changed"' },
      { original: "<!--more-->", replacement: "Gone" },
      { replacement: "<script>alert(1)</script>" },
      { original: "old-command", replacement: "new-command" },
    ]) {
      run.findings = validateFindings(
        { findings: [finding(run, update)] },
        run,
        policy,
      );
      await expect(createPatches(root, run, policy)).rejects.toThrow();
    }
  });
  it("requires separate sensitive approval for command edits", async () => {
    const { root, run } = await fixture();
    await propose(root, run, policy, {
      findings: [
        finding(run, {
          kind: "command",
          original: "old-command",
          replacement: "new-command",
        }),
      ],
    });
    const patches = await createPatches(root, run, policy);
    expect(() => approve(run, patches, { reviewer: "Test" })).toThrow(
      "Sensitive",
    );
    expect(
      approve(run, patches, { reviewer: "Test", allowSensitive: true }).patches,
    ).toHaveLength(1);
  });
  it("requires fresh validated destinations for new external links", async () => {
    const { root, run } = await fixture();
    run.findings = validateFindings(
      {
        findings: [
          finding(run, {
            replacement: "[New](https://docs.example.com/unverified)",
          }),
        ],
      },
      run,
      policy,
    );
    await expect(createPatches(root, run, policy)).rejects.toThrow(
      "Replacement link",
    );
  });
  it("applies non-overlapping offsets without cascading replacements", async () => {
    const { root, run } = await fixture();
    const f1 = finding(run, { replacement: "old-command" });
    const f2 = finding(run, {
      kind: "command",
      original: "old-command",
      replacement: "new-command",
    });
    await propose(root, run, policy, { findings: [f1, f2] });
    const patches = await createPatches(root, run, policy);
    expect(patches[0].after).toContain("---\nold-command\n<!--more-->");
    expect(patches[0].after).toContain("```sh\nnew-command\n```");
  });
  it("escapes hostile report text", async () => {
    const { run } = await fixture();
    run.findings = [
      {
        ...finding(run),
        id: "id",
        evidence: [],
        reason: "<script>bad</script> [click](javascript:bad)",
      },
    ];
    expect(report(run, policy)).not.toContain("<script>");
    expect(report(run, policy)).not.toContain("[click]");
  });
  it("rejects traversal, symlink paths, invalid run IDs, and concurrent processes", async () => {
    const { root } = await fixture();
    await expect(safePath(root, "../secret")).rejects.toThrow();
    await symlink("/tmp", path.join(root, "linked"));
    await expect(safePath(root, "linked/file")).rejects.toThrow("Symlink");
    expect(() => runPath("../bad")).toThrow();
    expect(() => validatePolicy({ ...policy, maxRequests: -1 })).toThrow();
    await withLock(root, async () => {
      await expect(withLock(root, async () => {})).rejects.toThrow("locked");
    });
  });
});

describe("review regressions", () => {
  it.each([
    `[Docs](${sourceUrl}#unverified)`,
    `![Diagram](${sourceUrl}#unverified)`,
    "[Docs](//docs.example.com/guide#unverified)",
    `Run \`curl ${sourceUrl}#unverified\`.`,
  ])("rejects unverified external fragments: %s", async (replacement) => {
    const { root, run } = await fixture();
    await propose(root, run, policy, {
      findings: [finding(run, { replacement })],
    });
    await expect(createPatches(root, run, policy)).rejects.toThrow(
      "external fragments require manual validation",
    );
  });
  it("rejects a fragment introduced into an existing command URL", async () => {
    const { root } = await fixture();
    await writeFile(
      path.join(root, file),
      source.replace("old-command", `curl ${sourceUrl}`),
    );
    const run = await startRun(root, "command-fragment", policy, [
      { url: "/guide/", sources: [sourceUrl] },
    ]);
    await scan(root, run, policy, { captures: [capture()] });
    await propose(root, run, policy, {
      findings: [
        finding(run, {
          kind: "command",
          original: sourceUrl,
          replacement: `${sourceUrl}#unverified`,
        }),
      ],
    });
    await expect(createPatches(root, run, policy)).rejects.toThrow(
      "external fragments require manual validation",
    );
  });
  it.each(["missing", "malformed", "stale", "failed", "warning"])(
    "charges %s imports before stopping at the processing budget",
    async (failure) => {
      const { root } = await fixture();
      await writeFile(
        path.join(root, "src/content/posts/2020/second.md"),
        source.replace("url: /guide/", "url: /second/"),
      );
      const limited = { ...policy, maxRequests: 1 };
      const run = await startRun(root, "failed-import-budget", limited, [
        { url: "/guide/", sources: [sourceUrl] },
        { url: "/second/", sources: ["https://docs.example.com/second"] },
      ]);
      const captures = {
        missing: [],
        malformed: [null, { url: sourceUrl }],
        stale: [{ ...capture(), retrievedAt: "2020-01-01T00:00:00Z" }],
        failed: [
          {
            ...capture(),
            data: {
              ...payload,
              metadata: { ...payload.metadata, statusCode: 500 },
            },
          },
        ],
        warning: [
          { ...capture(), data: { ...payload, warning: "Incomplete scrape" } },
        ],
      }[failure];
      await scan(root, run, limited, { captures });
      expect(run.requests).toBe(1);
      expect(run.status).toBe("budget-limited");
      expect(run.documents[0].status).toBe("unverifiable");
      expect(run.documents[1].status).toBe("pending");
      expect(run.documents[1].evidenceIds).toEqual([]);
      expect(Object.keys(run.evidence)).toHaveLength(1);
      expect(
        JSON.parse(await readFile(path.join(root, runPath(run.id)), "utf8"))
          .requests,
      ).toBe(1);
      await scan(root, run, limited, { captures: [capture()] });
      expect(run.requests).toBe(1);
      expect(run.status).toBe("budget-limited");
      expect(Object.values(run.evidence)[0].outcome).toBe("unverifiable");
    },
  );
  it("requires HTTPS for requested and final evidence URLs", () => {
    expect(() =>
      publicUrl("http://docs.example.com/guide", policy.domains),
    ).toThrow("outside the approved");
    expect(() =>
      normalizeEvidence(
        sourceUrl,
        {
          ...payload,
          metadata: { statusCode: 200, url: "http://docs.example.com/guide" },
        },
        policy,
      ),
    ).toThrow("outside the approved");
    const valid = normalizeEvidence(sourceUrl, payload, policy);
    expect(evidenceFresh(valid, policy)).toBe(true);
    for (const field of ["url", "finalUrl"]) {
      expect(
        evidenceFresh(
          { ...valid, [field]: "http://docs.example.com/guide" },
          policy,
        ),
      ).toBe(false);
    }
  });
  it.each([
    "[Missing](/missing/)",
    "![Missing](/missing.png)",
    "[Missing](missing/)",
    "[Draft](/draft-only/)",
    "[Future](/future-only/)",
    "[Search](/search/)",
    "[Config](/_headers)",
    "[Config](/_redirects)",
    "[Anchor](/guide/#unverified)",
  ])(
    "rejects a new unavailable internal destination: %s",
    async (replacement) => {
      const { root, run } = await fixture();
      await writeFile(
        path.join(root, "src/content/search.md"),
        "---\ntitle: Search\nlayout: search\ndraft: false\n---\n",
      );
      await writeFile(
        path.join(root, "src/content/posts/2020/draft.md"),
        source.replace("url: /guide/", "url: /draft-only/\ndraft: true"),
      );
      await writeFile(
        path.join(root, "src/content/posts/2020/future.md"),
        source
          .replace("url: /guide/", "url: /future-only/")
          .replace("2020-01-01", "2099-01-01"),
      );
      await propose(root, run, policy, {
        findings: [finding(run, { replacement })],
      });
      await expect(createPatches(root, run, policy)).rejects.toThrow(
        /internal (link|fragments)/,
      );
    },
  );
  it.each([
    "[Guide](/guide/)",
    "[Guide](../guide/)",
    "[Category](/categories/linux/)",
    "![Image](/images/exists.png)",
  ])("accepts a verified production destination: %s", async (replacement) => {
    const { root, run } = await fixture();
    await mkdir(path.join(root, "public/images"));
    await writeFile(path.join(root, "public/images/exists.png"), "fixture");
    await propose(root, run, policy, {
      findings: [finding(run, { replacement })],
    });
    expect((await createPatches(root, run, policy))[0].after).toContain(
      replacement,
    );
  });

  it.each([
    "/winget",
    "/setup-qemu-in-archlinux/",
    "/old/guide/",
    "/legacy/linux/guide/",
  ])("accepts a supported redirect destination: %s", async (destination) => {
    const { root, run } = await fixture();
    await writeFile(
      path.join(root, "public/_redirects"),
      "/winget https://github.com/ChrisTitusTech/winutil/releases/latest/download/winutil.ps1 302\n" +
        "/setup-qemu-in-archlinux/ /guide/ 301\n" +
        "/old/:slug/ /guide/ 301\n" +
        "/legacy/* /guide/ 301\n",
    );
    const replacement = `[Guide](${destination})`;
    await propose(root, run, policy, {
      findings: [finding(run, { replacement })],
    });
    expect((await createPatches(root, run, policy))[0].after).toContain(
      replacement,
    );
    for (const missing of [
      "/winget-other",
      "/old/one/two/",
      "/Legacy/guide/",
    ]) {
      await propose(root, run, policy, {
        findings: [finding(run, { replacement: `[Missing](${missing})` })],
      });
      await expect(createPatches(root, run, policy)).rejects.toThrow(
        "no production route",
      );
    }
  });

  it.each(["\n", "\r\n"])(
    "protects block and inline HTML source spans with %j line endings",
    async (eol) => {
      for (const fragment of [
        "<div>Archived HTML</div>",
        'Text <span title="a.b">inline</span> tail.',
        'Text <span\n title="a.b">inline</span> tail.',
      ]) {
        const { root } = await fixture();
        const text = source
          .replace(
            "Old guidance.",
            `Old guidance.\n\nBefore.\n\n${fragment}\n\nAfter.`,
          )
          .replace(/\n/g, eol);
        await writeFile(path.join(root, file), text);
        const run = await startRun(root, "html-spans", policy, [
          { url: "/guide/", sources: [sourceUrl] },
        ]);
        await scan(root, run, policy, { captures: [capture()] });
        const html = fragment.replace(/\n/g, eol);
        run.findings = validateFindings(
          {
            findings: [
              finding(run, {
                original: `Before.${eol}${eol}${html}`,
                replacement: `${html}${eol}${eol}Corrected.`,
              }),
            ],
          },
          run,
          policy,
        );
        await expect(createPatches(root, run, policy)).rejects.toThrow(
          "overlap raw HTML",
        );
        run.findings = validateFindings(
          { findings: [finding(run)] },
          run,
          policy,
        );
        const patches = await createPatches(root, run, policy);
        expect(patches[0].after).toContain(html);
        expect(patches[0].after).toContain("Corrected guidance.");
      }
    },
  );
  it("rejects forged no-op approval before any successful apply", async () => {
    const { root, run } = await proposed();
    const approval = approve(run, await createPatches(root, run, policy), {
      reviewer: "Test",
    });
    approval.patches[0].afterHash = hash(source);
    await expect(
      applyPatches(root, run, policy, approval, true),
    ).rejects.toThrow("verified prior apply receipt");
    expect(await readFile(path.join(root, file), "utf8")).toBe(source);
  });
  it.each(["digest", "findingIds"])(
    "verifies %s on repeated application",
    async (field) => {
      const { root, run } = await proposed();
      const approval = approve(run, await createPatches(root, run, policy), {
        reviewer: "Test",
      });
      await applyPatches(root, run, policy, approval, true);
      const altered = structuredClone(approval);
      if (field === "digest") altered.patches[0].digest = "forged";
      else altered.patches[0].findingIds = ["forged"];
      await expect(
        applyPatches(root, run, policy, altered, true),
      ).rejects.toThrow("prior apply receipt");
      expect((await applyPatches(root, run, policy, approval)).status).toBe(
        "already-applied",
      );
      expect(
        (await applyPatches(root, run, policy, approval, true)).status,
      ).toBe("already-applied");
    },
  );
  it("retries HTTP 408 search responses within the request budget", async () => {
    let requests = 0,
      calls = 0;
    const client = firecrawlClient({
      key: "fixture",
      policy,
      reserve: async () => {
        requests++;
      },
      sleep: async () => {},
      fetchImpl: async () =>
        ++calls === 1
          ? new Response("", { status: 408 })
          : Response.json({
              data: { web: [{ url: sourceUrl, title: "Docs" }] },
            }),
    });
    expect(await client.search("guide")).toEqual([
      { url: sourceUrl, title: "Docs" },
    ]);
    expect(requests).toBe(2);
    expect(calls).toBe(2);
  });
  it("bounds repeated HTTP 408 responses and stops retrying at budget exhaustion", async () => {
    for (const budget of [1, 10]) {
      let requests = 0,
        calls = 0;
      const client = firecrawlClient({
        key: "fixture",
        policy,
        reserve: async () => {
          if (requests >= budget) throw new Error("budget");
          requests++;
        },
        sleep: async () => {},
        fetchImpl: async () => {
          calls++;
          return new Response("", { status: 408 });
        },
      });
      await expect(client.search("guide")).rejects.toThrow(
        budget === 1 ? "budget" : "HTTP 408",
      );
      expect(calls).toBe(Math.min(budget, 3));
      expect(requests).toBe(calls);
    }
  });

  it.each([
    "CAPTCHA",
    "Access denied",
    "Sign in to continue",
    "Checking your browser",
  ])("rejects long HTTP 200 challenge evidence containing %s", (indicator) => {
    const evidence = normalizeEvidence(
      sourceUrl,
      {
        ...payload,
        markdown:
          "Interstitial boilerplate. ".repeat(100) + `\n\n# ${indicator}\n`,
      },
      policy,
    );
    expect(evidence.outcome).toBe("unverifiable");
    expect(evidenceFresh(evidence, policy)).toBe(false);
  });
  it.each([
    "# Connect to GitHub\n\nSign in to your GitHub account, then create a token.",
    '# Troubleshooting\n\nIf you see "Access denied", check the file permissions.',
    "# CAPTCHA integration\n\nThis guide explains how to configure CAPTCHA.",
    "# Authentication\n\nSelect Sign in to continue to your account settings.",
  ])(
    "accepts documentation with authentication terminology: %s",
    (markdown) => {
      const evidence = normalizeEvidence(
        sourceUrl,
        { ...payload, markdown },
        policy,
      );
      expect(evidence.outcome).toBe("retrieved");
      expect(evidenceFresh(evidence, policy)).toBe(true);
    },
  );
  it("rejects an interstitial identified by the page title", () => {
    expect(
      normalizeEvidence(
        sourceUrl,
        {
          ...payload,
          metadata: { ...payload.metadata, title: "Access denied" },
        },
        policy,
      ).outcome,
    ).toBe("unverifiable");
  });
  it.each([
    ["5", 5000],
    ["Thu, 08 Oct 2026 00:00:30 GMT", 30000],
    ["Wed, 07 Oct 2026 23:59:00 GMT", 1000],
    ["invalid", 1000],
    [null, 1000],
  ])("honors bounded Retry-After %s", async (retryAfter, expectedDelay) => {
    const clock = vi
      .spyOn(Date, "now")
      .mockReturnValue(Date.parse("2026-10-08T00:00:00Z"));
    try {
      const delays: number[] = [];
      let calls = 0,
        reserved = 0;
      const client = firecrawlClient({
        key: "fixture",
        policy,
        reserve: async () => {
          reserved++;
        },
        sleep: async (ms: number) => {
          delays.push(ms);
        },
        fetchImpl: async () =>
          ++calls === 1
            ? new Response("", {
                status: 429,
                headers:
                  retryAfter === null ? {} : { "Retry-After": retryAfter },
              })
            : Response.json({ success: true, data: payload }),
      });
      expect((await client.scrape(sourceUrl)).outcome).toBe("retrieved");
      expect(delays).toEqual([expectedDelay]);
      expect(calls).toBe(2);
      expect(reserved).toBe(2);
    } finally {
      clock.mockRestore();
    }
  });
  it.each(["61", "Thu, 08 Oct 2026 00:01:01 GMT"])(
    "stops before an excessive Retry-After %s",
    async (retryAfter) => {
      const clock = vi
        .spyOn(Date, "now")
        .mockReturnValue(Date.parse("2026-10-08T00:00:00Z"));
      try {
        let calls = 0,
          reserved = 0;
        const sleep = vi.fn(async () => {});
        const client = firecrawlClient({
          key: "fixture",
          policy,
          reserve: async () => {
            reserved++;
          },
          sleep,
          fetchImpl: async () => {
            calls++;
            return new Response("", {
              status: 503,
              headers: { "Retry-After": retryAfter },
            });
          },
        });
        await expect(client.scrape(sourceUrl)).rejects.toThrow("resume later");
        expect(calls).toBe(1);
        expect(reserved).toBe(1);
        expect(sleep).not.toHaveBeenCalled();
      } finally {
        clock.mockRestore();
      }
    },
  );
  it.each(["```sh\nold-command\n```", "    old-command"])(
    "rejects non-command code relocation and permits prose before %s",
    async (block) => {
      const { root } = await fixture();
      const text = source
        .replace("Old guidance.", "Introduction.")
        .replace("```sh\nold-command\n```", `Before.\n\n${block}\n\nAfter.`);
      await writeFile(path.join(root, file), text);
      const run = await startRun(root, "code-relocation", policy, [
        { url: "/guide/", sources: [sourceUrl] },
      ]);
      await scan(root, run, policy, { captures: [capture()] });
      for (const update of [
        {
          original: `Before.\n\n${block}`,
          replacement: `${block}\n\nCorrected.`,
        },
        {
          kind: "notice",
          original: `${block}\n\nAfter.`,
          replacement: `2026-10-07: Update.\n\n${block}\n\nAfter.`,
        },
      ]) {
        run.findings = validateFindings(
          { findings: [finding(run, update)] },
          run,
          policy,
        );
        await expect(createPatches(root, run, policy)).rejects.toThrow(
          "explicit command finding",
        );
      }
      run.findings = validateFindings(
        {
          findings: [
            finding(run, {
              original: "Introduction.",
              replacement: "Longer introduction.\n\nMore context.",
            }),
          ],
        },
        run,
        policy,
      );
      expect((await createPatches(root, run, policy))[0].after).toContain(
        block,
      );
    },
  );
  it.each([
    ["curl https://evil.example/download", "outside the approved"],
    [
      "git clone https://docs.example.com/unverified",
      "fresh successful evidence",
    ],
    ["curl file:///etc/passwd", "outside the approved"],
  ])(
    "rejects an unverified command destination: %s",
    async (replacement, error) => {
      const { root, run } = await fixture();
      await propose(root, run, policy, {
        findings: [
          finding(run, {
            kind: "command",
            original: "old-command",
            replacement,
          }),
        ],
      });
      await expect(createPatches(root, run, policy)).rejects.toThrow(error);
    },
  );
  it("validates assembled command URLs after substring edits and permits verified destinations", async () => {
    const { root } = await fixture();
    await writeFile(
      path.join(root, file),
      source.replace("old-command", 'curl "https://docs.example.com/old-path"'),
    );
    const run = await startRun(root, "command-url", policy, [
      { url: "/guide/", sources: [sourceUrl] },
    ]);
    await scan(root, run, policy, { captures: [capture()] });
    for (const replacement of ["unverified", "guide"]) {
      run.findings = validateFindings(
        {
          findings: [
            finding(run, {
              kind: "command",
              original: "old-path",
              replacement,
            }),
          ],
        },
        run,
        policy,
      );
      if (replacement === "unverified") {
        await expect(createPatches(root, run, policy)).rejects.toThrow(
          "fresh successful evidence",
        );
      } else {
        const patches = await createPatches(root, run, policy);
        expect(patches[0].after).toContain(`curl "${sourceUrl}"`);
        expect(patches[0].sensitive).toBe(true);
      }
    }
  });

  it("isolates malformed captures and rejects a non-array import before scanning", async () => {
    const { root } = await fixture();
    const run = await startRun(root, "imports", policy, [
      { url: "/guide/", sources: [sourceUrl] },
    ]);
    await expect(scan(root, run, policy, { captures: {} })).rejects.toThrow(
      "must be an array",
    );
    expect(run.requests).toBe(0);
    await scan(root, run, policy, {
      captures: [null, { url: "https://evil.example/" }, capture()],
    });
    expect(run.status).toBe("collected");
    expect(run.requests).toBe(1);
  });
  it.each([
    { retrievedAt: "2020-01-01T00:00:00Z" },
    { retrievedAt: "invalid" },
    { provider: "other" },
    { options: { maxAge: 60, onlyMainContent: true } },
    { data: { markdown: "Access denied", metadata: { statusCode: 403 } } },
    { data: { ...payload, warning: "Partial capture" } },
    { data: { ...payload, metadata: { url: "https://evil.example/" } } },
  ])(
    "uses a fresh duplicate after an unusable capture: %j",
    async (invalid) => {
      const { root } = await fixture();
      const limited = { ...policy, maxRequests: 1 };
      const run = await startRun(root, "duplicates", limited, [
        { url: "/guide/", sources: [sourceUrl] },
      ]);
      const captures = [{ ...capture(), ...invalid }, capture()];
      await scan(root, run, limited, { captures });
      expect(run.status).toBe("collected");
      expect(run.requests).toBe(1);
      expect(Object.values(run.evidence)[0]).toMatchObject({
        outcome: "retrieved",
        text: payload.markdown,
      });
      await scan(root, run, limited, { captures });
      expect(run.status).toBe("collected");
      expect(run.requests).toBe(1);
    },
  );
  it.each([
    '{{< youtube "example" >}}',
    "{{% notice note %}}\nNotice.\n{{% /notice %}}",
  ])(
    "rejects relocation or partial edits of shortcode %s, but allows surrounding prose edits",
    async (shortcode) => {
      const { root } = await fixture();
      const text = source.replace(
        "Old guidance.",
        `Old guidance.\n${shortcode}\nAfter.`,
      );
      await writeFile(path.join(root, file), text);
      const run = await startRun(root, "shortcodes", policy, [
        { url: "/guide/", sources: [sourceUrl] },
      ]);
      await scan(root, run, policy, { captures: [capture()] });
      for (const update of [
        {
          original: `Old guidance.\n${shortcode}`,
          replacement: `${shortcode}\nCorrected guidance.`,
        },
        { original: shortcode.slice(2, -2), replacement: " changed " },
      ]) {
        run.findings = validateFindings(
          { findings: [finding(run, update)] },
          run,
          policy,
        );
        await expect(createPatches(root, run, policy)).rejects.toThrow(
          "overlap a shortcode",
        );
      }
      run.findings = validateFindings(
        { findings: [finding(run)] },
        run,
        policy,
      );
      const patches = await createPatches(root, run, policy);
      expect(patches[0].after).toContain(
        `Corrected guidance.\n${shortcode}\nAfter.`,
      );
    },
  );
  it("rejects dirty articles even when their scanned bytes still match", async () => {
    const { root, run } = await proposed();
    const approval = approve(run, await createPatches(root, run, policy), {
      reviewer: "Test",
    });
    await writeFile(path.join(root, file), source + "Staged edit\n");
    execFileSync("git", ["add", file], { cwd: root });
    await writeFile(path.join(root, file), source);
    await expect(
      applyPatches(root, run, policy, approval, true),
    ).rejects.toThrow("uncommitted changes");
    expect(await readFile(path.join(root, file), "utf8")).toBe(source);
  });
  it("rejects two individually valid findings with overlapping spans", async () => {
    const { root, run } = await fixture();
    await propose(root, run, policy, {
      findings: [
        finding(run),
        finding(run, { original: "guidance.", replacement: "instructions." }),
      ],
    });
    await expect(createPatches(root, run, policy)).rejects.toThrow(
      "Overlapping findings",
    );
  });
  it("preserves budget-limited when the final source cannot retry", async () => {
    const { root } = await fixture();
    const limited = { ...policy, maxRequests: 1 };
    const run = await startRun(root, "retry-budget", limited, [
      { url: "/guide/", sources: [sourceUrl] },
    ]);
    let calls = 0;
    await scan(root, run, limited, {
      clientFactory: ({ policy, reserve }: any) =>
        firecrawlClient({
          policy,
          reserve,
          key: "fixture",
          sleep: async () => {},
          fetchImpl: async () => {
            calls++;
            return new Response("", { status: 503 });
          },
        }),
    });
    expect(calls).toBe(1);
    expect(run.status).toBe("budget-limited");
    expect(run.documents[0].status).toBe("unverifiable");
    expect(
      JSON.parse(await readFile(path.join(root, runPath(run.id)), "utf8"))
        .status,
    ).toBe("budget-limited");
  });
  it("uses the configured report freshness window", async () => {
    const { run } = await fixture();
    Object.values(run.evidence).forEach(
      (e: any) =>
        (e.retrievedAt = new Date(Date.now() - 10 * 86400000).toISOString()),
    );
    expect(report(run, { ...policy, evidenceMaxAgeDays: 30 })).not.toContain(
      "Incomplete source:",
    );
    expect(report(run, { ...policy, evidenceMaxAgeDays: 2 })).toContain(
      "Incomplete source:",
    );
  });
  it("rejects a prose edit relocating an unchanged summary marker", async () => {
    const { root, run } = await fixture();
    await propose(root, run, policy, {
      findings: [
        finding(run, {
          original: "Old guidance.\n<!--more-->",
          replacement: "<!--more-->\nCorrected guidance.",
        }),
      ],
    });
    await expect(createPatches(root, run, policy)).rejects.toThrow(
      "summary marker",
    );
  });
  it("records corrected history only after all corrections are written", async () => {
    const { root, run } = await proposed();
    await recordHistory(root, run, policy);
    const getHistory = async () =>
      JSON.parse(
        await readFile(
          path.join(root, ".content-refresh/history.json"),
          "utf8",
        ),
      );
    expect((await getHistory())["/guide/"]).toBeUndefined();
    const patches = await createPatches(root, run, policy);
    const approval = approve(run, patches, { reviewer: "Test" });
    await applyPatches(root, run, policy, approval);
    await recordHistory(root, run, policy, approval);
    expect((await getHistory())["/guide/"]).toBeUndefined();
    await applyPatches(root, run, policy, approval, true);
    await recordHistory(root, run, policy, approval);
    expect((await getHistory())["/guide/"].contentHash).toBe(
      patches[0].afterHash,
    );
    expect(
      (await inventory(root, policy, new Date(), await getHistory()))
        .documents[0].due,
    ).toBe(false);
    run.findings.push({ ...run.findings[0], id: "unapplied" });
    await recordHistory(root, run, policy, approval);
    expect((await getHistory())["/guide/"]).toBeUndefined();
  });
  it("records checked current content without requiring an edit", async () => {
    const { root, run } = await fixture();
    await propose(root, run, policy, {
      findings: [
        finding(run, {
          classification: "current",
          kind: "none",
          original: "",
          replacement: "",
        }),
      ],
    });
    await recordHistory(root, run, policy);
    const history = JSON.parse(
      await readFile(path.join(root, ".content-refresh/history.json"), "utf8"),
    );
    expect(history["/guide/"].contentHash).toBe(run.documents[0].contentHash);
    expect(
      (await inventory(root, policy, new Date(), history)).documents[0].due,
    ).toBe(false);
  });
});
