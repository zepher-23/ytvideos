import React from "react";
import { useCurrentFrame } from "remotion";

export const Butterfly = ({ frame: propFrame }) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  // The butterfly appears in Scene 3 (from frame 400 to 600)
  if (frame < 400) return null;

  // Flight path choreography (relative to gardenX = 4800):
  // - 400 to 450: Flutters into garden from top-right down to stickman's view (x: 5140 -> 4920, y: 320 -> 540)
  // - 450 to 495: Stickman Jump 1! Butterfly dodges up and right (x: 4920 -> 4955, y: 540 -> 370 -> 480)
  // - 495 to 545: Stickman Jump 2! Butterfly dodges higher and further away (x: 4955 -> 5080, y: 480 -> 240)
  // - 545 to 600: Flutters away joyfully into the distant sky (x: 5080 -> 5340, y: 240 -> 120)

  let posX = 4920;
  let posY = 540;

  if (frame < 450) {
    const t = (frame - 400) / 50;
    posX = 5140 + (4920 - 5140) * t;
    posY = 320 + (540 - 320) * t;
  } else if (frame < 495) {
    // Jump 1 dodge: swerves UP to 370
    const t = (frame - 450) / 45;
    const dodgeUp = Math.sin(t * Math.PI) * 170;
    posX = 4920 + 35 * t;
    posY = 540 - dodgeUp;
  } else if (frame < 545) {
    // Jump 2 dodge: swerves even higher and escapes to the right
    const t = (frame - 495) / 50;
    const dodgeUp = Math.sin(t * Math.PI) * 220;
    posX = 4955 + 125 * t;
    posY = 520 - dodgeUp - 120 * t;
  } else {
    // Escaping into the sky
    const t = Math.min(1, (frame - 545) / 55);
    posX = 5080 + 260 * t;
    posY = 280 - 160 * t;
  }

  // Micro flutter undulation
  const flutterX = Math.cos(frame * 0.45) * 7;
  const flutterY = Math.sin(frame * 0.6) * 9;
  const currentX = posX + flutterX;
  const currentY = posY + flutterY;

  // Wing flap animation (flapping rate speed increases during dodges)
  const isDodging = (frame >= 465 && frame <= 485) || (frame >= 510 && frame <= 535);
  const flapSpeed = isDodging ? 1.9 : 1.3;
  const flapCycle = Math.sin(frame * flapSpeed);
  // ScaleX oscillates between 0.15 (wings folded together) and 1.0 (wings spread flat)
  const wingScaleX = Math.max(0.18, Math.abs(flapCycle));

  // Slight tilt in direction of flight
  const tiltDeg = -12 + Math.sin(frame * 0.35) * 10;

  return (
    <g
      id="comic-butterfly"
      transform={`translate(${currentX}, ${currentY}) rotate(${tiltDeg})`}
    >
      {/* Flight twinkle / comic motion trail when dodging */}
      {isDodging && (
        <g opacity="0.6">
          <circle cx="-16" cy="14" r="3" fill="#FDE047" stroke="#000000" strokeWidth="1.5" />
          <circle cx="-28" cy="22" r="2" fill="#FDE047" stroke="#000000" strokeWidth="1" />
        </g>
      )}

      {/* Butterfly Wings (Left and Right Wings flap symmetrically around central body) */}
      <g transform={`scale(${wingScaleX}, 1)`}>
        {/* LEFT WINGS */}
        {/* Forewing */}
        <path
          d="M 0 -2 C -18 -32 -38 -28 -34 -8 C -32 6 -14 12 0 4 Z"
          fill="#38BDF8"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Forewing yellow dot pattern */}
        <ellipse cx="-20" cy="-14" rx="4.5" ry="6" fill="#FDE047" stroke="#000000" strokeWidth="1.5" />
        {/* Hindwing */}
        <path
          d="M 0 2 C -16 8 -26 22 -14 26 C -4 30 -2 14 0 6 Z"
          fill="#FB923C"
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* RIGHT WINGS */}
        {/* Forewing */}
        <path
          d="M 0 -2 C 18 -32 38 -28 34 -8 C 32 6 14 12 0 4 Z"
          fill="#38BDF8"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Forewing yellow dot pattern */}
        <ellipse cx="20" cy="-14" rx="4.5" ry="6" fill="#FDE047" stroke="#000000" strokeWidth="1.5" />
        {/* Hindwing */}
        <path
          d="M 0 2 C 16 8 26 22 14 26 C 4 30 2 14 0 6 Z"
          fill="#FB923C"
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* Butterfly Body */}
      <ellipse cx="0" cy="4" rx="3.5" ry="14" fill="#000000" />
      <circle cx="0" cy="-10" r="4.5" fill="#000000" />

      {/* Antennae */}
      <path
        d="M -2 -14 Q -8 -26 -12 -24"
        fill="none"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="-12" cy="-24" r="2" fill="#000000" />
      <path
        d="M 2 -14 Q 8 -26 12 -24"
        fill="none"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="-24" r="2" fill="#000000" />
    </g>
  );
};
