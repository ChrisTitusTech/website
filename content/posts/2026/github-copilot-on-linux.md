---
title: "GitHub Copilot on Linux"

date: 2026-08-10
url: /github-copilot-on-linux/
image: images/2026-thumbs/github-copilot-on-linux.webp
categories:
  - Linux
  - Windows
  - Networking
tags:
  - Ubuntu
  - GitHub Copilot
  - OpenAI Codex
  - Systemd
draft: true
---

The GitHub Copilot app is a desktop control center for agent-driven development. Instead of only suggesting the next line in an editor, it can take an issue or prompt, inspect a repository, change files, run commands, and help carry the work through review and a pull request.

The app is available on Linux, macOS, and Windows. It is built on GitHub Copilot CLI, but adds a visual workflow for managing multiple coding sessions, reviewing changes, and keeping GitHub issues and pull requests close to the code.

<!--more-->

![GitHub Copilot app My work view with issues and pull requests from connected repositories](/images/2026/github/intro-myword.webp)

## The Top 3 Copilot Features Developers Should Use

### 1. GitHub-Native Issue and Pull Request Workflows

Copilot can start from an issue, pull request, local folder, or plain prompt. The app keeps repository state, review comments, checks, and pull request context in the same workflow. You can inspect the diff, run validation, and open a pull request without constantly jumping between an editor, terminal, and browser.

This is especially useful for maintenance work: pick an issue, have the agent reproduce it, make a focused change, run the project checks, and then review the proposed pull request.

### 2. Built-In Review and Validation

The app provides canvases for plans and other shared work, plus integrated terminal and browser surfaces for validation. Developers should use these to inspect what the agent actually changed instead of treating the chat response as proof that the task is complete.

For code changes, review the diff and run the repository's real build, lint, and test commands. The `/security-review` command can also look for high-confidence security problems before you open a pull request, but it complements normal review and security tooling rather than replacing them.

### 3. Custom Models, Tools, Skills, and Automations

The model picker lets you choose a model and reasoning effort for each session. The app can also connect external tools through MCP servers, package repeatable instructions as skills, and schedule recurring agent work as automations.

Use a fast model for small edits and reserve deeper reasoning for architecture, debugging, or large multi-file changes. Higher reasoning and larger context windows can consume more of your provider allowance, so more is not automatically better.

## Sample Use: Prioritize Issues Across Many Repositories

One useful workflow is asking Copilot to review the open issues across all your connected repositories and return the 20 items that deserve attention first. Instead of sorting only by age or comment count, ask it to consider user impact, regressions, dependencies, security, recent activity, and maintainer effort.

For example, prompt it to inspect the issue lists for your configured repositories, explain any repositories it could not access, and produce a ranked top 20 with a short reason for every choice. This turns a large backlog into a practical starting queue while keeping the final prioritization visible for you to review.

![GitHub Copilot ranking the top 20 outstanding issues across many repositories](/images/2026/github/top20.webp)

## The Codex Subscription Fix: CLIProxyAPI

GitHub's bring-your-own-model support normally expects an API endpoint and API key. A ChatGPT subscription does not give you a normal OpenAI Platform API key with unlimited API billing. However, eligible ChatGPT plans include Codex access through an OpenAI login.

[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) bridges those two systems. It signs in to OpenAI Codex with OAuth, then exposes a local OpenAI-compatible endpoint that the GitHub Copilot app can use as an OpenAI provider.

The request path looks like this:

```text
GitHub Copilot app -> http://127.0.0.1:8317/v1 -> CLIProxyAPI -> OpenAI Codex
```

CLIProxyAPI is a third-party open-source project, not an official GitHub or OpenAI integration. Review what you install, keep it updated, and understand that your normal Codex subscription limits and terms still apply.

## Prerequisites

You need:

