import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Calendar } from "../../shared";

// =============================================================================
// SCENE 50: The Reset - 150 frames
// =============================================================================
export const Scene50_TheReset = () => {
  const frame = useCurrentFrame();

  const bloodY = interpolate(frame, [15, 35], [50, 540], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isReset = frame >= 35;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isReset ? "#FFFFFF" : "#0F172A",
        transition: "background-color 0.15s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Calendar Grid (Enlarged to 1240x600px) */}
        <g transform="translate(960, 540)">
          <rect
            x="-620"
            y="-300"
            width="1240"
            height="600"
            rx="28"
            fill="#FFFFFF"
            stroke={isReset ? "#CBD5E1" : "#DC2626"}
            strokeWidth="12"
            boxShadow="0 35px 70px rgba(0,0,0,0.2)"
          />
          <text
            x="0"
            y="-180"
            fill="#1E293B"
            fontSize="54"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            {isReset ? "CALM / RESET" : "CYCLE DAY 28"}
          </text>

          {/* Blood Drop Falling (120px tall) */}
          {!isReset && (
            <g transform={`translate(0, ${bloodY - 540})`}>
              <path
                d="M 0 -60 C -40 0 -40 40 0 60 C 40 40 40 0 0 -60 Z"
                fill="#B91C1C"
                filter="drop-shadow(0 0 20px #B91C1C)"
              />
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
