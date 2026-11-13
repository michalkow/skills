---
name: push-to-production
description: Version with the repo's Changesets dev dependency, merge that onto main, then merge a release pull request from main into production, watch the GitHub Actions deploy, and confirm the Fly app is healthy.
disable-model-invocation: true
---

# Push to Production

The release is not done when a pull request opens, or when the GitHub Actions run exits 0. It is done when the deploy finishes without errors and Fly reports the production app **healthy**.

Typing `/push-to-production` is the go-ahead, including the merge onto `main` and the merge into `production`. Do not ask again.

Stay in the current git worktree. Do not check out another branch, create a branch, or add a worktree.

The release pull request is from `main` to `production`. Nothing else targets `production`. The version commit lands on `main` before that pull request exists.

## Steps

1. **Preconditions.** `gh auth status` succeeds. `fly` (or `flyctl`) is on `PATH`, and `fly auth whoami` succeeds. The Fly config is `apps/shared/fly.production.toml` when that file exists, otherwise `apps/shared/fly.toml`. The root `package.json` lists `@changesets/cli` under `devDependencies`, and `.changeset/config.json` exists. Done when all of these hold. Stop and name whichever is missing. Do not install `fly`, log in, create an app, add the dependency, or run `pnpm dlx`.

2. **Main.** `git fetch origin main production`. Needs network. Non-zero: show the output and stop. `origin/production` missing: stop. Current branch is `git rev-parse --abbrev-ref HEAD`. Detached HEAD: stop. A dirty tree that blocks a pull or merge: stop and name it. Do not stash.

   Up to date means `origin/main` is an ancestor of `HEAD` (`git merge-base --is-ancestor origin/main HEAD`). Already true: continue.

   On `main` and behind: `git pull --ff-only origin main`. Done when it exits 0. Non-zero: show the output and stop. Do not merge, rebase, or reset `main`.

   On any other branch and behind: `git merge origin/main`. Done when it exits 0 and `origin/main` is an ancestor of `HEAD`. Conflicts or any other non-zero: show the output and stop.

3. **Version.** From the repo root, run the installed binary: `CI=true` and the repo's package manager `exec changeset version` (`pnpm exec` when `packageManager` or the lockfile is pnpm). Needs network only if the package manager itself does. Do not run a script that calls `pnpm dlx`. Do not pass `--snapshot`.

   `CI=true` applies the pending changesets without a prompt. The bump is whatever those files say. Done when the command exits 0. Non-zero: show the output and stop. Still waiting on input: stop. Do not open a pull request.

   It changed files: commit those files. Message `Version packages`. A dirty path the command did not change: stop and name it. It changed nothing: no commit. Either way, this step is done before any pull request.

4. **Land on main.** The version commit, and the branch it sits on, are on `origin/main` before the release pull request.

   On `main`: `git push`. Needs network. Done when `origin/main` is this commit. Non-zero: show the output and stop.

   On any other branch, `HEAD` is already an ancestor of `origin/main`: this step is done. Otherwise `git push -u origin HEAD`. An open pull request into `main`: use it. Else `gh pr create --base main --head <branch> --title "Version packages"`. The body is the version commit's summary. Then `gh pr checks <number> --watch`. No checks reported yet: wait and run it again. That is not a failure. A failure: show the output and stop. Do not merge. Checks passed: `gh pr merge <number> --merge`. Done when it is merged. Non-zero: show the output and stop. Do not squash, rebase, or delete the head branch. Then `git fetch origin main`.

   A push or merge to `main` starts the Development deploy. Do not watch that run.

   Done when `git merge-base --is-ancestor HEAD origin/main` (on `main`, `HEAD` is `origin/main`). The release pull request does not exist yet.

5. **Release PR.** Head is `main`. Base is `production`. Read `.github/workflows/promotion.yml` when it exists. Its promotion chain must name `main` as the only head for `production`, from this repository, not a fork. A different required head: stop and name the rule. Do not open the pull request from the worktree's branch.

   `origin/main` is already an ancestor of `origin/production`: nothing to release. If the latest run of the deploy workflow from step 8 on `production` is `queued` or `in_progress`, `gh run watch` that run. `failure` or `cancelled`: `gh run view <id> --log-failed`, report **Deploy failed**, and stop. `success`, or no run in progress: step 9. **Healthy** → report **Already promoted**. Otherwise report **Unhealthy**. This step is done. Do not open a pull request.

   Otherwise, an open pull request from `main` into `production`: use it. Else `gh pr create --base production --head main --title "Release main to production"`. The body is the version this run committed, then `git log --oneline origin/production..origin/main`. Done when the pull request URL exists.

6. **Checks.** `gh pr checks <number> --watch` on the release pull request. Needs network. No checks reported yet: wait and run it again. That is not a failure. Done when every check passes. A failure: show the output and stop. Do not merge.

7. **Merge.** `gh pr merge <number> --merge` on the release pull request. Needs network. Done when it is merged. Non-zero: show the output and stop. Do not squash, rebase, or delete `main`. The merge commit on `production` is what starts the deploy.

8. **Deploy.** The workflow file is the one under `.github/workflows/` that runs on `push` to `production` and deploys the app (here, `deploy-app.yml`, name `Deploy app`). Not the promotion check, and not the Development deploy a push to `main` may have started.

   After a merge, the SHA is `gh pr view <number> --json mergeCommit --jq .mergeCommit.oid`. Poll `gh run list --commit <sha> --workflow <file> --json databaseId,status,conclusion,url,name` until that run exists. Actions can lag a couple of minutes. A newer push queues behind an in-progress deploy; watch the run for this SHA.

   No run: read that workflow's `paths` filter. The merge touched none of them: report **No deploy** and stop. The paths match, or there is no filter, and the run never appeared: show `gh run list --branch production --limit 5` and stop.

   `gh run watch <id> --exit-status`. Needs network. Deploys take minutes. Done when the conclusion is `success`. `failure` or `cancelled`: `gh run view <id> --log-failed`, then stop. Do not health-check a failed deploy. Do not rerun, roll back, or deploy with `fly deploy` or `pnpm app:deploy`.

9. **Health check.** Use `fly` against the config from step 1 (`-c` that file, or `-a` from its `app` field). Unfamiliar flag → `fly <cmd> --help`, never invent one. Run:

   - `fly status -c <config>`
   - `fly checks list -c <config>`
   - `fly machine list -c <config>`

   **Healthy** means every listed machine is `started`, and every health check is `passing`. No checks configured is fine if every machine is `started`. A machine still `starting`: wait and re-check. `failed`, `crashed`, or a check in `warning`/`critical` is not healthy.

   `min_machines_running` of 1 or more: at least that many machines are `started`. A fully stopped app is not healthy.

   `auto_stop_machines` without that minimum: a `stopped` machine is expected. Healthy then means no `failed`/`crashed` machines, and every machine that is `started` has passing checks. Do not start a stopped machine just to probe it.

   If not healthy: fetch recent logs without following, then report. Do not redeploy, roll back, or diagnose unless asked.

10. **Report** exactly one of:

   - **Released** — version, pull request into `main` if there was one, release pull request URL, merge SHA, workflow run URL, app name, hostname, machine count, check summary.
   - **Already promoted** — `production` already contained `main`, plus the health summary.
   - **No deploy** — merge SHA, and that the workflow did not start.
   - **Deploy failed** — run URL and the failed log excerpt.
   - **Unhealthy** — which machines or checks failed, plus the log excerpt.
   - **Stopped** — which step, and the output.
