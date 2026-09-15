import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MedicalPill } from "../../shared";

/**
 * Scene 41: Fueling the Fire (SSRI impact)
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Dark background (#080000) with roaring flame bed.
 * - Characters & Props: Multi-layer vector flames shifting from amber to hostile crimson.
 *   Multiple falling Blue Pills labeled "FUEL" that crash into flames, triggering flame spikes.
 * - Ending/Hold: Giant vibrating red outline alert box labeled "SSRI MISDIAGNOSIS" slams over flames.
 */
export const Scene041_FuelingtheFireSSRIimpact = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // 5 Staggered Falling Pills
  const pills = [
    { x: 480, startF: 20, landF: 45, rot: 25 },
    { x: 820, startF: 35, landF: 60, rot: -35 },
    { x: 1180, startF: 50, landF: 75, rot: 15 },
    { x: 650, startF: 65, landF: 90, rot: -20 },
    { x: 1400, startF: 80, landF: 105, rot: 40 },
  ];

  // Number of impacts so far
  const impactsCount = pills.filter((p) => frame >= p.landF).length;

  // Heat shift: color tone becomes more hostile red with each impact
  const heatFactor = Math.min(1, impactsCount * 0.22);
  const flameHeightMultiplier = 1 + impactsCount * 0.16;

  // Giant Warning Box Slam at frame 115
  const boxFrame = Math.max(0, frame - 115);
  const boxSpring = spring({
    frame: boxFrame,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const boxScale = frame < 115 ? 0 : interpolate(boxSpring, [0, 1], [2.2, 1]);
  const boxOpacity = interpolate(boxFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  // Continuous box vibration
  const boxVibrate = frame >= 115 ? Math.sin(frame * 2.8) * 4 : 0;

  // Flame oscillation math
  const f1 = Math.sin(frame * 0.5) * 35;
  const f2 = Math.cos(frame * 0.42 + 1.2) * 40;
  const f3 = Math.sin(frame * 0.58 + 2.4) * 30;

  return (
    <AbsoluteFill className="bg-[#050000] overflow-hidden select-none font-sans text-white">
      {/* Dynamic Background Crimson Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 50% 80%, rgba(${Math.round(180 + heatFactor * 75)}, 20, 20, ${0.45 + heatFactor * 0.4}) 0%, rgba(0,0,0,0.95) 85%)`,
        }}
      />

      {/* Top Header */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-2.5 rounded-2xl bg-black/85 border border-red-800 shadow-xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-red-400 font-bold uppercase block mb-0.5">
            CASCADING DESTABILIZATION
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            FUELING THE FIRE
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="flame-glow-s41" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="-10" stdDeviation="25" floodColor={heatFactor > 0.5 ? "#DC2626" : "#EA580C"} floodOpacity="0.85" />
          </filter>
        </defs>

        {/* 1. RAGING FLAME BED (Scales up with each impact) */}
        <g
          transform={`translate(960, 960) scale(1, ${flameHeightMultiplier}) translate(-960, -960)`}
          filter="url(#flame-glow-s41)"
        >
          {/* Deep Red Flame Tongue Base */}
          <path
            d={`M 0 960 
                Q 250 ${520 + f1}, 520 ${380 + f2} 
                Q 800 ${560 + f3}, 960 ${280 + f1} 
                Q 1200 ${540 + f2}, 1480 ${400 + f3} 
                Q 1720 ${580 + f1}, 1920 960 Z`}
            fill={heatFactor > 0.5 ? "#991B1B" : "#B91C1C"}
            opacity="0.85"
          />

          {/* Hot Hostile Crimson Mid Tongues */}
          <path
            d={`M 80 960 
                Q 350 ${620 + f2}, 640 ${460 + f1} 
                Q 860 ${650 + f3}, 960 ${380 + f2} 
                Q 1150 ${620 + f1}, 1380 ${480 + f3} 
                Q 1650 ${680 + f2}, 1840 960 Z`}
            fill={heatFactor > 0.5 ? "#DC2626" : "#EA580C"}
            opacity="0.9"
          />

          {/* Core Fire Crest */}
          <path
            d={`M 280 960 
                Q 520 ${720 + f3}, 780 ${560 + f2} 
                Q 960 ${480 + f1}, 1200 ${580 + f3} 
                Q 1450 ${740 + f2}, 1660 960 Z`}
            fill={heatFactor > 0.5 ? "#EF4444" : "#F59E0B"}
            opacity="0.95"
          />
        </g>

        {/* 2. RAINING BLUE PILLS LABELED "FUEL" */}
        {pills.map((p, idx) => {
          if (frame < p.startF) return null;
          const progress = interpolate(frame, [p.startF, p.landF], [0, 1], {
            extrapolateRight: "clamp",
          });
          const currY = interpolate(progress, [0, 1], [-80, 820]);
          const isLanded = frame >= p.landF;
          const opacity = isLanded ? interpolate(frame, [p.landF, p.landF + 10], [1, 0], { extrapolateRight: "clamp" }) : 1;

          if (opacity <= 0) return null;

          return (
            <g key={idx} opacity={opacity}>
              {/* Pill Container */}
              <MedicalPill
                x={p.x}
                y={currY}
                scale={0.95}
                rotation={p.rot + progress * 90}
                color1="#2563EB"
                color1Dark="#1D4ED8"
                color2="#F8FAFC"
                color2Dark="#CBD5E1"
                imprint="FUEL"
                subImprint="SSRI"
                glowing={true}
                glowColor="#3B82F6"
                glowRadius={20}
              />
              {/* "FUEL" Badge on pill */}
              <rect x={p.x - 30} y={currY - 45} width="60" height="22" rx="6" fill="#1E40AF" stroke="#60A5FA" strokeWidth="1.5" />
              <text x={p.x} y={currY - 30} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" letterSpacing="1">
                + FUEL
              </text>
            </g>
          );
        })}

        {/* Floating Sparks */}
        {[...Array(18)].map((_, i) => {
          const sparkY = 960 - ((frame * 14 + i * 50) % 900);
          const sparkX = ((i * 107) % 1920) + Math.sin(frame * 0.2 + i) * 35;
          return (
            <circle
              key={i}
              cx={sparkX}
              cy={sparkY}
              r={(i % 3) + 2}
              fill={i % 2 === 0 ? "#FEF08A" : "#EF4444"}
              opacity={0.8}
            />
          );
        })}
      </svg>

      {/* 3. CLIMAX: GIANT VIBRATING RED OUTLINE ALERT BOX "SSRI MISDIAGNOSIS" */}
      {frame >= 115 && (
        <div
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-40 px-6"
          style={{
            opacity: boxOpacity,
            transform: `scale(${boxScale}) translate(${boxVibrate}px, 0px)`,
          }}
        >
          <div className="w-[880px] p-8 rounded-3xl bg-black/95 border-4 border-red-600 shadow-[0_0_60px_rgba(220,38,38,0.85)] text-center relative overflow-hidden backdrop-blur-xl">
            {/* Top Alert Tag */}
            <div className="inline-block px-6 py-1.5 rounded-full bg-red-600 text-white font-mono text-sm font-black tracking-widest uppercase mb-4 shadow-lg">
              ⚠ CRITICAL CONTRAINDICATION
            </div>

            {/* Giant Title */}
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-wider uppercase m-0 leading-tight drop-shadow-[0_0_20px_#EF4444]">
              SSRI MISDIAGNOSIS
            </h2>

            {/* Subtext */}
            <p className="text-xl font-bold tracking-widest text-red-300 uppercase mt-4 mb-0">
              ADDING UNOPPOSED SEROTONIN DIRECTLY FUELS LATENT MANIC OSCILLATIONS
            </p>
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-red-800/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
            PHARMACOLOGIC MANIC SWITCH: UNTREATED BIPOLAR ACCELERATED BY SSRI MONOTHERAPY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
