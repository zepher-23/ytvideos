import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 35: PATTERN INTERRUPT (Stop) - 120 frames
// =============================================================================
export const Scene35_PatternInterrupt = () => {
  const frame = useCurrentFrame();

  const isImpact = frame >= 12;
  const shakeX = isImpact && frame < 30 ? Math.sin(frame * 6) * 16 : 0;
  const shakeY = isImpact && frame < 30 ? Math.cos(frame * 7) * 10 : 0;

  const bg = isImpact ? "#0F172A" : "#FFFFFF";

  const signScale = interpolate(frame, [0, 15], [5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        overflow: "hidden",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Colossal Red Stop Sign (800x800px) */}
      <svg
        width="800"
        height="800"
        viewBox="-350 -350 700 700"
        style={{ transform: `scale(${signScale})` }}
      >
        <polygon
          points="
            -110,-280 110,-280 280,-110 280,110 110,280 -110,280 -280,110 -280,-110
          "
          fill="#DC2626"
          stroke="#FFFFFF"
          strokeWidth="24"
          filter="drop-shadow(0 0 50px rgba(220, 38, 38, 0.8))"
        />
        <text
          x="0"
          y="55"
          fill="#FFFFFF"
          fontSize="160"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
          letterSpacing="0.06em"
        >
          STOP
        </text>
      </svg>
    </AbsoluteFill>
  );
};
