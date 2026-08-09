---
name: pruner-arch
version: "0.9.0"
description: "Top-down design skill in the factory-line picture: split a complex problem into machine / auto-tuned / human-judgment stations, mechanize what reduces, keep what resists, and descend to the bottom — the surviving human-judgment stations are the control panel. Use when asked to design or architect a complex problem top-down, or on [Pruner]/pruner/가지치기."
metadata:
  display-name: "Pruner (Pruning Architect)"
  type: "automatic with a post-run confirmation gate"
---

# Skill: Pruner (Pruning Architect) — the factory-line picture

## 1. Trigger Conditions
This skill activates immediately when the user types any of the following, or requests a related task.
*   `[Pruner]`, `Pruner`, `pruner`
*   `가지치기`, `가지치기 모드`
…or when asked to design a complex problem top-down.

> **Single authorization.** The trigger + topic is the one instruction that **authorizes a full descent to the bottom**. The skill then runs the recursion to completion on its own, records every layer, and emits a Final Line Report. The confirmation gate moves from *between layers* to *post-run review* of that report (§3 Termination). The user may still interrupt or redirect at any time, but the default is run-to-completion.

## 2. Core Concept — the factory line + 8 primitives

### Carrier picture: the factory line
Treat the problem as one **factory line**. Raw material comes in, a finished product goes out. A station (a work seat) on the line is one of three kinds:
*   **Machine station** — same input always gives the same output, no guessing or learning. Fully automatable.
*   **Auto-tuned station** — it runs automatically like a machine, but it learns from data, so it drifts. Mostly right but can be wrong, so it needs watching. (It is **different** from a machine station; mixing the two smuggles drift in.)
*   **Human-judgment station** — a seat that needs reading the situation and judging in context. Never faked as a rule; define only its I/O contract and defer it.

**Control panel = the surviving human-judgment stations.** The human-judgment stations left on the line at the end are the controls (the buttons) the operator actually touches.
**Cognitive-load minimization = minimize the number of human stations.** Advancing the system is not adding human stations; it is removing the fake ones that didn't need a human, so the operator watches fewer seats.
**MVP = the current line.** Each layer's MVP *is* the line so far — the human stations are the exposed controls, the rest runs as machine/auto-tuned stations. The MVP and the line are the same object seen two ways.

### The 8 primitives (each: one-line operation + one-line self-check)
Meaning is **not** borrowed from the model's background knowledge. Each primitive is fixed by performing its *operation* and answering its *self-check* — a yes/no the model can run directly. (This is why it holds on a small model.)

1. **Ideal-product sketch** — write the best-case end-state this layer targets in one line, marked "buildability unverified," then immediately test "does this dissolve into concrete line operations?"
   *   Self-check: did you start designing the line assuming the product is real? → fail.
2. **Contradiction check** — when you try to write the spec tight, do "A must hold" and "A must not hold" both come out true? Then this is not "a thing you ship once" but "a tension you steer." Hold both poles as limits and put a human-judgment station between them.
   *   Self-check: are there two requirements that are both "must"? → it's a managed tension, not a deliverable.
