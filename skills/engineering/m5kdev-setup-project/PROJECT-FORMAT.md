# PROJECT.md format

`PROJECT.md` has two readers. The user should recognise their own intent in it, and an agent checks its work against it. Every line states a reason or a boundary. Stack, module layout, and how things are built stay in the code.

Keep it to about a page. If nothing settled for a section, leave the section out instead of padding it.

```markdown
# <Project name>

<One paragraph: what this is, who it is for, and the problem it removes. Write the sentence the user would say to a stranger.>

## Problem

<What is painful, slow, or impossible today, and for whom. Describe the concrete situation, not a category.>

## Users

- **<User type>**: <who they are and what they need from this>.
- **Not for:** <who this deliberately does not serve>.

## Outcome

<What changes for the users when this works.>

Success looks like:

- <a signal you can observe>

## Assumptions

What this project bets on. If one of these turns out false, the project changes.

- <assumption>

## Non-goals

- <what it will not do, even when asked>, because <reason>.

## Trade-offs

When these collide, the first one wins:

- <X> over <Y>, because <reason>.

## Known divergences

Code that goes against this document but stays for now, by the user's decision. Remove an entry once it is resolved.

- `<path>`: <what the code does>, while this document says <...>. Intended direction: <...>.
```
