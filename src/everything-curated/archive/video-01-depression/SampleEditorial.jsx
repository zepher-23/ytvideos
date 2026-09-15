import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SampleEditorial = ({
  issueNumber = "COLLECTION NO. 04",
  title = "The Art of Less",
  description = "A meticulous curation of form, function, and modern living.",
  accentColor = "#E2BF84",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeSpring = spring({
    frame,
    fps,
    config: {
      damping: 20,
      mass: 1.0,
      stiffness: 80,
    },
  });

  const lineProgress = interpolate(frame, [10, 50], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B0C0E",
        color: "#F4F4F5",
        fontFamily:
          "Georgia, 'Playfair Display', -apple-system, serif",
        overflow: "hidden",
        opacity: exitOpacity,
      }}
    >
      {/* Subtle luxury vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(226, 191, 132, 0.05) 0%, rgba(11, 12, 14, 0.95) 75%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          gap: "28px",
          textAlign: "center",
        }}
      >
        {/* Issue Sub-header */}
        <span
          style={{
            fontSize: "14px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: accentColor,
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: 600,
            opacity: fadeSpring,
          }}
        >
          {issueNumber}
        </span>

        {/* Minimalist Divider Line */}
        <div
          style={{
            width: `${lineProgress * 0.8}px`,
            height: "1px",
            backgroundColor: accentColor,
            opacity: 0.6,
          }}
        />

        {/* Editorial Title */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
            margin: 0,
            color: "#FFFFFF",
            opacity: fadeSpring,
            maxWidth: "1000px",
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: 300,
            color: "#A1A1AA",
            margin: 0,
            maxWidth: "640px",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            lineHeight: 1.6,
            opacity: fadeSpring,
          }}
        >
          {description}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
