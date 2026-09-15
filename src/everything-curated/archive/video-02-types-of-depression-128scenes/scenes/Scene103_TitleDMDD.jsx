import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 103: Title - DMDD
 * Duration: 150 frames (5.0s)
 * Environment: Dark navy blue background (#0F172A).
 * Transition: Fast fade to dark blue.
 * Characters & Props: Large typography, pediatric stickman standing rigid with intense red heat waves radiating in a vibrating loop.
 */
export const Scene103_TitleDMDD = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const enterX = interpolate(enterSpring, [0, 1], [-40, 0]);

  // Pediatric stickman high-frequency tension trembling
  const shiverX = Math.sin(frame * 2.4) * 2.5;
  const shiverY = Math.cos(frame * 2.8) * 1.8;

  // Radiating heat waves loop
  const waveCycle = (frame * 3) % 90;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Background Subtle Thermal Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 75% 55%, rgba(153, 27, 27, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Main Content Split Layout */}
      <div
        className="absolute inset-0 flex items-center justify-between px-20 z-20"
        style={{
          opacity: enterOpacity,
        }}
      >
        {/* LEFT: Large Typography Container */}
        <div
          className="max-w-2xl flex flex-col items-start text-left"
          style={{ transform: `translateX(${enterX}px)` }}
        >
          {/* Section Diagnostic Tag */}
          <div className="px-4 py-1.5 rounded-lg bg-orange-600/30 border border-orange-500 text-orange-400 text-sm font-black tracking-widest uppercase mb-4">
            SECTION 9 • PEDIATRIC DIAGNOSTIC PROFILE
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none m-0">
            DISRUPTIVE MOOD<br />
            <span className="text-red-500">DYSREGULATION</span><br />
            DISORDER
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-amber-400 font-extrabold text-lg tracking-wider">
              DMDD
            </span>
            <span className="text-slate-400 text-base font-semibold">
              DSM-5 Depressive Category (Youth)
            </span>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-base font-black text-red-400 tracking-wider uppercase m-0">
              CHRONIC, SEVERE PERSISTENT IRRITABILITY
            </p>
            <p className="text-sm font-medium text-slate-400 mt-1 m-0">
              Frequent extreme temper outbursts against a backdrop of anger
            </p>
          </div>
        </div>

        {/* RIGHT: Pediatric Stickman with Radiating Red Heat Waves (x=1380, y=720) */}
        <div className="w-[500px] h-[600px] relative flex items-center justify-center">
          <svg viewBox="0 0 500 600" className="w-full h-full overflow-visible pointer-events-none">
            <defs>
              <filter id="heatGlow103" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* RADIATING DARK RED HEAT WAVES (Vibrating loop) */}
            <g transform="translate(250, 360)" filter="url(#heatGlow103)">
              {[0, 30, 60].map((offset, i) => {
                const waveR = ((frame * 2.5 + offset) % 110) + 70;
                const waveOp = Math.max(0, 0.8 - waveR / 180);

                return (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="0"
                    rx={waveR * 0.9}
                    ry={waveR * 1.4}
                    fill="none"
                    stroke="#991B1B"
                    strokeWidth="4"
                    strokeDasharray="12 6"
                    opacity={waveOp}
                  />
                );
              })}
            </g>

            {/* Ground Shadow */}
            <ellipse cx="250" cy="510" rx="90" ry="16" fill="#000000" opacity="0.6" />

            {/* PEDIATRIC STICKMAN STANDING RIGID WITH TENSION */}
            <g transform={`translate(${250 + shiverX}, ${480 + shiverY})`}>
              <CuratedStickman
                x={0}
                y={0}
                scale={1.1}
                variant="child"
                pose="idle"
                mouth="frown"
                eyes="shock"
                slumpProgress={0}
                frame={frame}
              />
            </g>

            {/* Anger Steam / Heat Spikes from shoulders */}
            <g transform="translate(250, 260)" stroke="#EF4444" strokeWidth="2.5" fill="none">
              <path d={`M -30 0 Q -40 -30 -30 -60`} strokeDasharray="4 4" />
              <path d={`M 30 0 Q 40 -30 30 -60`} strokeDasharray="4 4" />
              <path d={`M 0 -20 Q 5 -50 0 -80`} strokeDasharray="4 4" />
            </g>
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
