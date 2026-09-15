import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 89: PPD Pregnancy Timeline
 * Duration: 180 frames (6.0s)
 * Environment: Clean horizontal timeline graphic.
 * Characters & Props: Timeline spanning PREGNANCY to 12 MONTHS POSTPARTUM; red indicator sweeps and stops at PREGNANCY; red lightning bolt hits pregnant belly icon; "DEPRESSION DURING PREGNANCY" callout.
 */
export const Scene089_PPDPregnancyTimeline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Red sweep indicator across timeline (frames 15 to 55)
  const sweepProgress = interpolate(frame, [15, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lightning strike trigger at frame 60
  const isLightning = frame >= 60 && frame < 85;
  const lightningOpacity = isLightning ? (Math.sin((frame - 60) * 0.9) > 0 ? 1 : 0.4) : 0;

  // Impact flash on pregnant belly (frames 60 to 90)
  const bellyFlash = isLightning ? 1 : 0;

  // Text callout entrance spring at frame 85
  const textSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B1120",
      }}
    >
      {/* Background Grid Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="timeGrid89" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#timeGrid89)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterSpring,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${frame >= 60 ? "#EF4444" : "#38BDF8"}`,
            boxShadow: frame >= 60 ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            PERINATAL ONSET WINDOW
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-sky-300">
            Clinical Timeline: Antepartum Through 12 Months Postpartum
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="redGlow89" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="timelineRailGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="45%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        {/* TIMELINE HORIZONTAL RAIL (x: 240 to 1680, y: 400) */}
        <g transform="translate(0, 400)">
          {/* Base rail track */}
          <line x1="240" y1="0" x2="1680" y2="0" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
          
          {/* Active Highlighted Track Section (Pregnancy) */}
          <line
            x1="240"
            y1="0"
            x2={240 + sweepProgress * 660}
            y2="0"
            stroke="#EF4444"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#redGlow89)"
          />

          {/* SECTION 1: PREGNANCY (x: 240 to 900) */}
          <g transform="translate(570, 0)">
            {/* Range bracket */}
            <line x1="-330" y1="-25" x2="-330" y2="25" stroke="#EF4444" strokeWidth="4" />
            <line x1="330" y1="-25" x2="330" y2="25" stroke="#EF4444" strokeWidth="4" />
            <text x="0" y="-45" fill="#EF4444" fontSize="28" fontWeight="900" textAnchor="middle" letterSpacing="3">
              PREGNANCY (ANTEPARTUM)
            </text>
            <text x="0" y="-15" fill="#FECACA" fontSize="14" fontWeight="800" textAnchor="middle" letterSpacing="2">
              TRIMESTERS 1 • 2 • 3
            </text>
          </g>

          {/* BIRTH / DELIVERY MARKER (x = 900) */}
          <g transform="translate(900, 0)">
            <circle cx="0" cy="0" r="14" fill="#EF4444" stroke="#FFFFFF" strokeWidth="4" />
            <rect x="-70" y="30" width="140" height="30" rx="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="0" y="50" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
              BIRTH (DAY 0)
            </text>
          </g>

          {/* SECTION 2: 12 MONTHS POSTPARTUM (x: 900 to 1680) */}
          <g transform="translate(1290, 0)" opacity="0.6">
            <line x1="390" y1="-25" x2="390" y2="25" stroke="#64748B" strokeWidth="4" />
            <text x="0" y="-45" fill="#94A3B8" fontSize="26" fontWeight="900" textAnchor="middle" letterSpacing="3">
              12 MONTHS POSTPARTUM
            </text>
            <text x="0" y="-15" fill="#64748B" fontSize="14" fontWeight="800" textAnchor="middle" letterSpacing="2">
              EXTENDED PERINATAL WINDOW
            </text>
          </g>
        </g>

        {/* PREGNANT BELLY VECTOR ICON (x=570, y=620) */}
        <g transform="translate(570, 620)">
          {/* Radial Danger Aura if flashing */}
          {bellyFlash > 0 && (
            <circle cx="0" cy="0" r="130" fill="rgba(239, 68, 68, 0.25)" filter="url(#redGlow89)" />
          )}

          {/* Outer Ring */}
          <circle
            cx="0"
            cy="0"
            r="90"
            fill="#0F172A"
            stroke={bellyFlash ? "#EF4444" : "#38BDF8"}
            strokeWidth="5"
          />

          {/* Stylized Silhouette of Mother with Pregnant Belly */}
          <g fill={bellyFlash ? "#FCA5A5" : "#E2E8F0"}>
            {/* Head */}
            <circle cx="-25" cy="-45" r="15" />
            {/* Torso & Swollen Pregnant Belly Arc */}
            <path
              d="
                M -30 -25
                C -15 -10, -5 0, 5 10
                C 30 20, 35 60, 5 70
                C -20 75, -35 65, -35 50
                C -35 30, -30 0, -30 -25 Z
              "
            />
          </g>

          {/* RED LIGHTNING BOLT STRIKING THE BELLY (x=570, y=550 to y=620) */}
          {isLightning && (
            <g opacity={lightningOpacity} filter="url(#redGlow89)">
              <polygon
                points="10,-140 -20,-70 5,-70 -30,20 30,-30 0,-30 25,-140"
                fill="#EF4444"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
              {/* Lightning Impact Sparks */}
              <circle cx="-10" cy="20" r="6" fill="#FDE047" />
              <circle cx="15" cy="15" r="5" fill="#FFFFFF" />
            </g>
          )}
        </g>

        {/* CALLOUT BADGE: "DEPRESSION DURING PREGNANCY" (x=570, y=820) */}
        {frame >= 80 && (
          <g transform={`translate(570, 830) scale(${textScale})`}>
            <rect
              x="-280"
              y="-45"
              width="560"
              height="90"
              rx="16"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="4"
              filter="url(#redGlow89)"
            />
            <rect x="-268" y="-35" width="536" height="70" rx="10" fill="#450A0A" />

            <text
              x="0"
              y="5"
              fill="#FFFFFF"
              fontSize="28"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              DEPRESSION DURING PREGNANCY
            </text>
            <text
              x="0"
              y="26"
              fill="#FCA5A5"
              fontSize="13"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="2"
            >
              UP TO 50% OF CASES COMMENCE ANTEPARTUM
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
