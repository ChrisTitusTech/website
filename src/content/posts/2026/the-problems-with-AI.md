---
title: "The Problems With AI"
date: 2026-07-15
url: /the-problems-with-AI/
image: images/2026-thumbs/the-problems-with-AI.webp
categories:
  - Linux
  - Windows
  - MacOS
tags:
  - AI
  - LLMs
  - Software Development
draft: false
---

AI lets me build workflows and environments I have wanted for years. I can finish in hours what used to take days, explore an idea without sinking a month into it, and review more code than I ever could alone.

That does not mean AI has solved software development. It has moved the bottleneck. Code is becoming cheap, but good ideas, clear requirements, architecture, communication, and judgment are not.

<!--more-->

This entire article came out of a Discord conversation after my last AI video. The discussion was better than the usual extremes of "AI will replace everyone" or "AI is useless slop." People who are actually building things with these tools are seeing both sides at the same time: this is a superpower, and it can make a mess faster than anything we have used before.

I am going to keep building with it. If some people are tired of AI content, I get it. The internet is flooded with empty demos and claims that every new model changes everything. But this technology is too useful for me to ignore, and the problems are too important to pretend they do not exist.

## The Limiting Factor Is Now Us

For a long time, the cost of an idea was implementation. You could imagine a tool, but turning it into something real required weeks or months of coding. Today, AI can build a prototype in an afternoon.

That sounds amazing until you discover the uncomfortable part: some ideas just are not very good.

I love being able to expand an idea quickly. Sometimes it is magic and the project turns into exactly what I imagined. Other times I get deep enough into the weeds to understand why the idea does not work, then throw it in the trash. That is still a win. I learned the lesson in a day instead of spending three months on it.

Ideas have always been easy. Execution is what matters. AI accelerates execution, but it also exposes weak ideas much faster. It cannot make users care, create a real need, or give you taste.

## Coding Was Never the Hardest Problem

The hardest problems in software are usually not typing code or finding a missing semicolon. They are:

- understanding what someone actually wants
- turning a vague request into concrete requirements
- choosing a foundation that will survive future changes
- communicating tradeoffs to other people
- deciding what should not be built
- maintaining the project after the demo works

Those problems existed before AI, they exist now, and they will exist after the next flagship model arrives.

This is also why building tools for yourself is so much easier. I am not trying to become a tech bro, ship another subscription, and obsess over monthly recurring revenue. When I build for myself, I know the workflow, the pain points, and what "done" looks like. AI can move incredibly fast because I can give it a clear target and immediately tell when it misses.

If the requirements are garbage, faster code just gives you a polished pile of garbage sooner.

## The Junior Developer Problem

Experienced programmers can get more out of AI because they already have a mental model of how software works. We learned by reading manuals, digging through Stack Overflow, breaking things, reading other people's code, and spending hours debugging mistakes.

That process was slow and often miserable, but it built intuition.

Now a beginner can ask a model to explain a codebase, make a change, and fix the error without ever reading the code. The result might work, but the person may have no idea why it works. That creates an amplified version of the old "expert beginner" problem: someone can produce impressive-looking software without developing the experience needed to recognize bad architecture, security problems, or fragile code.

It is like higher mathematics. A calculator can produce the answer, but the person who understands the math knows when to use it, what the result means, and when the answer is obviously wrong.

This does not mean beginners are doomed. AI can also compress the old learning cycle. A good code review agent can point to a problem, suggest a solution, and let you study both in minutes instead of spending hours searching. The key is asking **why** and then reading the code yourself.

If you only copy the fix, you learn a ritual. If you understand the failure, you gain a tool you can use again.

## Code Review Is AI's Best Feature

Everyone talks about having AI write an entire application. I think one of its best uses is reviewing code that already exists.

An AI reviewer does not get tired. It can inspect every change, compare patterns across the repository, look for missing tests, and catch the boring mistakes that humans skip after staring at a pull request for too long. I use it to challenge my changes, not blindly approve them.

There are two major catches.

First, the reviewer can confidently flag something that is not a problem. I see false positives all the time. Sometimes the correct response is simply: nope, resolve the comment, squash, and merge.

Second, even a correct review can fail to teach. "Change this line" is not enough. The useful review explains the failure mode, the tradeoff, and why the suggested approach fits this project. Otherwise, we are just creating cargo-cult programmers who obey whatever pattern the model produced.

