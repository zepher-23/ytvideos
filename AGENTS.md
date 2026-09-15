# Workspace Instructions & Architecture Guide

## Reusable Asset & Motion System (`src/shared/`)

All channels (`everything-curated`, `cognify`, `gsd`, `synthesized`, `the-archive`) share a centralized library of characters, environments, props, and kinematics located in:
`src/shared/`

### 1. File Structure Overview
- `src/shared/characters/`: Canonical figures (e.g. `CuratedStickman.jsx`).
- `src/shared/environments/`: Shared floors, backgrounds, grids (e.g. `TiledFloor.jsx`, `ScientificGrid.jsx`, `GardenBackground.jsx`).
- `src/shared/props/`: Reusable items and overlays (e.g. `JumpRope.jsx`, `TransparentBucket.jsx`, `Butterfly.jsx`, `TickingClock.jsx`, `Calendar.jsx`, etc.).
- `src/shared/motion/`: Pure kinematic functions (e.g. `walkCycles.js`, `recoilAndShock.js`, `defeatSlump.js`, `fluidDynamics.js`, `cameraTransitions.js`).
- `src/shared/CATALOG.md`: Living catalog of components, props, and code snippets.
- `src/shared/PROTOCOLS.md`: Step-by-step protocol for storing new assets.
- `src/shared/index.js`: Master barrel export.

### 2. Mandatory Rules for the Agent
1. **Always Check Catalog First**: Before creating any character, background, prop, or movement, check `src/shared/CATALOG.md`.
2. **Stickman Consistency**: Never draw inline stickmen. Always use `CuratedStickman` from `src/shared/characters` (with white tunic, oval eyes, round mittens, stick feet).
3. **Store New Assets in `src/shared/`**: Follow the protocol in `PROTOCOLS.md` to parameterize, export, and document any new element, background, or kinematic movement.
4. **Pure Kinematics**: Movements must be pure functions of `frame` inside `src/shared/motion/`.
5. **Strict No-Render Rule**: Do not execute `remotion render` or `remotion still` unless explicitly requested.
6. **Mandatory Text-Fitting Protocol**: Never render raw `<text>` inside containers based on arbitrary visual guesses. Always use the deterministic mathematical formulas in `PROTOCOLS.md` or the `AutoBadge` / `fitText` primitives from `src/shared/` to guarantee zero text overflow across all screens.
7. **CSS & Tailwind for Text Layouts vs. SVG for Custom Drawings**: Use HTML/CSS and Tailwind CSS for elements that are primarily shapes and text (flowchart nodes, cards, badges, banners, buttons, diagnosis panels) where Flexbox, auto-wrapping, padding, and border utilities prevent text overflow naturally. Reserve SVG for custom vector artwork, canonical characters (`CuratedStickman`), complex paths, graphs, blueprints, and freehand illustrations.
8. **Strict One-Scene-Per-File & Individual Scene Workflow**: Never group or batch multiple scenes into combined files (e.g. `Part01.jsx`, `Batch1.jsx`). Every single scene MUST live in its own separate, dedicated file (e.g. `Scene01.jsx`, `Scene02.jsx`, ... `Scene100.jsx`). When creating, editing, or fine-tuning scenes for any video across any channel, always develop them individually, one by one, with complete, unhurried focus on that single scene's timing, kinematics, and visual composition. Never batch them.
9. **Preserve `scenes.md`**: Never delete or remove `scenes.md`. This file is the primary user input source where video scenes, scripts, and production prompts are written and uploaded.




