#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

import fg from "fast-glob";

const root = process.cwd();
const instant = process.env.BUILD_INSTANT ?? new Date().toISOString();
const baseEnvironment = { ...process.env, BUILD_INSTANT: instant };

function run(command, args, environment = baseEnvironment) {
  const result = spawnSync(command, args, {
    cwd: root,
    env: environment,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    process.stdout.write(result.stdout);
    process.stderr.write(result.stderr);
    throw new Error(
      `${command} ${args.join(" ")} failed with status ${result.status}`,
    );
  }
}

function status() {
  const result = spawnSync("git", ["status", "--porcelain=v1", "-uall"], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.status !== 0) throw new Error("git status failed");
  return result.stdout;
}

async function artifactDigest() {
  const files = await fg("dist/**/*", {
    cwd: root,
    onlyFiles: true,
    dot: true,
  });
  const hash = createHash("sha256");
  for (const file of files.sort()) {
    hash.update(file);
    hash.update("\0");
    hash.update(await readFile(path.join(root, file)));
    hash.update("\0");
  }
  return hash.digest("hex");
}

const before = status();
run("npm", ["run", "build"], { ...baseEnvironment, CONTENT_PREVIEW: "1" });
const firstState = JSON.parse(
  await readFile(path.join(root, ".astro-content/build.json"), "utf8"),
);
if (firstState.preview !== false)
  throw new Error("production build accepted content-preview mode");
const first = await artifactDigest();

run("node", ["scripts/prepare-content.mjs"], {
  ...baseEnvironment,
  CONTENT_PREVIEW: "1",
});
const previewState = JSON.parse(
  await readFile(path.join(root, ".astro-content/build.json"), "utf8"),
);
if (previewState.preview !== true)
  throw new Error("content-preview preparation did not enable preview mode");

run("npm", ["run", "build"], { ...baseEnvironment, CONTENT_PREVIEW: "1" });
const secondState = JSON.parse(
  await readFile(path.join(root, ".astro-content/build.json"), "utf8"),
);
if (secondState.preview !== false)
  throw new Error("repeated production build accepted content-preview mode");
const second = await artifactDigest();
if (first !== second)
  throw new Error(`repeated build mismatch: ${first} != ${second}`);

const after = status();
if (before !== after)
  throw new Error("check/build commands changed git status");
console.log(`Repeated production artifact is deterministic: ${second}`);
