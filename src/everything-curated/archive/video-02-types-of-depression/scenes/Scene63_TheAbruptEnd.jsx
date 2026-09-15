import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// =============================================================================
// SCENE 63: The Abrupt End - 90 frames
// =============================================================================
export const Scene63_TheAbruptEnd = () => {
  const frame = useCurrentFrame();

  // CRT shutoff starts at frame 35
  const isShutoff = frame >= 35;
  const shutoffProgress = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scaleY = isShutoff ? Math.max(0.002, 1 - shutoffProgress) : 1;
  const scaleX =
    shutoffProgress > 0.8
      ? Math.max(0, 1 - (shutoffProgress - 0.8) / 0.2)
      : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", overflow: "hidden" }}>
      {/* Collapsing CRT Beam */}
      {shutoffProgress < 1 ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#EF4444",
            transform: `scale(${scaleX}, ${scaleY})`,
            boxShadow: "0 0 70px #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 92,
              fontWeight: 900,
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            SYSTEM FAILURE
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
