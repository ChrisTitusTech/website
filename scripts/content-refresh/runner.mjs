import { readFile, writeFile } from "node:fs/promises";
import { inventory } from "./inventory.mjs";
import {
  firecrawlClient,
  normalizeEvidence,
  evidenceFresh,
} from "./evidence.mjs";
import { hash, readJson, safePath, writeJson, publicUrl } from "./common.mjs";
import { parseDocument } from "../prepare-content.mjs";
import { validateFindings } from "./findings.mjs";

export function runPath(id) {
  if (typeof id !== "string" || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(id))
    throw new Error("Run ID must be a short lowercase slug");
  return `.content-refresh/runs/${id}.json`;
}
export const saveRun = (root, run) => writeJson(root, runPath(run.id), run);

export async function startRun(
  root,
  id,
  policy,
  selection,
  instant = new Date(),
) {
  const snapshot = await inventory(root, policy, instant);
  if (
    !Array.isArray(selection) ||
    !selection.length ||
    selection.length > policy.maxArticles ||
    new Set(selection.map((s) => s.url)).size !== selection.length
  )
    throw new Error("Select unique articles within the policy limit");
  const documents = [];
  for (const entry of selection) {
    const document = snapshot.documents.find((d) => d.url === entry.url);
    if (!document)
      throw new Error(
        "Selection contains ineligible, generated, or unknown content",
      );
    if (
      !Array.isArray(entry.sources) ||
      entry.sources.length > policy.maxRequests
    )
      throw new Error("Invalid source selection");
    const sources = [
      ...new Set(entry.sources.map((url) => publicUrl(url, policy.domains))),
    ];
    const { body } = parseDocument(
      await readFile(await safePath(root, document.file), "utf8"),
      document.file,
    );
    documents.push({
      ...document,
      body,
      sources,
      evidenceIds: [],
      status: "pending",
    });
  }
  return {
    version: 1,
    id,
    policyHash: hash(policy),
    createdAt: instant.toISOString(),
    inventory: {
      total: snapshot.documents.length,
      excluded: snapshot.excluded.length,
      generatedRoutes: snapshot.generatedRouteCount,
    },
    documents,
    evidence: {},
    requests: 0,
    modelCalls: 0,
    findings: [],
    status: "pending",
  };
}

export async function scan(
  root,
  run,
  policy,
  { captures, clientFactory = firecrawlClient } = {},
) {
  if (run.policyHash !== hash(policy))
    throw new Error("Policy changed; start a new run");
  const started = Date.now();
  const reserve = async () => {
    if (
      run.requests >= policy.maxRequests ||
      Date.now() - started >= policy.maxRunSeconds * 1000
    )
      throw new Error("Run request or time budget exhausted");
    run.requests++;
    await saveRun(root, run);
  };
  const client = captures ? null : clientFactory({ policy, reserve });
  for (const doc of run.documents) {
    if (
      hash(await readFile(await safePath(root, doc.file), "utf8")) !==
      doc.contentHash
    )
      throw new Error("Source changed since inventory; start a new run");
    for (const url of doc.sources) {
      const id = hash(url).slice(0, 16),
        prior = run.evidence[id];
      if (prior && evidenceFresh(prior, policy)) {
        if (!doc.evidenceIds.includes(id)) doc.evidenceIds.push(id);
        continue;
      }
      if (
        Date.now() - started >= policy.maxRunSeconds * 1000 ||
        run.requests >= policy.maxRequests
      ) {
        run.status = "budget-limited";
        await saveRun(root, run);
        return run;
      }
      try {
        if (captures) {
          const capture = captures.find(
            (c) => publicUrl(c.url, policy.domains) === url,
          );
          if (
            !capture ||
            capture.provider !== "firecrawl" ||
            capture.options?.maxAge !== 0 ||
            capture.options?.onlyMainContent !== true
          )
            throw new Error("Missing fresh Firecrawl capture");
          // Imports do not consume provider requests, but count against the run's
          // processing budget. Captures are trusted operator inputs, not attestations.
          await reserve();
          run.evidence[id] = normalizeEvidence(
            url,
            capture.data,
            policy,
            capture.retrievedAt,
          );
        } else run.evidence[id] = await client.scrape(url);
      } catch {
        run.evidence[id] = {
          id,
          url,
          outcome: "unverifiable",
          retrievedAt: new Date().toISOString(),
          text: "",
          contentHash: hash(""),
          error:
            "Source unavailable, disallowed, stale, or request budget exhausted",
        };
      }
      if (!doc.evidenceIds.includes(id)) doc.evidenceIds.push(id);
      await saveRun(root, run);
    }
    doc.status =
      doc.sources.length &&
      doc.evidenceIds.length === doc.sources.length &&
      doc.evidenceIds.every((id) => evidenceFresh(run.evidence[id], policy))
        ? "collected"
        : "unverifiable";
    await saveRun(root, run);
  }
  run.status = run.documents.every((d) => d.status === "collected")
    ? "collected"
    : "partial";
  await saveRun(root, run);
  return run;
}

