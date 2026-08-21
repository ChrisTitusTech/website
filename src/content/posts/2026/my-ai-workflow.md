---
title: "My AI Coding Workflow That Actually Works"
date: 2026-07-25
url: /my-ai-workflow/
image: images/2026-thumbs/my-ai-workflow.webp
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - AI
  - LLMs
  - Software Development
  - GitHub
  - Code Review
draft: false
---

My AI development workflow is not perfect, and it will keep changing. What matters is the structure: define the project, build the guardrails, work in small phases, and stop at manual gates.

This is for larger, more complex software. You still need to understand Git, testing, and the basics of software development. One giant prompt that loops until an agent declares victory may produce a demo, but it is not how I build software I plan to maintain.

<!--more-->

The short version looks like this:

```text
Global instructions and reusable skills
  -> repository specification and roadmap
  -> test and validation scaffolding
  -> one small implementation phase
  -> local tests and review
  -> pull request and CI
  -> independent review
  -> fix, retest, and resolve feedback
  -> manual verification
  -> merge
```

AI makes each step faster. It does not get to skip any of them.

## Start With Plain-Text Guardrails

I keep my shared AI development setup in the [titus-ai repository](https://github.com/ChrisTitusTech/titus-ai). It contains examples for instructions, specifications, roadmaps, tasks, and reusable skills.

Do not get distracted by the terminology. These are plain-text files:

- `AGENTS.md` tells the coding agent how I want it to work.
- `SPEC.md` defines what the project must do.
- `ROADMAP.md` breaks the work into phases with exit criteria.
- `TASKS.md` can track the small jobs inside the current phase.
- Skills capture reusable knowledge for a tool or technology.

My global instructions include preferences that apply everywhere: keep changes focused, skip filler, preserve unrelated work, run the required checks, and stop before destructive actions. A repository can add its own `AGENTS.md` for the real architecture, commands, and boundaries of that project.

If I dislike a rule, I delete it. If an agent repeatedly makes the same mistake, I add a more precise rule. The files serve me, not the other way around.

Skills work the same way. My Quickshell skill includes its unusual QML linting requirements, so the agent does not run a generic Qt linter, misunderstand missing types, and damage working code. A Bash skill can capture shell-specific validation. That reusable knowledge then follows me into the next project.

## Define What Success Means

The specification is repository-specific. Before implementation, I write down:

- the problem and intended users
- required behavior and user experience
- architecture and major components
- security and privacy requirements
- supported tool and dependency versions
- non-goals
- acceptance criteria

Version details matter because an LLM may choose an old dependency simply because it appeared frequently in its training data. I pin the supported versions in the specification and verify current versions instead of accepting whatever the model remembers.

The acceptance criteria are the most important part. "Make it work" is not useful. The agent needs observable conditions that tell it when the phase succeeds, including the tests or manual checks that prove it.

The roadmap then turns those requirements into small phases. Every phase says what it delivers, what it depends on, and what must be true before I continue. This prevents a feature request from becoming an uncontrolled rewrite.

## Build the Test Harness Before the Feature

Before serious implementation, I establish how the project will be tested. That may include unit tests, linting, a production build, smoke tests, screenshots, or a real target-environment check.

This is the scaffolding around the code. If the agent cannot tell whether a change worked, asking it to write more code only creates more uncertainty.

The exact gates belong in the repository instructions. A typical local pass includes:

```bash
git diff --check
# Run the project formatter and linter.
# Run focused tests, then the broader test suite.
# Build the production artifact.
```

Project-specific details matter. Quickshell needs the correct QML types available during linting. A cross-distribution Linux project may need smoke tests on Arch, Debian, and Red Hat-based environments. A web change may need both a clean production build and a mobile layout check.

## Implement One Reviewable Change

Once the guardrails exist, I give the agent one focused task.

In the video, I asked Codex to add the audio percentage beside the volume icon in my DWM desktop. It found the Quickshell skill, inspected the existing code, made the QML change, updated the regression check, deployed it to my live install, restarted Quickshell, and verified the result on screen.

That looked like magic, but the code generation was the easy part. The important next question was: **How did it implement it?**

The change went into a pull request instead of directly disappearing into `main`. That gave me a manual gate where I could inspect the diff, see the screenshot, confirm the live behavior, and wait for other reviewers.

Small pull requests are critical. They are faster to understand, cheaper to review, and easier to fix or revert. If a review takes twenty minutes because the diff is enormous, the work probably needed to be split earlier.

## Spend More Effort on Review Than Generation

This is where most of my AI usage goes.

For larger changes, I run a local CodeRabbit review before opening the pull request. On GitHub, I use CodeRabbit and a separate Codex, Claude, or human reviewer. The independent reviewer needs fresh context; the coding session should not simply grade its own work.

The DWM review found two real issues:

1. Hide the percentage when audio is unavailable.
2. Document the user-visible panel change in the changelog.

Those are exactly the boring edge cases I might discover only after a user opens an issue. The agent fixed the unavailable-audio state, updated the test, added the changelog entry, committed the changes, and pushed them back to the pull request.

I still make the decision. Review bots can be wrong, overly verbose, or outside the task's scope. For every comment, I either fix the root cause or explain why the current behavior is intentional. I do not blindly accept every suggestion, and I do not dismiss one because it came from AI.

The loop is:

```text
review feedback
  -> understand the issue
  -> fix or explain
  -> update the test
  -> rerun local validation
  -> push
  -> wait for fresh CI and review
  -> resolve the thread
```

Repeat until there are no actionable findings left.

## Put Security and Dependency Checks in CI

LLMs are useful, but they are not reliable dependency managers or security auditors. I enable GitHub's security tools early:

- Dependabot for supported dependency and GitHub Actions updates
- CodeQL for code scanning
- dependency review for risky dependency changes
- required CI checks for tests and production builds

CI must run on every pull request update. A green check from an older commit does not prove that the latest review fix is safe.

The checks should match the project. My DWM pull request ran smoke tests across multiple Linux distributions. Another project may need a locked dependency install, unit tests, type checking, a production build, and a security scan. The point is not to collect badges; it is to test the artifact in a clean environment.

## Keep the Human Merge Gate

Before merging, I verify:

- the diff contains only the intended change
- tests and builds pass on the latest commit
- independent review is complete
- actionable review threads are resolved
- documentation matches the behavior
- the feature works in the real target environment
- visible changes have been checked on screen

Automated screenshots and browser or desktop tools are useful, but I still look at the result. Tests prove only what they were written to test.

In the example, I could see the volume percentage working in my live panel. I inspected the follow-up fix for unavailable audio, checked the test and changelog, waited for CI, and only then merged and deleted the branch.

That pause is the difference between using AI as an assistant and letting it run the project.

## The Cost Is Real

This workflow uses far more compute on review and validation than on writing the final lines of code. A small UI change may produce only a dozen changed lines while several agents, local checks, and CI jobs examine it.

Heavy development can consume paid AI plans quickly. Local models will handle more of this work over time, but the workflow should not depend on one model, subscription, or plugin. The same process works with cloud models, local models, or a team of humans.

The tool is replaceable. The gates are not.

## Slow Is Smooth, and Smooth Is Fast

AI lets us generate code so quickly that it is easy to generate a mountain of bad software. Slow down at the places that matter:

- write the acceptance criteria
- build the tests
- keep phases and pull requests small
- wait for CI and independent review
- resolve feedback
- manually test the real result

This workflow is not exciting because an agent added a percentage to an icon. It is exciting because the change was specified, tested, reviewed, documented, verified live, and merged in minutes instead of hours.

Do not wait for a mythical future model to fix a bad development process. Use the tools available today, keep the parts that work, remove the parts that do not, and make the process better every time.

{{< youtube "wcRR5P0S2Us" >}}
