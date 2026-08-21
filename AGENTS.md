# Repository Instructions

## Command execution

- Prefix shell commands with `rtk` when it is installed. If a command or flag
  is rejected by RTK, retry it raw.
- Use raw commands when exact stdout, stderr, or exit status is the behavior
  being tested.
- Preserve unrelated worktree changes and inspect `git status --short` before
  editing.
- Do not expose secrets, tokens, private keys, sessions, or environment files.

## Project overview

- This repository builds `https://christitus.com/` as a fully static Astro site
  deployed to Cloudflare Pages. `ROADMAP.md` remains the migration and cutover
  source of truth until Phase 5 is complete.
- The site is a modern tech publication and creator hub for articles,
  downloads, live-stream archives, newsletter signup, recommendations, search,
  feeds, and legal pages.
- Astro components, TypeScript, custom CSS, and vanilla browser JavaScript are
  the preferred implementation. Do not add a client UI framework without an
  explicit architecture decision.
- Read `SPEC.md` for product and compatibility requirements and `ROADMAP.md`
  for phase order, validation gates, and cutover requirements.

## Toolchain

- The runtime is Node.js 24 with npm and a committed lockfile. Install with
  `npm ci`, develop with `npm run dev`, run focused checks with
  `npm run check` and `npm test`, build with `npm run build`, and use
  `npm run validate` as the complete local gate.
- Astro production output is `dist/`; `.astro/` is generated type and
  content metadata. Never edit or commit either directory as source.

## Repository layout

- `src/pages/` owns public routes and static endpoints.
- `src/layouts/` and `src/components/` own the document shell and reusable UI.
- `src/lib/` owns content queries, route generation, summaries, metadata,
  redirects, and Markdown compatibility behavior.
- `src/styles/` owns global design tokens and shared styles.
- `content/posts/` contains article Markdown. Top-level Markdown under
  `content/` contains standalone page content.
- `data/livestreams.json` is generated data consumed by Astro routes.
- `static/` is Astro's public asset directory and is copied without processing.
- The tracked `content/posts/2023/english.png` is copied to
  `/posts/2023/english.png` without changing its bytes or public route.
- `scripts/` and `.github/workflows/` maintain livestream and chat replay data.
- `tests/` contains unit, route-contract, and browser tests.

## Content contracts

- Preserve every published post's explicit, root-relative `url`. URLs are
  case-sensitive compatibility contracts and must end in `/`.
- Post front matter requires `title`, `date`, and `url`. New posts also require
  at least one category. The migration must accept existing published posts
  with an empty category list only through the exact legacy URL allowlist in
  `SPEC.md` and render them without category links. Other uncategorized posts
  fail validation. `image`, `tags`, `draft`, `description`, `author`, and
  `featuredOrder` are optional. An omitted `draft` value means published;
  production excludes only `draft: true`.
- Once the Phase 2 Astro foundation lands, create posts with
  `npm run new:post -- "<title>" [--date YYYY-MM-DD] [--category "<name>" ...]`.
  The repository-owned scaffolder renders `templates/post.md.tmpl` into
  `content/posts/<year>/<slug>.md`, defaults new posts to drafts, uses the
  current `America/Chicago` calendar date when `--date` is absent, and refuses
  to overwrite files. It serializes titles as JSON-compatible double-quoted
  YAML scalars and verifies an exact parsed-title round trip before writing.
  Follow `SPEC.md` for exact slug and URL-collision rules.
- The scaffolder requires at least one category and offers Android, ChromeOS,
  Development, FreeBSD, Hardware, Linux, MacOS, Misc, Networking, Software Dev,
  Titus, Virtualization, Windows, Windows Server, and YouTube. New posts use
  `MacOS`; new-post category input rejects the historical `macOS` and `macos`
  spellings. The migration loader preserves and accepts those spellings only for
  the exact five legacy URLs listed in `SPEC.md`; manually authored content does
  not bypass that allowlist. `Software Dev` maps to
  `/categories/software-dev/`.
- Production captures one build instant. Offset-bearing timestamps compare as
  instants; date-only values are eligible when they are on or before the
  inclusive `America/Chicago` calendar date containing that instant. Production
  rejects timestamps without an offset and excludes `draft: true` and later
  content. `npm run dev:content` is the only draft/future opt-in and uses Astro's
  local `content-preview` mode; standard development and every `npm run build`
  remain production-filtered.
- `featuredOrder` may be 1, 2, or 3 and must be globally unique. Curated posts
  fill those numbered homepage slots only when they are production-eligible;
  draft or future curated posts leave slots for fallback. Remaining slots use
  production-eligible posts ordered by the publication sort key in `SPEC.md`,
  then by case-sensitive canonical URL, so ties never depend on content
  traversal order.
- Preserve historical front-matter extensions such as `tables`; typed parsing
  must explicitly model them or pass unknown metadata through without loss.
- Keep `<!--more-->` markers; list summaries depend on them.
- Historical Markdown may contain Hugo shortcode syntax. The Astro compatibility
  renderer supports `youtube`, `x`, paired `notice`, `table`, and `shopify`.
  Unknown active shortcodes must fail the build, while literal Hugo examples in
  inline code and fenced code blocks remain escaped article content.
- Raw HTML is allowed for the historical archive but new content should prefer
  Markdown and established components.
- Preserve taxonomy spelling in front matter. Route helpers normalize category
  and tag URLs consistently without rewriting historical content.
- Do not rewrite archived posts broadly as part of unrelated work.

## URL, metadata, and integration boundaries

- Preserve canonical posts/pages, homepage and taxonomy pagination, legacy
  aliases, `/search/`, `/index.json`, `/index.xml`, taxonomy feeds,
  `/sitemap.xml`, `/live-streams/`, and `/live-streams/player/?v=...`.
