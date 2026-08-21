#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import YAML from "yaml";

import { isEligibleData } from "../src/lib/content-logic.ts";
import { renderFeedContent } from "../src/lib/feed-content.ts";

const root = process.cwd();
const baseline = JSON.parse(
  await readFile(path.join(root, "tests/baseline/hugo-public.json"), "utf8"),
);
const htmlAttribute = (html, selector, attribute) => {
  const tag = html.match(selector)?.[0];
  return tag?.match(new RegExp(`\\b${attribute}=["']([^"']*)["']`, "i"))?.[1];
};
const metadataValue = (html, attribute, name) =>
  htmlAttribute(
    html,
    new RegExp(
      `<meta\\b(?=[^>]*\\b${attribute}=["']${name.replaceAll(":", "\\:")}["'])[^>]*>`,
      "i",
    ),
    "content",
  );
const structuredTypes = (value, result = new Set()) => {
  if (Array.isArray(value)) {
    for (const item of value) structuredTypes(item, result);
  } else if (value && typeof value === "object") {
    const type = value["@type"];
    if (Array.isArray(type)) for (const item of type) result.add(item);
    else if (typeof type === "string") result.add(type);
    for (const item of Object.values(value)) structuredTypes(item, result);
  }
  return result;
};
const decodeXml = (value) =>
  value.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity) => {
    if (entity.startsWith("#")) {
      const hex = entity[1].toLowerCase() === "x";
      return String.fromCodePoint(
        Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10),
      );
    }
    return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[
      entity.toLowerCase()
    ];
  });
const required = baseline.output.publicFiles.filter(
  (file) =>
    file.endsWith(".html") || file.endsWith(".xml") || file === "index.json",
);
const hugoGeneratedBundles = new Set([
  "css/style.min.813eb079a91fe2c2841894d173687e2fbf88270e951b8eb48ec6e99945260d874847e012be897eb2ad92c56d1296d1fd43685366e89518e20213c1a5bcbfefde.css",
  "css/vendor/bootstrap.min.3c8f27e6009ccfd710a905e6dcf12d0ee3c6f2ac7da05b0572d3e0d12e736fc8.css",
  "js/search-bundle.min.395396a70933984f628e0db1d20296c5ac294fdab03c4c42ddc1a29ad1711a27ae93b9be1e2ed48e84596064a6d9e924d7daeb3bac8666295ab35771dc47f3a8.js",
  "js/shopify-button.16c50dc28234a6f0522d3f791256c26291e20545e7573aeae24102e8681b51f1.js",
  "js/vendor.min.0fd57716441f97e6f7b50c71fe2b67a7038054c97a6d2546e490f57e70b8efcfd4aa00c7ec1a2b26e10d37147c8bf983992d7a5c686237cc49d3e23505e3d0b4.js",
]);
const requiredStatic = baseline.output.publicFiles.filter(
  (file) => !required.includes(file) && !hugoGeneratedBundles.has(file),
);
const missing = [];
for (const file of [...required, ...requiredStatic]) {
  try {
    await stat(path.join(root, "dist", file));
  } catch {
    missing.push(file);
  }
}
if (missing.length)
  throw new Error(
    `missing ${missing.length} baseline routes:\n${missing.join("\n")}`,
  );
const normalizeFeedBody = (value) => value.replace(/>\s+</g, "><").trim();

for (const file of [
  "_headers",
  "_redirects",
  "index.json",
  "index.xml",
  "sitemap.xml",
  "404.html",
])
  await stat(path.join(root, "dist", file));

