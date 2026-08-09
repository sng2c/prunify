# pruner-arch

> **Pruner (Pruning Architect)** — a top-down backcasting skill for the [pi](https://github.com/earendil-works/pi-coding-agent) coding agent, told in the **factory-line** picture.

A pi skill that designs toward a **possibly-non-existent ideal product**, splits every
piece into **machine stations** (same input ⇒ same output, no guessing) vs
**auto-tuned stations** (learned/probabilistic, mostly right but drifts, needs watching)
vs **human-judgment stations** (contextual judgment, never faked as a rule), defers the
judgment parts as **human-judgment stations** with only an I/O contract, and **discovers
— not designs — a control panel** as the surviving human stations. A **contradiction
check** marks specs **unbuildable-by-structure** (hold both poles as limits, never
collapse). **Conflicting requirements are resolved by stripping the rigid form**
(fully-auto vs fully-manual) to keep each side's *essential value*, then reconstructing
as a **semi-automated line** (auto→semi-auto: insert a human-judgment station when total
automation threatens integrity; manual→semi-auto: push repetitive toil into a machine
station, retain the human only for judgment). It **recurses downward to the bottom
point** (no remaining human station reduces to a machine station; every survivor resists
— empirically (re-opening yields the same judgment) or by contradiction
(unbuildable-by-structure)), keeps a **per-layer line log**, and emits a **Final Line
Report**; the supervising intelligence authorizes the full descent via the trigger and
confirms the bottom point in post-run review. The control panel shrinks by deleting
phantom human stations; the surviving set is discovered, not designed.

## v0.9.0 — spine rebuilt (factory line; small-model self-contained)

Through v0.8.x the skill used Kant (a priori / regulative ideal) · Peirce (empirical
test) · Hegel (dialectic) terminology as a **borrowed spine** — it took the precision
devices already living in a large model's common sense for free. The effect was
validated, but it also surfaced that, because those terms' meaning depends on the model's
background knowledge, **the skill does not run on small language models**.

v0.9.0 reforges the spine in a **new, self-contained language** on top of the
**factory line** — a picture everyone (and every model) already knows. Precision now
lives in **each primitive's "operation + self-check"**: the model performs the operation
and answers the self-check (a yes/no), and the meaning is fixed without any background
knowledge — so it runs on small models too. The original philosophical formulation is
preserved verbatim in
[`skills/pruner-arch/references/philosophy.md`](skills/pruner-arch/references/philosophy.md)
(not required to run; for the curious about the theoretical roots).

## Core concept — the factory line + 8 primitives

Treat the problem as one **factory line**. A station (a work seat) is one of three kinds:
*   **Machine station** — same input ⇒ same output, no guessing or learning. Fully automatable.
*   **Auto-tuned station** — runs automatically but learns from data, so it drifts; mostly right but needs watching. (Different from a machine station; mixing them smuggles drift in.)
*   **Human-judgment station** — needs reading the situation and judging in context. Never faked as a rule; define only its I/O contract.

**Control panel = the surviving human-judgment stations.** **Cognitive-load minimization = minimize the number of human stations.** **MVP = the current line.**

The 8 primitives (each: operation + self-check): ① ideal-product sketch ② contradiction
check ③ shell-stripping ④ three-bin sort ⑤ open-and-split test ⑥ bottom point ⑦ line log
⑧ no-declaration rule. See [`SKILL.md`](skills/pruner-arch/SKILL.md) §2 for the detail.

## What it does (4 stages → descent to the bottom)

The trigger authorizes a **full descent to the bottom**. The skill keeps a **line log**
and runs the 4 stages once per layer, descending into human stations depth-first:

1. **Ideal-product sketch + contradiction check + shell-stripping** — suspend real-world
   constraints and write the ideal product in one line ("buildability unverified"). A
   contradictory spec is a managed tension (both poles as limits), not a shippable
   product. Clashing requirements → strip the form, keep the essence → repetitive toil =
   machine, judgment = human.
2. **Reality friction + three-bin sort** — collide the ideal product with reality; pull
   out "what a machine can run exactly now" vs "what needs judgment," and sort every piece
   into machine / auto-tuned / human-judgment stations (don't mix auto-tuned into the
   machine bin).
3. **Human-station I/O + current line (MVP)** — defer the judgment parts as a
   human-judgment station [B] with only an I/O contract; wire the rest into the thinnest
   line (MVP = the control panel) you can build right now.
4. **Open-and-split + log + descend or stop at the bottom** — open each human station and
   re-run 1–3: if it reduces to a machine/auto-tuned station it was fake (remove, name the
   replacement); if re-opening returns the same judgment it's real (keep). Log the layer.
   If any kept station is still openable, descend; else the bottom is reached.

> **Termination & deliverable.** At the bottom, the surviving human-judgment stations
> *are* the control panel — minimized human-judgment seats over a machine core (plus an
> auto-tuned layer with its own drift risk) — *discovered* by deleting fake human
> stations, not designed top-down, and delivered as the **Final Line Report** with the
> full per-layer trace, for the supervising intelligence to confirm in post-run review.

## Activates on

`[Pruner]` · `Pruner` · `pruner` · `가지치기` · `가지치기 모드` — or when asked to
design a complex problem top-down.

## Anti-patterns (strict)

*   **No shell rhetoric** — "synergy / convergence / next-gen / complementary" substance-free speak fails the run.
*   **No reifying the product** — never assume the ideal product (or any human-station ideal) is real without testing whether it dissolves into machine stations.
*   **No false bottom** — never declare a station irreducible ("real") without an *actual* open-and-split that tried to mechanize it ("I can't imagine how" is not real). Conversely, never declare a station **fake** without naming the replacement machine/auto-tuned station. The bottom is *tested into*, never declared.
*   **No contradiction-only stop** — a contradiction-check "unbuildable" verdict counts as real only when paired with the Stage-4 empirical test; stopping on contradiction alone is the false-bottom anti-pattern in philosophical disguise.
*   **No descent without a log** — every descended layer is written to the line log *before* moving on; the log guards against flow-leak across the recursion.
*   **No neglected human stations** — lay down I/O-contract guardrails before and after each human-judgment station so the flow doesn't leak.

## Install (in pi)

```bash
pi install git:github.com/sng2c/pruner-arch
```

Or add to `~/.pi/agent/settings.json`:

```json
{
  "packages": [
    "git:github.com/sng2c/pruner-arch"
  ]
}
```

Then invoke with `/skill:pruner-arch` or trigger it by typing `[Pruner]` / `가지치기`.

## Package

```json
{
  "name": "pruner-arch",
  "version": "0.9.0",
  "pi": { "skills": ["./skills"] }
}
```

## License

MIT © sng2c