# Shared Visual & Motion Asset Catalog

Welcome to the centralized asset and kinematics registry. All components, backgrounds, props, and motion engines here are modular, parameterized, and ready to be imported across any video channel (`everything-curated`, `cognify`, `gsd`, `synthesized`, `the-archive`).

---

## 1. Characters (`src/shared/characters/`)

### `CuratedStickman`
- **Import**: `import { CuratedStickman } from '../shared';`
- **Canonical Proportions**: 
  - Head: Circle `r = 68`, stroke `7.5px`
  - Eyes: Vertical ellipses `rx = 5.5, ry = 7.5`, fill `#000000`
  - Body: Tapered tunic polygon, fill `#FFFFFF`, stroke `#000000`, `strokeWidth = 7.5`
  - Hands: Round mitten circle `r = 9` + small thumb path
  - Feet: Clean L-shaped stick feet with `strokeLinecap="round"` (no colored shoes)
- **Props**:
  - `pose`: `'idle'` | `'content'` | `'shock'` | `'crazy'` | `'defeat'` | `'reaching'` | `'custom'`
  - `armLeft`: `ReactNode` (optional custom left arm SVG JSX)
  - `armRight`: `ReactNode` (optional custom right arm SVG JSX)
  - `reachProgress`: `number` (0 to 1, smoothly extends arm forward with realistic torso lean)
  - `reachDirection`: `'left'` | `'right'`
  - `showSweat`: `boolean` (renders nervous comic sweat bead on forehead)
  - `eyes`: `'normal'` | `'shock'` | `'defeat'` | `'look-right'` | `'look-left'`
  - `variant`: `'adult'` (scale 1.0) | `'teen'` (scale 0.78) | `'child'` (scale 0.58)
  - `isBust`: `boolean` (renders head and shoulders only, perfect for split-screen busts)
  - `scale`: `number` (multiplies size)
  - `mouth`: `'smile'` | `'neutral'` | `'frown'` | `'shock'` | `'flat'`
- **Example**:
```jsx
<CuratedStickman 
  pose="shock" 
  variant="adult" 
  mouthState="gasp" 
  eyeState="wide" 
/>
```

---

## 2. Environments (`src/shared/environments/`)

### `ModularFloor`
- **Import**: `import { ModularFloor } from '../shared';`
- **Description**: Edge-to-edge continuous floor baseline with alternating grey and white tiles (supports 3D perspective receding checkerboard or 2D flat grid) and ambient contact depth shadow.
- **Props**:
  - `floorY`: default `780`
  - `variant`: `'perspective'` | `'flat'` (default: `'perspective'`)
  - `tileColorEven`: default `'#FFFFFF'`
  - `tileColorOdd`: default `'#E2E8F0'`
  - `strokeColor`: default `'#CBD5E1'`
  - `baselineColor`: default `'#0F172A'`
  - `baselineWidth`: default `6`
  - `numRows`: default `5`
  - `numCols`: default `22`
  - `showShadow`: default `true`
  - `standalone`: default `false` (set `true` to wrap in full-screen SVG)

### `TiledFloor`
- **Import**: `import { TiledFloor } from '../shared';`
- **Description**: Perspective tiled floor with grid lines receding to a horizon.
- **Props**:
  - `tileColor1`: default `'#F5F5F7'`
  - `tileColor2`: default `'#E5E5EA'`
  - `lineColor`: default `'#D1D1D6'`
  - `horizonY`: default `480`
  - `perspective`: default `0.85`

### `ScientificGrid`
- **Import**: `import { ScientificGrid } from '../shared';`
- **Description**: Clean technical graph paper environment with tick marks, coordinate axes, and subtle crosshairs.
- **Props**:
  - `gridSize`: default `60`
  - `lineColor`: default `'rgba(0, 0, 0, 0.06)'`
  - `axisColor`: default `'rgba(0, 0, 0, 0.25)'`
  - `showAxes`: default `true`

### `GardenBackground`
- **Import**: `import { GardenBackground } from '../shared';`
- **Description**: Vibrant outdoor scene with rolling hills, animated sun, drifting clouds, and foreground grass tufts.
- **Props**:
  - `frame`: current frame for cloud drift and sun glow animation
  - `skyGradient`: `[topColor, bottomColor]`
  - `flowerCount`: number of blooming flowers (default `8`)

### `GridBackground`
- **Import**: `import { GridBackground } from '../shared';`
- **Description**: Global canonical graph paper / medical grid environment for all current and future scenes.
- **Themes**:
  - `"white"` (default): Pure white background (`#FFFFFF`) with subtle slate grid lines (`#CBD5E1`, opacity 0.55).
  - `"navy"`: Dark navy background (`#0F172A`) with cyan/white grid lines (`#38BDF8`).
