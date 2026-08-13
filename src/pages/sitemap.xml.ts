import type { APIRoute } from "astro";

import { getPages, getPublishedPosts } from "../lib/content";
import { buildPageDescriptors } from "../lib/routes";

export const GET: APIRoute = async () => {
  const descriptors = buildPageDescriptors(await getPublishedPosts(), await getPages());
  const routes = [
    "/",
    "/live-streams/",
    ...descriptors
      .filter((entry) => entry.kind !== "redirect")
      .filter((entry) => {
        if (entry.kind === "post") return entry.post.data.sitemap?.disable !== true;
        if (entry.kind === "page") return entry.page.data.sitemap?.disable !== true;
        return true;
      })
      .map((entry) => entry.route),
  ];
  const entries = [...new Set(routes)].sort().map((route) => {
    try {
      return `<url><loc>${new URL(route, "https://christitus.com/")}</loc></url>`;
    } catch {
      throw new Error(`Invalid sitemap route: ${JSON.stringify(route)}`);
    }
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
