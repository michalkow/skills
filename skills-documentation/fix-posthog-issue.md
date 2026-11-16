## What it does

`fix-posthog-issue` takes a GitHub issue that PostHog error tracking filed and carries it to a fix. It works out which **environment** the error came from, finds the **root cause**, and opens a pull request from that environment's branch. A **severe** production error that passes every safety gate is merged and deployed by the agent itself. Everything else waits at a ready PR for you.

It is built to run unattended. A webhook (for example a T3 Code webhook on new issues) hands the issue to an [agent](https://michalkow.github.io/skills/dictionary/agent) with an instruction to run this skill. The issue, the PRs, and the agent's comment on the issue are the whole record.

## When to reach for it

A T3 Code webhook task invokes it with `$fix-posthog-issue` at the start of its prompt (see below). The agent won't reach for it on its own. Invoking it is the go-ahead for everything, including the production merge when the gates allow it.

| The work is… | Reach for |
| --- | --- |
| An error PostHog filed as a GitHub issue | `$fix-posthog-issue` |
| A problem you describe yourself, to ship as a PR | [fix-pr](https://michalkow.github.io/skills/fix-pr) |
| A hard bug you are debugging interactively | [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs) |
| Shipping everything on `main` to production | [push-to-production](https://michalkow.github.io/skills/push-to-production) |

## Prerequisites

`gh` is authenticated for the repo, and `fly` for the domain lookup and the production health check. The repo follows the m5kdev layout: a `main` branch deployed to development, a `production` branch deployed to production, and `apps/shared/fly.<environment>.toml`. The agent needs the PostHog MCP server. The GitHub issue holds only the error message, browser, OS, and a PostHog link. The stack trace, Current URL, occurrence counts, and any custom properties live in PostHog. Without that access, every error is treated as development: the run still opens a PR but never merges. `docs/agents/triage-labels.md` names the `ready-for-human` label.

## Setting up the T3 Code task

One scheduled task per app repo, triggered by that repo's GitHub webhook. T3 Code passes the agent only the request fields the prompt names, through `{{body.path}}`, `{{headers.name}}`, and `{{query.name}}` templates.

| Field | Value |
| --- | --- |
| Runs on | The machine where `gh` and `fly` are signed in |
| Destination | New thread each run |
| Project | The app's project, for example `horecaai` |
| Workspace | Create a new worktree |
| Base branch | From main (remote). The skill makes its own branch, from `origin/production` for production errors |
| Schedule | On webhook |
| Skip requests older than | Empty, so errors filed while the machine was offline still run |
| Filters | `headers.x-github-event` equals `issues`<br>`body.action` equals `opened`<br>`body.issue.user.login` equals `posthog[bot]`<br>`body.repository.full_name` equals `<owner>/<repo>`<br>`body.issue.title` not equals `Error: PostHog test alert` |
| Duplicate request key | `{{headers.x-github-delivery}}` |
| Coalesce key | Empty. Each issue is its own run |
| Require signature | On. Header `x-hub-signature-256`, prefix `sha256=`, hex, with the same secret as the GitHub webhook |

On GitHub, add the webhook under the repo's **Settings → Webhooks**: the task's URL as the payload URL, content type `application/json`, the shared secret, and only the **Issues** event.

PostHog files its issues as `posthog[bot]` with no labels, and a human-opened issue must never start an unattended fix.

### Filters check the source, the skill checks the content

Filters compare whole fields (equals, not equals, starts with, is one of, exists). They have no "contains". So they settle everything a single field answers, and drop requests before any agent starts:

- **Event and action.** Only a newly opened issue, never an edit, close, label, or comment.
- **Author and repo.** Only issues PostHog filed, in this repo.
- **The test alert.** PostHog's "send test alert" button files `Error: PostHog test alert`, which the title filter drops.

Whether the issue describes an error needs its body read: an error-tracking issue links to `posthog.com/project/<id>/error-tracking/...`. No filter can see that, so the skill's **step 0** checks it, along with the author and the test alert again in case a filter is ever loosened. A failed check stops the run with no comment, label, branch, or PR. The prompt's second line makes that gate the agent's first move.

### The prompt

```text
$fix-posthog-issue {{body.issue.html_url}}

PostHog error tracking opened issue #{{body.issue.number}} in {{body.repository.full_name}}.
First confirm it is a PostHog error-tracking issue (the skill's step 0). If it is not, stop and change nothing.
Otherwise run the skill on that issue from start to finish. Nobody is watching this run,
so don't stop to ask questions; record every decision on the issue and in the PRs.
```

The prompt starts with `$fix-posthog-issue` because the skill is user-invoked: it loads only when the prompt names it, the way you would type it.

It passes the issue's URL, number, and repository, and nothing the error itself wrote. The title and body hold the error message from an end user's session. The agent reads them with `gh` and treats them as data. Templating them into the prompt would turn them into instructions.

Keep the prompt this short. The procedure and the merge gates live in the skill, and a copy in the prompt drifts out of date.

## The environment decides the branch

| Environment | Base branch | PRs it opens | Merged by the agent |
| --- | --- | --- | --- |
| development | `main` | `fix/<issue>-<slug>` into `main` | Never |
| production | `production` | `hotfix/<issue>-<slug>` into `production`, plus a backport into `main` | Only when severe and every gate holds |
| unknown | `main` | as development | Never |

The environment comes from the first signal that answers. The app may have added it as a custom property on the error, often named `environment`, with a value of `production` or `development`. That property is optional. When it is absent, or the events disagree, the host in the error's URL is matched to the production and development domains: each deployment's public URL (`VITE_APP_URL`), its `<app>.fly.dev` host, and any custom hostname on that Fly app. A server error with no URL uses `deployment.environment` on logs and traces near the error.

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
