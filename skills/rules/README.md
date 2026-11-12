# Rules

Coding conventions for m5kdev apps, converted from the Cursor rules in the `sam` repo. Each is model-invoked: it fires when the agent writes or edits the file type it covers. Not promoted in the plugin, no docs pages.

- **[rule-frontend-component](./rule-frontend-component/SKILL.md)** — React components: HeroUI v3 before raw Tailwind, React 19 idioms, logic in hooks, required loading/empty/error states.
- **[rule-frontend-data](./rule-frontend-data/SKILL.md)** — Data fetching: tRPC + TanStack Query, router-inferred types, the generic list query contract, invalidation.
- **[rule-frontend-form](./rule-frontend-form/SKILL.md)** — Forms: uncontrolled HeroUI forms with native validation and `FormData`, no form libraries.
- **[rule-frontend-hook](./rule-frontend-hook/SKILL.md)** — Custom hooks: screen-level feature hooks, reusable action hooks, flat return shape.
- **[rule-frontend-i18n](./rule-frontend-i18n/SKILL.md)** — i18n: every user-facing string through i18next, key structure, where keys live.
- **[rule-module-db](./rule-module-db/SKILL.md)** — `*.db.ts`: Drizzle table definitions, registration, migrations.
- **[rule-module-dto](./rule-module-dto/SKILL.md)** — `*.dto.ts`: Zod schemas derived from the table via `createZodSchemas`.
- **[rule-module-grants](./rule-module-grants/SKILL.md)** — `*.grants.ts`: `ResourceGrant[]`, access modes, wiring to `.access()`.
- **[rule-module-module](./rule-module-module/SKILL.md)** — `*.module.ts`: `BaseModule` composition, lifecycle hooks, registration.
- **[rule-module-prompt](./rule-module-prompt/SKILL.md)** — `*.prompt.ts`: one factory per AI use case returning `AIService` options.
- **[rule-module-repository](./rule-module-repository/SKILL.md)** — `*.repository.ts`: base built-ins first, `this.query()` builder, `throwableQuery`.
- **[rule-module-schema](./rule-module-schema/SKILL.md)** — Shared `*.schema.ts`: when a Zod schema belongs in shared, and when it must not.
- **[rule-module-service](./rule-module-service/SKILL.md)** — `*.service.ts`: `BasePermissionService` procedure chains, repository built-ins, access control.
- **[rule-module-trpc](./rule-module-trpc/SKILL.md)** — `*.trpc.ts`: thin router factories that delegate to the service.
- **[rule-server-event-emit](./rule-server-event-emit/SKILL.md)** — Server events: emit from background jobs, not from mutations that already return the entity.
