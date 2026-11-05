## What it does

`council` brings in three delegates — one strong [model](https://michalkow.github.io/skills/dictionary/model) from each of three different [model providers](https://michalkow.github.io/skills/dictionary/model-provider), at high reasoning — to review or give feedback on the current work. It is not three copies of the same model. If a provider or a named member cannot be reached, the run reports that instead of substituting.

It fixes known issues and outstanding PR comments *before* the first round, then iterates: apply the recommendations you agree with, request a fresh review, repeat until the delegates are satisfied. Fighting scope creep across those rounds is part of the job. The process does not grow the work just because a later round found a new nice-to-have.

## When to reach for it

You invoke this by typing `/council` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own. It is expensive on purpose.

| Your situation | Reach for |
| --- | --- |
| You want three flagship models from different providers on the same work | This skill |
| You want three models to *research* a topic, then one file in `docs/` | [research-council](https://michalkow.github.io/skills/research-council) |
| A two-axis review of a named diff (Standards + Spec) | [code-review](https://michalkow.github.io/skills/code-review) |
| You are writing the PR body, not reviewing the code | [pr](https://michalkow.github.io/skills/pr) |
| You want to throw the implementation away and explore a new idea | This skill still, but it skips fixes to code being replaced |

## Three providers, not three copies

The leading word is **council**. Independence is the point: one model per provider, in parallel, read-only for review or feedback. You can name the members; otherwise it picks the latest flagship from each — Claude Opus, GPT Sol, Gemini Pro, or whatever `orchestrator_capabilities` resolves in T3 Code. Elsewhere it uses the [harness](https://michalkow.github.io/skills/dictionary/harness)'s [subagent](https://michalkow.github.io/skills/dictionary/subagent) tools.

Each code-review pass is a **round**, scored out of 10. A fresh review after fixes is a new round. Scores land in a table on the PR description if one is open, or in the final reply if not. A delegate that gives no score is recorded as `no score`, never invented.

## Common questions

**How is this different from `/code-review`?**

`/code-review` is the default close-out: two axes (Standards and Spec), usually the same model, one pass over a named diff. `/council` is the heavier optional pass — three providers, scores, rounds until they agree. Use `/code-review` in the build chain; type `/council` when you want disagreement across models, not another same-model sub-agent.

**Does it keep going until every score is 10/10?**

Until the delegates are *satisfied*, which is not the same as a perfect score. A 9 with no remaining objections can end the loop. What it must not do is treat each round as permission to enlarge the work.

**What if a provider is missing?**

It reports that and stops substituting. Three providers is a requirement, not a preference. A named member you asked for that is unavailable is the same: say so, do not silently swap in a fourth copy of one you already have.

**Will it expand the PR from review comments?**

That is the failure mode it is written to prevent. Known comments and known bugs get fixed *before* round one, so the council sees the current implementation. After that, agreed recommendations get applied; nice-to-haves that appear in round two are the thing the coordinator is told to fight.

## It's working if

- You typed `/council`. It did not fire because you asked for a review in passing.
- The three delegates are from three providers, not three instances of one model.
- Known issues and outstanding PR comments were fixed before the first round, unless you said to discard the implementation.
- Each code-review round has a score table (or `no score`), and a later round is a new column, not a rewritten first one.
- The work did not grow across rounds just because a delegate found something extra.

## Where it fits

`council` is a reach-for-it-anytime standalone that can sit after [code-review](https://michalkow.github.io/skills/code-review) when you want a harder pass than the build chain's default. It is not a step in `grill-with-docs → to-spec → to-tickets → implement → code-review → retro`; you type it.

Its neighbours are [code-review](https://michalkow.github.io/skills/code-review), the cheaper two-axis close-out; [pr](https://michalkow.github.io/skills/pr), which shapes the body the council table is written into when the work ends in a pull request; and [research-council](https://michalkow.github.io/skills/research-council), the same three-provider shape used for research rather than review. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
