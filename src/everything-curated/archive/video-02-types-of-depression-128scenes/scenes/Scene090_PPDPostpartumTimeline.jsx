import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 90: PPD Postpartum Timeline
 * Duration: 180 frames (6.0s)
 * Environment: Continuous timeline graphic panned right to POSTPARTUM.
 * Transition: Continuous pan right.
 * Characters & Props: Timeline shifted to Postpartum; baby crib icon with red rain cloud; massive red "X" stamp.
 */
export const Scene090_PPDPostpartumTimeline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance & camera pan right on timeline: frames 0 to 35
  const panSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const panX = interpolate(panSpring, [0, 1], [300, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Red indicator sweep settling over crib: frames 15 to 55
  const settleProgress = interpolate(frame, [15, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red rain cloud formation: frames 50 to 80
  const cloudProgress = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Massive Red "X" stamp drop: frame 85
  const stampSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact screen shake from "X" stamp: frames 85 to 115
  const isImpact = frame >= 85 && frame < 115;
  const shakeX = isImpact ? Math.sin((frame - 85) * 2.8) * 12 * (1 - (frame - 85) / 30) : 0;
  const shakeY = isImpact ? Math.cos((frame - 85) * 3.2) * 10 * (1 - (frame - 85) / 30) : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B1120",
      }}
    >
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="timeGrid90" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#timeGrid90)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${frame >= 85 ? "#EF4444" : "#38BDF8"}`,
            boxShadow: frame >= 85 ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            POSTPARTUM TIMELINE
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-red-400">
            Within the First 12 Months Following Delivery
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <defs>
          <filter id="redGlow90" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* TIMELINE HORIZONTAL RAIL (Panned left so Postpartum is centered) */}
        <g transform={`translate(${panX}, 380)`}>
          {/* Rail Track */}
          <line x1="200" y1="0" x2="1720" y2="0" stroke="#334155" strokeWidth="8" strokeLinecap="round" />

          {/* Previous Antepartum Section (Faded out on left) */}
          <g transform="translate(350, 0)" opacity="0.4">
            <line x1="-150" y1="-20" x2="-150" y2="20" stroke="#64748B" strokeWidth="3" />
            <text x="0" y="-35" fill="#94A3B8" fontSize="20" fontWeight="800" textAnchor="middle">
              ANTEPARTUM
            </text>
          </g>

          {/* DELIVERY MARKER (x = 560) */}
          <g transform="translate(560, 0)">
            <circle cx="0" cy="0" r="12" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3" />
            <rect x="-60" y="25" width="120" height="26" rx="6" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <text x="0" y="42" fill="#E2E8F0" fontSize="12" fontWeight="900" textAnchor="middle">
              DAY 0 (BIRTH)
            </text>
          </g>

          {/* ACTIVE POSTPARTUM SPAN (x: 560 to 1540) */}
          <line
            x1="560"
            y1="0"
            x2={560 + settleProgress * 980}
            y2="0"
            stroke="#EF4444"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#redGlow90)"
          />

          <g transform="translate(1050, 0)">
            <line x1="490" y1="-25" x2="490" y2="25" stroke="#EF4444" strokeWidth="4" />
            <text x="0" y="-45" fill="#EF4444" fontSize="30" fontWeight="900" textAnchor="middle" letterSpacing="3">
              POSTPARTUM PERIOD
            </text>
            <text x="0" y="-15" fill="#FECACA" fontSize="16" fontWeight="800" textAnchor="middle" letterSpacing="2">
              WITHIN FIRST 12 MONTHS
            </text>
          </g>
        </g>

        {/* BABY CRIB / BASSINET ICON (Center: x=960, y=660) */}
        <g transform="translate(960, 660)">
          {/* Ground Shadow */}
          <ellipse cx="0" cy="110" rx="140" ry="20" fill="#020617" opacity="0.6" />

          {/* Crib Container Circle */}
          <circle
            cx="0"
            cy="20"
            r="110"
            fill="#0F172A"
            stroke={cloudProgress > 0 ? "#EF4444" : "#38BDF8"}
            strokeWidth="5"
          />

          {/* Stylized Baby Crib */}
          <g stroke="#E2E8F0" strokeWidth="4" fill="none" strokeLinecap="round">
            {/* Crib Basin Rim */}
            <rect x="-65" y="-10" width="130" height="70" rx="12" fill="rgba(255,255,255,0.05)" />
            {/* Slats */}
            <line x1="-40" y1="-10" x2="-40" y2="60" />
            <line x1="-15" y1="-10" x2="-15" y2="60" />
            <line x1="15" y1="-10" x2="15" y2="60" />
            <line x1="40" y1="-10" x2="40" y2="60" />
            {/* Legs */}
            <line x1="-50" y1="60" x2="-60" y2="95" />
            <line x1="50" y1="60" x2="60" y2="95" />
            {/* Rocker Arch */}
            <path d="M -75 95 Q 0 110 75 95" strokeWidth="4" />
          </g>

          {/* RED RAIN CLOUD OVER THE CRIB (Frames 50 to 180) */}
          {cloudProgress > 0 && (
            <g
              transform={`translate(0, ${-90 - (1 - cloudProgress) * 40}) scale(${cloudProgress})`}
              filter="url(#redGlow90)"
            >
              {/* Ominous Red Cloud */}
              <path
                d="
                  M -55 10
                  A 24 24 0 0 1 -45 -22
                  A 36 36 0 0 1 10 -30
                  A 30 30 0 0 1 55 -5
                  A 22 22 0 0 1 50 18
                  L -50 18
                  Z
                "
                fill="#7F1D1D"
                stroke="#EF4444"
                strokeWidth="3.5"
              />

              {/* Falling Red Rain Drops */}
              {[-30, -10, 10, 30].map((rx, i) => (
                <line
                  key={i}
                  x1={rx}
                  y1={25 + ((frame * 4 + i * 15) % 45)}
                  x2={rx - 4}
                  y2={40 + ((frame * 4 + i * 15) % 45)}
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              ))}
            </g>
          )}
        </g>

        {/* MASSIVE RED "X" STAMP (Slamming over the scene at frame 85) */}
        {frame >= 85 && (
          <g
            transform={`translate(960, 680) scale(${stampScale})`}
            filter="url(#redGlow90)"
          >
            {/* Giant Bold Red X Cross */}
            <line x1="-180" y1="-180" x2="180" y2="180" stroke="#EF4444" strokeWidth="22" strokeLinecap="round" />
            <line x1="180" y1="-180" x2="-180" y2="180" stroke="#EF4444" strokeWidth="22" strokeLinecap="round" />

            {/* Inner stark white core */}
            <line x1="-180" y1="-180" x2="180" y2="180" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
            <line x1="180" y1="-180" x2="-180" y2="180" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
