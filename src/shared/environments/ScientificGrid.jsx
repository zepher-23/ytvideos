import React from "react";

/**
 * ScientificGrid - Clean Off-White Coordinate Grid with Axis Markings
 * 
 * Perfect for clinical, neuroscience, laboratory, and data-driven scenes.
 */
export const ScientificGrid = ({
  startX = 0,
  width = 1920,
  height = 1080,
  groundY = 815,
  wallColor = "#F8FAFC",
  floorColor = "#F1F5F9",
  gridColor = "#E2E8F0",
  headerText = "",
  subHeaderText = "",
}) => {
  return (
    <g id="scientific-grid-environment">
      {/* Wall area */}
      <rect
        x={startX}
        y="0"
        width={width}
        height={groundY}
        fill={wallColor}
      />

      {/* Floor area */}
      <rect
        x={startX}
        y={groundY}
        width={width}
        height={height - groundY}
        fill={floorColor}
      />

      {/* Floor dividing baseline */}
      <line
        x1={startX}
        y1={groundY}
        x2={startX + width}
        y2={groundY}
        stroke="#0F172A"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Grid lines */}
      <g id="grid-lines" opacity="0.7">
        {/* Horizontal lines */}
        {[100, 160, 220, 280, 340, 400, 460, 520, 580, 640, 700, 760].map((gy) => (
          <line
            key={`grid-h-${gy}`}
            x1={startX}
            y1={gy}
            x2={startX + width}
            y2={gy}
            stroke={gridColor}
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        ))}

        {/* Vertical lines */}
        {Array.from({ length: Math.ceil(width / 80) + 1 }, (_, i) => startX + 80 + i * 80).map((gx) => (
          <line
            key={`grid-v-${gx}`}
            x1={gx}
            y1="0"
            x2={gx}
            y2={groundY}
            stroke={gridColor}
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
        ))}

        {/* Crosshair markers */}
        {[
          { x: startX + 240, y: 220 },
          { x: startX + 480, y: 340 },
          { x: startX + 720, y: 160 },
          { x: startX + 1200, y: 280 },
          { x: startX + 1440, y: 400 },
          { x: startX + 1680, y: 220 },
        ].map((pt, idx) => (
          <g key={`crosshair-${idx}`} stroke="#94A3B8" strokeWidth="2" opacity="0.6">
            <line x1={pt.x - 8} y1={pt.y} x2={pt.x + 8} y2={pt.y} />
            <line x1={pt.x} y1={pt.y - 8} x2={pt.x} y2={pt.y + 8} />
          </g>
        ))}
      </g>

      {/* Optional Lab Annotations */}
      {(headerText || subHeaderText) && (
        <g id="lab-annotations">
          {headerText && (
            <text
              x={startX + 90}
              y="75"
              fill="#475569"
              fontSize="16"
              fontWeight="900"
              fontFamily="monospace, sans-serif"
              letterSpacing="2.5"
            >
              {headerText}
            </text>
          )}
          {subHeaderText && (
            <text
              x={startX + 90}
              y="100"
              fill="#94A3B8"
              fontSize="13"
              fontWeight="700"
              fontFamily="monospace, sans-serif"
              letterSpacing="1.5"
            >
              {subHeaderText}
            </text>
          )}
        </g>
      )}
    </g>
  );
};
