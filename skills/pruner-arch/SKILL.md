---
name: pruner-arch
version: "0.9.1"
description: "Top-down design skill in the factory-line picture: split a complex problem into machine / auto-tuned / human-judgment stations, mechanize what reduces, keep what resists, and descend to the bottom — the surviving human-judgment stations are the control panel. Use when asked to design or architect a complex problem top-down, or on [Pruner]/pruner/가지치기."
metadata:
  display-name: "Pruner (Pruning Architect)"
  type: "automatic with a post-run confirmation gate"
---

# Skill: Pruner (Pruning Architect) — the factory-line picture

## 1. Trigger Conditions & Authorization
This skill activates immediately when the user requests top-down architecture design, or includes any of the following triggers:
*   `[Pruner]`, `Pruner`, `pruner`
*   `가지치기`, `가지치기 모드`

> **Single Authorization Rule:** The trigger authorizes a **full recursive descent to the bottom point**. Execute all layers sequentially, log each layer in the Line Log, and present the **Final Line Report** upon reaching the bottom. Pause for user feedback only at the post-run review gate.

---

## 2. Core Concept — The Factory Line & 8 Primitives

### The Factory Line Model
Decompose the entire problem as a single **factory line** consisting of three station types:
1.  **Machine Station:** Deterministic (same input → same output), zero learning/guessing. 100% automatable.
2.  **Auto-Tuned Station:** Automatic but probabilistic/learned from data; subject to drift. High accuracy but requires continuous monitoring. *Never mix into the machine bin.*
3.  **Human-Judgment Station:** Requires contextual reading, trade-off steering, or legal/ethical accountability. Defined strictly by its **I/O Contract** and deferred.

*   **Control Panel:** The surviving set of real human-judgment stations at the bottom of the line.
*   **Cognitive-Load Minimization:** Minimizing the number of human seats by eliminating fake human stations.
*   **MVP (Minimum Viable Product):** The current leanest line combining the machine/auto-tuned core with the exposed human control panel.

### The 8 Primitives (Operation + Self-Check)
Each primitive operates via a deterministic procedure and a mandatory self-check:

1.  **Ideal-Product Sketch**
    *   *Operation:* State the ideal end-state for this layer in one line, marked `[Buildability Unverified]`.
    *   *Self-Check:* Did you design the line assuming this product already exists? → **FAIL**.
2.  **Contradiction Check**
    *   *Operation:* Test if tight specs force mutually exclusive "must" constraints ("A must hold" AND "A must not hold"). If true, classify it as a **managed tension** (not a single deliverable), set both poles as structural limits, and place a human-judgment station between them.
    *   *Self-Check:* Are there two conflicting requirements that are both mandatory? → Managed tension, not a ship-once deliverable.
3.  **Shell-Stripping**
    *   *Operation:* Strip away rigid forms ("fully auto" vs "fully manual") from clashing requirements. Retain only essential value: push repetitive toil to **Machine Stations** and retain final judgment/accountability in **Human-Judgment Stations**.
    *   *Self-Check:* Did you discard one side's essential value entirely? → **FAIL**.
4.  **Three-Bin Sort**
    *   *Operation:* Classify every component into **Machine**, **Auto-Tuned**, or **Human-Judgment** bins.
    *   *Self-Check:* Did you place an Auto-Tuned station into the Machine bin? → **FAIL** (smuggles hidden drift).
5.  **Open-and-Split Test**
    *   *Operation:* Open a Human-Judgment station and attempt to split it into the three bins. If it reduces to Machine/Auto-Tuned, mark as **Fake**, remove it, and **explicitly name the replacement station**. If re-opening yields the same irreducible judgment, mark as **Real**.
    *   *Self-Check (answer each, then act):*
        *   (a) Did you mark a station Fake **without** naming its machine/auto-tuned replacement? → If Yes → **FAIL: redo, name the replacement.**
        *   (b) Did you mark a station Real **without** first writing a candidate machine/auto-tuned replacement and a one-line reason it cannot do the job? → If Yes → **FAIL: redo the split; "looks irreducible" is not proof.**
6.  **Bottom Point**
    *   *Operation:* Declare the bottom only when every remaining human station has passed an Open-and-Split that **attempted a replacement** — never on impression.
    *   *Self-Check (answer, then act):* Did you stop because "I can't imagine how to mechanize it", or because all remaining stations merely "look" human? → If Yes → **FAIL: perform an actual Open-and-Split on each; a bottom needs proof, not impression.**
