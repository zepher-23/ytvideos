import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 60: Spring Remission (The Laser)
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Pitch-black room from Scene 59 (#000000) pierced by intense golden sun pillar.
 * - Characters & Props: Slumped CuratedStickman, piercing solar laser beam, instantly recharging
 *   chest battery flashing to 100% green, snap-upright revitalization.
 * - Beginning (0-35f): Stickman is slumped motionless in total blackness.
 * - Action/Climax (35-95f): A razor-sharp pillar of golden sunlight violently punches through the ceiling;
 *   chest battery instantly surges to 100% green; stickman snaps upright with joy.
 * - Ending/Hold (95-180f): Bathed in the radiant beam, stickman smiles under glowing revitalized aura.
 */
export const Scene060_SpringRemissionTheLaser = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Solar laser strike at frame 35
  const isBeamActive = frame >= 35;
  const beamAge = Math.max(0, frame - 35);
  const beamWidth = interpolate(beamAge, [0, 10], [10, 320], { extrapolateRight: "clamp" });
  const beamOpacity = interpolate(beamAge, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  // Revitalization spring at frame 42
  const revivFrame = Math.max(0, frame - 42);
  const revivSpring = spring({
    frame: revivFrame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const slumpProgress = frame < 42 ? 0.95 : interpolate(revivSpring, [0, 1], [0.95, 0]);

  // Screen shake on laser strike
  const shakeX = isBeamActive && beamAge < 20 ? Math.sin(beamAge * 2.5) * Math.max(0, 14 - beamAge * 0.7) : 0;
  const shakeY = isBeamActive && beamAge < 20 ? Math.cos(beamAge * 2.8) * Math.max(0, 12 - beamAge * 0.6) : 0;

  // Chest battery level: 0% -> 100% instantly on impact
  const isBatteryFull = frame >= 42;

  return (
    <AbsoluteFill
      className="bg-black overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Solar Beam Flare */}
      {isBeamActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 60%, rgba(245, 158, 11, 0.35) 0%, rgba(0,0,0,0.9) 70%)",
          }}
        />
      )}

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-black/85 border border-amber-500/80 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase block mb-0.5">
            SPONTANEOUS RECOVERY
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            SPRING REMISSION: THE SOLAR LASER
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <linearGradient id="laser-grad-s60" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.2" />
          </linearGradient>
          <filter id="laser-glow-s60" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="28" floodColor="#F59E0B" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. PIERCING SOLAR LASER COLUMN */}
        {isBeamActive && (
          <g opacity={beamOpacity} filter="url(#laser-glow-s60)">
            {/* Wide Solar Cylinder */}
            <polygon
              points={`${960 - beamWidth * 0.4},0 ${960 + beamWidth * 0.4},0 ${960 + beamWidth * 0.6},820 ${960 - beamWidth * 0.6},820`}
              fill="url(#laser-grad-s60)"
            />
            {/* Core Intense White Laser */}
            <line x1="960" y1="0" x2="960" y2="820" stroke="#FFFFFF" strokeWidth="8" opacity="0.9" />

            {/* Ground Impact Flare */}
            <ellipse cx="960" cy="820" rx={beamWidth * 0.7} ry="22" fill="#FEF08A" opacity="0.6" />
          </g>
        )}

        {/* 2. REVITALIZED CURATED STICKMAN */}
        <g transform="translate(960, 810)">
          {/* Ground Shadow */}
          <ellipse cx="0" cy="8" rx="85" ry="14" fill="#000000" opacity="0.3" />

          {/* Revitalized Radiant Aura (When upright) */}
          {isBatteryFull && (
            <circle
              cx="0"
              cy="-60"
              r={120 + Math.sin(frame * 0.3) * 10}
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeDasharray="8 8"
              opacity={0.6}
            />
          )}

          {/* Canonical Stickman */}
          <CuratedStickman
            x={0}
            y={0}
            scale={1.1}
            pose={isBatteryFull ? "content" : "defeat"}
            mouth={isBatteryFull ? "smile" : "frown"}
            eyes={isBatteryFull ? "normal" : "defeat"}
            slumpProgress={slumpProgress}
            frame={frame}
          />

          {/* DIGITAL BATTERY METER ON CHEST */}
          <g transform="translate(0, -70)">
            {/* Battery Shell */}
            <rect
              x="-35"
              y="-14"
              width="70"
              height="28"
              rx="6"
              fill="#0F172A"
              stroke={isBatteryFull ? "#22C55E" : "#475569"}
              strokeWidth="2.5"
            />
            <rect x="35" y="-6" width="6" height="12" rx="2" fill={isBatteryFull ? "#22C55E" : "#475569"} />

            {/* Battery Fill: 100% Green when full */}
            {isBatteryFull ? (
              <rect x="-31" y="-10" width="62" height="20" rx="4" fill="#22C55E" />
            ) : (
              <rect x="-31" y="-10" width="2" height="20" rx="1" fill="#475569" />
            )}

            {/* Percentage Text Tag */}
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              fontFamily="monospace"
            >
              {isBatteryFull ? "100%" : "0%"}
            </text>
          </g>
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-amber-500/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-amber-300">
            SEASONAL RESOLUTION: AS SPRING LIGHT RETURNS, SCN NEURAL NETWORKS AUTOMATICALLY RE-SYNCHRONIZE
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
