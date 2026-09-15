# Asset Creation & Storage Protocols

This document outlines the mandatory protocol for creating, cataloging, and reusing visual and motion assets across all channels.

---

## The Core Principle: "Never Single-Use"
Whenever an element, background, prop, or movement is designed, it must be created in `src/shared/` or extracted into `src/shared/` immediately. Scenes should only contain scene orchestration (timing, layout, narrative flow), while visual and kinematic primitives live in `src/shared/`.

---

## 1. Directory Structure

```
my-video/src/shared/
├── characters/         # Characters, avatars, anatomy primitives
│   ├── CuratedStickman.jsx
│   └── index.js
├── environments/       # Backgrounds, floors, grids, skies, rooms
│   ├── TiledFloor.jsx
│   ├── ScientificGrid.jsx
│   ├── GardenBackground.jsx
│   └── index.js
├── props/              # Handheld items, furniture, icons, VFX overlays
│   ├── TransparentBucket.jsx
│   ├── JumpRope.jsx
│   ├── Butterfly.jsx
│   ├── TickingClock.jsx
│   ├── Calendar.jsx
│   ├── FlippingCalendar.jsx
│   ├── GreyCloud.jsx
│   └── index.js
├── motion/             # Pure math/kinematic engines (functions of frame)
│   ├── walkCycles.js
│   ├── recoilAndShock.js
│   ├── defeatSlump.js
│   ├── fluidDynamics.js
│   ├── cameraTransitions.js
│   └── index.js
├── CATALOG.md          # Visual registry of all assets with usage snippets
├── PROTOCOLS.md        # This protocol document
└── index.js            # Master barrel export
```

---

## 2. Step-by-Step Asset Addition Protocol

When the user asks for a new scene that introduces a new element, background, or movement:

### Step 1: Categorize the Asset
- **Character**: New figure, anatomical modification, or mascot $\rightarrow$ `src/shared/characters/`
- **Environment**: New background, terrain, room, grid, or sky $\rightarrow$ `src/shared/environments/`
- **Prop / VFX**: New item (e.g. coffee mug, phone, trophy, rain, explosion) $\rightarrow$ `src/shared/props/`
- **Movement / Kinematics**: New recurring motion math (e.g. bounce, wave, jump, tremble) $\rightarrow$ `src/shared/motion/`

### Step 2: Make It Parameterized
Do **not** hardcode scene-specific dimensions or static frames.
- **Components**: Accept `style`, `className`, `scale`, `frame`, and relevant color/dimension props.
- **Movements**: Keep them pure functions `(frame, triggerFrame, options) => results`. They should not mutate state or depend on DOM elements.

### Step 3: Register in Subdirectory `index.js`
Immediately export the new asset in its category `index.js`:
```javascript
// e.g. in src/shared/props/index.js
export { CoffeeCup } from './CoffeeCup.jsx';
```

### Step 4: Verify Master Export in `src/shared/index.js`
Ensure `src/shared/index.js` re-exports everything from all categories.

### Step 5: Update `CATALOG.md`
Add the new asset under the appropriate section in `CATALOG.md` with:
1. Component name
2. Import statement
3. Props list with defaults
4. Brief code example

---

## 3. Character Consistency Protocol (Stickman Standard)
To prevent style drift across scenes and videos:
1. **Never redraw the stickman from scratch** in individual scene files. Always import `CuratedStickman` from `src/shared`.
2. **Strict proportions**:
   - Head radius: `68px`, stroke `7.5px`
   - Eyes: vertical black ellipses `rx = 5.5, ry = 7.5`
   - Body: white tapered tunic (`fill="#FFFFFF"`, `stroke="#000000"`, `strokeWidth="7.5"`)
   - Hands: round mitten `r = 9` + small thumb path
   - Feet: clean L-shaped stick feet with `strokeLinecap="round"` (no colored shoes)
3. For custom limb poses, pass `armLeft`, `armRight`, `legLeft`, `legRight` path props or use `pose="custom"`.

---

## 4. Movement / Kinematics Protocol
1. **Pure Math**: Kinematics belong in `src/shared/motion/*.js` as pure functions of `frame`.
2. **Springs & Easing**: When using Remotion's `spring` or `interpolate`, wrap them into descriptive helpers (e.g., `getJumpKinematics(frame, triggerFrame)`).
3. **Composability**: Allow multiple motion modifiers to be blended (e.g., `walkKinematics` + `shockKinematics`).

---

## 5. Deterministic Text-to-Container Fit Protocol (Zero-Overflow Standard)

To strictly eliminate visual text bleeding or container overflow across all channels and screen sizes:

### The Problem
SVG `<text>` does not wrap or auto-shrink. If an agent guesses a fixed `width` and `fontSize`, any variable or longer string immediately spills outside the container box.

### The Mandatory Protocol Rules
1. **Never Guess Dimensions**: Every containerized text element (badge, button, diagnosis card, flowchart node, pill tag) MUST use either:
   - **Shared `AutoBadge` Primitive**: `import { AutoBadge } from '../../shared';`
   - **Shared Math Utility `fitText`**: `import { fitText } from '../../shared';`
