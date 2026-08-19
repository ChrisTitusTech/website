# Project overview

This repository is a fully static Astro site for
[christitus.com](https://christitus.com), hosted by Cloudflare Pages. Use
Node.js 24, install with `npm ci`, build with `npm run build`, and run the full
local quality gate with `npm run validate`.

Articles remain in `src/content/`, Astro source lives in `src/`, public assets
live in `public/`, and generated production output is `dist/`. Preserve explicit
article URLs, historical Markdown compatibility, accessibility, and the
livestream JSON/Python contracts. Do not introduce a server adapter or client UI
framework.
