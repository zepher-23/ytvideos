import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 43: Endocrine Collapse - 180 frames
// =============================================================================
export const Scene43_EndocrineCollapse = () => {
  const frame = useCurrentFrame();

  const isDrop = frame >= 40;
  const dropY = isDrop
    ? interpolate(frame, [40, 60], [320, 1180], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 320;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Estrogen Line (Pink) */}
        <line
          x1="180"
          y1="280"
          x2="960"
          y2="280"
          stroke="#EC4899"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <text
          x="240"
          y="230"
          fill="#EC4899"
          fontSize="44"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
        >
          ESTROGEN
        </text>

        {/* Progesterone Line (Yellow) */}
        <line
          x1="180"
          y1="340"
          x2="960"
          y2="340"
          stroke="#FDE047"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <text
          x="240"
          y="420"
          fill="#FDE047"
          fontSize="44"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
        >
          PROGESTERONE
        </text>

        {isDrop && (
          <>
            <line
              x1="960"
              y1="280"
              x2="960"
              y2={dropY}
              stroke="#EC4899"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <line
              x1="960"
              y1="340"
              x2="960"
              y2={dropY}
              stroke="#FDE047"
              strokeWidth="16"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
