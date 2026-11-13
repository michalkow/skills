---
name: principle-minimize-reader-load
description: Cut the layers a reader traces and the state a reader holds in their head. Use when adding a wrapper, adapter, layer, field, or module-level state, or when reviewing code that is hard to follow.
---

# Minimize Reader Load

Reader load has two independent axes: **layers to trace** between a question and its answer, and **state to hold** in your head while reading. A flat file with 50 globals is as hard to follow as a six-layer adapter stack.

- **Collapse pass-through layers.** A wrapper with one caller, an adapter with one implementation, a layer that repeats the methods and arguments of the one below it: inline it. `/codebase-design`'s deletion test settles borderline cases.
- **Shrink state scope.** Return values over mutation, locals over fields, fields over module state, module state over globals. Derive a value instead of syncing a copy of it.
- **Name an invariant once, at the boundary,** not in every consumer.
- Before adding a layer or a piece of state, check that it removes at least as much reader load somewhere else.

**The 30-second test:** can a new reader answer "where does X come from?" and "what can change X?" in under 30 seconds? If not, cut layers or cut state.
