import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { transformBody, validateDate, validatePost } from "../../scripts/prepare-content.mjs";

describe("Hugo compatibility preprocessing", () => {
  it("renders table, notice, embeds, and shopify shortcodes", async () => {
    const defender = await readFile(".astro-content/posts/2022/bad-windows-defender.md", "utf8");
    const notice = await readFile(".astro-content/posts/2026/topgrade-linux.md", "utf8");
    const x = await readFile(".astro-content/posts/2022/best-package-manager.md", "utf8");
    const youtube = await readFile(".astro-content/posts/2022/2022-recap.md", "utf8");
    const shopify = await readFile(".astro-content/pages/downloads.md", "utf8");
    expect(defender).toContain('<table>');
    expect(notice).toContain("notice-tip");
    expect(x).toContain("https://x.com/");
    expect(youtube).toContain("youtube-nocookie.com");
    expect(shopify).toContain("data-shopify-products");
  });

  it("keeps literal shortcode examples inside fenced code", async () => {
    const hugo = await readFile(".astro-content/posts/2020/hugo-guide.md", "utf8");
    expect(hugo).toContain('{{ partial "share-buttons.html" . }}');
  });

  it("transforms only active shortcodes", () => {
    const literal = "```md\n{{< youtube abc123 >}}\n```\n`{{< youtube inline123 >}}`";
    expect(transformBody(literal, {}, "fixture.md")).toBe(literal);
    expect(() => transformBody("{{< unsupported value >}}", {}, "fixture.md")).toThrow(
      "unsupported active Hugo shortcode unsupported",
    );
  });

  it("does not let a single-line fenced command hide later shortcodes", () => {
    const output = transformBody("```sudo apt update```\n{{< youtube abc123 >}}", {}, "fixture.md");
    expect(output).toContain("youtube-nocookie.com/embed/abc123");
  });

  it("maps unsupported fstab highlighting to plain text", () => {
    expect(transformBody("```fstab\n/dev/sda / ext4 defaults 0 1\n```", {}, "fixture.md")).toContain(
      "```text",
    );
  });
});

describe("front matter validation", () => {
  it("requires timezone offsets on timestamps", () => {
    expect(() => validateDate("2026-08-13T18:00:00", "fixture.md")).toThrow("include a UTC offset");
    expect(() => validateDate("2026-13-99", "fixture.md")).toThrow("invalid date");
    expect(() => validateDate("2026-08-13T18:00:00-05:00", "fixture.md")).not.toThrow();
  });

  it("requires a canonical category for new posts", () => {
    const base = { title: "Fixture", date: "2026-08-13", url: "/fixture/", categories: [] };
    expect(() => validatePost(base, "fixture.md")).toThrow("at least one category");
    expect(() => validatePost({ ...base, categories: ["Software Dev"] }, "fixture.md")).not.toThrow();
    expect(() => validatePost({ ...base, categories: ["software dev"] }, "fixture.md")).toThrow(
      "category software dev is not valid",
    );
  });

  it("accepts only the exact legacy category URL pairs", () => {
    const base = { title: "Fixture", date: "2026-08-13", categories: ["macOS"] };
    expect(() => validatePost({ ...base, url: "/2020-buyers-guide/" }, "legacy.md")).not.toThrow();
    expect(() => validatePost({ ...base, url: "/macos-sysadmin-tips/" }, "legacy.md")).toThrow("not valid");
    expect(() => validatePost({ ...base, url: "/new-post/" }, "new.md")).toThrow("not valid");
    expect(() => validatePost({ ...base, url: "/macos-sysadmin-tips/", categories: ["macos"] }, "legacy.md")).not.toThrow();
  });

  it("preserves strict draft and featured types for schema validation", () => {
    const base = { title: "Fixture", date: "2026-08-13", url: "/fixture/", categories: ["Linux"] };
    expect(() => validatePost({ ...base, draft: "true" }, "fixture.md")).toThrow("draft must be a boolean");
    expect(() => validatePost({ ...base, featuredOrder: 4 }, "fixture.md")).toThrow("featuredOrder");
  });
});
