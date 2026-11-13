---
name: m5kdev-setup-project
description: Grill the user on why this project exists and write PROJECT.md, the north star agents check their work against.
disable-model-invocation: true
---

# m5kdev Setup Project

`PROJECT.md` is the project's **north star**. It says why the project is being built, who it is for, and what it will not be. It records purpose, not architecture: the code, `GLOSSARY.md`, and ADRs already hold the _how_. Agents read it before they plan work and call out anything that goes against it.

The run is done when the user has confirmed `PROJECT.md` and the repo's agent instructions point every agent at it.

## Steps

1. **Study.** Read the repo before you ask anything. Done when you can draft the one-paragraph purpose from evidence alone and hold a list of **signals**: things the code implies about who the product is for and why. Look at landing copy, the README, app-owned modules, roles, billing plans, locales, email templates, seed data, analytics events, and what was deleted from the starter. Use subagents for breadth.

   In an m5kdev app, separate the **app** from the **template**. Features the starter ships to every app (auth, organizations, billing, notifications, the `posts` example, MCP, and so on) tell you what m5kdev is, not what this product is. Compare against `~/Projects/m5kdev/apps/starter`, or the template version in `.m5kdev.json`. The signals are what the app added, changed, configured, or removed. Treat a starter module left untouched as leftover until the user says otherwise.

   If `PROJECT.md` already exists, use it as the starting draft. The grilling then covers what has changed and every place where the code now disagrees with it.

2. **Grill.** Call the Skill tool for `grilling` and run it on the **why**. The design tree, prerequisites first:

   - **Problem.** What is painful or impossible today, and for whom.
   - **Users.** Who uses it, who pays, and who it is not for.
   - **Outcome.** What changes for them when it works, and the signals that show it.
   - **Bet.** Why this, why now, why build it instead of buying. What has to be true for it to work: these are the assumptions.
   - **Edges.** Non-goals: what it will not do, even when asked.
   - **Trade-offs.** When two good things collide (speed against polish, simplicity against flexibility), which one wins.

   Ground each question in a signal, for example: "The code has per-seat plans and org invites. Is this sold to teams?" Questions about the stack, the structure, or module layout are not on this tree. Answer them from the code yourself.

   A **divergence** is a user answer that contradicts a signal. Raise it when it appears: name the code, name the answer, and ask which one is the intent.

   Done when the grilling frontier is empty and the user confirms the shared understanding.

3. **Draft.** Write `PROJECT.md` at the repo root using [PROJECT-FORMAT.md](PROJECT-FORMAT.md). Keep the user's own words wherever they gave them, and `GLOSSARY.md` terms where that file exists. Show the draft and let the user edit it. Done when the user approves the text.