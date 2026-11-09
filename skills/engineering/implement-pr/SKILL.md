---
name: implement-pr
description: "Implement a piece of work based on a spec or set of tickets, then open a pull request."
disable-model-invocation: true
---

Implement the work described by the user in the spec or tickets.

Call the Skill tool with `tdd` where possible, at pre-agreed seams.

Run typechecking regularly, single test files regularly, and the full test suite once at the end.

Once done, call the Skill tool with `code-review` to review the work.

Fix every finding from that report.

Commit your work to the current branch.

Then create a pull request. If the current branch is the default branch, create a branch first. Call the Skill tool with `pr`.
