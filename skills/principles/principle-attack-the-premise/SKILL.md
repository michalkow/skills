---
name: principle-attack-the-premise
description: Test the shared assumption before trying another fix. Use when two or more fixes that rest on the same premise have failed the same check.
---

# Attack the Premise

Two failed fixes that share a premise are evidence against the premise, not against the fixes. Stop fixing and test the premise.

1. **Write the premise down.** One sentence that every failed fix assumed.
2. **Test it directly.** Find an observation that would come out differently if the premise were false, and make it. Look at how the failures are distributed (which cases, which runs, which inputs), not only at how large they are. Make the check rerunnable.
3. **Follow the evidence.**
   - Refuted: the cause is elsewhere. Look for what the failures share that the premise did not predict.
   - Confirmed: ask the next "why". The earlier fixes treated a consequence, so the cause sits one level down.
4. **Remove the condition rather than compensating for it.** If one part always lands on the losing side, change what puts it there. A mechanism that cleans up after it leaves the cause in place and adds work on every run.

Done when the premise is written down and an observation has confirmed or refuted it. The next fix starts only after that.
