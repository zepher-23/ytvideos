import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, GridBackground } from "../../shared";

/**
 * Scene 01: Hook - Depressive Concept
 * 
 * Duration: 4 seconds (120 frames)
 * Environment: Clinical white graph paper background with subtle slate grid lines.
 * Transition: Hard cut (start frame).
 * Characters & Props: minimalist stickman (center).
 * 
 * Action & Motion:
 * - Beginning: Stickman sits hunched, looking bored. Transitions from content to sad frown.
 * - Action / Climax: A massive, jagged red "X" slams directly onto stickman at frame 92.
 * - Ending / Hold: "X" pulses. text below stamps: "DEAD WRONG."
 * - Text & Specific Colors: Text "DEAD WRONG." dark slate (#0F172A), red "X" (#EF4444), white clinical background.
 */
export const Scene01_HookDepressiveConcept = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Rising subtle abstract grid offset in background
  const gridOffsetY = (frame * 0.8) % 60;

  // 2. Animated facial expression & posture: Happy -> Neutral -> Sad (frames 22 to 52)
  const slumpProgress = interpolate(frame, [24, 52], [0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Mouth shifts from cheerful smile -> neutral flat -> sad frown
  const currentMouth = frame < 26 ? "smile" : frame < 38 ? "flat" : "frown";
  // Eyes shift from cheerful normal -> sad defeat -> momentary shock on impact -> defeat
  const currentEyes = frame < 36 ? "normal" : frame >= 92 && frame <= 104 ? "shock" : "defeat";
  // Posture shifts from content upright to slumped defeat
  const currentPose = frame < 30 ? "content" : "defeat";

  // 3. Climax: Red "X" slams directly onto stickman at frame 92 (delayed by 1 sec per user request)
  const showX = frame >= 92;
  const xImpactSpring = showX
    ? spring({
        frame: frame - 92,
        fps,
        config: { damping: 10, stiffness: 220, mass: 0.8 },
      })
    : 0;
  // Slam down: scale drops rapidly from 3.2 to 1.0
  const xScale = showX ? interpolate(xImpactSpring, [0, 1], [3.2, 1.0]) : 3.2;
  const xOpacity = interpolate(frame, [92, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Rhythmic pulse after slamming down
  const xPulse = frame > 102 ? 1 + Math.sin((frame - 102) * 0.22) * 0.05 : 1;

  // 4. Stickman reaction recoil when X slams down (frames 92 to 114)
  const stickmanRecoilY = frame >= 92 && frame <= 114
    ? Math.sin((frame - 92) * 0.45) * interpolate(frame, [92, 114], [10, 0], { extrapolateRight: "clamp" })
    : 0;

  // 5. Ending stamp: "DEAD WRONG." stamps below following the X slam (frame 100)
  const showStamp = frame >= 100;
  const stampSpring = showStamp
    ? spring({
        frame: frame - 100,
        fps,
        config: { damping: 12, stiffness: 240, mass: 0.7 },
      })
    : 0;
  const stampScale = showStamp ? interpolate(stampSpring, [0, 1], [1.8, 1.0]) : 1.8;
  const stampOpacity = interpolate(frame, [100, 103], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      {/* Clinical White Grid Background */}
      <GridBackground theme="white" id="grid-s1" />

      {/* Main SVG Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* Stickman Ground Contact Shadow */}
        <ellipse cx={960} cy={770} rx={130} ry={20} fill="#000000" opacity={0.15} />

        {/* Minimalist Stickman (Center: turns from happy to sad, then recoils on X slam) */}
        <CuratedStickman
          x={960}
          y={730 + stickmanRecoilY}
          scale={1.3}
          variant="adult"
          pose={currentPose}
          slumpProgress={slumpProgress}
          mouth={currentMouth}
          eyes={currentEyes}
          lookDirection="center"
          frame={frame}
        />

        {/* Action / Climax: Massive, Jagged Red "X" Slams Directly Over Stickman (Clean red, no glow, no border) */}
        {showX && (
          <g
            transform={`translate(960, 510) scale(${xScale * xPulse})`}
            opacity={xOpacity}
          >
            {/* Bold, Jagged Pure Red Cross */}
            <path
              d="M -180 -140 L -130 -180 L 0 -35 L 130 -180 L 180 -140 L 35 0 L 180 140 L 130 180 L 0 35 L -130 180 L -180 140 L -35 0 Z"
              fill="#EF4444"
            />
          </g>
        )}
      </svg>

      {/* Ending / Hold: Text below stamps: "DEAD WRONG." (Clean white container with dark typography, no glow) */}
      {showStamp && (
        <div
          className="absolute bottom-16 left-0 right-0 flex justify-center items-center pointer-events-none z-30"
          style={{
            transform: `scale(${stampScale})`,
            opacity: stampOpacity,
          }}
        >
          <div className="px-10 py-3.5 rounded-2xl bg-white border-2 border-slate-900 shadow-md">
            <span className="text-slate-900 text-5xl md:text-6xl font-black tracking-widest uppercase font-mono">
              DEAD WRONG.
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

