---
name: m5kdev-setup-documentation
description: Set up an m5kdev app's first user-facing documentation. Use when bootstrapping product guides from the repo, with user alignment and error-code FAQs; routine guide updates follow the project's existing documentation rules.
---

# m5kdev Setup Documentation

Turn the app's actual behavior into its first useful public help site. Study the repo, align with the user, then write the guides. Existing documentation instructions in `AGENTS.md` and their referenced files are the source of truth for setup and maintenance.

The run is done when the agreed user tasks have accurate, navigable guides in every configured locale, troubleshooting is grounded in actual errors, and the project's documentation checks pass. If a check cannot run, report the remaining verification explicitly.

## 1. Study before asking

Read applicable `AGENTS.md` / `CLAUDE.md` instructions and follow their product-documentation pointers, such as `docs/agents/product-documentation.md`. Inspect the existing docs package, navigation, locale configuration, and build scripts. Discover paths from this repo: generated apps and the m5kdev monorepo have different layouts.

Read `PROJECT.md`, the README, `GLOSSARY.md`, and relevant ADRs where present. Trace the app's user journeys through routes, visible labels, permissions, plans, and limits. Separate app-specific behavior from starter examples and unfinished features. A module's presence alone does not establish a supported user feature.

For each proposed guide, identify the working user task, prerequisites, expected result, and code supporting it. Trace relevant error definitions through their throw sites and the UI's handling and translations: determine which codes or messages a user actually sees, what can cause them, and what recovery the app supports. Keep source paths in working notes for verification, outside the public guides.

Done when you can propose the audience, guide outline, locale coverage, and troubleshooting topics from evidence, with unresolved product decisions named.

## 2. Align with the user

Show the proposed audience, priority tasks, navigation, and scope. Ask a concise round of grounded questions about decisions the repo cannot settle: intended readers and their knowledge, which available features belong in the first release of the docs, ambiguous product behavior, and the support route when self-service fails. Include your recommendation with each choice; carry forward answers already given in the conversation.

**Recommend a bottom FAQ section as the default for every task guide**, explaining likely problems and relevant error codes in the context of that task. Surface this recommendation during alignment. A shared error reference can supplement these sections when useful. Confirm the user's preference rather than silently imposing a new convention.

If code and stated intent disagree, name the concrete difference and settle which behavior the guides should describe. Describe only behavior users can currently access; keep planned capabilities out of present-tense instructions. Ask about language choices only when configuration or prior instructions leave them unresolved.

Proceed once the consequential questions are answered and the shared scope is clear. Continue independent inspection while waiting; leave dependent content unwritten until its answer arrives.

## 3. Create the guides

Use the repo's documentation setup and conventions. Build on its existing help-site package and adapt starter content to the actual product, preserving app-authored material. If infrastructure is missing, use the setup prescribed by the repo; resolve any material tooling choice with the user before adding a new stack. Publishing or deployment follows the user's authorized scope.

Organize around the agreed user goals: getting started and the workflows readers need to complete. Each guide explains when to use the feature, access requirements, steps with actual UI labels, expected results, and relevant limits. Explain product terms in plain language. Cover role, plan, or platform differences where they change the steps.

Keep public help focused on end users. Engineering setup, architecture, internal diagnostics, and secrets belong in repository documentation outside the help site. Treat published guides as public even when the app requires sign-in.

Maintain the agreed guide set, navigation, links, and UI terminology in every configured app locale, including regional variants, following the project's locale mapping. Remove obsolete starter advice and repair links affected by changed paths.

### Bottom FAQ: help the user recover

When the recommendation is accepted, finish each guide with a FAQ covering the problems relevant to that workflow. For an error entry, explain:

- **What they see:** the exact public error code, when exposed, and the visible message or symptom.
- **What it usually means:** supported causes in this workflow, distinguishing possibilities from a proven diagnosis. A shared code may have several causes; the code alone is not enough to choose one.
- **What they can do:** concrete recovery steps available to that user, with any effect on unsaved work made clear.
- **If it persists:** when to ask an administrator or support, using the agreed contact route and useful non-sensitive details such as the code and the action that failed.

For example, recommend signing out and back in for a session problem only when the auth flow supports that recovery and the error evidence points to it. Check for unsaved work before advising it. A permission error may require an administrator; repeating sign-in will not necessarily help.

Keep codes and remedies traceable to implementation. Document an error by its visible message when the UI hides its internal code. If no relevant codes exist, write symptom-based questions from supported failure behavior. Report gaps in error handling separately rather than inventing codes, causes, or recovery guarantees. Include problems users cannot fix themselves with an honest next step.

## 4. Verify and leave maintenance guidance

Cross-check every guide against the user journey and every FAQ remedy against its error path. Check actual labels, access requirements, locale parity, navigation, and links. Run the repo's documentation build and prescribed checks across all configured locales; resolve failures introduced by this work. A single-locale preview does not verify translations.

Keep the existing documentation rules as the maintenance entry point. If needed, add a concise instruction there for the agreed bottom-FAQ convention: update relevant errors, meanings, and self-service remedies alongside changed behavior. Add an agent-instruction pointer only if one is missing; preserve existing guidance and avoid duplicating it.

Report which guides and locales were created or adapted, the FAQ convention agreed, checks run and their results, and any remaining content or verification gaps.
