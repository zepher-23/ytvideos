import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 51: Title - SAD
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Clean, solid off-white background (#F8FAFC).
 * - Characters & Props: Large title typography, heavy dark blue/cyan vector snowflake icon.
 * - Beginning (0-20f): Screen is blank off-white.
 * - Action/Climax (20-80f): "4. SEASONAL AFFECTIVE DISORDER (SAD)" types cleanly.
 *   A heavy dark blue vector snowflake drops heavily with an impact thump and settles.
 * - Ending/Hold (80-150f): Text and snowflake hold steady with frosty crystalline breathing pulse.
 */
export const Scene051_TitleSAD = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typewriter effect for main title
  const fullText = "4. SEASONAL AFFECTIVE DISORDER";
  const typedLength = Math.floor(
    interpolate(frame, [15, 50], [0, fullText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayedTitle = fullText.slice(0, typedLength);

  // "(SAD)" Badge entrance spring at frame 50
  const sadFrame = Math.max(0, frame - 50);
  const sadSpring = spring({
    frame: sadFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const sadScale = frame < 50 ? 0 : interpolate(sadSpring, [0, 1], [0.4, 1]);
  const sadOpacity = interpolate(sadFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  // Heavy Snowflake drop from y=-150 to y=620 (lands at frame 65)
  const dropFrame = Math.max(0, frame - 35);
  const dropSpring = spring({
    frame: dropFrame,
    fps,
    config: { damping: 11, stiffness: 100, mass: 1.5 },
  });
  const flakeY = frame < 35 ? -180 : interpolate(dropSpring, [0, 1], [-180, 640]);
  const flakeRot = frame * 0.8;

  // Impact ripple after landing (frame >= 65)
  const impactAge = Math.max(0, frame - 65);
  const rippleRadius = interpolate(impactAge, [0, 30], [20, 260], { extrapolateRight: "clamp" });
  const rippleOpacity = interpolate(impactAge, [0, 30], [0.8, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-slate-900">
      {/* Background Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <defs>
          <pattern id="grid-s51" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s51)" />
      </svg>

      {/* Main Title Center Container */}
      <div className="absolute top-[280px] left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-8">
        <div className="flex flex-col items-center">
          {/* Subtitle Index Pill */}
          <div className="mb-4 px-6 py-1.5 rounded-full bg-blue-100 border border-blue-300 shadow-sm">
            <span className="text-xs font-mono tracking-widest text-blue-800 font-bold uppercase">
              DEPRESSIVE SUBTYPE 04
            </span>
          </div>

          {/* Large Typewritten Header */}
          <h1 className="text-4xl md:text-6xl font-black tracking-wider text-slate-900 m-0 uppercase text-center leading-tight">
            {displayedTitle}
            {frame < 55 && <span className="text-blue-600 animate-pulse">|</span>}
          </h1>

          {/* "(SAD)" Badge */}
          <div
            className="mt-6 px-10 py-3.5 rounded-2xl bg-blue-600 text-white font-black text-3xl md:text-4xl tracking-widest uppercase shadow-2xl border-2 border-blue-400"
            style={{
              transform: `scale(${sadScale})`,
              opacity: sadOpacity,
            }}
          >
            (SAD)
          </div>
        </div>
      </div>

      {/* MAIN STAGE SVG: HEAVY DROPPING SNOWFLAKE */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="frost-glow-s51" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#0284C7" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Ground Impact Ripple */}
        {frame >= 65 && rippleOpacity > 0 && (
          <circle
            cx="960"
            cy="640"
            r={rippleRadius}
            fill="none"
            stroke="#0284C7"
            strokeWidth={4 * rippleOpacity}
            opacity={rippleOpacity}
          />
        )}

        {/* HEAVY VECTOR SNOWFLAKE ICON */}
        <g
          transform={`translate(960, ${flakeY}) rotate(${flakeRot})`}
          filter="url(#frost-glow-s51)"
        >
          {/* Central Hexagon Core */}
          <polygon
            points="0,-24 21,-12 21,12 0,24 -21,12 -21,-12"
            fill="#0369A1"
            stroke="#38BDF8"
            strokeWidth="3"
          />

          {/* 6 Symmetrical Crystalline Arms */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <g key={i} transform={`rotate(${deg})`}>
              {/* Main Stem */}
              <line x1="0" y1="0" x2="0" y2="-100" stroke="#0369A1" strokeWidth="8" strokeLinecap="round" />
              {/* Outer V-Branches */}
              <line x1="0" y1="-50" x2="-25" y2="-75" stroke="#0369A1" strokeWidth="6" strokeLinecap="round" />
              <line x1="0" y1="-50" x2="25" y2="-75" stroke="#0369A1" strokeWidth="6" strokeLinecap="round" />
              <line x1="0" y1="-75" x2="-18" y2="-95" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
              <line x1="0" y1="-75" x2="18" y2="-95" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
              {/* Tip Diamond */}
              <circle cx="0" cy="-100" r="7" fill="#38BDF8" />
            </g>
          ))}
        </g>
      </svg>

      {/* Bottom Medical Subtitle Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            SEASONAL PHOTOPERIODIC DYSREGULATION: WINTER-ONSET RECURRENT DEPRESSION
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
