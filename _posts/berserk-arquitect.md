---
title: "berserk-arquitect: el skill que diseña antes de codear"
date: "2026-03-15"
coverImage: "/images/berserk-cover.gif"
excerpt: "Cómo construí un skill para Claude Code que interroga sin piedad la arquitectura de un proyecto y la cristaliza en dos archivos que se mantienen solos — para que codear sea casi mecánico."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## El problema real: codear sobre una arquitectura floja

Hay un patrón que se repite en casi todos los proyectos que arrancan con entusiasmo y mueren en el intento: **se codea antes de pensar**. No porque los devs sean descuidados — sino porque la presión de "mostrar algo" empuja a abrir el editor antes de haber cerrado las preguntas load-bearing del proyecto.

El resultado es predecible: la arquitectura se descubre a medida que se construye, los supuestos ocultos explotan en producción, y cada decisión nueva requiere reescribir tres que parecían sólidas.

**berserk-arquitect** es mi respuesta a ese problema. Es un skill para Claude Code (y Cowork) que hace una sola cosa con obsesión: diseñar y documentar tan bien que codear después sea casi mecánico.

---

## La idea en una frase

> El skill se llama "arquitecto" por una razón: su trabajo no es codear, es diseñar y documentar tan bien que codear sea casi mecánico. Codear sobre una arquitectura floja es la forma más cara de descubrir que estaba floja.

El skill hace tres cosas:

1. **Interroga sin piedad** el proyecto para exponer huecos, supuestos no dichos y contradicciones *antes* de escribir nada.
2. **Cristaliza** la arquitectura confirmada en dos archivos núcleo sin contenido duplicado.
3. **Mantiene** esos archivos sincronizados a medida que el proyecto avanza.

---

## Los dos archivos núcleo

El corazón del método son dos archivos con responsabilidades distintas y sin solapamiento:

| Archivo | Qué es | Contiene |
|---|---|---|
| `biblia.md` | La verdad completa y estable. El *qué* y el *por qué*. | Visión, negocio, contexto, stack, arquitectura de datos, fases con etapas y work-orders, y las tres secciones vivas. |
| `CLAUDE.md` | La entrada operativa, corta. El *cómo trabajar* y el *dónde quedamos*. | Reglas para quien codee, puntero a la biblia, el estado actual y el protocolo de retoma. |

La regla de oro es **cero solapamiento = cero drift**. Dos archivos que dicen lo mismo siempre terminan divergiendo. Por eso la separación es tajante:

- Todo lo estable y completo vive **solo en `biblia.md`**.
- Todo lo operativo y el estado mutable viven **solo en `CLAUDE.md`**.
- Cuando algo cambia, se actualiza **el archivo que corresponde**, no los dos.

**Regla práctica para decidir dónde va algo:** ¿es verdad estable del proyecto? → `biblia.md`. ¿Es instrucción de cómo trabajar o estado de dónde vamos? → `CLAUDE.md`.

![Cada dato nuevo se rutea a un solo archivo: la verdad estable va a biblia.md, el estado y el cómo-trabajar van a CLAUDE.md. Cero solapamiento = cero drift.](/images/berserk-stage-files.gif)

---

## El interrogatorio: una falla por ronda

Esta es la parte que más diferencia al skill de cualquier template de arquitectura genérico.

El skill no dispara veinte preguntas sueltas. **Ataca una falla estructural por ronda**, empezando siempre por lo más *load-bearing* (el modelo de negocio, el borde del sistema, el modelo de datos). Si esa falla no queda resuelta, todo lo que construyas encima puede caerse.

### Cómo se ve un buen grill

- **Concreto y adversarial, no genérico.** No "¿cómo monetiza?" sino algo que ataque el borde puntual: *"decís precio único, pero cuando agregues contenido nuevo post-lanzamiento, ¿los que ya pagaron lo reciben gratis o nunca más vendés nada?"*
- **Persigue las respuestas esquivadas.** Si contestás con un requisito nuevo en vez de responder, vuelve sobre la pregunta original.
- **Confronta con evidencia.** Si hay repos o docs previos, los lee y usa las contradicciones reales como munición.
- **Cierra explícitamente.** Cuando converge, recita el diseño final en una pasada y pide **confirmación literal** antes de generar nada.

Los frentes que cubre antes de cerrar:

- Visión y propuesta de valor
- Modelo de negocio
- Quién es el usuario y cómo entra al sistema
- Stack y por qué ese stack
- Arquitectura de datos
- Qué entra y qué **NO** entra en el alcance
- Cómo se corta en fases y etapas
- Qué tareas merecen módulo propio
- Qué cosas nunca se deben hacer

![El interrogatorio ataca una falla estructural por ronda, empezando por lo más load-bearing (negocio, usuario, datos, alcance, fases) y cerrando cada frente antes de avanzar.](/images/berserk-stage-grill.gif)

---

## Los tres modos de uso

### Modo A — Inicio de proyecto (o formalizar uno existente)

El flujo principal. Cinco pasos:

1. **Interrogatorio** — el skill grillea hasta cerrar todos los bordes.
2. **Cristalización** — genera `biblia.md` y `CLAUDE.md` con cero solapamiento.
3. **Modelo de fases reanudable** — el plan se corta en fases → etapas → work-orders.
4. **Las tres secciones vivas** — quedan escritas para registrar el proyecto a lo largo del tiempo.
5. **Regla de modularización** — se deja escrita la regla de cuándo sacar flujos repetibles a su propio MD.

