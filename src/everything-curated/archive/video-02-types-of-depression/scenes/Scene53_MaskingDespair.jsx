import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 53: Masking Despair - 180 frames
// =============================================================================
export const Scene53_MaskingDespair = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Child Stickman (Scale=1.75) */}
        <CuratedStickman
          x={960}
          y={740}
          scale={1.75}
          variant="child"
          pose="idle"
          mouthState="frown"
        />

        {/* Chest X-Ray Overlay (r=110) */}
        <g transform="translate(960, 480)">
          <circle
            cx="0"
            cy="0"
            r="110"
            fill="#1D4ED8"
            stroke="#38BDF8"
            strokeWidth="10"
            filter="drop-shadow(0 0 35px #1D4ED8)"
          />
          <ellipse cx="-35" cy="-20" rx="14" ry="20" fill="#FFFFFF" />
          <ellipse cx="35" cy="-20" rx="14" ry="20" fill="#FFFFFF" />
          <line
            x1="-35"
            y1="10"
            x2="-35"
            y2="50"
            stroke="#60A5FA"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1="35"
            y1="10"
            x2="35"
            y2="50"
            stroke="#60A5FA"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M -45 55 Q 0 25 45 55"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
