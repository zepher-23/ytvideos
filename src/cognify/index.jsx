import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Cognify = ({
  topic = "COGNITIVE ARCHITECTURES",
  headline = "How Neural Models Redefine Thought",
  tagline = "Neuroscience • Artificial Intelligence • Mental Frameworks",
  glowColor = "#6366F1",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scaleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 110 },
  });

  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05060f",
        color: "#ffffff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        overflow: "hidden",
        opacity: exitOpacity,
      }}
    >
      {/* Synaptic Radial Glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, ${glowColor}33 0%, transparent 60%), radial-gradient(circle at 20% 80%, #06b6d41f 0%, transparent 50%)`,
        }}
      />

      {/* Futuristic Grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(99, 102, 241, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          gap: "22px",
          textAlign: "center",
        }}
      >
        {/* Topic Badge */}
        <div
          style={{
            opacity: scaleSpring,
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 22px",
            borderRadius: "100px",
            background: "rgba(99, 102, 241, 0.12)",
            border: "1px solid rgba(99, 102, 241, 0.35)",
            backdropFilter: "blur(16px)",
            boxShadow: `0 0 25px ${glowColor}44`,
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#A5B4FC",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#22D3EE",
              boxShadow: "0 0 10px #22D3EE",
              transform: `scale(${pulse})`,
            }}
          />
          {topic}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "68px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: 0,
            maxWidth: "1100px",
            opacity: scaleSpring,
            transform: `scale(${interpolate(scaleSpring, [0, 1], [0.94, 1])})`,
            background:
              "linear-gradient(135deg, #FFFFFF 20%, #C7D2FE 60%, #818CF8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 10px 40px rgba(99, 102, 241, 0.3)",
          }}
        >
          {headline}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: 400,
            color: "#94A3B8",
            margin: 0,
            letterSpacing: "0.04em",
            opacity: scaleSpring,
          }}
        >
          {tagline}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
