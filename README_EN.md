# pruner-arch

**[English](README_EN.md)** | **[한국어](README.md)**

> **Pruner (Pruning Architect)** — a top‑down backcasting skill for the [pi](https://github.com/earendil-works/pi-coding-agent) coding agent, built around the **factory‑line** metaphor.

Pruner targets a **potentially non‑existent ideal product**. It decomposes any complex problem into three types of stations on a factory line:

- **Machine station** — deterministic (same input $\rightarrow$ same output) with zero learning or guessing. Fully automatable.
- **Auto‑tuned station** — runs automatically but relies on data learning, so it can drift over time. Generally accurate but requires continuous monitoring. Strictly distinct from machine stations.
- **Human‑judgment station** — requires contextual interpretation, judgment, or accountability. Cannot be replaced by fixed rules; defined solely by its I/O contract and deferred.

By deferring judgment-heavy work to **I/O-contract-bound human stations**, the surviving set of human seats constitutes the **control panel**. This control panel is **discovered** by stripping away fake human stations, not designed from scratch.

A **contradiction check** identifies specifications that are **unbuildable by structure** (i.e., imposing mutually exclusive constraints). 

When requirements clash, we strip away rigid forms ("fully auto" vs "fully manual"), preserve the essential value of each side, and rebuild the system as a **semi‑automated line**:
- **Auto $\rightarrow$ semi‑auto**: Insert a human-judgment station when full automation threatens system integrity.
- **Manual $\rightarrow$ semi‑auto**: Offload repetitive toil to machine stations while retaining human judgment and accountability.

The algorithm **recurses downward** until reaching a **bottom point** where no remaining human station can be reduced to a machine station. At that point, every surviving station resists empirically (re-opening yields the exact same judgment) or represents a managed structural contradiction. 

Throughout the process, a **per-layer line log** is maintained, culminating in a **Final Line Report**. The supervising intelligence authorizes the full descent via a single trigger and validates the results during a post-run review.

---

## v0.9.1 — Hardened for Mid-Size Instruct Models (Gemma 3 27B-class)

v0.9.0 already made the skill self-contained for small models, but mid-size instruct models (notably **Gemma 3 27B**) still collapsed the run in three documented ways: (1) terse by default — they summarize away per-layer logs and skip self-checks; (2) "helpful shortcut" — they mark every station **Real** without attempting a replacement; (3) early negative constraints get dropped. v0.9.1 adds targeted fixes grounded in Gemma 3's known behavior:

- **Worked mini-example** (§4) — a concrete 2-layer descent; few-shot is the single biggest lever for Gemma, which follows examples far better than prose rules.
- **Output Discipline note** (§3) — forbids merging/skipping layers, forbids a Layer-0 bottom without proof, and makes "Real" require a named candidate replacement that fails.
- **Strengthened self-checks** (Primitives 5b / 6 / 7) — phrased as "answer, then act; if Yes → FAIL: redo" to survive negation misreads.
- **Final Self-Audit** (§6) — the most-dropped constraints restated as a last-line checklist (Gemma drops negative constraints placed early, so the critical ones live at the end).

The factory-line vocabulary and 8-primitive structure are unchanged; this is robustness, not redesign. Design goal unchanged: works from small models up, now with fewer false bottoms on mid-size instruct models.

---

## v0.9.0 — Spine Rebuilt (Factory Line; Self‑Contained for Small Models)

Versions up to v0.8.x relied on philosophical terminology from Kant (a priori / regulative ideal), Peirce (empirical test), and Hegel (dialectic). While this "borrowed spine" worked well on large models with rich background knowledge, it failed on smaller language models that lack those conceptual foundations.

Version v0.9.0 replaces that approach with a **self‑contained language** built on the **factory‑line** metaphor. Precision is now guaranteed through **each primitive’s “operation + self-check”**: the model performs the operation and answers a simple yes/no check, fixing meaning without external knowledge. The original philosophical formulation remains available in [`skills/pruner-arch/references/philosophy.md`](skills/pruner-arch/references/philosophy.md) for reference, but is not required for execution.

---

## Core Concept — The Factory Line + 8 Primitives

We model the problem as a single **factory line**. Each workstation (or "station") falls into one of three categories:

- **Machine station** — deterministic (same input = same output), zero guessing or learning. Fully automatable.
- **Auto‑tuned station** — runs automatically like a machine, but learns from data and can drift. Mostly correct, but requires monitoring. *Never mix into the machine bin.*
- **Human‑judgment station** — requires situational reading and contextual judgment. Defined strictly by its I/O contract.

**Control panel = surviving human-judgment stations.**
**Cognitive-load minimization = minimizing the number of human seats.**
**MVP = current line.**

### The 8 Primitives (One-Line Operation + One-Line Self-Check)

1. **Ideal‑product sketch** — Write the target end-state for this layer in one line, marked `[Buildability Unverified]`, then immediately test: "Does this dissolve into concrete line operations?"
   * *Self-check*: Did you start designing the line assuming the ideal product is already real? $\rightarrow$ **FAIL**.
2. **Contradiction check** — When specs force "A must hold" and "A must not hold" simultaneously true, it is not a "ship-once deliverable" but a **managed tension**. Hold both poles as structural limits and place a human-judgment station between them.
   * *Self-check*: Are two conflicting requirements both mandatory "musts"? $\rightarrow$ Managed tension, not a deliverable.
3. **Shell‑stripping** — Strip away rigid forms ("fully auto" / "fully manual") from clashing requirements, preserving only their essential values. Repetitive toil $\rightarrow$ machine station; final judgment/accountability $\rightarrow$ human-judgment station.
   * *Self-check*: Did you discard one side's essential value entirely? $\rightarrow$ **FAIL**.
4. **Three‑bin sort** — Sort every component into machine, auto-tuned, or human-judgment bins. Do not file auto-tuned stations into the machine bin.
   * *Self-check*: Did you classify an auto-tuned station as a machine station? $\rightarrow$ **FAIL** (smuggles hidden drift).
5. **Open‑and‑split test** — Open a human-judgment station and split it into the three bins. If it reduces to machine/auto-tuned, it is a **fake human station**: remove it and **explicitly name the replacement station**. If re-opening keeps returning the same judgment, it is a **real human station**: keep it.
   * *Self-check*: Did you mark a station as fake without naming its replacement? $\rightarrow$ **FAIL**.
6. **Bottom point** — Declared when no remaining human station can be split into a machine station (re-opening returns the same judgment). Stop descending.
   * *Self-check*: Did you stop because "I can't think how to mechanize it"? $\rightarrow$ **FAIL** (false bottom; must perform actual open-and-split).
7. **Line log** — Record this layer's sketch, three-bin result, human I/O contracts, and open-and-split results before descending. Prevents flow leaks.
   * *Self-check*: Did you descend without recording this layer in the log? $\rightarrow$ **FAIL**.
8. **No‑declaration rule** — Three prohibitions: ① No declaring "bottom" without an explicit open-and-split. ② No declaring "fake, remove" without naming the replacement station. ③ No line design assuming the ideal product is real.
   * *Self-check*: Is there any declaration lacking execution proof or replacement naming? $\rightarrow$ **FAIL**.

See [`SKILL.md`](skills/pruner-arch/SKILL.md) §2 for canonical text.

---

## What It Does (4 Stages $\rightarrow$ Descent to the Bottom)

When triggered, the skill executes a **full recursive descent**. It maintains a **line log** and iterates through 4 stages per layer, exploring human stations depth-first:

1. **Ideal-product sketch + contradiction check + shell-stripping** — Suspend real-world constraints and write the ideal product (`[Buildability Unverified]`). Identify contradictions (managed tensions), strip rigid forms, and extract core values.
2. **Reality friction + three-bin sort** — Confront the ideal product with reality, separating deterministic execution from contextual judgment, then sort into machine, auto-tuned, and human-judgment bins.
3. **Human-station I/O + current line (MVP)** — Defer judgment parts to human stations defined strictly by I/O contracts. Connect the remaining components into the thinnest operational line (MVP / Control Panel).
4. **Open-and-split + log + descend or stop** — Open each human station. If reduced $\rightarrow$ remove as **fake** (name replacement). If irreducible $\rightarrow$ keep as **real**. Write the line log. Descend if openable human stations remain; otherwise, declare bottom and terminate.

#### Line-Log Entry Template (Per Visited Layer)

```text
**Layer n — Ideal-Product Sketch**
- Ideal Product (one line): … [Buildability Unverified]
- Contradiction Check & Shell-Stripping: [No Clash | Clash (A must: … vs A must not: …)] → Essence extracted → Rebuilt as [Human Station / Limits]
- Reality Friction: …
- Machine Stations (deterministic, no guessing): …
- Auto-Tuned Stations (learned/probabilistic; drifts, needs watching): …
- Human-Judgment Stations (I/O Contracts):
  - [B_n,1] Input: … | Output: … | Responsibility: …
- Current Line (MVP / Control Panel): …
- Open-and-Split Result:
  - [B_n,1] → [Fake (Replaced by: …) | Real (Retained) | Descended to Layer k]
```

#### Final Line Report (Deliverable)

```text
---
**[Pruner] Final Line Report — Bottom Reached at Layer N**

1. Bottom Verification:
   - All surviving human-judgment stations confirmed irreducible through explicit open-and-split testing or structural contradiction.
   - Contradiction Limits Held: [List of managed tensions / limits].

2. Discovered Control Panel (Minimal Human Interface):
   - Real Human-Judgment Stations:
     - [B_a,b] (Confirmed Real at Layer a) — I/O Contract: …
   - Machine Core (Accumulated deterministic stations): …
   - Auto-Tuned Layer (Monitored probabilistic stations): …

3. Eliminated Fake Human Stations:
   - [B_c,d] (Removed at Layer c) → Replaced by Machine/Auto-Tuned Station: [Station Name]

4. Per-Layer Trace:
   - (Complete Line Log from Layer 0 to Layer N included above)

5. Post-Run Review Gate:
   Awaiting user direction:
   1) Confirm bottom and freeze line design.
   2) Re-open specific station [Station ID] for deeper descent.
```

---

## Activates On

`[Pruner]` · `Pruner` · `pruner` · `가지치기` · `가지치기 모드` — or when asked to design a complex problem top-down.

## Strict Anti‑Patterns

* **No shell rhetoric** — Buzzwords such as "synergy," "convergence," "next-gen," or "hyper-automation" cause immediate execution failure.
* **No reifying the product** — Never treat the ideal product as real without verifying its reduction to machine stations.
* **No false bottom** — Never declare a station "real" without an actual open-and-split test ("I can't imagine how" is invalid). Never declare a station "fake" without naming its replacement.
* **No contradiction-only stop** — An "unbuildable" verdict from contradiction check is valid only when paired with Stage-4 empirical open-and-split testing.
* **No descent without a log** — Every layer must be logged before proceeding to the next.
* **No neglected human stations** — Enforce strict I/O contracts around human stations to prevent flow leaks.

## In One Line (Plain Language)

> *"Start from the ideal-product sketch, resolve clashing requirements by stripping to essence and rebuilding as a semi-automated line, offload all repetitive toil into machines, and discover — by deleting fake human stations — the leanest control panel that minimizes cognitive load; report it."*

## Installation (in pi)

```bash
pi install git:[github.com/sng2c/pruner-arch](https://github.com/sng2c/pruner-arch)
```

Or add to `~/.pi/agent/settings.json`:

```json
{
  "packages": [
    "git:[github.com/sng2c/pruner-arch](https://github.com/sng2c/pruner-arch)"
  ]
}
```

Trigger using `/skill:pruner-arch`, `[Pruner]`, or `가지치기`.

## License

MIT © sng2c