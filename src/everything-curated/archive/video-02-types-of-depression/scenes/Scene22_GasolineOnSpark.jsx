import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { MedicalPill } from "../../shared";

// =============================================================================
// SCENE 22: Gasoline on a Spark - 210 frames
// =============================================================================
export const Scene22_GasolineOnSpark = () => {
  const frame = useCurrentFrame();

  const pillY = interpolate(frame, [0, 45], [80, 700], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isExploded = frame >= 45;
  const explosionScale = interpolate(frame, [45, 95], [0, 9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Red Ember */}
        <circle
          cx="960"
          cy="740"
          r="22"
          fill="#EF4444"
          filter="drop-shadow(0 0 25px #EF4444)"
        />

        {/* Falling 3D Medical Pill */}
        {!isExploded && (
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
          />
        )}

        {/* Screen-Filling Fireball Blast */}
        {isExploded && (
          <g transform={`translate(960, 740) scale(${explosionScale})`}>
            <polygon
              points="0,-160 50,-100 130,-120 90,-40 160,0 80,60 110,130 30,90 0,160 -30,90 -110,130 -80,60 -160,0 -90,-40 -130,-120 -50,-100"
              fill="#DC2626"
              opacity="0.85"
            />
            <polygon
              points="0,-110 35,-70 90,-80 60,-25 110,0 55,40 75,90 20,60 0,110 -20,60 -75,90 -55,40 -110,0 -60,-25 -90,-80 -35,-70"
              fill="#EA580C"
            />
            <circle cx="0" cy="0" r="55" fill="#FDE047" />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
