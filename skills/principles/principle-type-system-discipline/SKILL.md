---
name: principle-type-system-discipline
description: Brand semantic primitives and derive types from the schema that owns the shape. Use when designing types or signatures, or when two parameters share a primitive type but mean different things.
---

# Type System Discipline

- **Brand semantic primitives.** `UserId` and `OrderId` are both strings underneath but must not be interchangeable. Give each its own type (a branded intersection in TypeScript, a newtype elsewhere), validate once where the value is created, and trust the type downstream. Brand whenever two arguments share a primitive type but mean different things.
- **Derive types from the source that owns the shape.** When a database schema, Zod schema, OpenAPI spec, GraphQL schema, or protobuf owns a shape, derive the type from it. A hand-written parallel type drifts.

Done when no signature you touched takes two same-typed primitives that mean different things, and no type you added duplicates a shape another file owns.
