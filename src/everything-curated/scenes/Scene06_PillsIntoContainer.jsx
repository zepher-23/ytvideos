import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SvgPill, SvgPillContainerBack, SvgPillContainerFront, GridBackground } from "../../shared";

/**
 * Scene 06: Pills Cluster Zoom Out & Funnel Into Pill Container
 * 
 * Duration: 5.0 seconds (150 frames @ 30fps, 660–810)
 * Visual Choreography:
 * 1. Seamless continuity from Scene 05: starts with the full pill cluster
 *    centered at (960, 540) with red & blue capsules and "WRONG" labels (frames 0 to 10).
 * 2. Camera zoom out: the entire pill cluster scales down and shifts slightly
 *    above center to y ~ 360 (frames 10 to 40).
 * 3. In tandem, the center pill smoothly shrinks down to match the small pills,
 *    making ALL pills the EXACT same size (frames 10 to 40).
 * 4. In tandem with zoom out, the "WRONG" labels fade out smoothly to 0 (frames 10 to 35).
 * 5. Pill container (user's second version, transparent yellow plastic texture) slides in
 *    from the left to center stage (960, 720) (frames 25 to 55).
 * 6. All pills funnel down one by one into the container mouth and collect INSIDE the
 *    bottle behind the front translucent plastic wall (frames 50 to 110).
 * 7. Clean ending hold showing all pills safely resting inside the transparent yellow
 *    plastic container on the large white grid background (frames 110 to 150).
 */
