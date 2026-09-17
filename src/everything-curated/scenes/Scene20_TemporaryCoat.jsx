import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { GridBackground, CuratedStickman, ModularFloor } from "../../shared";

/**
 * Scene 20: Temporary Layer (The Heavy Grey Winter Coat)
 *
 * Narration: "It is not a continuous lifelong personality trait."
 * SRT Sync: [00:01:06,863 --> 00:01:10,286] (103 frames @ 30fps)
 *
 * Choreography:
 * 1. Frames 0 - 34: Stickman stands center screen (x = 960, floor y = 780) visibly WEARING
 *    an oversized, heavy, puffy grey winter coat. His head rests on the high puffy collar,
 *    his arms are inside the bulky coat sleeves with round mitten hands emerging at the cuffs,
 *    and the quilted body wraps completely over his torso down to his knees. The coat physically
 *    weighs him down with slumped posture and heavy rhythmic breathing.
 * 2. Frames 34 - 52: He suddenly stops. His right hand reaches up to the collar, grips the
 *    silver zipper, and unzips it down to the hem. The coat panels peel open, revealing
 *    his canonical white tunic underneath.
 * 3. Frames 53 - 66: The coat slips off his shoulders and plummets straight to the floor
 *    with gravity acceleration. At frame 65 it hits with a heavy impact thud and flattens
 *    into a squashed fabric pile.
 * 4. Frames 60 - 103: Free from the weight, he immediately straightens upright, smiles,
 *    and steps cleanly out of the coat pile (x: 960 -> 1100), leaving the empty shell behind.
 */