7.  **Line Log**
    *   *Operation:* Write the per-layer entry (§4 template) **before** descending to the next layer. One entry per visited layer — never merge, summarize, or skip a layer to stay brief.
    *   *Self-Check (answer, then act):* Did you descend without writing the layer log, or merge/skip a layer? → If Yes → **FAIL: emit the missing entry now.**
8.  **No-Declaration Rule**
    *   *Operation:* Enforce prohibitions: ① No declaring bottom without explicit open-and-split. ② No declaring fake without naming the replacement. ③ No line design assuming the ideal product is real.
    *   *Self-Check:* Is there any declaration lacking execution proof or replacement naming? → **FAIL**.

---

## 3. Execution Pipeline (Recursive Descent)

Run Stages 1–4 sequentially per layer ($n = 0, 1, 2, \dots$), expanding human stations depth-first.

> **Output Discipline (mandatory on every model size — not optional "if brief"):**
> *   **Emit, don't summarize.** Produce one full Line Log entry (§4 template) per visited layer. Never collapse several layers into one paragraph or skip a layer to save tokens.
> *   **No Layer-0 bottom by default.** A bottom at Layer 0 is almost always a false bottom. It is valid only if the Layer-0 Three-Bin Sort named concrete components and either (a) genuinely found zero human stations (with the named machine/auto-tuned components that absorbed everything), or (b) every candidate human station was explicitly Open-and-Split with a replacement attempted.
> *   **"Real" requires a failed replacement.** Before any station is marked Real, you must have written a candidate machine/auto-tuned replacement and a one-line reason it cannot do the job (Primitive 5b).
> *   **Show the check, not just "passed".** Answer each self-check with the actual result; never reply "passed" without performing it.

### Stage 1: Ideal-Product Sketch + Contradiction Check + Shell-Stripping
*   Write the ideal product sketch for Layer $n$ (`[Buildability Unverified]`).
*   Actively probe for contradictions (e.g., speed vs accuracy, openness vs security, automation vs accountability).
*   If contradiction exists: set poles as limits, strip rigid shells to extract core values, and insert a human-judgment station.

### Stage 2: Reality Friction + Three-Bin Sort
*   Confront the ideal sketch with real-world technical/operational constraints.
*   Sort all components into **Machine**, **Auto-Tuned**, and **Human-Judgment** bins.

### Stage 3: Human-Station I/O + Current Line (MVP)
*   Define every Human-Judgment Station $[B_{n,k}]$ strictly via its **I/O Contract**:
    *   `Input:` Context/data received.
    *   `Output:` Decisions/actions emitted.
    *   `Responsibility:` What accountability remains with the human operator.
*   Assemble the remaining core into the current operational line (MVP).

### Stage 4: Open-and-Split + Line Log + Branching
*   Apply the Open-and-Split test to each human station $[B_{n,k}]$:
    *   **Reduced:** Mark as `Fake`, record explicit replacement station name.
    *   **Irreducible:** Mark as `Real`, retain on the control panel.
*   Write the **Line-Log Entry** for Layer $n$.
*   **Branch:** If openable human stations remain, descend to Layer $n+1$. If all remaining human stations are verified `Real`, terminate recursion and emit the **Final Line Report**.

---

## 4. Output Specification & Log Formats

### Per-Layer Line Log Template
Emit this log entry for every visited layer $n$:

```text
**Layer n — Ideal-Product Sketch**
- Ideal Product (one line): … [Buildability Unverified]
- Contradiction Check & Shell-Stripping: 
  - Status: [No Clash | Clash Detected]
  - Details: [A must: … vs A must not: …]
  - Resolution: Essence extracted → Rebuilt as [Human Station / Limits]
- Reality Friction: …
- Machine Stations (deterministic, no guessing): …
- Auto-Tuned Stations (probabilistic/learned; drifts, needs monitoring): …
- Human-Judgment Stations (I/O Contracts):
  - [B_n,1] Input: … | Output: … | Responsibility: …
- Current Line (MVP / Control Panel): …
- Open-and-Split Result:
  - [B_n,1] → [Fake (Replaced by: …) | Real (Retained) | Descended to Layer k]
```

### Final Line Report Template (Deliverable)
Emit this report upon reaching the Bottom Point:

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

### Worked Mini-Example (2-layer descent — read before your first run)

> Problem: *"Auto-route customer support tickets — fast, but never misroute an urgent / high-value one."*

