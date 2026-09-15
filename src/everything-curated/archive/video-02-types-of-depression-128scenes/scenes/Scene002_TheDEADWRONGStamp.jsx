import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, GreyCloud } from "../../shared";

/**
 * Scene 2: The "DEAD WRONG" Stamp
 * Duration: 4 seconds (120 frames)
 * 
 * - Environment: Deep navy blue (#0F172A) with subtle rising grid
 * - Transition: Camera whip-pan downwards
 * - Beginning: Stickman still standing under the raining cloud
 * - Action/Climax: Massive glowing neon red "X" slams down onto the scene,
 *   completely obscuring stickman & cloud. Text "DEAD WRONG" slams in below.
 * - Ending/Hold: The X pulses once with a neon bloom, holding to frame 120.
 */
export const Scene002_TheDEADWRONGStamp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Camera whip-pan entrance downwards (frames 0 to 14)
  const whipPanY = interpolate(frame, [0, 12], [-140, 0], {
    extrapolateRight: "clamp",
  });
  const whipOpacity = interpolate(frame, [0, 6], [0.3, 1], {
    extrapolateRight: "clamp",
  });

  // 2. Rising background grid
  const gridOffsetY = (frame * 0.75) % 60;

  // 3. Stickman & cloud initial position (frames 0 to 30)
  const stickmanShock = frame >= 32;

  // 4. Massive Red "X" Slam entrance (triggers at frame 26)
  const slamSpring = spring({
    frame: frame - 26,
    fps,
    config: { damping: 11, stiffness: 220, mass: 0.8 },
  });

  // Scale drops from 3.8 down to 1.0 with a violent impact bounce
  const xSlamScale = interpolate(slamSpring, [0, 1], [3.8, 1]);
  const xOpacity = interpolate(frame, [26, 29], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screen impact shake on impact (frames 32 to 46)
  const isShaking = frame >= 32 && frame <= 46;
  const shakeIntensity = interpolate(frame, [32, 46], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = isShaking ? Math.sin(frame * 3.1) * shakeIntensity : 0;
  const shakeY = isShaking ? Math.cos(frame * 2.7) * shakeIntensity : 0;

  // 5. "DEAD WRONG" Text slam entrance (triggers slightly after X, frame 32)
  const textSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.4, 1]);
  const textOpacity = interpolate(frame, [32, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 6. Ending Pulse of the "X" (frames 70 to 95)
  const pulsePhase = interpolate(frame, [70, 92], [0, Math.PI], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulseScale = frame >= 70 && frame <= 92 ? Math.sin(pulsePhase) * 0.08 : 0;
  const pulseGlow = frame >= 70 && frame <= 92 ? Math.sin(pulsePhase) * 20 : 0;

  return (
    <AbsoluteFill className="bg-[#0F172A] overflow-hidden select-none font-sans">
      {/* Camera Viewport Wrapper with Whip-pan & Screen Shake */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `translate(${shakeX}px, ${whipPanY + shakeY}px)`,
          opacity: whipOpacity,
        }}
      >
        {/* Subtle Background Grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-s2"
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
          <rect width="100%" height="100%" fill="url(#grid-s2)" />
        </svg>

        {/* Scene 1 Residual Text: "DEPRESSION" (fades out as X hits) */}
        <div
          className="absolute top-24 left-0 right-0 flex justify-center items-center pointer-events-none"
          style={{
            opacity: interpolate(frame, [25, 34], [1, 0.15], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="px-10 py-3 rounded-2xl bg-[#1E293B]/70 border border-[#334155]/60 backdrop-blur-md shadow-2xl">
            <h1 className="text-white text-6xl font-black tracking-widest uppercase m-0 leading-none">
              DEPRESSION
            </h1>
          </div>
        </div>

        {/* Underlying SVG Stage: Stickman & Cloud */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          {/* Ground shadow */}
          <ellipse
            cx={960}
            cy={785}
            rx={90}
            ry={16}
            fill="#000000"
            opacity={0.4}
          />

          {/* Stickman under cloud */}
          <g
            opacity={interpolate(frame, [30, 42], [1, 0.3], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          >
            <CuratedStickman
              x={960}
              y={740}
              scale={1.2}
              variant="adult"
              pose={stickmanShock ? "shock" : "defeat"}
              mouth={stickmanShock ? "shock" : "frown"}
              eyes={stickmanShock ? "shock" : "defeat"}
              lookDirection={stickmanShock ? "center" : "down"}
              frame={frame}
            />
          </g>

          {/* Gloomy Rain Cloud */}
          <g
            transform="translate(0, 390)"
            opacity={interpolate(frame, [30, 42], [1, 0.25], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          >
            <GreyCloud x={960} y={0} scale={1.35} />
          </g>
        </svg>

        {/* Climax: Massive Glowing Neon Red "X" Overlay */}
        {frame >= 26 && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: xOpacity,
              transform: `scale(${xSlamScale + pulseScale})`,
            }}
          >
            <svg
              viewBox="0 0 800 800"
              className="w-[720px] h-[720px] overflow-visible"
              style={{
                filter: `drop-shadow(0 0 ${28 + pulseGlow}px #EF4444) drop-shadow(0 0 ${55 + pulseGlow}px rgba(239,68,68,0.75))`,
              }}
            >
              {/* Aggressive Red Neon "X" */}
              <line
                x1="120"
                y1="120"
                x2="680"
                y2="680"
                stroke="#EF4444"
                strokeWidth="56"
                strokeLinecap="round"
              />
              <line
                x1="680"
                y1="120"
                x2="120"
                y2="680"
                stroke="#EF4444"
                strokeWidth="56"
                strokeLinecap="round"
              />

              {/* White core highlight for intense neon tube feel */}
              <line
                x1="120"
                y1="120"
                x2="680"
                y2="680"
                stroke="#FFFFFF"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <line
                x1="680"
                y1="120"
                x2="120"
                y2="680"
                stroke="#FFFFFF"
                strokeWidth="14"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        {/* Text "DEAD WRONG" in bold, jagged neon red container */}
        {frame >= 32 && (
          <div
            className="absolute bottom-24 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6"
            style={{
              opacity: textOpacity,
              transform: `scale(${textScale})`,
            }}
          >
            <div
              className="px-12 py-5 rounded-3xl bg-black/90 border-4 border-[#EF4444] shadow-[0_0_60px_rgba(239,68,68,0.9)]"
            >
              <span
                className="text-[#EF4444] text-7xl md:text-8xl font-black tracking-widest uppercase leading-none block drop-shadow-[0_0_20px_#EF4444]"
                style={{
                  fontFamily: "Impact, Montserrat, sans-serif",
                }}
              >
                DEAD WRONG
              </span>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
