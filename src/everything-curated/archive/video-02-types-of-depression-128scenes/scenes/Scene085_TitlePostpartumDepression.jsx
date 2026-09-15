import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 85: Title - Postpartum Depression
 * Duration: 150 frames (5.0s)
 * Environment: Dark navy blue background (#0F172A).
 * Transition: Slide-up.
 * Characters & Props: Large typography, cute pink pacifier crushed and encased by dark thorny vines.
 */
export const Scene085_TitlePostpartumDepression = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-up entrance spring
  const slideSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const slideY = interpolate(slideSpring, [0, 1], [60, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Vine creeping & wrapping progression: frames 30 to 95
  const vineProgress = interpolate(frame, [30, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pacifier crushing factor: frames 60 to 110
  const crushProgress = interpolate(frame, [60, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Background Subtle Floral/Cellular Rings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <circle cx="960" cy="540" r="300" fill="none" stroke="#F472B6" strokeWidth="2" strokeDasharray="6 12" />
        <circle cx="960" cy="540" r="450" fill="none" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="4 16" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `translateY(${slideY}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(244, 114, 182, 0.4)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            7. POSTPARTUM DEPRESSION
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-pink-300">
            Perinatal Onset • Endocrine Withdrawal • Diagnostic Profile
          </p>
        </div>
      </div>

      {/* Main SVG Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateY(${slideY}px)` }}
      >
        <defs>
          {/* Pacifier Glow Filter */}
          <filter id="pinkGlow85" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Vine Shadow Filter */}
          <filter id="vineShadow85" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.8" />
          </filter>

          {/* Pink Gradient for Pacifier */}
          <linearGradient id="pacifierGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>

        {/* Ambient Floor Reflection */}
        <ellipse cx="960" cy="800" rx="220" ry="30" fill="#020617" opacity="0.6" />

        {/* THE CUTE PINK PACIFIER (x=960, y=560) */}
        <g
          transform={`
            translate(960, 560)
            scale(${interpolate(crushProgress, [0, 1], [1.4, 1.15])})
            rotate(${crushProgress * -8})
          `}
          filter="url(#pinkGlow85)"
        >
          {/* Ring Handle */}
          <circle
            cx="0"
            cy="110"
            r="55"
            fill="none"
            stroke="#F472B6"
            strokeWidth="16"
          />

          {/* Pacifier Silicone Shield (Butterfly contour) */}
          <path
            d="
              M 0 -10
              C 80 -80, 140 0, 120 70
              C 90 90, 40 60, 0 50
              C -40 60, -90 90, -120 70
              C -140 0, -80 -80, 0 -10 Z
            "
            fill="url(#pacifierGrad)"
            stroke="#FBCFE8"
            strokeWidth="4"
          />

          {/* Shield Ventilation Holes */}
          <circle cx="-65" cy="30" r="12" fill="#0F172A" />
          <circle cx="65" cy="30" r="12" fill="#0F172A" />

          {/* Center Button Plug */}
          <circle cx="0" cy="40" r="32" fill="#FDF2F8" stroke="#F472B6" strokeWidth="5" />
          <circle cx="0" cy="40" r="18" fill="#F472B6" />

          {/* Soft Nipple (Upper part) */}
          <path
            d="
              M -38 -10
              C -45 -90, -35 -140, 0 -140
              C 35 -140, 45 -90, 38 -10
              Z
            "
            fill="rgba(253, 242, 248, 0.7)"
            stroke="#FBCFE8"
            strokeWidth="3.5"
          />
        </g>

        {/* THICK DARK THORNY VINES SNARLING IN FROM EDGES */}
        {vineProgress > 0 && (
          <g filter="url(#vineShadow85)">
            {/* Vine 1: From Bottom Left to Center */}
            <g
              stroke="#1E293B"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d={`
                  M -50 1000
                  Q 350 900, ${interpolate(vineProgress, [0, 1], [350, 780])} ${interpolate(vineProgress, [0, 1], [900, 680])}
                  T ${interpolate(vineProgress, [0, 1], [500, 920])} ${interpolate(vineProgress, [0, 1], [800, 560])}
                  T ${interpolate(vineProgress, [0, 1], [600, 1020])} ${interpolate(vineProgress, [0, 1], [700, 480])}
                `}
              />
            </g>

            {/* Vine 2: From Top Right to Center */}
            <g
              stroke="#1E293B"
              strokeWidth="22"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d={`
                  M 2000 150
                  Q 1550 250, ${interpolate(vineProgress, [0, 1], [1550, 1150])} ${interpolate(vineProgress, [0, 1], [250, 440])}
                  T ${interpolate(vineProgress, [0, 1], [1400, 980])} ${interpolate(vineProgress, [0, 1], [350, 530])}
                  T ${interpolate(vineProgress, [0, 1], [1200, 890])} ${interpolate(vineProgress, [0, 1], [450, 620])}
                `}
              />
            </g>

            {/* Vine 3: From Top Left wrapping around nipple */}
            <g
              stroke="#0F172A"
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d={`
                  M -20 180
                  Q 450 300, ${interpolate(vineProgress, [0, 1], [450, 860])} ${interpolate(vineProgress, [0, 1], [300, 480])}
                  T ${interpolate(vineProgress, [0, 1], [600, 1050])} ${interpolate(vineProgress, [0, 1], [400, 580])}
                `}
              />
            </g>

            {/* Sharp Thorns on Vines (Pop in along the vines) */}
            {vineProgress > 0.4 && (
              <g fill="#334155" stroke="#0F172A" strokeWidth="2">
                {/* Thorn 1 */}
                <polygon points="780,680 750,710 795,690" />
                {/* Thorn 2 */}
                <polygon points="860,480 840,440 880,470" />
                {/* Thorn 3 */}
                <polygon points="980,530 1020,510 990,550" />
                {/* Thorn 4 */}
                <polygon points="1050,580 1090,610 1040,600" />
                {/* Thorn 5 */}
                <polygon points="920,560 880,580 910,540" />
                {/* Thorn 6 */}
                <polygon points="1020,480 1050,450 1010,470" />
              </g>
            )}
          </g>
        )}

        {/* Clinical Telemetry Badge (Bottom Center) */}
        <g
          transform="translate(960, 920)"
          opacity={interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        >
          <rect
            x="-240"
            y="-25"
            width="480"
            height="50"
            rx="14"
            fill="#1E293B"
            stroke="#F472B6"
            strokeWidth="2"
          />
          <text
            x="0"
            y="7"
            fill="#FBCFE8"
            fontSize="18"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="2"
          >
            SUDDEN ENDOCRINE WITHDRAWAL
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
