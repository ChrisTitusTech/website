import { readFile, writeFile, rename, unlink, open } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import MarkdownIt from "markdown-it";
import {
  parseDocument,
  transformBody,
  validatePost,
} from "../prepare-content.mjs";
import { hash, safePath } from "./common.mjs";
import { validateFindings, validateNewLinks } from "./findings.mjs";
import { extractLinks } from "./inventory.mjs";

function protectedParts(body) {
  const tokens = new MarkdownIt({ html: true }).parse(body, {});
  const blocks = tokens
    .filter((t) => t.type === "fence" || t.type === "code_block")
    .map((t) => ({ type: t.type, content: t.content, info: t.info }));
  const html = tokens
    .flatMap((t) => [t, ...(t.children ?? [])])
    .filter((t) => t.type === "html_block" || t.type === "html_inline")
    .map((t) => t.content);
  return {
    markers: body.match(/<!--more-->/g) ?? [],
    shortcodes: body.match(/\{\{[<%][\s\S]*?[>%]\}\}/g) ?? [],
    blocks,
    html,
  };
}

export async function createPatches(
  root,
  run,
  policy,
  selected = run.findings
    .filter(
      (f) => f.classification === "confirmed-outdated" && f.kind !== "none",
    )
    .map((f) => f.id),
) {
  if (!selected.length || new Set(selected).size !== selected.length)
    throw new Error("Select unique finding IDs");
  const groups = new Map();
  for (const id of selected) {
    const f = run.findings.find((item) => item.id === id);
    if (!f || f.classification !== "confirmed-outdated" || f.kind === "none")
      throw new Error("Selected finding cannot be applied");
    if (!/^src\/content\/(?:[^/]+\/)*[^/]+\.md$/.test(f.file))
      throw new Error("Patch is outside content paths");
    if (f.original.length > 2000 || f.replacement.length > 4000)
      throw new Error(
        "Correction is too broad; split it into smaller findings",
      );
    const {
      id: ignoredId,
      file: ignoredFile,
      sourceHash: ignoredHash,
      ...input
    } = f;
    input.evidence = input.evidence.map(({ id, excerpt }) => ({ id, excerpt }));
    const verified = validateFindings({ findings: [input] }, run, policy)[0];
    if (hash(verified) !== hash(f))
      throw new Error("Finding changed after verification");
    const group = groups.get(f.file) ?? [];
    group.push(f);
    groups.set(f.file, group);
  }
  const patches = [];
  for (const [file, findings] of groups) {
    const target = await safePath(root, file);
    const source = await readFile(target, "utf8");
    if (findings.some((f) => f.sourceHash !== hash(source)))
      throw new Error("Article changed since scan; rescan before applying");
    const parsed = parseDocument(source, file);
    const front = source.slice(0, source.length - parsed.body.length);
    let body = parsed.body;
    const intervals = [],
      edits = [];
    for (const f of findings) {
      const index = parsed.body.indexOf(f.original);
      if (index < 0 || parsed.body.indexOf(f.original, index + 1) !== -1)
        throw new Error(
          "Original text must match exactly once in the article body",
        );
      if (
        intervals.some(([a, b]) => index < b && index + f.original.length > a)
      )
        throw new Error("Overlapping findings must be reviewed separately");
      intervals.push([index, index + f.original.length]);
      if (
        f.kind === "link" &&
        ![f.original, f.replacement].every((value) =>
          /^https?:\/\/[^\s<>]+$/.test(value),
        )
      )
        throw new Error("Link findings may replace only a URL");
      if (
        f.original.includes("<!--more-->") ||
        f.replacement.includes("<!--more-->")
      )
        throw new Error("Finding must not include a summary marker");
      const isolated =
        parsed.body.slice(0, index) +
        f.replacement +
        parsed.body.slice(index + f.original.length);
      if (
        f.kind !== "command" &&
        hash(protectedParts(parsed.body).blocks) !==
          hash(protectedParts(isolated).blocks)
      )
        throw new Error(
          "Each code block edit requires an explicit command finding",
        );
      if (
        f.kind === "notice" &&
        (!f.replacement.includes(f.original) ||
          !/\b\d{4}-\d{2}-\d{2}\b/.test(f.replacement))
      )
        throw new Error("Notices must retain the original and include a date");
      edits.push({ index, original: f.original, replacement: f.replacement });
    }
    for (const edit of edits.sort((a, b) => b.index - a.index))
      body =
        body.slice(0, edit.index) +
        edit.replacement +
        body.slice(edit.index + edit.original.length);
    const before = protectedParts(parsed.body),
      after = protectedParts(body);
    if (
      hash(before.markers) !== hash(after.markers) ||
      hash(before.shortcodes) !== hash(after.shortcodes)
    )
      throw new Error("Patch changes summary markers or shortcodes");
    const commandsChanged = hash(before.blocks) !== hash(after.blocks);
    if (commandsChanged && !findings.some((f) => f.kind === "command"))
      throw new Error("Code block changes require an explicit command finding");
    if (hash(before.html) !== hash(after.html))
      throw new Error("Patch changes raw HTML");
    validateNewLinks(parsed.body, body, run, policy, extractLinks);
    if (file.startsWith("src/content/posts/")) validatePost(parsed.data, file);
    transformBody(body, parsed.data, file);
    const result = front + body;
    const patch = {
      file,
      beforeHash: hash(source),
      afterHash: hash(result),
      findingIds: findings.map((f) => f.id),
      sensitive:
        findings.some((f) => f.kind === "command") ||
        /\b(ssh|security|password|powershell|registry)\b/i.test(source),
      before: source,
      after: result,
    };
    patches.push({ ...patch, digest: hash(patch) });
  }
  return patches;
}

