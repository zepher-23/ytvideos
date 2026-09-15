import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 8: Anhedonia - 180 frames
// =============================================================================
export const Scene08_Anhedonia = () => {
  const frame = useCurrentFrame();

  const expandRadius = interpolate(frame, [35, 80], [0, 1150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isTouched = frame >= 48;
  const sinkY = interpolate(frame, [48, 140], [0, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconOpacity = interpolate(frame, [80, 140], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        <circle cx="960" cy="540" r={expandRadius} fill="#1E293B" />

        {/* 1. Large Pizza (Scaled to 150px) */}
        <g
          transform={`translate(420, ${360 + sinkY + Math.sin(frame * 0.1) * 20}) scale(1.6)`}
          opacity={iconOpacity}
        >
          <polygon
            points="0,-50 -45,40 45,40"
            fill={isTouched ? "#64748B" : "#F59E0B"}
            stroke={isTouched ? "#475569" : "#B45309"}
            strokeWidth="5"
          />
          <circle
            cx="-10"
            cy="0"
            r="8"
            fill={isTouched ? "#475569" : "#EF4444"}
          />
          <circle
            cx="14"
            cy="20"
            r="7"
            fill={isTouched ? "#475569" : "#EF4444"}
          />
        </g>

        {/* 2. Large Game Controller (Scaled to 180px) */}
        <g
          transform={`translate(1500, ${380 + sinkY + Math.cos(frame * 0.1) * 20}) scale(1.6)`}
          opacity={iconOpacity}
        >
          <rect
            x="-55"
            y="-30"
            width="110"
            height="60"
            rx="22"
            fill={isTouched ? "#64748B" : "#3B82F6"}
            stroke={isTouched ? "#475569" : "#1D4ED8"}
            strokeWidth="5"
          />
          <path
            d="M -30 -10 H -18 V -22 H -8 V -10 H 4 V 0 H -8 V 12 H -18 V 0 H -30 Z"
            fill="#FFFFFF"
          />
          <circle
            cx="26"
            cy="-6"
            r="7"
            fill={isTouched ? "#CBD5E1" : "#EF4444"}
          />
          <circle
            cx="16"
            cy="8"
            r="7"
            fill={isTouched ? "#CBD5E1" : "#10B981"}
          />
        </g>

        {/* 3. Large Music Note (Scaled to 160px) */}
        <g
          transform={`translate(1400, ${720 + sinkY + Math.sin(frame * 0.12) * 22}) scale(1.6)`}
          opacity={iconOpacity}
        >
          <path
            d="M -18 25 A 18 14 0 1 1 -18 0 L -18 -55 L 25 -42 L 25 18 A 18 14 0 1 1 25 -6"
            fill="none"
            stroke={isTouched ? "#64748B" : "#EC4899"}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <ellipse
            cx="-26"
            cy="18"
            rx="18"
            ry="14"
            fill={isTouched ? "#64748B" : "#EC4899"}
          />
          <ellipse
            cx="16"
            cy="24"
            rx="18"
            ry="14"
            fill={isTouched ? "#64748B" : "#EC4899"}
          />
        </g>

        {/* Center Stickman Bust (Enlarged to scale=1.55) */}
        <CuratedStickman
          x={960}
          y={620}
          scale={1.55}
          isBust={true}
          pose="idle"
          mouthState="flat"
        />
      </svg>
    </AbsoluteFill>
  );
};
