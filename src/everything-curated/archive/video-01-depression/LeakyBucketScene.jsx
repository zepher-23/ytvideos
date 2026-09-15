import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CuratedCharacter } from "./CuratedCharacter";

export const LeakyBucketScene = ({
  sceneStartX = 15360,
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  // Supports both isolated scene preview (frames 0 to 180) and master timeline (frames 1610 to 1790)
  const localFrame = propFrame !== undefined ? propFrame - 1610 : currentFrame;

  const width = 1920;
  const height = 1080;
  const groundY = 815;

  // Bucket center coordinates
  const bucketX = sceneStartX + 1060; // 16420px (right of center)
  const bucketBaseY = groundY; // rests on floor at 815px

  // Stickman base coordinates
  const stickmanX = sceneStartX + 660; // 16020px (left of bucket)
  const stickmanBaseY = groundY;

  // =========================================================================
  // 1. LIQUID LEVEL & PHYSICS SIMULATION
  // =========================================================================
  // - Frames 0 to 10: baseline idle at 25% full
  // - Frames 10 to 62: fills from 25% to 98% full via falling droplets
  // - Frames 62 to 68: holds full at 98%
  // - Frame 68: sudden crack fissure at base!
  // - Frames 69 to 120: rapid pressurized leak draining to 0%
  // - Frames 120 to 180: empty, puddle rests on floor
  let fillPct = 0.25;
  if (localFrame < 10) {
    fillPct = 0.25;
  } else if (localFrame <= 62) {
    const t = (localFrame - 10) / 52;
    const smooth = t * t * (3 - 2 * t);
    fillPct = 0.25 + 0.73 * smooth;
  } else if (localFrame <= 68) {
    fillPct = 0.98;
  } else if (localFrame <= 120) {
    const t = (localFrame - 68) / 52;
    fillPct = Math.max(0, 0.98 * Math.pow(1 - t, 1.8));
  } else {
    fillPct = 0;
  }

  // Bucket geometric dimensions
  const bucketHeight = 250;
  const topRx = 122;
  const topRy = 25;
  const botRx = 92;
  const botRy = 18;

  // Liquid height in bucket
  const liquidY = -(fillPct * 230);
  const liquidRx = botRx + (topRx - botRx) * fillPct;
  const liquidRy = botRy + (topRy - botRy) * fillPct;

  // Surface ripple motion while filling or draining
  const isSurfaceWobbly = (localFrame >= 10 && localFrame <= 65) || (localFrame >= 68 && localFrame <= 118);
  const rippleAmp = isSurfaceWobbly ? Math.sin(localFrame * 0.45) * 2.5 : 0;

  // Crack event: triggers at frame 68
  const isCracked = localFrame >= 68;
  const crackBurstT = interpolate(localFrame, [68, 72, 85], [0, 1.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pressurized leak spray (active while liquid is draining)
  const isSpraying = localFrame >= 69 && localFrame <= 120 && fillPct > 0.02;
  const sprayPower = fillPct / 0.98;

  // Expanding floor puddle
  const puddleT = interpolate(localFrame, [72, 138], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const puddleEase = puddleT * puddleT * (3 - 2 * puddleT);
  const puddleRx = 165 * puddleEase;
  const puddleRy = 22 * puddleEase;

  // =========================================================================
  // 2. STICKMAN KINEMATICS & 3 EMOTIONAL PHASES
  // =========================================================================
  // Phase 1 (0–67): Content & Hopeful (upright, gesturing to bucket, smile)
  // Phase 2 (68–100): Shock & Alarm (sudden recoil backwards, hands to head, open O mouth)
  // Phase 3 (101–180): Drooping Defeat (slumped shoulders, head hanging down, sad frown, sigh)

  // Recoil X displacement during shock
  const recoilX = interpolate(
    localFrame,
    [67, 72, 85, 102],
    [0, -42, -38, -15],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Recoil hop during shock
  const recoilY = interpolate(
    localFrame,
    [67, 71, 78, 88],
    [0, -14, -4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Slump progress into defeat
  const slumpT = interpolate(localFrame, [102, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slumpEase = slumpT * slumpT * (3 - 2 * slumpT);

  // Character emotional phase flag
  const isPhaseContent = localFrame < 68;
  const isPhaseShock = localFrame >= 68 && localFrame <= 100;
  const isPhaseDefeat = localFrame > 100;

  // Gentle breathing idle for content phase
  const breathBob = isPhaseContent ? Math.sin(localFrame * 0.12) * 2.2 : 0;

  // Tear / sweat drop during slumped defeat
  const tearT = interpolate(localFrame, [135, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tearY = 60 * tearT * tearT;
  const tearOpacity = tearT > 0 && tearT < 1 ? Math.sin(tearT * Math.PI) : 0;

  return (
    <g id="scene-09-leaky-bucket-root">
      {/* Definitions for clip paths and gradients */}
      <defs>
        {/* Bucket interior clip for liquid */}
        <clipPath id="bucket-clip-interior">
          <path
            d={`M ${-topRx + 4} ${-bucketHeight + 10} 
               L ${topRx - 4} ${-bucketHeight + 10} 
               L ${botRx - 4} -4 
               L ${-botRx + 4} -4 Z`}
          />
        </clipPath>

        {/* Liquid linear gradient: luminous electric cyan */}
        <linearGradient id="cyanLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="35%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>

        {/* Liquid Surface radial highlight */}
        <radialGradient id="cyanSurfaceGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A5F3FC" />
          <stop offset="60%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#06B6D4" />
        </radialGradient>

        {/* Glass specular shine */}
        <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ============================================================== */}
      {/* 1. OFF-WHITE SCIENTIFIC CANVAS BACKDROP & GRID                 */}
      {/* ============================================================== */}
      {/* Wall area */}
      <rect
        x={sceneStartX}
        y="0"
        width={width}
        height={groundY}
        fill="#F8FAFC" // Clean off-white background
      />

      {/* Floor area */}
      <rect
        x={sceneStartX}
        y={groundY}
        width={width}
        height={height - groundY}
        fill="#F1F5F9" // Crisp light slate floor
      />

      {/* Floor dividing baseline */}
      <line
        x1={sceneStartX}
        y1={groundY}
        x2={sceneStartX + width}
        y2={groundY}
        stroke="#0F172A"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Scientific Coordinate Grid (Light grey grid lines) */}
      <g id="scientific-grid" opacity="0.7">
        {/* Horizontal grid lines */}
        {[100, 160, 220, 280, 340, 400, 460, 520, 580, 640, 700, 760].map((gy) => (
          <line
            key={`grid-h-${gy}`}
            x1={sceneStartX}
            y1={gy}
            x2={sceneStartX + width}
            y2={gy}
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        ))}

        {/* Vertical grid lines */}
        {Array.from({ length: 23 }, (_, i) => sceneStartX + 80 + i * 80).map((gx) => (
          <line
            key={`grid-v-${gx}`}
            x1={gx}
            y1="0"
            x2={gx}
            y2={groundY}
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        ))}

        {/* Crosshair "+" coordinate markers at intersections */}
        {[
          { x: sceneStartX + 240, y: 220 },
          { x: sceneStartX + 480, y: 340 },
          { x: sceneStartX + 720, y: 160 },
          { x: sceneStartX + 1200, y: 280 },
          { x: sceneStartX + 1440, y: 400 },
          { x: sceneStartX + 1680, y: 220 },
        ].map((pt, idx) => (
          <g key={`crosshair-${idx}`} stroke="#94A3B8" strokeWidth="2" opacity="0.6">
            <line x1={pt.x - 8} y1={pt.y} x2={pt.x + 8} y2={pt.y} />
            <line x1={pt.x} y1={pt.y - 8} x2={pt.x} y2={pt.y + 8} />
          </g>
        ))}
      </g>

      {/* Technical Lab Header Annotations */}
      <g id="lab-annotations">
        <text
          x={sceneStartX + 90}
          y="75"
          fill="#475569"
          fontSize="16"
          fontWeight="900"
          fontFamily="monospace, sans-serif"
          letterSpacing="2.5"
        >
          [NEUROTRANSMITTER HOMEOSTASIS // SYNAPSE BUFFER MODEL]
        </text>
        <text
          x={sceneStartX + 90}
          y="100"
          fill="#94A3B8"
          fontSize="13"
          fontWeight="700"
          fontFamily="monospace, sans-serif"
          letterSpacing="1.5"
        >
          FIG 9.0 : VESICULAR RETENTION & RAPID EXTRACELLULAR DEPLETION
        </text>
      </g>

      {/* Scientific Measurement Scale Beside Bucket */}
      <g id="measurement-scale" transform={`translate(${bucketX + 175}, 0)`}>
        {/* Scale vertical bracket */}
        <line x1="0" y1={groundY - 240} x2="0" y2={groundY} stroke="#CBD5E1" strokeWidth="2.5" />
        {[
          { label: "100% [OPTIMAL]", pctY: groundY - 230, val: 1.0 },
          { label: "75%", pctY: groundY - 172, val: 0.75 },
          { label: "50% [BASELINE]", pctY: groundY - 115, val: 0.5 },
          { label: "25%", pctY: groundY - 58, val: 0.25 },
          { label: "0% [DEPLETED]", pctY: groundY - 6, val: 0.0 },
        ].map((tick, idx) => {
          const isCurrentBand = Math.abs(fillPct - tick.val) < 0.16;
          const isZeroDepleted = tick.val === 0 && localFrame > 115;
          const tickColor = isZeroDepleted
            ? "#EF4444"
            : isCurrentBand
            ? "#06B6D4"
            : "#94A3B8";

          return (
            <g key={`scale-tick-${idx}`}>
              <line
                x1="0"
                y1={tick.pctY}
                x2="14"
                y2={tick.pctY}
                stroke={tickColor}
                strokeWidth={isCurrentBand ? "3" : "1.8"}
              />
              <text
                x="20"
                y={tick.pctY + 4}
                fill={tickColor}
                fontSize={isCurrentBand ? "13" : "11"}
                fontWeight={isCurrentBand ? "900" : "700"}
                fontFamily="monospace, sans-serif"
                letterSpacing="1"
              >
                {tick.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* ============================================================== */}
      {/* 2. SPREADING FLOOR PUDDLE (UNDER THE BUCKET & SPRAY)           */}
      {/* ============================================================== */}
      {puddleRx > 0 && (
        <g id="floor-puddle" transform={`translate(${bucketX - 130}, ${groundY})`}>
          {/* Main puddle pool */}
          <ellipse
            cx="0"
            cy="2"
            rx={puddleRx}
            ry={puddleRy}
            fill="#06B6D4"
            stroke="#000000"
            strokeWidth="3.5"
          />
          {/* Internal luminous highlight */}
          <ellipse
            cx="-8"
            cy="0"
            rx={puddleRx * 0.72}
            ry={puddleRy * 0.65}
            fill="#67E8F9"
            opacity="0.85"
          />
          {/* Puddle ripple rings from spray impact */}
          {isSpraying && (
            <ellipse
              cx="-20"
              cy="2"
              rx={18 + Math.sin(localFrame * 0.5) * 8}
              ry={4 + Math.sin(localFrame * 0.5) * 2}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              opacity="0.75"
            />
          )}
        </g>
      )}

      {/* ============================================================== */}
      {/* 3. THE TRANSPARENT "SEROTONIN" BUCKET                          */}
      {/* ============================================================== */}
      <g id="serotonin-bucket" transform={`translate(${bucketX}, ${bucketBaseY})`}>
        {/* Floor drop shadow under bucket */}
        <ellipse cx="0" cy="2" rx="108" ry="17" fill="#000000" opacity="0.28" />

        {/* Back Rim of Bucket */}
        <ellipse
          cx="0"
          cy={-bucketHeight}
          rx={topRx}
          ry={topRy}
          fill="#CBD5E1"
          stroke="#000000"
          strokeWidth="6"
        />

        {/* ============================================================ */}
        {/* GLOWING CYAN LIQUID IN BUCKET INTERIOR                       */}
        {/* ============================================================ */}
        {fillPct > 0.005 && (
          <g clipPath="url(#bucket-clip-interior)">
            {/* Liquid main body */}
            <path
              d={`M ${-liquidRx - 5} ${liquidY} 
                 L ${liquidRx + 5} ${liquidY} 
                 L ${botRx} 0 
                 L ${-botRx} 0 Z`}
              fill="url(#cyanLiquidGrad)"
            />

            {/* Rising micro-bubbles while filling */}
            {localFrame >= 10 && localFrame <= 65 && (
              <g id="rising-bubbles" fill="#E0F2FE" opacity="0.75">
                {[
                  { x: -35, speed: 1.8, r: 4, offset: 0 },
                  { x: 15, speed: 2.2, r: 5.5, offset: 12 },
                  { x: 45, speed: 1.6, r: 3.5, offset: 25 },
                  { x: -10, speed: 2.0, r: 4.5, offset: 38 },
                ].map((b, idx) => {
                  const bY = -(((localFrame * b.speed + b.offset * 8) % 180) + 10);
                  if (bY > liquidY && bY < -10) {
                    return <circle key={`bubble-${idx}`} cx={b.x} cy={bY} r={b.r} />;
                  }
                  return null;
                })}
              </g>
            )}

            {/* Glowing Liquid Top Surface Ellipse */}
            <ellipse
              cx="0"
              cy={liquidY + rippleAmp}
              rx={liquidRx}
              ry={liquidRy}
              fill="url(#cyanSurfaceGrad)"
              stroke="#A5F3FC"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* ============================================================ */}
        {/* FALLING DROPLETS FROM TOP (Frames 8 to 65)                   */}
        {/* ============================================================ */}
        {localFrame >= 8 && localFrame <= 65 && (
          <g id="filling-droplets">
            {[0, 6, 12].map((offset, idx) => {
              const cycleLen = 18;
              const dropFrame = (localFrame + offset) % cycleLen;
              const dropProg = dropFrame / cycleLen;
              const startY = -bucketHeight - 160;
              const targetY = liquidY - 5;
              const curY = startY + dropProg * dropProg * (targetY - startY);

              if (curY < targetY - 12) {
                return (
                  <g key={`drop-${idx}`} transform={`translate(${idx === 1 ? -15 : idx === 2 ? 18 : 0}, ${curY})`}>
                    {/* Glowing cyan teardrop */}
                    <path
                      d="M 0 -14 C 7 -6 7 6 0 9 C -7 6 -7 -6 0 -14 Z"
                      fill="#22D3EE"
                      stroke="#000000"
                      strokeWidth="2.5"
                    />
                    {/* White glint */}
                    <circle cx="2" cy="0" r="2" fill="#FFFFFF" />
                  </g>
                );
              }
              return null;
            })}
          </g>
        )}

        {/* ============================================================ */}
        {/* BUCKET GLASS / WOOD STAVES & TRANSPARENCY                    */}
        {/* ============================================================ */}
        {/* Translucent Bucket Wall */}
        <path
          d={`M ${-topRx} ${-bucketHeight} 
             L ${topRx} ${-bucketHeight} 
             L ${botRx} 0 
             L ${-botRx} 0 Z`}
          fill="rgba(241, 245, 249, 0.40)"
          stroke="#000000"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Vertical Stave Grooves */}
        {[-0.6, -0.2, 0.2, 0.6].map((staveRatio, idx) => {
          const topX = topRx * staveRatio;
          const botX = botRx * staveRatio;
          return (
            <line
              key={`stave-${idx}`}
              x1={topX}
              y1={-bucketHeight}
              x2={botX}
              y2="0"
              stroke="#000000"
              strokeWidth="3.5"
              opacity="0.65"
            />
          );
        })}

        {/* Specular White Glass Sheen Reflection Streaks */}
        <path
          d={`M ${-topRx + 18} ${-bucketHeight + 15} 
             L ${-topRx + 36} ${-bucketHeight + 15} 
             L ${-botRx + 30} -15 
             L ${-botRx + 16} -15 Z`}
          fill="url(#glassShine)"
        />
        <line
          x1={-topRx + 24}
          y1={-bucketHeight + 20}
          x2={-botRx + 20}
          y2="-20"
          stroke="#FFFFFF"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* ============================================================ */}
        {/* METAL HOOPS / REINFORCING BANDS                              */}
        {/* ============================================================ */}
        {/* Top Rim Metal Band */}
        <ellipse
          cx="0"
          cy={-bucketHeight}
          rx={topRx}
          ry={topRy}
          fill="none"
          stroke="#334155"
          strokeWidth="10"
        />
        <ellipse
          cx="0"
          cy={-bucketHeight}
          rx={topRx}
          ry={topRy}
          fill="none"
          stroke="#000000"
          strokeWidth="5"
        />

        {/* Middle Metal Band */}
        <path
          d={`M ${-(botRx + (topRx - botRx) * 0.52)} -130 
             Q 0 ${-130 + topRy * 0.8} ${botRx + (topRx - botRx) * 0.52} -130`}
          fill="none"
          stroke="#334155"
          strokeWidth="12"
        />
        <path
          d={`M ${-(botRx + (topRx - botRx) * 0.52)} -130 
             Q 0 ${-130 + topRy * 0.8} ${botRx + (topRx - botRx) * 0.52} -130`}
          fill="none"
          stroke="#000000"
          strokeWidth="5"
        />
        {/* Rivets on middle band */}
        {[-70, -25, 25, 70].map((rvX, idx) => (
          <circle key={`rivet-m-${idx}`} cx={rvX} cy={-124 + Math.abs(rvX) * 0.05} r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
        ))}

        {/* Bottom Metal Base Band */}
        <path
          d={`M ${-botRx} -14 Q 0 ${-14 + botRy * 0.9} ${botRx} -14`}
          fill="none"
          stroke="#334155"
          strokeWidth="12"
        />
        <path
          d={`M ${-botRx} -14 Q 0 ${-14 + botRy * 0.9} ${botRx} -14`}
          fill="none"
          stroke="#000000"
          strokeWidth="5"
        />

        {/* Metal Handle Attached to Top Rim */}
        <path
          d={`M ${-topRx - 2} ${-bucketHeight + 8} 
             C ${-topRx - 45} ${-bucketHeight - 110} 
               ${topRx + 45} ${-bucketHeight - 110} 
               ${topRx + 2} ${-bucketHeight + 8}`}
          fill="none"
          stroke="#1E293B"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Wooden grip in center of handle */}
        <rect
          x="-35"
          y={-bucketHeight - 118}
          width="70"
          height="18"
          rx="7"
          fill="#B45309"
          stroke="#000000"
          strokeWidth="4"
        />

        {/* ============================================================ */}
        {/* BUCKET LABEL PLAQUE: "SEROTONIN"                             */}
        {/* ============================================================ */}
        <g id="label-plaque" transform="translate(0, -132)">
          {/* Label backing card */}
          <rect
            x="-80"
            y="-20"
            width="160"
            height="40"
            rx="7"
            fill="#FEF08A" // 2D comic warm yellow plaque
            stroke="#000000"
            strokeWidth="4.5"
          />
          {/* Plaque mounting screws */}
          <circle cx="-68" cy="0" r="3.5" fill="#CA8A04" stroke="#000000" strokeWidth="2" />
          <circle cx="68" cy="0" r="3.5" fill="#CA8A04" stroke="#000000" strokeWidth="2" />

          {/* Label typography */}
          <text
            x="0"
            y="7"
            fill="#000000"
            fontSize="18"
            fontWeight="900"
            fontFamily="Impact, Arial Black, sans-serif"
            letterSpacing="2.8"
            textAnchor="middle"
          >
            SEROTONIN
          </text>
        </g>

        {/* ============================================================ */}
        {/* 4. THE CRACK FISSURE & HIGH-PRESSURE SPRAY JET               */}
        {/* ============================================================ */}
        {isCracked && (
          <g id="crack-fissure">
            {/* Branching jagged crack at base */}
            <path
              d="M -78 -48 L -72 -36 L -79 -24 L -68 -12 L -74 0"
              fill="none"
              stroke="#000000"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="bevel"
            />
            <path
              d="M -72 -36 L -58 -42 L -52 -34"
              fill="none"
              stroke="#000000"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M -79 -24 L -88 -20 L -92 -12"
              fill="none"
              stroke="#000000"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Comic "CRACK!" soundburst popping at frame 68 */}
            {crackBurstT > 0 && (
              <g
                transform={`translate(-115, -45) scale(${crackBurstT}) rotate(-12)`}
                opacity={Math.min(1, crackBurstT * 1.5)}
              >
                {/* Yellow explosion starburst shape */}
                <polygon
                  points="0,-24 8,-8 26,-14 16,3 32,16 12,16 6,32 -6,18 -24,24 -16,6 -30,-6 -10,-8"
                  fill="#FDE047"
                  stroke="#000000"
                  strokeWidth="3.5"
                />
                <text
                  x="0"
                  y="7"
                  fill="#DC2626"
                  fontSize="22"
                  fontWeight="900"
                  fontFamily="Impact, Arial Black, sans-serif"
                  letterSpacing="1.5"
                  textAnchor="middle"
                  stroke="#000000"
                  strokeWidth="1.2"
                >
                  CRACK!
                </text>
              </g>
            )}

            {/* High-Pressure Liquid Spray Streams */}
            {isSpraying && (
              <g id="liquid-spray">
                {/* Main pressurized arc jet shooting to the left floor */}
                <path
                  d={`M -72 -36 Q ${-130 - 30 * sprayPower} ${-55 - 15 * sprayPower} ${-150 - 45 * sprayPower} 2`}
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth={8 * sprayPower + 3}
                  strokeLinecap="round"
                />
                {/* Inner white highlight stream */}
                <path
                  d={`M -72 -36 Q ${-130 - 30 * sprayPower} ${-55 - 15 * sprayPower} ${-150 - 45 * sprayPower} 2`}
                  fill="none"
                  stroke="#CFFAFE"
                  strokeWidth={3 * sprayPower + 1}
                  strokeLinecap="round"
                />

                {/* Secondary erratic spraying droplets */}
                {[
                  { dx: -110, dy: -48, r: 4 },
                  { dx: -140, dy: -28, r: 5.5 },
                  { dx: -175, dy: -10, r: 4.5 },
                  { dx: -85, dy: -18, r: 3.5 },
                ].map((sp, idx) => {
                  const wobbleX = Math.sin(localFrame * 0.8 + idx * 2) * 12;
                  const wobbleY = Math.cos(localFrame * 0.8 + idx * 2) * 6;
                  return (
                    <circle
                      key={`spray-drop-${idx}`}
                      cx={sp.dx * sprayPower + wobbleX}
                      cy={sp.dy * sprayPower + wobbleY}
                      r={sp.r * sprayPower}
                      fill="#22D3EE"
                      stroke="#000000"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            )}
          </g>
        )}
      </g>

      {/* ============================================================== */}
      {/* 5. CANONICAL STICKMAN CHARACTER (3-PHASE EMOTIONAL REACTION)   */}
      {/* ============================================================== */}
      <CuratedCharacter
        x={stickmanX}
        y={stickmanBaseY}
        scale={1.05}
        pose={isPhaseShock ? "shock" : isPhaseDefeat ? "defeat" : "content"}
        frame={localFrame}
        recoilX={recoilX}
        recoilY={recoilY}
        slumpProgress={slumpEase}
        lookDirection={isPhaseContent ? "right" : "center"}
        mouth={isPhaseShock ? "shock" : isPhaseDefeat ? "frown" : "smile"}
        eyes={isPhaseShock ? "shock" : isPhaseDefeat ? "defeat" : "normal"}
        showExclamation={isPhaseShock}
        showTear={isPhaseDefeat && tearOpacity > 0}
        tearY={tearY}
        tearOpacity={tearOpacity}
        showSigh={localFrame >= 135}
        sighFrame={localFrame >= 135 ? localFrame - 135 : 0}
      />
    </g>
  );
};
