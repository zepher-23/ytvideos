import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 73: The Chemical Betrayal Glitch
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Ominous dark navy CRT monitor background (#070D1A).
 * - Characters & Props: Multi-column binary code stream (green -> glitched neon red),
 *   horizontal CRT scanline tears, monitor display cracking overlay, slamming glitch title.
 * - Beginning (0-30f): Cascading green binary code streams down.
 * - Action/Climax (30-85f): Code glitches into violent neon red; "5 WAYS YOUR BRAIN BETRAYS YOU" types.
 * - Ending/Hold (85-150f): Monitor display shatters with jagged glass cracks and scanline flicker.
 */
export const Scene073_TheChemicalBetrayalGlitch = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glitch trigger at frame 30
  const isGlitched = frame >= 30;
  const glitchAge = Math.max(0, frame - 30);

  // CRT Horizontal Jitter
  const jitterX = isGlitched ? Math.sin(frame * 3.8) * 8 : 0;

  // Title spring at frame 35
  const titleFrame = Math.max(0, frame - 35);
  const titleSpring = spring({
    frame: titleFrame,
    fps,
    config: { damping: 11, stiffness: 150 },
  });
  const titleScale = frame < 35 ? 0 : interpolate(titleSpring, [0, 1], [2, 1]);
  const titleOpacity = interpolate(titleFrame, [0, 5], [0, 1], { extrapolateRight: "clamp" });

  // Glass fracture at frame 85
  const isCracked = frame >= 85;

  // 18 binary columns
  const columns = [...Array(18)].map((_, i) => ({
    x: 80 + i * 100,
    speed: 12 + (i % 5) * 4,
    seed: i * 37,
  }));

  return (
    <AbsoluteFill
      className="bg-[#070D1A] overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${jitterX}px, 0px)` }}
    >
      {/* CRT Scanline Horizontal Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)",
        }}
      />

      {/* 1. BINARY CODE STREAMS */}
      <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full pointer-events-none opacity-40 font-mono font-bold text-lg">
        {columns.map((col, idx) => {
          const yOffset = (frame * col.speed + col.seed) % 1080;
          return (
            <g key={idx} transform={`translate(${col.x}, 0)`}>
              {[...Array(14)].map((_, row) => {
                const charY = (yOffset + row * 80) % 1080;
                const digit = (col.seed + row + Math.floor(frame / 6)) % 2;
                return (
                  <text
                    key={row}
                    x="0"
                    y={charY}
                    fill={isGlitched ? "#EF4444" : "#22C55E"}
                    fontSize="18"
                    letterSpacing="2"
                    textAnchor="middle"
                  >
                    {digit}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>

      {/* 2. CENTER GLITCH TITLE */}
      {titleOpacity > 0 && (
        <div
          className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
          style={{
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
          }}
        >
          <div className="px-10 py-5 rounded-3xl bg-black/95 border-4 border-red-600 shadow-[0_0_60px_rgba(239,68,68,0.85)] text-center max-w-5xl backdrop-blur-xl">
            <span className="text-sm font-mono tracking-widest text-red-400 font-black uppercase block mb-2">
              SYSTEM INTEGRITY FAILURE
            </span>
            <h1
              className="text-5xl md:text-7xl font-black tracking-wider uppercase m-0 leading-tight"
              style={{
                color: "#FFFFFF",
                textShadow: "0 0 30px #EF4444, 0 0 60px #DC2626",
                WebkitTextStroke: "2px #DC2626",
              }}
            >
              5 WAYS YOUR BRAIN BETRAYS YOU
            </h1>
          </div>
        </div>
      )}

      {/* 3. MONITOR GLASS CRACK OVERLAY (Frame >= 85) */}
      {isCracked && (
        <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full pointer-events-none z-40">
          <path
            d="M 960 540 L 820 420 L 700 240 L 580 0 M 960 540 L 1120 440 L 1340 320 L 1600 120 M 960 540 L 980 720 L 1100 880 L 1260 1080 M 960 540 L 780 660 L 640 840 L 480 1080 M 820 420 L 640 460 L 320 400 M 1120 440 L 1400 520 L 1800 560"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="960" cy="540" r="18" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />
        </svg>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-red-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-red-300">
            NEUROLOGICAL REALITY COMPROMISE: HOW DISORDERED BIOCHEMISTRY CORRUPTS HUMAN PERCEPTION
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
