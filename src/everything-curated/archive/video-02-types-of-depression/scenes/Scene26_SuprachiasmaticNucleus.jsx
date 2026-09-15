import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 26: The Suprachiasmatic Nucleus - 180 frames
// =============================================================================
export const Scene26_SuprachiasmaticNucleus = () => {
  const frame = useCurrentFrame();

  const isBeamActive = frame >= 25;
  const nodeGlow = isBeamActive ? Math.min(1, (frame - 25) / 30) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#031A3A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Giant Glowing Sun Icon in Top Right */}
        <g transform="translate(1600, 220)">
          <circle
            cx="0"
            cy="0"
            r="140"
            fill="#FDE047"
            filter="drop-shadow(0 0 50px #FDE047)"
          />
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="160"
              x2="0"
              y2="220"
              stroke="#FDE047"
              strokeWidth="14"
              strokeLinecap="round"
              transform={`rotate(${i * 36 + frame})`}
            />
          ))}
        </g>

        {/* Head Diagram Silhouette (Enlarged to 900px height) */}
        <path
          d="M 660 180 C 420 180 320 300 320 500 C 320 640 400 760 500 860 L 520 980 L 880 980 L 900 860 C 1000 760 1060 640 1060 500 C 1060 300 940 180 660 180 Z"
          fill="#0B132B"
          stroke="#38BDF8"
          strokeWidth="8"
        />

        {/* Laser Beams from Sun to SCN Node (x = 660, y = 540) */}
        {isBeamActive && (
          <g>
            <line
              x1="1600"
              y1="220"
              x2="660"
              y2="540"
              stroke="#FDE047"
              strokeWidth="16"
              filter="drop-shadow(0 0 25px #FDE047)"
            />
            <line
              x1="1600"
              y1="220"
              x2="660"
              y2="540"
              stroke="#FFFFFF"
              strokeWidth="5"
            />
          </g>
        )}

        {/* Enlarged SCN Master Clock Node */}
        <circle
          cx="660"
          cy="540"
          r={32 + nodeGlow * 24}
          fill={isBeamActive ? "#FDE047" : "#475569"}
          stroke="#FFFFFF"
          strokeWidth="6"
          filter={
            isBeamActive
              ? "drop-shadow(0 0 45px rgba(253, 224, 71, 1))"
              : "none"
          }
        />
        <text
          x="660"
          y="640"
          fill="#38BDF8"
          fontSize="36"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
        >
          SCN MASTER CLOCK
        </text>
      </svg>
    </AbsoluteFill>
  );
};
