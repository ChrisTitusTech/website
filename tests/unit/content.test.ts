import { describe, expect, it } from "vitest";

import {
  displayDateData,
  feedPublicationDateData,
  isEligibleData,
  publicationTimeData,
  selectHomepageItems,
  summaryText,
  taxonomyOverlapScore,
  taxonomySlug,
  validateFeaturedOrders,
} from "../../src/lib/content-logic";
import { renderFeedContent } from "../../src/lib/feed-content";
import { requiredLivestreamDate } from "../../src/lib/livestreams";
import { escapeXml } from "../../src/lib/xml";

describe("production eligibility", () => {
  const instant = new Date("2026-08-13T18:00:00Z");

  it.each([
    ["2026-08-13T12:59:59-05:00", true],
    ["2026-08-13T13:00:00-05:00", true],
    ["2026-08-13T13:00:01-05:00", false],
    ["2026-08-12", true],
    ["2026-08-13", true],
    ["2026-08-14", false],
  ])("evaluates %s", (date, expected) => {
    expect(isEligibleData({ date }, instant)).toBe(expected);
  });

  it("excludes only explicit drafts", () => {
    expect(isEligibleData({ date: "2026-08-13" }, instant)).toBe(true);
    expect(isEligibleData({ date: "2026-08-13", draft: true }, instant)).toBe(
      false,
    );
  });

  it("admits undated pages while filtering dated draft and future pages", () => {
    expect(isEligibleData({}, instant)).toBe(true);
    expect(isEligibleData({ draft: true }, instant)).toBe(false);
    expect(isEligibleData({ date: "2099-01-01" }, instant)).toBe(false);
  });

  it("includes draft and future content in content preview", () => {
    expect(
      isEligibleData({ date: "2099-01-01", draft: true }, instant, true),
    ).toBe(true);
  });
});

describe("taxonomy slugs", () => {
  it("preserves plus and underscore routes", () => {
    expect(taxonomySlug("DISM++")).toBe("dism++");
    expect(taxonomySlug("Pop!_OS")).toBe("pop_os");
    expect(taxonomySlug("Software Dev")).toBe("software-dev");
  });

  it("scores related taxonomy values by their normalized routes", () => {
    expect(
      taxonomyOverlapScore(
        { categories: ["MacOS"], tags: ["Software Development"] },
        { categories: ["macOS"], tags: ["software-development"] },
      ),
    ).toBe(3);
  });
});

describe("homepage selection", () => {
  const instant = new Date("2026-08-13T18:00:00Z");
  const item = (
    url: string,
    date: string,
    draft?: boolean,
    featuredOrder?: number,
  ) => ({
    data: {
      url,
      date,
      ...(draft === undefined ? {} : { draft }),
      ...(featuredOrder === undefined ? {} : { featuredOrder }),
    },
  });

  it("excludes draft and future curated posts while including an omitted draft", () => {
    const selected = selectHomepageItems(
      [
        item("/future/", "2099-01-01", false, 1),
        item("/draft/", "2026-08-13", true, 2),
        item("/published/", "2026-08-13"),
        item("/older/", "2026-08-12"),
      ],
      instant,
    );
    expect(selected.map((entry) => entry.data.url)).toEqual([
      "/published/",
      "/older/",
    ]);
  });

  it("uses case-sensitive canonical URLs for equal-date fallback ordering", () => {
    const selected = selectHomepageItems(
      [
        item("/beta/", "2026-08-13"),
        item("/Alpha/", "2026-08-13"),
        item("/alpha/", "2026-08-13"),
      ],
      instant,
    );
    expect(selected.map((entry) => entry.data.url)).toEqual([
      "/Alpha/",
      "/alpha/",
      "/beta/",
    ]);
  });

  it("rejects duplicate and out-of-range featured slots", () => {
    expect(() =>
      validateFeaturedOrders([
        { url: "/a/", featuredOrder: 1 },
        { url: "/b/", featuredOrder: 1 },
      ]),
    ).toThrow("duplicated");
    expect(() =>
      validateFeaturedOrders([{ url: "/a/", featuredOrder: 4 }]),
    ).toThrow("must be 1, 2, or 3");
  });
});

describe("date-only publication keys", () => {
  it("uses exact Chicago midnight across DST transitions", () => {
    expect(
      new Date(publicationTimeData({ date: "2026-03-08" })).toISOString(),
    ).toBe("2026-03-08T06:00:00.000Z");
    expect(
      new Date(publicationTimeData({ date: "2026-11-01" })).toISOString(),
    ).toBe("2026-11-01T05:00:00.000Z");
  });
});

describe("display dates", () => {
  it("preserves the calendar date stated by an offset timestamp", () => {
    expect(displayDateData({ date: "2016-09-19T00:07:43+00:00" })).toBe(
      "September 19, 2016",
    );
  });
});

describe("RSS content", () => {
  it("preserves full Markdown, raw HTML, images, and embeds", () => {
    const body = [
      "# Start",
      "",
      '<div class="fixture">Raw HTML</div>',
      "",
      "![Image](/images/fixture.webp)",
      "",
      '<iframe src="https://www.youtube-nocookie.com/embed/fixture" title="Video"></iframe>',
      "",
      "Tail marker.",
    ].join("\n");
    const result = renderFeedContent(body);
    expect(result).toContain('<div class="fixture">Raw HTML</div>');
    expect(result).toContain('src="/images/fixture.webp"');
    expect(result).toContain("youtube-nocookie.com/embed/fixture");
    expect(result).toContain("Tail marker.");
  });

  it("requires real offset timestamps for livestream publication dates", () => {
    expect(
      requiredLivestreamDate(
        "2026-08-13T18:00:00-05:00",
        "fixture",
      ).toISOString(),
    ).toBe("2026-08-13T23:00:00.000Z");
    for (const invalid of [
      undefined,
      "2026-08-13T18:00:00",
      "2026-02-30T00:00:00Z",
      "2026-01-01T24:00:00Z",
      "2026-01-01T12:00:00+24:00",
    ])
      expect(() => requiredLivestreamDate(invalid, "fixture")).toThrow(
        /publishedAt/,
      );
  });

  it("escapes every XML-sensitive character", () => {
    expect(escapeXml(`A&B <C> "D" 'E'`)).toBe(
      "A&amp;B &lt;C&gt; &quot;D&quot; &apos;E&apos;",
    );
  });

  it("falls back to body text when the summary marker comes first", () => {
    expect(summaryText("<!--more-->\nVisible fallback text.")).toBe(
      "Visible fallback text.",
    );
  });

  it("publishes date-only feed entries at UTC midnight", () => {
    expect(feedPublicationDateData({ date: "2026-08-13" }).toISOString()).toBe(
      "2026-08-13T00:00:00.000Z",
    );
  });
});
