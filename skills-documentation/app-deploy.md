## What it does

`app-deploy` puts **main** on Fly.io. Before anything else it checks the current branch. When that branch is not `main`, it checks out `main`, then runs `git pull`. The rest of the skill runs only after that pull: `pnpm app:deploy` from the repo root, then asking `fly` whether the app is actually up. The tree that goes up is that updated `main`, and a zero exit from the deploy command is not success. The run is done when Fly reports the app **healthy** — machines in the expected state, health checks passing — or when it can name why that is not true.

## When to reach for it

You invoke this by typing `/app-deploy` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own. Typing it is the go-ahead; it will not ask again.

| Your situation | Reach for |
| --- | --- |
| Latest `main` should be what Fly is running | `/app-deploy` |
| You are on a feature branch you want live | Land it on `main` first |
| Fly is not installed, you are not logged in, or the app has never been created | [wizard](https://michalkow.github.io/skills/wizard), or do that setup yourself |
| The deploy came back unhealthy, and you want to know why | [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs) |
| The code is not built yet | [implement](https://michalkow.github.io/skills/implement) or [implement-spec](https://michalkow.github.io/skills/implement-spec) first |
| CI promotes `main` to `production` and deploys that branch | [push-to-production](https://michalkow.github.io/skills/push-to-production) |

## Prerequisites

The branch check is the first prerequisite, and it always runs before the rest of the skill. The current branch is `main`. When it is not, the skill checks out `main`, then runs `git pull`. Already up to date still continues. The pull has to succeed before `pnpm app:deploy` or the Fly check. A dirty tree that blocks the checkout or the pull stops the run.

The repo root must define `pnpm app:deploy`. `fly` (or `flyctl`) must be on your `PATH` and authenticated (`fly auth whoami`). `apps/shared/fly.toml` must exist — that is the Fly app this skill talks to. If any of those are missing it stops and names which, rather than installing the CLI, logging you in, or creating an app.

## Healthy is the done signal

The tree that goes up is **main** after a pull, not the branch you happened to be on. Already up to date is the continue case, not a stop.

`pnpm app:deploy` returning 0 means Fly accepted the release, not that the process is serving traffic. The skill's whole job after that command is the independent `fly` check: `status`, `checks list`, `machine list`. **Healthy** is those three agreeing that the machines are up and the checks pass.

A machine still `starting` is waited out and re-checked. `failed`, `crashed`, or a check in `warning` / `critical` is **Unhealthy**, and the report includes a recent log excerpt. The skill does not redeploy, roll back, or start a diagnosis on its own.

Scale-to-zero apps are the exception that is still healthy: a `stopped` machine is expected when `auto_stop_machines` is on. The skill does not start one just to probe it.

## Common questions

**Does a successful `pnpm app:deploy` mean the app is up?**

No. That is the whole point of the skill. The command can exit 0 while a machine is still `starting`, a check is `critical`, or the process crashed on boot. The run reports **Healthy** only after `fly` says so.

**Will it deploy the branch I'm on?**

No. It checks out `main` and pulls, then deploys that. A feature-branch checkout is not what Fly gets. Already up to date still continues.

**Will it create a Fly app, or deploy from CI?**

Neither. It runs the repo's `app:deploy` script against the app `apps/shared/fly.toml` already names. There is no "create if missing", and nothing watches your merges. When CI promotes `main` to `production` and deploys that branch, that is [push-to-production](https://michalkow.github.io/skills/push-to-production).

## It's working if

- You typed `/app-deploy`. It did not fire because you mentioned Fly in passing.
- It checked the branch first. When the checkout was not `main`, it checked out `main`, then `git pull`, and only then ran `pnpm app:deploy`. Already up to date still continues.
- After `pnpm app:deploy` succeeds, it still runs `fly status` / `checks list` / `machine list` before claiming success.
- **Healthy** only appears when the machines are in the expected state and every check is `passing`.
- A failed deploy is reported as **Deploy failed**, and no health check is run against it.
- An **Unhealthy** report names the failing machine or check and includes a log excerpt, not a second deploy.

## Where it fits

`app-deploy` is a reach-for-it-anytime standalone. It sits after the code is on `main`, not inside the build chain.

Its neighbours are [push-to-production](https://michalkow.github.io/skills/push-to-production), which promotes `main` to `production` and watches the GitHub Actions deploy instead of running `pnpm app:deploy`; [implement](https://michalkow.github.io/skills/implement) / [implement-spec](https://michalkow.github.io/skills/implement-spec), which produce that code; [wizard](https://michalkow.github.io/skills/wizard), which is how Fly gets set up when the preconditions are missing; and [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs), which is the next move when the check comes back unhealthy. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
