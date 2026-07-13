---
title: "berserk-arquitect: the skill that designs before coding"
date: "2026-06-26"
coverImage: "/images/berserk-cover.gif"
excerpt: "How I built a skill for Claude Code that mercilessly interrogates a project's architecture and crystallizes it into two self-maintaining files — so that coding becomes almost mechanical."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## The real problem: coding on top of a shaky architecture

There's a pattern that repeats in almost every project that starts with enthusiasm and dies trying: **people code before thinking**. Not because devs are careless — but because the pressure to "show something" pushes them to open the editor before closing the project's load-bearing questions.

The result is predictable: the architecture gets discovered as it's built, hidden assumptions blow up in production, and every new decision forces you to rewrite three that seemed solid.

**berserk-arquitect** is my answer to that problem. It's a skill for Claude Code (and Cowork) that does one thing obsessively: design and document so well that coding afterwards becomes almost mechanical.

---

## The idea in one sentence

> The skill is called "architect" for a reason: its job isn't to code, it's to design and document so well that coding becomes almost mechanical. Coding on top of a shaky architecture is the most expensive way to discover it was shaky.

The skill does three things:

1. **Mercilessly interrogates** the project to expose gaps, unspoken assumptions and contradictions *before* writing anything.
2. **Crystallizes** the confirmed architecture into two core files with no duplicated content.
3. **Keeps** those files in sync as the project moves forward.

---

## The two core files

The heart of the method is two files with distinct, non-overlapping responsibilities:

| File | What it is | Contains |
|---|---|---|
| `biblia.md` | The complete, stable truth. The *what* and the *why*. | Vision, business, context, stack, data architecture, phases with stages and work-orders, and the three living sections. |
| `CLAUDE.md` | The short operational entry point. The *how to work* and the *where we left off*. | Rules for whoever codes, a pointer to the bible, the current state and the resume protocol. |

The golden rule is **zero overlap = zero drift**. Two files that say the same thing always end up diverging. That's why the separation is strict:

- Everything stable and complete lives **only in `biblia.md`**.
- Everything operational and the mutable state live **only in `CLAUDE.md`**.
- When something changes, you update **the file it belongs to**, not both.

**Practical rule to decide where something goes:** is it stable truth about the project? → `biblia.md`. Is it an instruction on how to work or the state of where we are? → `CLAUDE.md`.

![Every new piece of information routes to a single file: stable truth goes to biblia.md, state and how-to-work go to CLAUDE.md. Zero overlap = zero drift.](/images/berserk-stage-files.gif)

---

## The interrogation: one flaw per round

This is the part that most sets the skill apart from any generic architecture template.

The skill doesn't fire twenty loose questions. **It attacks one structural flaw per round**, always starting with the most *load-bearing* one (the business model, the system boundary, the data model). If that flaw isn't resolved, everything you build on top of it can collapse.

### What a good grilling looks like

- **Concrete and adversarial, not generic.** Not "how do you monetize?" but something that attacks the specific edge: *"you say a one-time price, but when you add new content post-launch, do the people who already paid get it for free, or do you never sell anything again?"*
- **Chases down dodged answers.** If you reply with a new requirement instead of answering, it comes back to the original question.
- **Confronts with evidence.** If there are prior repos or docs, it reads them and uses the real contradictions as ammunition.
- **Closes explicitly.** When it converges, it recites the final design in one pass and asks for **literal confirmation** before generating anything.

The fronts it covers before closing:

- Vision and value proposition
- Business model
- Who the user is and how they enter the system
- Stack and why that stack
- Data architecture
- What's in and what's **NOT** in scope
- How it's cut into phases and stages
- Which tasks deserve their own module
- What must never be done

![The interrogation attacks one structural flaw per round, starting with the most load-bearing one (business, user, data, scope, phases) and closing each front before moving on.](/images/berserk-stage-grill.gif)

---

## The three modes of use

### Mode A — Project start (or formalizing an existing one)

The main flow. Five steps:

1. **Interrogation** — the skill grills until every edge is closed.
2. **Crystallization** — it generates `biblia.md` and `CLAUDE.md` with zero overlap.
3. **Resumable phase model** — the plan is cut into phases → stages → work-orders.
4. **The three living sections** — written down to record the project over time.
5. **Modularization rule** — the rule for when to pull repeatable flows into their own MD is written down.

```bash
/anthropic-skills:berserk-arquitect let's build the bible for a new project
```

