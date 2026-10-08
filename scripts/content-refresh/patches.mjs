import { readFile, writeFile, rename, unlink, open } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import MarkdownIt from "markdown-it";
import site from "../../src/data/site.json" with { type: "json" };
import {
  parseDocument,
  transformBody,
  validatePost,
} from "../prepare-content.mjs";
import { hash, safePath, readJson, writeJson } from "./common.mjs";
import { validateFindings, validateNewLinks } from "./findings.mjs";
import { extractLinks, extractDestinations } from "./inventory.mjs";
import {
  buildInventory,
  publicRoute,
  redirectMatches,
} from "../route-contract.mjs";

function protectedParts(body) {
  const tokens = new MarkdownIt({ html: true }).parse(body, {});
  const codeBlocks = tokens.filter(
    (t) => t.type === "fence" || t.type === "code_block",
  );
  const blocks = codeBlocks.map((t) => ({
    type: t.type,
    content: t.content,
    info: t.info,
  }));
  const lineOffsets = [0, ...[...body.matchAll(/\n/g)].map((m) => m.index + 1)];
  const blockRanges = codeBlocks.map((t) => [
    lineOffsets[t.map[0]],
    lineOffsets[t.map[1]] ?? body.length,
  ]);
  // Inventory omits code examples. Patch validation separately checks literal
  // destinations in the final code, including URLs changed by substring edits.
  const codeLinks = tokens
    .flatMap((t) => [t, ...(t.children ?? [])])
    .filter((t) => ["fence", "code_block", "code_inline"].includes(t.type))
    .flatMap(
      (t) =>
        t.content.match(/\b[a-z][a-z0-9+.-]*:\/\/[^\s"'`<>(){}\[\]\\]+/gi) ??
        [],
    );

  const html = tokens
    .flatMap((t) => [t, ...(t.children ?? [])])
    .filter((t) => t.type === "html_block" || t.type === "html_inline")
    .map((t) => t.content);
  const htmlRanges = [];
  for (const token of tokens) {
    if (!token.map) continue;
    const start = lineOffsets[token.map[0]],
      end = lineOffsets[token.map[1]] ?? body.length;
    if (token.type === "html_block") htmlRanges.push([start, end]);
    for (const child of token.children ?? []) {
      if (child.type !== "html_inline") continue;
      const literal = child.content
        .split("\n")
        .map((line) => line.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("\\r?\\n");
      for (const match of body
        .slice(start, end)
        .matchAll(new RegExp(literal, "g")))
        htmlRanges.push([
          start + match.index,
          start + match.index + match[0].length,
        ]);
    }
  }
  return {
    markers: body.match(/<!--more-->/g) ?? [],
    shortcodes: body.match(/\{\{[<%][\s\S]*?[>%]\}\}/g) ?? [],
    blocks,
    blockRanges,
    codeLinks,
    html,
    htmlRanges,
  };
}

function shortcodeContexts(body, data, file) {
  const offsets = [0, ...[...body.matchAll(/\n/g)].map((m) => m.index + 1)];
  const active = new Set();
  transformBody(body, data, file, (line, column) =>
    active.add(offsets[line] + column),
  );
  return [...body.matchAll(/\{\{[<%][\s\S]*?[>%]\}\}/g)].map((m) => ({
    token: m[0],
    active: active.has(m.index),
  }));
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
  let localRoutes;
  let streamIds;
  const siteOrigin = new URL(site.url).origin;
  const externalLinks = (links) =>
    links.filter((link) => {
      try {
        return new URL(link).origin !== siteOrigin;
      } catch {
        return true;
      } // Keep malformed URLs for normal external validation.
    });
  for (const [file, findings] of groups) {
    const target = await safePath(root, file);
    const source = await readFile(target, "utf8");
    if (findings.some((f) => f.sourceHash !== hash(source)))
      throw new Error("Article changed since scan; rescan before applying");
    const parsed = parseDocument(source, file);
    const front = source.slice(0, source.length - parsed.body.length);
    const before = protectedParts(parsed.body);
    let body = parsed.body;
    const shortcodes = [...parsed.body.matchAll(/\{\{[<%][\s\S]*?[>%]\}\}/g)];
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
      if (
        shortcodes.some(
          (match) =>
            index < match.index + match[0].length &&
            index + f.original.length > match.index,
        )
      )
        throw new Error("Finding must not overlap a shortcode");
      if (
        before.htmlRanges.some(
          ([start, end]) => index < end && index + f.original.length > start,
        )
      )
        throw new Error("Finding must not overlap raw HTML");
      const isolated =
        parsed.body.slice(0, index) +
        f.replacement +
        parsed.body.slice(index + f.original.length);
      if (
        f.kind !== "command" &&
        (before.blockRanges.some(
          ([start, end]) => index < end && index + f.original.length > start,
        ) ||
          hash(before.blocks) !== hash(protectedParts(isolated).blocks))
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
    const after = protectedParts(body);
    if (
      hash(before.markers) !== hash(after.markers) ||
      hash(before.shortcodes) !== hash(after.shortcodes)
    )
      throw new Error("Patch changes summary markers or shortcodes");
    if (
      hash(shortcodeContexts(parsed.body, parsed.data, file)) !==
      hash(shortcodeContexts(body, parsed.data, file))
    )
      throw new Error("Patch changes shortcode rendering context");
    const commandsChanged = hash(before.blocks) !== hash(after.blocks);
    if (commandsChanged && !findings.some((f) => f.kind === "command"))
      throw new Error("Code block changes require an explicit command finding");
    if (hash(before.html) !== hash(after.html))
      throw new Error("Patch changes raw HTML");
    const oldDestinations = new Set([
      ...extractDestinations(parsed.body),
      ...before.codeLinks,
    ]);
    for (const destination of [
      ...extractDestinations(body),
      ...after.codeLinks,
    ]) {
      if (oldDestinations.has(destination)) continue;
      const resolved = new URL(destination, new URL(findings[0].url, site.url));
      if (resolved.origin !== siteOrigin) continue;
      if (resolved.username || resolved.password)
        throw new Error("Internal links must not contain credentials");
      if (resolved.hash)
        throw new Error("New internal fragments require manual validation");
      localRoutes ??= await buildInventory(undefined, root, {
        productionAt: new Date(),
      });
      const route = publicRoute(decodeURIComponent(resolved.pathname));
      if (route === "/live-streams/player/") {
        streamIds ??= new Set(
          (await readJson(await safePath(root, "data/livestreams.json"))).items
            .filter((stream) => /^[A-Za-z0-9_-]{6,16}$/.test(stream.videoId))
            .map((stream) => stream.videoId),
        );
        const ids = resolved.searchParams.getAll("v");
        if (ids.length !== 1 || !streamIds.has(ids[0]))
          throw new Error(
            "Livestream player links require one known video ID in v",
          );
      }
      if (
        !localRoutes.routes.has(route) &&
        !localRoutes.redirectSources.some((pattern) =>
          redirectMatches(pattern, route),
        )
      )
        throw new Error(
          "Replacement internal link has no production route, redirect, or public asset",
        );
    }
    validateNewLinks(parsed.body, body, run, policy, (text) =>
      externalLinks(extractLinks(text)),
    );
    validateNewLinks(
      before.codeLinks,
      after.codeLinks,
      run,
      policy,
      externalLinks,
    );
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
  const appliedPath = `.content-refresh/runs/${run.id}.applied.json`;
  if (existing.every((h, i) => h === approval.patches[i].afterHash)) {
    let receipt;
    try {
      receipt = await readJson(await safePath(root, appliedPath));
    } catch {
      throw new Error("Matching files require a verified prior apply receipt");
    }
    if (receipt.version !== 1 || receipt.approvalHash !== hash(approval))
      throw new Error("Approval does not match the prior apply receipt");
    return { status: "already-applied", files: [] };
  }
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
    // Record only a fully validated successful write. Keep this proof separate
    // from the CLI receipt, which dry runs and no-op calls may overwrite.
    await writeJson(root, appliedPath, {
      version: 1,
      approvalHash: hash(approval),
      appliedAt: new Date().toISOString(),
    });
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
