import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 45: Mixed State Conflict
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Clinical dark flowchart space (#0B0F19).
 * - Characters & Props: Centered split stickman (left half manic yellow, right half depressed blue),
 *   logic bubbles ("Mania" & "Depression") colliding and merging into a chaotic bubbling vortex.
 * - Beginning (0-40f): Split stickman bust with dual aura. Bubbles separated above.
 * - Action/Climax (40-95f): Bubbles slam together, crack violently, and merge into a turbulent red/brown vortex.
 * - Ending/Hold (95-180f): Merged vortex pulses with volatile energy sparks. "MIXED STATE" types above.
 */
export const Scene045_MixedStateConflict = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Bubble slam progression: x=560 & x=1360 -> x=960 at frame 65
  const slamProgress = interpolate(frame, [40, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bubble1X = interpolate(slamProgress, [0, 1], [560, 960]);
  const bubble2X = interpolate(slamProgress, [0, 1], [1360, 960]);

  const hasMerged = frame >= 68;
  const mergeAge = Math.max(0, frame - 68);

  // Violent screen shudder on collision
  const shakeX = hasMerged && mergeAge < 25 ? Math.sin(mergeAge * 2.5) * Math.max(0, 14 - mergeAge * 0.6) : 0;
  const shakeY = hasMerged && mergeAge < 25 ? Math.cos(mergeAge * 2.8) * Math.max(0, 12 - mergeAge * 0.5) : 0;

  // Vortex pulsing after merge
  const vortexScale = hasMerged ? 1 + Math.sin(mergeAge * 0.25) * 0.08 : 0;
  const vortexRot = mergeAge * 6;

  // Dynamic facial dual jitter
  const manicJitter = Math.sin(frame * 1.8) * 3;

  return (
    <AbsoluteFill
      className="bg-[#0B0F19] overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Clinical Flowchart Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="flow-grid-s45" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M 70 0 L 0 0 0 70" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#flow-grid-s45)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase block mb-0.5">
            CONCURRENT POLAR COLLISION
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            {hasMerged ? "MIXED STATE CONFLICT" : "DUAL POLAR POLARIZATION"}
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <radialGradient id="vortex-grad-s45" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </radialGradient>
          <filter id="vortex-glow-s45" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="24" floodColor="#DC2626" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. SEPARATE LOGIC BUBBLES (Before Collision) */}
        {!hasMerged && (
          <g>
            {/* MANIA BUBBLE (Yellow) */}
            <g transform={`translate(${bubble1X}, 340)`}>
              <circle cx="0" cy="0" r="105" fill="#FEF08A" stroke="#EAB308" strokeWidth="6" opacity="0.95" />
              <text x="0" y="8" textAnchor="middle" fill="#854D0E" fontSize="24" fontWeight="900" letterSpacing="2">
                MANIA
              </text>
              <text x="0" y="32" textAnchor="middle" fill="#A16207" fontSize="13" fontWeight="bold">
                HIGH ENERGY
              </text>
            </g>

            {/* DEPRESSION BUBBLE (Blue) */}
            <g transform={`translate(${bubble2X}, 340)`}>
              <circle cx="0" cy="0" r="105" fill="#BFDBFE" stroke="#2563EB" strokeWidth="6" opacity="0.95" />
              <text x="0" y="8" textAnchor="middle" fill="#1E40AF" fontSize="24" fontWeight="900" letterSpacing="2">
                DEPRESSION
              </text>
              <text x="0" y="32" textAnchor="middle" fill="#1D4ED8" fontSize="13" fontWeight="bold">
                DESPAIR
              </text>
            </g>
          </g>
        )}

        {/* 2. MERGED CHAOTIC VORTEX BUBBLE (After Collision at (960, 340)) */}
        {hasMerged && (
          <g transform={`translate(960, 340) scale(${vortexScale})`} filter="url(#vortex-glow-s45)">
            {/* Swirling Core */}
            <circle cx="0" cy="0" r="130" fill="url(#vortex-grad-s45)" stroke="#F87171" strokeWidth="6" />

            {/* Rotating Swirl Arms */}
            <g transform={`rotate(${vortexRot})`}>
              <path d="M -110 0 Q 0 -110 110 0 Q 0 110 -110 0" fill="none" stroke="#FEF08A" strokeWidth="4" opacity="0.6" />
              <path d="M 0 -110 Q 110 0 0 110 Q -110 0 0 -110" fill="none" stroke="#60A5FA" strokeWidth="4" opacity="0.6" />
            </g>

            {/* Center Warning Label */}
            <text x="0" y="-8" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="900" letterSpacing="2">
              MIXED STATE
            </text>
            <text x="0" y="24" textAnchor="middle" fill="#FECACA" fontSize="14" fontWeight="black" letterSpacing="1">
              ENERGY + DESPAIR
            </text>

            {/* Erratic Electrical Sparks */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * Math.PI) / 4 + mergeAge * 0.2;
              const r1 = 130;
              const r2 = 160 + Math.sin(mergeAge * 0.5 + i) * 20;
              return (
                <line
                  key={i}
                  x1={Math.cos(angle) * r1}
                  y1={Math.sin(angle) * r1}
                  x2={Math.cos(angle) * r2}
                  y2={Math.sin(angle) * r2}
                  stroke={i % 2 === 0 ? "#FEF08A" : "#F87171"}
                  strokeWidth="3"
                />
              );
            })}
          </g>
        )}

        {/* 3. CENTER SPLIT STICKMAN BUST (x=960, y=740) */}
        <g transform="translate(960, 740)">
          {/* Dual Aura Glow */}
          {/* Left Manic Yellow Aura */}
          <path
            d="M 0 -180 C -120 -180, -140 60, 0 80 Z"
            fill="#FEF08A"
            opacity="0.22"
          />
          {/* Right Depressed Blue Aura */}
          <path
            d="M 0 -180 C 120 -180, 140 60, 0 80 Z"
            fill="#3B82F6"
            opacity="0.22"
          />

          {/* Canonical Bust Character */}
          <g transform={`translate(${manicJitter}, 0)`}>
            <CuratedStickman
              x={0}
              y={0}
              isBust={true}
              scale={1.4}
              frame={frame}
            />
          </g>

          {/* Split Dividing Laser Line across stickman */}
          <line x1="0" y1="-140" x2="0" y2="80" stroke="#F87171" strokeWidth="3" strokeDasharray="5 5" />

          {/* Left / Right Indicators */}
          <g transform="translate(-160, -30)">
            <rect x="-80" y="-18" width="160" height="36" rx="10" fill="#854D0E" stroke="#EAB308" strokeWidth="2" />
            <text x="0" y="6" textAnchor="middle" fill="#FEF08A" fontSize="13" fontWeight="900" letterSpacing="1">
              ⚡ MANIC DRIVE
            </text>
          </g>

          <g transform="translate(160, -30)">
            <rect x="-85" y="-18" width="170" height="36" rx="10" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2" />
            <text x="0" y="6" textAnchor="middle" fill="#BFDBFE" fontSize="13" fontWeight="900" letterSpacing="1">
              🌧 AGONIZING DESPAIR
            </text>
          </g>
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-red-800/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-red-400">
            LETHAL VOLATILITY: MOTOR AGITATION OF MANIA COUPLED WITH SUICIDAL IMPULSES OF DEPRESSION
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
