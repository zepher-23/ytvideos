import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 27: Photoperiod Dependency - 210 frames
// =============================================================================
export const Scene27_PhotoperiodDependency = () => {
  const frame = useCurrentFrame();

  const batteryPct = interpolate(frame, [15, 70], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isDead = batteryPct <= 0;
  const slump = isDead ? "defeat" : "idle";

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Stickman (Enlarged to 1.45x) */}
        <CuratedStickman
          x={960}
          y={800}
          scale={1.45}
          pose={slump}
          mouthState={isDead ? "frown" : "neutral"}
        />

        {/* Battery Meter on Chest (Enlarged to 220x90px) */}
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
            width={192 * (batteryPct / 100)}
            height="64"
            rx="10"
            fill={batteryPct > 20 ? "#22C55E" : "#475569"}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
