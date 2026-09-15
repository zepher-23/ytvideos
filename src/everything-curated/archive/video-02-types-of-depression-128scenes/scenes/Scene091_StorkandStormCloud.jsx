import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 91: Stork and Storm Cloud
 * Duration: 180 frames (6.0s)
 * Environment: Solid blue turning into dark stormy navy.
 * Transition: Quick fade.
 * Characters & Props: Glowing angelic white stork carrying baby bundle, swallowed by a massive crashing dark storm cloud; "REALITY" text.
 */
export const Scene091_StorkandStormCloud = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Stork flight across screen: x from 200 to 850 (before being engulfed)
  const storkX = interpolate(frame, [0, 75], [200, 850], {
    extrapolateRight: "clamp",
  });
  const wingFlap = Math.sin(frame * 0.4) * 22;

  // Storm cloud crash invasion: frames 50 to 85
  const stormSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 12, stiffness: 90 },
  });
  const cloudX = interpolate(stormSpring, [0, 1], [2200, 960], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Swallowed factor (stork opacity drops to 0 inside cloud)
  const isEngulfed = frame >= 75;
  const storkOpacity = interpolate(frame, [70, 85], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background color shift from bright blue to dark navy storm
  const stormDarkness = interpolate(frame, [65, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "REALITY" typography entrance at frame 95
  const realitySpring = spring({
    frame: frame - 95,
    fps,
    config: { damping: 11, stiffness: 160 },
  });
  const realityScale = interpolate(realitySpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lightning flicker inside cloud
  const lightningFlash = frame >= 85 && (frame % 35 < 4) ? 0.8 : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: interpolate(stormDarkness, [0, 1], ["#0284C7", "#090D1A"]),
      }}
    >
      {/* Dynamic Storm Cloud Background Ambient Lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(30, 41, 59, ${stormDarkness * 0.8}) 0%, transparent 80%)`,
        }}
      />

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterSpring,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: `1.5px solid ${isEngulfed ? "#EF4444" : "rgba(255, 255, 255, 0.4)"}`,
            boxShadow: isEngulfed ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            {isEngulfed ? "REALITY" : "EXPECTATION"}
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-300">
            {isEngulfed ? "Postpartum Illness • Severe Emotional Estrangement" : "The Cultural Narrative of Maternal Bliss"}
          </p>
        </div>
      </div>

      {/* Main Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="storkGlow91" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cloudShadow91" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="15" stdDeviation="25" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* GLOWING ANGELIC STORK (Flying with baby bundle) */}
        {storkOpacity > 0 && (
          <g
            transform={`translate(${storkX}, 500)`}
            opacity={storkOpacity}
            filter="url(#storkGlow91)"
          >
            {/* Stork Body & Neck */}
            <path
              d="
                M -80 0
                C -40 -30, 20 -20, 60 0
                C 70 -30, 90 -70, 110 -90
                C 118 -95, 125 -90, 120 -80
                C 100 -50, 80 0, 70 25
                C 40 45, -30 35, -80 0 Z
              "
              fill="#FFFFFF"
            />

            {/* Long Beak holding the sling */}
            <polygon points="120,-85 210,-75 118,-78" fill="#FBBF24" />

            {/* Wing Flapping */}
            <g transform="translate(0, -10)">
              <polygon
                points="-40,0 20,-100 60,0"
                transform={`scale(1, ${wingFlap / 22})`}
                fill="#F8FAFC"
                stroke="#E2E8F0"
                strokeWidth="2"
              />
            </g>

            {/* Tail Feathers */}
            <polygon points="-80,0 -130,-15 -110,15" fill="#FFFFFF" />

            {/* Hanging Baby Sling & Bundle */}
            <g transform="translate(180, -75)">
              {/* Sling Cloth Ribbon */}
              <path d="M 0 0 Q -20 60 -40 100 Q 10 100 0 0" fill="#FBCFE8" />
              {/* Cute Pink Baby Bundle */}
              <circle cx="-15" cy="110" r="30" fill="#F472B6" />
              <ellipse cx="-15" cy="115" rx="36" ry="24" fill="#DB2777" opacity="0.4" />
            </g>
          </g>
        )}

        {/* MASSIVE CRASHING DARK STORM CLOUD */}
        <g
          transform={`translate(${cloudX}, 500)`}
          filter="url(#cloudShadow91)"
        >
          {/* Internal Lightning Flash glow */}
          {lightningFlash > 0 && (
            <circle cx="0" cy="0" r="380" fill="#A855F7" opacity={lightningFlash} />
          )}

          {/* Cloud Contours (Dark slate #1E293B) */}
          <path
            d="
              M -450 80
              A 180 180 0 0 1 -320 -150
              A 260 260 0 0 1 100 -240
              A 220 220 0 0 1 450 -80
              A 170 170 0 0 1 480 140
              A 190 190 0 0 1 200 240
              A 240 240 0 0 1 -280 220
              A 160 160 0 0 1 -450 80 Z
            "
            fill="#1E293B"
            stroke="#334155"
            strokeWidth="6"
          />

          {/* Internal Deep Shadow Layers */}
          <path
            d="
              M -380 90
              A 150 150 0 0 1 -260 -100
              A 200 200 0 0 1 80 -180
              A 180 180 0 0 1 360 -40
              Z
            "
            fill="#0F172A"
            opacity="0.85"
          />

          {/* Purple & Crimson Lightning Bolts firing inside the cloud */}
          {frame >= 85 && (
            <g stroke="#C084FC" strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.9}>
              <path d="M -120 -80 L -80 -20 L -110 30 L -50 110" />
              <path d="M 120 -120 L 160 -50 L 130 10 L 180 80" stroke="#EF4444" strokeWidth="3" />
            </g>
          )}
        </g>

        {/* "REALITY" SLAMMING TYPOGRAPHY (Below Storm Cloud at frame 95) */}
        {frame >= 95 && (
          <g
            transform={`translate(960, 820) scale(${realityScale})`}
          >
            <rect
              x="-260"
              y="-60"
              width="520"
              height="120"
              rx="18"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="5"
              style={{
                filter: "drop-shadow(0 0 35px #EF4444)",
              }}
            />
            <rect x="-248" y="-48" width="496" height="96" rx="12" fill="#450A0A" />

            <text
              x="0"
              y="10"
              fill="#FFFFFF"
              fontSize="52"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="6"
            >
              REALITY
            </text>
            <text
              x="0"
              y="36"
              fill="#FCA5A5"
              fontSize="14"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="3"
            >
              PERINATAL COLLAPSE & ISOLATION
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
