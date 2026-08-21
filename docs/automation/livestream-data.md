# Livestream data automation

`Update Livestreams Data` is the single scheduled workflow for YouTube metadata
and Twitch chat replays. It runs every six hours and can also be dispatched
manually.

The workflow serializes runs, resets the managed `automation/livestream-data`
branch to the exact `master` head for each reconciliation, and executes these
stages in order:

1. Refresh `data/livestreams.json` with the existing YouTube API contract.
2. Check out that exact emitted SHA, match Twitch VODs, download missing chat
   JSON, and refresh `hasChatReplay` flags.
3. Build the generated site and validate its route contract at the final data
   SHA.
4. Verify that `master` and the managed branch have not moved, that the exact
   diff contains only allowlisted generated data, and fast-forward `master` to
   the validated SHA.

Publication does not occur until both data jobs and generated-site validation
succeed. If `master` or the managed branch moves during the run, publication
fails closed; the next scheduled or manual run starts a fresh current-state
reconciliation from the new `master` head.

The TwitchDownloader archive is pinned to version `1.56.5` and its SHA-256 is
verified before extraction. Python automation dependencies are installed from
the hash-locked `scripts/requirements-automation.txt`. Existing secret names and Python
data contracts are unchanged: `YOUTUBE_API_KEY`, `TWITCH_CLIENT_ID`, and
`TWITCH_CLIENT_SECRET`.

All retained-workflow jobs use the protected `livestream-data-automation`
environment, and the entry job requires the workflow to run from `master`. The
three data credentials are scoped to that environment, whose deployment policy
allows only `master`.

`Monitor Livestream Data Workflow` checks up to 100 recent runs, failed or
cancelled job steps, the success of all four required jobs, and whether the
managed branch matches `master`. It opens or updates one durable issue after a
failure, stale or missing schedule, or queue cancellation. It closes the issue
only after a fresh full reconciliation validates and publishes the exact data
head successfully.
