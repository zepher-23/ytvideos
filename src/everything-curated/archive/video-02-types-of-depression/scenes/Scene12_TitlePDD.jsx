import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 12: Title - PDD (Dysthymia) - 150 frames
// =============================================================================
export const Scene12_TitlePDD = () => {
  const frame = useCurrentFrame();

  const titleChars = "2. PERSISTENT DEPRESSIVE DISORDER";
  const typedCount = Math.floor(
    interpolate(frame, [10, 60], [0, titleChars.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const subOpacity = interpolate(frame, [65, 95], [0, 1], {
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
          fontSize: 78,
          fontWeight: 900,
          color: "#1E293B",
          letterSpacing: "-0.02em",
          textAlign: "center",
          maxWidth: 1500,
          lineHeight: 1.15,
        }}
      >
        {titleChars.slice(0, typedCount)}
      </div>

      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: "#64748B",
          marginTop: 35,
          opacity: subOpacity,
          letterSpacing: "0.1em",
        }}
      >
        (DYSTHYMIA)
      </div>
    </AbsoluteFill>
  );
};
