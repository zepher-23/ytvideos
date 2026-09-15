import React from "react";
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from "remotion";
import { CuratedStickman, GridBackground, VerticalWheel } from "../../shared";

/**
 * Scene 09: 10 Types of Depression - Thinking Stickman & Vertical Wheel
 * Duration: 4.0 seconds (120 frames @ 30fps)
 * 
 * Visual Choreography:
 * 1. Stickman on the left in a canonical thinking/pondering position with hand on chin,
 *    left arm crossed supporting right elbow, and observant facial expressions looking right.
 * 2. On the right, a 3D cylindrical vertical wheel scroll animation cycling through
 *    all 10 types of depression with prominent acronyms:
 *    - MDD (Major Depressive Disorder)
 *    - PDD / Dysthymia (Persistent Depressive Disorder)
 *    - BD (Bipolar Depression)
 *    - SAD (Seasonal Affective Disorder)
 *    - AD (Atypical Depression)
 *    - PD (Psychotic Depression)
 *    - PPD (Perinatal / Postpartum Depression)
 *    - PMDD (Premenstrual Dysphoric Disorder)
 *    - DMDD (Disruptive Mood Dysregulation Disorder)
 *    - TRD (Treatment-Resistant Depression)
 * 3. The wheel spins smoothly with natural inertia, highlighting each item in the center
 *    selection lens, then decelerates onto TRD as the stickman thoughtfully nods.
 */
export const Scene09_DepressionTypesWheel = ({ frame: propFrame }) => {
  const frame = propFrame ?? useCurrentFrame();

  // 10 Types of Depression with verified acronyms and titles
  const depressionTypes = [
    { id: 1,  acronym: "MDD",       name: "Major Depressive Disorder" },
    { id: 2,  acronym: "DYSTHYMIA", name: "Persistent Depressive Disorder", subtitle: "Dysthymia" },
    { id: 3,  acronym: "BIPOLAR",   name: "Bipolar Depression" },
    { id: 4,  acronym: "SAD",       name: "Seasonal Affective Disorder" },
    { id: 5,  acronym: "ATYPICAL",  name: "Atypical Depression" },
    { id: 6,  acronym: "PSYCHOTIC", name: "Psychotic Depression" },
    { id: 7,  acronym: "PPD",       name: "Perinatal / Postpartum Depression" },
    { id: 8,  acronym: "PMDD",      name: "Premenstrual Dysphoric Disorder" },
    { id: 9,  acronym: "DMDD",      name: "Disruptive Mood Dysregulation Disorder" },
    { id: 10, acronym: "TRD",       name: "Treatment-Resistant Depression" },
  ];

  // =========================================================================
  // 1. VERTICAL WHEEL SCROLL KINEMATICS (Slowed down to fit full 4s scene)
  // =========================================================================
  // Smooth, readable progression across the full 120-frame duration:
  // Starts gently at frame 2, rolls at a calm, readable pace (~1 item / sec),
  // and smoothly settles onto TRD by frame 116.
  const scrollPos = interpolate(frame, [2, 116], [0, 9], {
    easing: Easing.inOut(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 2. STICKMAN THINKING KINEMATICS & FACIAL EXPRESSIONS
  // =========================================================================
  // Breathing bob and subtle chin tap
  const breatheBobY = Math.sin(frame * 0.1) * 2.5;

  // Thoughtful head nod as the wheel completes its cycle (Frames 106 to 120)
  const isLanding = frame >= 106;
  const nodY = isLanding
    ? Math.sin((frame - 106) * 0.35) * 3.5 * Math.max(0, 1 - (frame - 106) / 14)
    : 0;

  // Eye tracking: subtle micro-saccades following the vertical wheel motion
  const isScrolling = frame > 4 && frame < 112;
  const eyeTrackY = isScrolling ? Math.sin(frame * 0.25) * 1.5 : 0;

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Canonical White Grid Background */}
      <GridBackground theme="white" id="grid-s9" />

      {/* Main SVG Composition Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* ============================================================== */}
        {/* LEFT: CANONICAL STICKMAN IN THINKING POSITION                  */}
        {/* ============================================================== */}
        <g id="scene09-stickman-group">
          <CuratedStickman
            x={340}
            y={825 + breatheBobY + nodY}
            scale={1.12}
            pose="thinking"
            lookDirection="right"
            eyes="look-right"
            mouth={isLanding ? "smile" : "flat"}
            frame={frame}
          />
        </g>

        {/* ============================================================== */}
        {/* RIGHT: 3D CYLINDRICAL VERTICAL WHEEL SCROLL ANIMATION (ENLARGED)*/}
        {/* ============================================================== */}
        <VerticalWheel
          items={depressionTypes}
          scrollPos={scrollPos}
          x={1350}
          y={540}
          width={1040}
          radius={420}
          angleStep={25}
          cardHeight={94}
          id="s9-depression-wheel"
        />
      </svg>
    </AbsoluteFill>
  );
};
