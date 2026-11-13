---
name: principle-test-behavior-not-implementation
description: Judge a test by whether it catches broken behavior and survives a refactor. Use when writing, changing, reviewing, or deciding to keep a test, especially one that uses mocks.
---

# Test Behavior, Not Implementation

`/tdd` owns the base rule: tests go through public interfaces. This is the check you run on each test you touch.

## The two imagined edits

- **Break the behavior.** Make the code return a wrong value, skip an effect, or perform it twice. If the test still passes, it proves nothing.
- **Change the internals.** Keep every observable result the same and restructure the code underneath. If the test now fails, it is pinned to the implementation.

Keep a test that catches the first edit and survives the second. Rewrite or delete the rest.

## Hollow tests

A hollow test survives both edits because it never looked. The usual causes:

- The expected value is computed by the code under test, or copied from a run of it. Derive it from the requirement.
- The assertion checks data the test built itself.
- The test restates a constant or prompt string and never runs the code that reads it.
- The assertion is looser than the contract: `toBeDefined()`, `length > 0`, "did not throw".

## The contract decides

Who can observe it decides what counts as behavior, not the shape of the assertion.

- The payload a mocked **external** service receives is behavior, because that service observes it. A call to an internal helper is implementation.
- "The payment client got no call" is behavior when the contract is "an empty cart never charges". Pair it with a case where the charge happens, so the test proves it can see a call.
- The error type callers branch on is contract. The exact error message usually is not.
- An invariant, such as a key that must exist in two tables or a compile-time type check, is behavior.

Done when every test you touched passes both imagined edits.
