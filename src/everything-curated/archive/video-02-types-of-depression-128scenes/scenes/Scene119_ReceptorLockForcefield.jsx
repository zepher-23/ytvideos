import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 119: Receptor Lock Forcefield
 * Duration: 180 frames (6.0s)
 * Environment: Cellular cross-section diagram.
 * Characters & Props: U-shaped receptors, pills, a glowing forcefield.
 * Action:
 * - Beginning: Three green pills float downward toward U-shaped brain receptors at the bottom of the screen.
 * - Action / Climax: Just before they can connect, an invisible blue forcefield arc activates and draws itself instantly over the receptors. The green pills hit the arc and are violently deflected, bouncing back to the top of the screen and fading.
 * - Ending / Hold: The forcefield pulses brightly with cyan light.
 * Text & Specific Colors: Receptors pale green (#86EFAC). Forcefield cyan (#06B6D4). Green pills (#22C55E). Background off-white (#F8FAFC).
 */
export const Scene119_ReceptorLockForcefield = () => {
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

  // Receptor positions along synaptic cleft
  const receptorSites = [
    { x: 640, pillX: 640 },
    { x: 960, pillX: 960 },
    { x: 1280, pillX: 1280 },
  ];

  // Pill approach phase (frames 10 to 65)
  // Deflection at frame 65: bounces backwards from y: 610 up to -100
  const isDeflected = frame >= 65;

  // Forcefield activation: starts at frame 58
  const fieldDrawProgress = interpolate(frame, [58, 66], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fieldPulse = 1 + (frame >= 68 ? Math.sin(frame * 0.25) * 0.08 : 0);
  const fieldOpacity = interpolate(frame, [58, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact flash on forcefield (frames 65-72)
  const impactFlash = interpolate(frame, [65, 68, 76], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F8FAFC",
      }}
    >
      {/* Cellular Grid Blueprint Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, #06B6D4 1px, transparent 1px), linear-gradient(to bottom, #06B6D4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
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
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-3xl flex flex-col items-center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            border: "1.5px solid #CBD5E1",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-cyan-600 text-white">
              Cellular Cross-Section
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-500">
              Post-Synaptic Receptor Blockade
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-slate-900">
            Receptor Resistance & Deflection
          </h1>
          <p className="text-sm font-semibold text-slate-600 m-0">
            Downregulated or unresponsive target sites reject circulating neurotransmitter modulators
          </p>
        </div>
      </div>

      {/* Main SVG Cellular Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <linearGradient id="membraneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <filter id="forcefieldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- POST-SYNAPTIC MEMBRANE (Bottom bilayer, y=750 to 920) --- */}
        <g id="synapticMembrane" transform="translate(0, 750)">
          {/* Membrane Base */}
          <rect x={0} y={0} width={1920} height={180} fill="url(#membraneGrad)" opacity={0.6} />

          {/* Phospholipid heads (upper row) */}
          {[...Array(55)].map((_, idx) => (
            <circle
              key={idx}
              cx={idx * 35 + 15}
              cy={12}
              r={10}
              fill="#94A3B8"
              stroke="#64748B"
              strokeWidth={1.5}
            />
          ))}

          {/* Phospholipid tails */}
          {[...Array(55)].map((_, idx) => (
            <g key={idx}>
              <line x1={idx * 35 + 12} y1={22} x2={idx * 35 + 12} y2={45} stroke="#64748B" strokeWidth={2} />
              <line x1={idx * 35 + 18} y1={22} x2={idx * 35 + 18} y2={45} stroke="#64748B" strokeWidth={2} />
            </g>
          ))}
        </g>

        {/* --- THREE U-SHAPED RECEPTORS (x: 640, 960, 1280) --- */}
        {receptorSites.map((site, sIdx) => (
          <g key={sIdx} transform={`translate(${site.x}, 720)`}>
            {/* Receptor Base embedded in membrane */}
            <rect x={-45} y={15} width={90} height={50} rx={8} fill="#86EFAC" stroke="#22C55E" strokeWidth={3.5} />

            {/* U-Shaped Binding Pocket */}
            <path
              d="M -45 15 L -45 -35 A 45 45 0 0 0 45 -35 L 45 15 Z"
              fill="#86EFAC"
              stroke="#22C55E"
              strokeWidth={4}
            />

            {/* Inner Pocket Cavity */}
            <path
              d="M -26 -35 A 26 26 0 0 0 26 -35 L 26 -10 A 26 26 0 0 1 -26 -10 Z"
              fill="#F8FAFC"
              stroke="#22C55E"
              strokeWidth={3}
            />

            {/* Receptor Site Label */}
            <text x={0} y={45} textAnchor="middle" fill="#14532D" fontSize={12} fontWeight="900" letterSpacing={1}>
              TARGET {sIdx + 1}
            </text>
          </g>
        ))}

        {/* --- CYAN FORCEFIELD ARC OVER RECEPTORS --- */}
        {fieldOpacity > 0.01 && (
          <g
            id="cyanForcefield"
            filter="url(#forcefieldGlow)"
            style={{ opacity: fieldOpacity, transform: `scale(${fieldPulse})`, transformOrigin: "960px 600px" }}
          >
            {/* Outer Forcefield Wave Arc */}
            <path
              d="M 450 630 Q 960 520 1470 630"
              fill="none"
              stroke="#06B6D4"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray="1100"
              strokeDashoffset={interpolate(fieldDrawProgress, [0, 1], [1100, 0])}
            />
            {/* Inner Glowing Aura Band */}
            <path
              d="M 470 640 Q 960 540 1450 640"
              fill="none"
              stroke="#67E8F9"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset={interpolate(fieldDrawProgress, [0, 1], [1000, 0])}
            />

            {/* Active Hexagonal Forcefield Mesh Points */}
            {[560, 760, 960, 1160, 1360].map((hx, hIdx) => (
              <circle
                key={hIdx}
                cx={hx}
                cy={575 + Math.sin(frame * 0.2 + hIdx) * 6}
                r={6}
                fill="#22D3EE"
              />
            ))}
          </g>
        )}

        {/* Impact Flash Zap at frame 65-72 */}
        {impactFlash > 0.01 && (
          <g transform="translate(960, 570)" style={{ opacity: impactFlash }}>
            <circle cx={0} cy={0} r={90} fill="#67E8F9" opacity={0.6} />
            <polygon
              points="0,-60 18,-15 65,-25 30,10 50,55 5,25 -25,60 -20,15 -65,0 -20,-20"
              fill="#FFFFFF"
            />
          </g>
        )}

        {/* --- THREE GREEN PILLS (Approaching -> Deflecting) --- */}
        {receptorSites.map((site, pIdx) => {
          let pillY = 0;
          let pillScale = 1;
          let pillAlpha = 1;
          let pillRot = 0;

          if (!isDeflected) {
            // Approaching downward from y: 180 to 600
            const progress = interpolate(frame, [10, 65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            pillY = interpolate(progress, [0, 1], [180, 600]);
            pillRot = Math.sin(frame * 0.1 + pIdx) * 12;
          } else {
            // Deflected violently upward and away: frame 65 to 115
            const reboundProgress = interpolate(frame, [65, 115], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            pillY = interpolate(reboundProgress, [0, 1], [600, -80]);
            pillRot = (frame - 65) * 22 * (pIdx === 1 ? -1 : 1);
            pillAlpha = interpolate(reboundProgress, [0, 0.7, 1], [1, 0.9, 0]);
            pillScale = interpolate(reboundProgress, [0, 1], [1, 0.6]);
          }

          if (pillAlpha <= 0) return null;

          return (
            <g
              key={pIdx}
              transform={`translate(${site.pillX + (isDeflected ? (pIdx - 1) * (frame - 65) * 4 : 0)}, ${pillY}) rotate(${pillRot}) scale(${pillScale})`}
              style={{ opacity: pillAlpha }}
            >
              {/* Green Pill Body */}
              <ellipse cx={0} cy={0} rx={22} ry={14} fill="#22C55E" stroke="#15803D" strokeWidth={3} />
              {/* Pill Groove */}
              <line x1={0} y1={-12} x2={0} y2={12} stroke="#15803D" strokeWidth={2.5} />
              {/* Specular Highlight */}
              <ellipse cx={-7} cy={-5} rx={8} ry={4} fill="#86EFAC" opacity={0.65} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
