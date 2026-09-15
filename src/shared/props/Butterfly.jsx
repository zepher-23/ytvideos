import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Butterfly - 2D Comic Fluttering Butterfly with Dynamic Wings & Dodges
 */
export const Butterfly = ({
  x = 0,
  y = 0,
  frame: propFrame,
  scale = 1.0,
  wingColorFore = "#38BDF8",
  wingColorHind = "#FB923C",
}) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  // Wing flap animation
  const flapSpeed = 1.4;
  const flapCycle = Math.sin(frame * flapSpeed);
  const wingScaleX = Math.max(0.18, Math.abs(flapCycle));

  // Natural flutter micro undulation
  const flutterX = Math.cos(frame * 0.45) * 6;
  const flutterY = Math.sin(frame * 0.6) * 8;
  const tiltDeg = -10 + Math.sin(frame * 0.35) * 8;

  return (
    <g
      id="comic-butterfly"
      transform={`translate(${x + flutterX}, ${y + flutterY}) rotate(${tiltDeg}) scale(${scale})`}
    >
      {/* Symmetrical Wings */}
      <g transform={`scale(${wingScaleX}, 1)`}>
        {/* LEFT WINGS */}
        <path
          d="M 0 -2 C -18 -32 -38 -28 -34 -8 C -32 6 -14 12 0 4 Z"
          fill={wingColorFore}
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse cx="-20" cy="-14" rx="4.5" ry="6" fill="#FDE047" stroke="#000000" strokeWidth="1.5" />
        <path
          d="M 0 2 C -16 8 -26 22 -14 26 C -4 30 -2 14 0 6 Z"
          fill={wingColorHind}
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* RIGHT WINGS */}
        <path
          d="M 0 -2 C 18 -32 38 -28 34 -8 C 32 6 14 12 0 4 Z"
          fill={wingColorFore}
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <ellipse cx="20" cy="-14" rx="4.5" ry="6" fill="#FDE047" stroke="#000000" strokeWidth="1.5" />
        <path
          d="M 0 2 C 16 8 26 22 14 26 C 4 30 2 14 0 6 Z"
          fill={wingColorHind}
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* Body & Head */}
      <ellipse cx="0" cy="4" rx="3.5" ry="14" fill="#000000" />
      <circle cx="0" cy="-10" r="4.5" fill="#000000" />

      {/* Antennae */}
      <path d="M -2 -14 Q -8 -26 -12 -24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="-12" cy="-24" r="2" fill="#000000" />
      <path d="M 2 -14 Q 8 -26 12 -24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="-24" r="2" fill="#000000" />
    </g>
  );
};
