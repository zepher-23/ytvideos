import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 22: Calendar ZigZag
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Solid yellow warning background (#FEF08A)
 * - Characters & Props: Vector desk calendar with 30-day grid
 * - Beginning: Clean calendar displays 30 days (frames 0-30).
 * - Action/Climax: Thick aggressive red marker scribbles out 14 consecutive days in a row (frames 30-105).
 * - Ending/Hold: Bracket labels the span "14 DAYS MINIMUM" to frame 210.
 */
export const Scene022_CalendarZigZag = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance fade
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. 14 Days Scribble Progress:
  // Days 1 through 14 get crossed out between frames 30 and 100
  const scribbleProgress = interpolate(frame, [30, 100], [0, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Dimension Bracket entrance (frames 105 to 135)
  const bracketSpring = spring({
    frame: frame - 105,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const bracketAlpha = interpolate(frame, [105, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 30 days layout coordinates (5 rows x 7 cols)
  const cellW = 100;
  const cellH = 75;
  const startX = -300;
  const startY = -120;

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans" style={{ backgroundColor: "#FEF08A" }}>
      {/* Hazard Warning Stripes along Top & Bottom */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-black/85" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/85" />

      {/* Header Container */}
      <div
        className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6"
        style={{ opacity: enterOpacity }}
      >
        <div className="px-10 py-3.5 rounded-2xl bg-black/95 border-2 border-black shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-amber-300 uppercase block mb-1">
            DSM-5 DIAGNOSTIC TIMELINE
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none text-white">
            CHRONOLOGICAL CRITERIA
          </h1>
        </div>
      </div>

      {/* Main Calendar Stage */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 1000 750"
          className="w-[940px] h-[700px] overflow-visible"
        >
          <defs>
            <filter id="cal-shadow-s22" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.3" />
            </filter>
            <filter id="marker-glow-s22" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#EF4444" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* CALENDAR BOARD (Center 500, 390) */}
          <g transform="translate(500, 390)" filter="url(#cal-shadow-s22)">
            {/* White Paper Backplate */}
            <rect x="-390" y="-240" width="780" height="490" rx="24" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />

            {/* Red Calendar Header Bar */}
            <rect x="-390" y="-240" width="780" height="90" rx="24" fill="#DC2626" />
            <rect x="-390" y="-170" width="780" height="20" fill="#DC2626" />

            {/* Binding Spiral Rings */}
            {[-280, -140, 0, 140, 280].map((ringX) => (
              <g key={ringX} transform={`translate(${ringX}, -240)`}>
                <rect x="-10" y="-16" width="20" height="32" rx="8" fill="#1E293B" stroke="#FFFFFF" strokeWidth="3" />
              </g>
            ))}

            {/* Month Header Text */}
            <text x="0" y="-182" textAnchor="middle" fill="#FFFFFF" fontSize="36" fontWeight="900" letterSpacing="6">
              OCTOBER // 30-DAY OBSERVATION
            </text>

            {/* 30 Calendar Days Grid (5 rows of 7 days) */}
            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const row = Math.floor(i / 7);
              const col = i % 7;
              const cx = startX + col * cellW;
              const cy = startY + row * cellH;

              const isScribbled = scribbleProgress >= dayNum;
              const scribbleAlpha = isScribbled ? 1 : 0;

              return (
                <g key={dayNum} transform={`translate(${cx}, ${cy})`}>
                  {/* Day Box */}
                  <rect
                    x="-45"
                    y="-32"
                    width="90"
                    height="64"
                    rx="8"
                    fill={dayNum <= 14 ? "#FEF2F2" : "#F8FAFC"}
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  {/* Day Number */}
                  <text
                    x="-32"
                    y="-12"
                    fill={dayNum <= 14 ? "#991B1B" : "#64748B"}
                    fontSize="18"
                    fontWeight="800"
                  >
                    {dayNum}
                  </text>

                  {/* AGGRESSIVE RED ZIGZAG SCRIBBLING STROKES */}
                  {isScribbled && (
                    <g filter="url(#marker-glow-s22)" opacity={scribbleAlpha}>
                      <path
                        d="M -36 -20
                           L 36 22
                           M 34 -22
                           L -34 20
                           M -38 0
                           L 38 4"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  )}
                </g>
              );
            })}

            {/* TECHNICAL DIMENSION BRACKET SPANNING DAYS 1 TO 14 */}
            {frame >= 105 && (
              <g
                transform={`translate(0, 190) scale(${bracketSpring})`}
                opacity={bracketAlpha}
              >
                {/* Horizontal Span Bracket */}
                <path
                  d="M -345 0 L -345 25 L 0 25 L 0 45 L 0 25 L 345 25 L 345 0"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="4.5"
                />

                {/* Bracket Label Badge */}
                <g transform="translate(0, 68)">
                  <rect x="-170" y="-20" width="340" height="42" rx="10" fill="#000000" stroke="#EF4444" strokeWidth="3" />
                  <text x="0" y="7" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" letterSpacing="3">
                    14 DAYS MINIMUM DURATION
                  </text>
                </g>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Bottom Subtitle Card */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
        <div className="px-10 py-3 rounded-2xl bg-black/95 border-2 border-black shadow-2xl">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-yellow-300">
            {frame >= 105
              ? "DIAGNOSTIC THRESHOLD MET: 2 CONSECUTIVE WEEKS OF CONTINUOUS COLLAPSE"
              : "TRACKING DURATION: TEMPORARY SADNESS DOES NOT PERSIST"}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
