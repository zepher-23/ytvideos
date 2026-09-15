import { interpolate } from 'remotion';

/**
 * Camera Movement & Viewport Transitions
 * Pure functions for smooth multi-stage pan, zoom, and screen shake.
 */

/**
 * Calculates smooth camera 2D panning between waypoints
 * @param {number} frame - Current animation frame
 * @param {Array<{frame: number, x: number, y: number, zoom?: number}>} keyframes - Sequential camera states
 * @returns {{x: number, y: number, zoom: number}}
 */
export function getCameraTransform(frame, keyframes = []) {
  if (!keyframes || keyframes.length === 0) {
    return { x: 0, y: 0, zoom: 1 };
  }
  if (keyframes.length === 1) {
    return {
      x: keyframes[0].x || 0,
      y: keyframes[0].y || 0,
      zoom: keyframes[0].zoom || 1,
    };
  }

  const frameArray = keyframes.map((k) => k.frame);
  const xArray = keyframes.map((k) => k.x || 0);
  const yArray = keyframes.map((k) => k.y || 0);
  const zoomArray = keyframes.map((k) => (k.zoom !== undefined ? k.zoom : 1));

  const x = interpolate(frame, frameArray, xArray, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, frameArray, yArray, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zoom = interpolate(frame, frameArray, zoomArray, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return { x, y, zoom };
}

/**
 * Calculates a dynamic high-impact screen shake
 * @param {number} frame - Current frame
 * @param {number} triggerFrame - Trigger frame for impact
 * @param {Object} [options]
 * @param {number} [options.duration=15] - Total shake duration
 * @param {number} [options.intensity=12] - Max shake offset in px
 * @returns {{x: number, y: number, rotation: number}}
 */
export function getScreenShake(frame, triggerFrame, options = {}) {
  const { duration = 15, intensity = 12 } = options;

  if (frame < triggerFrame || frame > triggerFrame + duration) {
    return { x: 0, y: 0, rotation: 0 };
  }

  const progress = (frame - triggerFrame) / duration;
  const decay = 1 - progress;
  const elapsed = frame - triggerFrame;

  const x = Math.sin(elapsed * 4.2) * intensity * decay;
  const y = Math.cos(elapsed * 5.1) * intensity * 0.8 * decay;
  const rotation = Math.sin(elapsed * 3.7) * 1.5 * decay;

  return { x, y, rotation };
}
