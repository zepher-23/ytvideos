import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 71: The Crushing Return
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Dark minimalist floor (#0F172A).
 * - Characters & Props: Stickman, fleeting yellow aura, violent 1-TON weight drop,
 *   snapping storm cloud, torrential rain lines.
 * - Beginning (0-25f): Stickman smiles in warm golden aura from Scene 70.
 * - Action/Climax (25-65f): Massive 1-TON iron weight violently drops from above, flattening the stickman
 *   and shattering the yellow aura into shards.
 * - Ending/Hold (65-150f): Dark storm cloud snaps into position overhead, pouring heavy rain over the crushed weight.
 */
export const Scene071_TheCrushingReturn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // 1-TON Weight Falling Drop (starts at frame 22, hits at frame 36)
  const isDropping = frame >= 22;
  const dropAge = Math.max(0, frame - 22);
  const dropSpring = spring({
    frame: dropAge,
    fps,
    config: { damping: 10, stiffness: 220, mass: 2 },
  });
  const weightY = !isDropping ? -280 : interpolate(dropSpring, [0, 1], [-280, 690]);

  const isImpact = frame >= 36;
  const impactAge = Math.max(0, frame - 36);

  // Screen shake on violent 1-TON impact
  const shakeX = isImpact && impactAge < 25 ? Math.sin(impactAge * 2.5) * Math.max(0, 18 - impactAge * 0.7) : 0;
  const shakeY = isImpact && impactAge < 25 ? Math.cos(impactAge * 2.8) * Math.max(0, 15 - impactAge * 0.6) : 0;

  // Stickman squash dynamics
  const stickmanScaleY = !isImpact ? 1.05 : interpolate(impactAge, [0, 6, 25], [1.05, 0.38, 0.45], { extrapolateRight: "clamp" });
  const stickmanScaleX = !isImpact ? 1.05 : interpolate(impactAge, [0, 6, 25], [1.05, 1.4, 1.3], { extrapolateRight: "clamp" });

  // Yellow aura shatter & extinction
  const auraOpacity = !isImpact ? 0.6 : interpolate(impactAge, [0, 8], [0.6, 0], { extrapolateRight: "clamp" });

  // Dark Cloud snapping into overhead position (frame >= 55)
  const isCloudSnapped = frame >= 55;
  const cloudAge = Math.max(0, frame - 55);
  const cloudY = isCloudSnapped ? interpolate(cloudAge, [0, 15], [100, 360], { extrapolateRight: "clamp" }) : 100;
  const cloudOpacity = isCloudSnapped ? interpolate(cloudAge, [0, 10], [0, 1], { extrapolateRight: "clamp" }) : 0;

  return (
    <AbsoluteFill
      className="bg-[#0F172A] overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Subtle Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s71" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s71)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-black/85 border border-red-700/80 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-red-400 font-bold uppercase block mb-0.5">
            REJECTION SENSITIVITY
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            THE CRUSHING RETURN
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="weight-heavy-s71" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Floor Line */}
        <line x1="200" y1="830" x2="1720" y2="830" stroke="#334155" strokeWidth="4" />

        {/* 1. TRANSIENT YELLOW AURA (Shatters on Impact) */}
        {auraOpacity > 0 && (
          <ellipse
            cx="960"
            cy="780"
            rx="180"
            ry="90"
            fill="#FEF08A"
            opacity={auraOpacity}
          />
        )}

        {/* 2. CURATED STICKMAN (Squashed vertically by 1-TON weight) */}
        <g
          transform={`translate(960, 830) scale(${stickmanScaleX}, ${stickmanScaleY}) translate(-960, -830)`}
        >
          <g transform="translate(960, 830)">
            <CuratedStickman
              x={0}
              y={0}
              scale={1.1}
              pose={isImpact ? "defeat" : "content"}
              mouth={isImpact ? "frown" : "smile"}
              eyes={isImpact ? "defeat" : "normal"}
              frame={frame}
            />
          </g>
        </g>

        {/* 3. MASSIVE 1-TON CAST-IRON WEIGHT (Drops at frame 22, hits at 36) */}
        <g transform={`translate(960, ${weightY})`} filter="url(#weight-heavy-s71)">
          {/* Iron Handle Ring */}
          <path d="M -40 -120 C -40 -170, 40 -170, 40 -120" fill="none" stroke="#475569" strokeWidth="16" strokeLinecap="round" />
          {/* Heavy Trapezoidal Weight Body */}
          <polygon
            points="-180,120 180,120 130,-120 -130,-120"
            fill="#0F172A"
            stroke="#334155"
            strokeWidth="6"
          />
          {/* Embossed "1 TON" Typography */}
          <text x="0" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="64" fontWeight="900" letterSpacing="4">
            1 TON
          </text>
          <text x="0" y="65" textAnchor="middle" fill="#94A3B8" fontSize="16" fontWeight="bold" letterSpacing="3">
            REJECTION LOAD
          </text>

          {/* Impact Dust Clouds */}
          {isImpact && impactAge < 25 && (
            <g>
              <ellipse cx="-160" cy="120" rx={impactAge * 6} ry={impactAge * 3} fill="#64748B" opacity={1 - impactAge / 25} />
              <ellipse cx="160" cy="120" rx={impactAge * 6} ry={impactAge * 3} fill="#64748B" opacity={1 - impactAge / 25} />
            </g>
          )}
        </g>

        {/* 4. RETURNING DARK STORM CLOUD (Snaps into position overhead) */}
        {cloudOpacity > 0 && (
          <g transform={`translate(960, ${cloudY})`} opacity={cloudOpacity}>
            <path
              d="M -160 0 Q -110 -80 0 -60 Q 90 -90 170 -35 Q 240 -15 220 65 Q 180 120 90 105 Q 0 130 -80 95 Q -180 105 -160 0 Z"
              fill="#1E293B"
              stroke="#334155"
              strokeWidth="5"
            />
            {/* Torrential Black Rain Lines */}
            {[-120, -80, -40, 0, 40, 80, 120].map((rx, i) => (
              <line
                key={i}
                x1={rx}
                y1="105"
                x2={rx - 18}
                y2={220}
                stroke="#475569"
                strokeWidth="3.5"
                strokeDasharray="6 6"
              />
            ))}
          </g>
        )}
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-red-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-red-300">
            REJECTION SENSITIVITY: THE SLIGHTEST SOCIAL SLIGHT IMMEDIATELY OBLITERATES TRANSIENT JOY INTO SEVERE RELAPSE
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
