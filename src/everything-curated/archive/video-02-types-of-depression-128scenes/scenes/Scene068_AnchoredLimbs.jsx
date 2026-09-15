import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 68: Anchored Limbs
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Close-up on floorboards and lower limbs (#0B1120).
 * - Characters & Props: Stickman legs and feet, thick iron anklets snapping around ankles,
 *   heavy rivets fusing them to floor, futile straining lift motions with flying sweat droplets.
 * - Beginning (0-25f): Stickman feet resting normally on floorboards.
 * - Action/Climax (25-85f): Heavy iron shackles snap shut around both ankles; stickman strains
 *   furiously to take a step, but the anchors hold him fused to the floorboards.
 * - Ending/Hold (85-150f): Sweat drops fly in exhausted exertion; rigid locked anchors hold steady.
 */
export const Scene068_AnchoredLimbs = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Anklets snap shut at frame 25
  const isSnapped = frame >= 25;
  const snapAge = Math.max(0, frame - 25);
  const snapSpring = spring({
    frame: snapAge,
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const shackleGap = !isSnapped ? 120 : interpolate(snapSpring, [0, 1], [120, 0]);

  // Screen shake on snap impact
  const shakeX = isSnapped && snapAge < 16 ? Math.sin(snapAge * 2.8) * Math.max(0, 12 - snapAge * 0.7) : 0;
  const shakeY = isSnapped && snapAge < 16 ? Math.cos(snapAge * 3.0) * Math.max(0, 10 - snapAge * 0.6) : 0;

  // Straining leg lift motion (frames 40 to 110)
  const isStraining = frame >= 40 && frame < 110;
  const strainCycle = isStraining ? Math.max(0, Math.sin((frame - 40) * 0.35)) : 0;
  const rightLegLift = strainCycle * 14;

  // Sweat droplets animation
  const sweatOpacity = isStraining ? 0.9 : 0;

  return (
    <AbsoluteFill
      className="bg-[#0B1120] overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Dark Technical Space */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s68" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s68)" />
      </svg>

      {/* Heavy Industrial Floorboards (y=740 to 1080) */}
      <div className="absolute top-[740px] left-0 right-0 bottom-0 bg-[#0F172A] border-t-4 border-slate-700">
        <div className="w-full h-full flex flex-col justify-around py-4 opacity-40">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-0.5 bg-slate-600 flex justify-around">
              {[...Array(8)].map((_, j) => (
                <div key={j} className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-0.5">
            MOTOR INERTIA
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            ANCHORED LIMBS: IMMOBILIZATION
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG: CLOSE-UP ON LOWER LIMBS & SHACKLES */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="iron-shadow-s68" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. STICKMAN LOWER LEGS & FEET */}
        {/* Left Leg (Fixed at x=840) */}
        <g transform="translate(840, 740)">
          {/* Leg Shaft */}
          <line x1="0" y1="-320" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
          <line x1="0" y1="-320" x2="0" y2="0" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
          {/* Left Foot */}
          <ellipse cx="-25" cy="0" rx="45" ry="12" fill="#000000" />
        </g>

        {/* Right Leg (Attempting to lift at x=1080) */}
        <g transform={`translate(1080, ${740 - rightLegLift})`}>
          {/* Leg Shaft */}
          <line x1="0" y1="-320" x2="0" y2="0" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" />
          <line x1="0" y1="-320" x2="0" y2="0" stroke="#000000" strokeWidth="12" strokeLinecap="round" />
          {/* Right Foot */}
          <ellipse cx="25" cy="0" rx="45" ry="12" fill="#000000" />
        </g>

        {/* 2. HEAVY IRON ANKLETS (FUSED TO FLOORBOARDS) */}
        {/* Left Shackle (x=840, y=720) */}
        <g transform="translate(840, 720)" filter="url(#iron-shadow-s68)">
          {/* Base Floor Plate & Rivets */}
          <rect x="-70" y="0" width="140" height="24" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="3" />
          <circle cx="-50" cy="12" r="5" fill="#94A3B8" />
          <circle cx="50" cy="12" r="5" fill="#94A3B8" />

          {/* Left Shackle Clamshell (Slides from -shackleGap) */}
          <path
            d={`M ${-45 - shackleGap} -40 C ${-45 - shackleGap} -70, -5 -70, -5 -40 L -5 0 L ${-45 - shackleGap} 0 Z`}
            fill="#334155"
            stroke="#64748B"
            strokeWidth="4"
          />
          {/* Right Shackle Clamshell (Slides from +shackleGap) */}
          <path
            d={`M ${45 + shackleGap} -40 C ${45 + shackleGap} -70, 5 -70, 5 -40 L 5 0 L ${45 + shackleGap} 0 Z`}
            fill="#334155"
            stroke="#64748B"
            strokeWidth="4"
          />
          {/* Heavy Center Lock Pin */}
          {isSnapped && <rect x="-10" y="-55" width="20" height="40" rx="4" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />}
        </g>

        {/* Right Shackle (x=1080, y=720) */}
        <g transform="translate(1080, 720)" filter="url(#iron-shadow-s68)">
          {/* Base Floor Plate */}
          <rect x="-70" y="0" width="140" height="24" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="3" />
          <circle cx="-50" cy="12" r="5" fill="#94A3B8" />
          <circle cx="50" cy="12" r="5" fill="#94A3B8" />

          {/* Shackle halves */}
          <path
            d={`M ${-45 - shackleGap} -40 C ${-45 - shackleGap} -70, -5 -70, -5 -40 L -5 0 L ${-45 - shackleGap} 0 Z`}
            fill="#334155"
            stroke="#64748B"
            strokeWidth="4"
          />
          <path
            d={`M ${45 + shackleGap} -40 C ${45 + shackleGap} -70, 5 -70, 5 -40 L 5 0 L ${45 + shackleGap} 0 Z`}
            fill="#334155"
            stroke="#64748B"
            strokeWidth="4"
          />
          {isSnapped && <rect x="-10" y="-55" width="20" height="40" rx="4" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />}
        </g>

        {/* 3. EFFORT SWEAT DROPLETS (During Straining) */}
        {sweatOpacity > 0 && (
          <g opacity={sweatOpacity}>
            {[...Array(6)].map((_, i) => {
              const sX = 960 + (i % 2 === 0 ? -120 - i * 20 : 120 + i * 20);
              const sY = 480 + (frame * 6 + i * 25) % 180;
              return (
                <ellipse
                  key={i}
                  cx={sX}
                  cy={sY}
                  rx="6"
                  ry="10"
                  fill="#38BDF8"
                  opacity={0.8}
                />
              );
            })}
          </g>
        )}
      </svg>

      {/* HUD Telemetry Tag */}
      {isSnapped && (
        <div className="absolute top-[620px] left-[760px] pointer-events-none z-20">
          <div className="px-6 py-2 rounded-xl bg-red-950 border border-red-600 text-red-300 font-mono text-sm font-black tracking-wider uppercase shadow-xl">
            🔒 ANKLETS FUSED: MAXIMUM MOTOR RESISTANCE
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-cyan-800 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-cyan-200">
            SOMATIC LEADEN SYMPTOM: LIMBS EXPERIENCE VOLITIONAL RESISTANCE AS THOUGH ANCHORED BY PHYSICAL IRON
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
