import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 44: System Failure - 180 frames
// =============================================================================
export const Scene44_SystemFailure = () => {
  const frame = useCurrentFrame();

  const isShattered = frame >= 35;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F19", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Test Tube Rack (Enlarged to 900px width) */}
        <g transform="translate(960, 560)">
          <rect
            x="-450"
            y="90"
            width="900"
            height="45"
            rx="10"
            fill="#78350F"
          />
          <rect
            x="-450"
            y="-60"
            width="900"
            height="30"
            rx="8"
            fill="#78350F"
          />

          {!isShattered ? (
            [-280, -140, 0, 140, 280].map((tx, i) => {
              const color = i % 2 === 0 ? "#EC4899" : "#FDE047";
              return (
                <g key={i} transform={`translate(${tx}, 0)`}>
                  <rect
                    x="-28"
                    y="-160"
                    width="56"
                    height="240"
                    rx="28"
                    fill="rgba(255,255,255,0.12)"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                  />
                  <rect
                    x="-22"
                    y="-30"
                    width="44"
                    height="120"
                    rx="22"
                    fill={color}
                    filter={`drop-shadow(0 0 20px ${color})`}
                  />
                </g>
              );
            })
          ) : (
            <g>
              <ellipse cx="-200" cy="180" rx="240" ry="50" fill="#EC4899" />
              <ellipse cx="220" cy="190" rx="260" ry="55" fill="#FDE047" />
              <polygon points="-90,60 -30,30 -60,90" fill="#FFFFFF" />
              <polygon points="90,60 150,20 120,80" fill="#FFFFFF" />
            </g>
          )}
        </g>

        {isShattered && (
          <text
            x="960"
            y="300"
            fill="#EF4444"
            fontSize="84"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
            filter="drop-shadow(0 0 35px #EF4444)"
          >
            SYSTEM FAILURE
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};
