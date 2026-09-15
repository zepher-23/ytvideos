import React from "react";

/**
 * GridBackground - Canonical Shared Grid Environment
 * 
 * Renders the global clean graph paper / medical grid environment.
 * Default theme: "white" (light mode clinical graph paper with subtle grey grid lines).
 * 
 * Supports:
 * - "white": Pure white background (#FFFFFF) with subtle slate grid lines (#CBD5E1)
 * - "navy": Dark navy background (#0F172A) with cyan/white grid lines
 */
export const GridBackground = ({
  theme = "white",
  gridSize = 240,
  strokeDasharray = undefined,
  id = "shared-clinical-grid",
}) => {
  const isWhiteBg = theme === "white" || theme === "light";

  const bgColor = isWhiteBg ? "#FFFFFF" : "#0F172A";
  const gridStroke = isWhiteBg ? "#CBD5E1" : "#38BDF8";
  const gridOpacity = isWhiteBg ? 1.0 : 0.25;
  const strokeWidth = 2.5;

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ backgroundColor: bgColor }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: gridOpacity,
          WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 92%)",
          maskImage: "radial-gradient(ellipse 75% 70% at 50% 50%, #000 35%, transparent 92%)",
        }}
      >
        <defs>
          <pattern
            id={id}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M 0 0 H ${gridSize} M 0 0 V ${gridSize}`}
              fill="none"
              stroke={gridStroke}
              strokeWidth={strokeWidth}
            />
          </pattern>

          {/* Smooth radial vignette mask that fades the grid out at the edges */}
          <radialGradient id={`${id}-edge-fade`} cx="50%" cy="50%" r="50%">
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-vignette-mask`}>
            <rect width="100%" height="100%" fill={`url(#${id}-edge-fade)`} />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id})`}
          mask={`url(#${id}-vignette-mask)`}
        />
      </svg>
    </div>
  );
};