export function approve(run, patches, { reviewer, allowSensitive = false }) {
  if (!reviewer?.trim()) throw new Error("A reviewer name is required");
  if (patches.some((p) => p.sensitive) && !allowSensitive)
    throw new Error(
      "Sensitive edits need --allow-sensitive after editorial review",
    );
  return {
    version: 1,
    runId: run.id,
    reviewer,
    approvedAt: new Date().toISOString(),
    policyHash: run.policyHash,
    findingsHash: hash(run.findings),
    patches: patches.map((p) => ({
      file: p.file,
      digest: p.digest,
      afterHash: p.afterHash,
      findingIds: p.findingIds,
    })),
  };
}

export async function applyPatches(root, run, policy, approval, write = false) {
  if (
    approval.version !== 1 ||
    approval.runId !== run.id ||
    approval.policyHash !== hash(policy) ||
    approval.findingsHash !== hash(run.findings) ||
    !approval.reviewer?.trim()
  )
    throw new Error("Approval does not match this run, policy, or findings");
  if (!Array.isArray(approval.patches) || !approval.patches.length)
    throw new Error("Empty approval");
  if (
    approval.patches.some(
      (p) => !/^src\/content\/(?:[^/]+\/)*[^/]+\.md$/.test(p.file),
    )
  )
    throw new Error("Approval is outside content paths");
  const existing = await Promise.all(
    approval.patches.map(async (p) =>
      hash(await readFile(await safePath(root, p.file), "utf8")),
    ),
  );
  if (existing.every((h, i) => h === approval.patches[i].afterHash))
    return { status: "already-applied", files: [] };
  if (existing.some((h, i) => h === approval.patches[i].afterHash))
    throw new Error(
      "Partial prior apply detected; inspect the receipt and recover before retrying",
    );
  const patches = await createPatches(
    root,
    run,
    policy,
    approval.patches.flatMap((p) => p.findingIds),
  );
  if (
    patches.length !== approval.patches.length ||
    patches.some(
      (p) =>
        !approval.patches.some(
          (a) =>
            a.file === p.file &&
            a.digest === p.digest &&
            a.afterHash === p.afterHash,
        ),
    )
  )
    throw new Error("Approved patch changed");
  for (const patch of patches) {
    const dirty = execFileSync(
      "git",
      ["status", "--porcelain", "--", patch.file],
      { cwd: root, encoding: "utf8" },
    );
    if (dirty.trim())
      throw new Error("Selected article has uncommitted changes");
  }
  if (!write) return { status: "dry-run", files: patches.map((p) => p.file) };
  // Preflight every file before any write. Stage sibling files, then rename;
  // restore prior bytes on an ordinary error. A crash may require recovery.
  const staged = [],
    applied = [];
  try {
    for (const patch of patches) {
      const target = await safePath(root, patch.file),
        temp = `${target}.content-refresh-${process.pid}`;
      const handle = await open(temp, "wx", 0o644);
      try {
        await handle.writeFile(patch.after);
      } finally {
        await handle.close();
      }
      staged.push({ temp, target, patch });
    }
    for (const item of staged) {
      if (hash(await readFile(item.target, "utf8")) !== item.patch.beforeHash)
        throw new Error("Article changed during apply");
      await rename(item.temp, item.target);
      applied.push(item);
    }
  } catch (error) {
    for (const item of applied) {
      if (hash(await readFile(item.target, "utf8")) === item.patch.afterHash)
        await writeFile(item.target, item.patch.before);
    }
    throw error;
  } finally {
    for (const item of staged)
      await unlink(item.temp).catch((e) => {
        if (e.code !== "ENOENT") throw e;
      });
  }
  return { status: "applied", files: patches.map((p) => p.file) };
}
