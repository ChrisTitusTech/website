import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import YAML from "yaml";
import { afterEach, describe, expect, it } from "vitest";

import site from "../../src/data/site.json" with { type: "json" };
import {
  chicagoToday,
  main,
  parseArguments,
  renderTemplate,
  slugify,
  validateInput,
} from "../../scripts/new-post.mjs";
import {
  assertCandidateAvailable,
  buildInventory,
  emittedPath,
  publicOutputPath,
  redirectMatches,
  routeKey,
} from "../../scripts/route-contract.mjs";

const temporaryRoots = [];

async function fixture(publicFiles = ["index.html"], redirects = "") {
  const root = await mkdtemp(path.join(tmpdir(), "website-scaffolder-"));
  temporaryRoots.push(root);
  await Promise.all([
    mkdir(path.join(root, "src/content/posts"), { recursive: true }),
    mkdir(path.join(root, "public"), { recursive: true }),
    mkdir(path.join(root, "templates"), { recursive: true }),
  ]);
  for (const file of publicFiles) {
    const target = path.join(root, "public", file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, "fixture");
  }
  await writeFile(path.join(root, "public/_redirects"), redirects);
  await writeFile(
    path.join(root, "templates/post.md.tmpl"),
    await readFile("templates/post.md.tmpl", "utf8"),
  );
  return root;
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots
      .splice(0)
      .map((root) => rm(root, { recursive: true, force: true })),
  );
});