```bash
/anthropic-skills:berserk-arquitect armemos la biblia de un proyecto nuevo
```

### Modo B — Auditar un diseño existente

Si ya tenés un proyecto (con o sin docs), el skill lo formaliza y lo audita. Arranca **leyendo lo que ya existe** y usa las contradicciones reales como munición del interrogatorio.

Un ejemplo real: en una sesión, el `CLAUDE.md` viejo decía que el proyecto estaba en *"FASE 0 monolito"*, pero el repo ya estaba migrado a React. Esa contradicción fue la primera munición del grill.

```bash
/anthropic-skills:berserk-arquitect auditá este repo antes de que siga codeando
```

### Modo C — Mantenimiento (uso recurrente)

Cada vez que avanzás — completás un paso, cerrás un bug, registrás una mejora — invocás el skill para que actualice **solo el archivo que corresponde**:

```bash
/anthropic-skills:berserk-arquitect cerré la etapa 2.1 y encontré un bug, actualizá
```

Así nunca tenés que revisar a mano si los dos archivos están al día.

---

## El modelo de fases reanudable

El plan de desarrollo se estructura así:

```
FASE        → un hito grande de producto (ej: "v1.0 en producción")
  ETAPA     → un bloque de trabajo dentro de la fase (ej: "Setup de base de datos")
    WORK-ORDER → una tarea atómica, tomable de a una por sesión ([ ] / [x])
```

Es **reanudable** por diseño: cualquiera puede parar y retomar exactamente en el último paso, sin releer todo. Lo que lo hace posible:

- Las casillas `[ ]`/`[x]` viven en `biblia.md` (el plan con su avance).
- El **puntero único** vive en `CLAUDE.md → ESTADO ACTUAL`: fase activa, etapa activa, último paso completado, próximo paso exacto, último archivo tocado.
- El **protocolo de retoma** dice: al arrancar una sesión nueva, leé el ESTADO ACTUAL antes que nada, no reescribas lo que ya funciona, seguí desde el próximo paso.

**Regla de ejecución:** una etapa por sesión. No mezclar etapas ni adelantar fases.

![El plan se corta en FASE → ETAPA → WORK-ORDER. Las casillas se marcan una a una y el puntero ESTADO ACTUAL avanza al próximo paso, para retomar en frío sin releer todo.](/images/berserk-stage-phases.gif)

---

## Las tres secciones vivas

Están separadas a propósito en `biblia.md`, para que un bug no se confunda con una etapa planificada ni una mejora técnica ensucie el roadmap:

| Sección | Qué registra | Atributos |
|---|---|---|
| **STEPS** | El avance de fases/etapas con sus casillas. El plan en ejecución. | `[ ]`/`[x]` |
| **BUGS** | Defectos hallados fuera del flujo normal de etapas. | estado · etapa donde se reconoció · fecha · duración · descripción · fix |
| **MEJORAS TÉCNICAS** | Cambios de calidad técnica que no son ni feature ni bug. | estado · etapa de referencia · fecha · duración · impacto medible · descripción |

---

## Handoff a la terminal

El skill **no ejecuta las etapas** — eso lo hace un modelo potente en una terminal (Claude Code). El loop de ejecución es:

1. Abrís la terminal en la raíz del repo y lanzás `claude`.
2. Prompt de arranque:

```
Leé CLAUDE.md y después biblia.md completa. Tomá la etapa que indica
ESTADO ACTUAL, work-order por work-order. Al cerrar cada paso, marcá la
casilla en biblia.md y actualizá ESTADO ACTUAL en CLAUDE.md.
Commit chico por work-order. No mezcles etapas ni adelantes fases.
```

3. Cada sesión: lee el estado → ejecuta una etapa → marca casillas → mueve el puntero → commitea.

Si se corta el contexto, el protocolo de retoma deja todo listo para la próxima sesión sin perder nada.

---

## Por qué funciona

La clave del método no es la herramienta — es la **disciplina de separación**. Cuando hay una sola fuente de verdad para cada tipo de información, no hay drift. Cuando el estado del proyecto tiene un único punto de actualización, no hay versiones desincronizadas.

El interrogatorio adversarial fuerza a cerrar los bordes antes de codear. El modelo de fases reanudable hace que cualquier sesión pueda arrancar en frío sin repasar todo el contexto. Y las tres secciones vivas separan bugs, mejoras y avance de forma que ninguno contamine al otro.

El resultado: entrás a codear con el diseño cerrado, y cada decisión load-bearing ya tiene respuesta antes de que te la preguntes en el medio de una función.

---

## Cheat sheet

```
INICIO       /anthropic-skills:berserk-arquitect armemos la biblia
AUDITORÍA    /anthropic-skills:berserk-arquitect auditá el diseño antes de codear
AVANCE       /anthropic-skills:berserk-arquitect cerré la etapa X, actualizá el estado
MÓDULO       /anthropic-skills:berserk-arquitect generá un md reutilizable del flujo X
SNAPSHOT     /anthropic-skills:berserk-arquitect pasame la biblia a docx
```

**Reglas de oro:**

- Leé primero `CLAUDE.md` (dónde vamos) → `biblia.md` (la verdad completa).
- Una sola fuente del estado: `CLAUDE.md → ESTADO ACTUAL`.
- Una etapa por sesión. No mezclar etapas. No duplicar entre archivos.

---

El repo está en [github.com/lucascastro29/berserk](https://github.com/lucascastro29/berserk). El README es el manual completo del método.
