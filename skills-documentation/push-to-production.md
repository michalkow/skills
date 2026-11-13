## What it does

`push-to-production` versions the current git worktree, lands that on `main`, then promotes `main` to `production`. It runs `changeset version` from the repo's Changesets dev dependency, merges that result onto `main`, and only then opens the release pull request from `main` to `production`. It merges that pull request, watches the GitHub Actions deploy, and asks `fly` whether the production app is actually up. The version commit is on `main` before the release pull request exists. Opening either pull request does not deploy. The merge onto `production` is what starts the deploy, and the run is done when that Action finishes without errors and Fly reports the app **healthy** — or when it can name why that is not true.

## When to reach for it

You invoke this by typing `/push-to-production` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own. Typing it is the go-ahead, including both merges; it will not ask again.

| Your situation | Reach for |
| --- | --- |
| `main` should become what Production is running, and CI deploys that branch | `/push-to-production` |
| You want to run `pnpm app:deploy` yourself from `main` | [app-deploy](https://michalkow.github.io/skills/app-deploy) |
| Pending changesets should be written, not versioned | [changeset-add](https://michalkow.github.io/skills/changeset-add) |
| `fly` is not installed, you are not logged in, or the app has never been created | [wizard](https://michalkow.github.io/skills/wizard), or do that setup yourself |
| The Action failed, or Fly came back unhealthy, and you want to know why | [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs) |

## Prerequisites

`gh` is authenticated. `fly` (or `flyctl`) is on your `PATH` and authenticated (`fly auth whoami`). `origin/production` exists. The Fly config is `apps/shared/fly.production.toml` when that file exists, otherwise `apps/shared/fly.toml`. `@changesets/cli` is a dev dependency of the root `package.json`, and `.changeset/config.json` exists. The [skill](https://michalkow.github.io/skills/dictionary/skill) stays in the git worktree it was started in. If any of those are missing it stops and names which, rather than installing the CLI, logging you in, adding the dependency, or checking out another branch.

## Version, then the release

`changeset version` consumes the pending changesets and writes the version bump. That commit lands on `main` first — a push when this worktree is already `main`, otherwise a pull request into `main` that is merged. The release pull request comes after, and its head is `main`. A feature branch never targets `production`.

A **promotion** is that second pull request: `main` → `production`, merged with a merge commit. The promotion check only confirms the source branch. The deploy workflow runs on the push to `production`. The skill watches that run — not the Development deploy a push to `main` may also start — and stops when the run fails. It does not deploy with `fly deploy` or `pnpm app:deploy`.

`production` already containing `main`, after the version has landed, is not a new release. The skill health-checks what is already running, or finishes watching a deploy that is still in progress.

## Healthy is the done signal

A green Action means GitHub finished the workflow, not that the process is serving traffic. After a successful run the skill still asks `fly`: `status`, `checks list`, `machine list`, against the production config. **Healthy** is those three agreeing.

A machine still `starting` is waited out. `failed`, `crashed`, or a check in `warning` / `critical` is **Unhealthy**, with a recent log excerpt. `min_machines_running` of 1 or more means a fully stopped app is not healthy. Scale-to-zero, with no such minimum, still counts a `stopped` machine as expected.

## Common questions

**Does opening the release pull request deploy Production?**

No. The promotion check only verifies the source branch. The deploy starts when that pull request is merged into `production`. Typing the skill is the go-ahead for that merge, and for the earlier merge onto `main`.

**Will it release the branch this worktree is on?**

It versions that branch and merges it onto `main`. The release pull request is a second one, from `main` to `production`.

**Does a green GitHub Action mean the app is up?**

No. The Action can succeed while a machine is still `starting`, a check is `critical`, or the process crashed on boot. **Healthy** appears only after `fly` says so. A failed Action is **Deploy failed**, and no health check is run against it.

## It's working if

- You typed `/push-to-production`. It did not fire because you mentioned production in passing.
- `changeset version` ran, from the installed dev dependency, before either pull request.
- The version commit is on `main` before the release pull request exists.
- The release pull request's head is `main` and its base is `production`, merged with a merge commit.
- It watched the deploy run for that merge, not the Development deploy a push to `main` may start.
- A failed Action is reported as **Deploy failed**, with no health check against it.
- **Healthy** only appears when the machines are in the expected state and every check is `passing`.

## Where it fits

`push-to-production` is a reach-for-it-anytime standalone. It sits after the code and its pending changesets are on the branch, not inside the build chain.

Its neighbours are [changeset-add](https://michalkow.github.io/skills/changeset-add), which writes a pending changeset and stops before `changeset version`; [app-deploy](https://michalkow.github.io/skills/app-deploy), which runs `pnpm app:deploy` from `main` instead of the promotion; [wizard](https://michalkow.github.io/skills/wizard), which is how `fly` or `gh` gets set up when a precondition is missing; and [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs), which is the next move when the Action fails or the check comes back unhealthy. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
