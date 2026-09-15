import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 40: Explosion
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Roaring firestorm continued from Scene 39 (#0B0000).
 * - Characters & Props: Multi-layer flickering vector flames, glowing embers, massive typography slam.
 * - Beginning (0-25f): Firestorm rages full-screen.
 * - Action/Climax (25-80f): "MASSIVE RISK" slams in from deep foreground, causing a violent impact screen shake.
 * - Ending/Hold (80-180f): Text shudders and pulses under glowing neon red aura, flanked by hazard brackets.
 */
export const Scene040_Explosion = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slam Spring for "MASSIVE RISK"
  const slamFrame = Math.max(0, frame - 25);
  const slamSpring = spring({
    frame: slamFrame,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const textScale = frame < 25 ? 0 : interpolate(slamSpring, [0, 1], [2.8, 1]);
  const textOpacity = interpolate(slamFrame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  // Post-slam impact shake at frame 30-55
  const impactAge = Math.max(0, frame - 30);
  const shakeX = frame >= 30 && impactAge < 25 ? Math.sin(impactAge * 2.0) * Math.max(0, 16 - impactAge * 0.7) : 0;
  const shakeY = frame >= 30 && impactAge < 25 ? Math.cos(impactAge * 2.5) * Math.max(0, 14 - impactAge * 0.6) : 0;

  // Secondary shudder at frame 110
  const shudderAge = Math.max(0, frame - 110);
  const shudderX = frame >= 110 && shudderAge < 15 ? Math.sin(shudderAge * 2.8) * 6 : 0;

  // Flame oscillation math
  const f1 = Math.sin(frame * 0.45) * 30;
  const f2 = Math.cos(frame * 0.38 + 1.2) * 35;
  const f3 = Math.sin(frame * 0.52 + 2.5) * 25;

  // Pulsing alert glow
  const glowPulse = 1 + Math.sin(frame * 0.2) * 0.08;

  return (
    <AbsoluteFill
      className="bg-[#050000] overflow-hidden select-none font-sans text-white"
      style={{
        transform: `translate(${shakeX + shudderX}px, ${shakeY}px)`,
      }}
    >
      {/* Dynamic Background Fire Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.45) 0%, rgba(153, 27, 27, 0.3) 50%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* RAGING VECTOR FLAMES BACKGROUND LAYER */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none opacity-80"
      >
        <defs>
          <filter id="fire-glow-s40" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="25" floodColor="#DC2626" floodOpacity="0.85" />
          </filter>
        </defs>

        <g filter="url(#fire-glow-s40)">
          {/* Flame Wall Red */}
          <path
            d={`M 0 1080 
                Q 200 ${500 + f1}, 450 ${350 + f2} 
                Q 750 ${520 + f3}, 960 ${220 + f1} 
                Q 1250 ${480 + f2}, 1550 ${380 + f3} 
                Q 1750 ${540 + f1}, 1920 1080 Z`}
            fill="#7F1D1D"
            opacity="0.8"
          />
          {/* Flame Wall Orange */}
          <path
            d={`M 0 1080 
                Q 280 ${620 + f2}, 550 ${460 + f1} 
                Q 820 ${640 + f3}, 960 ${340 + f2} 
                Q 1180 ${600 + f1}, 1450 ${480 + f3} 
                Q 1700 ${660 + f2}, 1920 1080 Z`}
            fill="#C2410C"
            opacity="0.85"
          />
          {/* Flame Core Gold */}
          <path
            d={`M 150 1080 
                Q 450 ${720 + f3}, 750 ${580 + f2} 
                Q 960 ${480 + f1}, 1250 ${580 + f3} 
                Q 1550 ${740 + f2}, 1800 1080 Z`}
            fill="#D97706"
            opacity="0.9"
          />
        </g>

        {/* Floating Sparks */}
        {[...Array(20)].map((_, i) => {
          const sparkY = 1080 - ((frame * 12 + i * 54) % 1080);
          const sparkX = ((i * 103) % 1920) + Math.sin(frame * 0.15 + i) * 30;
          return (
            <circle
              key={i}
              cx={sparkX}
              cy={sparkY}
              r={(i % 3) + 2}
              fill={i % 2 === 0 ? "#FEF08A" : "#F97316"}
              opacity={0.8}
            />
          );
        })}
      </svg>

      {/* CENTER CLIMAX: SLAMMING "MASSIVE RISK" TYPOGRAPHY */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8">
        <div
          style={{
            transform: `scale(${textScale * glowPulse})`,
            opacity: textOpacity,
          }}
          className="flex flex-col items-center"
        >
          {/* Red Alert Pill */}
          <div className="mb-4 px-6 py-1.5 rounded-full bg-red-600/90 border border-red-400 shadow-xl flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white animate-ping" />
            <span className="text-sm md:text-base font-black tracking-widest uppercase text-white">
              HAZARDOUS CONTRAINDICATION
            </span>
          </div>

          {/* MASSIVE RISK TEXT */}
          <h1
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase m-0 leading-none text-center"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 40px #EF4444, 0 0 80px #DC2626, 0 8px 16px rgba(0,0,0,0.9)",
              WebkitTextStroke: "4px #DC2626",
            }}
          >
            MASSIVE RISK
          </h1>

          {/* Secondary Subtitle Card */}
          <div
            className="mt-6 px-8 py-3 rounded-2xl bg-black/90 border border-red-500/80 shadow-2xl backdrop-blur-md text-center max-w-3xl"
            style={{
              opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <p className="text-lg md:text-xl font-black tracking-widest text-red-400 uppercase m-0">
              UNCHECKED SSRI MONOTHERAPY CAN INDUCE SEVERE MANIA & RAPID CYCLING
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-red-700/80 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
            CONTRAINDICATION: AN ANTIDEPRESSANT GIVEN TO BIPOLAR DEPRESSION UNMASKS ACUTE MANIA
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
