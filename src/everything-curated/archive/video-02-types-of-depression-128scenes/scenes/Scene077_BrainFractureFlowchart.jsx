import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 77: Brain Fracture Flowchart
 * Duration: 180 frames (6.0s)
 * Environment: High-tech digital blueprint aesthetic.
 * Characters & Props: Human brain blueprint, laser scanner, THOUGHTS to REALITY TESTING flowchart fracture.
 */
export const Scene077_BrainFractureFlowchart = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Laser scanner progress across brain: frames 0 to 60
  const scanY = interpolate(frame, [0, 60], [220, 850], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scanOpacity = interpolate(frame, [0, 10, 55, 65], [0, 0.9, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dotted signal line progress: frames 40 to 95
  const lineProgress = interpolate(frame, [40, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fracture trigger at frame 95
  const isFractured = frame >= 95;
  const fractureSpring = spring({
    frame: frame - 95,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const shakeX = isFractured && frame < 140 ? Math.sin((frame - 95) * 1.8) * 8 * (1 - (frame - 95) / 45) : 0;
  const shakeY = isFractured && frame < 140 ? Math.cos((frame - 95) * 2.1) * 6 * (1 - (frame - 95) / 45) : 0;

  // Error alert flashing pulse: frames 95 to 180
  const errorFlash = isFractured ? (Math.sin((frame - 95) * 0.4) > 0 ? 1 : 0.3) : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0A0F1D",
      }}
    >
      {/* High-Tech Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <defs>
          <pattern id="grid-Scene077-dense" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="2 4" />
          </pattern>
          <pattern id="grid-Scene077-major" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#38BDF8" strokeWidth="1.2" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-Scene077-dense)" />
        <rect width="100%" height="100%" fill="url(#grid-Scene077-major)" />
      </svg>

      {/* Tech HUD Corner Brackets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <path d="M 60 100 L 60 60 L 100 60" fill="none" stroke="#38BDF8" strokeWidth="3" />
        <path d="M 1860 100 L 1860 60 L 1820 60" fill="none" stroke="#38BDF8" strokeWidth="3" />
        <path d="M 60 980 L 60 1020 L 100 1020" fill="none" stroke="#38BDF8" strokeWidth="3" />
        <path d="M 1860 980 L 1860 1020 L 1820 1020" fill="none" stroke="#38BDF8" strokeWidth="3" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-8 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-8"
        style={{
          opacity: enterSpring,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: `1.5px solid ${isFractured ? "rgba(239, 68, 68, 0.7)" : "rgba(14, 165, 233, 0.5)"}`,
            boxShadow: isFractured ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: isFractured ? "#F87171" : "#FFFFFF" }}
          >
            REALITY TESTING FAILURE
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-cyan-300">
            Neural Connectivity Analysis • Cognitive De-synchronization
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <defs>
          {/* Laser Glow */}
          <linearGradient id="laserGlowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="25%" stopColor="#22D3EE" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="75%" stopColor="#22D3EE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>

          {/* Red Alert Glow */}
          <radialGradient id="errorAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central Brain Blueprint Cross-Section */}
        <g
          transform="translate(960, 540)"
          stroke={isFractured ? "#EF4444" : "#0284C7"}
          strokeWidth="2.5"
          fill="none"
          opacity={interpolate(frame, [5, 40], [0.2, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        >
          {/* Outer Cortex Silhouette */}
          <path
            d="M -240 -120 C -240 -260, 0 -300, 180 -240 C 260 -200, 280 -100, 270 20 C 260 120, 200 180, 120 220 C 60 250, 0 250, -40 230 C -80 280, -180 270, -220 210 C -260 150, -280 50, -270 -30 C -260 -80, -240 -100, -240 -120 Z"
            fill={isFractured ? "rgba(239, 68, 68, 0.05)" : "rgba(2, 132, 199, 0.06)"}
          />
          {/* Internal Sulci / Lobe Convolutions */}
          <path d="M -160 -180 Q -100 -120 -80 -40 Q -60 40 -10 90" strokeDasharray="4 4" />
          <path d="M -220 -20 Q -130 0 -50 30 Q 30 50 110 30" strokeDasharray="4 4" />
          <path d="M 60 -220 Q 80 -120 140 -60 Q 200 0 210 90" strokeDasharray="4 4" />
          <path d="M -90 -220 Q -20 -150 20 -80 Q 60 0 70 120" strokeDasharray="4 4" />

          {/* Frontal Pole (Thoughts Anchor) */}
          <circle cx="-160" cy="-40" r="14" fill="#0284C7" opacity="0.3" />
          <circle cx="-160" cy="-40" r="6" fill="#38BDF8" />

          {/* Parietal / Reality Testing Node */}
          <circle cx="150" cy="-40" r="14" fill={isFractured ? "#EF4444" : "#0284C7"} opacity="0.3" />
          <circle cx="150" cy="-40" r="6" fill={isFractured ? "#EF4444" : "#38BDF8"} />
        </g>

        {/* Scanning Laser Line (Sweeping down across brain) */}
        {scanOpacity > 0.02 && (
          <g opacity={scanOpacity}>
            <line
              x1="520"
              y1={scanY}
              x2="1400"
              y2={scanY}
              stroke="url(#laserGlowGrad)"
              strokeWidth="4"
            />
            {/* Ambient scanner bloom */}
            <line
              x1="650"
              y1={scanY}
              x2="1270"
              y2={scanY}
              stroke="#22D3EE"
              strokeWidth="12"
              opacity="0.25"
            />
          </g>
        )}

        {/* FLOWCHART NODES & CONNECTION */}
        {/* Node 1: "THOUGHTS" (Left) */}
        <g
          transform="translate(420, 540)"
          opacity={interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        >
          {/* Card Backing */}
          <rect
            x="-180"
            y="-65"
            width="360"
            height="130"
            rx="16"
            fill="#0F172A"
            stroke="#0284C7"
            strokeWidth="2.5"
          />
          <rect x="-172" y="-57" width="344" height="114" rx="10" fill="#0B132B" opacity="0.8" />
          
          <text
            x="0"
            y="-10"
            fill="#FFFFFF"
            fontSize="30"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="2"
          >
            THOUGHTS
          </text>
          <text
            x="0"
            y="28"
            fill="#38BDF8"
            fontSize="15"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="1.5"
          >
            INTERNAL COGNITION
          </text>

          {/* Right connection port */}
          <circle cx="180" cy="0" r="8" fill="#38BDF8" />
        </g>

        {/* Node 2: "REALITY TESTING" (Right) */}
        <g
          transform="translate(1500, 540)"
          opacity={interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        >
          {/* Card Backing */}
          <rect
            x="-180"
            y="-65"
            width="360"
            height="130"
            rx="16"
            fill="#0F172A"
            stroke={isFractured ? "#EF4444" : "#0284C7"}
            strokeWidth="2.5"
          />
          <rect x="-172" y="-57" width="344" height="114" rx="10" fill="#0B132B" opacity="0.8" />
          
          <text
            x="0"
            y="-10"
            fill="#FFFFFF"
            fontSize="26"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="2"
          >
            REALITY TESTING
          </text>
          <text
            x="0"
            y="28"
            fill={isFractured ? "#F87171" : "#38BDF8"}
            fontSize="15"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="1.5"
          >
            EXTERNAL VALIDATION
          </text>

          {/* Left connection port */}
          <circle cx="-180" cy="0" r="8" fill={isFractured ? "#EF4444" : "#38BDF8"} />
        </g>

        {/* Connecting Cable / Path between Nodes */}
        {/* Left Segment: 600 to 930 */}
        <line
          x1="600"
          y1="540"
          x2={600 + Math.min(lineProgress * 720, 330)}
          y2="540"
          stroke={isFractured ? "#EF4444" : "#FFFFFF"}
          strokeWidth="5"
          strokeDasharray="10 6"
        />

        {/* Right Segment: 990 to 1320 (Only drawn if not fractured or drawing before fracture) */}
        {!isFractured && lineProgress > 0.5 && (
          <line
            x1="990"
            y1="540"
            x2={600 + lineProgress * 720}
            y2="540"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeDasharray="10 6"
          />
        )}

        {/* FRACTURE POINT BREAK & SPARKS */}
        {isFractured && (
          <g transform="translate(960, 540)">
            {/* Red Aura around break */}
            <circle cx="0" cy="0" r="110" fill="url(#errorAuraGrad)" />

            {/* Jagged Electric Break Sparks */}
            <path
              d="M -30 0 L -12 -28 L 8 18 L 26 -22 L 32 0"
              fill="none"
              stroke="#EF4444"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Flying Spark Particles */}
            <circle cx={Math.sin(frame * 0.8) * 45} cy={-25 + Math.cos(frame * 0.9) * 20} r="4" fill="#F59E0B" />
            <circle cx={-35 + Math.cos(frame * 0.7) * 25} cy={35 + Math.sin(frame * 0.6) * 20} r="3" fill="#EF4444" />
            <circle cx={40 + Math.sin(frame * 0.5) * 30} cy={15} r="3.5" fill="#FFFFFF" />

            {/* GIANT RED ALERT "ERROR" BADGE */}
            <g
              transform={`scale(${interpolate(fractureSpring, [0, 1], [0.3, 1])})`}
              opacity={errorFlash}
            >
              {/* Alert Background Container */}
              <rect
                x="-160"
                y="-130"
                width="320"
                height="80"
                rx="14"
                fill="#7F1D1D"
                stroke="#EF4444"
                strokeWidth="3.5"
              />
              <text
                x="0"
                y="-76"
                fill="#FFFFFF"
                fontSize="38"
                fontWeight="900"
                textAnchor="middle"
                letterSpacing="4"
              >
                ⚠ ERROR
              </text>
              <text
                x="0"
                y="-44"
                fill="#FECACA"
                fontSize="13"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="2"
              >
                LINK SEVERED • 0% FEEDBACK
              </text>
            </g>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
