import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 34: The Crushing Return - 150 frames
// =============================================================================
export const Scene34_TheCrushingReturn = () => {
  const frame = useCurrentFrame();

  const weightY = interpolate(frame, [20, 36], [-300, 560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Aggressive Dark Rain Cloud (580px width) */}
        <g transform="translate(960, 200)">
          <ellipse cx="0" cy="0" rx="280" ry="120" fill="#1E293B" />
          <ellipse cx="-130" cy="-40" rx="180" ry="100" fill="#1E293B" />
          <ellipse cx="130" cy="-40" rx="180" ry="100" fill="#1E293B" />
          {[-180, -100, -20, 60, 140].map((dx, i) => (
            <line
              key={i}
              x1={dx}
              y1="120"
              x2={dx - 25}
              y2="360"
              stroke="#475569"
              strokeWidth="8"
              strokeDasharray="14 10"
            />
          ))}
        </g>

        <CuratedStickman
          x={960}
          y={800}
          scale={1.45}
          pose="defeat"
          mouthState="frown"
        />

        {/* Massive 1-TON Iron Weight (Enlarged to 680px width) */}
        <g transform={`translate(960, ${weightY})`}>
          <polygon
            points="-340,180 340,180 260,-110 -260,-110"
            fill="#0F172A"
            stroke="#334155"
            strokeWidth="10"
          />
          <text
            x="0"
            y="65"
            fill="#FFFFFF"
            fontSize="84"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            1 TON
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
