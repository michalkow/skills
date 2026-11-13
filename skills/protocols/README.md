# Protocols

Rigor protocols adapted from the [pstack](https://github.com/cursor/plugins/tree/6e359ce0aba9e927914d8a940510aa2ef66a8f23/pstack/skills/poteto-mode/playbooks) playbooks by Lauren Tan (MIT, see [PSTACK-LICENSE](../principles/PSTACK-LICENSE)). Cursor-specific tooling (model slugs, control skills, forge scripts) is replaced with this repo's skills. They lean on the [principles](../principles/README.md).

Each is user-invoked (Claude Code: `disable-model-invocation: true`; Codex: `policy.allow_implicit_invocation: false`). Not promoted in the plugin, no docs pages.

- **[protocol-hillclimb](./protocol-hillclimb/SKILL.md)** — Improve one metric toward a target: frozen harness, one change per iteration, keep or revert, `decision.tsv`.
- **[protocol-eval](./protocol-eval/SKILL.md)** — Test whether a skill, prompt, or structure change changes agent behavior, with blinded candidates and a blinded judge.
- **[protocol-visual-parity](./protocol-visual-parity/SKILL.md)** — Pixel-exact UI migration, verified by image diff against a frozen baseline.
- **[protocol-trace-forensics](./protocol-trace-forensics/SKILL.md)** — Diagnose a captured profile, trace, or heap snapshot: load into SQLite, narrow, attribute to source.
- **[protocol-autonomous-run](./protocol-autonomous-run/SKILL.md)** — Drive a long task to a checkable exit condition without stopping.
- **[protocol-session-pickup](./protocol-session-pickup/SKILL.md)** — Resume another agent's work from a handoff, transcript, or branch without redoing it.
