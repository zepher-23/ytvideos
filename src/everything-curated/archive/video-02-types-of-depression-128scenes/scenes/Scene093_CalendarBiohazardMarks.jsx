import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 93: Calendar Biohazard Marks
 * Duration: 180 frames (6.0s)
 * Environment: Zoom-in on the 30-day wall calendar.
 * Characters & Props: 30-day calendar grid, bright yellow biohazard stamps rapidly stamping across consecutive late luteal days (Days 21-28) with ominous yellow pulsating glow.
 */
export const Scene093_CalendarBiohazardMarks = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom-in entrance spring
  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const zoomScale = interpolate(zoomSpring, [0, 1], [0.85, 1]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Pulsing yellow radiation glow
  const yellowPulse = 1 + Math.sin(frame * 0.25) * 0.25;

  // Stamping sequence for luteal days (Days 21 to 28)
  const lutealDays = [21, 22, 23, 24, 25, 26, 27, 28];
  const stampStartFrame = 35;
  const stampInterval = 6;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0A0F1D",
      }}
    >
      {/* Background Subtle Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="calGrid93" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#64748B" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#calGrid93)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-8 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `scale(${zoomScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${frame >= 40 ? "#EAB308" : "#475569"}`,
            boxShadow: frame >= 40 ? "0 0 35px rgba(234, 179, 8, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            LUTEAL PHASE CONFINEMENT
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-yellow-400">
            Days 21–28: Symptom Onset Tightly Locked to Menstrual Cycle
          </p>
        </div>
      </div>

      {/* Main Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `scale(${zoomScale})`,
          transformOrigin: "960px 580px",
        }}
      >
        <defs>
          {/* Biohazard Yellow Glow */}
          <filter id="bioYellowGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cardShadow93" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="15" stdDeviation="25" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* LARGE CALENDAR SHEET (Center: x=960, y=580) */}
        <g transform="translate(960, 580)" filter="url(#cardShadow93)">
          {/* Calendar Body Canvas */}
          <rect x="-650" y="-340" width="1300" height="680" rx="24" fill="#0F172A" stroke="#334155" strokeWidth="4" />

          {/* Calendar Top Header Bar */}
          <rect x="-650" y="-340" width="1300" height="90" rx="24" fill="#1E293B" />
          <rect x="-650" y="-270" width="1300" height="20" fill="#1E293B" />

          {/* Weekday Column Headers */}
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, i) => (
            <text
              key={day}
              x={-560 + i * 185}
              y="-285"
              fill="#94A3B8"
              fontSize="20"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="2"
            >
              {day}
            </text>
          ))}

          {/* 30 DAYS GRID (5 rows of 6 or 7 columns) */}
          <g transform="translate(-600, -220)">
            {Array.from({ length: 30 }).map((_, idx) => {
              const dayNum = idx + 1;
              const col = idx % 7;
              const row = Math.floor(idx / 7);
              const x = col * 175;
              const y = row * 95;

              // Check if this is a luteal day
              const isLuteal = lutealDays.includes(dayNum);
              const lutealIdx = lutealDays.indexOf(dayNum);

              // Stamp spring for this specific day
              const stampFrame = stampStartFrame + lutealIdx * stampInterval;
              const hasStamped = isLuteal && frame >= stampFrame;
              const sSpring = spring({
                frame: frame - stampFrame,
                fps,
                config: { damping: 9, stiffness: 220 },
              });
              const stampScale = interpolate(sSpring, [0, 1], [2.4, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <g key={dayNum} transform={`translate(${x}, ${y})`}>
                  {/* Day Box */}
                  <rect
                    x="0"
                    y="0"
                    width="155"
                    height="80"
                    rx="12"
                    fill={hasStamped ? "rgba(234, 179, 8, 0.12)" : "#1E293B"}
                    stroke={hasStamped ? "#EAB308" : "#334155"}
                    strokeWidth={hasStamped ? "3" : "1.5"}
                    filter={hasStamped ? "url(#bioYellowGlow)" : undefined}
                    opacity={hasStamped ? yellowPulse * 0.9 : 0.85}
                  />

                  {/* Day Number */}
                  <text
                    x="20"
                    y="30"
                    fill={hasStamped ? "#FDE047" : "#64748B"}
                    fontSize="22"
                    fontWeight="900"
                  >
                    {dayNum}
                  </text>

                  {/* BIOHAZARD SYMBOL STAMPED ON LUTEAL DAYS */}
                  {hasStamped && (
                    <g
                      transform={`translate(100, 42) scale(${stampScale * 0.55})`}
                      filter="url(#bioYellowGlow)"
                    >
                      {/* Biohazard Trefoil Shape */}
                      <circle cx="0" cy="0" r="10" fill="#EAB308" />
                      {/* 3 Radiating Arcs */}
                      <circle cx="-16" cy="-10" r="22" fill="none" stroke="#EAB308" strokeWidth="9" />
                      <circle cx="16" cy="-10" r="22" fill="none" stroke="#EAB308" strokeWidth="9" />
                      <circle cx="0" cy="18" r="22" fill="none" stroke="#EAB308" strokeWidth="9" />
                      {/* Center Cutout */}
                      <circle cx="0" cy="0" r="14" fill="#0F172A" />
                      <circle cx="0" cy="0" r="5" fill="#EAB308" />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </g>

        {/* BOTTOM TELEMETRY BADGE */}
        {frame >= 85 && (
          <g transform="translate(960, 990)">
            <rect
              x="-300"
              y="-28"
              width="600"
              height="56"
              rx="14"
              fill="#1E293B"
              stroke="#EAB308"
              strokeWidth="2.5"
              filter="url(#bioYellowGlow)"
            />
            <text
              x="0"
              y="8"
              fill="#FEF08A"
              fontSize="20"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              ⚠ LUTEAL TOXICITY ZONE: DAYS 21–28
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
