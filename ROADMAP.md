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
- Capture one build instant for all content queries. Compare offset-bearing
  timestamps as instants and date-only values against the inclusive
  `America/Chicago` build date; reject timestamps without an offset. Add
  `npm run dev:content` using Astro's local `content-preview` mode; keep normal
  development and `npm run build` production-filtered.
- Add `templates/post.md.tmpl` and a repository-owned
  `npm run new:post -- "<title>"` scaffolder. It writes the dated Markdown path,
  generates the explicit URL and thumbnail path, defaults to `draft: true`,
  supports `--date YYYY-MM-DD` and repeatable `--category` flags, presents every
  canonical category defined in `SPEC.md`, and refuses invalid categories,
  collisions with the complete route/redirect/static inventory, or file
  overwrites. Serialize titles as JSON-compatible double-quoted YAML scalars
  and require an exact parsed-title round trip before writing.
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
- A published fixture with no `draft` field remains included in routes, search,
  feeds, sitemap, and homepage selection; only explicit `draft: true` is
  excluded.
- Fixed-clock fixtures cover timestamps immediately before, equal to, and after
  the build instant plus date-only values before, on, and after the inclusive
  `America/Chicago` build date. An offsetless timestamp fixture fails schema
  validation. `npm run dev:content` includes draft and future fixtures locally,
  while normal development and both repeated production builds exclude them.
- Route and redirect tests cover the Hugo baseline without duplicate URLs,
  confirm supported `_redirects` rules are present in `dist/`, and reject
  domain-level sources or external `200` proxies.
- Clean and repeated check/build runs leave no generated files in `git status`.
- Unsupported shortcode syntax causes a clear build failure.
- Literal Hugo examples inside inline and fenced code remain escaped content;
  rendered table assertions cover the existing `tables` front matter.
- The three explicit legacy uncategorized URLs render, while a new
  uncategorized-post fixture fails validation.
- Only the five explicit legacy URLs in `SPEC.md` accept `macOS` or `macos`;
  the same values fail for manually authored content at every other URL.
- Homepage fixtures reject duplicate or out-of-range `featuredOrder` values,
  exclude draft and future curated posts, and prove deterministic fallback
  ordering for equal publication dates.
- Scaffolder tests cover deterministic date/year and slug generation, required
  front matter, draft defaults, multiple categories including `Software Dev`,
  invalid-category rejection, non-interactive missing-category failure,
  rejection of historical casing as new input, migration acceptance of existing
  `macOS` and `macos` values, case-sensitive URL comparison, trailing-slash
  collision variants, emitted output paths, derived standalone and collection/
  taxonomy routes, pagination, aliases, feeds, utility endpoints, exact and
  wildcard/parameterized redirects, static endpoints, file/directory ancestor
  conflicts, YAML metacharacters, colons, `#`, quotes, backslashes, newlines,
  exact parsed-title round trips, and overwrite protection. Route fixtures
  virtually insert the candidate so newly created pagination, taxonomy, feed,
  alias, and collection outputs are included in exact and wildcard/parameterized
  redirect-overlap checks without self-comparing redirect entries. Generated
  fixtures pass the same content schema as manually authored posts.

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
  are at least 90 in every required category, LCP is under 3 seconds, and CLS
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
- Consolidate the current livestream and chat workflows into one scheduled data
  workflow by retaining `.github/workflows/update-livestreams.yml`, adding the
  chained chat job there, and deleting `.github/workflows/update-chat.yml`.
  Serialize every run with one concurrency group using
  `cancel-in-progress: false` and `queue: max`. Have each job check out its
  predecessor's emitted SHA
  on one managed bot branch so chat matching sees the new data. Verify the branch
  still equals the final SHA before opening or refreshing its pull request; no
  PR update or CI dispatch starts before both jobs succeed. The next queued or
  manual run reconciles branch, PR, and check state idempotently after an
  interruption: rerun incomplete jobs from the last confirmed SHA, or complete
  missing PR/CI actions for an already confirmed final SHA. Do not grant the
  workflow a protected-branch bypass. If the 100-run queue limit cancels or
  rejects a run, a separate `.github/workflows/monitor-data-workflow.yml` runs on
  a schedule and retained-workflow completion, with its own concurrency group,
  `actions: read`, and `issues: write`. It queries recent run conclusions and
  queue-limit annotations, opens or updates one durable tracking issue, and
  closes it only after a successful full reconciliation. The next accepted or
  manual data run performs that reconciliation idempotently.
