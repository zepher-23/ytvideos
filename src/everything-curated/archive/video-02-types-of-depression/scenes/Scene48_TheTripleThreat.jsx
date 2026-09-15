import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 48: The Triple Threat - 180 frames
// =============================================================================
export const Scene48_TheTripleThreat = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Stickman on Knees (Scale=1.45) */}
        <CuratedStickman
          x={960}
          y={820}
          scale={1.45}
          pose="defeat"
          mouthState="shock"
        />

        {/* 1. Heavy Black Rain Cloud (Enlarged to 540px width) */}
        <g transform="translate(960, 240)">
          <ellipse cx="0" cy="0" rx="260" ry="110" fill="#000000" />
          <ellipse cx="-110" cy="-30" rx="160" ry="90" fill="#000000" />
          <ellipse cx="110" cy="-30" rx="160" ry="90" fill="#000000" />
          {[-120, -40, 40, 120].map((dx, i) => (
            <line
              key={i}
              x1={dx}
              y1="110"
              x2={dx - 15}
              y2="280"
              stroke="#64748B"
              strokeWidth="7"
              strokeDasharray="12 12"
            />
          ))}
          <text
            x="0"
            y="-60"
            fill="#94A3B8"
            fontSize="36"
            fontWeight="900"
            textAnchor="middle"
          >
            DEPRESSION
          </text>
        </g>

        {/* 2. Roaring Fireball (Enlarged to 320px width) */}
        <g transform="translate(420, 580)">
          <polygon
            points="0,-150 60,-75 140,-100 90,-15 150,30 75,75 105,150 20,100 0,165 -30,100 -105,150 -75,75 -150,30 -90,-15 -140,-100 -60,-75"
            fill="#EA580C"
            filter="drop-shadow(0 0 35px #EA580C)"
          />
          <circle cx="0" cy="20" r="60" fill="#FDE047" />
          <text
            x="0"
            y="230"
            fill="#EA580C"
            fontSize="42"
            fontWeight="900"
            textAnchor="middle"
          >
            RAGE
          </text>
        </g>

        {/* 3. Jagged Lightning Bolts (Enlarged) */}
        <g transform="translate(1500, 580)">
          <polygon
            points="0,-180 60,-30 0,-15 45,165 -60,15 0,0 -45,-180"
            fill="#06B6D4"
            filter="drop-shadow(0 0 35px #06B6D4)"
          />
          <text
            x="0"
            y="230"
            fill="#06B6D4"
            fontSize="42"
            fontWeight="900"
            textAnchor="middle"
          >
            ANXIETY
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
