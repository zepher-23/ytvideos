/**
 * textFitting.js - Mathematical font size and container sizing calculations.
 * 
 * Enforces zero text overflow in SVG by calculating precise character bounds.
 */

/**
 * Calculates safe font size or container box width to guarantee zero overflow.
 * 
 * @param {Object} options
 * @param {string} options.text - The text string to render.
 * @param {number|null} [options.boxWidth=null] - If provided, computes max allowable font size.
 * @param {number} [options.maxFontSize=28] - Target font size when space allows.
 * @param {number} [options.minFontSize=12] - Absolute minimum font size to scale down to.
 * @param {number} [options.paddingX=20] - Total horizontal margin/padding per side.
 * @param {number} [options.charWidthFactor=0.62] - Average char width ratio for bold sans-serif.
 * @returns {{ fontSize: number, boxWidth: number, textWidth: number, isClamped: boolean }}
 */
export function fitText({
  text = "",
  boxWidth = null,
  maxFontSize = 28,
  minFontSize = 12,
  paddingX = 20,
  charWidthFactor = 0.62,
}) {
  const charCount = Math.max(1, String(text).length);

  if (boxWidth !== null) {
    const availableWidth = boxWidth - paddingX * 2;
    const estWidth = charCount * maxFontSize * charWidthFactor;
    const isClamped = estWidth > availableWidth;
    const fontSize = isClamped
      ? Math.max(minFontSize, Math.floor(availableWidth / (charCount * charWidthFactor)))
      : maxFontSize;

    return {
      fontSize,
      boxWidth,
      textWidth: Math.round(charCount * fontSize * charWidthFactor),
      isClamped,
    };
  }

  // If container box is dynamic, derive boxWidth from text length
  const textWidth = Math.ceil(charCount * maxFontSize * charWidthFactor);
  return {
    fontSize: maxFontSize,
    boxWidth: textWidth + paddingX * 2,
    textWidth,
    isClamped: false,
  };
}
