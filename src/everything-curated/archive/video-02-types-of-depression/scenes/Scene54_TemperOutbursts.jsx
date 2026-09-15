import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 54: Temper Outbursts - 150 frames
// =============================================================================
export const Scene54_TemperOutbursts = () => {
  const frame = useCurrentFrame();

  const isExploded = frame >= 30;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F8FAFC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Weekly Planner Expanded to 1560px */}
      <div
        style={{
          width: 1560,
          backgroundColor: "#FFFFFF",
          border: "8px solid #1E293B",
          borderRadius: 32,
          padding: 50,
          boxShadow: "0 35px 70px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 44,
            fontWeight: 900,
            color: "#1E293B",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          WEEKLY PLANNER: FREQUENCY OF OUTBURSTS (3+ / WEEK)
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 20,
          }}
        >
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, i) => {
            const hasBomb = (i === 0 || i === 2 || i === 4) && isExploded;

            return (
              <div
                key={day}
                style={{
                  height: 180,
                  backgroundColor: hasBomb ? "#FEF2F2" : "#F1F5F9",
                  border: hasBomb ? "6px solid #DC2626" : "3px solid #CBD5E1",
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 15,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 26,
                    fontWeight: 900,
                    color: hasBomb ? "#DC2626" : "#64748B",
                  }}
                >
                  {day}
                </span>

                {hasBomb && (
                  /* Enlarged Bomb */
                  <svg width="90" height="90" viewBox="-45 -45 90 90">
                    <circle cx="0" cy="8" r="32" fill="#000000" />
                    <path
                      d="M 0 -24 Q 15 -35 22 -28"
                      fill="none"
                      stroke="#78350F"
                      strokeWidth="5"
                    />
                    <circle cx="22" cy="-28" r="6" fill="#EF4444" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
