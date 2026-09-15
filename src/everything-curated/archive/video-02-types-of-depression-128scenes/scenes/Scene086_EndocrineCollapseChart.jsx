import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 86: Endocrine Collapse Chart
 * Duration: 180 frames (6.0s)
 * Environment: Clean infographic line graph on dark navy background (#0F172A).
 * Characters & Props: Line graph with two tracking lines (ESTROGEN pink #EC4899, PROGESTERONE yellow #FDE047) plunging 90° off chart; "HORMONE CRASH" stamp.
 */
export const Scene086_EndocrineCollapseChart = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Tracking line progress across chart horizontally: frames 0 to 50
  const trackProgress = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Sudden 90-degree plummet progression: frames 50 to 75
  const dropProgress = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "HORMONE CRASH" overlay entrance spring: frame 80
  const crashSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 11, stiffness: 170 },
  });
  const crashScale = interpolate(crashSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screen shudder during crash: frames 50 to 80
  const isDropping = frame >= 50 && frame < 85;
  const shakeY = isDropping ? Math.sin((frame - 50) * 2.2) * 8 * (1 - (frame - 50) / 35) : 0;

  // Chart coordinates
  const chartLeft = 320;
  const chartRight = 1600;
  const chartTop = 260;
  const chartBottom = 820;
  const dropX = 1100; // Point where delivery occurs

  // Estrogen horizontal Y: 340 (elevated in 3rd trimester)
  // Progesterone horizontal Y: 420 (elevated in 3rd trimester)
  const currentLeadX = chartLeft + trackProgress * (dropX - chartLeft);
  const droppedY = chartTop + dropProgress * 700;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Subtle Clinical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="chartGrid-86" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chartGrid-86)" />
      </svg>

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
            border: `1.5px solid ${frame >= 50 ? "#EC4899" : "#38BDF8"}`,
            boxShadow: frame >= 50 ? "0 0 35px rgba(236, 72, 153, 0.25)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            ENDOCRINE COLLAPSE
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-pink-300">
            Pre-Partum Peak vs Immediate Post-Partum Withdrawal
          </p>
        </div>
      </div>

      {/* Main Chart SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateY(${shakeY}px)` }}
      >
        <defs>
          {/* Line Glow Filters */}
          <filter id="pinkLineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="yellowLineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Chart Axes */}
        <line x1={chartLeft} y1={chartBottom} x2={chartRight} y2={chartBottom} stroke="#475569" strokeWidth="3" />
        <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartBottom} stroke="#475569" strokeWidth="3" />

        {/* Y-Axis Clinical Levels */}
        {["1,000x PEAK", "500x ELEVATED", "BASELINE", "0"].map((level, i) => {
          const y = chartTop + i * 170;
          return (
            <g key={level} opacity="0.6">
              <line x1={chartLeft - 10} y1={y} x2={chartRight} y2={y} stroke="#334155" strokeWidth="1" strokeDasharray="4 8" />
              <text x={chartLeft - 20} y={y + 5} fill="#94A3B8" fontSize="13" fontWeight="800" textAnchor="end">
                {level}
              </text>
            </g>
          );
        })}

        {/* Delivery Threshold Vertical Line (The "Wall" at x = 1100) */}
        <g opacity="0.8">
          <line
            x1={dropX}
            y1={chartTop - 20}
            x2={dropX}
            y2={chartBottom + 20}
            stroke="#EF4444"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          <rect x={dropX - 85} y={chartTop - 45} width="170" height="28" rx="6" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
          <text x={dropX} y={chartTop - 26} fill="#FEE2E2" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
            PARTURITION (BIRTH)
          </text>
        </g>

        {/* 1. ESTROGEN LINE (Pink #EC4899) */}
        <g filter="url(#pinkLineGlow)">
          {/* Horizontal high plateau leading to drop point */}
          <line
            x1={chartLeft}
            y1={340}
            x2={currentLeadX}
            y2={340}
            stroke="#EC4899"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* 90-degree vertical plunge off bottom of chart */}
          {dropProgress > 0 && (
            <line
              x1={dropX}
              y1={340}
              x2={dropX}
              y2={340 + dropProgress * 650}
              stroke="#EC4899"
              strokeWidth="6"
              strokeLinecap="round"
            />
          )}

          {/* ESTROGEN Badge & Value */}
          <g transform={`translate(${chartLeft + 140}, 300)`}>
            <rect x="-80" y="-18" width="160" height="34" rx="8" fill="#831843" stroke="#EC4899" strokeWidth="2" />
            <text x="0" y="5" fill="#FDF2F8" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
              ESTROGEN
            </text>
          </g>
        </g>

        {/* 2. PROGESTERONE LINE (Yellow #FDE047) */}
        <g filter="url(#yellowLineGlow)">
          {/* Horizontal high plateau */}
          <line
            x1={chartLeft}
            y1={420}
            x2={currentLeadX}
            y2={420}
            stroke="#FDE047"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* 90-degree plunge off bottom */}
          {dropProgress > 0 && (
            <line
              x1={dropX + 15}
              y1={420}
              x2={dropX + 15}
              y2={420 + dropProgress * 570}
              stroke="#FDE047"
              strokeWidth="6"
              strokeLinecap="round"
            />
          )}

          {/* PROGESTERONE Badge & Value */}
          <g transform={`translate(${chartLeft + 160}, 465)`}>
            <rect x="-95" y="-18" width="190" height="34" rx="8" fill="#713F12" stroke="#FDE047" strokeWidth="2" />
            <text x="0" y="5" fill="#FEFCE8" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
              PROGESTERONE
            </text>
          </g>
        </g>

        {/* GIANT "HORMONE CRASH" STAMP OVERLAY */}
        {frame >= 80 && (
          <g
            transform={`translate(1380, 560) scale(${crashScale}) rotate(-6)`}
          >
            {/* Red Alert Stamp Outer */}
            <rect
              x="-240"
              y="-75"
              width="480"
              height="150"
              rx="16"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="6"
              style={{
                filter: "drop-shadow(0 0 25px rgba(239, 68, 68, 0.4))",
              }}
            />
            <rect x="-225" y="-60" width="450" height="120" rx="10" fill="#450A0A" />

            <text
              x="0"
              y="5"
              fill="#FFFFFF"
              fontSize="46"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="4"
            >
              HORMONE CRASH
            </text>

            <text
              x="0"
              y="38"
              fill="#FECACA"
              fontSize="16"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="3"
            >
              -99% DROP IN 48 HOURS
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
