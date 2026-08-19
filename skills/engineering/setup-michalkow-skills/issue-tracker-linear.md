# Issue tracker: Linear

Issues and specs for this repo live as Linear issues. Use the **Cursor Linear plugin** (Linear MCP) for all operations.

**Default team:** `<team name or key from list_teams>` _(filled by `/setup-michalkow-skills` — replace if wrong)_

Identify issues by Linear identifier (`TEAM-123`), never a bare `#42`.

## Conventions

- **Create an issue**: `save_issue` with `title`, `team` (the default team above), and `description`. Omit `id` — that creates. Resolve the team with `list_teams` if the default-team line is still a placeholder.
- **Read an issue**: `get_issue` with `id` set to the identifier and `includeRelations: true`, then `list_comments` with `issueId` set to the same identifier.
- **List issues**: `list_issues` with `team`, and optional `label`, `state`, or `parentId` filters as needed.
- **Comment on an issue**: `save_comment` with `issueId` and `body`.
- **Apply / remove labels**: `save_issue` with `id` and `labels` (label names). Create a missing label first with `create_issue_label` (use `list_issue_labels` to check). To remove a label, pass the full desired label set without it — there is no separate unlabel tool.
- **Close**: `save_issue` with `id` and `state` set to a completed workflow state (`Done`, or the team's equivalent from `list_issue_statuses`). Linear has no `close` verb. Post any closing explanation with `save_comment` first when the skill asks for one.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` only if this repo also treats external git-host PRs as feature requests in `/triage`; leave `no` for Linear-only tracking.)_

Linear does not host pull requests. Code review and PR operations stay on the git host (`gh` / `glab`); do not treat Linear issues as a PR queue.

## When a skill says "publish to the issue tracker"

Create a Linear issue with `save_issue`.

## When a skill says "fetch the relevant ticket"

Run `get_issue` with `includeRelations: true`, then `list_comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `save_issue` with `title`, `team`, `description`, and `labels: ["wayfinder:map"]`.
- **Child ticket**: a Linear **sub-issue** of the map — `save_issue` with `parentId` set to the map's identifier, plus labels `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: Linear's **native blocked-by relation** — the canonical, UI-visible representation. Add it with `save_issue` on the child: `blockedBy: ["TEAM-n"]` (append-only; existing relations are not removed). A ticket is unblocked when every blocker is in a completed state. Only if relations fail, fall back to a `Blocked by: TEAM-n, TEAM-n` line at the top of the description.
- **Frontier query**: `list_issues` with `parentId` set to the map's identifier, drop any with an open blocker (`get_issue` / `includeRelations: true` shows `blockedBy` still open) or an assignee; first in map order wins.
- **Claim**: `save_issue` with `id` and `assignee: "me"` — the session's first write.
- **Resolve**: `save_comment` with the answer, then `save_issue` with a completed `state`, then append a context pointer (gist + link) to the map's Decisions-so-far via `save_issue` on the map's `description`.
