# Hot-Fire Plume Around "Karnan Thamilchelvan"

Reference photo (twin Merlin-style bell nozzles on a test stand) drives every visual decision: white-hot throat core, billowing yellow combustion bloom, orange mid-band, smoky crimson edges, and visible machined hardware at the source. All work stays in `src/routes/index.tsx` (SVG markup) and `src/styles.css` (keyframes + reduced-motion guards). No JS, no new deps.

## 1. Layer Architecture

The hero name sits on top of a single absolutely-positioned SVG overlay sized to the name's bounding box. Stacking is reordered so text is ALWAYS legible:

```text
z  layer                          purpose
--  ----------------------------  --------------------------------------------
 0  Earth background (existing)
 1  Plume bloom (blurred halo)    soft yellow/orange glow, blend: screen
 2  Plume body (gradient fills)   sharp flame envelope, blend: screen
 3  <h1> name text (z-10)         crisp, untouched, sits ON TOP of plume
 4  Spark licks (thin white)      tiny flickers crossing in front of letters
```

SVG: `viewBox="0 0 800 220"`, `preserveAspectRatio="none"`, `overflow-visible` so the tail extends past the right edge of the name.

## 2. Twin Bell Nozzle Hardware (left of the "K")

Mirroring the reference, we render TWO stacked bell nozzles (not one) — a small twin-engine cluster anchored at the throat origin:

- Each bell: filled `<path>` trapezoid with curved lip, ~28px tall, stacked vertically with a 4px gap. Combined cluster ~62px tall, sitting flush left of the "K".
- Fill: vertical `nozzle-metal` gradient `#475569 → #1e293b → #0f172a → #334155` for machined steel sheen.
- Lip rim: 1px stroke `#94a3b8` to read as polished alloy.
- Inner throat: 6px dark ellipse (`#020617`) per bell — the visual origin of the white-hot core.
- Cross-bracing: 2 thin `#334155` struts above the cluster suggesting the test-stand frame (matches the upper structure in the reference).
- Radiant heat: `drop-shadow(0 0 8px rgba(255,170,60,0.6))` with a 1.2s `nozzle-heat` brightness flicker (0.95↔1.1). The bells themselves don't move — real hardware is rigid.

## 3. Multi-Stop Combustion Gradient

ONE shared `<linearGradient id="rocket-fire" x1="0" x2="1">` reused by both plume paths, stops mapped to the reference's color zones:

| offset | color       | alpha | role                        |
|--------|-------------|-------|-----------------------------|
| 0%     | `#ffffff`   | 1.00  | blinding throat core        |
| 6%     | `#fff7d0`   | 0.95  | white-hot transition        |
| 18%    | `#ffd24a`   | 0.90  | solar yellow combustion     |
| 38%    | `#ff8a1f`   | 0.80  | fierce orange band          |
| 58%    | `#ff6a00`   | 0.55  | aerodynamic boundary stream |
| 80%    | `#a01818`   | 0.30  | cooling crimson smoke       |
| 100%   | `#3a0606`   | 0.00  | fades to transparent cosmos |

A secondary `#rocket-fire-soft` clone (all alphas ×0.5) feeds a `feGaussianBlur stdDeviation="8"` underlay for atmospheric bloom without washing out the letters.

**Why this resolves the cyan-tube readability problem:** the gradient runs along the flow axis, so the brightest stops (0–18%) sit OUTSIDE the letters near the nozzle, and the mid-name region (where the glyphs live) falls in the 38–58% band — translucent orange behind white text is high-contrast and legible. The crimson tail (80–100%) is mostly transparent.

## 4. Plume Path Geometry (twin streams that merge)

Mirroring the reference's twin-engine plumes that converge into one bloom:

- `plume-upper`: originates at the upper nozzle throat, curves up-and-right over the top of the name, balloons mid-name, tapers off-screen right.
- `plume-lower`: mirrored across the cluster centerline, curving under the name.
- `plume-core`: a third narrower path that runs through the centerline (between the two cluster throats), representing the merged hot-stream — this is the brightest band.

