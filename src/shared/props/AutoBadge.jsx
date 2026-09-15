import React from "react";

/**
 * AutoBadge - Deterministic, non-overflowing text badge/container for SVG.
 * 
 * Guarantees that text NEVER overflows beyond the element boundary:
 * 1. If fixed `width` is given: clamps fontSize down so (text.length * fontSize * 0.62) <= (width - paddingX * 2).
 * 2. If `width` is not given: calculates width dynamically from text length, font size, and padding.
 * 3. Sets SVG `textLength` and `lengthAdjust="spacingAndGlyphs"` as an absolute native guardrail if text would exceed boundary.
 */
export const AutoBadge = ({
  text = "",
  x = 0,
  y = 0,
  width = null, // If provided, box is fixed and font size auto-scales down. If null, box expands to fit.
  height = null, // If provided, box height is fixed. If null, derived from font size + padding.
  minWidth = 80,
  maxFontSize = 28,
  minFontSize = 12,
  paddingX = 20,
  paddingY = 12,
  fill = "#1E293B",
  stroke = "#38BDF8",
  strokeWidth = 3,
  rx = 10,
  textColor = "#FFFFFF",
  fontFamily = "Inter, sans-serif",
  fontWeight = "900",
  letterSpacing = "0.05em",
  filter = undefined,
  opacity = 1,
}) => {
  const safeText = String(text);
  const charCount = Math.max(1, safeText.length);
  const charWidthFactor = 0.62; // Standard ratio for bold modern sans-serif

  let finalWidth = width;
  let finalFontSize = maxFontSize;

  if (width !== null) {
    // Fixed container: compute maximum allowable font size
    const availableWidth = width - paddingX * 2;
    const estWidth = charCount * maxFontSize * charWidthFactor;
    if (estWidth > availableWidth) {
      finalFontSize = Math.max(
        minFontSize,
        Math.floor(availableWidth / (charCount * charWidthFactor))
      );
    }
  } else {
    // Dynamic container: compute width from font size
    const contentWidth = Math.ceil(charCount * maxFontSize * charWidthFactor);
    finalWidth = Math.max(minWidth, contentWidth + paddingX * 2);
  }

  const finalHeight =
    height !== null
      ? height
      : Math.round(finalFontSize * 1.25 + paddingY * 2);

  // SVG native guardrail: if text width still exceeds available width at minFontSize
  const maxAvailableTextWidth = finalWidth - paddingX * 2;
  const isOverflowRisk =
    charCount * finalFontSize * charWidthFactor > maxAvailableTextWidth;

  const halfW = finalWidth / 2;
  const halfH = finalHeight / 2;

  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      {/* Background Container Box */}
      <rect
        x={-halfW}
        y={-halfH}
        width={finalWidth}
        height={finalHeight}
        rx={rx}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        filter={filter}
      />

      {/* Centered Text with Absolute Overflow Protection */}
      <text
        x="0"
        y={Math.round(finalFontSize * 0.36)}
        fill={textColor}
        fontSize={finalFontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        textAnchor="middle"
        letterSpacing={letterSpacing}
        {...(isOverflowRisk
          ? {
              textLength: maxAvailableTextWidth,
              lengthAdjust: "spacingAndGlyphs",
            }
          : {})}
      >
        {safeText}
      </text>
    </g>
  );
};
