import { hash, publicUrl } from "./common.mjs";

export const scrapeOptions = {
  formats: ["markdown"],
  onlyMainContent: true,
  maxAge: 0,
};

function isChallenge(text, title) {
  // Match interstitial labels, not phrases embedded in documentation prose.
  // Inspect every line so a long challenge page cannot evade the guard.
  const label =
    /^(?:(?:captcha|access denied|sign in to continue|checking your browser|just a moment|enable javascript and cookies to continue)(?:[.!\u2026]|\.{3})?|attention required!?\s*\|\s*cloudflare)$/i;
  return [title, ...text.split(/\r?\n/)].some(
    (line) =>
      typeof line === "string" &&
      label.test(line.trim().replace(/^#{1,6}\s+/, "")),
  );
}

export function normalizeEvidence(
  url,
  payload,
  policy,
  retrievedAt = new Date().toISOString(),
) {
  url = publicUrl(url, policy.domains);
  const data = payload?.data ?? payload;
  const finalUrl = publicUrl(
    data?.metadata?.url ?? data?.metadata?.sourceURL ?? url,
    policy.domains,
  );
  const text = typeof data?.markdown === "string" ? data.markdown : "";
  const status = data?.metadata?.statusCode;
  const failed =
    payload?.success === false ||
    Boolean(payload?.error || data?.error || data?.metadata?.error) ||
    !Number.isInteger(status) ||
    status < 200 ||
    status >= 300 ||
    !text.trim() ||
    isChallenge(text, data?.metadata?.title);
  if (!Number.isFinite(Date.parse(retrievedAt)))
    throw new Error("Invalid retrieval timestamp");
  return {
    id: hash(url).slice(0, 16),
    url,
    finalUrl,
    retrievedAt,
    status: Number.isInteger(status) ? status : null,
    outcome: failed ? "unverifiable" : "retrieved",
    warning:
      data?.warning || payload?.warning
        ? "Provider returned a warning; review the source manually"
        : null,
    sourceDate:
      data?.metadata?.publishedTime ?? data?.metadata?.modifiedTime ?? null,
    contentHash: hash(text),
    text: text.slice(0, 40000),
    truncated: text.length > 40000,
    options: scrapeOptions,
    provider: "firecrawl",
  };
}

export function evidenceFresh(e, policy, now = Date.now()) {
  try {
    publicUrl(e.url, policy.domains);
    publicUrl(e.finalUrl, policy.domains);
  } catch {
    return false;
  }
  const age = now - Date.parse(e.retrievedAt);
  return (
    e.outcome === "retrieved" &&
    !e.warning &&
    age >= -60000 &&
    age <= policy.evidenceMaxAgeDays * 86400000
  );
}

// Only the fixed provider API is contacted locally. Firecrawl owns remote URL
// resolution and redirect following; returned destinations are checked again.
export function firecrawlClient({
  key = process.env.FIRECRAWL_API_KEY,
  fetchImpl = fetch,
  reserve,
  policy,
  sleep = (ms) => new Promise((r) => setTimeout(r, ms)),
}) {
  async function call(endpoint, body) {
    if (!key)
      throw new Error(
        "FIRECRAWL_API_KEY is required for live scans; use --evidence for connected-tool captures",
      );
    for (let attempt = 0; attempt < 3; attempt++) {
      await reserve(); // Persist before sending, including every failed attempt.
      let response;
      try {
        response = await fetchImpl(`https://api.firecrawl.dev/v2/${endpoint}`, {
          method: "POST",
          redirect: "error",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(policy.timeoutMs),
        });
      } catch {
        if (attempt === 2)
          throw new Error("Firecrawl request failed or timed out");
        await sleep(1000 * 2 ** attempt);
        continue;
      }
      if (
        (response.status === 408 ||
          response.status === 429 ||
          response.status >= 500) &&
        attempt < 2
      ) {
        const retryAfter = response.headers.get("retry-after")?.trim();
        const delay = /^\d+$/.test(retryAfter ?? "")
          ? Number(retryAfter) * 1000
          : Date.parse(retryAfter ?? "") - Date.now();
        // Do not hammer a server whose requested delay exceeds this run's bounds.
        if (delay > 60000)
          throw new Error("Firecrawl rate limited; resume later");
        await sleep(
          Math.max(1000 * 2 ** attempt, Number.isFinite(delay) ? delay : 0),
        );
        continue;
      }
      if (!response.ok) throw new Error(`Firecrawl HTTP ${response.status}`);
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error("Invalid Firecrawl JSON response");
      }
      if (result.success === false || result.error)
        throw new Error("Firecrawl could not retrieve the source");
      return result;
    }
  }
  return {
    scrape: async (url) =>
      normalizeEvidence(
        publicUrl(url, policy.domains),
        await call("scrape", { url, ...scrapeOptions }),
        policy,
      ),
    search: async (query) => {
      if (typeof query !== "string" || query.length > 300)
        throw new Error("Invalid search query");
      const result = await call("search", {
        query,
        limit: 5,
        sources: ["web"],
      });
      return (result.data?.web ?? []).flatMap((hit) => {
        try {
          return [
            {
              url: publicUrl(hit.url, policy.domains),
              title: String(hit.title ?? "").slice(0, 200),
            },
          ];
        } catch {
          return [];
        }
      });
    },
  };
}
