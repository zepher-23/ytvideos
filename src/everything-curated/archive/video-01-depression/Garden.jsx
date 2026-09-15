import React from "react";

export const Garden = ({
  startX = 3840,
  width = 1920,
  floorTop = 760,
  groundY = 815,
}) => {
  // Flower helper components
  const renderDaisy = (x, y, scale = 1.0) => (
    <g key={`daisy-${x}`} transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Stem */}
      <path
        d="M 0 0 Q -4 -30 2 -55"
        fill="none"
        stroke="#15803D"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M -1 -25 Q -14 -32 -18 -24 Q -12 -18 0 -20"
        fill="#22C55E"
        stroke="#000000"
        strokeWidth="2.5"
      />
      <path
        d="M 1 -35 Q 14 -42 18 -34 Q 12 -28 2 -30"
        fill="#22C55E"
        stroke="#000000"
        strokeWidth="2.5"
      />
      {/* Petals */}
      <g transform="translate(2, -58)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-14"
            rx="6.5"
            ry="11"
            transform={`rotate(${angle})`}
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="2.5"
          />
        ))}
        {/* Flower Center */}
        <circle
          cx="0"
          cy="0"
          r="9.5"
          fill="#FBBF24"
          stroke="#000000"
          strokeWidth="3"
        />
      </g>
    </g>
  );

  const renderTulip = (x, y, color = "#F43F5E", scale = 1.0) => (
    <g key={`tulip-${x}`} transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Stem */}
      <path
        d="M 0 0 Q 6 -35 -2 -62"
        fill="none"
        stroke="#15803D"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Wide Leaf */}
      <path
        d="M 2 -20 Q 18 -38 24 -24 Q 16 -12 2 -14"
        fill="#22C55E"
        stroke="#000000"
        strokeWidth="2.5"
      />
      {/* Tulip Cup */}
      <g transform="translate(-2, -64)">
        <path
          d="M -14 0 C -16 -22 -6 -28 -3 -15 C 0 -28 8 -28 5 -15 C 10 -26 18 -20 15 0 C 12 16 -10 16 -14 0 Z"
          fill={color}
          stroke="#000000"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );

  const renderWildFlower = (x, y, color = "#A855F7", scale = 0.9) => (
    <g key={`wild-${x}`} transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Stem */}
      <path
        d="M 0 0 Q -3 -22 1 -48"
        fill="none"
        stroke="#15803D"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Florets */}
      <g transform="translate(1, -50)">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-9"
            rx="5"
            ry="7.5"
            transform={`rotate(${angle})`}
            fill={color}
            stroke="#000000"
            strokeWidth="2.5"
          />
        ))}
        <circle cx="0" cy="0" r="6" fill="#FDE047" stroke="#000000" strokeWidth="2.5" />
      </g>
    </g>
  );

  const renderGrassTuft = (x, y, scale = 1.0) => (
    <g key={`grass-${x}`} transform={`translate(${x}, ${y}) scale(${scale})`}>
      <path
        d="M -12 0 Q -16 -18 -22 -22 Q -16 -12 -8 0"
        fill="#22C55E"
        stroke="#000000"
        strokeWidth="2.5"
      />
      <path
        d="M -6 0 Q -4 -26 -6 -32 Q 0 -16 2 0"
        fill="#22C55E"
        stroke="#000000"
        strokeWidth="2.5"
      />
      <path
        d="M 4 0 Q 14 -24 20 -28 Q 12 -12 10 0"
        fill="#22C55E"
        stroke="#000000"
        strokeWidth="2.5"
      />
    </g>
  );

  return (
    <g id="garden-environment">
      {/* ============================================================== */}
      {/* 1. OUTDOOR SKY BACKDROP (Overriding yellow wall beyond indoor room) */}
      {/* ============================================================== */}
      <rect
        x={startX}
        y={0}
        width={width}
        height={floorTop}
        fill="#BAE6FD" // Vibrant comic sky blue
      />

      {/* Comic Outdoor Sun */}
      <g transform={`translate(${startX + 450}, 160)`}>
        <circle cx="0" cy="0" r="54" fill="#FDE047" stroke="#000000" strokeWidth="6" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
          <line
            key={i}
            x1="0"
            y1="64"
            x2="0"
            y2="78"
            transform={`rotate(${deg})`}
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Stylized Puffy Comic Clouds */}
      <g transform={`translate(${startX + 180}, 120)`}>
        <path
          d="M 0 30 Q -24 30 -30 12 Q -34 -12 -12 -18 Q 8 -36 38 -24 Q 68 -32 82 -10 Q 102 -2 98 22 Q 94 30 70 30 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>
      <g transform={`translate(${startX + 820}, 90)`}>
        <path
          d="M 0 26 Q -20 26 -26 10 Q -30 -10 -10 -15 Q 6 -30 32 -20 Q 58 -28 70 -8 Q 88 -2 84 18 Q 80 26 60 26 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>
      <g transform={`translate(${startX + 1450}, 140)`}>
        <path
          d="M 0 28 Q -22 28 -28 10 Q -32 -10 -10 -16 Q 8 -32 36 -22 Q 62 -30 76 -10 Q 94 -2 90 20 Q 86 28 66 28 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </g>

      {/* ============================================================== */}
      {/* 2. DISTANT ROLLING GREEN HILLS                                 */}
      {/* ============================================================== */}
      <path
        d={`M ${startX} ${floorTop} Q ${startX + 350} 560 ${startX + 800} ${floorTop - 60} Q ${startX + 1300} 520 ${startX + 1800} ${floorTop - 40} L ${startX + width} ${floorTop} Z`}
        fill="#86EFAC"
        stroke="#000000"
        strokeWidth="6"
      />
      <path
        d={`M ${startX + 200} ${floorTop} Q ${startX + 650} 610 ${startX + 1150} ${floorTop - 30} Q ${startX + 1600} 600 ${startX + width} ${floorTop} Z`}
        fill="#4ADE80"
        stroke="#000000"
        strokeWidth="5.5"
      />

      {/* Bush Hedges along horizon */}
      <g transform={`translate(${startX + 120}, ${floorTop})`}>
        <path
          d="M 0 0 Q 30 -35 70 -20 Q 110 -40 150 -15 Q 190 -35 230 0 Z"
          fill="#16A34A"
          stroke="#000000"
          strokeWidth="4.5"
        />
      </g>
      <g transform={`translate(${startX + 780}, ${floorTop})`}>
        <path
          d="M 0 0 Q 35 -40 80 -25 Q 125 -45 170 -20 Q 215 -40 260 0 Z"
          fill="#16A34A"
          stroke="#000000"
          strokeWidth="4.5"
        />
      </g>
      <g transform={`translate(${startX + 1360}, ${floorTop})`}>
        <path
          d="M 0 0 Q 40 -35 85 -18 Q 130 -38 175 -15 Q 220 -35 270 0 Z"
          fill="#16A34A"
          stroke="#000000"
          strokeWidth="4.5"
        />
      </g>

      {/* ============================================================== */}
      {/* 3. FOREGROUND GARDEN LAWN                                      */}
      {/* ============================================================== */}
      <rect
        x={startX}
        y={floorTop}
        width={width}
        height={1080 - floorTop}
        fill="#22C55E" // Rich comic grass green
      />

      {/* Stylized darker lawn stripes / perspective layers */}
      <rect
        x={startX}
        y={floorTop + 65}
        width={width}
        height={50}
        fill="#16A34A"
        opacity="0.35"
      />
      <rect
        x={startX}
        y={floorTop + 160}
        width={width}
        height={65}
        fill="#15803D"
        opacity="0.28"
      />

      {/* Lawn Baseline Outline */}
      <line
        x1={startX}
        y1={floorTop}
        x2={startX + width}
        y2={floorTop}
        stroke="#000000"
        strokeWidth="8"
      />

      {/* ============================================================== */}
      {/* 4. INDOOR / OUTDOOR TRANSITION ARCHWAYS (ENTRANCE & EXIT)      */}
      {/* ============================================================== */}
      {/* Entrance Doorway at startX (x = 3840) */}
      <g id="patio-doorway-frame">
        <rect
          x={startX - 18}
          y={0}
          width="36"
          height={floorTop}
          fill="#F3F4F6"
          stroke="#000000"
          strokeWidth="7"
        />
        <line
          x1={startX}
          y1={0}
          x2={startX}
          y2={floorTop}
          stroke="#000000"
          strokeWidth="3"
        />
        <rect
          x={startX - 22}
          y={floorTop - 4}
          width="44"
          height="24"
          rx="3"
          fill="#E5E7EB"
          stroke="#000000"
          strokeWidth="5"
        />
      </g>

      {/* Exit Doorway at startX + width (x = 5760) into Scene 4 */}
      <g id="exit-doorway-frame">
        <rect
          x={startX + width - 18}
          y={0}
          width="36"
          height={floorTop}
          fill="#F3F4F6"
          stroke="#000000"
          strokeWidth="7"
        />
        <line
          x1={startX + width}
          y1={0}
          x2={startX + width}
          y2={floorTop}
          stroke="#000000"
          strokeWidth="3"
        />
        <rect
          x={startX + width - 22}
          y={floorTop - 4}
          width="44"
          height="24"
          rx="3"
          fill="#E5E7EB"
          stroke="#000000"
          strokeWidth="5"
        />
      </g>

      {/* ============================================================== */}
      {/* 5. VIBRANT COMIC FLOWERS & GRASS TUFTS                         */}
      {/* ============================================================== */}
      {/* Grass Tufts along garden floor */}
      {[60, 200, 340, 480, 620, 760, 910, 1060, 1220, 1380, 1540, 1700, 1860, 2020].map(
        (gx, i) => renderGrassTuft(startX + gx, floorTop + 12, i % 2 === 0 ? 1.1 : 0.9)
      )}

      {/* Flowers in varied colors and species across the garden */}
      {renderDaisy(startX + 140, floorTop + 36, 1.1)}
      {renderTulip(startX + 220, floorTop + 40, "#EF4444", 1.05)}
      {renderWildFlower(startX + 290, floorTop + 32, "#A855F7", 1.0)}
      {renderDaisy(startX + 370, floorTop + 45, 0.95)}
      {renderTulip(startX + 460, floorTop + 38, "#F43F5E", 1.15)}
      {renderWildFlower(startX + 550, floorTop + 34, "#3B82F6", 1.05)}
      {renderDaisy(startX + 640, floorTop + 42, 1.2)}
      {renderTulip(startX + 730, floorTop + 36, "#FB923C", 1.0)}
      {renderDaisy(startX + 840, floorTop + 44, 1.05)}
      {renderWildFlower(startX + 940, floorTop + 32, "#EC4899", 1.1)}
      {renderTulip(startX + 1040, floorTop + 38, "#EF4444", 1.1)}
      {renderDaisy(startX + 1150, floorTop + 42, 1.15)}
      {renderWildFlower(startX + 1260, floorTop + 35, "#8B5CF6", 1.0)}
      {renderTulip(startX + 1380, floorTop + 40, "#F43F5E", 1.05)}
      {renderDaisy(startX + 1500, floorTop + 45, 1.1)}
      {renderTulip(startX + 1620, floorTop + 38, "#FB923C", 1.1)}

      {/* Foreground flowers closer to camera (larger scale) */}
      {renderDaisy(startX + 190, 890, 1.35)}
      {renderTulip(startX + 320, 910, "#EF4444", 1.4)}
      {renderWildFlower(startX + 690, 900, "#A855F7", 1.3)}
      {renderDaisy(startX + 890, 920, 1.45)}
      {renderTulip(startX + 1180, 905, "#F43F5E", 1.35)}
      {renderWildFlower(startX + 1420, 895, "#3B82F6", 1.3)}
    </g>
  );
};
