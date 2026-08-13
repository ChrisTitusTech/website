# Christitus.com Astro Specification

## Product goal

Build `https://christitus.com/` as a fast, durable Astro publication and
creator hub. The redesign should make articles, downloads, live streams,
newsletter signup, topics, and YouTube immediately discoverable while
preserving the archive, integrations, and public URLs accumulated by the Hugo
site.

## Users and primary workflows

- Readers find current and historical technology guides through the homepage,
  categories, tags, archive, search, feeds, and existing inbound links.
- Viewers browse livestream recordings and play a selected YouTube video with
  synchronized Twitch chat when replay data exists.
- Customers reach digital downloads, troubleshooting, and recommendations.
- Subscribers use the newsletter form and its existing reCAPTCHA-backed
  service.
- Maintainers publish Markdown and refresh livestream/chat data through the
  existing Python and GitHub Actions automation.

## Required experience

### Visual system

- Use a modern tech-editorial design that retains the existing Chris Titus Tech
  logo and cyan `#47c4f1` accent.
- Provide polished dark and light themes using custom CSS, strong typography,
  restrained effects, responsive cards, and consistent spacing tokens.
- Use Astro components and vanilla JavaScript. No Bootstrap, Tailwind, React,
  Vue, or other client UI runtime is required.

### Navigation and homepage

- Header destinations are Articles, Downloads, Live, Newsletter, and Topics,
  with search, theme toggle, and a YouTube action. The logo links home.
- Forums, Recommendations, Archive, RSS, legal pages, and social destinations
  remain available through secondary/footer navigation.
- `/videos/` redirects to the public YouTube channel because the source page is
  empty.
- The homepage contains one primary and two secondary featured articles,
  creator action cards, topic discovery, recent livestreams, latest articles,
  and newsletter/YouTube promotion.
- Ordered `featuredOrder` values select curated posts; remaining slots use the
  newest production-eligible posts using the shared draft/date predicate.

### Articles and discovery

- Article pages include title, publish date, reading time, categories, tags,
  featured media, reading progress, responsive table of contents, sharing,
  related posts, lazy ads, and lazy Utterances comments.
- List, category, and tag pages use ten posts per page and retain Hugo-compatible
  pagination routes. Page-one aliases redirect to the canonical list URL.
- Search accepts `/search/?s=<query>`, fetches `/index.json` on demand, searches
  title/content/tags/categories, and exposes loading, results, empty, and error
  states accessibly.
- Archive, RSS directory, downloads, newsletter, recommendations, privacy,
  refund, terms, and 404 pages use the shared redesigned shell.

### Editorial authoring

- `npm run new:post -- "<title>" [--date YYYY-MM-DD]
  [--category "<name>" ...]` provides the Astro replacement for Hugo archetypes.
  The date defaults to the current calendar day in `America/Chicago`; explicit
  dates use strict `YYYY-MM-DD`. The date determines both front matter and the
  `content/posts/<year>/` directory.
- Slugs are deterministic: trim the title, apply Unicode NFKD normalization,
  remove combining marks, lowercase it, replace each maximal run outside ASCII
  `[a-z0-9]` with one hyphen, trim leading/trailing hyphens, and reject an empty
  result. The scaffolder writes `<slug>.md`, emits `/<slug>/` as the explicit
  URL, and sets the image to `images/<year>-thumbs/<slug>.webp`.
- The template includes the title, date, URL, image, selected categories, empty
  tags, `draft: true`, and a `<!--more-->` summary boundary. The command refuses
  to overwrite an existing destination file.
- `--category` is repeatable. When it is omitted, an interactive terminal
  prompts for one or more choices; non-interactive use fails instead of guessing.
  Canonical choices are Android, ChromeOS, Development, FreeBSD, Hardware,
  Linux, MacOS, Misc, Networking, Software Dev, Titus, Virtualization, Windows,
  Windows Server, and YouTube. Values outside this exact set fail validation.
- New posts use the canonical `MacOS` spelling, while migrated `macOS` and
  `macos` values remain unchanged. The canonical-set check applies to
  `--category` input; it rejects those historical variants for new posts. The
  migration loader separately accepts them only when reading existing content.
  `Software Dev` generates the normalized taxonomy route
  `/categories/software-dev/`.
