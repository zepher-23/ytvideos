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
  variant = "perspective",
  tileColorEven = "#FFFFFF",
  tileColorOdd = "#E2E8F0",
  strokeColor = "#CBD5E1",
  strokeWidth = 1.8,
  baselineColor = "#0F172A",
  baselineWidth = 6,
  numRows = 5,
  numCols = 22,
  showShadow = true,
  standalone = false,
  opacity = 1.0,
  id = "modular-floor",
}) => {
  const floorHeight = Math.max(20, height - floorY);
  const bleed = 120;
  const startX = -bleed;
  const totalWidth = width + bleed * 2;

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

    // Default: Perspective 3D receding checkerboard
    const vanishingPointX = width / 2;
    const vanishingPointY = -250;

    const rowY = [];
    for (let i = 0; i <= numRows; i++) {
      const t = Math.pow(i / numRows, 1.4);
      rowY.push(floorY + t * floorHeight);
    }

    const perspectiveTiles = [];
    for (let r = 0; r < numRows; r++) {
      const yTop = rowY[r];
      const yBottom = rowY[r + 1];

      const tTop = (yTop - vanishingPointY) / (height - vanishingPointY);
      const tBottom = (yBottom - vanishingPointY) / (height - vanishingPointY);

      const spanTop = (width + 600) * tTop;
      const spanBottom = (width + 600) * tBottom;

      const leftTop = vanishingPointX - spanTop / 2;
      const leftBottom = vanishingPointX - spanBottom / 2;

      for (let c = 0; c < numCols; c++) {
        const x1 = leftTop + (c / numCols) * spanTop;
        const x2 = leftTop + ((c + 1) / numCols) * spanTop;
        const x3 = leftBottom + ((c + 1) / numCols) * spanBottom;
        const x4 = leftBottom + (c / numCols) * spanBottom;

        const isEven = (r + c) % 2 === 0;
        const fill = isEven ? tileColorEven : tileColorOdd;

        perspectiveTiles.push(
          <polygon
            key={`persp-tile-${r}-${c}`}
            points={`${x1.toFixed(1)},${yTop.toFixed(1)} ${x2.toFixed(1)},${yTop.toFixed(1)} ${x3.toFixed(1)},${yBottom.toFixed(1)} ${x4.toFixed(1)},${yBottom.toFixed(1)}`}
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
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </linearGradient>
        )}
      </defs>

      {/* Clipped tiles layer */}
      <g clipPath={`url(#${id}-bounds-clip)`}>
        {content}

        {/* Soft shadow overlay */}
        {showShadow && (
          <rect
            x={startX}
            y={floorY}
            width={totalWidth}
            height={26}
            fill={`url(#${id}-shadow-grad)`}
            pointerEvents="none"
          />
        )}
      </g>

      {/* EDGE-TO-EDGE FLOOR BASELINE */}
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
