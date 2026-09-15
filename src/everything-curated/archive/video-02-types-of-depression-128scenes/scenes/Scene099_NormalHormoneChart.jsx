import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 99: Normal Hormone Chart
 * Duration: 180 frames (6.0s)
 * Environment: Clean infographic space on white (#F8FAFC).
 * Transition: Fast scale-out into white.
 * Characters & Props: Line graph tracing normal gentle yellow-green wave (#84CC16), "NORMAL HORMONE LEVELS" title, giant pulsing green checkmark (#16A34A).
 */
export const Scene099_NormalHormoneChart = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fast scale-out entrance from storm
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const enterScale = interpolate(enterSpring, [0, 1], [0.85, 1]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Wave tracing progression across chart: frames 0 to 60
  const waveProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Giant checkmark entrance spring: frame 65
  const checkSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const checkScale = interpolate(checkSpring, [0, 1], [0.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Checkmark pulse
  const checkPulse = frame >= 65 ? 1 + Math.sin((frame - 65) * 0.25) * 0.08 : 1;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F8FAFC",
      }}
    >
      {/* Light Clean Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
        <defs>
          <pattern id="lightGrid99" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lightGrid99)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `scale(${enterScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            border: "1.5px solid #CBD5E1",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-slate-900"
          >
            NORMAL HORMONE LEVELS
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-emerald-600">
            Endocrine Serology Reveals Zero Deficiencies or Excess
          </p>
        </div>
      </div>

      {/* Main Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `scale(${enterScale})`, transformOrigin: "960px 540px" }}
      >
        <defs>
          <filter id="checkGlow99" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="15" floodColor="#16A34A" floodOpacity="0.3" />
          </filter>

          <filter id="chartShadow99" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* CLINICAL CHART CARD (Left & Center: x=240 to 1240, width=1000) */}
        <g transform="translate(680, 560)" filter="url(#chartShadow99)">
          {/* Card Base */}
          <rect x="-460" y="-220" width="920" height="440" rx="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />

          {/* Chart Axes */}
          <line x1="-380" y1="140" x2="380" y2="140" stroke="#94A3B8" strokeWidth="3" />
          <line x1="-380" y1="-140" x2="-380" y2="140" stroke="#94A3B8" strokeWidth="3" />

          {/* Axis Labels */}
          {["DAY 1", "DAY 7", "DAY 14", "DAY 21", "DAY 28"].map((d, i) => (
            <text key={d} x={-380 + i * 190} y="170" fill="#64748B" fontSize="14" fontWeight="800" textAnchor="middle">
              {d}
            </text>
          ))}

          {/* Reference Guideline Dashes */}
          {[-80, 0, 80].map((gy) => (
            <line key={gy} x1="-380" y1={gy} x2="380" y2={gy} stroke="#F1F5F9" strokeWidth="2" strokeDasharray="6 6" />
          ))}

          {/* NORMAL GENTLE SINE WAVE (Yellow-Green #84CC16) */}
          <path
            d="
              M -380 120
              C -280 80, -190 -100, 0 -80
              C 190 -60, 240 60, 380 120
            "
            fill="none"
            stroke="#84CC16"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="900"
            strokeDashoffset={900 * (1 - waveProgress)}
          />

          {/* Tracer Node */}
          {waveProgress > 0 && waveProgress < 1 && (
            <circle
              cx={-380 + waveProgress * 760}
              cy={120 - Math.sin(waveProgress * Math.PI) * 200}
              r="9"
              fill="#84CC16"
              stroke="#FFFFFF"
              strokeWidth="3"
            />
          )}

          {/* Label on Curve */}
          <g transform="translate(0, -110)">
            <rect x="-120" y="-18" width="240" height="34" rx="8" fill="#F0FDF4" stroke="#84CC16" strokeWidth="1.5" />
            <text x="0" y="5" fill="#4D7C0F" fontSize="14" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
              PHYSIOLOGIC SERUM LEVEL
            </text>
          </g>
        </g>

        {/* RIGHT SIDE: GIANT GREEN CHECKMARK BADGE (x=1440, y=560) */}
        {frame >= 65 && (
          <g
            transform={`translate(1440, 560) scale(${checkScale * checkPulse})`}
            filter="url(#checkGlow99)"
          >
            {/* Circular Checkmark Backing */}
            <circle cx="0" cy="0" r="140" fill="#16A34A" />
            <circle cx="0" cy="0" r="120" fill="#FFFFFF" />

            {/* Giant Green Check Vector */}
            <path
              d="M -50 -5 L -15 35 L 55 -40"
              fill="none"
              stroke="#16A34A"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Clinical Approval Stamp Text below checkmark */}
            <g transform="translate(0, 180)">
              <rect x="-150" y="-22" width="300" height="44" rx="10" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
              <text x="0" y="7" fill="#15803D" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="2">
                100% IN RANGE
              </text>
            </g>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
