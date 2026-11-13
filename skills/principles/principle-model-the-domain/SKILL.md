---
name: principle-model-the-domain
description: Replace growing conditionals with a structure that encodes the domain. Use when a change adds another branch to an if/else or switch chain, a second boolean that must stay in sync with another, or the same shape assumption in another file.
---

# Model the Domain

Stop and pick a structure when you hit one of these warning signs:

- A new feature grows an existing if/else or switch chain by one more branch.
- A second boolean or status field must stay in sync with the first.
- The same shape assumption appears in another file.
- Modules are named after phases (load, validate, transform, save) and each repeats the same domain rules.

Then encode the domain in a structure that makes invalid states unrepresentable and deletes the branches: a state machine, a discriminated union, a lookup table or registry, a reducer, a typed model, a module that owns one body of domain knowledge.

Keep boring code when the current shape is clear, local, and unlikely to grow. A structure earns its place only by deleting branches, duplicated rules, or invalid states. `/codebase-design` holds the vocabulary for the module's shape, `/domain-modeling` the words.

Done when each warning sign you hit has a structure that removes it, or a one-line reason the boring code stays.
