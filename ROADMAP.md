# Astro Migration Roadmap

The migration is delivered through one pull request with reviewable commits.
Each phase is a hard gate: later work may be developed on the same branch, but
the phase is not complete until its exit criteria and validation pass.

## Phase 1: Contract and Hugo baseline

### Phase 1 outcome

The Astro requirements are authoritative and Hugo's current public behavior is
captured before framework removal.

### Phase 1 work

- Rewrite `AGENTS.md` and `SPEC.md`; add this roadmap.
- Record the production Hugo build, content inventory, generated routes,
  aliases, feeds, sitemap, and representative metadata from an empty temporary
  destination or a build using `--cleanDestinationDir`.
- Record the current Cloudflare Pages build settings and export the current
  `master` branch-protection/ruleset and redirect-rule state for rollback.
- Define the static Astro, Node 24, npm, Cloudflare, URL, and rollback contracts.

### Phase 1 exit criteria

- Planning documents agree and contain no unresolved architecture decisions.
- A clean-destination `hugo --gc --minify` build passes and its evidence is
  stored as test data without stale `public/` files.
- The worktree contains no unrelated changes.

## Phase 2: Astro content foundation

### Phase 2 outcome

Astro builds every published content source with typed metadata and compatible
Markdown rendering while Hugo remains available for comparison.

### Phase 2 work

- Add Astro, TypeScript, npm scripts, content collections, site configuration,
  shared layouts, and core utilities.
- Add `templates/post.md.tmpl` and a repository-owned
  `npm run new:post -- "<title>"` scaffolder. It writes the dated Markdown path,
  generates the explicit URL and thumbnail path, defaults to `draft: true`,
  supports `--date YYYY-MM-DD` and repeatable `--category` flags, presents every
  canonical category defined in `SPEC.md`, and refuses invalid categories,
  normalized URL collisions, or file overwrites.
- Remove the legacy ignore rules for `package.json` and `package-lock.json`, add
  `dist/` and `.astro/` to `.gitignore`, commit both package files, and move root
  `_redirects` path rules to `static/_redirects`.
- Remove unsupported domain-source rules from the Pages file. Define the
  Cloudflare zone-level `www` canonical redirect and replace the external
  `/winget` `200` proxy with a relative-source redirect to the latest WinUtil
  release asset.
- Preserve historical Markdown and implement `youtube`, `x`, `notice`, `table`,
  and `shopify` compatibility.
- Move or copy `content/posts/2023/english.png` into Astro's public tree and
  preserve its byte-identical `/posts/2023/english.png` route.
- Model or pass through historical front-matter extensions, including the
  `tables` data used by `/bad-windows-defender/`.
- Exclude sources marked `build.render: never` so the duplicate legacy
  livestream source cannot collide with `/live-streams/`.
- Implement post/page routes, summaries, taxonomy grouping, reading time,
  related content, metadata, sitemap, feeds, and redirect generation.

### Phase 2 exit criteria

- `npm ci` and `npm run validate` pass from a clean install.
- `npm run validate` includes the Phase 2 Astro checks, unit tests, production
  build, and route/content validation.
- All published Markdown renders; drafts and future-dated posts remain excluded
  from production routes, search, feeds, and sitemap, with fixture coverage for
  both cases. A homepage-selection fixture also proves that a future-dated,
  non-draft post cannot fill a featured slot.
- Route and redirect tests cover the Hugo baseline without duplicate URLs,
  confirm supported `_redirects` rules are present in `dist/`, and reject
  domain-level sources or external `200` proxies.
- Clean and repeated check/build runs leave no generated files in `git status`.
- Unsupported shortcode syntax causes a clear build failure.
- Literal Hugo examples inside inline and fenced code remain escaped content;
  rendered table assertions cover the existing `tables` front matter.
- The three explicit legacy uncategorized URLs render, while a new
  uncategorized-post fixture fails validation.
- Scaffolder tests cover deterministic date/year and slug generation, required
  front matter, draft defaults, multiple categories including `Software Dev`,
  invalid-category rejection, non-interactive missing-category failure,
  rejection of historical casing as new input, migration acceptance of existing
  `macOS` and `macos` values, case-sensitive URL comparison, trailing-slash
  collision variants, and overwrite protection. Generated fixtures pass the
  same content schema as manually authored posts.

## Phase 3: Editorial redesign and feature parity

### Phase 3 outcome

The complete site uses the approved modern tech-editorial design and preserves
all required user workflows.

### Phase 3 work

- Build the custom CSS design system, dark/light themes, navigation, footer,
  creator-hub homepage, editorial cards, and article layout.
- Implement taxonomy/archive pages, search, downloads, newsletter,
  recommendations, legal pages, RSS directory, and 404.
- Implement the paginated livestream archive and synchronized chat player.
- Restore deferred every-page analytics; lazy or intent-driven ads, comments,
  Shopify, and media; newsletter reCAPTCHA; share actions; code copy; and
  Cloudflare image behavior.

### Phase 3 exit criteria

- Browser tests pass for primary pages, states, viewports, and themes.
- Axe reports no in-scope WCAG A or AA violations in tested routes. Any
  exception requires an explicit documented waiver with owner and follow-up.