All three filled with `url(#rocket-fire)`, rendered with `mix-blend-mode: screen` so they only brighten the background. Approximate path for `plume-upper`:
`M 42 92 C 180 30, 380 28, 580 60 C 680 78, 760 92, 800 100 L 800 112 C 600 100, 340 90, 160 110 Z`

## 5. SVG Fluid Turbulence (`<feTurbulence>` + `<feDisplacementMap>`)

One reusable filter `#exhaust-turbulence` applied to all three plume paths:

```xml
<filter id="exhaust-turbulence" x="-10%" y="-50%" width="120%" height="200%">
  <feTurbulence type="fractalNoise" baseFrequency="0.012 0.028"
                numOctaves="2" seed="3" result="noise">
    <animate attributeName="baseFrequency"
             dur="6s" repeatCount="indefinite"
             values="0.010 0.024; 0.018 0.034; 0.010 0.024" />
    <animate attributeName="seed"
             dur="2.4s" repeatCount="indefinite"
             values="3; 7; 12; 3" />
  </feTurbulence>
  <feDisplacementMap in="SourceGraphic" in2="noise"
                     scale="8" xChannelSelector="R" yChannelSelector="G" />
</filter>
```

- Animating `baseFrequency` stretches/compresses the noise field like compressible exhaust gas.
- `seed` step-jumps create discrete "shock" reshuffles — the visual analog of pressure waves.
- `scale="8"` displaces edges enough to ripple/churn but keeps gradient bands coherent.
- A second lighter filter (`baseFrequency 0.04 0.06`, `scale 3`) drives a thin white `spark` path that crosses in front of the text for high-frequency flicker.
- `@media (prefers-reduced-motion: reduce)`: the animate elements are removed (CSS `animation: none` won't disable SMIL, so we conditionally render them by class — wrapping the `<animate>` tags in a `<g class="motion-only">` and using `display:none` via the media query).

## 6. Ignition Choreography

| t (s) | event                                                                |
|-------|----------------------------------------------------------------------|
| 0.00  | Twin nozzles fade in + slide 12px right (`nozzle-rise`, 0.45s)       |
| 0.25  | Throat flash: white radial burst per bell scales 0→1 in 0.2s, fades  |
| 0.35  | Three plume paths `scaleX(0)→scaleX(1)` over 0.55s, eased            |
| 0.95  | Turbulence filter `<animate>` elements begin                         |
| ∞     | `plume-roar` loop: opacity 0.85↔1, brightness 0.95↔1.15, 1.6s        |

CSS handles one-shot scale/opacity (GPU-friendly); SVG SMIL drives the steady-state turbulence.

## 7. Text Legibility Guardrails

- `<h1>` z-index above SVG, no filter, no shadow change — letters stay razor-sharp.
- Plume paths use `mix-blend-mode: screen` (additive only — never darkens text).
- Gradient timed so the mid-name region is ≤55% alpha orange, max contrast against white glyphs.
- Frosted metrics card and Earth background untouched.

## Technical Section (for the build pass)

Files to touch:
- `src/routes/index.tsx` — replace the current cyan plume SVG block. Add `<defs>` with `rocket-fire`, `rocket-fire-soft`, `nozzle-metal` gradients and `exhaust-turbulence` + `spark-jitter` filters. Render: twin nozzle `<path>`s + struts, two throat-flash `<circle>`s, three plume `<path>`s (upper/lower/core), one spark `<path>`. Keep `<h1>` markup unchanged aside from `relative z-10`.
- `src/styles.css` — remove `.plume-top` / `.plume-bottom` cyan stroke rules. Add: `.nozzle` + `nozzle-rise` + `nozzle-heat`, `.plume` `plume-erupt` scaleX, `plume-roar` brightness/opacity loop, `.throat-flash` 0.2s burst, `prefers-reduced-motion` guard hiding the `motion-only` group.

Out of scope: no JS, no new deps, no changes to data, routing, metrics card, or other sections.

Verification after build: load `/`, confirm (a) twin bells visible left of "K" with strut hardware, (b) gradient transitions white→yellow→orange→crimson→transparent, (c) edges ripple/churn continuously, (d) name remains fully crisp and readable, (e) no console/runtime errors.