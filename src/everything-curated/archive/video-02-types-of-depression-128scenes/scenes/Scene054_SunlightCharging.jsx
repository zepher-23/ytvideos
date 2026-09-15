import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 54: Sunlight Charging
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Brain blueprint cross-section from Scene 53 (#070E1A).
 * - Characters & Props: Brain silhouette, SCN node, radiant sun icon (top right),
 *   golden laser photon stream, digital battery charge telemetry HUD.
 * - Beginning (0-35f): SCN node sits dim and depleted; sun appears in upper right.
 * - Action/Climax (35-130f): Sun shoots golden laser photon beams directly into the SCN;
 *   charge meter surges from 12% to 100% like a solar capacitor.
 * - Ending/Hold (130-210f): Node reaches full power; glowing golden neural pulses flood the cortex.
 */
export const Scene054_SunlightCharging = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Charging progression: frames 35 to 130
  const isCharging = frame >= 35;
  const chargeProgress = interpolate(frame, [35, 130], [0.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chargePercent = Math.round(chargeProgress * 100);

  // Full power state
  const isFullPower = frame >= 130;
  const fullAge = Math.max(0, frame - 130);

  // Sun rotation
  const sunRot = frame * 1.5;

  // Beam pulse oscillation
  const beamOpacity = isCharging ? 0.75 + Math.sin(frame * 0.4) * 0.2 : 0;

  // Post-charge full power wave
  const waveRadius = isFullPower ? (fullAge * 6) % 360 : 0;
  const waveOpacity = isFullPower ? 1 - waveRadius / 360 : 0;

  return (
    <AbsoluteFill className="bg-[#070E1A] overflow-hidden select-none font-sans text-white">
      {/* Background Cyan Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s54" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s54)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-cyan-700/80 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase block mb-0.5">
            PHOTIC RECHARGE
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            SUNLIGHT CHARGING: SCN ENTRAINMENT
          </h1>
        </div>
      </div>

      {/* TELEMETRY CHARGE METER (Top Left x=100, y=140) */}
      <div className="absolute top-[140px] left-[100px] pointer-events-none z-20">
        <div className="w-[320px] p-4 rounded-2xl bg-slate-900/95 border border-cyan-700/80 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase">
              SCN SOLAR CHARGE
            </span>
            <span
              className="text-lg font-mono font-black"
              style={{ color: isFullPower ? "#22C55E" : "#F59E0B" }}
            >
              {chargePercent}%
            </span>
          </div>
          {/* Progress Bar Track */}
          <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${chargePercent}%`,
                background: isFullPower
                  ? "linear-gradient(90deg, #10B981, #22C55E)"
                  : "linear-gradient(90deg, #D97706, #F59E0B)",
                boxShadow: isFullPower ? "0 0 14px #22C55E" : "0 0 10px #F59E0B",
              }}
            />
          </div>
          <span className="text-[11px] font-mono text-slate-400 mt-2 block tracking-wider uppercase">
            {isFullPower ? "STATUS: 10,000 LUX OPTIMAL" : "STATUS: PHOTON ABSORPTION"}
          </span>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="sun-glow-s54" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="28" floodColor="#F59E0B" floodOpacity="0.85" />
          </filter>
          <filter id="beam-glow-s54" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#FEF08A" floodOpacity="0.9" />
          </filter>
          <filter id="node-charge-glow-s54" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation={15 + chargeProgress * 25}
              floodColor="#F59E0B"
              floodOpacity={0.9}
            />
          </filter>
        </defs>

        {/* 1. BRAIN CROSS SECTION BLUEPRINT (Center 960, 560) */}
        <g transform="translate(960, 560)">
          {/* Cortex Outline */}
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
            fillOpacity="0.3"
            stroke={isFullPower ? "#F59E0B" : "#22D3EE"}
            strokeWidth="3.5"
            style={{ transition: "stroke 0.8s ease" }}
          />

          {/* Internal Circuits */}
          <ellipse cx="0" cy="0" rx="65" ry="45" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M -160 -40 C -120 -140, 60 -150, 140 -60" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
        </g>

        {/* 2. GOLDEN LASER PHOTON BEAM (From Sun at 1580, 220 to SCN at 870, 575) */}
        {isCharging && (
          <g opacity={beamOpacity} filter="url(#beam-glow-s54)">
            {/* Core Intense Laser Line */}
            <line x1="1580" y1="220" x2="870" y2="575" stroke="#FEF08A" strokeWidth="6" />
            <line x1="1580" y1="220" x2="870" y2="575" stroke="#F59E0B" strokeWidth="18" strokeOpacity="0.4" />

            {/* Moving Stream of Golden Photon Particles */}
            {[...Array(12)].map((_, i) => {
              const particleAge = ((frame - 35) * 0.05 + i * 0.08) % 1;
              const pX = interpolate(particleAge, [0, 1], [1580, 870]);
              const pY = interpolate(particleAge, [0, 1], [220, 575]);
              return (
                <circle key={i} cx={pX} cy={pY} r={4} fill="#FFFFFF">
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
                </circle>
              );
            })}
          </g>
        )}

        {/* 3. SUN ICON IN TOP RIGHT (x=1580, y=220) */}
        <g transform="translate(1580, 220)" filter="url(#sun-glow-s54)">
          {/* Rotating Ray Ring */}
          <g transform={`rotate(${sunRot})`}>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <line
                key={i}
                x1="0"
                y1="60"
                x2="0"
                y2="88"
                stroke="#FDE047"
                strokeWidth="5"
                strokeLinecap="round"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
          {/* Sun Core */}
          <circle cx="0" cy="0" r="54" fill="#F59E0B" stroke="#FEF08A" strokeWidth="5" />
          <circle cx="-12" cy="-12" r="14" fill="#FEF08A" opacity="0.6" />
        </g>

        {/* 4. SCN NODE AT (870, 575) (Charges from 12% to 100%) */}
        <g transform="translate(870, 575)">
          {/* Full power radial wave when 100% */}
          {isFullPower && (
            <circle
              cx="0"
              cy="0"
              r={waveRadius}
              fill="none"
              stroke="#F59E0B"
              strokeWidth={4 * waveOpacity}
              opacity={waveOpacity}
            />
          )}

          {/* SCN Node Body */}
          <g
            transform={`scale(${1 + chargeProgress * 0.4})`}
            filter="url(#node-charge-glow-s54)"
          >
            <circle
              cx="0"
              cy="0"
              r="22"
              fill={isFullPower ? "#FEF08A" : "#F59E0B"}
              stroke="#FFFFFF"
              strokeWidth="4"
            />
            <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
          </g>
        </g>
      </svg>

      {/* Bottom Medical Subtitle Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-cyan-700/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-cyan-200">
            PHOTIC ENTRAINMENT: INTENSE LUX DIRECTLY SYNCHRONIZES MOOD, SLEEP, AND SEROTONIN VIA RETINAL PATHWAYS
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
