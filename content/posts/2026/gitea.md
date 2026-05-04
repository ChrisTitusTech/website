---
title: "Gitea"

date: 2026-05-04
url: /gitea/
image: images/2026-thumbs/gitea.webp
categories:
  - Linux
  - Windows
tags:
  - git
  - gitea
  - github
draft: true
---
If you are moving off GitHub and into your own self-hosted forge, Gitea is one of the easiest places to land. It is lightweight, fast, and simple to run on just about anything.
<!--more-->

Most migrations are straightforward, but people still get tripped up by one thing: `git`, `gh`, and `tea` each solve different problems.

- `git` is your local VCS workflow.
- `gh` is GitHub automation.
- `tea` is Gitea automation.

This guide gives you the shortest reliable path to move from GitHub to Gitea, plus a safe fallback when APIs fail.

## Quick Start (5-10 Minutes)

1. Authenticate `tea` to your Gitea instance.
2. Run a server-side migration from GitHub.
3. Verify branches/tags.
4. Repoint your local `origin` to Gitea.

If migration metadata fails, use the mirror fallback method.

## Prerequisites

- Running Gitea instance
- `tea` CLI installed
- Gitea token (for `tea login add`)
- GitHub personal access token for private repos

Official migration docs: <https://docs.gitea.com/usage/migration>

## Git Authentication

When you mirror push to Gitea, git will need credentials. Choose one method to avoid repeated login prompts:

### Option A: SSH (Recommended)

SSH avoids storing passwords and does not prompt on every push.

Generate an SSH key if you do not have one:

```bash
ssh-keygen -t ed25519 -C "titus@local"
```

Add the public key to Gitea:

1. Open Gitea -> Settings -> SSH / GPG Keys
2. Paste your public key (from `~/.ssh/id_ed25519.pub`)

Configure SSH in `~/.ssh/config` so you do not repeat the hostname:

```
Host gitea
  HostName gitea.example.com
  Port 222
  User git
  IdentityFile ~/.ssh/id_ed25519
```
_Note: This assumes you changed ssh port to 222 in Gitea. Adjust as needed._

Use the alias in git remotes:

```bash
git remote add gitea git@gitea:your-user-or-org/repo-name.git
```

Test connectivity:

```bash
ssh -T gitea
```

### Option B: HTTPS with Credential Storage

If you prefer HTTPS, store credentials so git does not prompt on every push:

```bash
git config --global credential.helper store
git push
# Enter username: titus
# Enter password: your-gitea-personal-access-token
```

After that, pushes reuse saved credentials from `~/.git-credentials`.

**Warning:** Credentials are stored in plain text. Use SSH for better security.

## Step 1: Configure tea Once

```bash
tea login add
tea whoami
```

Set your default Tea profile so commands do not keep prompting for login selection:

```bash
tea logins list
tea logins default titus
tea logins list
```

Replace `titus` with your profile name from the `NAME` column.

If you use multiple Gitea servers, pick one explicitly:

```bash
tea repos list --login mygitea
```

## Step 2: Recommended Migration (Gitea API)

For a public GitHub repository:

```bash
tea repos migrate \
  --name repo-name \
  --clone-url https://github.com/original-owner/repo-name
```

For a private GitHub repository:

```bash
tea repos migrate \
  --name repo-name \
  --clone-url https://github.com/original-owner/repo-name \
  --auth-token YOUR_GITHUB_PAT
```

If you want Gitea to attempt metadata import (issues, PRs, releases, wiki):

```bash
tea repos migrate \
  --name repo-name \
  --clone-url https://github.com/original-owner/repo-name \
  --auth-token YOUR_GITHUB_PAT \
  --issues --pull-requests --releases --wiki --labels --milestones
```

If you are migrating into an organization, add `--owner your-org-name`.

## Step 3: Fallback Migration (Always Works for Git Data)

If API migration fails or stalls, mirror push the repo manually.

First create the destination repository on Gitea:

```bash
tea repos create --name repo-name
```

If creating under an organization, use `--owner your-org-name`.

Then mirror the GitHub repository into it:

```bash
git clone --mirror https://github.com/original-owner/repo-name.git
cd repo-name.git
git remote add gitea git@gitea:your-user-or-org/repo-name.git
git push gitea --mirror
```

This guarantees commit history, branches, and tags. It does not guarantee issues/PR metadata.

**Note:** This example uses SSH with the `gitea` alias from `~/.ssh/config`. If you prefer HTTPS, use `http://gitea.example.com/your-user-or-org/repo-name.git` and set up credential storage as described in the Git Authentication section above.

## Step 4: Verify the Move

```bash
tea repos list
```

Then open the repo in a browser and validate:

- default branch exists
- tags are present
- release objects are present (if migrated)
- issues/PRs count looks sane (if migrated)

## Step 5: Repoint Existing Local Clones

In each local repo you still use, update the origin remote to point to Gitea.

For SSH (using the `gitea` alias from `~/.ssh/config`):

```bash
git remote set-url origin git@gitea:your-user-or-org/repo-name.git
git remote -v
```

For HTTPS:

```bash
git remote set-url origin http://gitea.example.com/your-user-or-org/repo-name.git
git remote -v
```

## GitHub to Gitea Mental Model

Use this rule and daily workflow gets much cleaner:

- Use `git` for code history and local branch work.
- Use `tea` for server-side operations on Gitea.

### Command Mapping

| Intent | GitHub-centric | Gitea-centric |
| --- | --- | --- |
| List repos | `gh repo list` | `tea repos list` |
| Open repo page | `gh repo view --web` | `tea open` |
| List PRs | `gh pr list` | `tea pulls list` |
| Inspect PR | `gh pr view 12` | `tea pulls 12` |
| Checkout PR | `gh pr checkout 12` | `tea pulls checkout 12` |
| List issues | `gh issue list` | `tea issues list` |
| Comment | `gh issue comment 42` | `tea comment 42 "message"` |

## Daily Workflow After Migration

```bash
git pull origin main
git switch -c feature/my-change
# edit code
git add .
git commit -m "Implement change"
git push -u origin feature/my-change

tea pulls list
tea open
```

## Troubleshooting

- 401 or auth errors during migrate: regenerate GitHub PAT, then retry with `--auth-token`.
- Repo migrated but no issues/PRs: source credentials are missing scope or source provider limitation applies.
- Multiple Gitea accounts configured: pass `--login profile-name`.
- Migration imported wrong destination owner: set `--owner` explicitly.

## Practical Notes

- Prefer API migration first. It can bring metadata in one pass.
- Keep mirror fallback in your pocket for reliability.
- `--mirror` is for full ref parity (all branches/tags), not just the default branch.
- Use `git` and `tea` together, not as replacements for each other.

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
