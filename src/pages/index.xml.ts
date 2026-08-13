import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { getPublishedPosts, summary } from "../lib/content";

export const GET: APIRoute = async (context) => {
  const posts = await getPublishedPosts();
  return rss({
    title: "Chris Titus Tech",
    description: "Having Fun with Technology",
    site: context.site!,
    customData: "<language>en-US</language>",
    items: posts.map((post) => ({
      title: post.data.title,
      description: summary(post),
      link: post.data.url,
      pubDate: new Date(
        post.data.date.length === 10
          ? `${post.data.date}T12:00:00Z`
          : post.data.date,
      ),
    })),
  });
};
