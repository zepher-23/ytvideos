import React from "react";

export const TiledFloor = ({
  width = 3800,
  startX = -200,
  height = 1080,
  floorTop = 760,
}) => {
  const floorHeight = height - floorTop;
  const numRows = 7;
  const numCols = 32;
  const vanishingPointX = 1920 / 2;
  const vanishingPointY = -300;

  // Generate perspective horizontal lines
  const rowY = [];
  for (let i = 0; i <= numRows; i++) {
    const t = Math.pow(i / numRows, 1.45);
    rowY.push(floorTop + t * floorHeight);
  }

  // Generate perspective tiles across extended camera span
  const tiles = [];
  for (let r = 0; r < numRows; r++) {
    const yTop = rowY[r];
    const yBottom = rowY[r + 1];

    const tTop = (yTop - vanishingPointY) / (height - vanishingPointY);
    const tBottom = (yBottom - vanishingPointY) / (height - vanishingPointY);

    const spanTop = width * tTop * 1.5;
    const spanBottom = width * tBottom * 1.5;

    const leftTop = vanishingPointX - spanTop / 2;
    const leftBottom = vanishingPointX - spanBottom / 2;

    for (let c = 0; c < numCols; c++) {
      const x1 = leftTop + (c / numCols) * spanTop;
      const x2 = leftTop + ((c + 1) / numCols) * spanTop;
      const x3 = leftBottom + ((c + 1) / numCols) * spanBottom;
      const x4 = leftBottom + (c / numCols) * spanBottom;

      const isEven = (r + c) % 2 === 0;
      const fill = isEven ? "#F3F4F6" : "#D1D5DB";

      tiles.push(
        <polygon
          key={`tile-${r}-${c}`}
          points={`${x1},${yTop} ${x2},${yTop} ${x3},${yBottom} ${x4},${yBottom}`}
          fill={fill}
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      );
    }
  }

  return (
    <g id="tiled-floor">
      {/* Floor tiles */}
      <g>{tiles}</g>

      {/* Comic Baseboard spanning extended scene */}
      <rect
        x={startX}
        y={floorTop - 28}
        width={width}
        height="28"
        fill="#E5E7EB"
        stroke="#000000"
        strokeWidth="6"
      />
      <line
        x1={startX}
        y1={floorTop - 14}
        x2={startX + width}
        y2={floorTop - 14}
        stroke="#000000"
        strokeWidth="2.5"
        strokeDasharray="16 8"
        opacity="0.5"
      />

      {/* Thick Comic Baseline dividing wall and floor */}
      <line
        x1={startX}
        y1={floorTop}
        x2={startX + width}
        y2={floorTop}
        stroke="#000000"
        strokeWidth="8"
        strokeLinecap="square"
      />
    </g>
  );
};
