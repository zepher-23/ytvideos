import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 59: Total Darkness
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Pure pitch-black room (#000000).
 * - Characters & Props: Sitting CuratedStickman, chest digital battery meter draining to 0%,
 *   motionless slump into deep darkness.
 * - Beginning (0-25f): Stickman sits in darkness with faint ambient glow; chest battery drains rapidly.
 * - Action/Climax (25-70f): Battery hits 0% and turns dead grey; stickman slumps forward in total exhaustion.
 * - Ending/Hold (70-180f): Motionless silence in the dark; only faint silhouette and dead battery indicator remain.
 */
export const Scene059_TotalDarkness = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Battery drain: 45% down to 0% between frame 15 and 60
  const batteryPct = Math.max(
    0,
    Math.round(interpolate(frame, [15, 60], [45, 0], { extrapolateRight: "clamp" }))
  );
  const isBatteryDead = batteryPct === 0;

  // Stickman slump progression linked to battery death
  const slumpProgress = interpolate(frame, [25, 65], [0.3, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dim ambient silhouette lighting
  const ambientGlow = interpolate(frame, [15, 65], [0.2, 0.06], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-black overflow-hidden select-none font-sans text-white">
      {/* Dim Ambient Radial Light around Stickman */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 75%, rgba(56, 189, 248, ${ambientGlow}) 0%, rgba(0,0,0,1) 50%)`,
        }}
      />

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-black/85 border border-slate-800 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-slate-500 font-bold uppercase block mb-0.5">
            CELLULAR EXHAUSTION
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-slate-300 m-0 uppercase">
            TOTAL DARKNESS: POWER DRAIN
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="bat-glow-s59" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="10"
              floodColor={batteryPct > 15 ? "#F59E0B" : batteryPct > 0 ? "#EF4444" : "#475569"}
              floodOpacity="0.8"
            />
          </filter>
        </defs>

        {/* Floor Line */}
        <line x1="400" y1="820" x2="1520" y2="820" stroke="#1E293B" strokeWidth="2" strokeDasharray="4 4" />

        {/* SITTING CURATED STICKMAN IN TOTAL DARKNESS */}
        <g transform="translate(960, 810)">
          {/* Faint Ground Shadow */}
          <ellipse cx="0" cy="8" rx="80" ry="14" fill="#000000" opacity="0.4" />

          {/* CuratedStickman in Deep Slump */}
          <CuratedStickman
            x={0}
            y={0}
            scale={1.05}
            pose="defeat"
            mouth="frown"
            eyes="defeat"
            slumpProgress={slumpProgress}
            frame={frame}
          />

          {/* DIGITAL BATTERY METER ON CHEST (x=0, y=-70) */}
          <g transform="translate(0, -70)" filter="url(#bat-glow-s59)">
            {/* Battery Shell */}
            <rect
              x="-35"
              y="-14"
              width="70"
              height="28"
              rx="6"
              fill="#0F172A"
              stroke={isBatteryDead ? "#475569" : "#94A3B8"}
              strokeWidth="2.5"
            />
            {/* Positive Terminal Nub */}
            <rect x="35" y="-6" width="6" height="12" rx="2" fill="#64748B" />

            {/* Fill Level */}
            {batteryPct > 0 && (
              <rect
                x="-31"
                y="-10"
                width={(batteryPct / 100) * 62}
                height="20"
                rx="4"
                fill={batteryPct > 15 ? "#F59E0B" : "#EF4444"}
              />
            )}

            {/* Percentage Text Tag */}
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              fontFamily="monospace"
            >
              {batteryPct}%
            </text>
          </g>

          {/* "DEPLETED" Warning Label when 0% */}
          {isBatteryDead && (
            <g transform="translate(0, -115)">
              <rect x="-60" y="-14" width="120" height="28" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="900" letterSpacing="1">
                DEAD (0%)
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-slate-800 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-400">
            CIRCADIAN SHUTDOWN: DEPRIVED OF PHOTONIC SIGNALING, PHYSIOLOGICAL DRIVE STALLS AT ZERO
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
