import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 38: Reality Testing Shattered - 180 frames
// =============================================================================
export const Scene38_RealityTestingShattered = () => {
  const frame = useCurrentFrame();

  const isMonster = frame >= 40;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Mirror Frame Divider */}
        <line
          x1="960"
          y1="80"
          x2="960"
          y2="1000"
          stroke="#475569"
          strokeWidth="16"
        />

        {/* Real Stickman on Left (Enlarged to scale=1.45) */}
        <CuratedStickman
          x={520}
          y={820}
          scale={1.45}
          pose="shock"
          mouthState="openO"
        />

        {/* Monster Reflection on Right (Enlarged to scale=1.75) */}
        <g transform="translate(1380, 820)">
          {!isMonster ? (
            <CuratedStickman
              x={0}
              y={0}
              scale={1.45}
              pose="idle"
              mouthState="neutral"
            />
          ) : (
            <g transform="scale(1.75)">
              <path
                d="M -90 -40 C -140 -20 -150 120 -120 220 L 120 220 C 150 120 140 -20 90 -40 Z"
                fill="#000000"
                stroke="#450A0A"
                strokeWidth="8"
              />
              <path
                d="M -70 -70 Q -90 -160 -40 -120 Q 0 -100 40 -120 Q 90 -160 70 -70 Q 70 20 0 20 Q -70 20 -70 -70 Z"
                fill="#000000"
              />
              <circle
                cx="-35"
                cy="-60"
                r="16"
                fill="#DC2626"
                filter="drop-shadow(0 0 20px #DC2626)"
              />
              <circle
                cx="35"
                cy="-60"
                r="16"
                fill="#DC2626"
                filter="drop-shadow(0 0 20px #DC2626)"
              />
              <path
                d="M -90 40 Q -180 20 -240 20 L -270 10 L -250 25 L -270 30"
                fill="none"
                stroke="#000000"
                strokeWidth="24"
                strokeLinecap="round"
              />
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
