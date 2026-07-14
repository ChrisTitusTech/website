---
title: "What Can AI Do in 2026?"

date: 2026-07-09
url: /what-can-AI-do-in-2026/
image: images/2026-thumbs/what-can-AI-do-in-2026.webp
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - AI
  - LLMs
draft: true
---
Instead of guessing what AI might become, here is what I have actually finished with it as of July 2026.

The short version: AI is already useful, but it is not magic. It is excellent at search, documentation, summarizing, scaffolding, testing workflows, and shortening long debugging sessions. It is much weaker when someone asks it to build complex software without understanding the system underneath.
<!--more-->

## The Everyday Use Case: Better Search

For most people, AI is becoming the replacement for a traditional search engine. You can ask a direct question and get a direct answer without digging through five ad-covered pages just to find one useful paragraph.

Right now that usually means ChatGPT, Claude, or another cloud service. Long term, I think local LLMs take over more of this job for people who care about privacy and control. A model running on your machine that can search your own files, summarize documentation, and answer practical questions is a much better direction than feeding every question into another company's website.

This is the least flashy use case, but it is also the one most people will use every day.

## What AI Still Cannot Replace

Can a normal person use AI to write substantial programs, games, apps, or complex systems from scratch?

Not reliably.

The code is not always the core problem. The problem is not knowing what system you are building on. You still need to understand the foundation: which framework makes sense, where state lives, how data moves, how authentication works, what needs to be tested, how deployment happens, and what will break when the app has to be maintained.

Without that knowledge, AI can create something that looks impressive in a demo but falls apart under stress. It can burn millions of tokens, generate thousands of lines of code, and still leave you with a fragile project that nobody wants to maintain.

That is why AI works best when the human already knows enough to steer it. It can accelerate a good workflow, but it does not replace judgment.

## What I Have Actually Completed With AI

These are projects and workflows I have used AI on successfully. The important part is that each one had a defined target, an existing foundation, or enough human oversight to keep the work grounded.

- **Astro website for my kids' game:** Built and iterated on the site for [My Hero Ultra](https://myheroultra.com).
- **dwm-titus rework:** Moved my desktop customization workflow from Arch to Fedora and reworked the old dwm setup toward Quickshell in [`dwm-titus`](https://github.com/christitustech/dwm-titus).
- **Testing and code review:** Used Git workflows, local linting, and targeted tests to catch both human and AI mistakes before they ship.
- **Documentation and system summaries:** Used AI to summarize codebases, explain systems, and reduce the time it takes to understand unfamiliar parts of a project.
- **Automated COPR Fedora Repo:** https://github.com/ChrisTitusTech/copr-fedora
- **Admin Dashboard for Website Message:** https://github.com/ChrisTitusTech/website-messages
- **Project scaffolding:** Generated initial layouts, boilerplate, and setup steps so I could start from a working structure instead of a blank directory.
- **Long debugging sessions:** Used LLMs to narrow the search space, inspect error paths, and get to the failing component faster.

## Bigger Multi-Month Projects

AI has also been useful on larger projects, but only when the work is broken down into real engineering tasks.

- **[TitusBooks](https://github.com/christitustech/titusbooks):** A Quickshell-based book management system designed for self-hosted multi-user use.
- **3Plates:** An Expo-based project for Android, iOS, and web with a hosted database, OAuth, and a self-hosted deployment path.

These are not "type one prompt and get an app" projects. They require architecture, decisions, testing, debugging, and a lot of review. AI can help with all of that, but it is part of the workflow, not the whole workflow.

## Where AI Fits in 2026

The best way to use AI in 2026 is to treat it like an extremely fast assistant that needs direction.

Use it for:

- search and research summaries
- documentation
- code review
- tests and lint cleanup
- scaffolding
- debugging
- explaining unfamiliar code

Be careful with:

- architecture decisions you do not understand
- security-sensitive code
- authentication and payments
- database design
- anything you cannot test or maintain

If you know the system, AI makes you faster. If you do not know the system, AI can make you confidently wrong at a much larger scale.

## Walkthrough Video

The video below goes through the examples and shows more of how I am using AI in real projects.

{{< youtube "WVQ_2hN_zzs" >}}
