---
name: rule-module-db
description: "Drizzle table conventions for m5kdev server modules: ids, timestamps, foreign keys, registration, migrations. Use when writing or editing a `*.db.ts` file."
---

---
globs: apps/**/server/src/modules/**/*.db.ts
alwaysApply: false
---

# Module DB File Style Guide

Conventions for database table definitions in app modules. The table is the
**source of truth** for the module: the DTO (`<module>.dto.ts`) derives its
Zod schemas from it, and row types flow from there through the router to the
client.

## Conventions

- Import enum-like constants from shared constants: `@<app>/shared/modules/<module>/<module>.constants`.
- Import auth tables for foreign keys: `import { users, organizations } from "@m5kdev/backend/modules/auth/auth.db"`.
- Define tables with `appDatabaseSchema.table` from `@m5kdev/backend/base/database.schema`.
- Use `uuidv4` as the default for string IDs via `.$default(uuidv4)`.
- Represent booleans with `boolean(...)` and `.default(false)`.
- Represent timestamps with `timestamp(..., { withTimezone: true, mode: "date" })`.
  - `createdAt`: `timestamp("created_at", { withTimezone: true, mode: "date" }).notNull().$default(() => new Date())`
  - `updatedAt`: `timestamp("updated_at", { withTimezone: true, mode: "date" })`
  - `deletedAt`: `timestamp("deleted_at", { withTimezone: true, mode: "date" })`
- JSON columns: `jsonb("col").default([]).$type<string[]>()` or `.default({}).$type<Record<string, unknown>>()`.
- Use `references(() => otherTable.id, { onDelete: "cascade" })` for non-nullable FKs and `{ onDelete: "set null" }` for nullable FKs.
- Composite join tables define primary keys with `primaryKey({ columns: [t.aId, t.bId] })`.
- Table names are plural; column names are snake_case at DB level, camelCase in code.
- Inline union types are acceptable for simple status columns: `.$type<"draft" | "published">()`.
- Include `deletedAt` when the module needs soft deletes — `queryList`
  automatically excludes soft-deleted rows when the column exists.

## Registration and migrations

- Register every new table in `apps/server/src/schema.ts` with a plain
  re-export: `export { posts } from "./modules/posts/posts.db";`. The schema
  file is maintained by hand — there is no generation step.
- After changing tables, run `pnpm drizzle:generate` (creates a migration in
  `drizzle-postgresql/`) and `pnpm drizzle:migrate` (applies it). Never write migration
  SQL by hand and never edit files under migration `meta/` directories.

## File Location

```
apps/<app>/server/src/modules/<module>/<module>.db.ts
```

## Example

```typescript
import { organizations, users } from "@m5kdev/backend/modules/auth/auth.db";
import { appDatabaseSchema } from "@m5kdev/backend/base/database.schema";
import { text, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const posts = appDatabaseSchema.table("posts", {
  id: text("id").primaryKey().$default(uuidv4),
  authorUserId: text("author_user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  organizationId: text("organization_id").references(() => organizations.id, {
    onDelete: "set null",
  }),
  teamId: text("team_id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  status: text("status").$type<"draft" | "published">().notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }),
  deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "date" }),
});
```
