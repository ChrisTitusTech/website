#!/usr/bin/env node

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

import fg from "fast-glob";
import MarkdownIt from "markdown-it";
import YAML from "yaml";

import site from "../src/data/site.json" with { type: "json" };

const root = process.cwd();
const outputRoot = path.join(root, ".astro-content");
const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});
const canonicalCategories = new Set(site.categories);
const legacyUncategorized = new Set(site.legacyUncategorizedUrls);
const legacyPairs = new Map(Object.entries(site.legacyCategoryPairs));

export function parseDocument(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`${file}: missing YAML front matter`);
  return {
    data: YAML.parse(match[1]) ?? {},
    body: source.slice(match[0].length),
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shortcodeArgs(text) {
  const values = {};
  for (const match of text.matchAll(
    /([\w-]+)=(?:"([^"]*)"|'([^']*)'|([^\s]+))/g,
  )) {
    values[match[1]] = match[2] ?? match[3] ?? match[4];
  }
  return values;
}

function renderTable(name, tables, file) {
  const rows = tables?.[name];
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(
      `${file}: table shortcode references missing table ${name}`,
    );
  }
  const [headers, ...body] = rows;
  return [
    '<div class="table-scroll"><table>',
    `<thead><tr>${headers.map((cell) => `<th scope="col">${escapeHtml(cell)}</th>`).join("")}</tr></thead>`,
    `<tbody>${body
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`,
      )
      .join("")}</tbody>`,
    "</table></div>",
  ].join("");
}

function renderShortcode(name, rawArgs, data, file) {
  const argument = rawArgs.trim().replace(/^(["'])(.*)\1$/, "$2");
  if (name === "youtube") {
    if (!/^[A-Za-z0-9_-]+$/.test(argument)) {
      throw new Error(`${file}: invalid YouTube video ID`);
    }
    return `<div class="media-embed"><iframe src="https://www.youtube-nocookie.com/embed/${argument}" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
  }
  if (name === "x") {
    const args = shortcodeArgs(rawArgs);
    if (!args.user || !/^\d+$/.test(args.id ?? "")) {
      throw new Error(`${file}: invalid X shortcode`);
    }
    const url = `https://x.com/${encodeURIComponent(args.user)}/status/${args.id}`;
    return `<blockquote class="x-embed"><a href="${url}">View post by @${escapeHtml(args.user)} on X</a></blockquote>`;
  }
  if (name === "table") return renderTable(argument, data.tables, file);
  if (name === "shopify") {
    return '<div class="shopify-products" data-shopify-products><button class="primary-button" type="button" data-shopify-load>Load digital downloads</button><p><a href="https://www.cttstore.com/">Or browse the CTT Store directly</a></p></div>';
  }
  throw new Error(`${file}: unsupported active Hugo shortcode ${name}`);
}

function replaceOutsideInlineCode(line, data, file) {
  let result = "";
  let cursor = 0;
  let codeFence = null;
  for (let index = 0; index < line.length;) {
    if (line[index] === "`") {
      let end = index;
      while (line[end] === "`") end += 1;
      const ticks = line.slice(index, end);
      if (codeFence === null) codeFence = ticks;
      else if (ticks === codeFence) codeFence = null;
      result += line.slice(cursor, end);
      cursor = end;
      index = end;
      continue;
    }
    const opener = line.slice(index, index + 3);
    if (codeFence === null && (opener === "{{<" || opener === "{{%")) {
      const closer = opener === "{{<" ? ">}}" : "%}}";
      const end = line.indexOf(closer, index + 3);
      if (end === -1) throw new Error(`${file}: unterminated Hugo shortcode`);
      result += line.slice(cursor, index);
      const token = line.slice(index + 3, end).trim();
      const match = token.match(/^([\w-]+)([\s\S]*)$/);
      if (!match) throw new Error(`${file}: malformed Hugo shortcode`);
      result += renderShortcode(match[1], match[2], data, file);
      cursor = end + 3;
      index = cursor;
      continue;
    }
    index += 1;
  }
  return (result + line.slice(cursor))
    .replaceAll("](../images/", "](/images/")
    .replaceAll('src="../images/', 'src="/images/')
    .replaceAll("src='../images/", "src='/images/");
}

