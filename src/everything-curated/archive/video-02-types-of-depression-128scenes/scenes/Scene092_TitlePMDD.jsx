import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 92: Title - PMDD
 * Duration: 150 frames (5.0s)
 * Environment: Dark navy blue background (#0F172A).
 * Transition: Slide-left.
 * Characters & Props: Large typography, dropping wall calendar icon next to text, "Strict Luteal Phase Confinement" subtitle.
 */
export const Scene092_TitlePMDD = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-left entrance spring
  const slideSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 110 },
  });
  const slideX = interpolate(slideSpring, [0, 1], [80, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Calendar drop spring: frames 25 to 60
  const calSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 11, stiffness: 140 },
  });
  const calY = interpolate(calSpring, [0, 1], [-450, 0]);

  // Subtitle typing / fade: frames 55 to 80
  const subOpacity = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Background Subtle Lunar / Cyclic Orbit Rings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <circle cx="1380" cy="560" r="320" fill="none" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 8" />
        <circle cx="1380" cy="560" r="440" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="6 12" />
      </svg>

      {/* Main Layout Stage */}
      <div
        className="absolute inset-0 flex items-center justify-between px-20 z-20"
        style={{
          opacity: enterOpacity,
          transform: `translateX(${slideX}px)`,
        }}
      >
        {/* LEFT COLUMN: Large Stark White Typography */}
        <div className="max-w-2xl flex flex-col items-start text-left">
          {/* Diagnostic Number Badge */}
          <div className="px-4 py-1.5 rounded-lg bg-red-600/30 border border-red-500 text-red-400 text-sm font-black tracking-widest uppercase mb-4">
            SECTION 8 • DIAGNOSTIC PROFILE
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none m-0">
            PREMENSTRUAL<br />
            <span className="text-red-500">DYSPHORIC</span><br />
            DISORDER
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-yellow-400 font-extrabold text-lg tracking-wider">
              PMDD
            </span>
            <span className="text-slate-400 text-base font-semibold">
              DSM-5 Depressive Disorder
            </span>
          </div>

          {/* Subtitle: "Strict Luteal Phase Confinement" */}
          <div
            className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800"
            style={{ opacity: subOpacity }}
          >
            <p className="text-lg font-black text-sky-400 tracking-wider uppercase m-0">
              STRICT LUTEAL PHASE CONFINEMENT
            </p>
            <p className="text-sm font-medium text-slate-400 mt-1 m-0">
              Predictable, monthly cyclical recurrence tied to progesterone metabolism
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Dropping Wall Calendar Icon (x=1380, y=540) */}
        <div className="w-[520px] h-[520px] relative flex items-center justify-center">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full overflow-visible"
            style={{ transform: `translateY(${calY}px)` }}
          >
            <defs>
              <filter id="calShadow92" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="15" stdDeviation="20" floodColor="#000000" floodOpacity="0.7" />
              </filter>
            </defs>

            {/* Calendar Hanging Cord & Wall Pin */}
            <circle cx="250" cy="25" r="8" fill="#E2E8F0" />
            <line x1="250" y1="25" x2="150" y2="70" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="250" y1="25" x2="350" y2="70" stroke="#94A3B8" strokeWidth="2.5" />

            {/* Calendar Body Container */}
            <g filter="url(#calShadow92)">
              {/* Calendar White Sheet */}
              <rect x="70" y="70" width="360" height="390" rx="18" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="3" />

              {/* Red Header Bar */}
              <rect x="70" y="70" width="360" height="90" rx="18" fill="#DC2626" />
              <rect x="70" y="140" width="360" height="20" fill="#DC2626" />

              {/* Spiral Rings at top */}
              {[120, 180, 250, 320, 380].map((rx, i) => (
                <g key={i} transform={`translate(${rx}, 70)`}>
                  <rect x="-6" y="-12" width="12" height="24" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
                </g>
              ))}

              {/* Month Title */}
              <text x="250" y="125" fill="#FFFFFF" fontSize="28" fontWeight="900" textAnchor="middle" letterSpacing="4">
                LUTEAL CYCLE
              </text>

              {/* 5x5 Day Grid */}
              <g transform="translate(100, 185)">
                {Array.from({ length: 25 }).map((_, i) => {
                  const col = i % 5;
                  const row = Math.floor(i / 5);
                  const isLutealDay = i >= 18; // Last 7 days

                  return (
                    <g key={i} transform={`translate(${col * 60}, ${row * 50})`}>
                      <rect
                        x="0"
                        y="0"
                        width="50"
                        height="40"
                        rx="6"
                        fill={isLutealDay ? "rgba(239, 68, 68, 0.15)" : "#F1F5F9"}
                        stroke={isLutealDay ? "#EF4444" : "#CBD5E1"}
                        strokeWidth={isLutealDay ? "2" : "1"}
                      />
                      <text
                        x="25"
                        y="25"
                        fill={isLutealDay ? "#DC2626" : "#475569"}
                        fontSize="14"
                        fontWeight="800"
                        textAnchor="middle"
                      >
                        {i + 1}
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
