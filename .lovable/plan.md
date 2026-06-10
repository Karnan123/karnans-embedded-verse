# Raptor 3 Geometry + Synced Molten Text

Scope: `src/routes/index.tsx` (SVG markup + name spans) and `src/styles.css` (new gradients, keyframes). The 12s `engine-cycle`, `plume-churn`, `plume-flicker`, `throat-flash-cycle`, and `nozzle-heat` timings stay **untouched**.

---

## 1. Raptor 3 Engine Geometry

Replace the current `<g className="nozzle">` block (twin trapezoid bells + struts, ~lines 226–245) with a single, detailed Raptor 3 silhouette stacked vertically inside the existing `viewBox="0 0 800 220"`, anchored at the same throat coordinates (x≈42, y≈110) so the plume origin and `transform-origin` values don't shift.

### 1a. New gradients/filters in `<defs>` (index.tsx)

Add alongside existing `nozzle-metal`:

- `raptor-alloy` — vertical linear gradient: `#64748b` 0% → `#1e293b` 35% → `#0b1220` 65% → `#334155` 100%. Brushed-steel main body.
- `raptor-copper` — radial gradient for regen-cooled bell hot band: `#b45309` 0% → `#7c2d12` 60% → `#1c0a05` 100%.
- `raptor-shadow` — linear, `#000` 0.55 → `transparent`. Used for inner concavity strokes.
- `manifold-pipe` — linear gradient along pipe axis: `#94a3b8` → `#0f172a` → `#64748b`. Gives the looping propellant line specular highlight.
- `turbopump-dome` — radial: `#475569` center → `#0b1220` edge. Domed casing top-cap shading.
- Reuse existing `nozzle-metal` for secondary brackets to keep palette cohesion.

No new filters needed; existing `bloom` stays.

### 1b. Component stack (single Raptor 3, drawn back-to-front)

All paths grouped under `<g className="nozzle raptor3">`. Drawn in this Z-order so the bell flares out in front of the powerhead and the manifold loops over the neck:

```text
LAYER 1 — Test-stand mounting struts (deepest)
  • 2× rect brackets: x=2 y=54 w=10 h=4, x=2 y=156 w=10 h=4 — fill nozzle-metal
  • thin diagonal truss lines: 2× <line> from (2,58)→(14,72) and (2,156)→(14,142), stroke #475569 1px

LAYER 2 — Turbopump dome cluster (top of powerhead, near throat top)
  • Main dome: <ellipse cx=22 cy=78 rx=14 ry=10> fill=url(#turbopump-dome) stroke=#94a3b8 0.8
  • Secondary smaller pump: <ellipse cx=14 cy=92 rx=7 ry=6> same fill
  • 3 tiny bolt circles around dome rim: r=0.8, #cbd5e1

LAYER 3 — Powerhead block (machined center body wrapping the throat)
  • Rounded-rect <path> d="M 10 84 L 38 80 L 44 96 L 44 124 L 38 140 L 10 136 Z"
    fill=url(#raptor-alloy), stroke=#94a3b8 1, strokeLinejoin=round
  • Inner shadow stripe: same shape inset 2px, fill=url(#raptor-shadow) opacity 0.5

LAYER 4 — Curved main propellant manifold pipe (THE signature loop)
  • Outer pipe path:
    <path d="M 8 88 C -4 102, -4 118, 8 132 L 14 128 C 6 118, 6 102, 14 92 Z"
          fill=url(#manifold-pipe) stroke=#0f172a 0.8 />
  • A second crossover pipe arcing OVER the neck:
    <path d="M 16 86 C 26 70, 40 70, 46 88" stroke=url(#manifold-pipe)
          strokeWidth=4 fill=none strokeLinecap=round />
  • Small flange collars where the pipe meets the powerhead: 2× <rect> 3×6, nozzle-metal fill

LAYER 5 — Engine bell (regeneratively cooled, smoothly flared)
  • Outer bell silhouette (replaces the twin trapezoids with ONE wide flared bell):
    d="M 38 92 C 44 96, 48 100, 50 108 L 60 145 C 58 152, 50 156, 42 156 L 42 64 C 50 64, 58 68, 60 75 L 50 112 C 48 104, 44 100, 38 100 Z"
    actually simpler — single bell:
    d="M 38 80 L 46 96 C 56 104, 62 118, 64 140 L 38 148 Z (mirrored upper half)"
    Final path drawn as one symmetric bell around y=110:
    d="M 38 82 C 48 86, 58 94, 64 110 C 58 126, 48 134, 38 138 Z"
    fill=url(#raptor-alloy), stroke=#cbd5e1 1.2, strokeLinejoin=round
  • Regen-channel ribbing: 6× thin vertical <line> from (44..62, y_top) to (44..62, y_bot),
    stroke=#0b1220 opacity 0.6, strokeWidth 0.5 — gives the cooling-channel texture
  • Hot inner lip band: <path> same bell trimmed to inner 30%, fill=url(#raptor-copper) opacity 0.7
  • Throat aperture: <ellipse cx=42 cy=110 rx=3 ry=22> fill=#020617 (the single combined dark exit)

LAYER 6 — Alloy rim highlight (crisp specular)
  • Bell outer rim re-stroked: same outer bell path, fill=none, stroke=#e2e8f0 0.6, opacity 0.7
```

