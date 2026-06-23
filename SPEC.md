# Website Specification

## Purpose

This repository builds and deploys the Chris Titus Tech website at `https://christitus.com/`. The site is a static Hugo website for technology articles, guides, downloads, live-stream archives, recommendations, newsletter pages, RSS/search, and legal/support pages.

The site should remain fast, searchable, durable for old links, and simple to maintain without requiring a JavaScript application framework.

## Primary Audiences

- Viewers looking for Chris Titus Tech articles, Windows/Linux guides, utilities, downloads, and recommendations.
- Returning readers who browse by category, tag, search, RSS, or older post URLs.
- Live-stream viewers looking for recent stream recordings and optional Twitch chat replay context.
- Site maintainers and automation that publish new posts, refresh live-stream data, and deploy static output.

## Platform

- Static site generator: Hugo Extended.
- Current verified version: `hugo v0.162.0+extended`.
- Deployment target: Cloudflare Pages.
- Public canonical URL: `https://christitus.com/`.
- Primary source configuration: `config.toml`.
- Generated output directory: `public/`.

## Non-Goals

- The site is not a single-page application.
- The repository does not currently require a Node package manager build pipeline.
- The generated `public/` directory is not the canonical source for templates, content, or data.
- Live-stream automation should not store API keys, OAuth secrets, or downloaded tool credentials in the repository.

## Information Architecture

### Main Navigation

The main menu is configured in `config.toml` and includes:

- Home
- Downloads
- Forums
- Live Streams
- Newsletter
- Sections, with category children for Android, Linux, MacOS, Networking, and Windows
- YouTube

### Footer Navigation

The footer menu includes Privacy and Terms & Conditions. Additional legal/support pages exist as standalone content pages, including refund and RSS.

### Content Types

- Posts: long-form articles and guides under `content/posts/`.
- Pages: top-level standalone Markdown pages under `content/`.
- Live streams: section and player pages under `content/live-streams/`.
- Archive: archive section under `content/archive/`.
- Data-driven pages: live streams use `data/livestreams.json`.

## Content Model

### Posts

Posts should include front matter with:

- `title`: human-readable page title.
- `date`: publish date in `YYYY-MM-DD` format.
- `url`: explicit root-relative permalink.
- `image`: featured image path, normally `images/<year>-thumbs/<slug>.webp`.
- `categories`: list of category names.
- `tags`: list of tag names.
- `draft`: boolean publication flag.

Posts may include `<!--more-->` to control summaries. Published URLs should be stable once released.

### Images

Featured images and historical post images live under `static/images/`. Current yearly thumbnails use directories such as `static/images/2026-thumbs/`. Hugo imaging is configured for quality 75, Lanczos resampling, smart anchor, and WebP support.

### Search

The home output includes JSON. `layouts/_default/index.json` serializes regular pages from `site.Params.mainSections` with title, tags, categories, content text, and permalink. Search behavior depends on this JSON shape.

### RSS

RSS is enabled for home output. Custom RSS templates exist under `layouts/_default/rss.*`.

## Layout And Rendering

### Base Shell

`layouts/_default/baseof.html` provides:

- HTML document shell.
- Dark theme attribute from site params.
- Head, style, structured data, header, footer, and script partials.
- A skip-to-main-content link.
- Conditional code-copy script for pages with code blocks.

### Article Pages

Article pages should render:

- Title, publication date, reading time, categories, tags, and featured image.
- Content with Hugo Goldmark rendering.
- Reading progress indicator.
- Sidebar table of contents on configured layouts.
- Related posts.
- Social sharing links.
- Lazy-loaded Utterances comments tied to `ChrisTitusTech/website`.
- Optional Google ad widgets based on sidebar settings.

### Lists And Taxonomies

List pages paginate posts from `site.Params.mainSections`, render article summaries, and expose category/tag browsing. Existing taxonomy URL behavior should be preserved.

### Metadata And Structured Data

Head and structured-data partials are responsible for:

- SEO metadata.
- Open Graph and Twitter card data.
- Canonical URL behavior.
- Favicons and feed links.
- JSON-LD for site, page, article, and breadcrumb data where applicable.

Changes to these partials affect every page and require full-site build validation.

## Live-Stream Feature

### Data Source

`data/livestreams.json` contains:

