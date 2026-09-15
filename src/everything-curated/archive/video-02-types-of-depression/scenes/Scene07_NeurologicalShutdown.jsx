import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 7: Neurological Shutdown - 180 frames
// =============================================================================
export const Scene07_NeurologicalShutdown = () => {
  const frame = useCurrentFrame();

  const isSwitchDown = frame >= 45;
  const leverAngle = interpolate(frame, [45, 55], [-35, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isDark = frame >= 50;
  const glowOpacity = interpolate(frame, [48, 56], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isDark ? "#0F172A" : "#1E293B",
        transition: "background-color 0.2s",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        <circle
          cx="960"
          cy="540"
          r="680"
          fill="#FBBF24"
          opacity={0.22 * glowOpacity}
          filter="blur(100px)"
        />

        {/* Brain Silhouette Outline (Enlarged to 1500px span) */}
        <path
          d="M 960 160 C 660 160 460 300 460 540 C 460 700 540 820 680 900 C 780 960 920 960 960 950 C 1000 960 1140 960 1240 900 C 1380 820 1460 700 1460 540 C 1460 300 1260 160 960 160 Z"
          fill="none"
          stroke={isDark ? "#334155" : "#64748B"}
          strokeWidth="10"
          strokeDasharray="16 16"
        />

        {/* Industrial Switch Box (Enlarged: 480x640px) */}
        <g transform="translate(960, 540)">
          <rect
            x="-240"
            y="-320"
            width="480"
            height="640"
            rx="24"
            fill={isDark ? "#1E293B" : "#334155"}
            stroke={isDark ? "#475569" : "#94A3B8"}
            strokeWidth="12"
          />

          <rect
            x="-180"
            y="-270"
            width="360"
            height="70"
            rx="10"
            fill="#0F172A"
          />
          <text
            x="0"
            y="-222"
            fill={isDark ? "#64748B" : "#FBBF24"}
            fontSize="36"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
            letterSpacing="0.12em"
          >
            SYSTEM POWER
          </text>

          {/* Indicator Light */}
          <circle
            cx="0"
            cy="-110"
            r="32"
            fill={isDark ? "#475569" : "#FBBF24"}
            filter={isDark ? "none" : "drop-shadow(0 0 25px #FBBF24)"}
          />

          {/* Slot */}
          <rect
            x="-24"
            y="-30"
            width="48"
            height="270"
            rx="12"
            fill="#0F172A"
          />

          {/* Heavy Lever */}
          <circle cx="0" cy="110" r="40" fill="#0F172A" />
          <g transform={`rotate(${leverAngle}, 0, 110)`}>
            <rect
              x="-18"
              y="-60"
              width="36"
              height="180"
              rx="10"
              fill="#E2E8F0"
            />
            <circle
              cx="0"
              cy="-60"
              r="38"
              fill={isDark ? "#64748B" : "#DC2626"}
            />
          </g>

          <text
            x="-90"
            y="25"
            fill={!isDark ? "#FBBF24" : "#475569"}
            fontSize="32"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
          >
            ON
          </text>
          <text
            x="-90"
            y="200"
            fill={isDark ? "#EF4444" : "#475569"}
            fontSize="32"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
          >
            OFF
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
