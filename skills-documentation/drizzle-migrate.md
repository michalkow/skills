## What it does

`drizzle-migrate` generates a Drizzle migration and applies it: `pnpm drizzle:generate`, then `pnpm drizzle:migrate`, from `apps/server` or via `pnpm --filter` at the repo root. It does not treat a successful generate as done. The run is done when migrate applies, or when it can name why that is not true.

When migrate fails on SQL, it patches the **unapplied SQL** — not the schema, not a one-off against the database — and retries migrate. An **irreversible** statement that patch would add is shown and waited on, not applied.

## When to reach for it

You invoke this by typing `/drizzle-migrate` — the [agent](https://michalkow.github.io/skills/dictionary/agent) won't reach for it on its own. Typing it is the go-ahead for generate + migrate; it will not ask again for that. The second gate is only for irreversible SQL the fix introduces.

| Your situation | Reach for |
| --- | --- |
| Schema changes should land in the database | `/drizzle-migrate` |
| The next step is a dashboard, a credential, or a cutover only you can perform | [wizard](https://michalkow.github.io/skills/wizard) |
| Migrate failed because the database is unreachable or the app is broken | [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs) |
| The schema is not the schema you want yet | [implement](https://michalkow.github.io/skills/implement) / [tdd](https://michalkow.github.io/skills/tdd) first |

## Prerequisites

A workspace package must define both `drizzle:generate` and `drizzle:migrate` — typically `apps/server`. The database those scripts already point at must be reachable. The [skill](https://michalkow.github.io/skills/dictionary/skill) will not invent a `DATABASE_URL`, install Drizzle, or substitute `drizzle-kit push`.

## The SQL is the patch

Generate writes the path from the current database to the schema. When that path fails, the file is wrong, not the schema. The skill edits only the unapplied `.sql` migrate just failed on, keeps the schema's desired state as the destination, and re-runs migrate — never generate again, which would overwrite the patch.

## Irreversible waits

A default on a new `NOT NULL` column, a `USING` cast that round-trips, or a rename the kit emitted as drop+create is a patch it applies. `DROP TABLE` / `DROP COLUMN` / `DROP CASCADE`, a `DELETE` of duplicates, or an `UPDATE` that overwrites existing values is **irreversible**: it shows the current SQL, the proposed SQL, and which statements cannot be undone, then waits. That is the [human-in-the-loop](https://michalkow.github.io/skills/dictionary/human-in-the-loop) gate. Generate's own SQL already had a go-ahead when you typed the command; only what the fix would *add* pauses.

## Common questions

**Will it run `drizzle-kit push`?**

No. It runs the package's `drizzle:generate` and `drizzle:migrate` scripts. `push` bypasses migration files and is not a substitute when migrate fails.

**Does a failed migrate mean it edits my schema?**

No. The schema is the desired state. The unapplied `.sql` is the path. A connection error, a missing env var, or a generate failure is reported and stopped — those are not SQL patches.

**What if the fix needs to drop a column or delete rows?**

It asks. Typing `/drizzle-migrate` is the go-ahead for generate + migrate, not for irreversible statements the agent would add to get past an error.

## It's working if

- You typed `/drizzle-migrate`. It did not fire because you mentioned Drizzle in passing.
- `drizzle:generate` runs, then `drizzle:migrate`, in that order.
- A SQL failure becomes an edit to the pending `.sql` file, then migrate only — not a second generate, not a change to the schema, not `psql`.
- **Applied** names the files that landed, or that none were pending.
- An irreversible fix shows up as **Waiting on irreversible**, with the proposed SQL, not as a silent patch.

## Where it fits

`drizzle-migrate` is a reach-for-it-anytime standalone. It sits after the schema is the schema you want applied, not inside the build chain.

Its neighbours are [implement](https://michalkow.github.io/skills/implement) / [tdd](https://michalkow.github.io/skills/tdd), which produce that schema; [wizard](https://michalkow.github.io/skills/wizard), which is the human cutover when the agent cannot apply the change itself; and [diagnosing-bugs](https://michalkow.github.io/skills/diagnosing-bugs), which is the next move when the database or the app is the problem rather than the SQL. [ask-michal](https://michalkow.github.io/skills/ask-michal) routes you over the whole set.
