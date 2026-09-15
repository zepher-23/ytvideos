import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 105: pediatric stickmen
 * Duration: 180 frames (6.0s)
 * Environment: Zoomed in on Child and Teen from Scene 104.
 * Characters & Props: Child & Teen stickmen turning away from each other, crossing arms, turning frustrated sullen grey (#94A3B8); "FROWN" badge above.
 */
export const Scene105_pediatricstickmen = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance zoom spring
  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const zoomScale = interpolate(zoomSpring, [0, 1], [0.85, 1]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Turning away & sulking action: frames 35 to 65
  const turnSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const turnProgress = interpolate(turnSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Frown badges entrance at frame 70
  const frownSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const frownScale = interpolate(frownSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B0F19",
      }}
    >
      {/* Background Subtle Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="grid105" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#64748B" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid105)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `scale(${zoomScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(148, 163, 184, 0.4)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            CHRONIC PERSISTENT IRRITABILITY
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Between Outbursts: Sullen, Frustrated, and Permanently Irritable Baseline
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `scale(${zoomScale})`, transformOrigin: "960px 650px" }}
      >
        {/* Floor Line */}
        <line x1="240" y1="830" x2="1680" y2="830" stroke="#334155" strokeWidth="4" />

        {/* 1. CHILD STICKMAN (Left: x=680, turns left away from teen) */}
        <g
          transform={`
            translate(${680 - turnProgress * 60}, 810)
            scale(${interpolate(turnProgress, [0, 1], [1, -1])}, 1)
          `}
        >
          {/* Floor Shadow */}
          <ellipse cx="0" cy="18" rx="80" ry="14" fill="#000000" opacity="0.4" />

          {/* Child Stickman */}
          <CuratedStickman
            x={0}
            y={0}
            scale={1.2}
            variant="child"
            pose="defeat"
            mouth="frown"
            eyes="defeat"
            slumpProgress={0.4}
            frame={frame}
          />
        </g>

        {/* 2. TEEN STICKMAN (Right: x=1240, turns right away from child) */}
        <g
          transform={`
            translate(${1240 + turnProgress * 60}, 810)
          `}
        >
          <ellipse cx="0" cy="18" rx="90" ry="16" fill="#000000" opacity="0.4" />

          <CuratedStickman
            x={0}
            y={0}
            scale={1.4}
            variant="adult"
            pose="defeat"
            mouth="frown"
            eyes="defeat"
            slumpProgress={0.35}
            frame={frame}
          />
        </g>

        {/* EXPRESSIVE "FROWN" BADGES OVER BOTH HEADS */}
        {frame >= 70 && (
          <g>
            {/* Frown Icon Over Child (x=620, y=360) */}
            <g transform={`translate(620, 360) scale(${frownScale})`}>
              <circle cx="0" cy="0" r="50" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
              {/* Eyes */}
              <circle cx="-16" cy="-10" r="6" fill="#94A3B8" />
              <circle cx="16" cy="-10" r="6" fill="#94A3B8" />
              {/* Downward Frown Mouth Arc */}
              <path d="M -25 25 Q 0 5 25 25" fill="none" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* Frown Icon Over Teen (x=1300, y=320) */}
            <g transform={`translate(1300, 320) scale(${frownScale})`}>
              <circle cx="0" cy="0" r="50" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
              <circle cx="-16" cy="-10" r="6" fill="#94A3B8" />
              <circle cx="16" cy="-10" r="6" fill="#94A3B8" />
              <path d="M -25 25 Q 0 5 25 25" fill="none" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* Bottom Callout Banner */}
            <g transform="translate(960, 930)">
              <rect x="-240" y="-25" width="480" height="50" rx="14" fill="#1E293B" stroke="#EF4444" strokeWidth="2.5" />
              <text x="0" y="7" fill="#FCA5A5" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="3">
                PERSISTENT ANGRY MOOD BASELINE
              </text>
            </g>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
