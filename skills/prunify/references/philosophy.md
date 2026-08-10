# Pruner — Theoretical Background (philosophical formulation, preserved verbatim)

> **This document is not required to run the skill.** Running needs only the factory-line
> language in `SKILL.md`. This file preserves, verbatim, the Kant (a priori / regulative
> ideal) · Peirce (empirical test) · Hegel (dialectic) formulation that was the skill's
> backbone through v0.8.x, for those curious about the theoretical roots.

## Mapping — philosophical term ↔ factory-line primitive

| Philosophical formulation (original, v0.8.x) | Factory-line primitive (v0.9.0) |
|---|---|
| regulative ideal ($I_0$, possibly non-existent) | ideal-product sketch (buildability unverified) |
| antinomy test (a priori) | contradiction check |
| dialectic reconstruction / Auto→Semi-auto / Manual→Semi-auto | shell-stripping |
| deterministic mapping $y=f(x)$, a priori | machine station |
| semi-automated approximation $\hat f(x)$, a posteriori | auto-tuned station |
| contextual intelligence node $I_{intel}$ | human-judgment station |
| control panel diet / cognitive load reduction | minimize human-station count (control-panel diet) |
| dissolves into $f(x)$ / phantom | fake human station (remove, name the replacement) |
| resists dissolution / real | real human station (keep) |
| fixed point / idempotence | bottom point |
| Layer Log | line log |
| no fabricated fixed point / no transcendental shortcut / no reification | no-declaration rule |
| MVP = running control panel | MVP = current line |

## Original §2 — Core Philosophy & Identity (v0.8.1)

*   **Regulative Ideal ($I_0$, possibly non-existent):** Backcast from the topmost ideal $I_0$, but hold it as a *regulative ideal* — it may or may not exist. Do not assume $I_0$ is real and do not dismiss it as fake. At each layer, *test* whether the current ideal dissolves into observable functional structures; only a stable, intelligence-agreed residual earns the status of a real target. Building a mechanism toward an ideal assumed real — when it may be a phantom — is the primary semantic failure this skill prevents.
*   **Antinomy Test & Dialectic Reconstruction (변증법적 본질 분해 및 재구성):**
    When requirements or ideals collide (Thesis vs Antithesis), do not compromise by deleting functionality or forcing a binary pick.
    1. **Strip Rigid Forms:** Separate the *essential value* of each requirement from its implementation form (whether it was requested as "100% automated" or "fully manual").
    2. **Dialectic Vector Shifts:**
       * **Auto $\rightarrow$ Semi-auto:** When total automation threatens system integrity or hits non-linear entropy, drop the illusion of 100% auto and insert a precision intelligence control gate ($I_{intel}$).
       * **Manual $\rightarrow$ Semi-auto:** When manual processes cause fatigue/error, strip deterministic toil into $y=f(x)$ and retain human involvement solely for contextual judgment and accountability.
    3. **Regulative Limit:** If constitutive realization still forces a contradiction, record the antinomy, hold both poles as regulative limits, and route the residual directly into a semi-automated control panel.
*   **Fractal Decomposition — Deterministic Functions vs Contextual Intelligence:** At each layer, decompose the system into:
    1. **Deterministic Functional Mappings ($y = f(x)$) — a priori:** Closed state-space transformations, algebraic rules, or invariant algorithmizable procedures — *genuinely* deterministic: same input ⇒ same output, no learned or probabilistic component. *A priori* relative to a fixed rule/parameter set: unrevisable by further experience *given that set* (logical / mathematical). The choice of the rule set and parameter values is itself **a posteriori governance** (a one-time or periodic intelligence decision), not part of $f(x)$; filing those revisable choices as $f(x)$ is a semantic failure.
    2. **Contextual Intelligence Nodes ($I_{intel}$):** High-entropy, non-linear domains requiring adaptive reasoning, judgment, or contextual interpretation under uncertainty.
    Prune away the Deterministic; descend fractally into the Intelligence Nodes, repeating until only the irreducible **core** remains. A learned or probabilistic approximation $\hat f(x)$ is **a posteriori** — dependent on data, revisable by new experience; its "drift" *is* the revisability of the empirical. It is **not** a deterministic $f(x)$ — file it as a **semi-automated** node with its own drift risk, or it will smuggle intelligence back into the "deterministic core."
