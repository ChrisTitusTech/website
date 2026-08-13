import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths } from "astro";

import livestreams from "../../data/livestreams.json";
import {
  getPublishedPosts,
  feedContent,
  publicationTime,
  taxonomy,
  taxonomySlug,
} from "../lib/content";
import { legacyFeedPaths } from "../lib/routes";

export const getStaticPaths = (async () => {
  const posts = await getPublishedPosts();
  const paths = new Set(legacyFeedPaths());
  for (const field of ["categories", "tags"] as const) {
    for (const slug of taxonomy(posts, field).keys())
      paths.add(`${field}/${slug}/index.xml`);
  }
  return [...paths]
    .filter((path) => path !== "index.xml")
    .map((path) => ({
      params: { feed: path.replace(/\.xml$/, "") },
      props: { path },
    }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async (context) => {
  const path = String(context.props.path);
  if (path === "live-streams/index.xml") {
    return rss({
      title: "Live Streams | Chris Titus Tech",
      description: "Chris Titus Tech live stream recordings",
      site: context.site!,
      customData: "<language>en-US</language>",
      items: livestreams.items.map((stream) => ({
        title: stream.title,
        description: stream.description,
        link: `/live-streams/player/?v=${encodeURIComponent(stream.videoId)}`,
        pubDate: new Date(stream.publishedAt ?? stream.date),
      })),
    });
  }
  let posts = await getPublishedPosts();
  const taxonomyRoot = path.match(/^(categories|tags)\/index\.xml$/)?.[1] as
    "categories" | "tags" | undefined;
  if (taxonomyRoot) {
    const groups = taxonomy(posts, taxonomyRoot);
    return rss({
      title: `${taxonomyRoot} on Chris Titus Tech`,
      description: `Recent content in ${taxonomyRoot} on Chris Titus Tech`,
      site: context.site!,
      customData: "<language>en-US</language>",
      items: [...groups.entries()]
        .sort(
          ([, left], [, right]) =>
            publicationTime(right.posts[0]) - publicationTime(left.posts[0]) ||
            left.name.localeCompare(right.name, "en-US", {
              sensitivity: "base",
            }),
        )
        .map(([slug, group]) => ({
          title: group.name.toLocaleLowerCase("en-US"),
          link: `/${taxonomyRoot}/${slug}/`,
          pubDate: new Date(
            group.posts[0].data.date.length === 10
              ? `${group.posts[0].data.date}T00:00:00Z`
              : group.posts[0].data.date,
          ),
        })),
    });
  }
  if (path === "archive/index.xml") {
    return rss({
      title: "Archive on Chris Titus Tech",
      description: "Recent content in Archive on Chris Titus Tech",
      site: context.site!,
      customData: "<language>en-US</language>",
      items: [],
    });
  }
  const category = path.match(/^categories\/([^/]+)\/index\.xml$/)?.[1];
  const tag = path.match(/^tags\/([^/]+)\/index\.xml$/)?.[1];
  if (category)
    posts = posts.filter((post) =>
      post.data.categories.some((value) => taxonomySlug(value) === category),
    );
  if (tag)
    posts = posts.filter((post) =>
      post.data.tags.some((value) => taxonomySlug(value) === tag),
    );
  const title = category
    ? `${category} | Chris Titus Tech`
    : tag
      ? `${tag} | Chris Titus Tech`
      : "Chris Titus Tech";
  return rss({
    title,
    description: "Recent content from Chris Titus Tech",
    site: context.site!,
    customData: "<language>en-US</language>",
    items: posts.map((post) => {
      const content = feedContent(post);
      return {
        title: post.data.title,
        description: content,
        content,
        link: post.data.url,
        pubDate: new Date(
          post.data.date.length === 10
            ? `${post.data.date}T12:00:00Z`
            : post.data.date,
        ),
      };
    }),
  });
};
