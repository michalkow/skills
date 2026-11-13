---
name: principle-sequence-verifiable-units
description: Order commits and PRs so the sequence proves the change. Use when shaping commits, stacking PRs, or rebasing work into reviewable history.
---

# Sequence Verifiable Units

Order the commits so the history argues for the change. Each commit lands on its own, passes the checks, and a reviewer can replay the sequence and watch it go red, then green.

The canonical orders:

- the failing test, then the fix that turns it green;
- the subtraction, then the reshape;
- the baseline measurement, then the treatment;
- the scaffold, then the feature.

Rebase onto a clean trunk first, so every check measures against the real baseline.

Done when each commit passes the checks on its own and the order reads as the argument.