- The [GitHub Copilot app](https://github.com/copilot) installed and signed in with a GitHub account.
- A ChatGPT account with Codex access.
- `curl`, a browser, and a Linux desktop using systemd.

GitHub says the Copilot app can use a configured model provider without a paid Copilot plan. Bring your own model support is still labeled as public preview, so the settings screens may change.

## Install CLIProxyAPI on Linux

CLIProxyAPI's documentation recommends a community-maintained Linux installer. Download it first so you can inspect it before running it:

```bash
installer="$(mktemp)"
curl -fsSL \
  https://raw.githubusercontent.com/router-for-me/cliproxyapi-installer/refs/heads/master/cliproxyapi-installer \
  -o "$installer" || { rm -f "$installer"; exit 1; }

less "$installer"
bash "$installer"
rm -f "$installer"
```

The installer normally places the binary and configuration under:

```text
~/cliproxyapi/
```

It also creates a `cliproxyapi.service` user unit and generates a local API key. This key authenticates the Copilot app to your local proxy. It is not your ChatGPT password and it is not an OpenAI Platform API key.

Open `~/cliproxyapi/config.yaml` and verify these important settings. Edit the existing values rather than replacing the whole file because the example configuration contains other options:

```yaml
host: "127.0.0.1"
port: 8317
auth-dir: "~/.cli-proxy-api"

api-keys:
  - "sk-replace-this-with-a-long-random-local-key"
```

Binding to `127.0.0.1` keeps the service off your LAN. If the installer already generated a strong key, keep it and use that value in the Copilot app. If you need a new one, generate it with:

```bash
printf 'sk-%s\n' "$(openssl rand -hex 32)"
```

Paste the result under `api-keys`, then protect the configuration:

```bash
chmod 700 "$HOME/cliproxyapi"
chmod 600 "$HOME/cliproxyapi/config.yaml"
```

## Sign In to OpenAI Codex

Run the one-time OAuth login as your normal desktop user:

```bash
cd "$HOME/cliproxyapi"
./cli-proxy-api --codex-login
```

Your browser should open the OpenAI sign-in page. Sign in with the ChatGPT account that has Codex access and approve the request. CLIProxyAPI stores the OAuth credentials in the configured authentication directory.

On a headless machine, print the login URL instead:

```bash
./cli-proxy-api --codex-login --no-browser
```

The OAuth callback uses local port `1455`, so do not expose that port to the internet.

## Start CLIProxyAPI Automatically With systemd

The Linux installer includes a user service. Enable it now and on future logins:

```bash
systemctl --user daemon-reload
systemctl --user enable --now cliproxyapi.service
systemctl --user status cliproxyapi.service
```

If you installed the binary manually and do not already have a unit, create `~/.config/systemd/user/cliproxyapi.service` with this small service definition:

```ini
[Unit]
Description=CLIProxyAPI local OpenAI-compatible proxy
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
WorkingDirectory=%h/cliproxyapi
ExecStart=%h/cliproxyapi/cli-proxy-api --config %h/cliproxyapi/config.yaml
Restart=on-failure
RestartSec=5

[Install]
WantedBy=default.target
```

Then enable it with the same `systemctl --user` commands above. A user service normally starts when you log in. If this proxy must start during boot and remain running after logout, enable lingering for your user:

```bash
sudo loginctl enable-linger "$USER"
```

Most desktop users do not need lingering because the Copilot app also starts after login.

## Test the Local OpenAI Endpoint

Before touching Copilot settings, verify the service and model list. In Bash, enter the local key from `config.yaml` when prompted:

```bash
read -rsp 'CLIProxyAPI key: ' CLIPROXY_API_KEY
printf '\n'
curl -fsS \
  -H "Authorization: Bearer ${CLIPROXY_API_KEY}" \
  http://127.0.0.1:8317/v1/models
unset CLIPROXY_API_KEY
```

A JSON model list confirms that the service is running, the local API key matches, and the Codex login was loaded. Keep the exact model IDs handy in case the Copilot app asks you to enter one manually.

## Add CLIProxyAPI to the GitHub Copilot App

Open the Copilot app and configure the local proxy:

1. Open **Settings**.
2. Select **Model providers**.
3. Click **Add provider**.
4. Select **OpenAI**. GitHub describes this option as its OpenAI-compatible completions provider.
5. Use a name such as `OpenAI Codex via CLIProxyAPI`.
6. Set the base URL to `http://127.0.0.1:8317/v1`.
7. Paste the local key from the `api-keys` section of `config.yaml`.
8. Save the provider.

The provider's available models should now appear in the model picker. Start a session, choose one of the Codex models exposed by CLIProxyAPI, select the reasoning effort you want, and send a small test prompt against a disposable repository.

GitHub stores provider credentials in the operating system credential store and does not display them again in the UI. The same key still exists in `config.yaml`, which is why the file permissions and localhost-only binding matter.

## Troubleshooting

### Copilot Cannot Reach the Provider

Check the service and recent logs:

```bash
systemctl --user status cliproxyapi.service
journalctl --user -u cliproxyapi.service -n 100 --no-pager
```

Confirm that the base URL includes `/v1` and uses port `8317`.

### The Proxy Returns 401 Invalid API Key

The key entered in Copilot must exactly match one of the values under `api-keys` in `config.yaml`. Do not paste your ChatGPT password, OpenAI session token, or a key from a different service.

After changing the configuration, restart the proxy:

```bash
systemctl --user restart cliproxyapi.service
```

### No Codex Models Appear

Run the OAuth login again, restart the service, and test `/v1/models` with `curl`. If the command-line test fails, fix CLIProxyAPI before changing more settings in Copilot.

### A Model Connects but Cannot Use Tools

Copilot agent sessions need a model endpoint with streaming and tool-calling support. Choose a Codex model reported by CLIProxyAPI rather than forcing an unrelated model name into the app.

## Final Thoughts

The GitHub Copilot app is most useful as a workflow manager, not just another chat box. Its isolated worktrees, GitHub integration, validation surfaces, and model-provider support make it a strong Linux desktop for running agentic coding tasks.

CLIProxyAPI fills one specific gap: it lets the app's OpenAI-compatible provider talk to the Codex access already attached to your ChatGPT account. Keep the service local, protect the client key, review the third-party proxy before installing updates, and test the entire path before trusting it with important work.

## Sources

- GitHub Copilot app overview: <https://docs.github.com/en/copilot/concepts/agents/github-copilot-app>
- Working with Copilot app agent sessions: <https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions>
- GitHub Copilot app BYOK setup: <https://docs.github.com/en/copilot/how-tos/github-copilot-app/use-byok-models>
- GitHub Copilot app BYOK announcement: <https://github.blog/changelog/2026-06-23-github-copilot-app-support-for-byok/>
- OpenAI Codex with a ChatGPT plan: <https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan>
- CLIProxyAPI project: <https://github.com/router-for-me/CLIProxyAPI>
- CLIProxyAPI Linux quick start: <https://help.router-for.me/introduction/quick-start>
- CLIProxyAPI basic configuration: <https://help.router-for.me/configuration/basic>
- CLIProxyAPI Codex OAuth login: <https://help.router-for.me/configuration/provider/codex>

## Walkthrough Video

{{< youtube "WVQ_2hN_zzs" >}}
