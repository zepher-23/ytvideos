import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { GridBackground, CuratedStickman } from "../../shared";

/**
 * Scene 16: The Rusted Gears (Cognitive Slowdown)
 * 
 * Duration: ~3.02 seconds (91 frames @ 30fps)
 * Audio Sync: [00:00:51,810 --> 00:00:54,830] "Your cognitive functions slow to a crawl."
 */
export const Scene16_CognitiveSlowdown = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === TIMELINE ===
  const rustStart = 25;
  const stopFrame = 55;
  const breakFrame = 60;
  
  const isBroken = frame >= breakFrame;
  const timeSinceBreak = Math.max(0, frame - breakFrame);

  // === THOUGHT CLOUD ANIMATION ===
  const cloudScaleRaw = spring({
    frame: frame - 2,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.8 },
  });
  // Scaled down by 25%
  const cloudScale = cloudScaleRaw * 0.75;
  
  // Shake only the gears as rust locks them up (prior to shattering)
  const gearShakeX = frame > 25 && frame < 60 ? Math.sin(frame * 4.2) * 5 : 0;
  const gearShakeY = frame > 25 && frame < 60 ? Math.cos(frame * 3.6) * 3 : 0;

  // === GEAR ANIMATION ===
  const gearProgress = Math.min(1, frame / stopFrame);
  const smoothStop = 1 - Math.pow(1 - gearProgress, 3);
  const baseRotation = smoothStop * 220;
  
  const shudder = frame > 25 && frame < 60 ? Math.sin(frame * 3.5) * 5 : 0;

  const rustOpacity = interpolate(frame, [rustStart, stopFrame], [0, 1], { 
    extrapolateRight: "clamp", 
    extrapolateLeft: "clamp" 
  });

  // === STICKMAN KINEMATICS ===
  const dynamicSlump = isBroken 
    ? interpolate(timeSinceBreak, [0, 15], [0.65, 1], { extrapolateRight: "clamp" })
    : 0.65;

  // === HELPER: THIN-STROKE GEAR GENERATOR ===
  const renderGear = (x, y, radius, teethCount, rot, color) => {
    return (
      <g transform={`translate(${x}, ${y}) rotate(${rot})`}>
        {Array.from({ length: teethCount }).map((_, i) => {
          const a = (i / teethCount) * 360;
          return (
            <path
              key={i}
              d={`M ${radius - 2} -12 L ${radius + 18} -8 L ${radius + 18} 8 L ${radius - 2} 12 Z`}
              fill={color}
              stroke="#0F172A"
              strokeWidth="4" 
              strokeLinejoin="round"
              transform={`rotate(${a})`}
            />
          );
        })}
        <circle cx="0" cy="0" r={radius} fill={color} stroke="#0F172A" strokeWidth="4" />
        <circle cx="0" cy="0" r={radius * 0.35} fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        <circle cx="0" cy={-radius * 0.65} r="3" fill="#0F172A" />
        <circle cx="0" cy={radius * 0.65} r="3" fill="#0F172A" />
        <circle cx={-radius * 0.65} cy="0" r="3" fill="#0F172A" />
        <circle cx={radius * 0.65} cy="0" r="3" fill="#0F172A" />
      </g>
    );
  };

  // === SHAPES & PATHS (Relative to Cloud Center) ===
  const cloudPath = `
    M -200 30 
    A 90 90 0 0 1 -150 -100 
    A 110 110 0 0 1 30 -160 
    A 120 120 0 0 1 230 -100 
    A 100 100 0 0 1 270 60 
    A 90 90 0 0 1 150 170 
    A 130 130 0 0 1 -100 160 
    A 80 80 0 0 1 -200 30 Z
  `;

  // Tail bubbles re-routed to originate from directly below the new overhead cloud position
  const tailCircles = [
    { cx: -60, cy: 130, r: 32 },
    { cx: -130, cy: 210, r: 20 },
    { cx: -180, cy: 280, r: 12 },
  ];

  // === HIGH-QUALITY PARTICLE SYSTEM ===
  const gravity = 2.2;
  const particles = [
    { type: 'arc', x: 0, y: 0, vx: -12, vy: -15, rotV: -5, color: '#B45309', s: 1.5 },
    { type: 'arc', x: 50, y: 20, vx: 14, vy: -12, rotV: 8, color: '#92400E', s: 1.2 },
    { type: 'arc', x: 20, y: 60, vx: 5, vy: 10, rotV: -6, color: '#78350F', s: 1.4 },
    { type: 'shard', x: -20, y: 10, vx: -18, vy: -5, rotV: -12, color: '#94A3B8', s: 1.5 },
    { type: 'shard', x: 40, y: -10, vx: 8, vy: -22, rotV: 15, color: '#B45309', s: 1.8 },
    { type: 'shard', x: 80, y: 40, vx: 20, vy: -8, rotV: -10, color: '#92400E', s: 1.3 },
    { type: 'shard', x: -10, y: 50, vx: -10, vy: 15, rotV: 14, color: '#78350F', s: 1.6 },
    { type: 'shard', x: 20, y: 20, vx: 2, vy: -18, rotV: 22, color: '#B45309', s: 0.8 },
    { type: 'shard', x: 20, y: 20, vx: -8, vy: 12, rotV: -18, color: '#94A3B8', s: 1.1 },
    { type: 'shard', x: 20, y: 20, vx: 22, vy: 2, rotV: 11, color: '#92400E', s: 0.9 },
    { type: 'tooth', x: 0, y: -20, vx: -6, vy: -25, rotV: 20, color: '#cbd5e1', s: 1.2 },
    { type: 'tooth', x: 60, y: 10, vx: 25, vy: -15, rotV: -25, color: '#B45309', s: 1.5 },
    { type: 'tooth', x: -30, y: 30, vx: -22, vy: 5, rotV: 18, color: '#92400E', s: 1.3 },
    { type: 'tooth', x: 40, y: 70, vx: 12, vy: 18, rotV: -15, color: '#78350F', s: 1.4 },
    { type: 'tooth', x: 20, y: 20, vx: -20, vy: -10, rotV: -28, color: '#78350F', s: 1.0 },
    { type: 'bolt', x: 20, y: 20, vx: -5, vy: -30, rotV: 0, color: '#0F172A', s: 1 },
    { type: 'bolt', x: 30, y: 30, vx: 15, vy: -20, rotV: 0, color: '#0F172A', s: 1.2 },
    { type: 'bolt', x: 10, y: 40, vx: -15, vy: 10, rotV: 0, color: '#0F172A', s: 0.9 },
  ];

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s16" />

      <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        
        {/* ================= FLOOR HORIZON LINE ================= */}
        <line x1="0" y1="850" x2="1920" y2="850" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

        {/* ================= CANONICAL STICKMAN (Positioned Left) ================= */}
        <CuratedStickman
          x={250}
          y={850}
          scale={1.35}
          pose="defeat" 
          slumpProgress={dynamicSlump}
          eyes="defeat-closed"
          mouth="frown"
          showSweat={true}
          frame={frame}
        />

        {/* ================= THOUGHT CLOUD (Moved Higher & Closer to overhead) ================= */}
        <g transform={`translate(500, 220) scale(${cloudScale})`}>
          {/* Outline Layer (Thin stroke) - STABLE, NO SHAKE */}
          <g stroke="#0F172A" strokeWidth="8" fill="#FFFFFF">
            {tailCircles.map((c, i) => <circle key={`t-${i}`} cx={c.cx} cy={c.cy} r={c.r} />)}
            <path d={cloudPath} strokeLinejoin="round" />
          </g>

          {/* --- INSIDE THE CLOUD: Active Gears (Shakes as rust locks them up) --- */}
          {!isBroken && (
            <g transform={`translate(${gearShakeX}, ${gearShakeY})`}>
                {/* Clean Steel Base */}
                <g>
                  {renderGear(-40, 10, 100, 12, baseRotation + shudder, "#94A3B8")}
                  {renderGear(130, -60, 70, 8, -baseRotation * 1.4 - 15 + shudder, "#cbd5e1")}
                  {renderGear(70, 110, 60, 7, -baseRotation * 1.6 + 10 + shudder, "#64748B")}
                </g>
                
                {/* Rust Overlay */}
                <g opacity={rustOpacity}>
                  {renderGear(-40, 10, 100, 12, baseRotation + shudder, "#B45309")}
                  {renderGear(130, -60, 70, 8, -baseRotation * 1.4 - 15 + shudder, "#92400E")}
                  {renderGear(70, 110, 60, 7, -baseRotation * 1.6 + 10 + shudder, "#78350F")}
                </g>
              </g>
            )}

            {/* Particle Explosion */}
            {isBroken && (
              <g>
                {particles.map((p, i) => {
                  const sX = p.x + p.vx * timeSinceBreak;
                  const sY = p.y + p.vy * timeSinceBreak + 0.5 * gravity * timeSinceBreak * timeSinceBreak;
                  const sRot = p.rotV * timeSinceBreak;
                  
                  let pathD = "";
                  if (p.type === 'shard') pathD = "M -12 12 L 16 4 L -4 -16 Z";
                  if (p.type === 'tooth') pathD = "M -8 8 L 8 8 L 5 -8 L -5 -8 Z";
                  if (p.type === 'arc') pathD = "M -25 0 A 25 25 0 0 1 25 0 L 32 -10 L 18 -15 L 12 -5 A 15 15 0 0 0 -12 -5 L -18 -15 L -32 -10 Z";
                  
                  return (
                    <g key={`p-${i}`} transform={`translate(${sX}, ${sY}) rotate(${sRot}) scale(${p.s})`}>
                      {p.type === 'bolt' ? (
                        <circle cx="0" cy="0" r="6" fill={p.color} stroke="#0F172A" strokeWidth="2" />
                      ) : (
                        <path d={pathD} fill={p.color} stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
                      )}
                    </g>
                  );
                })}
                
                {/* Impact Explosion Lines (Thin stroke) */}
                {timeSinceBreak < 10 && (
                  <g stroke="#0F172A" strokeWidth="6" strokeLinecap="round">
                    <line x1="0" y1="0" x2="-100" y2="-100" />
                    <line x1="0" y1="0" x2="100" y2="-120" />
                    <line x1="0" y1="0" x2="150" y2="40" />
                    <line x1="0" y1="0" x2="-100" y2="120" />
                  </g>
                )}
              </g>
            )}

        </g>
      </svg>
    </AbsoluteFill>
  );
};