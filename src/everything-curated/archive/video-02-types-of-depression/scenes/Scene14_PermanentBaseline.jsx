import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 14: The Permanent Baseline - 180 frames
// =============================================================================
export const Scene14_PermanentBaseline = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F5F9", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Cubicle Walls */}
        <rect x="180" y="160" width="1560" height="780" fill="#E2E8F0" />
        <line
          x1="180"
          y1="160"
          x2="180"
          y2="940"
          stroke="#94A3B8"
          strokeWidth="14"
        />
        <line
          x1="1740"
          y1="160"
          x2="1740"
          y2="940"
          stroke="#94A3B8"
          strokeWidth="14"
        />

        {/* Desk (Enlarged to 1200px) */}
        <rect
          x="360"
          y="660"
          width="1200"
          height="45"
          rx="8"
          fill="#475569"
          stroke="#1E293B"
          strokeWidth="6"
        />
        <rect x="420" y="705" width="30" height="260" fill="#334155" />
        <rect x="1470" y="705" width="30" height="260" fill="#334155" />

        {/* Computer Monitor (Enlarged to 320x220px) */}
        <rect
          x="580"
          y="420"
          width="320"
          height="220"
          rx="12"
          fill="#0F172A"
          stroke="#38BDF8"
          strokeWidth="6"
        />
        <rect x="725" y="640" width="40" height="20" fill="#334155" />

        {/* Stickman Sitting & Carrying Colossal Stone */}
        <g transform="translate(1220, 720)">
          <CuratedStickman
            x={0}
            y={0}
            scale={1.35}
            pose="idle"
            mouthState="flat"
          />
          {/* Colossal Stone Backpack (rx=130, ry=165) */}
          <ellipse
            cx="110"
            cy="-200"
            rx="130"
            ry="165"
            fill="#475569"
            stroke="#1E293B"
            strokeWidth="12"
          />
          <path
            d="M 90 -280 L 120 -200 L 70 -160 M 120 -200 L 170 -190"
            fill="none"
            stroke="#1E293B"
            strokeWidth="6"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
