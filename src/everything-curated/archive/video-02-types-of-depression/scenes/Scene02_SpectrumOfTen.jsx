import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 2: The Spectrum of Ten - 120 frames
// =============================================================================
export const Scene02_SpectrumOfTen = () => {
  const frame = useCurrentFrame();

  const isShaking = frame >= 18 && frame <= 38;
  const shakeX = isShaking ? Math.sin(frame * 4.5) * 12 : 0;
  const shakeY = isShaking ? Math.cos(frame * 5.2) * 9 : 0;

  const shootProgress = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const easedShoot = Math.sin((shootProgress * Math.PI) / 2);

  const colors = [
    "#06B6D4",
    "#D946EF",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#F97316",
    "#8B5CF6",
    "#EC4899",
    "#84CC16",
    "#14B8A6",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F19", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Connecting Ring (Enlarged to 440px radius) */}
        <circle
          cx="960"
          cy="540"
          r={440 * easedShoot}
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="3"
          strokeDasharray="12 12"
          opacity={shootProgress}
        />

        {/* 10 Glowing Nodes (Enlarged to r=28) */}
        {colors.map((c, i) => {
          const angle = (i / 10) * Math.PI * 2 - Math.PI / 2;
          const currentRadius = easedShoot * 440;
          const breathing =
            frame > 55 ? Math.sin(frame * 0.08 + i * 0.6) * 6 : 0;
          const r = currentRadius + breathing;
          const nx = 960 + Math.cos(angle) * r;
          const ny = 540 + Math.sin(angle) * r;

          return (
            <g key={i}>
              {shootProgress > 0.2 && (
                <line
                  x1="960"
                  y1="540"
                  x2={nx}
                  y2={ny}
                  stroke={c}
                  strokeWidth="3"
                  strokeOpacity={0.4 * shootProgress}
                />
              )}
              <circle
                cx={nx}
                cy={ny}
                r={26 + (breathing > 0 ? breathing * 0.6 : 0)}
                fill={c}
                opacity={Math.min(1, shootProgress * 1.5)}
                filter="drop-shadow(0 0 20px rgba(255,255,255,0.6))"
              />
              <circle
                cx={nx}
                cy={ny}
                r="10"
                fill="#FFFFFF"
                opacity={shootProgress}
              />
            </g>
          );
        })}

        {/* Central Brain Icon (Scaled up by 1.6x) */}
        <g
          transform={`translate(${960 + shakeX}, ${540 + shakeY}) scale(${1.6 + Math.sin(frame * 0.05) * 0.04})`}
        >
          <path
            d="M 0 -85 C -55 -85 -95 -55 -95 -12 C -115 12 -105 55 -75 80 C -55 98 -18 98 0 86 Z"
            fill="#334155"
            stroke="#64748B"
            strokeWidth="6"
          />
          <path
            d="M 0 -85 C 55 -85 95 -55 95 -12 C 115 12 105 55 75 80 C 55 98 18 98 0 86 Z"
            fill="#334155"
            stroke="#64748B"
            strokeWidth="6"
          />
          <path
            d="M -42 -30 Q -18 -55 0 -25 Q 18 -55 42 -30 M -55 18 Q -30 -6 0 24 Q 30 -6 55 18"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
