import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MedicalPill } from "../../shared";

/**
 * Scene 39: Gasoline on a Spark
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Solid pitch black background (#000000).
 * - Characters & Props: The Blue Pill (SSRI), tiny glowing red ember, roaring vector firestorm.
 * - Beginning (0-48f): Blue Pill drops slowly toward a faint red ember on the dark floor.
 * - Action/Climax (48-110f): Pill impacts ember -> instantaneous massive explosion of orange and red vector flames.
 * - Ending/Hold (110-180f): Screen filled with raging fire, flickering tongues, floating embers, and intense heat distortion.
 */
export const Scene039_GasolineonaSpark = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Falling Pill Dynamics: starts y=100, drops to y=840 at frame 48
  const pillY = interpolate(frame, [0, 48], [120, 840], {
    extrapolateRight: "clamp",
  });
  const pillRot = interpolate(frame, [0, 48], [-15, 65], {
    extrapolateRight: "clamp",
  });
  const pillOpacity = frame < 48 ? 1 : interpolate(frame, [48, 52], [1, 0], { extrapolateRight: "clamp" });

  // Post-impact explosion explosion trigger at frame 48
  const exploded = frame >= 48;
  const explodeAge = Math.max(0, frame - 48);

  // Violent screen shake after explosion
  const shakeX = exploded && explodeAge < 40 ? Math.sin(explodeAge * 1.8) * Math.max(0, 18 - explodeAge * 0.45) : 0;
  const shakeY = exploded && explodeAge < 40 ? Math.cos(explodeAge * 2.2) * Math.max(0, 15 - explodeAge * 0.4) : 0;

  // Expanding shockwave ring
  const blastRadius = interpolate(explodeAge, [0, 25], [20, 1100], { extrapolateRight: "clamp" });
  const blastOpacity = interpolate(explodeAge, [0, 25], [1, 0], { extrapolateRight: "clamp" });

  // Flame expansion height (0 at 48, reaches full height by frame 75)
  const flameScaleY = interpolate(explodeAge, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flickering frequency parameters for flame tongues
  const f1 = Math.sin(frame * 0.4) * 25;
  const f2 = Math.cos(frame * 0.35 + 1.5) * 30;
  const f3 = Math.sin(frame * 0.45 + 3.0) * 20;

  return (
    <AbsoluteFill
      className="bg-black overflow-hidden select-none font-sans text-white"
      style={{
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Background ambient heat glow */}
      {exploded && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 90%, rgba(220, 38, 38, ${Math.min(0.65, explodeAge * 0.04)}) 0%, rgba(185, 28, 28, 0.25) 45%, rgba(0,0,0,1) 85%)`,
          }}
        />
      )}

      {/* Top Header Card */}
      <div className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-8">
        <div className="px-8 py-3 rounded-2xl bg-black/85 border border-red-900/60 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-red-500 font-bold uppercase block mb-0.5">
            THE PHARMACOLOGICAL TRIGGER
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-wider text-white m-0 uppercase">
            GASOLINE ON A SPARK
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="ember-glow-s39" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#EF4444" floodOpacity="0.9" />
          </filter>
          <filter id="fire-glow-s39" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="-10" stdDeviation="30" floodColor="#EA580C" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Floor Line */}
        <line x1="0" y1="880" x2="1920" y2="880" stroke="#1E293B" strokeWidth="3" />

        {/* 1. PRE-EXPLOSION: TINY RED EMBER (At 960, 860) */}
        {!exploded && (
          <g transform="translate(960, 860)" filter="url(#ember-glow-s39)">
            <ellipse cx="0" cy="10" rx="40" ry="10" fill="#EF4444" opacity="0.3" />
            <circle cx="0" cy="0" r={10 + Math.sin(frame * 0.3) * 3} fill="#EF4444" />
            <circle cx="0" cy="0" r="5" fill="#FEF08A" />
            {/* Tiny faint sparklets */}
            <circle cx="-12" cy={-8 - Math.sin(frame * 0.4) * 6} r="2" fill="#F97316" opacity="0.7" />
            <circle cx="14" cy={-12 - Math.cos(frame * 0.35) * 6} r="1.5" fill="#FEF08A" opacity="0.8" />
          </g>
        )}

        {/* 2. FALLING BLUE SSRI PILL */}
        <g opacity={pillOpacity}>
          <MedicalPill
            x={960}
            y={pillY}
            scale={1.2}
            rotation={pillRot}
            color1="#2563EB"
            color1Dark="#1D4ED8"
            color2="#F8FAFC"
            color2Dark="#CBD5E1"
            imprint="SSRI"
            subImprint="20mg"
            glowing={true}
            glowColor="#3B82F6"
            glowRadius={25}
          />
        </g>

        {/* 3. EXPLOSION SHOCKWAVE BLAST */}
        {exploded && blastOpacity > 0 && (
          <circle
            cx="960"
            cy="860"
            r={blastRadius}
            fill="none"
            stroke="#FEF08A"
            strokeWidth={14 * blastOpacity}
            opacity={blastOpacity}
          />
        )}

        {/* 4. ROARING VECTOR FLAME TONGUES */}
        {exploded && (
          <g
            transform={`translate(960, 880) scale(1, ${flameScaleY}) translate(-960, -880)`}
            filter="url(#fire-glow-s39)"
          >
            {/* Layer A: Deep Red Background Flame Wall */}
            <path
              d={`M 100 880 
                  Q 300 ${300 + f1}, 500 ${180 + f2} 
                  Q 700 ${340 + f3}, 960 ${80 + f1} 
                  Q 1200 ${320 + f2}, 1420 ${200 + f3} 
                  Q 1650 ${350 + f1}, 1820 880 Z`}
              fill="#991B1B"
              opacity="0.85"
            />

            {/* Layer B: Blazing Crimson & Orange Mid Fire */}
            <path
              d={`M 250 880 
                  Q 420 ${380 + f2}, 620 ${260 + f1} 
                  Q 800 ${420 + f3}, 960 ${160 + f2} 
                  Q 1120 ${400 + f1}, 1300 ${280 + f3} 
                  Q 1500 ${450 + f2}, 1670 880 Z`}
              fill="#EA580C"
              opacity="0.9"
            />

            {/* Layer C: Bright Gold/Yellow Core Flame */}
            <path
              d={`M 450 880 
                  Q 600 ${480 + f3}, 780 ${380 + f2} 
                  Q 880 ${490 + f1}, 960 ${260 + f3} 
                  Q 1040 ${480 + f2}, 1140 ${390 + f1} 
                  Q 1300 ${520 + f3}, 1470 880 Z`}
              fill="#F59E0B"
              opacity="0.95"
            />

            {/* Layer D: Intense White-Hot Center Heart */}
            <path
              d={`M 680 880 
                  Q 820 ${560 + f1}, 960 ${380 + f2} 
                  Q 1100 ${560 + f3}, 1240 880 Z`}
              fill="#FEF08A"
            />

            {/* Floating Sparks / Flying Embers */}
            {[...Array(16)].map((_, i) => {
              const seedX = (i * 97) % 1200 - 600;
              const speedY = ((i % 5) + 3) * 6;
              const sparkY = 860 - ((explodeAge * speedY + i * 45) % 800);
              const sparkX = 960 + seedX + Math.sin(frame * 0.15 + i) * 35;
              const sparkR = (i % 3) + 2;
              return (
                <circle
                  key={i}
                  cx={sparkX}
                  cy={sparkY}
                  r={sparkR}
                  fill={i % 2 === 0 ? "#FEF08A" : "#F97316"}
                  opacity={sparkY > 150 ? 0.85 : 0}
                />
              );
            })}
          </g>
        )}
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-red-600/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-red-400">
            LATENT BIPOLAR SPARK: INTRODUCING AN SSRI ACTS AS A VOLATILE ACCELERANT
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
