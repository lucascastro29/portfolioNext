---
title: "RAG chroma & pgvector: two parallel implementations of the same RAG mechanism"
date: "2026-07-13"
coverImage: "/images/rag-chroma-pgvector-cover.gif"
excerpt: "Documents → chunks → embeddings → vector store → retrieval → LLM generation, built twice over the same corpus: once with Chroma and once with pgvector, to compare them side by side."
author:
  name: "Lucas Castro"
  picture: "/images/foto.jpg"
ogImage:
  url: "/images/svgicon.svg"
---

## The idea in one sentence

**RAG chroma & pgvector** are two parallel implementations of the same **RAG (Retrieval-Augmented Generation)** mechanism, built to understand end-to-end how it works: documents → chunks → embeddings → vector store → retrieval → LLM generation. One version uses **Chroma** (embedded) and the other **pgvector** (Postgres), over the same corpus and the same chunking logic, so they can be compared side by side.

It's a personal learning project, not a product — but both versions were run and tested end-to-end with a real OpenAI API key.

---

## How it works

```
/corpus/*.md
   │
   ▼
[chunking]  → ~250-token fragments (~1000 characters), ~15% overlap
   │
   ▼
[OpenAI text-embedding-3-small embeddings] → 1536-dim vectors
   │
   ▼
[vector store]  Chroma (persisted to disk)  |  pgvector (Postgres table, vector(1536) column)
   │
   ▼  (at query time)
user question → question embedding → similarity search (top-k) → retrieved chunks
   │
   ▼
prompt = question + retrieved chunks → OpenAI Chat Completions → grounded answer
```

The corpus is a set of fictional **"TaskFlow"** documents (a made-up task-management SaaS: features, pricing, FAQ, troubleshooting, integrations), which makes it possible to ask concrete questions and verify that the answer is actually grounded in the retrieved documents, not in the model's general knowledge.

---

## The stack

| Layer | Choice | Why |
|---|---|---|
| Vector store v1 | **Chroma** | Embedded, zero infrastructure — runs inside the same Python process. |
| Vector store v2 | **pgvector** | Postgres extension, needs `docker-compose` — closer to a real production stack. |
| Embeddings | **OpenAI `text-embedding-3-small`** | 1536 dimensions, normalized (cosine similarity = dot product). |
| Generation | **OpenAI Chat Completions** | Same provider as embeddings, a single API key. |
| Interface | **Streamlit** | Minimal UI to try questions and see the retrieved chunks. |

Deliberately out of scope: auth, deployment, scalability, multi-tenant, CI/CD. It's a project meant to run locally and study the mechanism.

![Full pipeline: corpus → chunking (~250 tokens, 15% overlap) → embeddings (1536 dims) → vector store (Chroma or pgvector) → top-k retrieval → LLM generation.](/images/rag-stage-pipeline.gif)

---

## Repo structure

```
/corpus/                  ← shared by both versions (TaskFlow documents)
/version-chroma/           ← ingest, retrieval, generate, Streamlit app (Chroma)
/version-pgvector/         ← ingest, retrieval, generate, Streamlit app (Postgres + pgvector)
/docs/                     ← screenshots
TEORIA.md                  ← RAG theory (embeddings, chunking, vector stores) with reference links
biblia.md                  ← full project design, roadmap and bugs found during testing
CLAUDE.md                  ← operational state of the project (to resume work with an agent/AI)
```

`/corpus` is shared between the two versions — it's not duplicated or edited separately in each folder, and the chunking logic is identical in both so the comparison between vector stores is valid.

---

## A worked example

Both versions were run end-to-end against the same corpus. This is a real (not simulated) result from that test — a console question on the Chroma version (`python generate.py "what does the Business plan include?"`):

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

The answer is grounded in `pricing.md` — it doesn't invent anything outside the corpus, and it shows exactly which chunks back it up. From the Streamlit UI, both versions answer questions about TaskFlow's plans while showing the retrieved chunks (`pricing.md` and `features.md`) along with their similarity distance — same grounding transparency in both, though Chroma uses native cosine distance and pgvector the `<->` operator.

![Grounding transparency: every answer shows exactly which chunks back it up (pricing.md, chunks 0/2/3), without inventing anything outside the corpus.](/images/rag-stage-grounded.gif)

---

## Chroma vs pgvector — what I learned

- **Chroma** is faster to get started with: no infrastructure required, ideal for prototyping and for seeing the RAG mechanism without DevOps distractions.
- **pgvector** requires spinning up Postgres (`docker-compose`), but it's the more realistic path if the project already has relational data and it makes sense to unify everything in the same database.
- The chunking and embedding logic is **identical** in both versions — the only real difference is where and how the vector is stored and searched, which is what makes the comparison valid.
- For the same questions, the retrieved chunks in both UIs were equivalent in practice.

![Chroma vs pgvector: same corpus and same chunking going in, a single command (python ingest.py) versus a docker-compose up -d as the real setup difference.](/images/rag-stage-compare.gif)

---

## Issues found while testing it (and how they were fixed)

1. **`httpx` incompatible with `openai==1.54.4`**: installing `requirements.txt` without pinning `httpx` pulls in `httpx>=0.28`, which removed a parameter that this `openai` version still uses internally (`TypeError: Client.__init__() got an unexpected keyword argument 'proxies'`). Already fixed in `requirements.txt` (`httpx==0.27.2`) in both versions.
2. **Docker Desktop (Mac) caches port-forwarding**: if the Postgres container is recreated several times in a row (`docker-compose down && up`), the host port forwarding sometimes keeps pointing at a stale instance, and connections from outside the container fail with `role "..." does not exist` even though the role exists inside. Fixed by changing `POSTGRES_PORT` in `.env` or restarting Docker Desktop.

Documented in detail in the repo's `biblia.md` (section 8, BUGS).

---

## Quickstart

**Chroma:**

```bash
cd version-chroma
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp ../.env.example ../.env   # fill in OPENAI_API_KEY
python ingest.py
streamlit run app.py
```

**pgvector:**

```bash
cd version-pgvector
docker-compose up -d          # spins up Postgres + pgvector extension
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python ingest.py
streamlit run app.py
```

---

The repo is at [github.com/lucascastro29/RAG-chroma-pgvector](https://github.com/lucascastro29/RAG-chroma-pgvector). `TEORIA.md` has the RAG theory (embeddings, chunking, vector stores) with reference links, and `biblia.md`/`CLAUDE.md` document the full architecture and execution process, including the real bugs that showed up while testing the project end-to-end.
