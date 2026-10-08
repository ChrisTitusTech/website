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
import {
  validateFindings,
  validateNewLinks,
  addedOccurrences,
} from "./findings.mjs";
import { extractDestinations } from "./inventory.mjs";
import {
  networkCommandArguments,
  implicitNetworkPrefix,
} from "./network-commands.mjs";
import {
  buildInventory,
  publicRoute,
  redirectMatches,
} from "../route-contract.mjs";

function filesystemArgument(prefix, destination) {
  return (
    /\b(?:readFile|readFileSync|writeFile|writeFileSync|mkdir|mkdirSync|readdir|readdirSync|stat|statSync|unlink|unlinkSync)\s*\(\s*$/.test(
      prefix,
    ) ||
    /(?:^|\n)\s*(?:sudo\s+)?(?:ssh-add|cp|mv|rm|mkdir|rmdir|chmod|chown|cat|ls|cd|touch)\s+(?:[^\n;|&$()<>`]*\s+)?$/.test(
      prefix,
    ) ||
    (/^\.{1,2}\//.test(destination) && /(?:^|\n)\s*$/.test(prefix))
  );
}

function codeUrls(text) {
  const { urls, nonUrlRanges } = networkCommandArguments(text);
  const filesystemStrings = [...nonUrlRanges];
  // Bare relative references need context or a path-shaped literal. Ordinary
  // strings are not URLs; filesystem arguments remain separately classified.
  for (const match of text.matchAll(/(["'`])((?:\\[\s\S]|(?!\1)[^\\])*)\1/g)) {
    const destination = match[2];
    const prefix = text.slice(0, match.index);
    const nonUrl =
      filesystemArgument(prefix, destination) ||
      filesystemStrings.some(
        ([start, end]) => match.index >= start && match.index < end,
      );
    if (nonUrl)
      filesystemStrings.push([match.index, match.index + match[0].length]);
    if (/^(?:\/|\.{1,2}\/|[a-z][a-z0-9+.-]*:\/\/)/i.test(destination)) continue;
    const urlContext =
      /(?:\b(?:fetch|Request|URL|Worker|SharedWorker|WebSocket|EventSource|importScripts|sendBeacon|url)|\b(?:axios|requests|http|https)\.(?:get|post|put|patch|delete|head|request)|\b(?:window|location)\.(?:open|assign|replace)|\bserviceWorker\.register)\s*\(\s*$/i.test(
        prefix,
      ) ||
      /\.\s*open\s*\([^,]*,\s*$/.test(prefix) ||
      /\b(?:href|src|action|poster|url|endpoint)["']?\s*[:=]\s*$/.test(prefix);
    const pathShaped =
      /^[^\s/:<>{}\[\]]+\//.test(destination) ||
      /^(?:https?|ftp|file|data|javascript|mailto|tel):/i.test(destination);
    if (destination && (urlContext || pathShaped) && !nonUrl)
      urls.push(destination);
  }
  for (const match of text.matchAll(
    /\b(?:href|src|action|poster|url|endpoint)["']?\s*[:=]\s*(["'`])((?:\\[\s\S]|(?!\1)[^\\])*)\1/gi,
  )) {
    if (
      !filesystemStrings.some(
        ([start, end]) => match.index >= start && match.index < end,
      )
    )
      urls.push(match[2]);
  }
  for (const match of text.matchAll(
    /\b(?:href|src|action|poster)\s*=\s*([^\s"'`<>]+)|\b(?:url|endpoint)\s*:\s*([^\s"'`<>]+)|\burl\(\s*([^\s"'`)]+)\s*\)/gi,
  )) {
    if (
      !filesystemStrings.some(
        ([start, end]) => match.index >= start && match.index < end,
      )
    )
      urls.push(match[1] ?? match[2] ?? match[3]);
  }
  const starts =
    /\b[a-z][a-z0-9+.-]*:\/\/|(?:^|(?<=["'`=:(\s]))(?:\/{1,2}|\.{1,2}\/)/gi;
  for (let match; (match = starts.exec(text));) {
    const quote = text[match.index - 1];
    const quoted = quote === '"' || quote === "'" || quote === "`";
    const prefix = text.slice(0, match.index - (quoted ? 1 : 0));
    let end = starts.lastIndex;
    if (quoted) {
      while (end < text.length && text[end] !== quote) {
        end += text[end] === "\\" ? 2 : 1;
      }
    } else {
      const delimiter = /\burl\(\s*$/i.test(prefix) ? /[\s<>`)]/ : /[\s<>`]/;
      while (end < text.length && !delimiter.test(text[end])) end++;
    }
    const destination = text.slice(match.index, end);
    // Relative paths are ambiguous. Exempt only recognizable filesystem
    // arguments; unknown contexts must still pass destination validation.
    // Enumerating network APIs would silently miss new URL-taking forms.
    const filesystemContext =
      filesystemArgument(prefix, destination) ||
      filesystemStrings.some(
        ([start, end]) => match.index >= start && match.index < end,
      );
    const syntaxOnly =
      !quoted &&
      !/[=:(]\s*$/.test(prefix) &&
      (destination === "/" ||
        destination === "//" ||
        destination.startsWith("/*"));
    if (
      !syntaxOnly &&
      (!/^\/(?!\/)|^\.{1,2}\//.test(destination) || !filesystemContext)
    )
      urls.push(destination);
    starts.lastIndex = end + 1;
  }
  return urls;
}

function htmlOccurrenceContexts(body, tokens, markdown) {
  const htmlRule = markdown.inline.ruler
    .getRules("")
    .find((rule) => rule.name === "html_inline");
  if (!htmlRule)
    throw new Error("HTML occurrence tracking requires manual validation");
  const scan = (text) => {
    const state = new markdown.inline.State(text, markdown, {}, []);
    const occurrences = [];
    for (let position = text.indexOf("<"); position !== -1;) {
      state.pos = position;
      if (htmlRule(state, false)) {
        occurrences.push({
          token: state.tokens.at(-1).content.replace(/\r\n?/g, "\n"),
          position,
          end: state.pos,
        });
        position = text.indexOf("<", state.pos);
      } else position = text.indexOf("<", position + 1);
    }
    return occurrences;
  };
  const parsed = [];
  const walk = (items, literal = false) => {
    for (const token of items) {
      if (token.children)
        walk(token.children, literal || token.type === "image");
      else if (token.content)
        parsed.push(
          ...scan(token.content).map((item) => ({
            ...item,
            active:
              !literal && ["html_inline", "html_block"].includes(token.type),
          })),
        );
    }
  };
  walk(tokens);
  const protectedTags = new Set(
    parsed.filter((item) => item.active).map((item) => item.token),
  );
  const raw = scan(body).filter((item) => protectedTags.has(item.token));
  const contexts = parsed.filter((item) => protectedTags.has(item.token));
  if (
    hash(raw.map((item) => item.token)) !==
    hash(contexts.map((item) => item.token))
  )
    throw new Error(
      "Ambiguous raw HTML occurrence mapping requires manual validation",
    );
  return raw.map((item, index) => ({
    ...item,
    active: contexts[index].active,
  }));
}

function protectedParts(body) {
  const markdown = new MarkdownIt({ html: true });
  const tokens = markdown.parse(body, {});
  const codeBlocks = tokens.filter(
    (t) => t.type === "fence" || t.type === "code_block",
  );
  const blocks = codeBlocks.map((t) => ({
    type: t.type,
    content: t.content,
    info: t.info,
  }));
  const blockContexts = codeBlocks.map((t) => {
    const index = tokens.indexOf(t);
    return {
      before:
        tokens
          .slice(0, index)
          .reverse()
          .find((token) => token.content.trim())?.content ?? "",
      after:
        tokens.slice(index + 1).find((token) => token.content.trim())
          ?.content ?? "",
      lines: t.map,
    };
  });
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
    .flatMap((t) => codeUrls(t.content));

  const html = tokens
    .flatMap((t) => [t, ...(t.children ?? [])])
    .filter((t) => t.type === "html_block" || t.type === "html_inline")
    .map((t) => t.content);
  const htmlContexts = htmlOccurrenceContexts(body, tokens, markdown);
  const htmlBlocks = tokens
    .filter((token) => token.type === "html_block")
    .map((token) => ({
      token: token.content,
      position: lineOffsets[token.map[0]],
      end: lineOffsets[token.map[1]] ?? body.length,
      active: true,
    }));
  const htmlRanges = [
    ...htmlBlocks,
    ...htmlContexts.filter((item) => item.active),
  ].map((item) => [item.position, item.end]);
  return {
    markers: body.match(/<!--more-->/g) ?? [],
    shortcodes: body.match(/\{\{[<%][\s\S]*?[>%]\}\}/g) ?? [],
    blocks,
    blockContexts,
    inlineCode: tokens
      .flatMap((t) => t.children ?? [])
      .filter((t) => t.type === "code_inline")
      .map((t) => t.content),
    inlineCodeContexts: tokens
      .filter((t) => t.children?.some((child) => child.type === "code_inline"))
      .map((t) => ({ content: t.content, lines: t.map })),
    blockRanges,
    codeLinks,
    html,
    htmlContexts: [
      ...htmlBlocks,
      ...htmlContexts.filter((item) => item.active),
    ],
    htmlRanges,
  };
}

function destinationOccurrences(body, parts = protectedParts(body)) {
  return [...extractDestinations(body, { unique: false }), ...parts.codeLinks];
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

function hasCalendarDate(text) {
  return [...text.matchAll(/\b\d{4}-\d{2}-\d{2}\b/g)].some(([date]) => {
    const parsed = new Date(`${date}T00:00:00.000Z`);
    return (
      Number(date.slice(0, 4)) > 0 &&
      Number.isFinite(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === date
    );
  });
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
  for (const [file, findings] of groups) {
    const target = await safePath(root, file);
    const source = await readFile(target, "utf8");
    if (findings.some((f) => f.sourceHash !== hash(source)))
      throw new Error("Article changed since scan; rescan before applying");
    const parsed = parseDocument(source, file);
    const front = source.slice(0, source.length - parsed.body.length);
    const before = protectedParts(parsed.body);
    const originalDestinations = destinationOccurrences(parsed.body, before);
    const editedDestinations = [];
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
        (!originalDestinations.includes(f.original) ||
          ![f.original, f.replacement].every((value) =>
            /^[^\s<>]+$/.test(value),
          ))
      )
        throw new Error("Link findings may replace only a URL");
      if (f.kind === "link") editedDestinations.push(f.replacement);
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
      const isolatedParts = protectedParts(isolated);
      const isolatedDestinations = destinationOccurrences(
        isolated,
        isolatedParts,
      );
      const inContext = new Set(isolatedDestinations);
      // Validate links within the edited snippet, plus destinations changed by
      // partial-token edits in their full surrounding Markdown/code context.
      editedDestinations.push(
        ...destinationOccurrences(f.replacement).filter((url) =>
          inContext.has(url),
        ),
        ...addedOccurrences(originalDestinations, isolatedDestinations),
      );
      if (
        f.kind !== "command" &&
        (before.blockRanges.some(
          ([start, end]) => index < end && index + f.original.length > start,
        ) ||
          hash(before.blocks) !== hash(isolatedParts.blocks))
      )
        throw new Error(
          "Each code block edit requires an explicit command finding",
        );
      if (f.kind === "notice") {
        const retained = f.replacement.indexOf(f.original);
        const additions =
          retained < 0
            ? []
            : [
                f.replacement.slice(0, retained),
                f.replacement.slice(retained + f.original.length),
              ];
        if (
          retained < 0 ||
          f.replacement.indexOf(f.original, retained + f.original.length) !==
            -1 ||
          !additions.some(hasCalendarDate)
        )
          throw new Error(
            "Notices must retain the original and add a valid calendar date",
          );
      }
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
    const shifted = (position) =>
      position +
      edits.reduce(
        (offset, edit) =>
          offset +
          (edit.index + edit.original.length <= position
            ? edit.replacement.length - edit.original.length
            : 0),
        0,
      );
    const expectedHtml = before.htmlContexts.map((item) => ({
      ...item,
      position: shifted(item.position),
      end: shifted(item.end),
    }));
    if (hash(expectedHtml) !== hash(after.htmlContexts))
      throw new Error("Patch changes raw HTML rendering context");
    const requiredDestinations = new Set([
      ...editedDestinations,
      ...addedOccurrences(
        originalDestinations,
        destinationOccurrences(body, after),
      ),
    ]);
    const externalDestinations = [];
    for (const destination of requiredDestinations) {
      if (destination.startsWith(implicitNetworkPrefix))
        throw new Error(
          "Network commands require explicit HTTPS URLs; ambiguous targets need manual validation",
        );
      if (/[\\\s]/.test(destination))
        throw new Error(
          "Ambiguous URL escaping or whitespace requires manual validation",
        );
      const resolved = new URL(destination, new URL(findings[0].url, site.url));
      if (resolved.origin !== siteOrigin) {
        externalDestinations.push(resolved.href);
        continue;
      }
      if (resolved.username || resolved.password)
        throw new Error("Internal links must not contain credentials");
      if (resolved.hash)
        throw new Error("New internal fragments require manual validation");
      localRoutes ??= await buildInventory(undefined, root, {
        productionAt: new Date(),
      });
      if (/%(?:2f|5c|3f|23)/i.test(resolved.pathname))
        throw new Error("Replacement internal link has a noncanonical path");
      const pathname = decodeURIComponent(resolved.pathname);
      const route = publicRoute(pathname);
      if (
        pathname.includes("//") ||
        (pathname.endsWith("/") && !route.endsWith("/"))
      )
        throw new Error("Replacement internal link has a noncanonical path");
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
    validateNewLinks([], externalDestinations, run, policy, (links) => links);
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
        hash(before.inlineCode) !== hash(after.inlineCode) ||
        hash(before.inlineCodeContexts) !== hash(after.inlineCodeContexts) ||
        hash(before.blockContexts) !== hash(after.blockContexts) ||
        /\b(ssh|security|password|powershell|registry)\b/i.test(
          `${source}\n${result}`,
        ),
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
