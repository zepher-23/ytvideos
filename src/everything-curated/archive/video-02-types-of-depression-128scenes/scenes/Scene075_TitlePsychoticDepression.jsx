import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 75: Title - Psychotic Depression
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Dark navy blue background (#0B132B).
 * - Characters & Props: Large title typography, vector silver mirror dropping in and violently shattering
 *   into jagged glass shards, distorted reality reflections, "BREAK FROM REALITY" badge.
 * - Beginning (0-20f): Vortex flashes white and clears; "6. PSYCHOTIC DEPRESSION" types cleanly.
 * - Action/Climax (20-75f): Large mirror drops from above and instantly shatters on the floor into jagged shards.
 * - Ending/Hold (75-150f): "BREAK FROM REALITY" types below the shattered glass reflection.
 */
export const Scene075_TitlePsychoticDepression = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Typewriter title
  const fullTitle = "6. PSYCHOTIC DEPRESSION";
  const titleChars = Math.floor(
    interpolate(frame, [12, 42], [0, fullTitle.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const displayedTitle = fullTitle.slice(0, titleChars);

  // Mirror Drop from y=-250 to y=560 (lands at frame 34)
  const isMirrorDropping = frame >= 18;
  const mirrorAge = Math.max(0, frame - 18);
  const mirrorSpring = spring({
    frame: mirrorAge,
    fps,
    config: { damping: 11, stiffness: 180 },
  });
  const mirrorY = !isMirrorDropping ? -280 : interpolate(mirrorSpring, [0, 1], [-280, 560]);

  // Mirror shatter at frame 34
  const isShattered = frame >= 34;
  const shatterAge = Math.max(0, frame - 34);

  // Screen shake on shatter impact
  const shakeX = isShattered && shatterAge < 20 ? Math.sin(shatterAge * 2.6) * Math.max(0, 16 - shatterAge * 0.8) : 0;
  const shakeY = isShattered && shatterAge < 20 ? Math.cos(shatterAge * 3.0) * Math.max(0, 14 - shatterAge * 0.7) : 0;

  // "BREAK FROM REALITY" badge slam at frame 70
  const badgeFrame = Math.max(0, frame - 70);
  const badgeSpring = spring({
    frame: badgeFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const badgeScale = frame < 70 ? 0 : interpolate(badgeSpring, [0, 1], [2.2, 1]);
  const badgeOpacity = interpolate(badgeFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  // 8 Glass shards scattering outwards
  const shards = [
    { x: -90, y: -110, rot: -35, speed: 7 },
    { x: 80, y: -120, rot: 40, speed: 8 },
    { x: -130, y: 30, rot: -65, speed: 9 },
    { x: 120, y: 40, rot: 55, speed: 8.5 },
    { x: -70, y: 140, rot: -45, speed: 7 },
    { x: 85, y: 130, rot: 45, speed: 7.5 },
    { x: 0, y: -160, rot: 15, speed: 9 },
    { x: 0, y: 160, rot: -20, speed: 8.5 },
  ];

  return (
    <AbsoluteFill
      className="bg-[#0B132B] overflow-hidden select-none font-sans text-white"
      style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
    >
      {/* Background Subtle Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s75" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="3 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s75)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="flex flex-col items-center">
          <div className="mb-2 px-6 py-1.5 rounded-full bg-red-950 border border-red-600 shadow-sm">
            <span className="text-xs font-mono tracking-widest text-red-300 font-bold uppercase">
              DEPRESSIVE SUBTYPE 06
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-wider text-white m-0 uppercase text-center leading-tight">
            {displayedTitle}
            {frame < 45 && <span className="text-red-500 animate-pulse">|</span>}
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG: SHATTERING VECTOR MIRROR */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <linearGradient id="mirror-silver-s75" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <filter id="shard-glow-s75" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#38BDF8" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Floor Line */}
        <line x1="400" y1="820" x2="1520" y2="820" stroke="#1E293B" strokeWidth="3" />

        {/* INTACT OR SHATTERED MIRROR */}
        {!isShattered ? (
          /* Intact Falling Mirror */
          <g transform={`translate(960, ${mirrorY})`}>
            {/* Ornate Silver Frame */}
            <rect x="-160" y="-220" width="320" height="440" rx="36" fill="#1E293B" stroke="#CBD5E1" strokeWidth="12" />
            {/* Mirror Glass Surface */}
            <rect x="-140" y="-200" width="280" height="400" rx="24" fill="url(#mirror-silver-s75)" opacity="0.8" />
            {/* Diagonal Reflection Sheen */}
            <polygon points="-100,-200 -20,-200 -120,200 -200,200" fill="#FFFFFF" opacity="0.4" />
          </g>
        ) : (
          /* Shattered Mirror Shards Scattering */
          <g transform="translate(960, 560)">
            {/* Broken Empty Outer Frame */}
            <rect x="-160" y="-220" width="320" height="440" rx="36" fill="#0F172A" stroke="#475569" strokeWidth="10" />

            {/* Exploding Glass Shards */}
            {shards.map((s, i) => {
              const dist = Math.min(1.6, shatterAge * 0.08);
              const sX = s.x * dist;
              const sY = s.y * dist;
              const sRot = s.rot + shatterAge * (s.speed * 0.5);
              return (
                <g key={i} transform={`translate(${sX}, ${sY}) rotate(${sRot})`} filter="url(#shard-glow-s75)">
                  {/* Jagged Triangular Glass Shard */}
                  <polygon
                    points="0,-45 45,35 -35,25"
                    fill="url(#mirror-silver-s75)"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                  />
                  <line x1="0" y1="-20" x2="15" y2="10" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
                </g>
              );
            })}
          </g>
        )}
      </svg>

      {/* CLIMAX: "BREAK FROM REALITY" BADGE SLAM */}
      {frame >= 70 && (
        <div
          className="absolute bottom-20 left-0 right-0 flex justify-center items-center pointer-events-none z-40 px-6"
          style={{
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
          }}
        >
          <div className="px-12 py-4 rounded-3xl bg-black/95 border-4 border-red-600 shadow-[0_0_60px_rgba(220,38,38,0.9)] text-center backdrop-blur-xl">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase m-0 leading-tight drop-shadow-[0_0_20px_#EF4444]">
              BREAK FROM REALITY
            </h2>
            <p className="text-base md:text-lg font-bold tracking-widest text-red-300 uppercase mt-2 mb-0">
              HALLUCINATIONS & MOOD-CONGRUENT NIHILISTIC DELUSIONS
            </p>
          </div>
        </div>
      )}

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-red-800 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-red-300">
            PSYCHOTIC CONGRUENCE: DELUSIONS OF POVERTY, SIN, DISEASE, OR CANCEROUS ROTTING CHARACTERIZE THIS ACUTE SUBTYPE
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
