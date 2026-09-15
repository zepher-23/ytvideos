import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// =============================================================================
// SCENE 59: The Two Trials - 210 frames
// =============================================================================
export const Scene59_TheTwoTrials = () => {
  const frame = useCurrentFrame();

  const isX1 = frame >= 30;
  const isX2 = frame >= 65;
  const isTRD = frame >= 95;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ display: "flex", gap: "140px", marginBottom: 70 }}>
        <div
          style={{
            position: "relative",
            width: 440,
            height: 160,
            border: "8px solid #0F172A",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
            fontWeight: 900,
            color: "#0F172A",
          }}
        >
          TRIAL 1: SSRI
          {isX1 && (
            <span
              style={{
                position: "absolute",
                fontSize: 130,
                color: "#DC2626",
                fontWeight: 900,
              }}
            >
              ✕
            </span>
          )}
        </div>

        <div
          style={{
            position: "relative",
            width: 440,
            height: 160,
            border: "8px solid #0F172A",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 38,
            fontWeight: 900,
            color: "#0F172A",
          }}
        >
          TRIAL 2: SNRI
          {isX2 && (
            <span
              style={{
                position: "absolute",
                fontSize: 130,
                color: "#DC2626",
                fontWeight: 900,
              }}
            >
              ✕
            </span>
          )}
        </div>
      </div>

      {/* Massive TRD Diagnosis Box */}
      {isTRD && (
        <div
          style={{
            width: 720,
            height: 190,
            backgroundColor: "#000000",
            borderRadius: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "0.06em",
            boxShadow: "0 35px 70px rgba(0,0,0,0.45)",
          }}
        >
          TRD DIAGNOSIS
        </div>
      )}
    </AbsoluteFill>
  );
};
