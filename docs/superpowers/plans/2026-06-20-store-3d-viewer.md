# 3D Store Viewer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `StoreView.html` page showing a branded, rotatable 3D blockout of a representative Tedd Grooming store (room shell, counter, labeled shelves), using Three.js via CDN with no build step.

**Architecture:** A single static HTML file loads Three.js and its OrbitControls add-on from a CDN, builds a Three.js `Scene` in a `<script>` block (room shell, counter, shelf boxes, floating canvas-texture labels, lighting), and renders it into a full-viewport `<canvas>` with mouse/touch orbit controls. No backend, no persistence, no Node/npm — matches the rest of the repo's plain-HTML-file pattern.

**Tech Stack:** Plain HTML/CSS/JS, Three.js r160+ (CDN `<script type="importmap">` + ES module imports), Inter font (matches `CustomerInfo.html`/`Links.html`).

## Global Constraints
- Standalone page: `StoreView.html`, not linked from any other page in the repo (no edits to `Links.html` or elsewhere).
- No backend, no data persistence — purely a static visual page.
- No photorealistic textures or 3D asset packs — flat brand colors only: dark base `#080808`, gold accent `#c8a84b`, matching the rest of the site's palette.
- No exact replica of a real store (no floor plan exists) — a representative layout only.
- Orbit camera only (drag to rotate, scroll/pinch to zoom) — no first-person/WASD controls.
- If Three.js fails to load from the CDN, show a fallback text message instead of a blank screen.
- Canvas must resize responsively on window resize.

---

### Task 1: Page chrome + empty 3D room shell with camera/lighting/controls

**Files:**
- Create: `StoreView.html`

**Interfaces:**
- Produces: a working Three.js `scene`, `camera`, `renderer`, and `controls` (OrbitControls instance) accessible as top-level `const` bindings in the page's module script, plus a `room` group (`THREE.Group`) containing the floor and 4 walls, so Task 2 can add objects into the same `scene` and reference `room`'s footprint dimensions (`ROOM_WIDTH = 12`, `ROOM_DEPTH = 9`, `ROOM_HEIGHT = 3.5`, declared as top-level constants).
- Consumes: nothing (first task).

- [ ] **Step 1: Create the page with header chrome and a fallback message**

Create `StoreView.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Store Preview — Tedd Grooming</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    min-height: 100vh;
    background: #080808;
    font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 20px 12px;
    text-align: center;
  }

  .brand-logo {
    width: 160px;
    height: auto;
  }

  .brand-sub {
    font-size: 11px;
    font-weight: 600;
    color: #888;
    letter-spacing: 2px;
    margin-top: 6px;
    text-transform: uppercase;
  }

  #scene-container {
    width: 100%;
    flex: 1;
    position: relative;
  }

  #scene-container canvas {
    display: block;
  }

  #fallback-message {
    display: none;
    position: absolute;
    inset: 0;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #888;
    font-size: 13px;
    padding: 20px;
  }

  #fallback-message.show { display: flex; }
</style>
</head>
<body>

  <div class="brand">
    <img class="brand-logo" src="shop/images/tedd-logo.png" alt="Tedd Grooming">
    <div class="brand-sub">Store Layout Preview</div>
  </div>

  <div id="scene-container">
    <div id="fallback-message">3D preview unavailable — check your connection and reload.</div>
  </div>

  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
      }
    }
  </script>

  <script type="module">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    const ROOM_WIDTH = 12;
    const ROOM_DEPTH = 9;
    const ROOM_HEIGHT = 3.5;

    const container = document.getElementById('scene-container');

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080808);

    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(8, 7, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;
    controls.minDistance = 4;
    controls.maxDistance = 22;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff4d6, 0.9);
    keyLight.position.set(8, 10, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xaab8ff, 0.35);
    fillLight.position.set(-6, 5, -4);
    scene.add(fillLight);

    const room = new THREE.Group();
    scene.add(room);

    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_DEPTH), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    room.add(floor);

    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.95 });
    const ENTRANCE_WIDTH = 2.4;

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_HEIGHT), wallMaterial);
    backWall.position.set(0, ROOM_HEIGHT / 2, -ROOM_DEPTH / 2);
    room.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_DEPTH, ROOM_HEIGHT), wallMaterial);
    leftWall.position.set(-ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    room.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_DEPTH, ROOM_HEIGHT), wallMaterial);
    rightWall.position.set(ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    room.add(rightWall);

    // Front wall has a gap (entrance) in the middle, built from two side segments.
    const frontSegmentWidth = (ROOM_WIDTH - ENTRANCE_WIDTH) / 2;
    const frontLeftSegment = new THREE.Mesh(new THREE.PlaneGeometry(frontSegmentWidth, ROOM_HEIGHT), wallMaterial);
    frontLeftSegment.position.set(-(ENTRANCE_WIDTH / 2 + frontSegmentWidth / 2), ROOM_HEIGHT / 2, ROOM_DEPTH / 2);
    frontLeftSegment.rotation.y = Math.PI;
    room.add(frontLeftSegment);

    const frontRightSegment = new THREE.Mesh(new THREE.PlaneGeometry(frontSegmentWidth, ROOM_HEIGHT), wallMaterial);
    frontRightSegment.position.set(ENTRANCE_WIDTH / 2 + frontSegmentWidth / 2, ROOM_HEIGHT / 2, ROOM_DEPTH / 2);
    frontRightSegment.rotation.y = Math.PI;
    room.add(frontRightSegment);

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', resize);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>

</body>
</html>
```

