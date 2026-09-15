import React from "react";

/**
 * Canonical 3D Vertical Wheel Scroll Component
 * Renders an interactive/animated cylindrical wheel of list items with 3D perspective,
 * focal highlighting, acronym badges, and clean vector card frames.
 * 
 * @param {Array} items - Array of items: [{ id, acronym, name, subtitle, tag }]
 * @param {number} scrollPos - Current floating scroll index (e.g. 0 to items.length - 1)
 * @param {number} x - Center X coordinate
 * @param {number} y - Center Y coordinate
 * @param {number} width - Total card width
 * @param {number} radius - Cylindrical wheel radius (default: 320)
 * @param {number} angleStep - Angular step between items in degrees (default: 28)
 * @param {string} id - Unique SVG filter/clip prefix
 */
export const VerticalWheel = ({
  items = [],
  scrollPos = 0,
  x = 1350,
  y = 540,
  width = 1040,
  radius = 410,
  angleStep = 25,
  cardHeight = 92,
  id = "vertical-wheel",
}) => {
  const halfW = width / 2;
  const halfCardH = cardHeight / 2;

  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      <defs>
        {/* Subtle glass selection lens gradient */}
        <linearGradient id={`${id}-lens-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.02" />
          <stop offset="20%" stopColor="#0284C7" stopOpacity="0.08" />
          <stop offset="80%" stopColor="#0284C7" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.02" />
        </linearGradient>

        {/* Soft shadow for active focused card */}
        <filter id={`${id}-card-focus-shadow`} x="-20%" y="-40%" width="140%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="20" floodColor="#0284C7" floodOpacity="0.20" />
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* ============================================================== */}
      {/* 1. SELECTION LENS VIEWPORT / HIGHLIGHT BRACKET                 */}
      {/* Indicates the central active focus zone of the vertical wheel  */}
      {/* ============================================================== */}
      <g id={`${id}-selection-bracket`} pointerEvents="none">
        {/* Glass highlight pill behind active center item */}
        <rect
          x={-halfW - 16}
          y={-halfCardH - 12}
          width={width + 32}
          height={cardHeight + 24}
          rx="22"
          fill={`url(#${id}-lens-grad)`}
          stroke="#0284C7"
          strokeWidth="2.2"
          strokeDasharray="12 8"
          opacity="0.85"
        />

        {/* Left pointer marker indicator */}
        <path
          d={`M ${-halfW - 32} 0 L ${-halfW - 18} -10 L ${-halfW - 18} 10 Z`}
          fill="#0284C7"
        />

        {/* Right pointer marker indicator */}
        <path
          d={`M ${halfW + 32} 0 L ${halfW + 18} -10 L ${halfW + 18} 10 Z`}
          fill="#0284C7"
        />
      </g>

      {/* ============================================================== */}
      {/* 2. REVOLVING 3D CYLINDRICAL WHEEL ITEMS                        */}
      {/* ============================================================== */}
      <g id={`${id}-items`}>
        {items.map((item, idx) => {
          // Angular delta from current scroll position
          const theta = (idx - scrollPos) * angleStep;

          // Discard items on the back half of the cylinder
          if (Math.abs(theta) > 86) return null;

          const rad = (theta * Math.PI) / 180;
          const itemY = Math.sin(rad) * radius;
          const scale = Math.cos(rad);
          // Cubic falloff for smooth perspective depth fading
          const opacity = Math.pow(Math.max(0, Math.cos(rad)), 2.2);

          // Focus indicator: is this item at or very near the center?
          const isFocused = Math.abs(theta) < 13;

          return (
            <g
              key={`wheel-item-${item.id || idx}`}
              transform={`translate(0, ${itemY.toFixed(2)}) scale(${scale.toFixed(3)})`}
              opacity={opacity.toFixed(3)}
            >
              {/* Card Container Box */}
              <rect
                x={-halfW}
                y={-halfCardH}
                width={width}
                height={cardHeight}
                rx="18"
                fill={isFocused ? "#FFFFFF" : "#F8FAFC"}
                stroke={isFocused ? "#0284C7" : "#CBD5E1"}
                strokeWidth={isFocused ? "2.8" : "1.5"}
                filter={isFocused ? `url(#${id}-card-focus-shadow)` : undefined}
              />

              {/* Number Badge (01 to 10) */}
              <rect
                x={-halfW + 20}
                y="-25"
                width="50"
                height="50"
                rx="10"
                fill={isFocused ? "#0284C7" : "#E2E8F0"}
              />
              <text
                x={-halfW + 45}
                y="8"
                fill={isFocused ? "#FFFFFF" : "#475569"}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="22"
                fontWeight="700"
                textAnchor="middle"
              >
                {item.id < 10 ? `0${item.id}` : item.id}
              </text>

              {/* Acronym Badge (e.g. MDD, PPD, TRD) */}
              <rect
                x={-halfW + 86}
                y="-22"
                width="132"
                height="44"
                rx="9"
                fill={isFocused ? "#E0F2FE" : "#F1F5F9"}
                stroke={isFocused ? "#38BDF8" : "#E2E8F0"}
                strokeWidth={isFocused ? "1.8" : "1.2"}
              />
              <text
                x={-halfW + 152}
                y="7"
                fill={isFocused ? "#0284C7" : "#64748B"}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="19"
                fontWeight="800"
                letterSpacing="0.5px"
                textAnchor="middle"
              >
                {item.acronym || item.tag}
              </text>

              {/* Title Text */}
              <text
                x={-halfW + 238}
                y={item.subtitle ? -4 : 8}
                fill={isFocused ? "#0F172A" : "#64748B"}
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize={item.subtitle ? 23 : 25}
                fontWeight={isFocused ? "700" : "500"}
                textAnchor="start"
              >
                {item.name}
              </text>

              {/* Optional Subtitle (e.g. Dysthymia) */}
              {item.subtitle && (
                <text
                  x={-halfW + 238}
                  y="22"
                  fill={isFocused ? "#0284C7" : "#94A3B8"}
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="16"
                  fontWeight="600"
                  textAnchor="start"
                >
                  ({item.subtitle})
                </text>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
};

