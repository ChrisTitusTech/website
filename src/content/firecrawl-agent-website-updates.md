---
title: "Firecrawl agent website updates"
description: "An implementation plan for finding outdated website content, verifying changes with Firecrawl, and preparing reviewed updates."
date: 2026-10-07
url: /firecrawl-agent-website-updates/
type: page
---

## Goal and current status

Build a local maintenance agent that finds outdated information on christitus.com, checks authoritative sources through Firecrawl, and prepares small, evidence-backed Markdown updates. This page is the implementation plan. The updater, scheduled scans, and automatic publication are not implemented.

The first release will produce a review report and proposed patches. A maintainer will approve individual changes before they are applied locally. Publishing remains a separate, explicitly authorized step through the website's existing review and deployment process.

## What counts as expired content?

An old publication date is a reason to investigate, not a reason to rewrite. The agent must distinguish current guidance from historical accounts, personal opinions, and instructions intentionally written for an older release.

- **Broken destinations:** a download or documentation link repeatedly fails, or its destination no longer serves the intended purpose. A timeout, login screen, rate limit, or bot challenge means verification is incomplete.
- **Obsolete instructions:** official documentation establishes that a command, package, flag, installation method, or API has changed for the version the guide claims to support.
- **Unsupported software:** a vendor announces end of support for a release presented as currently supported.
- **Time-sensitive claims:** current-version statements, availability, prices, or recommendations conflict with dated primary evidence.
- **Historical material:** dated reviews and older-version tutorials remain historical. Propose a dated notice or link to a newer guide when useful, rather than silently changing the original account.

Security guidance, executable commands, affiliate destinations, commercial recommendations, and legal pages require explicit editorial review. A successful scrape alone never proves a claim is current or a replacement is appropriate.

## Proposed workflow

1. Inventory production-eligible source content and map each canonical URL to its local Markdown file.
2. Extract external links, software names, version claims, and relevant article sections.
3. Prioritize content that has never been checked, has time-sensitive claims, or is due for rechecking.
4. Retrieve linked primary sources with Firecrawl; search for official replacements when needed.
5. Compare the article's specific claims with the evidence, including product version and platform context.
6. Classify each finding as current, confirmed outdated, historical, needs review, or unverifiable.
7. Generate a report with citations and the smallest proposed patch for each confirmed finding.
8. Apply selected findings only after approval, validate the resulting site, and prepare a local commit.

The website remains fully static. Firecrawl runs from a local Node.js maintenance command, never from a visitor's browser or the production Astro build.

## Phase 1: Inventory and editorial policy

**Deliverables:** a content inventory command, a versioned policy file, and a report schema.

Read articles under `src/content/posts/` and standalone Markdown under `src/content/`. Reuse the repository's parsing and eligibility rules, including one captured build instant, the America/Chicago calendar, draft exclusion, future-date exclusion, and `build.render: never`. Reconcile source records with the route contract so excluded files and generated pages are not mistaken for editable articles.

Keep generated livestream data, chat archives, search indexes, feeds, assets, and build output outside the editable scope. Record generated routes as such in coverage reports. All editable published content can be inventoried, while sensitive or historical content can be report-only.

For each document, record its source path, canonical URL, title, publication date, content hash, detected links, policy category, last successful check, and next check date. Put maintenance state in a separate file rather than changing publication dates to make articles appear new.

**Acceptance:** every eligible source has one unambiguous route mapping; excluded content is counted with a reason; inventory runs make no content edits or network requests.

## Phase 2: Firecrawl evidence collection

**Deliverables:** a server-side Firecrawl adapter, normalized evidence records, and resumable local run storage.

Use targeted scraping for known documentation and release-note URLs. Use search only when a source is missing or has moved, preferring official documentation, vendor support policies, and upstream release notes. A bounded map or crawl can discover a documentation section when individual URLs are insufficient; it must have a page and domain limit.

