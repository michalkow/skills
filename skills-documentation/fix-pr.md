## What it does

`fix-pr` takes a problem you described and **opens** a pull request with the fix. You tell it what is wrong — a symptom, a broken path, a wrong result — and it reproduces it, applies the **smallest change** that makes the problem go away, typechecks as it goes, runs [code-review](https://michalkow.github.io/skills/code-review) at the end, commits, then opens a PR whose body is shaped by [pr](https://michalkow.github.io/skills/pr).

It does not implement a feature from a [ticket](https://michalkow.github.io/skills/dictionary/ticket) or a [spec](https://michalkow.github.io/skills/dictionary/spec), and it does not drive [tdd](https://michalkow.github.io/skills/tdd). The description of the problem is the input; the run is done when the PR contains every task-related change and its remote head matches local `HEAD`.

## When to reach for it

You invoke this by typing `/fix-pr` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own.

| The work is… | Reach for |
| --- | --- |
| A problem you can describe, and it should go up as a PR | `/fix-pr` |
| A ticket or spec that should go up as a PR | [implement-pr](https://michalkow.github.io/skills/implement-pr) |
| A hard bug that resists a first glance | [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs) |
| The code is already committed, and you only need a body | [pr](https://michalkow.github.io/skills/pr) |

## Prerequisites

`fix-pr` opens a PR from the branch you are on. Be on the branch you want reviewed before you start. If you are on the default branch, the run creates a branch first rather than opening a PR from `main`.

## The smallest change

The work is a **fix**, not a feature. Reproduce the problem, change only what it needs, confirm it is gone. Adjacent cleanup, a neighbouring refactor, a nicer API — none of that is the job.

The extra step, the same one [implement-pr](https://michalkow.github.io/skills/implement-pr) adds to [implement](https://michalkow.github.io/skills/implement), is that the run **opens** a pull request instead of leaving the commit sitting on the branch.

[pr](https://michalkow.github.io/skills/pr) is a format, not a workflow: it does not push, and it does not open anything. `fix-pr` is the workflow that calls it. The body it writes is the same three-part shape — Summary as the smallest visual, Evidence as a before and after, Merge Danger as a one-way or two-way door plus blast radius. You do not type `/pr` afterwards; this skill already did.

Required release metadata is created before the final commit and push. After a nested skill returns, the parent workflow resumes and includes its task-related outputs, even when the nested skill leaves them uncommitted. Documentation, generated artifacts, and review fixes belong in that same delivery; unrelated pre-existing changes are preserved.

The run creates or updates a draft PR, verifies its remote head against local `HEAD`, checks its diff and remaining task-related changes, then marks it ready. An existing PR alone is not the completion criterion.

## Common questions

**How is this different from `/implement-pr`?**

`implement-pr` builds a ticket or spec, driving `/tdd` at the seams. `fix-pr` takes a described problem and applies the smallest change that makes it go away. Both review, commit, and open a PR with a body shaped by `/pr`.

**How is this different from `/diagnosing-bugs`?**

`diagnosing-bugs` is the hard-bug loop: a tight red feedback loop before any theory. Reach for it when you do not yet know why it is broken. `fix-pr` is for when you already know the problem and want the fix shipped as a pull request.

**Does this open the PR, or does `/pr`?**

This skill opens it. `/pr` only shapes the body.

**What if I am on `main`?**

The run creates a branch first, then opens the PR from that branch. Prefer starting on the branch you want reviewed.

## It's working if

- The [session](https://michalkow.github.io/skills/dictionary/session) opens by restating the problem you described, rather than asking what to build.
- You can see Skill tool calls for `code-review` and `pr`, and none for `tdd`.
- The diff is the smallest change that makes the problem go away.
- The run reaches a commit without you prompting it to carry on, then a pull request exists with a Summary / Evidence / Merge Danger body.
- You get a PR URL back, not just a commit hash.
- The PR contains required release metadata, documentation, generated artifacts, and review fixes, with no task-related changes left outside it.
- Its remote head matches local `HEAD` before it is marked ready.

## Where it fits

`fix-pr` is a **reach-for-it-anytime standalone** on the "something's broken" on-ramp: the problem is already described, and it should ship as a pull request.

Its neighbours are [implement-pr](https://michalkow.github.io/skills/implement-pr), the same close-out for a ticket rather than a described problem; [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs), the hard-bug loop when you do not yet know why it is broken; and [pr](https://michalkow.github.io/skills/pr), the body format it uses when it opens.

[ask-michal](https://michalkow.github.io/skills/ask-michal) is the router over the whole set when you are not sure which flow you are in.
