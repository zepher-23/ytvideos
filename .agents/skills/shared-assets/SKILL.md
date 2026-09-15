---
name: shared-assets
description: Directory structure, reusable characters, backgrounds, props, kinematics, and asset storage protocols for all video channels
---

# Shared Asset & Kinematics System for All Video Channels

This skill documents the permanent project structure, reusable components, and storage protocols across all video channels (`everything-curated`, `cognify`, `gsd`, `synthesized`, `the-archive`).

## Permanent Directory Structure
The master library lives at `d:/youtube channels/web editing code/my-video/src/shared/`:

```
my-video/src/shared/
├── characters/         # Canonical characters & anatomy
│   ├── CuratedStickman.jsx  # Canonical stickman (white tunic, oval eyes, round mittens, stick feet)
│   └── index.js
├── environments/       # Shared backgrounds & floors
│   ├── TiledFloor.jsx       # Perspective grid floor
│   ├── ScientificGrid.jsx   # Technical coordinate graph
│   ├── GardenBackground.jsx # Outdoor hills, sun, clouds
│   └── index.js
├── props/              # Handheld items, VFX & props
│   ├── Butterfly.jsx, Calendar.jsx, FlippingCalendar.jsx, GreyCloud.jsx, JumpRope.jsx, TickingClock.jsx, TransparentBucket.jsx
│   └── index.js
├── motion/             # Pure math kinematics (functions of frame)
│   ├── walkCycles.js, recoilAndShock.js, defeatSlump.js, fluidDynamics.js, cameraTransitions.js
│   └── index.js
├── CATALOG.md          # Complete registry of all components and usage examples
├── PROTOCOLS.md        # SOP for creating, parameterizing and storing new assets
└── index.js            # Master barrel export
```

## Mandatory Rules When Working in Any Channel
1. **Never Redraw Primitives Inline**:
   - Always check `src/shared/CATALOG.md` first.
   - Import stickmen from `import { CuratedStickman } from '../shared'`.
2. **Never Single-Use**:
   - When creating a new element, background, prop, or movement, immediately store it in `src/shared/` and re-export it.
3. **Pure Kinematics**:
   - Store all frame-based math in `src/shared/motion/*.js`.
4. **Zero-Render**:
   - Never render videos (`remotion render` or `remotion still`) unless explicitly commanded by the user.
