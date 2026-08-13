# Repository Instructions

## Command execution

- Prefix shell commands with `rtk` when it is installed. If a command or flag
  is rejected by RTK, retry it raw.
- Use raw commands when exact stdout, stderr, or exit status is the behavior
  being tested.
- Preserve unrelated worktree changes and inspect `git status --short` before
  editing.
- Do not expose secrets, tokens, private keys, sessions, or environment files.

## Project overview and migration state

- This repository currently builds `https://christitus.com/` with Hugo and is
  planned for conversion to a fully static Astro site deployed to Cloudflare
  Pages. `ROADMAP.md` is the migration source of truth.
- The site is a modern tech publication and creator hub for articles,
  downloads, live-stream archives, newsletter signup, recommendations, search,
  feeds, and legal pages.
- Astro components, TypeScript, custom CSS, and vanilla browser JavaScript are
  the preferred implementation. Do not add a client UI framework without an
  explicit architecture decision.
- Read `SPEC.md` for product and compatibility requirements and `ROADMAP.md`
  for phase order, validation gates, and cutover requirements.

## Current and target toolchains

- Until the Astro foundation exists, use Hugo Extended and validate with
  `hugo --gc --minify`; generated output is `public/` and is not source.
- Capture Hugo route baselines in an empty temporary destination or with
  `--cleanDestinationDir`; never derive contracts from a previously populated
  `public/` tree because it can contain stale routes.
- The target runtime is Node.js 24 with npm and a committed lockfile.
- Once the Astro foundation lands, install with `npm ci`, develop with
  `npm run dev`, run focused checks with `npm run check` and `npm test`, build
  with `npm run build`, and use `npm run validate` as the complete local gate.
- Phase 2 must remove the legacy `.gitignore` entries for `package.json` and
  `package-lock.json`, add `dist/` and `.astro/`, and commit both package files
  as reviewed source artifacts.
- The target Astro production output is `dist/`; `.astro/` is generated type and
  content metadata. Never edit or commit either directory as source.

## Repository layout

- During migration, Hugo source remains under `layouts/`, `assets/`,
  `archetypes/`, and `config.toml`; do not remove it before the Phase 4 parity
  gate in `ROADMAP.md`.
- Target `src/pages/` owns public routes and static endpoints.
- `src/layouts/` and `src/components/` own the document shell and reusable UI.
- `src/lib/` owns content queries, route generation, summaries, metadata,
  redirects, and Markdown compatibility behavior.
- `src/styles/` owns global design tokens and shared styles.
- `content/posts/` contains article Markdown. Top-level Markdown under
  `content/` contains standalone page content.
- `data/livestreams.json` is generated data consumed by Astro routes.
- `static/` is Astro's public asset directory and is copied without processing.
- Hugo also publishes the tracked `content/posts/2023/english.png` at
  `/posts/2023/english.png`; Phase 2 must move or copy it into Astro's public
  tree without changing its bytes or public route.
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
  to overwrite files. Follow `SPEC.md` for exact slug and URL-collision rules.
- The scaffolder requires at least one category and offers Android, ChromeOS,
  Development, FreeBSD, Hardware, Linux, MacOS, Misc, Networking, Software Dev,
  Titus, Virtualization, Windows, Windows Server, and YouTube. New posts use
  `MacOS`; new-post category input rejects the historical `macOS` and `macos`
  spellings, while the migration loader preserves and accepts them in existing
  content. `Software Dev` maps to `/categories/software-dev/`.
- Production captures one build instant. Offset-bearing timestamps compare as
  instants; date-only values are eligible when they are on or before the
  inclusive `America/Chicago` calendar date containing that instant. Production
  rejects timestamps without an offset and excludes `draft: true` and later
  content. `npm run dev:content` is the only draft/future opt-in and uses Astro's
  local `content-preview` mode; standard development and every `npm run build`
  remain production-filtered.
- `featuredOrder` is a positive integer used to curate homepage features.
  Missing feature slots are filled by the newest production-eligible posts
  using that same draft/date predicate.
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
  deletes `.github/workflows/update-chat.yml`, and changes delivery from direct
  pushes to a bot branch and pull request. A concurrency group with
  `cancel-in-progress: false` and `queue: max` serializes every run. Each job
  checks out its predecessor's emitted SHA, and PR/CI dispatch occurs only after
  the branch still matches the final SHA; neither PR update nor CI dispatch can
  begin before both data jobs succeed. After an interruption, the next queued or
  manual run reconciles the branch, PR, and check state idempotently: it reruns
  incomplete data jobs from the last confirmed SHA or completes missing PR/CI
  actions for an already confirmed final SHA. The CI workflow accepts a
  bot branch plus `expected_sha`, invokes its definition from `master`, checks
  out that SHA, and fails if the branch no longer matches. Do not
  assume bot-authored push or pull-request events will start required checks.
  The dispatcher receives `actions: write`; `contents: write` and
  `pull-requests: write` remain limited to the data jobs that update the bot
  branch and manage its pull request, while CI jobs otherwise stay read-only.
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
- Validate focused behavior while implementing. Before the Astro foundation
  exists, run `hugo --gc --minify`; after it lands, run `npm run validate` as
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
  identity is still disabled, then re-enable and manually dispatch it, verify CI
  on the bot branch's exact final SHA, and enable the new no-bypass rules before
  any subsequent PR merges.
