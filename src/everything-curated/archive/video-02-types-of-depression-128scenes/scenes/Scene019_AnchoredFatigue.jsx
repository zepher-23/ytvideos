import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 19: Anchored Fatigue
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Clean minimalist floor
 * - Characters & Props: Stickman, heavy iron weight, chains
 * - Beginning: Stickman stands next to crushed battery and heavy weight (frames 0-35).
 * - Action/Climax: Chains wrap around his waist. He tries to take a step forward (frames 35-50),
 *   but is violently yanked backwards by the weight (frame 55).
 * - Ending/Hold: Slumps to the floor, anchored by the boulder to frame 180.
 */
export const Scene019_AnchoredFatigue = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Camera zoom-out entrance
  const enterScale = interpolate(frame, [0, 15], [1.2, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Step attempt & violent yank back
  // - Frames 30 to 48: tries to step forward (X moves from 820 to 890)
  // - Frame 52: violent yank back! (X snaps back to 780 with recoil shudder)
  let stickmanX = 820;
  let stickmanRecoilX = 0;
  let stickmanRecoilY = 0;
  let isYanked = frame >= 50;

  if (frame >= 30 && frame < 50) {
    stickmanX = interpolate(frame, [30, 48], [820, 890]);
  } else if (frame >= 50) {
    const yankSpring = spring({
      frame: frame - 50,
      fps,
      config: { damping: 9, stiffness: 220 },
    });
    stickmanX = interpolate(yankSpring, [0, 1], [890, 780]);
    if (frame <= 72) {
      stickmanRecoilX = Math.sin(frame * 4.5) * interpolate(frame, [50, 72], [14, 0]);
      stickmanRecoilY = Math.cos(frame * 3.8) * interpolate(frame, [50, 72], [8, 0]);
    }
  }

  // Slump to floor progression after yank (frames 60 to 95)
  const slumpProgress = interpolate(frame, [60, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stickmanY = 740 + slumpProgress * 40;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Floor Line */}
      <div className="absolute bottom-28 left-0 right-0 h-1.5 bg-slate-700/60" />

      {/* Main Viewport Container */}
      <div
        className="w-full h-full relative pointer-events-none"
        style={{
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block mb-1">
              THE PHYSICAL TRAP
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              ANCHORED BY LEADEN EXHAUSTION
            </h1>
          </div>
        </div>

        {/* Main Stage SVG */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="chain-shadow-s19" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* GIANT 10-TON BOULDER/WEIGHT ON LEFT (x=460, y=740) */}
          <g transform="translate(460, 740)" filter="url(#chain-shadow-s19)">
            {/* Ground Shadow */}
            <ellipse cx="0" cy="45" rx="190" ry="24" fill="#000000" opacity="0.6" />

            {/* Heavy Iron Ring Anker */}
            <circle cx="80" cy="-60" r="32" fill="none" stroke="#64748B" strokeWidth="12" />

            {/* Massive Boulder Body */}
            <polygon
              points="-180,40 180,40 140,-160 -140,-160"
              fill="#0A0F1D"
              stroke="#475569"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Texture facets */}
            <line x1="-80" y1="-140" x2="40" y2="20" stroke="#334155" strokeWidth="3" />
            <line x1="60" y1="-120" x2="110" y2="10" stroke="#334155" strokeWidth="3" />

            <text
              x="0"
              y="-50"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="30"
              fontFamily="Impact, Montserrat, sans-serif"
              fontWeight="900"
              letterSpacing="4"
            >
              10 TONS
            </text>
          </g>

          {/* HEAVY BLACK IRON CHAINS (from Boulder ring to Stickman waist) */}
          <g filter="url(#chain-shadow-s19)">
            {/* Chain links drawn with dashed stroke */}
            <path
              d={`M 540 680 Q ${540 + (stickmanX - 540) * 0.5} ${720 + (isYanked ? 0 : 25)} ${stickmanX} ${stickmanY - 50}`}
              fill="none"
              stroke="#18181B"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d={`M 540 680 Q ${540 + (stickmanX - 540) * 0.5} ${720 + (isYanked ? 0 : 25)} ${stickmanX} ${stickmanY - 50}`}
              fill="none"
              stroke="#64748B"
              strokeWidth="6"
              strokeDasharray="14 12"
              strokeLinecap="round"
            />
          </g>

          {/* Ground shadow for stickman */}
          <ellipse
            cx={stickmanX + stickmanRecoilX}
            cy={785}
            rx={85}
            ry={16}
            fill="#000000"
            opacity={0.45}
          />

          {/* Canonical CuratedStickman */}
          <CuratedStickman
            x={stickmanX + stickmanRecoilX}
            y={stickmanY + stickmanRecoilY}
            scale={1.2}
            variant="adult"
            pose={isYanked ? "defeat" : "idle"}
            mouth="frown"
            eyes="defeat"
            lookDirection={isYanked ? "down" : "right"}
            slumpProgress={slumpProgress}
            frame={frame}
          />
        </svg>

        {/* Bottom Status Card */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-black/95 border border-slate-700 shadow-2xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
              {slumpProgress > 0.8
                ? "IMMOBILIZED: VOLITIONAL EFFORT SEVERED"
                : "ATTEMPTING PHYSICAL FORWARD MOVEMENT"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
