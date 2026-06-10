# Violent Plume + 12s Cyclic Hot-Fire Loop

All work stays in `src/routes/index.tsx` (markup tweaks only) and `src/styles.css` (new master keyframes). No JS, no new deps, no layout/geometry changes — the twin nozzles, gradient stops, and path geometry stay as-is.

## 1. High-Frequency Violent Churn (replace SMIL with CSS)

**Why swap:** SMIL `<animate>` on `baseFrequency` / `seed` is smooth and slow — it eases between values and gives the current "gentle breathing" look. CSS keyframes with step-like, sub-100ms cuts read as violent shock-cell flicker.

**Plan:**
- Remove the two `<animate>` tags inside `#exhaust-turbulence` and `#spark-jitter` (the filters themselves stay — we keep `feTurbulence` + `feDisplacementMap` to retain the displaced-edge look).
- Pre-render the filter with a fixed `baseFrequency="0.018 0.032"` and `seed="7"` so the underlying noise field is already chaotic.
- Drive all live motion from a single rapid CSS keyframe stack on the plume paths.

**New `@keyframes plume-churn` (0.32s loop, 5 keyframes ≈ one frame every 0.08s):**
| % | scaleY | opacity | filter brightness | translateX |
|---|--------|---------|-------------------|------------|
| 0   | 1.00 | 0.92 | 1.00 | 0px   |
| 25  | 1.18 | 1.00 | 1.20 | +1.5px |
| 50  | 0.88 | 0.85 | 0.95 | -1px   |
| 75  | 1.24 | 1.00 | 1.25 | +2px   |
| 100 | 1.00 | 0.92 | 1.00 | 0px   |

- `animation-timing-function: steps(1, end)` on this keyframe so values snap (no easing) → reads as turbulent shock flicker, not breathing.
- Each of the three plume paths (`upper`, `lower`, `core`) gets a different `animation-delay` (0s, -0.11s, -0.19s) so they de-sync and churn against each other.
- `plume-spark` gets a faster variant `plume-flicker` (0.18s, opacity 0.4↔1, scaleY 0.7↔1.3, steps(1)) for the high-frequency white licks.
- `transform-origin` stays at the nozzle throat so scaleY pulses outward from the source, not the center.

**Filter displacement pulse:** since CSS can't animate SVG filter `scale` attributes, we instead duplicate the plume group: a base layer at displacement scale 8 (static), plus a second copy with the filter applied at a stronger displaced look, fading in/out via `plume-churn` opacity stack. Cheaper alternative we'll use: animate `filter: url(#exhaust-turbulence) blur(Xpx) brightness(Y)` on the CSS side — the perceived "displacement scale" change comes from rapid blur(0px↔2px) + brightness pulses inside the same keyframe. This avoids re-render of SVG filter attrs every 80ms (which is expensive) while preserving the violent look.

## 2. 12-Second Master Cycle (`@keyframes engine-cycle`)

One master keyframe applied to the entire `.plume-group` wrapper (`<g>` around all three plume paths + spark + throat flashes). Drives the lifecycle envelope; the `plume-churn` keyframe runs continuously underneath, so when the envelope says "visible & full scale", the churn is what you actually see.

**Master timeline (12s, infinite):**

```text
time      phase            scaleX  opacity  notes
--------  ---------------  ------  -------  -----------------------------------
0.00s     IGNITION start   0       0        throat-flash fires (0.2s burst)
0.50s     burn begins      1       1        explosive scaleX 0→1, cubic-bezier(.2,.9,.2,1)
0.50–7.00 BURN (6.5s)      1       1        steady envelope; plume-churn rages
7.00s     cutoff begin     1       1        ---
8.00s     cutoff end       0       0        smooth scaleX 1→0 + opacity 1→0, ease-in
8.00–11.95 COOL DOWN       0       0        plume fully hidden, text clean & still
11.95s    pre-ignite       0       0        ---
12.00s    loop restart     0       0        throat-flash retriggers via same cycle
```

**Keyframe percentages (12s = 100%):**
| % time | %kf | transform | opacity |
|--------|-----|-----------|---------|
| 0.00s  | 0     | scaleX(0) | 0 |
| 0.50s  | 4.17  | scaleX(1) | 1 |
| 7.00s  | 58.33 | scaleX(1) | 1 |
| 8.00s  | 66.67 | scaleX(0) | 0 |
| 12.00s | 100   | scaleX(0) | 0 |

`animation: engine-cycle 12s cubic-bezier(.2,.9,.2,1) infinite;` on `.plume-group`.

**Throat flash re-trigger:** the current `.throat-flash` is a one-shot. Replace with a 12s keyframe that fires opacity 0→1→0 between 0% and 4% (the ignition window) and stays 0 the rest of the cycle, infinite. Same trick for `.nozzle-heat` — bind its brightness flicker only between 4% and 58% so the bell only glows during the burn.

**Churn gating:** `.plume` keeps `plume-churn 0.32s steps(1) infinite` always running. Visibility is controlled entirely by the parent `.plume-group` envelope (`opacity: 0` during cool-down hides the churn). No need to pause/resume the churn animation — keeping it free-running avoids any sync stutter on restart.

## 3. Reduced-Motion Guard

Inside `@media (prefers-reduced-motion: reduce)`:
- `.plume-group { animation: none; opacity: 1; transform: none; }` — static visible plume.
- `.plume, .plume-spark { animation: none; }` — no churn.
- `.throat-flash, .nozzle-heat { animation: none; opacity: 0; }` — no flashing.

## 4. Files to Touch

- `src/routes/index.tsx`
  - Wrap the three plume paths + spark path + two throat-flash circles in a single `<g className="plume-group">`.
  - Remove the `<animate>` children inside `#exhaust-turbulence` and `#spark-jitter` (keep filters with static `baseFrequency` / `seed`).
  - No geometry, gradient, or nozzle changes.
- `src/styles.css`
  - Replace `plume-roar` keyframes with new `plume-churn` (steps(1), 0.32s) and `plume-flicker` (0.18s).
  - Replace `.plume` animation stack: only `plume-erupt` removed (envelope now owns ignition), `plume-churn` runs infinite.
  - Add `engine-cycle` 12s master keyframe + `.plume-group` rule.
  - Convert `.throat-flash` and `.nozzle-heat` to 12s cycle-synced keyframes.
  - Update `prefers-reduced-motion` block per §3.

## 5. Verification After Build

- Load `/`. Confirm the loop: 0–0.5s ignition flash + scaleX burst, 0.5–7s violently churning plume (visible step-cuts every ~80ms), 7–8s shrink-back, 8–12s plume completely gone (text fully clean), then repeats.
- Name text remains crisp throughout; no console errors; no layout shift; reduced-motion users see a static plume with no flicker.

Out of scope: no JS, no new deps, no changes to nozzle geometry, gradient stops, paths, or any non-plume content.
