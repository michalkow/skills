## What it does

`fix-posthog-issue` takes a GitHub issue that PostHog error tracking filed and carries it to a fix. It works out which **environment** the error came from, finds the **root cause**, and opens a pull request from that environment's branch. A **severe** production error that passes every safety gate is merged and deployed by the agent itself. Everything else waits at a ready PR for you.

It is built to run unattended. A webhook (for example a T3 Code webhook on new issues) hands the issue to an [agent](https://michalkow.github.io/skills/dictionary/agent) with an instruction to run this skill. The issue, the PRs, and the agent's comment on the issue are the whole record.

## When to reach for it

You invoke this by naming `/fix-posthog-issue` in the webhook's instructions or by typing it. The agent won't reach for it on its own. Invoking it is the go-ahead for everything, including the production merge when the gates allow it.

| The work is… | Reach for |
| --- | --- |
| An error PostHog filed as a GitHub issue | `/fix-posthog-issue` |
| A problem you describe yourself, to ship as a PR | [fix-pr](https://michalkow.github.io/skills/fix-pr) |
| A hard bug you are debugging interactively | [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs) |
| Shipping everything on `main` to production | [push-to-production](https://michalkow.github.io/skills/push-to-production) |

## Prerequisites

`gh` is authenticated for the repo, and `fly` for the production health check. The repo follows the m5kdev layout: a `main` branch deployed to development, a `production` branch deployed to production, and `apps/shared/fly.<environment>.toml`. The PostHog MCP server makes the environment and severity evidence sharper but is optional. `docs/agents/triage-labels.md` names the `ready-for-human` label.

## The environment decides the branch

| Environment | Base branch | PRs it opens | Merged by the agent |
| --- | --- | --- | --- |
| development | `main` | `fix/<issue>-<slug>` into `main` | Never |
| production | `production` | `hotfix/<issue>-<slug>` into `production`, plus a backport into `main` | Only when severe and every gate holds |
| unknown | `main` | as development | Never |

The environment comes from the first signal that answers: an `environment` property on the error, the host in Current URL matched to the Fly app, or the `deployment.environment` attribute on logs and traces near the error.

## Severity and the merge gates

Only a production error can be severe: a core flow broken, data lost or corrupted, security, auth, or payment logic failing, or an error still reaching many users. Thin evidence means not severe.

A severe hotfix merges only when the repo accepts `hotfix/*` branches into `production`, CI is green, code-review left nothing open, the regression test went red before the fix and green after, and the change is a two-way door (no migration, no schema change, nothing hard to roll back). After the merge, the agent watches the deploy and checks Fly health. It never rolls back or redeploys.

## Common questions

**Why doesn't a severe fix merge in my app?**

The deploy in m5kdev apps refuses a `production` tree that doesn't exist on `main` (ADR-0036). Until the app runs an m5kdev version that accepts hotfix branches, the gate fails on purpose: a merged hotfix would never deploy. The run leaves the PR ready and says so.

**Why does the production PR say `Refs` and not `Fixes`?**

GitHub closes issues only from merges into the default branch. The backport into `main` carries `Fixes`, so the issue closes when the fix reaches `main`.

**What happens to noise, like a browser extension error?**

The agent posts its analysis on the issue, labels it `ready-for-human`, and opens no PR. Closing it is your call.

## It's working if

- Every run ends with exactly one outcome on the issue: Not actionable, PR ready, Fixed in production, Deploy failed, Unhealthy, Already handled, or Stopped.
- Each PR names the environment and how it was determined, the root cause, and the severity verdict.
- Production fixes always come with a backport PR into `main`.
- A merge into `production` happens only for a severe error, and the comment says which gates it passed.

## Where it fits

`fix-posthog-issue` is a **standalone** on the "something's broken" on-ramp, for reports that arrive from error tracking rather than from you. It reuses [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs), [tdd](https://michalkow.github.io/skills/tdd), [code-review](https://michalkow.github.io/skills/code-review), and [pr](https://michalkow.github.io/skills/pr). [ask-michal](https://michalkow.github.io/skills/ask-michal) is the router over the whole set.
