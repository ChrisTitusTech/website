# Manual content refresh

This implements phases 1-5 of the Firecrawl plan. There is no schedule, monitor,
automatic push, merge, or deployment. The updater runs locally on Node 24; the
public website remains static. The first pilot and the public explanation page
are reviewed together in the implementation PR.

## Setup

Run `npm ci` and `npm run content:refresh -- --help` from the repository root.
Use a clean branch for article edits. Generated reports and snapshots live in
ignored `.content-refresh/`, outside the public asset and content trees.

For direct scraping, set `FIRECRAWL_API_KEY` using your shell or secret manager.
For optional model comparison, also set `OPENAI_API_KEY` and explicitly choose
a model that supports Responses structured outputs. Never put keys in command
arguments, selection files, policy, reports, or committed files. The CLI does
not load `.env` files and has no browser-side credentials.

Connected Firecrawl tools are also supported: capture their successful scrape
results into a local import file using the schema below. This avoids copying
connector credentials into the shell. Imported evidence is trusted operator
input, not a signed provider attestation; reviewers must check the cited sources.

## Inventory and selection

```bash
npm run content:refresh -- inventory
```

Read `.content-refresh/inventory.json`. It records source paths, canonical URLs,
hashes, links, policy category, and scoped claim history. Eligibility reuses
the site's date and draft rules under one captured instant. Generated routes,
render-never sources, drafts, and future content are excluded with reasons.
History records each selected claim's ID, section, classification, and evidence
sources. Current/historical findings can record an unchanged claim as checked;
confirmed corrections record history after every correction is applied, bound
to the resulting content hash. The inventory exposes this as `lastClaimReview`,
with an advisory `nextCheck` for those claims. Bounded reviews never certify an
entire article: document-level `due` stays true and `nextCheck` stays null,
including for legacy history without claim scope. Partial approvals, dry runs,
and unresolved findings do not record successful claim history.
The generated-route count uses the compatibility inventory, which includes
reserved routes, aliases, and static assets; it is not a count of rendered pages.

Use `data/content-refresh-pilot.json` as an example selection. Each record has
`url` (the canonical article URL) and `sources` (approved primary-source URLs).
Review the domains in `data/content-refresh-policy.json` before adding sources.
The agent extracts article links for discovery, but does not automatically fetch
every link, execute code examples, or crawl the whole archive.

## Collect evidence

```bash
npm run content:refresh -- scan --run pilot-new --selection data/content-refresh-pilot.json
npm run content:refresh -- scan --run pilot-new --resume
```

Every HTTP attempt, including retries, consumes the persisted request budget.
One request runs at a time. Transient errors retry up to three total attempts
with bounded backoff; requests have a 60-second timeout. Partial collection exits
with status 2 and records incomplete sources. Other failures exit 1. Successful
collection exits 0. Budget exhaustion cannot be bypassed by resuming the run.
The collection deadline is the persisted run creation time plus `maxRunSeconds`;
time spent paused also counts, and a resume cannot extend that deadline.
Choose a new, smaller selection when a run needs additional budget.

Successful evidence is reused within its seven-day validity window. A resume
retries incomplete sources and verifies article hashes before continuing.
Reviewed runs cannot be rescanned; start a new run so old findings and approvals
remain bound to their evidence. A missing key or malformed/blocked source is
unverifiable, never proof of a broken link.

For connected-tool evidence:

```bash
npm run content:refresh -- scan --run connected-pilot --selection data/content-refresh-pilot.json --evidence .content-refresh/captures.json
```

`captures.json` is an array of the following objects. `data` is the actual
Firecrawl scrape result (or its REST response envelope), not a search snippet.
Use `formats: ["markdown"]`, `onlyMainContent: true`, and `maxAge: 0` when
collecting it; record the real retrieval timestamp. Do not use the illustrative
values below as evidence.

