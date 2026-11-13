---
name: principle-build-the-lever
description: Write a script, codemod, or generator that does or checks the work, instead of doing it by hand. Use for any edit, migration, analysis, or verification beyond a couple of obvious edits.
---

# Build the Lever

When the work is more than a few obvious edits, build the tool that does it or proves it. A script does the work the same way every time, reruns for free, and is one artifact a reviewer can read and rerun. Hand-done work can only be re-checked by redoing it.

- Do the first unit by hand to learn the recipe. Then build the tool, rerun it on that unit, and diff its output against your hand-done version.
- Pick the lever by job: a codemod or script for edits, a generator for repetitive files, a dump into SQLite or JSON for analysis, a rerunnable check for verification.
- Make it safe to rerun.
- One script that processes every unit beats fanning subagents out to apply it by hand.
- When subagents do share the work, write the recipe, the verification command, and the files they must leave alone into one file they all read.
- Build the smallest script that does the job, never a framework. Commit it when the work outlives the session. Otherwise keep it in a scratch directory and name it in your report.

The bar is triviality, not repetition. A one-off still earns a lever when the lever is what makes the work checkable.

Done when the lever exists as a file and you can name the command that reproduces the change or the check.
