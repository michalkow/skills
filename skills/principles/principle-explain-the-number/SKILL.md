---
name: principle-explain-the-number
description: Find what limits a measured number and rule out what else it could be measuring. Use before running a benchmark, and before reporting or acting on a speedup, regression, throughput, latency, or eval score.
---

# Explain the Number

A number you cannot explain is a number you do not understand yet.

**Before the run.** Write down the result that would change a decision, and the noise floor. When the run-to-run spread is larger than the effect, the result is noise: say so and stop.

**After the run.**

- **Ask "why not double?"** Name the resource or code path that bounds the result: a core, a lock, the disk, the network, the load generator itself. Get it from a profile or from system counters taken during the run, then map it to source. Reading the code gives a guess, not a limiter.
- **List what else the number could be measuring, and rule out each one with evidence.** The usual suspects: errors that complete fast, skipped or cached work, code that never ran, a side left on default settings, noise, and a piece too small to matter end to end.
- **Put the local effect next to the end-to-end one.** A 3x speedup on a step that takes 2% of the request is a 1% win.
- **Keep the evidence with the number.** The run count, the spread, and the named limiter go wherever the number goes: the PR, the notes, the report.

For an eval score, ask the same of the trials: did every run actually do the task, does the gap hold across trials and models, and does the scenario matter.

Done when the number ships with its run count, its spread, its named limiter, and each alternative explanation ruled out.
