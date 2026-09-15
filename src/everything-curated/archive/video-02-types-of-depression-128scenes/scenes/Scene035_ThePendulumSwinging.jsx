import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 35: The Pendulum Swinging
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Clean minimalist background (#0A0F1D)
 * - Characters & Props: Heavy brass pendulum (#D97706), peak bubbles ("Mania", "Depression")
 * - Beginning: Pendulum hangs in center, "PENDULUM" types above (frames 0-25).
 * - Action/Climax: Yanked to far left ("Mania"), swings violently to far right ("Depression"),
 *   looping continuously with extreme sinusoidal physics (frames 30-210).
 * - Ending/Hold: Text bubbles pop in at peaks to frame 210.
 */
export const Scene035_ThePendulumSwinging = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance slide-up
  const enterY = interpolate(frame, [0, 14], [140, 0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Pendulum Swing Dynamics:
  // - 0 to 25: hanging vertical at 0 deg
  // - 25 to 40: yanked to left (-52 deg)
  // - 40+: continuous harmonic oscillation
  let pendulumAngle = 0;
  if (frame < 25) {
    pendulumAngle = 0;
  } else if (frame >= 25 && frame < 40) {
    pendulumAngle = interpolate(frame, [25, 40], [0, -52]);
  } else {
    // Harmonic oscillation with period ~68 frames
    pendulumAngle = Math.sin((frame - 40) * 0.092 - Math.PI / 2) * 52;
  }

  // Peak detection for pop-in bubbles
  const isNearLeftPeak = pendulumAngle < -42;
  const isNearRightPeak = pendulumAngle > 42;

  // Pivot coordinates: (x=960, y=140), arm length: 500px
  const armLen = 500;
  const rad = (pendulumAngle * Math.PI) / 180;
  const bobX = 960 + Math.sin(rad) * armLen;
  const bobY = 140 + Math.cos(rad) * armLen;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="grid-s35" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s35)" />
      </svg>

      {/* Viewport with Slide-Up */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate(0px, ${enterY}px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#1E293B]/95 border border-amber-500/50 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase block mb-1">
              DYNAMICS OF DUAL POLARITY
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              THE BIPOLAR PENDULUM
            </h1>
          </div>
        </div>

        {/* Main Stage SVG */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="brass-glow-s35" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#D97706" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Top Pivot Mount (Center 960, 140) */}
          <g transform="translate(960, 140)">
            <rect x="-60" y="-15" width="120" height="30" rx="8" fill="#1E293B" stroke="#D97706" strokeWidth="4" />
            <circle cx="0" cy="0" r="18" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" />
          </g>

          {/* Swing Trajectory Guide Arc */}
          <path
            d="M 560 540 Q 960 680 1360 540"
            fill="none"
            stroke="#334155"
            strokeWidth="3"
            strokeDasharray="6 6"
          />

          {/* BRASS PENDULUM SHAFT & BOB */}
          <g filter="url(#brass-glow-s35)">
            {/* Rigid Brass Rod */}
            <line
              x1="960"
              y1="140"
              x2={bobX}
              y2={bobY}
              stroke="#D97706"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <line
              x1="960"
              y1="140"
              x2={bobX}
              y2={bobY}
              stroke="#FBBF24"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Heavy Brass Bob (Sphere at bottom) */}
            <circle cx={bobX} cy={bobY} r="54" fill="#B45309" stroke="#FBBF24" strokeWidth="6" />
            <circle cx={bobX - 16} cy={bobY - 16} r="14" fill="#FEF08A" opacity="0.6" />
          </g>

          {/* PEAK 1: "MANIA" (Left Peak x=520, y=480) */}
          <g transform="translate(520, 480)" opacity={frame >= 35 ? 1 : 0.2}>
            <rect
              x="-90"
              y="-26"
              width="180"
              height="52"
              rx="14"
              fill="#18181B"
              stroke={isNearLeftPeak ? "#EF4444" : "#475569"}
              strokeWidth={isNearLeftPeak ? "4" : "2"}
              style={{
                filter: isNearLeftPeak ? "drop-shadow(0 0 18px #EF4444)" : "none",
              }}
            />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fill={isNearLeftPeak ? "#EF4444" : "#94A3B8"}
              fontSize="22"
              fontWeight="900"
              letterSpacing="3"
            >
              MANIA
            </text>
          </g>

          {/* PEAK 2: "DEPRESSION" (Right Peak x=1400, y=480) */}
          <g transform="translate(1400, 480)" opacity={frame >= 35 ? 1 : 0.2}>
            <rect
              x="-110"
              y="-26"
              width="220"
              height="52"
              rx="14"
              fill="#18181B"
              stroke={isNearRightPeak ? "#3B82F6" : "#475569"}
              strokeWidth={isNearRightPeak ? "4" : "2"}
              style={{
                filter: isNearRightPeak ? "drop-shadow(0 0 18px #3B82F6)" : "none",
              }}
            />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fill={isNearRightPeak ? "#60A5FA" : "#94A3B8"}
              fontSize="22"
              fontWeight="900"
              letterSpacing="3"
            >
              DEPRESSION
            </text>
          </g>
        </svg>

        {/* Bottom Subtitle Card */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-black/95 border border-amber-500/50 shadow-2xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-amber-300">
              UNSTABLE TRAJECTORY: MOMENTUM ACCELERATES BETWEEN EXTREME POLES
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
