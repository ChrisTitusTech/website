# Repository Instructions

## Command Execution

- Prefix shell commands with `rtk` when `rtk` is installed.
- If `rtk` is unavailable, state that once and use the raw command.
- In command chains, apply `rtk` to each supported command segment.
- If `rtk` rejects an unsupported command or flag, retry it raw.
- Use raw commands when debugging command filtering or shell startup noise.

## Project Overview

- This repository is the Hugo source for `https://christitus.com/`, a static content site for Chris Titus Tech articles, downloads, live-stream archives, newsletter pages, legal pages, and search.
- The production target is Cloudflare Pages with a custom domain and SSL.
- The site is intentionally simple: Hugo templates, Markdown content, TOML config, SCSS/CSS, vanilla JavaScript, vendored frontend assets, Python data scripts, and generated static output.
- There is no Node package manifest in the current project. Do not introduce a Node build step unless the task explicitly requires it and the tradeoff is documented.

## Toolchain

- Use Hugo Extended. The current verified local version is `hugo v0.162.0+extended`.
- Baseline validation: `hugo --gc --minify`.
- Local preview: `hugo server --buildDrafts --buildFuture` when draft/future content needs review; otherwise `hugo server`.
- Python scripts under `scripts/` use Python 3.12 in GitHub Actions and rely on `requests`.
- Markdown lint configuration lives in `.markdownlint-cli2.yaml`, but there is no checked-in package manager setup for running it.

## Repository Layout

- `config.toml` is the primary Hugo configuration: site metadata, menu items, markup settings, theme parameters, output formats, imaging settings, and social links.
- `content/` contains Markdown pages and posts.
- `content/posts/<year>/` contains current dated posts; `content/posts/old/` preserves older migrated posts.
- `content/live-streams/` defines the live-stream section and player page.
- `data/livestreams.json` is generated data consumed by live-stream templates.
- `layouts/` contains all Hugo templates and partials. There is no external Hugo theme directory.
- `assets/scss/` and `assets/js/` contain Hugo-pipeline and vendored assets used by templates.
- `static/` contains files copied directly into the published site, including images, fonts, custom JS/CSS, downloads, and chat replay JSON.
- `public/` is generated Hugo output. Avoid editing it as source unless the user explicitly asks for generated artifact changes.
- `_redirects` is a deployment artifact for redirects and should be preserved when changing URL behavior.

## Content Conventions

- New posts should use `archetypes/default.md` unless there is a specific reason to diverge.
- Post front matter should include `title`, `date`, `url`, `image`, `categories`, `tags`, and `draft`.
- Post URLs are explicit and root-relative, for example `/windows-tool/`. Preserve existing URLs to avoid breaking inbound links.
- Featured images normally live under `static/images/<year>-thumbs/` and are referenced as `images/<year>-thumbs/<slug>.webp`.
- Use `<!--more-->` to control summaries on list pages where appropriate.
- Keep categories aligned with the main navigation taxonomy where possible: Android, Linux, MacOS, Networking, and Windows.
- Legal and utility pages such as privacy, refund, RSS, search, terms, recommendations, downloads, and newsletter live directly under `content/`.
- Do not expose credentials, private keys, API tokens, or secret values in content, data files, logs, or documentation.

## Template And Frontend Conventions

- Templates use Hugo Go templates with Bootstrap-oriented markup and custom partials.
- `layouts/_default/baseof.html` defines the document shell, skip link, header, footer, scripts, and conditional code-copy script.
- `layouts/partials/head.html`, `style.html`, `script.html`, and `structured-data.html` control metadata, critical CSS, asset loading, and JSON-LD. Treat these as high-impact files.
- Search is generated from `layouts/_default/index.json` and includes regular pages from `site.Params.mainSections`.
- Single posts include reading progress, sidebar table of contents, related posts, social sharing, lazy-loaded Utterances comments, and optional Google ad widgets.
- Prefer existing partials and SCSS structure over adding inline one-off markup or styles.
- Use accessible markup: preserve the skip link, meaningful `alt` text, semantic headings, focusable controls, and `aria` labels on icon-only controls.
- Keep performance-sensitive choices intact unless the task is specifically about changing them: local fonts, preload/preconnect hints, lazy loading, minification, and WebP thumbnails.

## Live-Stream Data Contract

- `data/livestreams.json` has an `updated` timestamp and an `items` array.
- Live-stream items are expected to include YouTube fields such as `videoId`, `title`, `description`, `thumbnail`, and `date`.
- Optional Twitch replay fields include `twitchVodId` and `hasChatReplay`.
- `layouts/live-streams/list.html` renders the archive from `hugo.Data.livestreams`.
- `layouts/live-streams/player.html` expects a `v` query parameter, embeds the YouTube player, and can synchronize Twitch chat replays from `static/chats/<videoId>.json`.
- `scripts/fetch-livestreams.py` fetches YouTube playlist data and preserves existing Twitch/chat fields when refreshing `data/livestreams.json`.
- `scripts/match-twitch-vods.py` matches Twitch VODs to YouTube streams by timestamp.
- GitHub Actions update livestream data and chat replays using repository secrets. Do not hard-code those secrets.

## GitHub Actions

- `.github/workflows/update-livestreams.yml` refreshes `data/livestreams.json` on a six-hour schedule and commits changes when data changed.
- `.github/workflows/update-chat.yml` runs after the livestream workflow, matches Twitch VODs, downloads chat replay JSON, refreshes chat flags, and commits changes.
- Workflow scripts require `YOUTUBE_API_KEY`, `TWITCH_CLIENT_ID`, and `TWITCH_CLIENT_SECRET` secrets.
- If workflow behavior changes, validate both local script behavior and the generated data shape consumed by Hugo templates.

## Change Guidelines

- Inspect current git status before editing and preserve unrelated user changes.
- Keep changes small and reviewable. Avoid broad formatting passes across archived content unless requested.
- Do not rewrite historical posts, URLs, redirects, generated chat JSON, or generated `public/` output as part of unrelated work.
- When changing templates, verify both desktop and mobile layout implications, especially article pages, navigation, search, and live-stream player pages.
- When changing content, verify front matter parses and the Hugo build still succeeds.
- When changing data scripts or workflows, verify failure behavior and avoid logging secrets or raw tokens.
- Prefer structured parsers for TOML, JSON, YAML, and Markdown front matter when doing bulk edits.

## Validation Checklist

- Run `hugo --gc --minify` for any template, config, data, static asset, or content change.
- For draft or future posts, also run `hugo server --buildDrafts --buildFuture` when visual review matters.
- For Python script changes, run the affected script with safe test inputs or mocked environment where practical.
- For live-stream changes, confirm `data/livestreams.json` remains valid JSON and the list/player templates still have the fields they expect.
- Report any skipped validation and why.


<!-- headroom:rtk-instructions -->
# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands
```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules
- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->
