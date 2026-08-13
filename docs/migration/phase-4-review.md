# Phase 4 review evidence

Date: 2026-08-13

## Clean-install validation

The Phase 4 implementation was validated after replacing the dependency tree
with `npm ci`. A single serial `npm run validate` invocation then passed:

- Prettier and Markdown lint checks.
- The repository audit policy. The six reported high findings all derive from
  the one time-limited, development-only Lighthouse CI waiver recorded in
  `docs/security/npm-audit-waivers.json`; there are no critical findings.
- Astro diagnostics with zero errors, warnings, or hints.
- 52 unit and workflow-contract tests.
- A deterministic 1,285-page production build with digest
  `5245fc43649b82f3fec7435ac7d40e4e36a5e392decc5e571237149a79533390`.
- The 1,183-route Hugo compatibility contract and 312 search entries.
- 54 applicable Chromium, Firefox, and mobile browser tests. Three
  engine-specific tests were skipped by design.
- Twelve Lighthouse runs over home, article, taxonomy, and livestream routes.
  Accessibility and SEO scored 100 on every run; performance remained above
  the configured thresholds; Best Practices scored 96 because the local
  preview intentionally exercises third-party fallbacks.

WebKit was also run in the supported
`mcr.microsoft.com/playwright:v1.62.1-noble` container: 18 tests passed and one
engine-specific test was skipped.

## Workflow validation

- `actionlint` passes for every workflow with its normal ShellCheck integration
  enabled.
- The exact-commit bot-candidate validator passes ShellCheck and shfmt.
- The retained Python automation modules compile under Python 3.
- Workflow contract tests cover the serialized data/chat chain, exact final
  SHA dispatch, trusted publisher boundary, pinned actions, data-only candidate
  rejection including deletions, absolute downloader execution, required manual
  dispatch inputs, and immutable-tag CI reuse.
- The committed repository-rule files remain disabled templates. They are not
  applied before the guarded Phase 5 cutover.

## Hugo removal

Astro is the only package-script production build path. Hugo configuration,
archetypes, templates, pipeline assets, generated metadata, and stale theme
sources are removed. The baseline capture script and Hugo route manifest remain
as migration evidence and are not runtime dependencies.

## Remaining Phase 5 gates

Production mutation remains intentionally out of scope for Phase 4. The
Cloudflare preview, workflow disable-and-drain operation, Pages setting change,
migration merge, repository-rule activation, first managed-data PR, production
verification, and rollback observation are guarded Phase 5 operations.
