import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 88: Scale - Baby Blues vs PPD
 * Duration: 210 frames (7.0s)
 * Environment: Solid rich dark blue background (#0F1E36).
 * Transition: Slide-up.
 * Characters & Props: Balanced scale with gentle soft blue feather on "Baby Blues" pan vs massive black anvil crashing onto "PPD" pan, shattering the scale arm; "FAR EXCEEDING" banner.
 */
export const Scene088_ScaleBabyBluesvsPPD = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-up entrance spring
  const slideSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const slideY = interpolate(slideSpring, [0, 1], [60, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Feather gently landing on left pan: frames 0 to 45
  const featherProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
  });
  const featherRock = Math.sin(frame * 0.25) * 12 * (1 - featherProgress * 0.8);

  // Massive anvil dropping from top: frames 60 to 74
  const anvilSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 9, stiffness: 220 },
  });
  const anvilY = interpolate(anvilSpring, [0, 1], [-450, 0]);

  // Obliteration trigger at frame 72
  const isObliterated = frame >= 72;
  const shatterProgress = interpolate(frame, [72, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact screen shake: frames 72 to 105
  const isImpact = frame >= 72 && frame < 105;
  const shakeX = isImpact ? Math.sin((frame - 72) * 2.8) * 14 * (1 - (frame - 72) / 33) : 0;
  const shakeY = isImpact ? Math.cos((frame - 72) * 3.1) * 12 * (1 - (frame - 72) / 33) : 0;

  // "FAR EXCEEDING" text entrance: frame 85
  const textSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 11, stiffness: 170 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B1528",
      }}
    >
      {/* Background Soft Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.4) 0%, transparent 80%)",
        }}
      />

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `translateY(${slideY}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${isObliterated ? "#EF4444" : "rgba(147, 197, 253, 0.4)"}`,
            boxShadow: isObliterated ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            BABY BLUES VS. PPD
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-sky-300">
            Transient Affective Shift vs Severe Major Depressive Episode
          </p>
        </div>
      </div>

      {/* Main Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `translateY(${slideY}px) translate(${shakeX}px, ${shakeY}px)`,
        }}
      >
        <defs>
          <filter id="anvilShadow88" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="15" stdDeviation="18" floodColor="#000000" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Heavy Stone Base Stand */}
        <g transform="translate(960, 840)">
          <rect x="-350" y="0" width="700" height="35" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="3" />
          <rect x="-280" y="-30" width="560" height="30" fill="#0F172A" stroke="#334155" strokeWidth="2" />
        </g>

        {/* Central Fulcrum Pillar */}
        <g transform="translate(960, 560)">
          <polygon points="0,-20 -60,250 60,250" fill="#334155" stroke="#475569" strokeWidth="3" />
          <circle cx="0" cy="-20" r="16" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
        </g>

        {/* LEFT SIDE: "Baby Blues" (x = 560) */}
        <g transform="translate(560, 360)">
          {/* Label */}
          <rect x="-140" y="-80" width="280" height="50" rx="12" fill="#1E293B" stroke="#93C5FD" strokeWidth="2" />
          <text x="0" y="-48" fill="#93C5FD" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="2">
            BABY BLUES
          </text>
          <text x="0" y="-22" fill="#E2E8F0" fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="1">
            MILD • 80% OF WOMEN
          </text>
        </g>

        {/* RIGHT SIDE: "PPD" (x = 1360) */}
        <g transform="translate(1360, 360)">
          <rect
            x="-140"
            y="-80"
            width="280"
            height="50"
            rx="12"
            fill="#7F1D1D"
            stroke="#EF4444"
            strokeWidth="2.5"
            style={{
              filter: "drop-shadow(0 0 15px rgba(239, 68, 68, 0.3))",
            }}
          />
          <text x="0" y="-48" fill="#FFFFFF" fontSize="26" fontWeight="900" textAnchor="middle" letterSpacing="3">
            PPD
          </text>
          <text x="0" y="-22" fill="#FCA5A5" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="1">
            SEVERE • CLINICAL ILLNESS
          </text>
        </g>

        {/* INTACT SCALE BEAM & PANS (Before obliteration) */}
        {!isObliterated && (
          <g transform="translate(960, 540)">
            {/* Horizontal Balance Beam */}
            <line x1="-400" y1="0" x2="400" y2="0" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />

            {/* Left Pan Chains & Plate (Baby Blues) */}
            <line x1="-400" y1="0" x2="-450" y2="160" stroke="#94A3B8" strokeWidth="3" />
            <line x1="-400" y1="0" x2="-350" y2="160" stroke="#94A3B8" strokeWidth="3" />
            <path d="M -490 160 Q -400 190 -310 160 Z" fill="#475569" stroke="#94A3B8" strokeWidth="3" />

            {/* Right Pan Chains & Plate (PPD) */}
            <line x1="400" y1="0" x2="350" y2="160" stroke="#94A3B8" strokeWidth="3" />
            <line x1="400" y1="0" x2="450" y2="160" stroke="#94A3B8" strokeWidth="3" />
            <path d="M 310 160 Q 400 190 490 160 Z" fill="#475569" stroke="#94A3B8" strokeWidth="3" />
          </g>
        )}

        {/* SOFT BLUE FEATHER FLOATING ONTO LEFT PAN */}
        {/* Pan surface at x = 560, y = 700 */}
        <g
          transform={`
            translate(560, ${interpolate(featherProgress, [0, 1], [400, 680])})
            rotate(${featherRock})
          `}
        >
          {/* Feather Central Spine */}
          <path d="M -40 -10 Q 0 0 45 10" stroke="#E2E8F0" strokeWidth="2.5" fill="none" />
          {/* Feather Plume Barbs */}
          <path
            d="
              M -40 -10
              C -20 -30, 20 -25, 45 10
              C 20 15, -10 10, -40 -10 Z
            "
            fill="#93C5FD"
            opacity="0.9"
          />
          <path
            d="
              M -35 -5
              C -15 25, 25 25, 45 10
              C 15 5, -10 -2, -35 -5 Z
            "
            fill="#BFDBFE"
            opacity="0.8"
          />
        </g>

        {/* MASSIVE ANVIL FALLING & CRASHING ONTO RIGHT PAN (x = 1360) */}
        <g
          transform={`translate(1360, ${interpolate(anvilSpring, [0, 1], [150, 700])})`}
          filter="url(#anvilShadow88)"
        >
          {/* Massive Heavy Black Iron Anvil */}
          <path
            d="
              M -140 -60
              L 120 -60
              L 180 -25
              L 130 -10
              L 60 -10
              L 70 80
              L 130 110
              L -130 110
              L -70 80
              L -60 -10
              L -150 -10
              Z
            "
            fill="#000000"
            stroke="#334155"
            strokeWidth="5"
          />
          {/* Iron Horn highlight */}
          <path d="M 120 -50 L 170 -25 L 125 -15 Z" fill="#1E293B" />
          {/* Face Plate highlight */}
          <rect x="-130" y="-55" width="240" height="12" fill="#334155" opacity="0.6" />
          <text x="0" y="55" fill="#64748B" fontSize="24" fontWeight="900" textAnchor="middle" letterSpacing="4">
            10,000 LBS
          </text>
        </g>

        {/* SHATTERED RIGHT BEAM & FLYING METAL SHARDS (After obliteration) */}
        {isObliterated && (
          <g transform="translate(960, 540)">
            {/* Left Beam tilts up violently */}
            <line x1="-400" y1="120" x2="0" y2="0" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />

            {/* Left Pan dangling high */}
            <line x1="-400" y1="120" x2="-450" y2="280" stroke="#94A3B8" strokeWidth="3" />
            <line x1="-400" y1="120" x2="-350" y2="280" stroke="#94A3B8" strokeWidth="3" />
            <path d="M -490 280 Q -400 310 -310 280 Z" fill="#475569" stroke="#94A3B8" strokeWidth="3" />

            {/* Jagged snapped right beam stub */}
            <path d="M 0 0 L 40 10 L 60 -15 L 75 5" fill="none" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />

            {/* Flying Shards of Right Beam */}
            <g fill="#CBD5E1" stroke="#334155" strokeWidth="2">
              <polygon
                points="0,0 40,-15 20,-30"
                transform={`translate(${180 + shatterProgress * 150}, ${shatterProgress * 180}) rotate(${shatterProgress * 120})`}
              />
              <polygon
                points="0,0 50,10 35,25"
                transform={`translate(${280 + shatterProgress * 200}, ${shatterProgress * 220}) rotate(${shatterProgress * -140})`}
              />
              <polygon
                points="0,0 -30,20 -10,35"
                transform={`translate(${380 + shatterProgress * 120}, ${shatterProgress * 260}) rotate(${shatterProgress * 90})`}
              />
            </g>

            {/* Impact Sparks under anvil */}
            <circle cx={400 + Math.sin(frame * 0.8) * 40} cy={230 + Math.cos(frame * 0.9) * 20} r="5" fill="#F59E0B" />
            <circle cx={380 + Math.cos(frame * 0.7) * 35} cy={240} r="4" fill="#EF4444" />
          </g>
        )}

        {/* AGGRESSIVE "FAR EXCEEDING" OVERLAY BANNER */}
        {frame >= 85 && (
          <g
            transform={`translate(1360, 480) scale(${textScale}) rotate(-5)`}
          >
            <rect
              x="-260"
              y="-65"
              width="520"
              height="130"
              rx="18"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="6"
              style={{
                filter: "drop-shadow(0 0 30px #EF4444)",
              }}
            />
            <rect x="-245" y="-50" width="490" height="100" rx="12" fill="#450A0A" />

            <text
              x="0"
              y="10"
              fill="#FFFFFF"
              fontSize="48"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="5"
            >
              FAR EXCEEDING
            </text>

            <text
              x="0"
              y="38"
              fill="#FECACA"
              fontSize="14"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="3"
            >
              DISPROPORTIONATE CLINICAL WEIGHT
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