- Redirect the empty historical `/videos/` page to the YouTube channel.
- Move supported path rules from root `_redirects` to `static/_redirects` during
  Phase 2. Configure `www` canonicalization as a Cloudflare zone redirect, not
  a Pages file rule; the dual-scheme wildcard matches
  `http*://www.christitus.com/*` and targets `https://christitus.com/${2}`
  because `${1}` captures the optional scheme `s`. Replace the unsupported
  external `/winget` `200` proxy with a relative-source redirect to the latest
  WinUtil release asset and validate the followed response.
- Migrate `static/_headers` before cutover: immutable caching applies only to
  Astro's fingerprinted `/_astro/*` output, while copied CSS/JS must not inherit
  the old Hugo immutable policy. Preserve security and feed cache headers.
- Treat head metadata, structured data, feeds, sitemap, redirect generation,
  search indexing, and the base layout as high-impact code.
- Retain Cloudflare analytics as a deferred script on every page so passive
  pageviews remain visible. Keep Google ads, Utterances, YouTube/Twitch, and
  Shopify lazy or intent-driven where practical, and retain configured social
  links. Do not add new third-party scripts without documenting privacy,
  performance, and security impact.
- The livestream JSON, Python script, and secret contracts remain stable;
  `publishedAt` remains required because Twitch VOD matching consumes it. Phase
  4 consolidates the current livestream and chat workflows into one scheduled
  workflow at `.github/workflows/update-livestreams.yml` with chained jobs,
  deletes `.github/workflows/update-chat.yml`, and publishes validated generated
  data directly to `master`. A concurrency group with
  `cancel-in-progress: false` serializes accepted runs. GitHub does not expose a
  configurable `queue: max` field, so the independent watchdog also detects
  platform queue-limit cancellation. Every accepted run resets the managed data
  branch to the exact `master` base and refetches current YouTube/Twitch state,
  so an interrupted candidate cannot suppress a newer livestream. Each job
  checks out its predecessor's emitted SHA and verifies the remote branch has
  not moved. After both data jobs, the workflow builds the generated site and
  validates its route contract. The final publisher proves `master` still equals
  the captured base, proves the managed branch still equals the validated final
  SHA, re-runs the generated-data-only candidate validator, and performs a
  non-force fast-forward push of that exact SHA to `master`. Base or branch drift
  fails closed and the next accepted run rebuilds current desired data. The
  scheduled/workflow-run watchdog opens or updates one durable tracking issue
  for stale, canceled, or incomplete runs and closes it only after all four jobs
  succeed and the managed data branch equals `master`. `contents: write` remains
  limited to the managed-branch jobs and final publisher; site validation stays
  read-only.
  Never hard-code YouTube or Twitch credentials.

## Frontend conventions

- Use semantic HTML and WCAG 2.2 AA behavior: a skip link, keyboard-operable
  navigation, visible focus, meaningful labels, logical headings, reduced
  motion support, and useful image alt text.
- Use the custom CSS token system and scoped component styles. Do not re-add
  Bootstrap or Tailwind.
- Default to dark theme while providing a complete light theme and respecting
  stored user preference.
- Keep browser JavaScript progressive, small, and local to the feature that
  needs it. Media, comments, ads, and search data should load lazily.
- Preserve Cloudflare image resizing with a direct asset fallback.

## Change and validation rules

- Make small reviewable commits even though the migration is delivered in one
  pull request.
- Validate focused behavior while implementing and run `npm run validate` as
  the complete gate.
- For content changes, verify schema parsing, draft and future-date exclusion,
  and production rendering.
- For route or metadata changes, compare the generated route contract and
  inspect JSON/XML output.
- For visual changes, inspect representative mobile and desktop pages in both
  themes and preserve approved screenshots. Automated browser coverage must
  run Chromium, Firefox, and WebKit; release evidence also records real Safari,
  Edge, mobile Safari, and mobile Chrome validation.
- Run the pinned Lighthouse CI mobile profile against the representative routes
  defined in `SPEC.md`; use three runs and enforce the median score and metric
  thresholds in CI.
- For automation changes, use mocked or safe inputs and ensure logs cannot
  reveal secrets.
- Before reporting completion, inspect the final diff and status, run local
  review including untracked files, obtain independent review, resolve valid
  findings, and report skipped manual validation explicitly.

## Deployment

- Current Cloudflare Pages build command/output are `hugo --gc --minify` and
  `public`. Do not change them before the preview and cutover gate.
- Target Cloudflare Pages build command/output are `npm run build` and `dist`.
- Do not add the Cloudflare Astro server adapter; this project uses static
  output.
- Validate a preview deployment before production cutover. Rollback is the
  previous Cloudflare deployment, restoration of the captured Hugo Pages
  configuration including runtime/environment settings, redirects, and
  pre-migration repository rules, plus a revert of the migration pull request.
- After preview validation, switch production Pages to Node 24,
  `npm run build`, and `dist` immediately before merging the migration PR. Treat
  the settings change and merge as one guarded cutover window. Because
  pre-merge `master` still has both legacy workflow identities, first disable
  `.github/workflows/update-livestreams.yml` and `.github/workflows/update-chat.yml`,
  wait for all their queued/running jobs and any active Pages deployment to
  finish, and verify the PR head and required checks.
  Allow no intervening default-branch push or deployment with the new settings
  while `master` still contains Hugo.
- Treat repository-rule activation as a post-merge cutover step. The migration
  PR must merge before its managed-branch workflow can run. Verify after merge
  that `update-chat.yml` is absent and the retained `update-livestreams.yml`
  identity is still disabled, then re-enable and manually dispatch it. Verify
  the generated-site validation and exact fast-forward publication jobs on the
  resulting data SHA before leaving the workflow enabled.
