---
name: protocol-hillclimb
description: Improve one metric toward a target in a loop of one change, one measurement, keep or revert, with a decision log.
disable-model-invocation: true
---

# Hillclimb

Sustained improvement of one measurable thing against a target. A one-off fix is `/diagnosing-bugs`. This is the loop.

The core discipline is one change, one measurement, keep or revert. Each change is measured alone, and a win is claimed only from the harness.

1. **Ground the workload.** Learn the architecture of the target. Name the workload dimensions that can move the result (data size, history, state, concurrency) and pick a case that reproduces the user's complaint. If no case reproduces it, fix the repro first. Then fix one metric, the direction that counts as better, and a stop predicate that pairs a target with a minimum number of attempts, such as "at least 50% better than baseline and at least 10 iterations", so a lucky early win can't end the run. Use the user's numbers when given. Otherwise propose them and get the user's agreement.
2. **Build the harness, prove it, freeze it** (`principle-build-the-lever`). One repeatable command prints the metric as a median of N runs, plus its error count and a count of the work done. Run contrasting workloads and confirm the target case shows the symptom while easier cases separate as expected. If the harness cannot tell them apart, revise the workload or the metric. Vet it with `principle-explain-the-number`. From then on the harness stays frozen. Record the baseline and a green run of the regression gate (the tests that must keep passing).
3. **Open the decision log.** A `decision.tsv` outside the tree or gitignored, one row per attempt: id, hypothesis, change, before, after, delta, tests, verdict (kept or reverted), note. Read it before each attempt.
4. **Ground each hypothesis in a mechanism** from step 1: "defer X off the boot path because it blocks first paint", not "try memoizing something". For performance, try the cheapest category first: don't do it, do it once, do less, do it later, do it when nobody is waiting, do it concurrently, do it cheaper.
5. **Loop, one hypothesis per iteration.**
   - Make the change, or hand it to a subagent with a tight scope and review its diff. Independent hypotheses can run in parallel, each in its own worktree.
   - Measure before and after with the frozen harness, and run the regression gate.
   - Keep the change only when the metric moves past noise and the gate stays green. Otherwise revert it in full. A change that "might help" is reverted.
   - Make one commit per kept change, staging only the files you changed. Log the row either way.
6. **Push past the first plateau.** After several rejects in a row, switch category, combine near-misses, re-read the source, or try something more radical. Correctness and simplicity outrank the number: revert a win that breaks behavior, and keep a simplification that holds the number.
7. **Stop** when the predicate is met, or when only marginal ideas remain and every cheap one has been tried. The predicate stays as written to the end. If you are stuck, say so and show the log.

**Report:** the metric and target, baseline to final with the percent delta, iterations run (kept vs reverted), each kept change on one line, the `decision.tsv` path, and the next idea you would try.
