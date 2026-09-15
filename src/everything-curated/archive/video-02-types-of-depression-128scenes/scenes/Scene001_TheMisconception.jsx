import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, GreyCloud } from "../../shared";

/**
 * Scene 1: The Misconception
 * Duration: 5 seconds (150 frames)
 * 
 * - Deep navy blue background (#0F172A) with subtle slowly rising grid
 * - Text "DEPRESSION" appears boldly in white
 * - Canonical CuratedStickman stands looking slightly bummed out
 * - Dark rain cloud floats in and hovers above his head, raining soft grey lines
 * - Holds momentarily
 */
export const Scene001_TheMisconception = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Slowly rising subtle grid
  const gridOffsetY = (frame * 0.75) % 60;

  // 2. Text "DEPRESSION" entrance (spring bounce + opacity)
  const textSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const textOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const textScale = interpolate(textSpring, [0, 1], [0.85, 1]);

  // 3. Rain cloud entrance (floats in from top between frames 18 and 60)
  const cloudProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 16, stiffness: 70 },
  });
  const cloudY = interpolate(cloudProgress, [0, 1], [120, 390]);
  const cloudOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cloudBob = Math.sin(frame * 0.07) * 5;

  // 4. Slump progression for stickman as cloud arrives
  const slumpProgress = interpolate(frame, [25, 65], [0.1, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. Rain particles generation (soft grey lines falling from cloud)
  const rainDrops = [
    { x: -75, speed: 11, length: 24, delay: 0 },
    { x: -50, speed: 14, length: 30, delay: 6 },
    { x: -25, speed: 12, length: 22, delay: 12 },
    { x: 0, speed: 15, length: 34, delay: 3 },
    { x: 25, speed: 13, length: 26, delay: 9 },
    { x: 50, speed: 16, length: 32, delay: 15 },
    { x: 75, speed: 12, length: 25, delay: 7 },
    { x: -60, speed: 13, length: 28, delay: 18 },
    { x: -10, speed: 15, length: 30, delay: 21 },
    { x: 40, speed: 14, length: 26, delay: 4 },
    { x: 65, speed: 12, length: 22, delay: 13 },
  ];

  const rainActive = frame >= 35;
  const rainAlpha = interpolate(frame, [35, 55], [0, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#0F172A] overflow-hidden select-none font-sans">
      {/* Background Subtle Rising Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="rising-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(0, -${gridOffsetY})`}
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rising-grid)" />
      </svg>

      {/* Subtle floor vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)",
        }}
      />

      {/* Top Header: "DEPRESSION" (CSS flex-centered container with zero overflow) */}
      <div
        className="absolute top-24 left-0 right-0 flex justify-center items-center pointer-events-none"
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
        }}
      >
        <div className="px-10 py-3 rounded-2xl bg-[#1E293B]/70 border border-[#334155]/60 backdrop-blur-md shadow-2xl">
          <h1 className="text-white text-6xl font-black tracking-widest uppercase m-0 leading-none">
            DEPRESSION
          </h1>
        </div>
      </div>

      {/* Main SVG Stage for Stickman, Cloud & Rain */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* Ground shadow for stickman */}
        <ellipse
          cx={960}
          cy={785}
          rx={90}
          ry={16}
          fill="#000000"
          opacity={0.4}
        />

        {/* Canonical CuratedStickman */}
        <CuratedStickman
          x={960}
          y={740}
          scale={1.2}
          variant="adult"
          pose="defeat"
          mouth="frown"
          eyes="defeat"
          lookDirection="down"
          slumpProgress={slumpProgress}
          frame={frame}
        />

        {/* Rain Cloud hovering above head */}
        <g
          style={{
            opacity: cloudOpacity,
            transform: `translate(0px, ${cloudBob}px)`,
          }}
        >
          <GreyCloud x={960} y={cloudY} scale={1.35} />

          {/* Falling soft grey rain streaks */}
          {rainActive && (
            <g opacity={rainAlpha} stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round">
              {rainDrops.map((drop, idx) => {
                const dropCycle = 30;
                const dropFrame = (frame - 35 + drop.delay) % dropCycle;
                const startY = cloudY + 30 + dropFrame * drop.speed;
                const endY = startY + drop.length;
                const fade = dropFrame > 22 ? interpolate(dropFrame, [22, 29], [1, 0]) : 1;

                if (startY > 770) return null; // Don't clip through ground

                return (
                  <line
                    key={idx}
                    x1={960 + drop.x}
                    y1={startY}
                    x2={960 + drop.x}
                    y2={endY}
                    opacity={fade * 0.75}
                  />
                );
              })}
            </g>
          )}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
