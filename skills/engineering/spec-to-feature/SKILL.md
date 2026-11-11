---
name: spec-to-feature
description: Creates spec, tickets and implements.
disable-model-invocation: true
---

You have to create spec then tickets, from existing thread.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-michalkow-skills`.

The goal is the entire spec implemented in the **git worktree** this skill was started in, with every ticket resolved the way the issue tracker closes work.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

Communication to and from subagents should be sparse. Communicate primarily through **context pointers**: to the spec, tickets, research notes, and previous commits. Don't duplicate information already available via pointers.

## Checkout

The git worktree is already set up before this skill runs. Stay in that worktree for the whole run. Do not create a branch, check out another branch, or add another worktree. Implement the **frontier** sequentially in the current checkout.

## Steps

1. Call the Skill tool for `auto-spec` to create spec in issue tracker.

2. Call the Skill tool for `auto-tickets` with the spec created in the previous step, to create the tickets.

3. Read the spec and tickets to understand the task graph.

4. (optional) Use an **exploration subagent** to conduct any exploration required by the tickets - relevant codebase files or external documentation. Ensure the exploration subagent can save files - it should save its markdown notes in a directory outside the repo, accessible later in the run. This lets later work focus on implementation rather than exploration.

5. Keep working in the current worktree. If the issue tracker closes work through PRs, or the user asks for one, open a draft PR from the branch already checked out here, after the first ticket lands (a branch with no commits ahead of its base can't open one), marked as closing the spec and tickets.

6. Land every ticket in this worktree. This step is done when every ticket has landed.

   Implement each ticket on the **frontier** in sequence, still in this worktree. For each ticket: call the Skill tool with `tdd`; commit here. When a ticket lands, take the next unblocked ticket.

7. Once all tickets are complete, call the Skill tool with `code-review` on the commits in this worktree. This step is done when the two-axis report sits under `## Standards` and `## Spec` in the user-visible transcript.

8. One **implementer subagent** then fixes every finding from that report, in this same worktree.

9. Run Bugbot subagent on the commits in this worktree. Fix all issues raised by the bugbot review in a single **implementer subagent**, still in this worktree.

10. If this repo uses changeset, call the Skill tool with `changeset-add`, patch is the default, pass minor if introducing breaking changes.

11. If a draft PR exists, mark it ready for review. Otherwise, resolve each ticket the way the issue tracker closes work, then call the Skill tool with `pr`.
