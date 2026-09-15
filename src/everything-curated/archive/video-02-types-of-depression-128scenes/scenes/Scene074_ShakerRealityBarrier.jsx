import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 74: Shaker Reality Barrier
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Deep dark void (#0A0F1D).
 * - Characters & Props: Thick brick wall labeled "REALITY", violent slow-motion shatter,
 *   floating brick shrapnel, revealed hypnotic swirling neon purple vortex (#A855F7).
 * - Beginning (0-32f): Impenetrable brick wall fills the screen with solid steel "REALITY" plaque.
 * - Action/Climax (32-95f): Wall violently shatters outward; bricks blast apart and float in slow motion.
 * - Ending/Hold (95-180f): Behind the rubble, a swirling chaotic neon purple vortex spins with gravitational pull.
 */
export const Scene074_ShakerRealityBarrier = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Wall shatter trigger at frame 32
  const isShattered = frame >= 32;
  const shatterAge = Math.max(0, frame - 32);

  // Screen shake on shatter
  const shakeX = isShattered && shatterAge < 25 ? Math.sin(shatterAge * 2.6) * Math.max(0, 18 - shatterAge * 0.7) : 0;
  const shakeY = isShattered && shatterAge < 25 ? Math.cos(shatterAge * 2.9) * Math.max(0, 15 - shatterAge * 0.6) : 0;

  // Expanding breach hole in wall
  const breachRadius = isShattered ? interpolate(shatterAge, [0, 35], [0, 520], { extrapolateRight: "clamp" }) : 0;

  // Vortex rotation
  const vortexRot = frame * 3.5;

  // 12 Floating shattered bricks
  const floatingBricks = [
    { x: -280, y: -180, rot: -45, speed: 6 },
    { x: 260, y: -220, rot: 55, speed: 7 },
    { x: -350, y: 120, rot: -75, speed: 8 },
    { x: 380, y: 140, rot: 60, speed: 6.5 },
    { x: -140, y: -320, rot: 25, speed: 9 },
    { x: 180, y: -310, rot: -35, speed: 8.5 },
    { x: -220, y: 320, rot: -85, speed: 7.5 },
    { x: 250, y: 340, rot: 95, speed: 8 },
    { x: -440, y: -40, rot: -120, speed: 9.5 },
    { x: 460, y: -30, rot: 110, speed: 10 },
    { x: 0, y: -380, rot: 15, speed: 9 },
    { x: 0, y: 400, rot: -25, speed: 8 },
  ];

  return (
    <AbsoluteFill
      className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-black/85 border border-purple-500/80 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-purple-400 font-bold uppercase block mb-0.5">
            PSYCHIC DISSOLUTION
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            SHATTERING THE REALITY BARRIER
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="vortex-glow-s74" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="30" floodColor="#A855F7" floodOpacity="0.85" />
          </filter>
          <radialGradient id="vortex-core-s74" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#C084FC" />
            <stop offset="70%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#3B0764" />
          </radialGradient>
        </defs>

        {/* 1. REVEALED CHAOTIC NEON PURPLE VORTEX (Background Layer) */}
        {isShattered && (
          <g transform="translate(960, 540)" filter="url(#vortex-glow-s74)">
            {/* Core Swirl Disc */}
            <circle cx="0" cy="0" r={breachRadius} fill="url(#vortex-core-s74)" />

            {/* Rotating Spiral Arms */}
            <g transform={`rotate(${vortexRot})`}>
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <path
                  key={i}
                  d={`M 0 0 Q ${120 + i * 15} -140 ${260 + i * 15} 0 T ${420} 0`}
                  fill="none"
                  stroke="#F3E8FF"
                  strokeWidth="8"
                  opacity="0.6"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>

            {/* Inward Gravitational Light Ring */}
            <circle cx="0" cy="0" r={breachRadius * 0.9} fill="none" stroke="#E9D5FF" strokeWidth="6" strokeDasharray="16 8" />
          </g>
        )}

        {/* 2. SOLID BRICK WALL (Foreground) */}
        {/* We draw the perimeter wall blocks outside the breach circle */}
        <g>
          {/* Pre-shatter solid wall covering entire screen */}
          {!isShattered ? (
            <g>
              <rect x="0" y="0" width="1920" height="1080" fill="#334155" />
              {/* Brick Mortar Grid */}
              {[...Array(12)].map((_, r) => {
                const y = r * 90;
                const isOffset = r % 2 === 1;
                return (
                  <g key={r}>
                    <line x1="0" y1={y} x2="1920" y2={y} stroke="#1E293B" strokeWidth="6" />
                    {[...Array(15)].map((_, c) => {
                      const x = c * 135 + (isOffset ? 65 : 0);
                      return (
                        <rect
                          key={c}
                          x={x + 4}
                          y={y + 4}
                          width="127"
                          height="82"
                          rx="4"
                          fill="#475569"
                          stroke="#1E293B"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Steel Center Plaque "REALITY" */}
              <g transform="translate(960, 540)">
                <rect x="-240" y="-70" width="480" height="140" rx="18" fill="#0F172A" stroke="#94A3B8" strokeWidth="6" />
                <circle cx="-210" cy="-45" r="8" fill="#CBD5E1" />
                <circle cx="210" cy="-45" r="8" fill="#CBD5E1" />
                <circle cx="-210" cy="45" r="8" fill="#CBD5E1" />
                <circle cx="210" cy="45" r="8" fill="#CBD5E1" />
                <text x="0" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="64" fontWeight="900" letterSpacing="8">
                  REALITY
                </text>
              </g>
            </g>
          ) : (
            /* Post-shatter: Wall with Circular Hole in center */
            <g>
              {/* Surrounding Wall Perimeter Mask */}
              <mask id="breach-mask-s74">
                <rect width="100%" height="100%" fill="white" />
                <circle cx="960" cy="540" r={breachRadius} fill="black" />
              </mask>

              <g mask="url(#breach-mask-s74)">
                <rect x="0" y="0" width="1920" height="1080" fill="#334155" />
                {[...Array(12)].map((_, r) => {
                  const y = r * 90;
                  const isOffset = r % 2 === 1;
                  return (
                    <g key={r}>
                      <line x1="0" y1={y} x2="1920" y2={y} stroke="#1E293B" strokeWidth="6" />
                      {[...Array(15)].map((_, c) => {
                        const x = c * 135 + (isOffset ? 65 : 0);
                        return (
                          <rect
                            key={c}
                            x={x + 4}
                            y={y + 4}
                            width="127"
                            height="82"
                            rx="4"
                            fill="#475569"
                            stroke="#1E293B"
                            strokeWidth="2"
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </g>

              {/* FLOATING SHATTERED BRICKS IN SLOW MOTION */}
              {floatingBricks.map((b, i) => {
                const bDist = Math.min(1.5, shatterAge * 0.05);
                const bX = 960 + b.x * bDist;
                const bY = 540 + b.y * bDist;
                const bRot = b.rot + shatterAge * (b.speed * 0.4);
                return (
                  <g key={i} transform={`translate(${bX}, ${bY}) rotate(${bRot})`}>
                    <rect x="-60" y="-35" width="120" height="70" rx="6" fill="#64748B" stroke="#0F172A" strokeWidth="3" />
                  </g>
                );
              })}
            </g>
          )}
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-purple-500/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-purple-200">
            DELUSIONAL BREAK: THE RIGID WALL OF OBJECTIVE REALITY SHATTERS INTO PSYCHOTIC HALLUCINATIONS
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
