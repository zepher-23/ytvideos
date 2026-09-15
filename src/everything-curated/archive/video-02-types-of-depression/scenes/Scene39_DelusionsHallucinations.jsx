import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AutoBadge } from "../../shared";

// =============================================================================
// SCENE 39: Delusions & Hallucinations - 180 frames
// =============================================================================
export const Scene39_DelusionsHallucinations = () => {
  const frame = useCurrentFrame();

  const isFractured = frame >= 35;
  const shakeX = isFractured ? Math.sin(frame * 5.5) * 6 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Main Flowchart Boxes (Using AutoBadge) */}
        <AutoBadge
          text="DEPRESSION"
          x={590}
          y={315}
          width={420}
          height={150}
          rx={20}
          fill="#1E293B"
          stroke="#FFFFFF"
          strokeWidth={8}
          maxFontSize={46}
        />

        <line
          x1="590"
          y1="390"
          x2="590"
          y2="640"
          stroke="#FFFFFF"
          strokeWidth={8}
        />

        <AutoBadge
          text="DESPAIR"
          x={590}
          y={715}
          width={420}
          height={150}
          rx={20}
          fill="#1E293B"
          stroke="#FFFFFF"
          strokeWidth={8}
          maxFontSize={46}
        />

        {/* Jagged Path & Giant HALLUCINATIONS Box */}
        {isFractured && (
          <g>
            <path
              d="M 590 515 L 850 480 L 1020 570 L 1200 520"
              fill="none"
              stroke="#EF4444"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="drop-shadow(0 0 16px #EF4444)"
            />

            <AutoBadge
              text="HALLUCINATIONS"
              x={1380 + shakeX}
              y={520}
              width={480}
              height={170}
              rx={24}
              fill="#450A0A"
              stroke="#EF4444"
              strokeWidth={10}
              maxFontSize={46}
              textColor="#FCA5A5"
              filter="drop-shadow(0 0 35px rgba(239, 68, 68, 0.8))"
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
