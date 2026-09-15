import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 18: Title - Bipolar Depression - 150 frames
// =============================================================================
export const Scene18_TitleBipolar = () => {
  const frame = useCurrentFrame();

  const titleText = "3. BIPOLAR DEPRESSION";
  const typedCount = Math.floor(
    interpolate(frame, [10, 50], [0, titleText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const lineProgress = interpolate(frame, [55, 95], [0, 1], {
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
          letterSpacing: "-0.02em",
        }}
      >
        {titleText.slice(0, typedCount)}
      </div>

      <svg width="1100" height="50" style={{ marginTop: 40 }}>
        <line
          x1="0"
          y1="25"
          x2={1100 * lineProgress}
          y2="25"
          stroke="#1E293B"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
    </AbsoluteFill>
  );
};
