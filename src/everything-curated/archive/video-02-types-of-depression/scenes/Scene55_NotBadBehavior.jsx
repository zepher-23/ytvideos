import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 55: Not Bad Behavior - 150 frames
// =============================================================================
export const Scene55_NotBadBehavior = () => {
  const frame = useCurrentFrame();

  const isClipboard = frame >= 25;
  const clipY = interpolate(frame, [15, 25], [-400, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F1F5F9", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* Naughty List Paper */}
        <g transform="translate(960, 520)">
          {!isClipboard ? (
            <rect
              x="-240"
              y="-280"
              width="480"
              height="560"
              rx="12"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="6"
            />
          ) : (
            <>
              <polygon
                points="-260,-280 -30,-280 -70,280 -260,280"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="6"
              />
              <polygon
                points="30,-280 260,-280 260,280 70,280"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="6"
              />
            </>
          )}
          {!isClipboard && (
            <text
              x="0"
              y="-180"
              fill="#EF4444"
              fontSize="48"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
            >
              "Naughty List"
            </text>
          )}
        </g>

        {/* Heavy Metal Medical Clipboard (640x740px) */}
        {isClipboard && (
          <g transform={`translate(960, ${clipY})`}>
            <rect
              x="-320"
              y="-370"
              width="640"
              height="740"
              rx="28"
              fill="#64748B"
              stroke="#334155"
              strokeWidth="12"
              filter="drop-shadow(0 35px 55px rgba(0,0,0,0.35))"
            />
            <rect
              x="-130"
              y="-400"
              width="260"
              height="70"
              rx="14"
              fill="#CBD5E1"
              stroke="#475569"
              strokeWidth="6"
            />

            <rect
              x="-260"
              y="-290"
              width="520"
              height="600"
              fill="#FFFFFF"
            />
            <path
              d="M -230 0 L -120 0 L -90 -100 L -60 110 L -30 -130 L 0 90 L 60 -170 L 90 100 L 230 0"
              fill="none"
              stroke="#DC2626"
              strokeWidth="9"
              strokeLinejoin="round"
            />
            <text
              x="0"
              y="220"
              fill="#0F172A"
              fontSize="34"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
            >
              NEUROLOGICAL DIAGNOSIS
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
