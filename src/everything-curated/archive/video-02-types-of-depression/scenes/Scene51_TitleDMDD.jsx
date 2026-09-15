import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 51: Title - DMDD - 150 frames
// =============================================================================
export const Scene51_TitleDMDD = () => {
  const frame = useCurrentFrame();

  const tensionX = Math.sin(frame * 4.5) * 3;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 140px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "#FFFFFF",
          maxWidth: 1050,
          lineHeight: 1.25,
        }}
      >
        9. DISRUPTIVE MOOD DYSREGULATION DISORDER (DMDD)
      </div>

      {/* Child Stickman with Radiating Red Heat Waves (Scale=1.35) */}
      <svg width="500" height="700" viewBox="0 0 500 700">
        {[-45, -20, 5, 30, 55].map((dy, i) => (
          <path
            key={i}
            d={`M 150 ${260 + dy} Q 250 ${230 + dy + Math.sin(frame * 0.2 + i) * 20} 350 ${260 + dy}`}
            fill="none"
            stroke="#DC2626"
            strokeWidth="9"
            strokeLinecap="round"
            opacity={0.85}
          />
        ))}

        <g transform={`translate(${250 + tensionX}, 380)`}>
          <CuratedStickman
            x={0}
            y={0}
            scale={1.35}
            variant="child"
            pose="idle"
            mouthState="frown"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
