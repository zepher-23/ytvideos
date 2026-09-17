# Workspace Instructions & Architecture Guide

## Reusable Asset & Motion System (`my-video/src/shared/` / `src/shared/`)

All channels (`everything-curated`, `cognify`, `gsd`, `synthesized`, `the-archive`) share a centralized library of characters, environments, props, and kinematics located in:
`src/shared/` (or `my-video/src/shared/` from workspace root)

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
6. **Direct Focus & Token Efficiency**: Focus strictly on the task at hand. Do not waste tokens or time on superfluous analysis, unnecessary exploration, or redundant verification checks for obvious code changes. Execute the requested edits directly and concisely.
7. **Strict One-Scene-Per-File**: Every scene lives in its own dedicated file in `src/everything-curated/scenes/`. Never combine or batch them.

### 3. Video-Specific Scene Timing & SRT Synchronization

**Rule**: An SRT file belongs ONLY to its specific video project. **NEVER** apply an SRT file globally to other videos or channels.

1. **Per-Video SRT Assignment**:
   - Each video project declares its own active audio and SRT file (e.g. `ACTIVE_SRT_FILE` in `scenes.config.js` or via the user's prompt).
   - For the current *10 Types of Depression* video (`everything-curated`), the active SRT is `public/Generated_Audio_September_15_2026_-_1_01AM_eng.srt`.
   - When switching to a new video or channel, inspect THAT video's configuration or prompt to locate its distinct SRT file. If a video does not have an SRT file, use the durations in `scenes.md` or default pacing.
2. **Timing Calculation (When an SRT is assigned to that video)**:
   - Entry `N` in that video's SRT defines `Scene N`.
   - Convert `HH:MM:SS,mmm` to 30fps frames:
     - `startFrame = Math.round(startSeconds * 30)`
     - `endFrame = Math.round(endSeconds * 30)`
     - `durationInFrames = endFrame - startFrame`
3. **Narration Alignment**: Structure all internal visual beats, text animations, and kinematic actions to match the exact spoken words in that video's designated SRT entry.
4. **Dynamic Automation**: `scripts/sync-scenes.mjs` reads `ACTIVE_SRT_FILE` directly from that video's `scenes.config.js`. If none is specified, it does not force any SRT.
