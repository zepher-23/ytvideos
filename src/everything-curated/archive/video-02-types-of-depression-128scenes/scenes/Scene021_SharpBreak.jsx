import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 21: Sharp Break
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Clean solid background (#0A0F1D)
 * - Transition: Snap-zoom in on vertical red line from Scene 20
 * - Characters & Props: The red vertical line, horizontal cyan lightning bolt (#06B6D4)
 * - Beginning: Vertical red line against grey/dark background (frames 0-30).
 * - Action/Climax: Red line splits down the middle. Bright horizontal cyan lightning
 *   bolt surges through the gap, completely severing top and bottom (frames 35-70).
 * - Ending/Hold: The two separated line halves drift apart to frame 150.
 */
export const Scene021_SharpBreak = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Snap-zoom entrance
  const enterScale = interpolate(frame, [0, 10], [1.8, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  // 2. Line Split & Lightning Bolt (triggers at frame 32)
  const isSplit = frame >= 32;
  const splitSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 10, stiffness: 220 },
  });

  // Top and bottom halves drift apart
  const topDriftY = interpolate(splitSpring, [0, 1], [0, -110]);
  const bottomDriftY = interpolate(splitSpring, [0, 1], [0, 110]);

  // Lightning Bolt flash & surge (frames 32 to 65)
  const lightningActive = frame >= 32 && frame <= 72;
  const lightningProgress = interpolate(frame, [32, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lightningFlash = lightningActive ? (Math.floor(frame / 2) % 2 === 0 ? 1 : 0.4) : 0;

  // Impact Shudder
  const shudder = isSplit && frame <= 58
    ? Math.sin(frame * 4.5) * interpolate(frame, [32, 58], [12, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Background Subtle Technical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="grid-s21" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s21)" />
      </svg>

      {/* Viewport with Zoom & Shudder */}
      <div
        className="w-full h-full relative flex items-center justify-center pointer-events-none"
        style={{
          transform: `scale(${enterScale}) translate(0px, ${shudder}px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-cyan-500/50 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase block mb-1">
              STRUCTURAL DISCONTINUITY
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              SHARP RUPTURE FROM BASELINE
            </h1>
          </div>
        </div>

        {/* Main Stage SVG */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Red Line Glow */}
            <filter id="red-line-glow-s21" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#DC2626" floodOpacity="0.9" />
            </filter>
            {/* Cyan Lightning Glow */}
            <filter id="cyan-lightning-glow-s21" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#06B6D4" floodOpacity="1" />
            </filter>
          </defs>

          {/* TOP HALF OF RED LINE (Drifts upwards) */}
          <g transform={`translate(0, ${topDriftY})`} filter="url(#red-line-glow-s21)">
            <line
              x1="960"
              y1="160"
              x2="960"
              y2="520"
              stroke="#DC2626"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Top Baseline label */}
            <g transform="translate(860, 340)">
              <rect x="-80" y="-18" width="160" height="36" rx="8" fill="#18181B" stroke="#DC2626" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#FCA5A5" fontSize="13" fontWeight="800" letterSpacing="1">
                PRE-MORBID
              </text>
            </g>
          </g>

          {/* BOTTOM HALF OF RED LINE (Drifts downwards) */}
          <g transform={`translate(0, ${bottomDriftY})`} filter="url(#red-line-glow-s21)">
            <line
              x1="960"
              y1="560"
              x2="960"
              y2="920"
              stroke="#DC2626"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Bottom Trench label */}
            <g transform="translate(1060, 740)">
              <rect x="-85" y="-18" width="170" height="36" rx="8" fill="#18181B" stroke="#DC2626" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" fill="#FCA5A5" fontSize="13" fontWeight="800" letterSpacing="1">
                ACUTE TRENCH
              </text>
            </g>
          </g>

          {/* HORIZONTAL CYAN LIGHTNING BOLT (#06B6D4) */}
          {lightningActive && (
            <g
              transform="translate(960, 540)"
              filter="url(#cyan-lightning-glow-s21)"
              opacity={lightningFlash}
            >
              {/* Horizontal Zigzag Lightning Path */}
              <path
                d={`M ${-750 * lightningProgress} 0
                    L ${-520 * lightningProgress} -24
                    L ${-380 * lightningProgress} 18
                    L ${-160 * lightningProgress} -26
                    L 0 0
                    L ${160 * lightningProgress} 26
                    L ${380 * lightningProgress} -18
                    L ${520 * lightningProgress} 24
                    L ${750 * lightningProgress} 0
                    L ${520 * lightningProgress} 6
                    L ${380 * lightningProgress} -8
                    L ${160 * lightningProgress} 14
                    L 0 -8
                    L ${-160 * lightningProgress} -14
                    L ${-380 * lightningProgress} 8
                    L ${-520 * lightningProgress} -6 Z`}
                fill="#06B6D4"
                stroke="#FFFFFF"
                strokeWidth="4"
              />
              {/* Shockwave Rings at center sever point */}
              <circle cx="0" cy="0" r={40 * lightningProgress} fill="none" stroke="#FFFFFF" strokeWidth="4" />
              <circle cx="0" cy="0" r={80 * lightningProgress} fill="none" stroke="#06B6D4" strokeWidth="3" strokeDasharray="6 6" />
            </g>
          )}
        </svg>

        {/* Bottom Status Card */}
        {isSplit && (
          <div className="absolute bottom-16 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
            <div className="px-10 py-3 rounded-2xl bg-black/90 border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.6)]">
              <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-cyan-300">
                DISCONTINUOUS BREAK: COMPLETE DISCONNECTION FROM FUNCTIONAL SELF
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
