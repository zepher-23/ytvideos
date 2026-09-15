import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 49: The crash
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Stylized glowing rollercoaster track high above a pitch-black abyss (#000000).
 * - Characters & Props: Rollercoaster cart perched on unstable glowing yellow peak ("MANIC PEAK"),
 *   shattering rails, freefalling cart, smoking severed track wreckage.
 * - Beginning (0-48f): Cart vibrates furiously atop peak, emitting electrical sparks.
 * - Action/Climax (48-120f): Track shatters! Cart tumbles into a vertical 90-degree freefall into the abyss.
 * - Ending/Hold (120-210f): Cart vanishes into bottomless darkness; only severed red smoking tracks remain.
 */
export const Scene049_Thecrash = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Pre-break vibration
  const isBroken = frame >= 48;
  const breakAge = Math.max(0, frame - 48);
  const cartVibe = !isBroken ? Math.sin(frame * 2.8) * 5 : 0;

  // Freefall physics
  const cartY = !isBroken ? 260 : 260 + 0.5 * 1.7 * breakAge * breakAge;
  const cartRot = !isBroken ? 0 : Math.min(95, breakAge * 7);
  const cartOpacity = interpolate(cartY, [900, 1150], [1, 0], { extrapolateRight: "clamp" });

  // Screen shake on track snap
  const shakeX = isBroken && breakAge < 30 ? Math.sin(breakAge * 2.4) * Math.max(0, 16 - breakAge * 0.5) : 0;
  const shakeY = isBroken && breakAge < 30 ? Math.cos(breakAge * 2.6) * Math.max(0, 14 - breakAge * 0.5) : 0;

  return (
    <AbsoluteFill
      className="bg-black overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Dynamic Background Abyss Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 20%, rgba(234, 179, 8, 0.25) 0%, rgba(0,0,0,1) 75%)",
        }}
      />

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-black/85 border border-red-800 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-red-500 font-bold uppercase block mb-0.5">
            CATASTROPHIC DOWNTURN
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            THE CRASH: POST-MANIC PLUNGE
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="peak-glow-s49" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#FDE047" floodOpacity="0.8" />
          </filter>
          <filter id="wreck-glow-s49" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#DC2626" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. ROLLERCOASTER TRACK ARCH */}
        {/* Left ascending rail */}
        <path
          d="M 100 1080 Q 400 800 700 500 T 920 310"
          fill="none"
          stroke={isBroken ? "#DC2626" : "#FDE047"}
          strokeWidth="10"
          strokeLinecap="round"
          filter={isBroken ? "url(#wreck-glow-s49)" : "url(#peak-glow-s49)"}
        />
        {/* Ties on left rail */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={200 + i * 90}
            y1={1000 - i * 85}
            x2={230 + i * 90}
            y2={970 - i * 85}
            stroke="#64748B"
            strokeWidth="6"
          />
        ))}

        {/* Right descending rail (Shattered Gap between 920 and 1000) */}
        {!isBroken ? (
          /* Continuous intact crest */
          <path
            d="M 920 310 Q 960 300 1000 310 Q 1300 500 1600 800 T 1820 1080"
            fill="none"
            stroke="#FDE047"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#peak-glow-s49)"
          />
        ) : (
          /* Severed right rail starting at 1020 */
          <g>
            <path
              d="M 1020 340 Q 1300 500 1600 800 T 1820 1080"
              fill="none"
              stroke="#DC2626"
              strokeWidth="10"
              strokeLinecap="round"
              filter="url(#wreck-glow-s49)"
            />
            {/* Twisted Jagged Rail Ends */}
            <line x1="920" y1="310" x2="940" y2="335" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" />
            <line x1="1020" y1="340" x2="1005" y2="365" stroke="#DC2626" strokeWidth="8" strokeLinecap="round" />

            {/* Crackling Sparks at Severed Point */}
            {[...Array(6)].map((_, i) => {
              const sAngle = (i * Math.PI) / 3 + frame * 0.4;
              return (
                <line
                  key={i}
                  x1={960}
                  y1={320}
                  x2={960 + Math.cos(sAngle) * 25}
                  y2={320 + Math.sin(sAngle) * 25}
                  stroke="#FEF08A"
                  strokeWidth="3"
                />
              );
            })}
          </g>
        )}

        {/* 2. ROLLERCOASTER CART (Vibrates, then Plummets) */}
        <g
          transform={`translate(${960}, ${cartY}) rotate(${cartRot}) translate(-960, -${cartY})`}
          opacity={cartOpacity}
        >
          <g transform={`translate(${960 + cartVibe}, ${cartY})`}>
            {/* Cart Body */}
            <rect x="-65" y="-35" width="130" height="55" rx="10" fill="#EF4444" stroke="#DC2626" strokeWidth="4" />
            <rect x="-55" y="-25" width="110" height="25" rx="4" fill="#1E293B" />

            {/* Front Headlight Beam */}
            <polygon points="65,-15 280,-40 280,30 65,15" fill="#FEF08A" opacity="0.3" />

            {/* Wheels */}
            <circle cx="-40" cy="28" r="14" fill="#334155" stroke="#CBD5E1" strokeWidth="4" />
            <circle cx="40" cy="28" r="14" fill="#334155" stroke="#CBD5E1" strokeWidth="4" />

            {/* Sparks during pre-break vibration */}
            {!isBroken &&
              [...Array(4)].map((_, i) => (
                <circle
                  key={i}
                  cx={-30 + i * 20 + Math.sin(frame * 2 + i) * 10}
                  cy={35 + Math.cos(frame * 2 + i) * 8}
                  r="2.5"
                  fill="#FEF08A"
                />
              ))}
          </g>
        </g>
      </svg>

      {/* Warning Peak Label */}
      <div className="absolute top-[180px] left-0 right-0 flex justify-center items-center pointer-events-none z-20">
        <div className="px-6 py-1.5 rounded-full bg-amber-500/90 text-black font-black tracking-widest text-sm uppercase shadow-xl">
          MANIC PEAK (+100)
        </div>
      </div>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-red-900 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-red-300">
            THE UNAVOIDABLE PLUNGE: MANIC EPISODES INEVITABLY COLLAPSE INTO CRUSHING REFRACTORY DEPRESSION
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
