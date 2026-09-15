import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 101: standard Progesterone Flux
 * Duration: 180 frames (6.0s)
 * Environment: Clinical infographic chart space (#0F172A).
 * Transition: Slide-up.
 * Characters & Props: Yellow progesterone flux wave, silver magnifying glass showing smooth round rotating molecules, "STANDARD" clinical badge.
 */
export const Scene101_standardProgesteroneFlux = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-up entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const slideY = interpolate(enterSpring, [0, 1], [60, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Wave drawing progress: frames 0 to 45
  const waveProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Magnifying glass entrance: frames 30 to 65
  const glassSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 130 },
  });
  const glassScale = interpolate(glassSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Molecular gentle floating and rotation
  const molRot = frame * 0.4;
  const molFloat = Math.sin(frame * 0.1) * 8;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Background Clinical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid101" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid101)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `translateY(${slideY}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(253, 224, 71, 0.4)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            STANDARD PROGESTERONE FLUX
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-yellow-300">
            Neurosteroid Synthesis Occurs Under Completely Normal Molecular Parameters
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateY(${slideY}px)` }}
      >
        <defs>
          <filter id="yellowGlow101" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="lensShadow101" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="15" stdDeviation="25" floodColor="#000000" floodOpacity="0.8" />
          </filter>

          <clipPath id="lensClip101">
            <circle cx="0" cy="0" r="210" />
          </clipPath>
        </defs>

        {/* LEFT / CENTER: LINE GRAPH OF PROGESTERONE FLUX (x=540, y=560) */}
        <g transform="translate(540, 560)">
          {/* Axis Baseline */}
          <line x1="-340" y1="120" x2="340" y2="120" stroke="#475569" strokeWidth="4" />
          <line x1="-340" y1="-140" x2="-340" y2="120" stroke="#475569" strokeWidth="4" />

          {/* Reference Guideline Dashes */}
          {[-60, 20].map((gy) => (
            <line key={gy} x1="-340" y1={gy} x2="340" y2={gy} stroke="#1E293B" strokeWidth="2" strokeDasharray="4 8" />
          ))}

          {/* Single Smooth Yellow Progesterone Wave (#FDE047) */}
          <path
            d="
              M -340 100
              C -220 100, -140 -120, 0 -100
              C 140 -80, 200 80, 340 100
            "
            fill="none"
            stroke="#FDE047"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="800"
            strokeDashoffset={800 * (1 - waveProgress)}
            filter="url(#yellowGlow101)"
          />

          {/* Label Badge on Wave */}
          <g transform="translate(0, -140)">
            <rect x="-130" y="-18" width="260" height="36" rx="8" fill="#713F12" stroke="#FDE047" strokeWidth="2" />
            <text x="0" y="6" fill="#FEFCE8" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="2">
              PROGESTERONE FLUX
            </text>
          </g>
        </g>

        {/* RIGHT: MAGNIFYING GLASS HOVERING OVER FLUX (x=1360, y=550) */}
        <g
          transform={`translate(1360, 550) scale(${glassScale})`}
          filter="url(#lensShadow101)"
        >
          {/* Diagonal Heavy Silver Handle */}
          <line x1="160" y1="160" x2="310" y2="310" stroke="#64748B" strokeWidth="26" strokeLinecap="round" />
          <line x1="160" y1="160" x2="310" y2="310" stroke="#94A3B8" strokeWidth="16" strokeLinecap="round" />

          {/* Silver Rim Frame */}
          <circle cx="0" cy="0" r="230" fill="#334155" stroke="#CBD5E1" strokeWidth="16" />
          <circle cx="0" cy="0" r="215" fill="#0A1124" stroke="#94A3B8" strokeWidth="4" />

          {/* Inside Magnified Lens View (Clipped) */}
          <g clipPath="url(#lensClip101)">
            {/* Dark cellular background */}
            <rect x="-220" y="-220" width="440" height="440" fill="#060C1B" />

            {/* Lens Specular Reflection Arch */}
            <path
              d="M -180 -80 A 200 200 0 0 1 80 -180"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="10"
              opacity="0.2"
            />

            {/* SMOOTH, ROUND, FRIENDLY NEUROSTEROID MOLECULES FLOATING GENTLY */}
            <g transform={`translate(0, ${molFloat}) rotate(${molRot})`}>
              {/* Central Round Molecule */}
              <circle cx="0" cy="0" r="55" fill="#FDE047" stroke="#CA8A04" strokeWidth="5" filter="url(#yellowGlow101)" />
              <text x="0" y="8" fill="#713F12" fontSize="18" fontWeight="900" textAnchor="middle">
                ALLO
              </text>

              {/* Orbiting Smooth Molecule 1 */}
              <circle cx="-110" cy="-60" r="38" fill="#FEF08A" stroke="#EAB308" strokeWidth="4" />
              <line x1="-75" y1="-40" x2="-35" y2="-20" stroke="#94A3B8" strokeWidth="4" strokeDasharray="3 3" />

              {/* Orbiting Smooth Molecule 2 */}
              <circle cx="100" cy="70" r="34" fill="#FEF08A" stroke="#EAB308" strokeWidth="4" />
              <line x1="70" y1="50" x2="35" y2="25" stroke="#94A3B8" strokeWidth="4" strokeDasharray="3 3" />
            </g>
          </g>

          {/* Clinical Confirmation Tag */}
          <g transform="translate(0, 275)">
            <rect x="-140" y="-20" width="280" height="40" rx="10" fill="#1E293B" stroke="#FDE047" strokeWidth="2" />
            <text x="0" y="6" fill="#FEFCE8" fontSize="15" fontWeight="900" textAnchor="middle" letterSpacing="2">
              ✓ 100% HEALTHY STRUCTURE
            </text>
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
