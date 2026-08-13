#!/usr/bin/env node

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";
import { pathToFileURL } from "node:url";

import YAML from "yaml";

import site from "../src/data/site.json" with { type: "json" };
import { assertCandidateAvailable } from "./route-contract.mjs";

export function slugify(title) {
  return title
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function chicagoToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );
  return `${value.year}-${value.month}-${value.day}`;
}

export function parseArguments(argv) {
  const title = argv[0];
  if (!title || title.startsWith("--"))
    throw new Error(
      'usage: npm run new:post -- "<title>" [--date YYYY-MM-DD] [--category "<name>" ...]',
    );
  let date;
  const categories = [];
  for (let index = 1; index < argv.length; index += 1) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (flag === "--date" && value) {
      date = value;
      index += 1;
      continue;
    }
    if (flag === "--category" && value) {
      categories.push(value);
      index += 1;
      continue;
    }
    throw new Error(`unknown or incomplete option: ${flag}`);
  }
  return { title, date: date ?? chicagoToday(), categories };
}

async function promptCategories() {
  if (!process.stdin.isTTY || !process.stdout.isTTY)
    throw new Error(
      "at least one --category is required in non-interactive use",
    );
  console.log("Choose one or more categories (comma-separated numbers):");
  site.categories.forEach((category, index) =>
    console.log(`${index + 1}. ${category}`),
  );
  const prompt = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let input;
  try {
    input = await prompt.question("Categories: ");
  } finally {
    prompt.close();
  }
  return [
    ...new Set(
      input
        .split(",")
        .map((value) => Number(value.trim()))
        .filter(
          (value) =>
            Number.isInteger(value) &&
            value >= 1 &&
            value <= site.categories.length,
        )
        .map((value) => site.categories[value - 1]),
    ),
  ];
}

export function validateInput({ title, date, categories }) {
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? new Date(`${date}T00:00:00Z`)
    : undefined;
  if (
    !parsedDate ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error(
      "date must be a real calendar date in strict YYYY-MM-DD form",
    );
  }
  const slug = slugify(title);
  if (!slug) throw new Error("title does not produce a usable ASCII slug");
  if (categories.length === 0)
    throw new Error("at least one category is required");
  for (const category of categories)
    if (!site.categories.includes(category))
      throw new Error(`invalid category: ${category}`);
  return slug;
}

export function renderTemplate(template, { title, date, categories }, slug) {
  return template
    .replaceAll("{{TITLE}}", JSON.stringify(title))
    .replaceAll("{{DATE}}", date)
    .replaceAll("{{YEAR}}", date.slice(0, 4))
    .replaceAll("{{SLUG}}", slug)
    .replaceAll(
      "{{CATEGORIES}}",
      categories
        .map((category) => `  - ${JSON.stringify(category)}`)
        .join("\n"),
    );
}

export async function main(argv = process.argv.slice(2), root = process.cwd()) {
  const input = parseArguments(argv);
  if (input.categories.length === 0)
    input.categories = await promptCategories();
  const slug = validateInput(input);
  const destination = path.join(
    root,
    "content/posts",
    input.date.slice(0, 4),
    `${slug}.md`,
  );
  try {
    await access(destination);
    throw new Error(`refusing to overwrite ${destination}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  const candidate = {
    title: input.title,
    date: input.date,
    url: `/${slug}/`,
    image: `images/${input.date.slice(0, 4)}-thumbs/${slug}.webp`,
    categories: input.categories,
    tags: [],
    draft: true,
  };
  await assertCandidateAvailable(candidate, root);
  const template = await readFile(
    path.join(root, "templates/post.md.tmpl"),
    "utf8",
  );
  const output = renderTemplate(template, input, slug);
  const match = output.match(/^---\n([\s\S]*?)\n---/);
  const parsed = YAML.parse(match[1]);
  if (parsed.title !== input.title)
    throw new Error("generated title failed exact YAML round trip");
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, output, { encoding: "utf8", flag: "wx" });
  console.log(`Created ${destination}`);
  console.log(`URL: /${slug}/`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