```json
[
  {
    "provider": "firecrawl",
    "url": "https://docs.github.com/en/example",
    "retrievedAt": "2026-10-07T18:00:00Z",
    "options": { "maxAge": 0, "onlyMainContent": true },
    "data": {
      "markdown": "The actual retrieved source text",
      "metadata": {
        "statusCode": 200,
        "url": "https://docs.github.com/en/example"
      }
    }
  }
]
```

Each imported-source lookup counts toward the processing limit, including
missing, malformed, stale, warned, or failed captures, but makes no new provider
requests. Reusing fresh evidence already collected in the run consumes no unit.
The default ten-article/fifty-request limits bound work, not monetary cost.
Check the Firecrawl account budget separately; no pricing assumptions or credit
guarantees are embedded. Text is limited to 40,000 characters per source and
marked when truncated. Missing relevant evidence needs a narrower source.

To discover a replacement source, use a short, public query:

```bash
npm run content:refresh -- search --run pilot-new --query "official documentation for the selected product"
```

Search consumes the same request budget and saves only approved-domain results.
Review discovery URLs, then put selected ones into a new selection and scrape
them. Snippets never qualify as correction evidence. Bounded map/crawl discovery
can be performed through connected Firecrawl tools if needed; the local CLI
intentionally retrieves only individually selected URLs.

## Compare claims

Choose either model comparison or imported reviewer findings:

```bash
npm run content:refresh -- propose --run pilot-new --model YOUR_STRUCTURED_OUTPUT_MODEL
npm run content:refresh -- propose --run connected-pilot --findings .content-refresh/findings.json
```

These are alternatives. The Responses adapter sends only already-public selected
article bodies and evidence to the fixed OpenAI endpoint, with `store: false`,
no tools, strict structured output, and bounded output tokens. The default input
limit is 60,000 characters and each run allows at most ten model calls. Split
large selections instead of silently truncating article context. Model/API errors,
refusals, and incomplete responses do not become findings. API retention remains
subject to provider account policy; `store: false` is not a zero-retention claim.

The import schema is exported as `findingSchema` from
`scripts/content-refresh/findings.mjs`. The top-level object has only `findings`.
Every finding requires `url`, `section`, `classification`, `kind`, `original`,
`replacement`, `reason`, `context`, and `evidence`. Evidence entries contain an
exact `id` from the run and an exact `excerpt` of at most 25 words. All selected
articles need a disposition, including failures. Unknown fields are rejected.

Classifications are `current`, `confirmed-outdated`, `historical`, `needs-review`,
and `unverifiable`. Only `confirmed-outdated` can have a nonempty original and
replacement with kind `link`, `notice`, `prose`, or `command`; all others use
kind `none` and empty replacement fields. Explain applicable versions/platforms
in `context` and the confidence basis in `reason`. A model confidence score is
not publication approval. The complete website is never declared current from
one selected claim or a successful HTTP response.

```bash
npm run content:refresh -- report --run connected-pilot
```

Review `.content-refresh/runs/connected-pilot.md` and the sibling
`.patches.json`. The Markdown report escapes remote text instead of rendering
remote HTML. The patch file contains before/after bytes for editorial review.

## Approve and apply

```bash
npm run content:refresh -- approve --run connected-pilot --ids FINDING_ID,FINDING_ID --reviewer "Reviewer name"
npm run content:refresh -- apply --run connected-pilot
npm run content:refresh -- apply --run connected-pilot --write
```

For command/security edits, add `--allow-sensitive` to the approval command
after checking the exact diff. This records editorial intent; it does not run
or runtime-test the documented commands. Legal and affiliate recommendation
pages are report-only in the initial policy. Historical pages allow dated
notices and link corrections, not prose modernization.

Apply defaults to dry-run. The explicit write validates approval digests,
source hashes, new link destinations, exact original-text matches, non-overlap,
and the site's Markdown/schema contracts. It rejects unrelated edits in selected
files and symlinks. It preserves front matter byte-for-byte, summary markers,
shortcodes, and raw HTML. Code-block changes require an explicit command finding.
An original snippet is limited to 2,000 characters and its replacement to 4,000.

