---
name: asking
description: A short alignment pass, softer than a grilling session. Use when the user says "asking", "/asking", "don't grill", "just the important questions", or asks you to check you understand the change — including against the docs, the code, and the ADRs — before going further. Understand the outcome they want and ask one round only where that outcome is vague, inconsistent, or contradicts those sources.
---

Understand the change the user wants. Their message is the brief. The point of this pass is a shared picture of the **outcome**, reached quickly.

A question earns its place only as a **gap**. There are three:

- **Vague** — two readings of what they asked for would produce different changes.
- **Inconsistent** — this part of the request fights something they already said.
- **Contradicts a source** — it fights the glossary, an ADR, a doc, or the code the change touches.

Implementation detail is not a gap. Libraries, file layout, signatures, and how you would build it are yours to decide, unless they made that the subject.

Look facts up yourself. In a repo, read the glossary, the ADRs, the docs, and the code the request touches before you form a question. When those sources disagree with the request, or with each other, name the file. Code is what the system does now. An ADR is a decision already made. The glossary is the project's word for a thing. A doc that has drifted from the code is the conflict to surface, and the recommendation follows the code for current behavior and the ADR for a decision that was expensive to make.

When you think they are about to make a mistake, push back once and cite the source — their own sentence, the ADR, the glossary term, or the code. Then take whatever they decide.

Ask every gap in one round. Number each question and give your recommended answer. In Cursor use the `AskQuestion` tool. In Codex use `ask_user_question`. If neither is available, format each question like so:

```
❓ **Q1** - **<question title>**: <question body>

➡️ <your recommended answer>
```

Zero questions is a valid round: the brief was already specific and consistent. If an answer opens a new gap that would change the outcome, one further round is allowed. Then stop.

Close by restating the change in a few sentences, in their words. Continue into the work only when the request you are clarifying already asked for it and the round is answered. Otherwise stop on the restatement.
