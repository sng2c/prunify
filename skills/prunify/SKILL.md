---
name: prunify
version: "0.9.6"
description: "Top-down design in the factory-line picture: split a problem into machine / auto-tuned / human-judgment stations, mechanize what reduces, keep what resists, descend to the bottom — the surviving human stations are the control panel. Use when asked to design or architect top-down, or on [Prunify]/prunify/가지치기."
metadata:
  display-name: "Prunify (Pruning Architect)"
  type: "automatic with a pre-descent framing gate and a post-run confirmation gate"
---

# Prunify — factory-line top-down design

A **factory line** has three station types:
- **Machine** — deterministic (same input → same output), no learning. Automatable.
- **Auto-Tuned** — automatic but learned/probabilistic; drifts, needs watching. Keep it out of the machine bin.
- **Human-Judgment** — needs contextual reading or accountability. Define it only by its I/O contract; defer it.

**Flow:** Run Phase 1 once. For each layer, run Phases 2–5, descending into human stations depth-first. When no station opens, run Phase 6. The surviving human stations are the **control panel**.

## Phase 1 — Admit  *(once)*
A trigger activates the skill. Before descending, require a concrete problem — a system in one line + ≥1 hard tension + an accountability question; if absent, request framing. Once framed, run to the bottom with no mid-descent pauses; stop for review only at the end.

## Phase 2 — Sketch
Write this layer's ideal end-state in one line, marked `[Buildability Unverified]`. Probe for a contradiction: do two "must" constraints clash (A must hold AND A must not)? If yes, treat it as a **managed tension** — name both poles as limits, place a human station between them; it is a tension to manage, not a deliverable to ship. Strip the "fully auto / fully manual" shells: repetitive toil → Machine; final judgment/accountability → Human.

## Phase 3 — Sort
Confront the sketch with reality; sort every component into Machine / Auto-Tuned / Human-Judgment.
Gate: any auto-tuned station filed as machine? → redo the sort (drift smuggles in).

## Phase 4 — Seat
For each human station write its I/O contract: `Input` / `Output` / `Responsibility`. Connect the rest into the current line (MVP).

## Phase 5 — Split  *(the core)*
For each human station, attempt a concrete Machine or Auto-Tuned replacement and write, **in the visible log**, the candidate plus a one-line reason it fails.
In-pi shortcut: an auto-tuned candidate with the `typesafe_evaluate` tool available (pi-typesafe ext, `/typesafe enable`) runs as ONE batched in-session call — limits & spec in `references/typesafe-stations.md` (§3, §7a). Then:
- candidate succeeds → **Fake**: remove it, name the replacement.
- no candidate fits and it decomposes → **Descend** to the next layer.
- no candidate fits and re-opening returns the same judgment → **Real**: keep it.

Emit the layer log (template below) before moving on. Descend while any station opens; otherwise go to Phase 6.

Gate (hard — the one shortcut that breaks the skill): any verdict (Fake/Real/Descend) without a visible candidate + why-it-fails line? → redo Phase 5 for that station.
Gate: a Layer-0 bottom? Accept only if the sort found zero human stations, or every Layer-0 station was split with a candidate attempted; else descend.

## Phase 6 — Report  *(once, at the bottom)*
Emit the Final Line Report: control panel (surviving Real stations + I/O contracts), machine core, auto-tuned layer, and each removed Fake with its named replacement. Await review (confirm bottom, or re-open a station).

## Log templates
Per-layer log — one per visited layer; never merge or skip:
```text
**Layer n — Ideal-Product Sketch**
- Ideal Product (one line): … [Buildability Unverified]
- Contradiction: [No clash | Clash: A must … vs A must not …] → rebuilt as [human station | limits]
- Machine: … | Auto-Tuned: … | Human-Judgment (I/O each): [B_n,1] in … | out … | resp …
- Open-and-Split:
  - [B_n,1] candidate(s): … | why each fails: … | verdict: Fake (replaced by …) | Real (kept) | Descend → Layer k
```
Final report:
```text
**[Prunify] Final Line Report — Bottom at Layer N**
- Control panel (Real): [B_a,b] — I/O …
- Machine core: … | Auto-Tuned (watched): …
- Removed fakes: [B_c,d] → replaced by …
- Review gate: 1) confirm & freeze   2) re-open [station ID]
```

## Worked example (read before first run)
> Problem: *"Auto-route support tickets — fast, but never misroute an urgent/high-value one."*

- **Layer 0** sketch: every ticket routed perfectly, instantly, zero human effort. [Unverified]
- Contradiction: "route instantly" vs "never misroute urgent" → speed→Machine, accuracy→Human, a classifier bridges.
- Sort: Machine = keyword router; Auto-Tuned = intent classifier w/ confidence; Human = [B_0,1] low-confidence tickets.
- Split [B_0,1]: cand (machine) "SLA-rule queue" — fails, no fixed rule reads a novel complaint's urgency; cand (auto-tuned) "retrain classifier" — fails, can't guarantee zero misroute of an unseen high-value case (drift). → Descend.
- **Layer 1** (inside [B_0,1]): Machine = dedupe/SLA/drafts; Auto-Tuned = suggested-route + retrieval; Human = [B_1,1] final go/no-go on a novel/ambiguous ticket.
- Split [B_1,1]: cand (machine) "always trust suggested route" — fails, it drifts, removes accountability; cand (auto-tuned) "second model votes" — fails, still drifts, no single seat. → Real.
- Bottom at Layer 1. Control panel = { [B_1,1] }.