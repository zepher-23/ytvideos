import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground, CuratedStickman } from "../../shared";

/**
 * Scene 19: Sharp, Violent Break from Baseline
 * 
 * Audio Sync: [00:01:02,543 --> 00:01:06,863]
 * "It is a sharp, violent break from your baseline functioning."
 * 
 * Choreography:
 * 1. Frames 0-16: A perfectly straight horizontal line animates in from left to right across the screen.
 * 2. Frames 12-24: Stickman drops in from above, landing firmly on the line with physical bounce & settles peacefully.
 * 3. Frames 24-37: Stickman stands peacefully on top of the calm line.
 * 4. Frames 38-52: The line turns harsh red and starts to shake violently with growing intensity and high-frequency ripples.
 * 5. Frame 53+: The line physically shatters like glass into flying, tumbling crystal shards.
 * 6. Frames 53-130: Stickman drops into the empty space below, plunging down into the void.
 */
export const Scene19_SharpViolentBreak = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const baselineY = 660;
  const stickmanX = 960;

  // === TIMELINE MILESTONES ===
  const lineDrawDuration = 16;  // Line draws left -> right
  const dropStartFrame = 12;    // Stickman starts falling from sky
  const landFrame = 24;         // Stickman lands on the line
  const shakeStartFrame = 38;   // Line turns red and begins shaking
  const shatterFrame = 53;      // Line physically shatters like glass

  const isDrawing = frame < lineDrawDuration;
  const isDroppingIn = frame >= dropStartFrame && frame < landFrame;
  const isPeaceful = frame >= landFrame && frame < shakeStartFrame;
  const isShaking = frame >= shakeStartFrame && frame < shatterFrame;
  const isShattered = frame >= shatterFrame;

  // === 1. HORIZONTAL LINE DRAW-IN (Left to Right) ===
  const lineEndX = interpolate(frame, [0, lineDrawDuration], [0, 1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === 2. LINE VIOLENT SHAKE & FRACTURE SPIKE (Frames 38 to 52) ===
  const shakeProgress = interpolate(frame, [shakeStartFrame, shatterFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shakeIntensity = isShaking ? interpolate(shakeProgress, [0, 1], [3, 24]) : 0;
  const globalShakeY = isShaking
    ? Math.sin((frame - shakeStartFrame) * 4.2) * (shakeIntensity * 0.5)
    : (frame >= shatterFrame && frame < shatterFrame + 10)
    ? Math.sin((frame - shatterFrame) * 3.5) * (12 - (frame - shatterFrame))
    : 0;

  // Jagged rippling spike vertices across the ENTIRE line while shaking
  const jitterA = isShaking ? Math.sin(frame * 28) * (shakeIntensity * 0.8) : 0;
  const jitterB = isShaking ? Math.cos(frame * 22) * (shakeIntensity * 0.9) : 0;

  const shakingPoints = useMemo(() => {
    const pts = [];
    const segments = 28;
    for (let s = 0; s <= segments; s++) {
      const px = (s / segments) * 1920;
      const distCenter = Math.abs(px - 960);
      const centerFactor = Math.max(0.3, 1 - distCenter / 1100);
      const wave = Math.sin(s * 2.4 + frame * 0.9) * shakeIntensity * 3.8 * centerFactor;
      const jitter = (s % 2 === 0 ? jitterA : -jitterB) * centerFactor;
      pts.push({ x: px, y: baselineY + wave + jitter });
    }
    return pts;
  }, [baselineY, frame, isShaking, jitterA, jitterB, shakeIntensity]);

  const shakingPathD = shakingPoints
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`)
    .join(" ");

  // === 3. DETERMINISTIC BROKEN LINE SEGMENTS (Line Shatters Like a Line) ===
  const lineFragments = useMemo(() => {
    const list = [];
    const count = 52;
    for (let i = 0; i < count; i++) {
      const progress = i / (count - 1);
      const originX = 25 + progress * 1870; // Spans entire 1920px baseline
      const sinOffset = Math.sin(progress * Math.PI * 6) * 30;
      const originY = baselineY + sinOffset;

      const dx = originX - 960;
      // Scatter outward horizontally away from impact center
      const vx = (dx / 28) + (i % 2 === 0 ? 3.2 : -3.2);
      // Initial vertical pop, then pulled down by gravity
      const vy = -4 - (Math.abs(Math.sin(i * 1.6)) * 11);
      // Rapid tumbling rotation
      const rotSpeed = (i % 2 === 0 ? 1 : -1) * (7 + (i % 5) * 3.5);
      // Varying line segment lengths and weights
      const length = 22 + (i % 7) * 6; // 22px to 58px long
      const strokeWidth = 6 + (i % 3); // 6px to 8px
      const color = i % 3 === 0 ? "#DC2626" : i % 3 === 1 ? "#EF4444" : "#B91C1C";

      list.push({
        id: i,
        originX,
        originY,
        vx,
        vy,
        rotSpeed,
        length,
        strokeWidth,
        color,
      });
    }
    return list;
  }, [baselineY]);

  // === 4. STICKMAN KINEMATICS: DROP FROM ABOVE -> PEACEFUL -> SHOCKED -> DROP BELOW ===
  let stickmanY = baselineY;
  let stickmanRotation = 0;
  let recoilY = 0;
  let pose = "idle";
  let eyes = "normal";
  let mouth = "smile";

  if (frame < dropStartFrame) {
    // Hidden above the screen before dropping
    stickmanY = -250;
  } else if (isDroppingIn) {
    // Dropping down from above
    const dropT = interpolate(frame, [dropStartFrame, landFrame], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    // Accelerating downward
    const dropY = interpolate(dropT * dropT, [0, 1], [-250, baselineY]);
    stickmanY = dropY;
    pose = "idle";
    eyes = "normal";
    mouth = "neutral";
  } else if (isPeaceful) {
    // Impact landing squash & settle
    const landSpring = spring({
      frame: frame - landFrame,
      fps,
      config: { damping: 12, stiffness: 220, mass: 0.6 },
    });
    const landSquash = interpolate(landSpring, [0, 0.4, 1], [12, -4, 0]);
    stickmanY = baselineY + landSquash;
    pose = "idle";
    eyes = "normal";
    mouth = "smile";
  } else if (isShaking) {
    // Line shaking violently beneath his feet: shock, panic, vibration
    pose = "shock";
    eyes = "shock";
    mouth = "shock";
    recoilY = -shakeIntensity * 1.6 + Math.sin((frame - shakeStartFrame) * 5) * 4;
    stickmanRotation = Math.sin((frame - shakeStartFrame) * 4.5) * 4;
  } else if (isShattered) {
    // Freefall acceleration dropping down below into empty space
    const fallTime = frame - shatterFrame;
    const gravity = 1.18;
    const fallDistance = 0.5 * gravity * fallTime * fallTime;
    stickmanY = baselineY + fallDistance;
    stickmanRotation = Math.min(32, fallTime * 1.15);
    pose = "shock";
    eyes = "shock";
    mouth = "shock";
  }

  // Floor shadow scale (grows when landing, disappears on shatter)
  const shadowScale = (frame >= dropStartFrame && frame < landFrame)
    ? interpolate(frame, [dropStartFrame, landFrame], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : (frame >= landFrame && frame < shatterFrame)
    ? 1
    : 0;

  // Shatter flash impact
  const shatterFlashOpacity = (frame >= shatterFrame && frame < shatterFrame + 6)
    ? interpolate(frame - shatterFrame, [0, 5], [0.8, 0])
    : 0;

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s19" />

      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateY(${globalShakeY}px)` }}
      >
        <defs>
          {/* Intense red laser glow for the shaking spike */}
          <filter id="shake-spike-glow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================= VERTICAL SPEED LINES (WHILE DROPPING BELOW) ================= */}
        {isShattered && (
          <g stroke="#94A3B8" strokeWidth="3" opacity="0.65" strokeDasharray="30 50">
            <line x1="880" y1="400" x2="880" y2="1200" strokeDashoffset={-frame * 36} />
            <line x1="940" y1="300" x2="940" y2="1200" strokeDashoffset={-frame * 44} />
            <line x1="1000" y1="350" x2="1000" y2="1200" strokeDashoffset={-frame * 40} />
            <line x1="1060" y1="420" x2="1060" y2="1200" strokeDashoffset={-frame * 48} />
          </g>
        )}

        {/* ================= 1. THE HORIZONTAL BASELINE ================= */}

        {/* PHASE A & B: INTACT LINE (Drawing in left -> right, then calm) */}
        {!isShattered && !isShaking && (
          <line
            x1="0"
            y1={baselineY}
            x2={lineEndX}
            y2={baselineY}
            stroke="#0F172A"
            strokeWidth="7"
            strokeLinecap="round"
          />
        )}

        {/* PHASE C: WHOLE LINE TURNS RED & SHAKES VIOLENTLY (Frames 38 to 52) */}
        {isShaking && (
          <g>
            {/* Outer red shock glow */}
            <path
              d={shakingPathD}
              fill="none"
              stroke="#EF4444"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="miter"
              opacity="0.35"
              filter="url(#shake-spike-glow)"
            />
            {/* Core violent red shaking line */}
            <path
              d={shakingPathD}
              fill="none"
              stroke="#EF4444"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="miter"
            />
            {/* Inner electric white stress highlight */}
            <path
              d={shakingPathD}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="miter"
              opacity="0.9"
            />

            {/* High-frequency stress crackle sparks across line */}
            <g stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round">
              <line x1="930" y1={baselineY - shakeIntensity * 2} x2="900" y2={baselineY - shakeIntensity * 3.5} />
              <line x1="990" y1={baselineY - shakeIntensity * 2} x2="1020" y2={baselineY - shakeIntensity * 3.5} />
              <line x1="750" y1={baselineY - shakeIntensity} x2="720" y2={baselineY - shakeIntensity * 2} />
              <line x1="1170" y1={baselineY - shakeIntensity} x2="1200" y2={baselineY - shakeIntensity * 2} />
            </g>
          </g>
        )}

        {/* PHASE D: WHEN SHATTERED, THE ENTIRE LINE IS GONE (NO STUBS, NO HOLE RECTANGLE - JUST EMPTY SPACE) */}

        {/* ================= 2. BROKEN LINE FRAGMENTS (SHATTERS LIKE A LINE) ================= */}
        {isShattered && (
          <g id="broken-line-fragments">
            {lineFragments.map((f) => {
              const dt = frame - shatterFrame;
              const curX = f.originX + f.vx * dt;
              const curY = f.originY + f.vy * dt + 0.5 * 1.05 * dt * dt;
              const curRot = dt * f.rotSpeed;
              const opacity = interpolate(curY, [660, 1300], [1, 0.2], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <g
                  key={f.id}
                  transform={`translate(${curX}, ${curY}) rotate(${curRot})`}
                  opacity={opacity}
                >
                  {/* Subtle drop shadow of line fragment */}
                  <line
                    x1={-f.length / 2}
                    y1={4}
                    x2={f.length / 2}
                    y2={4}
                    stroke="#000000"
                    strokeWidth={f.strokeWidth}
                    strokeLinecap="round"
                    opacity="0.12"
                  />
                  {/* The broken line segment itself */}
                  <line
                    x1={-f.length / 2}
                    y1={0}
                    x2={f.length / 2}
                    y2={0}
                    stroke={f.color}
                    strokeWidth={f.strokeWidth}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </g>
        )}

        {/* ================= 3. SHATTER IMPACT FLASH ================= */}
        {shatterFlashOpacity > 0.05 && (
          <circle
            cx="960"
            cy={baselineY}
            r="340"
            fill="#FFFFFF"
            opacity={shatterFlashOpacity}
          />
        )}

        {/* ================= 4. FLOOR SHADOW ================= */}
        {shadowScale > 0.01 && (
          <ellipse
            cx={stickmanX}
            cy={baselineY + 4}
            rx={55 * shadowScale}
            ry={10 * shadowScale}
            fill="#000000"
            opacity={0.18 * shadowScale}
          />
        )}

        {/* ================= 5. CANONICAL STICKMAN ================= */}
        {frame >= dropStartFrame && (
          <g
            transform={`translate(0, ${recoilY}) rotate(${stickmanRotation}, ${stickmanX}, ${stickmanY - 140})`}
          >
            <CuratedStickman
              x={stickmanX}
              y={stickmanY}
              scale={1.22}
              pose={pose}
              eyes={eyes}
              mouth={mouth}
              showExclamation={isShaking}
              showSweat={isShaking || isShattered}
              frame={frame}
            />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
