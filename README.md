# Remotion Motion Graphics & Explainer Video Suite

A centralized, programmatic video generation framework built with [Remotion](https://www.remotion.dev) and React for producing high-fidelity educational and explainer videos.

---

## Channels & Content Architecture

- **`everything-curated`**: Deep-dive educational explainer series (e.g. *Types of Depression*).
- **`cognify`**: Cognitive science and psychology explainers.
- **`gsd`**: Productivity, history, and timeline visualizers.
- **`synthesized`**: Technology, AI, and systems architecture.
- **`the-archive`**: Historical and archival documentary animations.
- **`shared`** (`src/shared/`): Centralized component and motion library (canonical `CuratedStickman`, 3D props, medical models, and pure kinematic functions).

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Remotion Studio
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to inspect and scrub through compositions, scenes, and frame timelines.

---

## Project Structure

```text
my-video/
├── src/
│   ├── Root.jsx                  # Master Remotion composition registry
│   ├── index.js                  # Entrypoint
│   ├── everything-curated/       # "Everything Curated" compositions & scenes
│   │   ├── scenes/               # Modular scene components (Scene 01 to Scene 09...)
│   │   ├── scenes.config.js      # Scene timeline, duration & frame registration
│   │   └── index.jsx             # Video composition assembly & audio sync
│   └── shared/                   # Shared design system & motion library
│       ├── characters/           # Canonical stickman character models
│       ├── environments/         # Floor grids, scientific backgrounds
│       ├── props/                # Reusable vector & 3D props (wheels, neurons, pills)
│       ├── motion/               # Pure mathematical kinematic functions
│       └── CATALOG.md            # Living catalog of reusable assets
└── public/                       # Audio voiceovers and static assets
```

---

## Tech Stack
- **Framework**: Remotion (v4)
- **UI / Graphics**: React, SVG vector graphics, Remotion Spring & Interpolation kinematics
- **Fonts**: `@remotion/google-fonts`
