# Phase 1 Hugo baseline

This snapshot is the rollback and parity baseline for the Astro migration.

## Source and build

- Baseline source: production `master` at
  `b69302b71532890277940bd2a137986cb2409718`
- Hugo: official `v0.158.0+extended` release, matching Production
- Command: `hugo --gc --minify --cleanDestinationDir --destination <empty-dir>`
- Result: successful clean build
- Generated files: 2,156
- Hugo-reported pages: 813
- Hugo-reported paginator pages: 125
- Hugo-reported aliases: 244
- Hugo-reported static files: 968

`tests/baseline/hugo-public.json` records the source inventory, every emitted
path and route, raw/classified alias targets, semantic search/feed/sitemap
inventories with full-body description hashes, critical output hashes, and
representative canonical, social, feed-discovery, and structured-data metadata. Regenerate it
only with a checksum-verified official Hugo binary and a clean detached worktree:

```bash
gh release download v0.158.0 --repo gohugoio/hugo \
  --pattern hugo_extended_0.158.0_linux-amd64.tar.gz \
  --pattern hugo_0.158.0_checksums.txt \
  --dir /tmp/hugo-0.158.0
cd /tmp/hugo-0.158.0
rg 'hugo_extended_0.158.0_linux-amd64.tar.gz$' \
  hugo_0.158.0_checksums.txt | sha256sum --check
cd -
git worktree add --detach /tmp/website-hugo-baseline \
  b69302b71532890277940bd2a137986cb2409718
scripts/capture-hugo-baseline.py tests/baseline/hugo-public.json \
  --repo /tmp/website-hugo-baseline \
  --hugo-archive \
    /tmp/hugo-0.158.0/hugo_extended_0.158.0_linux-amd64.tar.gz \
  --expected-hugo-archive-sha256 \
    c2a724ac3c8e949fca56dd438b868b2128837754420c20a6e7ae345616c4e625 \
  --expected-commit b69302b71532890277940bd2a137986cb2409718 \
  --expected-hugo-version \
    'hugo v0.158.0-f41be7959a44108641f1e081adf5c4be7fc1bb63+extended linux/amd64 BuildDate=2026-03-16T17:42:04Z VendorInfo=gohugoio' \
  --expected-file-count 2156 \
  --expected-alias-count 244 \
  --build-clock 2026-08-13T13:13:00-05:00
git worktree remove /tmp/website-hugo-baseline
```

The script rejects a dirty or wrong-commit worktree, verifies the binary's
official archive checksum and exact reported version, uses a fixed minimal build
environment, creates its own empty temporary destination, and performs the clean
Hugo build at the recorded fixed clock before capturing evidence. Hugo 0.158.0
resolves the colliding
legacy `content/live-streams.md` and `content/live-streams/_index.md` sources
nondeterministically. The script isolates every attempt and accepts only the
known complete production contract (2,156 files, 244 aliases, and all
representative pages), failing after ten attempts instead of recording the
smaller 2,154-file variant.

All 244 RSS outputs, channel metadata, Atom self-links, ordered items, and item
description sizes and hashes are recorded. Hugo selects display casing
nondeterministically for terms that
historically use multiple casings, so taxonomy channel titles and root taxonomy
item titles/descriptions are case-folded in the semantic inventory; individual
article titles and every other feed field remain exact.

## Deployment rollback snapshot

The current authoritative Pages contract is:

- Production branch: `master`
- Root directory: repository root
- Build command: `hugo --gc --minify`
- Output directory: `public`

The target is Node 24, `npm run build`, and `dist`, but production must not be
changed before the Phase 5 preview and guarded cutover. After authenticated,
read-only dashboard inspection, `tests/baseline/cloudflare-pages.json` records
the project settings, environment-scoped `HUGO_VERSION` values, runtime settings,
active deployment identity, and all 12 ordered Page Rules. No zone-level
Redirect Rule exists yet; the canonical `www` rule remains a Phase 5 cutover
action.

The tracked `_redirects` file is the current Pages redirect baseline. The two
domain-source rules must move to a zone-level Single Redirect, the QEMU redirect
must remain, and `/winget` must become a supported external redirect rather than
an external `200` proxy.

## Repository protection rollback snapshot

GitHub returned no repository rulesets and no classic protection for `master`.
`tests/baseline/github-rules.json` records the timestamp, repository, fully
authorized viewer context, and raw response bodies so an empty result is not
confused with incomplete visibility. Protection changes remain a post-merge
Phase 5 cutover operation.

## Rollback boundary

Before changing production settings, revalidate this snapshot against the live
dashboard and record the preview deployment. Rollback promotes deployment
`68d265cd-60d7-4907-94ea-ab9672e4fb30` (or the then-current verified Hugo
deployment), restores this build contract and captured Pages/runtime/Page Rule
settings, removes the new zone redirect, restores the pre-migration repository
rules, and reverts the migration while both legacy data workflows are disabled.
