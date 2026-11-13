## What it does

`changeset-add` writes **one pending Changeset** for release-worthy behaviour in the named scope. It does not version packages, does not edit CHANGELOG.md, and does not commit. The run is done when `.changeset/<id>.md` exists — or when it can name why nothing should be recorded.

The bump is patch unless you name `minor` or `major`. The scope is this [session](https://michalkow.github.io/skills/dictionary/session) unless you name a git range. Both can appear together. `changeset version` is later. [push-to-production](https://michalkow.github.io/skills/push-to-production) runs it and ships. This skill does not. That command combines every pending file into one release and takes the highest bump.

## When to reach for it

You invoke this by typing `/changeset-add` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own.

| Your situation | Reach for |
| --- | --- |
| This thread (or a named range) changed something a package consumer would notice | `/changeset-add` |
| You want a minor or major instead of patch | `/changeset-add` and name the bump |
| The code is not the code you want recorded | [implement](https://michalkow.github.io/skills/implement) / [tdd](https://michalkow.github.io/skills/tdd) first |
| The work should go up as a PR that carries the pending file | Type this first, then [implement-pr](https://michalkow.github.io/skills/implement-pr) or [fix-pr](https://michalkow.github.io/skills/fix-pr) |
| You want CHANGELOG.md updated and versions bumped | [push-to-production](https://michalkow.github.io/skills/push-to-production) |

## Prerequisites

The repo must already use Changesets: `.changeset/config.json` exists. The [skill](https://michalkow.github.io/skills/dictionary/skill) will not initialise Changesets, invent ignored-package rules, or run `changeset version`.

## One pending file

The leading idea is **pending**. Each file in `.changeset/` is a claim about one consumer-facing behaviour. Version later folds those claims into a release; this skill only adds a claim, or refuses to.

A change is release-worthy when a consumer of a versioned package would notice it. Internal-only work, an empty scope, or a package `.changeset/config.json` ignores is a stop, not a file. A sentence that already sits in another pending file is dropped, and that file is named. A behaviour the scope reverted is deleted from `.changeset/` when the match is clear, and left alone when it is not.

## Common questions

**Does it update CHANGELOG.md or bump versions?**

No. It writes `.changeset/<id>.md` and stops. [push-to-production](https://michalkow.github.io/skills/push-to-production) runs `changeset version` later; that command combines pending files, takes the highest bump, and writes the changelog.

**Will it commit the file?**

No. The file is left uncommitted so you can review it, include it in a PR, or discard it.

**What is "this thread"?**

The files the agent changed in this session, plus edits you clearly made as part of it. Earlier commits on the branch and dirty files that predate the thread are ignored unless you name a git range.

## It's working if

- You typed `/changeset-add`. It did not fire because you mentioned a changelog in passing.
- A `.changeset/<three-words>.md` exists, uncommitted, with the bump and packages you named.
- CHANGELOG.md was not edited.
- Internal-only work, an ignored package, or behaviour already in a pending file was reported as a stop, not a second file.

## Where it fits

`changeset-add` is a reach-for-it-anytime standalone. It sits after the code is the code you want released, not inside the build chain.

Its neighbours are [push-to-production](https://michalkow.github.io/skills/push-to-production), which runs `changeset version` and ships; [implement](https://michalkow.github.io/skills/implement) / [implement-pr](https://michalkow.github.io/skills/implement-pr) / [fix-pr](https://michalkow.github.io/skills/fix-pr), which produce that code; and [pr](https://michalkow.github.io/skills/pr), which is the body of the PR that can carry the pending file. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
