import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 13: Hurricane vs. Leaking Pipe - 210 frames
// =============================================================================
export const Scene13_HurricaneVsLeak = () => {
  const frame = useCurrentFrame();

  const barHeight = interpolate(frame, [30, 42], [760, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const waterHeight = interpolate(frame, [20, 200], [50, 840], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dripY = ((frame * 16) % 240) + 160;

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {/* Left: MDD */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#E2E8F0",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 70,
            fontFamily: "Inter, sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#0F172A",
          }}
        >
          MDD: ACUTE CRASH
        </div>

        <div
          style={{
            width: 360,
            height: barHeight,
            backgroundColor: "#DC2626",
            borderRadius: "24px 24px 0 0",
            boxShadow: "0 15px 45px rgba(220, 38, 38, 0.5)",
          }}
        />
      </div>

      {/* Right: Dysthymia */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#1E293B",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#93C5FD",
            zIndex: 10,
          }}
        >
          DYSTHYMIA: RELENTLESS LEAK
        </div>

        {/* Enlarged Pipe (120px wide) */}
        <svg
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 240,
            height: 320,
            zIndex: 5,
          }}
        >
          <rect
            x="70"
            y="0"
            width="100"
            height="160"
            fill="#475569"
            stroke="#94A3B8"
            strokeWidth="8"
          />
          <ellipse cx="120" cy={dripY} rx="18" ry="30" fill="#3B82F6" />
        </svg>

        {/* Rising Water Block */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: waterHeight,
            backgroundColor: "#1E3A8A",
            borderTop: "10px solid #3B82F6",
            boxShadow: "0 -15px 50px rgba(59, 130, 246, 0.4)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
