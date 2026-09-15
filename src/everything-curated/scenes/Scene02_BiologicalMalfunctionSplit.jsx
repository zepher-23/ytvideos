import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, GridBackground } from "../../shared";

/**
 * Scene 02: Biological Malfunction blueprint
 * 
 * Duration: 6 seconds (180 frames @ 30fps)
 * Visual Choreography:
 * - First 3 seconds (0 - 3.0s):
 *   - Left side is FULL SCREEN in the center (x = 960) under "SAD".
 *   - Stickman starts cheerful (happy smile & open eyes), then visibly transitions into sad defeat.
 *   - Screen divider and right side are off-screen.
 * - After 3 seconds (3.0s - 6.0s):
 *   - Left stickman & "SAD" title slide smoothly to the left (x = 480).
 *   - Screen divider line slides into x = 960 from the right.
 *   - Right stickman ("DEPRESSED") and glowing red anatomical brain slide in alongside the divider.
 *   - Left side stays paused while the right side's glowing red brain pulses with synaptic energy.
 */
export const Scene02_BiologicalMalfunctionSplit = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. SLIDING TRANSITION TIMING (Starts at frame 90 / 3.0s)
  // =========================================================================
  const isTransitioning = frame >= 90;
  const slideSpring = isTransitioning
    ? spring({
        frame: frame - 90,
        fps,
        config: { damping: 18, stiffness: 100, mass: 1 },
      })
    : 0;

  // Divider line slides in from off-screen right (1940) to exact center (960)
  const dividerX = interpolate(slideSpring, [0, 1], [1940, 960]);

  // Left stickman & title glide smoothly from screen center (960) to left column (480)
  const leftX = interpolate(slideSpring, [0, 1], [960, 480]);

  // Right-side elements maintain synchronized offset to dividerX (centered in right half)
  const rightStickmanX = dividerX + 480; // 2420 -> 1440 (centered in right half!)
  const rightTitleX = dividerX + 480;    // 2420 -> 1440

  // -------------------------------------------------------------------------
  // 2. LEFT SIDE ANIMATION (Active during frames 0-89, paused at frame 90+)
  // -------------------------------------------------------------------------
  const isLeftActive = frame < 90;
  const leftFrame = isLeftActive ? frame : 90;

  // Left stickman: Happy for frames 0-38, transitions into sad (38-65), settles sad (65-90)
  const isHappyPhase = leftFrame < 38;
  const leftSlump = isHappyPhase
    ? 0
    : interpolate(leftFrame, [38, 68], [0, 0.75], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const leftMouth = leftFrame < 40 ? "smile" : leftFrame < 50 ? "flat" : "frown";
  const leftEyes = leftFrame < 44 ? "normal" : "sad-open"; // Open eyes with sorrowful / \ brows!
  const leftPose = leftFrame < 38 ? "idle" : "defeat";

  // Left subtle breathing bob: active only when left is animating full-screen
  const leftBobY = isLeftActive ? Math.sin(leftFrame * 0.14) * 3 : 0;

  // -------------------------------------------------------------------------
  // 3. RIGHT SIDE ANIMATION (Active during frames 90-180)
  // -------------------------------------------------------------------------
  const isRightActive = frame >= 90;
  const rightAnimFrame = isRightActive ? frame - 90 : 0;

  // Right stickman subtle breathing / malfunction twitch: active when right side has entered
  const rightBobY = isRightActive ? Math.sin(rightAnimFrame * 0.12) * 2.5 : 0;

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      {/* Clinical White Grid Background */}
      <GridBackground theme="white" id="grid-s2" />

      {/* Main Visual SVG Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >

        {/* ============================================================== */}
        {/* COLUMN TITLES: "SAD" (LEFT) vs "DEPRESSED" (RIGHT)             */}
        {/* ============================================================== */}
        {/* Left Column Title: SAD (Centered at 960 full screen, slides to 480) */}
        <g transform={`translate(${leftX}, 135)`}>
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="#0F172A"
            fontSize="52"
            fontWeight="900"
            letterSpacing="8px"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            SAD
          </text>
          <rect x="-65" y="16" width="130" height="4" rx="2" fill="#0284C7" />
        </g>

        {/* Right Column Title: DEPRESSED (Slides in alongside divider) */}
        {dividerX < 1920 && (
          <g transform={`translate(${rightTitleX}, 135)`}>
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill="#EF4444"
              fontSize="52"
              fontWeight="900"
              letterSpacing="8px"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              DEPRESSED
            </text>
            <rect x="-135" y="16" width="270" height="4" rx="2" fill="#EF4444" />
          </g>
        )}

        {/* ============================================================== */}
        {/* SLIDING CENTER SCREEN DIVIDER LINE (Solid Dark Line)           */}
        {/* ============================================================== */}
        {dividerX < 1920 && (
          <line
            x1={dividerX}
            y1="0"
            x2={dividerX}
            y2="1080"
            stroke="#0F172A"
            strokeWidth="4"
          />
        )}

        {/* ============================================================== */}
        {/* LEFT SIDE: Stickman (Full-screen 960 first 3s, slides to 480) */}
        {/* ============================================================== */}
        {/* Left Ground Contact Shadow */}
        <ellipse cx={leftX} cy={790} rx={115} ry={18} fill="#000000" opacity={0.15} />

        {/* Left Stickman */}
        <CuratedStickman
          x={leftX}
          y={750 + leftBobY}
          scale={1.25}
          variant="adult"
          pose={leftPose}
          slumpProgress={leftSlump}
          mouth={leftMouth}
          eyes={leftEyes}
          lookDirection="center"
          frame={leftFrame}
        />

        {/* ============================================================== */}
        {/* RIGHT SIDE: Stickman Standing in Abnormal Contorted Position   */}
        {/* ============================================================== */}
        {dividerX < 1920 && (
          <>
            {/* Right Ground Contact Shadow */}
            <ellipse cx={rightStickmanX} cy={790} rx={115} ry={18} fill="#000000" opacity={0.15} />

            {/* Right Stickman: Standing in weird position with abnormally bent limbs */}
            <CuratedStickman
              x={rightStickmanX}
              y={750 + rightBobY}
              scale={1.25}
              variant="adult"
              pose="abnormal"
              slumpProgress={0.7}
              mouth="frown"
              eyes="sad-open" // Open sorrowful / \ eyes!
              lookDirection="center"
              frame={rightAnimFrame}
            />
          </>
        )}
    </svg>
  </AbsoluteFill>
);
};
