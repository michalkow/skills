---
name: protocol-trace-forensics
description: Diagnose a captured profile, trace, spindump, or heap snapshot by loading it into a queryable form and narrowing to the cause in source.
disable-model-invocation: true
---

# Trace Forensics

The capture already exists. It is a fixed dataset: read it, don't re-run it. The deliverable is a cited diagnosis, not a fix.

1. **Identify the format** (cpuprofile, Chrome trace `.json` or `.json.gz`, pprof, spindump, heap snapshot) and the tool that parses it. Parse a large artifact in a subagent and bring back only the reduced finding.
2. **Load it into a queryable shape before reading** (`principle-build-the-lever`). Dump it into SQLite, one row per sample, frame, event, or node. Query it rather than scrolling it.
3. **Narrow to the cause.**
   - CPU: query the frames that hold the most self and total time, then walk the call tree to the hot path.
   - Leak: follow the retainer chain from the leaked object to a GC root.
   - Spindump or hang: find the thread stuck on-CPU or blocked, and its wait reason.
4. **Attribute to source.** Map the hot frame to file, symbol, and line through the artifact's own symbols or source maps. A frame with no source location is not a diagnosis yet. Resolve the symbols, or say plainly that the artifact doesn't carry them.
5. **Confirm with a paired capture** when you have one: diff before against after. Without one, call the finding the strongest hypothesis the artifact supports, not a confirmed cause.

Stop at the diagnosis. Once the cause is known, the fix belongs to `/diagnosing-bugs`, or to `/protocol-hillclimb` when there is a metric to drive.

**Report:** the artifact and its format, the reduced finding, the source location, the paths to the artifact and the SQLite file, and whether a paired capture confirmed it.
