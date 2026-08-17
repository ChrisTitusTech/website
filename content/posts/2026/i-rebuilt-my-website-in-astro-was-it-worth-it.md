---
title: "I Rebuilt My Website in Astro - Was It Worth It?"
date: "2026-08-17"
url: /i-rebuilt-my-website-in-astro-was-it-worth-it/
image: images/2026-thumbs/i-rebuilt-my-website-in-astro-was-it-worth-it.webp
categories:
  - "Development"
  - "Software Dev"
  - "Titus"
tags:
  - Astro
  - Hugo
  - Cloudflare Pages
  - Static Site Generators
  - Web Development
  - Website Migration
draft: false
---

Four years ago, I built this website with Hugo. In August 2026, I deleted the
Hugo build, replaced it with Astro, and moved the entire production site without
changing the URLs people already use.

Hugo was not broken. That is what made this migration interesting. The site had
simply grown from a blog into a publication, video archive, search engine,
download hub, newsletter funnel, and a pile of old links that absolutely could
not disappear. Rebuilding the easy 80 percent would have taken an afternoon.
Preserving the last 20 percent was the real project.

<!--more-->

So, was moving from Hugo to Astro worth it? Yes, but not for the reason most
framework comparisons give you.

## Why Replace Something That Already Worked?

My [original website setup](/how-i-setup-my-website/) was intentionally simple:

```text
Markdown -> Hugo -> GitHub -> Cloudflare Pages
```

That workflow served me well for years. Hugo is fast, dependable, and still one
of the best static site generators available. If you have a documentation site
or a straightforward blog, I am not going to tell you to rewrite it because a
JavaScript framework has a shinier home page.

But christitus.com stopped being a straightforward blog.

It now has hundreds of articles, category and tag archives, livestreams with
synchronized chat replays, local search, downloads, newsletter signup, feeds,
comments, ads, analytics, old redirects, and years of Markdown written against
Hugo behavior. The Hugo version worked, but every custom feature added another
template, partial, shortcode, SCSS rule, or vendor script to a stack that was
getting harder to reason about as one system.

I wanted three things:

1. A frontend I could understand from the page down to the browser behavior.
2. Tests that proved the old links and content still worked.
3. A foundation that was easier to change without dragging a client framework
   into every page.

Astro fit that job. It gives me components and TypeScript at build time, ships
static HTML by default, and lets browser JavaScript stay small and local. There
is no React application hiding underneath this site. It is still a static
website deployed by Cloudflare Pages.

The new publishing path is almost boring:

```text
Markdown -> Astro -> GitHub -> Cloudflare Pages
```

The generator changed. The static-site philosophy did not.

## The Website Was the Contract

The biggest mistake in any rebuild is treating the source code as the product.
It is not. The product is everything people and machines can already reach.

Before changing the build, I captured Hugo's production output as a baseline.
That clean build contained:

- 2,156 generated files
- 813 Hugo pages
- 125 paginator pages
- 244 aliases

That included much more than article HTML. It included case-sensitive URLs,
category pages, tag pages, RSS feeds, sitemap entries, social metadata, search
records, redirects, images, downloads, and weird historical edge cases nobody
remembers until Google lands on one.

One tracked image even had to remain byte-for-byte identical at its old public
path. Some old posts had empty categories. Others used historical capitalization
that new articles are no longer allowed to use. The archive contained Hugo
shortcodes, raw HTML, date-only front matter, timestamps with offsets, and posts
where an omitted `draft` field meant published.

That mess is not bad data. It is a public compatibility contract accumulated
over years.

Instead of cleaning up the archive and hoping for the best, the migration taught
Astro how to read it. New content gets stricter rules. Old published content
keeps working.

## Rebuilding Hugo Behavior Without Hugo

Astro content collections now load the existing Markdown with typed metadata.
The production build excludes drafts and future posts, but a separate local
preview command lets me see them while writing. A repository-owned post
scaffolder replaced Hugo archetypes and catches URL collisions before it writes
a file.

The compatibility renderer handles the Hugo shortcodes that are actually in the
archive, including YouTube, notices, tables, X posts, and Shopify embeds. An
unknown active shortcode fails the build instead of quietly publishing broken
template syntax. Literal shortcode examples inside code blocks remain article
content.

This is the unglamorous part of a successful migration. I did not run a giant
search-and-replace across old articles. I built a boundary around the history.

Routes received the same treatment. The Astro build generates and checks the
homepage, posts, pagination, taxonomies, search index, feeds, sitemap,
livestreams, player pages, legal pages, and redirects. The validator rejects
collisions between content, static assets, redirects, feeds, and generated
routes.

By the end, the new production artifact had a deterministic 1,183-route
compatibility contract and 312 searchable entries. That matters more to me than
whether one generator won a synthetic build-speed contest.

## I Used the Migration to Delete Frontend Baggage

The Hugo site had grown a traditional frontend layer over time: Bootstrap,
Font Awesome bundles, Fuse, Mark.js, Shuffle, theme scripts, Shopify code, SCSS
partials, and many custom layout files.

The Astro conversion removed that layer and replaced it with:

- reusable Astro components
- one custom CSS token system
- vanilla TypeScript for interactive behavior
- self-hosted fonts
- static pages with progressive enhancement

The result supports dark and light themes, keyboard navigation, local search,
livestream browsing, synchronized chat, lazy comments, lazy ads, and an
intent-driven store integration. The important part is that a visitor does not
download a full client UI framework just to read an article.

Third-party code also stopped being a requirement for the page to function.
Search uses a generated local index. The download page retains a direct store
link if Shopify is blocked. The livestream player works without chat. Ads,
comments, video APIs, and newsletter extras load only when they are needed.

