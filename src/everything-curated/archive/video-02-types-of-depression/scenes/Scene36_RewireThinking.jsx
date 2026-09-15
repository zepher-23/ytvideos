import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 36: Rewire Your Thinking - 120 frames
// =============================================================================
export const Scene36_RewireThinking = () => {
  const frame = useCurrentFrame();

  const isShattered = frame >= 30;
  const shatterElapsed = Math.max(0, frame - 30);
  const brickSpread = interpolate(shatterElapsed, [0, 60], [0, 650], {
    extrapolateRight: "clamp",
  });

  const vortexRot = frame * 4;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Massive Swirling Neon Purple Vortex (600px radius) */}
        <g transform={`translate(960, 540) rotate(${vortexRot})`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M 0 0 Q ${200 + i * 30} ${160 + i * 35} ${550 + i * 40} ${480 + i * 35}`}
              fill="none"
              stroke="#A855F7"
              strokeWidth={12 + i * 2.5}
              opacity={0.75}
              transform={`rotate(${i * 30})`}
              filter="drop-shadow(0 0 25px #A855F7)"
            />
          ))}
          <circle cx="0" cy="0" r="110" fill="#3B0764" />
        </g>

        {/* Large Bricks (240x130px each) */}
        {Array.from({ length: 24 }).map((_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const baseX = 340 + col * 250;
          const baseY = 240 + row * 150;

          const angle = Math.atan2(baseY - 540, baseX - 960);
          const currentX = baseX + Math.cos(angle) * brickSpread;
          const currentY = baseY + Math.sin(angle) * brickSpread;
          const currentRot = isShattered
            ? (i % 2 === 0 ? 1 : -1) * shatterElapsed * 3.5
            : 0;

          return (
            <rect
              key={i}
              x={-115}
              y={-60}
              width="230"
              height="120"
              rx="12"
              fill="#B91C1C"
              stroke="#7F1D1D"
              strokeWidth="6"
              transform={`translate(${currentX}, ${currentY}) rotate(${currentRot})`}
              opacity={isShattered ? Math.max(0, 1 - shatterElapsed / 55) : 1}
            />
          );
        })}

        {!isShattered && (
          <text
            x="960"
            y="575"
            fill="#FFFFFF"
            fontSize="100"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
            letterSpacing="0.12em"
          >
            REALITY
          </text>
        )}
      </svg>
    </AbsoluteFill>
  );
};
