# Full archive link audit

Audit date: 2026-10-07. This follow-up extends the initial Firecrawl pilot to every
Markdown post under `src/content/posts`, including drafts and the `old` folder.
The PR retains these content corrections and evidence; it adds no updater or schedule.

## Subsequent editorial cleanup

After the audit, the site owner requested deletion of 13 drafts whose missing
image references had been removed. The DTB Orangepi and Image Manipulation
articles were retained as drafts and dated 2026-12-18, preserving their original
day of the month. The remaining draft, Degoogle, was outside that deletion list.
The new Firecrawl article subsequently joined the posts collection. The final
PR contains 318 post files: 315 published posts and three drafts.

The coverage counts, CSVs, and repair ledger below are historical audit evidence
from before this cleanup, including the deleted drafts. They are not a current
content inventory. Published articles and routes are unaffected by the cleanup.

## Coverage

All **330 posts** were inventoried individually: 314 production-eligible posts
and 16 drafts. Their original 4,051 distinct URL targets have recorded checks or
explicit local/example exclusions. After repairs, 3,994 targets remain across
4,712 references. The union of original and replacement targets is 4,198.
Fragments share an HTTP target but receive separate anchor checks.

| Folder | Posts |
| ------ | ----: |
| 2016   |    12 |
| 2017   |    10 |
| 2018   |    33 |
| 2019   |    16 |
| 2020   |    34 |
| 2021   |     8 |
| 2022   |    73 |
| 2023   |    39 |
| 2024   |    30 |
| 2025   |    21 |
| 2026   |    24 |
| old    |    30 |

The large unpublished Linux Alternatives list accounts for much of the external
link inventory. It remained a draft during the audit. No publication dates, canonical URLs,
categories, or draft flags were changed.

Reviewable evidence:

- [Every post and its coverage](content-link-audit-posts.csv): one row per post,
  including unchanged posts, publication eligibility, and final status counts.
- [Every original and final target](content-link-audit-targets.csv): source files,
  retained/introduced/removed disposition, HTTP and Firecrawl results, evidence
  method, retrieval time, and unresolved cases. Counts are deduplicated by URL,
  so a shared destination may occur in several post rows.
- [Repairs and video evidence](content-link-audit-changes.json): exact replacement
  records and reasons, unavailable video IDs, and external fragment results.
  The Git diff is authoritative for the final text; this ledger includes
  sequential repairs to the same entry.

## Method and limits

The one-time audit extracts rendered Markdown/HTML links, images, media sources,
front-matter images, YouTube embeds, literal URLs in examples, and each published
post's own page. Root-relative image metadata follows the site's asset rules.
It follows bounded public HTTP redirects and inspects page titles. It never runs
article commands. Local/private addresses, illustrative placeholders, and mail
links are identified separately from public website failures.

Firecrawl provided fresh source text for replacement research and 149 fallback
attempts where ordinary requests failed or returned challenge pages. Successful
public GNOME GitLab API responses confirmed repository identities when the HTML
frontend rejected requests. YouTube oEmbed checked 244 distinct video IDs; player
status confirmed all 21 unavailable/private results. A generic HTTP 200 embed
shell was not accepted as proof that a video plays.

Production output checks local files and section IDs. The draft preview also
confirmed all 140 Linux Alternatives section references without publishing that
post. External fragments were checked against returned HTML IDs; client-routed
fragments and blocked pages remain separately identified. TiddlyWiki's fragment
is a client-side tiddler route, not a conventional static heading ID.

This is a point-in-time link audit, not a claim that every linked product,
tutorial, executable, or historical command still works. A reachable page does
not prove all of its content is current. Full remote captures, challenge pages,
and transient signed URLs stay in ignored local storage. The CSV strips query
strings from final redirect URLs to avoid retaining transient signatures; the
original public source URL remains available for reproducing the check.

This was a one-time, operator-reviewed pass. The experimental updater has been
removed from the PR; its CLI, patch application, policy files, and tests are not
part of the delivered change. Future reviews can follow the
[report-first workflow](../../src/content/posts/2026/firecrawl-agent-website-updates.md)
using Firecrawl and normal editorial review.

## Repairs

