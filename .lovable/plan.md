# Structural Separation: Engine ⇆ Name + Synced Molten Text

Scope: `src/routes/index.tsx` (Hero markup only) + `src/styles.css` (new `name-heat-sync` keyframe). The working 12s loop (`engine-cycle`, `plume-churn`, `plume-flicker`, `throat-flash-cycle`, `nozzle-heat`) stays **untouched**.

---

## 1. Isolated Flexbox Layout

Today the engine SVG is absolutely positioned *inside* the `<h1>`, so it inherits the text's bounding box and overlaps the letters. Fix by lifting it out and putting it next to the text in a flex row.

New Hero structure (replaces lines ~129–182):

```text
<div class="flex items-center gap-6 md:gap-10">
  ├── <div class="engine-stage shrink-0 w-24 md:w-32 lg:w-40 aspect-square">
  │     └── <svg viewBox="0 0 120 220">   ← engine only, vertical silhouette
  │           <defs/>                      ← gradients (engine-alloy, engine-shadow, pipe)
  │           <g class="nozzle raptor">…</g>
  │           <g class="plume-group">…</g>  ← horizontal plume curves stay, redirected rightward
  │         </svg>
  └── <h1 class="name-heat-sync animate-nebula-shimmer …">
        <span>Karnan</span>
        <span class="text-gradient">Thamilchelvan</span>
      </h1>
</div>
```

Key points:
- `shrink-0` on the engine column → never squished by the text.
- The plume's horizontal sweep extends out of the engine SVG with `overflow-visible` + `mix-blend-screen`, so it still washes across behind the name without sharing its bounding box.
- `items-center` vertically centers the engine against the two-line name.
- All other Hero children (badge pill, subtitle, buttons, stats card) stay exactly as-is below this flex row.

## 2. Distinct Rocket Engine Detailing

Inside the dedicated `<svg viewBox="0 0 120 220">` (engine column only), draw a clean vertical silhouette, top → bottom:

```text
LAYER 1 — Powerhead dome (top cap)
  • <ellipse cx=60 cy=28 rx=22 ry=14>  fill=url(#engine-alloy)  stroke=#00f0ff 1.2
  • 3 small bolt dots r=1 across the rim (#cbd5e1)

LAYER 2 — Injector/throat collar (machined block)
  • <rect x=44 y=40 w=32 h=18 rx=3>    fill=url(#engine-alloy)  stroke=#00f0ff 1
  • inner shadow rect inset 2px         fill=url(#engine-shadow) opacity 0.5

LAYER 3 — Looping propellant line (signature curl)
  • <path d="M 44 48 C 22 50, 22 76, 44 78"   stroke=url(#pipe) sw=3 fill=none strokeLinecap=round
  • mirrored:  d="M 76 48 C 98 50, 98 76, 76 78"
  • 2 small flange rects where pipes meet the collar

LAYER 4 — Flared bell nozzle (regen-cooled)
  • <path d="M 44 58 L 36 110 C 30 160, 90 160, 84 110 L 76 58 Z"
          fill=url(#engine-alloy) stroke=#00f0ff 1.4 strokeLinejoin=round
  • 5 regen ribs: vertical <line> evenly spaced inside the bell, stroke=#0b1220 0.5 opacity 0.6
  • hot inner lip: thin <path> across the bottom mouth, fill=#7c2d12 opacity 0.7
  • throat aperture: <ellipse cx=60 cy=160 rx=20 ry=4> fill=#020617
```

New `<defs>` (in this same SVG):
- `engine-alloy` — linear gradient #64748b → #1e293b → #0b1220 → #334155 (brushed slate metal).
- `engine-shadow` — linear #000/0.55 → transparent (inner concavity).
- `pipe` — linear #94a3b8 → #0f172a → #64748b (specular highlight on the curved propellant line).
- Cyan stroke `#00f0ff` everywhere → matches the design-system primary accent border requirement.

