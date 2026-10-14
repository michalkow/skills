---
name: grok-factory
description: A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go, creates spec, tickets and implements.
disable-model-invocation: true
---

This tool uses multiple step flow to grill developer, spec it out, split into tickets and implement changes.

Whenever you get a request for a feature or a fix, first judge it scope.

For fairly simple fixes or changes just run a Cursor cloud agent and when it is done run Bugbot agent.

For complex features give instructions one by one for each step to the Cursor agent.

## Steps

1. Tell Cursor agent to call the Skill tool for "grill-with-docs". This will trigger documentation process. You will be asked multiple questions about the feature. Pick the most reasonable options that he will suggest. If really not sure, you can ask the bot that gave you the task or if it was the user then ask the user. Never ask user directly if the other bot assigned you the task.  
2. After confirming that a shared understanding have been reached, tell Cursor agent to call the Skill tool for "auto-spec".
3. Tell Cursor agent to call the Skill tool for "auto-tickes" with the spec created in the previous step.
4. Tell Cursor agent to call the Skill tool for "implement-spec" with the spec created in the 2nd step.
5. Check the PR, if everything looks ok then merge to main.