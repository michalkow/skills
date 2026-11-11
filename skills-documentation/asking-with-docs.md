## What it does

`asking-with-docs` checks a change you can already describe against the repo, and asks only where that check fails. It runs the same short pass as [asking](https://michalkow.github.io/skills/asking): one round of **gaps**, then a restatement of the outcome.

It is **[stateful](https://michalkow.github.io/skills/dictionary/stateful)** in a narrow way. A term that actually gets resolved lands in `GLOSSARY.md`. A decision that is hard to reverse, surprising without context, and a real trade-off lands as an ADR. A round that only confirms the request writes nothing. The files are a record of what settled, and the [session](https://michalkow.github.io/skills/dictionary/session) does not go hunting for vocabulary to coin.

## When to reach for it

You invoke this by typing `/asking-with-docs` — the [agent](https://michalkow.github.io/skills/dictionary/agent) will not reach for it on its own.

Reach for it at the start of a change, in a repo, when you can already say what you want and you want that checked before anyone builds it.

| What you have | Reach for |
| --- | --- |
| A repo, and a change you can already describe | `/asking-with-docs` |
| No repo, and a change you can already describe | [asking](https://michalkow.github.io/skills/asking) |
| A repo, and the idea is still fuzzy | [grill-with-docs](https://michalkow.github.io/skills/grill-with-docs) |
| No repo, and the idea is still fuzzy | [grill-me](https://michalkow.github.io/skills/grill-me) |
| An effort too big for one session | [wayfinder](https://michalkow.github.io/skills/wayfinder) |

## Prerequisites

You need a repo it is safe to write into. Resolved terms go to `GLOSSARY.md` (or the context's glossary, when a `GLOSSARY-MAP.md` marks the repo as multi-context). Decisions that pass all three ADR gates go to `docs/adr/`. Both are created lazily, and a session that settles neither creates neither.

The [skill](https://michalkow.github.io/skills/dictionary/skill)'s own text delegates the pass to [asking](https://michalkow.github.io/skills/asking) and the writing to [domain-modeling](https://michalkow.github.io/skills/domain-modeling). Installing this skill alone leaves it with nothing to run.

## What gets written

| What settled | Where it lands |
| --- | --- |
| A term — the project's word for a thing | `GLOSSARY.md`, when it resolves |
| A decision that is hard to reverse, surprising without context, and a real trade-off | An ADR under `docs/adr/` |
| The outcome you agreed, and every implementation choice | The conversation |

The third row is the usual one. Most sessions confirm a change and write no files. The glossary stays a glossary: no implementation notes, no [spec](https://michalkow.github.io/skills/dictionary/spec). Hand the same conversation to [to-spec](https://michalkow.github.io/skills/to-spec) when the build has to outlive the thread, or to [implement](https://michalkow.github.io/skills/implement) when it is small enough to build now.

The sources it checks before asking are the glossary, the ADRs, the docs, and the code the change touches. A pushback names one of those. Code is what the system does now; an ADR is a decision already made; a doc that has drifted from the code is raised as the conflict, with a recommendation, and you decide.

## Common questions

**Should I use this or `/grill-with-docs`?**

How clear the change already is. This pass checks a change you can describe and stops at the gaps. [grill-with-docs](https://michalkow.github.io/skills/grill-with-docs) interviews you until the design tree is visited, and it builds the glossary as it goes. Use that when you are still working out what you want.

**It ran and wrote no `GLOSSARY.md` and no ADR.**

Nothing qualified. Confirming a change that uses words the repo already has, and that reverses no hard decision, is a session with an empty paper trail. That is the expected result.

**It asked me a pile of edge cases.**

The writing half opened a second interview. This pass records what the round settled and skips the scenario stress-test. Tell it to drop the hypotheticals and restate the change.

## It's working if

- The questions, if any, cite a doc, a glossary term, an ADR, or the code.
- You are not walked through a design you already had in mind.
- `GLOSSARY.md` and `docs/adr/` change only for something the round actually resolved.
- A session that merely confirmed the request leaves the repo untouched.
- It closes by restating the change in a few sentences.

## Where it fits

`asking-with-docs` is an alternate head of the main build chain, for a change that is already clear:

```txt
asking-with-docs → to-spec → to-tickets → implement → code-review → retro
```

Skip ahead to [implement](https://michalkow.github.io/skills/implement) when the change is small enough to build in the same thread. [grill-with-docs](https://michalkow.github.io/skills/grill-with-docs) is the other head of that chain, for an idea that still needs an interview. [asking](https://michalkow.github.io/skills/asking) is the pass this skill runs, and [domain-modeling](https://michalkow.github.io/skills/domain-modeling) is the writing it uses once something settles. When you are unsure which head fits, [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you.
