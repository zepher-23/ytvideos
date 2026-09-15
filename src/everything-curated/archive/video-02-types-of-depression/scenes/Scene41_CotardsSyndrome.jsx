import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 41: Cotard's Syndrome - 210 frames
// =============================================================================
export const Scene41_CotardsSyndrome = () => {
  const frame = useCurrentFrame();

  const isSludge = frame >= 40;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Stickman Bust (Enlarged: 1.75x) */}
        <CuratedStickman
          x={960}
          y={720}
          scale={1.75}
          isBust={true}
          pose="shock"
          mouthState="openO"
        />

        {/* Chest X-Ray Overlay */}
        <g transform="translate(960, 560)">
          {!isSludge ? (
            <g>
              <ellipse
                cx="-60"
                cy="0"
                rx="45"
                ry="75"
                fill="#38BDF8"
                opacity="0.6"
              />
              <ellipse
                cx="60"
                cy="0"
                rx="45"
                ry="75"
                fill="#38BDF8"
                opacity="0.6"
              />
              <circle
                cx="0"
                cy="15"
                r="30"
                fill="#EF4444"
                filter="drop-shadow(0 0 16px #EF4444)"
              />
            </g>
          ) : (
            <g>
              <path
                d="M -100 15 Q -55 -45 0 0 Q 55 -45 100 15 Q 75 90 0 120 Q -75 90 -100 15 Z"
                fill="#10B981"
                filter="drop-shadow(0 0 35px #10B981)"
              />
              <circle cx="-35" cy="140" r="14" fill="#10B981" />
              <circle cx="30" cy="165" r="16" fill="#10B981" />
            </g>
          )}
        </g>

        {isSludge && (
          <text
            x="960"
            y="240"
            fill="#EF4444"
            fontSize="64"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
            letterSpacing="0.1em"
          >
            [ ERROR: ORGAN DECAY ]
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};