- [ ] **Step 2: Manually verify the room shell renders**

Open `StoreView.html` in a browser. Confirm:
- The logo and "Store Layout Preview" caption appear at the top.
- A dark room with floor, back wall, left wall, right wall, and a front wall with a visible gap (entrance) renders below the header.
- Dragging the mouse rotates the camera around the room; scrolling zooms in/out (bounded — it shouldn't zoom inside out or fly away to nothing).
- Resizing the browser window keeps the 3D canvas filling its container without stretching/distorting.

- [ ] **Step 3: Commit**

```bash
git add "StoreView.html"
git commit -m "feat: add 3D store viewer page with room shell and orbit camera"
```

---

### Task 2: Counter, labeled shelves, and CDN-load fallback

**Files:**
- Modify: `StoreView.html` (append to the existing `<script type="module">` block, right after the front wall segments and before the `resize()` function)

**Interfaces:**
- Consumes: `scene`, `room`, `ROOM_WIDTH`, `ROOM_DEPTH`, `ROOM_HEIGHT`, `THREE` from Task 1 — all already in scope in the same module script, no new imports needed.
- Produces: nothing new consumed by a later task (this is the last content task); adds a `makeLabelSprite(text)` helper function used only within this task's code.

- [ ] **Step 1: Add the counter, shelf blocks with floating labels, and the fallback-on-load-failure check**

In `StoreView.html`, insert this code into the `<script type="module">` block immediately after the `frontRightSegment` block (i.e. right before the `function resize() {` line):

```javascript
    function makeLabelSprite(text) {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(8,8,8,0.75)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = 'bold 28px Inter, sans-serif';
      ctx.fillStyle = '#c8a84b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(1.6, 0.4, 1);
      return sprite;
    }

    function addLabel(text, position) {
      const sprite = makeLabelSprite(text);
      sprite.position.copy(position);
      room.add(sprite);
    }

    // Counter near the entrance
    const counterBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.8 });
    const counterTopMaterial = new THREE.MeshStandardMaterial({ color: 0xc8a84b, roughness: 0.4, metalness: 0.3 });

    const counterBase = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 0.8), counterBaseMaterial);
    counterBase.position.set(0, 0.5, ROOM_DEPTH / 2 - 1.4);
    room.add(counterBase);

    const counterTop = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.08, 0.9), counterTopMaterial);
    counterTop.position.set(0, 1.04, ROOM_DEPTH / 2 - 1.4);
    room.add(counterTop);

    addLabel('Counter', new THREE.Vector3(0, 1.8, ROOM_DEPTH / 2 - 1.4));

    // Shelves along the back and side walls
    const shelfBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.85 });
    const shelfEdgeMaterial = new THREE.MeshStandardMaterial({ color: 0xc8a84b, roughness: 0.5, metalness: 0.2 });

    function addShelf(x, z, rotationY, label) {
      const shelf = new THREE.Group();

      const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 0.5), shelfBaseMaterial);
      base.position.y = 0.8;
      shelf.add(base);

      const edge = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.06, 0.52), shelfEdgeMaterial);
      edge.position.y = 1.6;
      shelf.add(edge);

      shelf.position.set(x, 0, z);
      shelf.rotation.y = rotationY;
      room.add(shelf);

      addLabel(label, new THREE.Vector3(x, 2.3, z + (rotationY === 0 ? 0.4 : 0)));
    }

    addShelf(-4, -ROOM_DEPTH / 2 + 0.3, 0, 'Pomade');
    addShelf(0, -ROOM_DEPTH / 2 + 0.3, 0, 'Hair Spray');
    addShelf(4, -ROOM_DEPTH / 2 + 0.3, 0, 'Styling Clay');
    addShelf(-ROOM_WIDTH / 2 + 0.3, -2, Math.PI / 2, 'Grooming Tools');

    let loadCheckTimer = setTimeout(() => {
      const canvasExists = container.querySelector('canvas');
      if (!canvasExists) {
        document.getElementById('fallback-message').classList.add('show');
      }
    }, 4000);

    window.addEventListener('error', () => {
      document.getElementById('fallback-message').classList.add('show');
    });
```

- [ ] **Step 2: Manually verify shelves, counter, and labels render correctly**

Reload `StoreView.html` in a browser. Confirm:
- A gold-topped counter block sits near the entrance gap, with a "Counter" label floating above it.
- Three shelf blocks line the back wall, labeled "Pomade", "Hair Spray", and "Styling Clay" respectively (left to right when facing the back wall).
- A fourth shelf sits along the left wall, labeled "Grooming Tools".
- All labels stay readable and don't visually overlap the shelf/counter geometry oddly from the default camera angle.
- Orbit/zoom controls from Task 1 still work with the new objects in the scene.

- [ ] **Step 3: Manually verify the CDN-failure fallback path**

With your browser's devtools open, go to the Network tab and set throttling to "Offline" (or block the `unpkg.com` domain), then hard-reload `StoreView.html`.
Expected: within a few seconds, the message "3D preview unavailable — check your connection and reload." appears centered on the page instead of a blank black screen. Turn throttling back to "No throttling" / "Online" afterward.

- [ ] **Step 4: Commit**

```bash
git add "StoreView.html"
git commit -m "feat: add counter, labeled shelves, and CDN-load fallback to store viewer"
```