Approval is an operator-controlled local manifest, not an authentication or
cryptographic signing system. Repository review is the publication authority.
The user authorized the pilot's local application into a PR; its approval record
does not claim that the user already approved each correction for publication.

## Validation and publication

```bash
npm exec -- vitest run tests/unit/content-refresh.test.ts
npm run validate
git -c core.whitespace=cr-at-eol diff --check
```

The complete gate checks formatting, Markdown, security policy, types, unit and
automation tests, production build, repeatability, routes, all three browser
engines, and the pinned Lighthouse profile. On hosts without `python`, activate
a Python virtual environment first so the existing automation command works.
Do not modify global Python configuration to validate this tool.

Inspect affected article output and the new public page on mobile and desktop
in both themes. Confirm original URLs, dates, categories, feed/search behavior,
and sitemap eligibility. Obtain independent review. Record real Safari, Edge,
mobile Safari, and mobile Chrome checks separately from Playwright coverage.
Those real-device release checks are not claimed by this Linux pilot.

Commit the updater, curated pilot evidence, public page, and selected article
diffs to the same PR. Reviewers see every actual article edit in Files changed.
Preview deployment checks precede production. Merging and production deployment
remain separate from opening this PR. No scheduled phase is included.

## Recovery and retention

The process-wide `.content-refresh/lock` prevents concurrent writers. If a
process was killed, verify its recorded PID is no longer running before manually
removing the lock. Never remove an active process's lock.

Ordinary apply errors restore files already written when their bytes still match
the proposed result. A process crash between file renames can leave a partial
apply. Inspect the patch bundle, receipt, and Git diff before recovery. Preserve
intervening user edits. Complete or reverse the exact reviewed changes manually,
then create a new run. A fully applied bundle is a no-op on repeated application
only when its approval matches the successful-write `.applied.json` record. This
record is separate from dry-run receipts. Missing or mismatched proof fails
closed; inspect the diff and start a new run instead of fabricating a receipt.
Do not use a repository-wide hard reset.

Private snapshots are for local review. The initial retention policy is 30 days;
cleanup is manual and no timer is installed. After review, retain only source
URLs, short excerpts, hashes, finding dispositions, and validation evidence in
the curated PR ledger. Delete expired local captures when no active review
depends on them. New runs need fresh evidence, not archived ledger snippets.

Evidence URLs require HTTPS, including the final provider-reported URL.
URLs reject credentials, query strings, IP literals, unexpected ports, and hosts
outside the exact domain allowlist. The local process only connects to fixed
provider APIs. Firecrawl performs remote DNS resolution and redirects; returned
destinations are checked again. This is not a custom network sandbox for the
provider. No private URLs, drafts, tokens, shell commands, or browser actions are
sent for execution. Scraped instructions never authorize local operations.

## First pilot

The pilot used connected Firecrawl scrapes and Codex comparison imported through
the CLI. It did not use a direct shell API key or a live Responses API call.
Direct adapters have mocked contract tests; the connected import path was
exercised live end to end. See [the curated ledger](content-refresh-pilot.json).

- Inventory: 320 eligible source pages; 24 excluded source files at capture time.
- Coverage: ten selected articles, twelve successful source captures, eleven
  findings. Unselected articles and unexamined claims remain unaudited.
- Changes: seven findings applied to six articles. Original URLs and dates stay
  intact; historical instructions receive notices rather than wholesale rewrites.
- Unchanged: checked Nix and Zed claims, and historical Hugo customizations.
- Deferred: PowerShell runtime examples need separate validation.
- Apply evidence: dry-run reported six files; write changed six files; a second
  write returned `already-applied` with zero files.

### Local validation evidence

The complete `npm run validate` gate passed on Linux with Node 24 and an isolated
Python virtual environment. After review fixes, `npm test` passed 126 tests,
including 55 updater tests, and formatting and Markdown lint passed again.
After the mobile wrapping change, the production build and browser checks passed
again: 123 tests across Chromium, Firefox, mobile emulation, and containerized
WebKit, with five existing skips. These checks do not substitute for the
real-device release checks listed above.
The pinned Lighthouse profile also passed again with three runs on each of its
four representative routes.