Throat aperture stays centered at (42, 110) — matches existing `transform-origin: 44px 110px` on `.plume-group` and `.nozzle`, so the plume continues to erupt from the correct point with **zero geometry shift to the plume paths**.

### 1c. CSS additions (styles.css)

- `.raptor3` (cosmetic only): no new animations, just reuses the existing `.nozzle` rule for `nozzle-rise` + `nozzle-heat`. The `nozzle-heat` keyframe (already 12s, burn window 4%–58%) now drives the bell's hot copper glow as well — works automatically since it's a `filter: drop-shadow()` on the whole `<g className="nozzle">`.
- Optional: bump the existing `.nozzle` `drop-shadow` color from amber to copper-orange `rgba(255,140,40,...)` to match the regen-cooled bell.

---

## 2. Synchronized Molten Hot-Fire Text (`name-heat-sync`)

### 2a. Markup change (index.tsx)

Wrap both name spans in a shared container so one animation drives both lines together:

```tsx
<span className="name-heat-sync block">
  <span className="relative block overflow-hidden">
    <span className="inline-block animate-name-expand">Karnan</span>
  </span>
  <span className="relative block overflow-hidden">
    <span className="text-gradient inline-block animate-name-draw anim-delay-200">Thamilchelvan</span>
  </span>
</span>
```

Keep the existing `animate-name-expand` / `animate-name-draw` one-shot intros — they only run on mount; the new sync layer runs on top via `color` + `text-shadow` (which the `text-gradient` background-clip on "Thamilchelvan" will fall back from when `color` is forced during the burn — handled by overriding `-webkit-text-fill-color` inside the molten window and restoring it during cool-down).

### 2b. `@keyframes name-heat-sync` — 12s map (matches `engine-cycle` exactly)

| Time | %kf | phase | `color` | `-webkit-text-fill-color` | `text-shadow` |
|------|-----|-------|---------|----------------------------|----------------|
| 0.00s | 0%     | baseline | `#ffffff` (Karnan) / inherit (gradient holds) | `currentColor` for line 1, `transparent` for gradient line | `0 0 10px rgba(0,240,255,0.2)` |
| 0.50s | 4.17%  | ignition end | `#ff3c00` | `#ff3c00` (overrides gradient) | `0 0 18px rgba(255,90,20,0.85), 0 0 36px rgba(255,40,0,0.55)` |
| 0.50–7.00s | 4.17%–58.33% | full burn | hold `#ff3c00` | hold `#ff3c00` | pulses via secondary keyframe (§2c) |
| 7.50s | 62.5%  | cutoff mid | `#c8281a` (cooling crimson) | `#c8281a` | `0 0 12px rgba(200,40,20,0.5)` |
| 8.00s | 66.67% | cutoff end | `#ffffff` / restore gradient | revert to `transparent` (gradient returns) | `0 0 10px rgba(0,240,255,0.2)` |
| 8.00–12.00s | 66.67%–100% | cool down | baseline hold | baseline hold | baseline hold |

