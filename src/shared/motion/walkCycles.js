/**
 * Pure Kinematic Walk & Stride Engine
 * Calculates cyclic rotation angles and vertical bounce for bipedal characters.
 *
 * @param {number} frame - Current animation frame
 * @param {Object} [options]
 * @param {number} [options.cycleFrames=24] - Frames per complete 2-step cycle
 * @param {number} [options.strideAngle=22] - Maximum leg swing angle in degrees
 * @param {number} [options.armSwingAngle=18] - Maximum arm swing angle in degrees
 * @param {number} [options.bobAmplitude=6] - Vertical hip/body bounce in pixels
 * @param {boolean} [options.isWalking=true] - If false, returns neutral standing pose
 * @returns {Object} Calculated kinematic angles and offsets
 */
export function getWalkKinematics(frame, options = {}) {
  const {
    cycleFrames = 24,
    strideAngle = 22,
    armSwingAngle = 18,
    bobAmplitude = 6,
    isWalking = true,
  } = options;

  if (!isWalking) {
    return {
      leftLegAngle: 0,
      rightLegAngle: 0,
      leftArmAngle: 0,
      rightArmAngle: 0,
      leftKneeBend: 0,
      rightKneeBend: 0,
      bobY: 0,
      phase: 0,
    };
  }

  // Phase between 0 and 2*PI
  const phase = ((frame % cycleFrames) / cycleFrames) * 2 * Math.PI;

  // Legs swing sinusoidally in antiphase
  const leftLegAngle = Math.sin(phase) * strideAngle;
  const rightLegAngle = -leftLegAngle;

  // Arms swing in counter-motion to legs (natural bipedal balance)
  const leftArmAngle = -Math.sin(phase) * armSwingAngle;
  const rightArmAngle = -leftArmAngle;

  // Knee bends during the passing phase (when leg swings forward)
  const leftKneeBend = Math.max(0, -Math.sin(phase)) * 15;
  const rightKneeBend = Math.max(0, Math.sin(phase)) * 15;

  // Bobbing: Body drops twice per cycle (at heel strikes: 0 and PI)
  const bobY = Math.abs(Math.sin(phase)) * bobAmplitude;

  return {
    leftLegAngle,
    rightLegAngle,
    leftArmAngle,
    rightArmAngle,
    leftKneeBend,
    rightKneeBend,
    bobY,
    phase,
  };
}