The public explanation and all six changed articles were checked at desktop
1440 x 1000 and mobile 390 x 844 in dark and light themes. All 28 combinations
returned successful pages, preserved canonical URLs, and had no document-level
horizontal overflow or unrendered Hugo shortcodes. Long historical links and
inline registry paths now wrap without changing their text.

Representative screenshots are preserved for review:

- [Desktop, dark theme](screenshots/firecrawl-desktop-dark.png)
- [Mobile, light theme](screenshots/firecrawl-mobile-light.png)

The live pilot used the connected import path. Direct Firecrawl and optional
model adapters were tested with mocked responses; live shell API calls and
runtime execution of the historical tutorials were not performed.

## Archive-wide follow-up

The user subsequently authorized a separate, exhaustive link review of all 330
posts, including drafts. See the [full archive audit](content-link-audit.md) for
per-post coverage, corrections, and unresolved destinations. This operator-run
audit did not change the CLI selection limits or introduce scheduling. The pilot
ledger above remains the historical record of the original ten-article run.

### Follow-up review fixes

Six existing PR review findings were addressed locally: malformed imported
captures no longer poison other lookups; a final-source retry preserves
`budget-limited`; reports use the configured freshness window; findings cannot
move summary markers; corrected history is recorded only after complete writes;
and validation accepts preserved CRLF line endings. Six regression tests pass,
bringing updater coverage to 61 tests and the repository total to 132. The full
local validation suite passed again. Independent Codex review of this follow-up
completed with no actionable regressions. The separate CodeRabbit integration
reported expired/revoked Git-provider credentials; the successful independent
Codex review supplies the required local review evidence.

A subsequent review cycle protects shortcode spans against relocation and partial
edits, and selects fresh, successful evidence among duplicate imported captures.
Regression coverage also directly exercises dirty-file and overlapping-finding
guards. All 72 updater tests and 143 total unit tests passed. The complete
`npm run validate` gate passed again, including 123 browser tests with five
existing skips and all 12 Lighthouse runs. Real-device and preview-deployment
checks remain subject to the limits documented above.

The next remote review identified three additional boundary gaps. Non-command
findings now reject spans overlapping fenced or indented code. New literal URLs
in final code (including inline examples and substring edits) must meet the same
public-domain and fresh-evidence rules as rendered links. This is a literal URL
check, not a shell interpreter; sensitive command changes still need explicit
editorial approval. Challenge indicators conservatively require manual review
regardless of capture length, so verbose interstitials cannot support findings.
All 82 updater tests and 153 total unit tests passed. The complete validation
gate passed again, including repeatable production output, route checks, 123
browser tests (five existing skips), and all 12 Lighthouse runs.

A further review cycle protects raw HTML source spans (including CRLF content),
requires a matching successful-write record before accepting repeated applies,
and retries HTTP 408 within the existing request cap. The HoloISO link now has a
dated warning that its destination is an unsupported historical archive. All 89
updater tests and 160 total unit tests passed, along with the complete validation
gate, 123 browser tests (five existing skips), and all 12 Lighthouse runs. The
production article's warning and unchanged canonical URL were checked directly.

New internal links and image destinations are checked against production-eligible
routes and public assets, including relative destinations resolved from the
article URL. Draft/future posts and the reserved non-page `/search/` are not valid
targets. New internal or external fragment destinations require separate manual
validation; the updater fails closed instead of guessing anchor availability. The validation
cycle passed all 101 updater tests and 172 total unit tests, the full production
and route checks, 123 browser tests (five existing skips), and all 12 Lighthouse
runs. Saved evidence is also rechecked against the HTTPS/domain rules.

Independent review then identified the standalone search source as another route
reservation. The final production inventory excludes it and Cloudflare metadata
files. All 2,541 eligible routes were checked against generated output. Repeated
Astro, formatting, Markdown, and unit checks passed with 103 updater tests and
174 total unit tests; unchanged build/browser/Lighthouse evidence above applies.

