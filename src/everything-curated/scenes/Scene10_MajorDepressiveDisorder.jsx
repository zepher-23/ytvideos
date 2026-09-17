import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { GridBackground } from '../../shared/environments/GridBackground'; // Adjust path if needed

const text = "1. Major Depressive Disorder (MDD)";

export const Scene10_MajorDepressiveDisorder = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const framesPerChar = 2;

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <GridBackground theme="white" id="grid-s10" />

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
            const charDelay = index * framesPerChar;
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