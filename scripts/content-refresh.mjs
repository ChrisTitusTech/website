#!/usr/bin/env node
import { parseArgs } from "node:util";
import { access } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import {
  hash,
  readJson,
  safePath,
  validatePolicy,
  withLock,
  writeJson,
} from "./content-refresh/common.mjs";
import { inventory } from "./content-refresh/inventory.mjs";
import { firecrawlClient } from "./content-refresh/evidence.mjs";
import { modelFindings } from "./content-refresh/findings.mjs";
import {
  approve,
  applyPatches,
  createPatches,
} from "./content-refresh/patches.mjs";
import {
  loadRun,
  propose,
  runPath,
  saveRun,
  scan,
  startRun,
  writeReport,
  recordHistory,
} from "./content-refresh/runner.mjs";

export async function main(args = process.argv.slice(2), root = process.cwd()) {
  const { positionals, values } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      run: { type: "string" },
      selection: { type: "string" },
      evidence: { type: "string" },
      findings: { type: "string" },
      model: { type: "string" },
      ids: { type: "string" },
      reviewer: { type: "string" },
      query: { type: "string" },
      resume: { type: "boolean" },
      write: { type: "boolean" },
      "allow-sensitive": { type: "boolean" },
      help: { type: "boolean" },
    },
  });
  const [command] = positionals;
  if (values.help || !command) {
    console.log(
      "Content refresh (manual only)\n  inventory\n  scan --run ID --selection FILE [--evidence FILE] [--resume]\n  search --run ID --query TEXT\n  propose --run ID (--findings FILE | --model MODEL)\n  report --run ID\n  approve --run ID --ids ID,ID --reviewer NAME [--allow-sensitive]\n  apply --run ID [--write]\nAll reports are private local files under .content-refresh/. apply defaults to dry-run.",
    );
    return;
  }
  if (
    positionals.length !== 1 ||
    ![
      "inventory",
      "scan",
      "search",
      "propose",
      "report",
      "approve",
      "apply",
    ].includes(command)
  )
    throw new Error("Unknown command; use --help");
  const policy = validatePolicy(
    await readJson(await safePath(root, "data/content-refresh-policy.json")),
  );
  // Operator imports are local JSON files, never file paths supplied by a model.
  const importJson = async (file) => readJson(await safePath(root, file));
  return withLock(root, async () => {
    if (command === "inventory") {
      let history = {};
      try {
        history = await readJson(
          await safePath(root, ".content-refresh/history.json"),
        );
      } catch (e) {
        if (e.code !== "ENOENT") throw e;
      }
      const result = await inventory(root, policy, new Date(), history);
      await writeJson(root, ".content-refresh/inventory.json", result);
      console.log(
        `Inventoried ${result.documents.length} eligible sources; excluded ${result.excluded.length}. See .content-refresh/inventory.json.`,
      );
      return;
    }
    runPath(values.run);
    let run;
    if (command === "scan" && !values.resume) {
      if (!values.selection) throw new Error("scan requires --selection");
      try {
        await access(await safePath(root, runPath(values.run)));
        throw new Error("Run exists; use --resume or choose a new ID");
      } catch (e) {
        if (e.code !== "ENOENT") throw e;
      }
      run = await startRun(
        root,
        values.run,
        policy,
        await importJson(values.selection),
      );
      await saveRun(root, run);
    } else run = await loadRun(root, values.run, policy);
    if (command === "scan") {
      await scan(root, run, policy, {
        captures: values.evidence
          ? await importJson(values.evidence)
          : undefined,
      });
    } else if (command === "search") {
      const deadline = Date.parse(run.createdAt) + policy.maxRunSeconds * 1000;
      if (!Number.isFinite(deadline))
        throw new Error("Invalid run creation time");
      const exhausted = async () => {
        run.status = "budget-limited";
        await saveRun(root, run);
        throw new Error("Run request or time budget exhausted");
      };
      const client = firecrawlClient({
        policy,
        reserve: async () => {
          if (run.requests >= policy.maxRequests || Date.now() >= deadline)
            await exhausted();
          run.requests++;
          await saveRun(root, run);
        },
      });
      const hits = await client.search(values.query);
      if (Date.now() >= deadline) await exhausted();
      run.discovery = hits;
      await saveRun(root, run);
      console.log(
        `Saved ${hits.length} approved-domain discovery URLs. Review them and start a new selection; search snippets are not evidence.`,
      );
    } else if (command === "propose") {
      if (Boolean(values.findings) === Boolean(values.model))
        throw new Error("Choose exactly one of --findings or --model");
      // Re-read and verify source hashes before transmitting published bodies.
      const current = await inventory(root, policy);
      for (const d of run.documents)
        if (
          !current.documents.some(
            (c) => c.url === d.url && c.contentHash === d.contentHash,
          )
        )
          throw new Error("Article changed or is no longer eligible; rescan");
      const input = values.findings
        ? await importJson(values.findings)
        : await modelFindings(run, policy, {
            model: values.model,
            reserve: async () => {
              if (run.modelCalls >= policy.maxModelCalls)
                throw new Error("Model call budget exhausted");
              run.modelCalls++;
              await saveRun(root, run);
            },
          });
      await propose(root, run, policy, input);
      const editable = run.findings.filter(
        (f) => f.classification === "confirmed-outdated" && f.kind !== "none",
      );
      if (editable.length)
        await writeJson(
          root,
          `.content-refresh/runs/${run.id}.patches.json`,
          await createPatches(root, run, policy),
        );
      await recordHistory(root, run, policy);
    } else if (command === "approve") {
      const patches = await createPatches(
        root,
        run,
        policy,
        values.ids?.split(",") ?? [],
      );
      const approval = approve(run, patches, {
        reviewer: values.reviewer,
        allowSensitive: values["allow-sensitive"],
      });
      await writeJson(
        root,
        `.content-refresh/runs/${run.id}.approval.json`,
        approval,
      );
    } else if (command === "apply") {
      const approval = await readJson(
        await safePath(root, `.content-refresh/runs/${run.id}.approval.json`),
      );
      const result = await applyPatches(
        root,
        run,
        policy,
        approval,
        values.write,
      );
      await writeJson(root, `.content-refresh/runs/${run.id}.receipt.json`, {
        ...result,
        at: new Date().toISOString(),
        approvalHash: hash(approval),
      });
      if (
        values.write &&
        ["applied", "already-applied"].includes(result.status)
      )
        await recordHistory(root, run, policy, approval);
      console.log(`${result.status}: ${result.files.length} files`);
    }
    const report = await writeReport(root, run, policy);
    console.log(`Run ${run.id}: ${run.status}. Report: ${report}`);
    if (command === "scan" && run.status !== "collected") process.exitCode = 2;
  });
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main().catch((error) => {
    console.error(
      `Content refresh failed: ${error.message.replace(/https?:\/\/\S+/g, "[URL]").replace(/(?:fc-|sk-)[A-Za-z0-9_-]+/g, "[redacted]")}`,
    );
    process.exitCode = 1;
  });
}
