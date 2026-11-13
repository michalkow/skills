---
name: principle-migrate-then-delete
description: Cut over to the new shape and delete the old one in the same plan, leaving no compatibility layer behind. Use when replacing an internal API, module, or data shape that still has callers, or when planning a rewrite or migration in phases.
---

# Migrate Then Delete

When an internal API changes, migrate every caller and delete the old API in the same wave. Aim at the end state. Intermediate states only need to be correct at the checkpoints you name.

- Migrate every caller, then delete the old API with its re-exports, deprecated aliases, adapters, and the tests that only protected its internals. Point the remaining tests at the new contract.
- Find callers the type checker misses: strings, config, docs, scripts, dynamic imports.
- In a phased rewrite, name up front where breakage is allowed and where the checkpoints are. Keep fast checks green on the area you are touching, and run the full static and runtime checks at the end.
- A wide refactor may run as expand–contract, with old and new forms side by side across batches, as long as the contract step that deletes the old form is in the same plan. The thing to avoid is an old form with no deletion scheduled.

This applies when nothing outside your control depends on the old API: no published-package consumers, no external clients, no persisted data in the old shape that you cannot migrate. When something does, name it and ask the user to choose between a cutover and a compatibility period.

Done when no reference to the old API remains anywhere in the repo and the full check suite passes.
