import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 58: Receptor Block - 180 frames
// =============================================================================
export const Scene58_ReceptorBlock = () => {
  const frame = useCurrentFrame();

  const isShield = frame >= 30;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0B0F19", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Massive Glowing Cyan Forcefield */}
        {isShield && (
          <line
            x1="200"
            y1="540"
            x2="1720"
            y2="540"
            stroke="#06B6D4"
            strokeWidth="24"
            filter="drop-shadow(0 0 35px #06B6D4)"
          />
        )}

        {/* 3 Enlarged Green Pills (75x38px) */}
        {[500, 960, 1420].map((px, i) => {
          const pillY =
            frame < 30
              ? interpolate(frame, [0, 30], [160, 480])
              : interpolate(frame, [30, 60], [480, 120]);

          return (
            <g key={i} transform={`translate(${px}, ${pillY})`}>
              <rect
                x="-38"
                y="-19"
                width="76"
                height="38"
                rx="19"
                fill="#10B981"
                filter="drop-shadow(0 0 20px #10B981)"
              />
            </g>
          );
        })}

        {/* U-Shaped Receptors (Enlarged to 140px width) */}
        {[500, 960, 1420].map((rx, i) => (
          <path
            key={i}
            d={`M ${rx - 70} 660 V 800 A 70 70 0 0 0 ${rx + 70} 800 V 660`}
            fill="none"
            stroke="#475569"
            strokeWidth="24"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
