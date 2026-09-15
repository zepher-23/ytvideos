import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 61: Spontaneous Remission
 * Duration: 7 seconds (210 frames)
 * 
 * - Environment: Minimalist perspective checkered floor (#F8FAFC) flooded with warm spring light.
 * - Characters & Props: Stickman with vibrant green aura waving goodbye,
 *   calendar page "MARCH 21 (VERNAL EQUINOX)", expanding golden sun burst, retreating dark storm cloud.
 * - Beginning (0-35f): Stickman stands happily with vibrant green energy aura on checkered floor.
 * - Action/Climax (35-120f): Calendar page "MARCH 21" flies in; its sun icon expands and floods the screen with golden light.
 * - Ending/Hold (120-210f): Stickman waves goodbye as the last dark winter cloud drifts away off-screen.
 */
export const Scene061_SpontaneousRemission = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Calendar page entrance at frame 35
  const calFrame = Math.max(0, frame - 35);
  const calSpring = spring({
    frame: calFrame,
    fps,
    config: { damping: 12, stiffness: 130 },
  });
  const calX = frame < 35 ? 1950 : interpolate(calSpring, [0, 1], [1950, 1340]);
  const calY = 480;

  // Expanding Sun Light from calendar at frame 80
  const isSunExpanding = frame >= 80;
  const sunExpandAge = Math.max(0, frame - 80);
  const sunScale = interpolate(sunExpandAge, [0, 50], [1, 5], { extrapolateRight: "clamp" });
  const ambientWarmth = interpolate(sunExpandAge, [0, 50], [0, 0.45], { extrapolateRight: "clamp" });

  // Dark Cloud retreating away to top left
  const cloudProgress = interpolate(frame, [80, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cloudX = interpolate(cloudProgress, [0, 1], [550, -350]);
  const cloudY = interpolate(cloudProgress, [0, 1], [260, 120]);
  const cloudOpacity = interpolate(cloudProgress, [0, 0.8, 1], [0.9, 0.7, 0]);

  // Stickman waving arm motion when cloud retreats (frame >= 95)
  const isWaving = frame >= 95;
  const waveAngle = isWaving ? Math.sin((frame - 95) * 0.35) * 24 : 0;

  return (
    <AbsoluteFill className="bg-[#F8FAFC] overflow-hidden select-none font-sans text-slate-900">
      {/* Dynamic Warm Ambient Light Flush */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 70% 40%, rgba(253, 224, 71, ${ambientWarmth}) 0%, rgba(255,255,255,0) 70%)`,
        }}
      />

      {/* 3D Checkered Perspective Floor (y=760 to 1080) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="floor-fade-s61" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <polygon points="0,760 1920,760 1920,1080 0,1080" fill="url(#floor-fade-s61)" />
        {[-400, 0, 400, 800, 1200, 1600, 2000, 2400].map((vx, i) => (
          <line key={i} x1="960" y1="760" x2={vx} y2="1080" stroke="#94A3B8" strokeWidth="2" />
        ))}
        <line x1="0" y1="820" x2="1920" y2="820" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="0" y1="890" x2="1920" y2="890" stroke="#94A3B8" strokeWidth="2" />
        <line x1="0" y1="980" x2="1920" y2="980" stroke="#94A3B8" strokeWidth="2.5" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-white/90 border border-emerald-300 shadow-xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-emerald-600 font-bold uppercase block mb-0.5">
            NATURAL EQUINOX CYCLE
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-slate-800 m-0 uppercase">
            SPONTANEOUS REMISSION
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="green-aura-s61" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#22C55E" floodOpacity="0.7" />
          </filter>
          <filter id="sun-cal-glow-s61" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="24" floodColor="#F59E0B" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. RETREATING DARK WINTER CLOUD (Drifts off to top left) */}
        {cloudOpacity > 0 && (
          <g transform={`translate(${cloudX}, ${cloudY})`} opacity={cloudOpacity}>
            <path
              d="M -120 0 Q -80 -60 0 -40 Q 60 -70 120 -20 Q 180 -10 160 50 Q 140 90 60 80 Q 0 100 -60 70 Q -140 80 -120 0 Z"
              fill="#475569"
              stroke="#64748B"
              strokeWidth="4"
            />
            {/* Fading Rain Lines */}
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1={-80 + i * 40}
                y1="80"
                x2={-100 + i * 40}
                y2="130"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            ))}
          </g>
        )}

        {/* 2. CURATED STICKMAN WITH VIBRANT GREEN AURA (Waving) */}
        <g transform="translate(600, 780)">
          {/* Floor Shadow */}
          <ellipse cx="0" cy="8" rx="85" ry="15" fill="#000000" opacity="0.12" />

          {/* Glowing Green Vitality Aura */}
          <g filter="url(#green-aura-s61)">
            <circle
              cx="0"
              cy="-60"
              r={120 + Math.sin(frame * 0.2) * 8}
              fill="none"
              stroke="#22C55E"
              strokeWidth="3.5"
              strokeDasharray="6 6"
            />
          </g>

          {/* Canonical Stickman Model */}
          <CuratedStickman
            x={0}
            y={0}
            scale={1.1}
            pose="content"
            mouth="smile"
            eyes="normal"
            frame={frame}
          />

          {/* Waving Arm (Hand raised high waving goodbye) */}
          {isWaving && (
            <g transform={`translate(-20, -75) rotate(${-60 + waveAngle})`}>
              <line x1="0" y1="0" x2="0" y2="-55" stroke="#000000" strokeWidth="7.5" strokeLinecap="round" />
              <circle cx="0" cy="-60" r="9" fill="#000000" />
            </g>
          )}
        </g>

        {/* 3. CALENDAR PAGE: "MARCH 21" (Center at x=calX, y=480) */}
        <g transform={`translate(${calX}, ${calY})`}>
          {/* Calendar Shadow */}
          <rect x="-190" y="-190" width="380" height="380" rx="24" fill="#000000" opacity="0.12" />
          {/* Calendar Body */}
          <rect x="-200" y="-200" width="400" height="400" rx="24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" />

          {/* Top Red Header */}
          <rect x="-200" y="-200" width="400" height="100" rx="24" fill="#DC2626" />
          <text x="0" y="-135" textAnchor="middle" fill="#FFFFFF" fontSize="38" fontWeight="900" letterSpacing="4">
            MARCH
          </text>

          {/* Big "21" */}
          <text x="0" y="25" textAnchor="middle" fill="#0F172A" fontSize="120" fontWeight="900">
            21
          </text>

          {/* Subtitle Equinox Tag */}
          <text x="0" y="70" textAnchor="middle" fill="#059669" fontSize="18" fontWeight="900" letterSpacing="2">
            VERNAL EQUINOX
          </text>

          {/* Expanding Radiant Sun Icon */}
          <g
            transform={`translate(120, 110) scale(${sunScale})`}
            filter="url(#sun-cal-glow-s61)"
          >
            <circle cx="0" cy="0" r="28" fill="#F59E0B" stroke="#FEF08A" strokeWidth="3" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <line
                key={i}
                x1="0"
                y1="34"
                x2="0"
                y2="46"
                stroke="#FDE047"
                strokeWidth="3.5"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
        </g>
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-slate-900/95 border border-emerald-600 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-emerald-300">
            SPONTANEOUS EQUINOX RESOLUTION: FULL SYMPTOM CLEARANCE OCCURS WITHOUT PHARMACEUTICAL INTERVENTION
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
