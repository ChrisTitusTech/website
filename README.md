# Christitus.com

The source for [christitus.com](https://christitus.com), built as a fully static
Astro site and deployed with Cloudflare Pages.

## Requirements

- Node.js 24
- npm

Install the exact dependency tree and run the complete local gate:

```bash
npm ci
npm run validate
```

Development commands:

```bash
npm run dev          # production-eligible content only
npm run dev:content  # include draft and future content locally
npm run build        # static output in dist/
npm run preview      # serve the production artifact
```

Focused validation is available through `npm run check`, `npm test`,
`npm run test:browser`, `npm run test:browser:webkit`, and
`npm run test:lighthouse`. Historical article Markdown is excluded from broad
formatting and Markdown-lint rewrites; source, configuration, migration docs,
and the post template remain enforced.

## Create a post

The repository scaffolder is the Astro equivalent of a Hugo archetype. In an
interactive terminal, omit categories to choose from the complete numbered
list:

```bash
npm run new:post -- "My new article"
```

For non-interactive use, pass one or more exact category names:

```bash
npm run new:post -- "My new article" \
  --category Linux \
  --category "Software Dev"
```

The command renders `templates/post.md.tmpl` into
`content/posts/<year>/<slug>.md`, defaults the post to `draft: true`, and
refuses file, URL, redirect, static-asset, taxonomy, feed, or pagination
collisions. The available categories are Android, ChromeOS, Development,
FreeBSD, Hardware, Linux, MacOS, Misc, Networking, Software Dev, Titus,
Virtualization, Windows, Windows Server, and YouTube.

Set the featured image at `static/images/<year>-thumbs/<slug>.webp`, edit the
generated front matter and body, then preview drafts with `npm run dev:content`.

## Repository layout

- `src/` contains Astro pages, layouts, components, styles, and browser code.
- `content/` contains articles and standalone page Markdown.
- `static/` is copied directly into the published site.
- `data/livestreams.json` and `static/chats/` are maintained by Python
  automation and a managed pull-request workflow.
- `scripts/` contains content preparation, validation, the post scaffolder, and
  data automation.
- `tests/` contains unit, route-contract, and browser coverage.
- `SPEC.md` and `ROADMAP.md` record the migration contract and cutover gates.

Cloudflare production cutover, repository-rule activation, and the first live
managed-data PR are separate guarded operations documented in Phase 5 of
`ROADMAP.md`.
