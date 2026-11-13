---
name: tdd
description: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
---

# Test-Driven Development

TDD is the red → green loop. This skill is the reference that makes that loop produce tests worth keeping: what a good test is, where tests go, the anti-patterns, and the rules of the loop. Every section applies on every cycle — consult them before and during the loop, not after.

When exploring the codebase, read `GLOSSARY.md` (if it exists) so test names and interface vocabulary match the project's domain language, and respect ADRs in the area you're touching.

## What a good test is

Tests verify behavior through public interfaces, not implementation details. Code can change entirely; tests shouldn't. A good test reads like a specification — "user can checkout with valid cart" tells you exactly what capability exists — and survives refactors because it doesn't care about internal structure.

See [tests.md](tests.md) for examples and [mocking.md](mocking.md) for mocking guidelines.

## Seams — where tests go

A **seam** is the public boundary you test at: the interface where you observe behavior without reaching inside. Tests live at seams, never against internals.

**Choose the most reasonable seams and proceed.** Use the boundaries specified in the task or spec. Otherwise inspect the existing public interfaces and tests, then choose the narrowest boundary that meaningfully covers the requested behavior. Focus on critical paths and complex logic, using existing test infrastructure where practical.

State the chosen seams and why they fit, then start the red → green loop. Do not ask the user to choose or approve test seams.

When the shape of that interface is itself in question — how deep the module is, where the seam belongs, what the interface should expose — call the Skill tool with "codebase-design" for the vocabulary. It is the shared source of the module, interface, depth, seam, adapter, leverage and locality terms, and it is a reference to consult, not a session to run.

## Anti-patterns

- **Implementation-coupled** — mocks internal collaborators, tests private methods, or verifies through a side channel (querying the database instead of using the interface). The tell: the test breaks when you refactor but behavior hasn't changed.
- **Tautological** — the assertion recomputes the expected value the way the code does (`expect(add(a, b)).toBe(a + b)`, a snapshot derived by hand the same way, a constant asserted equal to itself), so it passes by construction and can never disagree with the code. Expected values must come from an independent source of truth — a known-good literal, a worked example, the spec.
- **Horizontal slicing** — writing all tests first, then all implementation. Bulk tests verify _imagined_ behavior: you test the _shape_ of things rather than user-facing behavior, the tests go insensitive to real changes, and you commit to test structure before understanding the implementation. Work in **vertical slices** instead — one test → one implementation → repeat, each test a **tracer bullet** that responds to what the last cycle taught you.

## Rules of the loop

- **Red before green.** Write the failing test first, then only enough code to pass it. Don't anticipate future tests or add speculative features.
- **One slice at a time.** One seam, one test, one minimal implementation per cycle.
- **Refactoring is not part of the loop.** It belongs to the review stage (see the `code-review` skill), not the red → green implementation cycle.

## Principles

- **After each slice goes green, before committing,** run two imagined edits on the new test. First, break the behavior: return a wrong value, skip an effect, or perform it twice. The test must fail. Second, restructure the internals and keep every observable result the same. The test must pass. A test that survives the first edit is hollow, usually because its assertion is looser than the contract (`toBeDefined()`, `length > 0`, "did not throw"). A test that fails the second is implementation-coupled. Rewrite or delete either one.
- **An assertion that something did not happen** ("the payment client got no call") needs a sibling case where it does happen, so the test proves it can see it.
- **When a slice stays red after two attempts that rest on the same assumption,** call the Skill tool with `principle-attack-the-premise` before the third attempt.
