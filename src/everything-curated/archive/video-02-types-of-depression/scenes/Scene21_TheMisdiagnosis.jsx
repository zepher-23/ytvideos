import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { CuratedStickman, MedicalPill } from "../../shared";

// =============================================================================
// SCENE 21: The Misdiagnosis - 180 frames
// =============================================================================
export const Scene21_TheMisdiagnosis = () => {
  const frame = useCurrentFrame();

  // 1. Transition: Fade in from black over first 20 frames
  const fadeInOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Doctor's Hand Entrance (frames 25 -> 70 with smooth cubic deceleration)
  const handX = interpolate(frame, [25, 70], [-520, 680], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle organic hover after hand is positioned
  const handHoverY = frame >= 70 ? Math.sin((frame - 70) * 0.08) * 5 : 0;

  // 3. Stickman patient kinematics:
  // Nervous shivering before reaching (frames 0 to 80)
  const shiver = frame < 80 ? Math.sin(frame * 1.5) * (2.2 - (frame / 80) * 1.4) : 0;

  // Reaching animation: stickman reaches out his arm toward the glowing pill (frames 85 to 150)
  const reachProgress = interpolate(frame, [85, 150], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic emotional states
  const eyes = frame < 40 ? "defeat" : "look-left";
  const mouth = frame < 70 ? "frown" : frame < 110 ? "flat" : "neutral";
  const showSweat = frame < 130;

  // Pulsing glow of the clinical SSRI capsule
  const pillPulse = 1 + Math.sin(frame * 0.14) * 0.07;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Content wrapper with fade-in */}
      <div
        style={{
          width: "100%",
          height: "100%",
          opacity: fadeInOpacity,
          position: "relative",
        }}
      >
        <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
          <defs>
            {/* Clinical office background gradient */}
            <linearGradient id="officeBgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B1528" />
              <stop offset="75%" stopColor="#040814" />
              <stop offset="100%" stopColor="#02040A" />
            </linearGradient>

            {/* Overhead Examination Spotlight Cone */}
            <linearGradient id="spotlightCone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(224, 242, 254, 0.25)" />
              <stop offset="40%" stopColor="rgba(56, 189, 248, 0.12)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.01)" />
            </linearGradient>

            {/* Glass floor abyss gradient */}
            <linearGradient id="glassAbyss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A192F" />
              <stop offset="35%" stopColor="#030A18" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>

            {/* SSRI Capsule Radial Aura Glow */}
            <radialGradient id="pillAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.65)" />
              <stop offset="60%" stopColor="rgba(56, 189, 248, 0.22)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </radialGradient>

            {/* Glass Crack Glow Filter */}
            <filter id="crackGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Clinical Office Walls */}
          <rect x="0" y="0" width="1920" height="850" fill="url(#officeBgGrad)" />

          {/* Sterile Architectural Wall Seams */}
          <g stroke="#1E293B" strokeWidth="2.5" opacity="0.45">
            <line x1="480" y1="0" x2="480" y2="850" />
            <line x1="960" y1="0" x2="960" y2="850" />
            <line x1="1440" y1="0" x2="1440" y2="850" />
            <line x1="0" y1="420" x2="1920" y2="420" />
          </g>

          {/* Overhead Examination Spotlight */}
          <polygon
            points="960,-60 220,850 1700,850"
            fill="url(#spotlightCone)"
          />
          <ellipse cx="960" cy="0" rx="140" ry="24" fill="#38BDF8" opacity="0.35" filter="blur(8px)" />

          {/* Background Fixture 1: Medical Diagnostic Chart (Left Wall) */}
          <g transform="translate(180, 200)" opacity="0.55">
            <rect
              x="0"
              y="0"
              width="170"
              height="280"
              rx="8"
              fill="#F8FAFC"
              stroke="#64748B"
              strokeWidth="4"
            />
            {/* Chart Header */}
            <rect x="0" y="0" width="170" height="42" rx="6" fill="#0284C7" />
            <text
              x="85"
              y="26"
              fill="#FFFFFF"
              fontSize="16"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
              letterSpacing="0.1em"
            >
              PSYCHIATRIC EVAL
            </text>
            {/* Snellen-like Eye / Diagnostic Lines */}
            <text x="85" y="86" fill="#0F172A" fontSize="36" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
              E
            </text>
            <text x="85" y="132" fill="#0F172A" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.2em">
              F P
            </text>
            <text x="85" y="174" fill="#0F172A" fontSize="18" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.25em">
              T O Z
            </text>
            <line x1="20" y1="198" x2="150" y2="198" stroke="#DC2626" strokeWidth="3" />
            <text x="85" y="234" fill="#64748B" fontSize="14" fontWeight="700" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.18em">
              L P E D
            </text>
            <line x1="20" y1="250" x2="150" y2="250" stroke="#16A34A" strokeWidth="3" />
          </g>

          {/* Background Fixture 2: Clinical Telemetry Monitor (Right Wall) */}
          <g transform="translate(1560, 220)" opacity="0.6">
            <rect
              x="0"
              y="0"
              width="240"
              height="160"
              rx="12"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="5"
            />
            {/* Header */}
            <text
              x="18"
              y="32"
              fill="#38BDF8"
              fontSize="16"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
            >
              VITAL SIGNS
            </text>
            <text
              x="222"
              y="32"
              fill="#22C55E"
              fontSize="16"
              fontWeight="900"
              fontFamily="monospace"
              textAnchor="end"
            >
              74 BPM
            </text>
            {/* EKG Heartbeat waveform */}
            <path
              d="M 15 95 L 65 95 L 75 75 L 85 125 L 95 55 L 105 105 L 115 95 L 225 95"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x="18"
              y="138"
              fill="#94A3B8"
              fontSize="13"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              STATUS: DEPRESSED EPISODE
            </text>
          </g>

          {/* Contextual Warning Badge at Top */}
          <g transform="translate(960, 90)">
            <rect
              x="-380"
              y="-32"
              width="760"
              height="64"
              rx="12"
              fill="rgba(15, 23, 42, 0.85)"
              stroke="#EF4444"
              strokeWidth="4"
              filter="drop-shadow(0 8px 24px rgba(0,0,0,0.6))"
            />
            <text
              x="0"
              y="10"
              fill="#F87171"
              fontSize="24"
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
              letterSpacing="0.08em"
            >
              ⚠ MISDIAGNOSIS : UNIPOLAR DEPRESSION ASSUMED
            </text>
          </g>

          {/* ============================================================== */}
          {/* CRACKED GLASS FLOOR                                            */}
          {/* ============================================================== */}
          {/* Floor Abyss Base */}
          <rect x="0" y="850" width="1920" height="230" fill="url(#glassAbyss)" />

          {/* Glass Horizon Line & Double Bevel */}
          <line
            x1="0"
            y1="850"
            x2="1920"
            y2="850"
            stroke="#38BDF8"
            strokeWidth="6"
            filter="url(#crackGlow)"
          />
          <line
            x1="0"
            y1="855"
            x2="1920"
            y2="855"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="2.5"
          />

          {/* Faint Glass Reflection of Stickman Beneath Surface */}
          <g
            transform={`translate(${1260 + shiver}, 850) scale(1.4, -0.32)`}
            opacity="0.10"
            filter="blur(3px)"
          >
            <CuratedStickman
              pose="idle"
              variant="adult"
              lookDirection="left"
              reachProgress={reachProgress}
              reachDirection="left"
            />
          </g>

          {/* Intricate Luminous Stress Fracture Cracks Centered at Stickman's Feet (1260, 850) */}
          <g filter="url(#crackGlow)">
            {/* Outer Cyan Glow Strands */}
            <path
              d="
                M 1260 850 L 1160 910 L 980 945 L 820 925 L 680 975 L 520 960 
                M 1160 910 L 1110 1005 L 1060 1080 
                M 980 945 L 930 1040 
                M 1260 850 L 1350 895 L 1480 930 L 1650 905 L 1820 950 
                M 1350 895 L 1390 1010 L 1450 1080 
                M 1480 930 L 1540 1020 L 1610 1080 
                M 1260 850 L 1240 960 L 1190 1050 L 1170 1080 
                M 1240 960 L 1290 1040 
              "
              fill="none"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Pure White High-Tension Core Cracks */}
            <path
              d="
                M 1260 850 L 1160 910 L 980 945 L 820 925 L 680 975 
                M 1160 910 L 1110 1005 L 1060 1080 
                M 1260 850 L 1350 895 L 1480 930 L 1650 905 
                M 1350 895 L 1390 1010 
                M 1260 850 L 1240 960 L 1190 1050 
              "
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Spiderweb Cross-Fractures */}
            <path
              d="
                M 1205 885 L 1255 935 
                M 1120 925 L 1165 975 
                M 1300 875 L 1345 925 
                M 1410 910 L 1445 965 
                M 1030 930 L 1065 980 
              "
              fill="none"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>

          {/* ============================================================== */}
          {/* DOCTOR'S HAND & GLOWING BLUE SSRI CAPSULE                      */}
          {/* ============================================================== */}
          <g transform={`translate(${handX}, ${620 + handHoverY})`}>
            {/* Doctor's White Lab Coat Sleeve */}
            <rect
              x="-560"
              y="-48"
              width="560"
              height="96"
              rx="16"
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth="6"
              filter="drop-shadow(0 15px 25px rgba(0,0,0,0.5))"
            />
            {/* Doctor's Blue Surgical Scrub Cuff */}
            <rect
              x="-20"
              y="-48"
              width="36"
              height="96"
              rx="8"
              fill="#0284C7"
              stroke="#0369A1"
              strokeWidth="4"
            />

            {/* Doctor's Hand (Stylized Medical Glove/Skin Cupping Pill) */}
            {/* Palm & Wrist */}
            <path
              d="M 16 -38 C 50 -38 78 -24 94 0 C 104 18 96 38 72 44 L 16 44 Z"
              fill="#FEE2E2"
              stroke="#CBD5E1"
              strokeWidth="5"
            />
            {/* Thumb Gently Supporting Pill from Below */}
            <ellipse
              cx="54"
              cy="-24"
              rx="22"
              ry="12"
              transform="rotate(-25 54 -24)"
              fill="#FEE2E2"
              stroke="#CBD5E1"
              strokeWidth="4"
            />
            {/* Curled Fingers Cupping Base of Capsule */}
            <path
              d="M 72 12 C 102 12 124 4 128 -12"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Glowing Capsule Radial Halo */}
            <circle
              cx="110"
              cy="-42"
              r={95 * pillPulse}
              fill="url(#pillAura)"
            />

            {/* Canonical Redesigned 3D Medical Capsule */}
            <MedicalPill
              x={110}
              y={-42}
              scale={1.05}
              rotation={-32}
              color1="#2563EB"
              color2="#FFFFFF"
              imprint="SSRI"
              subImprint="20mg"
              glowing={true}
            />

            {/* Pill Annotation Tag */}
            <g transform="translate(110, 52)">
              <rect
                x="-85"
                y="-18"
                width="170"
                height="36"
                rx="8"
                fill="#0F172A"
                stroke="#3B82F6"
                strokeWidth="3"
                filter="drop-shadow(0 6px 16px rgba(0,0,0,0.5))"
              />
              <text
                x="0"
                y="6"
                fill="#38BDF8"
                fontSize="15"
                fontWeight="900"
                fontFamily="Inter, sans-serif"
                textAnchor="middle"
                letterSpacing="0.08em"
              >
                SSRI CAPSULE
              </text>
            </g>
          </g>

          {/* ============================================================== */}
          {/* STICKMAN PATIENT (NERVOUS & REACHING)                          */}
          {/* ============================================================== */}
          <CuratedStickman
            x={1260 + shiver}
            y={850}
            scale={1.4}
            pose="idle"
            lookDirection="left"
            eyes={eyes}
            mouth={mouth}
            showSweat={showSweat}
            reachProgress={reachProgress}
            reachDirection="left"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
