# SQL patches

Only the unapplied `.sql` migrate just failed on. Leave `--> statement-breakpoint` in place. The patched file must still land the schema's desired state — a default, backfill, or rename that the schema does not end on is drift.

Find the file from the kit's migrations folder (see `drizzle.config.*`) and the meta journal: the failed one is pending, usually the newest.

## Safe — patch and re-run migrate

| Failure | Patch |
| --- | --- |
| `ADD COLUMN … NOT NULL` on a table that has rows, no default | If existing rows have a real constant, add that `DEFAULT`. Otherwise: add the column nullable, `UPDATE` only the new NULLs from existing columns, then `SET NOT NULL`. Final state: NOT NULL, no extra default unless the schema has one. |
| Type change without a cast | Add `USING` with a reversible cast (`::text`, `::uuid`, …). |
| Drop+create of the same table or column (rename the kit missed) | `ALTER … RENAME` instead of drop+create. |
| `CREATE TYPE` / table used before it is created | Reorder statements. |
| Object already exists and this migration is what should have created it | `IF NOT EXISTS` on that create, only when the existing object matches the schema. |
| `NOT NULL` / unique / FK fails because new rows are unfilled | Backfill the new NULLs, then the constraint. |

A fill of NULLs this migration introduced is not an overwrite.

## Irreversible — show the proposed SQL and wait

A statement the **fix** would add, not whatever generate already emitted:

- `DROP TABLE`, `DROP COLUMN`, `DROP TYPE`, `DROP CASCADE`
- `TRUNCATE` / `DELETE` (including deleting duplicates to make a unique constraint pass)
- `UPDATE` that overwrites non-NULL values
- `USING` that cannot round-trip (`text` → `int`, JSON discarded)
- Recreating an enum to remove a value
- Dropping rows, or a constraint, to force the rest of the file through

Partial apply (object already exists because an earlier statement in *this* file committed — typical of non-transactional DDL): do not `DROP` it to retry. Wait, name what landed.

## Not a SQL patch

Stop and show the output:

- Connection refused, auth failure, missing `DATABASE_URL` / `.env`
- Generate failed, or the schema/config does not load
- The failing file is already in the journal as applied
