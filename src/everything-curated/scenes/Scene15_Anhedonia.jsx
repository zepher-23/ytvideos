import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground, CuratedStickman } from "../../shared";

/**
 * Scene 15: The Invisible Hand Diagnosis
 * 
 * Duration: ~2.3 seconds (69 frames @ 30fps)
 * Audio Sync: [00:00:49,509 --> 00:00:51,810] "The clinical term is anhedonia."
 */
export const Scene15_Anhedonia = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === TIMING & ANIMATION ===

  // 1. Stickman Sliding Spring (Starts at frame 5)
  const slideSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });

  // Stickman slides from center (960) to the left (480)
  const stickmanX = interpolate(slideSpring, [0, 1], [960, 480]);

  // 2. Invisible Hand Text Reveal (Starts after stickman slides, frame 20)
  const writeProgress = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // INCREASED: Width of the clipping mask is now 900px to fully reveal the text
  const revealWidth = writeProgress * 900;

  // 3. Organic Red Marker Underline (Starts at frame 42)
  const lineDrawProgress = interpolate(frame, [42, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // INCREASED: Expanded the path length to match the wider word
  const pathLength = 800;
  const strokeDashoffset = pathLength * (1 - lineDrawProgress);

  // 4. Phonetic Text Fade In (Starts at frame 50)
  const phoneticOpacity = interpolate(frame, [50, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s15" />

      <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">

        {/* Definition for the left-to-right clipping mask */}
        <defs>
          <clipPath id="invisible-hand-clip">
            {/* Added extra margin on x, y, and height to ensure no cursive tails are clipped */}
            <rect x="-20" y="-150" width={revealWidth} height="300" />
          </clipPath>
        </defs>

        {/* ================= SLIDING STICKMAN ================= */}
        <CuratedStickman
          x={stickmanX}
          y={850}
          scale={1.35}
          pose="idle"
          slumpProgress={0.35}
          eyes="sad-open"
          mouth="flat"
          lookDirection="right"
          frame={frame}
        />

        {/* ================= WRITTEN TEXT GROUP ================= */}
        <g transform="translate(820, 520)">

          {/* Handwritten Clinical Term */}
          <text
            x="0"
            y="0"
            clipPath="url(#invisible-hand-clip)"
            fontFamily="'Caveat', 'Kalam', 'Patrick Hand', 'Comic Sans MS', cursive"
            fontWeight="bold"
            fontSize="150"
            fill="#0F172A"
            letterSpacing="2"
          >
            Anhedonia
          </text>

          {/* Organic Red Marker Underline */}
          <path
            d="M 0 35 Q 375 55 750 25"
            fill="none"
            stroke="#EF4444"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
          />

          {/* Phonetic Spelling Fading In */}
          <text
            x="375" // Centered relative to the new 750px underline
            y="115"
            textAnchor="middle"
            fontFamily="'JetBrains Mono', 'SF Mono', Consolas, monospace"
            fontWeight="bold"
            fontSize="46"
            fill="#64748B"
            letterSpacing="2"
            opacity={phoneticOpacity}
          >
            [ an-hee-doh-nee-uh ]
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};