- Give the CI workflow a `workflow_dispatch` trigger accepting `ref` and
  `expected_sha`. Before dispatch, compare `expected_sha` itself to `master`,
  prove that exact commit changes only allowlisted generated data paths, and
  prove its workflow and configuration files are byte-identical to `master`.
  Immediately before tagging, verify the remote bot branch still equals
  `expected_sha`; create a unique tag pointing directly to that commit, verify
  that the tag peels to the same SHA, and dispatch the workflow at that immutable
  tag so its check attaches to the validated commit. Before tests, CI requires
  the reserved tag namespace and `github.sha == expected_sha`, resolves the bot
  branch to that same SHA, and independently repeats the exact-commit path
  allowlist and workflow/configuration comparisons. Configure one tag ruleset
  that restricts creation in the reserved namespace and grants its only bypass
  to a dedicated GitHub App, plus an overlapping ruleset that forbids updates
  and deletion with no bypass, including for administrators and that App.
  Dispatch only after all
  data/chat commits and the final branch-head check. Do not rely on
  token-suppressed events to create required checks. Store the dedicated App's
  credential in a protected environment available only to a tag-publisher job
  whose workflow definition runs from `master`. Before minting its short-lived
  `contents: write` token, run no action or script from the candidate commit;
  create only the validated reserved-tag-to-`expected_sha` mapping, then revoke
  the token. Give the App no bypass on repository-wide branch creation, update,
  or deletion rules. Give the dispatcher only `actions: write`, reserve other
  `contents: write` and `pull-requests: write` permissions for the data jobs,
  and keep CI jobs read-only.
- Commit the documented repository-rule configuration that will require the
  quality and security checks on `master`, including for administrators. Do not
  enable it while the old default-branch workflows are still active. Require PR
  branches to be current with `master` so a validated head cannot merge against
  a newer untested base. Merge queue is excluded from this cutover contract.
- Rewrite `static/_headers` for Astro output: preserve security and feed rules,
  cache fingerprinted `/_astro/*` assets immutably, and give copied CSS/JS a
  bounded non-immutable or revalidating policy.
- Remove Hugo configuration, templates, archetypes, pipeline assets, generated
  metadata, and stale theme files after parity validation.
- Update contributor/build documentation and retain Python automation paths.

### Phase 4 exit criteria

- `npm run validate` passes from a clean install with no Hugo dependency.
- The scheduled data workflow still updates `data/livestreams.json` and
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
- Create and verify the zone-level `http*://www.christitus.com/*` Single
  Redirect to `https://christitus.com/${2}` immediately before production
  cutover, with query preservation; verify `/winget` follows to the latest
  WinUtil release script successfully.
- While pre-merge `master` still contains both legacy identities, disable
  `.github/workflows/update-livestreams.yml` and `.github/workflows/update-chat.yml`.
  Wait for all their queued/running jobs and active Pages deployments to finish,
  and verify no unreviewed commit reached `master`. Keep both disabled through
  the settings switch and migration merge.
- After preview validation and immediately before merging, set production Pages
  to Node 24, build command `npm run build`, and output directory `dist`. Treat
  this settings change and merge as one guarded cutover window: reverify the
  exact PR head and required checks first, and permit no intervening deployment
  of Hugo `master` with the Astro settings.
- Merge the fully green migration PR while the captured pre-migration
  repository rules remain active. Verify after merge that `update-chat.yml` is
  absent and the retained `update-livestreams.yml` workflow is still disabled,
  then re-enable and dispatch it. Confirm it creates or refreshes the managed bot
  PR and explicitly dispatches CI for that branch's final head SHA. After every
  required check is attached and green, disable the data workflow again, drain
  queued/running work, and refresh the bot PR head. If it changed, dispatch and
  await CI again. Record the PR head and `master` base SHAs; if either changes,
  update the branch and rerun CI. Enable the new no-bypass, strict-up-to-date
  rules only when every check is attached and green on that pair,
  merge the bot PR with an exact-head guard, then re-enable the workflow. Apply
  the same freeze and exact-head/base gate to later bot PRs.
- Verify the custom domain and production behavior after deployment.

### Phase 5 exit criteria

- Preview and production builds finish successfully with captured evidence.
- Cutover evidence records the preview result, exact merge head, old and new
  Pages settings, workflow disable/drain and re-enable timestamps, and
  confirmation that no default-branch push or deployment occurred between the
  production settings switch and migration merge.
- The first post-merge bot PR has all required checks on its final head SHA, and
  a controlled failed-check test proves the new no-bypass rule prevents merges
  to `master`, including for administrators.
- Queue-limit and interruption fixtures prove a later reconciliation run rebuilds
  current desired data and completes any missing PR/check state idempotently.
- Watchdog fixtures feed canceled/rejected run and queue-limit API responses,
  prove one durable tracking issue is opened or updated, and close it only after
  verified reconciliation.
- Home, current/legacy posts, taxonomies, search, downloads, newsletter,
  livestream/player, feeds, sitemap, static downloads, and redirects pass smoke
  tests on the public domain.
- Live requests prove both HTTP/HTTPS `www` hosts canonicalize with path/query
  preservation, the legacy QEMU redirect works, and following `/winget` returns
  the WinUtil script.
- Cloudflare's previous successful Hugo deployment remains available for
  promotion during the observation window.

### Rollback

Disable the consolidated workflow and drain its queued/running jobs. Promote the
previous Cloudflare deployment; restore the captured pre-migration repository
rules so Hugo checks are not blocked; and restore the complete captured
Cloudflare redirect and Pages configuration, including runtime and environment
settings. Revert the migration with both legacy workflow files temporarily
restored as manual-dispatch-only definitions, then verify a fresh Hugo
deployment. Only after that succeeds, restore their captured schedules and prove
a safe manual dispatch. Record the reason and failed evidence before retrying
cutover.
