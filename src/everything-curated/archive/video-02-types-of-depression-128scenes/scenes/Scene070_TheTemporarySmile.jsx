import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 70: The Temporary Smile
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Macro portrait zoom in warm golden ambient space (#FEF08A / #FEF9C3).
 * - Characters & Props: Close-up stickman face with serene closed smiling eyes, soft blush cheeks,
 *   pulsating golden halo of transient joy.
 * - Beginning (0-30f): Stickman face smiles serenely in close-up.
 * - Action/Climax (30-100f): Golden aura pulses gently; "TEMPORARY ABILITY TO CHEER UP" types smoothly.
 * - Ending/Hold (100-180f): Peaceful smile holds steady before the inevitable relapse.
 */
export const Scene070_TheTemporarySmile = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Typewriter text
  const fullText = "TEMPORARY ABILITY TO CHEER UP";
  const typedChars = Math.floor(
    interpolate(frame, [25, 75], [0, fullText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayedTitle = fullText.slice(0, typedChars);

  // Soft breathing pulse of the warm halo
  const auraPulse = Math.sin(frame * 0.14);
  const haloR1 = 280 + auraPulse * 15;
  const haloR2 = 360 + auraPulse * 22;

  return (
    <AbsoluteFill className="bg-[#FEF9C3] overflow-hidden select-none font-sans text-slate-900">
      {/* Background Radiant Warm Golden Aura */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(254, 240, 138, 0.9) 0%, rgba(253, 230, 138, 0.6) 50%, rgba(254, 249, 195, 1) 100%)",
        }}
      />

      {/* Top Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="flex flex-col items-center">
          <div className="mb-2 px-6 py-1.5 rounded-full bg-amber-200 border border-amber-400 shadow-sm">
            <span className="text-xs font-mono tracking-widest text-amber-900 font-bold uppercase">
              TRANSIENT EUTHYMIA
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-wider text-slate-900 m-0 uppercase text-center leading-tight">
            {displayedTitle}
            {frame < 80 && <span className="text-amber-600 animate-pulse">|</span>}
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG: MACRO CLOSE-UP ON CURATED STICKMAN FACE */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="soft-glow-s70" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="24" floodColor="#F59E0B" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. PULSATING GOLDEN HALO RINGS */}
        <g transform="translate(960, 560)">
          <circle cx="0" cy="0" r={haloR2} fill="none" stroke="#FDE047" strokeWidth="4" strokeDasharray="8 8" opacity="0.6" />
          <circle cx="0" cy="0" r={haloR1} fill="#FEF08A" opacity="0.45" />
        </g>

        {/* 2. MACRO STICKMAN HEAD & CHEST */}
        <g transform="translate(960, 560)" filter="url(#soft-glow-s70)">
          {/* Upper Tunic / Shoulders Silhouette */}
          <path
            d="M -160 160 C -120 100, 120 100, 160 160 L 220 300 L -220 300 Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="12"
            strokeLinejoin="round"
          />

          {/* Canonical Large White Head (Circle r=160) */}
          <circle cx="0" cy="0" r="160" fill="#FFFFFF" stroke="#000000" strokeWidth="12" />

          {/* Serene Closed Smiling Eyes (Curved Arcs ⌒ ⌒) */}
          {/* Left Eye */}
          <path
            d="M -70 -20 Q -45 -55 -20 -20"
            fill="none"
            stroke="#000000"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Right Eye */}
          <path
            d="M 20 -20 Q 45 -55 70 -20"
            fill="none"
            stroke="#000000"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Warm Pink Blush Cheeks */}
          <ellipse cx="-85" cy="15" rx="28" ry="16" fill="#FCA5A5" opacity="0.75" />
          <ellipse cx="85" cy="15" rx="28" ry="16" fill="#FCA5A5" opacity="0.75" />

          {/* Gentle Smile Mouth Arc */}
          <path
            d="M -50 45 Q 0 95 50 45"
            fill="none"
            stroke="#000000"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-amber-600 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-amber-200">
            TRANSIENT CHEER: POSITIVE EVENTS TEMPORARILY ELEVATE MOOD, BUT THE UNDERLYING DEPRESSION REMAINS UNRESOLVED
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