- Generated posts use the same content schema and validation path as manually
  authored Markdown. URL collision checks create comparison keys by enforcing
  one leading and trailing slash and collapsing repeated slashes without
  changing character case. Thus `/Post/` and `/post/` remain distinct, while
  `/post`, `post/`, and `/post//` collide with `/post/`. Comparison never
  rewrites historical front matter. Invalid categories, dates, normalized URL
  collisions, and existing destination files fail with actionable errors.

### Livestreams

- Phase 4 consolidates the current livestream and chat workflows into one
  scheduled workflow by retaining `.github/workflows/update-livestreams.yml`,
  chaining both jobs on the same managed bot branch, and deleting
  `.github/workflows/update-chat.yml`. A concurrency group with
  `cancel-in-progress: false` and `queue: max` serializes every run. Each job
  checks out its predecessor's emitted SHA, and PR/CI dispatch occurs only after
  verifying the bot branch still equals the final SHA; neither action begins
  before both data jobs succeed. After an interruption, the next queued or manual
  run idempotently reconciles branch, PR, and check state, rerunning incomplete
  jobs from the last confirmed SHA or completing missing PR/CI actions for an
  already confirmed final SHA. A separate scheduled/workflow-run watchdog uses
  `actions: read` and `issues: write` to detect queue-limit cancellation or
  rejection through the Actions API and open/update a durable tracking issue.
  The next accepted or manual run performs a full current-state reconciliation;
  the watchdog closes the alert only after verified success.
- `data/livestreams.json` retains `updated` and `items`. Items require
  `videoId`, `title`, `description`, `thumbnail`, `date`, and `publishedAt`;
  `twitchVodId` and `hasChatReplay` remain optional. The Python automation
  continues to use `publishedAt` when matching unmatched Twitch VODs.
- The archive features the newest valid stream and paginates remaining streams
  at 24 items per static page. Deleted/private entries are not rendered.
- `/live-streams/player/?v=<videoId>` validates the ID, redirects invalid values
  to the archive, loads YouTube playback, and displays metadata for known IDs.
- Chat JSON is requested only when present. Missing chat keeps video full width.
  Loaded chat supports embedded badges/emotes, seek resynchronization, play/
  pause synchronization, automatic scrolling, and manual resume.

## Content and rendering model

- Astro loads post Markdown from `content/posts/` and standalone page Markdown
  from the repository's existing `content/` tree.
- Content with Hugo `build.render: never`, including the duplicate
  `content/live-streams.md` source, remains excluded from Astro routes. The
  renderable `content/live-streams/_index.md` owns `/live-streams/`.
- Published posts require valid `title`, `date`, and `url`. New posts require at
  least one category, but the loader accepts the existing published posts with
  empty category lists only for `/2022-recap/`, `/worst-tech-of-2022/`, and
  `/youtube-telegram-scams/`, and renders those posts without category links.
  The allowlist is explicit in source and tests; any other uncategorized post
  fails validation. Draft defaults to false: an omitted field is published, and
  only explicit `draft: true` is excluded. Duplicate normalized URLs fail the
  build.
- Production captures one build instant and reuses it for every content query.
  Front matter with an explicit offset is parsed as an instant and is eligible
  at or before that instant. A date-only `YYYY-MM-DD` value is eligible for the
  entire matching day: compare it to the `America/Chicago` calendar date that
  contains the build instant, inclusively. Timestamp values without an explicit
  offset fail schema validation. Production excludes `draft: true` and later
  content with this shared predicate.
- `npm run dev:content` starts Astro in a local-only `content-preview` mode that
  includes drafts and future content. Standard `npm run dev` uses production
  filtering. `npm run build` ignores/rejects content-preview mode and always
  produces the production route contract; a Cloudflare preview is an
  `npm run build` artifact in `dist/`, not the local content-preview mode.
- Preserve historical front-matter extensions. In particular, the `tables`
  object on `/bad-windows-defender/` supplies both table shortcodes and must
  survive typed parsing; a test asserts its existing headers and values render.
- Historical raw HTML remains renderable. `<!--more-->` defines the preferred
  summary boundary; otherwise a plain-text excerpt is generated.
- The compatibility renderer supports the only Hugo shortcodes present in
  published content: `youtube`, `x`, `notice`, `table`, and `shopify`. Unsupported
  active shortcode syntax is a build error. Hugo examples inside inline or
  fenced code remain escaped literal content and are excluded from this gate.
- YouTube embeds use privacy-enhanced URLs and descriptive titles. X embeds have
  a usable link fallback. Notice and table output is semantic and accessible.
