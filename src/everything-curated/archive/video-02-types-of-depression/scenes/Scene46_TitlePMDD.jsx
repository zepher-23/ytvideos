import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Calendar } from "../../shared";

// =============================================================================
// SCENE 46: Title - PMDD - 150 frames
// =============================================================================
export const Scene46_TitlePMDD = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "#FFFFFF",
          textAlign: "center",
          maxWidth: 1600,
          lineHeight: 1.2,
          marginBottom: 45,
        }}
      >
        8. PREMENSTRUAL DYSPHORIC DISORDER (PMDD)
      </div>

      {/* Enlarged Calendar Grid with Biohazard Stamps (960x480px) */}
      <svg width="960" height="480" viewBox="0 0 960 480">
        <rect
          x="15"
          y="15"
          width="930"
          height="450"
          rx="24"
          fill="#1E293B"
          stroke="#475569"
          strokeWidth="8"
        />
        <rect x="15" y="15" width="930" height="85" fill="#DC2626" />
        <text
          x="480"
          y="70"
          fill="#FFFFFF"
          fontSize="36"
          fontWeight="900"
          textAnchor="middle"
        >
          LUTEAL CYCLE
        </text>

        {Array.from({ length: 14 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const x = 70 + col * 120;
          const y = 140 + row * 150;
          const isHazard = col >= 4 && frame >= 30 + i * 3;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="100"
                height="120"
                rx="12"
                fill={isHazard ? "#450A0A" : "#334155"}
                stroke={isHazard ? "#EF4444" : "#64748B"}
                strokeWidth="4"
              />
              {isHazard && (
                <text
                  x={x + 50}
                  y={y + 75}
                  fill="#EAB308"
                  fontSize="48"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  ☣
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
