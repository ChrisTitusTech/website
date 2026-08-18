#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import process from "node:process";

const image = "mcr.microsoft.com/playwright:v1.62.1-noble";
const osRelease =
  process.platform === "linux" ? readFileSync("/etc/os-release", "utf8") : "";
const needsContainer = /^ID=fedora$/m.test(osRelease);
const uid = process.getuid?.();
const gid = process.getgid?.();
const hostUser = uid !== undefined && gid !== undefined ? `${uid}:${gid}` : "";

function run(command, args) {
  return spawnSync(command, args, { stdio: "inherit" }).status ?? 1;
}

if (!needsContainer)
  process.exit(run("npx", ["playwright", "test", "--project=webkit"]));

for (const engine of ["podman", "docker"]) {
  if (spawnSync(engine, ["--version"], { stdio: "ignore" }).status !== 0)
    continue;
  const volume = `${process.cwd()}:/work${engine === "podman" ? ":Z" : ""}`;
  const user = engine === "docker" && hostUser ? ["--user", hostUser] : [];
  const tmpfs =
    engine === "podman"
      ? "/work/.astro:rw,notmpcopyup"
      : `/work/.astro:rw${hostUser ? `,uid=${uid},gid=${gid}` : ""}`;
  process.exit(
    run(engine, [
      "run",
      "--rm",
      ...user,
      "-v",
      volume,
      "--tmpfs",
      tmpfs,
      "-w",
      "/work",
      image,
      "npx",
      "playwright",
      "test",
      "--project=webkit",
    ]),
  );
}

console.error("WebKit requires Podman or Docker on Fedora.");
process.exit(1);