export function transformBody(body, data, file) {
  const lines = body.split(/\r?\n/);
  const output = [];
  let fenced = null;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fence = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (fence) {
      const delimiter = fence[1];
      const remainder = fence[2];
      const closesOnSameLine = remainder.includes(delimiter);
      if (fenced === null && !closesOnSameLine) fenced = delimiter;
      else if (
        fenced !== null &&
        delimiter[0] === fenced[0] &&
        delimiter.length >= fenced.length &&
        remainder.trim() === ""
      )
        fenced = null;
      output.push(
        fenced !== null && /^\s*```fstab\s*$/.test(line)
          ? line.replace(/fstab\s*$/, "text")
          : line,
      );
      continue;
    }
    if (fenced !== null) {
      output.push(line);
      continue;
    }
    const notice = line.match(
      /^\s*(?:\{\{<\s*notice\s+(tip|note)\s*>}}|\{\{%\s*notice\s+(tip|note)\s*%}})\s*$/,
    );
    if (notice) {
      const noticeType = notice[1] ?? notice[2];
      const noticeBody = [];
      index += 1;
      while (
        index < lines.length &&
        !/^\s*(?:\{\{<\s*\/notice\s*>}}|\{\{%\s*\/notice\s*%}})\s*$/.test(
          lines[index],
        )
      ) {
        noticeBody.push(lines[index]);
        index += 1;
      }
      if (index === lines.length)
        throw new Error(`${file}: unclosed notice shortcode`);
      output.push(
        `<aside class="notice notice-${noticeType}" role="note"><p class="notice-title">${noticeType === "tip" ? "Tip" : "Note"}</p>${markdown.render(noticeBody.join("\n"))}</aside>`,
      );
      continue;
    }
    if (/\{\{(?:<\s*\/notice\s*>|%\s*\/notice\s*%)}}/.test(line)) {
      throw new Error(`${file}: unmatched notice shortcode`);
    }
    output.push(replaceOutsideInlineCode(line, data, file));
  }
  return output.join("\n");
}

export function validateDate(value, file) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const parsed = new Date(`${value}T00:00:00Z`);
    if (
      Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== value
    ) {
      throw new Error(`${file}: invalid date ${value}`);
    }
    return;
  }
  const timestamp = value.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(?:Z|[+-](\d{2}):(\d{2}))$/,
  );
  if (timestamp) {
    const [
      ,
      year,
      month,
      day,
      hour,
      minute,
      second = "00",
      offsetHour = "00",
      offsetMinute = "00",
    ] = timestamp;
    const calendar = new Date(`${year}-${month}-${day}T00:00:00Z`);
    if (
      Number.isNaN(calendar.getTime()) ||
      calendar.toISOString().slice(0, 10) !== `${year}-${month}-${day}` ||
      Number(hour) > 23 ||
      Number(minute) > 59 ||
      Number(second) > 59 ||
      Number(offsetHour) > 23 ||
      Number(offsetMinute) > 59 ||
      Number.isNaN(Date.parse(value))
    )
      throw new Error(`${file}: invalid date ${value}`);
    return;
  }
  throw new Error(`${file}: date must be YYYY-MM-DD or include a UTC offset`);
}

export function validatePost(data, file) {
  if (typeof data.title !== "string" || data.title.length === 0)
    throw new Error(`${file}: title is required`);
  if (typeof data.date !== "string")
    throw new Error(`${file}: date must remain a string`);
  validateDate(data.date, file);
  if (
    typeof data.url !== "string" ||
    !/^\/[A-Za-z0-9][A-Za-z0-9_-]*\/$/.test(data.url)
  )
    throw new Error(`${file}: explicit trailing-slash URL is required`);
  if (data.draft !== undefined && typeof data.draft !== "boolean")
    throw new Error(`${file}: draft must be a boolean`);
  if (
    data.featuredOrder !== undefined &&
    ![1, 2, 3].includes(data.featuredOrder)
  ) {
    throw new Error(`${file}: featuredOrder must be 1, 2, or 3`);
  }
  const categories = data.categories ?? [];
  if (!Array.isArray(categories))
    throw new Error(`${file}: categories must be an array`);
  if (categories.length === 0 && !legacyUncategorized.has(data.url)) {
    throw new Error(`${file}: at least one category is required`);
  }
  for (const category of categories) {
    if (canonicalCategories.has(category)) continue;
    if (legacyPairs.get(data.url) === category) continue;
    throw new Error(
      `${file}: category ${category} is not valid for ${data.url}`,
    );
  }
}

function normalizeData(data, relative) {
  const normalized = {
    ...data,
    categories: data.categories ?? [],
    tags: data.tags ?? [],
    _sourcePath: relative,
  };
  delete normalized.layout;
  return normalized;
}

export async function prepareContent() {
  await rm(outputRoot, { recursive: true, force: true });
  const files = await fg("content/**/*.md", { cwd: root, onlyFiles: true });
  const urls = new Map();
  for (const relative of files.sort()) {
    const source = await readFile(path.join(root, relative), "utf8");
    const parsed = parseDocument(source, relative);
    if (parsed.data.build?.render === "never") continue;
    const data = normalizeData(parsed.data, relative);
    const post = relative.startsWith("content/posts/");
    if (post) {
      validatePost(data, relative);
      const normalizedUrl = `/${data.url.split("/").filter(Boolean).join("/")}/`;
      if (urls.has(normalizedUrl))
        throw new Error(
          `${relative}: duplicate URL with ${urls.get(normalizedUrl)}`,
        );
      urls.set(normalizedUrl, relative);
    }
    const destinationRelative = post
      ? relative.slice("content/posts/".length)
      : relative.slice("content/".length).replace(/_index\.md$/, "index.md");
    const destination = path.join(
      outputRoot,
      post ? "posts" : "pages",
      destinationRelative,
    );
    await mkdir(path.dirname(destination), { recursive: true });
    const transformed = transformBody(parsed.body, data, relative);
    const frontmatter = YAML.stringify(data).replace(
      /^date: .*$/m,
      `date: ${JSON.stringify(data.date)}`,
    );
    await writeFile(
      destination,
      `---\n${frontmatter}---\n${transformed}`,
      "utf8",
    );
  }

  const preview = process.env.CONTENT_PREVIEW === "1";
  const buildInstant = process.env.BUILD_INSTANT ?? new Date().toISOString();
  if (Number.isNaN(Date.parse(buildInstant)))
    throw new Error("BUILD_INSTANT must be an ISO timestamp");
  await writeFile(
    path.join(outputRoot, "build.json"),
    `${JSON.stringify({ buildInstant, preview }, null, 2)}\n`,
    "utf8",
  );

  console.log(
    `Prepared ${files.length} Markdown sources (${preview ? "content preview" : "production"})`,
  );
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await prepareContent();
}
