import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 76: Mirror Reflection Breakdown
 * Duration: 210 frames (7.0s)
 * Environment: Dimly lit bathroom setting.
 * Transition: Zoom into mirror / psychotic distortion.
 * Characters & Props: Stickman looking into mirror, reflection morphs into shadowy monster with glowing red eyes.
 */
export const Scene076_MirrorReflectionBreakdown = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance spring
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Mirror & Room entrance
  const roomFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Morph phase: 0 (normal reflection) to 1 (full shadowy monster)
  const monsterMorph = interpolate(frame, [60, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Monster pointing arm raise: 0 to 1
  const pointSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 90 },
  });
  const pointProgress = interpolate(pointSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stickman terror recoil: leans back and trembles
  const stickmanRecoil = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tremble = frame > 110 ? Math.sin(frame * 1.5) * 4 * stickmanRecoil : 0;

  // Mirror crack progression after monster points
  const crackProgress = interpolate(frame, [145, 175], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red eye glow pulse
  const eyePulse = 1 + Math.sin(frame * 0.25) * 0.2;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        background: "radial-gradient(circle at 60% 45%, #151e33 0%, #090d16 100%)",
      }}
    >
      {/* Background Tile Grid Texture (Bathroom wall) */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
        <defs>
          <pattern id="bathTilePattern" width="80" height="50" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="78" height="48" fill="none" stroke="#64748B" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bathTilePattern)" />
      </svg>

      {/* Dim overhead ambient light cone */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[750px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(148, 163, 184, 0.12) 0%, transparent 70%)",
          opacity: roomFade,
        }}
      />

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: headerSpring,
          transform: `translateY(${interpolate(headerSpring, [0, 1], [-25, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-3xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            border: `1.5px solid ${monsterMorph > 0.5 ? "rgba(220, 38, 38, 0.6)" : "rgba(71, 85, 105, 0.5)"}`,
            boxShadow: monsterMorph > 0.5 ? "0 0 35px rgba(220, 38, 38, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
            transition: "border 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: monsterMorph > 0.6 ? "#F87171" : "#FFFFFF" }}
          >
            BARRIER OF REALITY SHATTERS
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Psychotic Depression • Hallucinatory Deception
          </p>
        </div>
      </div>

      {/* Main Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Mirror clip path */}
          <clipPath id="mirrorGlassClip">
            <rect x="1000" y="240" width="560" height="660" rx="280" />
          </clipPath>

          {/* Red eye radial glow */}
          <radialGradient id="redEyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="1" />
            <stop offset="60%" stopColor="#DC2626" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
          </radialGradient>

          {/* Dark tendril shadow filter */}
          <filter id="shadowTendrilFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Bathroom Counter / Floor Shelf */}
        <rect x="0" y="880" width="1920" height="200" fill="#0B1120" />
        <line x1="0" y1="880" x2="1920" y2="880" stroke="#334155" strokeWidth="4" />
        <rect x="0" y="884" width="1920" height="8" fill="#1E293B" opacity="0.6" />

        {/* Mirror Frame Outline */}
        <g opacity={roomFade}>
          {/* Mirror Outer Backing & Shadow */}
          <rect
            x="988"
            y="228"
            width="584"
            height="684"
            rx="292"
            fill="#050811"
            stroke="#475569"
            strokeWidth="8"
          />
          {/* Beveled edge */}
          <rect
            x="996"
            y="236"
            width="568"
            height="668"
            rx="284"
            fill="#09101F"
            stroke="#64748B"
            strokeWidth="2"
          />

          {/* Mirror Inside Glass Area (Clipped) */}
          <g clipPath="url(#mirrorGlassClip)">
            {/* Mirror Glass Background tint */}
            <rect x="1000" y="240" width="560" height="660" fill="#0F172A" />

            {/* Subtle glass reflection sheen */}
            <path
              d="M 1020 250 L 1350 250 L 1120 890 L 1020 890 Z"
              fill="#FFFFFF"
              opacity="0.04"
            />

            {/* NORMAL REFLECTION OF STICKMAN (Fades out during morph) */}
            <g
              opacity={1 - monsterMorph}
              transform="translate(2560, 0) scale(-1, 1)" // Mirror flip around 1280
            >
              <CuratedStickman
                x={1280}
                y={790}
                scale={1.25}
                variant="adult"
                pose="idle"
                mouth="frown"
                eyes="defeat"
                frame={frame}
              />
            </g>

            {/* MONSTER REFLECTION (Fades and swells in) */}
            {monsterMorph > 0.01 && (
              <g
                opacity={monsterMorph}
                filter="url(#shadowTendrilFilter)"
                transform={`translate(1280, 780) scale(${interpolate(monsterMorph, [0, 1], [1.1, 1.35])}) translate(-1280, -780)`}
              >
                {/* Menacing Shadow Aura Blob */}
                <path
                  d={`M 1200 480 Q ${1280 + Math.sin(frame * 0.2) * 15} 410 1360 480 Q 1430 570 1410 740 Q 1370 820 1280 830 Q 1190 820 1150 740 Q 1130 570 1200 480 Z`}
                  fill="#000000"
                  opacity={0.95}
                />

                {/* Massive Monstrous Torso & Arms */}
                <ellipse cx="1280" cy="620" rx="95" ry="145" fill="#000000" />
                <circle cx="1280" cy="460" r="68" fill="#000000" />

                {/* Jagged Shadow Claws on resting arm (Right side of mirror) */}
                <path
                  d="M 1370 660 L 1405 720 L 1385 730 L 1420 740 L 1395 750 L 1365 730 Z"
                  fill="#000000"
                />

                {/* Monstrous Pointing Arm (Reaching towards stickman at left) */}
                <g
                  transform={`translate(1200, 600) rotate(${interpolate(pointProgress, [0, 1], [30, -25])}) translate(-1200, -600)`}
                >
                  {/* Forearm */}
                  <path
                    d="M 1210 590 L 1050 560 L 1045 590 L 1200 625 Z"
                    fill="#000000"
                  />
                  {/* Pointing Long Claw Hand */}
                  <path
                    d="M 1055 570 L 960 550 L 1045 580 L 980 595 L 1050 595 Z"
                    fill="#000000"
                  />
                  {/* Eerie claw glow at fingertip */}
                  {pointProgress > 0.7 && (
                    <circle
                      cx="960"
                      cy="550"
                      r={6 * eyePulse}
                      fill="#EF4444"
                      opacity={0.8}
                    />
                  )}
                </g>

                {/* Sinister Glowing Red Eyes */}
                <g opacity={interpolate(monsterMorph, [0.2, 0.8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                  {/* Left Eye */}
                  <ellipse
                    cx="1255"
                    cy="455"
                    rx={14 * eyePulse}
                    ry={7 * eyePulse}
                    transform="rotate(-15, 1255, 455)"
                    fill="url(#redEyeGlow)"
                  />
                  <ellipse
                    cx="1255"
                    cy="455"
                    rx="6"
                    ry="3"
                    transform="rotate(-15, 1255, 455)"
                    fill="#FFFFFF"
                  />

                  {/* Right Eye */}
                  <ellipse
                    cx="1305"
                    cy="455"
                    rx={14 * eyePulse}
                    ry={7 * eyePulse}
                    transform="rotate(15, 1305, 455)"
                    fill="url(#redEyeGlow)"
                  />
                  <ellipse
                    cx="1305"
                    cy="455"
                    rx="6"
                    ry="3"
                    transform="rotate(15, 1305, 455)"
                    fill="#FFFFFF"
                  />

                  {/* Terrifying Jagged Grin */}
                  <path
                    d="M 1245 495 Q 1280 525 1315 495 Q 1280 515 1245 495 Z"
                    fill="#DC2626"
                    opacity={0.85}
                  />
                </g>
              </g>
            )}

            {/* Mirror Cracks spreading across the glass when monster points */}
            {crackProgress > 0.05 && (
              <g opacity={crackProgress} stroke="#E2E8F0" strokeWidth="2.5" fill="none">
                <path d="M 1060 550 L 1150 510 L 1220 540 L 1320 480 L 1400 520" />
                <path d="M 1150 510 L 1180 430 L 1260 380" />
                <path d="M 1220 540 L 1240 650 L 1290 710" />
                <path d="M 1320 480 L 1380 410" />
                <path d="M 1180 430 L 1120 370" />
              </g>
            )}
          </g>

          {/* Mirror Surface Glare Arc */}
          <path
            d="M 1030 310 A 260 260 0 0 1 1530 310"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="3"
            opacity="0.3"
          />
        </g>

        {/* REAL STICKMAN (On the left, facing right towards the mirror) */}
        <g
          transform={`translate(${580 - stickmanRecoil * 70 + tremble}, ${790})`}
        >
          {/* Ground shadow */}
          <ellipse
            cx="0"
            cy="10"
            rx={90 - stickmanRecoil * 15}
            ry="14"
            fill="#000000"
            opacity="0.6"
          />

          {/* Curated Stickman */}
          <g transform={`rotate(${stickmanRecoil * -12}, 0, 0)`}>
            <CuratedStickman
              x={0}
              y={0}
              scale={1.25}
              variant="adult"
              pose="idle"
              mouth={monsterMorph > 0.4 ? "shock" : "frown"}
              eyes={monsterMorph > 0.4 ? "shock" : "defeat"}
              slumpProgress={monsterMorph > 0.4 ? 0 : 0.3}
              frame={frame}
            />
          </g>

          {/* Terrified Sweat Droplets when monster points */}
          {stickmanRecoil > 0.3 && (
            <g opacity={stickmanRecoil}>
              <circle
                cx={-45}
                cy={-260 - Math.sin(frame * 0.4) * 15}
                r="7"
                fill="#38BDF8"
              />
              <path
                d={`M ${-45} ${-267 - Math.sin(frame * 0.4) * 15} Q ${-40} ${-258} ${-45} ${-253} Q ${-50} ${-258} ${-45} ${-267 - Math.sin(frame * 0.4) * 15}`}
                fill="#38BDF8"
              />
              <circle
                cx={40}
                cy={-240 - Math.cos(frame * 0.4) * 12}
                r="5"
                fill="#38BDF8"
              />
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
