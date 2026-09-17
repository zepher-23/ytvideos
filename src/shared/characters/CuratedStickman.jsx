import React from "react";

/**
 * CuratedStickman - The Canonical Stickman Character Model for Everything-Curated
 * 
 * 100% faithful to the reference image and Scenes 1-4 (StickMan.jsx):
 * 1. Head: Pure white circle, strokeWidth 7.5, solid black oval eyes (rx=5.5, ry=7.5), clean comic mouth.
 * 2. Torso: White-filled tapered tunic/capsule body with rounded bottom corners (NO single-line spine).
 * 3. Limbs: Black stroke lines (7.5px) with clean stick feet (NO colored sneakers or dress shoes).
 * 4. Hands: Solid black circular mitten hands (r=9) with black thumb ellipse.
 * 
 * Supports:
 * - variant: "adult" (default) | "teen" | "child"
 * - isBust: boolean (renders canonical head & upper tunic shoulders for bust scenes)
 * - pose: "idle" | "content" | "shock" | "defeat"
 * - custom kinematics: recoilX, recoilY, slumpProgress, eyes, mouth, etc.
 */
export const CuratedStickman = ({
  x = 0,
  y = 815,
  scale = 1.05,
  variant = "adult", // "adult" | "teen" | "child"
  isBust = false,
  pose = "idle",
  frame = 0,
  // Kinematic parameters
  recoilX = 0,
  recoilY = 0,
  slumpProgress = 0, // 0 to 1
  lookDirection = "center", // "center" | "right" | "left" | "down"
  mouth = "smile", // "smile" | "frown" | "shock" | "neutral" | "flat"
  eyes = "normal", // "normal" | "shock" | "defeat" | "look-right" | "look-left"
  showExclamation = false,
  showSweat = false,
  reachProgress = 0, // 0 to 1, extends arm forward
  reachDirection = "left", // "left" | "right"
  showTear = false,
  tearY = 0,
  tearOpacity = 0,
  showSigh = false,
  sighFrame = 0,
  showBrainXRay = false,
  brainGlowColor = "#EF4444",
  armLeft = null,
  armRight = null,
}) => {
  // =========================================================================
  // 1. BUST MODE (Used in Scene 8: Anhedonia)
  // =========================================================================
  if (isBust) {
    const bustScale = scale * 0.85;
    return (
      <g
        id="canonical-stickman-bust"
        transform={`translate(${x}, ${y}) scale(${bustScale})`}
      >
        {/* Soft bust drop shadow */}
        <ellipse cx="0" cy="80" rx="72" ry="12" fill="#000000" opacity="0.22" />

        {/* Upper White Tunic Chest / Torso */}
        <path
          d="M -34 0 L 34 0 L 46 76 Q 46 82 38 82 L -38 82 Q -46 82 -46 76 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="7.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Upper arms extending at sides */}
        <line x1="-34" y1="4" x2="-54" y2="76" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
        <line x1="34" y1="4" x2="54" y2="76" stroke="#000000" strokeWidth="7" strokeLinecap="round" />

        {/* Canonical Head */}
        <circle cx="0" cy="-68" r="68" fill="#FFFFFF" stroke="#000000" strokeWidth="7.5" />

        {/* Eyes: calm, quiet, slightly melancholic */}
        <ellipse cx="-18" cy="-76" rx="5.5" ry="7.5" fill="#000000" />
        <ellipse cx="18" cy="-76" rx="5.5" ry="7.5" fill="#000000" />

        {/* Mouth: slightly downcast or calm neutral line */}
        {mouth === "frown" ? (
          <path d="M -16 -48 Q 0 -58 16 -48" fill="none" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
        ) : mouth === "smile" ? (
          <path d="M -16 -52 Q 0 -38 16 -52" fill="none" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
        ) : (
          <line x1="-14" y1="-50" x2="14" y2="-50" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
        )}
      </g>
    );
  }

  // =========================================================================
  // 2. VARIANT GEOMETRY CONFIGURATION
  // =========================================================================
  let headR = 68;
  let topW = 34; // half-width at shoulder
  let botW = 44; // half-width at hip
  let torsoH = 196;
  let legH = 156;
  let handR = 9;
  let eyeRx = 5.5;
  let eyeRy = 7.5;
  let strokeW = 7.5;

  if (variant === "child") {
    headR = 52;
    topW = 24;
    botW = 31;
    torsoH = 120;
    legH = 95;
    handR = 7;
    eyeRx = 4.8;
    eyeRy = 6.5;
    strokeW = 6.5;
  } else if (variant === "teen") {
    headR = 60;
    topW = 29;
    botW = 38;
    torsoH = 175;
    legH = 150;
    handR = 8.5;
    eyeRx = 5.2;
    eyeRy = 7.0;
    strokeW = 7.0;
  }

  const hipY = -legH;
  const shoulderY = hipY - torsoH;
  const headCenterY = shoulderY - headR + 8; // head rests directly on top of torso

  // =========================================================================
  // 3. EMOTIONAL / KINEMATIC DYNAMICS
  // =========================================================================
  const isCrazy = pose === "crazy";
  const isShock = pose === "shock" || isCrazy;
  const isContent = pose === "content" && !isShock;
  const isThinking = (pose === "thinking" || pose === "ponder") && !isShock;
  const isAbnormal = (pose === "abnormal" || pose === "contorted" || pose === "malfunction") && !isShock;
  const isDragging = (pose === "dragging" || pose === "drag" || pose === "pulling") && !isShock;
  const isDefeat = (pose === "defeat" || slumpProgress > 0) && !isShock && !isContent && !isAbnormal && !isThinking && !isDragging;
  const isReaching = (pose === "reaching" || reachProgress > 0) && !isShock && !isDefeat && !isContent && !isAbnormal && !isThinking && !isDragging;
  const isIdle = !isShock && !isDefeat && !isContent && !isReaching && !isAbnormal && !isThinking && !isDragging && !armLeft && !armRight;

  const easeSlump = slumpProgress * slumpProgress * (3 - 2 * slumpProgress);
  const leanReachX = isReaching ? (reachDirection === "left" ? -18 * reachProgress : 18 * reachProgress) : 0;

  // Strained dragging walk cycle bounce
  const dragCycle = ((frame % 36) / 36) * 2 * Math.PI;
  const dragBobY = isDragging ? Math.abs(Math.sin(dragCycle)) * 6 : 0;

  // Slump & lean offsets
  const slumpTorsoY = isAbnormal ? shoulderY + 22 : shoulderY + 36 * easeSlump;
  const slumpTorsoX = isAbnormal ? -16 : 24 * easeSlump + leanReachX;
  const torsoTopX = isShock ? -20 : isThinking ? 6 : isDragging ? 32 : slumpTorsoX;
  const torsoBottomX = isShock ? -6 : isAbnormal ? 14 : isDragging ? -10 : 0;

  // Head offsets
  const curHeadX = isShock ? -26 : isAbnormal ? -22 : isThinking ? 10 : isDragging ? 38 : 28 * easeSlump + leanReachX * 1.25;
  const curHeadY = isShock ? headCenterY - 6 : isAbnormal ? headCenterY + 18 : isThinking ? headCenterY + 4 : isDragging ? headCenterY + 16 - dragBobY : headCenterY + 44 * easeSlump;
  const headRotation = isShock
    ? -8
    : isAbnormal
    ? -24
    : isThinking
    ? 6
    : isDragging
    ? 12
    : isReaching
    ? (reachDirection === "left" ? -5 * reachProgress : 5 * reachProgress)
    : 15 * easeSlump;

  return (
    <g
      id={`canonical-character-${variant}`}
      transform={`translate(${x + recoilX}, ${y + recoilY}) scale(${scale})`}
    >
      {/* Floor Drop Shadow */}
      <ellipse
        cx={recoilX * 0.2 + slumpTorsoX * 0.4}
        cy="0"
        rx={botW * 1.3 - recoilY * 0.5}
        ry="9"
        fill="#000000"
        opacity="0.25"
      />

      {/* ============================================================== */}
      {/* A. LEGS & CLEAN STICK FEET (NO SHOES)                          */}
      {/* ============================================================== */}
      {isAbnormal ? (
        // Abnormally bent / contorted legs (knees twisted at unnatural zig-zag angles)
        <g id="char-legs-abnormal">
          {/* Left leg: bent sharply outward at knee, then angles back inward with twisted foot */}
          <path
            d={`M ${-botW * 0.45} ${hipY} L ${-botW * 1.55} ${hipY * 0.52} L ${-botW * 0.35} 0`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left foot twisted backwards */}
          <line x1={-botW * 0.35} y1="0" x2={-botW * 0.35 + 26} y2="0" stroke="#000000" strokeWidth={strokeW} strokeLinecap="round" />

          {/* Right leg: knock-knee bent inward, then kicks awkwardly outward */}
          <path
            d={`M ${botW * 0.45} ${hipY} L ${-botW * 0.15} ${hipY * 0.45} L ${botW * 1.1} 0`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right foot bent upward at unnatural angle */}
          <line x1={botW * 1.1} y1="0" x2={botW * 1.1 + 24} y2="-12" stroke="#000000" strokeWidth={strokeW} strokeLinecap="round" />
        </g>
      ) : isShock ? (
        // Shock recoil leg stance: braced backward
        <g id="char-legs-shock">
          {/* Left leg */}
          <path
            d={`M ${-botW * 0.45} ${hipY} L ${-botW * 1.1} ${hipY * 0.5} L ${-botW * 1.2} 0`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1={-botW * 1.2} y1="0" x2={-botW * 1.7} y2="0" stroke="#000000" strokeWidth={strokeW} strokeLinecap="round" />

          {/* Right leg */}
          <path
            d={`M ${botW * 0.45} ${hipY} L ${botW * 0.6} ${hipY * 0.5} L ${botW * 0.75} 0`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1={botW * 0.75} y1="0" x2={botW * 1.25} y2="0" stroke="#000000" strokeWidth={strokeW} strokeLinecap="round" />
        </g>
      ) : isDragging ? (() => {
        // Natural human dragging gait: alternating between front stride lift and back chained leg drag
        const pSin = Math.sin(dragCycle);
        // Front leg stride & lift (Phase 0 to PI: front leg steps forward and lands)
        const frontLift = Math.max(0, pSin) * 24;
        const frontStep = pSin * 26;
        const frontFootX = torsoBottomX + botW * 0.95 + frontStep;
        const frontFootY = -frontLift;
        const frontKneeX = torsoBottomX + botW * 1.15 + frontStep * 0.5;
        const frontKneeY = hipY * 0.55 - frontLift * 0.7;

        // Back leg drag (Phase PI to 2*PI: back chained leg scrapes and drags forward)
        const backDrag = Math.max(0, -pSin) * 32;
        const backFootX = torsoBottomX - botW * 1.8 + backDrag;
        const backKneeX = torsoBottomX - botW * 1.2 + backDrag * 0.6;
        const backKneeY = hipY * 0.52;

        return (
          <g id="char-legs-dragging">
            {/* Left Leg (back, chained to iron ball): hip -> flexed knee -> ankle dragging on floor */}
            <path
              d={`M ${torsoBottomX - botW * 0.45} ${hipY} 
                 L ${backKneeX} ${backKneeY} 
                 L ${backFootX} 0`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Back foot dragged flat along floor */}
            <line
              x1={backFootX}
              y1="0"
              x2={backFootX + 26}
              y2="0"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
            />

            {/* Right Leg (front, stepping & driving): hip -> bent knee -> foot lifting & planting */}
            <path
              d={`M ${torsoBottomX + botW * 0.45} ${hipY} 
                 L ${frontKneeX} ${frontKneeY} 
                 L ${frontFootX} ${frontFootY}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Front foot planting firmly on floor */}
            <line
              x1={frontFootX}
              y1={frontFootY}
              x2={frontFootX + 28}
              y2={frontFootY}
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
            />
          </g>
        );
      })() : (
        // Standard clean stick legs with L-shaped feet pointing outward
        <g id="char-legs-standard">
          {/* Left leg */}
          <line x1={-botW * 0.45} y1={hipY} x2={-botW * 0.45} y2="0" stroke="#000000" strokeWidth={strokeW} strokeLinecap="round" />
          <line x1={-botW * 0.45} y1="0" x2={-botW * 0.45 - 24} y2="0" stroke="#000000" strokeWidth={strokeW} strokeLinecap="round" />

          {/* Right leg */}
          <line x1={botW * 0.45} y1={hipY} x2={botW * 0.45} y2="0" stroke="#000000" strokeWidth={strokeW} strokeLinecap="round" />
          <line x1={botW * 0.45} y1="0" x2={botW * 0.45 + 24} y2="0" stroke="#000000" strokeWidth={strokeW} strokeLinecap="round" />
        </g>
      )}

      {/* ============================================================== */}
      {/* B. TORSO: CANONICAL WHITE TUNIC BODY (MATCHING REFERENCE IMAGE)*/}
      {/* ============================================================== */}
      <path
        d={`M ${torsoTopX - topW} ${isDefeat ? slumpTorsoY : shoulderY} 
           L ${torsoTopX + topW} ${isDefeat ? slumpTorsoY : shoulderY} 
           L ${torsoBottomX + botW} ${hipY} 
           Q ${torsoBottomX + botW} ${hipY + 6} ${torsoBottomX + botW - 6} ${hipY + 6} 
           L ${torsoBottomX - botW + 6} ${hipY + 6} 
           Q ${torsoBottomX - botW} ${hipY + 6} ${torsoBottomX - botW} ${hipY} Z`}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth={strokeW}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ============================================================== */}
      {/* C. HEAD & FACIAL EXPRESSIONS (Rendered before arms so hands    */}
      {/*    and arms are painted on top of head, never hidden)          */}
      {/* ============================================================== */}
      <g
        id="char-head"
        transform={`translate(${curHeadX}, ${curHeadY}) rotate(${headRotation})`}
      >
        {/* White Head Circle with Black Outline */}
        <circle
          cx="0"
          cy="0"
          r={headR}
          fill={showBrainXRay ? "#1E293B" : "#FFFFFF"}
          stroke="#000000"
          strokeWidth={strokeW}
        />

        {/* Brain X-Ray Glowing Red Convolutions (when showBrainXRay is true) */}
        {showBrainXRay && (
          <g id="head-brain-xray">
            {/* Glowing Brain Lobes Silhouette */}
            <path
              d={`M ${-headR * 0.58} ${-headR * 0.08}
                 C ${-headR * 0.68} ${-headR * 0.55} ${-headR * 0.3} ${-headR * 0.76} 0 ${-headR * 0.72}
                 C ${headR * 0.3} ${-headR * 0.76} ${headR * 0.68} ${-headR * 0.55} ${headR * 0.58} ${-headR * 0.08}
                 C ${headR * 0.55} ${headR * 0.28} ${headR * 0.25} ${headR * 0.38} 0 ${headR * 0.35}
                 C ${-headR * 0.25} ${headR * 0.38} ${-headR * 0.55} ${headR * 0.28} ${-headR * 0.58} ${-headR * 0.08} Z`}
              fill={brainGlowColor}
              fillOpacity="0.45"
              stroke={brainGlowColor}
              strokeWidth="2.8"
            />
            {/* Upper Sulci / Gyri Curves */}
            <path
              d={`M ${-headR * 0.44} ${-headR * 0.25} Q ${-headR * 0.2} ${-headR * 0.52} 0 ${-headR * 0.34} Q ${headR * 0.24} ${-headR * 0.52} ${headR * 0.44} ${-headR * 0.25}`}
              fill="none"
              stroke={brainGlowColor}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Mid Sulci Curves */}
            <path
              d={`M ${-headR * 0.38} ${-headR * 0.04} Q ${-headR * 0.16} ${-headR * 0.22} 0 ${-headR * 0.06} Q ${headR * 0.18} ${-headR * 0.22} ${headR * 0.38} ${-headR * 0.04}`}
              fill="none"
              stroke={brainGlowColor}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Lower Lobular Curves */}
            <path
              d={`M ${-headR * 0.28} ${headR * 0.16} Q 0 ${headR * 0.06} ${headR * 0.28} ${headR * 0.16}`}
              fill="none"
              stroke={brainGlowColor}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Hemispheric Fissure Midline */}
            <line
              x1="0"
              y1={-headR * 0.7}
              x2="0"
              y2={headR * 0.32}
              stroke={brainGlowColor}
              strokeWidth="2.4"
              strokeDasharray="4 3"
            />
          </g>
        )}

        {/* --- EYES --- */}
        {isShock || eyes === "shock" ? (
          // Shocked wide eyes with pinprick pupils
          <g id="eyes-shock">
            <circle cx={-headR * 0.22} cy={-headR * 0.12} r={headR * 0.25} fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
            <circle cx={headR * 0.26} cy={-headR * 0.12} r={headR * 0.25} fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
            <circle cx={-headR * 0.20} cy={-headR * 0.12} r="4" fill="#000000" />
            <circle cx={headR * 0.28} cy={-headR * 0.12} r="4" fill="#000000" />
          </g>
        ) : eyes === "defeat" || eyes === "sad-open" ? (
          // Truly sad open eyes: solid black ovals with sorrowful / \ sad eyebrows (inner raised, outer drooping)
          <g id="eyes-sad-open">
            <ellipse cx={-headR * 0.26} cy={-headR * 0.10} rx={eyeRx} ry={eyeRy} fill="#000000" />
            <ellipse cx={headR * 0.26} cy={-headR * 0.10} rx={eyeRx} ry={eyeRy} fill="#000000" />
            {/* Sorrowful sad eyebrows: / \ with inner ends raised high and outer ends drooping down */}
            <path d={`M ${-headR * 0.38} -11 Q ${-headR * 0.24} -22 ${-headR * 0.10} -21`} fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
            <path d={`M ${headR * 0.10} -21 Q ${headR * 0.24} -22 ${headR * 0.38} -11`} fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : eyes === "defeat-closed" ? (
          // Defeated downcast half-closed slits with sorrowful / \ sad eyebrows
          <g id="eyes-defeat-closed">
            <path d={`M ${-headR * 0.32} -6 Q ${-headR * 0.18} 2 ${-headR * 0.04} -6`} fill="none" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
            <path d={`M ${headR * 0.10} -6 Q ${headR * 0.24} 2 ${headR * 0.38} -6`} fill="none" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
            <path d={`M ${-headR * 0.38} -11 Q ${-headR * 0.24} -22 ${-headR * 0.10} -21`} fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
            <path d={`M ${headR * 0.10} -21 Q ${headR * 0.24} -22 ${headR * 0.38} -11`} fill="none" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : lookDirection === "left" || eyes === "look-left" ? (
          // Eyes looking to the left
          <g id="eyes-look-left">
            <ellipse cx={-headR * 0.25} cy={-headR * 0.10} rx={eyeRx} ry={eyeRy} fill="#000000" />
            <ellipse cx={headR * 0.15} cy={-headR * 0.10} rx={eyeRx} ry={eyeRy} fill="#000000" />
            <circle cx={-headR * 0.28} cy={-headR * 0.13} r="2" fill="#FFFFFF" />
            <circle cx={headR * 0.12} cy={-headR * 0.13} r="2" fill="#FFFFFF" />
          </g>
        ) : lookDirection === "right" || eyes === "look-right" || isContent ? (
          // Cheerful eyes looking to the right
          <g id="eyes-look-right">
            <ellipse cx={-headR * 0.15} cy={-headR * 0.10} rx={eyeRx} ry={eyeRy} fill="#000000" />
            <ellipse cx={headR * 0.25} cy={-headR * 0.10} rx={eyeRx} ry={eyeRy} fill="#000000" />
            <circle cx={-headR * 0.12} cy={-headR * 0.13} r="2" fill="#FFFFFF" />
            <circle cx={headR * 0.28} cy={-headR * 0.13} r="2" fill="#FFFFFF" />
          </g>
        ) : (
          // Standard symmetric oval eyes from reference image
          <g id="eyes-reference">
            <ellipse cx={-headR * 0.26} cy={-headR * 0.10} rx={eyeRx} ry={eyeRy} fill="#000000" />
            <ellipse cx={headR * 0.26} cy={-headR * 0.10} rx={eyeRx} ry={eyeRy} fill="#000000" />
          </g>
        )}

        {/* --- MOUTH --- */}
        {mouth === "smile" ? (
          // Clean happy smile from reference image
          <path d={`M ${-headR * 0.28} ${headR * 0.22} Q 0 ${headR * 0.42} ${headR * 0.28} ${headR * 0.22}`} fill="none" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
        ) : isShock || mouth === "shock" ? (
          // Alarmed open 'O' mouth
          <ellipse cx="2" cy={headR * 0.32} rx="10" ry="16" fill="#000000" />
        ) : mouth === "grimace" || isDragging ? (
          // Determined gritting exertion mouth
          <g id="mouth-grimace">
            <path d={`M ${-headR * 0.24} ${headR * 0.28} Q 0 ${headR * 0.22} ${headR * 0.24} ${headR * 0.28}`} fill="none" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
            <line x1={-headR * 0.16} y1={headR * 0.36} x2={headR * 0.16} y2={headR * 0.36} stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : mouth === "frown" || isDefeat ? (
          // Natural sorrowful sad downturned mouth
          <path d={`M ${-headR * 0.22} ${headR * 0.32} Q 0 ${headR * 0.18} ${headR * 0.22} ${headR * 0.32}`} fill="none" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
        ) : mouth === "flat" ? (
          <line x1={-headR * 0.20} y1={headR * 0.25} x2={headR * 0.20} y2={headR * 0.25} stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
        ) : (
          // Default clean happy smile
          <path d={`M ${-headR * 0.28} ${headR * 0.22} Q 0 ${headR * 0.42} ${headR * 0.28} ${headR * 0.22}`} fill="none" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
        )}

        {/* --- COMIC EFFECTS --- */}
        {/* Shock exclamation mark & sweat drop */}
        {(isShock || showExclamation || showSweat) && (
          <g id="shock-effects">
            {(isShock || showExclamation) && (
              <g transform={`translate(0, ${-headR - 25})`}>
                <text
                  x="0"
                  y="0"
                  fill="#EF4444"
                  fontSize="48"
                  fontWeight="900"
                  fontFamily="Impact, Arial Black, sans-serif"
                  textAnchor="middle"
                  stroke="#000000"
                  strokeWidth="2.2"
                >
                  !
                </text>
              </g>
            )}
            <ellipse
              cx={-headR * 0.8}
              cy={-headR * 0.4}
              rx="7"
              ry="13"
              transform={`rotate(-28 ${-headR * 0.8} ${-headR * 0.4})`}
              fill="#38BDF8"
              stroke="#000000"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* Teardrop during defeat */}
        {showTear && tearOpacity > 0 && (
          <path
            d="M 6 0 C 10 5 10 12 6 15 C 2 12 2 5 6 0 Z"
            fill="#38BDF8"
            stroke="#000000"
            strokeWidth="1.8"
            transform={`translate(${headR * 0.2}, ${headR * 0.22 + tearY}) scale(0.95)`}
            opacity={tearOpacity}
          />
        )}

        {/* Comic Sigh / Breath Puff */}
        {showSigh && (
          <g
            id="sigh-puff"
            transform={`translate(${headR * 0.45 + sighFrame * 0.6}, ${headR * 0.25 - sighFrame * 0.4})`}
            opacity={Math.max(0, 0.75 - sighFrame / 45)}
          >
            <circle cx="0" cy="0" r="7" fill="#94A3B8" opacity="0.5" />
            <circle cx="10" cy="-5" r="9.5" fill="#94A3B8" opacity="0.4" />
            <circle cx="20" cy="-2" r="7" fill="#94A3B8" opacity="0.3" />
          </g>
        )}
      </g>

      {/* ============================================================== */}
      {/* D. ARMS & MITTEN HANDS (Rendered AFTER head so hands are on top)*/}
      {/* ============================================================== */}
      {isAbnormal && (
        // Abnormally contorted arms: elbows bent at sharp unnatural zig-zags
        <g id="char-arms-abnormal">
          {/* Left arm: elbow juts sharply UP & OUT, forearm bends backwards down */}
          <path
            d={`M ${torsoTopX - topW} ${slumpTorsoY + 6} 
               L ${torsoTopX - topW - 46} ${slumpTorsoY - 32} 
               L ${torsoTopX - topW - 20} ${slumpTorsoY + 65}`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW - 0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={torsoTopX - topW - 20} cy={slumpTorsoY + 70} r={handR} fill="#000000" />
          <ellipse
            cx={torsoTopX - topW - 16}
            cy={slumpTorsoY + 72}
            rx="4"
            ry="6"
            transform={`rotate(45 ${torsoTopX - topW - 16} ${slumpTorsoY + 72})`}
            fill="#000000"
          />

          {/* Right arm: twisted inward across torso then bent sharply upward/backward */}
          <path
            d={`M ${torsoTopX + topW} ${slumpTorsoY + 6} 
               L ${torsoTopX + topW + 36} ${slumpTorsoY + torsoH * 0.38} 
               L ${torsoTopX + topW + 72} ${slumpTorsoY + torsoH * 0.15}`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW - 0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={torsoTopX + topW + 75} cy={slumpTorsoY + torsoH * 0.13} r={handR} fill="#000000" />
          <ellipse
            cx={torsoTopX + topW + 78}
            cy={slumpTorsoY + torsoH * 0.10}
            rx="4"
            ry="6"
            transform={`rotate(-50 ${torsoTopX + topW + 78} ${slumpTorsoY + torsoH * 0.10})`}
            fill="#000000"
          />
        </g>
      )}

      {isContent && (
        // Content: left arm relaxed at side, right arm gesturing happily to bucket/prop
        <g id="char-arms-content">
          {/* Left arm */}
          <path
            d={`M ${torsoTopX - topW} ${shoulderY + 6} L ${torsoTopX - topW - 20} ${shoulderY + torsoH * 0.5} L ${torsoTopX - topW - 10} ${hipY + 8}`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW - 0.5}
            strokeLinecap="round"
          />
          <circle cx={torsoTopX - topW - 10} cy={hipY + 12} r={handR} fill="#000000" />
          <ellipse cx={torsoTopX - topW - 15} cy={hipY + 9} rx="4" ry="6" transform={`rotate(-25 ${torsoTopX - topW - 15} ${hipY + 9})`} fill="#000000" />

          {/* Right arm gesturing warmly */}
          <path
            d={`M ${torsoTopX + topW} ${shoulderY + 6} L ${torsoTopX + topW + 36} ${shoulderY + torsoH * 0.45} L ${torsoTopX + topW + 72} ${shoulderY + torsoH * 0.65}`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW - 0.5}
            strokeLinecap="round"
          />
          <circle cx={torsoTopX + topW + 76} cy={shoulderY + torsoH * 0.68} r={handR} fill="#000000" />
          <ellipse cx={torsoTopX + topW + 78} cy={shoulderY + torsoH * 0.62} rx="4" ry="6" transform={`rotate(35 ${torsoTopX + topW + 78} ${shoulderY + torsoH * 0.62})`} fill="#000000" />
        </g>
      )}

      {isDragging && !armLeft && !armRight && (() => {
        // Natural human heavy pulling arm mechanics
        const armPumping = Math.sin(dragCycle) * 12;
        const elbowLx = torsoTopX - topW - 32 - armPumping * 0.6;
        const elbowLy = shoulderY + 68;
        const handLx = torsoTopX - topW - 70 - armPumping;
        const handLy = shoulderY + 115;

        const elbowRx = torsoTopX + topW + 32 + armPumping * 0.6;
        const elbowRy = shoulderY + 62;
        const handRx = torsoTopX + topW + 72 + armPumping;
        const handRy = shoulderY + 45;

        return (
          <g id="char-arms-dragging">
            {/* Left arm (rear pump) */}
            <path
              d={`M ${torsoTopX - topW} ${shoulderY + 6} L ${elbowLx} ${elbowLy} L ${handLx} ${handLy}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={handLx} cy={handLy} r={handR} fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
            <ellipse cx={handLx + 4} cy={handLy - 2} rx="4" ry="6" transform={`rotate(35 ${handLx + 4} ${handLy - 2})`} fill="#000000" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Right arm (forward drive pump) */}
            <path
              d={`M ${torsoTopX + topW} ${shoulderY + 6} L ${elbowRx} ${elbowRy} L ${handRx} ${handRy}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={handRx} cy={handRy} r={handR} fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
            <ellipse cx={handRx - 4} cy={handRy - 2} rx="4" ry="6" transform={`rotate(-40 ${handRx - 4} ${handRy - 2})`} fill="#000000" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        );
      })()}

      {(armLeft || armRight) && (
        <g id="char-arms-custom">
          {armLeft}
          {armRight}
        </g>
      )}

      {isCrazy && !armLeft && !armRight && (() => {
        // Continuous organic flailing & head-clutching wave (0 = clutching head, 1 = flailing in air)
        const wave = (Math.sin(frame * 0.28) + 1) / 2;
        
        // Jitters & frantic micro-tremors
        const j1 = Math.sin(frame * 2.7) * 8;
        const j2 = Math.cos(frame * 3.4) * 8;
        const j3 = Math.sin(frame * 3.1) * 7;
        const j4 = Math.cos(frame * 2.9) * 7;

        // Left Arm: reaches wide outside head (X = -headR * 0.85 to -120, Y = -20 to -105)
        const clutchLx = curHeadX - headR * 0.85 + j1;
        const clutchLy = curHeadY - 20 + j2;
        const clutchElbowLx = torsoTopX - topW - 48 + Math.sin(frame * 1.9) * 14;
        const clutchElbowLy = curHeadY + 12 + Math.cos(frame * 2.3) * 10;

        const flailLx = curHeadX - 120 + Math.sin(frame * 2.4) * 28;
        const flailLy = curHeadY - 105 + Math.cos(frame * 3.1) * 24;
        const flailElbowLx = torsoTopX - topW - 42 + Math.sin(frame * 1.8) * 18;
        const flailElbowLy = curHeadY - 30 + Math.cos(frame * 2.5) * 15;

        const handLx = (1 - wave) * clutchLx + wave * flailLx;
        const handLy = (1 - wave) * clutchLy + wave * flailLy;
        const elbowLx = (1 - wave) * clutchElbowLx + wave * flailElbowLx;
        const elbowLy = (1 - wave) * clutchElbowLy + wave * flailElbowLy;

        // Right Arm: reaches wide outside head (X = +headR * 0.85 to +120, Y = -25 to -105)
        const clutchRx = curHeadX + headR * 0.85 + j3;
        const clutchRy = curHeadY - 25 + j4;
        const clutchElbowRx = torsoTopX + topW + 48 + Math.cos(frame * 2.1) * 14;
        const clutchElbowRy = curHeadY + 12 + Math.sin(frame * 2.5) * 10;

        const flailRx = curHeadX + 120 + Math.cos(frame * 2.6) * 28;
        const flailRy = curHeadY - 105 + Math.sin(frame * 3.3) * 24;
        const flailElbowRx = torsoTopX + topW + 42 + Math.cos(frame * 1.9) * 18;
        const flailElbowRy = curHeadY - 30 + Math.sin(frame * 2.7) * 15;

        const handRx = (1 - wave) * clutchRx + wave * flailRx;
        const handRy = (1 - wave) * clutchRy + wave * flailRy;
        const elbowRx = (1 - wave) * clutchElbowRx + wave * flailElbowRx;
        const elbowRy = (1 - wave) * clutchElbowRy + wave * flailElbowRy;

        return (
          <g id="char-arms-crazy">
            {/* Left Arm Line */}
            <path
              d={`M ${torsoTopX - topW} ${shoulderY + 6} L ${elbowLx} ${elbowLy} L ${handLx} ${handLy}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left Mitten Hand & Thumb with crisp white edge contrast */}
            <circle cx={handLx} cy={handLy} r={handR} fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
            <ellipse
              cx={handLx + 4}
              cy={handLy - 2}
              rx="4"
              ry="6"
              transform={`rotate(${wave * 40 - 20} ${handLx + 4} ${handLy - 2})`}
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />

            {/* Right Arm Line */}
            <path
              d={`M ${torsoTopX + topW} ${shoulderY + 6} L ${elbowRx} ${elbowRy} L ${handRx} ${handRy}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Mitten Hand & Thumb with crisp white edge contrast */}
            <circle cx={handRx} cy={handRy} r={handR} fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
            <ellipse
              cx={handRx - 4}
              cy={handRy - 2}
              rx="4"
              ry="6"
              transform={`rotate(${-wave * 40 + 20} ${handRx - 4} ${handRy - 2})`}
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />

            {/* Dynamic motion wind arcs near hands */}
            <path
              d={`M ${handLx - 16} ${handLy - 8} Q ${handLx - 22} ${handLy + 6} ${handLx - 14} ${handLy + 18}`}
              fill="none"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.65 + wave * 0.35}
            />
            <path
              d={`M ${handRx + 16} ${handRy - 8} Q ${handRx + 22} ${handRy + 6} ${handRx + 14} ${handRy + 18}`}
              fill="none"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.65 + wave * 0.35}
            />
          </g>
        );
      })()}

      {isShock && !isCrazy && !armLeft && !armRight && (() => {
        const hTremorX = Math.sin(frame * 3.2) * 5;
        const hTremorY = Math.cos(frame * 3.8) * 4;
        const elbowTremorX = Math.sin(frame * 2.5) * 6;
        const elbowTremorY = Math.cos(frame * 2.9) * 5;

        // Long, full-length arms: elbows flare outward with ~80px upper arm and ~85px forearm
        const elbowLx = torsoTopX - topW - 70 + elbowTremorX;
        const elbowLy = shoulderY - 30 + elbowTremorY;
        const handLx = curHeadX - headR * 0.72 + hTremorX;
        const handLy = curHeadY - headR * 0.35 + hTremorY;

        const elbowRx = torsoTopX + topW + 70 - elbowTremorX;
        const elbowRy = shoulderY - 30 + elbowTremorY;
        const handRx = curHeadX + headR * 0.72 - hTremorX;
        const handRy = curHeadY - headR * 0.35 + hTremorY;

        return (
          <g id="char-arms-shock">
            {/* Left arm up to temple with full-length upper arm and forearm */}
            <path
              d={`M ${torsoTopX - topW} ${shoulderY + 6} L ${elbowLx} ${elbowLy} L ${handLx} ${handLy}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Left Mitten Hand with canonical mitten proportions */}
            <circle cx={handLx} cy={handLy} r={handR} fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
            <ellipse
              cx={handLx + 4}
              cy={handLy - 2}
              rx="4"
              ry="6"
              transform={`rotate(30 ${handLx + 4} ${handLy - 2})`}
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />

            {/* Right arm up to temple with full-length upper arm and forearm */}
            <path
              d={`M ${torsoTopX + topW} ${shoulderY + 6} L ${elbowRx} ${elbowRy} L ${handRx} ${handRy}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Right Mitten Hand with canonical mitten proportions */}
            <circle cx={handRx} cy={handRy} r={handR} fill="#000000" stroke="#FFFFFF" strokeWidth="2" />
            <ellipse
              cx={handRx - 4}
              cy={handLy - 2}
              rx="4"
              ry="6"
              transform={`rotate(-30 ${handRx - 4} ${handLy - 2})`}
              fill="#000000"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          </g>
        );
      })()}

      {isDefeat && !armLeft && !armRight && (() => {
        // Damped swing settling smoothly into limp hanging posture
        const swing = Math.sin(easeSlump * Math.PI * 2.5) * (1 - easeSlump) * 16;
        const targetHandY = slumpTorsoY + torsoH * 0.95;
        // As slump begins, hands drop smoothly from chest level to bottom
        const currentHandY = (1 - easeSlump) * (shoulderY + 60) + easeSlump * targetHandY;
        const currentElbowY = (1 - easeSlump) * (shoulderY + 30) + easeSlump * (slumpTorsoY + torsoH * 0.5);

        return (
          <g id="char-arms-defeat">
            {/* Left limp arm */}
            <path
              d={`M ${torsoTopX - topW} ${slumpTorsoY + 6} 
                 L ${torsoTopX - topW - 2 + swing * 0.5} ${currentElbowY} 
                 L ${torsoTopX - topW + swing} ${currentHandY}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW - 0.5}
              strokeLinecap="round"
            />
            <circle cx={torsoTopX - topW + swing} cy={currentHandY + 3} r={handR} fill="#000000" />

            {/* Right limp arm */}
            <path
              d={`M ${torsoTopX + topW} ${slumpTorsoY + 6} 
                 L ${torsoTopX + topW - 2 - swing * 0.5} ${currentElbowY} 
                 L ${torsoTopX + topW - 4 - swing} ${currentHandY}`}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeW - 0.5}
              strokeLinecap="round"
            />
            <circle cx={torsoTopX + topW - 4 - swing} cy={currentHandY + 3} r={handR} fill="#000000" />
          </g>
        );
      })()}

      {isReaching && (
        // Reaching: arm reaches forward toward target with realistic extension
        <g id="char-arms-reaching">
          {reachDirection === "left" ? (
            <>
              {/* Left arm reaching forward to the left */}
              <path
                d={`M ${torsoTopX - topW} ${shoulderY + 6} 
                   L ${torsoTopX - topW - 44 * reachProgress} ${shoulderY + 22 - 6 * reachProgress} 
                   L ${torsoTopX - topW - 95 * reachProgress} ${shoulderY + 32 - 14 * reachProgress}`}
                fill="none"
                stroke="#000000"
                strokeWidth={strokeW - 0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={torsoTopX - topW - 95 * reachProgress} cy={shoulderY + 32 - 14 * reachProgress} r={handR} fill="#000000" />
              <ellipse
                cx={torsoTopX - topW - 95 * reachProgress - 3}
                cy={shoulderY + 27 - 14 * reachProgress}
                rx="4"
                ry="6"
                transform={`rotate(-40 ${torsoTopX - topW - 95 * reachProgress - 3} ${shoulderY + 27 - 14 * reachProgress})`}
                fill="#000000"
              />

              {/* Right arm slightly nervous at side */}
              <path
                d={`M ${torsoTopX + topW} ${shoulderY + 6} L ${torsoTopX + topW + 12} ${shoulderY + torsoH * 0.45} L ${torsoTopX + topW + 8} ${hipY + 4}`}
                fill="none"
                stroke="#000000"
                strokeWidth={strokeW - 0.5}
                strokeLinecap="round"
              />
              <circle cx={torsoTopX + topW + 8} cy={hipY + 8} r={handR} fill="#000000" />
              <ellipse cx={torsoTopX + topW + 12} cy={hipY + 5} rx="4" ry="6" transform={`rotate(20 ${torsoTopX + topW + 12} ${hipY + 5})`} fill="#000000" />
            </>
          ) : (
            <>
              {/* Left arm at side */}
              <path
                d={`M ${torsoTopX - topW} ${shoulderY + 6} L ${torsoTopX - topW - 12} ${shoulderY + torsoH * 0.45} L ${torsoTopX - topW - 8} ${hipY + 4}`}
                fill="none"
                stroke="#000000"
                strokeWidth={strokeW - 0.5}
                strokeLinecap="round"
              />
              <circle cx={torsoTopX - topW - 8} cy={hipY + 8} r={handR} fill="#000000" />
              <ellipse cx={torsoTopX - topW - 12} cy={hipY + 5} rx="4" ry="6" transform={`rotate(-20 ${torsoTopX - topW - 12} ${hipY + 5})`} fill="#000000" />

              {/* Right arm reaching forward to the right */}
              <path
                d={`M ${torsoTopX + topW} ${shoulderY + 6} 
                   L ${torsoTopX + topW + 44 * reachProgress} ${shoulderY + 22 - 6 * reachProgress} 
                   L ${torsoTopX + topW + 95 * reachProgress} ${shoulderY + 32 - 14 * reachProgress}`}
                fill="none"
                stroke="#000000"
                strokeWidth={strokeW - 0.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={torsoTopX + topW + 95 * reachProgress} cy={shoulderY + 32 - 14 * reachProgress} r={handR} fill="#000000" />
              <ellipse
                cx={torsoTopX + topW + 95 * reachProgress + 3}
                cy={shoulderY + 27 - 14 * reachProgress}
                rx="4"
                ry="6"
                transform={`rotate(40 ${torsoTopX + topW + 95 * reachProgress + 3} ${shoulderY + 27 - 14 * reachProgress})`}
                fill="#000000"
              />
            </>
          )}
        </g>
      )}

      {isThinking && (
        // Thinking / Pondering Pose: Left arm folded across waist, Right hand resting on chin
        <g id="char-arms-thinking">
          {(() => {
            // Subtle thoughtful chin tap motion over time
            const tap = Math.sin(frame * 0.25) * 1.5;
            const leftShoulderX = torsoTopX - topW;
            const leftShoulderY = shoulderY + 6;
            const leftElbowX = torsoTopX - topW - 22;
            const leftElbowY = shoulderY + torsoH * 0.46;
            const leftHandX = torsoTopX + topW - 4;
            const leftHandY = shoulderY + torsoH * 0.44;

            const rightShoulderX = torsoTopX + topW;
            const rightShoulderY = shoulderY + 6;
            const rightElbowX = torsoTopX + topW + 8;
            const rightElbowY = shoulderY + torsoH * 0.42;
            const rightHandX = curHeadX + 28 + tap;
            const rightHandY = curHeadY + headR * 0.38;

            return (
              <>
                {/* 1. Left arm crossed across torso supporting right elbow */}
                <path
                  d={`M ${leftShoulderX} ${leftShoulderY} L ${leftElbowX} ${leftElbowY} L ${leftHandX} ${leftHandY}`}
                  fill="none"
                  stroke="#000000"
                  strokeWidth={strokeW - 0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={leftHandX} cy={leftHandY} r={handR} fill="#000000" />

                {/* 2. Right arm up to chin in thoughtful ponder pose */}
                <path
                  d={`M ${rightShoulderX} ${rightShoulderY} L ${rightElbowX} ${rightElbowY} L ${rightHandX} ${rightHandY}`}
                  fill="none"
                  stroke="#000000"
                  strokeWidth={strokeW - 0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right Mitten Hand resting against chin with white outline for contrast */}
                <circle cx={rightHandX} cy={rightHandY} r={handR} fill="#000000" stroke="#FFFFFF" strokeWidth="1.8" />
                <ellipse
                  cx={rightHandX - 4}
                  cy={rightHandY - 4}
                  rx="4"
                  ry="6"
                  transform={`rotate(-40 ${rightHandX - 4} ${rightHandY - 4})`}
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </>
            );
          })()}
        </g>
      )}

      {isIdle && (
        // Idle: arms resting naturally beside torso matching reference image
        <g id="char-arms-idle">
          {/* Left arm */}
          <path
            d={`M ${-topW} ${shoulderY + 6} L ${-topW - 14} ${shoulderY + torsoH * 0.5} L ${-topW - 12} ${hipY + 4}`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW - 0.5}
            strokeLinecap="round"
          />
          <circle cx={-topW - 12} cy={hipY + 8} r={handR} fill="#000000" />
          <ellipse cx={-topW - 17} cy={hipY + 5} rx="4" ry="6" transform={`rotate(-20 ${-topW - 17} ${hipY + 5})`} fill="#000000" />

          {/* Right arm */}
          <path
            d={`M ${topW} ${shoulderY + 6} L ${topW + 14} ${shoulderY + torsoH * 0.5} L ${topW + 12} ${hipY + 4}`}
            fill="none"
            stroke="#000000"
            strokeWidth={strokeW - 0.5}
            strokeLinecap="round"
          />
          <circle cx={topW + 12} cy={hipY + 8} r={handR} fill="#000000" />
          <ellipse cx={topW + 17} cy={hipY + 5} rx="4" ry="6" transform={`rotate(20 ${topW + 17} ${hipY + 5})`} fill="#000000" />
        </g>
      )}


    </g>
  );
};
