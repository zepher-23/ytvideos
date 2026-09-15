import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 46: Destructive Mania (Kicking stickman)
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Minimalist grey-and-white checkered tile perspective floor (#F8FAFC).
 * - Characters & Props: Child stickman glowing angry red with heat waves,
 *   prop brick wall labeled "CAREER / RELATIONSHIPS", falling brick shrapnel.
 * - Beginning (0-35f): Child stickman stands next to wall, radiating angry red heat waves.
 * - Action/Climax (35-120f): "VOLATILE" types above. Stickman violently kicks and punches the wall,
 *   sending red stress cracks propagating through mortar lines.
 * - Ending/Hold (120-180f): A major brick dislodges and shatters onto the checkered floor.
 */
export const Scene046_DestructiveManiaKickingstickman = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Violent kicking/punching motion after frame 35
  const isKicking = frame >= 35;
  const kickCycle = isKicking ? Math.sin((frame - 35) * 0.6) : 0;
  const stickmanX = 640 + (isKicking ? Math.max(0, kickCycle) * 35 : 0);
  const kickLegRot = isKicking ? Math.max(0, kickCycle) * 45 : 0;

  // Screen shake on kick impact (peaks when kickCycle > 0.85)
  const isImpact = isKicking && kickCycle > 0.8;
  const shakeX = isImpact ? (Math.random() - 0.5) * 12 : 0;
  const shakeY = isImpact ? (Math.random() - 0.5) * 8 : 0;

  // Brick dislodge and fall at frame 125
  const isBrickFallen = frame >= 125;
  const fallAge = Math.max(0, frame - 125);
  const brickY = isBrickFallen ? 480 + 0.5 * 1.5 * fallAge * fallAge : 480;
  const brickRot = isBrickFallen ? fallAge * 14 : 0;
  const clampedBrickY = Math.min(840, brickY);
  const hasShattered = clampedBrickY >= 840;

  // Number of crack lines revealed based on kicks
  const crackProgress = interpolate(frame, [35, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-slate-900"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* 3D Checkered Perspective Floor (y=750 to 1080) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="floor-fade-s46" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Floor Base */}
        <polygon points="0,780 1920,780 1920,1080 0,1080" fill="url(#floor-fade-s46)" />
        {/* Perspective Grid Lines */}
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
            BEHAVIORAL ESCALATION
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-slate-800 m-0 uppercase">
            DESTRUCTIVE MANIA: VOLATILE IMPULSES
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="rage-glow-s46" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#DC2626" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* BRICK WALL (x=980 to 1540, y=280 to 820) */}
        <g transform="translate(980, 280)">
          {/* Wall Backing & Mortar */}
          <rect x="0" y="0" width="560" height="540" rx="12" fill="#475569" stroke="#1E293B" strokeWidth="6" />

          {/* Wall Header Plate */}
          <rect x="0" y="-45" width="560" height="45" rx="8" fill="#1E293B" />
          <text x="280" y="-15" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" letterSpacing="3">
            CAREER & RELATIONSHIPS
          </text>

          {/* Brick Grid Texture */}
          {[...Array(6)].map((_, row) => {
            const y = row * 90;
            const isOffset = row % 2 === 1;
            return (
              <g key={row}>
                <line x1="0" y1={y} x2="560" y2={y} stroke="#334155" strokeWidth="5" />
                {[...Array(4)].map((_, col) => {
                  const x = col * 140 + (isOffset ? 70 : 0);
                  return (
                    <rect
                      key={col}
                      x={x + 4}
                      y={y + 4}
                      width="132"
                      height="82"
                      rx="4"
                      fill="#64748B"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Red Fracture Cracks Across Wall */}
          {crackProgress > 0 && (
            <path
              d="M 10 320 L 90 280 L 160 330 L 250 290 L 320 360 M 90 280 L 80 180 L 140 140 M 160 330 L 210 440 L 190 500"
              fill="none"
              stroke="#DC2626"
              strokeWidth={3 + crackProgress * 3}
              strokeLinecap="round"
              opacity={crackProgress}
            />
          )}

          {/* Major Dislodging Brick at (x=20, y=200) */}
          {!isBrickFallen ? (
            <rect x="18" y="196" width="132" height="82" rx="4" fill="#94A3B8" stroke="#DC2626" strokeWidth="3" />
          ) : (
            /* Empty socket */
            <rect x="18" y="196" width="132" height="82" rx="4" fill="#1E293B" />
          )}
        </g>

        {/* FALLING & SHATTERING BRICK */}
        {isBrickFallen && (
          <g transform={`translate(${1000}, ${clampedBrickY}) rotate(${brickRot})`}>
            {!hasShattered ? (
              <rect x="-66" y="-41" width="132" height="82" rx="4" fill="#64748B" stroke="#DC2626" strokeWidth="3" />
            ) : (
              /* Shattered Shards */
              <g>
                <rect x="-60" y="-20" width="40" height="30" rx="3" fill="#64748B" />
                <rect x="-10" y="-30" width="35" height="25" rx="3" fill="#94A3B8" />
                <rect x="30" y="-15" width="45" height="28" rx="3" fill="#475569" />
              </g>
            )}
          </g>
        )}

        {/* CHILD STICKMAN (Glowing Angry Red with Heat Waves) */}
        <g transform={`translate(${stickmanX}, 800)`} filter="url(#rage-glow-s46)">
          {/* Radiating Heat Waves */}
          {[...Array(3)].map((_, i) => (
            <path
              key={i}
              d={`M ${-70 - i * 15} -140 Q ${-50 - i * 15} -80 ${-70 - i * 15} -20`}
              fill="none"
              stroke="#DC2626"
              strokeWidth="3"
              strokeDasharray="4 4"
              opacity={0.7}
            />
          ))}

          {/* Canonical CuratedStickman Child Model */}
          <CuratedStickman
            x={0}
            y={0}
            variant="child"
            scale={0.9}
            pose="shock"
            mouth="shock"
            eyes="shock"
            frame={frame}
          />

          {/* Extended Kicking Leg Arc */}
          {isKicking && (
            <line
              x1="10"
              y1="-30"
              x2={40 + kickLegRot * 1.5}
              y2={-30 - kickLegRot * 0.4}
              stroke="#000000"
              strokeWidth="7"
              strokeLinecap="round"
            />
          )}
        </g>
      </svg>

      {/* "VOLATILE" Badge (Top of Wall) */}
      {isKicking && (
        <div className="absolute top-[200px] left-[780px] pointer-events-none z-30">
          <div className="px-6 py-2 rounded-xl bg-red-600 text-white font-black tracking-widest text-lg uppercase shadow-2xl border border-red-400 animate-pulse">
            VOLATILE ACTION
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            HYPOMANIC TO MANIC SWITCH: DESTRUCTIVE IMPULSIVITY DECIMATES PERSONAL STABILITY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
