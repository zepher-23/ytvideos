/**
 * Fluid Dynamics & Leaks Physics Calculations
 * Pure mathematical functions for water level changes, surface ripples, and projectile spray arcs.
 */

/**
 * Calculates sinusoidal surface wave ripple offset
 * @param {number} frame - Current animation frame
 * @param {number} [speed=0.08] - Temporal frequency
 * @param {number} [amplitude=3.5] - Wave height in px
 * @returns {number} Vertical wave displacement
 */
export function getSurfaceRipple(frame, speed = 0.08, amplitude = 3.5) {
  return Math.sin(frame * speed) * amplitude;
}

/**
 * Generates an SVG path data string for an oscillating fluid surface
 * @param {number} width - Total container width
 * @param {number} baseY - Baseline Y level
 * @param {number} frame - Current frame
 * @param {number} [waveCount=2] - Number of sinusoidal crests
 * @param {number} [amplitude=3] - Crest amplitude
 * @returns {string} SVG curve segment or polyline points
 */
export function getFluidSurfacePath(width, baseY, frame, waveCount = 2, amplitude = 3) {
  const steps = 12;
  const dx = width / steps;
  let d = `M 0 ${baseY}`;

  for (let i = 1; i <= steps; i++) {
    const x = i * dx;
    const progress = i / steps;
    const yOffset = Math.sin(progress * waveCount * Math.PI * 2 + frame * 0.1) * amplitude;
    d += ` L ${x.toFixed(1)} ${(baseY + yOffset).toFixed(1)}`;
  }

  return d;
}

/**
 * Calculates a parabolic arc for pressurized liquid leaking from a vessel crack
 * @param {number} t - Time parameter (0 to 1) along the arc
 * @param {number} startX - Origin X
 * @param {number} startY - Origin Y
 * @param {number} vx - Initial horizontal velocity
 * @param {number} vy - Initial vertical velocity
 * @param {number} [gravity=980] - Downward gravitational acceleration
 * @returns {{x: number, y: number}} Current stream coordinate
 */
export function getLeakArcPoint(t, startX, startY, vx, vy, gravity = 980) {
  const x = startX + vx * t;
  const y = startY + vy * t + 0.5 * gravity * t * t;
  return { x, y };
}
