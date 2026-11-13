# Principles

Engineering principles adapted from [pstack](https://github.com/cursor/plugins/tree/6e359ce0aba9e927914d8a940510aa2ef66a8f23/pstack/skills) by Lauren Tan (MIT, see [PSTACK-LICENSE](./PSTACK-LICENSE)). Each one is cut down to the lines that change what a frontier model does by default: sharp triggers, preferences that differ from the model's default, and guards against gaming a check. General knowledge the model already has is left out.

Each is model-invoked: its description names the moment it applies, so the agent reaches for it mid-task. Not promoted in the plugin, no docs pages.

- **[principle-attack-the-premise](./principle-attack-the-premise/SKILL.md)** — Two fixes on one premise failed the same check: write the premise down and test it before the next fix.
- **[principle-explain-the-number](./principle-explain-the-number/SKILL.md)** — Before trusting a measured number: name its limiter, rule out what else it could be measuring, keep run count and spread with it.
- **[principle-migrate-then-delete](./principle-migrate-then-delete/SKILL.md)** — Migrate every caller and delete the old internal API in the same plan. No shim left behind.
- **[principle-build-the-lever](./principle-build-the-lever/SKILL.md)** — Script, codemod, or generator instead of hand edits, so the work is rerunnable and checkable.
- **[principle-fix-root-causes](./principle-fix-root-causes/SKILL.md)** — A guard is a fix only when the state it handles is legitimate. Builds on `/diagnosing-bugs`.
- **[principle-model-the-domain](./principle-model-the-domain/SKILL.md)** — Warning signs that a conditional chain wants to be a structure.
- **[principle-boundary-discipline](./principle-boundary-discipline/SKILL.md)** — Guards at system boundaries, trust typed data inside.
- **[principle-minimize-reader-load](./principle-minimize-reader-load/SKILL.md)** — Layers to trace and state to hold; the 30-second test.
- **[principle-prove-it-works](./principle-prove-it-works/SKILL.md)** — Check the real artifact, not a proxy; suspect the observation method first.
- **[principle-type-system-discipline](./principle-type-system-discipline/SKILL.md)** — Brand semantic primitives, derive types from the schema that owns the shape.
- **[principle-make-operations-idempotent](./principle-make-operations-idempotent/SKILL.md)** — Converge on rerun; leftovers the next run can judge stale.
- **[principle-sequence-verifiable-units](./principle-sequence-verifiable-units/SKILL.md)** — Commit order as the argument: failing test, then fix.
- **[principle-exhaust-the-design-space](./principle-exhaust-the-design-space/SKILL.md)** — No precedent in the codebase: build two or three versions and compare.
- **[principle-redesign-from-first-principles](./principle-redesign-from-first-principles/SKILL.md)** — A requirement that breaks a design assumption gets a redesign, not a bolt-on.

Wired in append-only `## Principles` blocks at the end of upstream skills (`tdd`, `diagnosing-bugs`, `implement`, `implement-spec`, `pr`, `to-spec`, `writing-for-agents`), as principle checks in `code-review`'s smell baseline, and inline in this repo's own skills (`fix-pr`, `implement-pr`, `spec-to-feature`, `auto-spec`, `auto-tickets`). pstack's test-behavior principle was folded into `tdd`'s block instead of kept as a skill.

**Pointer convention.** "Call the Skill tool with `principle-x`" means load the skill there. A skill name in parentheses means the line already carries the whole instruction and the name is only its source. Write a direct call wherever the full rule is needed, because a parenthetical is not reliably loaded.
