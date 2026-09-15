import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 15: The Fake Smile - 150 frames
// =============================================================================
export const Scene15_TheFakeSmile = () => {
  const frame = useCurrentFrame();

  const smileY = interpolate(frame, [30, 60], [380, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F1F5F9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Slumped Grey Stickman Bust (Enlarged to scale=1.7) */}
        <CuratedStickman
          x={960}
          y={660}
          scale={1.7}
          isBust={true}
          pose="defeat"
          mouthState="frown"
        />

        {/* Enlarged Cardboard Smiley Mask (380x380px) */}
        <g transform={`translate(960, ${500 + smileY})`}>
          <line
            x1="0"
            y1="140"
            x2="0"
            y2="420"
            stroke="#92400E"
            strokeWidth="18"
            strokeLinecap="round"
          />

          <rect
            x="-190"
            y="-190"
            width="380"
            height="380"
            rx="32"
            fill="#FDE047"
            stroke="#1E293B"
            strokeWidth="14"
            filter="drop-shadow(0 25px 35px rgba(0,0,0,0.25))"
          />

          <ellipse cx="-75" cy="-55" rx="20" ry="35" fill="#1E293B" />
          <ellipse cx="75" cy="-55" rx="20" ry="35" fill="#1E293B" />
          <path
            d="M -110 40 Q 0 160 110 40"
            fill="none"
            stroke="#1E293B"
            strokeWidth="22"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
