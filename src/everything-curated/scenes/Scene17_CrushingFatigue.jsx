import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground, CuratedStickman, BallAndChain } from "../../shared";

/**
 * Scene 17: Profound Crushing Fatigue
 * 
 * Duration: 3.47 seconds (104 frames @ 30fps)
 * Audio Sync: [00:00:54,830 --> 00:00:58,285]
 * "Your body experiences profound, crushing fatigue."
 * 
 * Visual Choreography:
 * - Seamless continuation of Scene 16:
 *   - LEFT SIDE: The defeated stickman remains slumped under his thought cloud.
 *     The shattered gear pieces from Scene 16 finish falling and scattering away
 *     during the opening frames (0-30), leaving the cloud completely empty!
 *   - RIGHT SIDE: Hard-cut immediately displays the second stickman dragging
 *     the giant steel prison ball across the floor, actively straining against crushing fatigue.
 */
export const Scene17_CrushingFatigue = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = 104;
  const floorY = 850;

  // =========================================================================
  // 1. LEFT STICKMAN & THOUGHT CLOUD (CONTINUITY FROM SCENE 16)
  // =========================================================================
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

  const tailCircles = [
    { cx: -60, cy: 130, r: 32 },
    { cx: -130, cy: 210, r: 20 },
    { cx: -180, cy: 280, r: 12 },
  ];

  // Particle physics continuing from Scene 16 (shattered at frame 60 of Scene 16; Scene 16 ends at frame 91 => offset = 31)
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

  // =========================================================================
  // 2. RIGHT STICKMAN: HARD CUT DISPLAY ON RIGHT + DRAGS GIANT STEEL BALL
  // =========================================================================
  // Continuous heavy forward drag progress
  const crawlForward = (frame / totalFrames) * 60;
  const rightStickmanX = 1380 + crawlForward;
  const stickmanScale = 1.25;

  // Dynamic leg drag kinematics (synced with CuratedStickman's isDragging pose)
  const dragCycle = ((frame % 36) / 36) * 2 * Math.PI;
  const pSin = Math.sin(dragCycle);
  const backDrag = Math.max(0, -pSin) * 32;

  // Exact coordinates of the dragged back ankle in world space
  const botW = 48;
  const torsoBottomX = -10;
  const backAnkleX = rightStickmanX + (torsoBottomX - botW * 1.8 + backDrag) * stickmanScale + 12;
  const backAnkleY = floorY - 14;

  // Giant steel prison ball drags behind on the floor
  const ballRadius = 96;
  const ballX = backAnkleX - 250;
  const ballY = floorY - ballRadius;

  // Scrape dust offset as the ball grates against the ground
  const scrapeOffset = (frame * 3.2) % 24;

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s17" />

      <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        
        {/* ================= COMMON FLOOR LINE ================= */}
        <line x1="0" y1={floorY} x2="1920" y2={floorY} stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

        {/* ================= LEFT SIDE: SCENE 16 CONTINUITY ================= */}
        {/* 1. Defeated Stickman */}
        <CuratedStickman
          x={250}
          y={floorY}
          scale={1.35}
          pose="defeat"
          slumpProgress={1}
          eyes="defeat-closed"
          mouth="frown"
          showSweat={true}
          frame={frame}
        />

        {/* 2. Overhead Thought Cloud (Gear pieces complete falling, then cloud stays empty) */}
        <g transform="translate(500, 220) scale(0.75)">
          {/* Cloud Outline */}
          <g stroke="#0F172A" strokeWidth="8" fill="#FFFFFF">
            {tailCircles.map((c, i) => <circle key={`t-${i}`} cx={c.cx} cy={c.cy} r={c.r} />)}
            <path d={cloudPath} strokeLinejoin="round" />
          </g>

          {/* Continuing Falling Shards from Scene 16: Complete flight & fade out by frame 30 */}
          {frame < 32 && (
            <g opacity={interpolate(frame, [16, 28], [1, 0], { extrapolateRight: "clamp" })}>
              {particles.map((p, i) => {
                const timeSinceBreak = 31 + frame;
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
            </g>
          )}
        </g>

        {/* ================= RIGHT SIDE: HARD CUT DRAGGING GIANT WEIGHT ================= */}
        <g id="right-weight-puller">
          {/* Giant Steel Prison Ball & Chain */}
          <BallAndChain
            ballX={ballX}
            ballY={ballY}
            radius={ballRadius}
            targetX={backAnkleX}
            targetY={backAnkleY}
            isTaut={true}
            dragProgress={frame / totalFrames}
          />

          {/* Ground Friction Scrape Marks & Dust Trails behind the ball */}
          <g opacity="0.75">
            <line
              x1={ballX - 160}
              y1={floorY + 2}
              x2={ballX - 10}
              y2={floorY + 2}
              stroke="#64748B"
              strokeWidth="4"
              strokeDasharray="14 7"
            />
            <line
              x1={ballX - 110}
              y1={floorY + 6}
              x2={ballX - 5}
              y2={floorY + 6}
              stroke="#94A3B8"
              strokeWidth="2.5"
              strokeDasharray="10 5"
            />
            {/* Friction dust particles */}
            <circle cx={ballX - 70 - scrapeOffset} cy={floorY - 6} r="4" fill="#CBD5E1" />
            <circle cx={ballX - 50 - scrapeOffset} cy={floorY - 10} r="5" fill="#94A3B8" />
            <circle cx={ballX - 30 - scrapeOffset} cy={floorY - 5} r="3" fill="#E2E8F0" />
          </g>

          {/* Canonical Straining Stickman (Pulling Weight) */}
          <CuratedStickman
            x={rightStickmanX}
            y={floorY}
            scale={stickmanScale}
            pose="dragging"
            eyes="look-right"
            mouth="grimace"
            showSweat={true}
            lookDirection="right"
            frame={frame}
          />

          {/* Muscular Exertion Vibration Lines around Pulling Stickman */}
          <g stroke="#0F172A" strokeWidth="3" strokeDasharray="3 7" strokeLinecap="round" opacity="0.55">
            <path d={`M ${rightStickmanX - 70} ${floorY - 240} Q ${rightStickmanX - 95} ${floorY - 190} ${rightStickmanX - 70} ${floorY - 140}`} />
            <path d={`M ${rightStickmanX - 50} ${floorY - 280} Q ${rightStickmanX - 75} ${floorY - 230} ${rightStickmanX - 50} ${floorY - 180}`} />
          </g>
        </g>

      </svg>
    </AbsoluteFill>
  );
};
