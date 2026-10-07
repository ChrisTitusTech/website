---
title: "Firecrawl agent website updates"
description: "How Firecrawl research becomes small, reviewed updates to older articles, with the first pilot's changes and limitations."
date: 2026-10-07
url: /firecrawl-agent-website-updates/
type: page
---

## Keeping useful guides current

Old articles can remain useful for years, but documentation moves, installation requirements change, and software reaches the end of support. This maintenance workflow uses Firecrawl to collect primary-source evidence and prepares targeted corrections for review.

The first implementation covers the five phases below: inventory, evidence collection, claim comparison, reviewed patches, and a validated pilot. It runs manually. There is no schedule or automatic publication.

A changed source or an old publication date is not proof that an article is wrong. Historical tutorials keep their original context, URLs, and publication dates. When appropriate, a dated update points readers to current guidance while preserving the original instructions.

## What the first pilot changed

The initial inventory found 320 eligible source pages and excluded 24 source files. The pilot examined specific claims in ten articles using twelve successful Firecrawl source captures. It produced seven corrections across six articles.

This is a bounded pilot, not a complete audit of the website or every claim in the selected articles.

- [WSL 2](/wsl2/): added a dated notice distinguishing the historical Windows 10 version 2004 walkthrough from [Microsoft's current installation instructions](https://learn.microsoft.com/en-us/windows/wsl/install).
- [Windows 10 update settings](/windows-update-security-only/): added a notice that standard Home and Pro support has ended, linked to [Microsoft's lifecycle page](https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro).
- [Docker Guide](/docker-guide/): replaced a redirecting installation link with the [current official destination](https://docs.docker.com/get-started/get-docker/). The old link was not dead.
- [Quickemu](/quickemu/): added the Ubuntu 24.04-or-later SPICE module requirement from the [upstream installation guide](https://github.com/quickemu-project/quickemu/wiki/01-Installation). The documented PPA commands remain unchanged.
- [SSH with GitHub](/ssh-github/): aligned new-key generation with GitHub's Ed25519 example and clarified passphrase guidance, with a link to [GitHub's current instructions and legacy RSA fallback](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
- [The Ultimate Linux Gaming Guide](/ultimate-linux-gaming-guide/): marked the XanMod setup as historical and pointed to [the current keyring and repository instructions](https://xanmod.org/), while preserving the old commands.

The checked Nix and Zed claims remain unchanged. The Hugo guide's personal theme customizations remain historical. The PowerShell update examples are flagged for separate runtime review because the package documentation alone cannot establish corrected command behavior.

## Full archive link review

The follow-up review covered all 330 Markdown posts present at audit time in the year folders from 2016 through 2026 and the `old` archive, including its earlier posts and 16 unpublished drafts. Every post received an audit entry, including posts with no external links. A subsequent editorial cleanup removed 13 drafts; the retained DTB Orangepi and Image Manipulation drafts were dated December 18, 2026. The audit records preserve the original coverage.

The review checks article links, image references, embedded videos, and literal URLs in examples. Shared destinations are checked once and mapped back to every post that uses them. HTTP checks provide broad coverage; Firecrawl and public project APIs help distinguish moved pages from blocked requests. YouTube metadata and player responses identify unavailable or private videos even when the watch page returns HTTP 200.

The corrections include repository migrations, current documentation addresses, missing image references, and replacement of 21 unavailable or private video embeds with availability notes. Repurposed application websites that now serve unrelated gambling content are removed or replaced with verified project sources. Historical commands whose exact downloads cannot be recovered receive explicit notices instead of an unrelated replacement executable.

A successful response alone does not prove that an entire page is current. Blocked requests, timeouts, and unverified replacements remain visible in the repository's [archive link audit report](https://github.com/ChrisTitusTech/website/blob/master/docs/automation/content-link-audit.md). This review adds no schedule or automatic publication.

## Phase 1: Inventory the published website

The inventory maps eligible Markdown files to their canonical URLs and records content hashes, links, publication dates, policy categories, and check history.

It uses the website's existing rules for drafts, future dates, the America/Chicago calendar, and excluded content. Generated feeds, search data, livestream archives, assets, and build output are not editable articles.

A completed check describes the selected sources and claims. It is not a blanket claim that every sentence on that page is up to date.

## Phase 2: Collect evidence with Firecrawl

Known documentation URLs are scraped directly. Search can help locate an official replacement, but search snippets are not accepted as correction evidence. Each source record retains the requested and final URL, retrieval time, response status, a content hash, and the relevant text.

The workflow requests fresh Markdown, limits requests, checkpoints progress, and records unavailable or blocked sources. Network failures stay unverifiable; they do not trigger a replacement link or article deletion.

The first pilot used the connected Firecrawl tools and imported their captures into the local command. Future manual runs can also use a Firecrawl API key supplied through the environment.

## Phase 3: Compare specific claims

Findings fall into five categories:

- **Current:** the selected claim is supported by the checked source.
- **Confirmed outdated:** evidence supports a specific correction.
- **Historical:** the content intentionally describes an older setup or experience.
- **Needs review:** an editorial decision, conflicting evidence, or runtime testing is still needed.
- **Unverifiable:** the available source could not establish the claim.

Each finding identifies its article section, version or platform context, reasoning, and exact evidence. Unsupported corrections are rejected.

The tool supports imported reviewer findings and an optional model comparison through a strict output schema. The model has no tools or permission to execute article commands. The pilot used Codex source comparison through the import path; it did not call the optional model API directly.

## Phase 4: Review small patches

The review report shows the original text, proposed replacement, and supporting sources. An explicit approval step records the selected findings and exact patch digests. Applying a patch checks that the article has not changed since review.

The updater preserves front matter, permanent URLs, original dates, taxonomy spelling, summary markers, shortcodes, and raw HTML. Code-block changes require explicit command review. Legal and affiliate recommendation pages are report-only in the initial policy.

A dry-run shows which files would change. A separate write command applies the approved patches. Reapplying an already-applied bundle makes no further edits.

The implementation and all pilot article changes are reviewed together in a pull request before publication. The maintenance command does not push, merge, or deploy anything.

## Phase 5: Validate and review the result

The pilot exercises collection, comparison, approval, dry-run, application, and repeated-application behavior. Tests cover publication filtering, incomplete sources, request budgets, unsupported findings, stale approvals, path restrictions, and preservation of article structure.

The normal website validation gate checks schema parsing, production rendering, route compatibility, browser behavior, and performance. Review also checks the affected content on desktop and mobile in both themes.

Real Safari, Edge, mobile Safari, and mobile Chrome release checks are separate from automated browser-engine coverage. Researching a command is not the same as running it on every supported operating system; the pilot does not make that claim.

## Running another manual review

From a repository checkout with Node.js 24:

```bash
npm ci
npm run content:refresh -- inventory
npm run content:refresh -- --help
```

The repository operator guide at `docs/automation/content-refresh.md` documents direct and connected-tool collection, selection files, model or reviewer findings, approval, recovery, and validation. The curated pilot ledger at `docs/automation/content-refresh-pilot.json` records the findings and source evidence behind the first changes.

Private captures and reports stay under ignored `.content-refresh/`, outside this public website. API keys are never included in the page or browser code.

## Limits and next decisions

The default manual run selects at most ten articles and permits fifty requests or imported captures. Sources must be on an explicit domain allowlist. Evidence expires after seven days; local capture cleanup follows a documented thirty-day manual retention policy.

These limits bound the work rather than guarantee a monetary cost. Maintainers should check account budgets before live requests and review the selected sources before transmission.

Scheduling is deliberately left out of this implementation. Broader coverage and recurring checks can be considered after reviewing the initial article diffs and the pilot's unresolved findings.
