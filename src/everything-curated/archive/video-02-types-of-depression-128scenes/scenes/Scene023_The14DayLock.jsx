import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 23: The 14-Day Lock
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Solid yellow warning background (#FEF08A)
 * - Transition: Continuous from Scene 22
 * - Beginning: Scribbled calendar remains (frames 0-20).
 * - Action/Climax: Heavy iron chains slam diagonally across calendar (frame 22).
 *   Massive slate-grey padlock (#64748B) slams down and snaps shut (frames 32-50).
 * - Ending/Hold: Text "EPISODE LOCKED" slams in below padlock to frame 150.
 */
export const Scene023_The14DayLock = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Chains Slam (triggers at frame 20)
  const isChains = frame >= 20;
  const chainsSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const chainsScale = interpolate(chainsSpring, [0, 1], [1.6, 1.0]);

  // 2. Padlock Drop & Snap Shut (triggers at frame 34)
  const isPadlock = frame >= 34;
  const padlockSpring = spring({
    frame: frame - 34,
    fps,
    config: { damping: 9, stiffness: 240, mass: 1.4 },
  });
  const padlockScale = interpolate(padlockSpring, [0, 1], [2.2, 1.0]);

  // Shackle click shut (clicks down at frame 48)
  const isLocked = frame >= 48;
  const shackleY = isLocked
    ? interpolate(frame, [48, 54], [0, 24], { extrapolateRight: "clamp" })
    : 0;

  // Impact Shudder on lock snap (frames 48 to 65)
  const shudder = isLocked && frame <= 66
    ? Math.sin(frame * 4.4) * interpolate(frame, [48, 66], [12, 0], { extrapolateRight: "clamp" })
    : 0;

  // 3. "EPISODE LOCKED" Text Slam (frame 55)
  const textSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 11, stiffness: 180 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.5, 1.0]);
  const textAlpha = interpolate(frame, [55, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans" style={{ backgroundColor: "#FEF08A" }}>
      {/* Warning Hazard Stripes */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-black/85" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/85" />

      {/* Main Viewport Container */}
      <div
        className="w-full h-full relative pointer-events-none"
        style={{ transform: `translate(0px, ${shudder}px)` }}
      >
        {/* Header Container */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-black/95 border-2 border-black shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-red-400 uppercase block mb-1">
              CHRONICITY CRITERIA LOCKED
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none text-white">
              EPISODE DIAGNOSTIC SEAL
            </h1>
          </div>
        </div>

        {/* Main Stage SVG */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="lock-shadow-s23" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* BACKGROUND CALENDAR BOARD (Center 960, 540) */}
          <g transform="translate(960, 520)">
            <rect x="-360" y="-220" width="720" height="440" rx="20" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
            <rect x="-360" y="-220" width="720" height="75" rx="20" fill="#DC2626" />
            <text x="0" y="-172" textAnchor="middle" fill="#FFFFFF" fontSize="30" fontWeight="900" letterSpacing="4">
              OCTOBER // 14 CONSECUTIVE DAYS
            </text>

            {/* Red Marker Scribbles Across Days */}
            <g stroke="#EF4444" strokeWidth="6" strokeLinecap="round" opacity="0.85">
              <line x1="-300" y1="-100" x2="300" y2="180" />
              <line x1="300" y1="-100" x2="-300" y2="180" />
              <line x1="-280" y1="20" x2="280" y2="20" />
            </g>
          </g>

          {/* HEAVY IRON CHAINS SLAMMING ACROSS DIAGONALLY */}
          {isChains && (
            <g transform={`translate(960, 520) scale(${chainsScale})`} filter="url(#lock-shadow-s23)">
              {/* Chain Diagonal 1 */}
              <line x1="-480" y1="-320" x2="480" y2="320" stroke="#18181B" strokeWidth="28" strokeLinecap="round" />
              <line x1="-480" y1="-320" x2="480" y2="320" stroke="#64748B" strokeWidth="12" strokeDasharray="24 20" strokeLinecap="round" />

              {/* Chain Diagonal 2 */}
              <line x1="480" y1="-320" x2="-480" y2="320" stroke="#18181B" strokeWidth="28" strokeLinecap="round" />
              <line x1="480" y1="-320" x2="-480" y2="320" stroke="#64748B" strokeWidth="12" strokeDasharray="24 20" strokeLinecap="round" />
            </g>
          )}

          {/* MASSIVE SLATE-GREY PADLOCK (#64748B) (Center 960, 520) */}
          {isPadlock && (
            <g transform={`translate(960, 520) scale(${padlockScale})`} filter="url(#lock-shadow-s23)">
              {/* Padlock Steel Shackle (Slides down when locked) */}
              <g transform={`translate(0, ${shackleY})`}>
                <path
                  d="M -75 -40
                     L -75 -150
                     A 75 75 0 0 1 75 -150
                     L 75 -40"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="32"
                  strokeLinecap="round"
                />
                <path
                  d="M -75 -40
                     L -75 -150
                     A 75 75 0 0 1 75 -150
                     L 75 -40"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </g>

              {/* Padlock Slate-Grey Heavy Body */}
              <rect
                x="-125"
                y="-50"
                width="250"
                height="220"
                rx="30"
                fill="#475569"
                stroke="#1E293B"
                strokeWidth="12"
              />
              {/* Inner Face Bevel */}
              <rect x="-105" y="-30" width="210" height="180" rx="20" fill="#64748B" />

              {/* Keyhole */}
              <circle cx="0" cy="40" r="22" fill="#0F172A" />
              <polygon points="-8,40 8,40 14,90 -14,90" fill="#0F172A" />

              {/* Lock Snap Flash at keyhole */}
              {isLocked && frame <= 56 && (
                <circle cx="0" cy="40" r={interpolate(frame, [48, 56], [10, 80])} fill="none" stroke="#FFFFFF" strokeWidth="6" opacity={interpolate(frame, [48, 56], [1, 0])} />
              )}
            </g>
          )}
        </svg>

        {/* Text "EPISODE LOCKED" Below Padlock */}
        {frame >= 55 && (
          <div
            className="absolute bottom-20 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6"
            style={{
              opacity: textAlpha,
              transform: `scale(${textScale})`,
            }}
          >
            <div className="px-12 py-5 rounded-3xl bg-black border-4 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.8)]">
              <span className="text-white text-5xl md:text-7xl font-black tracking-widest uppercase leading-none block font-mono">
                EPISODE LOCKED
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
