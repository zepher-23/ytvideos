import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 27: Chronic baseline
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Minimalist graph space (#0A0F1D)
 * - Transition: Zoom out on dark water, turning into a low horizontal baseline
 * - Beginning: Perfectly straight horizontal purple line (#A855F7) at bottom of chart (frames 0-30).
 * - Action/Climax: Calendar pages ("JAN", "FEB", "MAR"...) flip rapidly across top (frames 30-120).
 * - Ending/Hold: Text "YEARS" types next to flipping pages to frame 180.
 */
export const Scene027_Chronicbaseline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance zoom-out
  const enterScale = interpolate(frame, [0, 15], [1.3, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Rapid Flipping Calendar Months:
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC", "YEAR 2", "YEAR 3+"];
  // Month changes every 7 frames between frames 30 and 130
  const monthIdx = frame < 30
    ? 0
    : Math.min(months.length - 1, Math.floor((frame - 30) / 7));
  const activeMonth = months[monthIdx];

  // 3. Typewriter for "YEARS OF PERVASIVE LOW BASELINE" (frames 85 to 135)
  const fullText = "YEARS OF CONTINUOUS DEFICIT";
  const charCount = Math.floor(interpolate(frame, [85, 130], [0, fullText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  const displayedText = fullText.slice(0, charCount);

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Background Technical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="grid-s27" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#A855F7" strokeWidth="1" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s27)" />
      </svg>

      {/* Main Viewport Container */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#1E293B]/95 border border-purple-500/50 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-purple-400 uppercase block mb-1">
              CHRONIC TIMELINE ARCHITECTURE
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              PERSISTENT LOW BASELINE
            </h1>
          </div>
        </div>

        {/* Graph SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Purple Line Glow */}
            <filter id="purple-glow-s27" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#A855F7" floodOpacity="0.95" />
            </filter>
          </defs>

          {/* Coordinate Axes */}
          <line x1="180" y1="240" x2="180" y2="880" stroke="#475569" strokeWidth="3" />
          <line x1="180" y1="880" x2="1760" y2="880" stroke="#475569" strokeWidth="3" />

          {/* Normal Expected Baseline Reference (y = 460) */}
          <line x1="180" y1="460" x2="1760" y2="460" stroke="#334155" strokeWidth="2.5" strokeDasharray="8 6" />
          <text x="210" y="445" fill="#64748B" fontSize="16" fontWeight="700" letterSpacing="2">
            NORMAL EUHYMIC BASELINE (100%)
          </text>

          {/* CHRONIC LOW PURPLE BASELINE (y = 800) */}
          <g filter="url(#purple-glow-s27)">
            <line
              x1="180"
              y1="800"
              x2="1760"
              y2="800"
              stroke="#A855F7"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Shaded Deficit Gap between Normal and Chronic */}
            <rect
              x="180"
              y="460"
              width="1580"
              height="340"
              fill="#A855F7"
              fillOpacity="0.06"
            />
          </g>

          {/* Low Baseline Label Badge */}
          <g transform="translate(420, 755)">
            <rect x="-110" y="-18" width="220" height="36" rx="8" fill="#18181B" stroke="#A855F7" strokeWidth="2.5" />
            <text x="0" y="6" textAnchor="middle" fill="#E9D5FF" fontSize="14" fontWeight="900" letterSpacing="1">
              CHRONIC LOW BASELINE
            </text>
          </g>
        </svg>

        {/* Rapid Flipping Calendar Card at Top Right (x=1200, y=280) */}
        <div className="absolute right-32 top-64 flex items-center gap-8 pointer-events-none z-20">
          {/* Flipping Calendar Page Box */}
          <div className="w-[200px] h-[220px] bg-white rounded-3xl border-4 border-black shadow-2xl p-4 flex flex-col justify-between items-center text-black">
            <div className="w-full h-8 bg-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-mono text-xs font-bold tracking-widest uppercase">
                CALENDAR
              </span>
            </div>
            <span className="text-5xl font-black font-mono tracking-tight text-purple-950 my-auto">
              {activeMonth}
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              CONTINUOUS SPAN
            </span>
          </div>

          {/* Typewriter Text "YEARS" */}
          <div className="w-[380px] flex flex-col items-start">
            <span className="text-5xl md:text-6xl font-black text-purple-400 font-mono tracking-widest uppercase block drop-shadow-[0_0_20px_#A855F7]">
              {frame >= 70 ? "YEARS" : ""}
            </span>
            <p className="text-sm font-mono text-slate-300 font-bold tracking-wider uppercase mt-2">
              {displayedText}
            </p>
          </div>
        </div>

        {/* Bottom Trajectory Banner */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-black/95 border border-purple-500/50 shadow-2xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-purple-300">
              MINIMUM CRITERIA: 2 FULL YEARS OF UNBROKEN CHRONIC SUPPRESSION
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
