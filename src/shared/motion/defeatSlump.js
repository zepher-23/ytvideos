/**
 * Defeat & Exhaustion Slump Kinematics
 * Calculates gradual head drop, shoulder sag, spine curve, and arm droop.
 *
 * @param {number} frame - Current animation frame
 * @param {number} triggerFrame - Frame index when slump begins
 * @param {Object} [options]
 * @param {number} [options.transitionDuration=30] - Frames to reach full slump
 * @param {number} [options.headDropAngle=16] - Forward head tilt in degrees
 * @param {number} [options.shoulderSagY=12] - Downward shoulder displacement in px
 * @param {number} [options.armDroopAngle=14] - Angle arms swing inward/limp
 * @returns {Object} Calculated posture modifications
 */
export function getSlumpKinematics(frame, triggerFrame, options = {}) {
  const {
    transitionDuration = 30,
    headDropAngle = 16,
    shoulderSagY = 12,
    armDroopAngle = 14,
  } = options;

  if (frame < triggerFrame) {
    return {
      progress: 0,
      headDropAngle: 0,
      shoulderSagY: 0,
      armDroopAngle: 0,
      heavySighY: 0,
      isSlumped: false,
    };
  }

  const elapsed = frame - triggerFrame;
  const progress = Math.min(1, elapsed / transitionDuration);
  // Smooth cubic ease-in-out curve
  const easeProgress = progress * progress * (3 - 2 * progress);

  // Subtle cyclic breathing/sigh after slumping
  let heavySighY = 0;
  if (progress >= 1) {
    const sighCycle = (elapsed - transitionDuration) / 45;
    heavySighY = Math.sin(sighCycle * 2 * Math.PI) * 2;
  }

  return {
    progress: easeProgress,
    headDropAngle: headDropAngle * easeProgress,
    shoulderSagY: shoulderSagY * easeProgress + heavySighY,
    armDroopAngle: armDroopAngle * easeProgress,
    heavySighY,
    isSlumped: progress > 0.05,
  };
}