3. **Shell-stripping** — for clashing requirements, strip the rigid form ("fully auto" / "fully manual") and keep only the essential value each side actually wants. Then: repetitive toil → machine station; final judgment/accountability → human-judgment station. (Total automation is dangerous → insert a human-judgment station; total manual's drudgery → push into a machine station, keep only judgment for the human.)
   *   Self-check: did you throw one side away entirely? → fail; you must split keeping both essentials.
4. **Three-bin sort** — put every piece into one of three: machine station / auto-tuned station / human-judgment station. Don't put auto-tuned into the machine bin.
   *   Self-check: did you file an auto-tuned station as a machine station? → drift smuggles in, fail.
5. **Open-and-split test** — open one human-judgment station and split it again into the three bins. If it falls into machine/auto-tuned → it was a **fake human station**: remove it from the line and **name the replacement machine (or auto-tuned station) explicitly**. If a smaller human station remains, keep descending. If re-opening keeps returning the **same human judgment** → it's a **real human station**: keep it on the line.
   *   Self-check: you called it fake and removed it but didn't name the replacement? → empty deletion, fail.
6. **Bottom point** — when no remaining human station can be split into a machine station (re-opening any of them just returns the same judgment), that's the bottom of the line. Stop descending.
   *   Self-check: did you stop because "I can't think how to mechanize it"? → false bottom; you must actually open and split to claim it.
7. **Line log** — before descending to the next layer, write down this layer's (ideal-product sketch / three-bin result / human-station I/O contracts / open-and-split result). Its job is to stop an overlooked human station from leaking the flow.
   *   Self-check: did you descend without writing this layer in the log? → flow-leak risk, fail.
8. **No-declaration rule** — three prohibitions: ① to call "bottom," you must have actually opened and split it; "I can't imagine it" is not allowed. ② to call "fake, remove it," you must name the replacement machine/auto-tuned station; unnamed deletion is not allowed. ③ don't start designing the line assuming the ideal product is real; always start from the split-and-test.
   *   Self-check: is there a declaration with no attempt / no name? → all fail.

## 3. Execution Pipeline (4 stages → descent to the bottom)

Initialize an empty **Line Log**. Then run the 4 stages **once per layer** (n = 0, 1, 2, …), descending into human stations depth-first, until the bottom.

### Stage 1 — Ideal-product sketch + contradiction check + shell-stripping
*   Suspend real-world constraints (cost, tech, time) and write this layer's ideal product in one line, marked "buildability unverified." Root layer = the whole product; a deeper layer = the human station opened from above.
*   **Contradiction check:** does the tight spec force "A must" and "A must not" both true? → managed tension; hold both poles as limits and put a human-judgment station between them. Watch for common clash pairs — openness vs safety, speed vs control, automation vs accountability, cost vs quality — and actively test for them; do not default to "no clash" just because the ideal sounds fine.
*   **Shell-stripping:** clashing requirements → strip the form, keep the essence → repetitive toil = machine, judgment = human station.

### Stage 2 — Reality friction + three-bin sort
*   Collide the ideal product (and its shell-stripped result) with reality. Pull out "what a machine can run exactly now" vs "what needs judgment."
*   Sort every piece into the three bins: machine / auto-tuned / human-judgment station. **Don't mix auto-tuned into the machine bin** — drift smuggles in.

### Stage 3 — Human-station I/O + current line (MVP)
*   Defer the judgment-needing parts as "human-judgment station [B]" with only an **I/O contract** (what it takes in, what it puts out). Don't fill it with a fake machine function.
*   Excluding those, submit the thinnest line (MVP) you can wire right now from machine/auto-tuned stations. This line is this layer's control panel.

### Stage 4 — Open-and-split + log + descend or stop at the bottom
*   Open each human station of this layer (and any inherited from above) and re-run Stages 1–3:
    *   falls into machine/auto-tuned → **fake human station**: remove it and **name the replacement machine/auto-tuned station**. If a smaller human station remains, keep descending.
    *   re-opening returns the same human judgment → **real human station**: keep it. (If this layer flagged a contradiction, that only counts as "real" when paired with this empirical test; never stop on contradiction alone.)
*   Write this layer's **line-log entry** (format below).
*   **Branch:** if any kept human station is still openable, descend to the next layer and loop to Stage 1. If none is openable (every survivor is real) → **bottom**, terminate.

#### Line-log entry (emit one per visited layer)
```text
**Layer n — ideal-product sketch**
- Ideal product (one line): …
- Contradiction check & shell-stripping: no clash | clash [A must: … vs A must not: …] → essence extracted → re-built as [human station / limits]
- Reality friction: …
- Machine stations (same input = same output, no guessing; automated now): …
- Auto-tuned stations (learned/probabilistic; mostly right but drifts, needs watching; NOT machine stations): …
- Human-judgment stations (I/O contract each): [B_n,1] …, [B_n,2] …
- Current line (MVP / control panel): …
- Open-and-split result:
  - [B_n,1] → fake (removed; replaced by machine/auto-tuned: …) | real (human station kept) | descended → layer k
  - …
```

### Termination & Final Line Report
When the bottom is reached — no remaining human station reduces to a machine station; every survivor is real (empirically: re-opening returns the same judgment; or by contradiction: both poles limits, unbuildable) — emit the **Final Line Report** below, then await confirmation.

```text
---
**[Pruner] Final Line Report — bottom at layer N**

1. Bottom reached. No remaining human station reduces to a machine station; every survivor is real — empirically (re-opening returns the same judgment) or by contradiction (both poles limits, unbuildable). Those marked "unbuildable" by contradiction: [list: A must / A must not]; held as limits and managed. The human stations surviving under them are real empirically.

2. Discovered control panel (the practical mechanism):
   - Real human-judgment stations (judgment & accountability seats):
     - [B_a,b] — confirmed real at layer a (same on re-open) — I/O contract …
     - …
   - Machine core (true machine stations, accumulated across layers; same input = same output): …
   - Auto-tuned stations (learned/probabilistic; NOT machine; drifts, needs watching): …

3. Removed fake human stations:
   - [B_c,d] — confirmed fake at layer c (reduced to machine/auto-tuned: …)
   - …

4. Per-layer trace: the line log above, n = 0 … N.

5. Review gate. The AI's fake/real verdicts (empirical and contradiction) are provisional. Confirm the bottom here, or re-open any station where a machine/auto-tuned reduction was missed, a contradiction was mis-detected, or a human station was prematurely called fake.

Awaiting instruction:
1. Confirm the bottom and freeze the line?
2. Re-open a specific human station and descend further?
```

## 4. Strict Constraints & Anti-Patterns
*   **No shell rhetoric:** the moment substance-free media-speak — "synergy," "convergence," "next-gen," "complementary," etc. — appears, the run is deemed to have failed. Relational logic and functional boundaries only.
*   **No reifying the product:** never assume the ideal product (or any human-station ideal) is real without testing whether it dissolves into machine stations. Designing a "realization" of a possibly-phantom product is a failure.
*   **No false bottom:** never declare a station irreducible ("real") without an *actual* open-and-split that tried to derive a machine station. "I can't imagine how to mechanize it" is not real — it may be a fake you failed to crack. Conversely, never declare a station **fake** without naming the replacement machine/auto-tuned station; a deletion with no replacement is a lazy deletion. The bottom is *tested into*, never declared.
*   **No contradiction-only stop:** a contradiction-check "unbuildable" verdict counts as real only when paired with the Stage-4 empirical test (open-and-split). Stopping on contradiction alone — "it's structurally unbuildable, stop" — is the false-bottom anti-pattern in philosophical disguise. The contradiction diagnoses *why*; the test still *happens*.
*   **No descent without a log:** every descended layer is written to the line log *before* moving on; the log is the guardrail against flow-leak across the recursion.
*   **No neglected human stations:** lay down I/O-contract guardrails before and after each human-judgment station so the flow doesn't leak at a non-linear seat.

## 5. Communication style — plain language
Keep the factory-line terms as the precise spine, but speak in plain everyday words. Each primitive is expanded on the fly using its §2 "operation + self-check."

> One line: *"Start from the ideal-product sketch, resolve clashing requirements by stripping to essence and rebuilding as a semi-automated line, empty all repetitive toil into machines, and discover — by deleting fake human stations — the leanest line (control panel) that minimizes the operator's cognitive load; report it."*

---
For the theoretical roots (Kant's a priori/ideal · Peirce's empirical test · Hegel's dialectic), see `references/philosophy.md`. Not required to run the skill.