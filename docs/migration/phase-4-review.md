# Phase 4 review evidence

Date: 2026-08-13

## Clean-install validation

The Phase 4 implementation was validated after replacing the dependency tree
with `npm ci`. The full validation gates then passed:

- Prettier and Markdown lint checks.
- The repository audit policy. The six reported high findings all derive from
  the one time-limited, development-only Lighthouse CI waiver recorded in
  `docs/security/npm-audit-waivers.json`; there are no critical findings.
- Astro diagnostics with zero errors, warnings, or hints.
- 61 unit and workflow-contract tests.
- A deterministic 1,285-page production build with digest
  `deb4acd28587e4c72c3e6daf01aed8a2c3310a9dd51bdd87610b1d39b840c182`.
- The 1,183-route Hugo compatibility contract and 312 search entries.
- 66 applicable Chromium, Firefox, and mobile browser tests. Three
  engine-specific tests were skipped by design.
- Twelve Lighthouse runs over home, article, taxonomy, and livestream routes.
  Accessibility and SEO scored 100 on every run; performance remained above
  the configured thresholds; Best Practices scored 96 because the local
  preview intentionally exercises third-party fallbacks. One preceding full-gate
  run measured the Linux taxonomy LCP at 2,552 ms against the 2,500 ms cap; an
  immediate twelve-run Lighthouse retry passed without code changes.

WebKit was also run in the supported
`mcr.microsoft.com/playwright:v1.62.1-noble` container: 22 tests passed and one
engine-specific test was skipped.

## Workflow validation

- `actionlint` passes for every workflow with its normal ShellCheck integration
  enabled.
- The exact-commit bot-candidate validator passes ShellCheck and shfmt.
- The retained Python automation modules compile under Python 3.
- Workflow contract tests cover the serialized data/chat chain, exact final-SHA
  validation and publication, `master` drift rejection, pinned actions,
  data-only candidate rejection including deletions, absolute downloader
  execution, and required manual dispatch inputs.
- The serialized data workflow resets its managed branch to the captured
  `master` base and refetches current source state on every accepted run. It
  validates the generated site before fast-forwarding the exact candidate to
  `master`, so interruption recovery does not depend on a stale checkpoint.
- The committed repository-rule files remain disabled templates. They are not
  applied before the guarded Phase 5 cutover.

Post-migration operations replaced the original PR/checkpoint delivery path
described in the historical acceptance record above. The current contract is
the direct-publication workflow and contract-test evidence in this section.

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
