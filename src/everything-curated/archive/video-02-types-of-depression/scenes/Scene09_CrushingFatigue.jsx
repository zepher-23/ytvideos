import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 9: Crushing Fatigue - 180 frames
// =============================================================================
export const Scene09_CrushingFatigue = () => {
  const frame = useCurrentFrame();

  const weightY = interpolate(frame, [25, 42], [-400, 380], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isCrushed = frame >= 42;
  const batteryScaleY = isCrushed ? 0.28 : 1;
  const batteryCharge = interpolate(frame, [42, 70], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const batteryColor = batteryCharge > 20 ? "#22C55E" : "#EF4444";

  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F5F9", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="960" cy="840" rx="380" ry="36" fill="rgba(0,0,0,0.14)" />

        {/* Battery Container (Enlarged to 560x280px) */}
        <g transform={`translate(960, 700) scale(1, ${batteryScaleY})`}>
          <rect
            x="280"
            y="-50"
            width="40"
            height="100"
            rx="12"
            fill="#334155"
          />
          <rect
            x="-280"
            y="-140"
            width="560"
            height="280"
            rx="32"
            fill="#FFFFFF"
            stroke="#1E293B"
            strokeWidth="16"
          />
          <rect
            x="-255"
            y="-115"
            width={510 * (batteryCharge / 100)}
            height="230"
            rx="20"
            fill={batteryColor}
            filter={!isCrushed ? "drop-shadow(0 0 25px #22C55E)" : "none"}
          />
        </g>

        {/* Giant Black Iron Weight (Enlarged to 720px width) */}
        <g transform={`translate(960, ${weightY})`}>
          <polygon
            points="-360,220 360,220 280,-140 -280,-140"
            fill="#0F172A"
            stroke="#334155"
            strokeWidth="10"
          />
          <path
            d="M -90 -140 C -90 -240 90 -240 90 -140"
            fill="none"
            stroke="#475569"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <text
            x="0"
            y="80"
            fill="#FFFFFF"
            fontSize="84"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            10 TON
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
