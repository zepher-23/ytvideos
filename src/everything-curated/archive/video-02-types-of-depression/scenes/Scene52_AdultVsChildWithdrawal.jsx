import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 52: Adult vs. Child Withdrawal - 210 frames
// =============================================================================
export const Scene52_AdultVsChildWithdrawal = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {/* Left: Adult Withdrawal */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#F1F5F9",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "6px solid #CBD5E1",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 70,
            fontFamily: "Inter, sans-serif",
            fontSize: 42,
            fontWeight: 900,
            color: "#64748B",
          }}
        >
          ADULT: WITHDRAWAL
        </div>

        {/* Heavy Solid Grey Box (360x320px) */}
        <svg width="500" height="500" viewBox="0 0 500 500">
          <rect
            x="70"
            y="90"
            width="360"
            height="320"
            rx="20"
            fill="#64748B"
            stroke="#334155"
            strokeWidth="12"
          />
        </svg>
      </div>

      {/* Right: Child Kicking Through Box */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#FEF2F2",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 70,
            fontFamily: "Inter, sans-serif",
            fontSize: 42,
            fontWeight: 900,
            color: "#DC2626",
          }}
        >
          CHILD: EXPLOSIVE OUTBURST
        </div>

        <svg width="500" height="500" viewBox="0 0 500 500">
          <polygon points="30,120 140,90 100,410 40,380" fill="#64748B" />
          <polygon points="360,90 470,120 460,380 390,410" fill="#64748B" />

          {/* Child Stickman (Scale=1.35) */}
          <CuratedStickman
            x={250}
            y={350}
            scale={1.35}
            variant="child"
            pose="shock"
            mouthState="gasp"
          />

          <line
            x1="160"
            y1="300"
            x2="50"
            y2="260"
            stroke="#DC2626"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <line
            x1="340"
            y1="300"
            x2="450"
            y2="260"
            stroke="#DC2626"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
