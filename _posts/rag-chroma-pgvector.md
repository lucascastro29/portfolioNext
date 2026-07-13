---
title: "RAG chroma & pgvector: dos implementaciones paralelas del mismo mecanismo de RAG"
date: "2026-07-13"
coverImage: "/images/rag-chroma-pgvector-cover.gif"
excerpt: "Documentos → chunks → embeddings → vector store → retrieval → generación con LLM, construido dos veces sobre el mismo corpus: una vez con Chroma y otra con pgvector, para compararlas lado a lado."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## La idea en una frase

**RAG chroma & pgvector** son dos implementaciones paralelas del mismo mecanismo de **RAG (Retrieval-Augmented Generation)**, construidas para entender de punta a punta cómo funciona: documentos → chunks → embeddings → vector store → retrieval → generación con LLM. Una versión usa **Chroma** (embebido) y la otra **pgvector** (Postgres), sobre el mismo corpus y la misma lógica de chunking, para poder compararlas lado a lado.

Es un proyecto de aprendizaje personal, no un producto — pero ambas versiones fueron corridas y probadas de punta a punta con una API key real de OpenAI.

---

## Cómo funciona

```
/corpus/*.md
   │
   ▼
[chunking]  → fragmentos de ~250 tokens (~1000 caracteres), overlap ~15%
   │
   ▼
[embeddings OpenAI text-embedding-3-small] → vectores de 1536 dims
   │
   ▼
[vector store]  Chroma (persistido en disco)  |  pgvector (tabla Postgres, columna vector(1536))
   │
   ▼  (en tiempo de consulta)
pregunta del usuario → embedding de la pregunta → búsqueda de similitud (top-k) → chunks recuperados
   │
   ▼
prompt = pregunta + chunks recuperados → OpenAI Chat Completions → respuesta grounded
```

El corpus es un set de documentos ficticios de **"TaskFlow"** (un SaaS inventado de gestión de tareas: features, precios, FAQ, troubleshooting, integraciones), lo que permite hacer preguntas concretas y verificar que la respuesta esté efectivamente basada en los documentos recuperados, no en el conocimiento general del modelo.

---

## El stack

| Componente | Elección | Por qué |
|---|---|---|
| Vector store v1 | **Chroma** | Embebido, cero infraestructura — corre dentro del mismo proceso Python. |
| Vector store v2 | **pgvector** | Extensión de Postgres, requiere `docker-compose` — más parecido a un stack real de producción. |
| Embeddings | **OpenAI `text-embedding-3-small`** | 1536 dimensiones, normalizados (similitud coseno = producto punto). |
| Generación | **OpenAI Chat Completions** | Mismo proveedor que embeddings, un solo API key. |
| Interfaz | **Streamlit** | UI mínima para probar preguntas y ver los chunks recuperados. |

Fuera de alcance a propósito: autenticación, despliegue, escalabilidad, multi-usuario, CI/CD. Es un proyecto para correr localmente y estudiar el mecanismo.

![Pipeline completo: corpus → chunking (~250 tokens, overlap 15%) → embeddings (1536 dims) → vector store (Chroma o pgvector) → retrieval top-k → generación con LLM.](/images/rag-stage-pipeline.gif)

---

## Estructura del repo

```
/corpus/                  ← compartido por ambas versiones (documentos de TaskFlow)
/version-chroma/           ← ingest, retrieval, generate, app Streamlit (Chroma)
/version-pgvector/         ← ingest, retrieval, generate, app Streamlit (Postgres + pgvector)
/docs/                     ← screenshots
TEORIA.md                  ← marco teórico de RAG (embeddings, chunking, vector stores) con links de referencia
biblia.md                  ← diseño completo del proyecto, roadmap y bugs encontrados durante la prueba
CLAUDE.md                  ← estado operativo del proyecto (para retomar trabajo con un agente/IA)
```

`/corpus` es compartido entre las dos versiones — no se duplica ni se edita por separado en cada carpeta, y la lógica de chunking es idéntica en ambas para que la comparación entre vector stores sea válida.

---

## Caso de ejemplo

Ambas versiones fueron corridas de punta a punta contra el mismo corpus. Esto es un resultado real (no simulado) de esa prueba — pregunta por consola en la versión Chroma (`python generate.py "¿qué incluye el plan Business?"`):

