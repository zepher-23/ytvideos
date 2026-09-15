import React from "react";
import { useCurrentFrame } from "remotion";
import { JumpRope } from "./JumpRope";

export const StickMan = ({
  startX = 320,
  calendarX = 1080,
  scene2X = 2880,
  gardenX = 4800,
  scene4X = 6280,
  groundY = 815,
  scale = 1.05,
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = propFrame !== undefined ? propFrame : currentFrame;

  // =========================================================================
  // 1. TIMELINE PHASES (Total 850 frames = 28.3 seconds @ 30fps)
  // =========================================================================
  // --- SCENE 1: The Calendar Visit ---
  // Frame 0 - 10:    Idle on left
  // Frame 10 - 78:   Walk 1 across room to Calendar (constant linear velocity)
  // Frame 78 - 90:   Feet plant & settle at Calendar
  // Frame 90 - 102:  Arm raise to wave from right shoulder
  // Frame 102 - 126: Waving at Calendar
  // Frame 126 - 135: Arm lowers smoothly back to side
  //
  // --- CAMERA PAN 1 & TRANSITION TO SCENE 2 ---
  // Frame 135 - 195: Walk 2 across to Scene 2 (Camera pans from 0 to -1920px)
  // Frame 195 - 206: Feet plant & settle beside Jump Rope at x = 2880
  //
  // --- SCENE 2: Pick Up Rope & 2 Skips ---
  // Frame 206 - 216: Stoop down (knees bend, torso leans), hands reach for handles
  // Frame 216 - 228: Hands grasp handles, stand upright lifting rope
  // Frame 228 - 274: SKIP 1 (jump with tucked knees, rope clears under feet, land)
  // Frame 274 - 318: SKIP 2 (jump with tucked knees, rope clears under feet, land)
  // Frame 318 - 335: Stickman drops the rope onto the floor
  // Frame 335 - 345: Turns gaze right toward the garden
  //
  // --- SCENE 3: Walking to Garden, Butterfly Chase & Comic Disappointment ---
  // Frame 345 - 420: Walk 3 to Garden (Camera pans from -1920px to -3840px)
  // Frame 420 - 455: Settle in blooming garden, notices butterfly fluttering!
  // Frame 455 - 498: JUMP ATTEMPT 1! Leaps up reaching arms overhead to catch it
  // Frame 498 - 515: Missed! Repositions with quick steps, deep crouch
  // Frame 515 - 550: JUMP ATTEMPT 2! Bigger leap, cupping hands, near miss!
  // Frame 550 - 600: Comic disappointment (slumped shoulders, sad frown)
  //
  // --- SCENE 4: Transition into Pill Room, Ticking Clock & Swallowing Pills ---
  // Frame 600 - 675: Walk 4 into Room (Camera pans from -3840px to -5760px)
  // Frame 675 - 700: Settle on left (x = 6280), pulls out pill bottle, looks at clock
  // Frame 700 - 770: PILL SWALLOW CYCLE 1 (extracts pill, swallows/gulps, watches clock)
  // Frame 770 - 840: PILL SWALLOW CYCLE 2 (extracts pill, swallows/gulps, watches clock)
  // Frame 840 - 850: Weary tense gaze fixed on the ticking clock
  // =========================================================================

  // 1. Horizontal Position in World Space
  let currentX = startX;
  if (frame < 10) {
    currentX = startX;
  } else if (frame <= 78) {
    // Walk 1 (to Calendar)
    const p = (frame - 10) / 68;
    currentX = startX + (calendarX - startX) * p;
  } else if (frame < 135) {
    // Standing at Calendar
    currentX = calendarX;
  } else if (frame <= 195) {
    // Walk 2 (to Scene 2)
    const p = (frame - 135) / 60;
    currentX = calendarX + (scene2X - calendarX) * p;
  } else if (frame <= 345) {
    // Scene 2: Standing at Jump Rope
    currentX = scene2X;
  } else if (frame <= 420) {
    // Walk 3 (into Garden)
    const p = (frame - 345) / 75;
    currentX = scene2X + (gardenX - scene2X) * p;
  } else if (frame <= 505) {
    // In Garden (Jump 1 area)
    currentX = gardenX;
  } else if (frame <= 515) {
    // Reposition step between jumps
    const p = (frame - 505) / 10;
    currentX = gardenX + 40 * p;
  } else if (frame <= 600) {
    // Jump 2 & Disappointment stance
    currentX = gardenX + 40;
  } else if (frame <= 675) {
    // Walk 4 (from Garden into Scene 4)
    const p = (frame - 600) / 75;
    currentX = gardenX + 40 + (scene4X - (gardenX + 40)) * p;
  } else {
    // Standing on left in Scene 4
    currentX = scene4X;
  }

  // 2. Walk State & Cadence
  const isWalk1 = frame >= 10 && frame < 78;
  const isWalk2 = frame >= 135 && frame < 195;
  const isWalk3 = frame >= 345 && frame < 420;
  const isWalkStep = frame >= 505 && frame < 515;
  const isWalk4 = frame >= 600 && frame < 675;
  const isWalking = isWalk1 || isWalk2 || isWalk3 || isWalkStep || isWalk4;
  const walkIntensity = isWalking ? 1 : 0;

  let cycleProgress = 0;
  if (isWalk1) {
    cycleProgress = ((frame - 10) / 17) % 1;
  } else if (isWalk2) {
    cycleProgress = ((frame - 135) / 15) % 1;
  } else if (isWalk3) {
    cycleProgress = ((frame - 345) / 15) % 1;
  } else if (isWalkStep) {
    cycleProgress = ((frame - 505) / 10) % 1;
  } else if (isWalk4) {
    cycleProgress = ((frame - 600) / 15) % 1;
  }

  // 3. Vertical Body Pelvis Displacements (pelvisY)
  const subStep = (cycleProgress * 2) % 1;
  const walkBobY = isWalking ? -Math.cos(subStep * 2 * Math.PI) * 7.5 : 0;

  // Settle at Calendar (frames 78 - 90)
  let settle1Bob = 0;
  if (frame >= 78 && frame <= 90) {
    settle1Bob = Math.sin(((frame - 78) / 12) * Math.PI) * 4.0;
  }

  // Settle at Scene 2 (frames 195 - 206)
  let settle2Bob = 0;
  if (frame >= 195 && frame <= 206) {
    settle2Bob = Math.sin(((frame - 195) / 11) * Math.PI) * 4.0;
  }

  // Settle in Garden (frames 420 - 432)
  let settle3Bob = 0;
  if (frame >= 420 && frame <= 432) {
    settle3Bob = Math.sin(((frame - 420) / 12) * Math.PI) * 4.0;
  }

  // Settle in Scene 4 (frames 675 - 687)
  let settle4Bob = 0;
  if (frame >= 675 && frame <= 687) {
    settle4Bob = Math.sin(((frame - 675) / 12) * Math.PI) * 4.0;
  }

  // Crouch to Pick Up Rope (frames 206 - 228)
  let crouchProgress = 0;
  if (frame >= 206 && frame <= 216) {
    crouchProgress = Math.sin(((frame - 206) / 10) * (Math.PI / 2));
  } else if (frame > 216 && frame <= 228) {
    crouchProgress = 1 - (frame - 216) / 12;
  }
  const crouchY = crouchProgress * 42;

  // Idle breath when standing
  const isIdle =
    frame < 10 ||
    (frame >= 90 && frame < 135) ||
    (frame >= 195 && frame < 206) ||
    (frame >= 335 && frame < 345) ||
    (frame >= 432 && frame < 455) ||
    (frame >= 687);
  const idleBreath = isIdle ? Math.sin(frame * 0.12) * 2.0 : 0;

  const pelvisY = walkBobY + settle1Bob + settle2Bob + settle3Bob + settle4Bob + crouchY + idleBreath;

  // 4. Torso Forward Lean
  let torsoLean = walkIntensity * 4.2;
  if (crouchProgress > 0) {
    torsoLean = crouchProgress * 22;
  }

  // =========================================================================
  // 5. AIRBORNE JUMP DYNAMICS (Skips & Butterfly Catch Attempts)
  // =========================================================================
  let jumpY = 0;
  let kneeTuck = 0;
  let skipAngle = 0;

  // A) SKIP 1 (frames 228 - 274)
  if (frame >= 228 && frame < 274) {
    const t = (frame - 228) / 46;
    skipAngle = t * 2 * Math.PI;

    if (frame >= 241 && frame < 261) {
      const u = (frame - 241) / 20;
      jumpY = -Math.sin(u * Math.PI) * 65;
      kneeTuck = Math.sin(u * Math.PI) * 35;
    } else if (frame >= 261 && frame < 268) {
      jumpY = Math.sin(((frame - 261) / 7) * Math.PI) * 8;
    }
  }
  // B) SKIP 2 (frames 274 - 318)
  else if (frame >= 274 && frame < 318) {
    const t = (frame - 274) / 44;
    skipAngle = t * 2 * Math.PI;

    if (frame >= 286 && frame < 306) {
      const u = (frame - 286) / 20;
      jumpY = -Math.sin(u * Math.PI) * 65;
      kneeTuck = Math.sin(u * Math.PI) * 35;
    } else if (frame >= 306 && frame < 314) {
      jumpY = Math.sin(((frame - 306) / 8) * Math.PI) * 8;
    }
  }
  // C) BUTTERFLY JUMP ATTEMPT 1 (frames 458 - 498)
  else if (frame >= 458 && frame < 498) {
    if (frame >= 458 && frame < 466) {
      jumpY = Math.sin(((frame - 458) / 8) * Math.PI) * 8;
    } else if (frame >= 466 && frame < 488) {
      const u = (frame - 466) / 22;
      jumpY = -Math.sin(u * Math.PI) * 78;
      kneeTuck = Math.sin(u * Math.PI) * 38;
    } else if (frame >= 488 && frame < 498) {
      jumpY = Math.sin(((frame - 488) / 10) * Math.PI) * 9;
    }
  }
  // D) BUTTERFLY JUMP ATTEMPT 2 (frames 512 - 552)
  else if (frame >= 512 && frame < 552) {
    if (frame >= 512 && frame < 520) {
      jumpY = Math.sin(((frame - 512) / 8) * Math.PI) * 12;
    } else if (frame >= 520 && frame < 544) {
      const u = (frame - 520) / 24;
      jumpY = -Math.sin(u * Math.PI) * 92;
      kneeTuck = Math.sin(u * Math.PI) * 44;
    } else if (frame >= 544 && frame < 552) {
      jumpY = Math.sin(((frame - 544) / 8) * Math.PI) * 10;
    }
  }

  // =========================================================================
  // 6. 2-BONE LEGS (Inverse Kinematics & Jump Tucking)
  // Legs are permanently anchored to pelvis (hipBaseY + pelvisY)
  // =========================================================================
  const L1 = 78;
  const L2 = 78;
  const maxReach = L1 + L2 - 0.5;
  const hipBaseY = 356;
  const currentHipY = hipBaseY + pelvisY;
  const strideDistance = isWalk1 ? 47.5 : (isWalk2 || isWalk3 || isWalk4) ? 51.0 : isWalkStep ? 30.0 : 0;

  const computeLegIK = (phaseOffset, isNearLeg) => {
    const standHipX = isNearLeg ? 138 : 102;
    const standFootX = isNearLeg ? 140 : 100;

    // A) JUMPING / AIRBORNE STATE (Knees tucked forward/up)
    if (kneeTuck > 1) {
      const tuckFactor = kneeTuck / 38;
      const kneeX = standHipX + 16 * tuckFactor;
      const kneeY = currentHipY + 68 - 14 * tuckFactor;
      const footX = standHipX + (isNearLeg ? 8 : -8) * tuckFactor;
      const footY = currentHipY + 124 - 28 * tuckFactor;
      return {
        hip: { x: standHipX, y: currentHipY },
        knee: { x: kneeX, y: kneeY },
        foot: { x: footX, y: footY },
        toe: { x: isNearLeg ? footX + 22 : footX - 22, y: footY + 4 },
      };
    }

    // B) CROUCH STATE (Feet locked on ground at 512, knees bend forward)
    if (crouchProgress > 0.05) {
      const kneeX = standHipX + 26 * crouchProgress;
      const kneeY = (currentHipY + 512) / 2 + 10 * crouchProgress;
      return {
        hip: { x: standHipX, y: currentHipY },
        knee: { x: kneeX, y: kneeY },
        foot: { x: standFootX, y: 512 },
        toe: { x: isNearLeg ? standFootX + 26 : standFootX - 26, y: 512 },
      };
    }

    // C) STANDING / IDLE STATE
    if (walkIntensity <= 0.01) {
      return {
        hip: { x: standHipX, y: currentHipY },
        knee: { x: standHipX + 3, y: currentHipY + 78 },
        foot: { x: standFootX, y: 512 },
        toe: { x: isNearLeg ? standFootX + 26 : standFootX - 26, y: 512 },
      };
    }

    // D) ACTIVE WALKING (IK solver)
    const p = (cycleProgress + phaseOffset) % 1;
    const walkHipX = 120 + (isNearLeg ? 5 : -5);

    let footRelX = 0;
    let footY = 512;
    let heelAngle = 0;

    if (p < 0.5) {
      const u = p / 0.5;
      footRelX = strideDistance * (1 - 2 * u);
      footY = 512;
      if (u < 0.2) heelAngle = 18 * (1 - u / 0.2);
      else if (u > 0.65) heelAngle = -32 * ((u - 0.65) / 0.35);
    } else {
      const u = (p - 0.5) / 0.5;
      footRelX = -strideDistance + 2 * strideDistance * (u * u * (3 - 2 * u));
      footY = 512 - Math.sin(u * Math.PI) * 28;
      if (u < 0.35) heelAngle = -32 * (1 - u / 0.35);
      else if (u > 0.68) heelAngle = 18 * ((u - 0.68) / 0.32);
    }

    const footX = walkHipX + footRelX;
    const dx = footX - standHipX;
    const dy = footY - currentHipY;
    const dist = Math.max(10, Math.min(Math.hypot(dx, dy), maxReach));
    const alpha = Math.atan2(dy, dx);
    const cosBeta = Math.max(-1, Math.min(1, (L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist)));
    const beta = Math.acos(cosBeta);

    const kneeAngle = alpha - beta;
    const kneeX = standHipX + L1 * Math.cos(kneeAngle);
    const kneeY = currentHipY + L1 * Math.sin(kneeAngle);

    const radAngle = (heelAngle * Math.PI) / 180;
    const toeX = footX + 26 * Math.cos(radAngle);
    const toeY = footY - 26 * Math.sin(radAngle);

    return {
      hip: { x: standHipX, y: currentHipY },
      knee: { x: kneeX, y: kneeY },
      foot: { x: footX, y: footY },
      toe: { x: toeX, y: toeY },
    };
  };

  const nearLeg = computeLegIK(0, true);
  const farLeg = computeLegIK(0.5, false);

  // =========================================================================
  // 7. TORSO AND SHOULDER COORDINATES
  // =========================================================================
  const topL = (1 - walkIntensity) * 86 + walkIntensity * 95;
  const topR = (1 - walkIntensity) * 154 + walkIntensity * 145;
  const botL = (1 - walkIntensity) * 76 + walkIntensity * 88;
  const botR = (1 - walkIntensity) * 164 + walkIntensity * 152;

  // Disappointment Slouching (frames 550 - 600)
  const isScene3Sad = frame >= 550 && frame < 600;
  const sadT = isScene3Sad ? Math.min(1, (frame - 550) / 20) : 0;
  const smoothSad = sadT * sadT * (3 - 2 * sadT);
  const shoulderY = 160 + smoothSad * 10;

  // Arm swings during walk
  const armCyclePhase = cycleProgress * 2 * Math.PI;
  const walkArmSwing = Math.sin(armCyclePhase) * 28 * walkIntensity;

  // =========================================================================
  // 8. ARMS, PILL BOTTLE & SWALLOWING CONTROLLER
  // =========================================================================
  let waveRaise = 0;
  if (frame >= 90 && frame <= 102) {
    waveRaise = (frame - 90) / 12;
  } else if (frame > 102 && frame <= 126) {
    waveRaise = 1;
  } else if (frame > 126 && frame <= 135) {
    waveRaise = 1 - (frame - 126) / 9;
  }
  const waveTime = Math.max(0, frame - 102) * 0.38;
  const forearmWaveAngle = -Math.PI / 4 + Math.sin(waveTime) * 0.40;
  const wristLagAngle = -Math.cos(waveTime) * 0.30;

  // Default Resting Arm geometry
  const leftShoulder = { x: topL, y: shoulderY };
  const rightShoulder = { x: topR, y: shoulderY };

  let leftElbow = { x: topL - 10, y: 250 };
  let leftWrist = { x: topL - 22, y: 348 };
  let rightElbow = { x: topR + 10, y: 250 };
  let rightWrist = { x: topR + 22, y: 348 };
  let leftHandAngle = -20;
  let rightHandAngle = 20;

  let headTilt = 0;
  let holdingPill = false;
  let throatGulp = 0;

  // A) WAVING AT CALENDAR (frames 90 - 135)
  if (waveRaise > 0.01) {
    const raisedElbow = { x: topR + 38, y: 112 };
    const raisedWrist = {
      x: raisedElbow.x + 65 * Math.cos(forearmWaveAngle),
      y: raisedElbow.y + 65 * Math.sin(forearmWaveAngle),
    };
    rightElbow = {
      x: (1 - waveRaise) * (topR + 10) + waveRaise * raisedElbow.x,
      y: (1 - waveRaise) * 250 + waveRaise * raisedElbow.y,
    };
    rightWrist = {
      x: (1 - waveRaise) * (topR + 22) + waveRaise * raisedWrist.x,
      y: (1 - waveRaise) * 348 + waveRaise * raisedWrist.y,
    };
    rightHandAngle = (1 - waveRaise) * 20 + waveRaise * ((forearmWaveAngle + wristLagAngle) * (180 / Math.PI) + 90);
    headTilt = waveRaise * 5 + Math.sin(waveTime) * 2.5;
  }
  // B) CROUCHING & PICKING UP JUMP ROPE (frames 206 - 228)
  else if (frame >= 206 && frame <= 216) {
    leftElbow = {
      x: (1 - crouchProgress) * (topL - 10) + crouchProgress * 55,
      y: (1 - crouchProgress) * 250 + crouchProgress * 360,
    };
    leftWrist = {
      x: (1 - crouchProgress) * (topL - 22) + crouchProgress * 65,
      y: (1 - crouchProgress) * 348 + crouchProgress * 470,
    };
    rightElbow = {
      x: (1 - crouchProgress) * (topR + 10) + crouchProgress * 185,
      y: (1 - crouchProgress) * 250 + crouchProgress * 360,
    };
    rightWrist = {
      x: (1 - crouchProgress) * (topR + 22) + crouchProgress * 175,
      y: (1 - crouchProgress) * 348 + crouchProgress * 470,
    };
  } else if (frame > 216 && frame <= 228) {
    const liftProgress = (frame - 216) / 12;
    leftElbow = {
      x: (1 - liftProgress) * 55 + liftProgress * 50,
      y: (1 - liftProgress) * 360 + liftProgress * 236,
    };
    leftWrist = {
      x: (1 - liftProgress) * 65 + liftProgress * 70,
      y: (1 - liftProgress) * 470 + liftProgress * 310,
    };
    rightElbow = {
      x: (1 - liftProgress) * 185 + liftProgress * 190,
      y: (1 - liftProgress) * 360 + liftProgress * 236,
    };
    rightWrist = {
      x: (1 - liftProgress) * 175 + liftProgress * 170,
      y: (1 - liftProgress) * 470 + liftProgress * 310,
    };
  }
  // C) HOLDING & SKIPPING JUMP ROPE (frames 228 - 318)
  else if (frame > 228 && frame < 318) {
    const isSkipping = frame < 318;
    const armPumpY = isSkipping ? Math.sin(skipAngle) * 8 : 0;
    const armPumpX = isSkipping ? Math.cos(skipAngle) * 6 : 0;

    leftElbow = { x: 50 + armPumpX * 0.5, y: 236 + armPumpY * 0.5 };
    leftWrist = { x: 70 + armPumpX, y: 310 + armPumpY };

    rightElbow = { x: 190 - armPumpX * 0.5, y: 236 + armPumpY * 0.5 };
    rightWrist = { x: 170 - armPumpX, y: 310 + armPumpY };

    leftHandAngle = -45;
    rightHandAngle = 45;
  }
  // D) DROPPING ROPE (frames 318 - 345)
  else if (frame >= 318 && frame < 345) {
    const t = Math.min(1, (frame - 318) / 16);
    leftElbow = { x: (1 - t) * 50 + t * (topL - 10), y: (1 - t) * 236 + t * 250 };
    leftWrist = { x: (1 - t) * 70 + t * (topL - 22), y: (1 - t) * 310 + t * 348 };

    rightElbow = { x: (1 - t) * 190 + t * (topR + 10), y: (1 - t) * 236 + t * 250 };
    rightWrist = { x: (1 - t) * 170 + t * (topR + 22), y: (1 - t) * 310 + t * 348 };
  }
  // E) BUTTERFLY JUMP ATTEMPT 1 (frames 460 - 500)
  else if (frame >= 460 && frame < 500) {
    const reachT = (frame >= 466 && frame < 488) ? Math.sin(((frame - 466) / 22) * Math.PI) : 0;
    leftElbow = { x: topL - 6, y: 230 - reachT * 100 };
    leftWrist = { x: topL - 2, y: 330 - reachT * 230 };

    rightElbow = { x: topR + 16, y: 220 - reachT * 110 };
    rightWrist = { x: topR + 24, y: 320 - reachT * 240 };

    leftHandAngle = -60 * reachT;
    rightHandAngle = 60 * reachT;
    headTilt = -14;
  }
  // F) BUTTERFLY JUMP ATTEMPT 2 (frames 512 - 550)
  else if (frame >= 512 && frame < 550) {
    const reachT = (frame >= 520 && frame < 544) ? Math.sin(((frame - 520) / 24) * Math.PI) : 0;
    leftElbow = { x: topL + 4, y: 210 - reachT * 115 };
    leftWrist = { x: topL + 14, y: 310 - reachT * 260 };

    rightElbow = { x: topR + 18, y: 200 - reachT * 120 };
    rightWrist = { x: topR + 28, y: 300 - reachT * 265 };

    leftHandAngle = -75 * reachT;
    rightHandAngle = 75 * reachT;
    headTilt = -16;
  }
  // G) COMIC DISAPPOINTMENT (frames 550 - 600)
  else if (frame >= 550 && frame < 600) {
    leftElbow = { x: topL - 2, y: 255 + smoothSad * 12 };
    leftWrist = { x: topL - 4, y: 350 + smoothSad * 18 };

    rightElbow = { x: topR + 2, y: 255 + smoothSad * 12 };
    rightWrist = { x: topR + 4, y: 350 + smoothSad * 18 };

    leftHandAngle = 10 * smoothSad;
    rightHandAngle = -10 * smoothSad;
    headTilt = smoothSad * 15;
  }
  // H) SCENE 4: HOLDING PILL BOTTLE & SWALLOWING PILLS (frames 675 to 850)
  else if (frame >= 675) {
    // Left hand firmly holds the pill bottle at waist level
    leftElbow = { x: topL - 18, y: 236 };
    leftWrist = { x: topL - 26, y: 305 };
    leftHandAngle = -15;

    // Right arm executes pill taking and swallowing cycles:
    // Cycle 1: frames 700 to 770
    // Cycle 2: frames 770 to 840
    let cycleSub = -1;
    if (frame >= 700 && frame < 770) {
      cycleSub = frame - 700;
    } else if (frame >= 770 && frame < 840) {
      cycleSub = frame - 770;
    }

    if (cycleSub >= 0) {
      if (cycleSub < 16) {
        // Step 1: Reach hand over to bottle opening
        const t = cycleSub / 16;
        rightElbow = { x: (1 - t) * (topR + 10) + t * (topL + 12), y: (1 - t) * 250 + t * 240 };
        rightWrist = { x: (1 - t) * (topR + 22) + t * (topL - 8), y: (1 - t) * 348 + t * 295 };
        headTilt = -4;
      } else if (cycleSub < 34) {
        // Step 2: Grasp pill and raise to mouth
        const t = (cycleSub - 16) / 18;
        rightElbow = { x: (1 - t) * (topL + 12) + t * 148, y: (1 - t) * 240 + t * 170 };
        rightWrist = { x: (1 - t) * (topL - 8) + t * 128, y: (1 - t) * 295 + t * 118 };
        headTilt = -t * 12;
        holdingPill = true;
      } else if (cycleSub < 52) {
        // Step 3: Pop pill into mouth, tilt back, swallow/gulp!
        const t = (cycleSub - 34) / 18;
        headTilt = -12 - Math.sin(t * Math.PI) * 7;
        rightElbow = { x: (1 - t) * 148 + t * (topR + 14), y: (1 - t) * 170 + t * 245 };
        rightWrist = { x: (1 - t) * 128 + t * (topR + 18), y: (1 - t) * 118 + t * 310 };
        throatGulp = Math.sin(t * Math.PI) * 6;
      } else {
        // Step 4: Level head, watch ticking clock anxiously
        const t = (cycleSub - 52) / 18;
        headTilt = (1 - t) * -12 + t * -4;
        rightElbow = { x: (1 - t) * (topR + 14) + t * (topR + 10), y: (1 - t) * 245 + t * 250 };
        rightWrist = { x: (1 - t) * (topR + 18) + t * (topR + 22), y: (1 - t) * 310 + t * 348 };
      }
    } else {
      // Waiting/watching clock
      rightElbow = { x: topR + 10, y: 250 };
      rightWrist = { x: topR + 22, y: 348 };
      headTilt = -4;
    }
  }
  // I) ACTIVE WALKING ARM SWINGS
  else if (isWalking) {
    leftElbow = { x: topL - 8 - Math.sin(-armCyclePhase) * 16, y: 245 };
    leftWrist = { x: topL - 14 - walkArmSwing * 0.8, y: 340 };

    rightElbow = { x: topR + 8 + Math.sin(armCyclePhase) * 16, y: 245 };
    rightWrist = { x: topR + 14 + walkArmSwing * 0.8, y: 340 };
  }

  // Eye blinks & look direction
  const isBlinking =
    (frame >= 35 && frame <= 39) ||
    (frame >= 118 && frame <= 122) ||
    (frame >= 170 && frame <= 174) ||
    (frame >= 265 && frame <= 269) ||
    (frame >= 380 && frame <= 384) ||
    (frame >= 580 && frame <= 584) ||
    (frame >= 730 && frame <= 734) ||
    (frame >= 800 && frame <= 804);

  const eyeScaleY = isBlinking ? 0.1 : (isScene3Sad ? 1 - smoothSad * 0.35 : frame >= 675 ? 0.85 : 1);
  const pupilOffsetX = frame >= 675 ? 3.5 : 0; // glances right at ticking clock

  // Jump Rope Phase
  const ropePhase =
    frame < 216
      ? "floor"
      : frame <= 228
      ? "pickup"
      : frame < 318
      ? "skipping"
      : frame <= 335
      ? "dropping"
      : "floor";

  const dropProgress = Math.min(1, Math.max(0, (frame - 318) / 17));
  const dropT = dropProgress * dropProgress;
  const droppingLeftHand = {
    x: (1 - dropProgress) * 70 + dropProgress * 65,
    y: (1 - dropT) * 310 + dropT * 506,
  };
  const droppingRightHand = {
    x: (1 - dropProgress) * 170 + dropProgress * 175,
    y: (1 - dropT) * 310 + dropT * 506,
  };

  // Mouth Path:
  // Scene 1 & 2: Happy smile M 98 108 Q 118 125 138 108
  // Scene 3 Disappointment: Sad downturned frown M 104 116 Q 118 102 132 116
  // Scene 4: Anxious flat mouth M 106 112 L 132 112
  let mouthPath;
  if (frame >= 675) {
    mouthPath = throatGulp > 1 ? "M 112 114 Q 120 120 128 114" : "M 106 112 L 132 112";
  } else if (isScene3Sad) {
    const mx1 = (1 - smoothSad) * 98 + smoothSad * 104;
    const my1 = (1 - smoothSad) * 108 + smoothSad * 116;
    const mcy = (1 - smoothSad) * 125 + smoothSad * 102;
    const mx2 = (1 - smoothSad) * 138 + smoothSad * 132;
    const my2 = (1 - smoothSad) * 108 + smoothSad * 116;
    mouthPath = `M ${mx1.toFixed(1)} ${my1.toFixed(1)} Q 118 ${mcy.toFixed(1)} ${mx2.toFixed(1)} ${my2.toFixed(1)}`;
  } else {
    mouthPath = "M 98 108 Q 118 125 138 108";
  }

  return (
    <g id="stickman-and-rope-world">
      {/* ============================================================== */}
      {/* 1. JUMP ROPE ON FLOOR AT SCENE 2 (Unmounts in Scene 3 & 4)     */}
      {/* ============================================================== */}
      {((frame < 216) || (frame >= 335 && frame < 420)) && (
        <g
          id="resting-jump-rope-container"
          transform={`translate(${scene2X}, ${groundY - 512 * scale}) scale(${scale})`}
        >
          <JumpRope ropePhase="floor" />
        </g>
      )}

      {/* ============================================================== */}
      {/* 2. JUMP ROPE FALLING TO FLOOR (Frames 318 to 335)              */}
      {/* ============================================================== */}
      {frame >= 318 && frame < 335 && (
        <g
          id="dropping-jump-rope-container"
          transform={`translate(${scene2X}, ${groundY - 512 * scale}) scale(${scale})`}
        >
          <JumpRope
            ropePhase="dropping"
            leftHand={droppingLeftHand}
            rightHand={droppingRightHand}
          />
        </g>
      )}

      {/* ============================================================== */}
      {/* 3. STICKMAN CHARACTER CONTAINER                                */}
      {/* ============================================================== */}
      <g
        id="stickman-character"
        transform={`translate(${currentX}, ${groundY - 512 * scale + jumpY * scale}) scale(${scale})`}
      >
        {/* Floor Shadow: cy={512 - jumpY} counteracts jumpY to stay pinned to floor */}
        <ellipse
          cx={120}
          cy={512 - jumpY}
          rx={Math.max(18, 52 + walkIntensity * 14 - kneeTuck * 0.7)}
          ry={Math.max(3, 8 - kneeTuck * 0.12)}
          fill="#000000"
          opacity={Math.max(0.06, 0.22 - (kneeTuck / 38) * 0.14)}
        />

        {/* BEHIND PASS of Jump Rope */}
        {frame >= 216 && frame < 318 && (
          <JumpRope
            ropePhase={ropePhase}
            skipAngle={skipAngle}
            leftHand={leftWrist}
            rightHand={rightWrist}
            isBehind={true}
          />
        )}

        {/* --- FAR LEG (Left leg) --- */}
        <g>
          <path
            d={`M ${farLeg.hip.x} ${farLeg.hip.y} L ${farLeg.knee.x} ${farLeg.knee.y} L ${farLeg.foot.x} ${farLeg.foot.y}`}
            fill="none"
            stroke="#000000"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <line
            x1={farLeg.foot.x}
            y1={farLeg.foot.y}
            x2={farLeg.toe.x}
            y2={farLeg.toe.y}
            stroke="#000000"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* --- NEAR LEG (Right leg) --- */}
        <g>
          <path
            d={`M ${nearLeg.hip.x} ${nearLeg.hip.y} L ${nearLeg.knee.x} ${nearLeg.knee.y} L ${nearLeg.foot.x} ${nearLeg.foot.y}`}
            fill="none"
            stroke="#000000"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1={nearLeg.foot.x}
            y1={nearLeg.foot.y}
            x2={nearLeg.toe.x}
            y2={nearLeg.toe.y}
            stroke="#000000"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
        </g>

        {/* --- UPPER BODY (Torso, Head, and Arms) --- */}
        <g transform={`translate(0, ${pelvisY}) rotate(${torsoLean} 120 356)`}>
          {/* A) FAR ARM (Left arm - Holds Pill Bottle in Scene 4) */}
          <g>
            <path
              d={`M ${leftShoulder.x} ${leftShoulder.y} L ${leftElbow.x} ${leftElbow.y} L ${leftWrist.x} ${leftWrist.y}`}
              fill="none"
              stroke="#000000"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={leftWrist.x} cy={leftWrist.y} r="9" fill="#000000" />
            <ellipse
              cx={leftWrist.x - 6}
              cy={leftWrist.y - 4}
              rx="4"
              ry="6"
              transform={`rotate(${leftHandAngle} ${leftWrist.x - 6} ${leftWrist.y - 4})`}
              fill="#000000"
            />

            {/* Amber Pill Bottle in Left Hand in Scene 4 (frame >= 675) */}
            {frame >= 675 && (
              <g transform={`translate(${leftWrist.x}, ${leftWrist.y})`}>
                <rect
                  x="-10"
                  y="-6"
                  width="20"
                  height="34"
                  rx="4"
                  fill="#D97706"
                  stroke="#000000"
                  strokeWidth="3.5"
                />
                <rect
                  x="-9"
                  y="2"
                  width="18"
                  height="18"
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1.5"
                />
                <line x1="-6" y1="7" x2="6" y2="7" stroke="#2563EB" strokeWidth="1.5" />
                <line x1="-6" y1="11" x2="4" y2="11" stroke="#000000" strokeWidth="1.5" />
                <line x1="-6" y1="15" x2="5" y2="15" stroke="#000000" strokeWidth="1.5" />
                <rect
                  x="-12"
                  y="-14"
                  width="24"
                  height="8"
                  rx="2"
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="3"
                />
              </g>
            )}
          </g>

          {/* B) TORSO */}
          <path
            d={`M ${topL} ${shoulderY} L ${botL} 352 Q ${botL} 358 ${botL + 6} 358 L ${botR - 6} 358 Q ${botR} 358 ${botR} 352 L ${topR} ${shoulderY} Z`}
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="7.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* C) HEAD & FACE */}
          <g transform={`rotate(${headTilt} 120 92)`}>
            <circle
              cx="120"
              cy="92"
              r="68"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="7.5"
            />

            {/* Eyes */}
            <ellipse
              cx={100 + pupilOffsetX}
              cy="84"
              rx="5.5"
              ry={7.5 * eyeScaleY}
              fill="#000000"
            />
            <ellipse
              cx={138 + pupilOffsetX}
              cy="84"
              rx="5.5"
              ry={7.5 * eyeScaleY}
              fill="#000000"
            />

            {/* Sad Comic Eyebrows in Scene 3 Disappointment */}
            {isScene3Sad && smoothSad > 0.05 && (
              <g opacity={smoothSad}>
                <line x1="92" y1="68" x2="108" y2="74" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
                <line x1="148" y1="68" x2="132" y2="74" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
                <path d="M 152 76 C 147 84 143 92 151 94 C 159 92 155 84 152 76 Z" fill="#38BDF8" stroke="#000000" strokeWidth="2.5" />
              </g>
            )}

            {/* Anxious Brow Furrows in Scene 4 Watching Clock */}
            {frame >= 675 && (
              <g stroke="#000000" strokeWidth="2.5" strokeLinecap="round">
                <line x1="94" y1="70" x2="108" y2="72" />
                <line x1="134" y1="72" x2="148" y2="70" />
                <line x1="117" y1="68" x2="123" y2="68" />
              </g>
            )}

            {/* Mouth */}
            <path
              d={mouthPath}
              fill="none"
              stroke="#000000"
              strokeWidth="6.5"
              strokeLinecap="round"
            />

            {/* Swallowing Gulp Throat Bulge */}
            {throatGulp > 1 && (
              <ellipse
                cx="120"
                cy="154"
                rx={9 + throatGulp}
                ry="5"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="3.5"
              />
            )}
          </g>

          {/* D) NEAR ARM (Right arm - takes pill to mouth in Scene 4) */}
          <g>
            <path
              d={`M ${rightShoulder.x} ${rightShoulder.y} L ${rightElbow.x} ${rightElbow.y} L ${rightWrist.x} ${rightWrist.y}`}
              fill="none"
              stroke="#000000"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={rightWrist.x} cy={rightWrist.y} r="9.5" fill="#000000" />
            <ellipse
              cx={rightWrist.x + 6}
              cy={rightWrist.y - 4}
              rx="4"
              ry="6"
              transform={`rotate(${rightHandAngle} ${rightWrist.x + 6} ${rightWrist.y - 4})`}
              fill="#000000"
            />

            {/* White Pill held in Right Hand */}
            {holdingPill && (
              <ellipse
                cx={rightWrist.x - 4}
                cy={rightWrist.y - 4}
                rx="4.5"
                ry="3"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
              />
            )}
          </g>
        </g>

        {/* FRONT PASS of Jump Rope */}
        {frame >= 216 && frame < 318 && (
          <JumpRope
            ropePhase={ropePhase}
            skipAngle={skipAngle}
            leftHand={leftWrist}
            rightHand={rightWrist}
            isBehind={false}
          />
        )}
      </g>
    </g>
  );
};