The next review cycle adds deployed redirect sources to internal-link validation,
including exact, wildcard, and parameterized rules. Unknown destinations still
fail closed. Evidence checks recognize standalone interstitial labels and page
titles while accepting documentation prose about signing in, access-denied
errors, and CAPTCHA configuration. Labels are checked throughout the capture,
including long responses. Firecrawl retries accept both delay-seconds and
HTTP-date `Retry-After` values; delays beyond 60 seconds stop the run rather than
retrying early. Regression tests cover accepted and rejected redirects,
documentation versus challenge pages, and bounded/date-form retry behavior.
The complete `npm run validate` gate passed with 119 updater tests, 190 total
unit tests, five Python tests, 123 browser tests (five existing skips), and all
12 Lighthouse runs. Production validation checked 2,543 outputs and 314 search
entries. Real-device and preview-deployment limits above remain unchanged.

The subsequent remote review closes two more validation gaps: new external URL
fragments fail closed even when the base page has fresh evidence, and unsuccessful
import lookups consume their processing unit before scanning capture candidates.
Coverage includes rendered links/images, inline and fenced command URLs, missing
or unusable imports across multiple documents, persisted counters, and resuming
an exhausted run without processing further sources.
The complete gate passed again: 129 updater tests, 200 total unit tests, five
Python tests, 2,543 validated production outputs, 123 browser tests with five
existing skips, and all 12 Lighthouse runs.

Another review cycle preserves whether each shortcode is active or literal using
the production transformer's own parsing, preventing adjacent edits from hiding
an embed or activating a literal example. Absolute and protocol-relative
same-origin URLs now use the internal route/asset/redirect checks, including
URLs in command examples. New player links require exactly one `v` value naming
a valid stream in the repository's livestream data.

Evidence also fails closed on provider errors, including Firecrawl's documented
`metadata.error`, independently of the captured page's language or wording.
Warning-bearing evidence remains unusable for findings. Textual challenge
detection is a heuristic: an arbitrary custom interstitial returned as HTTP 200
without a provider error, warning, or recognizable label cannot be distinguished
reliably from source content by this adapter. Operators must inspect evidence;
successful retrieval alone never proves a page's claims or authorizes a patch.
The complete gate passed with 151 updater tests, 222 total unit tests, five
Python tests, 2,543 production outputs, 123 browser tests (five existing skips),
and all 12 Lighthouse runs. A direct comparison with the prior commit confirmed
byte-identical transformed output for all 331 Markdown sources.

The next review rejects internal paths whose duplicate separators, encoded
separators, or trailing slash on a file would otherwise be normalized into a
different valid target. Sensitive-review classification now examines both the
original and patched content, so newly introduced security, SSH, password,
PowerShell, or registry guidance requires the explicit sensitive approval flag.
The complete gate passed again with 162 updater tests, 233 total unit tests,
five Python tests, 2,543 production outputs, 123 browser tests with five existing
skips, and all 12 Lighthouse runs.

Further regression coverage validates complete literal code URLs containing
parentheses, brackets, or braces; prefix evidence cannot validate a longer
destination. Destination collection can retain repeated occurrences for patch
checks. Each edited snippet is checked in its surrounding document context, so
reusing a link found elsewhere, swapping destinations, or compensating an added
link with a removal does not avoid validation. Untouched historical links remain
preserved. Changes to inline code conservatively require `--allow-sensitive`,
including when the finding is classified as prose rather than a command.
Quoted code URLs use their enclosing quote delimiter, retaining opposite quotes
and path punctuation; ambiguous backslash escaping or whitespace requires manual
validation. The complete gate passed with 175 updater tests, 246 total unit
tests, five Python tests, 2,543 production outputs, 123 browser tests with five
existing skips, and all 12 Lighthouse runs.

