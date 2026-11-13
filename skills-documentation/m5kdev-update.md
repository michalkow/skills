## What it does

`m5kdev-update` brings an enrolled app forward to `m5kdev@latest`. A version named in the same message is the target instead.

The run is done when the migration guides in that jump are applied. `pnpm dlx create-m5kdev@<version> update` exiting 0 reconciles the managed template; the guides still in the jump are the rest of the work.

## When to reach for it

You invoke this by typing `/m5kdev-update` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own. Typing it is the go-ahead; it will not ask again.

| Your situation | Reach for |
| --- | --- |
| This enrolled app should be on the latest m5kdev | `/m5kdev-update` |
| You want a specific release, not latest | `/m5kdev-update` and name the version |
| The app has no `.m5kdev.json` | Enroll with `m5kdev init` first. This [skill](https://michalkow.github.io/skills/dictionary/skill) does not enroll |
| A guide's schema change should go through generate-then-migrate | [drizzle-migrate](https://michalkow.github.io/skills/drizzle-migrate) |
| The updated app should go to Fly | [app-deploy](https://michalkow.github.io/skills/app-deploy) |

## Prerequisites

The working directory is an enrolled consumer app: `.m5kdev.json` at the root, Node.js 24 or newer, and `pnpm` on `PATH`. Migration steps are read from `~/Projects/m5kdev/apps/docs`, or from [the same tree on GitHub](https://github.com/michalkow/m5kdev/tree/main/apps/docs) when that checkout is missing or has no guide for the target.

## The jump

The **jump** is the range after `template.version` in `.m5kdev.json`, through the target. A guide belongs to it when `migration.target_version` falls in that range. The CLI applies the migrations it has registered. Everything else stays in the guides, in the order `docs/packages/cli.md` lists.

A clean git worktree is required before the write. A dirty tree stops the run.

## Common questions

**Does it always install latest?**

Latest is the default. Name a version and that release is the target. `latest` is resolved once, then that exact version is what gets invoked, so the guides and the CLI are the same release.

**Does a successful `update` mean the app is migrated?**

The CLI can exit 0 after reconciling templates while a guide in the jump is still unapplied. **Updated** means those guides were applied, or skipped for the reason the guide itself gives.

## It's working if

- You typed `/m5kdev-update`. It did not fire because an app mentioned m5kdev.
- A named version is the target; otherwise the target is the resolved `create-m5kdev` latest.
- A dirty worktree stops before anything is written.
- **Updated** names the jump and which guides were applied.

## Where it fits

`m5kdev-update` is a reach-for-it-anytime standalone. It sits on an app that is already enrolled, when that app should move to a newer m5kdev.

Its neighbours are [drizzle-migrate](https://michalkow.github.io/skills/drizzle-migrate), which is the generate-then-migrate loop when a guide's schema change needs one, and [app-deploy](https://michalkow.github.io/skills/app-deploy), which is how the updated app goes to Fly. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
