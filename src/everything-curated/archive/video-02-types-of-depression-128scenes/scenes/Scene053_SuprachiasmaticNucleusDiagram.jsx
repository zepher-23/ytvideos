import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 53: Suprachiasmatic Nucleus Diagram
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: High-tech digital blueprint aesthetic (#070E1A).
 * - Characters & Props: Sagittal human brain cross-section, laser scanner line,
 *   illuminating SCN node (Suprachiasmatic Nucleus) with HUD target reticle and bio-clock pulse.
 * - Beginning (0-35f): Horizontal laser sweeps down, revealing the cyber-cyan brain blueprint.
 * - Action/Climax (35-110f): Target reticle locks onto the SCN node deep in the hypothalamus;
 *   node illuminates with bright golden solar energy.
 * - Ending/Hold (110-180f): SCN node pulses with rhythmic bio-clock waves, projecting timekeeper signals.
 */
export const Scene053_SuprachiasmaticNucleusDiagram = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Laser scanner sweep (y=160 to 880 in frames 0-35)
  const laserY = interpolate(frame, [0, 35], [160, 880], { extrapolateRight: "clamp" });
  const laserOpacity = frame < 40 ? 1 : interpolate(frame, [40, 48], [1, 0], { extrapolateRight: "clamp" });

  // SCN Reticle Lock-on at frame 40
  const lockProgress = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const reticleScale = interpolate(lockProgress, [0, 1], [2.2, 1]);
  const reticleOpacity = interpolate(frame, [40, 52], [0, 1], { extrapolateRight: "clamp" });

  // SCN Node Pulse (Active after frame 65)
  const isNodeActive = frame >= 65;
  const pulseScale = isNodeActive ? 1 + Math.sin((frame - 65) * 0.22) * 0.15 : 1;
  const waveRadius = isNodeActive ? ((frame - 65) * 4) % 90 : 0;
  const waveOpacity = isNodeActive ? 1 - waveRadius / 90 : 0;

  return (
    <AbsoluteFill className="bg-[#070E1A] overflow-hidden select-none font-sans text-white">
      {/* Background Cyan Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <defs>
          <pattern id="grid-s53" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s53)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-cyan-700/80 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-0.5">
            CIRCADIAN ANATOMY
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            BIOLOGICAL CLOCK: THE SCN NODE
          </h1>
        </div>
      </div>

      {/* MAIN BLUEPRINT SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="cyan-glow-s53" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#22D3EE" floodOpacity="0.7" />
          </filter>
          <filter id="scn-glow-s53" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#F59E0B" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. HORIZONTAL LASER SCANNER LINE */}
        {laserOpacity > 0 && (
          <g opacity={laserOpacity}>
            <line x1="200" y1={laserY} x2="1720" y2={laserY} stroke="#22D3EE" strokeWidth="3" filter="url(#cyan-glow-s53)" />
            <line x1="200" y1={laserY} x2="1720" y2={laserY} stroke="#FFFFFF" strokeWidth="1" />
          </g>
        )}

        {/* 2. SAGITTAL HUMAN BRAIN BLUEPRINT (Center x=960, y=550) */}
        <g transform="translate(960, 550)" filter="url(#cyan-glow-s53)">
          {/* Outer Cortex Silhouette */}
          <path
            d="M -360 80 
               C -420 -80, -360 -260, -180 -320 
               C 0 -360, 180 -340, 320 -240 
               C 440 -120, 420 80, 340 160 
               C 280 220, 220 200, 160 160 
               C 100 240, 60 340, 20 380 
               C -20 380, -40 280, -60 200 
               C -140 260, -260 220, -320 160 Z"
            fill="#082F49"
            fillOpacity="0.4"
            stroke="#22D3EE"
            strokeWidth="4"
          />

          {/* Internal Brain Structures (Corpus Callosum, Thalamus, Cerebellum) */}
          {/* Corpus Callosum Arc */}
          <path
            d="M -160 -40 C -120 -140, 60 -150, 140 -60 C 100 -40, -100 -20, -160 -40 Z"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
          />

          {/* Thalamus Oval */}
          <ellipse cx="0" cy="0" rx="65" ry="45" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 4" />

          {/* Cerebellum Texture (Bottom Right) */}
          <path
            d="M 160 160 C 220 160, 280 220, 260 280 C 220 320, 140 300, 100 240 Z"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3"
          />
          <path d="M 120 220 Q 200 210 240 250 M 120 250 Q 180 250 220 280" fill="none" stroke="#0284C7" strokeWidth="2" />

          {/* Brainstem Downward Trunk */}
          <path d="M -40 180 L -10 380 M 30 180 L 10 380" fill="none" stroke="#22D3EE" strokeWidth="3" />

          {/* Retinohypothalamic Optic Nerve Input Line (coming from eye/front left) */}
          <path
            d="M -380 40 L -90 15"
            fill="none"
            stroke="#FDE047"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <text x="-370" y="25" fill="#FDE047" fontSize="13" fontWeight="bold">
            OPTIC NERVE INPUT
          </text>
        </g>

        {/* 3. SCN NODE (SUPRACHIASMATIC NUCLEUS) at (x=870, y=565) */}
        <g transform="translate(870, 565)">
          {/* Expanding Timekeeper Signal Waves */}
          {isNodeActive && (
            <circle
              cx="0"
              cy="0"
              r={waveRadius}
              fill="none"
              stroke="#F59E0B"
              strokeWidth={3 * waveOpacity}
              opacity={waveOpacity}
            />
          )}

          {/* Glowing SCN Core Node */}
          <g transform={`scale(${pulseScale})`} filter="url(#scn-glow-s53)">
            <circle cx="0" cy="0" r="18" fill="#F59E0B" stroke="#FEF08A" strokeWidth="3" />
            <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
          </g>

          {/* HUD Target Reticle Lock */}
          {reticleOpacity > 0 && (
            <g transform={`scale(${reticleScale})`} opacity={reticleOpacity}>
              {/* Corner Reticle Brackets */}
              <path d="M -35 -20 L -35 -35 L -20 -35" fill="none" stroke="#38BDF8" strokeWidth="3" />
              <path d="M 35 -20 L 35 -35 L 20 -35" fill="none" stroke="#38BDF8" strokeWidth="3" />
              <path d="M -35 20 L -35 35 L -20 35" fill="none" stroke="#38BDF8" strokeWidth="3" />
              <path d="M 35 20 L 35 35 L 20 35" fill="none" stroke="#38BDF8" strokeWidth="3" />
            </g>
          )}

          {/* Angled Leader Callout Line to Info Card */}
          {frame >= 50 && (
            <g>
              <polyline points="20,-20 90,-90 320,-90" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
              <circle cx="20" cy="-20" r="4" fill="#38BDF8" />

              {/* Callout Card (x=330, y=-90) */}
              <g transform="translate(330, -115)">
                <rect x="0" y="0" width="360" height="60" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                <text x="18" y="26" fill="#FEF08A" fontSize="16" fontWeight="900" letterSpacing="1">
                  SUPRACHIASMATIC NUCLEUS
                </text>
                <text x="18" y="46" fill="#94A3B8" fontSize="12" fontWeight="bold">
                  MASTER CIRCADIAN PACEMAKER (20,000 NEURONS)
                </text>
              </g>
            </g>
          )}
        </g>
      </svg>

      {/* Bottom Medical Subtitle Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-cyan-700/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-cyan-200">
            THE CENTRAL PACEMAKER: SCN SYNCHRONIZES MOOD, SEROTONIN, AND MELATONIN VIA LIGHT INPUT
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
