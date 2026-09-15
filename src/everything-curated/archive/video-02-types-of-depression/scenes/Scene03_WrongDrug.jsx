import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { MedicalPill } from "../../shared";

// =============================================================================
// SCENE 3: The Wrong Drug - 120 frames
// =============================================================================
export const Scene03_WrongDrug = () => {
  const frame = useCurrentFrame();

  const pillY = interpolate(frame, [0, 28], [-180, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isContact = frame >= 28;
  const morphProgress = interpolate(frame, [28, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const brainScale = isContact ? 1.7 + morphProgress * 0.35 : 1.6;
  const brainFill = isContact ? "#DC2626" : "#334155";
  const brainStroke = isContact ? "#EF4444" : "#64748B";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F19", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {isContact && (
          <circle
            cx="960"
            cy="540"
            r="550"
            fill="#DC2626"
            opacity={0.25 * morphProgress}
            filter="blur(70px)"
          />
        )}

        {/* The Brain (Enlarged by 1.7x) */}
        <g transform={`translate(960, 540) scale(${brainScale})`}>
          {!isContact || morphProgress < 0.3 ? (
            <>
              <path
                d="M 0 -85 C -55 -85 -95 -55 -95 -12 C -115 12 -105 55 -75 80 C -55 98 -18 98 0 86 C 18 98 55 98 75 80 C 105 55 115 12 95 -12 C 95 -55 55 -85 0 -85 Z"
                fill={brainFill}
                stroke={brainStroke}
                strokeWidth="6"
              />
              <path
                d="M -42 -30 Q -18 -55 0 -25 Q 18 -55 42 -30 M -55 18 Q -30 -6 0 24 Q 30 -6 55 18"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            </>
          ) : (
            <polygon
              points="
                0,-125 30,-85 65,-120 75,-70 130,-80 100,-30 145,0 105,35 135,85 85,80 90,130 40,100
                0,140 -40,100 -85,80 -135,85 -105,35 -145,0 -100,-30 -130,-80 -75,-70 -65,-120 -30,-85
              "
              fill={brainFill}
              stroke={brainStroke}
              strokeWidth="8"
              strokeLinejoin="round"
              filter="drop-shadow(0 0 45px rgba(220, 38, 38, 0.9))"
            />
          )}
        </g>

        {/* Redesigned 3D Volumetric Medical Pill */}
        {frame < 32 && (
          <MedicalPill
            x={960}
            y={pillY}
            scale={1.15}
            rotation={-25}
            color1="#2563EB"
            color2="#FFFFFF"
            imprint="SSRI"
            subImprint="20mg"
            glowing={true}
            opacity={frame > 28 ? 1 - (frame - 28) / 4 : 1}
          />
        )}
      </svg>
    </AbsoluteFill>
  );
};
