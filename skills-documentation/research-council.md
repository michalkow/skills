## What it does

`research-council` sends the same topic to three [models](https://michalkow.github.io/skills/dictionary/model) — Sol 5.3, Grok 4.6, and Claude Opus 4.6 unless you name others — each of which web-searches and returns a cited research brief. The coordinator then reads those briefs and writes **one** comprehensive Markdown file into `docs/`.

The coordinator does not research. It synthesises three independent searches. Disagreement is recorded, not rounded off with another round of search.

## When to reach for it

You invoke this by typing `/research-council` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own. It is expensive on purpose.

| Your situation | Reach for |
| --- | --- |
| You want three models to search a topic independently, then one file in `docs/` | This skill |
| One background agent, primary sources, a notes file wherever the repo keeps them | [research](https://michalkow.github.io/skills/research) |
| Three models reviewing *code*, iterating until they agree | [council](https://michalkow.github.io/skills/council) |
| A decision made *with* you, by interview | [grilling](https://michalkow.github.io/skills/grilling) / [grill-with-docs](https://michalkow.github.io/skills/grill-with-docs) |

## Prerequisites

A topic, and any context the delegates should share. If either is missing, the skill asks rather than inventing one. T3 Code is the native path (`orchestrator_capabilities`, then one `delegate_task` per model). Elsewhere it uses the [harness](https://michalkow.github.io/skills/dictionary/harness)'s [subagent](https://michalkow.github.io/skills/dictionary/subagent) tools. If a named family cannot be reached, it reports that instead of swapping in a different one.

## Independent briefs, one synthesis

The leading word is **synthesis**. Independence is the point of the council half: three windows, same topic, each using web search, each citing [primary sources](https://michalkow.github.io/skills/dictionary/primary-source). The synthesis half is the coordinator's job — agreement, disagreement with sources, gaps, one merged bibliography — written to `docs/<topic-slug>.md`. It will not overwrite an existing file, and it will not land in `docs/adr/` or `docs/agents/`.

Unlike [council](https://michalkow.github.io/skills/council), there is no second round. A split finding stays a split finding.

## Common questions

**How is this different from `/research`?**

`/research` is one background agent, primary-source discipline, a file wherever the repo already keeps notes, and you keep working while it reads. `/research-council` is three models in parallel, web search each, then the *current* model writes one synthesis into `docs/`. You wait for the briefs. Use `/research` for delegated legwork; type `/research-council` when you want disagreement across models on the same question.

**Will it pick Sol 5.3 / Grok 4.6 / Opus 4.6 even if the catalog has moved on?**

It resolves names through `orchestrator_capabilities`. An exact id or label wins. If that version is gone, it takes that family's current model from that provider and tells you which id it used. It will not silently replace Sol with Gemini.

**Does it commit the file?**

No. It writes `docs/<topic-slug>.md` and names the path. Whether that file belongs in git is yours — a research synthesis dates fast, the same way a `/research` file does.

**What if the three briefs contradict each other?**

The synthesis says so, with each side's source. It does not run another search to force a winner.

## It's working if

- You typed `/research-council`. It did not fire because you asked a question in passing.
- Three delegates ran, from three families (Sol, Grok, Opus unless you named others), and each brief cites URLs.
- Exactly one new Markdown file appears under `docs/`, not under `docs/adr/` or `docs/agents/`.
- The file is a synthesis: agreement, disagreement, gaps — not three briefs pasted together.
- A claim you spot-check lands on a source one of the briefs actually cited.

## Where it fits

`research-council` is a reach-for-it-anytime standalone. It sits beside [research](https://michalkow.github.io/skills/research), not in the build chain. The file it writes is something to take *into* [grill-with-docs](https://michalkow.github.io/skills/grill-with-docs) or [to-spec](https://michalkow.github.io/skills/to-spec).

Its other neighbour is [council](https://michalkow.github.io/skills/council): same three-provider shape, used for review rather than research. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
