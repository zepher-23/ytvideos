import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 94: Standard PMS comparison
 * Duration: 180 frames (6.0s)
 * Environment: Split-screen comparison (Standard PMS vs PMDD).
 * Characters & Props:
 *  - Left: "STANDARD PMS", mildly annoyed stickman with small light rain cloud.
 *  - Right: "PMDD", stickman falling to knees under massive black thunderstorm cloud with lightning, "DEBILITATING" stamp.
 */
export const Scene094_StandardPMScomparison = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Right side stickman falling to knees: frames 30 to 65
  const fallProgress = interpolate(frame, [30, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Thunderstorm cloud intensity & lightning
  const stormIntensity = interpolate(frame, [25, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lightningFlash = frame >= 45 && (frame % 28 < 4);

  // "DEBILITATING" stamp entrance: frame 80
  const stampSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact screen shake from stamp
  const isImpact = frame >= 80 && frame < 105;
  const shakeX = isImpact ? Math.sin((frame - 80) * 2.8) * 10 * (1 - (frame - 80) / 25) : 0;
  const shakeY = isImpact ? Math.cos((frame - 80) * 3.1) * 8 * (1 - (frame - 80) / 25) : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B0F19",
      }}
    >
      {/* SPLIT BACKGROUNDS */}
      <div className="absolute inset-0 flex">
        {/* Left Side: Standard PMS (Calm, dark slate) */}
        <div className="w-1/2 h-full bg-[#0F172A] border-r-2 border-slate-700 relative" />
        {/* Right Side: PMDD (Hostile, dark storm red vignette) */}
        <div
          className="w-1/2 h-full relative"
          style={{
            background: "radial-gradient(circle at 60% 50%, #1A0A0E 0%, #080305 100%)",
          }}
        />
      </div>

      {/* Main SVG Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <defs>
          <filter id="stormGlow94" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Dividing Line */}
        <line x1="960" y1="0" x2="960" y2="1080" stroke="#334155" strokeWidth="4" />
        <line x1="960" y1="0" x2="960" y2="1080" stroke="#EF4444" strokeWidth="1.5" opacity="0.6" strokeDasharray="12 8" />

        {/* ========================================= */}
        {/* LEFT SIDE: STANDARD PMS (x=480)           */}
        {/* ========================================= */}
        <g transform="translate(480, 0)">
          {/* Header Card */}
          <g transform="translate(0, 110)">
            <rect x="-180" y="-35" width="360" height="70" rx="16" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
            <text x="0" y="2" fill="#94A3B8" fontSize="28" fontWeight="900" textAnchor="middle" letterSpacing="2">
              STANDARD PMS
            </text>
            <text x="0" y="24" fill="#CBD5E1" fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="1.5">
              MILD EMOTIONAL LABILITY
            </text>
          </g>

          {/* Small Cute Grey Rain Cloud (Floating above stickman) */}
          <g transform="translate(0, 390)">
            <path
              d="
                M -60 15
                A 25 25 0 0 1 -45 -15
                A 35 35 0 0 1 15 -20
                A 28 28 0 0 1 60 5
                A 22 22 0 0 1 50 25
                L -55 25 Z
              "
              fill="#475569"
              stroke="#64748B"
              strokeWidth="2.5"
            />
            {/* Single gentle grey rain drop line */}
            <line
              x1="0"
              y1={35 + ((frame * 2.5) % 60)}
              x2="0"
              y2={55 + ((frame * 2.5) % 60)}
              stroke="#94A3B8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Mildly Annoyed Stickman Standing Upright */}
          <g transform="translate(0, 770)">
            <ellipse cx="0" cy="15" rx="80" ry="14" fill="#000000" opacity="0.3" />
            <CuratedStickman
              x={0}
              y={0}
              scale={1.2}
              variant="adult"
              pose="idle"
              mouth="frown"
              eyes="normal"
              slumpProgress={0.15}
              frame={frame}
            />
          </g>
        </g>

        {/* ========================================= */}
        {/* RIGHT SIDE: PMDD (x=1440)                 */}
        {/* ========================================= */}
        <g transform="translate(1440, 0)">
          {/* Header Card */}
          <g transform="translate(0, 110)">
            <rect
              x="-180"
              y="-35"
              width="360"
              height="70"
              rx="16"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="3"
              filter="url(#stormGlow94)"
            />
            <text x="0" y="2" fill="#FFFFFF" fontSize="36" fontWeight="900" textAnchor="middle" letterSpacing="4">
              PMDD
            </text>
            <text x="0" y="24" fill="#FCA5A5" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="2">
              SEVERE CLINICAL IMPAIRMENT
            </text>
          </g>

          {/* Massive Menacing Thunderstorm Cloud */}
          <g transform={`translate(0, 370) scale(${interpolate(stormIntensity, [0, 1], [0.8, 1.2])})`}>
            {/* Lightning Flash Halo */}
            {lightningFlash && (
              <circle cx="0" cy="0" r="220" fill="#A855F7" opacity="0.6" filter="url(#stormGlow94)" />
            )}

            {/* Dark Cloud Mass */}
            <path
              d="
                M -180 30
                A 70 70 0 0 1 -130 -60
                A 100 100 0 0 1 40 -90
                A 85 85 0 0 1 170 -25
                A 65 65 0 0 1 180 50
                A 75 75 0 0 1 80 90
                A 90 90 0 0 1 -110 80
                Z
              "
              fill="#0F172A"
              stroke="#DC2626"
              strokeWidth="4"
              filter="url(#stormGlow94)"
            />

            {/* Purple & Red Lightning Discharge onto stickman */}
            {lightningFlash && (
              <path
                d="M -20 60 L 10 140 L -15 180 L 30 270"
                stroke="#C084FC"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                filter="url(#stormGlow94)"
              />
            )}

            {/* Heavy Torrential Rain */}
            {[-90, -50, -10, 30, 70, 110].map((rx, i) => (
              <line
                key={i}
                x1={rx}
                y1={85 + ((frame * 6 + i * 18) % 120)}
                x2={rx - 8}
                y2={115 + ((frame * 6 + i * 18) % 120)}
                stroke="#EF4444"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.85"
              />
            ))}
          </g>

          {/* Stickman Falling to Knees under the storm */}
          <g
            transform={`translate(0, ${interpolate(fallProgress, [0, 1], [770, 790])})`}
          >
            <ellipse cx="0" cy="15" rx="85" ry="15" fill="#000000" opacity="0.6" />
            <CuratedStickman
              x={0}
              y={0}
              scale={1.2}
              variant="adult"
              pose={fallProgress > 0.6 ? "crouch" : "defeat"}
              mouth="shock"
              eyes="defeat"
              slumpProgress={fallProgress}
              frame={frame}
            />
          </g>

          {/* GIANT "DEBILITATING" STAMP (Slamming over the right side at frame 80) */}
          {frame >= 80 && (
            <g
              transform={`translate(0, 580) scale(${stampScale}) rotate(-8)`}
              filter="url(#stormGlow94)"
            >
              <rect
                x="-210"
                y="-55"
                width="420"
                height="110"
                rx="18"
                fill="#7F1D1D"
                stroke="#EF4444"
                strokeWidth="6"
              />
              <rect x="-198" y="-43" width="396" height="86" rx="12" fill="#450A0A" />

              <text
                x="0"
                y="8"
                fill="#FFFFFF"
                fontSize="46"
                fontWeight="900"
                textAnchor="middle"
                letterSpacing="5"
              >
                DEBILITATING
              </text>
              <text
                x="0"
                y="32"
                fill="#FECACA"
                fontSize="12"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="2.5"
              >
                DISRUPTS WORK, SOCIAL & FAMILY LIFE
              </text>
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
