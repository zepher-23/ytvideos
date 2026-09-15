import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 23: Rapid Cycling - 180 frames
// =============================================================================
export const Scene23_RapidCycling = () => {
  const frame = useCurrentFrame();

  const needleAngle = Math.sin(frame * 0.6) * 68 + Math.cos(frame * 1.3) * 18;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F19", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        <g transform="translate(960, 700)">
          {/* Gauge Enlarge to 520px radius */}
          <circle
            cx="0"
            cy="0"
            r="520"
            fill="#1E293B"
            stroke="#475569"
            strokeWidth="22"
          />
          <path
            d="M -400 0 A 400 400 0 0 1 0 -400"
            fill="none"
            stroke="#2563EB"
            strokeWidth="60"
            strokeLinecap="round"
          />
          <path
            d="M 0 -400 A 400 400 0 0 1 400 0"
            fill="none"
            stroke="#EF4444"
            strokeWidth="60"
            strokeLinecap="round"
          />

          <g transform={`rotate(${needleAngle})`}>
            <polygon points="-12,35 12,35 0,-440" fill="#F8FAFC" />
            <polygon points="-6,25 6,25 0,-440" fill="#DC2626" />
          </g>
          <circle cx="0" cy="0" r="44" fill="#0F172A" />

          {/* Shattered Glass */}
          <path
            d="M -200 -160 L 0 -50 L 160 -200 M 0 -50 L 50 180 M 0 -50 L -160 130"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="7"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
