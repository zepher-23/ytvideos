import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 64: Hyperphagia (Reversed Signs)
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Split screen comparison (Left: Neutral Grey #F1F5F9, Right: Rich Purple #7E22CE).
 * - Characters & Props:
 *   - Left: Stickman rejecting small plain plate -> "INSOMNIA / APPETITE LOSS"
 *   - Right: Stickman ravenously pulling massive colorful pile of junk food -> "HYPERSOMNIA / HYPERPHAGIA"
 * - Climax: Dramatic contrast between classical melancholia and atypical reversed vegetative signs.
 */
export const Scene064_HyperphagiaReversedSigns = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Left side plate push away
  const pushProgress = interpolate(frame, [25, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const plateX = 520 + pushProgress * 120;

  // Right side junk food pile drop at frame 38
  const foodDropFrame = Math.max(0, frame - 38);
  const foodDropSpring = spring({
    frame: foodDropFrame,
    fps,
    config: { damping: 11, stiffness: 150 },
  });
  const foodY = frame < 38 ? -200 : interpolate(foodDropSpring, [0, 1], [-200, 660]);

  // Right stickman ravenous grab (frames 50 to 90)
  const grabProgress = interpolate(frame, [50, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden select-none font-sans text-white">
      {/* 50/50 SPLIT SCREEN */}
      <div className="absolute inset-0 flex">
        {/* LEFT PANEL: CLASSIC (MELANCHOLIC) */}
        <div className="w-1/2 h-full bg-[#F1F5F9] relative overflow-hidden text-slate-900 border-r-2 border-slate-400">
          {/* Top Tag */}
          <div className="absolute top-12 left-0 right-0 flex justify-center items-center pointer-events-none z-20">
            <div className="px-8 py-2 rounded-2xl bg-slate-200 border border-slate-400 text-slate-800 font-black tracking-widest text-lg uppercase shadow-sm">
              CLASSIC MELANCHOLIC DEPRESSION
            </div>
          </div>

          {/* Left Table & Stickman */}
          <svg viewBox="0 0 960 1080" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {/* Table Surface */}
            <rect x="240" y="720" width="600" height="24" rx="6" fill="#64748B" />
            <line x1="320" y1="744" x2="320" y2="920" stroke="#475569" strokeWidth="12" />
            <line x1="760" y1="744" x2="760" y2="920" stroke="#475569" strokeWidth="12" />

            {/* Disinterested Slumped Stickman */}
            <g transform="translate(360, 780)">
              <CuratedStickman
                x={0}
                y={0}
                scale={1.05}
                pose="defeat"
                mouth="flat"
                eyes="defeat"
                slumpProgress={0.7}
                reachProgress={pushProgress * 0.7}
                reachDirection="right"
                frame={frame}
              />
            </g>

            {/* Small Rejected Food Plate (Pushed Away) */}
            <g transform={`translate(${plateX}, 712)`}>
              <ellipse cx="0" cy="0" rx="55" ry="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="3" />
              {/* Tiny Apple / Crumb */}
              <circle cx="-10" cy="-6" r="10" fill="#EF4444" />
              <circle cx="12" cy="-5" r="7" fill="#22C55E" />
            </g>
          </svg>

          {/* Bottom Callout Banner */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center pointer-events-none z-20">
            <div className="px-6 py-2.5 rounded-xl bg-slate-300 border border-slate-400 text-slate-800 font-bold tracking-wider uppercase text-sm">
              APPETITE LOSS & INSOMNIA
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: ATYPICAL (PURPLE) */}
        <div className="w-1/2 h-full bg-[#7E22CE] relative overflow-hidden text-white">
          {/* Top Tag */}
          <div className="absolute top-12 left-0 right-0 flex justify-center items-center pointer-events-none z-20">
            <div className="px-8 py-2 rounded-2xl bg-purple-900 border border-purple-400 text-purple-200 font-black tracking-widest text-lg uppercase shadow-xl">
              ATYPICAL REVERSED SIGNS
            </div>
          </div>

          {/* Right Table & Ravenous Stickman */}
          <svg viewBox="0 0 960 1080" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {/* Table Surface */}
            <rect x="120" y="720" width="600" height="24" rx="6" fill="#3B0764" stroke="#A855F7" strokeWidth="2" />
            <line x1="200" y1="744" x2="200" y2="920" stroke="#581C87" strokeWidth="12" />
            <line x1="640" y1="744" x2="640" y2="920" stroke="#581C87" strokeWidth="12" />

            {/* Ravenous Stickman Reaching Both Arms Forward */}
            <g transform="translate(240, 780)">
              <CuratedStickman
                x={0}
                y={0}
                scale={1.05}
                pose="shock"
                mouth="shock"
                eyes="shock"
                reachProgress={grabProgress}
                reachDirection="right"
                frame={frame}
              />
            </g>

            {/* MASSIVE JUNK FOOD PILE (Drops from top) */}
            <g transform={`translate(${540 - grabProgress * 90}, ${foodY})`}>
              {/* Giant Platter */}
              <ellipse cx="0" cy="50" rx="140" ry="24" fill="#581C87" stroke="#A855F7" strokeWidth="3" />

              {/* Pink Frosted Donut */}
              <g transform="translate(-60, 10)">
                <circle cx="0" cy="0" r="38" fill="#F472B6" stroke="#DB2777" strokeWidth="4" />
                <circle cx="0" cy="0" r="14" fill="#7E22CE" />
                {/* Sprinkles */}
                <circle cx="-12" cy="-14" r="3" fill="#FEF08A" />
                <circle cx="14" cy="-8" r="3" fill="#38BDF8" />
                <circle cx="-6" cy="16" r="3" fill="#22C55E" />
              </g>

              {/* Juicy Double Cheeseburger */}
              <g transform="translate(40, 0)">
                {/* Top Bun */}
                <path d="M -45 -10 Q 0 -45 45 -10 Z" fill="#D97706" stroke="#B45309" strokeWidth="3" />
                {/* Patty & Cheese */}
                <rect x="-42" y="-10" width="84" height="12" rx="4" fill="#78350F" />
                <polygon points="-40,2 -25,12 15,2 35,10 40,2" fill="#FBBF24" />
                <rect x="-42" y="4" width="84" height="12" rx="4" fill="#78350F" />
                {/* Bottom Bun */}
                <rect x="-44" y="16" width="88" height="14" rx="6" fill="#D97706" stroke="#B45309" strokeWidth="2" />
              </g>

              {/* Slice of Pizza */}
              <g transform="translate(-10, -35) rotate(-15)">
                <polygon points="0,-45 45,35 -45,35" fill="#F59E0B" stroke="#D97706" strokeWidth="3" />
                <circle cx="0" cy="5" r="7" fill="#DC2626" />
                <circle cx="-15" cy="20" r="6" fill="#DC2626" />
                <circle cx="15" cy="20" r="6" fill="#DC2626" />
              </g>
            </g>
          </svg>

          {/* Bottom Callout Banner */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center pointer-events-none z-20">
            <div className="px-6 py-2.5 rounded-xl bg-purple-900 border border-purple-400 text-purple-200 font-bold tracking-wider uppercase text-sm shadow-xl">
              HYPERPHAGIA & HYPERSOMNIA
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-purple-500 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-purple-200">
            REVERSED VEGETATIVE SIGNS: INSTEAD OF WASTING AWAY, PATIENTS BINGE-EAT HIGH-CARBOHYDRATE CALORIES AND OVERSLEEP
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
