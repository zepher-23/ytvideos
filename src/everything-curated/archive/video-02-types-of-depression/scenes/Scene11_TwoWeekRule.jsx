import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Calendar } from "../../shared";

// =============================================================================
// SCENE 11: The Two-Week Rule - 180 frames
// =============================================================================
export const Scene11_TwoWeekRule = () => {
  const frame = useCurrentFrame();

  const scribbleProgress = interpolate(frame, [25, 95], [0, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#FEF08A", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* Calendar Expanded to 1350px width */}
        <div
          style={{
            width: 1350,
            backgroundColor: "#FFFFFF",
            borderRadius: 32,
            boxShadow: "0 35px 65px -15px rgba(0,0,0,0.25)",
            overflow: "hidden",
            border: "8px solid #1E293B",
          }}
        >
          <div
            style={{
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              padding: "26px 60px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Inter, sans-serif",
              fontSize: 44,
              fontWeight: 900,
            }}
          >
            <span>EPISODE TIMELINE</span>
            <span>30 DAYS</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 16,
              padding: 40,
            }}
          >
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1;
              const isScribbled = day <= Math.floor(scribbleProgress);
              return (
                <div
                  key={i}
                  style={{
                    height: 110,
                    backgroundColor: "#F8FAFC",
                    border: "4px solid #CBD5E1",
                    borderRadius: 16,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 34,
                    fontWeight: 800,
                    color: "#64748B",
                  }}
                >
                  <span>{day}</span>
                  {isScribbled && (
                    <svg
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <path
                        d="M 15 15 L 110 95 M 110 15 L 15 95 M 10 55 Q 60 10 120 55"
                        stroke="#EF4444"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {frame >= 95 && (
          <div
            style={{
              marginTop: 35,
              fontFamily: "Inter, sans-serif",
              fontSize: 48,
              fontWeight: 900,
              color: "#991B1B",
              letterSpacing: "0.06em",
              backgroundColor: "#FFFFFF",
              padding: "16px 50px",
              borderRadius: 18,
              border: "6px solid #DC2626",
              boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
            }}
          >
            [ 14 DAYS MINIMUM ]
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
