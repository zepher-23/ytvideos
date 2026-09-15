import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 18: Crushing Fatigue Battery
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Minimalist clean floor (#0F172A)
 * - Characters & Props: Full glowing green battery (#22C55E), massive black iron weight (#0F172A)
 * - Beginning: Battery full and glowing green (frames 0-40).
 * - Action/Climax: Giant iron weight drops violently from top (frame 42), crushing
 *   the battery on Y-axis. Green glow dies, bar turns red and depletes to 0% (frames 48-80).
 * - Ending/Hold: Crushed red dead battery holds to frame 180.
 */
export const Scene018_CrushingFatigueBattery = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance fade
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Giant Iron Weight Drop (triggers at frame 40)
  const isDropping = frame >= 40;
  const dropSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 9, stiffness: 240, mass: 1.6 },
  });
  const weightY = interpolate(dropSpring, [0, 1], [-350, 240]);

  // 3. Impact & Battery Crush (frame 46)
  const isCrushed = frame >= 46;
  const crushYScale = isCrushed
    ? interpolate(frame, [46, 54], [1.0, 0.38], { extrapolateRight: "clamp" })
    : 1.0;

  // Screen impact shake
  const isShaking = isCrushed && frame <= 68;
  const shakeY = isShaking
    ? Math.sin(frame * 4.2) * interpolate(frame, [46, 68], [16, 0], { extrapolateRight: "clamp" })
    : 0;

  // 4. Battery Charge Level:
  // - 100% until frame 46
  // - Drains rapidly from 100% to 0% between frames 46 and 75
  const batteryLevel = isCrushed
    ? interpolate(frame, [46, 75], [100, 0], { extrapolateRight: "clamp" })
    : 100;

  // Green glow dies on impact
  const greenGlowOpacity = isCrushed ? 0 : 1;
  const redGlowOpacity = isCrushed
    ? interpolate(frame, [46, 55, 110], [0, 1, 0.3], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Viewport with Screen Shake */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate(0px, ${shakeY}px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Floor Line */}
        <div className="absolute bottom-24 left-0 right-0 h-1 bg-slate-700/60" />

        {/* Header Container */}
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block mb-1">
              PHYSICAL MANIFESTATION // 02
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              CRUSHING FATIGUE
            </h1>
          </div>
        </div>

        {/* Main Stage SVG */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Green Battery Glow */}
            <filter id="battery-green-glow-s18" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#22C55E" floodOpacity="0.85" />
            </filter>
            {/* Red Broken Glow */}
            <filter id="battery-red-glow-s18" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#EF4444" floodOpacity="0.85" />
            </filter>
            {/* Heavy Iron Weight Shadow */}
            <filter id="weight-shadow-s18" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* BATTERY ICON (Center x=960, y=720) */}
          <g
            transform={`translate(960, 720) scale(1, ${crushYScale})`}
            filter={isCrushed ? "url(#battery-red-glow-s18)" : "url(#battery-green-glow-s18)"}
          >
            {/* Battery Terminal Nub (Right) */}
            <rect x="210" y="-35" width="28" height="70" rx="8" fill="#64748B" />

            {/* Battery Outer Casing */}
            <rect
              x="-210"
              y="-95"
              width="420"
              height="190"
              rx="24"
              fill="#1E293B"
              stroke={isCrushed ? "#EF4444" : "#22C55E"}
              strokeWidth="10"
            />

            {/* Battery Fill Level Bar */}
            {batteryLevel > 0 && (
              <rect
                x="-195"
                y="-80"
                width={(390 * batteryLevel) / 100}
                height="160"
                rx="14"
                fill={isCrushed ? "#EF4444" : "#22C55E"}
              />
            )}

            {/* Capacity Readout Text */}
            <text
              x="0"
              y="16"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="48"
              fontFamily="monospace"
              fontWeight="900"
              letterSpacing="4"
            >
              {Math.round(batteryLevel)}%
            </text>
          </g>

          {/* GIANT BLACK IRON WEIGHT (10 TONS) dropping from above */}
          {isDropping && (
            <g transform={`translate(960, ${weightY})`} filter="url(#weight-shadow-s18)">
              {/* Iron Ring Handle on Top */}
              <circle cx="0" cy="-140" r="42" fill="none" stroke="#64748B" strokeWidth="16" />

              {/* Heavy Trapezoidal Weight Body */}
              <polygon
                points="-260,180 260,180 210,-100 -210,-100"
                fill="#0A0F1D"
                stroke="#475569"
                strokeWidth="8"
                strokeLinejoin="round"
              />

              {/* Embossed Text "10 TONS" */}
              <rect x="-140" y="10" width="280" height="60" rx="10" fill="#18181B" stroke="#64748B" strokeWidth="3" />
              <text
                x="0"
                y="52"
                textAnchor="middle"
                fill="#E2E8F0"
                fontSize="38"
                fontFamily="Impact, Montserrat, sans-serif"
                fontWeight="900"
                letterSpacing="6"
              >
                10 TONS
              </text>
            </g>
          )}
        </svg>

        {/* Bottom Alert Status */}
        {isCrushed && (
          <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
            <div className="px-10 py-3 rounded-2xl bg-black/95 border-2 border-red-600 shadow-[0_0_35px_rgba(239,68,68,0.7)]">
              <span className="font-mono text-base md:text-lg font-black tracking-widest uppercase text-red-400">
                TOTAL CELLULAR ENERGY COLLAPSE // ZERO RESERVE
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
