import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 96: Luteal Phase Start
 * Duration: 180 frames (6.0s)
 * Environment: Clinical infographic timeline on dark background (#0B0F19).
 * Transition: Slide-up.
 * Characters & Props: Menstrual cycle diagram showing Day 14 ovulation finish, red zone activating over 14 days before menses with "SYMPTOMS ACTIVATE" alert.
 */
export const Scene096_LutealPhaseStart = () => {
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

  // Ovulation pulse burst at Day 14: frames 15 to 40
  const ovPulse = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red luteal zone activation: frames 35 to 80
  const zoneExpand = interpolate(frame, [35, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "SYMPTOMS ACTIVATE" pop spring: frame 75
  const popSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const popScale = interpolate(popSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing red zone
  const redPulse = 1 + Math.sin(frame * 0.25) * 0.2;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B0F19",
      }}
    >
      {/* Background Subtle Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="grid96" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid96)" />
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
            border: `1.5px solid ${frame >= 40 ? "#EF4444" : "#38BDF8"}`,
            boxShadow: frame >= 40 ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            LUTEAL PHASE ONSET
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-red-400">
            7 to 14 Days Pre-Menses: Symptom Ignition Window
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateY(${slideY}px)` }}
      >
        <defs>
          {/* Red Zone Glow Filter */}
          <filter id="redZoneGlow96" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red Zone Gradient */}
          <linearGradient id="redZoneGrad96" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#DC2626" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#991B1B" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* 28-DAY MENSTRUAL CYCLE TIMELINE (Center: y = 540) */}
        <g transform="translate(960, 540)">
          {/* Timeline Background Rail (Total Width: 1400px, from -700 to +700) */}
          <line x1="-700" y1="0" x2="700" y2="0" stroke="#334155" strokeWidth="8" strokeLinecap="round" />

          {/* Day Markers */}
          {[-700, -350, 0, 350, 700].map((mx, i) => {
            const labels = ["DAY 1", "DAY 7", "DAY 14 (OVULATION)", "DAY 21", "DAY 28 (MENSES)"];
            return (
              <g key={mx} transform={`translate(${mx}, 0)`}>
                <line x1="0" y1="-20" x2="0" y2="20" stroke="#64748B" strokeWidth="3" />
                <text x="0" y="45" fill="#94A3B8" fontSize="15" fontWeight="900" textAnchor="middle" letterSpacing="1">
                  {labels[i]}
                </text>
              </g>
            );
          })}

          {/* PHASE 1: FOLLICULAR PHASE (Left half: -700 to 0) */}
          <g transform="translate(-350, -60)">
            <rect x="-160" y="-22" width="320" height="44" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <text x="0" y="6" fill="#38BDF8" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="2">
              FOLLICULAR PHASE (ASYMPTOMATIC)
            </text>
          </g>

          {/* DAY 14: OVULATION FINISH (x = 0) */}
          <g transform="translate(0, 0)">
            {/* Pulse wave ring */}
            <circle cx="0" cy="0" r={20 + ovPulse * 35} fill="none" stroke="#FDE047" strokeWidth="3" opacity={1 - ovPulse} />
            <circle cx="0" cy="0" r="16" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="4" />
          </g>

          {/* PHASE 2: ACTIVATED LUTEAL ZONE (Right half: 0 to 700) */}
          {zoneExpand > 0 && (
            <g>
              {/* Glowing Red Active Zone Rectangle */}
              <rect
                x="0"
                y="-140"
                width={700 * zoneExpand}
                height="280"
                rx="16"
                fill="url(#redZoneGrad96)"
                stroke="#EF4444"
                strokeWidth="4"
                strokeDasharray="8 6"
                filter="url(#redZoneGlow96)"
                opacity={redPulse * 0.9}
              />

              {/* Active Rail Line */}
              <line
                x1="0"
                y1="0"
                x2={700 * zoneExpand}
                y2="0"
                stroke="#EF4444"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Range Bracket: "7-14 DAYS BEFORE" */}
              <g transform={`translate(${350 * zoneExpand}, -180)`}>
                <rect x="-150" y="-20" width="300" height="40" rx="8" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2" />
                <text x="0" y="6" fill="#FEE2E2" fontSize="16" fontWeight="900" textAnchor="middle" letterSpacing="2">
                  7–14 DAYS BEFORE MENSES
                </text>
              </g>
            </g>
          )}

          {/* "SYMPTOMS ACTIVATE" POP-IN BADGE (x = 350, y = 0) */}
          {frame >= 75 && (
            <g transform={`translate(350, 0) scale(${popScale})`} filter="url(#redZoneGlow96)">
              <rect
                x="-190"
                y="-50"
                width="380"
                height="100"
                rx="18"
                fill="#7F1D1D"
                stroke="#EF4444"
                strokeWidth="5"
              />
              <rect x="-178" y="-38" width="356" height="76" rx="12" fill="#450A0A" />

              <text
                x="0"
                y="8"
                fill="#FFFFFF"
                fontSize="28"
                fontWeight="900"
                textAnchor="middle"
                letterSpacing="3"
              >
                SYMPTOMS ACTIVATE
              </text>
              <text
                x="0"
                y="28"
                fill="#FCA5A5"
                fontSize="12"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="2"
              >
                AFFECTIVE CRACK & DYSPHORIA
              </text>
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
