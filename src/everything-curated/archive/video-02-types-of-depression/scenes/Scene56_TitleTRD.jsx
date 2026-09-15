import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 56: Title - TRD - 150 frames
// =============================================================================
export const Scene56_TitleTRD = () => {
  const frame = useCurrentFrame();

  const isChained = frame >= 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 140px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "#FFFFFF",
          maxWidth: 1050,
          lineHeight: 1.25,
        }}
      >
        10. TREATMENT-RESISTANT DEPRESSION (TRD)
      </div>

      {/* Enlarged Pill Bottle with Heavy Chains (240x450px) */}
      <svg width="500" height="600" viewBox="-250 -300 500 600">
        <rect
          x="-120"
          y="-240"
          width="240"
          height="65"
          rx="10"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="6"
        />
        <rect
          x="-105"
          y="-175"
          width="210"
          height="380"
          rx="24"
          fill="#F59E0B"
          stroke="#D97706"
          strokeWidth="10"
        />

        {/* 32px Heavy Iron Chains */}
        {isChained && (
          <g>
            <line
              x1="-160"
              y1="-80"
              x2="160"
              y2="80"
              stroke="#334155"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <line
              x1="160"
              y1="-80"
              x2="-160"
              y2="80"
              stroke="#334155"
              strokeWidth="32"
              strokeLinecap="round"
            />
            {/* Massive Padlock */}
            <rect
              x="-65"
              y="-30"
              width="130"
              height="115"
              rx="16"
              fill="#1E293B"
              stroke="#94A3B8"
              strokeWidth="10"
            />
            <path
              d="M -35 -30 L -35 -85 Q 0 -115 35 -85 L 35 -30"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="16"
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
