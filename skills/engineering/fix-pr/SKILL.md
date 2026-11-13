---
name: fix-pr
description: "Fix the problem the user described, then open a pull request."
disable-model-invocation: true
---

Fix the problem the user described at its root cause, not where the symptom surfaced.

1. Reproduce it and confirm you see the user's exact symptom.
2. Find the root cause: trace the symptom back to the first place the system did something it should not, or failed to handle a state it should. When the cause is not obvious from the repro, call the Skill tool with `diagnosing-bugs` and run its loop.
3. Call the Skill tool with `principle-fix-root-causes`, and fix where its answer puts the fix. Make the smallest change at that place.
4. Confirm the original repro no longer reproduces. Where a test seam reaches the bug, add a regression test and commit it before the fix.
5. State the root cause in the commit message and the PR body.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, call the Skill tool with `code-review` to review the work.

Fix every finding from that report. Call the Skill tool with `principle-fix-root-causes` before the first fix.

If this repo uses Changesets, call the Skill tool with `changeset-add`; patch is the default, minor for breaking changes.

Resume this workflow after each nested skill returns. A nested skill's instruction to stop or leave files uncommitted describes its handoff; include its task-related outputs in the final delivery.

Inspect `git status --short`, including untracked files. Commit all task-related changes, including review fixes, documentation, generated artifacts, and release metadata. Preserve unrelated pre-existing changes. If the current branch is the default branch, create a branch before committing.

Push all commits. Call the Skill tool with `pr` for the body, then create or update a draft pull request from the current branch.

Verify the PR's remote head matches local `HEAD` and its diff includes every task-related change. Confirm no task-related changes remain outside the PR. Only then mark the PR ready and report completion.