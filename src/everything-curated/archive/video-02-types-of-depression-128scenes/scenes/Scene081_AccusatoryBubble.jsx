import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 81: Accusatory Bubble
 * Duration: 150 frames (5.0s)
 * Environment: Dark room, close-up macro zoom on stickman's face.
 * Transition: Zoom in close on stickman's face.
 * Characters & Props: Stickman face crying in horror, massive blood-red speech bubble slamming: "YOU DESERVE THIS."
 */
export const Scene081_AccusatoryBubble = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance zoom spring
  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Massive blood-red speech bubble slam entrance at frame 35
  const bubbleSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 11, stiffness: 180 },
  });
  const bubbleScale = interpolate(bubbleSpring, [0, 1], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact screen shake on bubble slam (frames 35 to 65)
  const isImpact = frame >= 35 && frame < 70;
  const impactShakeX = isImpact ? Math.sin((frame - 35) * 2.2) * 12 * (1 - (frame - 35) / 35) : 0;
  const impactShakeY = isImpact ? Math.cos((frame - 35) * 2.6) * 10 * (1 - (frame - 35) / 35) : 0;

  // Stickman trembling in horror
  const trembleX = Math.sin(frame * 1.8) * 3;
  const trembleY = Math.cos(frame * 2.3) * 2.5;

  // Blood-red bubble pulse
  const redPulse = 1 + Math.sin(frame * 0.3) * 0.05;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#03060E",
      }}
    >
      {/* Red Peripheral Tension Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 75% 50%, rgba(185, 28, 28, 0.25) 0%, transparent 70%)",
        }}
      />

      {/* Header Container */}
      <div
        className="absolute top-8 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: zoomSpring,
          transform: `translateY(${interpolate(zoomSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-2.5 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-3xl"
          style={{
            backgroundColor: "rgba(10, 15, 26, 0.9)",
            border: "1.5px solid rgba(185, 28, 28, 0.6)",
            boxShadow: "0 0 35px rgba(185, 28, 28, 0.3)",
          }}
        >
          <h1
            className="text-2xl md:text-4xl font-black tracking-wider uppercase m-0 leading-tight text-red-500"
          >
            PUNITIVE INTERNAL VOICES
          </h1>
          <p className="text-xs md:text-sm font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Psychotic Depression • Delusional Guilt & Self-Condemnation
          </p>
        </div>
      </div>

      {/* Main SVG Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `translate(${impactShakeX}px, ${impactShakeY}px)`,
        }}
      >
        <defs>
          {/* Blood-Red Bubble Shadow */}
          <filter id="bloodBubbleShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="15" stdDeviation="25" floodColor="#7F1D1D" floodOpacity="0.8" />
          </filter>

          {/* Tear Gradient */}
          <linearGradient id="tearGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* CLOSE-UP STICKMAN BUST (Left Side of screen: x=480, y=780) */}
        <g transform={`translate(${480 + trembleX}, ${780 + trembleY})`}>
          {/* Ambient Ground Shadow */}
          <ellipse cx="0" cy="50" rx="220" ry="30" fill="#000000" opacity="0.8" />

          {/* CuratedStickman rendered as a large close-up figure */}
          <CuratedStickman
            x={0}
            y={0}
            scale={2.6}
            variant="adult"
            pose="idle"
            mouth="shock"
            eyes="shock"
            slumpProgress={0.4}
            frame={frame}
          />

          {/* TEARS STREAMING DOWN FACE */}
          {/* Left Eye Tears */}
          <path
            d={`M -32 -330 C -38 -290 -30 -250 -35 ${-200 + ((frame * 3) % 80)}`}
            fill="none"
            stroke="url(#tearGrad)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Right Eye Tears */}
          <path
            d={`M 32 -330 C 28 -290 35 -250 30 ${-200 + ((frame * 3.5) % 80)}`}
            fill="none"
            stroke="url(#tearGrad)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Flying Sweat / Terror Droplets */}
          <g>
            <circle
              cx={-90 - Math.sin(frame * 0.4) * 20}
              cy={-360 - Math.cos(frame * 0.5) * 25}
              r="8"
              fill="#38BDF8"
              opacity="0.9"
            />
            <circle
              cx={95 + Math.cos(frame * 0.4) * 25}
              cy={-370 - Math.sin(frame * 0.5) * 30}
              r="9"
              fill="#38BDF8"
              opacity="0.9"
            />
            <circle
              cx={-130}
              cy={-320 + ((frame * 4) % 60)}
              r="6"
              fill="#38BDF8"
              opacity="0.7"
            />
            <circle
              cx={135}
              cy={-310 + ((frame * 4.5) % 60)}
              r="6.5"
              fill="#38BDF8"
              opacity="0.7"
            />
          </g>
        </g>

        {/* MASSIVE BLOOD-RED JAGGED SPEECH BUBBLE (Right Side: x=1260, y=540) */}
        {frame >= 35 && (
          <g
            transform={`translate(1260, 540) scale(${bubbleScale * redPulse})`}
            filter="url(#bloodBubbleShadow)"
          >
            {/* Outer Jagged Spiky Contour (Blood Red #B91C1C) */}
            <polygon
              points="
                -420,-170 -260,-210 -80,-190 100,-230 280,-190 420,-220 460,-90
                430,30 480,140 370,190 200,220 30,195 -120,230 -290,190 -410,210
                -450,90 -420,-30 -470,-110
              "
              fill="#B91C1C"
              stroke="#EF4444"
              strokeWidth="7"
              strokeLinejoin="miter"
            />

            {/* Dark blood-red inner core */}
            <polygon
              points="
                -390,-150 -250,-185 -75,-170 95,-205 260,-170 395,-195 430,-80
                405,25 445,125 350,170 190,195 30,175 -110,205 -270,170 -380,190
                -420,80 -395,-25 -440,-95
              "
              fill="#7F1D1D"
              opacity="0.9"
            />

            {/* Massive pointer spike directly aimed at stickman's head */}
            <polygon
              points="-380,30 -620,-30 -350,-70"
              fill="#B91C1C"
              stroke="#EF4444"
              strokeWidth="7"
            />
            {/* Seamless bridge */}
            <polygon
              points="-375,25 -610,-30 -345,-65"
              fill="#7F1D1D"
            />

            {/* Accusatory Typography */}
            <text
              x="0"
              y="-15"
              fill="#FFFFFF"
              fontSize="68"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="5"
              style={{
                filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.7))",
              }}
            >
              YOU DESERVE
            </text>

            <text
              x="0"
              y="65"
              fill="#FEE2E2"
              fontSize="78"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="6"
              style={{
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.8))",
              }}
            >
              THIS.
            </text>

            {/* Secondary Clinical Warning Stamp below */}
            <rect
              x="-180"
              y="110"
              width="360"
              height="36"
              rx="18"
              fill="#450A0A"
              stroke="#EF4444"
              strokeWidth="2"
            />
            <text
              x="0"
              y="134"
              fill="#FCA5A5"
              fontSize="16"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              DELUSIONAL GUILT CORE
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
