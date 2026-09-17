import React from "react";

/**
 * ModularFloor - Canonical Reusable Edge-to-Edge Floor with Tiles
 *
 * Designed for all explainer channels and scenes:
 * - Edge-to-edge continuous baseline (default x: -100 to 2020, completely covering 1920px screen with bleed)
 * - Alternating grey and white tiles (perspective 3D receding checkerboard or 2D flat grid)
 * - Ground depth contact shadow along the baseline
 * - Can be rendered directly inside an existing <svg> as a <g> element, or as a standalone full-screen layer
 *
 * @param {number} floorY - Vertical position of the floor line (default: 780)
 * @param {number} width - Screen width (default: 1920)
 * @param {number} height - Screen height (default: 1080)
 * @param {string} variant - "perspective" | "flat" (default: "perspective")
 * @param {string} tileColorEven - Fill for even tiles (default: "#FFFFFF")
 * @param {string} tileColorOdd - Fill for odd tiles (default: "#E2E8F0")
 * @param {string} strokeColor - Tile divider line color (default: "#CBD5E1")
 * @param {number} strokeWidth - Tile line width (default: 1.8)
 * @param {string} baselineColor - Top baseline color (default: "#0F172A")
 * @param {number} baselineWidth - Top baseline thickness (default: 6)
 * @param {number} numRows - Number of tile rows from baseline to bottom (default: 5)
 * @param {number} numCols - Number of columns across the screen (default: 22)
 * @param {boolean} showShadow - Soft ambient shadow under baseline for depth (default: true)
 * @param {boolean} standalone - If true, wraps in absolute full-screen <svg> (default: false)
 * @param {number} opacity - Overall floor opacity (default: 1.0)
 * @param {string} id - Unique SVG element identifier (default: "modular-floor")
 */