export const Scene20_TemporaryCoat = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floorY = 780;
  const initialStickmanX = 960;

  // =========================================================================
  // 1. TIMING KEYFRAMES
  // =========================================================================
  const freezeFrame = 34;    // Stops heavy breathing
  const reachStart = 34;     // Hand moves up to zipper slider
  const reachEnd = 40;
  const zipStart = 40;       // Pulls zipper down
  const zipEnd = 52;         // Fully unzipped
  const dropStart = 53;      // Coat slips off shoulders
  const impactFrame = 65;    // Coat hits the floor with heavy thud
  const stepStart = 72;      // Steps out of the coat
  const stepEnd = 94;        // Finishes stepping forward, standing tall

  // =========================================================================
  // 2. KINEMATIC PROGRESS CALCULATIONS
  // =========================================================================

  // Laborious heavy breathing while burdened under the coat (Frames 0 - 34)
  const isBreathingBurden = frame < freezeFrame;
  const heavyBreathY = isBreathingBurden ? Math.sin(frame * 0.18) * 3.5 : 0;

  // Unzipping progress (0 = zipped at neck, 1 = unzipped at bottom)
  const zipProgress = interpolate(frame, [zipStart, zipEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });

  // Coat falling to floor (accelerating gravity drop)
  const coatFallProg = interpolate(frame, [dropStart, impactFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.5, 0, 0.8, 1),
  });

  // Impact floor vibration
  const impactShakeY = (frame >= impactFrame && frame < impactFrame + 8)
    ? Math.sin((frame - impactFrame) * 3.2) * (7 - (frame - impactFrame) * 0.8)
    : 0;

  // Slump posture release: hunched (0.85) -> upright & proud (0)
  const slumpRelease = spring({
    frame: Math.max(0, frame - 56),
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.7 },
  });
  const slumpProgress = interpolate(slumpRelease, [0, 1], [0.85, 0]);

  // Stepping forward out of the coat pile (x: 960 -> 1100)
  const stepProgress = interpolate(frame, [stepStart, stepEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  const stickmanX = initialStickmanX + stepProgress * 140;

  // Walking step bounce and leg lift
  const walkCycle = stepProgress > 0 && stepProgress < 1
    ? Math.sin(stepProgress * Math.PI * 2)
    : 0;
  const stickmanStepBob = Math.abs(walkCycle) * 6;

  // Face & emotion state
  const isRelieved = frame >= 60;
  const stickmanEyes = isRelieved ? "normal" : "defeat";
  const stickmanMouth = isRelieved ? "smile" : "frown";
  const stickmanPose = isRelieved ? "idle" : "defeat";

  // =========================================================================
  // 3. OVERSIZED HEAVY COAT GEOMETRY & PHYSICS
  // =========================================================================
  // Vertical alignment: collar sits right under chin (~440 in slump)
  const neckY = 440 + heavyBreathY;
  const coatDropY = interpolate(coatFallProg, [0, 1], [0, floorY - neckY + 10]);
  const coatCurrentNeckY = neckY + coatDropY;

  // Flap separation angle when unzipped
  const flapSpread = zipProgress * 26;

  // Pile compression after landing on the floor
  const pileSquash = interpolate(frame, [impactFrame, impactFrame + 8], [1, 0.36], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pileWidth = interpolate(frame, [impactFrame, impactFrame + 8], [220, 270], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dust puff on impact
  const dustOpacity = (frame >= impactFrame && frame < impactFrame + 14)
    ? interpolate(frame, [impactFrame, impactFrame + 14], [0.65, 0])
    : 0;
  const dustScale = interpolate(frame, [impactFrame, impactFrame + 14], [0.4, 1.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Zipper pull coordinates
  const zipperTopY = coatCurrentNeckY + 5;
  const zipperBottomY = coatCurrentNeckY + 262;
  const currentZipY = zipperTopY + zipProgress * (zipperBottomY - zipperTopY);

  // Right hand unzipping reach motion (Frames 34 - 52)
  const handReachProgress = interpolate(frame, [reachStart, reachEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const handZipFollow = frame >= zipStart ? (currentZipY - zipperTopY) : 0;
  const unzippingHandX = interpolate(handReachProgress, [0, 1], [initialStickmanX + 118, initialStickmanX]);
  const unzippingHandY = interpolate(handReachProgress, [0, 1], [neckY + 172, zipperTopY]) + handZipFollow;

  // While wearing the coat (frame < dropStart), hide bare stickman arms
  const hideBareArms = frame < dropStart;

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s20" />

      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateY(${impactShakeY}px)` }}
      >
        <defs>
          {/* Heavy coat fabric shadow gradient */}
          <linearGradient id="heavy-coat-shading" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Silver zipper metal shine */}
          <linearGradient id="metal-zipper" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Ground contact shadow */}
          <radialGradient id="floor-shadow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.32" />
            <stop offset="70%" stopColor="#0F172A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ================= 1. MODULAR TILED FLOOR (EDGE-TO-EDGE) ================= */}
        <ModularFloor
          floorY={floorY}
          variant="perspective"
          tileColorEven="#FFFFFF"
          tileColorOdd="#E2E8F0"
          strokeColor="#CBD5E1"
          strokeWidth={1.8}
          baselineColor="#0F172A"
          baselineWidth={6}
          numRows={5}
          numCols={22}
          showShadow={true}
          id="s20-modular-floor"
        />

        {/* Floor Shadow Under Discarded Coat Pile (Stays at x = 960) */}
        {frame >= dropStart && (
          <ellipse
            cx={initialStickmanX}
            cy={floorY + 2}
            rx={120 * (frame >= impactFrame ? 1.2 : 0.8)}
            ry="18"
            fill="url(#floor-shadow-grad)"
          />
        )}

        {/* Dynamic Floor Shadow Under Stickman (Moves as he steps out) */}
        <ellipse
          cx={stickmanX}
          cy={floorY + 2}
          rx={frame < dropStart ? 110 : 70}
          ry="14"
          fill="url(#floor-shadow-grad)"
        />

        {/* ================= 2. IMPACT DUST PUFFS ON FLOOR ================= */}
        {dustOpacity > 0.02 && (
          <g opacity={dustOpacity} transform={`translate(${initialStickmanX}, ${floorY}) scale(${dustScale})`}>
            <circle cx="-130" cy="-12" r="16" fill="#94A3B8" />
            <circle cx="-100" cy="-20" r="22" fill="#CBD5E1" />
            <circle cx="-70" cy="-10" r="14" fill="#E2E8F0" />
            <circle cx="70" cy="-10" r="14" fill="#E2E8F0" />
            <circle cx="100" cy="-20" r="22" fill="#CBD5E1" />
            <circle cx="130" cy="-12" r="16" fill="#94A3B8" />
          </g>
        )}

        {/* ================= 3. BACK PUFFY COLLAR (BEHIND NECK) ================= */}
        {frame < dropStart && (
          <path
            d={`
              M ${initialStickmanX - 75} ${coatCurrentNeckY}
              C ${initialStickmanX - 65} ${coatCurrentNeckY - 38} ${initialStickmanX - 30} ${coatCurrentNeckY - 48} ${initialStickmanX} ${coatCurrentNeckY - 48}
              C ${initialStickmanX + 30} ${coatCurrentNeckY - 48} ${initialStickmanX + 65} ${coatCurrentNeckY - 38} ${initialStickmanX + 75} ${coatCurrentNeckY}
              Z
            `}
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="6"
            strokeLinejoin="round"
          />
        )}

        {/* ================= 4. CANONICAL STICKMAN ================= */}
        <g id="stickman-character">
          <CuratedStickman
            x={stickmanX}
            y={floorY - stickmanStepBob}
            scale={1.05}
            pose={stickmanPose}
            slumpProgress={slumpProgress}
            eyes={stickmanEyes}
            mouth={stickmanMouth}
            showSweat={frame < freezeFrame}
            armLeft={hideBareArms ? <g id="hidden-left-arm" /> : undefined}
            armRight={hideBareArms ? <g id="hidden-right-arm" /> : undefined}
            frame={frame}
          />
        </g>

        {/* ================= 5. OVERSIZED HEAVY GREY WINTER COAT ================= */}

        {/* A. WORN / UNZIPPED / FALLING COAT (Before it flattens into a pile) */}
        {frame < impactFrame && (
          <g
            id="oversized-winter-coat"
            transform={`translate(${initialStickmanX}, ${coatCurrentNeckY})`}
          >
            {/* Left Coat Flap & Left Bulky Sleeve */}
            <g transform={`rotate(${-flapSpread}, -65, 10)`}>
              {/* Bulky thick left sleeve draping down */}
              <path
                d="M -70 5 C -120 20 -150 60 -140 135 C -135 170 -105 175 -85 165 C -75 140 -75 90 -65 35 Z"
                fill="#334155"
                stroke="#1E293B"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              {/* Left Sleeve Cuff */}
              <ellipse cx="-112" cy="155" rx="24" ry="12" fill="#1E293B" stroke="#0F172A" strokeWidth="4" transform="rotate(-15 -112 155)" />
              {/* Left Hand peeking out of sleeve cuff */}
              <circle cx="-118" cy="172" r="10" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />

              {/* Left coat front body shell */}
              <path
                d="M -65 0 C -95 30 -115 90 -110 160 C -105 230 -80 265 -2 265 L -2 5 C -25 0 -50 0 -65 0 Z"
                fill="url(#heavy-coat-shading)"
                stroke="#1E293B"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              {/* Quilted puffy baffle horizontal seams */}
              <line x1="-105" y1="65" x2="-2" y2="65" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
              <line x1="-108" y1="130" x2="-2" y2="130" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
              <line x1="-95" y1="195" x2="-2" y2="195" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* Right Coat Flap & Right Bulky Sleeve */}
            <g transform={`rotate(${flapSpread}, 65, 10)`}>
              {/* Bulky thick right sleeve draping down */}
              <path
                d="M 70 5 C 120 20 150 60 140 135 C 135 170 105 175 85 165 C 75 140 75 90 65 35 Z"
                fill="#334155"
                stroke="#1E293B"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              {/* Right Sleeve Cuff */}
              <ellipse cx="112" cy="155" rx="24" ry="12" fill="#1E293B" stroke="#0F172A" strokeWidth="4" transform="rotate(15 112 155)" />
              {/* Right Hand peeking out of sleeve cuff (when not unzipping) */}
              {frame < reachStart && (
                <circle cx="118" cy="172" r="10" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
              )}

              {/* Right coat front body shell */}
              <path
                d="M 65 0 C 95 30 115 90 110 160 C 105 230 80 265 2 265 L 2 5 C 25 0 50 0 65 0 Z"
                fill="url(#heavy-coat-shading)"
                stroke="#1E293B"
                strokeWidth="6"
                strokeLinejoin="round"
              />
              {/* Quilted puffy baffle horizontal seams */}
              <line x1="2" y1="65" x2="105" y2="65" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
              <line x1="2" y1="130" x2="108" y2="130" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
              <line x1="2" y1="195" x2="95" y2="195" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* Front Puffy Collar (Wrapping snugly under chin) */}
            <path
              d="M -70 0 C -40 18 -15 20 0 20 C 15 20 40 18 70 0 C 50 -14 25 -18 0 -18 C -25 -18 -50 -14 -70 0 Z"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Heavy Front Center Zipper Line */}
            {zipProgress < 0.96 && (
              <g id="zipper-track">
                {/* Closed bottom zipper line */}
                <line
                  x1="0"
                  y1={5 + zipProgress * 257}
                  x2="0"
                  y2="265"
                  stroke="url(#metal-zipper)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Shiny metallic slider pull tab */}
                <g transform={`translate(0, ${5 + zipProgress * 257})`}>
                  <rect x="-6" y="-7" width="12" height="14" rx="2" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
                  <path d="M -3 7 L 3 7 L 2 18 L -2 18 Z" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
                </g>
              </g>
            )}

            {/* Downward Gravity Weight Indicator Arrows (Frames 0 - 32 only) */}
            {isBreathingBurden && (
              <g opacity="0.3" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M -70 280 L -70 305 M -77 298 L -70 305 L -63 298" />
                <path d="M 0 285 L 0 310 M -7 303 L 0 310 L 7 303" />
                <path d="M 70 280 L 70 305 M 63 298 L 70 305 L 77 298" />
              </g>
            )}
          </g>
        )}

        {/* Right arm unzipping gesture (Frames 34 - 52) */}
        {frame >= reachStart && frame < dropStart && (
          <g id="unzipping-right-arm" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" fill="none">
            <path
              d={`
                M ${initialStickmanX + 70} ${neckY + 30}
                Q ${initialStickmanX + 60} ${unzippingHandY + 20}
                ${unzippingHandX} ${unzippingHandY}
              `}
            />
            {/* Hand gripping slider */}
            <circle
              cx={unzippingHandX}
              cy={unzippingHandY}
              r="10"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="5"
            />
          </g>
        )}

        {/* B. CRUMPLED HEAVY COAT PILE (After landing on floor at Frame 65+) */}
        {frame >= impactFrame && (
          <g
            id="crumpled-coat-pile"
            transform={`translate(${initialStickmanX}, ${floorY})`}
          >
            {/* Flat squashed fabric heap */}
            <path
              d={`
                M ${-pileWidth * 0.5} 0
                C ${-pileWidth * 0.45} ${-65 * pileSquash} ${-pileWidth * 0.25} ${-85 * pileSquash} 0 ${-85 * pileSquash}
                C ${pileWidth * 0.25} ${-85 * pileSquash} ${pileWidth * 0.45} ${-65 * pileSquash} ${pileWidth * 0.5} 0
                Z
              `}
              fill="url(#heavy-coat-shading)"
              stroke="#1E293B"
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* Flattened wrinkled sleeves spilling onto the floor */}
            <path
              d={`M ${-pileWidth * 0.48} 0 C ${-pileWidth * 0.6} ${-20 * pileSquash} ${-pileWidth * 0.55} -4 ${-pileWidth * 0.38} 0`}
              fill="#334155"
              stroke="#1E293B"
              strokeWidth="5"
            />
            <path
              d={`M ${pileWidth * 0.48} 0 C ${pileWidth * 0.6} ${-20 * pileSquash} ${pileWidth * 0.55} -4 ${pileWidth * 0.38} 0`}
              fill="#334155"
              stroke="#1E293B"
              strokeWidth="5"
            />

            {/* Crumpled fabric fold creases and shadow lines */}
            <path
              d={`M ${-pileWidth * 0.35} ${-25 * pileSquash} Q ${-pileWidth * 0.15} ${-60 * pileSquash} ${pileWidth * 0.05} ${-30 * pileSquash}`}
              stroke="#1E293B"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d={`M ${-pileWidth * 0.1} ${-20 * pileSquash} Q ${pileWidth * 0.15} ${-50 * pileSquash} ${pileWidth * 0.35} ${-20 * pileSquash}`}
              stroke="#1E293B"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Discarded open collar and unzipped metal slider visible in the heap */}
            <path
              d={`M -25 ${-70 * pileSquash} Q 0 ${-85 * pileSquash} 30 ${-75 * pileSquash}`}
              stroke="#0F172A"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <rect
              x="-6"
              y={-45 * pileSquash}
              width="12"
              height="10"
              rx="2"
              fill="#FFFFFF"
              stroke="#334155"
              strokeWidth="2.5"
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
