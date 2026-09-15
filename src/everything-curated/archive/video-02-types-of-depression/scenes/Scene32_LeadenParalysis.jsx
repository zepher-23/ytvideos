import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 32: Leaden Paralysis - 180 frames
// =============================================================================
export const Scene32_LeadenParalysis = () => {
  const frame = useCurrentFrame();

  const pipeExtend = interpolate(frame, [25, 75], [0, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        <line
          x1="100"
          y1="870"
          x2="1820"
          y2="870"
          stroke="#334155"
          strokeWidth="12"
        />

        {/* Standing Stickman (Scale=1.55) */}
        <CuratedStickman
          x={960}
          y={800}
          scale={1.55}
          pose="idle"
          mouthState="shock"
        />

        {/* Heavy Thick Lead Pipes Anchored to Floor */}
        {/* Left Arm Lead Pipe */}
        <rect
          x="850"
          y="540"
          width="48"
          height={200 + pipeExtend}
          rx="12"
          fill="#475569"
          stroke="#94A3B8"
          strokeWidth="6"
        />
        {/* Right Arm Lead Pipe */}
        <rect
          x="1025"
          y="540"
          width="48"
          height={200 + pipeExtend}
          rx="12"
          fill="#475569"
          stroke="#94A3B8"
          strokeWidth="6"
        />
        {/* Leg Lead Anchors */}
        <rect
          x="900"
          y="680"
          width="54"
          height={200 + pipeExtend}
          rx="12"
          fill="#475569"
          stroke="#94A3B8"
          strokeWidth="6"
        />
        <rect
          x="970"
          y="680"
          width="54"
          height={200 + pipeExtend}
          rx="12"
          fill="#475569"
          stroke="#94A3B8"
          strokeWidth="6"
        />

        <text
          x="960"
          y="1000"
          fill="#94A3B8"
          fontSize="48"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
          textAnchor="middle"
        >
          LEADEN PARALYSIS
        </text>
      </svg>
    </AbsoluteFill>
  );
};