The next cycle adds destination validation for quoted scheme-relative code
literals and relative paths. Recognizable filesystem arguments (such as
`ssh-add`, `cp`, `readFile`, and `writeFile` paths) remain eligible for
sensitive-edit approval; other ambiguous paths must pass route validation or
be handled manually outside the patch tool. The scanner does not rely on a
closed list of network APIs. Static inspection does not evaluate code or trace
variables; operators must still review command semantics and dynamically
constructed destinations.
Review history now retains the
specific claim IDs, sections, classifications, and evidence sources without
deferring the entire article. Collection uses the persisted creation time for
its deadline, including across serialized resumes. Responses received after
the deadline are discarded and the run remains budget-limited, including when
the final request succeeds or fails. An in-flight request still has its normal
per-request timeout, but late evidence cannot make the run collected.
The complete gate passed
with 194 updater tests, 265 total unit tests, five Python tests, 2,543 production
outputs, 123 browser tests with five existing skips, and all 12 Lighthouse runs.

Further review extends literal URL validation to unquoted HTML/configuration
values and CSS `url(...)` expressions, preserving path punctuation rather than
accepting a valid prefix of a broken target. Inline-code approval also compares
the surrounding Markdown text and position, so changing "Do not run" to "Run"
requires sensitive approval even when the command itself is unchanged. Notices
must retain the original exactly once and introduce a real calendar date in
the newly added text; a date already present in the original cannot qualify.
The complete gate passed with 215 updater tests, 286 total unit tests, five
Python tests, 2,543 production outputs, 123 browser tests with five existing
skips, and all 12 Lighthouse runs.

The following cycle validates bare relative strings in recognizable URL-taking
calls and path-shaped string literals, as well as unquoted URL attributes,
configuration fields, and CSS. Ordinary strings and recognizable filesystem
arguments remain distinct. Sensitive approval now also compares the text
immediately before and after fenced command blocks and their source positions.
Historical link findings must target an actual extracted destination; they
accept root-, dot-, and bare-relative corrections and validate the replacement
against the production route contract. Link-label prose cannot use this path.
The complete gate passed with 233 updater tests, 304 total unit tests, five
Python tests, 2,543 production outputs, 123 browser tests with five existing
skips, and all 12 Lighthouse runs.

The next checks reject encoded query/fragment delimiters in URL pathnames before
route normalization. Raw HTML protection tracks parser-reported active/literal
occurrences and verifies their expected source positions after each edit,
including identical copies in one paragraph, separate paragraphs, and CRLF
content. Ambiguous source-to-parser mappings require manual validation.
Recognized filesystem strings retain Windows drive paths, and ordinary header,
CSS, and HTML strings do not become spurious relative URLs; URL attributes
inside HTML strings are still checked. The complete gate passed with 246 updater
tests, 317 total unit tests, five Python tests, 2,543 production outputs, 123
browser tests with five existing skips, and all 12 Lighthouse runs.

Bare filenames and dotted words are interpreted as URLs only in recognizable
URL-taking contexts. PowerShell output filenames, Python `open(...)` filenames,
systemd unit names, and ordinary dotted messages remain eligible for command
review, while `Worker("worker.js")` still needs a valid destination. Unknown API
semantics require operator review; static inspection cannot infer the meaning
of every ordinary string argument.

## Provider references

- [Firecrawl scrape API](https://docs.firecrawl.dev/api-reference/endpoint/scrape)
- [Firecrawl freshness controls](https://docs.firecrawl.dev/features/fast-scraping)
- [OpenAI structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses)

Literal `curl` and `wget` targets must use explicit HTTPS URLs. The scanner
recognizes common option arguments so output paths, headers, and request data
are not mistaken for targets. Scheme-less or dynamic targets in recognized
commands require manual validation, including commands that set a default
protocol. [curl's URL rules](https://curl.se/docs/manpage.html) otherwise allow
protocol guessing. This is a conservative argument classifier, not a shell
interpreter: detected nested network commands, unsupported wrapper or network-command
options, curl configuration files, and wget input files are rejected for manual validation. Configuration files and unfamiliar command syntax also
require operator review.

Literal curl/wget invocations found behind unsupported executors require manual
validation. Plain output and lookup commands (`echo`, `printf`, `man`, `which`,
and `type`) retain their literal argument behavior.