`animation: name-heat-sync 12s linear infinite;` — `linear` so the percentage map maps 1:1 to seconds (matches plume envelope's percentage stops exactly; the cubic-bezier on `engine-cycle` only affects the `transform: scaleX` envelope, not the time axis).

### 2c. High-frequency glow pulse during burn

The 80ms `plume-churn` jitter can't be replicated inside a 12s keyframe (a 12s linear keyframe at 80ms granularity = 150 stops — wasteful). Instead, a second animation runs in parallel only during the burn:

`@keyframes name-glow-pulse` — 0.32s, `steps(1, end)`, 4 stops matching `plume-churn` brightness beats:
| % | text-shadow |
|---|-------------|
| 0   | `0 0 14px rgba(255,90,20,0.75)` |
| 25  | `0 0 26px rgba(255,140,40,1), 0 0 50px rgba(255,60,0,0.6)` |
| 50  | `0 0 12px rgba(255,80,20,0.65)` |
| 75  | `0 0 30px rgba(255,160,60,1), 0 0 56px rgba(255,60,0,0.7)` |
| 100 | `0 0 14px rgba(255,90,20,0.75)` |

Applied on the same `.name-heat-sync` element, but its visibility is gated: the `text-shadow` in `name-heat-sync` itself defines the steady molten glow; the `name-glow-pulse` shorthand also sets `text-shadow`, so the LAST one wins per CSS rules. Solution: `name-heat-sync` writes to `color` only outside the burn, and to `color` during burn — and we let `name-glow-pulse` own `text-shadow` while running. We start/stop `name-glow-pulse` purely through `animation-delay` + `animation-duration` math: run it `36.5s` total with `steps(1)` infinite is wrong — instead use a single composite keyframe.

**Simpler final approach (one keyframe, no compositing problems):** put the 80ms jitter beats *directly into* `name-heat-sync` at the 4.17%–58.33% range using ~12 sample stops (not 150) — every ~0.5s instead of every 80ms. Visually the eye locks onto the plume's churn anyway; the text glow needs to *appear* to flicker, not be frame-locked. Sample stops:

| % | text-shadow during burn |
|---|--------------------------|
| 4.17  | `0 0 18px rgba(255,90,20,0.85), 0 0 36px rgba(255,40,0,0.55)` |
| 8     | `0 0 28px rgba(255,150,50,1), 0 0 52px rgba(255,60,0,0.7)` |
| 12    | `0 0 14px rgba(255,80,20,0.6)` |
| 18    | `0 0 32px rgba(255,170,60,1), 0 0 58px rgba(255,70,0,0.75)` |
| 24    | `0 0 16px rgba(255,90,20,0.7)` |
| 30    | `0 0 30px rgba(255,160,55,1), 0 0 54px rgba(255,60,0,0.7)` |
| 36    | `0 0 14px rgba(255,80,20,0.6)` |
| 42    | `0 0 34px rgba(255,180,70,1), 0 0 60px rgba(255,80,0,0.8)` |
| 48    | `0 0 18px rgba(255,100,30,0.8)` |
| 54    | `0 0 28px rgba(255,150,50,1), 0 0 52px rgba(255,60,0,0.7)` |
| 58.33 | `0 0 18px rgba(255,90,20,0.85), 0 0 36px rgba(255,40,0,0.55)` |

`animation-timing-function: steps(1, end);` on `.name-heat-sync` → produces hard cuts every ~0.5s during burn, reading as synchronized flicker without 150 keyframe stops.

### 2d. Gradient restoration during cool-down

The "Thamilchelvan" span uses `.text-gradient` which sets `color: transparent` + `-webkit-background-clip: text`. During burn, `name-heat-sync` forces `-webkit-text-fill-color: #ff3c00` on descendant `.text-gradient` (scoped selector `.name-heat-sync .text-gradient`). At 66.67% the keyframe sets `-webkit-text-fill-color: transparent` → the cyan gradient returns instantly at the 8.0s mark.

### 2e. Reduced-motion guard

Inside existing `@media (prefers-reduced-motion: reduce)`:
- `.name-heat-sync { animation: none; }` — text stays baseline, no thermal cycling.

---

## 3. Files & Verification

**Touched:**
- `src/routes/index.tsx` — defs: 4 new gradients; replace `<g className="nozzle">` block with new Raptor 3 layer stack; wrap both name `<span>`s in `<span className="name-heat-sync block">`.
- `src/styles.css` — 4 new gradient/keyframe additions: `name-heat-sync` 12s keyframe with ~13 stops; `.name-heat-sync` rule + `.name-heat-sync .text-gradient` override; reduced-motion guard line; (optional) updated `.nozzle` drop-shadow tint.

**Untouched (CRITICAL):** `engine-cycle`, `plume-churn`, `plume-flicker`, `throat-flash-cycle`, `nozzle-heat` keyframes and all `.plume*` rules. Plume path `d=` attributes and `viewBox` stay identical. Throat coordinate (42, 110) preserved.

**Verification after build:**
- Hero shows one detailed Raptor 3 silhouette (dome + manifold loop + flared regen bell) instead of twin trapezoids.
- Plume still erupts from the same throat point with the same 12s cycle.
- At t=0.5s text snaps to molten `#ff3c00`; through 0.5–7s it visibly flickers in sync with the plume churn beats; at t=7–8s text smoothly fades back to white/cyan-gradient baseline; 8–12s text is dead clean and still.
- `prefers-reduced-motion`: text and plume stay static.
- No layout shift, no console errors.
