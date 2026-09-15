import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 62: Mechanical Failure - 150 frames
// =============================================================================
export const Scene62_MechanicalFailure = () => {
  const frame = useCurrentFrame();

  const isGlitch = frame >= 25;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isGlitch ? "#450A0A" : "#031A3A",
        transition: "background-color 0.1s",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Human Wireframe Terminal - Scaled up 1.45x */}
        <g transform="translate(960, 520) scale(1.45)">
          {/* Wireframe Silhouette */}
          <ellipse
            cx="0"
            cy="-170"
            rx="75"
            ry="95"
            fill="none"
            stroke={isGlitch ? "#EF4444" : "#22C55E"}
            strokeWidth="7"
          />
          <line
            x1="0"
            y1="-75"
            x2="0"
            y2="150"
            stroke={isGlitch ? "#EF4444" : "#22C55E"}
            strokeWidth="10"
          />
          <line
            x1="-150"
            y1="-20"
            x2="150"
            y2="-20"
            stroke={isGlitch ? "#EF4444" : "#22C55E"}
            strokeWidth="10"
          />
          <line
            x1="0"
            y1="150"
            x2="-110"
            y2="340"
            stroke={isGlitch ? "#EF4444" : "#22C55E"}
            strokeWidth="10"
          />
          <line
            x1="0"
            y1="150"
            x2="110"
            y2="340"
            stroke={isGlitch ? "#EF4444" : "#22C55E"}
            strokeWidth="10"
          />
          {/* Target telemetry points */}
          <circle cx="0" cy="-20" r="14" fill={isGlitch ? "#EF4444" : "#22C55E"} />
          <circle cx="-110" cy="340" r="12" fill={isGlitch ? "#EF4444" : "#22C55E"} />
          <circle cx="110" cy="340" r="12" fill={isGlitch ? "#EF4444" : "#22C55E"} />
        </g>

        {/* Glitching Binary Strings across canvas */}
        {isGlitch && (
          <g fill="#EF4444" opacity="0.65" fontSize="32" fontFamily="monospace" fontWeight="bold">
            {Array.from({ length: 15 }).map((_, i) => (
              <text key={i} x={80 + i * 125} y={120 + ((frame * 28 + i * 75) % 850)}>
                1011001010
              </text>
            ))}
          </g>
        )}

        {/* Massive Solid Red SYSTEM FAILURE Banner */}
        {isGlitch && (
          <g transform="translate(960, 540)">
            <rect
              x="-750"
              y="-110"
              width="1500"
              height="220"
              rx="16"
              fill="#EF4444"
              stroke="#FFFFFF"
              strokeWidth="10"
              filter="drop-shadow(0 0 50px #EF4444)"
            />
            <text
              x="0"
              y="28"
              fill="#FFFFFF"
              fontSize="92"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
              letterSpacing="0.1em"
            >
              SYSTEM FAILURE
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
