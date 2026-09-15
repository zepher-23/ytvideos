import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 109: pediatric persist rage
 * Duration: 180 frames (6.0s)
 * Environment: minimalist floor.
 * Characters & Props: Child stickman, vector rain cloud, vector volcano.
 * Action:
 * - Beginning: Child stickman stands under a persistent dark rain cloud pouring grey lines (Sadness).
 * - Action / Climax: Suddenly, rain cloud violently erupts and transforms into a roaring, explosive vector volcano icon that fills the scene with fire and lava.
 * - Ending / Hold: Text "PERSISTENT RAGE" types smoothly above the volcano (#EA580C).
 */
export const Scene109_pediatricpersistrage = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Phase transition: frames 0-48 Sadness cloud; 48-75 violent eruption morph; 75-180 full roaring volcano & persistent rage
  const eruptionTrigger = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const eruptionSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  // Cloud fade out & volcano fade in
  const cloudOpacity = interpolate(frame, [45, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const volcanoScale = interpolate(eruptionSpring, [0, 1], [0.2, 1]);
  const volcanoOpacity = interpolate(frame, [48, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screen shake during eruption
  const shakeIntensity = interpolate(frame, [48, 85, 120, 180], [0, 14, 4, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const screenShakeX = Math.sin(frame * 1.5) * shakeIntensity;
  const screenShakeY = Math.cos(frame * 1.8) * (shakeIntensity * 0.7);

  // Child stickman anger tremor
  const stickmanShiver = frame > 50 ? Math.sin(frame * 2.2) * 5 : 0;

  // Rain lines (frames 0 to 55)
  const rainDrops = [
    { x: 910, speed: 18, delay: 0 },
    { x: 935, speed: 22, delay: 4 },
    { x: 960, speed: 20, delay: 2 },
    { x: 985, speed: 24, delay: 6 },
    { x: 1010, speed: 19, delay: 3 },
  ];

  // Lava particles (frame 55+)
  const lavaParticles = [
    { angle: -75, speed: 8, r: 8, color: "#EA580C" },
    { angle: -55, speed: 11, r: 11, color: "#EF4444" },
    { angle: -35, speed: 9, r: 7, color: "#F59E0B" },
    { angle: -105, speed: 10, r: 10, color: "#F97316" },
    { angle: -125, speed: 12, r: 8, color: "#DC2626" },
    { angle: -145, speed: 7, r: 6, color: "#FBBF24" },
    { angle: -90, speed: 13, r: 12, color: "#EA580C" },
  ];

  // Typing effect for header: frame 80 onwards
  const titleText = "PERSISTENT RAGE";
  const typedCount = Math.floor(
    interpolate(frame, [80, 125], [0, titleText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const currentTitle = titleText.slice(0, typedCount);

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
        transform: `translate(${screenShakeX}px, ${screenShakeY}px)`,
      }}
    >
      {/* Floor Environment */}
      <TiledFloor floorY={780} perspective={600} opacity={0.35} />

      {/* Background Volcanic Heat Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(234, 88, 12, ${0.45 * eruptionTrigger}) 0%, rgba(15, 23, 42, 0) 70%)`,
        }}
      />

      {/* Header Container with Deterministic Containment */}
      <div
        className="absolute top-12 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-3xl flex flex-col items-center"
          style={{
            backgroundColor: frame > 75 ? "rgba(234, 88, 12, 0.18)" : "rgba(30, 41, 59, 0.75)",
            border: frame > 75 ? "2px solid #EA580C" : "1.5px solid #334155",
            boxShadow: frame > 75 ? "0 0 35px rgba(234, 88, 12, 0.3)" : "none",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase"
              style={{
                backgroundColor: frame > 75 ? "#EA580C" : "#64748B",
                color: "#FFFFFF",
              }}
            >
              {frame > 75 ? "DMDD Chronic Symptom" : "Pediatric Presentation"}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-black tracking-wider uppercase m-0 mt-1 leading-tight h-14 flex items-center"
            style={{
              color: frame > 75 ? "#F97316" : "#E2E8F0",
              textShadow: frame > 75 ? "0 0 20px rgba(234, 88, 12, 0.6)" : "none",
            }}
          >
            {frame > 75 ? currentTitle : "CHRONIC DYSPHORIA"}
            {frame > 75 && typedCount < titleText.length && (
              <span className="animate-pulse ml-1 text-orange-400">|</span>
            )}
          </h1>
          <p className="text-sm font-semibold tracking-wide text-slate-300 m-0">
            {frame > 75
              ? "Underlying sadness erupts into constant, explosive fury"
              : "Sadness masked beneath the surface"}
          </p>
        </div>
      </div>

      {/* Main Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
      >
        <defs>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="volcanoRock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          <linearGradient id="lavaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="40%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          <filter id="rageGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- PHASE 1: DARK RAIN CLOUD (SADNESS) --- */}
        {cloudOpacity > 0.01 && (
          <g
            id="sadnessCloudGroup"
            style={{ opacity: cloudOpacity }}
            transform="translate(960, 360)"
          >
            {/* Cloud Puffs */}
            <path
              d="M -110 0 A 45 45 0 0 1 -35 -40 A 65 65 0 0 1 50 -45 A 50 50 0 0 1 110 0 A 35 35 0 0 1 80 40 L -85 40 A 35 35 0 0 1 -110 0 Z"
              fill="url(#cloudGrad)"
              stroke="#64748B"
              strokeWidth={3}
            />

            {/* Falling Grey Rain Lines */}
            {rainDrops.map((drop, i) => {
              const yCycle = ((frame * drop.speed + drop.delay * 25) % 200) + 40;
              return (
                <line
                  key={i}
                  x1={drop.x - 960}
                  y1={yCycle}
                  x2={drop.x - 960 - 4}
                  y2={yCycle + 24}
                  stroke="#94A3B8"
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.8}
                />
              );
            })}

            {/* Label: Sadness */}
            <rect
              x={-55}
              y={-15}
              width={110}
              height={30}
              rx={15}
              fill="rgba(15, 23, 42, 0.85)"
              stroke="#64748B"
              strokeWidth={1.5}
            />
            <text
              x={0}
              y={6}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize={14}
              fontWeight="bold"
              letterSpacing={1.5}
            >
              SADNESS
            </text>
          </g>
        )}

        {/* --- PHASE 2: ERUPTING VECTOR VOLCANO (RAGE) --- */}
        {volcanoOpacity > 0.01 && (
          <g
            id="volcanoGroup"
            style={{
              opacity: volcanoOpacity,
              transform: `translate(960px, 420px) scale(${volcanoScale})`,
              transformOrigin: "0px 100px",
            }}
          >
            {/* Smoke Plume Puffing Upward */}
            <g opacity={0.65}>
              <circle
                cx={-40 + Math.sin(frame * 0.1) * 15}
                cy={-140 - ((frame * 2.5) % 90)}
                r={28 + Math.sin(frame * 0.1) * 8}
                fill="#475569"
                opacity={0.5}
              />
              <circle
                cx={35 + Math.cos(frame * 0.12) * 15}
                cy={-160 - ((frame * 2.8) % 100)}
                r={34}
                fill="#334155"
                opacity={0.6}
              />
              <circle
                cx={0}
                cy={-200 - ((frame * 3) % 110)}
                r={45}
                fill="#1E293B"
                opacity={0.7}
              />
            </g>

            {/* Volcano Mountain Cone */}
            <polygon
              points="-180,180 -50,-50 50,-50 180,180"
              fill="url(#volcanoRock)"
              stroke="#EA580C"
              strokeWidth={4}
            />

            {/* Molten Crater Edge */}
            <ellipse
              cx={0}
              cy={-50}
              rx={55}
              ry={18}
              fill="#DC2626"
              stroke="#FDE047"
              strokeWidth={3}
              filter="url(#rageGlow)"
            />

            {/* Roaring Magma Jet */}
            <path
              d="M -35 -50 Q 0 -150 35 -50 Z"
              fill="url(#lavaGrad)"
              filter="url(#rageGlow)"
            />

            {/* Lava Droplets / Fireballs Shooting Out */}
            {lavaParticles.map((p, idx) => {
              const elapsed = Math.max(0, frame - 55);
              const dist = ((elapsed * p.speed + idx * 35) % 220);
              const rad = (p.angle * Math.PI) / 180;
              const px = Math.cos(rad) * dist;
              const py = -50 + Math.sin(rad) * dist + (dist * dist * 0.002); // gravity curve
              return (
                <circle
                  key={idx}
                  cx={px}
                  cy={py}
                  r={p.r}
                  fill={p.color}
                  filter="url(#rageGlow)"
                />
              );
            })}

            {/* Lava Streams Flowing Down Mountain */}
            <path
              d="M -20 -40 Q -35 30 -50 160"
              stroke="#EA580C"
              strokeWidth={8}
              strokeLinecap="round"
              fill="none"
              filter="url(#rageGlow)"
            />
            <path
              d="M 10 -42 Q 25 40 40 170"
              stroke="#F59E0B"
              strokeWidth={6}
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 0 -45 Q -10 60 5 175"
              stroke="#EF4444"
              strokeWidth={7}
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* --- GROUND SHADOW --- */}
        <ellipse
          cx={960 + stickmanShiver}
          cy={785}
          rx={frame > 60 ? 110 : 85}
          ry={18}
          fill={frame > 60 ? "#7C2D12" : "#000000"}
          opacity={frame > 60 ? 0.6 : 0.4}
        />

        {/* Anger Heat Rings around Stickman */}
        {frame > 55 && (
          <g transform={`translate(${960 + stickmanShiver}, 680)`}>
            <circle
              cx={0}
              cy={0}
              r={90 + Math.sin(frame * 0.4) * 15}
              fill="none"
              stroke="#EA580C"
              strokeWidth={2}
              opacity={0.35}
              strokeDasharray="8 6"
            />
            <circle
              cx={0}
              cy={0}
              r={120 + Math.cos(frame * 0.35) * 20}
              fill="none"
              stroke="#DC2626"
              strokeWidth={1.5}
              opacity={0.25}
              strokeDasharray="12 8"
            />
          </g>
        )}

        {/* Canonical CuratedStickman */}
        <CuratedStickman
          x={960 + stickmanShiver}
          y={730}
          scale={0.82}
          variant="child"
          pose={frame > 60 ? "tense" : "defeat"}
          mouth={frame > 60 ? "frown" : "frown"}
          eyes={frame > 60 ? "angry" : "defeat"}
          tunicColor={frame > 60 ? "#FEE2E2" : "#FFFFFF"}
          strokeColor={frame > 60 ? "#DC2626" : "#000000"}
          frame={frame}
        />
      </svg>
    </AbsoluteFill>
  );
};