That is the web I want: the content works first, and the integrations enhance it
afterward.

## Performance Was a Gate, Not a Vibe

Framework marketing loves a perfect Lighthouse screenshot. Real performance
work is less glamorous.

The migration added a pinned mobile Lighthouse profile that runs three times on
the homepage, an article, a category page, and the livestream archive. During
the final review, those pages scored between 99 and 100 for performance, 100 for
accessibility, 100 for SEO, and 96 for best practices in the local fallback
environment. Median Largest Contentful Paint ranged from 1.58 to 1.95 seconds,
with zero layout shift on those runs.

Those results did not appear automatically because the project used Astro. The
commit history shows the real work:

- stabilize Lighthouse performance
- stabilize mobile listing performance
- reduce webfont render delay
- inline the site stylesheet
- fix the remaining migration review findings

And after launch, I still changed the layout spacing, added missing support
paths to search and downloads, adjusted the Lighthouse threshold to account for
real run-to-run variance, and fixed the article table of contents so it actually
stays pinned while scrolling.

That last part is important. A green migration does not mean the design is done.
It means the new foundation is safe enough to improve.

## The Test Suite Became the Real Feature

The final Astro build is checked by much more than `npm run build`.

The repository validates formatting, Markdown, dependency policy, Astro types,
unit tests, deterministic output, the route contract, and the production build.
Playwright then exercises the site in Chromium, Firefox, mobile Chromium, and
WebKit. Browser tests cover the homepage, articles, taxonomy pages, search,
downloads, newsletter signup, livestreams, chat and no-chat player states,
redirects, the theme switcher, mobile navigation, keyboard access, and the 404
page.

Accessibility checks found a real contrast failure during development. It was
fixed before the final run. That is exactly what I want from automation: not a
badge, but a specific problem found before users have to report it.

The full clean validation produced a deterministic 1,285-page Astro build, ran
61 unit and workflow tests, exercised 66 applicable browser tests, and completed
12 Lighthouse runs. WebKit ran in its supported Playwright container because
the fallback binary did not match my Fedora host libraries.

This is more ceremony than a personal blog needs. It is not more ceremony than
a production publication with years of inbound links needs.

## The Hidden Migration Was GitHub Automation

The visible redesign was only half the job.

Livestream and chat data had been updated by separate scheduled workflows that
pushed generated data. The migration consolidated that pipeline and added
guards around the exact commit being tested. Candidate automation changes are
limited to the generated data paths, checks attach to the exact validated SHA,
and interruption handling can reconcile the branch and pull request instead of
blindly starting over.

Nobody watching the video will look at the homepage and say, "Nice immutable
commit validation." That is fine. Infrastructure is successful when it makes
the boring failures boring to recover from.

The same rule applied to deployment. The old Hugo output, Cloudflare settings,
redirect behavior, and repository state were captured before cutover. A rewrite
without a rollback plan is not confidence. It is gambling with extra steps.

## What the Commit History Actually Shows

The [main pull request](https://github.com/ChrisTitusTech/website/pull/273)
contained 23 commits before it was merged. The sequence is more useful than the
final screenshot:

```text
write the specification and roadmap
  -> close planning and cutover gaps
  -> capture the Hugo baseline
  -> build the Astro content foundation
  -> build the editorial experience
  -> finish infrastructure and automation
  -> review, fix, measure, and repeat
```

The merged change touched 175 files, added 49,426 lines, and removed 7,408. A
large part of those additions is recorded baseline and lockfile data, not
49,000 lines of shiny new application code. The deletions are more revealing:
Hugo configuration, templates, archetypes, old pipeline assets, vendor scripts,
and SCSS all left the production path.

The project did not begin with `npm install astro`. It began with nine planning
and review commits that defined what could not break. Only then did the history
move through baseline capture, content, design, infrastructure, performance,
and final review.

That order is why this worked.

## What Got Better

The obvious improvement is maintainability. A page is now composed from Astro
components instead of behavior being spread across Hugo templates, partials,
shortcodes, and global vendor scripts. TypeScript catches mistakes earlier, and
the browser code lives beside the feature that needs it.

The editorial workflow is also safer. A new post command creates consistent
front matter, uses the correct date and URL shape, requires a valid category,
defaults to a draft, and refuses to overwrite or collide with an existing
route.

Most importantly, I can make changes with evidence. If I touch search, routes,
metadata, a feed, or the article layout, the repository has a focused way to
prove whether I broke it.

## What Astro Did Not Magically Fix

Astro did not make historical content clean. We had to model the exceptions.
It did not make third-party integrations reliable. We had to build fallbacks.
It did not guarantee accessibility or speed. We had to test both. It did not
make deployment safe. We had to capture the old state and design a rollback.

It also moved the toolchain from one Hugo binary to Node, npm, a lockfile, Astro,
TypeScript, Vitest, Playwright, Lighthouse, and supporting packages. That is a
real dependency cost. The new stack is easier for me to extend, but it is not
smaller in every possible sense.

If your Hugo site is fast, easy to maintain, and does everything you need, keep
it. Rewrites are expensive. A framework switch without a concrete maintenance
problem is just a new way to own the same website.

## Was It Worth It?

For this site, yes.

Not because Astro defeated Hugo. Hugo did its job for years, and it gave us the
stable static foundation that made a careful migration possible.

The move was worth it because the website now matches how I build software:
plain-text content, static output, small client-side code, explicit contracts,
repeatable tests, independent review, and a rollback when reality ignores the
plan.

The final lesson is not "use Astro." It is this:

> Never start a website rewrite by asking how to rebuild the homepage. Start by
> asking what the old website is already promising.

Capture those promises. Turn them into tests. Then change the engine.

That is how I replaced Hugo without replacing the website.