*   **The Core is Contextual Intelligence & Responsibility:** The irreducible non-functional core is not a defect to be eliminated — it is the domain of *Contextual Intelligence* (whether Human, AGI, or Agentic System). Defer it as an intelligence-gated black box; never fabricate a dummy function for it.
*   **The MVP is the Running Control Panel:** At each layer, the MVP *is* the current control panel — its `[Black Box X]` gates are the exposed intelligence controls, and the rest is automated via deterministic functional mappings $f(x)$ or semi-automated $\hat f(x)$. The MVP and the control panel are the same object seen two ways.
*   **Minimization = Control Panel Diet & Cognitive Load Reduction:** On descent, *test* each control (each deferred ideal): if it **dissolves** into explicit functional mappings $f(x)$ (or a semi-automated $\hat f(x)$), it was a *phantom ideal/control* — **delete** it from the control panel. If it **resists dissolution** (a stable residual that still requires contextual intelligence), it is a *real* intelligence-control gate — **keep** it. The true goal of "Control Panel Diet" is **cognitive load minimization**: eliminating mental friction, unnecessary monitoring fatigue, and phantom switches so that human/AGI intelligence can concentrate 100% of its capacity on critical contextual judgment and accountability. The panel shrinks by deleting phantom controls; the surviving set is *discovered*, not designed. The goal is not full automation; it is *minimal, surgical intelligence control*.
*   **Descent to the Fixed Point (auto-recursion):** Recurse downward through layers until the **fixed point**: no remaining black box can be reduced to $y = f(x)$ — every surviving control has resisted, so re-opening it is **idempotent** (it yields the same control back; opening changed nothing semantically). Phantoms are deleted along the way; the surviving set is *discovered* at the fixed point.
*   **Provisional Verdicts & Post-Run Confirmation:** The AI's dissolve/resist verdict at each node is **provisional** — whether empirical (idempotence) or a priori (antinomy). "Is this really irreducible to $y = f(x)$?" is itself a contextual judgment — the fixed-point detector is itself a control in the panel — so the supervising intelligence **confirms** the fixed point in the Final Architecture Report review. A verdict must come from an *actual* open-and-test (and, for antinomy/synthesis, an actual derivation), never from "I can't imagine how to formulate $f(x)$."
*   **Symbolic Relational Expression:** Redefine every concept as a pure network of relations between symbols — [subject - object - flow - feedback - state space], etc.
*   **Semantic-Failure Control:** Strictly control the risk of "no code error, but the outcome drifts wrong" (Semantic Failure) that arises when deterministic assumptions are forced onto non-linear intelligence domains — including the drift that occurs when a probabilistic or learned $\hat f(x)$ is filed as a deterministic $f(x)$, so the "deterministic core" silently contains intelligence.

## Original §4 — Strict Constraints & Anti-Patterns (v0.8.1)

* **No conceptual bloat:** The moment media-style rhetoric that inflates only the shell with no substance — "synergy," "convergence," "next-gen," "complementary," etc. — is used, the skill run is deemed to have failed. Focus strictly on relational logic and functional boundaries.
* **No reification of the ideal:** Never treat $I_0$ (or any black-box ideal) as real without testing whether it dissolves into deterministic functional mappings $y = f(x)$. Building a "realization" of a possibly-phantom ideal is a semantic failure.
* **No fabricated fixed point:** Never declare a control irreducible ("resists") without an *actual* open-and-test descent attempting to derive a deterministic mapping $y = f(x)$. "I can't imagine how to formulate $f(x)$" is not resistance — it may be a phantom you failed to crack. Conversely, never declare a control **dissolved** without naming the concrete $f(x)$ (or $\hat f(x)$) that replaces it; a dissolve with no replacement function is a lazy dissolve. The fixed point is *tested into*, never assumed or declared by exhaustion.
* **No transcendental shortcut:** An a priori resist signal (antinomy, categorial inexpressibility) must be *paired* with the empirical idempotence test of Stage 4, never used alone. Declaring a control irreducible on purely a-priori grounds — "it is structurally unconstitutable, stop" — revives the fabricated-fixed-point anti-pattern in philosophical disguise. Kant diagnoses *why*; Peirce still *tests*.
* **No descent without a record:** Every descended layer must be appended to the Layer Log *before* moving to the next. The Layer Log is the guardrail against Semantic Drift across the recursion — the standing form of "no neglected non-linear nodes."
* **No neglected non-linear nodes:** To prevent the context from slipping due to an unconstrained non-linear node (Semantic Drift), always lay down symbolic cause-and-effect guardrails before and after each non-linear node.