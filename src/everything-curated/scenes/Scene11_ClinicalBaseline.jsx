import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { GridBackground } from "../../shared";

/**
 * Scene 11: Clinical Baseline
 * 
 * Duration: 2.0 seconds (62 frames @ 30fps)
 * Audio Sync: [0:37.783 - 0:39.878] "This is the clinical baseline."
 * 
 * Visual Choreography:
 * - Pure clinical white grid background.
 * - A steady, healthy green EKG heartbeat draws rapidly across the screen.
 * - Sterile monospace text "CLINICAL BASELINE" types out with a blinking cursor.
 */
export const Scene11_ClinicalBaseline = () => {
  const frame = useCurrentFrame();

  // Monospace typing effect (types out rapidly over the first 25 frames)
  const text = "CLINICAL BASELINE";
  const typingProgress = Math.min(text.length, Math.floor(frame * 0.7));
  const displayedText = text.substring(0, typingProgress);
  const showCursor = frame % 10 < 5;

  // EKG SVG Line Animation
  // Path length is approximately 2800 units. It draws completely by frame 45.
  const pathLength = 2800; 
  const drawProgress = Math.min(1, frame / 45); 
  const strokeDashoffset = pathLength * (1 - drawProgress);

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s11" />

      <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Healthy EKG Heartbeat Line */}
        <path
          d="M 0 540 
             L 300 540 L 330 520 L 360 540 
             L 400 540 L 430 650 L 480 250 L 530 600 L 560 540 
             L 600 540 L 660 480 L 720 540 
             L 1100 540 L 1130 520 L 1160 540 
             L 1200 540 L 1230 650 L 1280 250 L 1330 600 L 1360 540 
             L 1400 540 L 1460 480 L 1520 540 
             L 1920 540"
          fill="none"
          stroke="#10B981"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={strokeDashoffset}
          style={{ filter: "drop-shadow(0 0 16px rgba(16, 185, 129, 0.6))" }}
        />
      </svg>

      {/* Typewriter Text */}
      <AbsoluteFill className="items-center justify-center pointer-events-none" style={{ top: "-220px" }}>
        <h1
          style={{
            fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
            fontSize: "64px",
            fontWeight: "900",
            color: "#0F172A",
            letterSpacing: "0.2em",
            margin: 0,
          }}
        >
          {displayedText}
          <span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};