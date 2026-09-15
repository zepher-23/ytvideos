import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 29: Title - Atypical Depression - 150 frames
// =============================================================================
export const Scene29_TitleAtypical = () => {
  const frame = useCurrentFrame();

  const titleProgress = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pieAngle = interpolate(frame, [30, 75], [0, 288], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F8FAFC",
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
          color: "#1E293B",
          opacity: titleProgress,
          marginBottom: 45,
        }}
      >
        5. ATYPICAL DEPRESSION
      </div>

      {/* Massive 560px Pie Chart */}
      <svg width="560" height="560" viewBox="-280 -280 560 560">
        <circle cx="0" cy="0" r="240" fill="#CBD5E1" />

        {pieAngle > 0 && (
          <path
            d={`
              M 0 0 
              L 0 -240 
              A 240 240 0 ${pieAngle > 180 ? 1 : 0} 1 
              ${Math.sin((pieAngle * Math.PI) / 180) * 240} 
              ${-Math.cos((pieAngle * Math.PI) / 180) * 240} 
              Z
            `}
            fill="#A855F7"
            stroke="#FFFFFF"
            strokeWidth="6"
          />
        )}
        <text
          x="0"
          y="18"
          fill="#FFFFFF"
          fontSize="54"
          fontWeight="900"
          textAnchor="middle"
        >
          80%
        </text>
      </svg>
    </AbsoluteFill>
  );
};
