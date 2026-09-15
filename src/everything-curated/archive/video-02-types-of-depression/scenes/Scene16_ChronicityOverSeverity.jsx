import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 16: Chronicity Over Severity - 210 frames
// =============================================================================
export const Scene16_ChronicityOverSeverity = () => {
  const frame = useCurrentFrame();

  const tiltAngle = interpolate(frame, [45, 65], [0, 22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Scale Fulcrum */}
        <polygon points="960,520 890,820 1030,820" fill="#1E293B" />
        <rect x="830" y="820" width="260" height="32" rx="8" fill="#0F172A" />

        {/* Rotating Crossbeam (Expanded to 1360px) */}
        <g transform={`translate(960, 520) rotate(${tiltAngle})`}>
          <rect
            x="-680"
            y="-15"
            width="1360"
            height="30"
            rx="8"
            fill="#475569"
            stroke="#0F172A"
            strokeWidth="6"
          />
          <circle cx="0" cy="0" r="22" fill="#0F172A" />

          {/* Left Pan (CHRONICITY Boulder) */}
          <g transform="translate(-600, 0)">
            <line
              x1="0"
              y1="0"
              x2="-100"
              y2="180"
              stroke="#64748B"
              strokeWidth="6"
            />
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="180"
              stroke="#64748B"
              strokeWidth="6"
            />
            <path
              d="M -140 180 Q 0 220 140 180 Z"
              fill="#CBD5E1"
              stroke="#475569"
              strokeWidth="8"
            />

            {/* Giant Grey Boulder (rx=150, ry=120) */}
            <g transform="translate(0, 80)">
              <ellipse
                cx="0"
                cy="0"
                rx="150"
                ry="120"
                fill="#64748B"
                stroke="#1E293B"
                strokeWidth="10"
              />
              <text
                x="0"
                y="12"
                fill="#FFFFFF"
                fontSize="34"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
                textAnchor="middle"
              >
                CHRONICITY
              </text>
            </g>
          </g>

          {/* Right Pan (SEVERITY Spike) */}
          <g transform="translate(600, 0)">
            <line
              x1="0"
              y1="0"
              x2="-100"
              y2="180"
              stroke="#64748B"
              strokeWidth="6"
            />
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="180"
              stroke="#64748B"
              strokeWidth="6"
            />
            <path
              d="M -140 180 Q 0 220 140 180 Z"
              fill="#CBD5E1"
              stroke="#475569"
              strokeWidth="8"
            />

            {/* Spike */}
            <g transform="translate(0, 110)">
              <polygon
                points="0,-65 -35,35 35,35"
                fill="#DC2626"
                stroke="#991B1B"
                strokeWidth="6"
              />
              <text
                x="0"
                y="75"
                fill="#DC2626"
                fontSize="30"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
                textAnchor="middle"
              >
                SEVERITY
              </text>
            </g>
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
