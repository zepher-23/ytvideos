import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 19: The Pendulum - 180 frames
// =============================================================================
export const Scene19_ThePendulum = () => {
  const frame = useCurrentFrame();

  const swingAngle = Math.sin(frame * 0.14) * 55;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Pivot at top center */}
        <circle cx="960" cy="80" r="24" fill="#64748B" />

        {/* Ghost onion-skin trails */}
        {[-3, -2, -1].map((step) => {
          const trailAngle = Math.sin((frame + step * 2) * 0.14) * 55;
          return (
            <g
              key={step}
              transform={`translate(960, 80) rotate(${trailAngle})`}
              opacity={0.15}
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="720"
                stroke="#D97706"
                strokeWidth="10"
              />
              <circle cx="0" cy="720" r="85" fill="#D97706" />
            </g>
          );
        })}

        {/* Main Brass Pendulum (Enlarged: 720px arm, r=95 bob) */}
        <g transform={`translate(960, 80) rotate(${swingAngle})`}>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="720"
            stroke="#D97706"
            strokeWidth="14"
          />
          <circle
            cx="0"
            cy="720"
            r="95"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="14"
            filter="drop-shadow(0 0 35px rgba(245, 158, 11, 0.7))"
          />
          <circle cx="0" cy="720" r="38" fill="#78350F" />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
