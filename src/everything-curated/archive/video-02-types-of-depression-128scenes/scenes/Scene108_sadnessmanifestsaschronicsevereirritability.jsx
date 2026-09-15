import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 108: sadness manifests as chronic, severe irritability
 * Duration: 210 frames (7.0s)
 * Environment: Split-screen flowchart comparison graphic.
 * Transition: Wipe.
 * Characters & Props:
 *   - Left: Blue box "SADNESS" with crying stickman face.
 *   - Center: Flowchart arrow "MANIFESTS AS".
 *   - Right: Red box "IRRITABILITY" with angry fuming face with steam, pulsing aggressively.
 */
export const Scene108_sadnessmanifestsaschronicsevereirritability = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wipe entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const wipeClip = interpolate(enterSpring, [0, 1], [100, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Center connecting arrow & text typing: frames 30 to 65
  const arrowProgress = interpolate(frame, [30, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right box anger explosion entrance: frame 65
  const angerSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 11, stiffness: 170 },
  });
  const angerScale = interpolate(angerSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right side aggressive pulse
  const isAngerActive = frame >= 65;
  const angerPulse = isAngerActive ? 1 + Math.sin((frame - 65) * 0.3) * 0.08 : 1;

  // Tears animation for left face
  const tearDrop = (frame * 4) % 60;

  // Steam animation for right face
  const steamOffset = (frame * 5) % 40;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#080D1A",
        clipPath: `inset(0 ${wipeClip}% 0 0)`,
      }}
    >
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="grid108" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#64748B" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid108)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${isAngerActive ? "#DC2626" : "#3B82F6"}`,
            boxShadow: isAngerActive ? "0 0 35px rgba(220, 38, 38, 0.3)" : "0 10px 30px rgba(59, 130, 246, 0.2)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            AFFECTIVE TRANSLATION
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-300">
            Internalized Sadness Converts Directly to Externalized Irritability
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="blueCardGlow108" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="15" stdDeviation="25" floodColor="#1D4ED8" floodOpacity="0.4" />
          </filter>

          <filter id="redCardGlow108" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="15" stdDeviation="30" floodColor="#DC2626" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ================================================== */}
        {/* LEFT SIDE: BLUE BOX "SADNESS" (x=480, y=560)       */}
        {/* ================================================== */}
        <g transform="translate(480, 560)" filter="url(#blueCardGlow108)">
          {/* Card Outer */}
          <rect x="-220" y="-220" width="440" height="440" rx="24" fill="#0F172A" stroke="#3B82F6" strokeWidth="5" />
          <rect x="-205" y="-205" width="410" height="410" rx="16" fill="#1E293B" opacity="0.85" />

          {/* Title Header */}
          <g transform="translate(0, -140)">
            <rect x="-140" y="-22" width="280" height="44" rx="10" fill="#1D4ED8" />
            <text x="0" y="7" fill="#EFF6FF" fontSize="22" fontWeight="900" textAnchor="middle" letterSpacing="3">
              SADNESS
            </text>
          </g>

          {/* CRYING STICKMAN FACE */}
          <g transform="translate(0, 40)">
            {/* Head Contour */}
            <circle cx="0" cy="0" r="85" fill="#0F172A" stroke="#3B82F6" strokeWidth="5" />

            {/* Downward Defeat Eyes */}
            <ellipse cx="-32" cy="-15" rx="10" ry="14" fill="#3B82F6" />
            <ellipse cx="32" cy="-15" rx="10" ry="14" fill="#3B82F6" />

            {/* Drooping Eyebrows */}
            <line x1="-48" y1="-42" x2="-18" y2="-30" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
            <line x1="48" y1="-42" x2="18" y2="-30" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />

            {/* Trembling Frown Mouth */}
            <path d="M -30 35 Q 0 15 30 35" fill="none" stroke="#93C5FD" strokeWidth="5" strokeLinecap="round" />

            {/* Streaming Tear Drops */}
            <circle cx="-32" cy={5 + tearDrop} r="6" fill="#60A5FA" />
            <circle cx="32" cy={5 + ((tearDrop + 20) % 60)} r="6" fill="#60A5FA" />
          </g>

          <text x="0" y="180" fill="#93C5FD" fontSize="15" fontWeight="800" textAnchor="middle" letterSpacing="1">
            INTERNALIZED / ADULT PATTERN
          </text>
        </g>

        {/* ================================================== */}
        {/* CENTER: CONNECTING ARROW "MANIFESTS AS" (x=960)    */}
        {/* ================================================== */}
        <g transform="translate(960, 560)">
          {/* Arrow Shaft */}
          <line
            x1="-180"
            y1="0"
            x2={-180 + arrowProgress * 360}
            y2="0"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeDasharray="14 8"
            strokeLinecap="round"
          />

          {/* Typing Text Badge */}
          {arrowProgress > 0.4 && (
            <g transform="translate(0, -45)">
              <rect x="-100" y="-18" width="200" height="36" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="0" y="6" fill="#FFFFFF" fontSize="14" fontWeight="900" textAnchor="middle" letterSpacing="2">
                MANIFESTS AS →
              </text>
            </g>
          )}
        </g>

        {/* ================================================== */}
        {/* RIGHT SIDE: RED BOX "IRRITABILITY" (x=1440, y=560) */}
        {/* ================================================== */}
        {frame >= 65 && (
          <g
            transform={`translate(1440, 560) scale(${angerScale * angerPulse})`}
            filter="url(#redCardGlow108)"
          >
            {/* Card Outer */}
            <rect x="-220" y="-220" width="440" height="440" rx="24" fill="#1E0A0D" stroke="#DC2626" strokeWidth="6" />
            <rect x="-205" y="-205" width="410" height="410" rx="16" fill="#2E0B12" opacity="0.9" />

            {/* Title Header */}
            <g transform="translate(0, -140)">
              <rect x="-140" y="-22" width="280" height="44" rx="10" fill="#DC2626" />
              <text x="0" y="7" fill="#FFFFFF" fontSize="22" fontWeight="900" textAnchor="middle" letterSpacing="3">
                IRRITABILITY
              </text>
            </g>

            {/* ANGRY FUMING STICKMAN FACE */}
            <g transform="translate(0, 40)">
              {/* Head Contour */}
              <circle cx="0" cy="0" r="85" fill="#7F1D1D" stroke="#EF4444" strokeWidth="5" />

              {/* Fierce Slanted Eyebrows */}
              <line x1="-48" y1="-28" x2="-15" y2="-45" stroke="#FCA5A5" strokeWidth="5" strokeLinecap="round" />
              <line x1="48" y1="-28" x2="15" y2="-45" stroke="#FCA5A5" strokeWidth="5" strokeLinecap="round" />

              {/* Piercing Glowing Eyes */}
              <circle cx="-28" cy="-15" r="9" fill="#FDE047" />
              <circle cx="28" cy="-15" r="9" fill="#FDE047" />

              {/* Snarling Bared-Teeth Grimace */}
              <rect x="-32" y="20" width="64" height="24" rx="6" fill="#FFFFFF" stroke="#EF4444" strokeWidth="3" />
              <line x1="0" y1="20" x2="0" y2="44" stroke="#7F1D1D" strokeWidth="2" />
              <line x1="-16" y1="20" x2="-16" y2="44" stroke="#7F1D1D" strokeWidth="2" />
              <line x1="16" y1="20" x2="16" y2="44" stroke="#7F1D1D" strokeWidth="2" />

              {/* STEAM BLOWING FROM EARS */}
              <g stroke="#FCA5A5" strokeWidth="3" fill="none">
                {/* Left Ear Steam */}
                <path d={`M -85 0 Q -115 -20 -130 ${-steamOffset}`} strokeDasharray="4 4" />
                {/* Right Ear Steam */}
                <path d={`M 85 0 Q 115 -20 130 ${-steamOffset}`} strokeDasharray="4 4" />
              </g>
            </g>

            <text x="0" y="180" fill="#FCA5A5" fontSize="15" fontWeight="900" textAnchor="middle" letterSpacing="1">
              EXTERNALIZED / CHILD DMDD PATTERN
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
