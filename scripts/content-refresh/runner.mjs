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

class BudgetExhausted extends Error {}

export async function scan(
  root,
  run,
  policy,
  { captures, clientFactory = firecrawlClient } = {},
) {
  if (run.policyHash !== hash(policy))
    throw new Error("Policy changed; start a new run");
  if (run.findings.length)
    throw new Error(
      "Reviewed runs are immutable; start a new run to refresh evidence",
    );
  if (captures !== undefined && !Array.isArray(captures))
    throw new Error("Captures import must be an array");
  const imported = captures?.flatMap((capture) => {
    try {
      return [{ url: publicUrl(capture?.url, policy.domains), capture }];
    } catch {
      return [];
    }
  });
  // createdAt is persisted with the run; resuming cannot reset this deadline.
  const deadline = Date.parse(run.createdAt) + policy.maxRunSeconds * 1000;
  if (!Number.isFinite(deadline)) throw new Error("Invalid run creation time");
  if (Date.now() >= deadline) {
    run.status = "budget-limited";
    await saveRun(root, run);
    return run;
  }
  const reserve = async () => {
    if (run.requests >= policy.maxRequests || Date.now() >= deadline)
      throw new BudgetExhausted("Run request or time budget exhausted");
    run.requests++;
    await saveRun(root, run);
  };
  const client = captures ? null : clientFactory({ policy, reserve });
  const attempted = new Set();
  for (const doc of run.documents) {
    if (
      hash(await readFile(await safePath(root, doc.file), "utf8")) !==
      doc.contentHash
    )
      throw new Error("Source changed since inventory; start a new run");
    for (const url of doc.sources) {
      const id = hash(url).slice(0, 16),
        prior = run.evidence[id];
      if (prior && (evidenceFresh(prior, policy) || attempted.has(id))) {
        if (!doc.evidenceIds.includes(id)) doc.evidenceIds.push(id);
        continue;
      }
      if (Date.now() >= deadline || run.requests >= policy.maxRequests) {
        run.status = "budget-limited";
        await saveRun(root, run);
        return run;
      }
      let budgetExhausted = false;
      attempted.add(id);
      try {
        if (captures) {
          // Imports consume a processing unit even when no usable capture exists.
          // They make no provider requests; captures are operator inputs, not attestations.
          await reserve();
          let evidence;
          for (const entry of imported) {
            if (entry.url !== url) continue;
            const { capture } = entry;
            if (
              capture.provider !== "firecrawl" ||
              typeof capture.retrievedAt !== "string" ||
              !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(
                capture.retrievedAt,
              ) ||
              !Number.isFinite(Date.parse(capture.retrievedAt)) ||
              capture.options?.maxAge !== 0 ||
              capture.options?.onlyMainContent !== true
            )
              continue;
            try {
              const candidate = normalizeEvidence(
                url,
                capture.data,
                policy,
                capture.retrievedAt,
              );
              if (!evidenceFresh(candidate, policy)) continue;
              evidence = candidate;
              break;
            } catch {
              // A malformed attempt must not hide a usable duplicate capture.
            }
          }
          if (!evidence) throw new Error("Missing fresh Firecrawl capture");
          run.evidence[id] = evidence;
        } else run.evidence[id] = await client.scrape(url);
        if (Date.now() >= deadline)
          throw new BudgetExhausted(
            "Run time budget exhausted during collection",
          );
      } catch (error) {
        budgetExhausted =
          error instanceof BudgetExhausted || Date.now() >= deadline;
        run.evidence[id] = {
          id,
          url,
          outcome: "unverifiable",
          retrievedAt: new Date().toISOString(),
          text: "",
          contentHash: hash(""),
          error:
            "Source unavailable, disallowed, stale, or request/time budget exhausted",
        };
      }
      if (!doc.evidenceIds.includes(id)) doc.evidenceIds.push(id);
      if (budgetExhausted) {
        run.status = "budget-limited";
        doc.status = "unverifiable";
        await saveRun(root, run);
        return run;
      }
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

export async function recordHistory(root, run, policy, approval) {
  let history = {};
  try {
    history = await readJson(
      await safePath(root, ".content-refresh/history.json"),
    );
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  for (const doc of run.documents) {
    const findings = run.findings.filter((finding) => finding.url === doc.url);
    const patch = approval?.patches.find((item) => item.file === doc.file);
    const complete =
      findings.length &&
      findings.every(
        (finding) =>
          ["current", "historical"].includes(finding.classification) ||
          (finding.classification === "confirmed-outdated" &&
            patch?.findingIds.includes(finding.id)),
      );
    const expectedHash = patch?.afterHash ?? doc.contentHash;
    const actualHash = hash(
      await readFile(await safePath(root, doc.file), "utf8"),
    );
    if (
      complete &&
      doc.status === "collected" &&
      doc.evidenceIds.every((id) => evidenceFresh(run.evidence[id], policy)) &&
      actualHash === expectedHash
    ) {
      history[doc.url] = {
        contentHash: expectedHash,
        checkedAt: new Date().toISOString(),
        scope: doc.sources,
        claims: findings.map(({ id, section, classification, evidence }) => ({
          id,
          section,
          classification,
          sources: evidence.map((item) => item.url),
        })),
      };
    } else if (history[doc.url]?.contentHash !== actualHash)
      delete history[doc.url];
  }
  await writeJson(root, ".content-refresh/history.json", history);
}

const escape = (text) =>
  String(text)
    .replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c])
    .replace(/([\\`*_[\]#|~])/g, "\\$1");
export function report(run, policy) {
  const instant = Date.now();
  const collected = run.documents.filter(
    (doc) =>
      doc.status === "collected" &&
      doc.sources.length &&
      doc.evidenceIds.length === doc.sources.length &&
      doc.evidenceIds.every((id) =>
        evidenceFresh(run.evidence[id], policy, instant),
      ),
  ).length;
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
    `Evidence collected for ${collected} articles; ${run.documents.length - collected} incomplete. Requests/imports: ${run.requests}. Model calls: ${run.modelCalls}.`,
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
    if (!evidenceFresh(e, policy, instant))
      lines.push(`- Incomplete source: ${escape(e.url)}.`);
  return lines.join("\n") + "\n";
}

export async function writeReport(root, run, policy) {
  const file = await safePath(root, `.content-refresh/runs/${run.id}.md`);
  await writeFile(file, report(run, policy), { mode: 0o600 });
  return file;
}

export async function loadRun(root, id, policy) {
  const run = await readJson(await safePath(root, runPath(id)));
  if (run.version !== 1 || run.id !== id || run.policyHash !== hash(policy))
    throw new Error("Run version or policy mismatch");
  return run;
}
