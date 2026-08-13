import { getCollection, type CollectionEntry } from "astro:content";

import buildState from "../../.astro-content/build.json";
import site from "../data/site.json";
import {
  isEligibleData,
  displayDateData,
  publicationTimeData,
  selectHomepageItems,
  slugify,
  taxonomySlug,
  validateFeaturedOrders,
} from "./content-logic";
import { renderFeedContent } from "./feed-content";

export type Post = CollectionEntry<"posts">;
export type Page = CollectionEntry<"pages">;

const buildInstant = new Date(buildState.buildInstant);

export function isProductionEligible(post: Post): boolean {
  return isEligibleData(
    post.data,
    buildInstant,
    buildState.preview,
    site.timeZone,
  );
}

export function publicationTime(post: Post): number {
  return publicationTimeData(post.data, site.timeZone);
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort(
    (left, right) =>
      publicationTime(right) - publicationTime(left) ||
      (left.data.url < right.data.url
        ? -1
        : left.data.url > right.data.url
          ? 1
          : 0),
  );
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection("posts");
  validateFeaturedOrders(posts.map((post) => post.data));
  return sortPosts(posts);
}

export async function getPublishedPosts(): Promise<Post[]> {
  return (await getAllPosts()).filter(isProductionEligible);
}

export async function getPages(): Promise<Page[]> {
  return getCollection("pages");
}

export function displayDate(post: Post): string {
  return displayDateData(post.data);
}

export function feedContent(post: Post): string {
  return renderFeedContent(post.body ?? "");
}

export function summary(post: Post, length = 220): string {
  const preferred = (post.body ?? "").split("<!--more-->")[0];
  const text = preferred
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > length ? `${text.slice(0, length).trimEnd()}...` : text;
}

export function readingMinutes(post: Post): number {
  const words = (post.body ?? "")
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function pageRoute(page: Page): string {
  if (page.data.url) return page.data.url;
  const id = page.id.replace(/\/index$/, "");
  return `/${id.replace(/^\/+|\/+$/g, "")}/`;
}

export function taxonomy(posts: Post[], field: "categories" | "tags") {
  const groups = new Map<string, { name: string; posts: Post[] }>();
  for (const post of posts) {
    for (const name of post.data[field]) {
      const slug = taxonomySlug(name);
      const current = groups.get(slug) ?? { name, posts: [] };
      current.posts.push(post);
      if (name === "MacOS") current.name = name;
      groups.set(slug, current);
    }
  }
  return groups;
}

export function homepagePosts(posts: Post[]): Post[] {
  return selectHomepageItems(
    posts,
    buildInstant,
    buildState.preview,
    site.timeZone,
  );
}

export function relatedPosts(current: Post, posts: Post[], limit = 5): Post[] {
  const categories = new Set(current.data.categories);
  const tags = new Set(current.data.tags);
  return posts
    .filter((post) => post.data.url !== current.data.url)
    .map((post) => ({
      post,
      score:
        post.data.categories.filter((category) => categories.has(category))
          .length *
          2 +
        post.data.tags.filter((tag) => tags.has(tag)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        publicationTime(right.post) - publicationTime(left.post) ||
        (left.post.data.url < right.post.data.url
          ? -1
          : left.post.data.url > right.post.data.url
            ? 1
            : 0),
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}

export { buildState, isEligibleData, site, slugify, taxonomySlug };