```
=== RESPUESTA ===
El plan Business incluye todo lo del plan Free, más:
- Proyectos ilimitados.
- Miembros ilimitados en el workspace.
- Vista Gantt con dependencias.
- 50 automatizaciones por proyecto.
- 20 campos personalizados por proyecto.
- Almacenamiento de adjuntos: 50 GB por workspace.
- Historial de actividad completo (sin límite de días).
- Roles personalizados (Admin, Editor, Visor, más roles custom).
- Integraciones con Slack, Google Calendar, GitHub y Zapier.
- Soporte prioritario por email con respuesta en 12 horas hábiles.
- Reportes de productividad del equipo (tareas completadas, tiempos promedio por estado, carga de trabajo por miembro).

=== CHUNKS USADOS ===
- pricing.md (chunk 2)
- pricing.md (chunk 3)
- pricing.md (chunk 0)
```

La respuesta está grounded en `pricing.md` — no inventa nada que no esté en el corpus, y muestra exactamente qué chunks la sustentan. Desde la UI de Streamlit, ambas versiones responden preguntas sobre los planes de TaskFlow mostrando los chunks recuperados (`pricing.md` y `features.md`) junto con su distancia de similitud — misma transparencia de grounding en las dos, aunque Chroma usa distancia coseno nativa y pgvector el operador `<->`.

![Transparencia de grounding: cada respuesta muestra exactamente qué chunks la sustentan (pricing.md, chunks 0/2/3), sin inventar nada fuera del corpus.](/images/rag-stage-grounded.gif)

---

## Chroma vs pgvector — qué se aprendió

- **Chroma** es más rápido para arrancar: no requiere infraestructura, ideal para prototipar y para ver el mecanismo de RAG sin distracción de DevOps.
- **pgvector** requiere levantar Postgres (`docker-compose`), pero es el camino más realista si el proyecto ya tiene datos relacionales y conviene unificar todo en la misma base.
- La lógica de chunking y embeddings es **idéntica** en ambas versiones — la única diferencia real es dónde y cómo se guarda y busca el vector, lo que hace la comparación válida.
- Para las mismas preguntas, los chunks recuperados en ambas UIs fueron equivalentes en la práctica.

![Chroma vs pgvector: mismo corpus y mismo chunking en la entrada, un solo comando (python ingest.py) contra un docker-compose up -d como diferencia real de setup.](/images/rag-stage-compare.gif)

---

## Problemas encontrados al probarlo (y cómo se resolvieron)

1. **`httpx` incompatible con `openai==1.54.4`**: instalar `requirements.txt` sin pin de `httpx` trae `httpx>=0.28`, que eliminó un parámetro que esa versión de `openai` todavía usa internamente (`TypeError: Client.__init__() got an unexpected keyword argument 'proxies'`). Ya está fijado en `requirements.txt` (`httpx==0.27.2`) en ambas versiones.
2. **Docker Desktop (Mac) cachea el port-forwarding**: si se recrea el contenedor de Postgres varias veces seguidas (`docker-compose down && up`), a veces el forwarding del puerto del host queda apuntando a una instancia vieja, y las conexiones desde fuera del contenedor fallan con `role "..." does not exist` aunque el rol exista adentro. Se soluciona cambiando `POSTGRES_PORT` en `.env` o reiniciando Docker Desktop.

Documentados en detalle en `biblia.md` (sección 8, BUGS) del repo.

---

## Quickstart

**Chroma:**

```bash
cd version-chroma
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp ../.env.example ../.env   # completar OPENAI_API_KEY
python ingest.py
streamlit run app.py
```

**pgvector:**

```bash
cd version-pgvector
docker-compose up -d          # levanta Postgres + extensión pgvector
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python ingest.py
streamlit run app.py
```

---

El repo está en [github.com/lucascastro29/RAG-chroma-pgvector](https://github.com/lucascastro29/RAG-chroma-pgvector). `TEORIA.md` tiene el marco teórico de RAG (embeddings, chunking, vector stores) con links de referencia, y `biblia.md`/`CLAUDE.md` documentan el proceso completo de arquitectura y ejecución, incluidos los bugs reales que aparecieron al probar el proyecto de punta a punta.
