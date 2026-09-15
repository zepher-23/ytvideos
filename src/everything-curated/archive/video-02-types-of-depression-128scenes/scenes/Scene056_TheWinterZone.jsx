import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 56: The Winter Zone
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Close-up calendar space (#0B132B).
 * - Characters & Props: Large calendar month cards (OCT, NOV, DEC, JAN, FEB, MAR),
 *   sweeping freezing blizzard front, crystalline frost spikes, vector snowflake overlays.
 * - Beginning (0-35f): The winter calendar months are displayed in normal slate styling.
 * - Action/Climax (35-95f): A freezing blizzard shadow sweeps from right to left, flash-freezing
 *   OCT-MAR into icy deep blue with sharp frost borders and falling snowflakes.
 * - Ending/Hold (95-180f): "WINTER EPISODES" stamps across the frozen zone in glowing frosty cyan.
 */
export const Scene056_TheWinterZone = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const winterMonths = [
    { name: "OCTOBER", short: "OCT", days: 31, x: 380, y: 360 },
    { name: "NOVEMBER", short: "NOV", days: 30, x: 960, y: 360 },
    { name: "DECEMBER", short: "DEC", days: 31, x: 1540, y: 360 },
    { name: "JANUARY", short: "JAN", days: 31, x: 380, y: 640 },
    { name: "FEBRUARY", short: "FEB", days: 28, x: 960, y: 640 },
    { name: "MARCH", short: "MAR", days: 31, x: 1540, y: 640 },
  ];

  // Blizzard front sweep (x=1950 to -100 between frame 35 and 90)
  const freezeFrontX = interpolate(frame, [35, 90], [1950, -100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stamp spring at frame 95
  const stampFrame = Math.max(0, frame - 95);
  const stampSpring = spring({
    frame: stampFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const stampScale = frame < 95 ? 0 : interpolate(stampSpring, [0, 1], [2.2, 1]);
  const stampOpacity = interpolate(stampFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-[#0B132B] overflow-hidden select-none font-sans text-white">
      {/* Background Subtle Frost Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="frost-grid-s56" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 30 60 M 0 30 L 60 30" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#frost-grid-s56)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-0.5">
            TEMPORAL BOUNDARIES
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            THE WINTER ZONE: CONFINED RISK
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="ice-glow-s56" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0284C7" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* 6 LARGE CALENDAR MONTH CARDS */}
        {winterMonths.map((m, idx) => {
          const isFrozen = freezeFrontX < m.x + 200;
          const freezeAge = Math.max(0, frame - (35 + idx * 8));

          return (
            <g
              key={idx}
              transform={`translate(${m.x}, ${m.y})`}
              filter={isFrozen ? "url(#ice-glow-s56)" : undefined}
            >
              {/* Card Container */}
              <rect
                x="-240"
                y="-110"
                width="480"
                height="220"
                rx="18"
                fill={isFrozen ? "#0C4A6E" : "#1E293B"}
                stroke={isFrozen ? "#38BDF8" : "#475569"}
                strokeWidth={isFrozen ? "4" : "2"}
                style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
              />

              {/* Month Header Banner */}
              <rect
                x="-240"
                y="-110"
                width="480"
                height="60"
                rx="18"
                fill={isFrozen ? "#0284C7" : "#334155"}
              />
              <text x="0" y="-72" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" letterSpacing="3">
                {m.name}
              </text>

              {/* Days Grid Simulation */}
              <g transform="translate(-200, -20)">
                {[...Array(28)].map((_, d) => {
                  const c = d % 7;
                  const r = Math.floor(d / 7);
                  return (
                    <circle
                      key={d}
                      cx={c * 58}
                      cy={r * 32}
                      r={isFrozen ? 6 : 4}
                      fill={isFrozen ? "#BAE6FD" : "#64748B"}
                    />
                  );
                })}
              </g>

              {/* Frost Spikes on Border (if frozen) */}
              {isFrozen && (
                <g stroke="#38BDF8" strokeWidth="2.5" fill="none">
                  <path d="M -230 -110 L -220 -125 L -210 -110 M -180 -110 L -170 -130 L -160 -110 M 180 -110 L 195 -130 L 210 -110" />
                  <path d="M -230 110 L -220 125 L -210 110 M 180 110 L 195 128 L 210 110" />
                </g>
              )}

              {/* Snowflake Micro-Badge */}
              {isFrozen && (
                <g transform="translate(190, 60)">
                  <circle cx="0" cy="0" r="22" fill="#0369A1" stroke="#38BDF8" strokeWidth="2" />
                  <text x="0" y="7" textAnchor="middle" fill="#E0F2FE" fontSize="18" fontWeight="bold">
                    ❄
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* SWEEPING BLIZZARD FRONT LINE */}
        {frame >= 35 && frame <= 95 && (
          <g>
            <line x1={freezeFrontX} y1="180" x2={freezeFrontX} y2="880" stroke="#38BDF8" strokeWidth="6" />
            <line x1={freezeFrontX + 20} y1="180" x2={freezeFrontX + 20} y2="880" stroke="#E0F2FE" strokeWidth="2" strokeDasharray="8 8" />
          </g>
        )}
      </svg>

      {/* CLIMAX: SLAMMING "WINTER EPISODES" STAMP BANNER */}
      {frame >= 95 && (
        <div
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-30 px-6"
          style={{
            transform: `scale(${stampScale})`,
            opacity: stampOpacity,
          }}
        >
          <div className="px-12 py-5 rounded-3xl bg-black/95 border-4 border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.85)] text-center backdrop-blur-xl">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-widest uppercase m-0 leading-tight drop-shadow-[0_0_20px_#38BDF8]">
              WINTER EPISODES
            </h2>
            <p className="text-lg md:text-xl font-bold tracking-widest text-cyan-300 uppercase mt-2 mb-0">
              6-MONTH RECURRENT WINDOW: OCTOBER THROUGH MARCH
            </p>
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            SEASONAL SPECIFICITY: SYMPTOMS ARE CONFINED STRICTLY TO LOW-LUX MONTHS AND SPONTANEOUSLY REMIT IN SPRING
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
