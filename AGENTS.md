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
  deployed to Cloudflare Pages.
- The site is a modern tech publication and creator hub for articles,
  downloads, live-stream archives, newsletter signup, recommendations, search,
  feeds, and legal pages.
- Astro components, TypeScript, custom CSS, and vanilla browser JavaScript are
  the preferred implementation. Do not add a client UI framework without an
  explicit architecture decision.
- Read `SPEC.md` for product and compatibility requirements.

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
- `src/content/posts/` contains article Markdown. Top-level Markdown under
  `src/content/` contains standalone page content.
- `data/livestreams.json` is generated data consumed by Astro routes.
- `public/` is Astro's public asset directory and is copied without processing.
- The tracked `src/content/posts/2023/english.png` is copied to
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
- Create posts with
  `npm run new:post -- "<title>" [--date YYYY-MM-DD] [--category "<name>" ...]`.
  The repository-owned scaffolder renders `templates/post.md.tmpl` into
  `src/content/posts/<year>/<slug>.md`, defaults new posts to drafts, uses the
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
  aliases, `/index.json`, `/index.xml`, taxonomy feeds, `/sitemap.xml`,
  `/live-streams/`, and `/live-streams/player/?v=...`. Search is a header
  dropdown, not a standalone route; `/search/` is not a page.
- Redirect the empty historical `/videos/` page to the YouTube channel.
- Keep supported path rules in `public/_redirects`. Configure `www`
  canonicalization as a Cloudflare zone redirect, not
  a Pages file rule; the dual-scheme wildcard matches
  `http*://www.christitus.com/*` and targets `https://christitus.com/${2}`
  because `${1}` captures the optional scheme `s`. Replace the unsupported
  external `/winget` `200` proxy with a relative-source redirect to the latest
  WinUtil release asset and validate the followed response.
- In `public/_headers`, immutable caching applies only to
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
  `publishedAt` remains required because Twitch VOD matching consumes it. The
  scheduled workflow at `.github/workflows/update-livestreams.yml` uses chained
  jobs and publishes validated generated
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

- Make small, reviewable commits.
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

- Cloudflare Pages uses Node 24, `npm run build`, and `dist`.
- Do not add the Cloudflare Astro server adapter; this project uses static
  output.
- Validate preview deployments before production changes. Roll back with the
  previous Cloudflare deployment and a revert of the responsible commit or
  pull request.
