import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 37: Title - Psychotic Depression - 150 frames
// =============================================================================
export const Scene37_TitlePsychotic = () => {
  const frame = useCurrentFrame();

  const titleChars = "6. PSYCHOTIC DEPRESSION";
  const typed = Math.floor(
    interpolate(frame, [10, 50], [0, titleChars.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const isShattered = frame >= 60;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 84,
          fontWeight: 900,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          marginBottom: 50,
        }}
      >
        {titleChars.slice(0, typed)}
      </div>

      {/* Enlarged Vector Mirror (840x400px) */}
      <svg width="840" height="400" viewBox="-420 -200 840 400">
        {!isShattered ? (
          <rect
            x="-380"
            y="-170"
            width="760"
            height="340"
            rx="20"
            fill="rgba(255,255,255,0.08)"
            stroke="#94A3B8"
            strokeWidth="8"
          />
        ) : (
          <g>
            <polygon
              points="-360,-160 -90,-160 -180,60"
              fill="rgba(255,255,255,0.18)"
              stroke="#E2E8F0"
              strokeWidth="6"
            />
            <polygon
              points="-90,-160 210,-160 60,-15 -75,60"
              fill="rgba(255,255,255,0.22)"
              stroke="#E2E8F0"
              strokeWidth="6"
            />
            <polygon
              points="210,-160 360,-160 315,75 120,30"
              fill="rgba(255,255,255,0.15)"
              stroke="#E2E8F0"
              strokeWidth="6"
            />
            <polygon
              points="-330,75 -60,90 -165,165 -330,165"
              fill="rgba(255,255,255,0.12)"
              stroke="#E2E8F0"
              strokeWidth="6"
            />
            <polygon
              points="-60,90 240,75 330,165 -75,165"
              fill="rgba(255,255,255,0.18)"
              stroke="#E2E8F0"
              strokeWidth="6"
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
