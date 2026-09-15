import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * FlippingCalendar - 2D Comic Rapid Page-Flipping Calendar
 * 
 * Simulates rapid passage of days with curling 3D page flip and flying peel sheets.
 */
export const FlippingCalendar = ({
  x = 0,
  y = 0,
  width = 380,
  height = 460,
  frame: propFrame,
  flipPeriod = 8,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const pageIndex = Math.floor(frame / flipPeriod);
  const flipT = (frame % flipPeriod) / flipPeriod;

  const currentDay = (pageIndex % 31) + 1;
  const nextDay = ((pageIndex + 1) % 31) + 1;
  const nextMonth = months[Math.floor((pageIndex + 1) / 4) % 12];

  const flipScaleY = Math.cos(flipT * Math.PI);
  const isTopHalf = flipT < 0.5;

  return (
    <g id="rapid-flipping-calendar" transform={`translate(${x}, ${y})`}>
      {/* Calendar Wall Drop Shadow */}
      <rect
        x="12"
        y="12"
        width={width}
        height={height}
        rx="14"
        fill="#000000"
        opacity="0.22"
      />

      {/* Base Calendar Backing Plate */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        rx="12"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="7"
      />

      {/* Header Band */}
      <path
        d={`M 0 12 Q 0 0 12 0 L ${width - 12} 0 Q ${width} 0 ${width} 12 L ${width} 90 L 0 90 Z`}
        fill="#DC2626"
        stroke="#000000"
        strokeWidth="6"
      />
      <text
        x={width / 2}
        y="62"
        textAnchor="middle"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="44"
        fill="#FFFFFF"
        letterSpacing="4"
      >
        {nextMonth}
      </text>

      {/* Base Big Number (Next Day) */}
      <text
        x={width / 2}
        y={height / 2 + 105}
        textAnchor="middle"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="170"
        fill="#111827"
      >
        {nextDay}
      </text>

      {/* FLIPPING PAGE */}
      <g
        transform={`translate(0, 90) scale(1, ${Math.max(-1, Math.min(1, flipScaleY))})`}
        style={{ transformOrigin: "0px 0px" }}
      >
        <rect
          x="0"
          y="0"
          width={width}
          height={height - 90}
          fill={isTopHalf ? "#FFFFFF" : "#F3F4F6"}
          stroke="#000000"
          strokeWidth="6"
          opacity={isTopHalf ? 1 : 0.95}
        />
        <text
          x={width / 2}
          y={(height - 90) / 2 + 65}
          textAnchor="middle"
          fontFamily="'Arial Black', 'Impact', sans-serif"
          fontWeight="900"
          fontSize="170"
          fill="#1F2937"
        >
          {isTopHalf ? currentDay : nextDay}
        </text>
      </g>

      {/* Flying Torn Sheet */}
      <g
        transform={`translate(${width - 40 + flipT * 120}, ${120 + flipT * 180}) rotate(${flipT * 45}) scale(${1 - flipT * 0.4})`}
        opacity={1 - flipT * 0.8}
      >
        <rect
          x="-30"
          y="-30"
          width="70"
          height="85"
          rx="4"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="3.5"
        />
        <line x1="-18" y1="-10" x2="25" y2="-10" stroke="#9CA3AF" strokeWidth="3" />
        <line x1="-18" y1="5" x2="15" y2="5" stroke="#9CA3AF" strokeWidth="3" />
        <line x1="-18" y1="20" x2="20" y2="20" stroke="#9CA3AF" strokeWidth="3" />
      </g>

      {/* Speed Lines */}
      <g opacity="0.6">
        <path d={`M ${width + 15} 160 L ${width + 55} 150`} stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
        <path d={`M ${width + 25} 240 L ${width + 75} 230`} stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
        <path d={`M ${width + 10} 320 L ${width + 60} 310`} stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Top Rings */}
      <g>
        <rect x="0" y="0" width={width} height="22" fill="#1F2937" stroke="#000000" strokeWidth="4" />
        {[35, 95, 155, 215, 275, 335].map((rx, i) => (
          <g key={i} transform={`translate(${rx}, -6)`}>
            <rect x="-6" y="0" width="12" height="30" rx="4" fill="#D1D5DB" stroke="#000000" strokeWidth="3" />
          </g>
        ))}
      </g>
    </g>
  );
};
