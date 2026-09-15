import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 121: TRD Padlock and Chains (Hold)
 * Duration: 180 frames (6.0s)
 * Environment: The infographic background from Scene 120.
 * Transition: Scale out from the TRD box, which transforms back into the locked pill bottle from Scene 115.
 * Characters & Props: Locked prescription pill bottle.
 * Action:
 * - Beginning: The prescription pill bottle is centered, heavily wrapped in iron chains and secured with the massive padlock from Scene 115.
 * - Action / Climax: Heavy grey visual smoke rises around the bottle. The overall scene dims slightly to emphasize futility. Text "REMISSION FAILED" types slowly.
 * - Ending / Hold: Scene holds static on the locked bottle.
 * Text & Specific Colors: Chains dark slate (#334155). Padlock slate grey (#64748B). Text red (#EF4444).
 */
export const Scene121_TRDPadlockandChainsHold = () => {
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

  // Overall dimming progression to emphasize futility: frames 20 to 90
  const dimOpacity = interpolate(frame, [20, 90], [0, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow typing effect for "REMISSION FAILED" (frames 40 to 110)
  const titleText = "REMISSION FAILED";
  const typedCount = Math.floor(
    interpolate(frame, [40, 110], [0, titleText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentTitle = titleText.slice(0, typedCount);

  // Heavy grey smoke particles drifting upward
  const smokePuffs = [
    { x: -90, yOffset: 0, speed: 2.2, r: 42, delay: 0 },
    { x: 80, yOffset: 25, speed: 2.6, r: 48, delay: 12 },
    { x: -30, yOffset: 60, speed: 2.0, r: 55, delay: 24 },
    { x: 110, yOffset: 15, speed: 2.8, r: 45, delay: 36 },
    { x: -110, yOffset: 70, speed: 2.4, r: 50, delay: 48 },
    { x: 30, yOffset: 45, speed: 2.1, r: 58, delay: 60 },
  ];

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Background radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 1) 85%)",
        }}
      />

      {/* Sombre Dimming Layer */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-10 transition-opacity"
        style={{ opacity: dimOpacity }}
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
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid #DC2626",
            boxShadow: "0 0 35px rgba(220, 38, 38, 0.3)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-red-600 text-white">
              End-Stage Evaluation
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-400">
              TRD Confirmed
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black tracking-wider uppercase m-0 mt-1 leading-tight h-14 flex items-center"
            style={{ color: "#EF4444", textShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}
          >
            {currentTitle || "EVALUATING STATUS"}
            {typedCount < titleText.length && frame >= 40 && (
              <span className="animate-pulse ml-1 text-red-400">|</span>
            )}
          </h1>
          <p className="text-sm font-bold tracking-wide text-slate-300 m-0">
            Standard monoaminergic pharmacotherapy exhausted with zero therapeutic yield
          </p>
        </div>
      </div>

      {/* Main SVG Center Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <linearGradient id="amberBottle121" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          <linearGradient id="chainMetal121" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <filter id="padlockShadow121" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="15" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* --- HEAVY GREY SMOKE RISING (Frames 20 to 180) --- */}
        {frame > 20 && (
          <g transform="translate(960, 680)" opacity={0.55}>
            {smokePuffs.map((smoke, sIdx) => {
              const smokeProgress = ((frame * smoke.speed + smoke.yOffset * 10) % 220) / 220;
              const sy = -smokeProgress * 420;
              const sx = smoke.x + Math.sin(frame * 0.08 + sIdx) * 25;
              const sr = smoke.r * (1 + smokeProgress * 0.9);
              const sa = Math.sin(smokeProgress * Math.PI) * 0.5;

              return (
                <circle
                  key={sIdx}
                  cx={sx}
                  cy={sy}
                  r={sr}
                  fill="#475569"
                  opacity={sa}
                />
              );
            })}
          </g>
        )}

        {/* --- BOTTLE GROUND SHADOW --- */}
        <ellipse cx={960} cy={760} rx={140} ry={24} fill="#000000" opacity={0.6} />

        {/* --- CENTERED LOCKED PILL BOTTLE --- */}
        <g id="lockedPillBottleGroup" transform="translate(960, 520)">
          {/* White Childproof Cap */}
          <rect
            x={-90}
            y={-220}
            width={180}
            height={46}
            rx={8}
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth={3}
          />
          {/* Grip Ridges */}
          {[-70, -50, -30, -10, 10, 30, 50, 70].map((rx) => (
            <line key={rx} x1={rx} y1={-216} x2={rx} y2={-178} stroke="#94A3B8" strokeWidth={3} />
          ))}

          {/* Neck */}
          <rect x={-80} y={-176} width={160} height={18} rx={4} fill="#EA580C" />

          {/* Bottle Body */}
          <rect
            x={-110}
            y={-158}
            width={220}
            height={360}
            rx={24}
            fill="url(#amberBottle121)"
            stroke="#9A3412"
            strokeWidth={5}
          />

          {/* Pills Visible Inside */}
          <circle cx={-40} cy={110} r={18} fill="#FDE047" opacity={0.6} />
          <circle cx={35} cy={130} r={18} fill="#FDE047" opacity={0.6} />
          <circle cx={0} cy={80} r={18} fill="#FEF08A" opacity={0.7} />

          {/* White Prescription Label */}
          <rect
            x={-90}
            y={-120}
            width={180}
            height={180}
            rx={8}
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth={2}
          />
          <text x={-65} y={-80} fill="#0F172A" fontSize={28} fontWeight="900">
            Rx
          </text>
          <line x1={-65} y1={-60} x2={65} y2={-60} stroke="#334155" strokeWidth={4} />
          <line x1={-65} y1={-40} x2={45} y2={-40} stroke="#64748B" strokeWidth={2.5} />
          <line x1={-65} y1={-20} x2={55} y2={-20} stroke="#64748B" strokeWidth={2.5} />

          {/* Heavy Red "X" Stamped over Label */}
          <line x1={-70} y1={-100} x2={70} y2={40} stroke="#DC2626" strokeWidth={8} strokeLinecap="round" />
          <line x1={70} y1={-100} x2={-70} y2={40} stroke="#DC2626" strokeWidth={8} strokeLinecap="round" />

          {/* --- HEAVY IRON CHAINS --- */}
          <path
            d="M -160 -80 Q 0 40 160 160"
            stroke="url(#chainMetal121)"
            strokeWidth={32}
            strokeDasharray="28 10"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 160 -80 Q 0 40 -160 160"
            stroke="url(#chainMetal121)"
            strokeWidth={32}
            strokeDasharray="28 10"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -130 50 Q 0 80 130 50"
            stroke="url(#chainMetal121)"
            strokeWidth={34}
            strokeDasharray="30 12"
            strokeLinecap="round"
            fill="none"
          />

          {/* --- MASSIVE SLATE GREY PADLOCK --- */}
          <g transform="translate(0, 60)" filter="url(#padlockShadow121)">
            {/* Shackle */}
            <path
              d="M -40 0 L -40 -50 A 40 40 0 0 1 40 -50 L 40 0"
              fill="none"
              stroke="#94A3B8"
              strokeWidth={18}
              strokeLinecap="round"
            />
            {/* Padlock Body */}
            <rect
              x={-65}
              y={-10}
              width={130}
              height={110}
              rx={16}
              fill="#64748B"
              stroke="#334155"
              strokeWidth={5}
            />
            {/* Keyhole */}
            <circle cx={0} cy={35} r={11} fill="#0F172A" />
            <polygon points="-6,35 6,35 9,68 -9,68" fill="#0F172A" />
            {/* Red LED indicator */}
            <circle cx={42} cy={12} r={7} fill="#EF4444" />
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
