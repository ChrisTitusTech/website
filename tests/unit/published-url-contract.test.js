import { describe, expect, it } from "vitest";

import { validatePublishedUrlContract } from "../../scripts/published-url-contract.mjs";

describe("published URL contract", () => {
  it("accepts an unchanged contract and newly published URLs", () => {
    expect(() =>
      validatePublishedUrlContract(
        ["/existing/", "/new/"],
        ["/existing/", "/new/"],
        ["/existing/"],
      ),
    ).not.toThrow();
  });

  it("allows a scheduled URL to be registered before publication", () => {
    expect(() =>
      validatePublishedUrlContract(
        ["/existing/", "/scheduled/"],
        ["/existing/", "/scheduled/"],
        ["/existing/"],
      ),
    ).not.toThrow();
  });

  it("rejects URLs removed from the base contract", () => {
    expect(() =>
      validatePublishedUrlContract(
        ["/remaining/"],
        ["/remaining/"],
        ["/remaining/", "/removed/"],
      ),
    ).toThrow("removed from contract: /removed/");
  });

  it("rejects missing, uncontracted, and malformed entries", () => {
    expect(() =>
      validatePublishedUrlContract(["/current/"], ["/missing/"]),
    ).toThrow("missing: /missing/");
    expect(() => validatePublishedUrlContract(["/current/"], [])).toThrow(
      "uncontracted: /current/",
    );
    expect(() => validatePublishedUrlContract([], ["/b/", "/a/"])).toThrow(
      "must be a sorted array of unique strings",
    );
  });
});
