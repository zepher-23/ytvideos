import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 17: Cognitive Slowdown
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Inside the dark brain outline
 * - Characters & Props: Brain circuits, blue electric currents (#3B82F6), thick black tar sludge (#0F172A)
 * - Beginning: Small blue electric currents move along circuits inside brain (frames 0-50).
 * - Action/Climax: Thick black tar-like sludge violently splashes into brain (frame 55).
 *   Electric currents slow down dramatically, barely creeping through the tar.
 * - Ending/Hold: "SLOWING..." progress bar crawls down at bottom to frame 210.
 */
export const Scene017_CognitiveSlowdown = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance fade
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Tar Sludge Splash & Ooze (triggers frame 52)
  const isTarActive = frame >= 52;
  const tarProgress = interpolate(frame, [52, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tarLevelY = interpolate(tarProgress, [0, 1], [220, 780]);

  // 3. Current speed: normal until frame 52, then slows down dramatically
  let currentOffset = 0;
  if (frame < 52) {
    currentOffset = frame * 14;
  } else {
    currentOffset = 52 * 14 + (frame - 52) * 2.2; // 85% slowdown!
  }

  // 4. Processing speed progress bar at bottom:
  // Drops from 100% down to 8% between frames 55 and 130
  const speedBarPercent = interpolate(frame, [55, 130], [100, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Background Brain Silhouette */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <path
          d="M 960 160
             C 680 160 480 320 460 540
             C 440 760 580 880 780 920
             L 800 980 L 1120 980 L 1140 920
             C 1340 880 1480 760 1460 540
             C 1440 320 1240 160 960 160 Z"
          fill="#1E293B"
          stroke="#475569"
          strokeWidth="4"
        />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6"
        style={{ opacity: enterOpacity }}
      >
        <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-slate-600 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase block mb-1">
            NEUROLOGICAL CONGESTION
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
            COGNITIVE SLOWDOWN
          </h1>
        </div>
      </div>

      {/* Main SVG Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Blue Electric Current Glow */}
          <filter id="current-glow-s17" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#3B82F6" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* NEURAL CIRCUITS WITH MOVING BLUE ELECTRIC PULSES */}
        <g filter="url(#current-glow-s17)">
          {/* Circuit Pathway 1 */}
          <path
            d="M 580 380 L 720 380 L 820 460 L 960 460 L 1060 380 L 1340 380"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="4"
          />
          <path
            d="M 580 380 L 720 380 L 820 460 L 960 460 L 1060 380 L 1340 380"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="6"
            strokeDasharray="28 140"
            strokeDashoffset={-currentOffset}
            strokeLinecap="round"
          />

          {/* Circuit Pathway 2 */}
          <path
            d="M 520 540 L 700 540 L 850 620 L 1070 620 L 1220 540 L 1400 540"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="4"
          />
          <path
            d="M 520 540 L 700 540 L 850 620 L 1070 620 L 1220 540 L 1400 540"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="6"
            strokeDasharray="24 120"
            strokeDashoffset={-currentOffset * 0.9}
            strokeLinecap="round"
          />

          {/* Circuit Pathway 3 */}
          <path
            d="M 640 700 L 780 700 L 880 640 L 1040 640 L 1140 700 L 1280 700"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="4"
          />
          <path
            d="M 640 700 L 780 700 L 880 640 L 1040 640 L 1140 700 L 1280 700"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="6"
            strokeDasharray="30 150"
            strokeDashoffset={-currentOffset * 1.1}
            strokeLinecap="round"
          />
        </g>

        {/* THICK BLACK TAR SLUDGE SPLASH & OOZE (#000000 / #0F172A) */}
        {isTarActive && (
          <g>
            {/* Oozing Tar Mass from top to bottom */}
            <path
              d={`M 440 200
                  C 600 ${220 + tarProgress * 60} 800 ${260 + tarProgress * 120} 960 ${tarLevelY}
                  C 1120 ${260 + tarProgress * 120} 1320 ${220 + tarProgress * 60} 1480 200
                  L 1480 ${tarLevelY + 80}
                  C 1300 ${tarLevelY + 120} 1120 ${tarLevelY + 60} 960 ${tarLevelY + 100}
                  C 800 ${tarLevelY + 60} 620 ${tarLevelY + 120} 440 ${tarLevelY + 80} Z`}
              fill="#000000"
              fillOpacity="0.88"
              stroke="#1E293B"
              strokeWidth="5"
            />
            {/* Dripping Viscous Droplets */}
            <circle cx="720" cy={tarLevelY + 40} r="18" fill="#000000" />
            <circle cx="960" cy={tarLevelY + 70} r="26" fill="#000000" />
            <circle cx="1200" cy={tarLevelY + 50} r="20" fill="#000000" />
          </g>
        )}
      </svg>

      {/* Bottom Progress Bar: "SLOWING..." (Decreasing velocity) */}
      <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center pointer-events-none z-30 px-6">
        <div className="w-[840px] px-8 py-5 rounded-2xl bg-black/95 border-2 border-slate-700 shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
              {frame >= 55 ? "SYNAPTIC VELOCITY // CRITICAL IMPAIRMENT" : "SYNAPTIC TRANSMISSION: NORMAL"}
            </span>
            <span
              className={`font-mono text-sm md:text-base font-black ${
                speedBarPercent < 20 ? "text-red-500 animate-pulse" : "text-blue-400"
              }`}
            >
              {Math.round(speedBarPercent)}% SPEED
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-5 bg-slate-900 rounded-full overflow-hidden border border-slate-700 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-100 ${
                speedBarPercent < 20
                  ? "bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_15px_#EF4444]"
                  : "bg-gradient-to-r from-blue-600 to-cyan-400"
              }`}
              style={{ width: `${speedBarPercent}%` }}
            />
          </div>

          {frame >= 70 && (
            <span className="font-mono text-xs text-red-400 font-bold tracking-widest uppercase mt-2 block text-center">
              PSYCHOMOTOR RETARDATION: THOUGHT EFFORT INCREASES EXPONENTIALLY
            </span>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
