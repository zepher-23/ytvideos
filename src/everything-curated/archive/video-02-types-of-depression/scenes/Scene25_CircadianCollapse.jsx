import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 25: Circadian Collapse - 210 frames
// =============================================================================
export const Scene25_CircadianCollapse = () => {
  const frame = useCurrentFrame();

  const isFrozen = frame >= 65;
  const gearRotation = isFrozen ? 65 * 3.5 : frame * 3.5;

  const iceCoverage = interpolate(frame, [35, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F19", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Watch Center (Enlarged to 440px radius) */}
        <g transform="translate(960, 540)">
          <circle
            cx="0"
            cy="0"
            r="440"
            fill="#B45309"
            stroke="#F59E0B"
            strokeWidth="24"
          />
          <circle cx="0" cy="0" r="390" fill="#1E293B" />

          {/* Gears (Enlarged to 200px radius) */}
          <g transform={`rotate(${gearRotation})`}>
            <circle
              cx="0"
              cy="0"
              r="200"
              fill="none"
              stroke="#D97706"
              strokeWidth="28"
              strokeDasharray="32 20"
            />
            <circle cx="0" cy="0" r="70" fill="#F59E0B" />
          </g>

          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-300"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
            transform={`rotate(${gearRotation * 1.5})`}
          />
          <line
            x1="0"
            y1="0"
            x2="200"
            y2="0"
            stroke="#FFFFFF"
            strokeWidth="16"
            strokeLinecap="round"
            transform={`rotate(${gearRotation * 0.2})`}
          />

          {/* Sharp Jagged Blue Ice Block */}
          {iceCoverage > 0 && (
            <g opacity={iceCoverage}>
              <polygon
                points="-480,-480 -140,-390 -340,-140 -460,0 -360,240 -480,480 0,380 280,470 480,480 390,140 490,-160 350,-390 480,-480 0,-340"
                fill="rgba(186, 230, 253, 0.5)"
                stroke="#BAE6FD"
                strokeWidth="12"
                strokeLinejoin="round"
              />
              <path
                d="M -280 -280 L 0 0 L 280 280 M -260 260 L 0 0 L 260 -260"
                stroke="#E0F2FE"
                strokeWidth="6"
              />
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
