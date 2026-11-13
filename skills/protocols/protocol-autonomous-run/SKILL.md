---
name: protocol-autonomous-run
description: Drive a long task to a checkable exit condition without stopping, reverting what doesn't help and logging every iteration.
disable-model-invocation: true
---

# Autonomous Run

A long task you drive to completion without stopping. You own the exit condition.

1. **State the exit condition as a checkable predicate** before the first iteration: tests green, repro fixed, all N PRs merged, pixel diff zero. Write it at the top of the run log.
2. **Pick the wake mechanism.** When there is an event to watch (CI, a merge, a deploy), run a background watcher that wakes you on it, with a long heartbeat as fallback. When there is none, use `/loop` on an interval sized to when the result is worth re-checking.
3. **Each iteration** makes the smallest change the evidence justifies, checks it against the predicate, commits if it advanced, and reverts if it didn't. A change that "might help" is reverted. Verify each unit before starting the next.
4. **Own the mid-run discoveries that serve the goal:** broken skills, related bugs, flaky checks, tooling failures. Fix each in its own commit or PR, then return to the predicate. Surface to the user only irreversible actions, product or preference calls no experiment can settle, and genuine dead ends.
5. **Log every iteration** in a run log outside the tree or gitignored: what changed, and whether the predicate moved.
6. **Stop when the predicate is met.** A plateau is not a stop: change approach and keep going. Report a genuine dead end instead of spinning. The predicate stays as written to the end.

**Report:** the exit condition, iterations run, what landed, what was reverted, the final predicate state, and the run log path.
