## What it does

`implement-pr` is [implement](https://michalkow.github.io/skills/implement) plus one extra step: it **opens** a pull request. You point it at a [ticket](https://michalkow.github.io/skills/dictionary/ticket), a [spec](https://michalkow.github.io/skills/dictionary/spec), or the plan you just agreed, and it builds the same way `implement` does — [tdd](https://michalkow.github.io/skills/tdd) at the seams, typecheck as it goes, [code-review](https://michalkow.github.io/skills/code-review) at the end, commit — then it opens a PR whose body is shaped by [pr](https://michalkow.github.io/skills/pr).

It never reopens the plan, and it does not stop at the commit. Whatever was settled upstream is the input; the run is done when the PR contains every task-related change and its remote head matches local `HEAD`.

## When to reach for it

You invoke this by typing `/implement-pr` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own.

| The work is… | Reach for |
| --- | --- |
| A ticket (or a small spec) that should go up as a PR | `/implement-pr` |
| A problem you can describe, and it should go up as a PR | [fix-pr](https://michalkow.github.io/skills/fix-pr) |
| The same work, and a commit on the current branch is enough | [implement](https://michalkow.github.io/skills/implement) |
| A whole spec, tickets with blocking edges, one integration branch | [implement-spec](https://michalkow.github.io/skills/implement-spec) |
| The code is already committed, and you only need a body | [pr](https://michalkow.github.io/skills/pr) |
| One concrete behaviour, test-first, with no spec | [tdd](https://michalkow.github.io/skills/tdd) directly |

## Prerequisites

`implement-pr` opens a PR from the branch you are on. Be on the branch you want reviewed before you start. If you are on the default branch, the run creates a branch first rather than opening a PR from `main`.

If the tickets came from [to-tickets](https://michalkow.github.io/skills/to-tickets), the tracker they live on was configured by [setup-michalkow-skills](https://michalkow.github.io/skills/setup-michalkow-skills).

## The extra step

The build is `implement`. The extra step is that the run **opens** a pull request instead of leaving the commit sitting on the branch.

[pr](https://michalkow.github.io/skills/pr) is a format, not a workflow: it does not push, and it does not open anything. `implement-pr` is the workflow that calls it. The body it writes is the same three-part shape — Summary as the smallest visual, Evidence as a before and after, Merge Danger as a one-way or two-way door plus blast radius. You do not type `/pr` afterwards; this skill already did.

Required release metadata is created before the final commit and push. After a nested skill returns, the parent workflow resumes and includes its task-related outputs, even when the nested skill leaves them uncommitted. Documentation, generated artifacts, and review fixes belong in that same delivery; unrelated pre-existing changes are preserved.

The run creates or updates a draft PR, verifies its remote head against local `HEAD`, checks its diff and remaining task-related changes, then marks it ready. An existing PR alone is not the completion criterion.

## Common questions

**How is this different from `/implement`?**

The build is the same. `implement` ends at a commit on the current branch. `implement-pr` continues and opens a pull request. That is the gap people kept asking `implement` to fill — a PR mode, a flag, an invocation argument — and this skill is the sibling instead of a switch on `implement`.

**Does this open the PR, or does `/pr`?**

This skill opens it. `/pr` only shapes the body. After `/implement` you still have to ask for a PR (and the agent will reach for `/pr` when it writes the body). After `/implement-pr` the PR is already open.

**What if I am on `main`?**

The run creates a branch first, then opens the PR from that branch. Prefer starting on the branch you want reviewed, the same as with `implement`.

## It's working if

- The [session](https://michalkow.github.io/skills/dictionary/session) opens by reading the ticket or spec and restating what it will build, rather than asking you what to build.
- You can see Skill tool calls for `tdd`, `code-review`, and `pr`.
- The run reaches a commit without you prompting it to carry on, then a pull request exists with a Summary / Evidence / Merge Danger body.
- You get a PR URL back, not just a commit hash.
- The PR contains required release metadata, documentation, generated artifacts, and review fixes, with no task-related changes left outside it.
- Its remote head matches local `HEAD` before it is marked ready.

## Where it fits

`implement-pr` is the build step of the main chain when the work should ship as a pull request:

```txt
grill-with-docs → to-spec → to-tickets → implement-pr → retro
```

Its neighbours are [implement](https://michalkow.github.io/skills/implement), the same build that stops at the commit; [fix-pr](https://michalkow.github.io/skills/fix-pr), the same close-out for a described problem rather than a ticket; and [pr](https://michalkow.github.io/skills/pr), the body format it uses when it opens. [implement-spec](https://michalkow.github.io/skills/implement-spec) is the whole-graph alternative; it may also open a PR, but only when the tracker closes work that way.

[ask-michal](https://michalkow.github.io/skills/ask-michal) is the router over the whole set when you are not sure which flow you are in.
