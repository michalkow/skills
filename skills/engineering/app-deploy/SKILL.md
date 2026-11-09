---
name: app-deploy
description: Pull main, deploy the app to Fly.io from the repo root, then confirm it is running without issues.
disable-model-invocation: true
---

# App Deploy

Deploy is not done when `pnpm app:deploy` exits 0. It is done when Fly reports the app **healthy**.

The tree that goes up is **main**, after `git pull`. Typing `/app-deploy` is the go-ahead. Do not ask again.

## Steps

1. **Main.** Working directory is the repo root — the `package.json` that defines `app:deploy`. Current branch is `main`. If not: `git checkout main`. Then `git pull`. Needs network. Done when `git pull` exits 0 — already up to date, or a fast-forward. Then continue. Non-zero: show the output and stop. A dirty tree that blocks checkout or pull: stop and name it. Do not stash, merge, rebase, or deploy from another branch.

2. **Preconditions.** `fly` (or `flyctl`) is on `PATH`, and `fly auth whoami` succeeds. `apps/shared/fly.toml` exists. Done when both hold. Stop and name whichever is missing; do not install `fly`, log in, or create an app.

3. **Deploy.** From the repo root, run `pnpm app:deploy`. Wait for it — deploys take minutes, and this needs network. Done when the command exits 0. Non-zero: show the output and stop. Do not health-check a failed deploy. Do not substitute `fly deploy`.

4. **Health check.** Use `fly` against the app `apps/shared/fly.toml` names (`-c apps/shared/fly.toml`, or `-a` from that file's `app` field). Unfamiliar flag → `fly <cmd> --help`, never invent one. Run:

   - `fly status -c apps/shared/fly.toml`
   - `fly checks list -c apps/shared/fly.toml`
   - `fly machine list -c apps/shared/fly.toml`

   **Healthy** means every listed machine is `started`, and every health check is `passing`. No checks configured is fine if every machine is `started`. A machine still `starting` — wait and re-check. `failed`, `crashed`, or a check in `warning`/`critical` is not healthy.

   If `apps/shared/fly.toml` has `auto_stop_machines` (or machines scale to zero by design), a `stopped` machine is expected. Healthy then means: no `failed`/`crashed` machines, and every machine that *is* `started` has passing checks. Do not start a stopped machine just to probe it.

   If not healthy: fetch recent logs without following, then report. Do not redeploy, roll back, or diagnose unless asked.

5. **Report** exactly one of:

   - **Healthy** — app name, hostname, machine count, check summary, `main` SHA.
   - **Deploy failed** — the command's output.
   - **Unhealthy** — which machines or checks failed, plus the log excerpt.