- **Props**:
  - `theme`: `'white'` | `'navy'` (default `'white'`)
  - `gridSize`: default `60`
  - `strokeDasharray`: default `'2 4'`
  - `id`: unique SVG pattern id (e.g. `'grid-s1'`)

---

## 3. Props & VFX (`src/shared/props/`)

### `TransparentBucket`
- **Import**: `import { TransparentBucket } from '../shared';`
- **Description**: Minimalist transparent bucket with dynamic fluid level, wave ripple, crack, and spray arc.
- **Props**: `waterLevel` (0 to 1), `isCracked` (bool), `leakIntensity` (0 to 1), `frame`

### `JumpRope`
- **Import**: `import { JumpRope } from '../shared';`
- **Description**: Skipping rope supporting floor rest, pickup interpolation, high-speed spin arc, and dropped heap.
- **Props**: `state` (`'floor'` | `'held'` | `'spinning'`), `spinAngle`, `width`

### `Butterfly`
- **Import**: `import { Butterfly } from '../shared';`
- **Description**: Wing-flapping butterfly with 3D perspective fold.
- **Props**: `color`, `scale`, `wingFlapSpeed`, `frame`

### `TickingClock`
- **Import**: `import { TickingClock } from '../shared';`
- **Description**: 2D analog wall clock with animated second hand, tick marks, and comic speed lines.
- **Props**: `frame`, `tickSpeed`, `showSpeedLines`

### `Calendar` / `FlippingCalendar`
- **Import**: `import { Calendar, FlippingCalendar } from '../shared';`
- **Description**: Classic wall calendar with red header, grid, sway motion, and rapid page-turning curl VFX.
- **Props**: `month`, `year`, `flipSpeed`, `activeDay`

### `GreyCloud`
- **Import**: `import { GreyCloud } from '../shared';`
- **Description**: Rain/gloom cloud with animated droplet streaks.
- **Props**: `rainIntensity`, `scale`, `frame`

### `AutoBadge`
- **Import**: `import { AutoBadge } from '../shared';`
- **Description**: Deterministic SVG badge/box with guaranteed zero text overflow. Auto-clamps font size when fixed `width` is given or auto-expands container width dynamically. Features native SVG `textLength` guardrail.
- **Props**: `text`, `x`, `y`, `width` (null for auto), `height`, `maxFontSize`, `minFontSize`, `paddingX`, `paddingY`, `fill`, `stroke`, `strokeWidth`, `rx`, `textColor`, `fontWeight`, `fontFamily`, `letterSpacing`, `filter`.
- **Example**:
```jsx
<AutoBadge
  text="[ B ] DEPRESSED"
  x={280}
  y={20}
  width={420}
  maxFontSize={40}
  fill="#FEE2E2"
  stroke="#DC2626"
/>
```

### `MedicalPill`
- **Import**: `import { MedicalPill } from '../shared';`
- **Description**: Canonical hyper-polished 3D pharmaceutical capsule pill. Features volumetric cylindrical shading, interlocking shell seam, dual-dome gloss highlights, longitudinal specular streak, debossed pharmaceutical text imprint ("SSRI 20"), and soft luminous bloom.
- **Props**: `x`, `y`, `scale`, `rotation`, `width`, `length`, `color1`, `color1Dark`, `color2`, `color2Dark`, `imprint`, `subImprint`, `glowing`, `glowColor`, `opacity`, `showSeam`, `showImprint`, `showHighlight`.
- **Example**:
```jsx
<MedicalPill
  x={960}
  y={540}
  scale={1.2}
  rotation={-25}
  color1="#2563EB"
  color2="#FFFFFF"
  imprint="SSRI"
  subImprint="20mg"
  glowing={true}
/>
```

### `SvgPill`
- **Import**: `import { SvgPill } from '../shared';`
- **Description**: Canonical vector SVG pill prop encapsulating user-supplied pill SVG assets (`pill.svg` and `pill2.svg`). Normalized to canonical horizontal orientation (seam at x=0, colored cap on left, white cap on right) with deterministic scaling, optional text imprint (e.g., "WRONG"), and clean vector rendering without glow.
- **Props**: `x`, `y`, `scale`, `rotation`, `variant` (`"pill2"` | `"pill"`), `label`, `labelPosition` (`"cap"` | `"white"` | `"center"`), `labelColor`, `opacity`, `style`, `id`.
- **Example**:
```jsx
<SvgPill
  x={960}
  y={540}
  scale={1.8}
  rotation={-22}
  variant="pill2"
  label="WRONG"
/>
```

