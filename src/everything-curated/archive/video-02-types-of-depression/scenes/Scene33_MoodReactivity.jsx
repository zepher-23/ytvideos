import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 33: Mood Reactivity (The False Hope) - 210 frames
// =============================================================================
export const Scene33_MoodReactivity = () => {
  const frame = useCurrentFrame();

  const boxY = interpolate(frame, [15, 40], [-150, 680], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isGiftOpened = frame >= 40;
  const cloudY = isGiftOpened
    ? interpolate(frame, [40, 75], [260, 60], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 260;

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Warm Golden Aura (Enlarged to 440px radius) */}
        {isGiftOpened && (
          <circle
            cx="960"
            cy="700"
            r="440"
            fill="#FDE047"
            opacity="0.32"
            filter="blur(65px)"
          />
        )}

        {/* Rain Cloud (Enlarged to 580px width) */}
        <g transform={`translate(960, ${cloudY})`}>
          <ellipse cx="0" cy="0" rx="280" ry="110" fill="#334155" />
          <ellipse cx="-130" cy="-40" rx="180" ry="90" fill="#334155" />
          <ellipse cx="130" cy="-40" rx="180" ry="90" fill="#334155" />
          {[-160, -80, 0, 80, 160].map((dx, i) => (
            <line
              key={i}
              x1={dx}
              y1="110"
              x2={dx - 20}
              y2="240"
              stroke="#64748B"
              strokeWidth="7"
              strokeDasharray="12 12"
            />
          ))}
        </g>

        {/* Stickman (Scale=1.45) */}
        <CuratedStickman
          x={960}
          y={800}
          scale={1.45}
          pose={isGiftOpened ? "content" : "defeat"}
          mouthState={isGiftOpened ? "smile" : "frown"}
        />

        {/* Gift Box (Enlarged: 130x130px) */}
        <g transform={`translate(960, ${boxY})`}>
          <rect
            x="-65"
            y="-65"
            width="130"
            height="130"
            rx="16"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="6"
          />
          <line
            x1="0"
            y1="-65"
            x2="0"
            y2="65"
            stroke="#FDE047"
            strokeWidth="14"
          />
          <line
            x1="-65"
            y1="0"
            x2="65"
            y2="0"
            stroke="#FDE047"
            strokeWidth="14"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
