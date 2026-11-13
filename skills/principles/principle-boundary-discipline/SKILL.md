---
name: principle-boundary-discipline
description: Validate and handle errors at system boundaries, and trust typed data inside. Use when adding validation, null checks, try/catch, or error handling, or when wiring a framework adapter, CLI, config, or external API.
---

# Boundary Discipline

- **At a boundary** (CLI args, config, env vars, HTTP requests, external APIs, database rows, files, queue messages): parse raw input into a domain type, validate, return errors.
- **Inside:** trust the type. Data a boundary already parsed gets no null checks, re-validation, or defensive try/catch. Errors propagate to the layer that can act on them.
- **Across the boundary:** expose domain types, not the transport's, storage's, or framework's types.
- **Business logic lives in pure functions** that the framework shell calls, so it can be tested without the framework.

The test for every guard you write: is this data crossing a boundary right now? If not, delete the guard.

Done when every guard in your diff sits at a boundary.
