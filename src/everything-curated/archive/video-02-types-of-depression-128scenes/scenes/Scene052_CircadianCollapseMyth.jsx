import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 52: Circadian Collapse Myth
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Solid pitch black (#000000) shifting to frozen navy (#06101E) on impact.
 * - Characters & Props: CuratedStickman, glowing warm sun icon, massive dark blue snowflake projectile,
 *   frostbite aura and shivering kinematics.
 * - Beginning (0-38f): Stickman happily cradles glowing golden sun in warm halo.
 * - Action/Climax (38-110f): Massive dark blue snowflake smashes sun from his hands; sun flies off-screen.
 * - Ending/Hold (110-180f): Screen freezes; stickman stands shivering in defeat amidst frosty crystals.
 */
export const Scene052_CircadianCollapseMyth = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Snowflake collision trajectory: starts (1550, 120), hits sun at (960, 670) at frame 45
  const isSmashed = frame >= 45;
  const smashAge = Math.max(0, frame - 45);

  const flakeProgress = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flakeX = !isSmashed ? interpolate(flakeProgress, [0, 1], [1550, 960]) : 960;
  const flakeY = !isSmashed ? interpolate(flakeProgress, [0, 1], [100, 670]) : 670;
  const flakeRot = frame * 4;

  // Sun knock-away physics after frame 45
  const sunX = !isSmashed ? 960 : 960 - smashAge * 18;
  const sunY = !isSmashed ? 670 : 670 - smashAge * 6 + 0.5 * 1.5 * smashAge * smashAge;
  const sunRot = !isSmashed ? frame * 1.5 : frame * 8;
  const sunOpacity = !isSmashed ? 1 : interpolate(smashAge, [0, 20], [1, 0], { extrapolateRight: "clamp" });

  // Post-impact shivering motion for stickman
  const shiverX = isSmashed ? Math.sin(frame * 3.2) * 4 : 0;
  const shiverY = isSmashed ? Math.cos(frame * 2.8) * 2.5 : 0;

  // Screen shake on impact
  const shakeX = isSmashed && smashAge < 25 ? Math.sin(smashAge * 2.5) * Math.max(0, 15 - smashAge * 0.6) : 0;
  const shakeY = isSmashed && smashAge < 25 ? Math.cos(smashAge * 2.8) * Math.max(0, 12 - smashAge * 0.5) : 0;

  return (
    <AbsoluteFill
      className="bg-black overflow-hidden select-none font-sans text-white transition-colors duration-700"
      style={{
        backgroundColor: isSmashed ? "#06101E" : "#000000",
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Dynamic Background Frost / Warm Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: !isSmashed
            ? "radial-gradient(circle at 50% 65%, rgba(245, 158, 11, 0.25) 0%, rgba(0,0,0,1) 60%)"
            : "radial-gradient(circle at 50% 65%, rgba(2, 132, 199, 0.25) 0%, rgba(6, 16, 30, 1) 80%)",
        }}
      />

      {/* Top Header Card */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-black/85 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-0.5">
            CIRCADIAN COLLAPSE
          </span>
          <h1 className="text-2xl md:text-4xl font-black tracking-wider text-white m-0 uppercase">
            SUDDEN LOSS OF SOLAR LIGHT
          </h1>
        </div>
      </div>

      {/* MAIN STAGE SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="sun-glow-s52" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="24" floodColor="#F59E0B" floodOpacity="0.8" />
          </filter>
          <filter id="flake-glow-s52" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#38BDF8" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. CURATED STICKMAN (Center x=960, y=780) */}
        <g transform={`translate(${960 + shiverX}, ${780 + shiverY})`}>
          {/* Floor Shadow */}
          <ellipse cx="0" cy="8" rx="85" ry="14" fill="#000000" opacity="0.3" />

          {/* Stickman Character */}
          <CuratedStickman
            x={0}
            y={0}
            scale={1.05}
            pose={isSmashed ? "defeat" : "content"}
            mouth={isSmashed ? "shock" : "smile"}
            eyes={isSmashed ? "defeat" : "normal"}
            slumpProgress={isSmashed ? 0.75 : 0}
            frame={frame}
          />

          {/* Frost Breath / Shiver Lines when frozen */}
          {isSmashed && (
            <g>
              {/* Cold Shiver Lines */}
              <line x1="-55" y1="-120" x2="-40" y2="-120" stroke="#38BDF8" strokeWidth="3" />
              <line x1="40" y1="-120" x2="55" y2="-120" stroke="#38BDF8" strokeWidth="3" />
              {/* Frost Breath Cloud */}
              <circle cx="25" cy="-90" r="8" fill="#E0F2FE" opacity={0.5 + Math.sin(frame * 0.4) * 0.3} />
              <circle cx="45" cy="-98" r="14" fill="#BAE6FD" opacity={0.4 + Math.sin(frame * 0.4) * 0.25} />
            </g>
          )}
        </g>

        {/* 2. GLOWING WARM SUN ICON (Held, then Smashed away) */}
        <g
          transform={`translate(${sunX}, ${sunY}) rotate(${sunRot})`}
          filter="url(#sun-glow-s52)"
          opacity={sunOpacity}
        >
          {/* Sun Core */}
          <circle cx="0" cy="0" r="45" fill="#F59E0B" stroke="#FEF08A" strokeWidth="4" />
          {/* 8 Radial Sun Rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <line
              key={i}
              x1="0"
              y1="50"
              x2="0"
              y2="72"
              stroke="#FDE047"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* 3. MASSIVE DARK BLUE SNOWFLAKE (Incoming Projectile) */}
        <g
          transform={`translate(${flakeX}, ${flakeY}) rotate(${flakeRot})`}
          filter="url(#flake-glow-s52)"
        >
          <circle cx="0" cy="0" r="24" fill="#0284C7" stroke="#38BDF8" strokeWidth="4" />
          {/* 6 Large Crystalline Blades */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <g key={i} transform={`rotate(${deg})`}>
              <line x1="0" y1="0" x2="0" y2="-85" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
              <line x1="0" y1="-45" x2="-22" y2="-65" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
              <line x1="0" y1="-45" x2="22" y2="-65" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
            </g>
          ))}
        </g>

        {/* 4. POST-IMPACT FROST PARTICLES (Spreading across screen) */}
        {isSmashed &&
          [...Array(16)].map((_, i) => {
            const pAge = (smashAge + i * 15) % 80;
            const pAngle = (i * Math.PI) / 8;
            const pDist = pAge * 12;
            const pX = 960 + Math.cos(pAngle) * pDist;
            const pY = 670 + Math.sin(pAngle) * pDist;
            return (
              <circle
                key={i}
                cx={pX}
                cy={pY}
                r={3}
                fill="#BAE6FD"
                opacity={interpolate(pAge, [0, 40, 80], [0.9, 0.6, 0])}
              />
            );
          })}
      </svg>

      {/* Bottom Medical Warning Footer */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3 rounded-2xl bg-black/90 border border-cyan-800 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-cyan-200">
            PHOTIC VULNERABILITY: ABNORMAL NEUROBIOLOGICAL SENSITIVITY TO SEASONAL LIGHT LOSS
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
