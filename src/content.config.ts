import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

import { taxonomySlug } from "./lib/content-logic";

const dateValue = z
  .string()
  .refine(
    (value) =>
      /^\d{4}-\d{2}-\d{2}$/.test(value) ||
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/.test(
        value,
      ),
    "date must be YYYY-MM-DD or an offset-bearing timestamp",
  );

const tableValue = z.array(
  z.array(z.union([z.string(), z.number(), z.boolean()])),
);
const taxonomyValue = z
  .string()
  .refine(
    (value) => taxonomySlug(value).length > 0,
    "taxonomy value must produce a nonempty slug",
  );

const shared = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    date: dateValue.optional(),
    url: z.string().optional(),
    image: z.string().optional(),
    categories: z.array(taxonomyValue).default([]),
    tags: z.array(taxonomyValue).default([]),
    draft: z.boolean().optional().default(false),
    featuredOrder: z
      .union([z.literal(1), z.literal(2), z.literal(3)])
      .optional(),
    tables: z.record(z.string(), tableValue).optional(),
    build: z.record(z.string(), z.unknown()).optional(),
    sitemap: z.record(z.string(), z.unknown()).optional(),
    _sourcePath: z.string(),
  })
  .loose();

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: ".astro-content/posts",
    deferRender: true,
  }),
  schema: shared.extend({
    date: dateValue,
    url: z.string().regex(/^\/[A-Za-z0-9][A-Za-z0-9_-]*\/$/),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: ".astro-content/pages",
    deferRender: true,
  }),
  schema: shared,
});

export const collections = { pages, posts };
