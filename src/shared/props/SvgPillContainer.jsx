import React from "react";

/**
 * SvgPillContainer - Exact vector reproduction of user's "pill container 2.svg"
 * 
 * Styled in yellow plastic texture:
 * - Uses the EXACT paths, rects, cap, and teeth from "pill container 2.svg".
 * - Translucent yellow plastic body with prescription label.
 * - Interior floor clip so pills can never pierce through the bottom wall.
 * - Split into Back and Front components so animated pills render genuinely INSIDE the bottle.
 */

const YellowPlasticDefs = ({ id = "pill-container-2" }) => (
  <defs>
    {/* Yellow plastic back wall */}
    <linearGradient id={`${id}-yellow-back`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#EAB308" />
      <stop offset="25%" stopColor="#FACC15" />
      <stop offset="50%" stopColor="#FEF08A" />
      <stop offset="75%" stopColor="#FACC15" />
      <stop offset="100%" stopColor="#EAB308" />
    </linearGradient>

    {/* Translucent yellow plastic front wall sheen */}
    <linearGradient id={`${id}-yellow-front`} x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#CA8A04" stopOpacity="0.55" />
      <stop offset="18%" stopColor="#FACC15" stopOpacity="0.45" />
      <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.30" />
      <stop offset="82%" stopColor="#FACC15" stopOpacity="0.45" />
      <stop offset="100%" stopColor="#CA8A04" stopOpacity="0.55" />
    </linearGradient>

    {/* Interior floor clip: Prevents any pill from ever piercing below the container bottom wall */}
    <clipPath id={`${id}-interior-clip`}>
      <rect x="106.65" y="-1000" width="298.67" height="1486" />
    </clipPath>
  </defs>
);

/**
 * SvgPillContainerBack - Rendered BEHIND the pills
 * The back wall of the bottle container.
 */
export const SvgPillContainerBack = ({
  x = 960,
  y = 720,
  scale = 1,
  rotation = 0,
  opacity = 1,
  id = "pill-container-2",
}) => {
  return (
    <g
      id={`${id}-back`}
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity={opacity}
    >
      <YellowPlasticDefs id={id} />

      <g transform="translate(-256, -256)">
        {/* Exact rect from pill container 2.svg: x=106.65, y=10.671, width=298.67, height=501.29 */}
        <rect
          x="106.65"
          y="10.671"
          width="298.67"
          height="501.29"
          fill={`url(#${id}-yellow-back)`}
        />
      </g>
    </g>
  );
};

/**
 * SvgPillContainerFront - Rendered IN FRONT OF the pills
 * Overlays the pills with translucent yellow plastic sheen,
 * prescription label, exact outer frame, and exact cap from pill container 2.svg.
 */
export const SvgPillContainerFront = ({
  x = 960,
  y = 720,
  scale = 1,
  rotation = 0,
  opacity = 1,
  id = "pill-container-2",
}) => {
  return (
    <g
      id={`${id}-front`}
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}
      opacity={opacity}
      pointerEvents="none"
    >
      <g transform="translate(-256, -256)">
        {/* Exact rect from pill container 2.svg: Translucent yellow front plastic wall */}
        <rect
          x="106.65"
          y="10.671"
          width="298.67"
          height="501.29"
          fill={`url(#${id}-yellow-front)`}
        />

        {/* Prescription Medical Label (as requested by user) */}
        <g id="prescription-label" transform="translate(256, 260)">
          {/* Label background */}
          <rect
            x="-82"
            y="-60"
            width="164"
            height="132"
            rx="10"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.8"
          />

          {/* Top Rx Blue Header Strip */}
          <rect
            x="-82"
            y="-60"
            width="164"
            height="30"
            rx="8"
            fill="#0284C7"
          />
          <text
            x="-70"
            y="-40"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="900"
            fontFamily="Inter, sans-serif"
            letterSpacing="1"
          >
            Rx // 5510
          </text>

          {/* Prescription detail lines */}
          <line x1="-70" y1="-14" x2="15" y2="-14" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="-70" y1="-1" x2="40" y2="-1" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="-70" y1="12" x2="-10" y2="12" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="-70" y1="24" x2="20" y2="24" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />

          {/* Warning Badge */}
          <g transform="translate(50, 10)">
            <rect x="-13" y="-13" width="26" height="26" rx="5" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.4" />
            <text x="0" y="4.5" fill="#DC2626" fontSize="15" fontWeight="900" textAnchor="middle">!</text>
          </g>

          {/* Barcode Lines */}
          <g transform="translate(-70, 44)">
            {[0, 4, 7, 12, 15, 18, 24, 28, 32, 38, 42, 48, 52, 56, 62, 68, 72, 76, 82, 86, 92, 98, 104, 110, 116, 120, 126, 132, 138].map((bx, i) => (
              <line
                key={i}
                x1={bx}
                y1="0"
                x2={bx}
                y2="14"
                stroke="#0F172A"
                strokeWidth={i % 3 === 0 ? 2.2 : 1.2}
              />
            ))}
          </g>
        </g>

        {/* Exact frame path from pill container 2.svg: darker amber-yellow border (#CA8A04) */}
        <path
          fill="#CA8A04"
          d="M95.992,490.635L95.992,490.635v21.326l0,0l0,0h21.326l0,0h277.307l0,0h21.342V21.342L95.992,0.001 V490.635z M394.625,21.342v469.293H117.318V21.342H394.625z"
        />

        {/* Exact cap from pill container 2.svg: fill="#656D78" */}
        <path
          fill="#656D78"
          d="M437.31,42.669c0,11.733-9.625,21.327-21.344,21.327H95.992c-11.75,0-21.342-9.593-21.342-21.327 V21.342C74.65,9.593,84.242,0,95.992,0h319.975c11.719,0,21.344,9.593,21.344,21.342v21.327H437.31z"
        />

        {/* Exact 5 cap teeth from pill container 2.svg: fill="#434A54" */}
        <g fill="#434A54">
          <path d="M127.988,10.671c5.875,0,10.656-4.765,10.656-10.671h-21.326 C117.318,5.906,122.084,10.671,127.988,10.671z"/>
          <path d="M191.984,10.671c5.875,0,10.656-4.765,10.656-10.671h-21.328 C181.312,5.906,186.078,10.671,191.984,10.671z"/>
          <path d="M255.98,10.671c5.873,0,10.654-4.765,10.654-10.671h-21.326 C245.308,5.906,250.074,10.671,255.98,10.671z"/>
          <path d="M319.974,10.671c5.875,0,10.656-4.765,10.656-10.671h-21.312 C309.318,5.906,314.068,10.671,319.974,10.671z"/>
          <path d="M383.97,10.671c5.873,0,10.654-4.765,10.654-10.671h-21.311 C373.314,5.906,378.064,10.671,383.97,10.671z"/>
        </g>
      </g>
    </g>
  );
};

/**
 * Combined SvgPillContainer wrapper (Back + children + Front)
 */
export const SvgPillContainer = ({
  x = 960,
  y = 720,
  scale = 1,
  rotation = 0,
  opacity = 1,
  id = "pill-container-2",
  children,
}) => {
  return (
    <g id={id} opacity={opacity}>
      <SvgPillContainerBack x={x} y={y} scale={scale} rotation={rotation} id={id} />
      {children}
      <SvgPillContainerFront x={x} y={y} scale={scale} rotation={rotation} id={id} />
    </g>
  );
};
