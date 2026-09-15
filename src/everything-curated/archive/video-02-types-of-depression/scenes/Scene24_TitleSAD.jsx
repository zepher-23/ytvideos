import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 24: Title - SAD - 150 frames
// =============================================================================
export const Scene24_TitleSAD = () => {
  const frame = useCurrentFrame();

  const flakeY = interpolate(frame, [15, 45], [-300, 540], {
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
          fontSize: 74,
          fontWeight: 900,
          color: "#1E293B",
          textAlign: "center",
          maxWidth: 1400,
          lineHeight: 1.2,
          paddingLeft: "80px",
          paddingRight: "380px",
        }}
      >
        4. SEASONAL AFFECTIVE DISORDER (SAD)
      </div>

      {/* Massive Dark Blue Snowflake (Enlarged to 320px) */}
      <svg
        style={{
          position: "absolute",
          right: 200,
          top: flakeY,
          width: 320,
          height: 320,
          transform: "translate(0, -50%)",
        }}
        viewBox="0 0 100 100"
      >
        <line
          x1="50"
          y1="5"
          x2="50"
          y2="95"
          stroke="#1E3A8A"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <line
          x1="5"
          y1="50"
          x2="95"
          y2="50"
          stroke="#1E3A8A"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <line
          x1="18"
          y1="18"
          x2="82"
          y2="82"
          stroke="#1E3A8A"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <line
          x1="82"
          y1="18"
          x2="18"
          y2="82"
          stroke="#1E3A8A"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 38 20 L 50 32 L 62 20 M 38 80 L 50 68 L 62 80 M 20 38 L 32 50 L 20 62 M 80 38 L 68 50 L 80 62"
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </AbsoluteFill>
  );
};