The follow-up changes **69 posts**, with **179 direct URL replacements** across
156 distinct before/after pairs, plus editorial notices, image repairs/removals,
and **21 unavailable/private video embeds replaced across 20 posts**. The direct
URL count excludes replacements embedded in longer editorial paragraphs.

- Follow verified repository moves and current Chrome Web Store addresses while
  preserving extension IDs. Repair Launchpad source links and moved GNOME repos.
- Restore GFI migration references, current Microsoft SQL documentation,
  Ubuntu Discourse, version-appropriate Hyprland documentation, and other
  verified project destinations.
- Correct two screenshot extensions and a license badge extension; remove
  nonexistent optional thumbnails so the site's existing fallback applies.
- Remove links to repurposed Windows Answer File Generator and Lucidor domains;
  use the verified TimeCop repository instead of its repurposed domain.
- Clearly label the Windows answer-file generator and ZQuest Classic as current
  alternatives, rather than silently claiming they are identical old resources.
- Explain unavailable historical downloads, keys, scripts, and repositories
  beside preserved examples. No speculative replacement executable is inserted.
- Replace obsolete section anchors and remove dead draft resource hyperlinks
  when no equivalent destination can be verified.

The 244 original video IDs yielded 223 available videos and 21 unavailable/private
videos. The latter comprised 17 unavailable and four private videos. Their IDs
and provider results are preserved in the repair ledger and Git history; the
articles retain their written material with a dated notice.

## Remaining status

Of the 3,994 current targets:

| Disposition                                                                         | Targets |
| ----------------------------------------------------------------------------------- | ------: |
| Reachable HTTP/Firecrawl, local output, verified repository/video, or draft preview |   3,899 |
| Historical unavailable destinations retained in annotated code/text                 |      18 |
| Blocked, challenge/login, connection, timeout, TLS, or other server error           |      45 |
| Illustrative/local, non-HTTP, or request-dependent references                       |      32 |

The 18 known unavailable targets are 16 missing URLs and two DNS failures in
historical examples. They include old WinGet/Wine/Asterisk downloads, git.io
scripts, archived personal configurations, the old XanMod endpoint, the Volian
key, the Flatpak repository, and the progress-bar service. Their notices make
clear that the original commands or integrations should not be assumed usable.

The 45 unverified targets are **not declared valid or deleted merely because a
crawler failed**. Examples include PuTTY, some Arch/Ubuntu wiki pages, GNOME-Look,
GitLab frontends, and several project source servers. The target CSV identifies
each one and all affected posts. A successful prior retrieval is retained with
its timestamp when a later retry times out; the retry is documented separately.
Real-browser/authenticated access or restored upstream service is needed to
resolve the remaining uncertainty. Credentials were not requested or embedded.

## Validation

The final PR validation results are recorded in the pull-request description.
The required local gate is `npm run validate`: formatting, Markdown lint,
dependency policy, Astro checks, unit and automation tests, production build,
repeatability, route contracts, Chromium/Firefox/mobile emulation, WebKit, and
three Lighthouse runs on each of the four configured representative routes.

The current inventory is 318 post files: 315 published posts and three excluded
drafts. The two retained drafts have December 2026 dates. The published URL
contract includes the new Firecrawl article at its preserved canonical URL.
The compatibility fixture uses a confirmed working video while retaining its
embed assertion. Long article links and inline code retain the mobile wrapping
fix and browser regression coverage.

At audit time, all 330 posts retained metadata other than reviewed optional
image repairs; all 314 published routes existed and all 16 drafts were excluded.
The audit also checked all 140 section references in the Linux Alternatives
draft before the owner requested its deletion. These are historical checks,
not claims about the final post inventory.

Local Chromium inspection of the audit passed all 32 combinations of eight
representative pages, desktop/mobile viewports, and dark/light themes, with no
horizontal overflow or unrendered shortcodes. Screenshots:
[desktop dark](screenshots/archive-desktop-dark.png) and
[mobile light](screenshots/archive-mobile-light.png).

Real Safari, Edge, mobile Safari, and mobile Chrome hardware testing and a
Cloudflare preview-deployment review were not performed in this local audit.
Playwright WebKit is not a claim of real Safari testing. No merge, production
deployment, recurring job, or schedule was performed.
