import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';

// Note: For the best handwritten look, install a Google Font via Remotion:
// npm i @remotion/google-fonts
// import { loadFont } from "@remotion/google-fonts/Caveat";
// const { fontFamily } = loadFont();

const text = "1. Major Depressive Disorder (MDD)";

export const Scene10: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pacing: Time gap between each letter appearing
  const framesPerChar = 2; 

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      {/* SVG Grid Background */}
      <svg width="100%" height="100%" style={{ position: 'absolute', zIndex: 0 }}>
        <defs>
          <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#e0e0e0" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Centered Animated Text */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
        <h1
          style={{
            fontFamily: '"Caveat", "Kalam", "Comic Sans MS", cursive',
            fontSize: '90px',
            fontWeight: 'bold',
            color: '#111',
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {text.split("").map((char, index) => {
            // Calculate delay for the invisible hand effect
            const charDelay = index * framesPerChar;
            
            // Add a slight spring scale to mimic pen pressure/ink bleeding into the page
            const scale = spring({
              fps,
              frame: frame - charDelay,
              config: { damping: 14, stiffness: 200, mass: 0.5 },
            });

            return (
              <span
                key={index}
                style={{
                  transform: `scale(${scale})`,
                  opacity: frame >= charDelay ? 1 : 0,
                  display: 'inline-block',
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            );
          })}
        </h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};