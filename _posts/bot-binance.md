---
title: "Bot agéntico de trading: IA que opera Binance Futures por vos"
date: "2026-07-13"
coverImage: "/images/blog-stub-cover.gif"
excerpt: "Un bot autónomo que combina análisis técnico clásico con agentes Claude para operar futuros en Binance — con guardrails de seguridad que la IA nunca puede saltear, auto-tuning de parámetros y control total desde Telegram."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## La premisa

Operar criptomonedas manualmente es agotador, emocional y poco escalable. La alternativa clásica — un bot con reglas fijas — funciona hasta que el mercado cambia de humor. Así que construí algo intermedio: un bot que combina señales técnicas probadas con la capacidad de razonamiento de Claude para tomar decisiones en las zonas grises, pero que nunca puede saltear las reglas de riesgo. **La IA propone, las reglas de riesgo disponen.**

El resultado es **Patroclo Warren**: un bot multi-agente que opera ETH, SOL y BTC en Binance Futures, diseñado para cuentas chicas (~80 USDT) donde la prioridad absoluta es no volar el capital.

---

## Cuatro capas de inteligencia

El sistema no es un script monolítico que ejecuta órdenes — es una arquitectura de cuatro capas que operan de forma independiente pero coordinada.

### Bot Core — el motor de ejecución

Un loop continuo de ~7000 líneas en Python que maneja todo el ciclo de un trade: datos de mercado por REST y WebSocket, cálculo de señales (EMA, RSI, ATR, Bollinger, MACD, volumen, soportes/resistencias), filtros de riesgo y ejecución de órdenes.

Lo interesante es que el bot entiende *regímenes de mercado*. Clasifica cada momento como TREND, RANGE o DEAD usando ADX y ATR, y modula la agresividad según el régimen. No es lo mismo operar en una tendencia clara que en un mercado lateral muerto — y el bot lo sabe.

### Claude Decision Agent — la IA que decide en las zonas grises

Cuando una señal queda en zona marginal (score = 5, justo en el límite), el bot no entra ni descarta solo: le pasa el contexto completo a Claude y le pide una decisión.

El agente tiene dos roles que operan por separado. El **Entry Agent** evalúa si vale la pena entrar a un trade marginal (`ENTER` o `SKIP`). El **Position Agent** evalúa posiciones abiertas y decide entre `HOLD`, `CLOSE`, cierre parcial, mover stop-loss o mover take-profit.

Cada agente tiene su personalidad y sus reglas en archivos editables — no están hardcodeados en el código.

### Claude Analyst Agent — el analista que aprende

Un agente independiente construido con el Claude Agent SDK que no opera: analiza. Lee la base de trades, calcula métricas (win rate, profit factor, expectancy por par y por régimen) y propone optimizaciones con justificación cuantitativa.

Tiene acceso directo al código del bot, a los logs y a la base de datos SQLite con todo el historial. Puede correr desde la terminal, en modo interactivo, o invocarse desde Telegram con `/analista`.

### Auto-Tuner — la optimización que no duerme

Un loop autónomo que corre cada N minutos, analiza la performance acumulada y ajusta parámetros del bot automáticamente. Puede operar en modo semi-automático (propone y espera aprobación por Telegram) o en modo full-auto.

Los ajustes respetan rangos seguros por parámetro — el tuner nunca puede sacar un valor fuera del rango definido en código — y tiene cooldown entre cambios para no sobreajustar con pocos trades.

---

## Guardrails: la parte más importante del proyecto

Si tuviera que elegir una sola cosa de la que estoy orgulloso en este proyecto, no es la IA — son los guardrails. Cada orden pasa por validación de precision, tick size y step size de Binance. Hay cooldown entre trades, circuit breaker por rachas y un límite duro de pérdida diaria.

Si Claude falla, devuelve basura o tarda demasiado, el bot entra en modo defensivo automáticamente: bloquea nuevas entradas y endurece la protección de posiciones abiertas. La premisa es simple: **si algo sale mal, la respuesta por defecto es proteger el capital, nunca arriesgar más.**

---

## Control por Telegram

Todo el sistema es controlable desde el teléfono. Estado del bot, detalle de posiciones, pausar/reanudar operación, cerrar posiciones manualmente, aprobar o rechazar decisiones de la IA, cambiar entre modo automático y manual — todo con comandos de Telegram.

Esto convierte al bot en algo que podés monitorear y ajustar desde cualquier lado, sin necesidad de estar frente a una terminal.

---

## El stack

| Capa | Tecnología |
|---|---|
| Bot Core | Python (~7000 líneas) |
| Exchange | Binance API (REST + WebSocket) |
| IA | Anthropic API (Claude) |
| Analyst | Claude Agent SDK |
| DB | SQLite |
| Control | Telegram Bot API |
| Mensajería | Telegram |

---

## Por qué lo construí así

La mayoría de los bots de trading hacen una de dos cosas: o siguen reglas mecánicas (y fallan cuando el mercado cambia) o le dan demasiada libertad a la IA (y pierden plata porque un LLM no tiene stakes reales en el juego).

Patroclo Warren intenta un tercer camino: **reglas mecánicas como piso, IA como segundo opinador, guardrails como techo**. El bot ejecuta la mayor parte de las decisiones con lógica fija y probada; Claude entra solo cuando la señal es ambigua; y las reglas de riesgo tienen la última palabra siempre. Si la IA falla, el peor caso es que se pierda una oportunidad — nunca que se arriesgue capital de más.

---

El repo está en [github.com/lucascastro29/botBinance](https://github.com/lucascastro29/botBinance).
