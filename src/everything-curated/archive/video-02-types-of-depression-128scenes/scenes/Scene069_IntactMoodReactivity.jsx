import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 69: Intact Mood Reactivity
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Rainy atmospheric checkered perspective floor (#0B1120).
 * - Characters & Props: Stickman, heavy dark rain cloud pouring rain, brightly wrapped gift box,
 *   warm golden expanding aura pushing cloud away.
 * - Beginning (0-35f): Stickman stands depressed under dark rain cloud pouring grey lines.
 * - Action/Climax (35-110f): Gift box drops into his hands; lid pops open, releasing a radiant golden aura
 *   that physically shoves the storm cloud away.
 * - Ending/Hold (110-210f): Stickman smiles warmly, temporarily refreshed in the golden dome of joy.
 */
export const Scene069_IntactMoodReactivity = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Gift box falling drop from y=-150 to y=680 at frame 42
  const isGiftDropped = frame >= 25;
  const giftAge = Math.max(0, frame - 25);
  const giftSpring = spring({
    frame: giftAge,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const giftY = !isGiftDropped ? -180 : interpolate(giftSpring, [0, 1], [-180, 685]);

  // Gift opens at frame 55, releasing expanding golden aura
  const isGiftOpened = frame >= 55;
  const openAge = Math.max(0, frame - 55);
  const auraRadius = isGiftOpened ? interpolate(openAge, [0, 35], [20, 420], { extrapolateRight: "clamp" }) : 0;
  const auraOpacity = isGiftOpened ? interpolate(openAge, [0, 15], [0, 0.45], { extrapolateRight: "clamp" }) : 0;

  // Cloud pushed away motion
  const cloudY = isGiftOpened ? interpolate(openAge, [0, 35], [480, 140], { extrapolateRight: "clamp" }) : 480;
  const cloudOpacity = isGiftOpened ? interpolate(openAge, [10, 40], [1, 0.2], { extrapolateRight: "clamp" }) : 1;

  // Stickman smile transition
  const isSmiling = frame >= 65;

  return (
    <AbsoluteFill className="bg-[#0B1120] overflow-hidden select-none font-sans text-white">
      {/* 3D Checkered Perspective Floor (y=760 to 1080) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="floor-fade-s69" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <polygon points="0,760 1920,760 1920,1080 0,1080" fill="url(#floor-fade-s69)" />
        {[-400, 0, 400, 800, 1200, 1600, 2000, 2400].map((vx, i) => (
          <line key={i} x1="960" y1="760" x2={vx} y2="1080" stroke="#334155" strokeWidth="2" />
        ))}
        <line x1="0" y1="820" x2="1920" y2="820" stroke="#334155" strokeWidth="1.5" />
        <line x1="0" y1="890" x2="1920" y2="890" stroke="#334155" strokeWidth="2" />
        <line x1="0" y1="980" x2="1920" y2="980" stroke="#334155" strokeWidth="2.5" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-purple-400 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-purple-400 font-bold uppercase block mb-0.5">
            DIAGNOSTIC HALLMARK
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            INTACT MOOD REACTIVITY
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <radialGradient id="aura-gold-s69" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
          <filter id="gift-glow-s69" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#EF4444" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* 1. EXPANDING GOLDEN AURA (Pushes Cloud Away) */}
        {isGiftOpened && (
          <circle
            cx="960"
            cy="700"
            r={auraRadius}
            fill="url(#aura-gold-s69)"
            opacity={auraOpacity}
          />
        )}

        {/* 2. DARK RAIN CLOUD (Displaced Upwards) */}
        <g transform={`translate(960, ${cloudY})`} opacity={cloudOpacity}>
          <path
            d="M -140 0 Q -100 -70 0 -50 Q 80 -80 150 -30 Q 210 -15 190 55 Q 160 100 80 90 Q 0 110 -70 80 Q -160 90 -140 0 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth="5"
          />
          {/* Rain Lines falling */}
          {cloudOpacity > 0.5 &&
            [-80, -40, 0, 40, 80].map((rx, i) => (
              <line
                key={i}
                x1={rx}
                y1="85"
                x2={rx - 15}
                y2={150}
                stroke="#64748B"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
            ))}
        </g>

        {/* 3. CURATED STICKMAN */}
        <g transform="translate(960, 800)">
          <ellipse cx="0" cy="8" rx="85" ry="15" fill="#000000" opacity="0.3" />
          <CuratedStickman
            x={0}
            y={0}
            scale={1.1}
            pose={isSmiling ? "content" : "defeat"}
            mouth={isSmiling ? "smile" : "frown"}
            eyes={isSmiling ? "normal" : "defeat"}
            slumpProgress={isSmiling ? 0 : 0.75}
            frame={frame}
          />
        </g>

        {/* 4. BRIGHTLY WRAPPED GIFT BOX (Drops into hands at 960, 685) */}
        {isGiftDropped && (
          <g transform={`translate(960, ${giftY})`} filter="url(#gift-glow-s69)">
            {/* Box Base */}
            <rect x="-35" y="-35" width="70" height="70" rx="8" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
            {/* Gold Ribbon Cross */}
            <line x1="0" y1="-35" x2="0" y2="35" stroke="#FBBF24" strokeWidth="12" />
            <line x1="-35" y1="0" x2="35" y2="0" stroke="#FBBF24" strokeWidth="12" />

            {/* Box Lid (Opens upward if frame >= 55) */}
            <g transform={isGiftOpened ? `translate(0, ${-openAge * 4}) rotate(-25)` : undefined}>
              <rect x="-40" y="-45" width="80" height="18" rx="4" fill="#B91C1C" stroke="#991B1B" strokeWidth="2" />
              <line x1="0" y1="-45" x2="0" y2="-27" stroke="#FBBF24" strokeWidth="12" />
              {/* Bow */}
              <circle cx="-12" cy="-52" r="10" fill="none" stroke="#FBBF24" strokeWidth="4" />
              <circle cx="12" cy="-52" r="10" fill="none" stroke="#FBBF24" strokeWidth="4" />
            </g>
          </g>
        )}
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-purple-500/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-purple-200">
            PATHOGNOMONIC REACTIVITY: ATYPICAL DEPRESSION PATIENTS RETAIN THE BIOLOGICAL CAPACITY TO CHEER UP TEMPORARILY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