The plume's `<g class="plume-group">` is moved into this same SVG and re-anchored at the bell mouth (cx=60, cy=160) but its curves now sweep **outward** beyond the engine column (extending past the SVG viewBox via `overflow-visible`) so the fire visibly wraps behind the name to the right. `transform-origin` in CSS updates to `60px 160px` to match.

## 3. Synchronized Molten Text — `@keyframes name-heat-sync` (12s)

Applied to the `<h1 class="name-heat-sync">` wrapper. Linear timing so percentages = seconds × (100/12).

| Time | %    | phase     | `color` | `-webkit-text-fill-color` (overrides `.text-gradient` child) | `text-shadow` |
|------|------|-----------|---------|--------------------------------------------------------------|----------------|
| 0.0s | 0%   | baseline  | `#ffffff` | `transparent` (gradient visible on Thamilchelvan) | `0 0 10px rgba(0,240,255,0.2)` |
| 0.5s | 4.17%| ignition  | `#ff3c00` | `#ff3c00` (gradient overridden, both lines molten) | `0 0 18px rgba(255,90,20,0.85), 0 0 36px rgba(255,40,0,0.55)` |
| 0.5–7.0s | 4.17–58.33% | full burn | hold `#ff3c00` | hold `#ff3c00` | pulses across 10 sample stops every ~0.65s (steps(1,end) reads as flicker) |
| 7.5s | 62.5% | cutoff    | `#c8281a` cooling crimson | `#c8281a` | `0 0 12px rgba(200,40,20,0.5)` |
| 8.0s | 66.67%| cool start| `#ffffff` | `transparent` (cyan gradient returns instantly) | `0 0 10px rgba(0,240,255,0.2)` |
| 8.0–12.0s | 66.67–100% | rest | baseline hold | baseline hold | baseline hold |

CSS rules added to `src/styles.css`:
- `.name-heat-sync { animation: name-heat-sync 12s steps(1, end) infinite; }`
- `.name-heat-sync .text-gradient { animation: name-heat-fill 12s steps(1, end) infinite; }` — a tiny 4-stop companion keyframe that flips `-webkit-text-fill-color` between `transparent` (rest/cool) and `#ff3c00`/`#c8281a` (burn/cutoff), so the gradient cleanly returns at 8s.
- `@media (prefers-reduced-motion: reduce) { .name-heat-sync, .name-heat-sync .text-gradient { animation: none; } }`

The `animate-nebula-shimmer` class (existing cyan baseline shimmer on the `<h1>`) is kept — its `text-shadow` is overridden by `name-heat-sync` during the burn window and reasserts during the 4s rest window automatically (last-declared keyframe wins).

---

## Files & Verification

**Touched:**
- `src/routes/index.tsx` — restructure Hero's `<h1>` block: wrap engine SVG + name in a `flex items-center gap-6` row; engine becomes its own `<svg viewBox="0 0 120 220">` column with the new vertical Raptor-style geometry; add `name-heat-sync` class to `<h1>`.
- `src/styles.css` — add `@keyframes name-heat-sync` (12s, ~14 stops), `@keyframes name-heat-fill` (12s, 4 stops), `.name-heat-sync` + `.name-heat-sync .text-gradient` rules, reduced-motion guard line. Update `.nozzle` `transform-origin` to `60px 160px` and `.plume-group` `transform-origin` to `60px 160px`.

**Untouched (CRITICAL):** the 12s `engine-cycle`, `plume-churn`, `plume-flicker`, `throat-flash-cycle`, `nozzle-heat` keyframes — only their `transform-origin` anchors change to match the new bell coordinates.

**Verify after build:**
- Engine renders as a vertical rocket silhouette in its own left column; name sits cleanly to the right and is never overlapped or clipped.
- 12s loop still fires: ignition flash at 0.5s, churning plume 0.5–7s sweeping rightward behind the name, fade-out 7–8s, dead rest 8–12s.
- Text snaps to molten red on ignition, pulses through the burn, fades back to white + cyan gradient at 8s, holds clean for 4s.
- `prefers-reduced-motion`: engine static, text static at baseline.
- No layout shift, no console errors.