export async function propose(root, run, policy, input) {
  if (run.policyHash !== hash(policy))
    throw new Error("Policy changed; start a new run");
  const findings = validateFindings(input, run, policy);
  for (const doc of run.documents)
    if (!findings.some((f) => f.url === doc.url))
      throw new Error(
        "Every selected article needs a finding, including unverifiable cases",
      );
  run.findings = findings;
  run.status = "review";
  await saveRun(root, run);
  return run;
}

const escape = (text) =>
  String(text)
    .replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c])
    .replace(/([\\`*_[\]#|])/g, "\\$1");
export function report(run) {
  const categories = [
    "current",
    "confirmed-outdated",
    "historical",
    "needs-review",
    "unverifiable",
  ];
  const counts = Object.fromEntries(
    categories.map((s) => [
      s,
      run.findings.filter((f) => f.classification === s).length,
    ]),
  );
  const lines = [
    "# Content refresh review",
    "",
    `Run: ${escape(run.id)}. State: ${escape(run.status)}.`,
    "",
    `Inventory: ${run.inventory.total} eligible sources; ${run.inventory.excluded} excluded sources. Selected: ${run.documents.length}. Unselected: ${run.inventory.total - run.documents.length}.`,
    "",
    `Evidence collected for ${run.documents.filter((d) => d.status === "collected").length} articles; ${run.documents.filter((d) => d.status !== "collected").length} incomplete. Requests/imports: ${run.requests}. Model calls: ${run.modelCalls}.`,
    "",
    "Coverage is limited to selected claims and sources, not a complete audit of these articles or the website.",
    "",
    ...Object.entries(counts).map(([name, count]) => `- ${name}: ${count}`),
    "",
  ];
  for (const f of run.findings) {
    lines.push(
      `## ${escape(f.url)}: ${escape(f.classification)}`,
      "",
      `Finding: ${f.id}. Section: ${escape(f.section)}.`,
      "",
      escape(f.reason),
      "",
      `Context: ${escape(f.context)}`,
      "",
    );
    for (const e of f.evidence)
      lines.push(
        `- Source: ${escape(e.url)} (retrieved ${escape(e.retrievedAt)}). Evidence: ${escape(e.excerpt)}`,
      );
    if (f.replacement)
      lines.push(
        "",
        "Original:",
        "",
        escape(f.original),
        "",
        "Proposed:",
        "",
        escape(f.replacement),
      );
    lines.push("");
  }
  for (const e of Object.values(run.evidence))
    if (!evidenceFresh(e, { evidenceMaxAgeDays: 7 }))
      lines.push(`- Incomplete source: ${escape(e.url)}.`);
  return lines.join("\n") + "\n";
}

export async function writeReport(root, run) {
  const file = await safePath(root, `.content-refresh/runs/${run.id}.md`);
  await writeFile(file, report(run), { mode: 0o600 });
  return file;
}

export async function loadRun(root, id, policy) {
  const run = await readJson(await safePath(root, runPath(id)));
  if (run.version !== 1 || run.id !== id || run.policyHash !== hash(policy))
    throw new Error("Run version or policy mismatch");
  return run;
}
