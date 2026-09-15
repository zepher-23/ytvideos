import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, MedicalPill } from "../../shared";

/**
 * Scene 6: The Wrong Drug Choice
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Clinical flowchart space on a dark background (#0F172A)
 * - Beginning: Stickman stands before 3 glowing pills in bubbles (Green, Blue, Yellow).
 * - Action/Climax: Stickman reaches forward for the Blue pill. Green & Yellow pills
 *   instantly shatter and vanish. Blue pill scales up massively and glows intensely.
 * - Ending/Hold: Stickman holds the large glowing Blue pill to frame 180.
 */
export const Scene006_TheWrongDrugChoice = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance transition
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Stickman reaching motion (starts frame 35, full reach by frame 75)
  const reachProgress = interpolate(frame, [35, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3. Green & Yellow Pills Shatter (triggers at frame 62)
  const isShattered = frame >= 62;
  const shatterProgress = interpolate(frame, [62, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bubbleAlpha = isShattered ? interpolate(frame, [62, 70], [1, 0], { extrapolateRight: "clamp" }) : 1;

  // 4. Blue Pill Transformation & Scaling (scales up from frame 62 to 90)
  const blueScaleSpring = spring({
    frame: frame - 62,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const bluePillScale = frame < 62 ? 1.0 : interpolate(blueScaleSpring, [0, 1], [1.0, 2.2]);
  const bluePillX = frame < 62 ? 1260 : interpolate(blueScaleSpring, [0, 1], [1260, 820]);
  const bluePillY = frame < 62 ? 520 : interpolate(blueScaleSpring, [0, 1], [520, 640]);
  const blueGlowRadius = frame < 62 ? 15 : interpolate(blueScaleSpring, [0, 1], [15, 55]);

  // Subtle floating bobbing for pills before selection
  const bob1 = Math.sin(frame * 0.08) * 8;
  const bob2 = Math.cos(frame * 0.09) * 8;
  const bob3 = Math.sin(frame * 0.07 + 1) * 8;

  return (
    <AbsoluteFill className="bg-[#0F172A] overflow-hidden select-none font-sans text-white">
      {/* Background Clinical Flowchart Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s6" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s6)" />
      </svg>

      {/* Top Header Card */}
      <div
        className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6"
        style={{ opacity: enterOpacity }}
      >
        <div className="px-10 py-4 rounded-2xl bg-[#1E293B]/90 border border-[#38BDF8]/40 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase block mb-1">
            PHARMACOLOGICAL BRANCH POINT
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none">
            THE WRONG DRUG CHOICE
          </h1>
        </div>
      </div>

      {/* Main SVG Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Intense Blue Aura for selected pill */}
          <filter id="blue-aura-s6" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation={blueGlowRadius} floodColor="#3B82F6" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* Ground shadow for stickman */}
        <ellipse cx={560} cy={785} rx={95} ry={16} fill="#000000" opacity={0.4} />

        {/* Canonical CuratedStickman reaching right */}
        <CuratedStickman
          x={560}
          y={740}
          scale={1.2}
          variant="adult"
          pose={reachProgress > 0.1 ? "reaching" : "idle"}
          reachDirection="right"
          reachProgress={reachProgress}
          mouth="neutral"
          eyes="normal"
          lookDirection="right"
          frame={frame}
        />

        {/* GREEN PILL (Top Right, x=1080, y=380) */}
        {!isShattered && (
          <g transform={`translate(1080, ${380 + bob1})`} opacity={bubbleAlpha}>
            {/* Bubble Outline */}
            <circle cx="0" cy="0" r="95" fill="#1E293B" fillOpacity="0.5" stroke="#22C55E" strokeWidth="3" />
            <circle cx="-25" cy="-28" r="14" fill="#FFFFFF" opacity="0.3" />
            <MedicalPill
              x={0}
              y={0}
              scale={0.85}
              rotation={-25}
              color1="#22C55E"
              color1Dark="#15803D"
              color2="#FFFFFF"
              color2Dark="#E2E8F0"
              imprint="BUP"
              subImprint="150"
              glowing={true}
              glowColor="#22C55E"
            />
          </g>
        )}

        {/* YELLOW PILL (Bottom Right, x=1080, y=660) */}
        {!isShattered && (
          <g transform={`translate(1080, ${660 + bob3})`} opacity={bubbleAlpha}>
            {/* Bubble Outline */}
            <circle cx="0" cy="0" r="95" fill="#1E293B" fillOpacity="0.5" stroke="#EAB308" strokeWidth="3" />
            <circle cx="-25" cy="-28" r="14" fill="#FFFFFF" opacity="0.3" />
            <MedicalPill
              x={0}
              y={0}
              scale={0.85}
              rotation={25}
              color1="#EAB308"
              color1Dark="#A16207"
              color2="#FFFFFF"
              color2Dark="#E2E8F0"
              imprint="DUL"
              subImprint="60"
              glowing={true}
              glowColor="#EAB308"
            />
          </g>
        )}

        {/* Shatter Particle Shards for Green and Yellow Bubbles */}
        {isShattered && shatterProgress < 1 && (
          <g>
            {/* Green Shards */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              const d = 90 + shatterProgress * 140;
              return (
                <line
                  key={`g-${i}`}
                  x1={1080 + Math.cos(rad) * d}
                  y1={380 + Math.sin(rad) * d}
                  x2={1080 + Math.cos(rad) * (d + 20)}
                  y2={380 + Math.sin(rad) * (d + 20)}
                  stroke="#22C55E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity={1 - shatterProgress}
                />
              );
            })}
            {/* Yellow Shards */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
              const rad = (a * Math.PI) / 180;
              const d = 90 + shatterProgress * 140;
              return (
                <line
                  key={`y-${i}`}
                  x1={1080 + Math.cos(rad) * d}
                  y1={660 + Math.sin(rad) * d}
                  x2={1080 + Math.cos(rad) * (d + 20)}
                  y2={660 + Math.sin(rad) * (d + 20)}
                  stroke="#EAB308"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity={1 - shatterProgress}
                />
              );
            })}
          </g>
        )}

        {/* BLUE PILL (The Chosen Drug - Scaled & Glowing) */}
        <g
          transform={`translate(${bluePillX}, ${bluePillY + (frame < 62 ? bob2 : 0)})`}
          filter="url(#blue-aura-s6)"
        >
          {/* Bubble around blue pill before selection */}
          {frame < 62 && (
            <g>
              <circle cx="0" cy="0" r="105" fill="#1E293B" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="4" />
              <circle cx="-30" cy="-32" r="16" fill="#FFFFFF" opacity="0.4" />
            </g>
          )}

          {/* Canonical 3D MedicalPill */}
          <MedicalPill
            x={0}
            y={0}
            scale={0.9 * bluePillScale}
            rotation={frame < 62 ? -15 : -30}
            color1="#3B82F6"
            color1Dark="#1D4ED8"
            color2="#FFFFFF"
            color2Dark="#E2E8F0"
            imprint="SSRI"
            subImprint="20mg"
            glowing={true}
            glowColor="#3B82F6"
          />
        </g>
      </svg>

      {/* Ending Badge: "UNIPOLAR SSRI MONOTHERAPY" */}
      {frame >= 85 && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
          <div className="px-8 py-3 rounded-2xl bg-blue-950/90 border-2 border-[#3B82F6] shadow-[0_0_35px_rgba(59,130,246,0.6)]">
            <span className="text-[#93C5FD] font-mono text-base font-extrabold tracking-widest uppercase">
              SELECTED: SSRI MONOTHERAPY (UNIPOLAR ASSUMPTION)
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
