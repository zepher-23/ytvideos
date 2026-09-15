import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 20: Alternating Polarity (The Drop) - 210 frames
// =============================================================================
export const Scene20_AlternatingPolarity = () => {
  const frame = useCurrentFrame();

  const isDrop = frame >= 65;
  const cartX = isDrop
    ? 960
    : interpolate(frame, [0, 65], [300, 960], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const cartY = isDrop
    ? interpolate(frame, [65, 110], [280, 1200], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 280;
  const cartRot = isDrop ? 90 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Peak Glow (Mania) */}
        <circle
          cx="960"
          cy="280"
          r="420"
          fill="#FDE047"
          opacity="0.2"
          filter="blur(80px)"
        />

        {/* Rollercoaster Track (Thick: 24px) */}
        <path
          d="M 60 760 C 450 760 700 280 960 280 L 960 1150"
          fill="none"
          stroke="#FDE047"
          strokeWidth="24"
          strokeLinecap="round"
        />

        {/* Enlarged Rollercoaster Cart (180x110px) */}
        {cartY < 1180 && (
          <g transform={`translate(${cartX}, ${cartY}) rotate(${cartRot})`}>
            <rect
              x="-90"
              y="-65"
              width="180"
              height="110"
              rx="24"
              fill="#DC2626"
              stroke="#FFFFFF"
              strokeWidth="8"
            />
            {/* Wheels */}
            <circle cx="-50" cy="45" r="18" fill="#64748B" />
            <circle cx="50" cy="45" r="18" fill="#64748B" />
          </g>
        )}

        <text
          x="780"
          y="200"
          fill="#FDE047"
          fontSize="52"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
        >
          MANIA
        </text>
        <text
          x="1050"
          y="800"
          fill="#38BDF8"
          fontSize="52"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
        >
          DEPRESSION
        </text>
      </svg>
    </AbsoluteFill>
  );
};
