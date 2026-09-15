import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 120: The Failed Trials Flowchart
 * Duration: 240 frames (8.0s)
 * Environment: Infographic flowchart on a clean white background.
 * Characters & Props: Flowchart logic boxes.
 * Action:
 * - Beginning: A flowchart box labeled "TRIAL 1 (SSRI)" attempts to draw a path downwards.
 * - Action / Climax: The path slams into a giant RED X labeled "FAILURE". A second path from a box labeled "TRIAL 2 (SNRI)" is drawn. It also slams into a giant RED X labeled "FAILURE". Both failed paths converge downward.
 * - Ending / Hold: They enter a final, heavy, solid black box at the bottom labeled "TRD" which locks with a "thud".
 * Text & Specific Colors: Trial boxes blue/yellow (#3B82F6/#F59E0B). Failure X's red (#DC2626). TRD box black (#000000).
 */
export const Scene120_TheFailedTrialsFlowchart = () => {
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

  // Path 1 (Trial 1 -> Failure 1): frames 15 to 45
  const path1Progress = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const failure1Spring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const failure1Scale = interpolate(failure1Spring, [0, 1], [2.2, 1]);
  const failure1Opacity = interpolate(frame, [45, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Path 2 (Trial 2 -> Failure 2): frames 60 to 90
  const path2Progress = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const failure2Spring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const failure2Scale = interpolate(failure2Spring, [0, 1], [2.2, 1]);
  const failure2Opacity = interpolate(frame, [90, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Convergence Paths (Failure 1 & 2 -> Bottom Center TRD Box): frames 110 to 150
  const convergeProgress = interpolate(frame, [110, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // TRD Black Box Lock Slam: frame 150
  const trdSpring = spring({
    frame: frame - 150,
    fps,
    config: { damping: 11, stiffness: 200 },
  });
  const trdScale = interpolate(trdSpring, [0, 1], [2.4, 1]);
  const trdOpacity = interpolate(frame, [150, 156], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Metallic Thud Shake
  const thudShake = frame >= 150 && frame < 170 ? Math.sin(frame * 2.5) * 8 : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F8FAFC",
        transform: `translate(0px, ${thudShake}px)`,
      }}
    >
      {/* Background Subtle Blueprint Dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#94A3B8 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Header Container with Deterministic Containment */}
      <div
        className="absolute top-8 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: entranceOpacity,
          transform: `scale(${entranceScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-3xl flex flex-col items-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1.5px solid #CBD5E1",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-slate-900 text-white">
              Clinical Flowchart
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-500">
              TRD Operational Definition
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-slate-900">
            Sequential Trial Failure Flowchart
          </h1>
        </div>
      </div>

      {/* Main SVG Flowchart Network */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <filter id="boxShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* --- TRIAL 1 (SSRI) BOX (x: 520, y: 220) --- */}
        <g transform="translate(520, 220)" filter="url(#boxShadow)">
          <rect
            x={-190}
            y={0}
            width={380}
            height={130}
            rx={16}
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth={3.5}
          />
          <text x={0} y={42} textAnchor="middle" fill="#FFFFFF" fontSize={26} fontWeight="900" letterSpacing={2}>
            TRIAL 1 (SSRI)
          </text>
          <text x={0} y={75} textAnchor="middle" fill="#DBEAFE" fontSize={16} fontWeight="bold">
            Escitalopram / Sertraline
          </text>
          <text x={0} y={105} textAnchor="middle" fill="#BFDBFE" fontSize={13} fontWeight="semibold">
            6-8 WEEKS &bull; MAX DOSE
          </text>
        </g>

        {/* --- TRIAL 2 (SNRI) BOX (x: 1400, y: 220) --- */}
        <g transform="translate(1400, 220)" filter="url(#boxShadow)">
          <rect
            x={-190}
            y={0}
            width={380}
            height={130}
            rx={16}
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth={3.5}
          />
          <text x={0} y={42} textAnchor="middle" fill="#FFFFFF" fontSize={26} fontWeight="900" letterSpacing={2}>
            TRIAL 2 (SNRI)
          </text>
          <text x={0} y={75} textAnchor="middle" fill="#FEF3C7" fontSize={16} fontWeight="bold">
            Venlafaxine / Duloxetine
          </text>
          <text x={0} y={105} textAnchor="middle" fill="#FDE68A" fontSize={13} fontWeight="semibold">
            6-8 WEEKS &bull; ALTERNATE CLASS
          </text>
        </g>

        {/* --- PATH 1: FROM TRIAL 1 DOWNWARD --- */}
        <line
          x1={520}
          y1={350}
          x2={520}
          y2={350 + path1Progress * 130}
          stroke="#3B82F6"
          strokeWidth={6}
          strokeLinecap="round"
        />

        {/* --- FAILURE 1 GIANT RED X (x: 520, y: 520) --- */}
        {failure1Opacity > 0.01 && (
          <g
            transform={`translate(520, 520) scale(${failure1Scale})`}
            style={{ opacity: failure1Opacity }}
          >
            {/* Red Badge */}
            <circle cx={0} cy={0} r={55} fill="#DC2626" stroke="#991B1B" strokeWidth={4} />
            {/* Bold White X */}
            <line x1={-26} y1={-26} x2={26} y2={26} stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" />
            <line x1={26} y1={-26} x2={-26} y2={26} stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" />
            {/* Banner */}
            <rect x={-65} y={64} width={130} height={28} rx={6} fill="#DC2626" />
            <text x={0} y={83} textAnchor="middle" fill="#FFFFFF" fontSize={14} fontWeight="900" letterSpacing={2}>
              FAILURE
            </text>
          </g>
        )}

        {/* --- PATH 2: FROM TRIAL 2 DOWNWARD --- */}
        <line
          x1={1400}
          y1={350}
          x2={1400}
          y2={350 + path2Progress * 130}
          stroke="#F59E0B"
          strokeWidth={6}
          strokeLinecap="round"
        />

        {/* --- FAILURE 2 GIANT RED X (x: 1400, y: 520) --- */}
        {failure2Opacity > 0.01 && (
          <g
            transform={`translate(1400, 520) scale(${failure2Scale})`}
            style={{ opacity: failure2Opacity }}
          >
            {/* Red Badge */}
            <circle cx={0} cy={0} r={55} fill="#DC2626" stroke="#991B1B" strokeWidth={4} />
            {/* Bold White X */}
            <line x1={-26} y1={-26} x2={26} y2={26} stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" />
            <line x1={26} y1={-26} x2={-26} y2={26} stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" />
            {/* Banner */}
            <rect x={-65} y={64} width={130} height={28} rx={6} fill="#DC2626" />
            <text x={0} y={83} textAnchor="middle" fill="#FFFFFF" fontSize={14} fontWeight="900" letterSpacing={2}>
              FAILURE
            </text>
          </g>
        )}

        {/* --- CONVERGENCE PATHS TO CENTER BOTTOM --- */}
        {convergeProgress > 0 && (
          <g>
            {/* Path from Failure 1 to TRD Box */}
            <path
              d="M 520 620 C 520 720 900 710 930 740"
              fill="none"
              stroke="#DC2626"
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray="450"
              strokeDashoffset={interpolate(convergeProgress, [0, 1], [450, 0])}
            />
            {/* Path from Failure 2 to TRD Box */}
            <path
              d="M 1400 620 C 1400 720 1020 710 990 740"
              fill="none"
              stroke="#DC2626"
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray="450"
              strokeDashoffset={interpolate(convergeProgress, [0, 1], [450, 0])}
            />
          </g>
        )}

        {/* --- FINAL HEAVY SOLID BLACK TRD BOX (Center: 960, y: 740 to 900) --- */}
        {trdOpacity > 0.01 && (
          <g
            transform={`translate(960, 830) scale(${trdScale})`}
            style={{ opacity: trdOpacity }}
          >
            {/* Black Container Box */}
            <rect
              x={-300}
              y={-75}
              width={600}
              height={150}
              rx={20}
              fill="#000000"
              stroke="#DC2626"
              strokeWidth={4}
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7))",
              }}
            />

            {/* Lock Icon */}
            <g transform="translate(-230, -5)">
              <rect x={-18} y={-4} width={36} height={30} rx={4} fill="#EF4444" />
              <path
                d="M -12 -4 L -12 -16 A 12 12 0 0 1 12 -16 L 12 -4"
                fill="none"
                stroke="#EF4444"
                strokeWidth={5}
              />
              <circle cx={0} cy={8} r={4} fill="#000000" />
            </g>

            {/* TRD Title */}
            <text x={20} y={-10} textAnchor="middle" fill="#FFFFFF" fontSize={38} fontWeight="900" letterSpacing={3}>
              TRD DIAGNOSED
            </text>
            <text x={20} y={32} textAnchor="middle" fill="#EF4444" fontSize={16} fontWeight="bold" letterSpacing={1.5}>
              2+ FAILED TRIALS &bull; NON-RESPONSIVE
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