export const Scene06_PillsIntoContainer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // 1. INITIAL PILL POSITIONS (Identical to Scene 05 End Frame)
  // =========================================================================
  // 1. INITIAL PILL POSITIONS & EXACT SCALES (Identical to Scene 05 End Frame)
  // Ensures 100% seamless continuity with zero abrupt size or position jumps!
  // =========================================================================
  const mainPillInitial = {
    x: 960,
    y: 540,
    rot: -21,
    initialScale: 2.15,
  };

  const smallPillsInitial = [
    { id: 1,  x: 620,  y: 292, rot: -35, initialScale: 0.684,  delay: 28 },
    { id: 2,  x: 1300, y: 290, rot: 45,  initialScale: 0.756,  delay: 30 },
    { id: 3,  x: 530,  y: 559, rot: 18,  initialScale: 0.6336, delay: 32 },
    { id: 4,  x: 1400, y: 557, rot: -50, initialScale: 0.6624, delay: 34 },
    { id: 5,  x: 740,  y: 807, rot: -22, initialScale: 0.612,  delay: 36 },
    { id: 6,  x: 1200, y: 807, rot: 35,  initialScale: 0.684,  delay: 38 },
    { id: 7,  x: 960,  y: 218, rot: -8,  initialScale: 0.720,  delay: 40 },
    { id: 8,  x: 1440, y: 410, rot: -25, initialScale: 0.612,  delay: 42 },
    { id: 9,  x: 480,  y: 411, rot: 30,  initialScale: 0.6192, delay: 44 },
    { id: 10, x: 960,  y: 863, rot: 15,  initialScale: 0.648,  delay: 46 },
  ];

  // Resting positions settled comfortably inside the bottle
  // Kept well above the bottom floor (relY <= 145) to ensure zero pills poke out the bottom!
  const insidePositions = [
    { relX: 0,   relY: 135, rot: -8,  scale: 0.44 }, // Main pill at bottom center
    { relX: -52, relY: 142, rot: 20,  scale: 0.43 }, // Bottom left
    { relX: 54,  relY: 138, rot: -24, scale: 0.43 }, // Bottom right
    { relX: -28, relY: 105, rot: -14, scale: 0.42 }, // Mid left
    { relX: 30,  relY: 100, rot: 16,  scale: 0.42 }, // Mid right
    { relX: -60, relY: 70,  rot: 32,  scale: 0.41 }, // Stack left
    { relX: 58,  relY: 66,  rot: -18, scale: 0.41 }, // Stack right
    { relX: 0,   relY: 62,  rot: 6,   scale: 0.41 }, // Stack center
    { relX: -30, relY: 28,  rot: -20, scale: 0.40 }, // Upper left
    { relX: 32,  relY: 24,  rot: 24,  scale: 0.40 }, // Upper right
    { relX: 2,   relY: -10, rot: -8,  scale: 0.39 }, // Topmost pill
  ];

  // =========================================================================
  // 2. CAMERA ZOOM OUT & CLUSTER SHIFT (Frames 6 to 24)
  // Slightly faster timing: completes within 18 frames!
  // =========================================================================
  const zoomSpring = frame >= 6
    ? spring({
        frame: frame - 6,
        fps,
        config: { damping: 15, stiffness: 120, mass: 0.75 },
      })
    : 0;

  // Cluster spread: shrinks from 1.0 down to 0.38
  const clusterSpread = interpolate(zoomSpring, [0, 1], [1.0, 0.38]);
  // Cluster vertical shift: moves center from 540 up to 265 (neatly above bottle top)
  const clusterShiftY = interpolate(zoomSpring, [0, 1], [0, -275]);

  // UNIFORM PILL SIZING ON ZOOM OUT:
  // Starts at EXACT Scene 05 scales on frame 0 (no abrupt jump!).
  // Smoothly converges to 0.50 so all 11 pills become the same size.
  const targetUniformScale = 0.50;
  const mainPillScale = interpolate(zoomSpring, [0, 1], [mainPillInitial.initialScale, targetUniformScale]);

  // Labels fade out smoothly during zoom out (Frames 6 to 18)
  const labelOpacity = interpolate(zoomSpring, [0, 0.6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // 3. PILL CONTAINER SLIDE-IN FROM LEFT (Frames 12 to 28)
  // Faster arrival so the container is waiting as pills start dropping!
  // =========================================================================
  const bottleSpring = frame >= 12
    ? spring({
        frame: frame - 12,
        fps,
        config: { damping: 14, stiffness: 130, mass: 0.75 },
      })
    : 0;

  const bottleBaseX = 960;
  const bottleBaseY = 740;
  const bottleCenterY = 540; // Screen vertical center
  const bottleScale = 0.95;

  // =========================================================================
  // CONTAINER MOVE TO SCREEN CENTER (Frames 62 to 98)
  // After pills are almost inside, the container smoothly glides up to center stage (y: 540)
  // =========================================================================
  const centerStart = 62;
  const centerSpring = frame >= centerStart
    ? spring({
        frame: frame - centerStart,
        fps,
        config: { damping: 16, stiffness: 65, mass: 0.9 },
      })
    : 0;

  const bottleX = interpolate(bottleSpring, [0, 1], [-500, bottleBaseX]);
  const curBottleY = interpolate(centerSpring, [0, 1], [bottleBaseY, bottleCenterY]);

  // The mouth opening of the bottle in world coordinates (top rim under cap)
  const bottleMouthWorld = { x: bottleX, y: curBottleY - 245 * bottleScale };
  // Bottle interior floor coordinate: safety ceiling to prevent any bounce below container bottom
  const bottleFloorY = curBottleY + 215 * bottleScale;

  // =========================================================================
  // 4. MAIN PILL FUNNEL ANIMATION (Starts at frame 26)
  // =========================================================================
  const mainPillStart = 26;
  const mainPillDropSpring = frame >= mainPillStart
    ? spring({
        frame: frame - mainPillStart,
        fps,
        config: { damping: 16, stiffness: 140, mass: 0.7 },
      })
    : 0;

  const mainClusterX = mainPillInitial.x;
  const mainClusterY = mainPillInitial.y + clusterShiftY;

  // Trajectory: from cluster -> into bottle mouth -> down to bottle interior floor
  const mainCurX = mainPillDropSpring > 0
    ? interpolate(
        mainPillDropSpring,
        [0, 0.55, 1],
        [mainClusterX, bottleMouthWorld.x, bottleBaseX + insidePositions[0].relX]
      )
    : mainClusterX;

  const rawMainCurY = mainPillDropSpring > 0
    ? interpolate(
        mainPillDropSpring,
        [0, 0.55, 1],
        [mainClusterY, bottleMouthWorld.y, curBottleY + insidePositions[0].relY]
      )
    : mainClusterY;
  const mainCurY = Math.min(rawMainCurY, bottleFloorY);

  const mainCurScale = interpolate(
    mainPillDropSpring,
    [0, 0.55, 1],
    [mainPillScale, mainPillScale * 0.9, insidePositions[0].scale]
  );
  const mainCurRot = interpolate(
    mainPillDropSpring,
    [0, 0.55, 1],
    [mainPillInitial.rot, 80, insidePositions[0].rot]
  );

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans">
      {/* Canonical White Grid Background */}
      <GridBackground theme="white" id="grid-s6" />

      {/* Main SVG Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* ============================================================== */}
        {/* 1. PILL CONTAINER BACK WALL (Slides in from Left, centers up)  */}
        {/* ============================================================== */}
        <SvgPillContainerBack
          x={bottleX}
          y={curBottleY}
          scale={bottleScale}
          id="scene06-bottle"
        />

        {/* ============================================================== */}
        {/* 2. ALL 11 PILLS (Rendered between back and front bottle walls) */}
        {/* ============================================================== */}
        {/* Small Pills */}
        {smallPillsInitial.map((p, idx) => {
          const dropSpring = frame >= p.delay
            ? spring({
                frame: frame - p.delay,
                fps,
                config: { damping: 16, stiffness: 140, mass: 0.7 },
              })
            : 0;

          const inside = insidePositions[idx + 1];

          // Position in tightened cluster just above the container before dropping
          const startClusterX = 960 + (p.x - 960) * clusterSpread;
          const startClusterY = (540 + clusterShiftY) + (p.y - 540) * clusterSpread;

          // Individual pill scale: starts at p.initialScale (exact match with Scene 05)
          // and smoothly transitions during zoom out to targetUniformScale (0.50)
          const pillBaseScale = interpolate(
            zoomSpring,
            [0, 1],
            [p.initialScale, targetUniformScale]
          );

          // Trajectory: stays in cluster until dropSpring starts, then funnels into bottle
          const curX = dropSpring > 0
            ? interpolate(
                dropSpring,
                [0, 0.55, 1],
                [startClusterX, bottleMouthWorld.x + ((idx % 3) - 1) * 16, bottleBaseX + inside.relX]
              )
            : startClusterX;

          const rawCurY = dropSpring > 0
            ? interpolate(
                dropSpring,
                [0, 0.55, 1],
                [startClusterY, bottleMouthWorld.y, curBottleY + inside.relY]
              )
            : startClusterY;
          const curY = Math.min(rawCurY, bottleFloorY);

          const curScale = interpolate(
            dropSpring,
            [0, 0.55, 1],
            [pillBaseScale, pillBaseScale * 0.9, inside.scale]
          );
          const curRot = interpolate(
            dropSpring,
            [0, 0.6, 1],
            [p.rot, 75 + (idx % 2 === 0 ? 12 : -12), inside.rot]
          );

          return (
            <SvgPill
              key={`small-pill-s6-${p.id}`}
              id={`small-pill-s6-${p.id}`}
              x={curX}
              y={curY}
              scale={curScale}
              rotation={curRot}
              variant="pill2"
              label={labelOpacity > 0.05 ? "WRONG" : ""}
              labelColor={`rgba(255, 255, 255, ${labelOpacity})`}
            />
          );
        })}

        {/* Main Hero Pill */}
        <SvgPill
          id="main-hero-pill-s6"
          x={mainCurX}
          y={mainCurY}
          scale={mainCurScale}
          rotation={mainCurRot}
          variant="pill2"
          label={labelOpacity > 0.05 ? "WRONG" : ""}
          labelColor={`rgba(255, 255, 255, ${labelOpacity})`}
        />

        {/* ============================================================== */}
        {/* 3. PILL CONTAINER FRONT WALL (Overlays the pills inside)       */}
        {/* Translucent yellow plastic + specular highlights + Rx label    */}
        {/* ============================================================== */}
        <SvgPillContainerFront
          x={bottleX}
          y={curBottleY}
          scale={bottleScale}
          id="scene06-bottle"
        />
      </svg>
    </AbsoluteFill>
  );
};
