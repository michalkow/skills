---
name: drizzle-migrate
description: Generate and apply Drizzle migrations, patching the SQL on failure unless the patch is hard to roll back.
disable-model-invocation: true
---

# Drizzle Migrate

Generate then migrate. When migrate fails, the **SQL** is the patch — not the schema, not a one-off against the database. An **irreversible** statement the fix would add waits.

Typing `/drizzle-migrate` is the go-ahead for generate + migrate. Do not ask again. The second gate is only for irreversible SQL the fix introduces.

## Steps

1. **Preconditions.** Find the package that defines both `drizzle:generate` and `drizzle:migrate`. Prefer `apps/server`. If that package lacks them, the unique workspace package that has both. Read those scripts — they are the commands; do not substitute `drizzle-kit push`, a raw `drizzle-kit` invocation, or `psql`. Done when both scripts exist. Missing: stop and name which.

2. **Generate.** From the repo root run `pnpm --filter <package-name-or-path> drizzle:generate`. From the package directory, `pnpm drizzle:generate` is the same. A rename prompt is intent: same entity renamed in the schema → yes; unrelated drop+add → no. Done when the command exits 0, including "no schema changes". Non-zero: show the output and stop. Do not migrate a failed generate. Do not invent a migration file to skip generate.

3. **Migrate.** Same package, `pnpm drizzle:migrate` (or the `--filter` form). Needs the database the scripts already point at — do not pass or invent `DATABASE_URL`. Done when the command exits 0.

4. **On migrate failure.** Connection, auth, missing env, or a config error is not a SQL patch: show the output and stop. A SQL error: patch only the unapplied `.sql` migrate just failed on so it still reaches the schema's desired state, then re-run **migrate only**. Consult [sql-fixes.md](sql-fixes.md). Do not re-generate after a SQL patch. Do not edit schema to match a bad migration. Do not edit already-applied SQL. Do not apply SQL with `psql` / a GUI / `drizzle-kit push`.

   If the patch would add an **irreversible** statement, show the current SQL, the proposed SQL, and which statements are irreversible — then wait. Apply only after a go-ahead.

5. **Report** exactly one of:

   - **Applied** — which migration files landed (or that none were pending).
   - **Generate failed** — the command's output.
   - **Migrate failed** — the SQL error, and either the patch that was retried or why it stopped.
   - **Waiting on irreversible** — the proposed SQL and the irreversible statements.
