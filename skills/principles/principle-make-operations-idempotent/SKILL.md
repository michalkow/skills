---
name: principle-make-operations-idempotent
description: Make operations converge to the same end state however many times they run or wherever the last run stopped. Use when writing a script, job, migration, CLI command, setup step, or processing loop that can crash, restart, or retry.
---

# Make Operations Idempotent

Derive each step from the state that exists, not from what the previous run meant to do. Read the current state, compare it to the goal, and apply only the difference. A repeat then finds nothing left to do.

**Leftovers must be judgeable.** Anything a run leaves behind (a lock, a temp file, a half-written record, a claimed job) must be recognizable as stale by the next run. Judge staleness by evidence that holds wherever the previous run stopped, not only in the common case:

- Write to a temp path and rename it into place.
- Compare artifacts by content, not by creation order.
- Record a lock's owner and check whether the owner is alive, rather than trusting the lock's age.

**The test**

1. What happens if this runs twice in a row?
2. What happens if the previous run crashed at each possible point?
3. Does every case converge to the same end state?

If any answer is "it depends on what was left behind", add a reconciliation step.
