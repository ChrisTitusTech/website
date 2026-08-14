import type { APIRoute } from "astro";

import livestreams from "../../data/livestreams.json";
import { getPages, getPublishedPosts, pageRoute } from "../lib/content";
import { buildPageDescriptors } from "../lib/routes";
import { escapeXml } from "../lib/xml";

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const pages = await getPages();
  const descriptors = buildPageDescriptors(posts, pages);
  const newsletter = pages.find((page) => pageRoute(page) === "/newsletter/");
  const routes = new Map<string, string | undefined>([
    ["/", posts[0]?.data.date],
    ["/live-streams/", livestreams.updated],
    ["/newsletter/", newsletter?.data.date],
  ]);
  for (const entry of descriptors) {
    if (entry.kind === "redirect") continue;
    if (entry.kind === "post" && entry.post.data.sitemap?.disable === true)
      continue;
    if (entry.kind === "page" && entry.page.data.sitemap?.disable === true)
      continue;
    const date =
      entry.kind === "post"
        ? entry.post.data.date
        : entry.kind === "page"
          ? entry.page.data.date
          : entry.kind === "listing"
            ? entry.listing.posts[0]?.data.date
            : posts[0]?.data.date;
    routes.set(entry.route, date);
  }
  const entries = [...routes.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([route, date]) => {
      try {
        const location = escapeXml(
          new URL(route, "https://christitus.com/").toString(),
        );
        const lastmod = date
          ? `<lastmod>${escapeXml(normalizeLastModified(date))}</lastmod>`
          : "";
        return `<url><loc>${location}</loc>${lastmod}</url>`;
      } catch {
        throw new Error(`Invalid sitemap route: ${JSON.stringify(route)}`);
      }
    });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>\n`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};

function normalizeLastModified(value: string): string {
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(date.getTime()))
    throw new Error(`Invalid sitemap last-modified value: ${value}`);
  return date.toISOString();
}
