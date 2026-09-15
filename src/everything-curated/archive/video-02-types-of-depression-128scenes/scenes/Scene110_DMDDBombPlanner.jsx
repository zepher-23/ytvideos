import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 110: DMDD Bomb Planner
 * Duration: 180 frames (6.0s)
 * Environment: A weekly planner graphic on a clean desk background.
 * Characters & Props: Weekly planner (Monday-Sunday grid). Vector bomb icons.
 * Action:
 * - Beginning: The planner is displayed. Monday, Wednesday, and Friday squares are marked with a neutral "X".
 * - Action / Climax: Those neutral "X" marks bulge outward and violently explode, replaced by cartoonish, black round bomb icons with lit fuses.
 * - Ending / Hold: The planner is covered in smoke and wreckage. A bracket below labels them "TEMPER OUTBURSTS 3+ PER WEEK".
 */
export const Scene110_DMDDBombPlanner = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const entranceScale = interpolate(enterSpring, [0, 1], [0.92, 1]);

  // Days configuration
  const days = [
    { label: "MON", num: "12", hasOutburst: true, idx: 0 },
    { label: "TUE", num: "13", hasOutburst: false, idx: 1 },
    { label: "WED", num: "14", hasOutburst: true, idx: 2 },
    { label: "THU", num: "15", hasOutburst: false, idx: 3 },
    { label: "FRI", num: "16", hasOutburst: true, idx: 4 },
    { label: "SAT", num: "17", hasOutburst: false, idx: 5 },
    { label: "SUN", num: "18", hasOutburst: false, idx: 6 },
  ];

  // Bulge & Bomb Morph timing
  // Frames 0-45: Neutral X marks
  // Frames 45-70: Bulging outwards
  // Frames 70+: Bomb appearance with spark
  const bulgeProgress = interpolate(frame, [45, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bulgeScale = 1 + Math.sin(bulgeProgress * Math.PI) * 0.45;

  const bombSpring = spring({
    frame: frame - 68,
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const bombScale = interpolate(bombSpring, [0, 1], [0, 1]);

  // Bracket entrance
  const bracketSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const bracketOpacity = interpolate(frame, [90, 105], [0, 1], {
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
      {/* Desk Background Subtle Surface */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 1) 100%)",
        }}
      />

      {/* Header Container with Deterministic Containment */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: entranceOpacity,
          transform: `scale(${entranceScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl flex flex-col items-center"
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.85)",
            border: "1.5px solid #334155",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-amber-500 text-slate-950">
              DMDD Diagnostic Criteria
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-400">
              Frequency & Predictability
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-white"
          >
            Weekly Outburst Frequency
          </h1>
        </div>
      </div>

      {/* Weekly Planner Desk Card */}
      <div
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[1380px] z-20 flex flex-col items-center"
        style={{
          opacity: entranceOpacity,
          transform: `translate(-50%, -50%) scale(${entranceScale})`,
        }}
      >
        {/* Paper Sheet Shadow and Container */}
        <div
          className="w-full bg-slate-900/90 rounded-3xl p-8 border-2 border-slate-700 shadow-2xl backdrop-blur-xl relative"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          }}
        >
          {/* Planner Sheet Header */}
          <div className="flex justify-between items-center pb-6 border-b border-slate-700 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <div className="w-4 h-4 rounded-full bg-amber-500" />
              <div className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="text-xl font-black tracking-wider text-slate-200 uppercase ml-2">
                SCHEDULE PLANNER &mdash; RECURRENT OUTBURST LOG
              </span>
            </div>
            <div className="text-sm font-semibold tracking-widest uppercase text-slate-400 bg-slate-800 px-4 py-1.5 rounded-lg border border-slate-700">
              WEEK 24
            </div>
          </div>

          {/* 7 Days Grid */}
          <div className="grid grid-cols-7 gap-4">
            {days.map((d, index) => {
              const isBomb = d.hasOutburst && frame >= 68;
              const isBulging = d.hasOutburst && frame < 68 && frame >= 45;

              return (
                <div
                  key={d.label}
                  className="h-64 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all"
                  style={{
                    backgroundColor: d.hasOutburst
                      ? frame >= 68
                        ? "rgba(220, 38, 38, 0.12)"
                        : "rgba(30, 41, 59, 0.6)"
                      : "rgba(15, 23, 42, 0.6)",
                    border: d.hasOutburst && frame >= 68
                      ? "2px solid rgba(239, 68, 68, 0.6)"
                      : "1.5px solid rgba(51, 65, 85, 0.6)",
                  }}
                >
                  {/* Day Label & Date */}
                  <div className="flex justify-between items-start">
                    <span
                      className="text-lg font-black tracking-wider uppercase"
                      style={{
                        color: d.hasOutburst && frame >= 68 ? "#F87171" : "#94A3B8",
                      }}
                    >
                      {d.label}
                    </span>
                    <span className="text-sm font-bold text-slate-500">
                      {d.num}
                    </span>
                  </div>

                  {/* Cell Center Content: Neutral X or Explosive Bomb */}
                  <div className="flex-1 flex items-center justify-center relative">
                    {/* Neutral X (Pre-morph) */}
                    {d.hasOutburst && frame < 68 && (
                      <div
                        className="relative flex items-center justify-center"
                        style={{
                          transform: `scale(${isBulging ? bulgeScale : 1})`,
                          transition: "transform 0.1s ease",
                        }}
                      >
                        <svg width="70" height="70" viewBox="0 0 100 100">
                          <line
                            x1="20"
                            y1="20"
                            x2="80"
                            y2="80"
                            stroke="#64748B"
                            strokeWidth="10"
                            strokeLinecap="round"
                          />
                          <line
                            x1="80"
                            y1="20"
                            x2="20"
                            y2="80"
                            stroke="#64748B"
                            strokeWidth="10"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Non-outburst Days: Empty or gentle dashed line */}
                    {!d.hasOutburst && (
                      <div className="w-10 h-1 rounded-full bg-slate-800" />
                    )}

                    {/* Cartoon Bomb with Lit Fuse (Post-morph) */}
                    {d.hasOutburst && frame >= 68 && (
                      <div
                        className="relative flex items-center justify-center"
                        style={{
                          transform: `scale(${bombScale})`,
                        }}
                      >
                        {/* Smoke puffs from scorch */}
                        <div
                          className="absolute -inset-4 rounded-full pointer-events-none opacity-40 blur-md"
                          style={{
                            backgroundColor: "rgba(239, 68, 68, 0.3)",
                          }}
                        />

                        <svg width="110" height="110" viewBox="0 0 120 120" className="overflow-visible">
                          <defs>
                            <radialGradient id={`bombGrad-${index}`} cx="35%" cy="35%" r="65%">
                              <stop offset="0%" stopColor="#475569" />
                              <stop offset="35%" stopColor="#0F172A" />
                              <stop offset="100%" stopColor="#000000" />
                            </radialGradient>
                          </defs>

                          {/* Fuse Line */}
                          <path
                            d="M 60 40 Q 60 18 80 15 Q 92 12 95 24"
                            fill="none"
                            stroke="#D97706"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />

                          {/* Fuse Sparks */}
                          <circle
                            cx={95 + Math.sin(frame * 1.5) * 3}
                            cy={24 + Math.cos(frame * 1.5) * 3}
                            r={6 + (frame % 3)}
                            fill="#FBBF24"
                          />
                          <circle
                            cx={95 + Math.cos(frame * 2.2) * 5}
                            cy={24 + Math.sin(frame * 2.2) * 5}
                            r={3}
                            fill="#EF4444"
                          />

                          {/* Bomb Cap */}
                          <rect
                            x="50"
                            y="32"
                            width="20"
                            height="12"
                            rx="3"
                            fill="#64748B"
                            stroke="#334155"
                            strokeWidth="2"
                          />

                          {/* Round Bomb Body */}
                          <circle
                            cx="60"
                            cy="75"
                            r="36"
                            fill={`url(#bombGrad-${index})`}
                            stroke="#000000"
                            strokeWidth="3"
                          />

                          {/* Gloss Specular Highlight */}
                          <ellipse
                            cx="48"
                            cy="62"
                            rx="10"
                            ry="6"
                            transform="rotate(-30 48 62)"
                            fill="#FFFFFF"
                            opacity="0.35"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Scorch mark at bottom */}
                  {d.hasOutburst && frame >= 68 && (
                    <div className="text-center text-xs font-black tracking-wider text-red-400 uppercase py-1 bg-red-950/40 rounded-lg border border-red-800/40">
                      OUTBURST
                    </div>
                  )}
                  {(!d.hasOutburst || frame < 68) && (
                    <div className="text-center text-xs font-semibold tracking-wider text-slate-600 uppercase py-1">
                      NO EVENT
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bracket Below Highlighting Mon, Wed, Fri */}
          {bracketOpacity > 0.01 && (
            <div
              className="mt-6 flex flex-col items-center justify-center transition-all"
              style={{
                opacity: bracketOpacity,
                transform: `scale(${interpolate(bracketSpring, [0, 1], [0.9, 1])})`,
              }}
            >
              {/* SVG Bracket Span */}
              <svg width="1020" height="40" viewBox="0 0 1020 40" className="overflow-visible">
                {/* Horizontal bracket spanning columns 0 to 4 (Mon to Fri) */}
                <path
                  d="M 95 5 L 95 20 L 510 20 L 510 35 L 510 20 L 925 20 L 925 5"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Bracket Criteria Badge */}
              <div
                className="mt-3 px-8 py-3 rounded-2xl flex items-center gap-4 shadow-xl"
                style={{
                  backgroundColor: "rgba(220, 38, 38, 0.2)",
                  border: "2px solid #DC2626",
                  boxShadow: "0 0 25px rgba(220, 38, 38, 0.4)",
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center font-black text-white text-lg shadow">
                  !
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black uppercase text-white tracking-wider m-0 leading-tight">
                    TEMPER OUTBURSTS 3+ PER WEEK
                  </h2>
                  <p className="text-xs font-bold text-red-200 uppercase tracking-widest m-0 mt-0.5">
                    Severe, recurrent outbursts grossly out of proportion to provocation
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
