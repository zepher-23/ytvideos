import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 82: Cotard's Syndrome (Physical Decay)
 * Duration: 210 frames (7.0s)
 * Environment: X-ray style visual space.
 * Characters & Props: X-ray view of stickman's torso; healthy pulsing heart dissolves into bubbling toxic green sludge.
 */
export const Scene082_CotardsSyndromePhysicalDecay = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Heartbeat pulse before decay (frames 0 to 60)
  const isBeating = frame < 70;
  const heartBeat = isBeating ? 1 + Math.sin(frame * 0.35) * 0.12 : 1;

  // Organ decay progression: frames 50 to 135
  const decayProgress = interpolate(frame, [50, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sludge level in stomach: frames 60 to 150
  const sludgeFill = interpolate(frame, [60, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fluoroscopy scan line sweep
  const scanY = (frame * 5) % 1080;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#050811",
      }}
    >
      {/* Medical X-Ray Lightbox Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.12) 0%, transparent 80%)",
        }}
      />

      {/* X-Ray Grid Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="xrayGrid-82" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#xrayGrid-82)" />
      </svg>

      {/* Sweeping Fluoroscopic Scan Line */}
      <div
        className="absolute left-0 right-0 h-[3px] pointer-events-none"
        style={{
          top: scanY,
          background: "linear-gradient(90deg, transparent 0%, #38BDF8 50%, transparent 100%)",
          opacity: 0.35,
        }}
      />

      {/* Header Container */}
      <div
        className="absolute top-8 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterSpring,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(10, 15, 26, 0.9)",
            border: `1.5px solid ${decayProgress > 0.4 ? "rgba(16, 185, 129, 0.6)" : "rgba(14, 165, 233, 0.5)"}`,
            boxShadow: decayProgress > 0.4 ? "0 0 35px rgba(16, 185, 129, 0.25)" : "0 10px 30px rgba(0,0,0,0.6)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: decayProgress > 0.5 ? "#34D399" : "#FFFFFF" }}
          >
            COTARD'S SYNDROME
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-emerald-400">
            Walking Corpse Delusion • Nihilistic Somatic Decay
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Sludge Glow Filter */}
          <filter id="sludgeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Toxic Green Radial Gradient */}
          <radialGradient id="toxicGreenGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="1" />
            <stop offset="70%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Central X-Ray Torso Housing (x=960, y=560) */}
        <g transform="translate(960, 560)">
          {/* Outer Stickman Skeletal / X-Ray Outline */}
          <path
            d="
              M -160 -280 C -160 -360, 160 -360, 160 -280
              C 200 -240, 240 -120, 220 40
              C 210 160, 170 280, 120 340
              C 60 360, -60 360, -120 340
              C -170 280, -210 160, -220 40
              C -240 -120, -200 -240, -160 -280 Z
            "
            fill="rgba(14, 165, 233, 0.04)"
            stroke="#38BDF8"
            strokeWidth="4"
            opacity="0.8"
          />

          {/* Spine and Ribcage Bones */}
          <line x1="0" y1="-280" x2="0" y2="340" stroke="#7DD3FC" strokeWidth="8" opacity="0.6" strokeDasharray="16 10" />
          
          {/* Ribs */}
          <g stroke="#7DD3FC" strokeWidth="4" opacity="0.4" fill="none">
            <path d="M -140 -160 Q 0 -130 140 -160" />
            <path d="M -160 -90 Q 0 -60 160 -90" />
            <path d="M -170 -20 Q 0 10 170 -20" />
            <path d="M -160 50 Q 0 80 160 50" />
            <path d="M -130 120 Q 0 150 130 120" />
          </g>

          {/* HEALTHY ORGANS (Dissolve and fade during decayProgress) */}
          {decayProgress < 0.95 && (
            <g opacity={1 - decayProgress}>
              {/* Lungs Silhouettes */}
              <ellipse cx="-80" cy="-80" rx="55" ry="90" fill="rgba(244, 63, 94, 0.15)" stroke="#FB7185" strokeWidth="2" />
              <ellipse cx="80" cy="-80" rx="55" ry="90" fill="rgba(244, 63, 94, 0.15)" stroke="#FB7185" strokeWidth="2" />

              {/* Beating Heart (Left side of chest) */}
              <g transform={`translate(-35, -70) scale(${heartBeat})`}>
                <path
                  d="M 0 -25 C -25 -50, -60 -20, -60 15 C -60 55, 0 80, 0 95 C 0 80, 60 55, 60 15 C 60 -20, 25 -50, 0 -25 Z"
                  fill="#EF4444"
                  stroke="#F87171"
                  strokeWidth="3"
                />
                {/* Heart Pulse Waves */}
                <circle cx="0" cy="20" r={30 * heartBeat} fill="none" stroke="#FCA5A5" strokeWidth="1.5" opacity="0.4" />
              </g>

              {/* Stomach Contour */}
              <path
                d="M -60 150 C -80 180, -90 240, -40 260 C 20 280, 90 260, 80 200 C 70 160, 0 160, -60 150 Z"
                fill="rgba(251, 191, 36, 0.1)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
            </g>
          )}

          {/* DISSOLVING TOXIC GREEN SLUDGE (Spreads as decayProgress increases) */}
          {decayProgress > 0.05 && (
            <g filter="url(#sludgeGlow)">
              {/* Melting droplets dripping from chest cavity downward */}
              <g fill="url(#toxicGreenGrad)">
                {/* Droplet stream 1 */}
                <circle
                  cx="-35"
                  cy={-50 + ((frame * 6) % 220)}
                  r={8 * Math.sin(frame * 0.2 + 1) + 10}
                />
                {/* Droplet stream 2 */}
                <circle
                  cx="25"
                  cy={-70 + (((frame + 15) * 5.5) % 220)}
                  r={7 * Math.cos(frame * 0.25) + 9}
                />
                {/* Droplet stream 3 */}
                <circle
                  cx="-80"
                  cy={-20 + (((frame + 30) * 5) % 200)}
                  r={6}
                />
              </g>

              {/* Melting Sludge Blobs in mid-torso */}
              <path
                d={`
                  M -60 ${40 - decayProgress * 30}
                  Q ${-20 + Math.sin(frame * 0.3) * 15} 90
                    ${20} ${50 + Math.cos(frame * 0.3) * 15}
                  Q ${60} 120
                    ${-30} 140
                  Z
                `}
                fill="url(#toxicGreenGrad)"
                opacity={Math.min(decayProgress * 1.5, 0.9)}
              />

              {/* POOLING BUBBLING TOXIC GREEN SLUDGE IN STOMACH CAVITY */}
              {sludgeFill > 0 && (
                <g>
                  {/* Stomach Sludge Pool */}
                  <path
                    d={`
                      M -110 ${320 - sludgeFill * 130}
                      Q ${-50 + Math.sin(frame * 0.25) * 12} ${310 - sludgeFill * 140}
                        ${0} ${315 - sludgeFill * 135}
                      Q ${50 + Math.cos(frame * 0.25) * 12} ${310 - sludgeFill * 140}
                        110 ${320 - sludgeFill * 130}
                      C 115 340, 70 350, 0 350
                      C -70 350, -115 340, -110 ${320 - sludgeFill * 130} Z
                    `}
                    fill="url(#toxicGreenGrad)"
                  />

                  {/* Bubbles erupting from sludge */}
                  <circle
                    cx={-50 + Math.sin(frame * 0.4) * 25}
                    cy={300 - sludgeFill * 100 - ((frame * 2) % 30)}
                    r="5"
                    fill="#6EE7B7"
                  />
                  <circle
                    cx={35 + Math.cos(frame * 0.45) * 30}
                    cy={310 - sludgeFill * 90 - (((frame + 10) * 2.2) % 35)}
                    r="6.5"
                    fill="#6EE7B7"
                  />
                  <circle
                    cx={-10}
                    cy={305 - sludgeFill * 95 - (((frame + 20) * 1.8) % 30)}
                    r="4"
                    fill="#A7F3D0"
                  />
                </g>
              )}
            </g>
          )}

          {/* Telemetry Clinical Tag */}
          <g transform="translate(0, 420)">
            <rect
              x="-180"
              y="-25"
              width="360"
              height="50"
              rx="12"
              fill="#0F172A"
              stroke={decayProgress > 0.7 ? "#10B981" : "#38BDF8"}
              strokeWidth="2"
            />
            <text
              x="0"
              y="7"
              fill={decayProgress > 0.7 ? "#34D399" : "#FFFFFF"}
              fontSize="16"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="2"
            >
              {decayProgress > 0.7 ? "STATUS: DECAY COMPLETE • 0% VIABILITY" : "STATUS: ORGAN INTEGRITY MONITORED"}
            </text>
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
