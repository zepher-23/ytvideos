import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 67: Leaden Paralysis (The Weight)
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: High-tech X-ray clinical visual space (#07111E).
 * - Characters & Props: CuratedStickman, two massive 100 LBS cast-iron weights dropping from above,
 *   heavy iron chains locking around arms, crushing leaden slump posture.
 * - Beginning (0-35f): Stickman stands upright in cyan X-ray space.
 * - Action/Climax (35-95f): Two heavy "100 LBS" iron weights slam onto his shoulders and chain to his arms.
 * - Ending/Hold (95-180f): Stickman buckles into an agonizing leaden slump under the crushing physical load.
 */
export const Scene067_LeadenParalysisTheWeight = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Weights falling drop from y=-200 to y=640 at frame 45
  const isDrop = frame >= 30;
  const dropAge = Math.max(0, frame - 30);
  const dropSpring = spring({
    frame: dropAge,
    fps,
    config: { damping: 11, stiffness: 150 },
  });
  const weightY = frame < 30 ? -220 : interpolate(dropSpring, [0, 1], [-220, 640]);

  // Slump progression after weight impact (frame >= 45)
  const isImpact = frame >= 45;
  const impactAge = Math.max(0, frame - 45);
  const slumpSpring = spring({
    frame: impactAge,
    fps,
    config: { damping: 12, stiffness: 110 },
  });
  const slumpProgress = !isImpact ? 0 : interpolate(slumpSpring, [0, 1], [0, 0.92]);

  // Screen shake on impact
  const shakeX = isImpact && impactAge < 25 ? Math.sin(impactAge * 2.4) * Math.max(0, 16 - impactAge * 0.7) : 0;
  const shakeY = isImpact && impactAge < 25 ? Math.cos(impactAge * 2.8) * Math.max(0, 14 - impactAge * 0.6) : 0;

  // Muscle strain tremor after impact
  const tremorY = isImpact ? Math.sin(frame * 2.8) * 3 : 0;

  return (
    <AbsoluteFill
      className="bg-[#07111E] overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Technical X-Ray Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <defs>
          <pattern id="xray-grid-s67" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xray-grid-s67)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-cyan-700/80 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-0.5">
            SOMATIC PARALYSIS
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            LEADEN PARALYSIS: 100 LBS LIMBS
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="weight-shadow-s67" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Floor Line */}
        <line x1="300" y1="830" x2="1620" y2="830" stroke="#1E293B" strokeWidth="3" />

        {/* CURATED STICKMAN BUCKLING UNDER WEIGHT */}
        <g transform={`translate(960, ${820 + tremorY})`}>
          {/* Ground Shadow */}
          <ellipse cx="0" cy="8" rx={90 + slumpProgress * 20} ry="16" fill="#000000" opacity="0.4" />

          {/* Stickman Character */}
          <CuratedStickman
            x={0}
            y={0}
            scale={1.08}
            pose={isImpact ? "defeat" : "idle"}
            mouth={isImpact ? "frown" : "neutral"}
            eyes={isImpact ? "defeat" : "normal"}
            slumpProgress={slumpProgress}
            frame={frame}
          />
        </g>

        {/* 2. HEAVY "100 LBS" CAST-IRON WEIGHTS (Dropping onto Left & Right arms) */}
        {/* Left Iron Weight (x=830) */}
        <g transform={`translate(830, ${weightY})`} filter="url(#weight-shadow-s67)">
          {/* Heavy Iron Ring Handle */}
          <path d="M -25 -50 C -25 -80, 25 -80, 25 -50" fill="none" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
          {/* Solid Cast Iron Body */}
          <rect x="-65" y="-50" width="130" height="110" rx="14" fill="#1E293B" stroke="#475569" strokeWidth="4" />
          <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900" letterSpacing="1">
            100 LBS
          </text>
          <text x="0" y="32" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">
            LEAD LOAD
          </text>
          {/* Chain links attaching to stickman's arm */}
          {isImpact && (
            <path d="M 0 -70 Q 70 -50 110 30" fill="none" stroke="#64748B" strokeWidth="6" strokeDasharray="10 6" />
          )}
        </g>

        {/* Right Iron Weight (x=1090) */}
        <g transform={`translate(1090, ${weightY})`} filter="url(#weight-shadow-s67)">
          <path d="M -25 -50 C -25 -80, 25 -80, 25 -50" fill="none" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
          <rect x="-65" y="-50" width="130" height="110" rx="14" fill="#1E293B" stroke="#475569" strokeWidth="4" />
          <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="900" letterSpacing="1">
            100 LBS
          </text>
          <text x="0" y="32" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="bold">
            LEAD LOAD
          </text>
          {/* Chain links attaching to stickman's arm */}
          {isImpact && (
            <path d="M 0 -70 Q -70 -50 -110 30" fill="none" stroke="#64748B" strokeWidth="6" strokeDasharray="10 6" />
          )}
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-cyan-800 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-cyan-300">
            DIAGNOSTIC CRITERIA: A HEAVY, LEADEN SENSATION IN ARMS AND LEGS MAKING EVEN BASIC PHYSICAL ACTIONS AN EXHAUSTING CHORE
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
