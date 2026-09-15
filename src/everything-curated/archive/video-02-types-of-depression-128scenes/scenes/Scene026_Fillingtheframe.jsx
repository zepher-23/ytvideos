import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 26: Filling the frame
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Dark Slate space (#0F172A), zoom on right side of split screen
 * - Characters & Props: Primary leaky pipe, second side pipe (frame 40), rising water
 * - Beginning: Water starts at 30% height (frames 0-30).
 * - Action/Climax: Water rise accelerates. Second pipe appears on side, pouring more water (frames 40-160).
 * - Ending/Hold: Dark blue water covers 80% of the screen, holding to frame 210.
 */
export const Scene026_Fillingtheframe = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance zoom-in transition
  const enterScale = interpolate(frame, [0, 15], [0.92, 1.0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Second Pipe entrance (triggers at frame 40)
  const isSecondPipe = frame >= 40;
  const secondPipeX = interpolate(frame, [40, 55], [1920, 1580], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Accelerating Water Rise:
  // - Starts at 30% at frame 0
  // - Reaches 80% by frame 165
  const waterHeightPercent = interpolate(
    frame,
    [0, 40, 165, 210],
    [30, 38, 80, 80],
    { extrapolateRight: "clamp" }
  );

  // Droplet cycles for Pipe 1 (left) and Pipe 2 (right)
  const drop1Progress = (frame % 22) / 22;
  const drop1Y = 220 + drop1Progress * (1080 * (1 - waterHeightPercent / 100) - 180);

  const drop2Progress = ((frame + 11) % 18) / 18;
  const drop2Y = 280 + drop2Progress * (1080 * (1 - waterHeightPercent / 100) - 240);

  return (
    <AbsoluteFill className="bg-[#0F172A] overflow-hidden select-none font-sans text-white">
      {/* Viewport with Zoom */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Container */}
        <div className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-[#1E293B]/95 border-2 border-blue-500/50 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-blue-400 uppercase block mb-1">
              CHRONICITY MECHANISM // CUMULATIVE SUBMERSION
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
              FILLING THE FRAME (80% DEPTH)
            </h1>
          </div>
        </div>

        {/* PRIMARY TOP LEAKY PIPE (Left side x=460) */}
        <svg className="absolute top-28 left-0 right-0 w-full h-[180px] pointer-events-none z-20">
          {/* Main Top Horizontal Pipe */}
          <rect x="180" y="20" width="600" height="36" rx="6" fill="#334155" stroke="#64748B" strokeWidth="4" />
          <path d="M 440 50 L 440 100 L 490 100 L 490 50 Z" fill="#475569" stroke="#64748B" strokeWidth="3.5" />
          <ellipse cx="465" cy="100" rx="25" ry="8" fill="#1E293B" />
        </svg>

        {/* SECOND LEAKY PIPE (Right side, slides in from x=1920 to x=1580) */}
        {isSecondPipe && (
          <svg className="absolute top-48 left-0 right-0 w-full h-[180px] pointer-events-none z-20">
            <g transform={`translate(${secondPipeX}, 0)`}>
              <rect x="0" y="20" width="340" height="32" rx="6" fill="#334155" stroke="#64748B" strokeWidth="4" />
              <path d="M 60 50 L 60 90 L 105 90 L 105 50 Z" fill="#475569" stroke="#64748B" strokeWidth="3.5" />
              <ellipse cx="82" cy="90" rx="22" ry="7" fill="#1E293B" />
            </g>
          </svg>
        )}

        {/* Falling Water Droplets */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {/* Drop from Pipe 1 */}
          <path
            d={`M 465 ${drop1Y} C 455 ${drop1Y + 16} 455 ${drop1Y + 28} 465 ${drop1Y + 36} C 475 ${drop1Y + 28} 475 ${drop1Y + 16} 465 ${drop1Y} Z`}
            fill="#60A5FA"
            filter="drop-shadow(0 0 8px #3B82F6)"
          />
          {/* Drop from Pipe 2 */}
          {isSecondPipe && (
            <path
              d={`M ${secondPipeX + 82} ${drop2Y} C ${secondPipeX + 74} ${drop2Y + 14} ${secondPipeX + 74} ${drop2Y + 24} ${secondPipeX + 82} ${drop2Y + 30} C ${secondPipeX + 90} ${drop2Y + 24} ${secondPipeX + 90} ${drop2Y + 14} ${secondPipeX + 82} ${drop2Y} Z`}
              fill="#93C5FD"
              filter="drop-shadow(0 0 8px #3B82F6)"
            />
          )}
        </svg>

        {/* RISING DARK BLUE WATER BLOCK (#1E3A8A) */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-[#1E3A8A] transition-all border-t-4 border-[#3B82F6] flex flex-col items-center justify-start pt-8 shadow-[0_-15px_45px_rgba(30,58,138,0.85)] z-10"
          style={{ height: `${waterHeightPercent}%` }}
        >
          {/* Water Surface Ripples */}
          <div className="w-full h-3 bg-[#60A5FA]/40 mb-4 animate-pulse" />

          {/* Current Depth Telemetry */}
          <span className="text-blue-100 font-mono text-3xl md:text-5xl font-black uppercase tracking-wider">
            SUBMERSION DEPTH: {Math.round(waterHeightPercent)}%
          </span>
          <span className="text-blue-300 font-mono text-base md:text-lg font-bold uppercase tracking-widest mt-2">
            UNREMITTING CHRONIC PROGRESSION // YEARS OF RESISTANCE ERODED
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
