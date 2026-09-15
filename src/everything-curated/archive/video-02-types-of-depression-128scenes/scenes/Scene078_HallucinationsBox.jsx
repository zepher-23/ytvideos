import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 78: Hallucinations Box
 * Duration: 180 frames (6.0s)
 * Environment: Infographic flowchart space on a dark background.
 * Transition: Slide-left entrance.
 * Characters & Props: Flowchart logic boxes: "DEPRESSION" connects to "DESPAIR", jagged fracture branches to "HALLUCINATIONS".
 */
export const Scene078_HallucinationsBox = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-left entrance
  const slideSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const slideX = interpolate(slideSpring, [0, 1], [80, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Secondary path fracture progression: frames 50 to 95
  const fractureProgress = interpolate(frame, [50, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Hallucinations box slam entrance at frame 90
  const boxSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 11, stiffness: 160 },
  });
  const boxScale = interpolate(boxSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Aggressive jitter shake for hallucinations box
  const isJittering = frame >= 90;
  const jitterIntensity = interpolate(frame, [90, 120, 180], [1, 0.7, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const jitterX = isJittering ? Math.sin(frame * 2.2) * 6 * jitterIntensity : 0;
  const jitterY = isJittering ? Math.cos(frame * 2.7) * 5 * jitterIntensity : 0;

  // Pulsing neon red glow
  const neonPulse = 1 + Math.sin(frame * 0.3) * 0.25;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#080D1A",
      }}
    >
      {/* Dark Circuit Grid Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="flowGrid-Scene078" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#flowGrid-Scene078)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `translateX(${slideX}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: `1.5px solid ${frame >= 90 ? "rgba(239, 68, 68, 0.6)" : "rgba(71, 85, 105, 0.5)"}`,
            boxShadow: frame >= 90 ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: frame >= 90 ? "#F87171" : "#FFFFFF" }}
          >
            NEURAL LOGIC FRACTURE
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Affective Pathway • Perceptual Distortion
          </p>
        </div>
      </div>

      {/* Main Flowchart SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateX(${slideX}px)` }}
      >
        <defs>
          {/* Neon Red Glow Filter */}
          <filter id="neonRedGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrow markers */}
          <marker id="arrowWhite" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#FFFFFF" />
          </marker>
          <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#EF4444" />
          </marker>
        </defs>

        {/* PRIMARY FLOW: BOX 1 "DEPRESSION" (Top Left: x=420, y=360) */}
        <g transform="translate(420, 360)">
          {/* Card Outer Glow & Backing */}
          <rect
            x="-190"
            y="-70"
            width="380"
            height="140"
            rx="18"
            fill="#0F172A"
            stroke="#FFFFFF"
            strokeWidth="3"
            style={{
              filter: "drop-shadow(0 0 15px rgba(255,255,255,0.25))",
            }}
          />
          <rect x="-182" y="-62" width="364" height="124" rx="12" fill="#1E293B" opacity="0.9" />
          
          <text
            x="0"
            y="-10"
            fill="#FFFFFF"
            fontSize="32"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="2"
          >
            DEPRESSION
          </text>
          <text
            x="0"
            y="30"
            fill="#94A3B8"
            fontSize="16"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="1.5"
          >
            MOOD DYSREGULATION
          </text>

          {/* Output Port */}
          <circle cx="190" cy="0" r="8" fill="#FFFFFF" />
        </g>

        {/* PRIMARY FLOW: BOX 2 "DESPAIR" (Top Right: x=1420, y=360) */}
        <g transform="translate(1420, 360)">
          <rect
            x="-190"
            y="-70"
            width="380"
            height="140"
            rx="18"
            fill="#0F172A"
            stroke="#94A3B8"
            strokeWidth="2.5"
            style={{
              filter: "drop-shadow(0 0 12px rgba(148,163,184,0.2))",
            }}
          />
          <rect x="-182" y="-62" width="364" height="124" rx="12" fill="#1E293B" opacity="0.85" />
          
          <text
            x="0"
            y="-10"
            fill="#FFFFFF"
            fontSize="32"
            fontWeight="900"
            textAnchor="middle"
            letterSpacing="2"
          >
            DESPAIR
          </text>
          <text
            x="0"
            y="30"
            fill="#94A3B8"
            fontSize="16"
            fontWeight="700"
            textAnchor="middle"
            letterSpacing="1.5"
          >
            COGNITIVE COLLAPSE
          </text>

          {/* Input Port */}
          <circle cx="-190" cy="0" r="8" fill="#94A3B8" />
        </g>

        {/* PRIMARY FLOW LINE: Connecting Depression -> Despair */}
        {/* x: 610 to 1230 */}
        <line
          x1="610"
          y1="360"
          x2="1230"
          y2="360"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeDasharray="8 6"
          opacity="0.8"
          markerEnd="url(#arrowWhite)"
        />

        {/* Moving Flow Pulses along primary line */}
        <circle
          cx={610 + ((frame * 6) % 620)}
          cy="360"
          r="5"
          fill="#38BDF8"
        />

        {/* FRACTURE JUNCTION (At x = 860, y = 360) */}
        {frame >= 50 && (
          <g transform="translate(860, 360)">
            <circle cx="0" cy="0" r="10" fill="#EF4444" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 3" />
          </g>
        )}

        {/* SECONDARY FRACTURE PATH: Jagged, erratic red line leading down to Hallucinations */}
        {fractureProgress > 0 && (
          <g stroke="#EF4444" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Draw partial path based on fractureProgress */}
            {fractureProgress > 0.2 && <line x1="860" y1="360" x2="910" y2="430" />}
            {fractureProgress > 0.4 && <line x1="910" y1="430" x2="880" y2="510" />}
            {fractureProgress > 0.6 && <line x1="880" y1="510" x2="980" y2="600" />}
            {fractureProgress > 0.8 && <line x1="980" y1="600" x2="1080" y2="670" />}
            {fractureProgress >= 0.95 && <line x1="1080" y1="670" x2="1210" y2="720" markerEnd="url(#arrowRed)" />}

            {/* Spark bursts at zigzags */}
            <circle cx="910" cy="430" r="4" fill="#F59E0B" />
            <circle cx="880" cy="510" r="4" fill="#FFFFFF" />
            <circle cx="980" cy="600" r="5" fill="#EF4444" />
          </g>
        )}

        {/* THE "HALLUCINATIONS" BOX (Bottom Right: x=1420, y=720) */}
        {frame >= 90 && (
          <g
            transform={`translate(${1420 + jitterX}, ${720 + jitterY}) scale(${boxScale})`}
          >
            {/* Pulsing Neon Red Outer Glow Backing */}
            <rect
              x="-210"
              y="-85"
              width="420"
              height="170"
              rx="22"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="4.5"
              filter="url(#neonRedGlow)"
              opacity={neonPulse * 0.9}
            />

            {/* Dark inner card */}
            <rect
              x="-200"
              y="-75"
              width="400"
              height="150"
              rx="16"
              fill="#180404"
              stroke="#EF4444"
              strokeWidth="2.5"
            />

            {/* Warning Hazard Stripes Header inside card */}
            <g opacity="0.35">
              <line x1="-180" y1="-55" x2="-140" y2="-55" stroke="#EF4444" strokeWidth="4" />
              <line x1="-120" y1="-55" x2="-80" y2="-55" stroke="#EF4444" strokeWidth="4" />
              <line x1="80" y1="-55" x2="120" y2="-55" stroke="#EF4444" strokeWidth="4" />
              <line x1="140" y1="-55" x2="180" y2="-55" stroke="#EF4444" strokeWidth="4" />
            </g>

            {/* Main Label */}
            <text
              x="0"
              y="-10"
              fill="#FFFFFF"
              fontSize="34"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
              style={{
                filter: "drop-shadow(0 0 10px #EF4444)",
              }}
            >
              HALLUCINATIONS
            </text>

            <text
              x="0"
              y="28"
              fill="#FCA5A5"
              fontSize="16"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="2"
            >
              AUDITORY & VISUAL BREAK
            </text>

            {/* Telemetry pill */}
            <rect
              x="-110"
              y="42"
              width="220"
              height="24"
              rx="12"
              fill="#991B1B"
            />
            <text
              x="0"
              y="58"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="1.5"
            >
              SIGNAL CORRUPTION: 100%
            </text>

            {/* Input Port receiving jagged red line */}
            <circle cx="-200" cy="0" r="10" fill="#EF4444" />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
