import { createHash } from "node:crypto";
import { lstat, mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { isIP } from "node:net";

export const hash = (value) =>
  createHash("sha256")
    .update(typeof value === "string" ? value : JSON.stringify(value))
    .digest("hex");
export const readJson = async (file) =>
  JSON.parse(await readFile(file, "utf8"));

// Reject symlinks in every component, including existing parents of new files.
export async function safePath(root, relative) {
  if (
    typeof relative !== "string" ||
    relative.includes("\\") ||
    path.isAbsolute(relative) ||
    relative.split("/").some((p) => !p || p === "." || p === "..")
  )
    throw new Error("Unsafe relative path");
  let current = root;
  for (const part of relative.split("/")) {
    current = path.join(current, part);
    try {
      if ((await lstat(current)).isSymbolicLink())
        throw new Error("Symlink paths are not supported");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return current;
}

export async function writeJson(root, relative, value) {
  const file = await safePath(root, relative);
  await mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  const temp = `${file}.${process.pid}.tmp`;
  const handle = await open(temp, "wx", 0o600);
  try {
    await handle.writeFile(`${JSON.stringify(value, null, 2)}\n`);
  } finally {
    await handle.close();
  }
  await rename(temp, file);
}

export async function withLock(root, action) {
  const dir = await safePath(root, ".content-refresh");
  await mkdir(dir, { recursive: true, mode: 0o700 });
  let lock;
  try {
    lock = await open(path.join(dir, "lock"), "wx", 0o600);
  } catch {
    throw new Error(
      "Content refresh is locked. Check for a running process before removing .content-refresh/lock.",
    );
  }
  try {
    await lock.writeFile(String(process.pid));
    return await action();
  } finally {
    await lock.close();
    await unlink(path.join(dir, "lock"));
  }
}

export function publicUrl(value, domains) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Invalid source URL");
  }
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    isIP(url.hostname.replace(/[\[\]]/g, "")) ||
    !domains.includes(url.hostname)
  )
    throw new Error(
      "Source URL is outside the approved public domains or has query credentials",
    );
  url.hash = "";
  return url.href;
}

export function validatePolicy(p) {
  if (p.version !== 1) throw new Error("Unsupported policy version");
  for (const key of [
    "maxArticles",
    "maxRequests",
    "maxModelCalls",
    "maxOutputTokens",
    "maxInputCharacters",
    "timeoutMs",
    "maxRunSeconds",
    "evidenceMaxAgeDays",
    "recheckDays",
    "retentionDays",
  ]) {
    if (!Number.isSafeInteger(p[key]) || p[key] < 1)
      throw new Error(`Invalid policy: ${key}`);
  }
  for (const key of ["domains", "reportOnly", "generated", "historical"])
    if (!Array.isArray(p[key]) || p[key].some((v) => typeof v !== "string"))
      throw new Error(`Invalid policy: ${key}`);
  if (
    p.domains.some(
      (d) =>
        !/^(?:[a-z0-9-]+\.)+[a-z]{2,}$/.test(d) ||
        /\.(local|localhost|internal|test|invalid)$/.test(d),
    )
  )
    throw new Error("Policy requires public DNS domains");
  return p;
}

// Strict schema subset shared by imported findings and Responses API output.
export function validateSchema(value, schema) {
  if (schema.enum && !schema.enum.includes(value))
    throw new Error("Invalid classification");
  if (schema.type === "object") {
    if (!value || Array.isArray(value) || typeof value !== "object")
      throw new Error("Expected object");
    if (
      Object.keys(value).some((k) => !Object.hasOwn(schema.properties, k)) ||
      schema.required.some((k) => !Object.hasOwn(value, k))
    )
      throw new Error("Unexpected or missing field");
    for (const [key, child] of Object.entries(schema.properties))
      validateSchema(value[key], child);
  } else if (schema.type === "array") {
    if (!Array.isArray(value) || value.length > 50)
      throw new Error("Expected bounded array");
    value.forEach((item) => validateSchema(item, schema.items));
  } else if (
    typeof value !== schema.type ||
    (typeof value === "string" && value.length > 16000)
  )
    throw new Error("Invalid field type or length");
  return value;
}
