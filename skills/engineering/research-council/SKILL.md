---
name: research-council
description: Three models independently research a topic via web search; the coordinator synthesises one cited Markdown file into docs/.
disable-model-invocation: true
---

# Research Council

Three independent research briefs, then one **synthesis**. The coordinator writes the file. The delegates only search and report.

## 1. Topic and context

Need a **topic** and any **context** every delegate should have (constraints, versions, what “done” looks like, sources to prefer or ignore). If either is missing, ask. Done when both are stated back, or they were already in the invocation.

## 2. Resolve the council

Default members, unless the user named others: **Sol 6.1**, **Grok 4.7**, **Claude Opus 5.5**.

In T3 Code: call `orchestrator_capabilities` (use `search` for a name missing from the short list). Resolve each member to a catalog `providerInstanceId` + `model`, and put high reasoning in `target.options`. Exact id or label match first. If that version is absent, use that family's current model from that provider and say which id you picked. If a family or provider cannot be reached, report it instead of substituting a different family.

Prefer three distinct providers when the catalog allows: Sol → Codex, Grok → Cursor, Opus → Claude.

Start one `delegate_task` per member in parallel (`role: "research"`, shared checkout). Follow each child's `next`. Do not poll.

Elsewhere: the harness's subagent tools, same three families, high reasoning. Same rule: report, don't substitute.

## 3. Brief each delegate

Same topic, same context, each in its own window. Tell every delegate:

- Use the harness's **web search** (and page fetch) to gather sources. Do not guess.
- Prefer **primary sources** — official docs, specs, source, first-party APIs — and cite every claim with a URL.
- Return **one research Markdown document** in the reply.
- Do not write files. Do not spawn further agents. You are already the researcher.

Keep their work read-only. Done when three cited briefs are back, or a missing member has been reported.

## 4. Synthesise

Read all three briefs. Write **one** comprehensive Markdown file at `docs/<topic-slug>.md` (create `docs/` if needed). Never write into `docs/adr/` or `docs/agents/`. If the path exists, use `docs/<topic-slug>-<n>.md` rather than overwriting.

The file is a synthesis, not a concatenation:

- What the three agree on
- Where they disagree, with each side's source
- Gaps none of them covered
- A merged source list
- Which catalog models ran

Every claim still carries a citation. Do not invent a source a brief did not have. Do not run another research round to paper over a disagreement — record it.

Done when the file is on disk.

## 5. Report

The path, which catalog models ran, and a short note on agreement vs disagreement. Stop.
