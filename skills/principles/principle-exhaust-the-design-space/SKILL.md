---
name: principle-exhaust-the-design-space
description: Build two or three competing versions and compare them before committing. Use when a UI interaction or architectural decision has no precedent in the codebase, or when the right answer depends on how it feels to use.
---

# Exhaust the Design Space

When a decision has no precedent in the codebase, your first idea is a sample of one. Build two or three genuinely different versions and compare them before you commit.

- For UI or interaction, build the variants behind one switcher and compare them running: `/prototype`.
- For a module's interface, generate radically different designs in parallel: `/codebase-design`'s design-it-twice.
- Make the variants differ in their core idea, not in details.

Then recommend one, with the trade-off that decided it.

When the codebase already has a precedent, follow it.
