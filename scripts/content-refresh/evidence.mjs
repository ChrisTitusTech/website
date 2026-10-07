import { hash, publicUrl } from "./common.mjs";

export const scrapeOptions = {
  formats: ["markdown"],
  onlyMainContent: true,
  maxAge: 0,
};

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
  // Conservatively require manual review when challenge text appears, even in
  // verbose interstitials; response length is not proof of usable content.
  const failed =
    payload?.success === false ||
    !Number.isInteger(status) ||
    status < 200 ||
    status >= 300 ||
    !text.trim() ||
    /captcha|access denied|sign in|checking your browser/i.test(text);
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
      if ((response.status === 429 || response.status >= 500) && attempt < 2) {
        const seconds = Number(response.headers.get("retry-after"));
        // Do not hammer a server whose requested delay exceeds this run's bounds.
        if (Number.isFinite(seconds) && seconds > 60)
          throw new Error("Firecrawl rate limited; resume later");
        await sleep(
          Math.min(60000, Math.max(1000 * 2 ** attempt, (seconds || 0) * 1000)),
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
