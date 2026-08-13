#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import YAML from "yaml";

import { isEligibleData } from "../src/lib/content-logic.ts";

const root = process.cwd();
const baseline = JSON.parse(await readFile(path.join(root, "tests/baseline/hugo-public.json"), "utf8"));
const required = baseline.output.publicFiles.filter((file) => file.endsWith(".html") || file.endsWith(".xml") || file === "index.json");
const missing = [];
for (const file of required) {
  try { await stat(path.join(root, "dist", file)); } catch { missing.push(file); }
}
if (missing.length) throw new Error(`missing ${missing.length} baseline routes:\n${missing.join("\n")}`);

for (const file of ["_headers", "_redirects", "index.json", "index.xml", "sitemap.xml", "404.html"]) await stat(path.join(root, "dist", file));
const redirects = await readFile(path.join(root, "dist/_redirects"), "utf8");
for (const line of redirects.split(/\r?\n/).map((value) => value.trim()).filter((value) => value && !value.startsWith("#"))) {
  const [source, , status = "302"] = line.split(/\s+/);
  if (/^https?:\/\//i.test(source)) throw new Error(`domain-level redirect source is unsupported: ${source}`);
  if (status === "200" && /^https?:\/\//i.test(line.split(/\s+/)[1])) throw new Error(`external 200 proxy is unsupported: ${line}`);
}
for (const expected of [
  "/setup-qemu-in-archlinux/ /vm-setup-in-linux/ 301",
  "/winget https://github.com/ChrisTitusTech/winutil/releases/latest/download/winutil.ps1 302",
]) if (!redirects.includes(expected)) throw new Error(`redirect is missing: ${expected}`);

const headers = await readFile(path.join(root, "dist/_headers"), "utf8");
for (const expected of ["X-Frame-Options: SAMEORIGIN", "X-Content-Type-Options: nosniff", "/_astro/*", "/index.xml", "/sitemap.xml"]) {
  if (!headers.includes(expected)) throw new Error(`_headers is missing ${expected}`);
}
const headerLines = headers.split(/\r?\n/);
const headerPolicy = (pattern) => {
  const start = headerLines.findIndex((line) => line.trim() === pattern);
  if (start === -1) return "";
  const values = [];
  for (let index = start + 1; index < headerLines.length && /^\s+\S/.test(headerLines[index]); index += 1) {
    values.push(headerLines[index].trim());
  }
  return values.join("\n");
};
const astroPolicy = headerPolicy("/_astro/*");
if (!astroPolicy.includes("immutable")) throw new Error("/_astro/* must use immutable caching");
for (const prefix of ["/css/*", "/js/*"]) {
  const policy = headerPolicy(prefix);
  if (policy.includes("immutable")) throw new Error(`${prefix} must not use immutable caching`);
}

const search = JSON.parse(await readFile(path.join(root, "dist/index.json"), "utf8"));
if (search.length !== baseline.output.semantic.search.length) throw new Error(`search count ${search.length} does not match baseline ${baseline.output.semantic.search.length}`);
for (const item of search) for (const key of ["title", "tags", "categories", "contents", "permalink"]) if (!(key in item)) throw new Error(`search entry is missing ${key}`);
const buildState = JSON.parse(await readFile(path.join(root, ".astro-content/build.json"), "utf8"));
const postFiles = await fg(".astro-content/posts/**/*.md", { cwd: root, onlyFiles: true });
const expectedPosts = [];
const excludedPosts = [];
for (const file of postFiles) {
  const source = await readFile(path.join(root, file), "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = YAML.parse(match[1]);
  (isEligibleData(data, new Date(buildState.buildInstant), false) ? expectedPosts : excludedPosts).push(data);
}
const searchUrls = new Set(search.map((item) => new URL(item.permalink).pathname));
const expectedUrls = new Set(expectedPosts.map((post) => post.url));
if (searchUrls.size !== search.length) throw new Error("search contains duplicate permalinks");
for (const url of expectedUrls) if (!searchUrls.has(url)) throw new Error(`published post is missing from search: ${url}`);
for (const post of excludedPosts) if (searchUrls.has(post.url)) throw new Error(`excluded post leaked into search: ${post.url}`);

const sitemap = await readFile(path.join(root, "dist/sitemap.xml"), "utf8");
const feed = await readFile(path.join(root, "dist/index.xml"), "utf8");
for (const post of expectedPosts) {
  if (post.sitemap?.disable !== true && !sitemap.includes(`https://christitus.com${post.url}`)) throw new Error(`published post is missing from sitemap: ${post.url}`);
  if (!feed.includes(`https://christitus.com${post.url}`)) throw new Error(`published post is missing from RSS: ${post.url}`);
}
for (const post of excludedPosts) {
  if (sitemap.includes(`https://christitus.com${post.url}`)) throw new Error(`excluded post leaked into sitemap: ${post.url}`);
  if (feed.includes(`https://christitus.com${post.url}`)) throw new Error(`excluded post leaked into RSS: ${post.url}`);
}
for (const disabled of ["/search/", "/live-streams/player/", "/rss/"]) {
  if (sitemap.includes(`https://christitus.com${disabled}`)) throw new Error(`sitemap-disabled route leaked into sitemap: ${disabled}`);
}

const defender = await readFile(path.join(root, "dist/bad-windows-defender/index.html"), "utf8");
for (const value of ["Extended Validation", "Regular Validation", "DigiCert"]) if (!defender.includes(value)) throw new Error(`table shortcode output is missing ${value}`);
const notice = await readFile(path.join(root, "dist/topgrade-linux/index.html"), "utf8");
if (!notice.includes("notice-tip") || !notice.includes("notice-note")) throw new Error("notice shortcodes did not render");

const sourceImage = await readFile(path.join(root, "content/posts/2023/english.png"));
const publicImage = await readFile(path.join(root, "dist/posts/2023/english.png"));
const digest = (value) => createHash("sha256").update(value).digest("hex");
if (digest(sourceImage) !== digest(publicImage)) throw new Error("english.png is not byte-identical");

const htmlFiles = await fg("dist/**/*.html", { cwd: root, onlyFiles: true });
for (const file of htmlFiles) {
  const html = await readFile(path.join(root, file), "utf8");
  const visible = html.replace(/<pre\b[\s\S]*?<\/pre>/gi, "").replace(/<code\b[\s\S]*?<\/code>/gi, "");
  if (/\{\{(?:&lt;|<)/.test(visible)) throw new Error(`${file} contains unresolved Hugo template syntax`);
}
const representative = await readFile(path.join(root, "dist/my-ai-workflow/index.html"), "utf8");
const jsonLd = representative.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
if (!jsonLd) throw new Error("representative article is missing JSON-LD");
const graph = JSON.parse(jsonLd);
for (const type of ["WebSite", "WebPage", "BlogPosting", "BreadcrumbList"]) {
  if (!graph["@graph"].some((entry) => entry["@type"] === type)) throw new Error(`JSON-LD is missing ${type}`);
}

console.log(`Validated ${required.length} Hugo contract routes and ${search.length} search entries`);