export const ModularFloor = ({
  floorY = 780,
  width = 1920,
  height = 1080,
  horizonY,
  vanishingPointX,
  variant = "perspective",
  tileColorEven = "#FFFFFF",
  tileColorOdd = "#E2E8F0",
  strokeColor = "#CBD5E1",
  strokeWidth = 1.6,
  baselineColor = "#0F172A",
  baselineWidth = 6,
  numRows = 6,
  numCols = 22,
  showShadow = true,
  showAtmosphere = true,
  showBaseboard = false,
  baseboardHeight = 22,
  baseboardColor = "#F1F5F9",
  standalone = false,
  opacity = 1.0,
  id = "modular-floor",
}) => {
  const floorHeight = Math.max(40, height - floorY);
  const bleed = 300;
  const startX = -bleed;
  const totalWidth = width + bleed * 2;

  // Vanishing point: default eye level horizon at ~540 (or floorY - 240)
  const vpHorizonY = horizonY !== undefined ? horizonY : Math.min(540, floorY - 200);
  const vpX = vanishingPointX !== undefined ? vanishingPointX : width / 2;

  const content = (() => {
    if (variant === "flat") {
      // Clean 2D flat rectangular checkerboard
      const rowHeight = floorHeight / numRows;
      const colWidth = totalWidth / numCols;
      const flatTiles = [];

      for (let r = 0; r < numRows; r++) {
        const yTop = floorY + r * rowHeight;
        for (let c = 0; c < numCols; c++) {
          const xLeft = startX + c * colWidth;
          const isEven = (r + c) % 2 === 0;
          const fill = isEven ? tileColorEven : tileColorOdd;

          flatTiles.push(
            <rect
              key={`flat-tile-${r}-${c}`}
              x={xLeft}
              y={yTop}
              width={colWidth}
              height={rowHeight}
              fill={fill}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          );
        }
      }

      return (
        <g id={`${id}-flat-group`}>
          <g id={`${id}-tiles`}>{flatTiles}</g>
        </g>
      );
    }

    // Authentic 3D perspective floor projection:
    // Transversal rows foreshortened via 1/Z:
    const C = height - vpHorizonY;
    const Z_near = 1.0;
    const Z_far = C / Math.max(10, floorY - vpHorizonY);

    const rowY = [];
    const rowZ = [];
    for (let r = 0; r <= numRows; r++) {
      const z = Z_far + (r / numRows) * (Z_near - Z_far);
      rowZ.push(z);
      rowY.push(vpHorizonY + C / z);
    }

    // World column positions to ensure full screen coverage at the furthest row
    const spanWorld = (width + bleed * 2) * Z_far;
    const colStepWorld = spanWorld / numCols;
    const halfCols = Math.ceil(numCols / 2) + 2;

    const perspectiveTiles = [];
    for (let r = 0; r < numRows; r++) {
      const yTop = rowY[r];
      const yBottom = rowY[r + 1];
      const zTop = rowZ[r];
      const zBottom = rowZ[r + 1];

      for (let c = -halfCols; c < halfCols; c++) {
        const worldX1 = vpX + c * colStepWorld;
        const worldX2 = vpX + (c + 1) * colStepWorld;

        const x1_top = vpX + (worldX1 - vpX) / zTop;
        const x2_top = vpX + (worldX2 - vpX) / zTop;
        const x2_bot = vpX + (worldX2 - vpX) / zBottom;
        const x1_bot = vpX + (worldX1 - vpX) / zBottom;

        // Skip tiles completely outside horizontal viewport + bleed
        const minTileX = Math.min(x1_top, x1_bot);
        const maxTileX = Math.max(x2_top, x2_bot);
        if (maxTileX < startX || minTileX > width + bleed) continue;

        const isEven = (r + ((c % 2) + 2) % 2) % 2 === 0;
        const fill = isEven ? tileColorEven : tileColorOdd;

        perspectiveTiles.push(
          <polygon
            key={`persp-tile-${r}-${c}`}
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
      <g id={`${id}-perspective-group`}>
        <g id={`${id}-tiles`}>{perspectiveTiles}</g>
      </g>
    );
  })();

  const floorGroup = (
    <g id={id} opacity={opacity}>
      <defs>
        {/* Clip path ensuring tiles stay strictly beneath the floor baseline */}
        <clipPath id={`${id}-bounds-clip`}>
          <rect x={startX} y={floorY} width={totalWidth} height={floorHeight + 20} />
        </clipPath>

        {/* Ambient contact depth shadow under baseline */}
        {showShadow && (
          <linearGradient id={`${id}-shadow-grad`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.22" />
            <stop offset="40%" stopColor="#0F172A" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </linearGradient>
        )}

        {/* Subtle atmospheric depth gradient easing distance tiles into background */}
        {showAtmosphere && (
          <linearGradient id={`${id}-atmo-grad`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0" />
          </linearGradient>
        )}
      </defs>

      {/* Clipped tiles layer */}
      <g clipPath={`url(#${id}-bounds-clip)`}>
        {content}

        {/* Atmospheric depth overlay */}
        {showAtmosphere && (
          <rect
            x={startX}
            y={floorY}
            width={totalWidth}
            height={floorHeight + 20}
            fill={`url(#${id}-atmo-grad)`}
            pointerEvents="none"
          />
        )}

        {/* Ambient contact shadow along the wall-floor baseline */}
        {showShadow && (
          <rect
            x={startX}
            y={floorY}
            width={totalWidth}
            height={45}
            fill={`url(#${id}-shadow-grad)`}
            pointerEvents="none"
          />
        )}
      </g>

      {/* Optional Architectural Baseboard Trim */}
      {showBaseboard && (
        <g id={`${id}-baseboard`}>
          <rect
            x={startX}
            y={floorY - baseboardHeight}
            width={totalWidth}
            height={baseboardHeight}
            fill={baseboardColor}
            stroke={baselineColor}
            strokeWidth="2"
          />
          <line
            x1={startX}
            y1={floorY - baseboardHeight}
            x2={startX + totalWidth}
            y2={floorY - baseboardHeight}
            stroke={baselineColor}
            strokeWidth="3"
          />
          <line
            x1={startX}
            y1={floorY - baseboardHeight * 0.4}
            x2={startX + totalWidth}
            y2={floorY - baseboardHeight * 0.4}
            stroke={strokeColor}
            strokeWidth="1.2"
          />
        </g>
      )}

      {/* EDGE-TO-EDGE GROUND BASELINE */}
      <line
        x1={startX}
        y1={floorY}
        x2={startX + totalWidth}
        y2={floorY}
        stroke={baselineColor}
        strokeWidth={baselineWidth}
        strokeLinecap="square"
      />
    </g>
  );

  if (standalone) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          {floorGroup}
        </svg>
      </div>
    );
  }

  return floorGroup;
};