- The committed Lighthouse CI mobile profile runs three times against `/`,
  `/my-ai-workflow/`, `/categories/linux/`, and `/live-streams/`; median scores
  are at least 90 in every required category, LCP is under 2.5 seconds, and CLS
  is under 0.1 on each representative route.
- Manual keyboard, mobile, desktop, light, and dark review is recorded.
- Search, feeds, metadata, redirects, livestream chat/no-chat, and third-party
  fallbacks behave as specified.

## Phase 4: Automation, security, and Hugo removal

### Phase 4 outcome

Astro is the only production build path, and the migration PR contains the
tested workflows and captured rule configuration needed for the post-merge
protection cutover.

### Phase 4 work

- Add CI for formatting, Markdown lint, Astro checks, unit tests, production
  build, route validation, browser tests, and the pinned Lighthouse profile.
- Add CodeQL, dependency review, npm/Actions Dependabot, and audit enforcement.
- Change the scheduled data automation to commit generated livestream and chat
  updates to one managed bot branch and open or refresh a pull request. Chain
  both data jobs on that branch so chat matching sees the new livestream data;
  do not grant the workflows a protected-branch bypass.
- Give the CI workflow a `workflow_dispatch` trigger accepting a ref, and have
  the data workflow dispatch CI for its final bot-branch head SHA with
  `GITHUB_TOKEN` after all data/chat commits. Do not rely on token-suppressed
  push or pull-request events to create required checks. Grant the dispatcher
  `actions: write`; reserve `contents: write` and `pull-requests: write` for the
  data jobs that update the bot branch and manage its pull request, and keep CI
  jobs otherwise read-only.
- Commit the documented repository-rule configuration that will require the
  quality and security checks on `master`, including for administrators. Do not
  enable it while the old default-branch workflows are still active.
- Rewrite `static/_headers` for Astro output: preserve security and feed rules,
  cache fingerprinted `/_astro/*` assets immutably, and give copied CSS/JS a
  bounded non-immutable or revalidating policy.
- Remove Hugo configuration, templates, archetypes, pipeline assets, generated
  metadata, and stale theme files after parity validation.
- Update contributor/build documentation and retain Python automation paths.

### Phase 4 exit criteria

- `npm run validate` passes from a clean install with no Hugo dependency.
- Scheduled data workflows still update `data/livestreams.json` and
  `static/chats/` on their managed branch, open or refresh a pull request, and
  dispatch the same checks as human-authored changes without changing the JSON,
  Python, or secret contracts. Workflow tests or a dry-run fixture verify the
  final head SHA is the dispatched ref; live bot-PR evidence is a Phase 5 gate
  because the new workflows are not active until the migration merges.
- The final diff contains only the migration and documented automation changes.
- Artifact tests confirm `_headers` is copied, `/_astro/*` is immutable, copied
  CSS/JS are not immutable, and the security/feed rules remain intact.
- Local review including untracked files and independent review have no
  unresolved actionable findings.

## Phase 5: Preview, cutover, and production verification

### Phase 5 outcome

Cloudflare serves the verified Astro artifact and an immediate rollback remains
available.

### Phase 5 work

- Deploy `dist/` to a Cloudflare preview and verify representative URLs,
  redirects, headers, assets, analytics, feeds, and sitemap.
- Merge the fully green migration PR while the captured pre-migration
  repository rules remain active. Immediately dispatch the merged data
  workflow, confirm it creates or refreshes the managed bot PR, and explicitly
  dispatch CI for that branch's final head SHA. After every required check is
  attached and green, enable the new no-bypass repository rules before merging
  the bot PR or any later change.
- Create and verify the zone-level `http*://www.christitus.com/*` Single
  Redirect to `https://christitus.com/${2}` immediately before production
  cutover, with query preservation; verify `/winget` follows to the latest
  WinUtil release script successfully.
- Set production Pages to Node 24, build command `npm run build`, and output
  directory `dist` immediately before merge/cutover.
- Verify the custom domain and production behavior after deployment.

### Phase 5 exit criteria

- Preview and production builds finish successfully with captured evidence.
- The first post-merge bot PR has all required checks on its final head SHA, and
  a controlled failed-check test proves the new no-bypass rule prevents merges
  to `master`, including for administrators.
- Home, current/legacy posts, taxonomies, search, downloads, newsletter,
  livestream/player, feeds, sitemap, static downloads, and redirects pass smoke
  tests on the public domain.
- Live requests prove both HTTP/HTTPS `www` hosts canonicalize with path/query
  preservation, the legacy QEMU redirect works, and following `/winget` returns
  the WinUtil script.
- Cloudflare's previous successful Hugo deployment remains available for
  promotion during the observation window.

### Rollback

Promote the previous Cloudflare deployment; immediately restore the captured
pre-migration repository rules so Hugo checks and direct-push data workflows are
not blocked; restore the captured Cloudflare redirect rules and Pages build
command/output to `hugo --gc --minify` and `public`; and revert the migration
pull request. Verify a fresh Hugo deployment and a safe manual dispatch of the
data workflow succeed with the restored settings. Record the reason and failed
evidence before retrying cutover.
