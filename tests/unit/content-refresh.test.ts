import { afterEach, describe, expect, it } from "vitest";
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
  it("does not extract runnable code or image URLs as research links", () => {
    expect(
      extractLinks(
        "[docs](https://docs.example.com/guide)\n```sh\ncurl https://evil.test/\n```\n![image](https://evil.test/i.png)",
      ),
    ).toEqual([sourceUrl]);
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
    expect(report(run)).toContain("incomplete");
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
  it("rejects stale source hashes and dirty files instead of overwriting", async () => {
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
  it("rejects overlapping edits and applies non-overlapping offsets without cascading replacements", async () => {
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
    expect(report(run)).not.toContain("<script>");
    expect(report(run)).not.toContain("[click]");
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
