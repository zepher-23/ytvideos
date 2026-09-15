import React from "react";

/**
 * PillContainer - Canonical Pharmaceutical Bottle / Pill Container Component
 * 
 * Clean vector medical pill bottle with:
 * - Threaded neck and open top rim for pills to enter
 * - Prescription label with Rx badge, barcode lines, and blue header
 * - Translucent clinical bottle body (visible pills inside)
 * - Ground shadow
 */
export const PillContainer = ({
  x = 960,
  y = 720,
  scale = 1,
  rotation = 0,
  bottleColor = "#F1F5F9",
  strokeColor = "#334155",
  labelColor = "#0284C7",
  showCap = false,
  opacity = 1,
  children,
}) => {
  return (
    <g
      id="pill-container"
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Ground Contact Shadow */}
      <ellipse
        cx="0"
        cy="150"
        rx="110"
        ry="18"
        fill="#000000"
        opacity="0.12"
      />

      {/* Bottle Back Layer (Behind pills inside) */}
      <rect
        x="-95"
        y="-70"
        width="190"
        height="210"
        rx="24"
        fill={bottleColor}
        stroke={strokeColor}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Bottle Shoulder Curve */}
      <path
        d="M -95 -50 C -95 -85, -60 -95, -45 -95 L 45 -95 C 60 -95, 95 -85, 95 -50 Z"
        fill={bottleColor}
        stroke={strokeColor}
        strokeWidth="4"
      />

      {/* Threaded Neck */}
      <rect
        x="-48"
        y="-125"
        width="96"
        height="32"
        rx="4"
        fill="#E2E8F0"
        stroke={strokeColor}
        strokeWidth="3.5"
      />

      {/* Thread ridges */}
      <line x1="-50" y1="-115" x2="50" y2="-115" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="-50" y1="-105" x2="50" y2="-105" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />

      {/* Top Open Rim (Mouth target for incoming pills: x: 0, y: -125) */}
      <ellipse
        cx="0"
        cy="-125"
        rx="48"
        ry="12"
        fill="#CBD5E1"
        stroke={strokeColor}
        strokeWidth="4"
      />
      <ellipse
        cx="0"
        cy="-125"
        rx="40"
        ry="9"
        fill="#0F172A"
        opacity="0.75"
      />

      {/* Children: Pills that have entered the bottle */}
      {children && (
        <g id="pills-inside-bottle">
          {children}
        </g>
      )}

      {/* Front Translucent Glass Shading & Prescription Label */}
      {/* Front Bottle Wall Overlay */}
      <rect
        x="-95"
        y="-70"
        width="190"
        height="210"
        rx="24"
        fill="#FFFFFF"
        opacity="0.35"
      />

      {/* Prescription Medical Label */}
      <g id="prescription-label" transform="translate(0, 15)">
        {/* Label background */}
        <rect
          x="-82"
          y="-55"
          width="164"
          height="125"
          rx="10"
          fill="#FFFFFF"
          stroke="#94A3B8"
          strokeWidth="2"
        />

        {/* Top Rx Blue Header Strip */}
        <rect
          x="-82"
          y="-55"
          width="164"
          height="28"
          rx="8"
          fill={labelColor}
        />
        <text
          x="-68"
          y="-36"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="900"
          fontFamily="Inter, sans-serif"
          letterSpacing="1"
        >
          Rx // PHARMACY
        </text>

        {/* Prescription details & dosage lines */}
        <line x1="-70" y1="-12" x2="10" y2="-12" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="-70" y1="2" x2="40" y2="2" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="-70" y1="16" x2="-10" y2="16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="-70" y1="28" x2="20" y2="28" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />

        {/* Warning Badge / Red Triangle */}
        <g transform="translate(48, 14)">
          <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
          <text x="0" y="5" fill="#DC2626" fontSize="16" fontWeight="900" textAnchor="middle">!</text>
        </g>

        {/* Barcode Lines at Bottom */}
        <g transform="translate(-70, 48)">
          {[0, 4, 7, 12, 15, 18, 24, 28, 32, 38, 42, 48, 52, 56, 62].map((bx, i) => (
            <line
              key={i}
              x1={bx}
              y1="0"
              x2={bx}
              y2="14"
              stroke="#1E293B"
              strokeWidth={i % 3 === 0 ? "2.5" : "1.2"}
            />
          ))}
        </g>
      </g>

      {/* Front Glass Vertical Specular Reflection */}
      <rect
        x="-86"
        y="-60"
        width="14"
        height="185"
        rx="7"
        fill="#FFFFFF"
        opacity="0.65"
      />
    </g>
  );
};
