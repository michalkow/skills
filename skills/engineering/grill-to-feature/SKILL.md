---
name: grill-to-feature
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go, creates spec, tickets and implements.
disable-model-invocation: true
---

This tool uses multiple step flow to grill developer, spec it out, split into tickets and implement changes.

## Steps

1. Call the Skill tool for "grill-with-docs". 
2. After confirming that a shared understanding have been reached, call the Skill tool for "auto-spec".
3. Call the Skill tool for "auto-tickes" with the spec created in the previous step.
4. Call the Skill tool for "implement-spec" with the spec created in the 2nd step.