2. **Deterministic Mathematical Formulas**:
   - **Case A (Fixed-Width Container)**:
     Font size must be mathematically clamped to the available interior width:
     $$\text{availableWidth} = \text{boxWidth} - 2 \times \text{paddingX}$$
     $$\text{maxAllowableFontSize} = \left\lfloor \frac{\text{availableWidth}}{\text{text.length} \times 0.62} \right\rfloor$$
     $$\text{fontSize} = \max\left(\text{minFontSize},\; \min(\text{targetFontSize},\; \text{maxAllowableFontSize})\right)$$
   - **Case B (Dynamic-Width Container)**:
     Box width must be derived from the text length and font size:
     $$\text{boxWidth} = \max\left(\text{minWidth},\; \lceil \text{text.length} \times \text{fontSize} \times 0.62 + 2 \times \text{paddingX} \rceil\right)$$
3. **Native SVG Absolute Safeguard**:
   Whenever text is placed inside a fixed box, attach SVG's native width-constraining attributes:
   ```jsx
   <text
     x={x}
     y={y}
     textLength={availableWidth}
     lengthAdjust="spacingAndGlyphs"
   >
     {text}
   </text>
   ```
   This guarantees that even if an unexpected glyph or extreme character width occurs, the SVG rendering engine will natively compress spacing/glyphs to ensure 0% overflow.
4. **Multi-Line Text & Long Clinical Copy**:
   Never stack manual `<text>` lines. Always wrap paragraphs or multi-line clinical descriptors inside `<foreignObject>` with Flexbox:
   ```jsx
   <foreignObject x={x} y={y} width={w} height={h}>
     <div style={{
       width: "100%",
       height: "100%",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       textAlign: "center",
       wordBreak: "break-word",
       boxSizing: "border-box",
       padding: "8px 16px",
     }}>
       {content}
     </div>
   </foreignObject>
   ```

---

## 6. Hybrid Architecture: HTML/CSS/Tailwind vs. SVG

To maximize both visual fidelity and layout robustness across all channels:

### 1. When to Use HTML/CSS & Tailwind CSS
Use HTML `div`, `span`, Flexbox, and Tailwind CSS classes whenever an element consists of **geometric shapes housing text**:
- **Flowchart Nodes & Process Steps**: `flex items-center justify-center p-6 rounded-2xl border-4 ...`
- **Callout Cards & Diagnosis Panels**: `flex flex-col gap-2 p-8 rounded-3xl shadow-2xl ...`
- **Multiple-Choice Options & Badges**: `flex items-center justify-center px-6 py-4 rounded-xl font-black text-2xl ...`
- **Why**: CSS Flexbox and block formatting naturally enforce inner padding, text wrapping, and alignment without character-width guesswork or risk of clipping.

### 2. When to Use SVG
Reserve SVG exclusively for **custom vector artwork, illustrations, and freehand geometries**:
- Canonical figures (`CuratedStickman`)
- Organic curves, splines, and animated waveforms (e.g. EKG graphs, hormone drop arcs)
- Medical and scientific instruments (e.g. syringe, test tubes, TMS helmet, microscope)
- Precision mechanical gears, clocks, and complex polygon shapes
- Intricate cracked glass floors, weather effects, and background textures

### 3. Layered Composability
Combine both seamlessly inside Remotion's `AbsoluteFill`:
```jsx
<AbsoluteFill className="bg-slate-950 overflow-hidden">
  {/* Layer 1: Vector graphics and character illustration */}
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080">
    <CuratedStickman x={1260} y={850} scale={1.4} />
  </svg>

  {/* Layer 2: Tailwind CSS UI flowchart or diagnosis cards */}
  <div className="absolute top-24 left-1/2 -translate-x-1/2 flex gap-8 items-center">
    <div className="w-80 h-36 bg-slate-900 border-4 border-white rounded-2xl flex items-center justify-center text-3xl font-black text-white text-center p-4">
      DIAGNOSIS A
    </div>
  </div>
</AbsoluteFill>
```

---

## 7. Strict One-Scene-Per-File Architecture & Individual Workflow Standard

### The Principle: "1 Scene = 1 File = 1 Focused Turn"
Under no circumstances should scenes be grouped into multi-scene batches (e.g. `Part01.jsx`, `Batch1.jsx`). Even if a video contains 50, 100, or 200 scenes, every scene must exist in its own dedicated, isolated module.

### Mandatory Rules
1. **Dedicated File Per Scene**:
   - File naming: `Scene01.jsx`, `Scene02.jsx`, ... `Scene99.jsx`, `Scene100.jsx` (or descriptive suffixes: `Scene01_TheHook.jsx`).
   - Location: `src/<channel>/scenes/SceneXX.jsx`.
2. **One-By-One Development Workflow**:
   - When building or editing a sequence, work through each scene individually and sequentially.
   - Dedicate full focus to that single scene's timing, kinematics, framing, negative space, and visual storytelling.
   - Never combine 5 or 10 scenes into a single editing chunk or composite file.
3. **Master Barrel Export**:
   - `src/<channel>/scenes/index.js` imports each individual scene file and maps them into the `SCENE_COMPONENTS` dictionary:
     ```javascript
     import { Scene01 } from './Scene01';
     import { Scene02 } from './Scene02';
     ...
     export const SCENE_COMPONENTS = {
       "Scene-01": Scene01,
       "Scene-02": Scene02,
       ...
     };
     ```
4. **Independent Studio Inspectability**:
   - Because each scene is an independent component in its own file, developers can preview and hot-reload any scene in Remotion Studio without recompiling unrelated scenes.



