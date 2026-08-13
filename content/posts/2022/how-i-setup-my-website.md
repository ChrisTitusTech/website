---
title: "How I Set Up My Website with Hugo"

date: 2022-10-07
lastmod: 2026-08-12
url: /how-i-setup-my-website/
image: images/2022-thumbs/how-i-setup-my-website.webp
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Website
  - Hugo
draft: false
---

> **Updated August 12, 2026:** This guide now reflects the current Hugo workflow and this site's move from Netlify to Cloudflare Pages. The original video at the end shows the older 2022 setup, so use the commands in this article as the current reference.

My website workflow is intentionally simple: write articles in Markdown, preview them locally with Hugo, store the source in GitHub, and let Cloudflare Pages build and publish the site.<!--more-->

Hugo is a static site generator. It converts content, templates, and assets into ordinary HTML, CSS, and JavaScript. There is no WordPress database or web editor to maintain, and the generated site can be served quickly from a content delivery network.

## How the Workflow Works

The publishing path looks like this:

```text
Markdown and templates -> Hugo -> GitHub -> Cloudflare Pages -> Website
```

I normally outline an article before recording its companion video. That outline becomes both a readable guide and a reference for viewers. Because the source is Markdown, I can work in any editor and keep every revision in Git.

GitHub stores the source and its history. Cloudflare Pages watches the repository, runs Hugo after each production update, and publishes Hugo's generated `public` directory. A local preview catches most content and layout problems before anything is pushed.

## Install Hugo and Git

Install [Hugo Extended](https://gohugo.io/installation/) and [Git](https://git-scm.com/downloads/) for your operating system. The Extended edition is important when a site processes SCSS or uses other Extended features; this website compiles SCSS through Hugo Pipes.

Verify both tools before creating a project:

```bash
hugo version
git --version
```

This site was tested with Hugo Extended 0.162.1 when this article was updated. For a new project, use a current Hugo release and keep the local and deployment versions aligned.

## Create a New Hugo Project

The current Hugo quick start uses `hugo new project`:

```bash
hugo new project website
cd website
git init
```

Hugo creates the standard project directories and a `hugo.toml` configuration file. Older projects may use `config.toml`, `hugo.yaml`, or another supported configuration filename; this website still uses `config.toml`.

A new Hugo project needs templates before it can render useful pages. The easiest starting point is a maintained theme. For example, the theme used in the [official Hugo quick start](https://gohugo.io/getting-started/quick-start/) can be added as a Git submodule:

```bash
git submodule add https://github.com/gohugo-ananke/ananke themes/ananke
```

Then configure the project in `hugo.toml`:

```toml
baseURL = "https://example.com/"
locale = "en-US"
title = "My Website"
theme = "ananke"
```

Replace the example domain and title with your own values. Keeping the trailing slash on `baseURL` avoids surprises when Hugo creates absolute URLs.

This website no longer uses the Zzo theme mentioned in the original 2022 guide. Its templates are maintained directly under `layouts/`, with styles and scripts under `assets/`. Starting with a theme is still the fastest way to learn Hugo, but moving to local templates later gives complete control without editing third-party theme files.

## Create and Preview a Post

Create a post from the project root:

```bash
hugo new content content/posts/my-first-post.md
```

Hugo uses `archetypes/default.md` as the starting template. Edit the new file under `content/posts/`, then run the development server with drafts enabled:

```bash
hugo server --buildDrafts
```

Open the address Hugo prints, normally `http://localhost:1313/`. Hugo automatically rebuilds the site and refreshes the browser when a source file changes.

My usual workspace has only three parts:

1. A browser showing the local preview
2. An editor for Markdown, templates, and styles
3. A terminal running the Hugo development server

When the article is ready, set `draft: false` in its front matter. A normal production build excludes content marked as a draft.

## Use Front Matter Consistently

Front matter controls how Hugo publishes a page. This site's post archetype includes a title, date, explicit URL, featured image, categories, tags, and draft status. A simplified post looks like this:

```yaml
---
title: "My First Post"
date: 2026-08-12
url: /my-first-post/
image: images/2026-thumbs/my-first-post.webp
categories:
  - Linux
tags:
  - Hugo
draft: true
---
```

Use `archetypes/default.md` to define fields that every new post should contain. An archetype eliminates repetitive setup and reduces front matter mistakes. Preserve published URLs when editing old articles so existing links and search results continue to work.

Files under `static/` are copied directly to the generated site. For example, `static/images/photo.webp` is available at `/images/photo.webp`. Files under `assets/` are processed through Hugo Pipes and are appropriate for SCSS, bundled JavaScript, and other build-time resources.

## Customize Layouts Safely

Avoid making one-off changes inside a downloaded theme. To override a theme template, place your version at the matching path under the project's `layouts/` directory. Project templates take precedence over theme templates and remain separate from theme updates.

Partials are useful for shared elements such as the header, footer, metadata, and sidebar. Hugo's [template documentation](https://gohugo.io/templates/) explains the current lookup rules and template system.

The public source for this site is available in the [ChrisTitusTech website repository](https://github.com/ChrisTitusTech/website). Its current structure is a useful example of a Hugo site that has grown beyond an external theme:

- `content/` contains Markdown pages and posts.
- `layouts/` contains the complete template layer.
- `assets/scss/` and `assets/js/` contain processed frontend assets.
- `static/` contains files copied directly to the published site.
- `config.toml` contains site settings, menus, and parameters.

For more background on larger customizations, see my earlier [Hugo guide](/hugo-guide/).

## Validate the Production Build

Before publishing, run the same kind of build used for production:

```bash
hugo --gc --minify
```

Hugo writes the generated site to `public/` by default. Treat that directory as build output: edit the Markdown, layouts, configuration, or assets instead of editing generated HTML directly.

After a successful build, commit and push the source changes:

```bash
git add .
git commit -m "Publish my first post"
git push
```

## Deploy with Cloudflare Pages

Connect the GitHub repository from **Workers & Pages** in the Cloudflare dashboard, then configure the Hugo build:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |

Set `HUGO_VERSION` in the Cloudflare Pages environment to the version you have tested locally. If preview and production deployments both need that version, configure it in both environments. Cloudflare's current [Hugo deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/) covers the Git integration and build settings.

For a permanent custom domain, keep the final HTTPS address in Hugo's `baseURL`. After each push, confirm that the Cloudflare build succeeds and check the deployed page. Git accepting a commit does not prove that Hugo built or that the live site looks correct.

## Comments

This site uses [Utterances](https://utteranc.es/) for comments. It stores each discussion in a GitHub issue instead of requiring a separate comment database. The integration can be added to a Hugo partial or single-page template and configured for the repository that will hold the discussions.

## Original Walkthrough Video

The video below is preserved for historical context. It demonstrates the original 2022 Netlify and Zzo workflow; the written guide above is the updated setup.

{{< youtube "xMv10E561WQ" >}}
