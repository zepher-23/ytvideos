import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const SadnessDepressionScene = ({
  sceneStartX = 11520,
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  // Support isolated scene preview (frames 0 to 200) and master timeline (frames 1210 to 1410)
  const localFrame = propFrame !== undefined ? propFrame - 1210 : currentFrame;

  const width = 1920;
  const height = 1080;
  const centerX = sceneStartX + 960; // 12480
  const leftCenterX = sceneStartX + 480;  // 12000
  const rightCenterX = sceneStartX + 1440; // 12960

  const baselineY = 580;

  // =========================================================================
  // 1. MECHANICAL BACKGROUND GRID SCROLL
  // =========================================================================
  // Subtle light-blue grid constantly moving upward
  const gridSize = 45;
  const gridOffsetY = (localFrame * 1.6) % gridSize;

  // =========================================================================
  // 2. LEFT SIDE: "SADNESS" ANIMATION
  // =========================================================================
  // Text fades in smoothly from local frame 15 to 35
  const sadnessTextOpacity = interpolate(localFrame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Smooth curve draws from local frame 35 to 125
  const sadnessDrawT = interpolate(localFrame, [35, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Mathematically defined smooth curve: dips down, bounces back up, settles to baseline
  const sadnessStartX = leftCenterX - 360; // 11640
  const sadnessEndX = leftCenterX + 360;   // 12360
  const sadnessWidth = sadnessEndX - sadnessStartX; // 720px

  const numSadnessPoints = 50;
  const sadnessPoints = [];
  for (let i = 0; i <= numSadnessPoints; i++) {
    const t = i / numSadnessPoints;
    const px = sadnessStartX + t * sadnessWidth;

    // Smooth harmonic dip and rebound curve:
    // - Dips down to +145px at t ~ 0.35 (Y = 725)
    // - Curves upward, slightly overshoots by -24px at t ~ 0.80 (Y = 556)
    // - Smoothly eases to baseline 0 at t = 1.0 (Y = 580)
    const primaryDip = Math.sin(Math.PI * t) * 155 * (1 - 0.7 * t);
    const harmonicBounce = Math.sin(2 * Math.PI * t) * -52 * Math.pow(t, 1.2);
    const py = baselineY + primaryDip + harmonicBounce;
    sadnessPoints.push({ x: px, y: py });
  }

  // Active slice of points up to sadnessDrawT
  const activeSadnessCount = Math.floor(sadnessDrawT * (numSadnessPoints - 1));
  const activeSadnessPoints = sadnessPoints.slice(0, activeSadnessCount + 1);
  if (activeSadnessCount < numSadnessPoints && sadnessDrawT > 0) {
    const pPrev = sadnessPoints[activeSadnessCount];
    const pNext = sadnessPoints[activeSadnessCount + 1];
    const subFrac = (sadnessDrawT * (numSadnessPoints - 1)) - activeSadnessCount;
    activeSadnessPoints.push({
      x: pPrev.x + (pNext.x - pPrev.x) * subFrac,
      y: pPrev.y + (pNext.y - pPrev.y) * subFrac,
    });
  }
  const sadnessPathStr = activeSadnessPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const activeSadnessHead = activeSadnessPoints[activeSadnessPoints.length - 1] || sadnessPoints[0];

  // =========================================================================
  // 3. RIGHT SIDE: "DEPRESSION" ANIMATION
  // =========================================================================
  // Text appears ABRUPTLY at local frame 45 (instant step, no fade)
  const isDepressionTextVisible = localFrame >= 45;

  // Red line plummets sharply straight down from frame 50 to 75
  const impactFrame = 75;
  const isPlummeting = localFrame >= 50 && localFrame < impactFrame;
  const isShattered = localFrame >= impactFrame;

  const plummetT = interpolate(localFrame, [50, impactFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Accelerated gravity drop
  const dropEase = Math.pow(plummetT, 2.4);
  const bottomImpactY = 880;
  const redCurrentY = baselineY + (bottomImpactY - baselineY) * dropEase;
  const redLineX = rightCenterX; // 12960

  // Quick subtle red flash across entire background (frames 75 to 87)
  const redFlashOpacity = interpolate(localFrame, [75, 77, 87], [0, 0.28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shattered line fragments physics (scatter outward after frame 75)
  // Deterministic seed for 22 shattered line fragments
  const fragments = [
    { x: redLineX, y: 880, vx: -14, vy: -18, rot: 45, vRot: 14, len: 32 },
    { x: redLineX, y: 880, vx: 16, vy: -20, rot: -60, vRot: -18, len: 28 },
    { x: redLineX, y: 860, vx: -22, vy: -12, rot: 120, vRot: 22, len: 24 },
    { x: redLineX, y: 850, vx: 20, vy: -15, rot: -90, vRot: -16, len: 36 },
    { x: redLineX, y: 820, vx: -18, vy: -8, rot: 30, vRot: 20, len: 26 },
    { x: redLineX, y: 800, vx: 15, vy: -10, rot: -45, vRot: -12, len: 30 },
    { x: redLineX, y: 770, vx: -25, vy: 4, rot: 75, vRot: 25, len: 35 },
    { x: redLineX, y: 750, vx: 26, vy: 6, rot: -80, vRot: -24, len: 32 },
    { x: redLineX, y: 720, vx: -12, vy: -6, rot: 15, vRot: 18, len: 22 },
    { x: redLineX, y: 700, vx: 14, vy: -4, rot: -30, vRot: -15, len: 25 },
    { x: redLineX, y: 670, vx: -20, vy: 10, rot: 95, vRot: 28, len: 30 },
    { x: redLineX, y: 650, vx: 22, vy: 12, rot: -110, vRot: -22, len: 28 },
    { x: redLineX, y: 630, vx: -8, vy: 8, rot: 40, vRot: 16, len: 20 },
    { x: redLineX, y: 620, vx: 10, vy: 9, rot: -50, vRot: -14, len: 22 },
    // Impact blast splinters:
    { x: redLineX, y: 880, vx: -28, vy: -24, rot: 135, vRot: 30, len: 18 },
    { x: redLineX, y: 880, vx: 30, vy: -26, rot: -140, vRot: -32, len: 20 },
    { x: redLineX, y: 880, vx: -34, vy: -10, rot: 70, vRot: 35, len: 16 },
    { x: redLineX, y: 880, vx: 35, vy: -8, rot: -75, vRot: -34, len: 18 },
    { x: redLineX, y: 875, vx: -6, vy: -28, rot: 20, vRot: 25, len: 22 },
    { x: redLineX, y: 875, vx: 8, vy: -30, rot: -25, vRot: -28, len: 24 },
    { x: redLineX, y: 870, vx: -16, vy: -22, rot: 85, vRot: 20, len: 26 },
    { x: redLineX, y: 870, vx: 18, vy: -23, rot: -95, vRot: -21, len: 25 },
  ];

  return (
    <g id="scene-07-sadness-vs-depression-root">
      {/* ============================================================== */}
      {/* 1. SOLID DARK NAVY BLUE BACKGROUND                             */}
      {/* ============================================================== */}
      <rect
        x={sceneStartX}
        y="0"
        width={width}
        height={height}
        fill="#070D1E" // Deep rich navy blue
      />

      {/* ============================================================== */}
      {/* 2. SUBTLE LIGHT-BLUE UPWARD MOVING MECHANICAL GRID             */}
      {/* ============================================================== */}
      <g id="mechanical-grid" opacity="0.16">
        {/* Vertical coordinate lines */}
        {[...Array(Math.ceil(width / gridSize) + 1)].map((_, i) => (
          <line
            key={`vgrid-${i}`}
            x1={sceneStartX + i * gridSize}
            y1="0"
            x2={sceneStartX + i * gridSize}
            y2={height}
            stroke="#38BDF8"
            strokeWidth={i % 4 === 0 ? "1.6" : "0.8"}
          />
        ))}

        {/* Horizontal coordinate lines scrolling smoothly upward */}
        {[...Array(Math.ceil(height / gridSize) + 3)].map((_, i) => {
          const lineY = i * gridSize - gridOffsetY;
          return (
            <line
              key={`hgrid-${i}`}
              x1={sceneStartX}
              y1={lineY}
              x2={sceneStartX + width}
              y2={lineY}
              stroke="#38BDF8"
              strokeWidth={i % 4 === 0 ? "1.6" : "0.8"}
            />
          );
        })}
      </g>

      {/* Subtle Mechanical Crosshair Ticks across Background */}
      <g opacity="0.25">
        {[240, 480, 720, 960, 1200, 1440, 1680].map((rx) =>
          [200, 400, 600, 800].map((ry) => (
            <g key={`cross-${rx}-${ry}`} transform={`translate(${sceneStartX + rx}, ${ry})`}>
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#38BDF8" strokeWidth="1.2" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#38BDF8" strokeWidth="1.2" />
            </g>
          ))
        )}
      </g>

      {/* ============================================================== */}
      {/* 3. CENTER SPLIT-SCREEN DIVIDER                                 */}
      {/* ============================================================== */}
      <g id="split-screen-divider">
        {/* Glowing technical divider line */}
        <line
          x1={centerX}
          y1="80"
          x2={centerX}
          y2="1000"
          stroke="#0284C7"
          strokeWidth="3.5"
          opacity="0.35"
        />
        <line
          x1={centerX}
          y1="80"
          x2={centerX}
          y2="1000"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeDasharray="16 10"
          opacity="0.65"
        />

        {/* Center Split Marker Badge */}
        <g transform={`translate(${centerX}, 540)`}>
          <circle cx="0" cy="0" r="18" fill="#070D1E" stroke="#38BDF8" strokeWidth="2.5" />
          <text
            x="0"
            y="4"
            fill="#38BDF8"
            fontSize="10"
            fontWeight="900"
            fontFamily="monospace"
            textAnchor="middle"
          >
            VS
          </text>
        </g>
      </g>

      {/* ============================================================== */}
      {/* 4. LEFT SIDE: "SADNESS" (Resilient Bounce-Back)                 */}
      {/* ============================================================== */}
      <g id="left-pane-sadness">
        {/* Header: "SADNESS" (Fades in smoothly) */}
        <g
          id="sadness-header"
          transform={`translate(${leftCenterX}, 220)`}
          opacity={sadnessTextOpacity}
        >
          {/* Category Pill Tag */}
          <rect
            x="-75"
            y="-64"
            width="150"
            height="22"
            rx="4"
            fill="#0369A1"
            fillOpacity="0.35"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="-49"
            fill="#7DD3FC"
            fontSize="11"
            fontWeight="800"
            fontFamily="monospace"
            letterSpacing="2"
            textAnchor="middle"
          >
            EMOTION // NATURAL
          </text>

          {/* Main Title */}
          <text
            x="0"
            y="0"
            fill="#F0F9FF"
            fontSize="54"
            fontWeight="900"
            fontFamily="Impact, Arial Black, sans-serif"
            letterSpacing="5"
            textAnchor="middle"
          >
            SADNESS
          </text>

          {/* Subtext description */}
          <text
            x="0"
            y="32"
            fill="#94A3B8"
            fontSize="14"
            fontWeight="600"
            fontFamily="sans-serif"
            letterSpacing="1"
            textAnchor="middle"
          >
            Transient • Responsive • Self-Regulating
          </text>
        </g>

        {/* Stable Middle Baseline Reference Line */}
        <g id="sadness-baseline" opacity="0.6">
          <line
            x1={sadnessStartX - 30}
            y1={baselineY}
            x2={sadnessEndX + 30}
            y2={baselineY}
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="10 8"
          />
          <text
            x={sadnessStartX - 20}
            y={baselineY - 10}
            fill="#38BDF8"
            fontSize="11"
            fontWeight="800"
            fontFamily="monospace"
          >
            BASELINE EQUILIBRIUM
          </text>
        </g>

        {/* Smooth Curved Line Graph */}
        {localFrame >= 35 && (
          <g id="sadness-curve-graph">
            {/* Outer Glow Bloom */}
            <polyline
              points={sadnessPathStr}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.25"
            />
            {/* Medium Glow */}
            <polyline
              points={sadnessPathStr}
              fill="none"
              stroke="#0284C7"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.45"
            />
            {/* Core Vibrant Sky Blue Line */}
            <polyline
              points={sadnessPathStr}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing Tracer Dot at Lead Tip */}
            {sadnessDrawT < 0.99 && (
              <g transform={`translate(${activeSadnessHead.x}, ${activeSadnessHead.y})`}>
                <circle cx="0" cy="0" r="10" fill="#38BDF8" opacity="0.4" />
                <circle cx="0" cy="0" r="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
              </g>
            )}

            {/* Stable Recovery Tag at End */}
            {localFrame >= 120 && (
              <g transform={`translate(${sadnessEndX - 40}, ${baselineY - 24})`}>
                <rect
                  x="-70"
                  y="-10"
                  width="140"
                  height="20"
                  rx="4"
                  fill="#0369A1"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="4"
                  fill="#E0F2FE"
                  fontSize="10"
                  fontWeight="900"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  ✓ FULL RECOVERY
                </text>
              </g>
            )}
          </g>
        )}
      </g>

      {/* ============================================================== */}
      {/* 5. RIGHT SIDE: "DEPRESSION" (Plummet & Shatter)                 */}
      {/* ============================================================== */}
      <g id="right-pane-depression">
        {/* Header: "DEPRESSION" (Appears ABRUPTLY at frame 45) */}
        {isDepressionTextVisible && (
          <g id="depression-header" transform={`translate(${rightCenterX}, 220)`}>
            {/* Category Pill Tag */}
            <rect
              x="-85"
              y="-64"
              width="170"
              height="22"
              rx="4"
              fill="#7F1D1D"
              fillOpacity="0.45"
              stroke="#EF4444"
              strokeWidth="1.5"
            />
            <text
              x="0"
              y="-49"
              fill="#FCA5A5"
              fontSize="11"
              fontWeight="800"
              fontFamily="monospace"
              letterSpacing="2"
              textAnchor="middle"
            >
              CLINICAL // DYSFUNCTION
            </text>

            {/* Main Title (Intense Neon Red) */}
            <text
              x="0"
              y="0"
              fill="#EF4444"
              fontSize="54"
              fontWeight="900"
              fontFamily="Impact, Arial Black, sans-serif"
              letterSpacing="5"
              textAnchor="middle"
            >
              DEPRESSION
            </text>

            {/* Subtext description */}
            <text
              x="0"
              y="32"
              fill="#F87171"
              fontSize="14"
              fontWeight="600"
              fontFamily="sans-serif"
              letterSpacing="1"
              textAnchor="middle"
            >
              Chronic • Non-Responsive • Structural
            </text>
          </g>
        )}

        {/* Right Baseline Reference Line */}
        <g id="depression-baseline" opacity="0.6">
          <line
            x1={rightCenterX - 360}
            y1={baselineY}
            x2={rightCenterX + 360}
            y2={baselineY}
            stroke="#EF4444"
            strokeWidth="2"
            strokeDasharray="10 8"
          />
          <text
            x={rightCenterX - 340}
            y={baselineY - 10}
            fill="#EF4444"
            fontSize="11"
            fontWeight="800"
            fontFamily="monospace"
          >
            FAILED RECOVERY THRESHOLD
          </text>
        </g>

        {/* Glowing Neon-Red Line Plummeting Straight Down (Frames 50 to 75) */}
        {isPlummeting && (
          <g id="depression-plummeting-line">
            {/* Red Glow Bloom Underlay */}
            <line
              x1={redLineX}
              y1={baselineY}
              x2={redLineX}
              y2={redCurrentY}
              stroke="#DC2626"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.35"
            />
            {/* Medium Neon Glow */}
            <line
              x1={redLineX}
              y1={baselineY}
              x2={redLineX}
              y2={redCurrentY}
              stroke="#EF4444"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Core Intense Neon Red Line */}
            <line
              x1={redLineX}
              y1={baselineY}
              x2={redLineX}
              y2={redCurrentY}
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1={redLineX}
              y1={baselineY}
              x2={redLineX}
              y2={redCurrentY}
              stroke="#EF4444"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Glowing Plunging Needle Tip */}
            <circle cx={redLineX} cy={redCurrentY} r="12" fill="#EF4444" opacity="0.5" />
            <circle cx={redLineX} cy={redCurrentY} r="5" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2.5" />
          </g>
        )}

        {/* Broken Top Stump remaining after impact (Frames 75 to 200) */}
        {isShattered && (
          <g id="depression-broken-stump">
            <line
              x1={redLineX}
              y1={baselineY}
              x2={redLineX}
              y2={baselineY + 28}
              stroke="#EF4444"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Jagged break jagged lines */}
            <path
              d={`M ${redLineX - 6} ${baselineY + 28} L ${redLineX} ${baselineY + 34} L ${redLineX + 6} ${baselineY + 26}`}
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
            />

            {/* Shattered Collapse Label */}
            <g transform={`translate(${rightCenterX}, 740)`}>
              <text
                x="0"
                y="0"
                fill="#EF4444"
                fontSize="16"
                fontWeight="900"
                fontFamily="monospace"
                letterSpacing="3"
                textAnchor="middle"
                opacity={Math.min(1, (localFrame - 75) / 20)}
              >
                [ SYSTEM FAILURE // COLLAPSE ]
              </text>
            </g>
          </g>
        )}

        {/* Shattered Line Fragments Scatter Outward (Frames 75 to 135) */}
        {isShattered && localFrame < 140 && (
          <g id="shattered-line-fragments">
            {fragments.map((frag, idx) => {
              const deltaT = (localFrame - impactFrame); // 0 to 65
              // Physics trajectory: x = x0 + vx*t, y = y0 + vy*t + 0.5*g*t^2
              const posX = frag.x + frag.vx * (deltaT * 0.7);
              const posY = frag.y + frag.vy * (deltaT * 0.7) + 0.45 * deltaT * deltaT;
              const currentRot = frag.rot + frag.vRot * (deltaT * 0.4);
              const opacity = Math.max(0, 1 - deltaT / 45);

              return (
                <g
                  key={`frag-${idx}`}
                  transform={`translate(${posX}, ${posY}) rotate(${currentRot})`}
                  opacity={opacity}
                >
                  {/* Outer neon glow */}
                  <line
                    x1={-frag.len / 2}
                    y1="0"
                    x2={frag.len / 2}
                    y2="0"
                    stroke="#EF4444"
                    strokeWidth="10"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                  {/* Core shard line */}
                  <line
                    x1={-frag.len / 2}
                    y1="0"
                    x2={frag.len / 2}
                    y2="0"
                    stroke="#FCA5A5"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </g>
        )}
      </g>

      {/* ============================================================== */}
      {/* 6. SUBTLE RED FLASH ACROSS ENTIRE BACKGROUND (Frames 75 to 87) */}
      {/* ============================================================== */}
      {redFlashOpacity > 0.01 && (
        <rect
          x={sceneStartX}
          y="0"
          width={width}
          height={height}
          fill="#DC2626"
          opacity={redFlashOpacity}
        />
      )}
    </g>
  );
};
