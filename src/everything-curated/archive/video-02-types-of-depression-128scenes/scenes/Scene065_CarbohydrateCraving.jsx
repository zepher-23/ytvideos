import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 65: Carbohydrate Craving
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Deep royal purple background (#4A044E / #581C87).
 * - Characters & Props: CuratedStickman gazing up, giant vector food assortment,
 *   glowing cyan thought bubble (#06B6D4) with bread, pasta, sugar, and glucose formulas.
 * - Beginning (0-30f): Stickman stands beside massive food platter in purple realm.
 * - Action/Climax (30-85f): Glowing cyan thought bubble manifests above stickman's head showing intense carb cravings.
 * - Ending/Hold (85-150f): "VIOLENT CARBOHYDRATE CRAVING" types above as electrical impulses pulse into the head.
 */
export const Scene065_CarbohydrateCraving = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Cyan Thought Bubble manifestation at frame 30
  const bubbleFrame = Math.max(0, frame - 30);
  const bubbleSpring = spring({
    frame: bubbleFrame,
    fps,
    config: { damping: 12, stiffness: 130 },
  });
  const bubbleScale = frame < 30 ? 0 : interpolate(bubbleSpring, [0, 1], [0.3, 1]);
  const bubbleOpacity = interpolate(bubbleFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  // Bio-pulse of thought bubble
  const bubblePulse = 1 + Math.sin(frame * 0.22) * 0.04;

  return (
    <AbsoluteFill className="bg-[#4A044E] overflow-hidden select-none font-sans text-white">
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, rgba(74, 4, 78, 1) 85%)",
        }}
      />

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-black/85 border border-purple-400/80 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-0.5">
            NEUROCHEMICAL COMPULSION
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            VIOLENT CARBOHYDRATE CRAVING
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="cyan-thought-glow-s65" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#06B6D4" floodOpacity="0.85" />
          </filter>
        </defs>

        {/* Floor Horizon */}
        <line x1="200" y1="820" x2="1720" y2="820" stroke="#701A75" strokeWidth="4" />

        {/* 1. CURATED STICKMAN (Left x=600, y=810) */}
        <g transform="translate(600, 810)">
          <ellipse cx="0" cy="8" rx="85" ry="14" fill="#000000" opacity="0.3" />
          <CuratedStickman
            x={0}
            y={0}
            scale={1.05}
            pose="shock"
            mouth="shock"
            eyes="shock"
            reachProgress={0.4}
            reachDirection="right"
            frame={frame}
          />
        </g>

        {/* 2. GIANT FOOD PLATTER (Right x=1350, y=810) */}
        <g transform="translate(1350, 770)">
          {/* Table Surface */}
          <rect x="-240" y="20" width="480" height="24" rx="8" fill="#2E1065" stroke="#9333EA" strokeWidth="3" />
          <line x1="-180" y1="44" x2="-180" y2="120" stroke="#2E1065" strokeWidth="12" />
          <line x1="180" y1="44" x2="180" y2="120" stroke="#2E1065" strokeWidth="12" />

          {/* Stacking Donuts & Pastries */}
          <g transform="translate(-100, -10)">
            <circle cx="0" cy="0" r="45" fill="#F472B6" stroke="#BE185D" strokeWidth="5" />
            <circle cx="0" cy="0" r="16" fill="#4A044E" />
            <circle cx="-14" cy="-14" r="3" fill="#FEF08A" />
            <circle cx="15" cy="-8" r="3" fill="#38BDF8" />
          </g>

          {/* Giant Slice of Pizza */}
          <g transform="translate(60, -25) rotate(15)">
            <polygon points="0,-60 60,40 -60,40" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
            <circle cx="0" cy="5" r="9" fill="#DC2626" />
            <circle cx="-20" cy="20" r="8" fill="#DC2626" />
            <circle cx="20" cy="20" r="8" fill="#DC2626" />
          </g>
        </g>

        {/* 3. GLOWING CYAN THOUGHT BUBBLE (Center x=960, y=420) */}
        {bubbleOpacity > 0 && (
          <g
            transform={`translate(960, 420) scale(${bubbleScale * bubblePulse}) translate(-960, -420)`}
            opacity={bubbleOpacity}
            filter="url(#cyan-thought-glow-s65)"
          >
            {/* Connecting Thought Nodes from Stickman Head */}
            <circle cx="720" cy="620" r="14" fill="#06B6D4" />
            <circle cx="790" cy="540" r="22" fill="#06B6D4" />
            <circle cx="860" cy="480" r="32" fill="#06B6D4" />

            {/* Main Cloud Body */}
            <g transform="translate(960, 360)">
              <rect x="-260" y="-120" width="520" height="240" rx="60" fill="#083344" stroke="#22D3EE" strokeWidth="5" />

              {/* Inside Carb Icons & Labels */}
              {/* Icon 1: Bread Loaf */}
              <g transform="translate(-160, -20)">
                <ellipse cx="0" cy="0" rx="42" ry="24" fill="#D97706" stroke="#FEF08A" strokeWidth="3" />
                <line x1="-20" y1="-12" x2="-20" y2="12" stroke="#78350F" strokeWidth="3" />
                <line x1="0" y1="-14" x2="0" y2="14" stroke="#78350F" strokeWidth="3" />
                <line x1="20" y1="-12" x2="20" y2="12" stroke="#78350F" strokeWidth="3" />
                <text x="0" y="44" textAnchor="middle" fill="#67E8F9" fontSize="13" fontWeight="bold">
                  BREAD
                </text>
              </g>

              {/* Icon 2: Pasta Bowl */}
              <g transform="translate(0, -20)">
                <path d="M -40 0 C -40 30, 40 30, 40 0 Z" fill="#FBBF24" stroke="#FEF08A" strokeWidth="3" />
                <path d="M -30 -5 Q 0 -25 30 -5 M -20 -15 Q 0 -35 20 -15" fill="none" stroke="#FDE047" strokeWidth="3" />
                <text x="0" y="44" textAnchor="middle" fill="#67E8F9" fontSize="13" fontWeight="bold">
                  PASTA
                </text>
              </g>

              {/* Icon 3: Sugar Molecule */}
              <g transform="translate(160, -20)">
                <polygon points="0,-24 22,-12 22,12 0,24 -22,12 -22,-12" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
                <text x="0" y="6" textAnchor="middle" fill="#0284C7" fontSize="12" fontWeight="900">
                  C₆H₁₂O₆
                </text>
                <text x="0" y="44" textAnchor="middle" fill="#67E8F9" fontSize="13" fontWeight="bold">
                  SUGAR
                </text>
              </g>

              {/* Top Banner inside thought */}
              <text x="0" y="-80" textAnchor="middle" fill="#A5F3FC" fontSize="15" fontWeight="900" letterSpacing="2">
                RAPID TRYPTOPHAN SEEKING
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-purple-500 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-purple-200">
            PHYSIOLOGICAL SELF-MEDICATION: CARBOHYDRATE CRAVINGS SPIKE INSULIN TO FORCE TRYPTOPHAN ACROSS THE BLOOD-BRAIN BARRIER
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