describe("post scaffolder", () => {
  it("generates deterministic dates and slugs", () => {
    expect(chicagoToday(new Date("2026-01-01T03:00:00Z"))).toBe("2025-12-31");
    expect(slugify("  Café: C# \\ Tools!  ")).toBe("cafe-c-tools");
  });

  it("accepts repeatable canonical categories including Software Dev", () => {
    const input = parseArguments([
      "A post",
      "--date",
      "2026-08-13",
      "--category",
      "Linux",
      "--category",
      "Software Dev",
    ]);
    expect(validateInput(input)).toBe("a-post");
    expect(input.categories).toEqual(["Linux", "Software Dev"]);
  });

  it("rejects duplicate category flags", () => {
    const input = parseArguments([
      "A post",
      "--date",
      "2026-08-13",
      "--category",
      "Linux",
      "--category",
      "Linux",
    ]);
    expect(() => validateInput(input)).toThrow("must not contain duplicates");
  });

  it.each(["macOS", "macos", "Not Real"])(
    "rejects invalid new category %s",
    (category) => {
      expect(() =>
        validateInput({
          title: "Post",
          date: "2026-08-13",
          categories: [category],
        }),
      ).toThrow("invalid category");
    },
  );

  it("presents and accepts every canonical category", () => {
    for (const category of site.categories) {
      expect(() =>
        validateInput({
          title: category,
          date: "2026-08-13",
          categories: [category],
        }),
      ).not.toThrow();
    }
  });

  it("rejects missing categories and impossible calendar dates", () => {
    expect(() =>
      validateInput({ title: "Post", date: "2026-08-13", categories: [] }),
    ).toThrow("at least one category");
    expect(() =>
      validateInput({
        title: "Post",
        date: "2026-02-30",
        categories: ["Linux"],
      }),
    ).toThrow("real calendar date");
  });

  it("round trips YAML metacharacters exactly", async () => {
    const title = 'Colon: # hash "quote" \\ slash $& $$ $` $\'\nnext';
    const input = { title, date: "2026-08-13", categories: ["Software Dev"] };
    const template = await readFile("templates/post.md.tmpl", "utf8");
    const output = renderTemplate(template, input, slugify(title));
    const header = output.match(/^---\n([\s\S]*?)\n---/)[1];
    expect(YAML.parse(header).title).toBe(title);
    expect(output).toContain("draft: true");
    expect(output).toContain("<!--more-->");
  });

  it("normalizes routes without changing case", () => {
    expect(routeKey("Post//")).toBe("/Post/");
    expect(emittedPath("/foo/")).toBe("foo/index.html");
    expect(publicOutputPath("/categories/linux/index.xml")).toBe(
      "categories/linux/index.xml",
    );
    expect(redirectMatches("/guides/:slug", "/guides/linux/")).toBe(true);
    expect(redirectMatches("/legacy/*", "/legacy/a/b/")).toBe(true);
  });

  it("rejects an existing route and accepts a new Software Dev route", async () => {
    await expect(
      assertCandidateAvailable({
        title: "Duplicate",
        date: "2026-08-13",
        url: "/my-ai-workflow/",
        categories: ["Software Dev"],
        tags: [],
      }),
    ).rejects.toThrow("URL collision");
    await expect(
      assertCandidateAvailable({
        title: "Reserved",
        date: "2026-08-13",
        url: "/live-streams/page/2/",
        categories: ["Software Dev"],
        tags: [],
      }),
    ).rejects.toThrow("URL collision");
    await expect(
      assertCandidateAvailable({
        title: "Unique",
        date: "2099-01-01",
        url: "/vitest-unique-scaffold-route/",
        categories: ["Software Dev"],
        tags: [],
      }),
    ).resolves.toBeUndefined();
  });

  it("virtually induces taxonomy, feed, alias, and pagination routes", async () => {
    const root = await fixture();
    const inventory = await buildInventory(
      {
        title: "New",
        date: "2026-08-13",
        url: "/new/",
        categories: ["Software Dev"],
        tags: ["Fresh Tag"],
      },
      root,
    );
    expect([...inventory.induced]).toEqual(
      expect.arrayContaining([
        "/new/",
        "/posts/2026/new/",
        "/categories/software-dev/",
        "/categories/software-dev/page/1/",
        "/categories/software-dev/index.xml",
        "/tags/fresh-tag/",
        "/tags/fresh-tag/page/1/",
        "/tags/fresh-tag/index.xml",
      ]),
    );
    expect(inventory.routes).toContain("/live-streams/index.xml");
  });

  it("detects routes from nested standalone pages", async () => {
    const root = await fixture();
    const page = path.join(root, "src/content/guides/getting-started.md");
    await mkdir(path.dirname(page), { recursive: true });
    await writeFile(page, "---\ntitle: Getting Started\n---\n");

    await expect(
      assertCandidateAvailable(
        {
          title: "Duplicate",
          date: "2026-08-13",
          url: "/guides/getting-started/",
          categories: ["Linux"],
          tags: [],
        },
        root,
      ),
    ).rejects.toThrow("URL collision");
  });

  it("rejects a candidate source alias owned by an existing post", async () => {
    const root = await fixture();
    await mkdir(path.join(root, "src/content/posts/2026"), { recursive: true });
    await writeFile(
      path.join(root, "src/content/posts/2026/existing.md"),
      '---\ntitle: Existing\ndate: "2026-08-01"\nurl: /existing/\ncategories: [Linux]\ntags: []\n---\n',
    );

    await expect(
      assertCandidateAvailable(
        {
          title: "Duplicate alias",
          date: "2026-08-13",
          url: "/unique-canonical/",
          categories: ["Linux"],
          tags: [],
          _sourceSlug: "existing",
        },
        root,
      ),
    ).rejects.toThrow("route collision: /posts/2026/existing/");
  });

  it("detects exact, wildcard, and parameterized redirect overlap", async () => {
    for (const source of [
      "/blocked/ /target/ 301\n",
      "/blocked/* /target/ 301\n",
      "/:slug /target/ 301\n",
    ]) {
      const root = await fixture(["index.html"], source);
      await expect(
        assertCandidateAvailable(
          {
            title: "Blocked",
            date: "2026-08-13",
            url: "/blocked/",
            categories: ["Linux"],
            tags: [],
          },
          root,
        ),
      ).rejects.toThrow("overlaps redirect source");
    }
  });

  it("normalizes trailing slashes while preserving route case", async () => {
    const root = await fixture(["index.html", "Post/index.html"]);
    await expect(
      assertCandidateAvailable(
        {
          title: "Same",
          date: "2026-08-13",
          url: "Post//",
          categories: ["Linux"],
          tags: [],
        },
        root,
      ),
    ).rejects.toThrow("URL collision");
    await expect(
      assertCandidateAvailable(
        {
          title: "Distinct",
          date: "2026-08-13",
          url: "/post/",
          categories: ["Linux"],
          tags: [],
        },
        root,
      ),
    ).resolves.toBeUndefined();
  });

  it("rejects static output and file/directory ancestor conflicts", async () => {
    const exact = await fixture();
    await mkdir(path.join(exact, "public/asset"), { recursive: true });
    await writeFile(path.join(exact, "public/asset/index.html"), "static");
    await expect(
      assertCandidateAvailable(
        {
          title: "Asset",
          date: "2026-08-13",
          url: "/asset/",
          categories: ["Linux"],
          tags: [],
        },
        exact,
      ),
    ).rejects.toThrow(/collision/);

    const ancestor = await fixture(["index.html", "ancestor-other"]);
    await writeFile(path.join(ancestor, "public/ancestor"), "static");
    await expect(
      assertCandidateAvailable(
        {
          title: "Child",
          date: "2026-08-13",
          url: "/ancestor/child/",
          categories: ["Linux"],
          tags: [],
        },
        ancestor,
      ),
    ).rejects.toThrow("file/directory output conflict");
  });

  it("induces collection pagination at the page boundary", async () => {
    const root = await fixture();
    for (let index = 0; index < site.postsPerPage; index += 1) {
      await writeFile(
        path.join(root, "src/content/posts", `post-${index}.md`),
        `---\ntitle: Post ${index}\ndate: "2026-08-01"\nurl: /post-${index}/\ncategories: [Linux]\ntags: []\n---\n`,
      );
    }
    const inventory = await buildInventory(
      {
        title: "Eleventh",
        date: "2026-08-13",
        url: "/eleventh/",
        categories: ["Linux"],
        tags: [],
      },
      root,
    );
    expect([...inventory.induced]).toEqual(
      expect.arrayContaining([
        "/posts/page/2/",
        "/archive/page/2/",
        "/categories/linux/page/2/",
      ]),
    );
  });

  it("writes the schema-compatible output once and refuses overwrite", async () => {
    const root = await fixture();
    const args = [
      "Safe: Post",
      "--date",
      "2026-08-13",
      "--category",
      "Software Dev",
    ];
    await main(args, root);
    const output = await readFile(
      path.join(root, "src/content/posts/2026/safe-post.md"),
      "utf8",
    );
    expect(YAML.parse(output.match(/^---\n([\s\S]*?)\n---/)[1])).toMatchObject({
      title: "Safe: Post",
      date: "2026-08-13",
      url: "/safe-post/",
      categories: ["Software Dev"],
      draft: true,
    });
    await expect(main(args, root)).rejects.toThrow("refusing to overwrite");
  });
});
