#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";

import { isActiveWaiver } from "./audit-policy.mjs";

const waiverPath = new URL(
  "../docs/security/npm-audit-waivers.json",
  import.meta.url,
);
const waivers = JSON.parse(await readFile(waiverPath, "utf8")).advisories ?? {};
const result = spawnSync("npm", ["audit", "--json"], { encoding: "utf8" });

let report;
try {
  report = JSON.parse(result.stdout);
} catch {
  process.stderr.write(
    result.stderr || result.stdout || "npm audit did not return JSON\n",
  );
  process.exit(result.status || 1);
}

if (result.error || result.status === null || ![0, 1].includes(result.status)) {
  process.stderr.write(
    result.error?.message ||
      result.stderr ||
      `npm audit exited unexpectedly with status ${result.status}\n`,
  );
  process.exit(result.status || 1);
}

if (report.error) {
  const message =
    typeof report.error === "string"
      ? report.error
      : report.error.summary ||
        report.error.message ||
        JSON.stringify(report.error);
  console.error(`npm audit failed operationally: ${message}`);
  process.exit(1);
}

const vulnerabilities = report.vulnerabilities ?? {};
const severe = new Set(["high", "critical"]);

function advisoryIds(name, seen = new Set()) {
  if (seen.has(name)) return new Set();
  seen.add(name);
  const vulnerability = vulnerabilities[name];
  if (!vulnerability) return new Set();
  const ids = new Set();
  for (const via of vulnerability.via ?? []) {
    if (typeof via === "string") {
      for (const id of advisoryIds(via, seen)) ids.add(id);
    } else if (via.url) {
      const id = via.url.match(/GHSA-[a-z0-9-]+/i)?.[0]?.toUpperCase();
      if (id) ids.add(id);
    }
  }
  return ids;
}

const today = new Date().toISOString().slice(0, 10);
const failures = [];
const accepted = new Map();

for (const [name, vulnerability] of Object.entries(vulnerabilities)) {
  if (!severe.has(vulnerability.severity)) continue;
  const ids = [...advisoryIds(name)];
  if (ids.length === 0) {
    failures.push(
      `${name}: ${vulnerability.severity} vulnerability has no traceable advisory`,
    );
    continue;
  }
  const unwaived = ids.filter((id) => !isActiveWaiver(waivers[id], today));
  if (unwaived.length) {
    failures.push(
      `${name}: ${vulnerability.severity} via ${unwaived.join(", ")}`,
    );
    continue;
  }
  for (const id of ids) accepted.set(id, waivers[id]);
}

if (failures.length) {
  console.error("Unresolved high or critical npm audit findings:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const counts = report.metadata?.vulnerabilities ?? {};
console.log(
  `npm audit enforcement passed (${counts.high ?? 0} high, ${counts.critical ?? 0} critical).`,
);
for (const [id, waiver] of accepted) {
  console.log(`Accepted ${id} through ${waiver.expires}: ${waiver.scope}`);
}
