import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 17: The Two Year Sentence - 180 frames
// =============================================================================
export const Scene17_TwoYearSentence = () => {
  const frame = useCurrentFrame();

  const sandLevel = interpolate(frame, [15, 160], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Giant Hourglass (800x940px) */}
        <g transform="translate(960, 540)">
          <rect
            x="-380"
            y="-460"
            width="760"
            height="50"
            rx="12"
            fill="#78350F"
            stroke="#B45309"
            strokeWidth="6"
          />
          <rect
            x="-380"
            y="410"
            width="760"
            height="50"
            rx="12"
            fill="#78350F"
            stroke="#B45309"
            strokeWidth="6"
          />

          {/* Glass Contour */}
          <path
            d="M -320 -410 C -320 -180 -45 -35 -20 0 C -45 35 -320 180 -320 410 L 320 410 C 320 180 45 35 20 0 C 45 -35 320 -180 320 -410 Z"
            fill="rgba(255, 255, 255, 0.06)"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="12"
          />

          {/* Sand Falling Stream */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="410"
            stroke="#475569"
            strokeWidth="10"
            strokeDasharray="14 10"
          />

          {/* Stickman inside bottom bulb */}
          <CuratedStickman
            x={0}
            y={240}
            scale={1.25}
            pose="defeat"
            mouthState="frown"
          />

          {/* Rising Sand Heap */}
          <path
            d={`M -300 410 Q 0 ${410 - sandLevel * 1.3} 300 410 Z`}
            fill="#334155"
            stroke="#475569"
            strokeWidth="6"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
