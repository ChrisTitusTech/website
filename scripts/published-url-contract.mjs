import { spawnSync } from "node:child_process";
import path from "node:path";

export const publishedUrlContractPath =
  "tests/contracts/published-post-urls.json";

function assertContractShape(contract, label) {
  if (
    !Array.isArray(contract) ||
    contract.some((url) => typeof url !== "string") ||
    new Set(contract).size !== contract.length ||
    JSON.stringify(contract) !== JSON.stringify([...contract].sort())
  )
    throw new Error(`${label} must be a sorted array of unique strings`);
}

export function validatePublishedUrlContract(
  currentUrls,
  contract,
  baseContract = [],
) {
  assertContractShape(contract, "published post URL contract");
  assertContractShape(baseContract, "base published post URL contract");

  const currentUrlSet = new Set(currentUrls);
  const contractUrlSet = new Set(contract);
  const missingContractUrls = contract.filter((url) => !currentUrlSet.has(url));
  const uncontractedUrls = [...currentUrlSet]
    .filter((url) => !contractUrlSet.has(url))
    .sort();
  const removedContractUrls = baseContract.filter(
    (url) => !contractUrlSet.has(url),
  );
  if (
    missingContractUrls.length ||
    uncontractedUrls.length ||
    removedContractUrls.length
  )
    throw new Error(
      [
        "published post URL contract changed",
        ...missingContractUrls.map((url) => `missing: ${url}`),
        ...uncontractedUrls.map((url) => `uncontracted: ${url}`),
        ...removedContractUrls.map((url) => `removed from contract: ${url}`),
      ].join("\n"),
    );
}

export function readBasePublishedUrlContract(
  root,
  baseRef = process.env.PUBLISHED_URL_BASE_REF,
) {
  if (!baseRef) return [];

  const verified = spawnSync(
    "git",
    ["rev-parse", "--verify", `${baseRef}^{commit}`],
    { cwd: root, encoding: "utf8" },
  );
  if (verified.status !== 0)
    throw new Error(
      `could not resolve published URL base ref ${baseRef}: ${verified.stderr.trim()}`,
    );

  const object = `${baseRef}:${publishedUrlContractPath}`;
  const exists = spawnSync("git", ["cat-file", "-e", object], {
    cwd: root,
    encoding: "utf8",
  });
  if (exists.status !== 0) return [];

  const shown = spawnSync("git", ["show", object], {
    cwd: root,
    encoding: "utf8",
  });
  if (shown.status !== 0)
    throw new Error(
      `could not read ${path.posix.join(baseRef, publishedUrlContractPath)}: ${shown.stderr.trim()}`,
    );
  return JSON.parse(shown.stdout);
}
