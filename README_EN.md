# prunify

> **Prunify (Pruning Architect)** — a top-down backcasting skill for the [pi](https://github.com/earendil-works/pi-coding-agent) coding agent, built on the **factory-line** metaphor. (repo: `github.com/sng2c/prunify`)

Prunify targets a potentially non-existent **ideal product**. It decomposes any problem into three station types:

- **Machine** — deterministic (same input → same output), no learning. Fully automatable.
- **Auto-Tuned** — automatic but learned/probabilistic; drifts, needs monitoring. Never mix into the machine bin.
- **Human-Judgment** — needs contextual reading or accountability. Defined only by its I/O contract; deferred.

For each human station it **first attempts a machine/auto-tuned replacement**; fakes (replaceable) are deleted (replacement named), reals (irreducible) are kept — discovering the **control panel**. Recurses top-down to the bottom.

## Core — 6 phases (do-next)

1. **Admit (once)** — a trigger activates the skill, but does not start a descent on an under-specified problem: if no concrete problem (a system in one line + ≥1 hard tension + an accountability question) is present, request framing first.
2. **Sketch** — write this layer's ideal end-state in one line (`[Buildability Unverified]`). A contradiction (two musts clashing) is a **managed tension** — both poles as limits, a human station between them. Strip "fully auto / fully manual" shells to essence.
3. **Sort** — sort every component into Machine / Auto-Tuned / Human-Judgment. (Keep auto-tuned out of the machine bin.)
4. **Seat** — write each human station's I/O contract (Input / Output / Responsibility). Connect the rest into the current line (MVP).
5. **Split (the core)** — for each human station, write **in the visible log** a concrete candidate replacement + a one-line reason it fails. Then: candidate succeeds → **Fake** (remove, name replacement); no candidate fits and it decomposes → **Descend**; no candidate fits and re-opens the same → **Real** (keep). Emit the layer log; descend while any station opens.
   - **Hard gate:** any verdict (Fake/Real/Descend) without a visible candidate + why-it-fails line → redo Phase 5 for that station. (The #1 shortcut that breaks the skill.)
6. **Report (once, at the bottom)** — emit the Final Line Report: control panel (surviving Real stations + I/O), machine core, auto-tuned layer, removed fakes (with replacements). Await review.

## Activates On

`[Prunify]` · `Prunify` · `prunify` · `가지치기` · `가지치기 모드` — or when asked to design a complex problem top-down. It does not, however, auto-run a descent on an under-specified problem: if no concrete problem is present (a system in one line + ≥1 hard tension + an accountability question), it requests framing first.

## Installation (in pi)

```bash
pi install git:github.com/sng2c/prunify
```

Or add to `~/.pi/agent/settings.json`:

```json
{
  "packages": [
    "git:github.com/sng2c/prunify"
  ]
}
```

Then invoke `/skill:prunify`, or type `[Prunify]` or `가지치기`.

## Anti-patterns (summary)

- **No shell rhetoric** — synergy / next-gen / seamless / hyper-automation.
- **No reifying the ideal product** — never treat it as real without testing its reduction to machine stations.
- **No false bottom** — "I can't imagine how" is not proof; a replacement must be attempted first.
- **No rationale-only verdicts** — every verdict preceded by a visible candidate + why-it-fails. (The #1 failure v0.9.2 fixed.)
- **No contradiction-only stop** — pair a contradiction with empirical open-and-split.
- **No descent without a log.**

## In one line

> "Start from the ideal-product sketch, resolve clashing requirements by stripping to essence and rebuilding as a semi-automated line, offload all repetitive toil into machines, and discover — by deleting fake human stations — the leanest control panel that minimizes cognitive load; report it."

## Package

```json
{
  "name": "prunify",
  "version": "0.9.6",
  "pi": { "skills": ["./skills"] }
}
```

## Changelog (condensed)

- **v0.9.6** — Switched the TypeSafe run path to the **pi-typesafe extension**: `references/typesafe-stations.md` now routes through the in-session `typesafe_evaluate` tool as the primary path (one batched call, ≤32 questions·64 KiB, 20 attempts/session with no auto-retry, `/typesafe enable` opt-in, `/typesafe status` gate, daily-cap env vars, calibrate replay), demoting raw HTTP to the standalone path (§7b). One in-pi routing line added to SKILL.md Phase 5. Example scripts reclassified as the outside-pi path (§8 run record preserved).
- **v0.9.5** — Added the TypeSafe integration reference: `references/typesafe-stations.md` (Jev judgments as the canonical Auto-Tuned seat — three sort rules, the escalation-bundle handshake, drift watch; verified against the live docs) plus runnable examples in `examples/typesafe-stations/` (first-run record; the translation-station candidate ruled Fake). No changes to the SKILL.md body.
- **v0.9.4** — Renamed the skill to **Prunify** (prune + purify/verify). Restructured the body from 8 primitives → 6 **do-next phases** (v0.9.3). Added the front-gate (Phase 1 Admit): a trigger ≠ adequate framing; request framing before descending on an under-specified problem. Repo and skill directory also renamed to `prunify` (GitHub auto-redirects the old `pruner-arch` URL).
- **v0.9.2** — Made the candidate attempt a mandatory template field (Candidate → Why-it-fails → Verdict, 3 lines). Structurally blocks the rationale-only verdict — the #1 shortcut measured on Gemma 4 31B.
- **v0.9.1** — Hardened for mid-size instruct models (Gemma 3 27B-class): worked example, output discipline, strengthened self-checks, final self-audit.
- **v0.9.0** — Rebuilt the spine around the factory-line metaphor (philosophical terms → self-contained language). Precision via each primitive's "operation + self-check".

## License

MIT © sng2c