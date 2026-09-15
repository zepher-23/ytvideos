import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MedicalPill } from "../../shared";

/**
 * Scene 7: The Hostile Brain Reaction
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Clinical diagram space
 * - Transition: Quick slide-right
 * - Characters & Props: Brain icon, Blue pill, Giant Biohazard symbol
 * - Beginning: Smooth calm grey brain on right. Blue pill floats toward it.
 * - Action/Climax: Pill makes contact (frame 48). Brain morphs into sharp jagged red spikes.
 * - Ending/Hold: Giant biohazard symbol overlays the spiking brain to frame 180.
 */
export const Scene007_TheHostileBrainReaction = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Slide-right entrance transition (frames 0 to 12)
  const slideX = interpolate(frame, [0, 12], [-140, 0], { extrapolateRight: "clamp" });
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Blue Pill float towards brain (reaches contact at frame 48)
  const pillX = interpolate(frame, [0, 48], [320, 930], { extrapolateRight: "clamp" });
  const pillY = 540 + Math.sin(frame * 0.08) * 10;
  const pillRotation = interpolate(frame, [0, 48], [-15, -45], { extrapolateRight: "clamp" });

  // 3. Contact & Reaction (frame 48)
  const hasContact = frame >= 48;
  const reactionProgress = interpolate(frame, [48, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Agitation shudder when spiking occurs
  const isShuddering = hasContact && frame <= 88;
  const shudderX = isShuddering ? Math.sin(frame * 4.1) * (1 - reactionProgress * 0.5) * 8 : 0;
  const shudderY = isShuddering ? Math.cos(frame * 3.7) * (1 - reactionProgress * 0.5) * 8 : 0;

  // 4. Biohazard Symbol Entrance (triggers at frame 82)
  const bioSpring = spring({
    frame: frame - 82,
    fps,
    config: { damping: 11, stiffness: 180 },
  });
  const bioScale = interpolate(bioSpring, [0, 1], [0.3, 1.0]);
  const bioOpacity = interpolate(frame, [82, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bioPulse = frame > 100 ? Math.sin(frame * 0.15) * 0.06 : 0;

  return (
    <AbsoluteFill className="bg-[#0F172A] overflow-hidden select-none font-sans text-white">
      {/* Viewport Wrapper with Slide-Right & Shudder */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate(${slideX + shudderX}px, ${shudderY}px)`,
          opacity: enterOpacity,
        }}
      >
        {/* Background Grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <pattern id="grid-s7" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-s7)" />
        </svg>

        {/* Header Container */}
        <div className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6">
          <div className="px-10 py-4 rounded-2xl bg-[#1E293B]/90 border border-red-500/50 shadow-2xl backdrop-blur-md text-center">
            <span className="text-xs font-mono tracking-widest text-[#F87171] uppercase block mb-1">
              ADVERSE NEUROLOGICAL REACTION
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none text-white">
              THE HOSTILE BRAIN REACTION
            </h1>
          </div>
        </div>

        {/* Main Stage SVG */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Red Spiked Brain Glow */}
            <filter id="red-rage-glow-s7" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#DC2626" floodOpacity="0.9" />
            </filter>
            {/* Biohazard Glow */}
            <filter id="bio-glow-s7" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#EAB308" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* THE BRAIN (Center-Right at x=1180, y=540) */}
          <g transform="translate(1180, 540)">
            {!hasContact ? (
              /* Calm Smooth Grey Brain */
              <g opacity="0.85">
                <ellipse cx="0" cy="0" rx="220" ry="170" fill="#334155" stroke="#94A3B8" strokeWidth="6" />
                <path d="M -160 0 Q -50 -120 40 0 Q 140 -90 190 20" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="4 4" />
                <path d="M -130 50 Q 0 120 130 50" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="4 4" />
                <text x="0" y="8" textAnchor="middle" fill="#CBD5E1" fontSize="22" fontWeight="800" letterSpacing="4">
                  CALM CORTEX
                </text>
              </g>
            ) : (
              /* Angry Jagged Red Spiked Brain (#DC2626) */
              <g filter="url(#red-rage-glow-s7)">
                <polygon
                  points="
                    0,-240 45,-190 90,-250 120,-180 180,-220 185,-150 250,-170 230,-100
                    280,-70 240,-10 290,40 230,80 270,140 200,160 220,230 150,210
                    120,260 70,220 20,270 -40,220 -80,260 -120,210 -180,240 -170,170
                    -240,170 -210,100 -280,70 -230,0 -290,-50 -230,-110 -260,-170 -190,-160
                    -190,-230 -120,-190 -70,-250 -30,-190
                  "
                  fill="#7F1D1D"
                  stroke="#DC2626"
                  strokeWidth="8"
                  strokeLinejoin="miter"
                />
                <text x="0" y="8" textAnchor="middle" fill="#FCA5A5" fontSize="22" fontWeight="900" letterSpacing="4">
                  PARADOXICAL DYSREGULATION
                </text>
              </g>
            )}

            {/* Impact Flash Shockwave at contact point */}
            {hasContact && frame <= 68 && (
              <circle
                cx="-220"
                cy="0"
                r={interpolate(frame, [48, 68], [10, 160])}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                opacity={interpolate(frame, [48, 68], [1, 0])}
              />
            )}

            {/* Giant Biohazard Overlay (#EAB308 Yellow) */}
            {frame >= 82 && (
              <g
                transform={`scale(${bioScale + bioPulse})`}
                filter="url(#bio-glow-s7)"
                opacity={bioOpacity}
              >
                {/* Outer Ring Circle */}
                <circle cx="0" cy="0" r="140" fill="none" stroke="#EAB308" strokeWidth="12" />
                <circle cx="0" cy="0" r="110" fill="none" stroke="#EAB308" strokeWidth="6" strokeDasharray="12 8" />

                {/* Biohazard Symbol Trefoil Paths */}
                <g fill="#EAB308">
                  {/* Center core */}
                  <circle cx="0" cy="0" r="30" fill="#EAB308" />
                  <circle cx="0" cy="0" r="16" fill="#7F1D1D" />

                  {/* 3 Radiating Horns */}
                  {[0, 120, 240].map((deg) => (
                    <g key={deg} transform={`rotate(${deg})`}>
                      <path
                        d="M -22 -40 C -45 -75 -40 -115 0 -130 C 40 -115 45 -75 22 -40 Z"
                        fill="#EAB308"
                      />
                      <circle cx="0" cy="-85" r="16" fill="#7F1D1D" />
                    </g>
                  ))}
                </g>

                {/* Alert Badge below Biohazard */}
                <g transform="translate(0, 185)">
                  <rect x="-140" y="-20" width="280" height="40" rx="10" fill="#000000" stroke="#EAB308" strokeWidth="3" />
                  <text x="0" y="6" textAnchor="middle" fill="#FEF08A" fontSize="16" fontWeight="900" letterSpacing="2">
                    BIOHAZARD // MANIC SWITCH
                  </text>
                </g>
              </g>
            )}
          </g>

          {/* THE BLUE PILL (SSRIs) */}
          <g transform={`translate(${pillX}, ${pillY})`}>
            <MedicalPill
              x={0}
              y={0}
              scale={1.8}
              rotation={pillRotation}
              color1="#3B82F6"
              color1Dark="#1D4ED8"
              color2="#FFFFFF"
              color2Dark="#CBD5E1"
              imprint="SSRI"
              subImprint="20mg"
              glowing={true}
              glowColor="#3B82F6"
            />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
