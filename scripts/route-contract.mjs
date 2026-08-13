import { readFile } from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import YAML from "yaml";

import site from "../src/data/site.json" with { type: "json" };

export function routeKey(value) {
  const segments = value.split(/[?#]/)[0].split("/").filter(Boolean);
  return segments.length === 0 ? "/" : `/${segments.join("/")}/`;
}

export function publicRoute(value) {
  const clean = value.split(/[?#]/)[0];
  const segments = clean.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  const normalized = `/${segments.join("/")}`;
  return /\.[^/]+$/.test(segments.at(-1)) ? normalized : `${normalized}/`;
}

export function emittedPath(route) {
  const normalized = routeKey(route);
  return normalized === "/" ? "index.html" : `${normalized.slice(1)}index.html`;
}

export function publicOutputPath(route) {
  const normalized = publicRoute(route);
  return normalized === "/"
    ? "index.html"
    : normalized.endsWith("/")
      ? `${normalized.slice(1)}index.html`
      : normalized.slice(1);
}

export function taxonomySlug(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9_+-]/g, "").replace(/^-|-$/g, "");
}

function frontmatter(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`${file}: missing YAML front matter`);
  return YAML.parse(match[1]);
}

export function redirectMatches(pattern, route) {
  const source = pattern.split(/[?#]/)[0];
  if (/^https?:\/\//i.test(source)) return false;
  const escaped = source
    .split("*")
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/:[A-Za-z][\w-]*/g, "[^/]+"))
    .join(".*");
  return new RegExp(`^${escaped}/?$`).test(publicRoute(route));
}

function addPaginated(routes, base, count, minimumPages = 1) {
  const normalizedBase = routeKey(base);
  routes.add(normalizedBase);
  routes.add(normalizedBase === "/" ? "/page/1/" : `${normalizedBase}page/1/`);
  const pages = Math.max(minimumPages, Math.ceil(count / site.postsPerPage), 1);
  for (let page = 2; page <= pages; page += 1) {
    routes.add(normalizedBase === "/" ? `/page/${page}/` : `${normalizedBase}page/${page}/`);
  }
}

function derivedRoutes(posts) {
  const routes = new Set(["/index.xml", "/index.json", "/sitemap.xml", "/404.html"]);
  const categories = new Map();
  const tags = new Map();
  for (const post of posts) {
    routes.add(routeKey(post.url));
    for (const [field, groups] of [["categories", categories], ["tags", tags]]) {
      for (const value of post[field] ?? []) {
        const slug = taxonomySlug(value);
        groups.set(slug, (groups.get(slug) ?? 0) + 1);
      }
    }
  }

  addPaginated(routes, "/", posts.length, 33);
  addPaginated(routes, "/posts/", posts.length);
  addPaginated(routes, "/archive/", posts.length);
  routes.add("/posts/index.xml");
  routes.add("/archive/index.xml");

  for (const [field, groups] of [["categories", categories], ["tags", tags]]) {
    const root = `/${field}/`;
    addPaginated(routes, root, groups.size);
    routes.add(`${root}index.xml`);
    for (const [slug, count] of groups) {
      const base = `${root}${slug}/`;
      addPaginated(routes, base, count);
      routes.add(`${base}index.xml`);
    }
  }
  return routes;
}

function routeFromPublicFile(relative) {
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

export async function buildInventory(candidate, root = process.cwd()) {
  const baseline = JSON.parse(await readFile(path.join(root, "tests/baseline/hugo-public.json"), "utf8"));
  const routes = new Set(baseline.output.publicFiles.map(routeFromPublicFile).map(publicRoute));
  const outputPaths = new Set(baseline.output.publicFiles);

  const postFiles = await fg("content/posts/**/*.md", { cwd: root });
  const posts = [];
  for (const file of postFiles) {
    const data = frontmatter(await readFile(path.join(root, file), "utf8"), file);
    if (data.build?.render === "never" || typeof data.url !== "string") continue;
    posts.push(data);
  }

  const currentDerived = derivedRoutes(posts);
  const futurePosts = candidate ? [...posts, candidate] : posts;
  const futureDerived = derivedRoutes(futurePosts);
  if (candidate) {
    const sourceSlug = candidate._sourceSlug ?? path.basename(routeKey(candidate.url));
    futureDerived.add(`/posts/${candidate.date.slice(0, 4)}/${sourceSlug}/`);
  }
  const induced = new Set(
    [...futureDerived].map(publicRoute).filter((route) => !currentDerived.has(route)),
  );

  const staticFiles = await fg("static/**/*", { cwd: root, onlyFiles: true });
  for (const file of staticFiles) {
    const relative = file.slice("static/".length);
    routes.add(publicRoute(`/${relative}`));
    outputPaths.add(relative);
  }

  const redirectLines = (await readFile(path.join(root, "static/_redirects"), "utf8"))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  const redirectSources = redirectLines.map((line) => line.split(/\s+/)[0]);
  return { routes, outputPaths, induced, redirectSources };
}

export async function assertCandidateAvailable(candidate, root = process.cwd()) {
  const inventory = await buildInventory(candidate, root);
  const baseline = await buildInventory(undefined, root);
  const candidateRoute = routeKey(candidate.url);
  if (baseline.routes.has(candidateRoute)) throw new Error(`URL collision: ${candidateRoute} already exists`);

  const newPathOwners = new Map();
  for (const route of inventory.induced) {
    const output = publicOutputPath(route);
    if (baseline.routes.has(route)) throw new Error(`route collision: ${route} already exists`);
    if (baseline.outputPaths.has(output)) throw new Error(`output collision: ${output} already exists`);
    const prior = newPathOwners.get(output);
    if (prior) throw new Error(`output collision: ${prior} and ${route} both emit ${output}`);
    newPathOwners.set(output, route);
    for (const pattern of inventory.redirectSources) {
      if (redirectMatches(pattern, route)) throw new Error(`route ${route} overlaps redirect source ${pattern}`);
    }
  }

  const paths = new Set([...baseline.outputPaths, ...newPathOwners.keys()]);
  for (const output of paths) {
    const segments = output.split("/");
    for (let length = 1; length < segments.length; length += 1) {
      const ancestor = segments.slice(0, length).join("/");
      if (paths.has(ancestor)) {
        throw new Error(`file/directory output conflict: ${ancestor} and ${output}`);
      }
    }
  }
}
