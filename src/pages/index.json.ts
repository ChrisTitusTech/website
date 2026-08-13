import type { APIRoute } from "astro";

import { getPublishedPosts } from "../lib/content";

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  return new Response(
    JSON.stringify(
      posts.map((post) => ({
        title: post.data.title,
        tags: post.data.tags,
        categories: post.data.categories,
        contents: (post.body ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
        permalink: new URL(post.data.url, "https://christitus.com").toString(),
      })),
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
};
