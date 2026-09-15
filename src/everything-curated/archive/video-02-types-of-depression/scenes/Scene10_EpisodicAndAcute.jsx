import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 10: Episodic and Acute - 180 frames
// =============================================================================
export const Scene10_EpisodicAndAcute = () => {
  const frame = useCurrentFrame();

  const plungeProgress = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const trenchY = 460 + plungeProgress * 440;

  const flatlineProgress = interpolate(frame, [65, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Grid lines */}
        {[-240, 0, 240, 440].map((dy, i) => (
          <line
            key={i}
            x1="160"
            y1={460 + dy}
            x2="1760"
            y2={460 + dy}
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="3"
          />
        ))}

        <text
          x="200"
          y="420"
          fill="#64748B"
          fontSize="36"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
        >
          BASELINE MOOD
        </text>

        <text
          x="820"
          y="950"
          fill="#DC2626"
          fontSize="36"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
        >
          ACUTE TRENCH
        </text>

        <line
          x1="180"
          y1="460"
          x2="780"
          y2="460"
          stroke="#64748B"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {frame >= 45 && (
          <line
            x1="780"
            y1="460"
            x2="780"
            y2={trenchY}
            stroke="#DC2626"
            strokeWidth="16"
            strokeLinecap="round"
          />
        )}

        {frame >= 65 && (
          <line
            x1="780"
            y1="900"
            x2={780 + flatlineProgress * 960}
            y2="900"
            stroke="#DC2626"
            strokeWidth="16"
            strokeLinecap="round"
          />
        )}
      </svg>
    </AbsoluteFill>
  );
};
