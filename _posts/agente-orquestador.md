---
title: "Agente Orquestador: un sistema jerárquico de agentes Claude para uso personal"
date: "2026-05-19"
coverImage: "/images/agente-orquestador-cover.gif"
excerpt: "Un orquestador central que coordina sub-agentes y sesiones de Claude Code, accesible desde Telegram y web, con memoria persistente, un router que baja el costo por mensaje ~65% y tres capas de defensa contra prompt injection."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## La idea en una frase

**Agente Orquestador** es un sistema jerárquico de agentes Claude para uso personal: un orquestador central que coordina sub-agentes especializados y sesiones de Claude Code, accesible desde Telegram y desde una Web UI.

En vez de abrir una herramienta distinta para cada tarea, hablás con un solo agente que entiende el contexto, recuerda conversaciones pasadas y sabe a quién delegar cada trabajo — desde responder algo simple hasta lanzar un worker que codea por su cuenta.

---

## Qué hace

- **Orquestador personal** (Sonnet 4.6) accesible desde Telegram y browser.
- **Memoria persistente** entre conversaciones — no arranca en frío cada vez.
- **Lanza y monitorea sesiones de Claude Code** como workers.
- **Lee tareas de tableros Notion** etiquetados y las ejecuta automáticamente.
- **Sub-agentes especializados** para tareas complejas.
- **Router inteligente** (Haiku 4.5) que optimiza el costo por mensaje ~65%.
- **Seguridad en tres capas** contra prompt injection.

---

## El stack

| Capa | Tecnología |
|---|---|
| Backend | Python + FastAPI |
| LLM | Anthropic API (Sonnet 4.6, Haiku 4.5) |
| DB | PostgreSQL + SQLAlchemy async |
| Queue | Celery + Redis |
| Frontend | Next.js + TypeScript |
| Bot | python-telegram-bot |
| Deploy local | Docker Compose |

Todo corre local con `docker compose up --build`, y las credenciales viven en `.env`.

---

## El router inteligente: por qué existe

El detalle que más diferencia a este sistema de un "chatbot con memoria" es el **router**. No todos los mensajes necesitan el modelo más caro.

Antes de que el orquestador (Sonnet 4.6) toque un mensaje, un modelo barato y rápido (Haiku 4.5) lo clasifica y decide el camino más económico que igual resuelve bien la tarea. El resultado medido: **~65% menos de costo por mensaje**, sin que se note en la calidad de las respuestas.

Es la misma lógica que un buen equipo humano: no mandás al arquitecto senior a contestar un "¿a qué hora es la reunión?".

![El router (Haiku 4.5) clasifica cada mensaje antes de que lo toque el orquestador y elige el camino más barato que igual resuelve bien: la mayoría va por Haiku, solo lo complejo escala a Sonnet. Resultado: ~65% menos de costo por mensaje.](/images/orq-stage-router.gif)

---

## Sub-agentes y Claude Code como workers

El orquestador no hace todo él mismo. Para tareas complejas delega en **sub-agentes especializados**, y para trabajo de código real puede **lanzar sesiones de Claude Code** y monitorearlas como workers.

Esto convierte al sistema en algo más que un asistente conversacional: es un coordinador que reparte trabajo, sigue el progreso y trae los resultados de vuelta al mismo hilo desde donde le hablás por Telegram.

![El orquestador delega en sub-agentes y lanza sesiones de Claude Code como workers, monitorea el progreso de cada uno y trae los resultados de vuelta al hilo.](/images/orq-stage-workers.gif)

---

## Notion como fuente de tareas

Una de las piezas más útiles en el día a día: el orquestador **lee tableros de Notion etiquetados** y ejecuta las tareas automáticamente.

En vez de tener que pedirle cada cosa a mano, dejás la tarea anotada en Notion con el tag correcto y el sistema la levanta y la corre. El tablero se vuelve una cola de trabajo que el agente vacía solo.

---

## Seguridad: tres capas contra prompt injection

Un agente con acceso a herramientas, memoria y la capacidad de lanzar código es tan útil como peligroso si no está contenido. Por eso el sistema implementa **defensa en tres capas**:

1. **System prompt** con patrones a ignorar, presente en todos los agentes.
2. **Validación de tool calls** en el backend *antes* de ejecutar cualquier acción.
3. **Notificaciones al usuario** ante eventos sospechosos.

La idea de fondo: ningún texto que entre al sistema — venga de Telegram, de una web o de un documento — debería poder convencer a un agente de romper sus propias reglas.

![Tres capas de defensa contra prompt injection: el system prompt ignora patrones maliciosos, el backend valida cada tool call antes de ejecutar, y el usuario recibe notificaciones ante eventos sospechosos. Un intento de inyección queda bloqueado antes de pasar.](/images/orq-stage-security.gif)

---

## Las fases de implementación

El proyecto está pensado por fases, para que se pueda construir y retomar por partes:

```
Fase 0 — Infra Docker
Fase 1 — Backend + orquestador + Telegram
Fase 2 — Router inteligente
Fase 3 — Web UI
Fase 4 — Notion como fuente de tareas
Fase 5 — Sub-agentes especializados
Fase 6 — Gmail + Calendar + Watchers
Fase 7 — Claude Code bridge
Fase 8 — Agente Chrome
```

Cada fase es un bloque cerrado: se puede parar en una y retomar en la siguiente sin releer todo el contexto.

---

## Por qué lo construí así

La apuesta es simple: **una sola puerta de entrada, muchos especialistas detrás**. Un orquestador que conoce el contexto y decide, un router que cuida el costo, sub-agentes que hacen el trabajo pesado, y una capa de seguridad que asume que todo input es potencialmente hostil.

El resultado que busco es poder tirarle una tarea desde el teléfono — "corré esto", "arreglá aquello", "leé las tareas del tablero" — y que el sistema descomponga, delegue, ejecute y me traiga el resultado, gastando lo mínimo indispensable en el camino.

---

El repo está en [github.com/lucascastro29/Agente_Orquestador](https://github.com/lucascastro29/Agente_Orquestador). El `PROJECT.md` tiene la arquitectura completa, `CLAUDE.md` la guía de implementación por fases, y `SECURITY.md` el detalle de las políticas de seguridad.