### `Neuron`
- **Import**: `import { Neuron } from '../shared';`
- **Description**: Canonical biological neuron cell component derived from SVG vectors (`viewBox 0 0 260 235`), centered at soma nucleus `(113.085, 131.295)`. Features soma cell body, complex dendrites, axon terminal, and nucleus core.
- **Props**: `scale`, `fill`, `stroke`, `strokeWidth`, `filter`, `opacity`, `showNucleus`, `nucleusColor`.
- **Example**:
```jsx
<Neuron
  scale={0.34}
  fill="url(#user-neuron-grad)"
  stroke="#FFFFFF"
  strokeWidth={1.2}
  filter="url(#neuron-glow)"
  showNucleus={true}
/>
```

### `MagnifyingGlass`
- **Import**: `import { MagnifyingGlass } from '../shared';`
- **Description**: Canonical scientific/clinical magnifying glass prop with center-aligned lens origin (x, y), double-beveled metallic rim, ergonomic angled handle with grip ridges, translucent optical tint, and specular curved gloss highlights.
- **Props**: `x`, `y`, `radius`, `scale`, `rotation`, `rimColor`, `rimWidth`, `handleLength`, `handleColor`, `id`.
- **Example**:
```jsx
<MagnifyingGlass
  x={960}
  y={540}
  radius={140}
  scale={1.0}
  rotation={38}
/>
```

---
### `VerticalWheel`
- **Import**: `import { VerticalWheel } from '../shared';`
- **Description**: Canonical 3D Cylindrical Vertical Wheel Scroll Component. Rotates items with genuine 3D perspective projection, focal selection lens with glowing accent brackets, acronym badge support, and smooth inertial kinematics.
- **Props**: `items`, `scrollPos`, `x`, `y`, `width`, `radius`, `angleStep`, `id`.
- **Example**:
```jsx
<VerticalWheel
  items={DEPRESSION_TYPES}
  scrollPos={scrollPos}
  x={1360}
  y={540}
  width={760}
/>
### `BallAndChain`
- **Import**: `import { BallAndChain } from '../shared';`
- **Description**: Canonical giant steel prison ball and chain prop. Features volumetric cast-iron spherical shading, specular highlight sheen, welded eyelet flange, interlocking steel chain links with realistic catenary sag, hinged ankle shackle cuff with bolt, and floor friction scrape marks.
- **Props**: `ballX`, `ballY`, `radius`, `targetX` (ankle cuff X), `targetY` (ankle cuff Y), `isTaut`, `dragProgress`.
- **Example**:
```jsx
<BallAndChain
  ballX={450}
  ballY={710}
  radius={90}
  targetX={750}
  targetY={790}
  isTaut={true}
/>
```

### `Brain`
- **Import**: `import { Brain } from '../shared';`
- **Description**: Canonical anatomical brain component derived from library vector asset (`brain.svg`). Features detailed anatomical lobes, gyri, sulci, and cerebellum. Supports centering, scaling, rotation, drop shadow/glow, and dynamic `shutdownProgress` (fading from natural pink/coral to desaturated dead slate).
- **Props**: `x`, `y`, `scale`, `rotation`, `opacity`, `shutdownProgress` (0 to 1), `glowColor`.
- **Example**:
```jsx
<Brain
  x={960}
  y={540}
  scale={1.2}
  shutdownProgress={0.8}
  glowColor="#EF4444"
/>
```

## 4. Motion & Kinematics (`src/shared/motion/`)

All motion modules are pure functions of `frame` returning transformations or angles without side effects.

### `fitText({ text, boxWidth, maxFontSize, minFontSize, paddingX, charWidthFactor })`
- **Import**: `import { fitText } from '../shared';`
- **Description**: Pure mathematical utility to calculate safe font size or box width so text never overflows.
- **Returns**: `{ fontSize, boxWidth, textWidth, isClamped }`

### `getWalkKinematics(frame, options)`
- **Returns**: `{ leftLegAngle, rightLegAngle, leftArmAngle, rightArmAngle, leftKneeBend, rightKneeBend, bobY, phase }`
- **Usage**:
```js
const { leftLegAngle, rightLegAngle, bobY } = getWalkKinematics(frame, { cycleFrames: 24 });
```

### `getShockKinematics(frame, triggerFrame, options)`
- **Returns**: `{ offsetX, offsetY, leanAngle, eyeScale, shudderX, shudderY, isShocked }`
- **Usage**:
```js
const shock = getShockKinematics(frame, 45, { recoilDist: 40 });
```

### `getSlumpKinematics(frame, triggerFrame, options)`
- **Returns**: `{ progress, headDropAngle, shoulderSagY, armDroopAngle, heavySighY, isSlumped }`
- **Usage**:
```js
const slump = getSlumpKinematics(frame, 60, { transitionDuration: 30 });
```

### `getSurfaceRipple(frame, speed, amplitude)` & `getLeakArcPoint(t, ...)`
- Mathematical fluid equations for sloshing and projectile physics.

### `getCameraTransform(frame, keyframes)` & `getScreenShake(frame, triggerFrame)`
- Dynamic multi-waypoint camera zooms, pans, and high-energy shake effects.
