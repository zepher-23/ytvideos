import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 45: Not Just "Baby Blues" - 180 frames
// =============================================================================
export const Scene45_NotJustBabyBlues = () => {
  const frame = useCurrentFrame();

  const isShattered = frame >= 40;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        <polygon points="960,520 890,820 1030,820" fill="#1E293B" />

        {/* Scale Beam (Enlarged to 1260px) */}
        <g transform="translate(960, 520)">
          {!isShattered ? (
            <rect
              x="-630"
              y="-15"
              width="1260"
              height="30"
              rx="6"
              fill="#64748B"
            />
          ) : (
            <>
              <line
                x1="-630"
                y1="0"
                x2="0"
                y2="0"
                stroke="#64748B"
                strokeWidth="24"
              />
              <line
                x1="0"
                y1="0"
                x2="520"
                y2="240"
                stroke="#EF4444"
                strokeWidth="24"
              />
            </>
          )}

          {/* Left: Soft Feather */}
          <g transform="translate(-560, 0)">
            <path
              d="M -110 180 Q 0 220 110 180 Z"
              fill="#CBD5E1"
              stroke="#475569"
              strokeWidth="6"
            />
            <path
              d="M -50 90 Q 0 10 50 90 Q 0 170 -50 90 Z"
              fill="#93C5FD"
            />
            <text
              x="0"
              y="260"
              fill="#93C5FD"
              fontSize="34"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
            >
              Baby Blues
            </text>
          </g>

          {/* Right: Massive Anvil (520px) */}
          <g transform={`translate(560, ${isShattered ? 240 : 0})`}>
            <polygon
              points="-220,90 220,90 140,-80 -140,-80"
              fill="#000000"
              stroke="#334155"
              strokeWidth="10"
            />
            <text
              x="0"
              y="30"
              fill="#FFFFFF"
              fontSize="56"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
            >
              PPD
            </text>
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
