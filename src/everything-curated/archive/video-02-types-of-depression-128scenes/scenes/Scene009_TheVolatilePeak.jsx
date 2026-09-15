import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 9: The Volatile Peak
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Stylized glowing track in abstract sky (Dark blue/black abyss #020617)
 * - Characters & Props: Rollercoaster cart, glowing yellow peak (#FDE047), lightning bolt
 * - Beginning: Cart slowly edges over crest of massive glowing yellow peak (Mania) (frames 0-50).
 * - Action/Climax: Cart tips over edge, plunging straight down 90-degree drop into abyss (frames 50-90).
 * - Ending/Hold: Massive jagged yellow lightning bolt strikes base of abyss to frame 180.
 */
export const Scene009_TheVolatilePeak = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance zoom-out from cracked gauge
  const enterScale = interpolate(frame, [0, 15], [1.4, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Cart Kinematics:
  // Phase 1 (0 to 50): Creeping slowly to the crest
  // Phase 2 (50 to 86): Tipping 90 deg and plunging down into abyss
  const isPlunging = frame >= 50;

  // Horizontal position
  const cartX = interpolate(frame, [0, 48, 52, 85], [380, 890, 920, 920], {
    extrapolateRight: "clamp",
  });

  // Vertical position with accelerating drop
  const dropTime = Math.max(0, frame - 52);
  const cartY = frame < 52
    ? 300 + Math.sin(frame * 0.1) * 2
    : 300 + Math.pow(dropTime * 0.95, 2.3);

  // Cart pitch angle: 0 deg at top, tilts to 90 deg straight down
  const cartAngle = interpolate(frame, [48, 55], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Lightning Strike at Abyss Base (triggers at frame 86)
  const isLightning = frame >= 86;
  const lightningFlash = frame >= 86 && frame <= 98
    ? (Math.floor(frame / 2) % 2 === 0 ? 0.9 : 0.3)
    : 0;

  const lightningOpacity = interpolate(frame, [86, 92, 120, 140], [0, 1, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screen shake on lightning impact
  const impactShake = frame >= 86 && frame <= 105
    ? Math.sin(frame * 4.2) * interpolate(frame, [86, 105], [14, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill className="bg-[#020617] overflow-hidden select-none font-sans text-white">
      {/* Background Lightning Flash Screen Overlay */}
      {lightningFlash > 0 && (
        <div
          className="absolute inset-0 bg-yellow-400 pointer-events-none z-10"
          style={{ opacity: lightningFlash * 0.35 }}
        />
      )}

      {/* Main Viewport Container */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `scale(${enterScale}) translate(0px, ${impactShake}px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Sky Stars / Glow particles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <circle cx="320" cy="180" r="2" fill="#FDE047" />
          <circle cx="560" cy="120" r="2.5" fill="#FFFFFF" />
          <circle cx="820" cy="220" r="1.5" fill="#FDE047" />
          <circle cx="1200" cy="150" r="2" fill="#FFFFFF" />
          <circle cx="1480" cy="260" r="3" fill="#FDE047" />
          <circle cx="1680" cy="140" r="1.5" fill="#FFFFFF" />
        </svg>

        {/* Header Container */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-8 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-yellow-400/50 shadow-2xl backdrop-blur-md flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FDE047] animate-ping" />
            <h1 className="text-white text-3xl md:text-4xl font-black tracking-widest uppercase m-0">
              THE VOLATILE PEAK
            </h1>
          </div>
        </div>

        {/* Rollercoaster Track SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Glowing Yellow Peak Filter */}
            <filter id="yellow-peak-glow-s9" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#FDE047" floodOpacity="0.85" />
            </filter>
            {/* Lightning Glow */}
            <filter id="lightning-glow-s9" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#FDE047" floodOpacity="1" />
            </filter>
          </defs>

          {/* Glowing Rollercoaster Track */}
          <g filter="url(#yellow-peak-glow-s9)">
            {/* Track Rail: Ascends from left up to (920, 300), then drops 90 degrees straight down to (920, 1080) */}
            <path
              d="M 120 720
                 C 400 700 680 420 880 305
                 L 920 305
                 L 920 1080"
              fill="none"
              stroke="#FDE047"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Lower Parallel Track Rail */}
            <path
              d="M 120 745
                 C 400 725 680 445 880 330
                 L 945 330
                 L 945 1080"
              fill="none"
              stroke="#EAB308"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Track Ties / Sleepers */}
            {[200, 350, 500, 650, 780, 870].map((tx) => (
              <line
                key={tx}
                x1={tx}
                y1={interpolate(tx, [200, 870], [705, 310])}
                x2={tx + 12}
                y2={interpolate(tx, [200, 870], [730, 335])}
                stroke="#CA8A04"
                strokeWidth="4"
              />
            ))}
            {[380, 480, 580, 680, 780, 880, 980].map((ty) => (
              <line
                key={ty}
                x1="920"
                y1={ty}
                x2="945"
                y2={ty}
                stroke="#CA8A04"
                strokeWidth="4"
              />
            ))}
          </g>

          {/* Peak Label Badge ("MANIA") */}
          <g transform="translate(850, 230)">
            <rect x="-80" y="-22" width="160" height="44" rx="12" fill="#0F172A" stroke="#FDE047" strokeWidth="3" />
            <text x="0" y="7" textAnchor="middle" fill="#FDE047" fontSize="22" fontWeight="900" letterSpacing="4">
              MANIA
            </text>
          </g>

          {/* Abyss Label at Bottom */}
          <g transform="translate(1030, 860)">
            <rect x="-90" y="-20" width="180" height="40" rx="10" fill="#000000" stroke="#475569" strokeWidth="2" />
            <text x="0" y="6" textAnchor="middle" fill="#94A3B8" fontSize="16" fontWeight="900" letterSpacing="3">
              THE ABYSS (0%)
            </text>
          </g>

          {/* THE ROLLERCOASTER CART */}
          <g
            transform={`translate(${cartX}, ${cartY}) rotate(${cartAngle})`}
            filter="drop-shadow(0 4px 12px rgba(0,0,0,0.8))"
          >
            {/* Cart Body */}
            <rect x="-42" y="-28" width="84" height="42" rx="10" fill="#EF4444" stroke="#FFFFFF" strokeWidth="4" />
            {/* Cart Windshield / Cockpit */}
            <path d="M 12 -28 L 26 -14 L 38 -14 L 38 -28 Z" fill="#60A5FA" opacity="0.8" />
            {/* Seat & Headrest */}
            <rect x="-24" y="-38" width="16" height="14" rx="4" fill="#1F2937" />
            {/* Cart Wheels */}
            <circle cx="-24" cy="18" r="10" fill="#374151" stroke="#FFFFFF" strokeWidth="3" />
            <circle cx="24" cy="18" r="10" fill="#374151" stroke="#FFFFFF" strokeWidth="3" />
            {/* Speed Wind Streaks during plunge */}
            {isPlunging && cartY < 950 && (
              <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
                <line x1="-30" y1="-50" x2="-30" y2="-90" strokeDasharray="6 6" />
                <line x1="0" y1="-45" x2="0" y2="-85" strokeDasharray="6 6" />
                <line x1="30" y1="-50" x2="30" y2="-90" strokeDasharray="6 6" />
              </g>
            )}
          </g>

          {/* Massive Jagged Yellow Lightning Bolt at Abyss Base */}
          {isLightning && (
            <g
              transform="translate(920, 780)"
              filter="url(#lightning-glow-s9)"
              opacity={lightningOpacity}
            >
              {/* Lightning Path */}
              <path
                d="M 0 -380
                   L -35 -210 L 15 -210
                   L -45 -60 L 25 -60
                   L -55 120 L 35 120
                   L 0 280
                   L 80 80 L 10 80
                   L 70 -90 L -10 -90
                   L 60 -240 L 0 -240 Z"
                fill="#FDE047"
                stroke="#FFFFFF"
                strokeWidth="4"
              />
              {/* Impact Flash Ring */}
              <circle cx="0" cy="270" r="120" fill="none" stroke="#FDE047" strokeWidth="6" opacity="0.7" />
              <circle cx="0" cy="270" r="160" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 8" opacity="0.5" />
            </g>
          )}
        </svg>

        {/* Bottom Banner */}
        {isLightning && (
          <div className="absolute bottom-16 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
            <div className="px-10 py-3.5 rounded-2xl bg-black/90 border-2 border-yellow-400 shadow-[0_0_40px_rgba(253,224,71,0.8)]">
              <span className="text-yellow-300 font-mono text-base md:text-lg font-black tracking-widest uppercase">
                VERTICAL COLLAPSE // THE MANIC PLUNGE
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
