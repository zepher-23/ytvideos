import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, MedicalPill } from "../../shared";

/**
 * Scene 36: Misdiagnosis Logic
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Split-screen layout: 100% bright off-white (#F8FAFC) on both sides.
 * - Characters & Props: Large central vector question mark (?), split cards (UNIPOLAR vs BIPOLAR),
 *   canonical CuratedStickman characters, central spinning 3D MedicalPill.
 * - Beginning (0-40f): Left side shows "UNIPOLAR" with sad stickman and floating blue pill. Right side muted.
 * - Action/Climax (40-110f): Right side reveals "BIPOLAR". Stickman shifts from sad to frantic screaming manic jitter.
 *   The standard blue pill glides into dead-center inside the question mark.
 * - Ending/Hold (110-180f): Pill continuously rotates in 3D, casting directional shadows.
 */
export const Scene036_MisdiagnosisLogic = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Right side Bipolar reveal
  const rightOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightScale = interpolate(frame, [35, 50], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right stickman transition from sad to manic at frame 65
  const isManic = frame >= 65;
  const manicJitterX = isManic ? Math.sin(frame * 1.8) * 8 : 0;
  const manicJitterY = isManic ? Math.cos(frame * 2.4) * 6 : 0;

  // Floating pill animation: Left side (x=480, y=550) -> Center (x=960, y=500)
  const pillX = interpolate(frame, [70, 105], [480, 960], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillY = interpolate(frame, [70, 105], [550, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillFloat = Math.sin(frame * 0.12) * 8;
  const pillSpin = frame < 70 ? -25 : -25 + (frame - 70) * 4.5;

  // Question mark glow & pulse
  const qPulse = 1 + Math.sin(frame * 0.08) * 0.03;

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-slate-900">
      {/* Background Subtle Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s36" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s36)" />
      </svg>

      {/* Center Divider Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-300 to-transparent pointer-events-none" />

      {/* Top Banner Header */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-2.5 rounded-2xl bg-white/90 border border-slate-300 shadow-md backdrop-blur-md">
          <span className="text-xs font-mono tracking-widest text-indigo-600 font-bold uppercase block text-center mb-0.5">
            CLINICAL DILEMMA
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-wide text-slate-800 m-0 uppercase text-center">
            MISDIAGNOSIS LOGIC
          </h1>
        </div>
      </div>

      {/* LEFT PANEL: UNIPOLAR */}
      <div className="absolute top-28 left-16 w-[780px] bottom-24 flex flex-col items-center">
        <div className="w-full text-center mb-6">
          <div className="inline-block px-6 py-2 rounded-xl bg-blue-100 border border-blue-300 shadow-sm">
            <h2 className="text-3xl font-black text-blue-900 tracking-wider m-0 uppercase">
              1. UNIPOLAR (MDD)
            </h2>
          </div>
          <p className="text-sm font-semibold text-slate-500 mt-2">Consistent Downward Depression</p>
        </div>

        {/* Left Stickman Display */}
        <div className="relative w-full h-[480px] flex justify-center items-end pb-8">
          <svg viewBox="0 0 600 480" className="w-full h-full overflow-visible">
            {/* Ground shadow */}
            <ellipse cx="300" cy="450" rx="110" ry="16" fill="#000000" opacity="0.12" />
            <CuratedStickman
              x={300}
              y={440}
              scale={0.95}
              pose="defeat"
              mouth="frown"
              eyes="defeat"
              slumpProgress={0.7}
              frame={frame}
            />
          </svg>
        </div>
      </div>

      {/* RIGHT PANEL: BIPOLAR */}
      <div
        className="absolute top-28 right-16 w-[780px] bottom-24 flex flex-col items-center"
        style={{
          opacity: rightOpacity,
          transform: `scale(${rightScale})`,
        }}
      >
        <div className="w-full text-center mb-6">
          <div className="inline-block px-6 py-2 rounded-xl bg-amber-100 border border-amber-400 shadow-sm">
            <h2 className="text-3xl font-black text-amber-900 tracking-wider m-0 uppercase">
              2. BIPOLAR DISORDER
            </h2>
          </div>
          <p className="text-sm font-semibold text-amber-700 mt-2">
            {isManic ? "FRANTIC MANIC CYCLING" : "Currently Depressed Phase"}
          </p>
        </div>

        {/* Right Stickman Display */}
        <div className="relative w-full h-[480px] flex justify-center items-end pb-8">
          <svg
            viewBox="0 0 600 480"
            className="w-full h-full overflow-visible"
            style={{
              transform: `translate(${manicJitterX}px, ${manicJitterY}px)`,
            }}
          >
            {/* Ground shadow */}
            <ellipse cx="300" cy="450" rx="110" ry="16" fill="#000000" opacity="0.12" />

            {!isManic ? (
              <CuratedStickman
                x={300}
                y={440}
                scale={0.95}
                pose="defeat"
                mouth="frown"
                eyes="defeat"
                slumpProgress={0.6}
                frame={frame}
              />
            ) : (
              <g>
                {/* Manic electric sparks / shock aura */}
                <circle cx="300" cy="220" r="140" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 8" opacity="0.6" />
                <CuratedStickman
                  x={300}
                  y={440}
                  scale={1.02}
                  pose="shock"
                  mouth="shock"
                  eyes="shock"
                  showExclamation={true}
                  recoilY={-15}
                  frame={frame}
                />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* CENTER STAGE: GIANT QUESTION MARK (?) & FLOATING PILL */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        {/* Giant Question Mark SVG */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <defs>
            <filter id="q-glow-s36" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#6366F1" floodOpacity="0.25" />
            </filter>
          </defs>

          <g
            transform={`translate(960, 480) scale(${qPulse}) translate(-960, -480)`}
            filter="url(#q-glow-s36)"
          >
            {/* Massive Vector Question Mark */}
            <text
              x="960"
              y="600"
              textAnchor="middle"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="4"
              fontSize="480"
              fontWeight="900"
              fontFamily="sans-serif"
              opacity="0.85"
            >
              ?
            </text>
          </g>

          {/* Dynamic Pill Shadow */}
          <ellipse
            cx={pillX}
            cy={pillY + 110}
            rx={42}
            ry={12}
            fill="#000000"
            opacity={frame >= 70 ? 0.25 : 0.15}
          />

          {/* Canonical 3D MedicalPill Component */}
          <g transform={`translate(0, ${pillFloat})`}>
            <MedicalPill
              x={pillX}
              y={pillY}
              scale={1.15}
              rotation={pillSpin}
              color1="#2563EB"
              color1Dark="#1E40AF"
              color2="#F8FAFC"
              color2Dark="#CBD5E1"
              imprint="SSRI"
              subImprint="20mg"
              glowing={true}
              glowColor="#3B82F6"
              glowRadius={24}
            />
          </g>
        </svg>
      </div>

      {/* Bottom Subtitle / Insight Pill */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-8 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-bold tracking-wider uppercase text-slate-100">
            ONE SYMPTOM: BOTH PRESENT AS DEPRESSION, BUT DEMAND OPPOSITE TREATMENTS
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
