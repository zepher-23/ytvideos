import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

/**
 * Scene 128: The Abrupt CRT Power-Off
 * Duration: 90 frames (3.0s)
 * Environment: Solid True Black background (#000000).
 * Transition: Continuous from Scene 127.
 * Characters & Props: Single white horizontal line and shrinking dot.
 * Action:
 * - Beginning: Screen is True Black.
 * - Action / Climax: Exactly on the final syllable of the voiceover ("...system."), a single, bright horizontal white line snaps into the direct center of the frame against the black. In the same second, this line instantly shrinks inward into a tiny white dot in the dead center.
 * - Ending / Hold: The white dot instantly shrinks to zero size and disappears, leaving true black again. Video ends immediately.
 * Text & Specific Colors: Line and dot pure white (#FFFFFF). True Black background (#000000).
 */
export const Scene128_TheAbruptCRTPowerOff = () => {
  const frame = useCurrentFrame();

  // Phase 1: frames 0 to 44 -> True Black
  // Phase 2: frames 45 to 65 -> Bright white horizontal line snaps in and shrinks inward
  // Phase 3: frames 65 to 75 -> Tiny white dot glows and shrinks to 0
  // Phase 4: frames 75 to 90 -> True Black final hold

  const isLineActive = frame >= 45 && frame < 65;
  const isDotActive = frame >= 65 && frame < 75;

  // Horizontal line width collapses from 1920 to 10
  const lineWidth = interpolate(frame, [45, 65], [1920, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lineHeight = interpolate(frame, [45, 55, 65], [6, 4, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dot radius shrinks from 6 to 0
  const dotRadius = interpolate(frame, [65, 74], [6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none pointer-events-none"
      style={{
        backgroundColor: "#000000",
      }}
    >
      {/* SVG CRT Line / Dot Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="crtGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Bright Horizontal White Line shrinking inward */}
        {isLineActive && (
          <g filter="url(#crtGlow)">
            {/* Diffuse Phosphor Glow Halo */}
            <line
              x1={960 - lineWidth / 2}
              y1={540}
              x2={960 + lineWidth / 2}
              y2={540}
              stroke="#E0F2FE"
              strokeWidth={lineHeight * 3}
              opacity={0.7}
            />
            {/* Intense White Core */}
            <line
              x1={960 - lineWidth / 2}
              y1={540}
              x2={960 + lineWidth / 2}
              y2={540}
              stroke="#FFFFFF"
              strokeWidth={lineHeight}
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Tiny White Phosphor Dot shrinking to zero in dead center */}
        {isDotActive && dotRadius > 0.1 && (
          <g filter="url(#crtGlow)">
            <circle cx={960} cy={540} r={dotRadius * 2.5} fill="#E0F2FE" opacity={0.6} />
            <circle cx={960} cy={540} r={dotRadius} fill="#FFFFFF" />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
