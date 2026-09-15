import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 98: Triple Threat Storm
 * Duration: 210 frames (7.0s)
 * Environment: Minimalist grey-and-white checkered tile floor.
 * Transition: Hard cut.
 * Characters & Props: Stickman covering head on knees, surrounded by 3 aggressive avatars:
 *   1. Heavy black rain cloud (Depression)
 *   2. Roaring vector fireball (Anger)
 *   3. Sharp jagged cyan lightning bolts (Anxiety)
 */
export const Scene098_TripleThreatStorm = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Stickman fall to knees: frames 10 to 40
  const fallProgress = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shiverX = Math.sin(frame * 1.8) * 3;
  const shiverY = Math.cos(frame * 2.2) * 2.5;

  // 3 Threat Avatars Entrance Springs
  const cloudSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const cloudScale = interpolate(cloudSpring, [0, 1], [0.2, 1], { extrapolateRight: "clamp" });

  const fireSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 11, stiffness: 150 },
  });
  const fireScale = interpolate(fireSpring, [0, 1], [0.2, 1], { extrapolateRight: "clamp" });

  const lightningActive = frame >= 65;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Checkered Perspective Floor */}
      <TiledFloor
        frame={frame}
        perspectiveOrigin="50% 65%"
        horizonY={580}
        color="#1E293B"
        lineColor="#334155"
      />

      {/* Header Container */}
      <div
        className="absolute top-8 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterSpring,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(234, 88, 12, 0.5)",
            boxShadow: "0 0 35px rgba(234, 88, 12, 0.25)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            THE TRIPLE THREAT STORM
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-orange-400">
            PMDD Symptom Triad: Severe Depression • Irritable Rage • Panic Anxiety
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="fireGlow98" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cyanLightningGlow98" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* STICKMAN IN CENTER (Falling to knees, covering head) */}
        <g transform={`translate(${960 + shiverX}, ${780 + shiverY})`}>
          {/* Floor Shadow */}
          <ellipse cx="0" cy="15" rx="85" ry="16" fill="#000000" opacity="0.4" />

          <CuratedStickman
            x={0}
            y={0}
            scale={1.25}
            variant="adult"
            pose="crouch"
            mouth="shock"
            eyes="defeat"
            slumpProgress={fallProgress}
            frame={frame}
          />

          {/* Hands Covering Head Gesture */}
          <circle cx="-35" cy="-155" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="3.5" />
          <circle cx="35" cy="-155" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="3.5" />
        </g>

        {/* 1. THREAT AVATAR 1: HEAVY BLACK RAIN CLOUD (DEPRESSION) - Top Left (x=580, y=420) */}
        {cloudScale > 0 && (
          <g transform={`translate(580, 420) scale(${cloudScale})`}>
            {/* Cloud Shape */}
            <path
              d="
                M -120 20
                A 50 50 0 0 1 -90 -40
                A 75 75 0 0 1 40 -60
                A 60 60 0 0 1 120 -10
                A 45 45 0 0 1 110 40
                L -110 40 Z
              "
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="4"
            />
            {/* Label */}
            <rect x="-90" y="-100" width="180" height="34" rx="8" fill="#0F172A" stroke="#64748B" strokeWidth="1.5" />
            <text x="0" y="-77" fill="#94A3B8" fontSize="14" fontWeight="900" textAnchor="middle" letterSpacing="2">
              DEPRESSION
            </text>

            {/* Downward Torrential Rain Lines aimed toward stickman */}
            {[-60, -30, 0, 30, 60].map((rx, i) => (
              <line
                key={i}
                x1={rx}
                y1={50 + ((frame * 5 + i * 15) % 120)}
                x2={rx + 25}
                y2={85 + ((frame * 5 + i * 15) % 120)}
                stroke="#64748B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}
          </g>
        )}

        {/* 2. THREAT AVATAR 2: ROARING VECTOR FIREBALL (ANGER) - Right (x=1360, y=520) */}
        {fireScale > 0 && (
          <g transform={`translate(1360, 520) scale(${fireScale})`} filter="url(#fireGlow98)">
            {/* Fireball Core */}
            <circle cx="0" cy="0" r="75" fill="#EA580C" />
            <circle cx="0" cy="0" r="50" fill="#F97316" />
            <circle cx="0" cy="0" r="28" fill="#FDE047" />

            {/* Flickering Flame Tongues */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const flameLen = 80 + Math.sin(frame * 0.4 + i) * 25;
              return (
                <polygon
                  key={i}
                  points="-14,0 0,-14 14,0 0,0"
                  transform={`rotate(${angle}) translate(0, ${-flameLen})`}
                  fill="#EA580C"
                />
              );
            })}

            {/* Label */}
            <g transform="translate(0, -115)">
              <rect x="-80" y="-18" width="160" height="34" rx="8" fill="#7C2D12" stroke="#EA580C" strokeWidth="2" />
              <text x="0" y="5" fill="#FFEDD5" fontSize="15" fontWeight="900" textAnchor="middle" letterSpacing="2">
                ANGER / RAGE
              </text>
            </g>
          </g>
        )}

        {/* 3. THREAT AVATAR 3: JAGGED CYAN LIGHTNING BOLTS (ANXIETY) - Striking around stickman */}
        {lightningActive && (
          <g filter="url(#cyanLightningGlow98)">
            {/* Bolt 1: From sky left striking ground near stickman */}
            {frame % 16 < 8 && (
              <path
                d="M 760 250 L 790 420 L 740 480 L 820 620 L 780 660 L 860 770"
                stroke="#06B6D4"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Bolt 2: From sky right striking ground near stickman */}
            {frame % 20 < 10 && (
              <path
                d="M 1160 270 L 1120 440 L 1170 510 L 1090 640 L 1130 680 L 1060 780"
                stroke="#22D3EE"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Anxiety Label (Bottom Center-Left) */}
            <g transform="translate(720, 880)">
              <rect x="-80" y="-18" width="160" height="36" rx="8" fill="#083344" stroke="#06B6D4" strokeWidth="2" />
              <text x="0" y="6" fill="#A5F3FC" fontSize="15" fontWeight="900" textAnchor="middle" letterSpacing="2">
                PANIC ANXIETY
              </text>
            </g>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
