import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 63: Not Common
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Clean clinical infographic space on pure white (#FFFFFF).
 * - Characters & Props:
 *   - Left: Standard textbook myth pie chart with tiny Atypical slice -> gets slammed by giant red "X".
 *   - Right: Clinical reality pie chart with dominant 80% Atypical slice -> gets 3 pulsing green checkmarks (✓ ✓ ✓).
 *   - Climax: Giant bold typography "INCREDIBLY COMMON" slams below.
 */
export const Scene063_NotCommon = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Red "X" slam at frame 38
  const xFrame = Math.max(0, frame - 38);
  const xSpring = spring({
    frame: xFrame,
    fps,
    config: { damping: 11, stiffness: 160 },
  });
  const xScale = frame < 38 ? 0 : interpolate(xSpring, [0, 1], [2.4, 1]);
  const xOpacity = interpolate(xFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" });

  // Screen shake on "X" impact
  const shakeX = frame >= 38 && xFrame < 20 ? Math.sin(xFrame * 2.5) * Math.max(0, 12 - xFrame * 0.6) : 0;
  const shakeY = frame >= 38 && xFrame < 20 ? Math.cos(xFrame * 2.8) * Math.max(0, 10 - xFrame * 0.5) : 0;

  // 3 Checkmarks on right chart (frames 65, 80, 95)
  const checks = [
    { startF: 65, x: 1330, y: 390 },
    { startF: 80, x: 1400, y: 460 },
    { startF: 95, x: 1470, y: 530 },
  ];

  // "INCREDIBLY COMMON" bottom slam at frame 120
  const commonFrame = Math.max(0, frame - 120);
  const commonSpring = spring({
    frame: commonFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const commonScale = frame < 120 ? 0 : interpolate(commonSpring, [0, 1], [2.2, 1]);
  const commonOpacity = interpolate(commonFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      className="bg-white overflow-hidden select-none font-sans text-slate-900"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Technical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s63" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s63)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-10 py-3 rounded-2xl bg-slate-50 border border-slate-300 shadow-md backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-purple-600 font-bold uppercase block mb-0.5">
            EPIDEMIOLOGICAL PARADOX
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-slate-800 m-0 uppercase">
            THE ATYPICAL PREVALENCE
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="red-x-glow-s63" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#EF4444" floodOpacity="0.8" />
          </filter>
          <filter id="green-chk-glow-s63" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#22C55E" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* LEFT PANEL: "THE TEXTBOOK MYTH" (Center 520, 460) */}
        <g transform="translate(520, 460)">
          {/* Label Card */}
          <rect x="-160" y="-220" width="320" height="45" rx="10" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          <text x="0" y="-192" textAnchor="middle" fill="#64748B" fontSize="16" fontWeight="900" letterSpacing="1">
            TEXTBOOK MYTH: "RARE"
          </text>

          {/* Myth Pie Chart: 85% Grey, 15% Purple */}
          <circle cx="0" cy="0" r="140" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="4" />
          {/* 15% Purple Slice */}
          <path d="M 0 0 L 0 -140 A 140 140 0 0 1 113 -82 Z" fill="#C084FC" stroke="#9333EA" strokeWidth="3" />
          <text x="50" y="-70" fill="#7E22CE" fontSize="13" fontWeight="bold">
            15%
          </text>

          {/* Center Hole */}
          <circle cx="0" cy="0" r="45" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />

          {/* SLAMMING MASSIVE RED "X" (Frame >= 38) */}
          {xOpacity > 0 && (
            <g transform={`scale(${xScale})`} opacity={xOpacity} filter="url(#red-x-glow-s63)">
              <line x1="-120" y1="-120" x2="120" y2="120" stroke="#EF4444" strokeWidth="22" strokeLinecap="round" />
              <line x1="120" y1="-120" x2="-120" y2="120" stroke="#EF4444" strokeWidth="22" strokeLinecap="round" />
            </g>
          )}
        </g>

        {/* RIGHT PANEL: "CLINICAL REALITY" (Center 1400, 460) */}
        <g transform="translate(1400, 460)">
          {/* Label Card */}
          <rect x="-170" y="-220" width="340" height="45" rx="10" fill="#FAF5FF" stroke="#C084FC" strokeWidth="2" />
          <text x="0" y="-192" textAnchor="middle" fill="#7E22CE" fontSize="16" fontWeight="900" letterSpacing="1">
            CLINICAL REALITY: ~80%
          </text>

          {/* Real Pie Chart: 80% Purple, 20% Grey */}
          <circle cx="0" cy="0" r="140" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="4" />
          {/* 80% Purple Wedge */}
          <path
            d="M 0 0 L 0 -140 A 140 140 0 1 1 -133 43 Z"
            fill="#9333EA"
            stroke="#6B21A8"
            strokeWidth="4"
          />
          <text x="30" y="20" fill="#FFFFFF" fontSize="24" fontWeight="900">
            80%
          </text>

          {/* Center Hole */}
          <circle cx="0" cy="0" r="45" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
        </g>

        {/* 3 SEQUENTIAL GREEN CHECKMARKS ON RIGHT CHART */}
        {checks.map((chk, i) => {
          if (frame < chk.startF) return null;
          const cAge = frame - chk.startF;
          const cSpring = spring({
            frame: cAge,
            fps,
            config: { damping: 10, stiffness: 180 },
          });
          const cScale = interpolate(cSpring, [0, 1], [0.3, 1]);
          return (
            <g
              key={i}
              transform={`translate(${chk.x}, ${chk.y}) scale(${cScale})`}
              filter="url(#green-chk-glow-s63)"
            >
              <circle cx="0" cy="0" r="26" fill="#22C55E" />
              <path
                d="M -12 0 L -4 8 L 12 -8"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </svg>

      {/* CLIMAX: GIANT "INCREDIBLY COMMON" TYPOGRAPHY SLAM */}
      {frame >= 120 && (
        <div
          className="absolute bottom-24 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6"
          style={{
            transform: `scale(${commonScale})`,
            opacity: commonOpacity,
          }}
        >
          <div className="px-12 py-5 rounded-3xl bg-slate-900 border-4 border-purple-500 shadow-[0_0_50px_rgba(147,51,234,0.7)] text-center backdrop-blur-xl">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-widest uppercase m-0 leading-tight drop-shadow-[0_0_20px_#A855F7]">
              INCREDIBLY COMMON
            </h2>
            <p className="text-base md:text-xl font-bold tracking-widest text-emerald-400 uppercase mt-2 mb-0">
              4 OUT OF 5 DEPRESSED OUTPATIENTS SUFFER FROM "ATYPICAL" SYMPTOMS
            </p>
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-100 border border-slate-300 shadow-md text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-700">
            NOMENCLATURE ERROR: THE TERM "ATYPICAL" IS A HISTORICAL ARTIFACT, NOT A MEASURE OF FREQUENCY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
