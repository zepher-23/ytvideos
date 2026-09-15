import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 47: Financial Ruin (Manic Delusion)
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Minimalist grey-and-white checkered perspective floor (#F8FAFC).
 * - Characters & Props: Child stickman with axe, giant vector credit card, flying money icons,
 *   heavy swinging iron wrecking ball demolishing card and background reality wall.
 * - Beginning (0-35f): Stickman holds giant credit card over head. "DESTRUCTIVE MANIA" types.
 * - Action/Climax (35-100f): Stickman hacks card with axe, money icons erupt and turn to grey dust.
 *   Massive wrecking ball swings down and demolishes the card in a cloud of debris.
 * - Ending/Hold (100-180f): Wrecking ball collides with background brick wall, cracking it completely.
 */
export const Scene047_FinancialRuinManicDelusion = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Axe chopping action (frames 35-85)
  const isChopping = frame >= 35 && frame < 85;
  const chopCycle = isChopping ? Math.sin((frame - 35) * 0.7) : 0;
  const axeAngle = isChopping ? -45 + chopCycle * 70 : -30;

  // Wrecking Ball Swing Dynamics (swings down from ceiling at frame 80)
  const isBallSwinging = frame >= 80;
  const ballAge = Math.max(0, frame - 80);
  const ballAngle = interpolate(ballAge, [0, 20], [-65, 15], {
    extrapolateRight: "clamp",
  });
  // Pivot: (960, -100), length: 800px
  const bRad = (ballAngle * Math.PI) / 180;
  const ballX = 960 + Math.sin(bRad) * 800;
  const ballY = -100 + Math.cos(bRad) * 800;

  // Impact on card occurs at frame 95
  const isCardCrushed = frame >= 95;
  const crushAge = Math.max(0, frame - 95);

  // Screen shake on ball impact
  const shakeX = isCardCrushed && crushAge < 25 ? Math.sin(crushAge * 2.4) * Math.max(0, 16 - crushAge * 0.7) : 0;
  const shakeY = isCardCrushed && crushAge < 25 ? Math.cos(crushAge * 2.8) * Math.max(0, 14 - crushAge * 0.6) : 0;

  return (
    <AbsoluteFill
      className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-slate-900"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* 3D Checkered Perspective Floor (y=780 to 1080) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="floor-fade-s47" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <polygon points="0,780 1920,780 1920,1080 0,1080" fill="url(#floor-fade-s47)" />
        {[-400, 0, 400, 800, 1200, 1600, 2000, 2400].map((vx, i) => (
          <line key={i} x1="960" y1="780" x2={vx} y2="1080" stroke="#94A3B8" strokeWidth="2" />
        ))}
        <line x1="0" y1="830" x2="1920" y2="830" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="0" y1="900" x2="1920" y2="900" stroke="#94A3B8" strokeWidth="2" />
        <line x1="0" y1="990" x2="1920" y2="990" stroke="#94A3B8" strokeWidth="2.5" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-white/90 border border-slate-300 shadow-lg backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-red-600 font-bold uppercase block mb-0.5">
            GRANDIOSE CONSUMPTION
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-slate-800 m-0 uppercase">
            FINANCIAL RUIN: MANIC DELUSION
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="credit-glow-s47" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#1D4ED8" floodOpacity="0.35" />
          </filter>
          <filter id="ball-shadow-s47" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="20" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* 1. GIANT BLUE CREDIT CARD (Center x=960, y=520) */}
        {!isCardCrushed ? (
          <g transform="translate(960, 520)" filter="url(#credit-glow-s47)">
            {/* Card Body */}
            <rect x="-240" y="-140" width="480" height="280" rx="20" fill="#1D4ED8" stroke="#3B82F6" strokeWidth="4" />
            {/* Chip */}
            <rect x="-180" y="-80" width="65" height="50" rx="8" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            {/* Card Number */}
            <text x="-180" y="30" fill="#FFFFFF" fontSize="24" fontWeight="bold" letterSpacing="4" fontFamily="monospace">
              •••• •••• •••• 9999
            </text>
            {/* Cardholder / Limit */}
            <text x="-180" y="80" fill="#93C5FD" fontSize="16" fontWeight="bold" letterSpacing="2">
              LIMIT: UNLIMITED DELUSION
            </text>
            <circle cx="160" cy="70" r="30" fill="#EF4444" opacity="0.8" />
            <circle cx="190" cy="70" r="30" fill="#F59E0B" opacity="0.8" />
          </g>
        ) : (
          /* Shattered Card Fragments */
          <g transform="translate(960, 520)">
            <rect
              x={-240 - crushAge * 8}
              y={-140 + crushAge * 4}
              width="240"
              height="140"
              rx="10"
              fill="#1D4ED8"
              transform={`rotate(-${crushAge * 12})`}
            />
            <rect
              x={crushAge * 9}
              y={-140 + crushAge * 6}
              width="240"
              height="140"
              rx="10"
              fill="#1E40AF"
              transform={`rotate(${crushAge * 15})`}
            />
          </g>
        )}

        {/* 2. FLYING MONEY ICONS TURNING INTO DUST (Frames 40 to 85) */}
        {isChopping &&
          [...Array(6)].map((_, i) => {
            const age = (frame - 35 + i * 8) % 30;
            const mX = 960 + (i % 2 === 0 ? 1 : -1) * (age * 9 + i * 20);
            const mY = 520 - age * 7;
            const isDust = age > 18;
            return (
              <g key={i} opacity={interpolate(age, [0, 10, 30], [0, 1, 0])}>
                {!isDust ? (
                  <g transform={`translate(${mX}, ${mY})`}>
                    <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
                    <text x="0" y="5" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
                      $
                    </text>
                  </g>
                ) : (
                  /* Grey Dust Cloud */
                  <circle cx={mX} cy={mY} r="8" fill="#94A3B8" opacity="0.6" />
                )}
              </g>
            );
          })}

        {/* 3. CHILD STICKMAN WITH AXE (x=680, y=800) */}
        <g transform="translate(680, 800)">
          {/* Canonical Stickman Child */}
          <CuratedStickman
            x={0}
            y={0}
            variant="child"
            scale={0.92}
            pose="shock"
            mouth="shock"
            eyes="shock"
            frame={frame}
          />

          {/* Chopping Axe in Hand */}
          <g transform={`translate(20, -50) rotate(${axeAngle})`}>
            {/* Wooden Shaft */}
            <line x1="0" y1="0" x2="60" y2="-40" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            {/* Steel Axe Head */}
            <path d="M 50 -55 L 75 -65 L 70 -25 L 45 -35 Z" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          </g>
        </g>

        {/* 4. HEAVY WRECKING BALL ON CHAIN (Frame >= 80) */}
        {isBallSwinging && (
          <g filter="url(#ball-shadow-s47)">
            {/* Heavy Iron Chain from (960, -100) to (ballX, ballY) */}
            <line x1="960" y1="-100" x2={ballX} y2={ballY} stroke="#1E293B" strokeWidth="10" strokeDasharray="16 8" />
            {/* Massive Cast Iron Sphere */}
            <circle cx={ballX} cy={ballY} r="85" fill="#0F172A" stroke="#475569" strokeWidth="6" />
            <circle cx={ballX - 25} cy={ballY - 25} r="18" fill="#94A3B8" opacity="0.3" />
          </g>
        )}
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            MANIC BEHAVIOR: HYPER-IMPULSIVE SPENDING DESTROYS ASSETS BEFORE DEPRESSION SETS IN
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
