import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AutoBadge, Calendar } from "../../shared";

// =============================================================================
// SCENE 47: The Luteal Phase Switch - 180 frames
// =============================================================================
export const Scene47_LutealPhaseSwitch = () => {
  const frame = useCurrentFrame();

  const isSwitchOn = frame >= 35;
  const leverAngle = isSwitchOn ? 40 : -40;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0F172A", overflow: "hidden" }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {/* 7-Day Calendar Span (Enlarged to 1100x480px) */}
        <g transform="translate(320, 300)">
          <rect
            x="0"
            y="0"
            width="1050"
            height="480"
            rx="28"
            fill="#1E293B"
            stroke={isSwitchOn ? "#DC2626" : "#475569"}
            strokeWidth={isSwitchOn ? "16" : "8"}
            filter={
              isSwitchOn
                ? "drop-shadow(0 0 45px rgba(220, 38, 38, 0.9))"
                : "none"
            }
          />
          <text
            x="525"
            y="110"
            fill={isSwitchOn ? "#EF4444" : "#94A3B8"}
            fontSize="52"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            LUTEAL PHASE (7 DAYS)
          </text>
        </g>

        {/* Industrial Lever (Enlarged to 240x500px) */}
        <g transform="translate(1560, 540)">
          <rect
            x="-110"
            y="-240"
            width="220"
            height="480"
            rx="20"
            fill="#334155"
            stroke="#94A3B8"
            strokeWidth="10"
          />
          <rect
            x="-20"
            y="-180"
            width="40"
            height="360"
            rx="8"
            fill="#0F172A"
          />

          <g transform={`rotate(${leverAngle}, 0, 0)`}>
            <rect
              x="-15"
              y="-190"
              width="30"
              height="250"
              rx="8"
              fill="#E2E8F0"
            />
            <circle cx="0" cy="-190" r="38" fill="#DC2626" />
          </g>

          <AutoBadge
            text="OFF"
            x={0}
            y={-285}
            width={100}
            height={44}
            maxFontSize={24}
            fill="#1E293B"
            stroke={!isSwitchOn ? "#94A3B8" : "#475569"}
            textColor={!isSwitchOn ? "#FFFFFF" : "#64748B"}
          />
          <AutoBadge
            text="ON"
            x={0}
            y={285}
            width={100}
            height={44}
            maxFontSize={24}
            fill={isSwitchOn ? "#450A0A" : "#1E293B"}
            stroke={isSwitchOn ? "#EF4444" : "#475569"}
            textColor={isSwitchOn ? "#F87171" : "#64748B"}
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
