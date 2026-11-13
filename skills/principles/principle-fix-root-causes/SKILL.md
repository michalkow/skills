---
name: principle-fix-root-causes
description: Decide whether a guard is a fix or a cover-up, and fix where the bad state came from. Use when a fix adds a null check, retry, fallback, clamp, try/catch, or default to make a symptom go away.
---

# Fix Root Causes

`/diagnosing-bugs` owns finding the bug. This decides where the fix goes.

- **Ask whether the state is legitimate.** If the system may be in the state that triggered the symptom, the code that broke on it is the root cause, and handling the state there is the fix. If the state should never exist, a check where it broke hides the bug: find what produced the state and fix that. Guards, retries, swallowed errors, clamped values, and defaults are the usual ways a bug gets hidden.
- **After a restart, suspect persisted state first.** When something fails only after a restart, look at config files, caches, lock files, and serialized state before the code.
- **Fix the pattern, not the instance.** Search for every place with the same fault and fix them all.
- **Leave the signal behind.** If the deciding fact took a deep dig to find, propose the cheap, always-on signal that would have shown it at first look: a log line, an assertion, a metric.

Done when you can say whether the triggering state is legitimate, the fix sits where that answer puts it, and every other instance of the pattern is fixed or listed.
