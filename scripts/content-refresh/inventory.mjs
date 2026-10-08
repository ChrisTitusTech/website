import { readFile } from "node:fs/promises";
import fg from "fast-glob";
import MarkdownIt from "markdown-it";
import {
  parseDocument,
  validateDate,
  validatePost,
} from "../prepare-content.mjs";
import { isEligibleData } from "../../src/lib/content-logic.ts";
import { buildInventory, routeKey } from "../route-contract.mjs";
import { hash, safePath } from "./common.mjs";

const markdown = new MarkdownIt({ html: true, linkify: true });
// Parse even unsafe schemes for validation; this parser never renders HTML.
// The site's renderer can recognize destinations MarkdownIt normally rejects.
markdown.validateLink = () => true;

export function extractDestinations(body) {
  const links = new Set();
  const walk = (tokens) => {
    for (const token of tokens) {
      if (token.type === "link_open") links.add(token.attrGet("href"));
      if (token.type === "image") links.add(token.attrGet("src"));
      if (token.type === "html_block" || token.type === "html_inline")
        for (const match of token.content.matchAll(
          /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi,
        ))
          links.add(match[1]);
      if (token.children) walk(token.children);
    }
  };
  walk(markdown.parse(body, {}));
  return [...links].filter((url) => typeof url === "string");
}

export function extractLinks(body) {
  const links = extractDestinations(body);
  return [
    ...new Set(
      [...links]
        .filter((url) => /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i.test(url))
        .map((url) => {
          const absolute = url.startsWith("//") ? `https:${url}` : url;
          try {
            return new URL(absolute).href;
          } catch {
            return absolute;
          }
        }),
    ),
  ].sort();
}

export async function inventory(
  root,
  policy,
  instant = new Date(),
  history = {},
) {
  if (!Number.isFinite(instant.getTime()))
    throw new Error("Invalid inventory instant");
  const contract = await buildInventory(undefined, root);
  const documents = [],
    excluded = [],
    seen = new Set();
  for (const file of (
    await fg("src/content/**/*.md", { cwd: root, followSymbolicLinks: false })
  ).sort()) {
    const source = await readFile(await safePath(root, file), "utf8");
    const { data, body } = parseDocument(source, file);
    const post = file.startsWith("src/content/posts/");
    if (data.build?.render === "never") {
      excluded.push({ file, reason: "render-never" });
      continue;
    }
    if (post) validatePost(data, file);
    if (data.date !== undefined) validateDate(data.date, file);
    if (data.draft !== undefined && typeof data.draft !== "boolean")
      throw new Error("Invalid draft field");
    if (!isEligibleData(data, instant, false)) {
      excluded.push({ file, reason: data.draft === true ? "draft" : "future" });
      continue;
    }
    const derived = file
      .replace(/^src\/content\//, "")
      .replace(/\.md$/, "")
      .replace(/\/_?index$/, "");
    const url = routeKey(data.url ?? `/${derived}/`);
    if (!contract.routes.has(url)) throw new Error(`Unmapped route: ${file}`);
    if (policy.generated.includes(url)) {
      excluded.push({ file, reason: "generated-route", url });
      continue;
    }
    if (seen.has(url)) throw new Error(`Ambiguous route: ${url}`);
    seen.add(url);
    const contentHash = hash(source),
      last = history[url];
    const lastSuccessfulCheck =
      last?.contentHash === contentHash ? last.checkedAt : null;
    const nextCheck = lastSuccessfulCheck
      ? new Date(
          Date.parse(lastSuccessfulCheck) + policy.recheckDays * 86400000,
        ).toISOString()
      : null;
    documents.push({
      file,
      url,
      title: data.title,
      date: data.date ?? null,
      contentHash,
      links: extractLinks(body),
      policy: policy.reportOnly.includes(url)
        ? "report-only"
        : policy.historical.includes(url)
          ? "historical"
          : "editable",
      lastSuccessfulCheck,
      nextCheck,
      due: !nextCheck || nextCheck <= instant.toISOString(),
      timeSensitive:
        /\b(latest|current|supported|version|install|download)\b/i.test(body),
    });
  }
  documents.sort(
    (a, b) =>
      Number(b.due) - Number(a.due) ||
      Number(b.timeSensitive) - Number(a.timeSensitive) ||
      (a.nextCheck ?? "").localeCompare(b.nextCheck ?? "") ||
      a.url.localeCompare(b.url),
  );
  return {
    version: 1,
    instant: instant.toISOString(),
    documents,
    excluded,
    generatedRouteCount: [...contract.routes].filter((url) => !seen.has(url))
      .length,
  };
}
