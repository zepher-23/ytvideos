import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 40: Mood-Congruent Voices - 180 frames
// =============================================================================
export const Scene40_MoodCongruentVoices = () => {
  const frame = useCurrentFrame();

  const words = [
    { text: "FAILURE", x: 440, y: 360, trigger: 25 },
    { text: "WORTHLESS", x: 1480, y: 400, trigger: 45 },
    { text: "RUINED", x: 960, y: 190, trigger: 65 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Overhead Spotlight (520px radius) */}
        <ellipse
          cx="960"
          cy="870"
          rx="520"
          ry="170"
          fill="#FFFFFF"
          opacity="0.28"
          filter="blur(40px)"
        />

        <CuratedStickman
          x={960}
          y={870}
          scale={1.45}
          pose="defeat"
          mouthState="shock"
        />

        {/* Massive Speech Bubbles (420px wide) */}
        {words.map((w, i) => {
          if (frame < w.trigger) return null;
          return (
            <g key={i} transform={`translate(${w.x}, ${w.y}) scale(1.35)`}>
              <polygon
                points="
                  -140,-50 -20,-50 0,-70 20,-50 140,-50 150,-20 160,20 140,50
                  30,50 0,90 -20,50 -140,50 -160,10
                "
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="7"
              />
              <text
                x="0"
                y="12"
                fill="#000000"
                fontSize="40"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
                textAnchor="middle"
              >
                {w.text}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
