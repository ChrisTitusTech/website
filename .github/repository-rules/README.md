# Repository rule cutover

These files describe the repository rules required after the Astro migration
is merged. They are intentionally disabled templates in this pull request.
Applying them while the Hugo workflows are still active would create required
checks that the default branch cannot produce.

Phase 5 applies the rules only after the migration branch is current with
`master`, every named check is green on the recorded head SHA, and the old data
workflows are disabled and drained. Merge queue is not part of this contract.

## Files

- `master-protection.json` requires a current pull request, resolved review
  threads, and all quality/security checks, including for administrators.
- `branch-mutation.json.tmpl` restricts creation, updates, and deletion across
  every branch. Replace both actor placeholders with the GitHub Actions App and
  repository-role IDs that maintain the managed data branch; the dedicated tag
  publisher App must not appear in this bypass list.
- `data-check-tag-creation.json.tmpl` restricts creation under
  `refs/tags/data-check/**` to the dedicated tag-publisher GitHub App. Replace
  `DATA_CHECK_TAG_APP_INTEGRATION_ID` with the real integration ID before using
  the API. Do not guess this value.
- `data-check-tag-immutability.json` forbids updates and deletion under the same
  namespace with no bypass actors, including the App and administrators.

The protected `data-check-tag-publisher` environment owns
`DATA_CHECK_TAG_APP_PRIVATE_KEY` and the `DATA_CHECK_TAG_APP_ID` environment
variable. The App receives repository `contents: write` only. It has no branch
rule bypass and no tag update/deletion bypass.

Before enabling either retained workflow in Phase 5, configure these deployment
environments with selected-branch policies that allow only `master`:

- `data-check-tag-publisher` owns the App ID and private key. The environment
  must reject tag and non-`master` branch deployments; checking out `master`
  inside a job is not a substitute for this policy.
- `livestream-data-automation` owns `YOUTUBE_API_KEY`, `TWITCH_CLIENT_ID`, and
  `TWITCH_CLIENT_SECRET`. Move those values out of repository-level secrets so
  a workflow dispatched from another ref cannot request them without passing
  the environment policy. Every job in the retained workflow declares this
  environment, and the entry job also fails closed unless its ref is `master`.

Verify both environment policies with a rejected non-`master` dispatch before
re-enabling the retained workflow. Do not store the App private key or the three
data credentials at repository scope after this transition.

GitHub Actions concurrency supports one running and one pending member per
group; it does not expose a configurable `queue: max` field. The retained data
workflow therefore uses `cancel-in-progress: false`, while the independent
monitor covers platform queue-limit cancellations and keeps a durable issue
open until a complete reconciliation succeeds.
