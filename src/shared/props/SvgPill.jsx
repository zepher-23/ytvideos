import React from "react";

/**
 * SvgPill - Canonical SVG Pill Component
 * 
 * Renders the user-provided vector pill SVGs (pill.svg & pill2.svg) with
 * normalized horizontal orientation (canonical axis along X, seam at x=0),
 * deterministic scaling, optional typography imprint (e.g. "WRONG"),
 * and zero glow per medical styling instructions.
 * 
 * Variants:
 * - "pill2": Red (#ED5564 / #DA4453) and White (#F5F7FA) capsule (from pill2.svg)
 * - "pill":  Blue (#3B97D3 / #2086BF) and White (#EBECED) capsule (from pill.svg)
 */
export const SvgPill = ({
  x = 0,
  y = 0,
  scale = 1,
  rotation = 0,
  variant = "pill2",
  label = "",
  labelPosition = "cap", // "cap" (colored end), "white" (white end), "center"
  labelColor,
  opacity = 1,
  style = {},
  id,
}) => {
  const isPill2 = variant === "pill2";

  // Base normalization constants:
  // Both pills are oriented along -45 deg in raw SVG.
  // Rotating +45 deg aligns the capsule long axis horizontally:
  // - Colored cap (red / blue) on the LEFT (negative X)
  // - Dividing seam at x = 0
  // - White cap on the RIGHT (positive X)
  //
  // Canonical length at scale=1 is normalized to ~220px:
  // - pill2: raw length ~438px -> baseScale = 0.5018
  // - pill:  raw length ~85px  -> baseScale = 2.5928
  const baseScale = isPill2 ? 0.5018 : 2.5928;
  const totalScale = scale * baseScale;

  // Text alignment in local normalized coords:
  // pill2: cap center is at x = -110, white cap at x = +110
  // pill:  cap center is at x = -21.3, white cap at x = +21.3
  const textX = isPill2
    ? (labelPosition === "cap" ? -110 : labelPosition === "white" ? 110 : 0)
    : (labelPosition === "cap" ? -21.3 : labelPosition === "white" ? 21.3 : 0);

  const textY = isPill2 ? 11 : 2.2;
  const fontSize = isPill2 ? 34 : 6.6;
  const letterSpacing = isPill2 ? 2.5 : 0.5;

  const defaultTextColor = "#FFFFFF";
  const resolvedLabelColor = labelColor || defaultTextColor;

  return (
    <g
      id={id}
      transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${totalScale})`}
      opacity={opacity}
      style={style}
    >
      {isPill2 ? (
        // ====================================================================
        // Variant "pill2" (Red & White capsule from pill2.svg, center 256, 256)
        // ====================================================================
        <g>
          <g transform="rotate(45)">
            <g transform="translate(-256, -256)">
              {/* Blue base / right cap (changed from white for white background contrast) */}
              <path
                style={{ fill: "#3B82F6" }}
                d="M106.658,501.292c-25.639,0-49.746-9.983-67.869-28.107c-37.436-37.435-37.436-98.336,0-135.771 L337.421,38.78c18.156-18.124,42.248-28.123,67.902-28.123c25.623,0,49.746,9.999,67.869,28.123 c18.123,18.124,28.123,42.247,28.123,67.87c0,25.654-10,49.746-28.123,67.886L174.544,473.184 C156.404,491.308,132.296,501.292,106.658,501.292z"
              />
              {/* Blue cap outline / darker shading */}
              <path
                style={{ fill: "#1D4ED8" }}
                d="M480.724,31.233c-20.811-20.827-48.121-31.232-75.4-31.232c-27.311,0-54.59,10.405-75.432,31.232 l-298.65,298.65c-41.652,41.652-41.652,109.179,0,150.832c20.826,20.826,48.121,31.247,75.416,31.247s54.59-10.421,75.416-31.247 l298.65-298.635C522.377,140.428,522.377,72.886,480.724,31.233z M465.662,166.989L166.998,465.638 c-16.123,16.108-37.545,24.982-60.34,24.982s-44.215-8.874-60.338-24.982c-16.109-16.108-24.982-37.544-24.982-60.339 c0-22.796,8.873-44.216,24.982-60.324L344.984,46.31c16.123-16.108,37.529-24.982,60.34-24.982c22.779,0,44.215,8.875,60.338,24.982 c16.094,16.124,24.967,37.56,24.967,60.339C490.628,129.444,481.755,150.865,465.662,166.989z"
              />
              {/* Red body / left cap */}
              <path
                style={{ fill: "#ED5564" }}
                d="M250.945,261.012c-23.107-23.092-43.154-48.434-60.027-75.713L38.789,337.413 c-37.436,37.436-37.436,98.337,0,135.771c18.123,18.124,42.23,28.107,67.869,28.107s49.746-9.983,67.887-28.107l152.129-152.145 C299.394,304.166,274.052,284.121,250.945,261.012z"
              />
              {/* Red cap outline / darker red shadow */}
              <path
                style={{ fill: "#DA4453" }}
                d="M166.998,465.638c-16.123,16.108-37.545,24.982-60.34,24.982s-44.215-8.874-60.338-24.982 c-16.109-16.108-24.982-37.544-24.982-60.339c0-22.796,8.873-44.216,24.982-60.324l150.457-150.457 c-4-6.125-7.859-12.328-11.531-18.655l-46.168,46.185L31.226,329.899c-41.637,41.652-41.637,109.163,0.016,150.816 c20.826,20.826,48.121,31.247,75.416,31.247s54.59-10.421,75.416-31.247l154.035-154.004c-6.342-3.672-12.529-7.516-18.654-11.531 L166.998,465.638z"
              />
            </g>
          </g>

          {/* Optional Typography Imprint */}
          {label && (
            <text
              x={textX}
              y={textY}
              textAnchor="middle"
              fill={resolvedLabelColor}
              fontSize={fontSize}
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              letterSpacing={letterSpacing}
            >
              {label}
            </text>
          )}
        </g>
      ) : (
        // ====================================================================
        // Variant "pill" (Blue & White capsule from pill.svg, center 50, 50)
        // ====================================================================
        <g>
          <g transform="rotate(45)">
            <g transform="translate(-50, -50)">
              {/* White base */}
              <path
                fill="#EBECED"
                d="M92.869 7.105c9.478 9.476 9.478 24.832 0 34.308L41.411 92.869c-9.475 9.474-24.833 9.474-34.307 0-9.476-9.475-9.476-24.832 0-34.308L58.562 7.105c9.475-9.473 24.834-9.473 34.307 0z"
              />
              {/* Blue half */}
              <path
                fill="#3B97D3"
                d="M32.548 33.122L7.105 58.563c-9.476 9.476-9.476 24.833 0 34.308 9.474 9.475 24.832 9.475 34.307 0L66.85 67.43 32.548 33.122z"
              />
              {/* Darker blue seam divider */}
              <path
                fill="#2086BF"
                d="M65.43 68.862L31.134 34.568l1.414-1.414 34.294 34.294z"
              />
              {/* Blue highlight shimmer */}
              <path
                fill="#55A6DC"
                d="M38.096 41.51L12.7 66.906a5.894 5.894 0 0 0 0 8.339 5.896 5.896 0 0 0 8.339 0l25.396-25.396-8.339-8.339z"
              />
              {/* White highlight shimmer */}
              <path
                fill="#EFF0F1"
                d="M75.244 12.7a5.897 5.897 0 0 0-8.343 0L39.51 40.096l8.339 8.339 27.396-27.396a5.899 5.899 0 0 0-.001-8.339z"
              />
              {/* Accent shadow */}
              <path
                fill="#4F9ED4"
                d="M47.862 48.444l-1.414 1.414-8.335-8.336 1.414-1.414z"
              />
            </g>
          </g>

          {/* Optional Typography Imprint */}
          {label && (
            <text
              x={textX}
              y={textY}
              textAnchor="middle"
              fill={resolvedLabelColor}
              fontSize={fontSize}
              fontWeight="900"
              fontFamily="Inter, sans-serif"
              letterSpacing={letterSpacing}
            >
              {label}
            </text>
          )}
        </g>
      )}
    </g>
  );
};
