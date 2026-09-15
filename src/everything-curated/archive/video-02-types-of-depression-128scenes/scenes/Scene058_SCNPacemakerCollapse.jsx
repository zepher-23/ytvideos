import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 58: SCN Pacemaker Collapse
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Dark biological abstraction (#080C16).
 * - Characters & Props: Central SCN node, incoming golden beams, suffocating dark storm clouds,
 *   sputtering electrical death, flashing "PACEMAKER FAILURE" alert badge.
 * - Beginning (0-35f): SCN node glows brightly, energized by golden photon beams.
 * - Action/Climax (35-100f): Dark clouds choke off the light beams; the SCN node flickers, sputters sparks,
 *   and dies into lifeless grey.
 * - Ending/Hold (100-180f): Emergency alert icon "PACEMAKER FAILURE" flashes with red alarm pulse.
 */
export const Scene058_SCNPacemakerCollapse = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Cloud blockage progression (frames 35 to 85)
  const cloudProgress = interpolate(frame, [35, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cloudX = interpolate(cloudProgress, [0, 1], [1650, 1120]);
  const beamStrength = Math.max(0, 1 - cloudProgress * 1.2);

  // SCN flicker & death (frames 50 to 95)
  const isFlickering = frame >= 50 && frame < 95;
  const isDead = frame >= 95;
  const flickerOpacity = isFlickering ? 0.3 + Math.abs(Math.sin(frame * 1.7) * Math.cos(frame * 2.8)) * 0.7 : isDead ? 0 : 1;

  // Emergency Alert slam at frame 105
  const alertFrame = Math.max(0, frame - 105);
  const alertSpring = spring({
    frame: alertFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const alertScale = frame < 105 ? 0 : interpolate(alertSpring, [0, 1], [2.2, 1]);
  const alertOpacity = interpolate(alertFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-[#080C16] overflow-hidden select-none font-sans text-white">
      {/* Background Neural Circuitry Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s58" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s58)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-red-500 font-bold uppercase block mb-0.5">
            CHRONOBIOLOGICAL BLACKOUT
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            SCN PACEMAKER COLLAPSE
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="scn-warm-s58" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="24" floodColor="#F59E0B" floodOpacity="0.8" />
          </filter>
          <filter id="cloud-shadow-s58" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000000" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* 1. GOLDEN INCOMING LIGHT BEAMS (From 1700, 180 to SCN 960, 540) */}
        {beamStrength > 0 && (
          <g opacity={beamStrength}>
            <polygon points="1700,140 1700,240 980,560 940,520" fill="#FEF08A" opacity="0.35" />
            <line x1="1700" y1="190" x2="960" y2="540" stroke="#F59E0B" strokeWidth="6" />
          </g>
        )}

        {/* 2. CHOKING DARK STORM CLOUDS (Advance from right to left) */}
        <g transform={`translate(${cloudX}, 340)`} filter="url(#cloud-shadow-s58)">
          <path
            d="M 0 0 Q 60 -70 140 -50 Q 220 -80 300 -30 Q 380 -70 450 -10 Q 520 40 460 90 Q 380 140 300 120 Q 200 150 120 110 Q 40 130 0 80 Q -40 40 0 0 Z"
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="4"
          />
          <path
            d="M 60 40 Q 120 -20 180 0 Q 240 -30 300 10 Q 340 50 300 80 Q 220 100 160 80 Q 100 90 60 40 Z"
            fill="#0F172A"
          />
        </g>

        {/* 3. CENTRAL SCN NODE (Center at x=960, y=540) */}
        <g transform="translate(960, 540)">
          {/* SCN Node Housing Circle */}
          <circle cx="0" cy="0" r="110" fill="#0F172A" stroke="#334155" strokeWidth="4" strokeDasharray="6 6" />

          {/* ACTIVE / FLICKERING GLOWING CORE */}
          {!isDead && (
            <g opacity={flickerOpacity} filter="url(#scn-warm-s58)">
              <circle cx="0" cy="0" r="75" fill="#F59E0B" stroke="#FEF08A" strokeWidth="6" />
              <circle cx="0" cy="0" r="35" fill="#FFFFFF" />
            </g>
          )}

          {/* DEAD GREY CORE (When frame >= 95) */}
          {isDead && (
            <g>
              <circle cx="0" cy="0" r="75" fill="#334155" stroke="#475569" strokeWidth="6" />
              <circle cx="0" cy="0" r="35" fill="#1E293B" />
              {/* Sputtered Death Crack */}
              <path d="M -25 -25 L 0 5 L -10 30 L 20 45" stroke="#DC2626" strokeWidth="3" fill="none" />
            </g>
          )}

          {/* Sputtered Sparks during flicker */}
          {isFlickering && (
            <g>
              {[...Array(6)].map((_, i) => {
                const sAngle = (i * Math.PI) / 3 + frame * 0.5;
                const sDist = 60 + Math.sin(frame * 0.8 + i) * 20;
                return (
                  <circle
                    key={i}
                    cx={Math.cos(sAngle) * sDist}
                    cy={Math.sin(sAngle) * sDist}
                    r="3"
                    fill="#FEF08A"
                  />
                );
              })}
            </g>
          )}

          <text
            x="0"
            y={isDead ? "-90" : "-90"}
            textAnchor="middle"
            fill={isDead ? "#94A3B8" : "#FEF08A"}
            fontSize="18"
            fontWeight="900"
            letterSpacing="2"
          >
            {isDead ? "SCN: OFFLINE" : "SCN: ACTIVE"}
          </text>
        </g>
      </svg>

      {/* 4. EMERGENCY ALERT ICON: "PACEMAKER FAILURE" */}
      {frame >= 105 && (
        <div
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-30 px-6"
          style={{
            transform: `scale(${alertScale})`,
            opacity: alertOpacity,
          }}
        >
          <div className="w-[740px] p-8 rounded-3xl bg-black/95 border-4 border-red-600 shadow-[0_0_60px_rgba(220,38,38,0.9)] text-center backdrop-blur-xl">
            <div className="inline-block px-6 py-1.5 rounded-full bg-red-600 text-white font-mono text-sm font-black tracking-widest uppercase mb-3">
              ⚠ CRITICAL PACEMAKER ARREST
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-widest uppercase m-0 leading-tight drop-shadow-[0_0_20px_#EF4444]">
              PACEMAKER FAILURE
            </h2>
            <p className="text-lg md:text-xl font-bold tracking-widest text-red-300 uppercase mt-3 mb-0">
              CIRCADIAN DESYNCHRONIZATION DELETES SEROTONERGIC TRANSMISSION
            </p>
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-red-900 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            PATHOLOGY: ABSENCE OF SOLAR ZEITGEBERS ARRESTS THE SCN PACEMAKER, PLUNGING BRAIN CHEMISTRY INTO CHRONIC DEPRESSION
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
