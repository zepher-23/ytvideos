import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TheArchive = ({
  caseFile = "DOSSIER // 1974-B",
  title = "THE FORGOTTEN EXPEDITION",
  subtitle = "Declassified records of humanity's hidden chapters",
  accentColor = "#D97706",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 18, mass: 1.0, stiffness: 90 },
  });

  const slowZoom = interpolate(frame, [0, durationInFrames], [1, 1.04], {
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
        backgroundColor: "#0A0908",
        color: "#E5E5E5",
        fontFamily:
          "'Cinzel', 'Times New Roman', Georgia, serif",
        overflow: "hidden",
        opacity: exitOpacity,
      }}
    >
      {/* Archival amber vignette & subtle zoom */}
      <AbsoluteFill
        style={{
          scale: slowZoom,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(217, 119, 6, 0.12) 0%, rgba(10, 9, 8, 0.95) 70%)",
        }}
      />

      {/* Cinematic Letterbox Borders */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "48px",
          backgroundColor: "#000000",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "48px",
          backgroundColor: "#000000",
          zIndex: 10,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          gap: "24px",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        {/* Archival Case File Stamped Badge */}
        <div
          style={{
            opacity: enterSpring,
            display: "inline-flex",
            alignItems: "center",
            padding: "6px 20px",
            border: `1px solid ${accentColor}88`,
            color: accentColor,
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Courier New', monospace",
            boxShadow: `0 0 15px ${accentColor}22`,
          }}
        >
          {caseFile}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            lineHeight: 1.15,
            margin: 0,
            maxWidth: "1100px",
            color: "#FAF8F5",
            opacity: enterSpring,
            textShadow: "0 8px 30px rgba(0,0,0,0.8)",
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "22px",
            fontWeight: 400,
            color: "#A8A29E",
            margin: 0,
            letterSpacing: "0.04em",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            maxWidth: "720px",
            opacity: enterSpring,
          }}
        >
          {subtitle}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
