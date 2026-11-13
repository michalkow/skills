---
name: protocol-eval
description: Test whether a skill, prompt, or structure change actually changes agent behavior, with blinded candidates and a blinded judge.
disable-model-invocation: true
---

# Eval

Measure how a change to a skill, a prompt, `AGENTS.md`, or the repo's structure changes agent behavior, before you adopt it.

## Blinding

Hold every rule for every candidate and the judge:

- No directory, file name, or prompt the candidate sees contains `eval`, `test`, `judge`, `experiment`, `rubric`, `score`, `compare`, `benchmark`, `candidate`, or `arena`. Use project-shaped names a user might pick.
- The candidate prompt reads like an organic user request. It states the goal, not what is being measured.
- The candidate prompt asks for design notes in general, never for the skills, principles, or files it applied. Grade that from transcripts and the shape of the output.
- Each candidate works as if it were the only one.
- The judge knows it is judging and sees outputs only under neutral labels, with no model names and no variant names.
- When comparing two variants, one judge scores both sets in one pass on one scale.

## Steps

1. **Frame.** Name the variant under test and the behavior that counts as success. Write a rubric of 3–6 concrete criteria for the judge only.
2. **Set up one sanitized workspace per candidate**, a scratch directory or worktree with the project skeleton and the skills an organic task would have. The variant arm gets the change and the baseline arm does not.
3. **Write one organic prompt**: what a user would type.
4. **Run the candidates in parallel** as subagents, same prompt, each in its own workspace. Run several trials per arm, since one run per arm is an anecdote. Spread them across models when the question depends on the model.
5. **Run one blinded judge** on a different model family from the candidates, with the rubric and the neutrally labelled outputs.
6. **Verify from transcripts, not self-report.** Read each candidate's transcript (in Claude Code, under `~/.claude/projects/<this project>/`) and check which files it actually opened and what it actually ran. Read only this project's transcripts.
7. **Read every output yourself**, end to end, and compare with the judge's verdict. A disagreement means the judge is biased or the rubric is ambiguous. Resolve it before concluding.

Done when every candidate output is read, the judge's verdict is reconciled with yours, and any score gap passes `principle-explain-the-number`.

**Report:** the variant under test, the rubric, per-candidate notes, the judge's verdict, your synthesis, and whether to adopt the variant.
