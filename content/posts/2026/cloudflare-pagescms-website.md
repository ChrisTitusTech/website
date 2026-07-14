---
title: "Build a Cloudflare Pages Website with Pages CMS"

date: 2026-07-10
url: /cloudflare-pagescms-website/
image: images/2026-thumbs/cloudflare-pagescms-website.webp
categories:
  - Networking
tags:
  - Cloudflare
  - Pages CMS
  - Hugo
  - GitHub
draft: true
---
You do not need WordPress, a database, or a server to get a friendly web editor for a static site. This setup uses Hugo to build the site, GitHub to store it, Cloudflare Pages to host it, and Pages CMS to edit it from a browser.

The result is a fast website with Git history, automatic deployments, and a content editor that does not require everyone publishing an article to use the command line.
<!--more-->

## How the Setup Works

The workflow has four parts:

```text
Pages CMS -> GitHub repository -> Cloudflare Pages build -> Website
```

[Pages CMS](https://pagescms.org/docs/) is the editing layer. It reads a `.pages.yml` file from your repository, displays the fields you define, and saves edits back to GitHub. [Cloudflare Pages](https://developers.cloudflare.com/pages/) watches that repository, runs Hugo after every production commit, and publishes the generated `public` directory.

This guide uses the hosted Pages CMS app at [app.pagescms.org](https://app.pagescms.org/). Pages CMS itself is not being installed on Cloudflare. If you want to run your own CMS instance, the [Pages CMS self-hosting guide](https://pagescms.org/docs/guides/installing/self-host/) requires a PostgreSQL database, application secrets, a GitHub App, and a persistent server process.

## What You Need

Before starting, have the following ready:

- A GitHub account
- A Cloudflare account
- A Hugo site stored in a GitHub repository
- Hugo Extended installed locally if your site processes SCSS or uses other Extended features
- Permission to install a GitHub App on the account or organization that owns the repository

Run a local build before connecting any services:

```bash
hugo --gc --minify
```

Fix any build errors first. A broken local build will also fail on Cloudflare.

## Step 1: Put the Hugo Site on GitHub

If the site is not already on GitHub, create an empty repository and push the Hugo source files to it. The repository should contain files such as `hugo.toml` or `config.toml`, `content/`, and `layouts/` or a theme. Do not upload only the generated `public/` directory because Cloudflare needs the source project to build the site.

For a new local repository, the basic Git workflow is:

```bash
git init
git add .
git commit -m "Initial Hugo site"
git branch -M main
git remote add origin https://github.com/YOUR-USER/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the example URL with your repository URL. If the project is already on GitHub, make sure its production branch is current before continuing.

## Step 2: Add the Pages CMS Configuration

Pages CMS uses `.pages.yml` as its single source of truth. Create that file in the root of the repository, on the branch you plan to edit.

Here is a useful starting configuration for a Hugo blog:

```yaml
media:
  - name: images
    label: Images
    input: static/images
    output: /images
    extensions: [png, jpg, jpeg, webp, gif]
    categories: [image]
    rename: safe

settings:
  content:
    merge: true

content:
  - name: posts
    label: Blog Posts
    type: collection
    path: content/posts
    subfolders: true
    format: yaml-frontmatter
    filename:
      template: "{year}-{month}-{day}-{primary}.md"
      field: create
    view:
      fields: [title, date, draft]
      primary: title
      sort: [date, title]
      search: [title, tags]
      default:
        sort: date
        order: desc
    fields:
      - name: title
        label: Title
        type: string
        required: true
      - name: date
        label: Publish Date
        type: date
        required: true
        options:
          format: yyyy-MM-dd
      - name: url
        label: URL
        type: string
        description: Root-relative URL, for example /my-article/
      - name: image
        label: Featured Image
        type: image
        options:
          media: images
      - name: categories
        label: Categories
        type: select
        options:
          multiple: true
          values: [Android, Linux, MacOS, Networking, Windows]
      - name: tags
        label: Tags
        type: string
        list: true
      - name: draft
        label: Draft
        type: boolean
        default: true
      - name: body
        label: Article
        type: rich-text
        options:
          media: images
          format: markdown
          switcher: true
```

Adjust the paths and fields to match your site. The important parts are:

- `media.input` is the image folder inside the repository.
- `media.output` is the public URL written into the Markdown. With Hugo, a file at `static/images/photo.webp` is served as `/images/photo.webp`.
- `content.path` is the folder containing the Markdown source files.
- `format: yaml-frontmatter` tells Pages CMS how the Markdown files are structured.
- The special `body` field edits everything below the front matter.
- `subfolders: true` includes nested folders such as `content/posts/2026/`.
- `settings.content.merge: true` preserves front matter keys that are not represented by a CMS field.
- `draft: true` keeps a new article out of a normal Hugo production build until an editor turns Draft off.

The field names must match the front matter your Hugo layouts expect. If your theme uses `featured_image` instead of `image`, for example, change the CMS field name to `featured_image`. The official [Pages CMS configuration documentation](https://pagescms.org/docs/configuration/) covers additional fields, collections, media sources, and filename rules.

Commit the configuration and push it:

```bash
git add .pages.yml
git commit -m "Configure Pages CMS"
git push
```

## Step 3: Connect Pages CMS to GitHub

Follow the hosted app flow from the [Pages CMS quick start](https://pagescms.org/docs/quick-start/):

1. Open [app.pagescms.org](https://app.pagescms.org/).
2. Select the option to sign in with GitHub.
3. Install the Pages CMS GitHub App on the user or organization that owns the site.
4. Grant it access to the website repository. Selecting only the required repository limits its access.
5. Return to Pages CMS and open the repository.
6. Select the branch containing `.pages.yml`, normally `main`.

The Blog Posts collection should now appear. Open an existing post and confirm that the title, date, front matter, and article body load into the correct fields.

Create a small draft and save it. Pages CMS should create a commit in GitHub. Check the commit before moving on so you know the editor is writing the expected filename, front matter, and media paths.

Hugo shortcodes and custom Markdown may not have a visual equivalent in the rich-text editor. Use the editor's Source mode for content such as `{{</* youtube "VIDEO_ID" */>}}`, and preview the generated site before publishing.

## Step 4: Create the Cloudflare Pages Project

Cloudflare's [Hugo deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/) uses Git integration so each repository update triggers a new build.

1. Sign in to the Cloudflare dashboard.
2. Go to **Workers & Pages**.
3. Select **Create application**, choose the **Pages** tab, and select **Import an existing Git repository**.
4. Connect GitHub if prompted, then choose the repository containing the Hugo site.
5. Select **Begin setup**.
6. Set the production branch to `main`, or use the branch that contains your production site.
7. Enter the Hugo build settings below.

Use these values for a typical Hugo project:

| Setting | Value |
| --- | --- |
| Framework preset | Hugo, if offered |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |
| Root directory | Leave blank unless the Hugo project is in a subfolder |

Select **Save and Deploy**. Cloudflare will clone the repository, run Hugo, and publish the output at a `YOUR-PROJECT.pages.dev` address.

If the site depends on a particular Hugo release, go to the Pages project's **Settings > Environment variables** and add:

```text
HUGO_VERSION=YOUR_LOCAL_HUGO_VERSION
```

Use the version reported by `hugo version`, without adding a different version at random. Add it to both Production and Preview if both environments must build the same way. Cloudflare documents `HUGO_VERSION` in its [Pages build image settings](https://developers.cloudflare.com/pages/configuration/build-image/).

If the site needs the deployment URL as Hugo's base URL, Cloudflare also supports this build command:

```bash
hugo --gc --minify -b "$CF_PAGES_URL"
```

`CF_PAGES_URL` is injected by Cloudflare. A site with a permanent custom domain can instead keep that domain in Hugo's `baseURL` setting and use the regular build command.

## Step 5: Test the Full Publishing Loop

The complete workflow should now be automatic:

1. Open Pages CMS and edit the draft you created earlier.
2. Save the change.
3. Open GitHub and confirm that a new commit appeared on the production branch.
4. Open the Cloudflare Pages project and watch the new deployment.
5. Visit the `pages.dev` URL and verify the change.
6. Turn off Draft in Pages CMS, save again, and verify that the article appears after the next successful build.

Cloudflare treats the production branch and preview branches differently. A commit to the production branch updates the main `pages.dev` address and any connected custom domain. Other branches can receive separate preview deployments, depending on the project's [branch deployment controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/).

## Step 6: Connect a Custom Domain

The free `pages.dev` address is enough to test the site. To use your own domain:

1. Open the Pages project in Cloudflare.
2. Select **Custom domains**.
3. Select **Set up a domain**.
4. Enter the domain or subdomain and continue through validation.

An apex domain such as `example.com` must be a Cloudflare zone using Cloudflare nameservers. A subdomain can use an external DNS provider with a CNAME pointing to `YOUR-PROJECT.pages.dev`, but first add the hostname through the Pages project's Custom domains screen. Cloudflare warns that creating only the CNAME without associating the domain with the Pages project can produce a 522 error. See the official [custom domain instructions](https://developers.cloudflare.com/pages/configuration/custom-domains/) for the current DNS requirements.

After the domain is active, update Hugo's `baseURL` to the final HTTPS address if the site uses absolute URLs, then commit and verify one more deployment.

## Common Problems

### The repository does not appear in Pages CMS

Open the GitHub App installation settings and confirm that Pages CMS has access to the correct repository. Organization repositories may require an owner to approve the installation.

### Pages CMS cannot find the configuration

Confirm the file is named exactly `.pages.yml`, is stored at the repository root, contains valid YAML, and exists on the branch selected in Pages CMS.

### Images are broken after publishing

Check both sides of the media mapping. `input` must point to the real repository folder, while `output` must be the URL Hugo serves. For the standard Hugo `static/images` folder, the public path is `/images`.

### A saved post does not appear

Look for `draft: true` in its front matter. Hugo excludes drafts from a normal production build. Also confirm that Pages CMS saved to Cloudflare's configured production branch.

### Cloudflare reports a build failure

Open the failed deployment and read the build log. The most common causes are a Hugo version mismatch, a missing theme or Git submodule, invalid front matter, or an incorrect root directory. Reproduce the failure locally with the same Hugo version and build command.

### The CMS save worked, but no deployment started

In the Pages project, check **Settings > Builds & deployments**. Git integration and automatic production deployments must be enabled for the branch Pages CMS is updating.

## Final Result

Once this is working, content editors only need Pages CMS. Every save remains a normal Git commit, Cloudflare handles the build and hosting, and Hugo keeps the deployed site static and fast. You still retain the ability to edit locally, review history, revert a bad change, and use preview branches for larger updates.


## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
