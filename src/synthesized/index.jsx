import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Synthesized = ({
  trackName = "FREQUENCY MODULATION",
  artistOrSeries = "SESSION // 088",
  bpm = "128 BPM",
  primaryColor = "#06B6D4",
  secondaryColor = "#F43F5E",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 130 },
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Animated synthesizer audio wave bars
  const bars = [0.4, 0.9, 0.6, 1.0, 0.7, 0.3, 0.8, 0.5, 0.95, 0.45, 0.85, 0.65];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#08070F",
        color: "#ffffff",
        fontFamily:
          "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
        overflow: "hidden",
        opacity: exitOpacity,
      }}
    >
      {/* Synth glow gradients */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 30% 30%, ${primaryColor}25, transparent 60%), radial-gradient(ellipse at 70% 70%, ${secondaryColor}25, transparent 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          gap: "26px",
          textAlign: "center",
        }}
      >
        {/* Series Badge */}
        <div
          style={{
            opacity: enterSpring,
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "6px 18px",
            borderRadius: "6px",
            background: "rgba(6, 182, 212, 0.12)",
            border: `1px solid ${primaryColor}66`,
            color: primaryColor,
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>{artistOrSeries}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: secondaryColor }}>{bpm}</span>
        </div>

        {/* Track / Topic Title */}
        <h1
          style={{
            fontSize: "70px",
            fontWeight: 900,
            letterSpacing: "0.05em",
            margin: 0,
            maxWidth: "1150px",
            opacity: enterSpring,
            textTransform: "uppercase",
            background: `linear-gradient(90deg, ${primaryColor} 0%, #FFFFFF 50%, ${secondaryColor} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: `0 0 40px ${primaryColor}44`,
          }}
        >
          {trackName}
        </h1>

        {/* Waveform visualizer bars */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "48px",
            marginTop: "12px",
            opacity: enterSpring,
          }}
        >
          {bars.map((baseHeight, i) => {
            const dynamicScale = Math.sin((frame + i * 8) * 0.15) * 0.4 + 0.6;
            const barHeight = Math.max(8, baseHeight * 48 * dynamicScale);
            return (
              <div
                key={i}
                style={{
                  width: "6px",
                  height: `${barHeight}px`,
                  borderRadius: "3px",
                  background:
                    i % 2 === 0 ? primaryColor : secondaryColor,
                  boxShadow: `0 0 10px ${
                    i % 2 === 0 ? primaryColor : secondaryColor
                  }`,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