- `updated`: ISO timestamp for the data refresh.
- `items`: ordered live-stream entries.

Each entry is expected to include:

- `videoId`
- `title`
- `description`
- `thumbnail`
- `date`

Optional fields:

- `twitchVodId`
- `hasChatReplay`

### Archive Page

`layouts/live-streams/list.html` renders the live-stream archive from `hugo.Data.livestreams`, filters deleted/private videos, links thumbnails and titles to `/live-streams/player/?v=<videoId>`, and displays a chat badge when `hasChatReplay` is true.

### Player Page

`layouts/live-streams/player.html` reads the `v` query parameter, loads the matching YouTube stream, and can synchronize Twitch chat replay comments from `static/chats/<videoId>.json`.

### Automation

`scripts/fetch-livestreams.py`:

- Reads `YOUTUBE_API_KEY` and playlist configuration.
- Fetches YouTube playlist items.
- Writes `data/livestreams.json`.
- Preserves existing Twitch VOD IDs.
- Updates `hasChatReplay` based on files in `static/chats/`.

`scripts/match-twitch-vods.py`:

- Reads Twitch credentials from environment variables.
- Matches Twitch VODs to YouTube livestream entries using timestamp proximity.
- Updates livestream entries with matched Twitch VOD IDs.

GitHub Actions run these scripts on a schedule and commit changed data files.

## Assets

### CSS

- SCSS source is under `assets/scss/`.
- Bootstrap and other vendor assets are checked into `assets/css/vendor/` and `assets/js/vendor/`.
- Additional static CSS lives under `static/css/`.

### JavaScript

- Core theme behavior lives under `assets/js/` and `static/js/`.
- Search uses vendored Fuse and Mark libraries.
- Code-copy behavior is loaded only when a page contains code blocks and `params.code_copy_button` is enabled.
- Live-stream player behavior is embedded in the player template.

### Fonts

Local PT Sans web fonts live under `static/fonts/` and are preloaded by the head partial.

## Configuration Requirements

`config.toml` should preserve:

- `baseURL = "https://christitus.com/"`.
- `enableGitInfo = true`.
- Home outputs: HTML, RSS, JSON.
- Goldmark unsafe rendering and attribute support, because existing content/templates rely on embedded HTML and attributes.
- Search enabled through params.
- `mainSections = ["posts"]`.
- Current social links, logo, favicon, default theme, sidebar, and widget settings unless a task intentionally changes them.

## Redirects And URL Stability

The `_redirects` file supports deployment redirects. Existing post `url` front matter and redirect entries should be treated as compatibility contracts. Avoid changing slugs, deleting redirects, or moving content in ways that break old links unless the task explicitly requires it.

## Security And Privacy

- Never commit API keys, OAuth secrets, private keys, tokens, or secret values.
- Scripts and workflows should read secrets from environment variables or GitHub Actions secrets.
- Do not log secrets in automation output.
- Avoid adding third-party scripts unless their privacy, performance, and security implications are intentional.
- Keep external embeds limited and documented: YouTube, Twitch/chat replay data, Utterances comments, Google ads, and configured social links are current examples.

## Performance And Accessibility

The site should prioritize:

- Static rendering and minimal client-side JavaScript.
- Local fonts with preload hints.
- Lazy loading for non-critical images and comments.
- WebP thumbnails where available.
- Clear headings and semantic structure.
- Keyboard-accessible navigation and controls.
- Meaningful alt text for content images.
- Preserving the skip-to-main-content link.

## Validation

Baseline validation for repository changes:

```bash
hugo --gc --minify
```

Additional validation:

- Run `hugo server --buildDrafts --buildFuture` for draft/future post visual review.
- Validate JSON after editing `data/livestreams.json`.
- Exercise affected Python scripts with safe environment variables or mocks when script behavior changes.
- Inspect representative pages after high-impact template changes: home, post, category/tag list, search, live-stream archive, live-stream player, downloads, and legal pages.

## Current Verified Build

As of 2026-06-23, `hugo --gc --minify` succeeds locally with Hugo Extended 0.162.0 and reports:

- 797 pages.
- 152 paginator pages.
- 959 static files.
- 239 aliases.

This build summary is a baseline, not a strict invariant; content changes can legitimately alter counts.
