import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 20: episodic Graph
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Minimalist graph space
 * - Characters & Props: Coordinate graph, horizontal line plunging 90 deg into trench
 * - Beginning: Steady horizontal normal baseline across middle (frames 0-50). Text "NORMAL BASELINE".
 * - Action/Climax: Line takes violent 90-degree downward turn, plunging straight down into
 *   a deep trench at bottom, turning red (#DC2626) (frames 50-85). Text "ACUTE DROP".
 * - Ending/Hold: Line flatlines completely at bottom of trench to frame 210.
 */
export const Scene020_episodicGraph = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance zoom-in
  const enterScale = interpolate(frame, [0, 15], [1.3, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Line Drawing Progress:
  // - 0 to 45: draws normal baseline from x=200 to x=920 at y=460 (progress 0 to 1)
  // - 48 to 72: vertical 90-deg plunge from y=460 down to y=840 at x=920
  // - 75 to 130: horizontal flatline in trench from x=920 to x=1720 at y=840
  const baselineX = interpolate(frame, [8, 48], [200, 920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dropY = interpolate(frame, [48, 72], [460, 840], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const flatlineX = interpolate(frame, [72, 135], [920, 1720], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isDropping = frame >= 48;
  const isFlatlining = frame >= 72;

  // Typewriter for "ACUTE DROP" (frames 65 to 95)
  const acuteText = "ACUTE DROP";
  const acuteChars = Math.floor(interpolate(frame, [65, 88], [0, acuteText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Background Technical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="graph-grid-s20" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#graph-grid-s20)" />
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
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block mb-1">
              LONGITUDINAL TRAJECTORY // MDD
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              EPISODIC PLUNGE DYNAMICS
            </h1>
          </div>
        </div>

        {/* Graph SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Red Plunge Glow */}
            <filter id="plunge-glow-s20" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#DC2626" floodOpacity="0.95" />
            </filter>
          </defs>

          {/* Coordinate Axes */}
          <line x1="180" y1="260" x2="180" y2="920" stroke="#475569" strokeWidth="3" />
          <line x1="180" y1="920" x2="1760" y2="920" stroke="#475569" strokeWidth="3" />

          {/* Y-Axis Tick Labels */}
          <text x="140" y="465" textAnchor="end" fill="#94A3B8" fontSize="14" fontWeight="700">100%</text>
          <text x="140" y="650" textAnchor="end" fill="#94A3B8" fontSize="14" fontWeight="700">50%</text>
          <text x="140" y="845" textAnchor="end" fill="#EF4444" fontSize="14" fontWeight="700">0%</text>

          {/* Horizontal Reference Line: Baseline Level (y = 460) */}
          <line x1="180" y1="460" x2="1760" y2="460" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />

          {/* 1. NORMAL BASELINE (Cyan/Green line, x=200 to x=920 at y=460) */}
          <line
            x1="200"
            y1="460"
            x2={baselineX}
            y2="460"
            stroke="#22D3EE"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Label Badge: "NORMAL BASELINE" */}
          {frame >= 18 && (
            <g transform="translate(420, 420)">
              <rect x="-80" y="-18" width="160" height="36" rx="8" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#22D3EE" fontSize="13" fontWeight="900" letterSpacing="1">
                NORMAL BASELINE
              </text>
            </g>
          )}

          {/* 2. VIOLENT 90-DEGREE PLUNGE (Red Line, x=920, y=460 down to dropY) */}
          {isDropping && (
            <g filter="url(#plunge-glow-s20)">
              <line
                x1="920"
                y1="460"
                x2="920"
                y2={dropY}
                stroke="#DC2626"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Acute drop downward arrow indicator */}
              <polygon
                points={`910,${dropY - 15} 930,${dropY - 15} 920,${dropY + 10}`}
                fill="#DC2626"
              />
            </g>
          )}

          {/* Typewriter Badge: "ACUTE DROP" */}
          {frame >= 65 && (
            <g transform="translate(1040, 650)">
              <rect x="-70" y="-20" width="140" height="40" rx="8" fill="#18181B" stroke="#EF4444" strokeWidth="2.5" />
              <text x="0" y="6" textAnchor="middle" fill="#FCA5A5" fontSize="14" fontFamily="monospace" fontWeight="900" letterSpacing="1">
                {acuteText.slice(0, acuteChars)}
              </text>
            </g>
          )}

          {/* 3. TRENCH FLATLINE (Red Line, x=920 to flatlineX at y=840) */}
          {isFlatlining && (
            <g filter="url(#plunge-glow-s20)">
              <line
                x1="920"
                y1="840"
                x2={flatlineX}
                y2="840"
                stroke="#DC2626"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Trench Zone Fill Shading */}
              <rect
                x="920"
                y="840"
                width={flatlineX - 920}
                height="80"
                fill="#DC2626"
                fillOpacity="0.12"
              />
            </g>
          )}

          {/* Trench Label Badge at Bottom */}
          {frame >= 95 && (
            <g transform="translate(1320, 800)">
              <rect x="-95" y="-18" width="190" height="36" rx="8" fill="#000000" stroke="#DC2626" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="900" letterSpacing="2">
                ACUTE EPISODE TRENCH
              </text>
            </g>
          )}
        </svg>

        {/* Bottom Trajectory Telemetry Banner */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-black/95 border border-slate-700 shadow-2xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
              {isFlatlining
                ? "TRAJECTORY: UNPRECIPITATED VERTICAL CRASH // STABILIZED AT TRENCH"
                : "TRAJECTORY: HEALTHY HOMEOSTASIS MAINTAINED"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