Firecrawl can retrieve Markdown for comparison. Its change-tracking feature reports differences between scrapes; it does not decide whether an article needs correction. The first scrape establishes a baseline. Keep extraction settings and source URLs consistent, and handle missing change-tracking data as incomplete evidence. See the [Firecrawl change-tracking documentation](https://docs.firecrawl.dev/features/change-tracking).

For ordinary verification scrapes, explicitly request fresh content with `maxAge: 0`; use a bounded cache age only for discovery that does not support a final correction. Change-tracking requests currently bypass the index cache. Verify these behaviors against the API version chosen during implementation. See [Firecrawl freshness controls](https://docs.firecrawl.dev/features/fast-scraping) and the [scrape reference](https://docs.firecrawl.dev/api-reference/endpoint/scrape).

Save the requested and final URL, retrieval time, available source publication or update date, response status, extraction settings, relevant excerpt, content hash, warnings, and source-to-claim association. Retrieval time must not be presented as the source's publication date.

**Acceptance:** fixtures cover successful retrieval, redirects, deleted pages, empty content, authentication challenges, timeouts, rate limits, malformed responses, and partial jobs. Interrupted runs resume without losing findings or marking unchecked content current.

## Phase 3: Claim comparison and review queue

**Deliverables:** deterministic link checks, a structured claim-comparison step, and a human-readable report.

Use deterministic rules for URL status and known version fields. Use a separately configured language-model adapter for prose comparison and proposed wording; Firecrawl supplies research evidence. The model provider and model remain implementation decisions. Validate every model response against a strict schema before it can become a finding.

A finding includes the article section, original claim, proposed correction, supporting source URLs and excerpts, applicable version/platform, reason, confidence rationale, and required reviewer action. Unsupported claims, conflicting sources, and unavailable sources stay in the review queue without an automatic patch.

Separate site coverage from finding confidence. Report the number inventoried, due, checked, confirmed outdated, unchanged, historical, failed, and deferred by budget. A partial scan cannot be labeled a complete website audit.

**Acceptance:** a labeled fixture set distinguishes obsolete instructions from valid legacy tutorials, ignores navigation-only source changes, and rejects corrections without supporting evidence. Every proposed correction is traceable to the exact evidence used.

## Phase 4: Minimal patches and local approval

**Deliverables:** a patch generator, an approval manifest, and an explicit apply command.

Preserve canonical URLs and their case, original publication dates, taxonomy spelling, unknown front-matter extensions, `<!--more-->` boundaries, and supported Hugo shortcodes. Preserve code blocks unless a command change is the specific approved finding. Never execute commands extracted from an article or research page.

The default scan writes reports and patches outside the public content tree. Applying a patch requires selected finding IDs and matching source hashes. Reject edits if the file has changed since review, if a patch escapes the allowlisted content paths, or if approval does not match the current patch. Do not overwrite unrelated local changes.

Prefer a paragraph correction, replacement link, or dated update note over a whole-article rewrite. Validate replacement destinations and preserve affiliate parameters unless their removal is specifically approved.

**Acceptance:** dry runs leave tracked content unchanged; duplicate findings produce no duplicate edits; stale approvals and path traversal fail closed; a second run after an accepted fix produces no identical patch.

## Phase 5: Validation and pilot

**Deliverables:** a small reviewed pilot, validation evidence, and an operator guide.

Start with ten maintainer-selected articles spanning a current software guide, an old tutorial, a moved documentation link, and a time-sensitive claim. This is a proposed pilot size, not an assertion that those articles are outdated.

Run focused fixture tests while implementing, then `npm run validate` as the complete local gate. Verify schema parsing, draft and future exclusion, production rendering, preserved route contracts, search, feeds, and sitemap. Inspect affected article output and JSON/XML where relevant. Check desktop and mobile layouts in both themes and retain screenshots.

Automated browser coverage must include Chromium, Firefox, and WebKit. Release evidence also needs real Safari, Edge, mobile Safari, and mobile Chrome. Run the repository's pinned Lighthouse profile on its representative routes with three runs and median thresholds. Obtain local and independent review before publication.

**Acceptance:** every accepted pilot edit has reviewer approval, primary evidence, a readable diff, and passing applicable gates. Any uncertain or failed case remains visible in the report. No article is changed merely to improve scan coverage.

## Phase 6: Optional recurring operation

**Deliverables:** only after the pilot, an explicitly authorized schedule and operational runbook.

Begin with manual local scans. A later scheduler can run bounded weekly scans and rotate through the inventory so older or lower-priority pages are not permanently skipped. Proposed starting limits are ten articles and fifty source fetches per run, with two concurrent requests. Confirm account limits and a credit budget before enabling recurring work; these limits are design defaults, not current Firecrawl pricing guarantees.

Deduplicate shared source URLs, checkpoint progress, retry transient failures with capped backoff, and stop at request, credit, time, or model-token limits. Do not advance the last successful check on failures. Track queue age so bounded scans can still cover the whole eligible archive over time.

If GitHub Actions is selected later, use a separate workflow from livestream automation, serialize runs, and keep scan permissions read-only. Publishing credentials belong only in a separately authorized publication step. No automatic pushes, pull requests, merges, notifications to others, or deployment are enabled by this plan.

**Acceptance:** interrupted, overlapping, budget-limited, and failed runs are distinguishable from successful scans; unchanged input produces no duplicate review items; credentials never enter reports or public assets.

## Proposed implementation layout

These paths and commands are planned interfaces; they do not exist yet.

- `scripts/content-refresh.mjs`: CLI entry point with inventory, scan, propose, and apply modes.
- `scripts/content-refresh/`: policy, inventory, Firecrawl client, evidence validation, comparison, reporting, and patch modules.
- `data/content-refresh-policy.json`: versioned scope, source allowlists, review rules, and budgets; no secrets.
- `.content-refresh/`: ignored local evidence, checkpoints, reports, and approval manifests, never copied into `public/` or `dist/`.
- `tests/unit/content-refresh.test.ts`: mocked adapter, policy, comparison, and patch safety fixtures.
- `docs/automation/content-refresh.md`: setup, proposed command usage, recovery, retention, and publication procedures.

Keep the first implementation on Node.js 24 and the existing tooling. Select and pin a Firecrawl client or use a small HTTP adapter after verifying the current API contract. Supply `FIRECRAWL_API_KEY` through the local environment or an approved secret store. Any model credential follows the same boundary.

## Security, recovery, and decisions before implementation

Treat scraped pages as untrusted evidence. Their text cannot change agent instructions, request secrets, run tools, or authorize writes. Allow only approved public HTTP(S) destinations, reject credentials in URLs and local/private addresses, and validate redirects and discovered URLs before follow-up requests. Keep TLS verification enabled. Escape retrieved text in generated reports.

Store only necessary evidence excerpts and hashes, with a documented retention period. Redact sensitive URL parameters and credentials from logs. Do not upload drafts, private repository files, or environment contents to Firecrawl.

Recover an interrupted scan from its checkpoint. Discard an unapplied patch without altering content. Reverse an applied update through a focused Git revert after checking for intervening edits; never reset unrelated work. If an authorized deployment causes a regression, restore the previous Cloudflare deployment and revert the responsible commit through the normal process.

Before implementing recurring updates, choose the pilot articles, model provider, spending cap, check frequency, evidence retention, and editorial approver. The initial milestone is a local evidence report and reviewed pilot, followed by broader coverage only after the pilot meets its acceptance criteria.
