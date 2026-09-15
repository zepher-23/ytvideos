import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 4: The Manic Break - 120 frames
// =============================================================================
export const Scene04_ManicBreak = () => {
  const frame = useCurrentFrame();

  const whipX = interpolate(frame, [0, 15], [-600, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const needleAngle = interpolate(frame, [30, 48], [-65, 68], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const jitter = frame >= 48 ? Math.sin(frame * 6.5) * 3.5 : 0;
  const currentAngle = needleAngle + jitter;
  const isCracked = frame >= 48;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0F172A",
        overflow: "hidden",
        transform: `translateX(${whipX}px)`,
      }}
    >
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Gauge scaled to 520px radius */}
        <g transform="translate(960, 740)">
          <circle
            cx="0"
            cy="0"
            r="520"
            fill="#1E293B"
            stroke="#475569"
            strokeWidth="20"
          />
          <circle cx="0" cy="0" r="480" fill="#0F172A" />

          {/* Left Arc: Blue DEPRESSIVE Zone */}
          <path
            d="M -400 0 A 400 400 0 0 1 0 -400"
            fill="none"
            stroke="#2563EB"
            strokeWidth="60"
            strokeLinecap="round"
          />
          {/* Right Arc: Red MANIC Zone */}
          <path
            d="M 0 -400 A 400 400 0 0 1 400 0"
            fill="none"
            stroke="#EF4444"
            strokeWidth="60"
            strokeLinecap="round"
          />

          <text
            x="-260"
            y="-160"
            fill="#93C5FD"
            fontSize="42"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            DEPRESSIVE
          </text>
          <text
            x="260"
            y="-160"
            fill="#FCA5A5"
            fontSize="48"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            MANIC
          </text>

          {/* Needle */}
          <g transform={`rotate(${currentAngle})`}>
            <polygon
              points="-12,35 12,35 0,-440"
              fill="#F8FAFC"
              stroke="#000000"
              strokeWidth="3"
            />
            <polygon points="-6,25 6,25 0,-440" fill="#EF4444" />
          </g>

          <circle
            cx="0"
            cy="0"
            r="50"
            fill="#334155"
            stroke="#94A3B8"
            strokeWidth="8"
          />
          <circle cx="0" cy="0" r="20" fill="#EF4444" />

          {/* Prominent Glass Cracks */}
          {isCracked && (
            <path
              d="M 340 -90 L 260 -180 L 300 -240 L 220 -280 M 260 -180 L 180 -160 L 150 -220 M 300 -240 L 370 -290"
              fill="none"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
