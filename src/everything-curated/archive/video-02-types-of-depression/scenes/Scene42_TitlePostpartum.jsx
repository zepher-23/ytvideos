import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 42: Title - Postpartum Depression - 150 frames
// =============================================================================
export const Scene42_TitlePostpartum = () => {
  const frame = useCurrentFrame();

  const isVines = frame >= 30;

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
          fontSize: 84,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        7. POSTPARTUM DEPRESSION
      </div>

      {/* Enlarged Pacifier (Double Size: 300x240px) */}
      <svg width="600" height="400" viewBox="-300 -200 600 400">
        <g>
          <ellipse cx="0" cy="0" rx="90" ry="70" fill="#F472B6" />
          <circle
            cx="0"
            cy="0"
            r="32"
            fill="#FFFFFF"
            stroke="#F472B6"
            strokeWidth="8"
          />
          <path
            d="M 0 70 C -60 130 60 130 0 70"
            fill="none"
            stroke="#F472B6"
            strokeWidth="20"
          />
        </g>

        {/* Thick Dark Thorny Vines */}
        {isVines && (
          <g>
            <path
              d="M -260 -160 Q -120 -50 0 0 Q 120 50 260 160"
              fill="none"
              stroke="#334155"
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              d="M 260 -160 Q 120 -50 0 0 Q -120 50 -260 160"
              fill="none"
              stroke="#334155"
              strokeWidth="26"
              strokeLinecap="round"
            />
            <polygon points="-75,-45 -105,-90 -45,-60" fill="#EF4444" />
            <polygon points="75,45 105,90 45,60" fill="#EF4444" />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
