import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 107: Pediatric Anger (HEAT)
 * Duration: 180 frames (6.0s)
 * Environment: Minimalist floor.
 * Transition: Continuous from Scene 106.
 * Characters & Props: Child stickman turning dark pulsing red with vibrating heat waves, head replaced by roaring fireball, thermometer spiking and cracking.
 */
export const Scene107_PediatricAngerHEAT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Heat eruption trigger: frames 25 to 65
  const heatSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const heatProgress = interpolate(heatSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Thermometer mercury spike: frames 30 to 70
  const mercuryFill = interpolate(frame, [30, 70], [0.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Thermometer glass crack at frame 70
  const isCracked = frame >= 70;

  // Stickman intense vibration
  const shiverX = Math.sin(frame * 2.6) * 3.5;
  const shiverY = Math.cos(frame * 3.1) * 2.5;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Floor Grid */}
      <TiledFloor
        frame={frame}
        perspectiveOrigin="50% 65%"
        horizonY={580}
        color="#1E293B"
        lineColor="#334155"
      />

      {/* Red Thermal Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 45% 60%, rgba(220, 38, 38, ${heatProgress * 0.35}) 0%, transparent 70%)`,
        }}
      />

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${heatProgress > 0.5 ? "#EF4444" : "#475569"}`,
            boxShadow: heatProgress > 0.5 ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            PEDIATRIC ANGER: HEAT
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-red-400">
            Neurovegetative Rage • Explosive Thermal Sympathetic Surge
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="fireballGlow107" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* WRECKED BOX REMNANTS ON LEFT FLOOR (from Scene 106) */}
        <g transform="translate(420, 780)">
          <path d="M -80 0 L -60 -40 L -20 -10 L 0 0 Z" fill="#475569" opacity="0.6" />
          <path d="M 20 0 L 50 -35 L 70 -15 L 90 0 Z" fill="#475569" opacity="0.6" />
        </g>

        {/* CHILD STICKMAN WITH ROARING FIREBALL HEAD (x=780, y=780) */}
        <g transform={`translate(${780 + shiverX}, ${780 + shiverY})`}>
          {/* Floor Shadow */}
          <ellipse cx="0" cy="18" rx="85" ry="16" fill="#000000" opacity="0.5" />

          {/* AGGRESSIVE RADIATING HEAT WAVES (#991B1B) */}
          {heatProgress > 0 && (
            <g filter="url(#fireballGlow107)">
              {[0, 25, 50].map((offset, i) => {
                const r = ((frame * 2.8 + offset) % 110) + 80;
                const op = Math.max(0, 0.8 - r / 190);

                return (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="-140"
                    rx={r * 0.9}
                    ry={r * 1.3}
                    fill="none"
                    stroke="#991B1B"
                    strokeWidth="4"
                    strokeDasharray="14 6"
                    opacity={op * heatProgress}
                  />
                );
              })}
            </g>
          )}

          {/* Child Stickman Body */}
          <CuratedStickman
            x={0}
            y={0}
            scale={1.2}
            variant="child"
            pose="idle"
            mouth="shock"
            eyes="shock"
            frame={frame}
          />

          {/* ROARING VECTOR FIREBALL REPLACING HEAD (at frame 35) */}
          {heatProgress > 0 && (
            <g
              transform={`translate(0, -220) scale(${heatProgress})`}
              filter="url(#fireballGlow107)"
            >
              {/* Core Fireball */}
              <circle cx="0" cy="0" r="50" fill="#EA580C" />
              <circle cx="0" cy="0" r="32" fill="#F97316" />
              <circle cx="0" cy="0" r="18" fill="#FDE047" />

              {/* Licking Flame Tongues */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
                const flameH = 55 + Math.sin(frame * 0.5 + i) * 18;
                return (
                  <polygon
                    key={ang}
                    points="-10,0 0,-10 10,0 0,0"
                    transform={`rotate(${ang}) translate(0, ${-flameH})`}
                    fill="#EF4444"
                  />
                );
              })}
            </g>
          )}
        </g>

        {/* THERMOMETER RAPIDLY SPIKING & CRACKING (Right: x=1400, y=560) */}
        <g transform="translate(1400, 560)">
          {/* Glass Outer Tube */}
          <rect
            x="-30"
            y="-220"
            width="60"
            height="400"
            rx="30"
            fill="#1E293B"
            stroke="#94A3B8"
            strokeWidth="4"
          />

          {/* Bottom Bulb */}
          <circle cx="0" cy="200" r="60" fill="#EF4444" stroke="#94A3B8" strokeWidth="4" />

          {/* Rising Red Mercury Column */}
          <rect
            x="-18"
            y={180 - mercuryFill * 380}
            width="36"
            height={mercuryFill * 380}
            rx="18"
            fill="#EF4444"
            filter="url(#fireballGlow107)"
          />

          {/* Temperature Tick Marks */}
          {[-180, -120, -60, 0, 60, 120].map((ty, i) => (
            <g key={ty}>
              <line x1="30" y1={ty} x2="45" y2={ty} stroke="#94A3B8" strokeWidth="3" />
              <text x="55" y={ty + 5} fill="#CBD5E1" fontSize="14" fontWeight="800">
                {100 - i * 10}°C
              </text>
            </g>
          ))}

          {/* GLASS CRACKS WHEN MAX HEAT REACHED (frame >= 70) */}
          {isCracked && (
            <g stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round">
              <path d="M -20 -190 L 10 -160 L -15 -130 L 18 -100" />
              <path d="M 10 -160 L 25 -180" />
              <path d="M -15 -130 L -25 -110" />
              {/* Boiling Sizzle Vapor Particles */}
              <circle cx={-10 + (frame % 20)} cy={-230 - (frame % 30)} r="4" fill="#FCA5A5" />
              <circle cx={15 - (frame % 15)} cy={-240 - (frame % 25)} r="5" fill="#EF4444" />
            </g>
          )}

          {/* Thermometer Warning Stamp */}
          {isCracked && (
            <g transform="translate(0, 310)">
              <rect x="-140" y="-20" width="280" height="40" rx="10" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2" />
              <text x="0" y="6" fill="#FEE2E2" fontSize="15" fontWeight="900" textAnchor="middle" letterSpacing="2">
                MAX THERMAL OVERLOAD
              </text>
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
