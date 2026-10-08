# Firecrawl content review evidence

This PR contains researched article corrections, the archive link audit, and
[Use Firecrawl to Keep Your Website Up to Date](../../src/content/posts/2026/firecrawl-agent-website-updates.md).
It does not ship the experimental content-refresh CLI or an automatic patch
writer. No schedule, automatic merge, or deployment is included.

## Initial pilot

The [curated pilot ledger](content-refresh-pilot.json) preserves the original
ten-article review, its twelve successful Firecrawl source captures, and seven
corrections across six articles. Source URLs, retrieval times, excerpts, and
reasons remain available for editorial review. The pilot's inventory counts,
source hashes, and patch records describe that historical run; they are not a
current inventory or an executable patch bundle.

The pilot kept historical tutorials in context, added dated notices where
appropriate, and left unsupported corrections for further review. In particular,
the PowerShell command examples still require separate runtime review. Reading
package documentation did not establish their runtime behavior.

The [full archive audit](content-link-audit.md) records the subsequent 330-post
review, its repairs and unresolved sources, and the later owner-requested draft
cleanup. Its CSVs and repair ledger intentionally preserve audit-time coverage.

## Reviewing more content

1. Select published articles and specific claims worth checking.
2. Collect relevant official sources with Firecrawl; record source URLs and
   retrieval dates, and identify blocked or incomplete checks.
3. Produce a report with original passages, evidence, and suggested corrections.
4. Apply accepted changes through ordinary repository edits and PR review.
5. Preview the affected pages and run the site's required validation.

The public article includes setup links, reusable prompts, and guidance on when
Firecrawl helps compared with an agent's existing fetch or browser tools.
Private captures stay in ignored `.content-refresh/`; no private captures or
API keys are published. Keeping that directory ignored also protects captures
from the earlier experiment.

## Validation boundaries

Use `npm run validate` for the repository's complete local gate. It covers the
remaining website tests, production rendering and route contracts, automated
browser engines, and Lighthouse. There is no updater test suite after removal
of the updater itself.

The final PR description records the current validation and review results.
Real Safari, Edge, mobile Safari, mobile Chrome hardware checks, and Cloudflare
preview-deployment review remain unperformed. Historical article commands were
not executed as part of the content audit.
