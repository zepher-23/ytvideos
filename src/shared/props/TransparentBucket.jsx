import React from "react";

/**
 * TransparentBucket - 2D Comic Fluid Container with Dynamic Level, Leak & Crack VFX
 * 
 * Supports:
 * - fillPct: 0 to 1 (liquid fill height)
 * - isCracked: boolean (triggers base crack)
 * - crackBurstT: 0 to 1 (triggers "CRACK!" soundburst)
 * - isSpraying: boolean (pressurized arc jet)
 * - sprayPower: 0 to 1
 * - puddleRx, puddleRy: expanding floor puddle
 * - label: text for the plaque (default: "SEROTONIN")
 */
export const TransparentBucket = ({
  x = 0,
  y = 815,
  fillPct = 0.25,
  label = "SEROTONIN",
  isCracked = false,
  crackBurstT = 0,
  isSpraying = false,
  sprayPower = 1,
  puddleRx = 0,
  puddleRy = 0,
  frame = 0,
  liquidColorPrimary = "#06B6D4",
  liquidColorSecondary = "#0891B2",
  liquidColorGlow = "#22D3EE",
}) => {
  const bucketHeight = 250;
  const topRx = 122;
  const topRy = 25;
  const botRx = 92;
  const botRy = 18;

  const liquidY = -(fillPct * 230);
  const liquidRx = botRx + (topRx - botRx) * fillPct;
  const liquidRy = botRy + (topRy - botRy) * fillPct;

  const isSurfaceWobbly = isSpraying || (fillPct > 0.05 && fillPct < 0.95);
  const rippleAmp = isSurfaceWobbly ? Math.sin(frame * 0.45) * 2.5 : 0;

  return (
    <g id="transparent-fluid-bucket-root">
      {/* Floor puddle under bucket */}
      {puddleRx > 0 && (
        <g id="bucket-floor-puddle" transform={`translate(${x - 130}, ${y})`}>
          <ellipse cx="0" cy="2" rx={puddleRx} ry={puddleRy} fill={liquidColorPrimary} stroke="#000000" strokeWidth="3.5" />
          <ellipse cx="-8" cy="0" rx={puddleRx * 0.72} ry={puddleRy * 0.65} fill="#67E8F9" opacity="0.85" />
          {isSpraying && (
            <ellipse
              cx="-20"
              cy="2"
              rx={18 + Math.sin(frame * 0.5) * 8}
              ry={4 + Math.sin(frame * 0.5) * 2}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              opacity="0.75"
            />
          )}
        </g>
      )}

      {/* Main Bucket Structure */}
      <g id="bucket-body" transform={`translate(${x}, ${y})`}>
        {/* Floor drop shadow */}
        <ellipse cx="0" cy="2" rx="108" ry="17" fill="#000000" opacity="0.28" />

        {/* Back Rim */}
        <ellipse cx="0" cy={-bucketHeight} rx={topRx} ry={topRy} fill="#CBD5E1" stroke="#000000" strokeWidth="6" />

        {/* Liquid Body (Clipped inside bucket) */}
        {fillPct > 0.005 && (
          <g>
            <path
              d={`M ${-liquidRx - 4} ${liquidY} L ${liquidRx + 4} ${liquidY} L ${botRx - 4} -4 L ${-botRx + 4} -4 Z`}
              fill={liquidColorPrimary}
            />
            {/* Liquid Surface Ellipse */}
            <ellipse
              cx="0"
              cy={liquidY + rippleAmp}
              rx={liquidRx}
              ry={liquidRy}
              fill={liquidColorGlow}
              stroke="#A5F3FC"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* Translucent Glass/Wood Stave Wall */}
        <path
          d={`M ${-topRx} ${-bucketHeight} L ${topRx} ${-bucketHeight} L ${botRx} 0 L ${-botRx} 0 Z`}
          fill="rgba(241, 245, 249, 0.40)"
          stroke="#000000"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Staves */}
        {[-0.6, -0.2, 0.2, 0.6].map((ratio, idx) => (
          <line
            key={`stave-${idx}`}
            x1={topRx * ratio}
            y1={-bucketHeight}
            x2={botRx * ratio}
            y2="0"
            stroke="#000000"
            strokeWidth="3.5"
            opacity="0.65"
          />
        ))}

        {/* Specular White Shine */}
        <line x1={-topRx + 24} y1={-bucketHeight + 20} x2={-botRx + 20} y2="-20" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" opacity="0.85" />

        {/* Top Rim Metal Band */}
        <ellipse cx="0" cy={-bucketHeight} rx={topRx} ry={topRy} fill="none" stroke="#334155" strokeWidth="10" />
        <ellipse cx="0" cy={-bucketHeight} rx={topRx} ry={topRy} fill="none" stroke="#000000" strokeWidth="5" />

        {/* Middle Metal Band */}
        <path d={`M ${-(botRx + (topRx - botRx) * 0.52)} -130 Q 0 ${-130 + topRy * 0.8} ${botRx + (topRx - botRx) * 0.52} -130`} fill="none" stroke="#334155" strokeWidth="12" />
        <path d={`M ${-(botRx + (topRx - botRx) * 0.52)} -130 Q 0 ${-130 + topRy * 0.8} ${botRx + (topRx - botRx) * 0.52} -130`} fill="none" stroke="#000000" strokeWidth="5" />
        {[-70, -25, 25, 70].map((rvX, idx) => (
          <circle key={`rv-${idx}`} cx={rvX} cy={-124 + Math.abs(rvX) * 0.05} r="3" fill="#94A3B8" stroke="#000000" strokeWidth="1.5" />
        ))}

        {/* Bottom Metal Band */}
        <path d={`M ${-botRx} -14 Q 0 ${-14 + botRy * 0.9} ${botRx} -14`} fill="none" stroke="#334155" strokeWidth="12" />
        <path d={`M ${-botRx} -14 Q 0 ${-14 + botRy * 0.9} ${botRx} -14`} fill="none" stroke="#000000" strokeWidth="5" />

        {/* Metal Handle */}
        <path
          d={`M ${-topRx - 2} ${-bucketHeight + 8} C ${-topRx - 45} ${-bucketHeight - 110} ${topRx + 45} ${-bucketHeight - 110} ${topRx + 2} ${-bucketHeight + 8}`}
          fill="none"
          stroke="#1E293B"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <rect x="-35" y={-bucketHeight - 118} width="70" height="18" rx="7" fill="#B45309" stroke="#000000" strokeWidth="4" />

        {/* Plaque */}
        <g transform="translate(0, -132)">
          <rect x="-80" y="-20" width="160" height="40" rx="7" fill="#FEF08A" stroke="#000000" strokeWidth="4.5" />
          <circle cx="-68" cy="0" r="3.5" fill="#CA8A04" stroke="#000000" strokeWidth="2" />
          <circle cx="68" cy="0" r="3.5" fill="#CA8A04" stroke="#000000" strokeWidth="2" />
          <text x="0" y="7" fill="#000000" fontSize="18" fontWeight="900" fontFamily="Impact, Arial Black, sans-serif" letterSpacing="2.8" textAnchor="middle">
            {label}
          </text>
        </g>

        {/* Crack & Leak VFX */}
        {isCracked && (
          <g id="crack-vfx">
            <path d="M -78 -48 L -72 -36 L -79 -24 L -68 -12 L -74 0" fill="none" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="bevel" />
            <path d="M -72 -36 L -58 -42 L -52 -34" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
            <path d="M -79 -24 L -88 -20 L -92 -12" fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" />

            {/* Soundburst */}
            {crackBurstT > 0 && (
              <g transform={`translate(-115, -45) scale(${crackBurstT}) rotate(-12)`} opacity={Math.min(1, crackBurstT * 1.5)}>
                <polygon points="0,-24 8,-8 26,-14 16,3 32,16 12,16 6,32 -6,18 -24,24 -16,6 -30,-6 -10,-8" fill="#FDE047" stroke="#000000" strokeWidth="3.5" />
                <text x="0" y="7" fill="#DC2626" fontSize="22" fontWeight="900" fontFamily="Impact, Arial Black, sans-serif" letterSpacing="1.5" textAnchor="middle" stroke="#000000" strokeWidth="1.2">
                  CRACK!
                </text>
              </g>
            )}

            {/* Pressurized Spray Arc */}
            {isSpraying && (
              <g id="spray-stream">
                <path d={`M -72 -36 Q ${-130 - 30 * sprayPower} ${-55 - 15 * sprayPower} ${-150 - 45 * sprayPower} 2`} fill="none" stroke={liquidColorPrimary} strokeWidth={8 * sprayPower + 3} strokeLinecap="round" />
                <path d={`M -72 -36 Q ${-130 - 30 * sprayPower} ${-55 - 15 * sprayPower} ${-150 - 45 * sprayPower} 2`} fill="none" stroke="#CFFAFE" strokeWidth={3 * sprayPower + 1} strokeLinecap="round" />
              </g>
            )}
          </g>
        )}
      </g>
    </g>
  );
};
