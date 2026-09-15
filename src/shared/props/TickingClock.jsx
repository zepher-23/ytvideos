import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * TickingClock - 2D Comic Analog Clock with Realistic Second Tick & Sound VFX
 */
export const TickingClock = ({
  x = 0,
  y = 0,
  radius = 76,
  frame: propFrame,
  showSoundEffects = true,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  // Clock rotation physics (30 fps = 1 second per 30 frames)
  const totalSeconds = frame / 30;
  const secondStep = Math.floor(totalSeconds);
  const secondSub = (frame % 30) / 30;
  const snap = secondSub < 0.2 ? Math.sin((secondSub / 0.2) * Math.PI) * 1.5 : 0;
  const secondAngle = (secondStep * 6 + (secondSub > 0.85 ? (secondSub - 0.85) / 0.15 * 6 : 0) + snap) % 360;

  const minuteAngle = (totalSeconds * 1.5) % 360;
  const hourAngle = (totalSeconds * 0.15 + 60) % 360;

  const isTick = (secondStep % 2) === 0;
  const isTickFrame = (frame % 30) < 14;

  return (
    <g id="ticking-wall-clock" transform={`translate(${x}, ${y})`}>
      {/* Wall drop shadow */}
      <circle cx="8" cy="8" r={radius} fill="#000000" opacity="0.18" />

      {/* Clock Outer Rim */}
      <circle
        cx="0"
        cy="0"
        r={radius}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="7"
      />

      {/* Inner dial border */}
      <circle
        cx="0"
        cy="0"
        r={radius - 8}
        fill="#F9FAFB"
        stroke="#000000"
        strokeWidth="2.5"
      />

      {/* Hour Marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const isMajor = i % 3 === 0;
        return (
          <line
            key={i}
            x1="0"
            y1={-(radius - 12)}
            x2="0"
            y2={-(radius - (isMajor ? 24 : 18))}
            transform={`rotate(${deg})`}
            stroke="#000000"
            strokeWidth={isMajor ? 4.5 : 2.5}
            strokeLinecap="round"
          />
        );
      })}

      {/* Hour Hand */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={-(radius * 0.48)}
        transform={`rotate(${hourAngle})`}
        stroke="#000000"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Minute Hand */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={-(radius * 0.72)}
        transform={`rotate(${minuteAngle})`}
        stroke="#000000"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Ticking Red Second Hand */}
      <g transform={`rotate(${secondAngle})`}>
        <line x1="0" y1="0" x2="0" y2="16" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2={-(radius * 0.78)} stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="0" cy={-(radius * 0.58)} r="4" fill="#EF4444" />
      </g>

      {/* Central Pivot Nut */}
      <circle cx="0" cy="0" r="5.5" fill="#000000" />
      <circle cx="0" cy="0" r="2" fill="#EF4444" />

      {/* Comic Vibration Tick Sound Rays */}
      {showSoundEffects && isTickFrame && (
        <g opacity="0.85">
          <path d="M 58 -58 Q 66 -66 74 -62" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <path d="M 68 -48 Q 78 -54 84 -46" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <text
            x="82"
            y="-68"
            fontFamily="'Comic Sans MS', 'Bangers', cursive, sans-serif"
            fontWeight="bold"
            fontSize="20"
            fill="#000000"
          >
            {isTick ? "TICK!" : "TOCK!"}
          </text>
        </g>
      )}
    </g>
  );
};
