import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CuratedCharacter } from "./CuratedCharacter";

export const AnhedoniaScene = ({
  sceneStartX = 13440,
  frame: propFrame,
}) => {
  const currentFrame = useCurrentFrame();
  // Supports both isolated scene preview (frames 0 to 200) and master timeline (frames 1410 to 1610)
  const localFrame = propFrame !== undefined ? propFrame - 1410 : currentFrame;

  const width = 1920;
  const height = 1080;
  const centerX = sceneStartX + 960; // 14400
  const centerY = 540;

  // =========================================================================
  // 1. EXPANDING DARK GREY CIRCLE
  // =========================================================================
  // Circle begins expanding from center stickman at frame 60, reaches max radius 480 by frame 130
  const circleT = interpolate(localFrame, [60, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const easeCircle = circleT * circleT * (3 - 2 * circleT);
  const circleRadius = 480 * easeCircle;
  const isCircleVisible = circleRadius > 0;

  // =========================================================================
  // 2. ICON ENTRANCES & COORDINATES
  // =========================================================================
  // Distance from center (0, 0) to each icon:
  // - Pizza:        (-310, -160) -> distance = ~349px (touched at frame ~91)
  // - Controller:   (310, -170)  -> distance = ~353px (touched at frame ~92)
  // - Music Note:   (320, 110)   -> distance = ~338px (touched at frame ~89)
  const pizzaDist = 349;
  const controllerDist = 353;
  const musicDist = 338;

  // Contact threshold when the expanding circle boundary reaches the edge of each icon:
  const musicTouchR = 308;
  const pizzaTouchR = 312;
  const controllerTouchR = 316;

  // The moment the expanding grey circle touches the colorful icons, they drain instantly:
  const isMusicDrained = circleRadius >= musicTouchR;
  const isPizzaDrained = circleRadius >= pizzaTouchR;
  const isControllerDrained = circleRadius >= controllerTouchR;

  // --- BOUNCY ENTRANCES (Frames 15 to 42) ---
  const pizzaEntranceT = interpolate(localFrame, [12, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pizzaEntrance = Math.sin(pizzaEntranceT * Math.PI * 0.5);

  const controllerEntranceT = interpolate(localFrame, [16, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const controllerEntrance = Math.sin(controllerEntranceT * Math.PI * 0.5);

  const musicEntranceT = interpolate(localFrame, [20, 46], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const musicEntrance = Math.sin(musicEntranceT * Math.PI * 0.5);

  // --- PLAYFUL IDLE BOUNCING (Active while colorful, ceases immediately when touched) ---
  const pizzaBob = isPizzaDrained ? 0 : Math.sin(localFrame * 0.16) * 11;
  const controllerBob = isControllerDrained ? 0 : Math.sin(localFrame * 0.16 + 2) * 11;
  const musicBob = isMusicDrained ? 0 : Math.sin(localFrame * 0.20 + 4) * 13;

  // --- SLOW SINKING & FADING OUT (As circle expands past them) ---
  // Pizza sink & fade:
  let pizzaSinkY = 0;
  let pizzaOpacity = pizzaEntrance;
  if (isPizzaDrained) {
    const sinkT = Math.min(1, (circleRadius - pizzaTouchR) / 100);
    pizzaSinkY = 65 * Math.pow(sinkT, 1.3);
    pizzaOpacity = Math.max(0, 1 - sinkT);
  }

  // Controller sink & fade:
  let controllerSinkY = 0;
  let controllerOpacity = controllerEntrance;
  if (isControllerDrained) {
    const sinkT = Math.min(1, (circleRadius - controllerTouchR) / 100);
    controllerSinkY = 65 * Math.pow(sinkT, 1.3);
    controllerOpacity = Math.max(0, 1 - sinkT);
  }

  // Music Note sink & fade:
  let musicSinkY = 0;
  let musicOpacity = musicEntrance;
  if (isMusicDrained) {
    const sinkT = Math.min(1, (circleRadius - musicTouchR) / 100);
    musicSinkY = 65 * Math.pow(sinkT, 1.3);
    musicOpacity = Math.max(0, 1 - sinkT);
  }

  return (
    <g id="scene-08-anhedonia-root">
      {/* ============================================================== */}
      {/* 1. CLEAN OFF-WHITE BACKGROUND                                  */}
      {/* ============================================================== */}
      <rect
        x={sceneStartX}
        y="0"
        width={width}
        height={height}
        fill="#F8F9FA" // Pure clean off-white
      />

      {/* ============================================================== */}
      {/* 2. EXPANDING DARK GREY CIRCLE (Originates from center stickman) */}
      {/* ============================================================== */}
      {isCircleVisible && (
        <circle
          cx={centerX}
          cy={centerY}
          r={circleRadius}
          fill="#334155" // Dark charcoal slate grey
          stroke="#000000"
          strokeWidth="6"
        />
      )}

      {/* ============================================================== */}
      {/* 3. CANONICAL STICKMAN BUST (Head and Shoulders in center)      */}
      {/* ============================================================== */}
      <CuratedCharacter
        x={centerX}
        y={centerY}
        isBust={true}
        scale={1.05}
        mouth="flat"
      />

      {/* ============================================================== */}
      {/* 4. THREE PLAYFUL ICONS (Pizza, Game Controller, Music Note)     */}
      {/* ============================================================== */}

      {/* -------------------------------------------------------------- */}
      {/* A. SLICE OF PIZZA (Top-Left)                                   */}
      {/* -------------------------------------------------------------- */}
      {pizzaOpacity > 0.01 && (
        <g
          id="pizza-icon"
          transform={`translate(${centerX - 310 * pizzaEntrance}, ${centerY - 160 + pizzaBob + pizzaSinkY}) rotate(${isPizzaDrained ? -10 : -14 + Math.sin(localFrame * 0.1) * 6}) scale(${pizzaEntrance * 1.15})`}
          opacity={pizzaOpacity}
        >
          {/* Pizza Slice Triangle Wedge */}
          <path
            d="M 0 54 L -38 -32 Q 0 -44 38 -32 Z"
            fill={isPizzaDrained ? "#9CA3AF" : "#FBBF24"} // Golden yellow cheese -> Flat grey
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Crust Arc at the Back */}
          <path
            d="M -42 -32 Q 0 -48 42 -32 Q 44 -44 0 -58 Q -44 -44 -42 -32 Z"
            fill={isPizzaDrained ? "#6B7280" : "#D97706"} // Warm baked crust -> Flat dark grey
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Pepperoni Disks */}
          <circle
            cx="-12"
            cy="-12"
            r="8"
            fill={isPizzaDrained ? "#4B5563" : "#EF4444"}
            stroke="#000000"
            strokeWidth="3.5"
          />
          <circle
            cx="14"
            cy="-6"
            r="7.5"
            fill={isPizzaDrained ? "#4B5563" : "#EF4444"}
            stroke="#000000"
            strokeWidth="3.5"
          />
          <circle
            cx="0"
            cy="18"
            r="6.5"
            fill={isPizzaDrained ? "#4B5563" : "#EF4444"}
            stroke="#000000"
            strokeWidth="3.5"
          />

          {/* Oregano spice specks (visible only when colorful) */}
          {!isPizzaDrained && (
            <>
              <circle cx="-5" cy="-24" r="2" fill="#15803D" />
              <circle cx="18" cy="-22" r="2" fill="#15803D" />
              <circle cx="4" cy="4" r="2" fill="#15803D" />
            </>
          )}
        </g>
      )}

      {/* -------------------------------------------------------------- */}
      {/* B. GAME CONTROLLER (Top-Right)                                 */}
      {/* -------------------------------------------------------------- */}
      {controllerOpacity > 0.01 && (
        <g
          id="game-controller-icon"
          transform={`translate(${centerX + 310 * controllerEntrance}, ${centerY - 170 + controllerBob + controllerSinkY}) rotate(${isControllerDrained ? 12 : 15 + Math.sin(localFrame * 0.12 + 1) * 6}) scale(${controllerEntrance * 1.12})`}
          opacity={controllerOpacity}
        >
          {/* Controller Body Shell */}
          <path
            d="
              M -44 -16
              C -48 -28, -24 -36, 0 -34
              C 24 -36, 48 -28, 44 -16
              L 48 24
              C 50 36, 32 44, 24 30
              L 16 12
              L -16 12
              L -24 30
              C -32 44, -50 36, -48 24
              Z
            "
            fill={isControllerDrained ? "#6B7280" : "#8B5CF6"} // Bright purple -> Flat grey
            stroke="#000000"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* D-Pad (Left Side) */}
          <g transform="translate(-24, -8)">
            <path
              d="M -4 -12 L 4 -12 L 4 -4 L 12 -4 L 12 4 L 4 4 L 4 12 L -4 12 L -4 4 L -12 4 L -12 -4 L -4 -4 Z"
              fill={isControllerDrained ? "#4B5563" : "#06B6D4"} // Cyan D-pad -> Dark grey
              stroke="#000000"
              strokeWidth="2.5"
            />
          </g>

          {/* 4 Action Buttons (Right Side) */}
          <g transform="translate(24, -8)">
            {/* Top Button */}
            <circle
              cx="0"
              cy="-8"
              r="4"
              fill={isControllerDrained ? "#9CA3AF" : "#F59E0B"}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Right Button */}
            <circle
              cx="8"
              cy="0"
              r="4"
              fill={isControllerDrained ? "#9CA3AF" : "#EF4444"}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Bottom Button */}
            <circle
              cx="0"
              cy="8"
              r="4"
              fill={isControllerDrained ? "#9CA3AF" : "#10B981"}
              stroke="#000000"
              strokeWidth="2"
            />
            {/* Left Button */}
            <circle
              cx="-8"
              cy="0"
              r="4"
              fill={isControllerDrained ? "#9CA3AF" : "#3B82F6"}
              stroke="#000000"
              strokeWidth="2"
            />
          </g>
        </g>
      )}

      {/* -------------------------------------------------------------- */}
      {/* C. MUSIC NOTE (Bottom-Right)                                   */}
      {/* -------------------------------------------------------------- */}
      {musicOpacity > 0.01 && (
        <g
          id="music-note-icon"
          transform={`translate(${centerX + 320 * musicEntrance}, ${centerY + 110 + musicBob + musicSinkY}) rotate(${isMusicDrained ? -6 : -8 + Math.sin(localFrame * 0.15 + 2) * 8}) scale(${musicEntrance * 1.18})`}
          opacity={musicOpacity}
        >
          {/* Beamed Eighth Notes (Double Quaver) */}
          {/* Left Note Head */}
          <ellipse
            cx="-18"
            cy="20"
            rx="12"
            ry="8.5"
            transform="rotate(-25, -18, 20)"
            fill={isMusicDrained ? "#6B7280" : "#EC4899"} // Bright pink -> Flat grey
            stroke="#000000"
            strokeWidth="4.5"
          />

          {/* Right Note Head */}
          <ellipse
            cx="18"
            cy="10"
            rx="12"
            ry="8.5"
            transform="rotate(-25, 18, 10)"
            fill={isMusicDrained ? "#6B7280" : "#EC4899"}
            stroke="#000000"
            strokeWidth="4.5"
          />

          {/* Left Stem */}
          <line
            x1="-8"
            y1="18"
            x2="-8"
            y2="-28"
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Right Stem */}
          <line
            x1="28"
            y1="8"
            x2="28"
            y2="-38"
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Beam connecting stems at top */}
          <polygon
            points="-8,-28 28,-38 28,-26 -8,-16"
            fill={isMusicDrained ? "#4B5563" : "#DB2777"}
            stroke="#000000"
            strokeWidth="4"
          />

          {/* Golden Sparkles (visible while joyful) */}
          {!isMusicDrained && (
            <g opacity="0.85">
              <polygon points="34,-45 36,-41 40,-41 37,-38 38,-34 34,-36 30,-34 31,-38 28,-41 32,-41" fill="#F59E0B" />
              <polygon points="-25,0 -23,3 -20,3 -22,6 -21,9 -25,7 -29,9 -28,6 -30,3 -27,3" fill="#F59E0B" />
            </g>
          )}
        </g>
      )}
    </g>
  );
};
