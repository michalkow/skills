---
name: m5kdev-update
description: Update an enrolled app to m5kdev@latest, or to a version the user named, then apply the migration guides for that jump.
disable-model-invocation: true
---

# m5kdev Update

The update is done when every migration guide in the jump — from the app's current template version to the target — has been applied or skipped for the reason that guide gives.

Typing `/m5kdev-update` is the go-ahead. Do not ask again.

**Version.** `latest`, unless the user named one. The npm package is `create-m5kdev`; the bin is `m5kdev`. Invoke `pnpm dlx create-m5kdev@<version>`.

## Migration docs

Migration steps come from the m5kdev docs. Read them here, in this order:

1. `~/Projects/m5kdev/apps/docs`
2. `https://github.com/michalkow/m5kdev/tree/main/apps/docs` when that folder is missing, or when it has no guide for the target version.

Guides are `docs/guides/*migration*.md`. A guide is in the jump when its frontmatter `migration.target_version` is greater than the current template version and less than or equal to the target. `docs/packages/cli.md` lists the order. A guide whose `migration.id` is already in `.m5kdev.json` `appliedMigrations` is already applied.

## Steps

1. **Preconditions.** Working directory is the consumer app root, and `.m5kdev.json` exists. `node -v` is 24 or newer. `pnpm` is on `PATH`. Done when all three hold. Stop and name whichever is missing. Do not run `init`, install Node, or install pnpm.

2. **Target.** Read `template.version` from `.m5kdev.json` — that is the current version. The target is the version the user named. Otherwise resolve `latest` with `npm view create-m5kdev version` (needs network) and use that exact version for the rest of the run. Done when both versions are known. Current is already the target: report **Already current** and stop.

3. **Guides.** Read `docs/packages/cli.md` and every guide in the jump. Local docs first. Done when each guide is on the list to apply, or skipped with the reason in its "Who needs this migration" section.

4. **Clean tree.** `git status --porcelain`. Write-mode update requires a clean worktree. Dirty: stop and name the paths. Do not commit, stash, or discard.

5. **Preview.** From the app root, `pnpm dlx create-m5kdev@<version> update --dry-run`. Needs network. Done when it exits 0 and the plan is in hand. Conflicts or a non-zero exit: show the output and stop.

6. **Update.** `pnpm dlx create-m5kdev@<version> update`. Needs network. Done when it exits 0 and reports Applied or Already up to date. Non-zero or Blocked: show the output and stop. Pass `--yes`, `--platform`, or `--skip-install` only when the user asked for that flag. If the output says to run `pnpm install`, run it.

7. **Apply the guides.** Apply the guides from step 3 that are not already in `appliedMigrations`, in the order `docs/packages/cli.md` gives. Follow the guide. A database step the guide names: use the app's existing Drizzle scripts that guide names. A guide that excludes this app: skip it and say why.

8. **Report** exactly one of:

   - **Updated** — current version, target version, whether `update` wrote files, which guides were applied, which were skipped.
   - **Stopped** — which step failed, and the output.
   - **Already current** — the template version already equals the target.
