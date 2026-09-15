import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 106: Adult vs. Child Withdrawal
 * Duration: 210 frames (7.0s)
 * Environment: Split-screen on checkered tile floor.
 * Characters & Props:
 *   - Left: DEPRESSED ADULT hiding under a heavy solid grey box in fetal withdrawal.
 *   - Right: DEPRESSED CHILD violently kicking a jagged hole through the matching box, surrounded by spiky red action lines.
 */
export const Scene106_AdultvsChildWithdrawal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Adult box covering: frames 15 to 45
  const adultBoxDrop = interpolate(frame, [15, 45], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Child kick shatter trigger at frame 55
  const isKicked = frame >= 55;
  const kickSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 9, stiffness: 220 },
  });
  const shatterProgress = interpolate(kickSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact screen shake on kick
  const isImpact = frame >= 55 && frame < 85;
  const shakeX = isImpact ? Math.sin((frame - 55) * 2.8) * 11 * (1 - (frame - 55) / 30) : 0;
  const shakeY = isImpact ? Math.cos((frame - 55) * 3.2) * 9 * (1 - (frame - 55) / 30) : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0F172A",
      }}
    >
      {/* Checkered Floor */}
      <TiledFloor
        frame={frame}
        perspectiveOrigin="50% 65%"
        horizonY={580}
        color="#1E293B"
        lineColor="#334155"
      />

      {/* Header Container */}
      <div
        className="absolute top-8 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(220, 38, 38, 0.5)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            DEVELOPMENTAL DIVERGENCE
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Adult Passive Withdrawal vs Child Externalized Outburst
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
      >
        <defs>
          <filter id="redSpikeGlow106" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center Divider Line */}
        <line x1="960" y1="0" x2="960" y2="1080" stroke="#334155" strokeWidth="4" />
        <line x1="960" y1="0" x2="960" y2="1080" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="10 8" />

        {/* ============================================== */}
        {/* LEFT SIDE: DEPRESSED ADULT (x=480)             */}
        {/* ============================================== */}
        <g transform="translate(480, 0)">
          {/* Label Card */}
          <g transform="translate(0, 120)">
            <rect x="-180" y="-35" width="360" height="70" rx="16" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
            <text x="0" y="2" fill="#94A3B8" fontSize="28" fontWeight="900" textAnchor="middle" letterSpacing="2">
              DEPRESSED ADULT
            </text>
            <text x="0" y="24" fill="#CBD5E1" fontSize="13" fontWeight="700" textAnchor="middle" letterSpacing="1.5">
              PASSIVE WITHDRAWAL
            </text>
          </g>

          {/* Stickman Curled Up Under Box */}
          <g transform="translate(0, 780)">
            <ellipse cx="0" cy="18" rx="110" ry="18" fill="#000000" opacity="0.4" />

            {/* Adult curled in ball */}
            <CuratedStickman
              x={0}
              y={0}
              scale={1.2}
              variant="adult"
              pose="crouch"
              mouth="frown"
              eyes="defeat"
              slumpProgress={1}
              frame={frame}
            />

            {/* Heavy Solid Grey Box Dropping over him (hiding him from world) */}
            <g transform={`translate(0, ${adultBoxDrop})`}>
              {/* Box Exterior */}
              <rect
                x="-140"
                y="-180"
                width="280"
                height="190"
                rx="14"
                fill="#475569"
                stroke="#64748B"
                strokeWidth="4"
              />
              {/* Front Shadow Panel */}
              <rect x="-125" y="-165" width="250" height="160" rx="8" fill="#334155" />
              <text x="0" y="-75" fill="#94A3B8" fontSize="22" fontWeight="900" textAnchor="middle" letterSpacing="2">
                ISOLATION
              </text>
            </g>
          </g>
        </g>

        {/* ============================================== */}
        {/* RIGHT SIDE: DEPRESSED CHILD (x=1440)           */}
        {/* ============================================== */}
        <g transform="translate(1440, 0)">
          {/* Label Card */}
          <g transform="translate(0, 120)">
            <rect
              x="-180"
              y="-35"
              width="360"
              height="70"
              rx="16"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="2.5"
            />
            <text x="0" y="2" fill="#FFFFFF" fontSize="28" fontWeight="900" textAnchor="middle" letterSpacing="2">
              DEPRESSED CHILD
            </text>
            <text x="0" y="24" fill="#FCA5A5" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="1.5">
              ACTION REPLACES WITHDRAWAL
            </text>
          </g>

          {/* Child Stickman & Box Wreckage (y=780) */}
          <g transform="translate(0, 780)">
            <ellipse cx="0" cy="18" rx="120" ry="20" fill="#000000" opacity="0.5" />

            {/* Child Standing in Wreckage */}
            <CuratedStickman
              x={0}
              y={0}
              scale={1.15}
              variant="child"
              pose={isKicked ? "idle" : "crouch"}
              mouth={isKicked ? "shock" : "frown"}
              eyes={isKicked ? "shock" : "defeat"}
              slumpProgress={isKicked ? 0 : 0.8}
              frame={frame}
            />

            {/* Matching Grey Box (Intact before frame 55, violently shattered after) */}
            {!isKicked ? (
              <g>
                <rect x="-140" y="-180" width="280" height="190" rx="14" fill="#475569" stroke="#64748B" strokeWidth="4" />
                <rect x="-125" y="-165" width="250" height="160" rx="8" fill="#334155" />
              </g>
            ) : (
              <g>
                {/* Shattered Left Box Half */}
                <path
                  d="M -140 -180 L -30 -180 L -80 -80 L -20 0 L -140 0 Z"
                  fill="#475569"
                  stroke="#64748B"
                  strokeWidth="3"
                  transform={`translate(${-shatterProgress * 60}, 0)`}
                />
                {/* Shattered Right Box Half */}
                <path
                  d="M 140 -180 L 40 -180 L 90 -90 L 30 0 L 140 0 Z"
                  fill="#475569"
                  stroke="#64748B"
                  strokeWidth="3"
                  transform={`translate(${shatterProgress * 60}, 0)`}
                />

                {/* Flying Jagged Box Debris */}
                {[
                  { x: -90, y: -160, rot: -45 },
                  { x: 110, y: -140, rot: 60 },
                  { x: -160, y: -60, rot: 80 },
                  { x: 170, y: -40, rot: -70 },
                ].map((deb, i) => (
                  <polygon
                    key={i}
                    points="0,0 35,-15 20,-35"
                    fill="#64748B"
                    stroke="#334155"
                    strokeWidth="2"
                    transform={`
                      translate(${deb.x + Math.sign(deb.x) * shatterProgress * 80}, ${deb.y + shatterProgress * 60})
                      rotate(${deb.rot * shatterProgress})
                    `}
                  />
                ))}

                {/* AGGRESSIVE SPIKY RED ACTION LINES RADIATING FROM CHILD */}
                <g filter="url(#redSpikeGlow106)" stroke="#DC2626" strokeWidth="5" strokeLinecap="round">
                  {[0, 30, 60, 120, 150, 180, 210, 240, 300, 330].map((deg, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1="-80"
                      x2={Math.cos((deg * Math.PI) / 180) * (180 + (frame % 8) * 8)}
                      y2={-80 + Math.sin((deg * Math.PI) / 180) * (180 + (frame % 8) * 8)}
                    />
                  ))}
                </g>
              </g>
            )}
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
