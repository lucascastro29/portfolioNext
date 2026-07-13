---
title: "Agentic trading bot: AI that trades Binance Futures for you"
date: "2026-07-13"
coverImage: "/images/blog-stub-cover.gif"
excerpt: "An autonomous bot that blends classic technical analysis with Claude agents to trade Binance Futures — with safety guardrails the AI can never bypass, auto-tuning of parameters and full control from Telegram."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## The premise

Trading crypto manually is exhausting, emotional and doesn't scale. The classic alternative — a bot with fixed rules — works until the market changes mood. So I built something in between: a bot that combines proven technical signals with Claude's reasoning to make decisions in the gray zones, but that can never bypass the risk rules. **The AI proposes, the risk rules dispose.**

The result is **Patroclo Warren**: a multi-agent bot that trades ETH, SOL and BTC on Binance Futures, designed for small accounts (~80 USDT) where the absolute priority is not blowing up the capital.

---

## Four layers of intelligence

The system isn't a monolithic script that fires orders — it's a four-layer architecture where each layer operates independently but in coordination.

### Bot Core — the execution engine

A continuous loop of ~7,000 lines of Python that handles the full trade lifecycle: market data via REST and WebSocket, signal calculation (EMA, RSI, ATR, Bollinger, MACD, volume, support/resistance), risk filters and order execution.

What's interesting is that the bot understands *market regimes*. It classifies each moment as TREND, RANGE or DEAD using ADX and ATR, and adjusts aggressiveness accordingly. Trading a clear trend isn't the same as trading a dead sideways market — and the bot knows it.

### Claude Decision Agent — AI for the gray zones

When a signal lands in the marginal zone (score = 5, right at the threshold), the bot neither enters nor discards on its own: it passes the full context to Claude and asks for a decision.

The agent plays two separate roles. The **Entry Agent** evaluates whether a marginal trade is worth entering (`ENTER` or `SKIP`). The **Position Agent** evaluates open positions and decides between `HOLD`, `CLOSE`, partial close, move stop-loss or move take-profit.

Each agent has its personality and rules in editable files — nothing is hardcoded.

### Claude Analyst Agent — the analyst that learns

A standalone agent built with the Claude Agent SDK that doesn't trade: it analyzes. It reads the trade database, calculates metrics (win rate, profit factor, expectancy by pair and by regime) and proposes quantitatively justified optimizations.

It has direct access to the bot's source code, logs and the SQLite database with the full trade history. It can run from the terminal, interactively, or be invoked from Telegram with `/analista`.

### Auto-Tuner — optimization that never sleeps

An autonomous loop that runs every N minutes, analyzes accumulated performance and adjusts bot parameters automatically. It can operate in semi-automatic mode (proposes and waits for Telegram approval) or full-auto mode.

Adjustments respect safe ranges per parameter — the tuner can never push a value outside the range defined in code — and there's a cooldown between changes to avoid overfitting on too few trades.

---

## Guardrails: the most important part of the project

If I had to pick one thing I'm proud of in this project, it's not the AI — it's the guardrails. Every order goes through Binance precision, tick size and step size validation. There's a cooldown between trades, a circuit breaker for losing streaks and a hard daily loss limit.

If Claude fails, returns garbage or takes too long, the bot enters defensive mode automatically: it blocks new entries and tightens protection on open positions. The premise is simple: **if something goes wrong, the default response is to protect capital, never to risk more.**

---

## Telegram control

The entire system is controllable from your phone. Bot status, position details, pause/resume trading, manual position closes, approve or reject AI decisions, switch between automatic and manual mode — all through Telegram commands.

This turns the bot into something you can monitor and adjust from anywhere, without needing a terminal in front of you.

---

## The stack

| Layer | Technology |
|---|---|
| Bot Core | Python (~7,000 lines) |
| Exchange | Binance API (REST + WebSocket) |
| AI | Anthropic API (Claude) |
| Analyst | Claude Agent SDK |
| DB | SQLite |
| Control | Telegram Bot API |
| Messaging | Telegram |

---

## Why I built it this way

Most trading bots do one of two things: either they follow mechanical rules (and fail when the market shifts) or they give too much freedom to AI (and lose money because an LLM has no real stakes in the game).

Patroclo Warren tries a third path: **mechanical rules as the floor, AI as a second opinion, guardrails as the ceiling**. The bot executes most decisions with fixed, proven logic; Claude only steps in when the signal is ambiguous; and the risk rules always have the final say. If the AI fails, the worst case is a missed opportunity — never extra capital at risk.

---

The repo is at [github.com/lucascastro29/botBinance](https://github.com/lucascastro29/botBinance).
