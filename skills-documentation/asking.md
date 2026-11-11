## What it does

`asking` takes a change you can already describe and checks that you and the [agent](https://michalkow.github.io/skills/dictionary/agent) share one picture of the outcome. It reads what you said, looks up what it can, and speaks up only at a **gap**: a vague outcome, an inconsistency in what you said, or a contradiction with the glossary, an ADR, a doc, or the code.

A gap is the only thing that becomes a question. How the change gets built — libraries, files, signatures — stays with the agent unless you made that the subject. Zero questions is a finished round when the brief was already specific. The pass ends on a short restatement of the change, in your words.

## When to reach for it

Type `/asking`, or the agent reaches for it when you ask for this pass by name — "asking", "don't grill", "just the important questions", "check you understood".

| What you have | Reach for |
| --- | --- |
| A change you can already describe, and no repo | `/asking` |
| The same, inside a repo | [asking-with-docs](https://michalkow.github.io/skills/asking-with-docs) — the same pass, records a term or an ADR when one actually settles, and stops |
| An idea that is still fuzzy | [grilling](https://michalkow.github.io/skills/grilling), usually through [grill-me](https://michalkow.github.io/skills/grill-me) or [grill-with-docs](https://michalkow.github.io/skills/grill-with-docs) |
| An effort too big for one [session](https://michalkow.github.io/skills/dictionary/session) | [wayfinder](https://michalkow.github.io/skills/wayfinder) |

## The gap

Three kinds of gap, and nothing else.

| Gap | What it sounds like |
| --- | --- |
| Vague | Two readings of the request would ship different changes |
| Inconsistent | This sentence fights something you already said |
| Contradicts a source | The glossary, an ADR, a doc, or the code says otherwise |

The agent looks the sources up itself. In a repo it reads them before the round. Code is what the system does now, an ADR is a decision already paid for, and the glossary is the project's word for a thing. When a doc and the code disagree, that disagreement is the gap it puts in front of you, with a recommendation and the file it came from.

A pushback happens once. It names the source. Then your answer stands.

The round is the whole set of gaps, numbered, each with a recommended answer. Cursor shows them through its question picker; otherwise each one is a `❓` question and a `➡️` recommendation, the same shape as a grilling round, and usually a much shorter list. One more round is allowed when an answer opens a new gap that would change the outcome. Then it restates the change and stops, unless you had already asked it to do the work.

## Common questions

**When do I use this instead of grilling?**

When you already know the change. [grilling](https://michalkow.github.io/skills/grilling) keeps going until every branch of the design has been visited. This pass ends when the outcome is unambiguous.

**It asked me which file to put it in.**

That question missed. File layout is part of building the change, and this [skill](https://michalkow.github.io/skills/dictionary/skill) asks about the outcome. Tell it the outcome is settled and to pick the implementation.

**It asked me nothing.**

That is a valid round. You get the restatement and no questions, which means the brief was specific and consistent with the sources it read.

## It's working if

- You can read a few sentences that describe the change you asked for, in your words.
- Each question, if any, would change what gets built if you answered it the other way.
- A pushback names a file, a glossary term, an ADR, or a sentence you wrote.
- You are not asked how to implement it.
- The pass is one round, or a second round that exists because your answer contradicted something.

## Where it fits

`asking` is the **primitive** for a short alignment pass, and a standalone you can run with no repo. [asking-with-docs](https://michalkow.github.io/skills/asking-with-docs) is the user-invoked front door that runs the same pass inside a repo, writes down what settled, and stops — it never continues into the build. [grilling](https://michalkow.github.io/skills/grilling) is the long interview, for when the idea is still fuzzy. When you are unsure which one fits, [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you.
