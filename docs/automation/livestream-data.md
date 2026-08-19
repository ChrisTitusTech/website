# Livestream data automation

`Update Livestreams Data` is the single scheduled workflow for YouTube metadata
and Twitch chat replays. It runs every six hours and can also be dispatched
manually.

The workflow serializes runs, restores or rebases the managed
`automation/livestream-data` branch, and executes these stages in order:

1. Refresh `data/livestreams.json` with the existing YouTube API contract.
2. Check out that exact emitted SHA, match Twitch VODs, download missing chat
   JSON, and refresh `hasChatReplay` flags.
3. Verify the branch still equals the final emitted SHA and that its diff from
   `master` contains only generated data.
4. Open or refresh one ready pull request.
5. Ask the trusted `master` workflow to create an immutable `data-check/*` tag
   and explicitly dispatch CI at that tag and exact SHA.

No PR update or CI dispatch occurs until both data jobs succeed. A rerun is
idempotent: it resumes the existing generated-data branch, completes missing
chat work, and reconciles a missing PR or CI run. Token-suppressed push/PR
events are not used as required checks.

When `master` advances, the workflow configures the bot identity before any
rebase. A managed head already merged by any GitHub merge method is reset to the
new `master`; a still-pending divergent head is rebased and retained.

The TwitchDownloader archive is pinned to version `1.56.5` and its SHA-256 is
verified before extraction. Python automation dependencies are installed from
the hash-locked `scripts/requirements-automation.txt`. Existing secret names and Python
data contracts are unchanged: `YOUTUBE_API_KEY`, `TWITCH_CLIENT_ID`, and
`TWITCH_CLIENT_SECRET`.

All retained-workflow jobs use the protected `livestream-data-automation`
environment and the entry job requires the `master` ref. During Phase 5, move
the three existing data credentials into that environment, remove their
repository-level copies, and configure its deployment policy to allow only
`master`. The `data-check-tag-publisher` environment is independently restricted
to `master` and is the only location for its App ID and private key. A rejected
non-`master` dispatch is a required cutover check for both environments.

`Monitor Livestream Data Workflow` checks up to 100 recent retained-workflow
runs, failed/cancelled job steps, and immutable-tag CI for the managed branch's
exact final SHA. It opens or updates one durable issue after a failure, queue
cancellation, missing publisher result, or pending/failed CI. It closes the
issue only after both the full data reconciliation and exact-head CI succeed.

The workflows remain inactive on the default branch until the migration merges.
The first live managed-branch PR and its exact-head CI evidence are Phase 5
gates.
