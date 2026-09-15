import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 6: Title - MDD - 150 frames
// =============================================================================
export const Scene06_TitleMDD = () => {
  const frame = useCurrentFrame();

  const words = ["1.", "MAJOR", "DEPRESSIVE", "DISORDER"];
  const wordTiming = [10, 25, 40, 55];

  const lineProgress = interpolate(frame, [70, 110], [0, 1], {
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
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "32px",
          fontFamily: "Inter, sans-serif",
          fontSize: 84,
          fontWeight: 900,
          color: "#1E293B",
          letterSpacing: "-0.02em",
        }}
      >
        {words.map((w, i) => {
          const isVisible = frame >= wordTiming[i];
          const scale = isVisible
            ? Math.max(1, 1.35 - (frame - wordTiming[i]) * 0.08)
            : 0;
          return (
            <span
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: `scale(${scale})`,
                display: "inline-block",
              }}
            >
              {w}
            </span>
          );
        })}
      </div>

      {/* Enlarged EKG Line */}
      <svg width="1400" height="100" style={{ marginTop: 50 }}>
        <line
          x1="0"
          y1="50"
          x2={1400 * lineProgress}
          y2="50"
          stroke="#0F172A"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {lineProgress > 0 && lineProgress < 1 && (
          <circle cx={1400 * lineProgress} cy="50" r="10" fill="#0F172A" />
        )}
      </svg>
    </AbsoluteFill>
  );
};
