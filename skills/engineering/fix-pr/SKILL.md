---
name: fix-pr
description: "Fix the problem the user described, then open a pull request."
disable-model-invocation: true
---

Fix the problem the user described.

Reproduce it, apply the smallest change that makes it go away, and confirm it is gone.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, call the Skill tool with `code-review` to review the work.

Fix every finding from that report.

If this repo uses Changesets, call the Skill tool with `changeset-add`; patch is the default, minor for breaking changes.

Resume this workflow after each nested skill returns. A nested skill's instruction to stop or leave files uncommitted describes its handoff; include its task-related outputs in the final delivery.

Inspect `git status --short`, including untracked files. Commit all task-related changes, including review fixes, documentation, generated artifacts, and release metadata. Preserve unrelated pre-existing changes. If the current branch is the default branch, create a branch before committing.

Push all commits. Call the Skill tool with `pr` for the body, then create or update a draft pull request from the current branch.

Verify the PR's remote head matches local `HEAD` and its diff includes every task-related change. Confirm no task-related changes remain outside the PR. Only then mark the PR ready and report completion.