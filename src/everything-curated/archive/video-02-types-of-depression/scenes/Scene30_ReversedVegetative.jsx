import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CuratedStickman } from "../../shared";

// =============================================================================
// SCENE 30: Reversed Vegetative Signs - 210 frames
// =============================================================================
export const Scene30_ReversedVegetative = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
      {/* Left: Classic */}
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
          CLASSIC: APPETITE LOSS
        </div>

        <CuratedStickman
          x={480}
          y={750}
          scale={1.35}
          pose="defeat"
          mouthState="frown"
        />

        {/* Small Plate Pushed Away */}
        <svg
          style={{
            position: "absolute",
            left: 200,
            bottom: 260,
            width: 220,
            height: 90,
          }}
        >
          <ellipse
            cx="110"
            cy="45"
            rx="100"
            ry="35"
            fill="#FFFFFF"
            stroke="#94A3B8"
            strokeWidth="6"
          />
          <ellipse cx="110" cy="45" rx="50" ry="18" fill="#64748B" />
        </svg>
      </div>

      {/* Right: Atypical Hyperphagia */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#FAF5FF",
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
            color: "#9333EA",
          }}
        >
          ATYPICAL: HYPERPHAGIA
        </div>

        <CuratedStickman
          x={480}
          y={750}
          scale={1.35}
          pose="idle"
          mouthState="openO"
        />

        {/* Massive Overwhelming Pile of Food (460px width) */}
        <svg
          style={{
            position: "absolute",
            left: 280,
            bottom: 220,
            width: 460,
            height: 280,
          }}
        >
          {/* Giant Burger */}
          <ellipse cx="140" cy="220" rx="85" ry="30" fill="#F59E0B" />
          <rect
            x="65"
            y="190"
            width="150"
            height="30"
            rx="10"
            fill="#EF4444"
          />
          <ellipse cx="140" cy="175" rx="85" ry="35" fill="#F59E0B" />
          {/* Giant Donuts */}
          <circle
            cx="320"
            cy="190"
            r="65"
            fill="#EC4899"
            stroke="#FDE047"
            strokeWidth="10"
          />
          <circle cx="320" cy="190" r="24" fill="#FAF5FF" />
          {/* Pizza Slice */}
          <polygon points="230,50 140,170 320,170" fill="#F59E0B" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
