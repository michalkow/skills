---
name: protocol-session-pickup
description: Resume another agent's in-flight work from a handoff file, transcript, or pushed branch without redoing what's done.
disable-model-invocation: true
---

# Session Pickup

Resume or take over a prior agent's work. The prior trail is authoritative: build on it rather than re-deriving it. `/handoff` writes the kind of file this reads.

1. **Locate the trail:** a handoff document, a transcript, a run log or decision log, or a pushed branch. For a transcript, read the last messages first, then scan back for the decision points. Parse a long transcript in a subagent and keep only the reduced timeline.
2. **Reconstruct the state:** the branch and worktree, what already landed (`git log`, `git diff` against the base), the open todos, and the decisions made and why.
3. **Diff done against pending, and name the resume point.** Completed work and finished repros stay as they are: the trail is their record.
4. **Pick the verdict and route the rest:** continue the work, ship a finished recommendation, ratify or override a prior conclusion, or write a postmortem of a failed run. Continue under whichever skill fits what remains.
5. **Before reporting done, verify the inherited claims against the original goal** on the real artifact (`principle-prove-it-works`). A prior agent's "done" is a claim, not proof.

**Report:** where the prior agent stopped, what you inherited and what you redid (ideally nothing), the resume point, and the outcome.
