import { describe, expect, it } from "vitest";

import {
  isEligibleData,
  publicationTimeData,
  selectHomepageItems,
  taxonomySlug,
  validateFeaturedOrders,
} from "../../src/lib/content-logic";

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

  it("includes draft and future content in content preview", () => {
    expect(
      isEligibleData({ date: "2099-01-01", draft: true }, instant, true),
    ).toBe(true);
  });
});

describe("taxonomy slugs", () => {
  it("preserves Hugo-compatible plus and underscore routes", () => {
    expect(taxonomySlug("DISM++")).toBe("dism++");
    expect(taxonomySlug("Pop!_OS")).toBe("pop_os");
    expect(taxonomySlug("Software Dev")).toBe("software-dev");
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
