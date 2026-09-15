# Shared Asset & Kinematics Protocol Rule

Whenever creating or modifying animations across any channel (`everything-curated`, `cognify`, `gsd`, `synthesized`, `the-archive`):

1. **Check `src/shared/CATALOG.md` First**:
   Before implementing a character, background, prop, or movement, check `src/shared/CATALOG.md` to reuse existing assets.

2. **Always Use `CuratedStickman` for Stick Figures**:
   Never write inline SVG stick figures. Always import `CuratedStickman` from `src/shared`. Maintain canonical proportions (white tunic, oval eyes, round mittens, L-shaped stick feet).

3. **Store All New Visuals & Movements in `src/shared/`**:
   Whenever a new reusable asset is created:
   - Characters $\rightarrow$ `src/shared/characters/`
   - Environments/Backgrounds $\rightarrow$ `src/shared/environments/`
   - Props/VFX $\rightarrow$ `src/shared/props/`
   - Kinematics/Physics $\rightarrow$ `src/shared/motion/`
   - Re-export in the corresponding folder's `index.js`
   - Re-export in `src/shared/index.js`
   - Document in `src/shared/CATALOG.md`

4. **Pure Kinematics**:
   All recurring motion functions must be pure functions of `frame` in `src/shared/motion/`.

5. **Strict No-Render Rule**:
   Never run `remotion render` or `remotion still` unless explicitly requested by the user.

6. **Mandatory Text-Fitting Protocol**:
   Never render raw `<text>` inside containers based on arbitrary visual guesses. Always use the deterministic mathematical formulas in `PROTOCOLS.md` or the `AutoBadge` / `fitText` primitives from `src/shared/` to guarantee zero text overflow across all screens.

7. **CSS & Tailwind for Text Layouts vs. SVG for Custom Drawings**:
   Use HTML/CSS and Tailwind CSS for elements that are primarily shapes and text (flowchart nodes, cards, badges, banners, buttons, diagnosis panels) where Flexbox, auto-wrapping, padding, and border utilities prevent text overflow naturally. Reserve SVG for custom vector artwork, canonical characters (`CuratedStickman`), complex paths, graphs, blueprints, and freehand illustrations.

8. **Strict One-Scene-Per-File & Individual Scene Workflow**:
   Never group or batch multiple scenes into combined files (e.g. `Part01.jsx`, `Batch1.jsx`). Every single scene MUST live in its own separate, dedicated file (e.g. `Scene01.jsx`, `Scene02.jsx`, ... `Scene100.jsx`). When creating, editing, or fine-tuning scenes for any video across any channel, always develop them individually, one by one, with complete, unhurried focus on that single scene's timing, kinematics, and visual composition. Never batch them.

9. **Preserve `scenes.md`**:
   Never delete or remove `scenes.md`. This file is the primary user input source where video scenes, scripts, and production prompts are written and uploaded.


