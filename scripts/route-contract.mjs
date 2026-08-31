import { readFile } from "node:fs/promises";
import path from "node:path";

import fg from "fast-glob";
import YAML from "yaml";

import livestreams from "../data/livestreams.json" with { type: "json" };
import site from "../src/data/site.json" with { type: "json" };

const validLivestreamCount = livestreams.items.filter((stream) =>
  /^[A-Za-z0-9_-]{6,16}$/.test(stream.videoId),
).length;

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
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_+-]/g, "")
    .replace(/^-|-$/g, "");
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
    .map((part) =>
      part
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/:[A-Za-z][\w-]*/g, "[^/]+"),
    )
    .join(".*");
  return new RegExp(`^${escaped}/?$`).test(publicRoute(route));
}

function addPaginated(routes, base, count, minimumPages = 1) {
  const normalizedBase = routeKey(base);
  routes.add(normalizedBase);
  routes.add(normalizedBase === "/" ? "/page/1/" : `${normalizedBase}page/1/`);
  const pages = Math.max(minimumPages, Math.ceil(count / site.postsPerPage), 1);
  for (let page = 2; page <= pages; page += 1) {
    routes.add(
      normalizedBase === "/"
        ? `/page/${page}/`
        : `${normalizedBase}page/${page}/`,
    );
  }
}

function derivedRoutes(posts) {
  const routes = new Set([
    "/index.xml",
    "/index.json",
    "/sitemap.xml",
    "/404.html",
    "/search/",
    "/live-streams/",
    "/live-streams/index.xml",
    "/live-streams/page/1/",
    "/live-streams/player/",
    "/videos/",
    "/newsletter/",
    "/rss/",
  ]);
  const categories = new Map();
  const tags = new Map();
  for (const post of posts) {
    routes.add(routeKey(post.url));
    if (post._sourcePath) {
      routes.add(
        routeKey(
          `/${post._sourcePath.replace(/^src\/content\//, "").replace(/\.md$/, "")}/`,
        ),
      );
    } else if (post._sourceSlug) {
      routes.add(`/posts/${post.date.slice(0, 4)}/${post._sourceSlug}/`);
    }
    for (const [field, groups] of [
      ["categories", categories],
      ["tags", tags],
    ]) {
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
  const livestreamPages = Math.max(
    1,
    Math.ceil(Math.max(0, validLivestreamCount - 1) / 24),
  );
  for (let page = 1; page <= livestreamPages; page += 1)
    routes.add(`/live-streams/page/${page}/`);

  for (const [field, groups] of [
    ["categories", categories],
    ["tags", tags],
  ]) {
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
  if (relative.endsWith("/index.html"))
    return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

export async function buildInventory(candidate, root = process.cwd()) {
  const routes = new Set();
  const outputPaths = new Set();

  const postFiles = await fg("src/content/posts/**/*.md", { cwd: root });
  const posts = [];
  for (const file of postFiles) {
    const data = frontmatter(
      await readFile(path.join(root, file), "utf8"),
      file,
    );
    if (data.build?.render === "never" || typeof data.url !== "string")
      continue;
    posts.push({ ...data, _sourcePath: file });
  }

  const pageFiles = await fg("src/content/*.md", { cwd: root });
  for (const file of pageFiles) {
    const data = frontmatter(
      await readFile(path.join(root, file), "utf8"),
      file,
    );
    if (data.build?.render === "never") continue;
    const route =
      typeof data.url === "string"
        ? data.url
        : `/${path.basename(file, path.extname(file))}/`;
    routes.add(publicRoute(route));
    outputPaths.add(publicOutputPath(route));
  }

  const currentDerived = derivedRoutes(posts);
  for (const route of currentDerived) {
    const normalized = publicRoute(route);
    routes.add(normalized);
    outputPaths.add(publicOutputPath(normalized));
  }
  const futurePosts = candidate
    ? [
        ...posts,
        {
          ...candidate,
          _sourceSlug:
            candidate._sourceSlug ?? path.basename(routeKey(candidate.url)),
        },
      ]
    : posts;
  const futureDerived = derivedRoutes(futurePosts);
  const induced = new Set(
    [...futureDerived]
      .map(publicRoute)
      .filter((route) => !currentDerived.has(route)),
  );

  const staticFiles = await fg("public/**/*", { cwd: root, onlyFiles: true });
  for (const file of staticFiles) {
    const relative = file.slice("public/".length);
    routes.add(publicRoute(routeFromPublicFile(relative)));
    outputPaths.add(relative);
  }

  const redirectLines = (
    await readFile(path.join(root, "public/_redirects"), "utf8")
  )
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  const redirectSources = redirectLines.map((line) => line.split(/\s+/)[0]);
  return { routes, outputPaths, induced, redirectSources };
}

export async function assertCandidateAvailable(
  candidate,
  root = process.cwd(),
) {
  const inventory = await buildInventory(candidate, root);
  const current = await buildInventory(undefined, root);
  const candidateRoute = routeKey(candidate.url);
  if (current.routes.has(candidateRoute))
    throw new Error(`URL collision: ${candidateRoute} already exists`);

  const newPathOwners = new Map();
  for (const route of inventory.induced) {
    const output = publicOutputPath(route);
    if (current.routes.has(route))
      throw new Error(`route collision: ${route} already exists`);
    if (current.outputPaths.has(output))
      throw new Error(`output collision: ${output} already exists`);
    const prior = newPathOwners.get(output);
    if (prior)
      throw new Error(
        `output collision: ${prior} and ${route} both emit ${output}`,
      );
    newPathOwners.set(output, route);
    for (const pattern of inventory.redirectSources) {
      if (redirectMatches(pattern, route))
        throw new Error(`route ${route} overlaps redirect source ${pattern}`);
    }
  }

  const paths = new Set([...current.outputPaths, ...newPathOwners.keys()]);
  for (const output of paths) {
    const segments = output.split("/");
    for (let length = 1; length < segments.length; length += 1) {
      const ancestor = segments.slice(0, length).join("/");
      if (paths.has(ancestor)) {
        throw new Error(
          `file/directory output conflict: ${ancestor} and ${output}`,
        );
      }
    }
  }
}