### Mode B — Audit an existing design

If you already have a project (with or without docs), the skill formalizes and audits it. It starts by **reading what already exists** and uses the real contradictions as interrogation ammunition.

A real example: in one session, the old `CLAUDE.md` said the project was in *"PHASE 0 monolith"*, but the repo had already been migrated to React. That contradiction was the first piece of ammunition for the grilling.

```bash
/anthropic-skills:berserk-arquitect audit this repo before I keep coding
```

### Mode C — Maintenance (recurring use)

Every time you make progress — complete a step, close a bug, log an improvement — you invoke the skill so it updates **only the file it belongs to**:

```bash
/anthropic-skills:berserk-arquitect I closed stage 2.1 and found a bug, update
```

That way you never have to manually check whether the two files are up to date.

---

## The resumable phase model

The development plan is structured like this:

```
PHASE        → a big product milestone (e.g. "v1.0 in production")
  STAGE      → a block of work within the phase (e.g. "Database setup")
    WORK-ORDER → an atomic task, taken one at a time per session ([ ] / [x])
```

It's **resumable** by design: anyone can stop and pick up exactly at the last step, without rereading everything. What makes it possible:

- The `[ ]`/`[x]` checkboxes live in `biblia.md` (the plan with its progress).
- The **single pointer** lives in `CLAUDE.md → CURRENT STATE`: active phase, active stage, last completed step, exact next step, last file touched.
- The **resume protocol** says: when starting a new session, read the CURRENT STATE first, don't rewrite what already works, continue from the next step.

**Execution rule:** one stage per session. Don't mix stages or jump ahead on phases.

![The plan is cut into PHASE → STAGE → WORK-ORDER. Checkboxes get ticked one by one and the CURRENT STATE pointer advances to the next step, so you can resume cold without rereading everything.](/images/berserk-stage-phases.gif)

---

## The three living sections

They're deliberately kept separate in `biblia.md`, so a bug doesn't get confused with a planned stage nor a technical improvement clutters the roadmap:

| Section | What it records | Attributes |
|---|---|---|
| **STEPS** | The progress of phases/stages with their checkboxes. The plan in execution. | `[ ]`/`[x]` |
| **BUGS** | Defects found outside the normal stage flow. | status · stage where it was spotted · date · duration · description · fix |
| **TECHNICAL IMPROVEMENTS** | Technical-quality changes that are neither feature nor bug. | status · reference stage · date · duration · measurable impact · description |

---

## Handoff to the terminal

The skill **doesn't execute the stages** — a powerful model does that in a terminal (Claude Code). The execution loop is:

1. Open the terminal at the repo root and launch `claude`.
2. Startup prompt:

```
Read CLAUDE.md and then the full biblia.md. Take the stage indicated by
CURRENT STATE, work-order by work-order. On closing each step, tick the
checkbox in biblia.md and update CURRENT STATE in CLAUDE.md.
Small commit per work-order. Don't mix stages or jump ahead on phases.
```

3. Each session: read the state → execute one stage → tick checkboxes → move the pointer → commit.

If the context runs out, the resume protocol leaves everything ready for the next session without losing anything.

---

## Why it works

The key to the method isn't the tool — it's the **discipline of separation**. When there's a single source of truth for each kind of information, there's no drift. When the project state has a single update point, there are no out-of-sync versions.

The adversarial interrogation forces you to close the edges before coding. The resumable phase model lets any session start cold without reviewing the whole context. And the three living sections separate bugs, improvements and progress so that none contaminates the other.

The result: you start coding with the design already closed, and every load-bearing decision already has an answer before you'd ask it in the middle of a function.

---

## Cheat sheet

```
START        /anthropic-skills:berserk-arquitect let's build the bible
AUDIT        /anthropic-skills:berserk-arquitect audit the design before coding
PROGRESS     /anthropic-skills:berserk-arquitect I closed stage X, update the state
MODULE       /anthropic-skills:berserk-arquitect generate a reusable md for flow X
SNAPSHOT     /anthropic-skills:berserk-arquitect export the bible to docx
```

**Golden rules:**

- Read `CLAUDE.md` first (where we are) → `biblia.md` (the complete truth).
- A single source of state: `CLAUDE.md → CURRENT STATE`.
- One stage per session. Don't mix stages. Don't duplicate between files.

---

The repo is at [github.com/lucascastro29/berserk](https://github.com/lucascastro29/berserk-arquitect). The README is the complete manual for the method.
