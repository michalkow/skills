# Engineering

Skills I use daily for code work.

## User-invoked

Reachable only when you type them (Claude Code: `disable-model-invocation: true`; Codex: `policy.allow_implicit_invocation: false` in `agents/openai.yaml`).

- **[ask-michal](./ask-michal/SKILL.md)** — Ask which skill or flow fits your situation. A router over the user-invoked skills in this repo.
- **[grill-with-docs](./grill-with-docs/SKILL.md)** — Grilling session that also builds your project's domain model, sharpening terminology and updating `GLOSSARY.md` and ADRs inline.
- **[asking-with-docs](./asking-with-docs/SKILL.md)** — Short alignment on a change you can already describe: check it against the docs, code, and ADRs, ask only the gaps, record what settles, and stop.
- **[triage](./triage/SKILL.md)** — Move issues through a state machine of triage roles.
- **[improve-codebase-architecture](./improve-codebase-architecture/SKILL.md)** — Scan a codebase for deepening opportunities, present them as a visual HTML report, then grill through whichever one you pick.
- **[setup-michalkow-skills](./setup-michalkow-skills/SKILL.md)** — Configure this repo for the engineering skills (issue tracker, triage labels, domain doc layout). Run once per repo.
- **[to-spec](./to-spec/SKILL.md)** — Turn the current conversation into a spec and publish it to the issue tracker.
- **[to-tickets](./to-tickets/SKILL.md)** — Break any plan, spec, or conversation into a set of tracer-bullet tickets, each declaring its blocking edges — text in a local file, or native blocking links on a real tracker.
- **[implement](./implement/SKILL.md)** — Build the work described by a spec or set of tickets, driving `/tdd` at public test seams and closing out with `/code-review` before committing.
- **[implement-pr](./implement-pr/SKILL.md)** — Same as `/implement`, then opens a pull request with a body shaped by `/pr`.
- **[fix-pr](./fix-pr/SKILL.md)** — Fix the problem the user described, then open a pull request with a body shaped by `/pr`.
- **[implement-spec](./implement-spec/SKILL.md)** — Implement a whole spec on one integration branch. Works the tickets as a task graph sequentially on a single checkout, then closes out with `/code-review`.
- **[wayfinder](./wayfinder/SKILL.md)** — Plan a huge chunk of work — more than one agent session can hold — as a shared map of decision tickets on the issue tracker, resolved one at a time until the way to the destination is clear.
- **[retro](./retro/SKILL.md)** — Suggest improvements to the coding agent's environment (navigation, automated checks, coding standards, steering files, tooling) after a session, most severe first.
- **[app-deploy](./app-deploy/SKILL.md)** — Checkout and pull `main`, run `pnpm app:deploy` from the repo root to Fly.io, then confirm with `fly` that the app is healthy.
- **[push-to-production](./push-to-production/SKILL.md)** — Run `changeset version` from the repo's dev dependency, merge that onto `main`, then merge a release pull request from `main` into `production`, watch the GitHub Actions deploy, and confirm with `fly` that the production app is healthy.
- **[drizzle-migrate](./drizzle-migrate/SKILL.md)** — Generate and apply Drizzle migrations (`pnpm drizzle:generate` then `pnpm drizzle:migrate`), patching the SQL on failure unless the patch is hard to roll back.
- **[stktk-upgrade](./stktk-upgrade/SKILL.md)** — Switch to Node 14.18.2, source `bin/mac.sh`, commit any uncommitted work, `npm run publish`, then source `bin/upgrade.sh`.
- **[m5kdev-update](./m5kdev-update/SKILL.md)** — Update an enrolled app to `m5kdev@latest` (or a named version), then apply the migration guides for that jump.
- **[m5kdev-setup-project](./m5kdev-setup-project/SKILL.md)** — Study the code, then grill the user on why the project exists and write `PROJECT.md`, the north star that agents check their work against.
- **[create-verification-skill](./create-verification-skill/SKILL.md)** — Generate a project-local verification skill that launches the app, drives a feature the way a user would, and captures evidence.
- **[maintain-verification-skill](./maintain-verification-skill/SKILL.md)** — Keep a project's verification skill and feature map honest as the app changes: source coverage, a live pass, at most one PR of proven corrections.
- **[council](./council/SKILL.md)** — Three flagship models from three providers review the work, iterating until they agree — without letting scope creep.
- **[research-council](./research-council/SKILL.md)** — Three models independently research a topic via web search; the coordinator synthesises one cited Markdown file into `docs/`.
- **[changeset-add](./changeset-add/SKILL.md)** — Write one pending Changeset for release-worthy behaviour in this thread (or a named git range). Default bump is patch; name minor or major to override. Leaves the file uncommitted and does not touch CHANGELOG.md.

## Model-invoked

Model- or user-reachable (rich trigger phrasing so the model can reach for them).

- **[prototype](./prototype/SKILL.md)** — Build a throwaway prototype to answer a design question: a single shareable HTML file for state/logic, or several toggleable UI variations.

- **[diagnosing-bugs](./diagnosing-bugs/SKILL.md)** — Disciplined diagnosis loop for hard bugs and performance regressions: build a feedback loop that goes red on this bug → minimise → hypothesise → instrument → fix → regression-test.
- **[research](./research/SKILL.md)** — Investigate a question against high-trust primary sources and capture the findings as a cited Markdown file in the repo, run as a background agent.
- **[tdd](./tdd/SKILL.md)** — Test-driven development with a red-green-refactor loop. Builds features or fixes bugs one vertical slice at a time.
- **[domain-modeling](./domain-modeling/SKILL.md)** — Actively build and sharpen a project's domain model — challenge terms, stress-test with scenarios, update `GLOSSARY.md` and ADRs inline.
- **[codebase-design](./codebase-design/SKILL.md)** — Shared discipline and vocabulary for designing deep modules: small interfaces, clean seams, testable through the interface.
- **[code-review](./code-review/SKILL.md)** — Two-axis review of the diff since a fixed point: **Standards** (does it follow the repo's coding standards, plus a Fowler smell baseline?) and **Spec** (does it faithfully implement the originating issue/spec?), run as parallel sub-agents.
- **[pr](./pr/SKILL.md)** — The shape a pull request body should take: a summary as the smallest visual that makes the change clear, before/after evidence that it works, and a merge-danger call (one-way or two-way door, plus blast radius).
- **[resolving-merge-conflicts](./resolving-merge-conflicts/SKILL.md)** — Work through an in-progress git merge or rebase conflict hunk by hunk, resolving by intent traced to each side's primary source, then finish the operation — never `--abort`.
- **[wizard](./wizard/SKILL.md)** — Generate an interactive bash wizard that walks a human through steps only they can perform: provisioning infrastructure, setting up credentials or CI secrets, walking an unfamiliar third-party dashboard, or running a one-off migration or cutover.
