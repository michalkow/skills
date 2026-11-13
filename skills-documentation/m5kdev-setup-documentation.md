## What it does

`m5kdev-setup-documentation` creates an app's first useful user-facing guides. It studies the repo and asks you about the intended readers and scope before writing. The project's existing documentation instructions remain the source of truth for tooling, locales, and checks.

It recommends a **bottom FAQ** on each task guide: what might go wrong, which error code or message the reader might see, what it usually means, and what they can do themselves. The advice comes from the app's actual error paths.

## When to reach for it

Type `/m5kdev-setup-documentation`, or the [agent](https://michalkow.github.io/skills/dictionary/agent) reaches for it when you ask to bootstrap an m5kdev app's product documentation.

- Use it when the help site is missing or still describes the starter instead of your product.
- For routine changes to existing guides, follow the project's documentation rules.
- To establish why the product exists, use [m5kdev-setup-project](https://michalkow.github.io/skills/m5kdev-setup-project).

## Prerequisites

An app repo to inspect and write into. The skill reads its [AGENTS.md](https://michalkow.github.io/skills/dictionary/agents-md) and linked product-documentation rules, then uses the documentation package and locale configuration it finds. Missing infrastructure is handled through the repo's setup guidance and any tooling choices you need to settle.

## Bottom FAQ

Troubleshooting belongs beside the task that failed. A reader finishing a guide should be able to recognize an error, understand its likely causes, try a supported recovery, and know when to contact an administrator or support.

The skill recommends this convention during alignment so you can agree on it. Public error codes appear exactly as users see them; internal codes stay out of the help site. Signing out and back in is a useful suggestion only when the session behavior supports it. Guides without relevant error codes can still explain recognizable symptoms.

## Common questions

**Does this replace the documentation guidance already in `AGENTS.md`?**

It uses that guidance to do the initial setup. Existing rules remain the maintenance entry point, with a small addition for the FAQ convention if you accept it and it is missing.

**Will it assume every error can be fixed by the user?**

Some errors need an administrator or support. The FAQ explains that boundary and gives the reader a useful next step. It does not invent error codes or promise that a generic recovery will work.

## It's working if

- The questions refer to features and uncertainties found in your app.
- The guides describe your product's actual workflows and UI labels.
- Readers can find a relevant error and a practical next step at the bottom of the guide.
- Navigation and guides cover every configured locale, and the documentation build passes.

## Where it fits

A first-time setup beside [m5kdev-setup-project](https://michalkow.github.io/skills/m5kdev-setup-project), which establishes product intent. Later feature work maintains the guides under the repo's documentation rules. [ask-michal](https://michalkow.github.io/skills/ask-michal) maps the available skills.
