/**
 * Sudden Recoil & Shock Kinematics
 * Calculates dynamic stagger, jitter/shudder, and startled eye enlargement.
 *
 * @param {number} frame - Current animation frame
 * @param {number} triggerFrame - Frame index when shock/recoil begins
 * @param {Object} [options]
 * @param {number} [options.recoilDist=35] - Maximum backward displacement in px
 * @param {number} [options.shudderDuration=18] - Duration of high-frequency tremor
 * @param {number} [options.shudderAmp=4] - Tremor amplitude in px
 * @param {number} [options.recoverDuration=40] - Frames to return to neutral
 * @returns {Object} Calculated displacement, eye scale, and shudder offsets
 */
export function getShockKinematics(frame, triggerFrame, options = {}) {
  const {
    recoilDist = 35,
    shudderDuration = 18,
    shudderAmp = 4,
    recoverDuration = 40,
  } = options;

  if (frame < triggerFrame) {
    return {
      offsetX: 0,
      offsetY: 0,
      leanAngle: 0,
      eyeScale: 1,
      shudderX: 0,
      shudderY: 0,
      isShocked: false,
    };
  }

  const elapsed = frame - triggerFrame;

  // Sharp initial step back, then gradual settling
  const recoilProgress = Math.min(1, elapsed / 8);
  const settleProgress = Math.max(0, Math.min(1, (elapsed - 8) / recoverDuration));
  const currentRecoil = (1 - settleProgress) * recoilDist * Math.sin(recoilProgress * (Math.PI / 2));

  // High-frequency shudder immediately after trigger
  let shudderX = 0;
  let shudderY = 0;
  if (elapsed < shudderDuration) {
    const shudderDecay = 1 - elapsed / shudderDuration;
    shudderX = Math.sin(elapsed * 2.5) * shudderAmp * shudderDecay;
    shudderY = Math.cos(elapsed * 3.1) * (shudderAmp * 0.5) * shudderDecay;
  }

  // Backward lean angle that springs back
  const leanAngle = -Math.sin(Math.min(Math.PI, (elapsed / 25) * Math.PI)) * 8;

  // Eye dilation / enlargement
  const eyeScale = elapsed < 20 ? 1 + Math.sin((elapsed / 20) * Math.PI) * 0.45 : 1;

  return {
    offsetX: currentRecoil + shudderX,
    offsetY: shudderY,
    leanAngle,
    eyeScale,
    shudderX,
    shudderY,
    isShocked: true,
  };
}
