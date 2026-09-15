import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 31: Hypersomnia - 180 frames
// =============================================================================
export const Scene31_Hypersomnia = () => {
  const frame = useCurrentFrame();

  const clockRot = frame * 14;

  const anvilY = interpolate(frame, [45, 60], [-300, 440], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isCrushed = frame >= 60;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F5F9", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Wall Clock (Enlarged to 280px) */}
        <g transform="translate(360, 260)">
          <circle
            cx="0"
            cy="0"
            r="130"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="12"
          />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-90"
            stroke="#1E293B"
            strokeWidth="9"
            strokeLinecap="round"
            transform={`rotate(${clockRot})`}
          />
          <line
            x1="0"
            y1="0"
            x2="70"
            y2="0"
            stroke="#1E293B"
            strokeWidth="12"
            strokeLinecap="round"
            transform={`rotate(${clockRot * 0.1})`}
          />
        </g>

        {/* Giant Bed & Mattress (1100px width) */}
        <rect
          x="620"
          y="720"
          width="1100"
          height="180"
          rx="24"
          fill="#3B82F6"
          stroke="#1D4ED8"
          strokeWidth="12"
        />
        <rect
          x="680"
          y="660"
          width="240"
          height="75"
          rx="18"
          fill="#FFFFFF"
          stroke="#94A3B8"
          strokeWidth="6"
        />

        {/* Stickman Sleeping / Crushed (Scale=1.4) */}
        <CuratedStickman
          x={1160}
          y={730}
          scale={1.4}
          pose={isCrushed ? "defeat" : "idle"}
          mouthState="flat"
        />

        {/* Massive Iron Anvil (Enlarged to 620px width) */}
        <g transform={`translate(1160, ${anvilY})`}>
          <polygon
            points="-310,100 310,100 220,-90 -220,-90"
            fill="#334155"
            stroke="#0F172A"
            strokeWidth="12"
          />
          <text
            x="0"
            y="25"
            fill="#FFFFFF"
            fontSize="52"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            HYPERSOMNIA
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
