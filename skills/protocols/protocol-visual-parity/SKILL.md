---
name: protocol-visual-parity
description: Migrate or match UI with pixel-exact equivalence, verified by image diff against a baseline that stays fixed.
disable-model-invocation: true
---

# Visual Parity

Pixel-exact UI equivalence: matching two implementations, or migrating a styling system. The baseline is the spec. Equivalence is proven by image diff, not by eye.

1. **Build the baseline first.** A visual regression harness that screenshots the current component in every state, plus the target when matching two implementations. No baseline, no parity claim. This blocks everything else.
2. **Freeze the harness and the baseline.** Both stay read-only for the whole run. If the baseline looks wrong, stop and ask the user. Component structure changes only as the migration requires, never to make a diff pass.
3. **Migrate shared primitives first** as a blocking phase, then one component at a time. Components can run in parallel, one owner per component, each in its own worktree.
4. **Verify each component by image diff** on the real surface: the project's verification skill, or a headless browser script. A nonzero diff is a fail. Investigate the pixel delta and iterate until the diff is zero.
5. **Ship per component or per safe batch.**

**Report:** the components migrated, the diff result for each, the harness location, and what's left.