- Static images, fonts, downloads, chat JSON, and custom files remain under
  `static/`. Move or copy the tracked `content/posts/2023/english.png` into the
  Astro public asset tree so `/posts/2023/english.png` remains byte-identical
  and routable. The site may use Cloudflare image transforms with direct
  fallback.

## Public interfaces and URL compatibility

- Canonical published `url` values are immutable unless a task explicitly
  includes redirects and migration approval.
- Preserve `/`, `/page/N/`, categories, tags, category/tag pagination, top-level
  utility pages, all post URLs, legacy source-path aliases, and curated rules in
  `_redirects`.
- Preserve `/index.json` with entries shaped as `title`, `tags`, `categories`,
  `contents`, and absolute `permalink`.
- Preserve `/index.xml`, category/tag RSS endpoints, `/rss/`, and
  `/sitemap.xml`. Drafts and sitemap-disabled pages are excluded where expected.
- Canonical, previous/next pagination links, Open Graph, Twitter cards,
  WebSite/WebPage/BlogPosting/Breadcrumb JSON-LD, favicons, and feed discovery
  must remain valid.
- Move supported path rules from the tracked root `_redirects` file into
  Astro's copied public tree. Pages file redirects must use relative sources.
  Configure HTTP/HTTPS `www.christitus.com/*` canonicalization as a Cloudflare
  Single Redirect wildcard rule matching `http*://www.christitus.com/*` and
  targeting `https://christitus.com/${2}` with query preservation; `${1}` is
  the optional scheme `s`, while `${2}` is the path capture. These are
  zone-rule wildcard captures, not the Pages `_redirects` `:splat` placeholder.
- Replace the unsupported external `/winget` `200` proxy with a supported
  `/winget` external redirect to
  `https://github.com/ChrisTitusTech/winutil/releases/latest/download/winutil.ps1`.
  Clients following redirects must receive the release script successfully; no
  Worker/Function proxy is introduced.
- Preserve `static/_headers` security and feed caching behavior, but replace the
  Hugo `/css/*` and `/js/*` immutable rules. Only fingerprinted `/_astro/*`
  assets receive one-year immutable caching; copied CSS and JavaScript use a
  revalidating or bounded non-immutable policy.

## Integrations, security, and privacy

- Retain Cloudflare Web Analytics, Google ads, Utterances, Shopify Buy Button,
  YouTube, Twitch chat data, newsletter reCAPTCHA, and configured social links.
- Cloudflare Web Analytics loads with `defer` on every page so no-interaction
  pageviews remain counted. Ads, comments, media APIs, and search data load
  lazily or after user intent where practical.
- Never commit or log YouTube API keys, Twitch credentials, access tokens,
  private keys, or environment files.
- CI runs on pull requests, pushes, and explicit dispatches for an identified
  ref. Dispatch accepts a bot branch plus `expected_sha`, invokes the definition
  from `master`, checks out the expected commit, and fails unless the branch
  still equals it. Repository rules require type checks, unit tests, production build,
  route validation, and browser tests to pass before merge, including for
  administrators. Bot automation dispatches CI for its final branch head SHA
  with `GITHUB_TOKEN`; it does not depend on token-suppressed push or pull
  request events.
- Repository rules require the PR branch to be current with `master` so checks
  cannot be reused against a newer base. Merge queue is excluded from the
  cutover contract.
- CodeQL, dependency review, Dependabot, and npm audit cover the new JavaScript
  supply chain. High and critical findings must be resolved or explicitly
  waived before merge.

## Accessibility, compatibility, and performance

- Target WCAG 2.2 AA. All controls are keyboard operable, have visible focus,
  and expose correct labels/states. Navigation, search, dialogs, pagination,
  media, tables, and forms use semantic markup.
- Support current stable Chrome, Firefox, Safari, and Edge plus current mobile
  Safari and Chrome. Automated browser tests run Chromium, Firefox, and WebKit
  projects; manual release evidence covers real Safari, Edge, mobile Safari,
  and mobile Chrome where Playwright engines are not identical to the shipped
  browser. Core content remains readable without JavaScript.
