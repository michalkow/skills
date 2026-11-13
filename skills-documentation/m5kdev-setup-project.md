## What it does

`m5kdev-setup-project` interviews you about why the project in this repo is being built and writes the answer to `PROJECT.md`. That file becomes the project's **north star**, and every [agent](https://michalkow.github.io/skills/dictionary/agent) checks its work against it.

It asks about purpose, not architecture. It reads the code first, so it can ask grounded questions such as "the code has per-seat plans, so is this sold to teams?" Questions about stack and structure never come up. `PROJECT.md` covers the problem, the users, the outcome, the assumptions, the non-goals, and which trade-offs win.

## When to reach for it

You invoke this by typing `/m5kdev-setup-project`. The agent won't reach for it on its own.

| Your situation | Reach for |
| --- | --- |
| A new m5kdev app, before the first feature | `/m5kdev-setup-project` |
| The product's direction changed, or the code has drifted from `PROJECT.md` | `/m5kdev-setup-project` again. The existing file is the starting draft |
| A feature idea is still fuzzy | [grill-with-docs](https://michalkow.github.io/skills/grill-with-docs) |
| The words are the problem, not the purpose | [domain-modeling](https://michalkow.github.io/skills/domain-modeling) |

## Prerequisites

A repo to read. The skill writes `PROJECT.md` at the root and adds a `## Project north star` block to `CLAUDE.md`, or to `AGENTS.md` when there is no `CLAUDE.md`. It is tuned for m5kdev apps, where it compares the app against the starter template in `~/Projects/m5kdev`, but it runs on any repo.

## Signals, not scaffolding

The study step collects **signals**: code that hints at who the product is for and why. Examples are landing copy, roles, billing plans, locales, and seed data. In an m5kdev app, most of the code arrives with the template. Auth, organizations, billing, and the `posts` example ship to every app, so they say nothing about this one. The signal is what the app added, changed, or removed.

When one of your answers contradicts a signal, the skill names it as a **divergence** right away and asks which side is the intent. A divergence you decide to keep goes in the `Known divergences` section of `PROJECT.md`.

## Common questions

**How is this different from `/grill-with-docs`?**

`/grill-with-docs` sharpens one idea and records terms and decisions in `GLOSSARY.md` and ADRs. This skill runs once per project and records the reason the project exists. Feature grilling then has something to check against.

**What happens after it's written?**

The block in `AGENTS.md` makes every later agent read `PROJECT.md` before planning a feature. When a request, a plan, or existing code goes against it, the agent tells you before going on, and you decide whether the work changes or the document does.

## It's working if

- None of the questions is about folders, frameworks, or modules.
- Each question cites something it found in the code.
- `PROJECT.md` reads like your own pitch, and it fits on about a page.
- Later sessions stop to flag a request that conflicts with a non-goal or a trade-off.

## Where it fits

A **run-once setup** per project, rerun when the purpose shifts. It sits beside [setup-michalkow-skills](https://michalkow.github.io/skills/setup-michalkow-skills), which configures the tooling while this skill pins down intent, and it comes before [grill-with-docs](https://michalkow.github.io/skills/grill-with-docs), whose feature work it anchors. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