**Layer 0 — Ideal-Product Sketch**
- Ideal Product (one line): every ticket routed perfectly and instantly with zero human effort. [Buildability Unverified]
- Contradiction Check & Shell-Stripping: **Clash Detected** — *"must route instantly (no human delay)"* vs *"must never misroute urgent/high-value (needs judgment)"*. Resolution: speed pole → Machine; accuracy pole → Human-Judgment; an Auto-Tuned station bridges them.
- Reality Friction: a never-seen complaint type has no fixed rule; a learned classifier drifts.
- Machine Stations (deterministic, no guessing): exact-match keyword router (same ticket → same bucket).
- Auto-Tuned Stations (learned; drifts, needs watching; NOT machine): ML intent classifier with confidence.
- Human-Judgment Stations (I/O Contracts):
    - [B_0,1] Input: ticket the classifier scores below threshold | Output: final route + priority | Responsibility: a misrouted high-value ticket.
- Current Line (MVP): keyword router + classifier auto-route high-confidence; low-confidence → [B_0,1].
- Open-and-Split [B_0,1]:
    - Candidate machine replacement = *"send low-confidence tickets to a queue, route by SLA rules."* → Try: SLA rules can't read a novel complaint's actual urgency; no fixed rule covers it. **fails**.
    - Candidate auto-tuned replacement = *"retrain the classifier on more data."* → Try: improves average accuracy but cannot guarantee zero misroute of a never-seen high-value case (drift). **fails**.
    - Both candidates fail to remove accountability. → **Descend to Layer 1.**

**Layer 1 — Ideal-Product Sketch (inside [B_0,1])**
- Ideal Product (one line): the human only ever sees genuinely-irreducible tickets; everything else is auto-handled. [Buildability Unverified]
- Three-Bin Sort (of the human's job):
    - Machine: dedupe/format, SLA timer, template draft response.
    - Auto-Tuned: suggested-route + confidence + similar-past-ticket retrieval.
    - Human-Judgment: [B_1,1] final go/no-go on route+priority for a genuinely novel/ambiguous ticket; accountability for misroute.
- Open-and-Split [B_1,1]:
    - Candidate machine = *"always trust the suggested route."* → Try: the suggested route is Auto-Tuned (drifts); trusting it removes the accountability the Layer-0 clash required. **fails**.
    - Candidate auto-tuned = *"let a second model vote."* → Try: still drifts, still no single accountable seat. **fails**.
    - Re-opening returns the same judgment. → **Real. Retain.**

**Bottom reached at Layer 1.** Control panel = { [B_1,1] }. Machine core = { keyword router, SLA/timer, drafts }. Auto-Tuned = { intent classifier, retrieval }. This is the shape your output should take — one entry per layer, a replacement attempted before every Real, bottom declared only after proof. If a station had reduced to machine/auto-tuned instead, it would be marked **Fake** with its replacement named (Primitive 5a and Final Report §3).

---

## 5. Strict Constraints & Anti-Patterns

1.  **No Shell Rhetoric:** Media buzzwords ("synergy", "next-gen", "seamless AI", "hyper-automation") trigger instant execution failure. Use strict functional and I/O boundaries only.
2.  **No Reifying the Ideal Product:** Never treat the ideal product as an existing entity without testing its reduction to machine stations.
3.  **No False Bottoms:** Saying "I can't imagine how to mechanize this" is strictly forbidden. A bottom can only be claimed after an explicit open-and-split test.
4.  **No Lazy Deletions:** Declaring a human station "fake" without naming its specific machine/auto-tuned replacement is forbidden.
5.  **No Contradiction-Only Stops:** A contradiction diagnosis must be paired with Stage-4 empirical open-and-split validation.
6.  **No Descent Without Logging:** Every layer must be logged before proceeding to the next layer.

---

## 6. Final Self-Audit (confirm before emitting the Final Line Report)

Walk this list last. If any item fails, go back and fix it before reporting:

- [ ] Every visited layer has its own Line Log entry (§4). No layer was merged, summarized, or skipped.
- [ ] Every **Real** verdict was preceded by a named candidate replacement (machine or auto-tuned) and a one-line reason it cannot do the job.
- [ ] Every **Fake** verdict names its replacement station.
- [ ] No bottom was declared at Layer 0 unless each candidate human station was explicitly opened and reduced (or the Three-Bin Sort genuinely found zero human stations, with named components).
- [ ] No bottom was declared on impression ("can't imagine", "looks human") — each survivor has an attempted-replacement proof.
- [ ] No shell-rhetoric words ("synergy", "next-gen", "seamless", "hyper-automation") anywhere in the output.
- [ ] Each self-check was answered with its actual result, not a bare "passed".