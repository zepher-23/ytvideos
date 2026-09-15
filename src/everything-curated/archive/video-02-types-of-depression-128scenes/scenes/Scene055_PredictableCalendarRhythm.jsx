import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 55: Predictable Calendar Rhythm
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Warning warm gold background (#FEF08A) with slate timeline cards.
 * - Characters & Props: 12-month calendar matrix (Jan-Dec), seasonal mood curve (Summer peak vs Winter depression),
 *   animated tracing telemetry head, winter zone alert highlight boxes.
 * - Beginning (0-35f): 12-month calendar displays horizontally above clean timeline baseline.
 * - Action/Climax (35-120f): Dotted seasonal curve traces across the year: soaring peak in June/July,
 *   plunging into a deep valley in November/December/January.
 * - Ending/Hold (120-180f): Winter zone turns bright hostile red with alert callout.
 */
export const Scene055_PredictableCalendarRhythm = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  // Curve tracing progression (frames 30 to 115)
  const traceProgress = interpolate(frame, [30, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Winter highlight alert (frames 115+)
  const isWinterAlert = frame >= 115;
  const alertOpacity = interpolate(frame, [115, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Generate seasonal curve points
  // Mid-Summer (June/July, index ~5.5) has peak Y=400.
  // Deep Winter (Dec/Jan, index ~0 and ~11) has low Y=720.
  const startX = 260;
  const endX = 1660;
  const totalW = endX - startX;
  const numSteps = 120;
  const points = [];
  const maxStep = Math.floor(traceProgress * numSteps);

  for (let i = 0; i <= maxStep; i++) {
    const t = i / numSteps; // 0 to 1
    const x = startX + t * totalW;
    // Cosine function: at t=0 (Jan), cos(0)=1 -> valley. at t=0.5 (Jul), cos(pi)=-1 -> peak.
    const normH = -Math.cos(t * Math.PI * 2); // -1 in winter, +1 in summer
    const y = 560 - normH * 160; // 560 - 160 = 400 (summer), 560 + 160 = 720 (winter)
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const pathD = points.length > 1 ? `M ${points.join(" L ")}` : "";

  // Telemetry head coordinates
  const lastPoint = points[points.length - 1]?.split(",") || [startX, 720];
  const headX = parseFloat(lastPoint[0]);
  const headY = parseFloat(lastPoint[1]);

  return (
    <AbsoluteFill className="bg-[#FEF08A] overflow-hidden select-none font-sans text-slate-900">
      {/* Background Subtle Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s55" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s55)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-amber-600 shadow-xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase block mb-0.5">
            CHRONOBIOLOGICAL INEVITABILITY
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            PREDICTABLE CALENDAR RHYTHM
          </h1>
        </div>
      </div>

      {/* MAIN CALENDAR & TIMELINE STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="curve-glow-s55" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#DC2626" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Chart Frame Box */}
        <rect x="220" y="220" width="1480" height="620" rx="20" fill="#0F172A" stroke="#334155" strokeWidth="4" />

        {/* 12-MONTH HEADER TABS */}
        {months.map((m, idx) => {
          const mX = startX + (idx / 11) * totalW;
          const isWinterMonth = idx === 0 || idx === 1 || idx === 10 || idx === 11;
          const isSummerMonth = idx >= 4 && idx <= 7;

          return (
            <g key={idx} transform={`translate(${mX}, 270)`}>
              {/* Tab Background */}
              <rect
                x="-48"
                y="-25"
                width="96"
                height="45"
                rx="10"
                fill={
                  isWinterAlert && isWinterMonth
                    ? "#DC2626"
                    : isWinterMonth
                    ? "#1E3A8A"
                    : isSummerMonth
                    ? "#D97706"
                    : "#1E293B"
                }
                stroke={isWinterAlert && isWinterMonth ? "#EF4444" : "#475569"}
                strokeWidth="2"
              />
              <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" letterSpacing="1">
                {m}
              </text>
            </g>
          );
        })}

        {/* Horizontal Threshold Guideline Lines */}
        {/* Summer Euthymia Peak (+50) */}
        <line x1="240" y1="400" x2="1680" y2="400" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" />
        <text x="250" y="390" fill="#FBBF24" fontSize="14" fontWeight="bold">
          SUMMER ENTRAINMENT: HIGH LUX / STABLE MOOD
        </text>

        {/* Zero Baseline (560) */}
        <line x1="240" y1="560" x2="1680" y2="560" stroke="#64748B" strokeWidth="2" />
        <text x="250" y="550" fill="#94A3B8" fontSize="13" fontWeight="bold">
          EQUINOX TRANSITION
        </text>

        {/* Winter Depression Trench (-50) */}
        <line x1="240" y1="720" x2="1680" y2="720" stroke="#EF4444" strokeWidth="2" strokeDasharray="6 6" />
        <text x="250" y="742" fill="#F87171" fontSize="14" fontWeight="bold">
          WINTER DEPRESSION TRENCH: LOW LUX / CIRCADIAN COLLAPSE
        </text>

        {/* SEASONAL DOTTED CURVE */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#DC2626"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 6"
            filter="url(#curve-glow-s55)"
          />
        )}

        {/* TELEMETRY HEAD DOT */}
        {traceProgress > 0 && (
          <g transform={`translate(${headX}, ${headY})`}>
            <circle cx="0" cy="0" r="14" fill="#EF4444" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="0" cy="0" r="24" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.6" />
          </g>
        )}

        {/* WINTER ONSET WARNING CALLOUT (Right / Winter Zone) */}
        {isWinterAlert && (
          <g opacity={alertOpacity} transform="translate(1320, 640)">
            <rect x="0" y="0" width="340" height="75" rx="14" fill="#DC2626" stroke="#FECACA" strokeWidth="3" />
            <text x="170" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" letterSpacing="1">
              ⚠ PREDICTABLE WINTER ONSET
            </text>
            <text x="170" y="56" textAnchor="middle" fill="#FEF08A" fontSize="12" fontWeight="bold">
              ANNUAL NOVEMBER-FEBRUARY COLLAPSE
            </text>
          </g>
        )}
      </svg>

      {/* Bottom Medical Subtitle Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-amber-600 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-amber-200">
            CHRONIC PERIODICITY: UNLIKE RANDOM LIFE CRISES, SAD RECURS WITH CLOCKWORK ACCURACY AS DAYS SHORTEN
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
