import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 57: Pharmacological Non-Responsiveness - 180 frames
// =============================================================================
export const Scene57_PharmNonResponsive = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Massive Stone Fortress Wall */}
        <rect
          x="1100"
          y="0"
          width="820"
          height="1080"
          fill="#334155"
          stroke="#1E293B"
          strokeWidth="16"
        />
        <text
          x="1510"
          y="540"
          fill="#FFFFFF"
          fontSize="72"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
          letterSpacing="0.12em"
        >
          DEPRESSION
        </text>

        {/* Enlarged Flying Pills (48x24px) */}
        {Array.from({ length: 18 }).map((_, i) => {
          const pillProgress = (frame * 22 + i * 90) % 1600;
          const isBounced = pillProgress > 1080;
          const x = isBounced ? 1080 - (pillProgress - 1080) * 1.6 : pillProgress;
          const y = 160 + (i * 50) % 750;

          return (
            <g
              key={i}
              transform={`translate(${x}, ${y}) rotate(${isBounced ? -60 : 15})`}
            >
              <rect
                x="-24"
                y="-12"
                width="48"
                height="24"
                rx="12"
                fill={i % 2 === 0 ? "#3B82F6" : "#10B981"}
                filter="drop-shadow(0 0 10px rgba(255,255,255,0.4))"
              />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
