## What it does

`create-verification-skill` interviews the repo and writes a project-local verification [skill](https://michalkow.github.io/skills/dictionary/skill) — `.cursor/skills/verify-<app>/` — that launches the real app, drives a feature the way a user would, and captures evidence. It does not write the output for a human. The next [agent](https://michalkow.github.io/skills/dictionary/agent) will read it cold, mid-task, having never seen the app.

A generated skill that has never been executed is a draft. The run is done when launch, doctor, one mapped feature, evidence, and cleanup have all been proven — and the evidence still exists after teardown.

## When to reach for it

You invoke this by typing `/create-verification-skill` — the agent won't reach for it on its own.

| Your situation | Reach for |
| --- | --- |
| The project has no scripted way to prove UI, CLI, or service behaviour | This skill |
| A verification skill already exists and the feature map may have rotted | [maintain-verification-skill](https://michalkow.github.io/skills/maintain-verification-skill) |
| You want to lock a behaviour at a seam, test-first | [tdd](https://michalkow.github.io/skills/tdd) |
| Something is already broken and you need a tight repro | [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs) |

## Prerequisites

A checkout that builds and starts. If it doesn't, the skill fixes that first — or reports it precisely — before generating; a skill written against a broken base teaches the wrong steps. No issue tracker or prior setup is required.

## Proof is the generated skill

The leading word is **proof**. Tests lock behaviour at seams; this drives the running app along the real user path — not internal setters, not test-only endpoints — and captures the action plus the resulting state. The **feature map** is the maintained source: one file per user-facing feature, written from the user's point of view, with how to reach it, how to drive it with the [harness](https://michalkow.github.io/skills/dictionary/harness), and what observable end state proves it works.

The generator seeds the top few features it can see. One live drive of one mapped feature is enough to prove the skill; the map exists so later runs can cover the rest.

## Common questions

**Is this a replacement for `/tdd`?**

No. `/tdd` writes tests at seams so a behaviour stays locked after the code changes. This skill writes a recipe for driving the live app the way a user would. Use both: tests for the seams you can name, verification for the path a person actually walks.

**Will it interview me about the app?**

Only for what it cannot observe. Surface, run command, harness, evidence, isolation — those come from the repo. You get asked when the checkout will not yield an answer.

**Where does the generated skill live?**

`.cursor/skills/verify-<app>/`, with `SKILL.md` and a `features/` map. It is project-local, not one of the skills in this repo. `/maintain-verification-skill` is the upkeep loop for that directory.

**What if two instances cannot run side by side?**

The generated skill says so. Refusing to double-drive a shared instance beats corrupting the session you already have open.

## It's working if

- You typed `/create-verification-skill`. It did not fire because you mentioned Playwright or "verify this".
- It read the repo for surface, run, drive, observe, and isolate before asking you anything.
- A `.cursor/skills/verify-*/SKILL.md` exists with Launch, Doctor, Drive, Evidence, Cleanup, and Helpers, and no placeholders remain.
- It drove one mapped feature end to end, cleaned up, and the evidence is still at the named location.
- It pointed you at `/maintain-verification-skill` rather than inventing a cadence.

## Where it fits

`create-verification-skill` is a reach-for-it-anytime standalone. It sits beside the build chain, not inside it: you reach for it when a project needs a scripted user-path proof, then leave the generated skill in the repo for later agents.

Its neighbour is [maintain-verification-skill](https://michalkow.github.io/skills/maintain-verification-skill), the upkeep loop for the map this skill seeds. [tdd](https://michalkow.github.io/skills/tdd) is the other proof discipline — seams, not the live app. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
