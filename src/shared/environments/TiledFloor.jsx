import React from "react";

/**
 * TiledFloor - Reusable 2D Comic Perspective Floor
 * 
 * Renders a perspective tiled checkerboard floor with baseboard molding.
 */
export const TiledFloor = ({
  width = 1920,
  startX = -300,
  height = 1080,
  floorTop = 780,
  horizonY = 540,
  vanishingPointX = 1920 / 2,
  tileColorEven = "#F8FAFC",
  tileColorOdd = "#E2E8F0",
  strokeColor = "#CBD5E1",
  strokeWidth = 1.6,
  numRows = 6,
  numCols = 22,
  showShadow = true,
  showBaseboard = true,
}) => {
  const floorHeight = Math.max(40, height - floorTop);
  const totalWidth = width + Math.abs(startX) * 2;

  // Authentic 3D perspective floor projection:
  const C = height - horizonY;
  const Z_near = 1.0;
  const Z_far = C / Math.max(10, floorTop - horizonY);

  const rowY = [];
  const rowZ = [];
  for (let r = 0; r <= numRows; r++) {
    const z = Z_far + (r / numRows) * (Z_near - Z_far);
    rowZ.push(z);
    rowY.push(horizonY + C / z);
  }

  const spanWorld = totalWidth * Z_far;
  const colStepWorld = spanWorld / numCols;
  const halfCols = Math.ceil(numCols / 2) + 2;

  const tiles = [];
  for (let r = 0; r < numRows; r++) {
    const yTop = rowY[r];
    const yBottom = rowY[r + 1];
    const zTop = rowZ[r];
    const zBottom = rowZ[r + 1];

    for (let c = -halfCols; c < halfCols; c++) {
      const worldX1 = vanishingPointX + c * colStepWorld;
      const worldX2 = vanishingPointX + (c + 1) * colStepWorld;

      const x1_top = vanishingPointX + (worldX1 - vanishingPointX) / zTop;
      const x2_top = vanishingPointX + (worldX2 - vanishingPointX) / zTop;
      const x2_bot = vanishingPointX + (worldX2 - vanishingPointX) / zBottom;
      const x1_bot = vanishingPointX + (worldX1 - vanishingPointX) / zBottom;

      const minTileX = Math.min(x1_top, x1_bot);
      const maxTileX = Math.max(x2_top, x2_bot);
      if (maxTileX < startX || minTileX > width + Math.abs(startX)) continue;

      const isEven = (r + ((c % 2) + 2) % 2) % 2 === 0;
      const fill = isEven ? tileColorEven : tileColorOdd;

      tiles.push(
        <polygon
          key={`tile-${r}-${c}`}
          points={`${x1_top.toFixed(1)},${yTop.toFixed(1)} ${x2_top.toFixed(1)},${yTop.toFixed(1)} ${x2_bot.toFixed(1)},${yBottom.toFixed(1)} ${x1_bot.toFixed(1)},${yBottom.toFixed(1)}`}
          fill={fill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      );
    }
  }

  return (
    <g id="tiled-floor">
      <defs>
        <clipPath id="tiled-floor-bounds">
          <rect x={startX} y={floorTop} width={totalWidth} height={floorHeight + 20} />
        </clipPath>
        {showShadow && (
          <linearGradient id="tiled-floor-shadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#0F172A" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </linearGradient>
        )}
      </defs>

      {/* Floor tiles */}
      <g clipPath="url(#tiled-floor-bounds)">
        <g>{tiles}</g>
        {showShadow && (
          <rect
            x={startX}
            y={floorTop}
            width={totalWidth}
            height={45}
            fill="url(#tiled-floor-shadow)"
            pointerEvents="none"
          />
        )}
      </g>

      {/* Comic Baseboard spanning extended scene */}
      {showBaseboard && (
        <g id="tiled-floor-baseboard">
          <rect
            x={startX}
            y={floorTop - 24}
            width={totalWidth}
            height="24"
            fill="#F1F5F9"
            stroke="#0F172A"
            strokeWidth="3"
          />
          <line
            x1={startX}
            y1={floorTop - 12}
            x2={startX + totalWidth}
            y2={floorTop - 12}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeDasharray="16 8"
            opacity="0.6"
          />
        </g>
      )}

      {/* Thick Comic Baseline dividing wall and floor */}
      <line
        x1={startX}
        y1={floorTop}
        x2={startX + totalWidth}
        y2={floorTop}
        stroke="#0F172A"
        strokeWidth="6"
        strokeLinecap="square"
      />
    </g>
  );
};
