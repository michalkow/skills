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

Commit your work to the current branch.

Then create a pull request. If the current branch is the default branch, create a branch first. Call the Skill tool with `pr`.

If this repo uses changeset, call the Skill tool with `changeset-add`.