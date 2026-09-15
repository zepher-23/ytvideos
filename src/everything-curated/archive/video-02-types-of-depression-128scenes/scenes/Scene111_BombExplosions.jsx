import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 111: Bomb Explosions
 * Duration: 150 frames (5.0s)
 * Environment: The planner from Scene 110 close up.
 * Characters & Props: Planner squares. Explosions.
 * Action:
 * - Beginning: Three planner squares contain the lit bombs from Scene 110.
 * - Action / Climax: All three bombs simultaneously explode in massive, screen-filling vector dust clouds (represented by concentric expanding jagged rings).
 * - Ending / Hold: Text "EXPLOSIVE RAGE" slams onto the screen.
 * Text & Specific Colors: Explosions use grey and orange (#94A3B8, #F97316). Text black.
 */
export const Scene111_BombExplosions = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Detonation frame: 35
  const hasExploded = frame >= 35;
  const explosionFrame = Math.max(0, frame - 35);

  // Screen shake on detonation
  const shakeIntensity = interpolate(frame, [35, 42, 70, 110], [0, 28, 6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 2.1) * shakeIntensity;
  const shakeY = Math.cos(frame * 2.7) * (shakeIntensity * 0.8);

  // Flash on explosion
  const flashOpacity = interpolate(frame, [35, 38, 48], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bomb origins (3 centers across 1920 width)
  const bombCenters = [
    { x: 440, y: 520, day: "MON" },
    { x: 960, y: 520, day: "WED" },
    { x: 1480, y: 520, day: "FRI" },
  ];

  // Blast expansion springs
  const blastSpring = spring({
    frame: explosionFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const blastRadius = interpolate(blastSpring, [0, 1], [20, 480]);
  const blastOpacity = interpolate(explosionFrame, [0, 15, 60, 95], [0.9, 0.85, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text slam spring: begins at frame 55
  const slamSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 11, stiffness: 220 },
  });
  const slamScale = interpolate(slamSpring, [0, 1], [3.2, 1]);
  const slamOpacity = interpolate(frame, [55, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flying debris particles
  const particles = [
    { dx: -120, dy: -180, rot: 140, size: 28, color: "#1E293B" },
    { dx: 160, dy: -210, rot: -80, size: 24, color: "#EA580C" },
    { dx: -240, dy: -90, rot: 210, size: 32, color: "#94A3B8" },
    { dx: 220, dy: -60, rot: -160, size: 20, color: "#334155" },
    { dx: -80, dy: -280, rot: 90, size: 36, color: "#F97316" },
    { dx: 110, dy: -290, rot: -120, size: 22, color: "#FDE047" },
    { dx: -310, dy: -170, rot: 250, size: 18, color: "#CBD5E1" },
    { dx: 330, dy: -190, rot: -220, size: 26, color: "#64748B" },
  ];

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B0F19",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hasExploded
            ? "radial-gradient(ellipse at 50% 50%, rgba(234, 88, 12, 0.3) 0%, rgba(11, 15, 25, 1) 80%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(30, 41, 59, 0.6) 0%, rgba(11, 15, 25, 1) 80%)",
        }}
      />

      {/* Screen White/Yellow Detonation Flash */}
      {flashOpacity > 0.01 && (
        <div
          className="absolute inset-0 pointer-events-none z-50 bg-white"
          style={{ opacity: flashOpacity }}
        />
      )}

      {/* Close-Up Planner Grid Background Cards */}
      <div className="absolute inset-0 flex items-center justify-around px-20 z-10">
        {bombCenters.map((b, idx) => (
          <div
            key={b.day}
            className="w-[420px] h-[520px] rounded-3xl bg-slate-900/90 border-2 border-slate-700 p-6 flex flex-col relative shadow-2xl overflow-hidden"
            style={{
              borderColor: hasExploded ? "#EF4444" : "#475569",
              backgroundColor: hasExploded ? "rgba(30, 20, 25, 0.95)" : "rgba(15, 23, 42, 0.9)",
            }}
          >
            {/* Day Header */}
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <span className="text-3xl font-black tracking-wider text-slate-300">
                {b.day}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-red-400 px-3 py-1 bg-red-950/60 rounded-full border border-red-800/40">
                {hasExploded ? "DETONATED" : "FUSE LIT"}
              </span>
            </div>

            {/* Pre-explosion Bomb Rendering (Frames 0 to 34) */}
            {!hasExploded && (
              <div className="flex-1 flex items-center justify-center relative">
                <svg width="220" height="220" viewBox="0 0 120 120" className="overflow-visible">
                  <defs>
                    <radialGradient id={`closeBomb-${idx}`} cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#64748B" />
                      <stop offset="35%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#000000" />
                    </radialGradient>
                  </defs>

                  {/* Burning Fuse */}
                  {frame < 35 && (
                    <>
                      <path
                        d="M 60 40 Q 60 18 80 15 Q 92 12 95 24"
                        fill="none"
                        stroke="#D97706"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="60"
                        strokeDashoffset={interpolate(frame, [0, 35], [0, 55])}
                      />
                      {/* Sparks */}
                      <circle
                        cx={95 + Math.sin(frame * 1.8) * 6}
                        cy={24 + Math.cos(frame * 1.8) * 6}
                        r={8 + (frame % 4)}
                        fill="#FBBF24"
                      />
                      <circle
                        cx={95 + Math.cos(frame * 2.5) * 8}
                        cy={24 + Math.sin(frame * 2.5) * 8}
                        r={4}
                        fill="#EF4444"
                      />
                    </>
                  )}

                  {/* Bomb Cap */}
                  <rect
                    x="48"
                    y="30"
                    width="24"
                    height="14"
                    rx="3"
                    fill="#64748B"
                    stroke="#1E293B"
                    strokeWidth="2"
                  />

                  {/* Bomb Sphere */}
                  <circle
                    cx="60"
                    cy="75"
                    r="40"
                    fill={`url(#closeBomb-${idx})`}
                    stroke="#000000"
                    strokeWidth="4"
                  />

                  {/* Highlight */}
                  <ellipse
                    cx="46"
                    cy="62"
                    rx="12"
                    ry="7"
                    transform="rotate(-30 46 62)"
                    fill="#FFFFFF"
                    opacity="0.4"
                  />
                </svg>
              </div>
            )}

            {/* Post-explosion Scorch & Char marks inside planner square */}
            {hasExploded && (
              <div className="flex-1 flex flex-col items-center justify-center relative">
                {/* Charcoal crater burn */}
                <div className="w-56 h-56 rounded-full bg-black/80 border-4 border-red-950/80 shadow-inner flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-amber-900/20 to-transparent" />
                  <span className="text-xl font-black text-red-500 uppercase tracking-widest z-10">
                    CRITICAL RUPTURE
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Giant Screen-Filling Explosions Overlay (SVG Vector Blast) */}
      {hasExploded && (
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
        >
          <defs>
            <radialGradient id="blastDustGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#EA580C" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#94A3B8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0" />
            </radialGradient>
          </defs>

          {bombCenters.map((b, i) => {
            const currentR = blastRadius * (1 + i * 0.08);

            return (
              <g key={i} transform={`translate(${b.x}, ${b.y})`} opacity={blastOpacity}>
                {/* Outer Billowing Smoke Clouds */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, k) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = Math.cos(rad) * (currentR * 0.65);
                  const cy = Math.sin(rad) * (currentR * 0.65);
                  const puffR = currentR * 0.42;

                  return (
                    <circle
                      key={k}
                      cx={cx}
                      cy={cy}
                      r={puffR}
                      fill={k % 2 === 0 ? "#94A3B8" : "#64748B"}
                      opacity={0.45}
                    />
                  );
                })}

                {/* Expanding Concentric Jagged Shockwave Rings */}
                <path
                  d={`
                    M ${currentR} 0
                    L ${currentR * 0.85} ${currentR * 0.25}
                    L ${currentR * 0.95} ${currentR * 0.55}
                    L ${currentR * 0.7} ${currentR * 0.7}
                    L ${currentR * 0.55} ${currentR * 0.95}
                    L ${currentR * 0.25} ${currentR * 0.85}
                    L 0 ${currentR}
                    L ${-currentR * 0.25} ${currentR * 0.85}
                    L ${-currentR * 0.55} ${currentR * 0.95}
                    L ${-currentR * 0.7} ${currentR * 0.7}
                    L ${-currentR * 0.95} ${currentR * 0.55}
                    L ${-currentR * 0.85} ${currentR * 0.25}
                    L ${-currentR} 0
                    L ${-currentR * 0.85} ${-currentR * 0.25}
                    L ${-currentR * 0.95} ${-currentR * 0.55}
                    L ${-currentR * 0.7} ${-currentR * 0.7}
                    L ${-currentR * 0.55} ${-currentR * 0.95}
                    L ${-currentR * 0.25} ${-currentR * 0.85}
                    L 0 ${-currentR}
                    L ${currentR * 0.25} ${-currentR * 0.85}
                    L ${currentR * 0.55} ${-currentR * 0.95}
                    L ${currentR * 0.7} ${-currentR * 0.7}
                    L ${currentR * 0.95} ${-currentR * 0.55}
                    L ${currentR * 0.85} ${-currentR * 0.25}
                    Z
                  `}
                  fill="none"
                  stroke="#F97316"
                  strokeWidth={6}
                />

                {/* Inner Fire Core */}
                <circle cx={0} cy={0} r={currentR * 0.45} fill="url(#blastDustGrad)" />

                {/* Flying Shrapnel & Debris */}
                {particles.map((p, pIdx) => {
                  const prog = Math.min(1, explosionFrame / 35);
                  const px = p.dx * prog * 2.2;
                  const py = p.dy * prog * 2.2 + (prog * prog * 160); // gravity
                  const rot = p.rot * prog;

                  return (
                    <rect
                      key={pIdx}
                      x={px - p.size / 2}
                      y={py - p.size / 2}
                      width={p.size}
                      height={p.size * 0.7}
                      fill={p.color}
                      transform={`rotate(${rot} ${px} ${py})`}
                      opacity={0.85}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      )}

      {/* Slams Center Impact Text: "EXPLOSIVE RAGE" */}
      {slamOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-40 px-8"
          style={{
            opacity: slamOpacity,
            transform: `scale(${slamScale})`,
          }}
        >
          <div
            className="px-12 py-6 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col items-center text-center border-4"
            style={{
              backgroundColor: "#F97316",
              borderColor: "#000000",
              boxShadow: "0 0 70px rgba(249, 115, 22, 0.8), 0 25px 50px rgba(0, 0, 0, 0.8)",
            }}
          >
            <div className="text-xs md:text-sm font-black tracking-widest uppercase px-4 py-1 rounded-full bg-black text-amber-400 mb-2">
              DISPROPORTIONATE DMDD OUTBURST
            </div>
            <h1
              className="text-6xl md:text-8xl font-black tracking-tighter uppercase m-0 leading-none"
              style={{
                color: "#000000",
                textShadow: "0 2px 0 rgba(255, 255, 255, 0.3)",
              }}
            >
              EXPLOSIVE RAGE
            </h1>
            <p className="text-base md:text-lg font-black uppercase tracking-wider text-slate-950 mt-2 m-0">
              Recurrent Violent Episodes Shatter Daily Regulation
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
