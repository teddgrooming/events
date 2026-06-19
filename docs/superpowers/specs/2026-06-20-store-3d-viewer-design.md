# 3D Store Viewer — Design

## Purpose
Give customers an interactive, browser-based 3D preview of a representative Tedd Grooming store layout — a branded "blockout" they can rotate and zoom, not a photorealistic or exact replica of a real physical location (no floor plan exists yet). Standalone page, not linked from other pages on the site.

## Architecture
A single static page, `StoreView.html`, using **Three.js** loaded via CDN `<script>` tag — no build step, no Node/npm, consistent with the rest of the repo (plain HTML files). OrbitControls (a Three.js add-on) handles camera input.

```
Page load → Three.js scene built in JS → render loop → OrbitControls handles drag/zoom input
```

## Scene Contents
- **Room shell:** floor plane + 4 wall planes forming a rectangular room (~12m x 9m, arbitrary representative scale), with a gap in one wall as the entrance.
- **Counter:** one box near the entrance — dark base, gold-accented top edge, matching brand colors.
- **Shelves:** 3–4 box-shaped shelf blocks placed along the walls, each with a floating text label above it (e.g. "Pomade", "Hair Spray", "Styling Clay", "Grooming Tools") rendered as canvas-texture sprites that always face the camera.
- **Lighting:** ambient light + 2 directional lights for clear shape readability — no textures/materials beyond flat brand colors (dark room base `#080808`-ish, gold `#c8a84b` accents, matching `Links.html`/`CustomerInfo.html`).
- **Camera/controls:** perspective camera with OrbitControls — drag to rotate, scroll/pinch to zoom. Initial camera position gives an overview of the whole room.

## Page Chrome
- Same header style as `CustomerInfo.html`: logo image, dark background, Inter font.
- Full-viewport-height `<canvas>` below the header for the 3D scene.
- Small caption text below/above the canvas: "Store Layout Preview" (or similar), styled like `.brand-sub` in the existing pages.

## Data Flow / Error Handling
- No backend, no data persistence — this is a static visual page.
- If Three.js fails to load from the CDN (network issue), show a simple fallback text message ("3D preview unavailable — check your connection") in place of the canvas, so the page doesn't show a blank screen.
- Canvas resizes responsively on window resize (standard Three.js resize handler) so it works on both desktop and mobile.

## Out of Scope
- No photorealistic textures, materials, or purchased 3D asset packs.
- No exact replica of a real physical store (no floor plan currently exists).
- No first-person walk-through controls (orbit-only, per decision).
- No links added to/from other pages — reached only via direct URL, consistent with `CustomerInfo.html`'s standalone pattern.
- No editing/customization UI — the layout is fixed in code, not user-configurable.
