import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, GridBackground } from "../../shared";

/**
 * Helper component: Spiky Viral / Bacterial Pathogen Microbe
 * Renders a canonical medical/infographic pathogen particle with radiating spike proteins.
 */
const PathogenParticle = ({
  cx,
  cy,
  radius = 16,
  color = "#A855F7",
  innerColor = "#3B0764",
  spikeCount = 8,
  pulse = 1,
  rotation = 0,
  opacity = 1,
}) => {
  const r = radius * pulse;
  const spikeLen = r * 0.48;
  const knobR = r * 0.22;
  const strokeW = Math.max(1.8, r * 0.16);

  const spikes = [];
  for (let i = 0; i < spikeCount; i++) {
    const angle = (i / spikeCount) * Math.PI * 2 + (rotation * Math.PI) / 180;
    const x1 = cx + Math.cos(angle) * r;
    const y1 = cy + Math.sin(angle) * r;
    const x2 = cx + Math.cos(angle) * (r + spikeLen);
    const y2 = cy + Math.sin(angle) * (r + spikeLen);

    spikes.push(
      <g key={i}>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={strokeW}
          strokeLinecap="round"
        />
        <circle cx={x2} cy={y2} r={knobR} fill={color} />
      </g>
    );
  }

  return (
    <g opacity={opacity}>
      {spikes}
      {/* Central Viral Capsid Sphere */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={innerColor}
        stroke={color}
        strokeWidth={strokeW}
      />
      {/* Surface Reflection Specular Highlight */}
      <circle
        cx={cx - r * 0.3}
        cy={cy - r * 0.3}
        r={r * 0.26}
        fill="#FFFFFF"
        opacity={0.5}
      />
    </g>
  );
};

/**
 * Scene 03: Disease Covered Stickman
 * 
 * Duration: 2 seconds (60 frames @ 30fps) - cut in half per user request
 * Visuals:
 * - Minimalist canonical stickman standing in the center.
 * - Stickman is slumped, visibly feverish and sick (sorrowful open eyes, sad downturned mouth, shiver tremor).
 * - Stickman is covered with disease:
 *   1. Pathogen virus/microbe particles adhering to his head, torso, arms, and legs.
 *   2. Airborne disease microbes floating and swarming around him in brownian drift.
 *   3. Bio-infection cellular rash clusters adhering directly to his tunic and skin.
 *   4. Disease spreads and intensifies over the 2 seconds (60 frames).
 */
export const Scene03_DiseaseCoveredStickman = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Stickman fever tremor & shiver
  const shiverX = Math.sin(frame * 1.6) * 1.8 + Math.cos(frame * 2.3) * 0.9;
  const shiverY = Math.sin(frame * 1.9) * 1.2;

  // 2. Disease intensity & coverage growth over 60 frames (2 seconds)
  const diseaseSpread = interpolate(frame, [0, 45], [0.55, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse oscillation for pathogens
  const pulse1 = 1 + Math.sin(frame * 0.16) * 0.08;
  const pulse2 = 1 + Math.cos(frame * 0.22) * 0.10;
  const pulse3 = 1 + Math.sin(frame * 0.13 + 1.5) * 0.09;

  // Stickman base center coordinates
  const stickmanX = 960 + shiverX;
  const stickmanY = 750 + shiverY;

  // 3. Clinging Pathogen Clusters (Directly on stickman's body parts)
  // Relative to stickman center (960, 750)
  // 3. Clinging Pathogen Accents on Stickman (Lightly distributed, letting stickman breathe)
  const bodyPathogens = [
    { relX: -28, relY: -420, r: 14, color: "#A855F7", inner: "#3B0764", spikes: 7, pulse: pulse1, rot: frame * 0.8 },
    { relX: 30, relY: -390, r: 13, color: "#10B981", inner: "#064E3B", spikes: 6, pulse: pulse2, rot: -frame * 0.9 },
    { relX: -18, relY: -260, r: 16, color: "#EF4444", inner: "#7F1D1D", spikes: 8, pulse: pulse3, rot: frame * 0.6 },
    { relX: 20, relY: -200, r: 15, color: "#8B5CF6", inner: "#2E1065", spikes: 7, pulse: pulse1, rot: -frame * 0.7 },
    { relX: -35, relY: -140, r: 13, color: "#EC4899", inner: "#831843", spikes: 6, pulse: pulse2, rot: frame * 1.0 },
    { relX: 32, relY: -120, r: 14, color: "#10B981", inner: "#064E3B", spikes: 6, pulse: pulse3, rot: -frame * 0.8 },
  ];

  // 4. Cellular bio-rash blemishes adhering directly to the stickman
  const rashSpots = [
    { x: -14, y: -415, r: 5, fill: "#DC2626" },
    { x: 16, y: -400, r: 5, fill: "#7C3AED" },
    { x: -12, y: -280, r: 6, fill: "#EF4444" },
    { x: 14, y: -220, r: 6, fill: "#DC2626" },
    { x: -10, y: -160, r: 6, fill: "#7C3AED" },
  ];

  // 5. Airborne floating pathogen cloud spread out broadly around the stickman
  const airbornePathogens = [
    // --- Top Crown & Upper Perimeters ---
    { baseX: 960,  baseY: 150, speedX: 0.06, speedY: 0.11, ampX: 18, ampY: 14, r: 24, color: "#EF4444", inner: "#7F1D1D", spikes: 9 },
    { baseX: 780,  baseY: 200, speedX: 0.08, speedY: 0.09, ampX: 20, ampY: 16, r: 20, color: "#A855F7", inner: "#3B0764", spikes: 8 },
    { baseX: 1140, baseY: 190, speedX: 0.07, speedY: 0.10, ampX: 16, ampY: 18, r: 22, color: "#10B981", inner: "#064E3B", spikes: 8 },

    // --- Far Left Spread ---
    { baseX: 480,  baseY: 340, speedX: 0.09, speedY: 0.12, ampX: 24, ampY: 18, r: 26, color: "#8B5CF6", inner: "#2E1065", spikes: 8 },
    { baseX: 410,  baseY: 530, speedX: 0.06, speedY: 0.14, ampX: 22, ampY: 20, r: 28, color: "#EF4444", inner: "#7F1D1D", spikes: 10 },
    { baseX: 540,  baseY: 710, speedX: 0.11, speedY: 0.09, ampX: 18, ampY: 15, r: 21, color: "#EC4899", inner: "#831843", spikes: 7 },

    // --- Far Right Spread ---
    { baseX: 1440, baseY: 340, speedX: 0.08, speedY: 0.11, ampX: 24, ampY: 18, r: 26, color: "#10B981", inner: "#064E3B", spikes: 9 },
    { baseX: 1510, baseY: 530, speedX: 0.07, speedY: 0.13, ampX: 20, ampY: 22, r: 27, color: "#EF4444", inner: "#7F1D1D", spikes: 9 },
    { baseX: 1380, baseY: 710, speedX: 0.10, speedY: 0.08, ampX: 18, ampY: 16, r: 22, color: "#A855F7", inner: "#3B0764", spikes: 8 },

    // --- Mid Orbit Surrounding Stickman ---
    { baseX: 700,  baseY: 380, speedX: 0.09, speedY: 0.10, ampX: 16, ampY: 14, r: 21, color: "#EC4899", inner: "#831843", spikes: 7 },
    { baseX: 1220, baseY: 370, speedX: 0.12, speedY: 0.08, ampX: 18, ampY: 16, r: 23, color: "#8B5CF6", inner: "#2E1065", spikes: 8 },
    { baseX: 680,  baseY: 560, speedX: 0.08, speedY: 0.13, ampX: 15, ampY: 18, r: 24, color: "#10B981", inner: "#064E3B", spikes: 8 },
    { baseX: 1240, baseY: 570, speedX: 0.10, speedY: 0.11, ampX: 18, ampY: 15, r: 20, color: "#EF4444", inner: "#7F1D1D", spikes: 8 },

    // --- Lower Flanks & Floor Level ---
    { baseX: 690,  baseY: 760, speedX: 0.07, speedY: 0.12, ampX: 16, ampY: 14, r: 18, color: "#A855F7", inner: "#3B0764", spikes: 7 },
    { baseX: 1230, baseY: 770, speedX: 0.11, speedY: 0.10, ampX: 17, ampY: 13, r: 19, color: "#10B981", inner: "#064E3B", spikes: 7 },
  ];

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans">
      {/* Background Clinical Grid */}
      <GridBackground theme="white" id="grid-s3" />

      {/* Main SVG Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Sickly Toxic Bio-Aura Glow Filter */}
          <filter id="bio-aura-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.65   0 0 0 0 0.15   0 0 0 0 0.85   0 0 0 0.45 0"
            />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Toxic Green/Purple Bio-Aura framing the spread-out virus cloud */}
        <ellipse
          cx={stickmanX}
          cy={stickmanY - 220}
          rx={380 + Math.sin(frame * 0.1) * 25}
          ry={340 + Math.cos(frame * 0.12) * 25}
          fill="#581C87"
          opacity={0.14 * diseaseSpread}
          filter="url(#bio-aura-glow)"
        />
        <ellipse
          cx={stickmanX}
          cy={stickmanY - 220}
          rx={260 + Math.cos(frame * 0.14) * 20}
          ry={280 + Math.sin(frame * 0.11) * 20}
          fill="#15803D"
          opacity={0.10 * diseaseSpread}
        />

        {/* Ground Contact Shadow */}
        <ellipse cx={stickmanX} cy={790} rx={130} ry={20} fill="#000000" opacity={0.15} />

        {/* Canonical Stickman: Slumped in illness with sad open eyes & downturned mouth */}
        <CuratedStickman
          x={stickmanX}
          y={stickmanY}
          scale={1.3}
          variant="adult"
          pose="defeat"
          slumpProgress={0.8}
          mouth="frown"
          eyes="sad-open"
          lookDirection="center"
          showSweat={true}
          frame={frame}
        />

        {/* Cellular Bio-Rash Spots Adhering to Stickman's Body */}
        <g id="rash-spots-group">
          {rashSpots.map((spot, i) => {
            const spotPulse = 1 + Math.sin(frame * 0.18 + i) * 0.12;
            const spotOpacity = interpolate(
              diseaseSpread,
              [0.55, 1.0],
              [0.4 + (i % 3) * 0.2, 0.95]
            );
            return (
              <circle
                key={i}
                cx={stickmanX + spot.x}
                cy={stickmanY + spot.y}
                r={spot.r * spotPulse}
                fill={spot.fill}
                opacity={spotOpacity}
              />
            );
          })}
        </g>

        {/* Pathogens Clinging to Stickman's Body (Covering him) */}
        <g id="clinging-pathogens-group">
          {bodyPathogens.map((p, idx) => {
            const pathScale = interpolate(
              diseaseSpread,
              [0.55, 1.0],
              [0.7, 1.0]
            );
            const pathOpacity = interpolate(
              diseaseSpread,
              [0.55, 1.0],
              [0.65, 1.0]
            );
            return (
              <PathogenParticle
                key={idx}
                cx={stickmanX + p.relX}
                cy={stickmanY + p.relY}
                radius={p.r * pathScale}
                color={p.color}
                innerColor={p.inner}
                spikeCount={p.spikes}
                pulse={p.pulse}
                rotation={p.rot}
                opacity={pathOpacity}
              />
            );
          })}
        </g>

        {/* Airborne Swarming Pathogens (Orbiting around him) */}
        <g id="airborne-pathogens-group">
          {airbornePathogens.map((ap, i) => {
            const posX = ap.baseX + Math.sin(frame * ap.speedX + i) * ap.ampX;
            const posY = ap.baseY + Math.cos(frame * ap.speedY + i) * ap.ampY;
            const airPulse = 1 + Math.sin(frame * 0.15 + i) * 0.08;
            const airRot = frame * (i % 2 === 0 ? 0.9 : -0.9);

            return (
              <PathogenParticle
                key={i}
                cx={posX}
                cy={posY}
                radius={ap.r}
                color={ap.color}
                innerColor={ap.inner}
                spikeCount={ap.spikes}
                pulse={airPulse}
                rotation={airRot}
                opacity={0.88}
              />
            );
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
