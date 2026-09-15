import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 43: Rapid Cycling Chart
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Clean clinical infographic on crisp white (#FFFFFF).
 * - Characters & Props: Multi-phase line graph showing Standard Bipolar wave (green)
 *   morphing into Rapid Cycling sawtooth pattern (crimson red), telemetry grid, warning overlay.
 * - Beginning (0-70f): Standard Bipolar curve draws smoothly across months. Green badge.
 * - Action/Climax (70-150f): Wave transforms into chaotic, high-frequency red sawtooth spikes.
 * - Ending/Hold (150-210f): Giant WARNING overlay banner locks over chart.
 */
export const Scene043_RapidCyclingChart = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Phase switch at frame 70: Standard (Green) -> Rapid Cycling (Red)
  const isRapid = frame >= 70;
  const rapidProgress = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Warning Overlay slam at frame 150
  const warnFrame = Math.max(0, frame - 150);
  const warnSpring = spring({
    frame: warnFrame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const warnScale = frame < 150 ? 0 : interpolate(warnSpring, [0, 1], [2.2, 1]);
  const warnOpacity = interpolate(warnFrame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // Generate dynamic line graph path points
  const points = [];
  const startX = 260;
  const endX = 1660;
  const totalW = endX - startX;
  const centerY = 540; // 0 baseline

  for (let i = 0; i <= 200; i++) {
    const x = startX + (i / 200) * totalW;
    const t = i / 200;

    // Slow sinusoidal standard wave
    const stdWave = Math.sin(t * Math.PI * 4 - Math.PI / 2) * 160;

    // High frequency chaotic rapid cycling sawtooth wave
    const rapidWave =
      Math.sin(t * Math.PI * 24 + frame * 0.1) * 220 +
      Math.cos(t * Math.PI * 12) * 60;

    // Blended Y based on rapidProgress
    const y = centerY - (stdWave * (1 - rapidProgress) + rapidWave * rapidProgress);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const pathD = `M ${points.join(" L ")}`;

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans text-slate-900">
      {/* Background Technical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <defs>
          <pattern id="grid-s43" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M 70 0 L 0 0 0 70" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s43)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-10 py-3 rounded-2xl bg-slate-50 border border-slate-300 shadow-md backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest font-bold uppercase block mb-0.5 text-slate-500">
            POLAR OSCILLATION DYNAMICS
          </span>
          <h1
            className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 transition-colors duration-500"
            style={{ color: isRapid ? "#DC2626" : "#15803D" }}
          >
            {isRapid ? "RAPID CYCLING (SSRI TRIGGERED)" : "STANDARD BIPOLAR (TYPICAL)"}
          </h1>
        </div>
      </div>

      {/* MAIN INFOGRAPHIC CHART SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="wave-glow-s43" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="10"
              floodColor={isRapid ? "#DC2626" : "#22C55E"}
              floodOpacity={0.6}
            />
          </filter>
        </defs>

        {/* Chart Frame Box */}
        <rect x="220" y="240" width="1480" height="600" rx="16" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />

        {/* Horizontal Threshold Guidlines */}
        {/* Mania Zone (+100) */}
        <line x1="220" y1="360" x2="1700" y2="360" stroke="#FCA5A5" strokeWidth="2" strokeDasharray="6 6" />
        <text x="240" y="348" fill="#DC2626" fontSize="16" fontWeight="bold" letterSpacing="1">
          +100 PEAK MANIA
        </text>

        {/* Baseline (0) */}
        <line x1="220" y1="540" x2="1700" y2="540" stroke="#94A3B8" strokeWidth="2.5" />
        <text x="240" y="530" fill="#475569" fontSize="16" fontWeight="bold" letterSpacing="1">
          0 BASELINE EUTHYMIA
        </text>

        {/* Depression Zone (-100) */}
        <line x1="220" y1="720" x2="1700" y2="720" stroke="#93C5FD" strokeWidth="2" strokeDasharray="6 6" />
        <text x="240" y="742" fill="#2563EB" fontSize="16" fontWeight="bold" letterSpacing="1">
          -100 SEVERE DEPRESSION
        </text>

        {/* X-Axis Time Indicators */}
        <g transform="translate(0, 810)">
          {["MONTH 1", "MONTH 3", "MONTH 6", "MONTH 9", "MONTH 12"].map((label, idx) => {
            const xPos = 340 + idx * 310;
            return (
              <g key={idx} transform={`translate(${xPos}, 0)`}>
                <line x1="0" y1="-70" x2="0" y2="-60" stroke="#94A3B8" strokeWidth="2" />
                <text x="0" y="-40" textAnchor="middle" fill="#64748B" fontSize="14" fontWeight="bold">
                  {label}
                </text>
              </g>
            );
          })}
        </g>

        {/* DYNAMIC OSCILLATION WAVE PATH */}
        <path
          d={pathD}
          fill="none"
          stroke={isRapid ? "#DC2626" : "#22C55E"}
          strokeWidth={isRapid ? "6" : "5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#wave-glow-s43)"
        />

        {/* Current Moving Telemetry Head Dot */}
        <circle
          cx={points[points.length - 1]?.split(",")[0] || 1660}
          cy={points[points.length - 1]?.split(",")[1] || 540}
          r={isRapid ? "10" : "8"}
          fill={isRapid ? "#EF4444" : "#16A34A"}
          stroke="#FFFFFF"
          strokeWidth="3"
        />
      </svg>

      {/* FREQUENCY BADGE (Top Right of Chart) */}
      <div className="absolute top-[260px] right-[240px] pointer-events-none z-20">
        <div
          className="px-6 py-2 rounded-xl border shadow-md flex items-center gap-3 transition-all duration-300"
          style={{
            backgroundColor: isRapid ? "#FEF2F2" : "#F0FDF4",
            borderColor: isRapid ? "#FCA5A5" : "#86EFAC",
          }}
        >
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: isRapid ? "#DC2626" : "#22C55E" }}
          />
          <span
            className="text-sm font-black tracking-wider uppercase"
            style={{ color: isRapid ? "#991B1B" : "#166534" }}
          >
            {isRapid ? "FREQUENCY: ≥ 4-12+ CYCLES / YEAR" : "FREQUENCY: 1-2 CYCLES / YEAR"}
          </span>
        </div>
      </div>

      {/* 3. CLIMAX: GIANT WARNING OVERLAY BANNER */}
      {frame >= 150 && (
        <div
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-40 px-8"
          style={{
            transform: `scale(${warnScale})`,
            opacity: warnOpacity,
          }}
        >
          <div className="w-[840px] p-8 rounded-3xl bg-black/95 border-4 border-red-600 shadow-[0_0_60px_rgba(220,38,38,0.85)] text-center backdrop-blur-xl">
            <div className="inline-block px-6 py-1.5 rounded-full bg-red-600 text-white font-mono text-sm font-black tracking-widest uppercase mb-4">
              ⚠ CRITICAL CLINICAL WARNING
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-wider uppercase m-0 leading-tight">
              RAPID CYCLING INDUCED
            </h2>
            <p className="text-xl font-bold tracking-widest text-red-300 uppercase mt-4 mb-0">
              ANTIDEPRESSANT DESTABILIZATION CONDENSES CYCLES FROM YEARS INTO WEEKS
            </p>
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            DIAGNOSTIC CRITERIA: UNCHECKED MONOTHERAPY COMPRESSES POLAR SWITCHING TIME EXPONENTIALLY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
