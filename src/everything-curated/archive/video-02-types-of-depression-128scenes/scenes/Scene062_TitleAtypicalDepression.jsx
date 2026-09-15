import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 62: Title - Atypical Depression
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Clean clinical infographic space on pure white (#FFFFFF).
 * - Characters & Props: Large title typography, high-precision SVG pie chart (80% Atypical purple slice vs 20% Classic slate).
 * - Beginning (0-20f): Screen is clean white with subtle technical grid.
 * - Action/Climax (20-80f): "5. ATYPICAL DEPRESSION" types cleanly. Pie chart draws in; the dominant 80% Atypical slice sweeps open.
 * - Ending/Hold (80-150f): Dominant purple slice pulses softly in place with telemetry badges.
 */
export const Scene062_TitleAtypicalDepression = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Typewriter title
  const fullTitle = "5. ATYPICAL DEPRESSION";
  const titleChars = Math.floor(
    interpolate(frame, [15, 45], [0, fullTitle.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayedTitle = fullTitle.slice(0, titleChars);

  // Pie chart draw progression (frames 35 to 80)
  const pieProgress = interpolate(frame, [35, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dominant slice pulse
  const isPieReady = frame >= 80;
  const slicePulse = isPieReady ? 1 + Math.sin((frame - 80) * 0.18) * 0.03 : 1;

  // Pie chart geometry: Center (960, 620), Radius 180
  // 80% of 360 deg = 288 deg. 20% = 72 deg.
  const r = 190;
  const currentAngle = pieProgress * 288;
  const rad = ((currentAngle - 90) * Math.PI) / 180;
  const endX = 960 + Math.cos(rad) * r;
  const endY = 620 + Math.sin(rad) * r;
  const largeArcFlag = currentAngle > 180 ? 1 : 0;
  const atypicalPath =
    currentAngle > 0
      ? `M 960 620 L 960 ${620 - r} A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
      : "";

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans text-slate-900">
      {/* Background Technical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s62" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s62)" />
      </svg>

      {/* Title Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="flex flex-col items-center">
          <div className="mb-3 px-6 py-1.5 rounded-full bg-purple-100 border border-purple-300 shadow-sm">
            <span className="text-xs font-mono tracking-widest text-purple-800 font-bold uppercase">
              DEPRESSIVE SUBTYPE 05
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-wider text-slate-900 m-0 uppercase text-center leading-tight">
            {displayedTitle}
            {frame < 50 && <span className="text-purple-600 animate-pulse">|</span>}
          </h1>
          <p className="text-base md:text-lg font-bold tracking-widest text-purple-700 uppercase mt-2 mb-0">
            THE CLINICAL PARADOX & REVERSED VEGETATIVE SIGNS
          </p>
        </div>
      </div>

      {/* MAIN PIE CHART STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="purple-glow-s62" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="20" floodColor="#A855F7" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. SLICE 2: 20% CLASSIC / MELANCHOLIC (Base Circle Background) */}
        <g transform="translate(960, 620)">
          <circle cx="0" cy="0" r="190" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="4" />
          {/* Label for 20% Classic Slice (Top Left) */}
          <g transform="translate(-160, -90)">
            <text x="0" y="0" textAnchor="middle" fill="#475569" fontSize="16" fontWeight="bold">
              20% CLASSIC
            </text>
          </g>
        </g>

        {/* 2. SLICE 1: 80% ATYPICAL DOMINANT SLICE (Animated Purple Wedge) */}
        {atypicalPath && (
          <g filter="url(#purple-glow-s62)">
            <path
              d={atypicalPath}
              fill="#A855F7"
              stroke="#7E22CE"
              strokeWidth="4"
              style={{
                transform: `scale(${slicePulse})`,
                transformOrigin: "960px 620px",
              }}
            />
          </g>
        )}

        {/* Center Donut Hole Cap */}
        <g transform="translate(960, 620)">
          <circle cx="0" cy="0" r="70" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="6" />
          <text x="0" y="8" textAnchor="middle" fill="#7E22CE" fontSize="24" fontWeight="900">
            80%
          </text>
        </g>

        {/* Callout Indicator Tag for 80% Atypical Slice */}
        {isPieReady && (
          <g transform="translate(1220, 560)">
            <polyline points="0,0 60,-30 260,-30" fill="none" stroke="#A855F7" strokeWidth="3" />
            <circle cx="0" cy="0" r="5" fill="#A855F7" />
            <rect x="70" y="-70" width="280" height="50" rx="12" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" />
            <text x="85" y="-45" fill="#7E22CE" fontSize="14" fontWeight="900" letterSpacing="1">
              DOMINANT PRESENTATION
            </text>
            <text x="85" y="-28" fill="#6B21A8" fontSize="12" fontWeight="bold">
              OUTPATIENT POPULATION
            </text>
          </g>
        )}
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-purple-500/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-purple-200">
            THE MISNOMER: DESPITE THE "ATYPICAL" LABEL, IT REPRESENTS ~80% OF ALL OUTPATIENT CLINICAL CASES
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
