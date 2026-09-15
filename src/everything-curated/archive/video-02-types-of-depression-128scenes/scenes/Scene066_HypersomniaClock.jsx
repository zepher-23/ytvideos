import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 66: Hypersomnia Clock
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Dark bedroom aesthetic (#0B1120).
 * - Characters & Props: Stickman asleep in bed, spinning wall clock, exhausted wake-up,
 *   pulsing amber "LOW ENERGY" alert indicator.
 * - Beginning (0-35f): Stickman asleep under blankets; "SLEEPING 10+ HOURS" types.
 * - Action/Climax (35-100f): Wall clock hands spin wildly in time compression, passing 12+ simulated hours.
 * - Ending/Hold (100-180f): Stickman sits up looking completely exhausted; pulsing amber alert badge appears.
 */
export const Scene066_HypersomniaClock = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Clock wild spin after frame 30
  const isSpinning = frame >= 30;
  const clockAngle = !isSpinning ? frame * 4 : 120 + (frame - 30) * 36;

  // Wake up transition at frame 95
  const isAwake = frame >= 95;
  const wakeAge = Math.max(0, frame - 95);
  const wakeSpring = spring({
    frame: wakeAge,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const sitUpProgress = isAwake ? interpolate(wakeSpring, [0, 1], [0, 1]) : 0;

  // Pulsing alert badge
  const alertPulse = 1 + Math.sin(frame * 0.25) * 0.05;

  return (
    <AbsoluteFill className="bg-[#0B1120] overflow-hidden select-none font-sans text-white">
      {/* Background Subtle Wallpaper Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="bed-grid-s66" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bed-grid-s66)" />
      </svg>

      {/* Floor Line */}
      <div className="absolute top-[820px] left-0 right-0 h-1.5 bg-slate-800" />

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-purple-400 font-bold uppercase block mb-0.5">
            CHRONIC SOMNOLENCE
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            HYPERSOMNIA: SLEEPING 10+ HOURS
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="clock-glow-s66" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#38BDF8" floodOpacity="0.4" />
          </filter>
          <filter id="amber-alert-glow-s66" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#F59E0B" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. BEDROOM WALL CLOCK (Top Right x=1420, y=340) */}
        <g transform="translate(1420, 340)" filter="url(#clock-glow-s66)">
          <circle cx="0" cy="0" r="120" fill="#1E293B" stroke="#64748B" strokeWidth="8" />
          <circle cx="0" cy="0" r="105" fill="#F8FAFC" />

          {/* 12 Hour Marks */}
          {[...Array(12)].map((_, i) => {
            const rad = (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={Math.sin(rad) * 85}
                y1={-Math.cos(rad) * 85}
                x2={Math.sin(rad) * 98}
                y2={-Math.cos(rad) * 98}
                stroke="#0F172A"
                strokeWidth={i % 3 === 0 ? "5" : "3"}
              />
            );
          })}

          {/* Rapid Spinning Minute Hand */}
          <line
            x1="0"
            y1="0"
            x2={Math.sin((clockAngle * Math.PI) / 180) * 85}
            y2={-Math.cos((clockAngle * Math.PI) / 180) * 85}
            stroke="#DC2626"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Hour Hand */}
          <line
            x1="0"
            y1="0"
            x2={Math.sin(((clockAngle / 12) * Math.PI) / 180) * 55}
            y2={-Math.cos(((clockAngle / 12) * Math.PI) / 180) * 55}
            stroke="#0F172A"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="8" fill="#DC2626" />

          {/* Clock Sub-badge */}
          <rect x="-80" y="45" width="160" height="28" rx="6" fill="#0F172A" />
          <text x="0" y="64" textAnchor="middle" fill="#38BDF8" fontSize="13" fontWeight="bold" fontFamily="monospace">
            12+ HOURS
          </text>
        </g>

        {/* 2. BED & STICKMAN (Center Left x=380 to 1050, y=810) */}
        {/* Bed Headboard */}
        <rect x="360" y="560" width="40" height="250" rx="8" fill="#334155" stroke="#475569" strokeWidth="4" />
        {/* Mattress Frame */}
        <rect x="380" y="720" width="580" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="3" />
        {/* White Pillow */}
        <rect x="410" y="690" width="130" height="50" rx="14" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="3" />

        {/* STICKMAN IN BED */}
        {!isAwake ? (
          /* Sleeping Horizontal Position */
          <g transform="translate(560, 710) rotate(85)">
            <CuratedStickman
              x={0}
              y={0}
              scale={0.95}
              pose="defeat"
              mouth="flat"
              eyes="defeat"
              frame={frame}
            />
            {/* Floating "Z z z" */}
            {[...Array(3)].map((_, i) => {
              const zAge = ((frame + i * 20) % 60) / 60;
              return (
                <text
                  key={i}
                  x={120 + zAge * 40}
                  y={-50 - zAge * 80}
                  fill="#94A3B8"
                  fontSize={18 + i * 6}
                  fontWeight="bold"
                  opacity={1 - zAge}
                  transform="rotate(-85)"
                >
                  Z
                </text>
              );
            })}
          </g>
        ) : (
          /* Sitting Up Exhausted */
          <g transform={`translate(520, ${760 - sitUpProgress * 40})`}>
            <CuratedStickman
              x={0}
              y={0}
              scale={1.05}
              pose="defeat"
              mouth="frown"
              eyes="defeat"
              slumpProgress={0.8}
              frame={frame}
            />
            {/* Exhaustion Dark Eye Bags */}
            <ellipse cx="-12" cy="-94" rx="7" ry="3" fill="#64748B" opacity="0.6" />
            <ellipse cx="12" cy="-94" rx="7" ry="3" fill="#64748B" opacity="0.6" />
          </g>
        )}

        {/* Quilt Blanket Covering Legs */}
        <path
          d="M 520 730 L 950 730 L 950 810 L 500 810 Z"
          fill="#475569"
          stroke="#64748B"
          strokeWidth="3"
        />

        {/* 3. "LOW ENERGY" ALERT BADGE (When Awakened at frame >= 95) */}
        {isAwake && (
          <g
            transform={`translate(520, 520) scale(${alertPulse})`}
            filter="url(#amber-alert-glow-s66)"
          >
            <rect x="-140" y="-25" width="280" height="50" rx="14" fill="#0F172A" stroke="#F59E0B" strokeWidth="3" />
            <text x="0" y="6" textAnchor="middle" fill="#FEF08A" fontSize="16" fontWeight="900" letterSpacing="1">
              ⚡ NON-RESTORATIVE SLEEP
            </text>
          </g>
        )}
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-purple-500/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-purple-200">
            HYPERSOMNIA PARADOX: EXCESSIVE SLEEP (10-14+ HOURS) FAILS TO RESTORE ENERGY, LEAVING SEVERE COGNITIVE INERTIA
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
