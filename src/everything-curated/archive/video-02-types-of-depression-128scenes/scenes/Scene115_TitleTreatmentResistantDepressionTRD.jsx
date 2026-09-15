import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 115: Title - Treatment-Resistant Depression (TRD)
 * Duration: 150 frames (5.0s)
 * Environment: Dark navy blue background.
 * Transition: The blue X-ray scan from Scene 114 fades, leaving the dark blue background.
 * Characters & Props: Large typography, a prescription pill bottle.
 * Action:
 * - Beginning: Text "10. TREATMENT-RESISTANT DEPRESSION (TRD)" appears abruptly.
 * - Action / Climax: A standard vector orange prescription pill bottle sits next to it. Heavy, dark iron chains whip around the bottle and snap together with a massive, heavy padlock.
 * - Ending / Hold: The padlock pulses once.
 * Text & Specific Colors: Text stark white. Background Navy Blue (#0F172A). Iron chains dark slate (#334155). Padlock slate grey (#64748B).
 */
export const Scene115_TitleTreatmentResistantDepressionTRD = () => {
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

  // Chains whip around bottle: frames 25 to 55
  const chainSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const chainWrapProgress = interpolate(chainSpring, [0, 1], [0, 1]);

  // Padlock snap: frame 55
  const lockSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const lockScale = interpolate(lockSpring, [0, 1], [2.2, 1]);
  const lockOpacity = interpolate(frame, [55, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Clank impact shake
  const lockImpactShake = frame >= 55 && frame < 70 ? Math.sin(frame * 2.5) * 8 : 0;

  // Padlock pulse: frame 80-100
  const pulseScale = 1 + (frame >= 80 && frame <= 100 ? Math.sin(((frame - 80) / 20) * Math.PI) * 0.15 : 0);

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
        transform: `translate(0px, ${lockImpactShake}px)`,
      }}
    >
      {/* Background Lighting Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 65% 50%, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 1) 75%)",
        }}
      />

      {/* Main Two-Column Layout */}
      <div className="absolute inset-0 flex items-center justify-between px-24 z-20">
        {/* Left: Large Stark White Typography */}
        <div
          className="flex-1 max-w-2xl flex flex-col justify-center pointer-events-none"
          style={{
            opacity: entranceOpacity,
            transform: `scale(${entranceScale})`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase bg-red-600 text-white shadow-lg">
              CATEGORY 10 OF 10
            </span>
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              PHARMACOLOGICAL RESISTANCE
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight m-0"
            style={{
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
            }}
          >
            10. TREATMENT-RESISTANT DEPRESSION (TRD)
          </h1>

          <p className="text-xl md:text-2xl font-bold text-slate-300 mt-6 leading-relaxed">
            Failure to achieve clinical remission despite multiple adequate trials of standard antidepressants.
          </p>

          {/* Clinical criterion pill tags */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-sm font-semibold">
              &ge; 2 Different Classes Failed
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-sm font-semibold">
              Adequate Dose & Duration (6-8 wks)
            </div>
          </div>
        </div>

        {/* Right: Locked Prescription Pill Bottle */}
        <div className="w-[500px] h-[600px] relative flex items-center justify-center">
          <svg
            viewBox="0 0 500 600"
            className="w-full h-full overflow-visible pointer-events-none"
          >
            <defs>
              <linearGradient id="pillBottleAmber" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>

              <linearGradient id="metalChainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#64748B" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>

              <filter id="padlockShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Bottle Ground Shadow */}
            <ellipse cx={250} cy={510} rx={110} ry={22} fill="#000000" opacity={0.5} />

            {/* --- PRESCRIPTION PILL BOTTLE --- */}
            <g id="pillBottle">
              {/* White Childproof Cap */}
              <rect
                x={180}
                y={140}
                width={140}
                height={40}
                rx={6}
                fill="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth={3}
              />
              {/* Cap vertical grip ridges */}
              {[195, 210, 225, 240, 255, 270, 285, 300].map((rx) => (
                <line
                  key={rx}
                  x1={rx}
                  y1={143}
                  x2={rx}
                  y2={177}
                  stroke="#94A3B8"
                  strokeWidth={2.5}
                />
              ))}

              {/* Bottle Neck Ring */}
              <rect
                x={190}
                y={178}
                width={120}
                height={16}
                rx={3}
                fill="#EA580C"
                stroke="#9A3412"
                strokeWidth={2}
              />

              {/* Translucent Amber Bottle Body */}
              <rect
                x={170}
                y={194}
                width={160}
                height={290}
                rx={18}
                fill="url(#pillBottleAmber)"
                stroke="#9A3412"
                strokeWidth={4}
              />

              {/* Internal Pills Silhouettes */}
              <circle cx={220} cy={420} r={14} fill="#FDE047" opacity={0.6} />
              <circle cx={275} cy={435} r={14} fill="#FDE047" opacity={0.6} />
              <circle cx={245} cy={400} r={14} fill="#FEF08A" opacity={0.7} />
              <circle cx={225} cy={455} r={14} fill="#FDE047" opacity={0.5} />
              <circle cx={265} cy={460} r={14} fill="#F59E0B" opacity={0.6} />

              {/* White Prescription Label */}
              <rect
                x={185}
                y={225}
                width={130}
                height={150}
                rx={6}
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth={2}
              />
              {/* Rx Symbol */}
              <text x={200} y={255} fill="#0F172A" fontSize={22} fontWeight="900">
                Rx
              </text>
              <line x1={200} y1={270} x2={295} y2={270} stroke="#334155" strokeWidth={3} />
              <line x1={200} y1={285} x2={280} y2={285} stroke="#64748B" strokeWidth={2} />
              <line x1={200} y1={300} x2={290} y2={300} stroke="#64748B" strokeWidth={2} />
              {/* Barcode lines */}
              <g transform="translate(200, 320)">
                {[0, 6, 10, 16, 22, 25, 32, 40, 48, 54, 60, 68, 75, 82, 88].map((bx, bIdx) => (
                  <line
                    key={bIdx}
                    x1={bx}
                    y1={0}
                    x2={bx}
                    y2={25}
                    stroke="#000000"
                    strokeWidth={bIdx % 3 === 0 ? 3 : 1.5}
                  />
                ))}
              </g>
            </g>

            {/* --- HEAVY DARK IRON CHAINS (Whipped around bottle) --- */}
            {chainWrapProgress > 0 && (
              <g id="ironChains" opacity={chainWrapProgress}>
                {/* Diagonal Chain 1: Top-Left to Bottom-Right */}
                <path
                  d="M 120 220 Q 250 310 380 400"
                  stroke="url(#metalChainGrad)"
                  strokeWidth={24}
                  strokeDasharray="22 8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Diagonal Chain 2: Top-Right to Bottom-Left */}
                <path
                  d="M 380 220 Q 250 310 120 400"
                  stroke="url(#metalChainGrad)"
                  strokeWidth={24}
                  strokeDasharray="22 8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Horizontal Waist Chain */}
                <path
                  d="M 150 320 Q 250 345 350 320"
                  stroke="url(#metalChainGrad)"
                  strokeWidth={26}
                  strokeDasharray="24 10"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
            )}

            {/* --- MASSIVE SLATE GREY PADLOCK (Snaps Center) --- */}
            {lockOpacity > 0.01 && (
              <g
                id="heavyPadlock"
                transform={`translate(250, 330) scale(${lockScale * pulseScale})`}
                filter="url(#padlockShadow)"
                style={{ opacity: lockOpacity }}
              >
                {/* Padlock Shackle Arc */}
                <path
                  d="M -30 0 L -30 -38 A 30 30 0 0 1 30 -38 L 30 0"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth={14}
                  strokeLinecap="round"
                />

                {/* Heavy Rectangular Padlock Body */}
                <rect
                  x={-48}
                  y={-5}
                  width={96}
                  height={80}
                  rx={12}
                  fill="#64748B"
                  stroke="#334155"
                  strokeWidth={4}
                />

                {/* Keyhole */}
                <circle cx={0} cy={28} r={8} fill="#0F172A" />
                <polygon points="-4,28 4,28 7,52 -7,52" fill="#0F172A" />

                {/* Pulsing Alert Light Indicator */}
                <circle
                  cx={32}
                  cy={12}
                  r={5}
                  fill={frame >= 80 ? "#EF4444" : "#22C55E"}
                />
              </g>
            )}
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
