import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 15: Anhedonia Circle
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Clean off-white space (#F8FAFC)
 * - Transition: Slide-left
 * - Characters & Props: Stickman bust in center, floating colorful icons (pizza, controller, music note)
 * - Action/Climax: Dark grey circle expands rapidly outward from stickman (frame 60).
 *   Icons lose all color, turning flat grey (#64748B).
 * - Ending/Hold: Greyed-out icons slowly sink off bottom of screen to frame 210.
 */
export const Scene015_AnhedoniaCircle = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Slide-left entrance
  const slideX = interpolate(frame, [0, 14], [160, 0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Expanding Dark Grey Circle (starts frame 58, expands to radius 900 by frame 110)
  const isExpanding = frame >= 58;
  const circleRadius = interpolate(frame, [58, 115], [0, 950], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Icons State & Desaturation:
  // - Pizza: distance ~360px => touched around frame 76
  // - Controller: distance ~380px => touched around frame 80
  // - Music Note: distance ~340px => touched around frame 74
  const pizzaGray = frame >= 76;
  const controllerGray = frame >= 80;
  const musicGray = frame >= 74;

  // Sinking motion after greyed out (frame 95 to 190)
  const sinkY = interpolate(frame, [95, 190], [0, 480], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Playful bouncing bob before being touched
  const bob1 = Math.sin(frame * 0.12) * 14;
  const bob2 = Math.cos(frame * 0.14) * 16;
  const bob3 = Math.sin(frame * 0.13 + 1) * 15;

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-[#0F172A]">
      {/* Viewport Wrapper with Slide-Left */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate(${slideX}px, 0px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Header Badge */}
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-3.5 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-slate-500 uppercase block mb-1">
              CARDINAL SYMPTOM // 01
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none text-[#1E293B]">
              ANHEDONIA: LOSS OF PLEASURE
            </h1>
          </div>
        </div>

        {/* Main SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="icon-shadow-s15" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* EXPANDING DARK GREY CIRCLE (#64748B) */}
          {isExpanding && (
            <g>
              <circle
                cx={960}
                cy={540}
                r={circleRadius}
                fill="#475569"
                fillOpacity="0.18"
                stroke="#64748B"
                strokeWidth="8"
                strokeDasharray="16 8"
              />
              <circle
                cx={960}
                cy={540}
                r={Math.max(0, circleRadius - 15)}
                fill="#334155"
                fillOpacity="0.08"
              />
            </g>
          )}

          {/* STICKMAN BUST (Center 960, 540) */}
          <g transform="translate(0, 50)">
            <CuratedStickman
              x={960}
              y={540}
              scale={1.35}
              isBust={true}
              variant="adult"
              pose="defeat"
              mouth="frown"
              eyes="defeat"
              frame={frame}
            />
          </g>

          {/* ICON 1: PIZZA SLICE (Top Left, x=580, y=360) */}
          <g
            transform={`translate(580, ${360 + bob1 + (pizzaGray ? sinkY : 0)})`}
            filter="url(#icon-shadow-s15)"
            opacity={pizzaGray ? interpolate(frame, [140, 190], [1, 0.2], { extrapolateRight: "clamp" }) : 1}
          >
            <circle cx="0" cy="0" r="70" fill={pizzaGray ? "#64748B" : "#FFFBEB"} stroke={pizzaGray ? "#475569" : "#F59E0B"} strokeWidth="4" />
            {/* Pizza Crust & Slice */}
            <path
              d="M -35 -30 L 35 -30 L 0 40 Z"
              fill={pizzaGray ? "#475569" : "#FBBF24"}
              stroke={pizzaGray ? "#334155" : "#D97706"}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Pepperoni dots */}
            <circle cx="-10" cy="-12" r="7" fill={pizzaGray ? "#334155" : "#EF4444"} />
            <circle cx="12" cy="-8" r="6" fill={pizzaGray ? "#334155" : "#EF4444"} />
            <circle cx="2" cy="14" r="6" fill={pizzaGray ? "#334155" : "#EF4444"} />
          </g>

          {/* ICON 2: GAME CONTROLLER (Top Right, x=1340, y=360) */}
          <g
            transform={`translate(1340, ${360 + bob2 + (controllerGray ? sinkY : 0)})`}
            filter="url(#icon-shadow-s15)"
            opacity={controllerGray ? interpolate(frame, [140, 190], [1, 0.2], { extrapolateRight: "clamp" }) : 1}
          >
            <circle cx="0" cy="0" r="70" fill={controllerGray ? "#64748B" : "#EFF6FF"} stroke={controllerGray ? "#475569" : "#3B82F6"} strokeWidth="4" />
            {/* Controller Body */}
            <rect
              x="-40"
              y="-22"
              width="80"
              height="44"
              rx="18"
              fill={controllerGray ? "#475569" : "#3B82F6"}
              stroke={controllerGray ? "#334155" : "#1D4ED8"}
              strokeWidth="4"
            />
            {/* D-Pad cross */}
            <rect x="-26" y="-12" width="12" height="4" fill="#FFFFFF" />
            <rect x="-22" y="-16" width="4" height="12" fill="#FFFFFF" />
            {/* Action Buttons */}
            <circle cx="18" cy="-8" r="4" fill={controllerGray ? "#94A3B8" : "#EC4899"} />
            <circle cx="26" cy="0" r="4" fill={controllerGray ? "#94A3B8" : "#10B981"} />
            <circle cx="18" cy="8" r="4" fill={controllerGray ? "#94A3B8" : "#F59E0B"} />
          </g>

          {/* ICON 3: MUSIC NOTES (Bottom Left, x=620, y=720) */}
          <g
            transform={`translate(620, ${720 + bob3 + (musicGray ? sinkY : 0)})`}
            filter="url(#icon-shadow-s15)"
            opacity={musicGray ? interpolate(frame, [140, 190], [1, 0.2], { extrapolateRight: "clamp" }) : 1}
          >
            <circle cx="0" cy="0" r="70" fill={musicGray ? "#64748B" : "#FDF2F8"} stroke={musicGray ? "#475569" : "#EC4899"} strokeWidth="4" />
            {/* Beamed Music Note */}
            <path
              d="M -18 20 L -18 -18 L 18 -26 L 18 12
                 M -18 -12 L 18 -20"
              fill="none"
              stroke={musicGray ? "#475569" : "#DB2777"}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle cx="-24" cy="22" r="9" fill={musicGray ? "#475569" : "#DB2777"} />
            <circle cx="12" cy="14" r="9" fill={musicGray ? "#475569" : "#DB2777"} />
          </g>
        </svg>

        {/* Bottom Subtitle Card */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-10 py-3 rounded-2xl bg-white/90 border border-slate-300 shadow-xl">
            <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-700">
              {frame >= 80
                ? "REWARD SYSTEM NUMBING: RECEPTIVITY COLLAPSED"
                : "HEALTHY REWARD RECEPTIVITY INTACT"}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
