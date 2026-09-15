import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 57: photoperiod dependency
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: 50/50 vertical split screen (Left: bright warm gold #FEF3C7, Right: dark frosty navy #0B132B).
 * - Characters & Props:
 *   - Left: Happy CuratedStickman under giant radiant sun ("16 HOURS DAYLIGHT").
 *   - Right: Depressed CuratedStickman under dim miniature sun that extinguishes into smoke ("8 HOURS DAYLIGHT").
 *   - Right stickman collapses into deep defeat slump.
 * - Ending/Hold: Center high-contrast badge "PHOTOPERIOD DEPENDENCY".
 */
export const Scene057_photoperioddependency = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Right side sun extinction and stickman collapse (frames 45 to 85)
  const isExtinguishing = frame >= 45;
  const collapseProgress = interpolate(frame, [45, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightSunOpacity = interpolate(frame, [45, 60], [1, 0], { extrapolateRight: "clamp" });
  const rightSunSmokeScale = interpolate(frame, [50, 75], [0.2, 1.8], { extrapolateRight: "clamp" });
  const rightSunSmokeOpacity = interpolate(frame, [50, 75], [0.8, 0], { extrapolateRight: "clamp" });

  // Center Badge slam at frame 90
  const badgeFrame = Math.max(0, frame - 90);
  const badgeSpring = spring({
    frame: badgeFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const badgeScale = frame < 90 ? 0 : interpolate(badgeSpring, [0, 1], [2, 1]);
  const badgeOpacity = interpolate(badgeFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-black overflow-hidden select-none font-sans text-white">
      {/* 50/50 SPLIT SCREEN LAYOUT */}
      <div className="absolute inset-0 flex">
        {/* LEFT PANEL: SUMMER (16H DAYLIGHT) */}
        <div className="w-1/2 h-full bg-[#FEF3C7] relative overflow-hidden text-slate-900 border-r-2 border-slate-400">
          {/* Subtle Grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <pattern id="grid-s57-l" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="3 3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-s57-l)" />
          </svg>

          {/* Top Panel Tag */}
          <div className="absolute top-20 left-0 right-0 flex justify-center items-center pointer-events-none z-20">
            <div className="px-8 py-2 rounded-2xl bg-amber-500 text-slate-900 font-black tracking-widest text-lg uppercase shadow-md">
              LONG PHOTOPERIOD (SUMMER)
            </div>
          </div>

          {/* Giant Radiant Sun (x=480, y=360) */}
          <svg viewBox="0 0 960 1080" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            <defs>
              <filter id="sun-glow-s57" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="24" floodColor="#F59E0B" floodOpacity="0.7" />
              </filter>
            </defs>
            <g transform="translate(480, 360)" filter="url(#sun-glow-s57)">
              {/* Rotating Ray Arms */}
              <g transform={`rotate(${frame * 1.2})`}>
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1="90"
                    x2="0"
                    y2="125"
                    stroke="#F59E0B"
                    strokeWidth="7"
                    strokeLinecap="round"
                    transform={`rotate(${i * 30})`}
                  />
                ))}
              </g>
              <circle cx="0" cy="0" r="82" fill="#F59E0B" stroke="#FEF08A" strokeWidth="6" />
              <circle cx="-18" cy="-18" r="22" fill="#FEF08A" opacity="0.6" />
            </g>

            {/* Content Summer Stickman */}
            <g transform="translate(480, 800)">
              <ellipse cx="0" cy="6" rx="90" ry="16" fill="#000000" opacity="0.1" />
              <CuratedStickman
                x={0}
                y={0}
                scale={1.1}
                pose="content"
                mouth="smile"
                eyes="normal"
                frame={frame}
              />
            </g>
          </svg>
        </div>

        {/* RIGHT PANEL: WINTER (8H DAYLIGHT) */}
        <div className="w-1/2 h-full bg-[#0B132B] relative overflow-hidden text-white">
          {/* Subtle Cold Grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <pattern id="grid-s57-r" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-s57-r)" />
          </svg>

          {/* Top Panel Tag */}
          <div className="absolute top-20 left-0 right-0 flex justify-center items-center pointer-events-none z-20">
            <div className="px-8 py-2 rounded-2xl bg-blue-900 border border-cyan-500/60 text-cyan-300 font-black tracking-widest text-lg uppercase shadow-md">
              SHORT PHOTOPERIOD (WINTER)
            </div>
          </div>

          {/* Dim Miniature Sun (Extinguishing) */}
          <svg viewBox="0 0 960 1080" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {/* Sun Icon */}
            <g transform="translate(480, 360)" opacity={rightSunOpacity}>
              <circle cx="0" cy="0" r="38" fill="#B45309" stroke="#F59E0B" strokeWidth="3" />
              {/* Weak Short Rays */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1="44"
                  x2="0"
                  y2="54"
                  stroke="#D97706"
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${i * 45})`}
                />
              ))}
            </g>

            {/* Extinction Smoke Cloud */}
            {isExtinguishing && (
              <g
                transform={`translate(480, 360) scale(${rightSunSmokeScale})`}
                opacity={rightSunSmokeOpacity}
              >
                <circle cx="-10" cy="-5" r="22" fill="#64748B" />
                <circle cx="15" cy="8" r="28" fill="#475569" />
                <circle cx="0" cy="-15" r="20" fill="#94A3B8" />
              </g>
            )}

            {/* Collapsing Depressed Winter Stickman */}
            <g transform="translate(480, 800)">
              <ellipse cx="0" cy="6" rx="85" ry="14" fill="#000000" opacity="0.3" />
              <CuratedStickman
                x={0}
                y={0}
                scale={1.05}
                pose="defeat"
                mouth="frown"
                eyes="defeat"
                slumpProgress={0.4 + collapseProgress * 0.5}
                frame={frame}
              />
            </g>
          </svg>
        </div>
      </div>

      {/* CENTER HIGH-CONTRAST SLAMMING BADGE */}
      {frame >= 90 && (
        <div
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-30 px-6"
          style={{
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
          }}
        >
          <div className="px-12 py-5 rounded-3xl bg-black/95 border-4 border-amber-500 shadow-[0_0_60px_rgba(245,158,11,0.85)] text-center backdrop-blur-xl">
            <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase block mb-1">
              ENVIRONMENTAL MECHANISM
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-wider uppercase m-0 leading-tight">
              PHOTOPERIOD DEPENDENCY
            </h2>
            <p className="text-base md:text-lg font-bold tracking-widest text-slate-300 uppercase mt-2 mb-0">
              MOOD IS TIED DIRECTLY TO THE NUMBER OF AMBIENT SUNLIGHT HOURS
            </p>
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            CIRCADIAN SENSITIVITY: SCN FIRING REQUIRES DAILY SUSTAINED LUX ENTRAINMENT TO SUSTAIN EUTHYMIC MOOD
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
