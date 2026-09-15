import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 48: Social Burnout (Text flood)
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Sterile clinical setting with cracked glass floor (#0F172A).
 * - Characters & Props: Manic stickman, overwhelmed friend stickman, rapid-fire red speech bubbles,
 *   solid grey dividing barrier wall.
 * - Beginning (0-30f): Manic stickman stands left, friend stands listening right.
 * - Action/Climax (30-110f): Red jagged speech bubbles (#DC2626) erupt from manic stickman's mouth,
 *   expanding across the screen and pushing the overwhelmed friend back until he is flattened.
 * - Ending/Hold (110-180f): Speech bubbles solidify into an impassable grey wall separating them.
 */
export const Scene048_SocialBurnoutTextflood = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Manic talk jitter
  const isTalking = frame >= 30;
  const talkJitterX = isTalking ? Math.sin(frame * 1.6) * 4 : 0;

  // Friend push-back dynamics
  const pushProgress = interpolate(frame, [35, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const friendX = interpolate(pushProgress, [0, 1], [1350, 1720]);
  const friendScaleX = interpolate(pushProgress, [0.6, 1], [1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Solidifying wall transition at frame 110
  const isSolidWall = frame >= 110;
  const wallOpacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5 Exploding Speech Bubbles
  const bubbles = [
    { text: "#%!$ NO SLEEP!", startF: 32, x: 740, y: 560, scale: 1.1 },
    { text: "EVERYTHING CONNECTS!", startF: 44, x: 960, y: 440, scale: 1.25 },
    { text: "MILLION DOLLAR PLAN!", startF: 56, x: 1180, y: 580, scale: 1.2 },
    { text: "WHY ARE YOU SLOW?!", startF: 68, x: 1380, y: 420, scale: 1.3 },
    { text: "LISTEN TO ME!!!", startF: 80, x: 1560, y: 560, scale: 1.35 },
  ];

  return (
    <AbsoluteFill className="bg-[#0F172A] overflow-hidden select-none font-sans text-white">
      {/* Background Clinical Wall Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="clinic-grid-s48" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M 70 0 L 0 0 0 70" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
          </pattern>
        </defs>
        <rect width="100%" height="800" fill="url(#clinic-grid-s48)" />
      </svg>

      {/* Cracked Glass Floor at y=800 */}
      <div className="absolute top-[800px] left-0 right-0 bottom-0 bg-[#0A0F1D] border-t-2 border-cyan-500/40">
        <svg className="w-full h-full opacity-35" viewBox="0 0 1920 280">
          <path d="M 400 0 L 520 110 L 480 200 M 1100 0 L 1180 90 L 1140 220 M 1500 0 L 1620 140" stroke="#38BDF8" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-red-500 font-bold uppercase block mb-0.5">
            PRESSURED SPEECH SYMPTOM
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            SOCIAL BURNOUT: TEXT FLOOD
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="bubble-glow-s48" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#DC2626" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* 1. MANIC STICKMAN (Left x=520, y=780) */}
        <g transform={`translate(${520 + talkJitterX}, 780)`}>
          <CuratedStickman
            x={0}
            y={0}
            scale={1.05}
            pose="shock"
            mouth="shock"
            eyes="shock"
            showExclamation={true}
            frame={frame}
          />
        </g>

        {/* 2. RAPID-FIRE RED SPEECH BUBBLES */}
        {!isSolidWall &&
          bubbles.map((b, i) => {
            if (frame < b.startF) return null;
            const bAge = frame - b.startF;
            const bScale = interpolate(bAge, [0, 8], [0, b.scale], { extrapolateRight: "clamp" });
            return (
              <g
                key={i}
                transform={`translate(${b.x}, ${b.y}) scale(${bScale})`}
                filter="url(#bubble-glow-s48)"
              >
                {/* Jagged Speech Bubble Background */}
                <path
                  d="M -140 -40 L 140 -40 L 150 40 L 20 40 L -20 65 L -10 40 L -140 40 Z"
                  fill="#DC2626"
                  stroke="#FECACA"
                  strokeWidth="3"
                />
                <text
                  x="0"
                  y="8"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="18"
                  fontWeight="900"
                  letterSpacing="1"
                >
                  {b.text}
                </text>
              </g>
            );
          })}

        {/* 3. SOLID DIVIDING BARRIER WALL (Replaces bubbles at frame 110+) */}
        {isSolidWall && (
          <g opacity={wallOpacity} transform="translate(960, 220)">
            <rect
              x="-40"
              y="0"
              width="80"
              height="580"
              rx="12"
              fill="#475569"
              stroke="#94A3B8"
              strokeWidth="5"
            />
            {/* Wall Texture Stripes */}
            {[...Array(8)].map((_, idx) => (
              <line
                key={idx}
                x1="-35"
                y1={idx * 70 + 35}
                x2="35"
                y2={idx * 70 + 35}
                stroke="#334155"
                strokeWidth="4"
              />
            ))}
            <text
              x="0"
              y="300"
              textAnchor="middle"
              fill="#CBD5E1"
              fontSize="20"
              fontWeight="900"
              letterSpacing="3"
              transform="rotate(-90, 0, 300)"
            >
              SOCIAL ISOLATION
            </text>
          </g>
        )}

        {/* 4. OVERWHELMED FRIEND STICKMAN (Being Pushed and Squashed) */}
        <g transform={`translate(${friendX}, 780) scale(${friendScaleX}, 1)`}>
          <CuratedStickman
            x={0}
            y={0}
            scale={1.05}
            pose={pushProgress > 0.4 ? "defeat" : "shock"}
            mouth="frown"
            eyes={pushProgress > 0.4 ? "defeat" : "shock"}
            slumpProgress={pushProgress * 0.85}
            frame={frame}
          />
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            RELATIONAL DESTRUCTION: PRESSURING SPEECH AND IRRATIBILITY RAPIDLY SEVER CRITICAL SOCIAL SUPPORTS
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
