import React from "react";

/**
 * MagnifyingGlass - Canonical Scientific / Clinical Magnifying Glass Prop
 * 
 * Features:
 * - Lens center perfectly aligned at (x, y) for effortless math & alignment
 * - Double-beveled metallic rim with depth & inner bezel ring
 * - Ergonomic angled handle with grip ridges and metal ferrule
 * - Translucent convex glass fill with diagonal specular gloss reflections
 * 
 * Props:
 * - x: number (lens center X, default 0)
 * - y: number (lens center Y, default 0)
 * - radius: number (lens outer radius, default 140)
 * - scale: number (default 1)
 * - rotation: number (handle angle in degrees, default 38)
 * - rimColor: string (default "#0F172A")
 * - rimWidth: number (default 14)
 * - handleLength: number (default 170)
 * - handleColor: string (default "#1E293B")
 * - id: string (default "shared-magnifying-glass")
 */
export const MagnifyingGlass = ({
  x = 0,
  y = 0,
  radius = 140,
  scale = 1.0,
  rotation = 38, // Handle points towards bottom-right by default
  rimColor = "#0F172A",
  rimWidth = 14,
  handleLength = 180,
  handleColor = "#1E293B",
  id = "magnifying-glass",
}) => {
  const innerR = radius - rimWidth;
  const rad = (rotation * Math.PI) / 180;

  // Handle attachment point at rim perimeter
  const attachX = Math.cos(rad) * radius;
  const attachY = Math.sin(rad) * radius;

  // Handle end point
  const endX = Math.cos(rad) * (radius + handleLength);
  const endY = Math.sin(rad) * (radius + handleLength);

  // Perpendicular vector for handle width
  const perpX = -Math.sin(rad);
  const perpY = Math.cos(rad);

  const ferruleW = 16;
  const gripW = 18;

  return (
    <g
      id={id}
      transform={`translate(${x}, ${y}) scale(${scale})`}
      className="pointer-events-none"
    >
      <defs>
        {/* Specular curved gloss highlight */}
        <linearGradient id={`${id}-gloss`} x1="0%" y1="0%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="90%" stopColor="#38BDF8" stopOpacity="0.15" />
        </linearGradient>

        {/* Rim Metallic Gradient */}
        <linearGradient id={`${id}-rim-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="45%" stopColor="#0F172A" />
          <stop offset="75%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        {/* Handle Grip Gradient */}
        <linearGradient id={`${id}-handle-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>

        {/* Drop shadow for rim and handle */}
        <filter id={`${id}-shadow`} x="-25%" y="-25%" width="160%" height="160%">
          <feDropShadow dx="8" dy="16" stdDeviation="12" floodColor="#000000" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Main Shadow Container */}
      <g filter={`url(#${id}-shadow)`}>
        {/* 1. HANDLE */}
        {/* Metal Ferrule connecting ring to handle */}
        <path
          d={`M ${attachX - perpX * ferruleW} ${attachY - perpY * ferruleW}
             L ${attachX + perpX * ferruleW} ${attachY + perpY * ferruleW}
             L ${attachX + Math.cos(rad) * 22 + perpX * (ferruleW - 2)} ${attachY + Math.sin(rad) * 22 + perpY * (ferruleW - 2)}
             L ${attachX + Math.cos(rad) * 22 - perpX * (ferruleW - 2)} ${attachY + Math.sin(rad) * 22 - perpY * (ferruleW - 2)} Z`}
          fill="#64748B"
          stroke="#0F172A"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Main Grip Handle */}
        <path
          d={`M ${attachX + Math.cos(rad) * 20 - perpX * gripW} ${attachY + Math.sin(rad) * 20 - perpY * gripW}
             L ${attachX + Math.cos(rad) * 20 + perpX * gripW} ${attachY + Math.sin(rad) * 20 + perpY * gripW}
             L ${endX + perpX * (gripW - 2)} ${endY + perpY * (gripW - 2)}
             Q ${endX + Math.cos(rad) * 16} ${endY + Math.sin(rad) * 16} ${endX - perpX * (gripW - 2)} ${endY - perpY * (gripW - 2)} Z`}
          fill={`url(#${id}-handle-grad)`}
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Handle Grip Detail Rings */}
        {[0.35, 0.5, 0.65, 0.8].map((t, idx) => {
          const rx = attachX + Math.cos(rad) * (24 + handleLength * t);
          const ry = attachY + Math.sin(rad) * (24 + handleLength * t);
          return (
            <line
              key={idx}
              x1={rx - perpX * (gripW - 1)}
              y1={ry - perpY * (gripW - 1)}
              x2={rx + perpX * (gripW - 1)}
              y2={ry + perpY * (gripW - 1)}
              stroke="#64748B"
              strokeWidth="2"
              opacity="0.7"
            />
          );
        })}

        {/* 2. OUTER METALLIC RIM */}
        <circle
          cx="0"
          cy="0"
          r={radius}
          fill="none"
          stroke={`url(#${id}-rim-grad)`}
          strokeWidth={rimWidth}
        />

        {/* Inner bezel groove */}
        <circle
          cx="0"
          cy="0"
          r={innerR + 1.5}
          fill="none"
          stroke="#0F172A"
          strokeWidth="2"
        />
      </g>

      {/* 3. TRANSLUCENT LENS INTERIOR (TINT & SPECULAR GLOSS) */}
      {/* Light blue optical tint */}
      <circle
        cx="0"
        cy="0"
        r={innerR}
        fill="#0284C7"
        fillOpacity="0.07"
      />

      {/* Diagonal gloss reflection highlight */}
      <circle
        cx="0"
        cy="0"
        r={innerR}
        fill={`url(#${id}-gloss)`}
      />

      {/* Subtle curved edge crescent gloss */}
      <path
        d={`M ${-innerR * 0.72} ${-innerR * 0.3}
           A ${innerR} ${innerR} 0 0 1 ${innerR * 0.3} ${-innerR * 0.72}
           A ${innerR * 0.88} ${innerR * 0.88} 0 0 0 ${-innerR * 0.72} ${-innerR * 0.3} Z`}
        fill="#FFFFFF"
        opacity="0.4"
      />
    </g>
  );
};
