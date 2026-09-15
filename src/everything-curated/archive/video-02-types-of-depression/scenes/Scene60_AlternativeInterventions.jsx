import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 60: Drastic Alternative Interventions - 180 frames
// =============================================================================
export const Scene60_AlternativeInterventions = () => {
  const frame = useCurrentFrame();

  const helmetY = interpolate(frame, [35, 65], [-350, 420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isHelmetOn = frame >= 65;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Stickman (Scale=1.45) */}
        <CuratedStickman
          x={960}
          y={800}
          scale={1.45}
          pose="idle"
          mouthState="neutral"
        />

        {/* Futuristic TMS Helmet (Enlarged to 360px dome) */}
        <g transform={`translate(960, ${helmetY})`}>
          <line
            x1="0"
            y1="-480"
            x2="0"
            y2="-110"
            stroke="#64748B"
            strokeWidth="14"
          />

          <path
            d="M -160 0 C -160 -140 160 -140 160 0 L 110 55 L -110 55 Z"
            fill="#334155"
            stroke="#38BDF8"
            strokeWidth="12"
          />

          {isHelmetOn && (
            <g>
              <ellipse
                cx="0"
                cy="30"
                rx="240"
                ry="65"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="12"
                filter="drop-shadow(0 0 30px #3B82F6)"
              />
              <ellipse
                cx="0"
                cy="-25"
                rx="190"
                ry="50"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="9"
                filter="drop-shadow(0 0 25px #60A5FA)"
              />
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
