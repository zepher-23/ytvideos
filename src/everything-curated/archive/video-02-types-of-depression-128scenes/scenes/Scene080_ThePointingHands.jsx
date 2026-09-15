import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 80: The Pointing Hands
 * Duration: 180 frames (6.0s)
 * Environment: The dark room from Scene 79 with spotlight.
 * Transition: Continuous from Scene 79.
 * Characters & Props: Stickman in spotlight, dark shadowy clawed hands reaching from walls pointing aggressively.
 */
export const Scene080_ThePointingHands = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance spring
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Stickman shivering
  const shiverX = Math.sin(frame * 1.8) * 3.5;
  const shiverY = Math.cos(frame * 2.3) * 2;

  // Accusatory hands entrance springs
  const getHandSpring = (startFrame) => {
    const s = spring({
      frame: frame - startFrame,
      fps,
      config: { damping: 12, stiffness: 90 },
    });
    return interpolate(s, [0, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const handL1 = getHandSpring(20); // Upper Left
  const handR1 = getHandSpring(35); // Upper Right
  const handL2 = getHandSpring(50); // Lower Left
  const handR2 = getHandSpring(65); // Lower Right
  const handTop = getHandSpring(80); // Top Center

  // High-frequency vibration for accusing hands after frame 90
  const isVibrating = frame >= 85;
  const vibX = isVibrating ? Math.sin(frame * 2.5) * 4.5 : 0;
  const vibY = isVibrating ? Math.cos(frame * 2.8) * 4 : 0;

  // Pulsing crimson danger vignette
  const dangerPulse = interpolate(frame, [80, 180], [0.1, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) + Math.sin(frame * 0.3) * 0.08;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#020408",
      }}
    >
      {/* Red Peripheral Danger Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(220, 38, 38, ${dangerPulse}) 100%)`,
        }}
      />

      {/* OVERHEAD SPOTLIGHT CONE (from Scene 79) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="spotConeGrad80" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#E2E8F0" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
          </linearGradient>

          <radialGradient id="spotPoolGrad80" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.4" />
            <stop offset="90%" stopColor="#64748B" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Shadow filter for hands */}
          <filter id="handShadowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#000000" floodOpacity="0.9" />
          </filter>
        </defs>

        <polygon points="960,0 780,820 1140,820" fill="url(#spotConeGrad80)" />
        <ellipse cx="960" cy="820" rx="190" ry="50" fill="url(#spotPoolGrad80)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(10, 15, 26, 0.9)",
            border: "1.5px solid rgba(239, 68, 68, 0.5)",
            boxShadow: "0 0 35px rgba(220, 38, 38, 0.25)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            PERSECUTORY HALLUCINATIONS
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-red-400">
            Psychotic Depression • Accusatory Voices & Somatic Intrusions
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* CROUCHING TERRIFIED STICKMAN IN SPOTLIGHT */}
        <g transform={`translate(${960 + shiverX}, ${800 + shiverY})`}>
          {/* Floor Shadow */}
          <ellipse cx="0" cy="15" rx="75" ry="14" fill="#000000" opacity="0.8" />

          <CuratedStickman
            x={0}
            y={0}
            scale={1.2}
            variant="adult"
            pose="crouch"
            mouth="shock"
            eyes="defeat"
            slumpProgress={0.9}
            frame={frame}
          />

          {/* Cowering sweat drops */}
          <circle cx={-40} cy={-170 - (frame % 25)} r="4" fill="#38BDF8" opacity="0.8" />
          <circle cx={42} cy={-165 - (frame % 22)} r="3.5" fill="#38BDF8" opacity="0.8" />
        </g>

        {/* SHADOWY CLAWED HANDS REACHING FROM WALLS */}

        {/* 1. UPPER LEFT HAND (Pointing down-right at Stickman) */}
        {handL1 > 0 && (
          <g
            transform={`translate(${interpolate(handL1, [0, 1], [-450, 0]) + vibX}, ${vibY})`}
            filter="url(#handShadowFilter)"
          >
            {/* Forearm extending from left border */}
            <path
              d="M -50 260 C 150 270 300 320 480 380 L 470 450 C 300 400 150 360 -50 350 Z"
              fill="#000000"
              stroke="#1E293B"
              strokeWidth="2"
            />
            {/* Clawed Hand with long Pointing Index Finger */}
            <path
              d="M 470 380 L 680 430 L 660 460 L 530 450 L 560 480 L 520 490 L 460 450 Z"
              fill="#000000"
            />
            {/* Claws */}
            <path d="M 680 430 L 730 445 L 670 455 Z" fill="#000000" />
            <path d="M 560 480 L 600 500 L 540 505 Z" fill="#000000" />

            {/* Accusatory vibration lines from fingertip */}
            {isVibrating && (
              <g stroke="#EF4444" strokeWidth="2.5" opacity="0.75">
                <line x1="740" y1="447" x2="790" y2="460" strokeDasharray="4 4" />
                <line x1="745" y1="435" x2="800" y2="445" strokeDasharray="4 4" />
              </g>
            )}
          </g>
        )}

        {/* 2. LOWER LEFT HAND (Pointing right at Stickman waist) */}
        {handL2 > 0 && (
          <g
            transform={`translate(${interpolate(handL2, [0, 1], [-450, 0]) - vibX}, ${vibY})`}
            filter="url(#handShadowFilter)"
          >
            <path
              d="M -50 680 C 120 670 280 680 440 700 L 435 770 C 270 760 110 750 -50 760 Z"
              fill="#000000"
              stroke="#1E293B"
              strokeWidth="2"
            />
            <path
              d="M 440 700 L 640 690 L 635 730 L 510 735 L 530 765 L 490 775 L 435 770 Z"
              fill="#000000"
            />
            <path d="M 640 690 L 690 685 L 635 715 Z" fill="#000000" />
            {isVibrating && (
              <g stroke="#EF4444" strokeWidth="2.5" opacity="0.75">
                <line x1="700" y1="685" x2="760" y2="685" strokeDasharray="4 4" />
              </g>
            )}
          </g>
        )}

        {/* 3. UPPER RIGHT HAND (Pointing down-left at Stickman) */}
        {handR1 > 0 && (
          <g
            transform={`translate(${interpolate(handR1, [0, 1], [450, 0]) - vibX}, ${-vibY})`}
            filter="url(#handShadowFilter)"
          >
            <path
              d="M 1970 270 C 1770 280 1620 330 1440 390 L 1450 460 C 1620 410 1770 370 1970 360 Z"
              fill="#000000"
              stroke="#1E293B"
              strokeWidth="2"
            />
            <path
              d="M 1440 390 L 1230 440 L 1250 470 L 1380 460 L 1350 490 L 1390 500 L 1450 460 Z"
              fill="#000000"
            />
            <path d="M 1230 440 L 1180 455 L 1240 465 Z" fill="#000000" />
            <path d="M 1350 490 L 1310 510 L 1370 515 Z" fill="#000000" />
            {isVibrating && (
              <g stroke="#EF4444" strokeWidth="2.5" opacity="0.75">
                <line x1="1170" y1="458" x2="1110" y2="470" strokeDasharray="4 4" />
                <line x1="1165" y1="445" x2="1105" y2="455" strokeDasharray="4 4" />
              </g>
            )}
          </g>
        )}

        {/* 4. LOWER RIGHT HAND (Pointing left at Stickman waist) */}
        {handR2 > 0 && (
          <g
            transform={`translate(${interpolate(handR2, [0, 1], [450, 0]) + vibX}, ${vibY})`}
            filter="url(#handShadowFilter)"
          >
            <path
              d="M 1970 690 C 1800 680 1640 690 1480 710 L 1485 780 C 1650 770 1810 760 1970 770 Z"
              fill="#000000"
              stroke="#1E293B"
              strokeWidth="2"
            />
            <path
              d="M 1480 710 L 1280 700 L 1285 740 L 1410 745 L 1390 775 L 1430 785 L 1485 780 Z"
              fill="#000000"
            />
            <path d="M 1280 700 L 1230 695 L 1285 725 Z" fill="#000000" />
            {isVibrating && (
              <g stroke="#EF4444" strokeWidth="2.5" opacity="0.75">
                <line x1="1220" y1="695" x2="1160" y2="695" strokeDasharray="4 4" />
              </g>
            )}
          </g>
        )}

        {/* 5. TOP CENTER HAND (Pointing straight down from ceiling) */}
        {handTop > 0 && (
          <g
            transform={`translate(${vibX}, ${interpolate(handTop, [0, 1], [-350, 0]) + vibY})`}
            filter="url(#handShadowFilter)"
          >
            <path
              d="M 920 -50 L 930 200 L 990 200 L 1000 -50 Z"
              fill="#000000"
              stroke="#1E293B"
              strokeWidth="2"
            />
            <path
              d="M 930 200 L 960 380 L 980 380 L 990 200 Z"
              fill="#000000"
            />
            <path d="M 960 380 L 960 420 L 980 380 Z" fill="#000000" />
            {isVibrating && (
              <g stroke="#EF4444" strokeWidth="2.5" opacity="0.75">
                <line x1="960" y1="430" x2="960" y2="490" strokeDasharray="4 4" />
              </g>
            )}
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
