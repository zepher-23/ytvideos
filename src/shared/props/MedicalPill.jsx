import React from "react";

/**
 * MedicalPill - Canonical Hyper-Polished Pharmaceutical Capsule Component.
 * 
 * Features:
 * 1. Volumetric 3D cylindrical lighting with cylindrical gradient shading.
 * 2. Precision interlocking shell seam with micro-shadow and specular ridge.
 * 3. Curved glossy dome reflections on both tips and longitudinal highlight strip.
 * 4. Crisp debossed pharmaceutical imprint typography (e.g. "SSRI 20mg").
 * 5. Parameterized colors (clinical blue, medical green, hostile red, white).
 * 6. Dynamic luminous bloom and particle aura.
 */
export const MedicalPill = ({
  x = 0,
  y = 0,
  scale = 1.0,
  rotation = -25,
  width = 64,
  length = 136,
  color1 = "#2563EB", // Upper / active shell color (e.g. clinical blue)
  color1Dark = "#1D4ED8", // Upper shadow gradient
  color2 = "#F8FAFC", // Lower shell color (e.g. pearl white)
  color2Dark = "#CBD5E1", // Lower shadow gradient
  imprint = "SSRI",
  subImprint = "20",
  glowing = true,
  glowColor = "#3B82F6",
  glowRadius = 30,
  opacity = 1,
  showSeam = true,
  showImprint = true,
  showHighlight = true,
}) => {
  const r = width / 2;
  const cylinderHeight = length - width; // Straight body length
  const halfCyl = cylinderHeight / 2;
  const totalHalfL = length / 2;

  // Unique IDs for SVG gradients to prevent collision if multiple pills exist
  const gradId1 = `pill-grad1-${Math.round(x)}-${Math.round(y)}`;
  const gradId2 = `pill-grad2-${Math.round(x)}-${Math.round(y)}`;
  const shineGradId = `pill-shine-${Math.round(x)}-${Math.round(y)}`;
  const filterId = `pill-glow-${Math.round(x)}-${Math.round(y)}`;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity={opacity}
      id="canonical-medical-pill"
    >
      <defs>
        {/* Volumetric Cylindrical Gradient for Color 1 (Top Half) */}
        <linearGradient id={gradId1} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color1Dark} />
          <stop offset="25%" stopColor={color1} />
          <stop offset="50%" stopColor="#60A5FA" />
          <stop offset="75%" stopColor={color1} />
          <stop offset="100%" stopColor={color1Dark} />
        </linearGradient>

        {/* Volumetric Cylindrical Gradient for Color 2 (Bottom Half) */}
        <linearGradient id={gradId2} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color2Dark} />
          <stop offset="28%" stopColor={color2} />
          <stop offset="55%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor={color2} />
          <stop offset="100%" stopColor={color2Dark} />
        </linearGradient>

        {/* Longitudinal Gloss Specular Sheen */}
        <linearGradient id={shineGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.45)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
        </linearGradient>

        {/* Soft Radial Ambient Aura Glow */}
        {glowing && (
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={glowRadius / 3} result="blur1" />
            <feGaussianBlur stdDeviation={glowRadius / 1.5} result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Luminous Glow Halo Underneath */}
      {glowing && (
        <rect
          x={-r - 12}
          y={-totalHalfL - 12}
          width={width + 24}
          height={length + 24}
          rx={r + 12}
          fill={glowColor}
          opacity="0.25"
          filter={`url(#${filterId})`}
        />
      )}

      {/* Main Outer Capsule Shell Mask / Clip */}
      <g filter={glowing ? `drop-shadow(0 0 20px ${glowColor})` : undefined}>
        {/* ============================================================== */}
        {/* 1. TOP DOME & UPPER HALF (Active Pharmaceutical Shell)          */}
        {/* ============================================================== */}
        <path
          d={`
            M ${-r} 0 
            L ${-r} ${-halfCyl} 
            A ${r} ${r} 0 0 1 ${r} ${-halfCyl} 
            L ${r} 0 
            Z
          `}
          fill={`url(#${gradId1})`}
        />

        {/* ============================================================== */}
        {/* 2. BOTTOM DOME & LOWER HALF (Base Gelatin Shell)               */}
        {/* ============================================================== */}
        <path
          d={`
            M ${-r} 0 
            L ${r} 0 
            L ${r} ${halfCyl} 
            A ${r} ${r} 0 0 1 ${-r} ${halfCyl} 
            Z
          `}
          fill={`url(#${gradId2})`}
        />

        {/* Outer Capsule Contour Bevel Stroke */}
        <rect
          x={-r}
          y={-totalHalfL}
          width={width}
          height={length}
          rx={r}
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="2.5"
        />

        {/* ============================================================== */}
        {/* 3. INTERLOCKING SEAM & OVERLAPPING JOINT                       */}
        {/* ============================================================== */}
        {showSeam && (
          <g id="pill-seam">
            {/* Seam Dark Groove */}
            <line
              x1={-r - 1}
              y1="0"
              x2={r + 1}
              y2="0"
              stroke="#0F172A"
              strokeWidth="2.5"
              opacity="0.65"
            />
            {/* Seam Raised Specular Lip */}
            <line
              x1={-r + 2}
              y1="-2"
              x2={r - 2}
              y2="-2"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              opacity="0.8"
            />
            {/* Shell Overhang Band */}
            <rect
              x={-r - 1.5}
              y="-5"
              width={width + 3}
              height="5"
              fill="none"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.2"
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* 4. HIGH-GLOSS CURVED SPECULAR REFLECTIONS                      */}
        {/* ============================================================== */}
        {showHighlight && (
          <g id="pill-highlights" opacity="0.9">
            {/* Longitudinal Highlight Streak along Left Edge */}
            <rect
              x={-r * 0.68}
              y={-totalHalfL + r * 0.55}
              width={r * 0.32}
              height={length - r * 1.1}
              rx={r * 0.16}
              fill={`url(#${shineGradId})`}
            />

            {/* Top Cap Glossy Arc Reflection */}
            <path
              d={`
                M ${-r * 0.55} ${-totalHalfL + r * 0.35} 
                A ${r * 0.7} ${r * 0.5} 0 0 1 ${r * 0.4} ${-totalHalfL + r * 0.35}
              `}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Bottom Cap Subtle Bounce Light Rim */}
            <path
              d={`
                M ${-r * 0.45} ${totalHalfL - r * 0.35} 
                A ${r * 0.65} ${r * 0.4} 0 0 0 ${r * 0.35} ${totalHalfL - r * 0.35}
              `}
              fill="none"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* 5. PHARMACEUTICAL EMBOSSED IMPRINT                             */}
        {/* ============================================================== */}
        {showImprint && imprint && (
          <g id="pill-imprint" transform="translate(0, 0)">
            {/* Top Shell Primary Text (e.g. "SSRI") */}
            {/* Shadow Deboss */}
            <text
              x="0"
              y={-halfCyl * 0.45 + 1}
              fill="rgba(15, 23, 42, 0.45)"
              fontSize={width * 0.28}
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
              letterSpacing="0.1em"
            >
              {imprint}
            </text>
            {/* Highlight Deboss Face */}
            <text
              x="0"
              y={-halfCyl * 0.45}
              fill="#FFFFFF"
              fontSize={width * 0.28}
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              textAnchor="middle"
              letterSpacing="0.1em"
            >
              {imprint}
            </text>

            {/* Bottom Shell Dosage / Code (e.g. "20") */}
            {subImprint && (
              <g>
                <text
                  x="0"
                  y={halfCyl * 0.55 + 1}
                  fill="rgba(148, 163, 184, 0.6)"
                  fontSize={width * 0.25}
                  fontWeight="900"
                  fontFamily="Inter, sans-serif"
                  textAnchor="middle"
                  letterSpacing="0.08em"
                >
                  {subImprint}
                </text>
                <text
                  x="0"
                  y={halfCyl * 0.55}
                  fill="#1E293B"
                  fontSize={width * 0.25}
                  fontWeight="900"
                  fontFamily="Inter, sans-serif"
                  textAnchor="middle"
                  letterSpacing="0.08em"
                >
                  {subImprint}
                </text>
              </g>
            )}
          </g>
        )}
      </g>
    </g>
  );
};
