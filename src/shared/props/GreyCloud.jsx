import React from "react";

/**
 * GreyCloud - Looming Gloom / Depression Rain Cloud
 * 
 * Renders dense slate grey comic cloud puffs, drop shadow, hatching lines, and drizzle streaks.
 */
export const GreyCloud = ({ x = 0, y = 0, scale = 1.05 }) => {
  return (
    <g
      id="heavy-grey-cloud"
      transform={`translate(${x}, ${y}) scale(${scale})`}
    >
      {/* Dark gloomy drop shadow underneath */}
      <ellipse cx="0" cy="22" rx="95" ry="16" fill="#000000" opacity="0.35" />

      {/* Dark Underbelly Base */}
      <path
        d="M -90 10 Q -96 -6 -80 -18 Q -90 -42 -65 -54 Q -48 -82 -10 -76 Q 20 -92 60 -68 Q 92 -64 96 -32 Q 106 -6 88 12 Q 50 20 0 18 Q -50 20 -90 10 Z"
        fill="#374151"
        stroke="#000000"
        strokeWidth="6.5"
        strokeLinejoin="round"
      />

      {/* Mid-Tone Highlights */}
      <path
        d="M -75 -15 Q -84 -36 -62 -48 Q -46 -72 -12 -68 Q 16 -82 52 -62 Q 80 -58 84 -30 Q 75 -10 45 -4 Q 0 4 -40 2 Q -65 2 -75 -15 Z"
        fill="#4B5563"
      />

      {/* Inner Highlight Puff */}
      <path
        d="M -40 -35 Q -32 -60 -5 -56 Q 16 -68 40 -50 Q 56 -36 50 -18 Q 25 -14 -10 -12 Q -30 -14 -40 -35 Z"
        fill="#6B7280"
        opacity="0.65"
      />

      {/* Underside Hatching */}
      <g stroke="#1F2937" strokeWidth="3" strokeLinecap="round">
        <line x1="-65" y1="6" x2="-55" y2="16" />
        <line x1="-50" y1="8" x2="-40" y2="18" />
        <line x1="-35" y1="10" x2="-25" y2="20" />
        <line x1="-20" y1="12" x2="-10" y2="22" />
        <line x1="-5" y1="12" x2="5" y2="22" />
        <line x1="10" y1="10" x2="20" y2="20" />
        <line x1="25" y1="8" x2="35" y2="18" />
        <line x1="40" y1="6" x2="50" y2="16" />
        <line x1="55" y1="4" x2="65" y2="14" />
      </g>

      {/* Drizzle Streaks */}
      <g stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" opacity="0.75">
        <line x1="-48" y1="28" x2="-48" y2="40" strokeDasharray="5 5" />
        <line x1="-22" y1="32" x2="-22" y2="46" strokeDasharray="5 5" />
        <line x1="0" y1="26" x2="0" y2="42" strokeDasharray="5 5" />
        <line x1="24" y1="32" x2="24" y2="46" strokeDasharray="5 5" />
        <line x1="50" y1="28" x2="50" y2="40" strokeDasharray="5 5" />
      </g>
    </g>
  );
};
