import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 95: The Luteal Phase Lever
 * Duration: 180 frames (6.0s)
 * Environment: Clean infographic calendar close-up.
 * Transition: Wipe entrance.
 * Characters & Props: 7-day calendar span, heavy industrial lever pulled down by skeletal hand from OFF to ON, 7-day span lighting up with aggressive glowing red border.
 */
export const Scene095_TheLutealPhaseLever = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wipe entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const wipeClip = interpolate(enterSpring, [0, 1], [100, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Skeletal hand reach-in: frames 30 to 55
  const handReach = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lever pull down (OFF to ON): frames 55 to 70
  const leverSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const leverAngle = interpolate(leverSpring, [0, 1], [-45, 45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Clank impact trigger at frame 62
  const isActivated = frame >= 62;
  const isImpact = frame >= 62 && frame < 85;
  const shakeX = isImpact ? Math.sin((frame - 62) * 2.8) * 8 * (1 - (frame - 62) / 23) : 0;
  const shakeY = isImpact ? Math.cos((frame - 62) * 3.2) * 6 * (1 - (frame - 62) / 23) : 0;

  // Red neon illumination pulse after activation
  const neonPulse = isActivated ? 1 + Math.sin((frame - 62) * 0.3) * 0.2 : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#080C17",
        clipPath: `inset(0 ${wipeClip}% 0 0)`,
      }}
    >
      {/* Background Subtle Wire Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="leverGrid95" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#leverGrid95)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${isActivated ? "#EF4444" : "#475569"}`,
            boxShadow: isActivated ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            THE LUTEAL PHASE SWITCH
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-300">
            Binary On/Off Mechanical Vulnerability to Progesterone Fluctuation
          </p>
        </div>
      </div>

      {/* Main SVG Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <defs>
          {/* Aggressive Red Neon Filter */}
          <filter id="leverNeonGlow95" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="boxShadow95" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="15" stdDeviation="20" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* ============================================== */}
        {/* LEFT SIDE: 7-DAY CALENDAR STRIP (x=580, y=560) */}
        {/* ============================================== */}
        <g transform="translate(580, 560)" filter="url(#boxShadow95)">
          {/* Outer Aggressive Glowing Red Border (Lights up when lever ON) */}
          <rect
            x="-440"
            y="-220"
            width="880"
            height="440"
            rx="24"
            fill="#0F172A"
            stroke={isActivated ? "#EF4444" : "#334155"}
            strokeWidth={isActivated ? "6" : "3"}
            filter={isActivated ? "url(#leverNeonGlow95)" : undefined}
            opacity={isActivated ? neonPulse : 0.9}
          />

          {/* Calendar Strip Header */}
          <rect x="-440" y="-220" width="880" height="70" rx="24" fill="#1E293B" />
          <rect x="-440" y="-170" width="880" height="20" fill="#1E293B" />
          <text x="0" y="-175" fill="#FFFFFF" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="3">
            7-DAY PREMENSTRUAL INTERVAL (DAYS 22–28)
          </text>

          {/* 7 Day Blocks Row */}
          <g transform="translate(-390, -80)">
            {["DAY 22", "DAY 23", "DAY 24", "DAY 25", "DAY 26", "DAY 27", "DAY 28"].map((d, i) => (
              <g key={d} transform={`translate(${i * 112}, 0)`}>
                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="180"
                  rx="14"
                  fill={isActivated ? "rgba(239, 68, 68, 0.18)" : "#1E293B"}
                  stroke={isActivated ? "#EF4444" : "#475569"}
                  strokeWidth={isActivated ? "3" : "1.5"}
                />
                <text
                  x="50"
                  y="45"
                  fill={isActivated ? "#FCA5A5" : "#94A3B8"}
                  fontSize="15"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  {d}
                </text>
                {/* Day Severity Bar */}
                <rect
                  x="20"
                  y={isActivated ? 80 : 130}
                  width="60"
                  height={isActivated ? 80 : 30}
                  rx="6"
                  fill={isActivated ? "#EF4444" : "#475569"}
                  opacity={isActivated ? 0.9 : 0.4}
                />
              </g>
            ))}
          </g>

          {/* Bottom Warning Label */}
          {isActivated && (
            <text x="0" y="180" fill="#F87171" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="2">
              ⚠ ACUTE NEUROCHEMICAL VULNERABILITY ENGAGED
            </text>
          )}
        </g>

        {/* ============================================== */}
        {/* RIGHT SIDE: HEAVY INDUSTRIAL LEVER (x=1440)    */}
        {/* ============================================== */}
        <g transform="translate(1440, 560)" filter="url(#boxShadow95)">
          {/* Heavy Steel Electrical Junction Box */}
          <rect x="-180" y="-240" width="360" height="480" rx="20" fill="#1E293B" stroke="#475569" strokeWidth="5" />
          <rect x="-160" y="-220" width="320" height="440" rx="14" fill="#0F172A" />

          {/* Bolt Rivets on box */}
          {[-140, 140].map((bx) =>
            [-200, 200].map((by) => (
              <circle key={`${bx}-${by}`} cx={bx} cy={by} r="7" fill="#475569" stroke="#0F172A" strokeWidth="2" />
            ))
          )}

          {/* "OFF" (Up) Label */}
          <g transform="translate(0, -140)">
            <rect x="-60" y="-20" width="120" height="40" rx="8" fill={!isActivated ? "#38BDF8" : "#334155"} />
            <text x="0" y="7" fill={!isActivated ? "#0F172A" : "#94A3B8"} fontSize="20" fontWeight="900" textAnchor="middle">
              OFF
            </text>
          </g>

          {/* "ON" (Down) Label */}
          <g transform="translate(0, 140)">
            <rect
              x="-60"
              y="-20"
              width="120"
              height="40"
              rx="8"
              fill={isActivated ? "#EF4444" : "#334155"}
              filter={isActivated ? "url(#leverNeonGlow95)" : undefined}
            />
            <text x="0" y="7" fill={isActivated ? "#FFFFFF" : "#94A3B8"} fontSize="20" fontWeight="900" textAnchor="middle">
              ON
            </text>
          </g>

          {/* Central Pivot Hub */}
          <circle cx="0" cy="0" r="45" fill="#334155" stroke="#64748B" strokeWidth="4" />
          <circle cx="0" cy="0" r="25" fill="#0F172A" />

          {/* THE HEAVY METALLIC LEVER ARM */}
          <g transform={`rotate(${leverAngle})`}>
            {/* Lever Bar */}
            <rect x="-16" y="-190" width="32" height="190" rx="8" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
            {/* Heavy Ball Grip at end */}
            <circle
              cx="0"
              cy="-190"
              r="34"
              fill={isActivated ? "#EF4444" : "#DC2626"}
              stroke="#7F1D1D"
              strokeWidth="4"
              filter={isActivated ? "url(#leverNeonGlow95)" : undefined}
            />
          </g>

          {/* Electric Contact Sparks on Clank */}
          {isImpact && (
            <g transform="translate(0, 140)">
              <circle cx="-30" cy="-10" r="6" fill="#FDE047" />
              <circle cx="35" cy="15" r="5" fill="#FFFFFF" />
              <circle cx="5" cy="-25" r="7" fill="#EF4444" />
            </g>
          )}

          {/* SKELETAL HAND PULLING LEVER */}
          {handReach > 0 && (
            <g
              transform={`
                translate(${interpolate(handReach, [0, 1], [300, 20])}, ${interpolate(handReach, [0, 1], [-100, isActivated ? 140 : -140])})
              `}
              opacity={handReach}
            >
              {/* Skeletal Bony Arm & Fingers wrapping ball grip */}
              <path
                d="M 220 30 L 70 0 L 20 -10 L -15 -10 L -30 10 L 0 25 L 50 20 Z"
                fill="#E2E8F0"
                stroke="#64748B"
                strokeWidth="3"
              />
              {/* Bony joint knotholes */}
              <circle cx="70" cy="0" r="6" fill="#94A3B8" />
              <circle cx="20" cy="-10" r="5" fill="#94A3B8" />
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
