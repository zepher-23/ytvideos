import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Neuron, SvgPill, GridBackground } from "../../shared";

/**
 * Scene 05: Centered Broken Neuron to Wrong Pill Slide & Surrounding Small Pills
 * 
 * Duration: 5.0 seconds (150 frames @ 30fps, 510–660, extended by 2s per user request)
 * Visual Choreography:
 * 1. Seamless continuity from Scene 04: starts with the broken neuron already fully zoomed in
 *    and centered at (x: 960, y: 540) at macro scale 1.904 (frames 0 to 22).
 * 2. Synchronized horizontal slide: the broken neuron slides out to the left (translateX -> -1800)
 *    while the main 3D medical pill slides in from the right (translateX 1800 -> 0) (frames 22 to 54).
 * 3. Main pill settles into screen center (960, 540) boldly labeled "WRONG" (frames 54 to 62).
 * 4. Multiple smaller pills pop up staggered in a concentrated cluster around the main pill (frames 62 to 106).
 *    They remain centered (not scattered to the screen edges).
 * 5. Full cluster hold with subtle idle floating hover, all clean vector rendering with no glow (frames 106 to 150).
 */
export const Scene05_ZoomBrokenNeuronToWrongPill = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. PHASE 1: CENTERED BROKEN NEURON (Continuous with Scene 04 End Frame)
  // =========================================================================
  const neuronBaseX = 960;
  const neuronBaseY = 540;
  const neuronMacroScale = 1.904;
  const neuronBaseTilt = -12;

  // Gentle ambient floating bob while centered
  const neuronBobY = Math.sin(frame * 0.12) * 3;

  // =========================================================================
  // 2. PHASE 2: SLIDE TRANSITION (Broken Neuron Left, Main Pill Right) (Frames 22 to 54)
  // =========================================================================
  const slideSpring = frame >= 22
    ? spring({
        frame: frame - 22,
        fps,
        config: { damping: 14, stiffness: 120, mass: 0.85 },
      })
    : 0;

  const slideProgress = interpolate(slideSpring, [0, 1], [0, 1]);

  // Neuron slides off-screen to the left
  const neuronSlideX = interpolate(slideProgress, [0, 1], [0, -1800]);
  const neuronTilt = interpolate(slideProgress, [0, 1], [neuronBaseTilt, -35]);
  const neuronOpacity = interpolate(slideProgress, [0.75, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main Pill slides in from the right to screen center (960, 540)
  const pillSlideX = interpolate(slideProgress, [0, 1], [1800, 0]);
  const pillRotation = interpolate(slideProgress, [0, 1], [40, -22]);
  const pillScale = interpolate(slideProgress, [0, 1], [1.1, 2.15]);

  // Subtle floating hover for the main pill once centered (Frames 54 to 150)
  const pillSettled = frame >= 52;
  const pillFloatY = pillSettled ? Math.sin((frame - 52) * 0.14) * 5 : 0;
  const pillRotHover = pillSettled ? Math.sin((frame - 52) * 0.1) * 3 : 0;

  // =========================================================================
  // 3. PHASE 3: SMALLER PILLS POPPING UP AROUND MAIN PILL (Frames 54 to 90)
  // =========================================================================
  // Spread out comfortably around the main pill (radii 320px to 500px from center, nicely centered)
  const smallPills = [
    { id: 1,  x: 620,  y: 290, rot: -35, scale: 0.95, delay: 54 },
    { id: 2,  x: 1300, y: 290, rot: 45,  scale: 1.05, delay: 58 },
    { id: 3,  x: 530,  y: 560, rot: 18,  scale: 0.88, delay: 62 },
    { id: 4,  x: 1400, y: 560, rot: -50, scale: 0.92, delay: 66 },
    { id: 5,  x: 740,  y: 810, rot: -22, scale: 0.85, delay: 70 },
    { id: 6,  x: 1200, y: 810, rot: 35,  scale: 0.95, delay: 74 },
    { id: 7,  x: 960,  y: 220, rot: -8,  scale: 1.00, delay: 78 },
    { id: 8,  x: 1440, y: 410, rot: -25, scale: 0.85, delay: 82 },
    { id: 9,  x: 480,  y: 410, rot: 30,  scale: 0.86, delay: 86 },
    { id: 10, x: 960,  y: 860, rot: 15,  scale: 0.90, delay: 90 },
  ];

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans">
      {/* Background Clinical Grid */}
      <GridBackground theme="white" id="grid-s5" />

      {/* Main SVG Vector Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Damaged / Broken Neuron Gradient (No glow) */}
          <linearGradient id="s5-broken-neuron-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* 1. BROKEN NEURON: CENTERED MACRO VIEW & SLIDE TO LEFT          */}
        {/* ============================================================== */}
        {neuronOpacity > 0 && (
          <g
            id="zoomed-broken-neuron"
            transform={`translate(${neuronBaseX + neuronSlideX}, ${neuronBaseY + neuronBobY}) rotate(${neuronTilt})`}
            opacity={neuronOpacity}
          >
            {/* Ambient Red Fracture Debris Sparks around the breach (no glow) */}
            <g>
              {[0, 1, 2, 3, 4, 5].map((p) => {
                const angle = p * 1.05 + 0.3;
                const sparkR = 24 + Math.sin(frame * 0.2 + p) * 8;
                const spX = Math.cos(angle) * sparkR;
                const spY = Math.sin(angle) * sparkR;
                const spOp = 0.5 + Math.sin(frame * 0.3 + p * 2) * 0.4;

                return (
                  <circle
                    key={p}
                    cx={spX}
                    cy={spY}
                    r={2.8}
                    fill="#EF4444"
                    opacity={spOp}
                  />
                );
              })}
            </g>

            {/* The Severed Canonical Neuron (from user's neuron.svg, crisp without glow) */}
            <Neuron
              id="s5-macro-neuron"
              scale={neuronMacroScale}
              fill="url(#s5-broken-neuron-grad)"
              stroke="#FFFFFF"
              strokeWidth={1.2}
              filter="none"
              showNucleus={true}
              breakProgress={1.0}
              breakCrackColor="#EF4444"
              showCrackLine={true}
              crackGlow={false}
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* 2. MULTIPLE SMALLER PILLS POPPING AROUND MAIN PILL             */}
        {/* ============================================================== */}
        {smallPills.map((p) => {
          const hasPopped = frame >= p.delay;
          if (!hasPopped) return null;

          const popSpring = spring({
            frame: frame - p.delay,
            fps,
            config: { damping: 11, stiffness: 220, mass: 0.6 },
          });
          const currentPopScale = interpolate(popSpring, [0, 1], [0, 1]);
          const popOpacity = interpolate(frame, [p.delay, p.delay + 3], [0, 1], {
            extrapolateRight: "clamp",
          });

          // Gentle ambient floating hover once popped
          const floatY = Math.sin((frame - p.delay) * 0.12 + p.id) * 3.5;

          return (
            <g
              key={`small-pill-${p.id}`}
              id={`small-pill-${p.id}`}
              transform={`translate(0, ${floatY})`}
              opacity={popOpacity}
            >
              <SvgPill
                x={p.x}
                y={p.y}
                scale={p.scale * currentPopScale * 0.72}
                rotation={p.rot}
                variant="pill2"
                label="WRONG"
              />
            </g>
          );
        })}

        {/* ============================================================== */}
        {/* 3. MAIN HERO PILL: SLIDE IN FROM RIGHT, CENTERED, "WRONG"      */}
        {/* ============================================================== */}
        {frame >= 22 && (
          <g
            id="wrong-pill-container"
            transform={`translate(${pillSlideX}, 0)`}
          >
            <g transform={`translate(0, ${pillFloatY})`}>
              <SvgPill
                x={960}
                y={540}
                scale={pillScale}
                rotation={pillRotation + pillRotHover}
                variant="pill2"
                label="WRONG"
              />
            </g>
          </g>
        )}

      </svg>
    </AbsoluteFill>
  );
};