const faviconManifest = JSON.parse(
  await readFile(path.join(root, "dist/favicon/manifest.json"), "utf8"),
);
for (const icon of faviconManifest.icons) {
  await stat(path.join(root, "dist", icon.src.replace(/^\//, "")));
}
const browserConfig = await readFile(
  path.join(root, "dist/favicon/browserconfig.xml"),
  "utf8",
);
for (const [, source] of browserConfig.matchAll(/\bsrc=["']([^"']+)["']/g)) {
  await stat(path.join(root, "dist", source.replace(/^\//, "")));
}

for (const [route, expected] of Object.entries(baseline.output.metadata)) {
  const file = route === "/" ? "index.html" : `${route.slice(1)}index.html`;
  const html = await readFile(path.join(root, "dist", file), "utf8");
  const canonical = htmlAttribute(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
    "href",
  );
  if (canonical !== expected.canonical)
    throw new Error(`${route} canonical metadata changed: ${canonical}`);
  for (const key of [
    "og:title",
    "og:description",
    "og:type",
    "og:url",
    "og:image",
  ]) {
    if (expected[key] && !metadataValue(html, "property", key))
      throw new Error(`${route} is missing ${key} metadata`);
  }
  for (const key of [
    "twitter:card",
    "twitter:title",
    "twitter:description",
    "twitter:image",
  ]) {
    if (expected[key] && !metadataValue(html, "name", key))
      throw new Error(`${route} is missing ${key} metadata`);
  }
  const actualFeeds = [
    ...html.matchAll(
      /<link\b(?=[^>]*\brel=["']alternate["'])(?=[^>]*\btype=["']application\/rss\+xml["'])[^>]*>/gi,
    ),
  ].map((match) => ({
    href: htmlAttribute(match[0], /<link\b[^>]*>/i, "href"),
    title: htmlAttribute(match[0], /<link\b[^>]*>/i, "title"),
    type: htmlAttribute(match[0], /<link\b[^>]*>/i, "type"),
  }));
  if (
    JSON.stringify(actualFeeds) !== JSON.stringify(expected.feedDiscovery ?? [])
  )
    throw new Error(`${route} RSS feed discovery metadata changed`);
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  const actualTypes = new Set();
  for (const script of scripts) {
    try {
      structuredTypes(JSON.parse(script[1]), actualTypes);
    } catch {
      throw new Error(`${route} contains invalid JSON-LD`);
    }
  }
  for (const type of expected.structuredDataTypes ?? [])
    if (
      ["WebSite", "WebPage", "BlogPosting", "BreadcrumbList"].includes(type) &&
      !actualTypes.has(type)
    )
      throw new Error(`${route} JSON-LD is missing ${type}`);
}
const redirects = await readFile(path.join(root, "dist/_redirects"), "utf8");
for (const line of redirects
  .split(/\r?\n/)
  .map((value) => value.trim())
  .filter((value) => value && !value.startsWith("#"))) {
  const [source, , status = "302"] = line.split(/\s+/);
  if (/^https?:\/\//i.test(source))
    throw new Error(`domain-level redirect source is unsupported: ${source}`);
  if (status === "200" && /^https?:\/\//i.test(line.split(/\s+/)[1]))
    throw new Error(`external 200 proxy is unsupported: ${line}`);
}
for (const expected of [
  "/setup-qemu-in-archlinux/ /vm-setup-in-linux/ 301",
  "/winget https://github.com/ChrisTitusTech/winutil/releases/latest/download/winutil.ps1 302",
])
  if (!redirects.includes(expected))
    throw new Error(`redirect is missing: ${expected}`);

const headers = await readFile(path.join(root, "dist/_headers"), "utf8");
for (const expected of [
  "X-Frame-Options: SAMEORIGIN",
  "X-Content-Type-Options: nosniff",
  "/_astro/*",
  "/index.xml",
  "/sitemap.xml",
]) {
  if (!headers.includes(expected))
    throw new Error(`_headers is missing ${expected}`);
}
const headerLines = headers.split(/\r?\n/);
const headerPolicy = (pattern) => {
  const start = headerLines.findIndex((line) => line.trim() === pattern);
  if (start === -1) return "";
  const values = [];
  for (
    let index = start + 1;
    index < headerLines.length && /^\s+\S/.test(headerLines[index]);
    index += 1
  ) {
    values.push(headerLines[index].trim());
  }
  return values.join("\n");
};
const astroPolicy = headerPolicy("/_astro/*");
if (!astroPolicy.includes("immutable"))
  throw new Error("/_astro/* must use immutable caching");
for (const prefix of ["/css/*", "/js/*"]) {
  const policy = headerPolicy(prefix);
  if (policy.includes("immutable"))
    throw new Error(`${prefix} must not use immutable caching`);
}

const search = JSON.parse(
  await readFile(path.join(root, "dist/index.json"), "utf8"),
);
if (search.length < baseline.output.semantic.search.length)
  throw new Error("search contains fewer entries than the Hugo baseline");
for (const item of search)
  for (const key of ["title", "tags", "categories", "contents", "permalink"])
    if (!(key in item)) throw new Error(`search entry is missing ${key}`);
const buildState = JSON.parse(
  await readFile(path.join(root, ".astro-content/build.json"), "utf8"),
);
const postFiles = await fg(".astro-content/posts/**/*.md", {
  cwd: root,
  onlyFiles: true,
});
const expectedPosts = [];
const excludedPosts = [];
const expectedFeedContent = new Map();
for (const file of postFiles) {
  const source = await readFile(path.join(root, file), "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = YAML.parse(match[1]);
  expectedFeedContent.set(
    `https://christitus.com${data.url}`,
    normalizeFeedBody(renderFeedContent(source.slice(match[0].length))),
  );
  (isEligibleData(data, new Date(buildState.buildInstant), false)
    ? expectedPosts
    : excludedPosts
  ).push(data);
}
const searchUrls = new Set(
  search.map((item) => new URL(item.permalink).pathname),
);
for (const item of baseline.output.semantic.search) {
  const url = new URL(item.permalink).pathname;
  if (!searchUrls.has(url))
    throw new Error(`baseline post is missing from search: ${url}`);
}
const expectedUrls = new Set(expectedPosts.map((post) => post.url));
if (searchUrls.size !== search.length)
  throw new Error("search contains duplicate permalinks");
for (const url of expectedUrls)
  if (!searchUrls.has(url))
    throw new Error(`published post is missing from search: ${url}`);
for (const post of excludedPosts)
  if (searchUrls.has(post.url))
    throw new Error(`excluded post leaked into search: ${post.url}`);

const sitemap = await readFile(path.join(root, "dist/sitemap.xml"), "utf8");
const feed = await readFile(path.join(root, "dist/index.xml"), "utf8");
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    decodeXml(match[1]),
  ),
);
const sitemapEntries = new Map(
  [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => [
    decodeXml(match[1].match(/<loc>(.*?)<\/loc>/)?.[1] ?? ""),
    match[1],
  ]),
);
const rootFeedUrls = new Set(
  [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) =>
    decodeXml(match[1].match(/<link>(.*?)<\/link>/)?.[1] ?? ""),
  ),
);
let validatedFeedBodies = 0;
const semanticFeedItems = (xml) =>
  [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => ({
    title: decodeXml(match[1].match(/<title>(.*?)<\/title>/)?.[1] ?? ""),
    link: decodeXml(match[1].match(/<link>(.*?)<\/link>/)?.[1] ?? ""),
    guid: decodeXml(match[1].match(/<guid.*?>(.*?)<\/guid>/)?.[1] ?? ""),
  }));
for (const file of Object.keys(baseline.output.semantic.feeds)) {
  const xml = await readFile(path.join(root, "dist", file), "utf8");
  const expectedChannelUrl = new URL(
    `/${file.replace(/index\.xml$/, "")}`,
    "https://christitus.com/",
  ).toString();
  const channelUrl = decodeXml(
    xml.match(/<channel>[\s\S]*?<link>(.*?)<\/link>/)?.[1] ?? "",
  );
  if (channelUrl !== expectedChannelUrl)
    throw new Error(`${file} channel URL changed: ${channelUrl}`);
  if (["categories/index.xml", "tags/index.xml"].includes(file)) {
    const expectedItems = baseline.output.semantic.feeds[file].items.map(
      ({ title, link, guid }) => ({ title, link, guid }),
    );
    const actualItems = semanticFeedItems(xml);
    const actualKeys = new Set(actualItems.map((item) => JSON.stringify(item)));
    const missing = expectedItems.filter(
      (item) => !actualKeys.has(JSON.stringify(item)),
    );
    if (missing.length > 0)
      throw new Error(
        `${file} lost baseline semantic items: ${JSON.stringify(missing)}`,
      );
  }
  if (file === "archive/index.xml") {
    const actualItems = semanticFeedItems(xml);
    if (actualItems.length !== 0)
      throw new Error("archive/index.xml must remain empty");
  }
  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const link = decodeXml(match[1].match(/<link>(.*?)<\/link>/)?.[1] ?? "");
    const expected = expectedFeedContent.get(link);
    if (expected === undefined) continue;
    const description = decodeXml(
      match[1].match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? "",
    );
    if (normalizeFeedBody(description) !== expected)
      throw new Error(
        `${file} contains a truncated or altered RSS body for ${link}`,
      );
    validatedFeedBodies += 1;
  }
}
if (validatedFeedBodies < expectedPosts.length)
  throw new Error(
    "RSS full-body validation did not cover every published post",
  );
if (!sitemapUrls.has("https://christitus.com/newsletter/"))
  throw new Error("newsletter is missing from sitemap");
for (const post of expectedPosts) {
  if (
    post.sitemap?.disable !== true &&
    !sitemapUrls.has(`https://christitus.com${post.url}`)
  )
    throw new Error(`published post is missing from sitemap: ${post.url}`);
  if (!rootFeedUrls.has(`https://christitus.com${post.url}`))
    throw new Error(`published post is missing from RSS: ${post.url}`);
  if (
    post.sitemap?.disable !== true &&
    !sitemapEntries
      .get(`https://christitus.com${post.url}`)
      ?.includes("<lastmod>")
  )
    throw new Error(`published post is missing sitemap lastmod: ${post.url}`);
}
const dateOnlyPost = expectedPosts.find((post) => post.date.length === 10);
if (dateOnlyPost) {
  const item = [...feed.matchAll(/<item>([\s\S]*?)<\/item>/g)].find(
    (match) =>
      decodeXml(match[1].match(/<link>(.*?)<\/link>/)?.[1] ?? "") ===
      `https://christitus.com${dateOnlyPost.url}`,
  )?.[1];
  const publicationDate = new Date(
    decodeXml(item?.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? ""),
  );
  if (publicationDate.toISOString().slice(11) !== "00:00:00.000Z")
    throw new Error(
      `date-only RSS entry is not UTC midnight: ${dateOnlyPost.url}`,
    );
}
for (const post of excludedPosts) {
  if (sitemapUrls.has(`https://christitus.com${post.url}`))
    throw new Error(`excluded post leaked into sitemap: ${post.url}`);
  if (rootFeedUrls.has(`https://christitus.com${post.url}`))
    throw new Error(`excluded post leaked into RSS: ${post.url}`);
}
for (const disabled of ["/search/", "/live-streams/player/", "/rss/"]) {
  if (sitemapUrls.has(`https://christitus.com${disabled}`))
    throw new Error(`sitemap-disabled route leaked into sitemap: ${disabled}`);
}

const defender = await readFile(
  path.join(root, "dist/bad-windows-defender/index.html"),
  "utf8",
);
for (const value of ["Extended Validation", "Regular Validation", "DigiCert"])
  if (!defender.includes(value))
    throw new Error(`table shortcode output is missing ${value}`);
const notice = await readFile(
  path.join(root, "dist/topgrade-linux/index.html"),
  "utf8",
);
if (!notice.includes("notice-tip") || !notice.includes("notice-note"))
  throw new Error("notice shortcodes did not render");

const sourceImage = await readFile(
  path.join(root, "src/content/posts/2023/english.png"),
);
const publicImage = await readFile(
  path.join(root, "dist/posts/2023/english.png"),
);
const digest = (value) => createHash("sha256").update(value).digest("hex");
if (digest(sourceImage) !== digest(publicImage))
  throw new Error("english.png is not byte-identical");

const htmlFiles = await fg("dist/**/*.html", { cwd: root, onlyFiles: true });
for (const file of htmlFiles) {
  const html = await readFile(path.join(root, file), "utf8");
  const visible = html
    .replace(/<pre\b[\s\S]*?<\/pre>/gi, "")
    .replace(/<code\b[\s\S]*?<\/code>/gi, "");
  if (/\{\{(?:&lt;|<|%)/.test(visible))
    throw new Error(`${file} contains unresolved Hugo template syntax`);
}
const representative = await readFile(
  path.join(root, "dist/my-ai-workflow/index.html"),
  "utf8",
);
if (
  !representative.includes("/cdn-cgi/image/") ||
  !representative.includes("data-cf-image")
) {
  throw new Error(
    "representative article is missing Cloudflare responsive image sources",
  );
}
const jsonLd = representative.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
)?.[1];
if (!jsonLd) throw new Error("representative article is missing JSON-LD");
const graph = JSON.parse(jsonLd);
for (const type of ["WebSite", "WebPage", "BlogPosting", "BreadcrumbList"]) {
  if (!graph["@graph"].some((entry) => entry["@type"] === type))
    throw new Error(`JSON-LD is missing ${type}`);
}

console.log(
  `Validated ${required.length} Hugo contract routes, ${requiredStatic.length} baseline static files, and ${search.length} search entries`,
);
