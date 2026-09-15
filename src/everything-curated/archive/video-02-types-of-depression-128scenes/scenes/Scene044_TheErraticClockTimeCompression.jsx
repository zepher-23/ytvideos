import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 44: The Erratic Clock (Time Compression)
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Neutral steel-grey background (#1E293B).
 * - Characters & Props: Analogue clock face, CuratedStickman character switching between poles,
 *   melting clock heat distortion.
 * - Beginning (0-35f): Normal clock pace, stickman stands happily below.
 * - Action/Climax (35-120f): Clock hands accelerate into a wild spin. Stickman jerks between
 *   manic jumping and depressive crouching with each spin burst.
 * - Ending/Hold (120-180f): Clock overheats into intense glowing red/orange and visually melts downward.
 */
export const Scene044_TheErraticClockTimeCompression = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Clock Hand Rotation:
  // 0-35: normal ticking (0 to 180 deg)
  // 35-120: wild accelerating spin (thousands of degrees)
  // 120-180: continuous fiery blur
  let minuteAngle = 0;
  let hourAngle = 0;
  if (frame < 35) {
    minuteAngle = frame * 6;
    hourAngle = frame * 0.5;
  } else {
    const wildTime = frame - 35;
    minuteAngle = 210 + wildTime * 48;
    hourAngle = 17.5 + wildTime * 4;
  }

  // Stickman state switching every 22 frames once rapid cycling begins (frame >= 35)
  const isRapidActive = frame >= 35;
  const cycleIndex = Math.floor((frame - 35) / 22);
  const isManicCycle = isRapidActive && cycleIndex % 2 === 0;
  const isDepressedCycle = isRapidActive && cycleIndex % 2 === 1;

  // Melting heat effect starting at frame 120
  const isMelting = frame >= 120;
  const meltProgress = interpolate(frame, [120, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const meltY = meltProgress * 90;

  // Jitter during rapid cycling
  const jitterX = isRapidActive ? Math.sin(frame * 2.2) * 5 : 0;
  const jumpY = isManicCycle ? Math.abs(Math.sin(frame * 0.45)) * -24 : 0;

  return (
    <AbsoluteFill className="bg-[#1E293B] overflow-hidden select-none font-sans text-white">
      {/* Background Subtle Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isMelting
            ? "radial-gradient(circle at 50% 35%, rgba(239, 68, 68, 0.3) 0%, rgba(30, 41, 59, 1) 75%)"
            : "radial-gradient(circle at 50% 50%, rgba(51, 65, 85, 0.4) 0%, rgba(15, 23, 42, 1) 90%)",
        }}
      />

      {/* Floor Horizon Line */}
      <div className="absolute top-[820px] left-0 right-0 h-1 bg-slate-700/60" />

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase block mb-0.5">
            CIRCADIAN COLLAPSE
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            THE ERRATIC CLOCK: TIME COMPRESSION
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="clock-heat-s44" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation={isMelting ? 24 : 10}
              floodColor={isMelting ? "#EF4444" : "#F59E0B"}
              floodOpacity={isMelting ? 0.9 : 0.4}
            />
          </filter>
        </defs>

        {/* 1. ANALOGUE CLOCK (Center at x=960, y=340) */}
        <g
          transform={`translate(960, ${340 + meltY * 0.4})`}
          filter={isRapidActive ? "url(#clock-heat-s44)" : undefined}
        >
          {/* Clock Outer Rim */}
          <circle
            cx="0"
            cy="0"
            r="160"
            fill="#0F172A"
            stroke={isMelting ? "#EF4444" : "#F59E0B"}
            strokeWidth={isMelting ? "8" : "6"}
          />

          {/* Clock Inner Dial Face (warps when melting) */}
          <path
            d={
              isMelting
                ? `M -140 0 C -140 -140, 140 -140, 140 0 C 140 ${140 + meltY}, 0 ${160 + meltY * 1.5}, -140 ${140 + meltY} Z`
                : "M -140 0 A 140 140 0 1 0 140 0 A 140 140 0 1 0 -140 0 Z"
            }
            fill="#F8FAFC"
          />

          {/* 12 Hour Tick Marks */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * Math.PI) / 6;
            const x1 = Math.sin(angle) * 115;
            const y1 = -Math.cos(angle) * 115;
            const x2 = Math.sin(angle) * 135;
            const y2 = -Math.cos(angle) * 135;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#0F172A"
                strokeWidth={i % 3 === 0 ? "5" : "3"}
              />
            );
          })}

          {/* Rotating Hour Hand */}
          <line
            x1="0"
            y1="0"
            x2={Math.sin((hourAngle * Math.PI) / 180) * 75}
            y2={-Math.cos((hourAngle * Math.PI) / 180) * 75}
            stroke="#0F172A"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Wild Spinning Minute Hand */}
          <line
            x1="0"
            y1="0"
            x2={Math.sin((minuteAngle * Math.PI) / 180) * 115}
            y2={-Math.cos((minuteAngle * Math.PI) / 180) * 115}
            stroke={isRapidActive ? "#DC2626" : "#0F172A"}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Clock Center Cap */}
          <circle cx="0" cy="0" r="12" fill="#DC2626" />

          {/* Melting Droop Tendrils when frame >= 120 */}
          {isMelting && (
            <g>
              <path
                d={`M -40 140 Q 0 ${160 + meltY * 1.8} 10 ${180 + meltY * 2.2} Q -20 ${160 + meltY * 1.6} -40 140`}
                fill="#EF4444"
                opacity="0.85"
              />
              <path
                d={`M 40 140 Q 80 ${150 + meltY * 1.5} 60 ${190 + meltY * 2} Q 50 ${160 + meltY * 1.4} 40 140`}
                fill="#F97316"
                opacity="0.85"
              />
            </g>
          )}
        </g>

        {/* 2. CURATED STICKMAN SWITCHING BETWEEN POLES */}
        <g
          transform={`translate(${960 + jitterX}, ${815 + jumpY})`}
        >
          {/* Ground Shadow */}
          <ellipse cx="0" cy="5" rx="80" ry="14" fill="#000000" opacity="0.3" />

          {/* Stickman Model */}
          {!isRapidActive ? (
            /* Normal Initial State: Calm & Content */
            <CuratedStickman
              x={0}
              y={0}
              scale={1.05}
              pose="content"
              mouth="smile"
              eyes="normal"
              frame={frame}
            />
          ) : isManicCycle ? (
            /* Manic Jitter Spike: Shock pose, wild mouth, glowing halo */
            <g>
              <circle cx="0" cy="-110" r="85" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.7" />
              <CuratedStickman
                x={0}
                y={0}
                scale={1.08}
                pose="shock"
                mouth="shock"
                eyes="shock"
                showExclamation={true}
                frame={frame}
              />
            </g>
          ) : (
            /* Depressed Crash: Slump defeat, frown, defeat eyes */
            <CuratedStickman
              x={0}
              y={0}
              scale={1.0}
              pose="defeat"
              mouth="frown"
              eyes="defeat"
              slumpProgress={0.85}
              frame={frame}
            />
          )}
        </g>
      </svg>

      {/* STATE INDICATOR BADGE (Beside Stickman) */}
      {isRapidActive && (
        <div className="absolute top-[680px] right-[420px] pointer-events-none z-20">
          <div
            className="px-6 py-2.5 rounded-2xl border shadow-xl flex items-center gap-3 transition-colors duration-200"
            style={{
              backgroundColor: isManicCycle ? "#FEF3C7" : "#DBEAFE",
              borderColor: isManicCycle ? "#F59E0B" : "#3B82F6",
            }}
          >
            <span
              className="text-base font-black tracking-wider uppercase"
              style={{ color: isManicCycle ? "#92400E" : "#1E40AF" }}
            >
              {isManicCycle ? "⚡ MANIC PEAK (HIGH)" : "🌧 DEPRESSIVE PLUNGE (CRASH)"}
            </span>
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            CHRONOBIOLOGICAL DYSREGULATION: SSRI OVERSTIMULATION MELTS BIOLOGICAL CYCLES INTO ULTRA-RAPID CYCLING
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
