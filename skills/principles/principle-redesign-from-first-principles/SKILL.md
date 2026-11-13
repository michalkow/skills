---
name: principle-redesign-from-first-principles
description: Redesign as if a new requirement had been there from the start, instead of bolting it on. Use when a new requirement breaks an assumption the current design rests on.
---

# Redesign From First Principles

When a new requirement breaks an assumption the design was built on, a bolted-on change leaves the old assumption in the code and the new one in the patches. Instead:

1. Read every affected file and name the assumption that changed.
2. Ask: if we were writing this from scratch with this requirement, what would we build?
3. Carry the change through every reference: types, names, docs, examples, tests.
4. Design the whole, then deliver it in small steps.

**Versus the smallest diff.** The smallest change that solves the problem stays the default. This principle applies only when the requirement breaks an assumption the design rests on. A requirement that fits the current shape gets the small diff. When it is unclear which case you are in, say which one you chose and why.

Done when no code still expresses the old assumption.