- Respect `prefers-reduced-motion` and avoid layout-dependent animation.
- Lighthouse CI runs against a local production server using its pinned mobile
  preset and Chromium dependency. It measures `/`, `/my-ai-workflow/`,
  `/categories/linux/`, and `/live-streams/` three times and gates on the median
  run. Each representative route must score at least 90 for performance,
  accessibility, best practices, and SEO, with LCP under 2.5 seconds and CLS
  under 0.1. Tool versions and profile settings are committed with the lockfile
  so local and CI runs are reproducible.
- Local fonts, responsive images, lazy third-party scripts, and minimal client
  JavaScript are required performance boundaries.

## Non-goals

- Server-side rendering, Cloudflare Workers application logic, accounts, a CMS,
  comments hosted by this repository, or a JavaScript single-page application.
- Rewriting historical article prose or normalizing all historical taxonomy
  spelling during the framework migration.
- Replacing the Python livestream/chat data automation or changing its secret
  contract.
- Redesigning the logo or introducing a new brand identity.

## Acceptance criteria

- `npm ci` and `npm run validate` pass from a clean checkout using Node 24.
- All non-draft, non-future content builds; draft and scheduled fixtures are
  absent from production routes, search, feeds, and sitemap; every supported
  shortcode has tested output; and no unresolved Hugo template syntax appears
  outside literal code or `pre` content in generated pages.
- The generated route/redirect contract covers the Hugo baseline, including
  mixed-case URLs, feeds, pagination, aliases, and static files.
- The production artifact contains `_headers` and supported `_redirects`; tests
  assert `/_astro/*` is immutable, copied CSS/JS are not immutable, and
  security/feed rules remain present. Preview/production request tests verify
  the `www` canonical redirect, legacy path redirect, and followed `/winget`
  response rather than relying on file presence alone.
- Automated browser tests cover home, post, taxonomy, search, downloads,
  newsletter, livestream archive/player states, redirects, and 404 behavior in
  Chromium, Firefox, and WebKit projects.
- Content validation fixtures prove the three legacy category exceptions pass
  and a newly added uncategorized post fails. A homepage-selection fixture
  proves that a future-dated, non-draft post cannot fill a featured slot. A
  published fixture without a `draft` field remains present in routes, search,
  feeds, sitemap, and homepage selection.
- Fixed-clock tests cover offset-bearing timestamps immediately before, equal
  to, and after the build instant; date-only values before, equal to, and after
  the `America/Chicago` build date; and consistent filtering across homepage,
  routes, search, feeds, and sitemap. Local `npm run dev:content` includes draft
  and future fixtures, while standard development and production builds exclude
  them; Cloudflare-preview artifacts never include them. An offsetless timestamp
  fixture fails schema validation.
- Scaffolder fixtures verify template output under a fixed
  `America/Chicago` clock, explicit dates, slug edge cases, every canonical
  category, repeatable category flags, non-interactive failures, draft defaults,
  rejection of `macOS` and `macos` as new category inputs, acceptance of both in
  migrated fixtures, case-sensitive URL preservation, trailing-slash collision
  variants, and overwrite protection. The three empty-category URL exceptions
  remain covered separately by the content-validation fixtures.
- The pinned Lighthouse CI profile passes all representative routes for three
  runs using the median thresholds defined above.
- Manual desktop/mobile and light/dark review is recorded with screenshots;
  keyboard navigation and third-party fallbacks are exercised.
- A Cloudflare preview uses `npm run build` and `dist/` successfully before
  production settings change.
- After preview validation, the production Pages settings switch to Node 24,
  `npm run build`, and `dist` immediately before the migration merge in a
  guarded cutover window. Because pre-merge `master` still contains both legacy
  workflow identities, `update-livestreams.yml` and `update-chat.yml` are both
  disabled and drained first, with no active Pages deployment and no intervening
  default-branch push or deployment. After merge, `update-chat.yml` is confirmed
  absent and the retained `update-livestreams.yml` remains disabled.
- The post-merge cutover transaction re-enables and manually dispatches the
  retained data workflow only after verifying that it remains disabled,
  dispatches CI for the resulting bot-branch head SHA, confirms its pull request
  has every required check, then disables and drains the workflow again. It
  refreshes the final head and reruns CI if needed, enables the captured
  no-bypass rules only with all checks green on recorded head/base SHAs. If
  either SHA moves, it updates the branch and reruns CI. It then merges through
  the strict-up-to-date rule with an exact-head guard and re-enables the
  workflow. Later bot PRs use the same freeze and head/base gate.
- CI, security checks, local review, independent review, and all actionable
  review threads are clean before merge.
