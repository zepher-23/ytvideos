import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 42: Breaking the Pendulum Rhythm
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Clean off-white minimalist background (#F8FAFC).
 * - Characters & Props: Brass pendulum, massive jagged blue spike ("SSRI TENSION"),
 *   destabilized "MANIA" & "DEPRESSION" peak bubbles colliding and cracking.
 * - Beginning (0-40f): Pendulum swings smoothly between peaks.
 * - Action/Climax (40-100f): Jagged blue spike flies in from right, shatters pendulum shaft on impact.
 *   Brass bob flies erratically off-screen; shattered shards disperse.
 * - Ending/Hold (100-180f): "MANIA" and "DEPRESSION" bubbles collide in the center and crack.
 */
export const Scene042_BreakingthePendulumRhythm = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Pre-impact pendulum swing (frames 0-42)
  const isShattered = frame >= 42;
  const shatterAge = Math.max(0, frame - 42);

  let pendulumAngle = 0;
  if (frame < 42) {
    pendulumAngle = Math.sin(frame * 0.12 - Math.PI / 2) * 50;
  }

  // Pivot point: (960, 140), arm: 500px
  const armLen = 500;
  const rad = (pendulumAngle * Math.PI) / 180;
  const bobX = 960 + Math.sin(rad) * armLen;
  const bobY = 140 + Math.cos(rad) * armLen;

  // Blue Spike "SSRI TENSION" trajectory: flies in from x=2000 -> x=960 at frame 42
  const spikeX = interpolate(frame, [25, 42], [2000, 960], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Post-impact screen shake
  const shakeX = isShattered && shatterAge < 25 ? Math.sin(shatterAge * 2.2) * Math.max(0, 16 - shatterAge * 0.7) : 0;
  const shakeY = isShattered && shatterAge < 25 ? Math.cos(shatterAge * 2.6) * Math.max(0, 14 - shatterAge * 0.6) : 0;

  // Free-falling erratic bob post impact
  const brokenBobX = 960 + shatterAge * 8;
  const brokenBobY = 640 + 0.5 * 1.8 * shatterAge * shatterAge;
  const brokenBobRot = shatterAge * 15;

  // Shards dispersion
  const s1X = 960 - shatterAge * 9;
  const s1Y = 380 - shatterAge * 4 + 0.4 * shatterAge * shatterAge;
  const s2X = 960 + shatterAge * 7;
  const s2Y = 460 - shatterAge * 6 + 0.5 * shatterAge * shatterAge;

  // Peak badges collision motion: inward pull starting at frame 70
  const bubbleCollapse = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const maniaX = interpolate(bubbleCollapse, [0, 1], [520, 870]);
  const depressionX = interpolate(bubbleCollapse, [0, 1], [1400, 1050]);
  const hasCollided = frame >= 110;

  return (
    <AbsoluteFill
      className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-slate-900"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s42" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s42)" />
      </svg>

      {/* Top Header */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-white/90 border border-slate-300 shadow-md backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-blue-600 font-bold uppercase block mb-0.5">
            MECHANICAL DISRUPTION
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-slate-800 m-0 uppercase">
            BREAKING THE PENDULUM RHYTHM
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="brass-glow-s42" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#D97706" floodOpacity="0.4" />
          </filter>
          <filter id="spike-glow-s42" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#2563EB" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Top Pivot Mount (960, 140) */}
        <g transform="translate(960, 140)">
          <rect x="-60" y="-15" width="120" height="30" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="3" />
          <circle cx="0" cy="0" r="16" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" />
        </g>

        {/* 1. INTACT PENDULUM (Before Shatter) */}
        {!isShattered && (
          <g filter="url(#brass-glow-s42)">
            <line x1="960" y1="140" x2={bobX} y2={bobY} stroke="#D97706" strokeWidth="10" strokeLinecap="round" />
            <line x1="960" y1="140" x2={bobX} y2={bobY} stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
            <circle cx={bobX} cy={bobY} r="54" fill="#B45309" stroke="#FBBF24" strokeWidth="6" />
          </g>
        )}

        {/* 2. SHATTERED SHARDS & FALLING BOB (After Shatter) */}
        {isShattered && (
          <g>
            {/* Upper Stub */}
            <line x1="960" y1="140" x2="960" y2="280" stroke="#D97706" strokeWidth="10" strokeLinecap="round" />
            {/* Shard 1 flying left */}
            <line
              x1={s1X}
              y1={s1Y}
              x2={s1X - 45}
              y2={s1Y + 30}
              stroke="#D97706"
              strokeWidth="8"
              strokeLinecap="round"
              transform={`rotate(${shatterAge * 18}, ${s1X}, ${s1Y})`}
            />
            {/* Shard 2 flying right */}
            <line
              x1={s2X}
              y1={s2Y}
              x2={s2X + 35}
              y2={s2Y + 45}
              stroke="#FBBF24"
              strokeWidth="7"
              strokeLinecap="round"
              transform={`rotate(-${shatterAge * 22}, ${s2X}, ${s2Y})`}
            />
            {/* Tumbling Brass Bob */}
            <g transform={`translate(${brokenBobX}, ${brokenBobY}) rotate(${brokenBobRot})`}>
              <circle cx="0" cy="0" r="54" fill="#B45309" stroke="#FBBF24" strokeWidth="6" />
            </g>

            {/* Impact Flash Sparks */}
            {shatterAge < 16 && (
              <g transform="translate(960, 420)">
                {[...Array(12)].map((_, i) => {
                  const angle = (i * Math.PI) / 6;
                  const dist = shatterAge * 14;
                  return (
                    <line
                      key={i}
                      x1={Math.cos(angle) * (dist * 0.4)}
                      y1={Math.sin(angle) * (dist * 0.4)}
                      x2={Math.cos(angle) * dist}
                      y2={Math.sin(angle) * dist}
                      stroke="#38BDF8"
                      strokeWidth="3"
                    />
                  );
                })}
              </g>
            )}
          </g>
        )}

        {/* 3. MASSIVE JAGGED BLUE SPIKE: "SSRI TENSION" */}
        <g transform={`translate(${spikeX}, 420)`} filter="url(#spike-glow-s42)">
          {/* Jagged Spike Shape */}
          <path
            d="M 0 0 L 180 -50 L 160 -15 L 360 -40 L 320 0 L 360 40 L 160 15 L 180 50 Z"
            fill="#2563EB"
            stroke="#93C5FD"
            strokeWidth="4"
          />
          <text x="180" y="8" fill="#FFFFFF" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="2">
            SSRI TENSION
          </text>
        </g>

        {/* 4. PEAK BUBBLES: MANIA (Left) & DEPRESSION (Right) */}
        {/* MANIA CARD */}
        <g transform={`translate(${maniaX}, 520)`}>
          <rect
            x="-100"
            y="-32"
            width="200"
            height="64"
            rx="16"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="3"
          />
          <text x="0" y="8" textAnchor="middle" fill="#B45309" fontSize="24" fontWeight="900" letterSpacing="2">
            MANIA
          </text>
          {/* Crack Lines on Collision */}
          {hasCollided && (
            <path d="M 40 -30 L 60 0 L 45 15 L 75 30" stroke="#DC2626" strokeWidth="3" fill="none" />
          )}
        </g>

        {/* DEPRESSION CARD */}
        <g transform={`translate(${depressionX}, 520)`}>
          <rect
            x="-120"
            y="-32"
            width="240"
            height="64"
            rx="16"
            fill="#DBEAFE"
            stroke="#2563EB"
            strokeWidth="3"
          />
          <text x="0" y="8" textAnchor="middle" fill="#1E40AF" fontSize="24" fontWeight="900" letterSpacing="2">
            DEPRESSION
          </text>
          {/* Crack Lines on Collision */}
          {hasCollided && (
            <path d="M -60 -30 L -40 -5 L -55 10 L -35 30" stroke="#DC2626" strokeWidth="3" fill="none" />
          )}
        </g>
      </svg>

      {/* Bottom Footer Card */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-200">
            SHATTERED REGULATION: ARTIFICIAL SEROTONIN TENSION BREAKS NATURAL BIPOLAR HOMEOSTASIS
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
