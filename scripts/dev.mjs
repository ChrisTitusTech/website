#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";

import chokidar from "chokidar";

import { prepareContent } from "./prepare-content.mjs";

const root = process.cwd();
const args = process.argv.slice(2);
const previewIndex = args.indexOf("--preview");
const preview = previewIndex !== -1;
if (preview) args.splice(previewIndex, 1);
process.env.CONTENT_PREVIEW = preview ? "1" : "0";

await prepareContent();

const server = spawn(
  process.execPath,
  [
    path.join(root, "node_modules/astro/bin/astro.mjs"),
    "dev",
    "--ignore-lock",
    ...args,
  ],
  {
    cwd: root,
    env: { ...process.env, ASTRO_DEV_BACKGROUND: "0" },
    stdio: "inherit",
  },
);

let timer;
let preparing = false;
let pending = false;
let stopping = false;
async function refreshContent() {
  if (preparing) {
    pending = true;
    return;
  }
  preparing = true;
  try {
    await prepareContent();
  } catch (error) {
    console.error(error);
  } finally {
    preparing = false;
    if (pending) {
      pending = false;
      void refreshContent();
    }
  }
}

const watcher = chokidar.watch(path.join(root, "content"), {
  ignoreInitial: true,
  usePolling: true,
  interval: 1000,
});
watcher.on("all", (_event, filename) => {
  if (!filename?.endsWith(".md")) return;
  clearTimeout(timer);
  timer = setTimeout(() => void refreshContent(), 100);
});

function stop(signal) {
  if (stopping) return;
  stopping = true;
  clearTimeout(timer);
  watcher.close();
  if (!server.killed) server.kill(signal);
}

for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => stop(signal));

server.on("exit", (code, signal) => {
  clearTimeout(timer);
  if (!stopping) watcher.close();
  process.exitCode = code ?? (signal ? 1 : 0);
});
