---
name: implement-spec
description: "Implement the result of /to-spec and /to-tickets in code."
disable-model-invocation: true
---

You have been provided a spec. This spec should have tickets associated with it, describing how to implement the spec.

The issue tracker should have been provided to you. If not, tell the user to run `/setup-michalkow-skills`.

The goal is the entire spec implemented on a single **integration branch**, with every ticket resolved the way the issue tracker closes work.

The tickets are not a list of steps. They are a **task graph** with blocking relationships between them. This means there is always a **frontier** of tickets which are ready to be grabbed.

Communication to and from subagents should be sparse. Communicate primarily through **context pointers**: to the spec, tickets, research notes, and previous commits. Don't duplicate information already available via pointers.

## Checkout

Pick a branch. Same completion criterion either way: the spec on one **integration branch**, tickets closed the tracker's way.

- **Single checkout** — a Cloud Agent, or a harness that cannot give a subagent its own git worktree. Implement the **frontier** sequentially on the integration branch.
- **Worktrees** — each implementer subagent gets its own git worktree. Run them in the background across the **frontier**.

## Steps

1. Read the spec and tickets to understand the task graph.

2. (optional) Use an **exploration subagent** to conduct any exploration required by the tickets - relevant codebase files or external documentation. Ensure the exploration subagent can save files - it should save its markdown notes in a directory outside the repo, accessible later in the run. This lets later work focus on implementation rather than exploration.

3. Create the integration branch. If the issue tracker closes work through PRs, or the user asks for one, open a draft PR after the first ticket lands on the integration branch (a branch with no commits ahead of main can't open one), marked as closing the spec and tickets.

4. Land every ticket on the integration branch. This step is done when every ticket has landed.

   **Single checkout.** On the integration branch, implement each ticket on the **frontier** in sequence. For each ticket: call the Skill tool with `tdd`; commit on this branch. When a ticket lands, take the next unblocked ticket.

   **Worktrees.** Use **implementer subagents** to implement each ticket, each in its own worktree on its own branch. Each implementer subagent:
   - confirms its worktree is based on the integration branch before starting, and resets onto it if not;
   - calls the Skill tool with `tdd` to build the ticket;
   - merges the integration branch tip into its own branch before reporting done

   Once an **implementer subagent** completes, merge its work to the integration branch with a **merger subagent**. If this changes the **frontier**, kick off more **implementer subagents**.

5. Once all tickets are complete, call the Skill tool with `code-review` on the integration branch. This step is done when the two-axis report sits under `## Standards` and `## Spec` in the user-visible transcript.

6. One **implementer subagent** then fixes every finding from that report.

7. Run Bugbot subagent on the integration branch. Fix all issues raised by the bugbot review in a single **implementer subagent**.

8. If a draft PR exists, mark it ready for review. Otherwise, resolve each ticket the way the issue tracker closes work, and report the integration branch.

9. If this run used worktrees, clean up all **implementer subagent** worktrees.
