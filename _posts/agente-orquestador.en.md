---
title: "Orchestrator Agent: a hierarchical system of Claude agents for personal use"
date: "2026-05-19"
coverImage: "/images/agente-orquestador-cover.gif"
excerpt: "A central orchestrator that coordinates sub-agents and Claude Code sessions, reachable from Telegram and web, with persistent memory, a router that cuts cost per message by ~65% and three layers of defense against prompt injection."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## The idea in one sentence

**Orchestrator Agent** is a hierarchical system of Claude agents for personal use: a central orchestrator that coordinates specialized sub-agents and Claude Code sessions, reachable from Telegram and from a Web UI.

Instead of opening a different tool for each task, you talk to a single agent that understands the context, remembers past conversations and knows who to delegate each job to — from answering something simple to launching a worker that codes on its own.

---

## What it does

- **Personal orchestrator** (Sonnet 4.6) reachable from Telegram and the browser.
- **Persistent memory** across conversations — it doesn't start cold every time.
- **Launches and monitors Claude Code sessions** as workers.
- **Reads tasks from tagged Notion boards** and runs them automatically.
- **Specialized sub-agents** for complex tasks.
- **Smart router** (Haiku 4.5) that optimizes cost per message by ~65%.
- **Three-layer security** against prompt injection.

---

## The stack

| Layer | Technology |
|---|---|
| Backend | Python + FastAPI |
| LLM | Anthropic API (Sonnet 4.6, Haiku 4.5) |
| DB | PostgreSQL + SQLAlchemy async |
| Queue | Celery + Redis |
| Frontend | Next.js + TypeScript |
| Bot | python-telegram-bot |
| Local deploy | Docker Compose |

Everything runs locally with `docker compose up --build`, and credentials live in `.env`.

---

## The smart router: why it exists

The detail that most sets this system apart from a "chatbot with memory" is the **router**. Not every message needs the most expensive model.

Before the orchestrator (Sonnet 4.6) touches a message, a cheap, fast model (Haiku 4.5) classifies it and decides the most economical path that still solves the task well. The measured result: **~65% lower cost per message**, with no noticeable drop in response quality.

It's the same logic as a good human team: you don't send the senior architect to answer "what time is the meeting?".

![The router (Haiku 4.5) classifies every message before the orchestrator touches it and picks the cheapest path that still solves it well: most go through Haiku, only the complex ones escalate to Sonnet. Result: ~65% lower cost per message.](/images/orq-stage-router.gif)

---

## Sub-agents and Claude Code as workers

The orchestrator doesn't do everything itself. For complex tasks it delegates to **specialized sub-agents**, and for real code work it can **launch Claude Code sessions** and monitor them as workers.

This turns the system into more than a conversational assistant: it's a coordinator that hands out work, tracks progress and brings the results back to the same thread you talk to on Telegram.

![The orchestrator delegates to sub-agents and launches Claude Code sessions as workers, monitors each one's progress and brings the results back to the thread.](/images/orq-stage-workers.gif)

---

## Notion as a task source

One of the most useful pieces in day-to-day work: the orchestrator **reads tagged Notion boards** and runs the tasks automatically.

Instead of having to ask for each thing by hand, you leave the task noted in Notion with the right tag and the system picks it up and runs it. The board becomes a work queue that the agent empties on its own.

---

## Security: three layers against prompt injection

An agent with access to tools, memory and the ability to launch code is as useful as it is dangerous if it isn't contained. That's why the system implements **three-layer defense**:

1. **System prompt** with patterns to ignore, present in every agent.
2. **Tool-call validation** in the backend *before* executing any action.
3. **User notifications** on suspicious events.

The underlying idea: no text entering the system — whether from Telegram, a website or a document — should be able to convince an agent to break its own rules.

![Three layers of defense against prompt injection: the system prompt ignores malicious patterns, the backend validates every tool call before executing, and the user gets notifications on suspicious events. An injection attempt is blocked before it can pass.](/images/orq-stage-security.gif)

---

## The implementation phases

The project is designed in phases, so it can be built and resumed in parts:

```
Phase 0 — Docker infra
Phase 1 — Backend + orchestrator + Telegram
Phase 2 — Smart router
Phase 3 — Web UI
Phase 4 — Notion as a task source
Phase 5 — Specialized sub-agents
Phase 6 — Gmail + Calendar + Watchers
Phase 7 — Claude Code bridge
Phase 8 — Chrome agent
```

Each phase is a closed block: you can stop at one and resume at the next without rereading the whole context.

---

## Why I built it this way

The bet is simple: **a single entry point, many specialists behind it**. An orchestrator that knows the context and decides, a router that watches the cost, sub-agents that do the heavy lifting, and a security layer that assumes every input is potentially hostile.

The outcome I'm after is being able to throw a task at it from my phone — "run this", "fix that", "read the board's tasks" — and have the system break it down, delegate, execute and bring me the result, spending the bare minimum along the way.

---

The repo is at [github.com/lucascastro29/Agente_Orquestador](https://github.com/lucascastro29/Agente_Orquestador). `PROJECT.md` has the full architecture, `CLAUDE.md` the phase-by-phase implementation guide, and `SECURITY.md` the details of the security policies.
