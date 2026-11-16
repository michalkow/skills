# Resolving update conflicts

`update` writes only a conflict-free plan, so every conflict is cleared in the app's own files before the write. The target is the template's new shape with the app's customizations kept: adopt what the template changed, port what the app changed.

Resolutions live in app files. `.m5kdev.json` stays as the CLI wrote it, and `init --force` stays unused — it re-baselines from inferred context and drops `appliedMigrations`.

## Three versions per path

- **base** — the template at the current version.
- **target** — the template at the target version.
- **local** — the app's file.

`diff base target` is the template change. `diff base local` is the app's customization.

Render base and target into the scratchpad with the app's context from `.m5kdev.json` `template.context`, using `create` flags that reproduce `template.features` (`pnpm dlx create-m5kdev@<version> create --help` lists them):

```sh
pnpm dlx create-m5kdev@<version> <scratchpad>/m5kdev-<version> --name "<appName>" --description "<appDescription>" <feature flags> --yes --skip-install --skip-git
```

`--yes` leaves out optional Backend Modules. For a path the scaffold lacks, read the raw template under `package/templates/` of `npm pack create-m5kdev@<version>`.

The migration guides from step 3 often say where moved or removed content went. Read the guide covering a path before resolving it.

## Reapply

A **reapply** is an app customization put back after the write. Before overwriting a local file, copy it to `<scratchpad>/m5kdev-reapply/<path>` and add one line to `<scratchpad>/m5kdev-reapply/LIST.md`: the path and what to restore. Step 7 of the skill works through that list.

## Resolution by reason

Match the reason the dry run prints for each path.

| Reason | Resolution |
| --- | --- |
| Three-way merge produced conflicts. | Hand-merge: apply the template change into the local file and keep the app's lines. The next dry run's merge then finds both sides agreeing. |
| Historical template content does not match the stored baseline hash. | The CLI has no usable base, so only a file identical to target clears it. Record a reapply, set the file to the target render, and reapply after the write. |
| The template removed a locally customized path. | Find where target moved that responsibility — the guide, or a search of the target render for the file's exports. Customization still needed: port it there, or move the file to an app-owned path and fix its imports. Then delete the path. Obsolete `CLAUDE.md` or Cursor rules: move app-specific guidance into `AGENTS.md`, then delete. |
| A locally deleted path changed in the target template. | Read why it went: `git log --diff-filter=D -- <path>`. Restore the target render. Deletion was deliberate — the commit says so, or something else replaced it: record a reapply that deletes it again. |
| The target template adds a path already owned by the app. | Same purpose as the template file: record a reapply and set the file to the target render. Different purpose: move the app's file to another path and fix its imports. |
| Binary content changed locally and in the target template. (Renamed binary too.) | Record a reapply holding the app's binary, set the file to the target, and restore the app's binary after the write. |
| Catalog entry `<name>` changed both locally and in the target template. | Set the entry in `pnpm-workspace.yaml` to the target value. Local pin set on purpose (a commit or guide says so): record a reapply for it. |
| Symbolic link, invalid template rename, or unable to load historical template. | **Block.** Stop and show the output. |

## The loop

1. On the repo's default branch, create `m5kdev-update-<target>` first.
2. Resolve every conflict in the dry-run output.
3. Commit the resolutions as `Resolve m5kdev <current> → <target> update conflicts` — the write needs a clean tree.
4. Rerun the dry run.

Done when the dry run exits 0 with no conflicts. A path still conflicting after two passes: stop, and show its output with the resolutions tried.
