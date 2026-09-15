import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 28: Spring Remission - 180 frames
// =============================================================================
export const Scene28_SpringRemission = () => {
  const frame = useCurrentFrame();

  const isBeam = frame >= 25;
  const beamOpacity = interpolate(frame, [25, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isCharged = frame >= 32;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Massive Pillar of Yellow Sunlight */}
        {isBeam && (
          <polygon
            points="700,0 1220,0 1380,1080 540,1080"
            fill="#FEF08A"
            opacity={0.42 * beamOpacity}
            filter="drop-shadow(0 0 65px #FDE047)"
          />
        )}

        {/* Stickman Standing Upright (Scale=1.45) */}
        <CuratedStickman
          x={960}
          y={800}
          scale={1.45}
          pose={isCharged ? "content" : "defeat"}
          mouthState={isCharged ? "smile" : "frown"}
        />

        {/* 100% Full Glowing Green Battery */}
        <g transform="translate(960, 600)">
          <rect
            x="-110"
            y="-45"
            width="220"
            height="90"
            rx="16"
            fill="#1E293B"
            stroke="#FFFFFF"
            strokeWidth="8"
          />
          <rect x="110" y="-18" width="20" height="36" rx="8" fill="#FFFFFF" />
          <rect
            x="-96"
            y="-32"
            width={isCharged ? 192 : 0}
            height="64"
            rx="10"
            fill="#22C55E"
            filter="drop-shadow(0 0 25px #22C55E)"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
