---
title: "Firecrawl agent website updates"
description: "A report-first workflow for reviewing older articles with Firecrawl, reusing it across sites, and making small updates through normal pull requests."
date: 2026-10-07
url: /firecrawl-agent-website-updates/
type: page
---

## Keeping useful guides current

Old articles can remain useful for years, but documentation moves, installation requirements change, and software reaches the end of support. This maintenance workflow uses Firecrawl to collect primary-source evidence and prepares targeted corrections for review.

The recommended workflow is simple: select published articles, collect evidence, produce a report, and make accepted corrections through a normal pull request. Firecrawl supplies source material; an editor or coding agent reviews the findings and edits the articles.

The first implementation also included custom approval records and patch application. The workflow below is the simpler direction for future use across sites. The repository scripts have not yet been refactored to match it. There is no schedule or automatic publication.

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

## Step 1: Select published articles

Start with a small, explicit selection of articles and the claims to check. Use the website's existing publication rules to exclude drafts, future posts, and private content before sending anything to an external service. Generated feeds, search data, livestream archives, assets, and build output are not editable articles.

For reuse across sites, give the review tool a small content loader that returns the same fields for each eligible document:

```json
{
  "path": "content/example.md",
  "url": "https://example.com/example/",
  "title": "Example article",
  "body": "The article's Markdown body",
  "contentHash": "hash of the source file at selection time"
}
```

The loader handles that site's paths, front matter, canonical URLs, and publication rules. The shared review workflow handles evidence and findings. Keep exclusions and allowed source domains in configuration instead of building another publishing system or a large plugin framework.

## Step 2: Collect evidence with Firecrawl

Scrape known documentation URLs directly. Search can help locate an official replacement, but search snippets alone are not correction evidence. Keep the requested and final URL, retrieval time, response status, content hash, and relevant source text with each capture.

Fetch shared sources once per review and reuse the evidence for articles that cite them. Set request, runtime, and model limits before starting. A simple per-run cache and a list of incomplete sources are enough to make a small manual review useful.

Blocked requests, timeouts, and missing evidence remain visible in the report. They do not justify deleting an article or guessing a replacement. A successful HTTP response also does not establish that a source supports a claim.

The first pilot used the connected Firecrawl tools and imported their captures into the local command. The existing scripts also support a Firecrawl API key supplied through the environment. Keep keys and private captures out of public content and browser code.

## Step 3: Produce a report with specific findings

An editor or coding agent compares selected claims with the collected evidence. Findings fall into five categories:

- **Current:** the selected claim is supported by the checked source.
- **Confirmed outdated:** evidence supports a specific correction.
- **Historical:** the content intentionally describes an older setup or experience.
- **Needs review:** an editorial decision, conflicting evidence, or runtime testing is still needed.
- **Unverifiable:** the available source could not establish the claim.

Each finding should identify the article and passage, explain the issue, cite the source and retrieval time, and suggest a replacement when the evidence supports one. Include version or platform context where it matters. Record the selection and any incomplete checks so a report cannot be mistaken for a complete audit.

Markdown is sufficient for the review report. JSON is useful when another tool needs the findings, but a separate model integration is optional: a coding agent can compare the captures and write the report. Source pages and article examples are reference material, not instructions to execute commands.

## Step 4: Edit through a normal pull request

Review the report, choose the supported corrections, and have an editor or coding agent make small changes in the repository. Check that each passage still matches the version reviewed; if it changed, reassess the finding against the current article.

Preserve front matter, permanent URLs, original dates, taxonomy spelling, summary markers, shortcodes, and intentional historical context. A dated notice is often more useful than rewriting an old tutorial. Changes to commands need appropriate runtime review; checking their documentation is not proof that they work on every supported system.

Use the ordinary Git diff and pull-request review to inspect the original text, replacement, and cited evidence. The report-first design stops at findings and suggestions. Custom approval receipts, patch digests, automatic application, and shell or HTML interpretation are outside its responsibility.

## Step 5: Validate the changes

Run the site's existing checks after editing. For this repository, `npm run validate` checks formatting, content/schema behavior, production rendering, route compatibility, automated browser behavior, and performance. Inspect affected pages as required by the site's review process.

Keep the review tool's own tests focused on its supported responsibilities:

- Published-content selection, including draft and private-content exclusions.
- Source deduplication, budgets, timeouts, and failed fetches.
- Finding validation and traceable source evidence.
- Reports that expose incomplete checks and do not modify articles.
- Content-loader fixtures for two different sites before claiming portability.

Reduce tests by removing unsupported responsibilities along with their implementation. Keeping a complex automatic patch writer while deleting its tests would leave the same maintenance problem with less confidence. The site's existing tests continue to protect its publishing behavior.

Real Safari, Edge, mobile Safari, and mobile Chrome release checks remain separate from automated browser-engine coverage. Record skipped manual checks rather than treating automated results as equivalent evidence.

## Running another manual review

For an agent-led review, start with a request like this:

> Review these selected published articles against their official documentation using Firecrawl. Produce a Markdown report with the original passage, finding, supporting source, retrieval time, and suggested correction. List blocked or incomplete checks. Keep the work within the agreed request and runtime limits, and stop at the report without editing articles.

After reviewing that report, request the accepted edits and normal site validation as a separate step. This workflow can be used without waiting for the script refactor.

The existing repository CLI can still help inventory this site. From a checkout with Node.js 24:

```bash
npm ci
npm run content:refresh -- inventory
npm run content:refresh -- --help
```

The repository operator guide at `docs/automation/content-refresh.md` documents the current implementation, including its older approval and application commands. Those commands are not required by the report-first workflow described here. The curated pilot ledger at `docs/automation/content-refresh-pilot.json` records the findings and source evidence behind the first changes.

Private captures and reports stay under ignored `.content-refresh/`, outside this public website.

## Limits and next decisions

The existing scripts default to at most ten articles and fifty requests or imported captures per manual run. Sources must be on an explicit domain allowlist. Evidence expires after seven days; local capture cleanup follows a documented thirty-day manual retention policy. An agent-led review should agree on its own explicit limits before collection rather than assume the scripts enforce them.

These limits bound the work rather than guarantee a monetary cost. Maintainers should check account budgets and review selected content and sources before transmission.

The next implementation step is to retain selection, evidence collection, and reporting while removing the custom patch-application machinery. Prove reuse with a second site's content loader before adding more abstractions. Scheduling and automatic publication remain outside this workflow.
