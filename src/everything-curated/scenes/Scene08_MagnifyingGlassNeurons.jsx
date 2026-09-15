import React from "react";
import { useCurrentFrame, interpolate, AbsoluteFill } from "remotion";
import { GridBackground } from "../../shared/environments/GridBackground";
import { Neuron, NEURON_SVG_PATH } from "../../shared/props/Neuron";
import { MagnifyingGlass } from "../../shared/props/MagnifyingGlass";

/**
 * Scene 08: Magnifying Glass Over Neurons
 * Duration: 3 seconds (90 frames @ 30fps)
 * 
 * Concept:
 * - A high-detail scientific magnifying glass enters and glides across the scene
 * - Three neurons are positioned across the medical grid
 * - As the magnifying glass moves over each neuron:
 *   1. The neuron under the lens becomes distinctly larger (optical magnification)
 *   2. A subtle action-potential pulse radiates from the neuron's center to its branch ends
 */
export const Scene08_MagnifyingGlassNeurons = ({ frame: propFrame }) => {
  const frame = propFrame ?? useCurrentFrame();

  // === 1. Neuron Positions & Base Scales (matching Scene 04 proportions) ===
  const neurons = [
    { id: "n1", x: 500,  y: 520, baseScale: 0.38, rot: -12 },
    { id: "n2", x: 960,  y: 440, baseScale: 0.40, rot: 8   },
    { id: "n3", x: 1420, y: 540, baseScale: 0.38, rot: -6  },
  ];

  // === 2. Magnifying Glass Path Trajectory ===
  // Glides smoothly from off-screen left, passing over Neuron 1, then Neuron 2, then Neuron 3
  const glassX = interpolate(
    frame,
    [0, 22, 34, 52, 64, 84, 90],
    [-150, 500, 520, 960, 980, 1420, 1450],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const glassY = interpolate(
    frame,
    [0, 22, 34, 52, 64, 84, 90],
    [260, 520, 515, 440, 445, 540, 535],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lensRadius = 150;
  const innerLensRadius = 136; // interior clear aperture

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Canonical White Grid Background */}
      <GridBackground theme="white" id="grid-s8" />

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* User Neuron Living Gradient (Canonical from Scene 04) */}
          <linearGradient id="user-neuron-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FCA5A5" />
            <stop offset="65%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* Bioluminescent Neuron Glow Filter (Canonical from Scene 04) */}
          <filter id="neuron-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="5"
              floodColor="#EF4444"
              floodOpacity="0.85"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2"
              floodColor="#FFFFFF"
              floodOpacity="0.95"
            />
          </filter>

          {/* Circular ClipPath for Optical Lens Interior */}
          <clipPath id="s8-lens-aperture">
            <circle cx={glassX} cy={glassY} r={innerLensRadius} />
          </clipPath>

          {/* Interior Action Potential Wave Gradients (strictly inside each Scene 04-style neuron) */}
          {neurons.map((n, idx) => {
            // Distance from magnifying glass center to this neuron center
            const dist = Math.hypot(n.x - glassX, n.y - glassY);
            
            // Optical proximity (1 = directly centered under lens, 0 = outside)
            const proximity = interpolate(
              dist,
              [0, lensRadius * 0.45, lensRadius * 1.1],
              [1, 0.85, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Subtle action potential: slower, calm biological propagation (36 frames ~ 1.2s)
            const cycle = 36;
            const p = ((frame + idx * 12) % cycle) / cycle; // 0 to 1
            const pPct = Math.round(p * 100);

            // Broader, softer travelling waveband inside the neuron
            const pStart = Math.max(0, pPct - 24);
            const pPeak = pPct;
            const pEnd = Math.min(100, pPct + 24);

            // Scene 04 crimson/coral living palette with subtle luminous wave
            const restingDark = "#991B1B";
            const restingMid = "#DC2626";
            const waveGlow = proximity > 0.1 ? "#F87171" : restingMid;
            const waveHighlight = proximity > 0.1 ? "#FECACA" : "#FCA5A5";

            return (
              <radialGradient
                id={`s8-neuron-pulse-grad-${n.id}`}
                key={`grad-${n.id}`}
                cx="113.085"
                cy="131.295"
                r="145"
                fx="113.085"
                fy="131.295"
                gradientUnits="userSpaceOnUse"
              >
                {/* Soft soma core pulse */}
                <stop
                  offset="0%"
                  stopColor={p < 0.25 && proximity > 0.1 ? "#FFFFFF" : waveHighlight}
                  stopOpacity={0.95}
                />
                <stop offset={`${Math.max(0, pStart - 8)}%`} stopColor={restingMid} />

                {/* Soft leading edge */}
                <stop offset={`${pStart}%`} stopColor={waveGlow} stopOpacity={0.9} />

                {/* Wavefront crest: gentle luminous coral highlight */}
                <stop offset={`${pPeak}%`} stopColor={waveHighlight} stopOpacity={0.95} />

                {/* Soft trailing edge */}
                <stop offset={`${pEnd}%`} stopColor={waveGlow} stopOpacity={0.9} />
                <stop offset={`${Math.min(100, pEnd + 8)}%`} stopColor={restingMid} />

                {/* Branch tips resting color */}
                <stop offset="100%" stopColor={restingDark} />
              </radialGradient>
            );
          })}
        </defs>

        {/* ============================================================== */}
        {/* LAYER 1: BASE NORMAL NEURONS (Outside the magnifying glass)    */}
        {/* Identical to Scene 04 living red neurons with glow             */}
        {/* ============================================================== */}
        <g id="base-neurons">
          {neurons.map((n) => {
            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y}) rotate(${n.rot})`}
              >
                <Neuron
                  id={`base-${n.id}`}
                  scale={n.baseScale}
                  fill="url(#user-neuron-grad)"
                  stroke="#FFFFFF"
                  strokeWidth={1.2}
                  filter="url(#neuron-glow)"
                  showNucleus={true}
                  nucleusColor="#FFFFFF"
                />
              </g>
            );
          })}
        </g>

        {/* ============================================================== */}
        {/* LAYER 2: MAGNIFIED & PULSING NEURONS (Clipped to Lens Window)  */}
        {/* ============================================================== */}
        <g id="magnified-lens-layer" clipPath="url(#s8-lens-aperture)">
          {/* Subtle warm lens background tint inside aperture */}
          <circle
            cx={glassX}
            cy={glassY}
            r={innerLensRadius}
            fill="#EF4444"
            fillOpacity="0.04"
          />

          {neurons.map((n, idx) => {
            // Distance from magnifying glass center to this neuron center
            const dist = Math.hypot(n.x - glassX, n.y - glassY);
            
            // Optical proximity (1 = directly centered under lens, 0 = outside)
            const proximity = interpolate(
              dist,
              [0, lensRadius * 0.45, lensRadius * 1.1],
              [1, 0.85, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // True optical magnification: 1.85x scale when centered
            const magnifiedScale = n.baseScale * 1.85;

            // Cycle for subtle soma nucleus breathing
            const cycle = 36;
            const p = ((frame + idx * 12) % cycle) / cycle;

            return (
              <g
                key={`mag-${n.id}`}
                transform={`translate(${n.x}, ${n.y}) rotate(${n.rot})`}
              >
                {/* Magnified Neuron: Scene 04 aesthetic with subtle interior action potential wave */}
                <Neuron
                  id={`mag-${n.id}`}
                  scale={magnifiedScale}
                  fill={`url(#s8-neuron-pulse-grad-${n.id})`}
                  stroke="#FFFFFF"
                  strokeWidth={1.4}
                  showNucleus={true}
                  nucleusColor={p < 0.25 && proximity > 0.1 ? "#FFFFFF" : "#FEE2E2"}
                />
              </g>
            );
          })}

          {/* Optical refraction / chromatic ring around the inner edge of the lens */}
          <circle
            cx={glassX}
            cy={glassY}
            r={innerLensRadius - 2}
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.5"
            opacity="0.25"
          />
        </g>

        {/* ============================================================== */}
        {/* LAYER 3: THE PHYSICAL MAGNIFYING GLASS PROP (Overlays all)     */}
        {/* ============================================================== */}
        <MagnifyingGlass
          x={glassX}
          y={glassY}
          radius={lensRadius}
          rotation={38}
          scale={1.0}
          id="scene08-glass"
        />
      </svg>
    </AbsoluteFill>
  );
};
