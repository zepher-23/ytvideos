import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 122: standard Medicine Fails diagram
 * Duration: 180 frames (6.0s)
 * Environment: High-tech digital blueprint aesthetic.
 * Characters & Props: A balance scale, biology icon, chemistry icon.
 * Action:
 * - Beginning: A balanced scale is drawn. Left side: Vector icon for Biology (DNA helix). Right side: Vector icon for Chemistry (beaker). Text "Standard Medicine" types.
 * - Action / Climax: The Biology side (DNA) turns red, jagged, and grows massive. It violently smashes the Chemistry side (Beaker) off the scale entirely.
 * - Ending / Hold: A flashing red "X" stamps over the broken beaker.
 * Text & Specific Colors: Biology helix glows red (#EF4444). Chemistry beaker was blue (#3B82F6). Scanner blueprint lines cyan (#22D3EE).
 */
export const Scene122_standardMedicineFailsdiagram = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const entranceScale = interpolate(enterSpring, [0, 1], [0.92, 1]);

  // Typing header (frames 0 to 40)
  const titleText = "Standard Medicine";
  const typedCount = Math.floor(
    interpolate(frame, [5, 45], [0, titleText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentTitle = titleText.slice(0, typedCount);

  // Climax action: frames 45 to 85
  // Left DNA grows massive and turns red; scale tilts violently
  const smashProgress = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const smashSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 8, stiffness: 180 },
  });

  // Scale tilt angle (-28 degrees)
  const scaleTilt = interpolate(smashSpring, [0, 1], [0, 26]);

  // DNA growth and color
  const dnaScale = interpolate(smashSpring, [0, 1], [1, 1.75]);
  const isRedDna = frame >= 48;

  // Catapulted Beaker trajectory (flies off scale from frame 60 onwards)
  const beakerFlyProgress = interpolate(frame, [60, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const beakerX = interpolate(beakerFlyProgress, [0, 1], [1340, 1750]);
  const beakerY = interpolate(beakerFlyProgress, [0, 0.4, 1], [500, 240, 850]);
  const beakerRot = interpolate(beakerFlyProgress, [0, 1], [0, 420]);
  const beakerOpacity = interpolate(beakerFlyProgress, [0, 0.8, 1], [1, 1, 0]);

  // Flashing Red "X" stamp over right pan: begins at frame 90
  const stampSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [2.8, 1]);
  const stampOpacity = interpolate(frame, [90, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const xFlash = frame >= 95 ? Math.sin(frame * 0.4) > 0 ? 1 : 0.4 : 1;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Blueprint Grid Lines Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #22D3EE 1px, transparent 1px), linear-gradient(to bottom, #22D3EE 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Header Container with Deterministic Containment */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: entranceOpacity,
          transform: `scale(${entranceScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-3xl flex flex-col items-center"
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.85)",
            border: "1.5px solid #22D3EE",
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.2)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-cyan-600 text-slate-950">
              Comparative Mechanism
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-400">
              Biology vs. Exogenous Chemistry
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-white">
            {currentTitle}
            {typedCount < titleText.length && (
              <span className="animate-pulse ml-1 text-cyan-400">|</span>
            )}
          </h1>
          <p className="text-sm font-semibold text-slate-300 m-0">
            Pathological neurobiology overwhelms standard molecular pharmacology
          </p>
        </div>
      </div>

      {/* Main SVG Blueprint Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <linearGradient id="cyanBeamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          <filter id="redDnaGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- CENTRAL FULCRUM & BASE (Center: 960, 560 to 780) --- */}
        <g id="scaleFulcrum" transform="translate(960, 560)">
          {/* Base Stand Plate */}
          <rect x={-120} y={190} width={240} height={20} rx={4} fill="#334155" stroke="#22D3EE" strokeWidth={2} />
          {/* Vertical Column */}
          <rect x={-14} y={0} width={28} height={190} fill="#1E293B" stroke="#475569" strokeWidth={2.5} />
          {/* Pivot Fulcrum Triangle */}
          <polygon points="0,0 -30,60 30,60" fill="#22D3EE" stroke="#0891B2" strokeWidth={2} />
          <circle cx={0} cy={0} r={10} fill="#F8FAFC" stroke="#0F172A" strokeWidth={3} />
        </g>

        {/* --- TILTING BALANCE BEAM (Rotates at 960, 560) --- */}
        <g transform={`translate(960, 560) rotate(${scaleTilt})`}>
          {/* Main Horizontal Beam */}
          <rect x={-420} y={-8} width={840} height={16} rx={6} fill="url(#cyanBeamGrad)" stroke="#0891B2" strokeWidth={2} />

          {/* Left Pan Suspension Cords (Biology / DNA) */}
          <g transform="translate(-380, 0)">
            <line x1={0} y1={8} x2={-50} y2={100} stroke="#94A3B8" strokeWidth={2.5} />
            <line x1={0} y1={8} x2={50} y2={100} stroke="#94A3B8" strokeWidth={2.5} />
            {/* Pan Plate */}
            <path d="M -70 100 Q 0 125 70 100 Z" fill="#334155" stroke="#22D3EE" strokeWidth={2.5} />

            {/* BIOLOGY: DNA DOUBLE HELIX ICON */}
            <g
              transform={`translate(0, 40) scale(${dnaScale})`}
              filter={isRedDna ? "url(#redDnaGlow)" : "none"}
            >
              <ellipse cx={0} cy={10} rx={25} ry={6} fill="#000000" opacity={0.3} />
              {/* DNA Strands */}
              <path
                d="M -22 -40 Q 0 -20 22 0 Q 0 20 -22 40"
                fill="none"
                stroke={isRedDna ? "#EF4444" : "#22D3EE"}
                strokeWidth={isRedDna ? 6 : 4}
                strokeLinecap="round"
              />
              <path
                d="M 22 -40 Q 0 -20 -22 0 Q 0 20 22 40"
                fill="none"
                stroke={isRedDna ? "#EF4444" : "#22D3EE"}
                strokeWidth={isRedDna ? 6 : 4}
                strokeLinecap="round"
              />
              {/* Base Pair Rungs */}
              {[-30, -15, 0, 15, 30].map((ry) => (
                <line
                  key={ry}
                  x1={-16}
                  y1={ry}
                  x2={16}
                  y2={ry}
                  stroke={isRedDna ? "#F87171" : "#A5F3FC"}
                  strokeWidth={isRedDna ? 4 : 2.5}
                />
              ))}

              {/* Label */}
              <text
                x={0}
                y={65}
                textAnchor="middle"
                fill={isRedDna ? "#EF4444" : "#22D3EE"}
                fontSize={12}
                fontWeight="900"
                letterSpacing={1.5}
              >
                BIOLOGY
              </text>
            </g>
          </g>

          {/* Right Pan Suspension Cords (Chemistry / Beaker) */}
          <g transform="translate(380, 0)">
            <line x1={0} y1={8} x2={-50} y2={100} stroke="#94A3B8" strokeWidth={2.5} />
            <line x1={0} y1={8} x2={50} y2={100} stroke="#94A3B8" strokeWidth={2.5} />
            {/* Pan Plate */}
            <path d="M -70 100 Q 0 125 70 100 Z" fill="#334155" stroke="#22D3EE" strokeWidth={2.5} />
          </g>
        </g>

        {/* --- CHEMISTRY BEAKER (In Pan pre-climax, then catapulted away) --- */}
        {frame < 60 ? (
          <g transform="translate(1340, 580)">
            {/* Chemistry Beaker */}
            <path
              d="M -16 -40 L -16 -30 L -30 25 Q -30 35 -20 35 L 20 35 Q 30 35 30 25 L 16 -30 L 16 -40 Z"
              fill="rgba(59, 130, 246, 0.15)"
              stroke="#3B82F6"
              strokeWidth={3}
            />
            {/* Blue Liquid inside */}
            <path
              d="M -26 10 Q 0 15 26 10 L 22 32 L -22 32 Z"
              fill="#3B82F6"
              opacity={0.8}
            />
            {/* Bubbles */}
            <circle cx={-6} cy={20} r={3} fill="#93C5FD" />
            <circle cx={8} cy={16} r={2.5} fill="#93C5FD" />

            <text x={0} y={55} textAnchor="middle" fill="#3B82F6" fontSize={12} fontWeight="900" letterSpacing={1.5}>
              CHEMISTRY
            </text>
          </g>
        ) : (
          /* Catapulted Flying Beaker */
          beakerOpacity > 0 && (
            <g
              transform={`translate(${beakerX}, ${beakerY}) rotate(${beakerRot})`}
              style={{ opacity: beakerOpacity }}
            >
              <path
                d="M -16 -40 L -16 -30 L -30 25 Q -30 35 -20 35 L 20 35 Q 30 35 30 25 L 16 -30 L 16 -40 Z"
                fill="rgba(59, 130, 246, 0.2)"
                stroke="#3B82F6"
                strokeWidth={3}
              />
              <path d="M -26 10 Q 0 15 26 10 L 22 32 L -22 32 Z" fill="#3B82F6" opacity={0.7} />
              {/* Flying Shards */}
              <polygon points="10,-50 25,-60 15,-40" fill="#93C5FD" />
              <polygon points="-25,-40 -40,-45 -30,-25" fill="#93C5FD" />
              <circle cx={35} cy={-20} r={5} fill="#3B82F6" />
              <circle cx={-20} cy={-60} r={4} fill="#3B82F6" />
            </g>
          )
        )}

        {/* --- FLASHING RED "X" OVER BROKEN BEAKER POSITION --- */}
        {stampOpacity > 0.01 && (
          <g
            transform={`translate(1380, 440) scale(${stampScale})`}
            style={{ opacity: stampOpacity * xFlash }}
          >
            <circle cx={0} cy={0} r={65} fill="#DC2626" stroke="#991B1B" strokeWidth={4} />
            <line x1={-32} y1={-32} x2={32} y2={32} stroke="#FFFFFF" strokeWidth={11} strokeLinecap="round" />
            <line x1={32} y1={-32} x2={-32} y2={32} stroke="#FFFFFF" strokeWidth={11} strokeLinecap="round" />
            <rect x={-80} y={75} width={160} height={30} rx={6} fill="#DC2626" />
            <text x={0} y={95} textAnchor="middle" fill="#FFFFFF" fontSize={14} fontWeight="900" letterSpacing={2}>
              CHEMISTRY FAILS
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
