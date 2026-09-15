import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 31: Hourglass Years
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Abstract time-passing space (#0A0F1D)
 * - Characters & Props: Giant glass hourglass, calendar cards (2024, 2025, 2026), pouring sand (#334155)
 * - Beginning: Giant hourglass displayed. Text "2 CONTINUOUS YEARS" appears (frames 0-40).
 * - Action/Climax: Dark grey sand pours continuously. Year calendar cards flip rapidly on right.
 * - Ending/Hold: Sand relentlessly piles up, burying the year icons to frame 210.
 */
export const Scene031_HourglassYears = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance wipe
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Sand level progress (pours from frame 15 to 210)
  const sandStreamActive = frame >= 15;
  const bottomSandHeight = interpolate(frame, [15, 210], [15, 140], { extrapolateRight: "clamp" });
  const topSandHeight = interpolate(frame, [15, 210], [130, 20], { extrapolateRight: "clamp" });

  // Sand stream animation
  const streamOffset = (frame * 12) % 30;

  // 3. Calendar Year Cards on Right: 2024 -> 2025 -> 2026
  const activeYear = frame < 70 ? "2024" : frame < 140 ? "2025" : "2026+";

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Background Subtle Star Points */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="stars-s31" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1.5" fill="#94A3B8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars-s31)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6"
        style={{ opacity: enterOpacity }}
      >
        <div className="px-10 py-3.5 rounded-2xl bg-[#1E293B]/95 border border-purple-500/50 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase block mb-1">
            DURATION CRITERIA // PDD
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
            2 CONTINUOUS YEARS
          </h1>
        </div>
      </div>

      {/* Main SVG Stage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 1600 900"
          className="w-[1400px] h-[780px] overflow-visible"
        >
          <defs>
            <filter id="hourglass-glow-s31" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#38BDF8" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* GIANT HOURGLASS (Left Center x=620, y=470) */}
          <g transform="translate(620, 470)" filter="url(#hourglass-glow-s31)">
            {/* Top & Bottom Wood Plates */}
            <rect x="-180" y="-300" width="360" height="30" rx="10" fill="#334155" stroke="#475569" strokeWidth="4" />
            <rect x="-180" y="270" width="360" height="30" rx="10" fill="#334155" stroke="#475569" strokeWidth="4" />

            {/* Vertical Support Struts */}
            <line x1="-150" y1="-270" x2="-150" y2="270" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <line x1="150" y1="-270" x2="150" y2="270" stroke="#475569" strokeWidth="8" strokeLinecap="round" />

            {/* Glass Hourglass Shell */}
            <path
              d="M -130 -270
                 C -130 -120 -30 -30 -16 0
                 C -30 30 -130 120 -130 270
                 L 130 270
                 C 130 120 30 30 16 0
                 C 30 -30 130 -120 130 -270 Z"
              fill="#0F172A"
              fillOpacity="0.45"
              stroke="#38BDF8"
              strokeWidth="6"
            />

            {/* TOP BULB SAND (Depletes over time) */}
            <path
              d={`M -${topSandHeight * 0.8} -${270 - topSandHeight}
                  Q 0 -${260 - topSandHeight} ${topSandHeight * 0.8} -${270 - topSandHeight}
                  C ${topSandHeight * 0.6} -140 20 -20 0 0
                  C -20 -20 -${topSandHeight * 0.6} -140 -${topSandHeight * 0.8} -${270 - topSandHeight} Z`}
              fill="#475569"
            />

            {/* FALLING SAND STREAM THROUGH NECK */}
            {sandStreamActive && (
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="250"
                stroke="#64748B"
                strokeWidth="5"
                strokeDasharray="8 6"
                strokeDashoffset={-streamOffset}
                strokeLinecap="round"
              />
            )}

            {/* BOTTOM BULB ACCUMULATING SAND (#334155 / #475569) */}
            <path
              d={`M -${bottomSandHeight * 0.85} 270
                  Q 0 ${270 - bottomSandHeight} ${bottomSandHeight * 0.85} 270 Z`}
              fill="#475569"
              stroke="#64748B"
              strokeWidth="2"
            />
          </g>

          {/* RIGHT SIDE CAR: CALENDAR YEAR CARDS (x=1160, y=470) */}
          <g transform="translate(1160, 470)">
            {/* Calendar Stack Container */}
            <rect x="-180" y="-180" width="360" height="340" rx="28" fill="#1E293B" stroke="#A855F7" strokeWidth="5" />
            <rect x="-180" y="-180" width="360" height="75" rx="28" fill="#7E22CE" />

            {/* Header Text */}
            <text x="0" y="-132" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900" letterSpacing="4">
              CHRONIC TIMELINE
            </text>

            {/* Active Year Display */}
            <text x="0" y="30" textAnchor="middle" fill="#F3E8FF" fontSize="72" fontFamily="monospace" fontWeight="900" letterSpacing="4">
              {activeYear}
            </text>

            {/* Accumulated Sand Mound covering bottom of calendar */}
            <path
              d={`M -180 160 Q 0 ${160 - (bottomSandHeight / 140) * 80} 180 160 Z`}
              fill="#475569"
              opacity="0.85"
            />

            <text x="0" y="110" textAnchor="middle" fill="#A855F7" fontSize="16" fontWeight="900" letterSpacing="2">
              730+ CONSECUTIVE DAYS
            </text>
          </g>
        </svg>
      </div>

      {/* Bottom Subtitle Card */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
        <div className="px-10 py-3 rounded-2xl bg-black/95 border border-purple-500/50 shadow-2xl">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-purple-300">
            THE ACCUMULATION OF UNREMITTING LOW MOOD // NO RESPITE OVER 24 MONTHS
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
