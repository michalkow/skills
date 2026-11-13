---
name: principle-prove-it-works
description: Verify against the real artifact before calling work done. Use before reporting a task complete, especially when the evidence is a type check, a passing build, a subagent's report, or a cached or derived value.
---

# Prove It Works

Check the real thing, not a proxy.

- Run the feature, read the actual value, look at the actual output. "It compiles", file timestamps, cached screenshots, and a subagent's own report are proxies.
- Check a process's liveness directly, not through state derived from it.
- When a check fails unexpectedly, suspect the observation method before the system: the wrong port, a stale build, a cache, the wrong environment.
- Prefer a script that reruns the comparison over a one-time look, and leave its output where the reviewer can see it.

When the project has a verification skill (`/create-verification-skill` makes one), drive the change through it.

Done when your report names the real artifact you checked and what you saw.
