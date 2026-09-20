# TypeSafe Stations — Jev judgments as the canonical Auto-Tuned station

> **This document is not required to run the skill.** Like `philosophy.md`, it is an
> integration reference: how TypeSafe (System One / Jev: `choice` · `noul` · `score`
> judgments) seats into the factory line. Primitive semantics follow the typesafe-ai
> skill. HTTP shapes, model pinning,
> limits, and pricing (§7) are **verified against the live docs** (docs.typesafe.ai;
> `jev-1.13.0` current at write time).

## 1. The sort, refined

| Prunify station | $\hat f / f$ term | TypeSafe seating |
|---|---|---|
| **Machine** | $y=f(x)$, a priori | Code only: rules, calculations, exact lookups, escalation policy *evaluation*. |
| **Auto-Tuned** | $\hat f(x)$, a posteriori | **TypeSafe judgment set** (choice/noul/score over named state) + its watched config (question texts, criteria, thresholds, model version). |
| **Human-Judgment** | $I_{intel}$ | Surviving Real stations — accountability, not reading. |

Three rules this seating adds to Phase 3 (Sort):

1. **A Jev call is an API call, not a machine station.** The HTTP round-trip looks
   deterministic; the *function* behind it is learned. Its drift is the model's
   revisability (version bumps, calibration changes). Filing it as Machine is exactly
   the smuggling `philosophy.md` warns of ("it will smuggle intelligence back into the
   deterministic core"). Gate applies: filed as machine? → redo the sort.
2. **Accountability never transfers to Jev.** Typed output guarantees the interface,
   not truth. A judgment set can take over a station's *reading*; it cannot take over
   its *Responsibility* (novel cases, consequences, answerability to a person).
3. **Question texts, criteria definitions, and threshold values are a posteriori
   governance** — the same category as "choice of the rule set" in `philosophy.md`.
   They live in the auto-tuned station's watched config, never in the machine core.
   (Evaluating an already-decided threshold against a probability *is* Machine.)

## 2. The handshake — what prunify lacked, TypeSafe provides

Prunify says the auto-tuned layer is "watched" but never formalizes the watch, and
never types the handoff from an auto-tuned station to a Real one. TypeSafe supplies
both, because every judgment returns an answer **with its probability**:

```text
escalation bundle := {
  state:      <the named state the judgments saw>,
  answers:    { qid → (typed answer, probability) },
  model:      <versioned id from the response — audit trail>,
  policy:     <escalation rule, kept in code>,
  why:        <which question/level breached which threshold>
}
```

- Policy shapes: `noul ≥ τ` per label (noul carries **no** confidence field — the
  value itself is the signal); `choice` top-probability **and margin** over the
  runner-up, both computable in code from the returned `probabilities`; `score`
  level bands (including gray bands that always escalate). TypeSafe's precomputed
  `confidence` (choice/score only) is one distribution-shape statistic — code may
  compute its own from `probabilities` when the domain needs a different one.
- Threshold semantics (per typesafe-ai skill): confidence summarizes distribution
  concentration, not workflow correctness; `noul ≈ 0.5` means yes/no are equally
  likely, not medium intensity; low confidence on a harmless preference need not
  escalate. **Thresholds are evaluated on your data and consequences** — the values
  are governance, not constants.
- `[B_i,j]`'s Input contract becomes concrete: the Real station receives the bundle,
  so the human sees *why* they were escalated, not just the raw case. This is the
  control-panel diet paying off: fewer phantom switches, sharper attention per seat.

## 3. Phase 5 upgrade — concrete candidates

The Split gate demands a *concrete* candidate + why-it-fails line. "Second model
votes" was never concrete; a judgment-set spec is:

```text
candidate (auto-tuned) := judgment set spec:
  questions: [ primitive × state refs × criteria ],
  no-match outcome present for every question,
  call shape: ONE request — questions run in parallel over the same state
              (token budget shared with state; ~64k total, state ≤ ~32k),
  escalation policy → which Real seat (or none),
  drift watch: pinned versioned model ID + labeled replay set
```

A second request is justified only when an answer is needed to fetch evidence,
build the next state, or pick the next options — otherwise ask everything in the
first request and let code ignore the unused answers.

Verdict logic is unchanged — only the candidate is sharper:

- Station's Responsibility = pure reading/classification, no novel-case exposure,
  no accountability → **Fake**: replaced by the judgment set + code policy.
- Station carries accountability (novel inputs, irreversible consequences, a named
  owner) → candidate fails, and now fails *precisely*: the judgment set can feed the
  seat (as its recommendation bundle) but cannot *be* the seat → **Real** (or
  **Descend** if the accountability itself decomposes).

## 4. Worked example re-run — support-ticket line, Layer 1 with Jev

Same problem as SKILL.md ("auto-route tickets, never misroute urgent/high-value"),
Layer 1 descent reached as before.

```text
**Layer 1 (Jev-seated) — Ideal-Product Sketch**
- Ideal Product (one line): every ticket routed instantly; humans see only
  escalated cases, each with a why-line. [Buildability Unverified]
- Contradiction: [No clash at this layer — carried tension: instant-routing vs
  accountability for novel cases, managed via escalation policy + [B_1,1]]
- Machine: dedupe, SLA clock, draft assembly, escalation-policy evaluation.
  | Auto-Tuned: judgment set over ticket.messages: noul `is-urgent`,
    score `business-value` (1–5, levels = concrete situations),
    choice `route` (defined queues + no-match), noul `is-novel-or-ambiguous`
  | Human-Judgment: [B_1,1] final go/no-go on escalated tickets.
- Open-and-Split:
  - [B_1,1] candidate (machine): "auto-route whenever all four answers pass
    thresholds" | why it fails: a novel high-value case has no labeled signal to
    pass or fail a threshold; typed output ≠ truth; deletes the accountability
    seat the tension requires | verdict: fails.
  - [B_1,1] candidate (auto-tuned): "add more Jev questions until confident"
    | why it fails: more questions cover more *reading*, none cover
    *responsibility*; novel-case exposure is unchanged; escalation-to-nowhere
    when every question is out-of-distribution | verdict: fails.
  - verdict: Real — kept, now with a concrete contract (§2 bundle).
- Bottom at Layer 1. Control panel = { [B_1,1] }.
```

Note what changed vs the original Layer 1: the auto-tuned station is no longer
"intent classifier w/ confidence" (a blob) but four named judgments with typed
escalation; the human seat shrank from "read the ticket" to "adjudicate a bundle
with a why-line". Same bottom, smaller seat — the diet prunify predicts.

## 5. Drift watch — operationalizing "watched"

The auto-tuned station's watch program (itself Machine, its config = governance):

1. **Pin the versioned ID** (`jev-1.13.0`), never the `jev-latest`/`jev-preview`
   alias — an alias moves when a release ships, so answers change with no change on
   your side: drift by design. The response's `model` field reports the versioned
   ID that actually answered; record it in every escalation bundle (§2).
2. **Replay** a labeled set on any version bump; compare per-question accuracy and
   calibration against the thresholds' evaluation basis.
3. **Observe** the escalation rate as the standing drift signal: creeping
   escalation = degrading recall of the judgment set; silent non-escalation on
   audited novel cases = degrading precision.
4. **Re-govern**: re-evaluate thresholds on new consequences/data; changing a
   threshold need not rerun inference (same judgments, new policy).

## 6. Integration-specific anti-patterns

- **Jev-as-machine smuggling** — "it's just an HTTP call" → redo the Sort (§1.1).
- **Confidence as permission** — treating high confidence as license to skip the
  accountability seat; confidence ≠ workflow correctness (§2).
- **Mega-judgment station** — one question asked to do four stations' work; prunify
  Split and TypeSafe decomposition fail for the same reason: independently useful
  dimensions must split (§3).
- **Calibrated-therefore-Real-less** — deleting [B_i,j] because the model is
  calibrated; calibration is a posteriori and version-bound (§5).

## 7. Verified against the live docs (jev-1.13.0 era)

- **Endpoint**: `POST https://api.typesafe.ai/v1/systemone` — body
  `{ state, model, questions: { id → { type, instructions, criteria? } } }`;
  response `{ model, answers: { id → typed answer }, usage }`. Errors: 401 / 422 /
  429 / 529; client SDKs retry 429/529 with backoff automatically.
- **Answer fields**: noul → `{noul}` (no confidence field); choice →
  `{choice, probabilities, confidence}`; score → `{score, legend, probabilities,
  confidence}` (score is probability-weighted and can land between levels).
- **Pinning**: pin versioned IDs, not aliases (§5.1). `GET /v1/models` lists the
  names an account can send; versioned IDs are accepted regardless.
- **Budgets**: ~64k tokens per request (state + all questions combined); state
  ≤ ~32k. Parallel questions in one request add near-zero latency — batch the
  whole judgment set (§3).
- **Pricing/rate**: input-only pricing ($42 per Btok, output tokens free);
  ~250k tok/s and ~1,200 rpm, dynamically adjusted — expect and back off on 429s.
- **Language caveat (station-relevant)**: English is the primary training
  language; CJK (incl. Korean) is handled but not equally well — evaluate
  thresholds on Korean state content before letting an auto-tuned station act
  unattended, and lean on the escalation policy accordingly.

## 8. First run record (jev-1.13.0)

Script: `examples/typesafe-stations/ticket-line.mjs` (plain `fetch`, one request per ticket,
4 parallel questions, Korean tickets + one English control). Results matched the
worked example's predictions:

- **T1 KR routine** → AUTO-ROUTE billing (urgent 0.19, value 1, novel 0.1, route
  top-p 1.00). Korean handled cleanly on the routine path.
- **T2 KR urgent + high-value** → ESCALATE, *sole why: value 5 ≥ 3.5*. Urgency
  0.99, novelty 0.15, route top-p 0.93 — every **reading** dimension passed with
  margin; only the **responsibility** rule forced the seat. The thesis in action.
- **T3 KR novel** → ESCALATE on three whys (novelty 0.78; route top-p 0.47, margin
  0.09, route confidence 0.29 — the docs' "I don't know" signal firing as designed).
- **T4 EN control** → AUTO-ROUTE sales; value 1.97 — a Score landing between
  levels, confirming the probability-weighted answer in practice.

~700 input / ~102 output tokens per ticket (batched). Four samples validate
nothing statistically — the §5 replay set and §7 Korean-threshold evaluation are
still owed before any unattended operation.

### Split record — serial translation station (KO→EN before the judgment set)

Follow-up to the §7 language caveat: should a translation station seat in series
before the judgment set? Tested in its **strongest** form (human-grade
translation), three variants: A Korean state · B en-only state · C hybrid
(original + rendering both in state). Zero decision changes across variants.

- candidate: serial g-hat translation → judgment set
- evidence: routine path identical at ceiling (T1); urgent path **degraded** by
  translation — route margin 0.86→0.76, confidence 0.91→0.84, crossing the
  strict urgent threshold (noisier bundle to [B_1,1] for the same ticket);
  novel case escalates identically everywhere (novelty 0.78/0.87/0.82) while
  route flips to the no-match option only in translated states — plausibly a
  rendering artifact; hybrid costs +8–12% tokens per ticket
- why it fails: no measurable reading gain on any path; measurable reading loss
  on the urgent path; +1 serial auto-tuned station = +1 drift source and watch
  burden; evidence-loss risk concentrates on novel cases — where reading matters
  most (n=3 discriminative samples; the §5 replay set may re-open this)
- verdict: **Fake — removed.** If ever re-opened, only the hybrid form is
  admissible: the original must stay in state so the judgment set and [B_1,1]
  see the evidence, not just its rendering
