import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 32: hourglass Stickman
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Inside bottom bulb of giant hourglass (#0A0F1D)
 * - Characters & Props: Stickman trapped inside glass, falling dark sand stream (#334155)
 * - Beginning: Stickman stands trapped inside glass bulb (frames 0-30).
 * - Action/Climax: Sand relentlessly pours from above, burying stickman up to the waist (frames 30-140).
 * - Ending/Hold: Ceases struggling, stands completely motionless as sand continues to fall to frame 210.
 */
export const Scene032_hourglassStickman = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance zoom-in through hourglass neck
  const enterScale = interpolate(frame, [0, 15], [0.8, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Rising sand height:
  // Starts at ground level (Y=820, height 0) and climbs to waist (Y=660, height 160px)
  const sandHeight = interpolate(frame, [15, 145], [20, 160], {
    extrapolateRight: "clamp",
  });

  // Sand stream animation from neck (x=960)
  const streamOffset = (frame * 14) % 28;

  // Stickman slump transition (stops struggling at frame 80)
  const slump = interpolate(frame, [50, 95], [0.1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Viewport Container */}
      <div
        className="w-full h-full relative pointer-events-none"
        style={{
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block mb-1">
              EXISTENTIAL ENTRAPMENT
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              SUBMERGED IN TIME
            </h1>
          </div>
        </div>

        {/* Main SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="glass-rim-glow-s32" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#38BDF8" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* CURVED GLASS BULB OUTLINE (Huge bottom bulb walls) */}
          <g filter="url(#glass-rim-glow-s32)">
            {/* Hourglass Narrow Neck at Top (y=0 to y=120) */}
            <path
              d="M 900 60
                 C 920 160 840 280 720 440
                 C 600 600 620 780 700 860
                 L 1220 860
                 C 1300 780 1320 600 1200 440
                 C 1080 280 1000 160 1020 60"
              fill="#0F172A"
              fillOpacity="0.4"
              stroke="#38BDF8"
              strokeWidth="6"
            />
          </g>

          {/* FALLING SAND STREAM FROM NECK */}
          <line
            x1="960"
            y1="60"
            x2="960"
            y2={860 - sandHeight}
            stroke="#64748B"
            strokeWidth="8"
            strokeDasharray="10 8"
            strokeDashoffset={-streamOffset}
            strokeLinecap="round"
          />

          {/* CANONICAL CURATED STICKMAN TRAPPED INSIDE */}
          <g>
            <CuratedStickman
              x={960}
              y={740}
              scale={1.25}
              variant="adult"
              pose="defeat"
              mouth="frown"
              eyes="defeat"
              lookDirection="down"
              slumpProgress={slump}
              frame={frame}
            />
          </g>

          {/* PILED UP DARK SAND BURYING STICKMAN UP TO WAIST (#334155 / #475569) */}
          <path
            d={`M 700 860
                C 800 ${860 - sandHeight * 0.7} 900 ${860 - sandHeight * 1.1} 960 ${860 - sandHeight}
                C 1020 ${860 - sandHeight * 1.1} 1120 ${860 - sandHeight * 0.7} 1220 860 Z`}
            fill="#334155"
            stroke="#475569"
            strokeWidth="3"
          />
          {/* Surface Sand Texture Line */}
          <path
            d={`M 740 855
                Q 960 ${855 - sandHeight} 1180 855`}
            fill="none"
            stroke="#64748B"
            strokeWidth="3"
          />
        </svg>

        {/* Bottom Status Card */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-black/95 border border-slate-700 shadow-2xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
              {frame >= 95
                ? "DEFEAT STATE: STRUGGLE DISSOLVES INTO PASSIVE ENDURANCE"
                : "SLOW ACCUMULATIVE BURIAL UNDER UNCHANGING DAYS"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
