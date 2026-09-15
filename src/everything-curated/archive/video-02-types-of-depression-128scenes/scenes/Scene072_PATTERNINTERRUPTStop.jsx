import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 72: PATTERN INTERRUPT (Stop)
 * Duration: 5 seconds (150 frames)
 * 
 * - Environment: Flashing jarring space. Background flashes white then violently plunges into ominous navy blue (#0B132B).
 * - Characters & Props: Giant red "STOP" octagon sign, high-impact slam spring, screen shake, hazard strobe.
 * - Beginning (0-15f): Jarring white flash; giant stop sign slams from deep foreground.
 * - Action/Climax (15-60f): Screen impact shake; background violently locks to navy blue as stop sign settles dead-center.
 * - Ending/Hold (60-150f): The giant STOP sign holds dead center with pulsating neon red hazard aura.
 */
export const Scene072_PATTERNINTERRUPTStop = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // White flash to dark navy transition (frames 0 to 18)
  const isWhitePhase = frame < 16;

  // Stop sign slam spring (starts at frame 12)
  const slamFrame = Math.max(0, frame - 12);
  const slamSpring = spring({
    frame: slamFrame,
    fps,
    config: { damping: 10, stiffness: 200, mass: 1.5 },
  });
  const signScale = frame < 12 ? 0 : interpolate(slamSpring, [0, 1], [3.2, 1]);
  const signOpacity = interpolate(slamFrame, [0, 4], [0, 1], { extrapolateRight: "clamp" });

  // Impact screen shake at frame 18-40
  const impactAge = Math.max(0, frame - 18);
  const shakeX = frame >= 18 && impactAge < 22 ? Math.sin(impactAge * 2.8) * Math.max(0, 18 - impactAge * 0.8) : 0;
  const shakeY = frame >= 18 && impactAge < 22 ? Math.cos(impactAge * 3.2) * Math.max(0, 15 - impactAge * 0.7) : 0;

  // Strobe pulse after landing
  const glowPulse = 1 + Math.sin(frame * 0.3) * 0.04;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans text-white transition-colors duration-200"
      style={{
        backgroundColor: isWhitePhase ? "#FFFFFF" : "#0B132B",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Background Radial Glow */}
      {!isWhitePhase && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.35) 0%, rgba(11, 19, 43, 0.95) 75%)",
          }}
        />
      )}

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="stop-glow-s72" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="30" floodColor="#EF4444" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* GIANT RED STOP SIGN (Center at 960, 540) */}
        {signOpacity > 0 && (
          <g
            transform={`translate(960, 540) scale(${signScale * glowPulse}) translate(-960, -540)`}
            opacity={signOpacity}
            filter="url(#stop-glow-s72)"
          >
            {/* Outer Black Bevel */}
            <polygon
              points="760,260 1160,260 1440,540 1440,940 1160,1220 760,1220 480,940 480,540"
              transform="translate(0, -200)"
              fill="#0F172A"
            />
            {/* White Inset Border */}
            <polygon
              points="768,272 1152,272 1424,544 1424,936 1152,1208 768,1208 496,936 496,544"
              transform="translate(0, -200)"
              fill="#FFFFFF"
            />
            {/* Traffic Red Octagon Body */}
            <polygon
              points="780,288 1140,288 1404,552 1404,928 1140,1192 780,1192 516,928 516,552"
              transform="translate(0, -200)"
              fill="#DC2626"
            />

            {/* BOLD WHITE "STOP" TYPOGRAPHY */}
            <text
              x="960"
              y="595"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="240"
              fontWeight="900"
              letterSpacing="12"
              fontFamily="Impact, sans-serif"
            >
              STOP
            </text>
          </g>
        )}
      </svg>

      {/* Top Banner Tag */}
      <div className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-8">
        <div className="px-8 py-2.5 rounded-full bg-red-600/90 border border-red-400 shadow-2xl text-center">
          <span className="text-sm font-mono tracking-widest text-white font-black uppercase">
            ⚠ PATTERN INTERRUPT
          </span>
        </div>
      </div>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-red-600 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-white">
            CRITICAL INTERRUPT: BEFORE WE COVER THE FINAL FORM, RECOGNIZE THE COMMON THREAD BEHIND COGNITIVE COLLAPSE
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
