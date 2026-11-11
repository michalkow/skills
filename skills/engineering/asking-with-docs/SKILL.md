---
name: asking-with-docs
description: A short alignment pass on a change in a repo. Check the request against the docs, code, and ADRs, ask only the gaps, record what settles, and stop.
disable-model-invocation: true
---

The change is already describable. Check it against this repo, ask only the gaps, and leave a paper trail for whatever actually settled. The product of this pass is agreement.

Call the Skill tool with "asking" and run that pass. Before the round, read this repo's glossary, ADRs, docs, and the code the request touches — those are the sources a contradiction is judged against.

Call the Skill tool with "domain-modeling" for the paper trail. Record a term when one gets resolved, and offer an ADR only when its three gates all hold. Skip the scenario stress-test: this pass does not invent edge cases to interview. If the round settled nothing that belongs in `GLOSSARY.md` or an ADR, write nothing.

This pass is done when the change is restated and any glossary term or ADR the round earned is written. Asking's "continue into the work" clause does not apply: stop on that restatement even if the original request also asked for the build.
