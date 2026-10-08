---
name: spec-to-feature
description: Creates spec, tickets and implements.
disable-model-invocation: true
---

This tool uses multiple step flow to, spec out the current thread, split into tickets and implement changes.

## Steps

2. Call the Skill tool for "auto-spec".
3. Call the Skill tool for "auto-tickes" with the spec created in the previous step.
4. Call the Skill tool for "implement-spec" with the spec created in the 2nd step.