Multiple review agents can reduce some of this. One agent writes or changes the code, another reviews it, and a third can challenge the review. That does not guarantee correctness, but disagreement is useful because it forces the issue into the open where a human can make the final call.

## Foundations Matter More Than Ever

You cannot YOLO an AI-generated codebase and expect it to stay healthy. The faster the tools move, the more important the foundation becomes.

At a minimum, anyone doing serious AI-assisted development needs to understand:

- Git branches, commits, diffs, merges, and rollbacks
- the architecture and data flow of the project
- how to run tests and verify behavior
- where secrets, authentication, and permissions live
- how the application is built and deployed
- what the AI changed before accepting it

Git is mandatory. When an agent makes twenty changes in a few minutes, you need clean checkpoints and an easy way back. A good repository structure, written requirements, tests, and small commits give the model guardrails. They also give you evidence when the model claims everything is fixed.

The code can be generated. Accountability cannot.

## The Price Will Not Stay This Low

The value in today's professional AI plans is ridiculous. Heavy users can burn through an enormous amount of compute for a flat monthly fee. That is great for us, but the financial picture does not make sense forever.

My concern is a Walmart-style cycle: make the new workflow so cheap and convenient that everyone adopts it, wait for the old skills and services to disappear, then raise the price. Whether it happens exactly that way or not, it is dangerous to build a workflow that completely depends on one company keeping today's limits and prices.

Cloud AI is also concentrated in companies with the money and hardware to run frontier models. If the best tools become heavily metered or gatekept, developers will have to pay, accept weaker access, or move part of the workflow back to hardware they control.

Enjoy the bargain, but do not confuse a subsidized price with a permanent one.

## Local Models Will Be Good Enough for Most People

Local LLMs are not equal to the best cloud models for every task. Large open-weight models may look competitive in benchmarks, but most people do not have hundreds of gigabytes of VRAM and a rack full of GPUs.

That does not mean local AI has to beat the flagship model to matter.

Small models can already search documents, summarize a modest codebase, classify information, answer common questions, and handle focused tasks. As that baseline improves, most people will not need expensive multi-agent loops or the smartest model on the planet. They will need something private, available, and good enough for 90 percent of their work.

That is where old workstations, homelab servers, and small clusters get interesting. The future may not be one giant local model doing everything. It may be several focused models and disposable virtual machines handling narrow jobs on hardware you own.

The important question is not, "Can my local model beat the flagship?" It is, "Does this task need the flagship at all?"

## AI Is Changing Jobs, but the Story Is Messy

Companies are laying people off, and it is popular to blame every layoff on AI. That is too simple. Many businesses were cutting costs long before these tools became useful.

The more immediate effect may be hiring that never happens. A small team using AI can absorb work that might previously have required two or three additional people. It can also handle adjacent jobs like documentation, basic design, research, and marketing that a technical person would have outsourced or ignored.

That is a real economic impact even when nobody gets a termination letter that says "replaced by AI."

At the same time, only a small percentage of people are using these tools effectively. I still see people spend hours stuck on problems that a well-formed prompt, the right context, and a few minutes of verification could solve. The gap between people who understand the fundamentals and use AI well, and people who do neither, is going to get much wider.

## My Rules for Building With AI

I am not waiting for the industry to settle before using these tools. I am building now, while access is cheap and the capabilities are improving. But I follow a few rules:

1. **Start with the problem.** Define the user, workflow, constraints, and definition of done before generating code.
2. **Choose the architecture yourself.** AI can present options, but you need to understand and own the final structure.
3. **Keep changes small.** Work on a branch, inspect the diff, test it, and commit a clean checkpoint.
4. **Use AI to review AI.** A separate reviewer catches mistakes and assumptions the first agent carried through the task.
5. **Demand the why.** A fix without an explanation does not improve your judgment.
6. **Read the code.** If you cannot explain the important paths, you do not control the project.
7. **Keep an exit plan.** Preserve your repositories, documentation, and the ability to work without one specific provider.

AI is a multiplier. It multiplies good architecture, clear requirements, and experienced judgment. It also multiplies confusion, bad assumptions, and technical debt.

That is the real problem with AI: not that it is useless or that it will instantly replace everyone, but that it lets us move faster than our understanding. The people who keep learning the foundations will have a superpower. The people who surrender their judgment to the tool will build bigger failures in record time.

## Walkthrough Video

In the video, I break down the Discord conversation that inspired this article, show how I use AI for code review, and explain where I think cloud and local models are headed.

<!-- Add the YouTube embed after the video is published. -->
