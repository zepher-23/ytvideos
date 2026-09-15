import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, TiledFloor } from "../../shared";

/**
 * Scene 84: DELUSIONAL RUIN
 * Duration: 150 frames (5.0s)
 * Environment: Minimalist grey-and-white checkered tile floor.
 * Characters & Props: Stickman opening wallet, fluttering moths, giant red stamp slamming "TOTAL RUIN", stickman slumping in defeat.
 */
export const Scene084_DELUSIONALRUIN = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Wallet opening phase: frame 35
  const isOpened = frame >= 35;
  const openProgress = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Moths fluttering out: frames 45 to 150
  const mothProgress = interpolate(frame, [45, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Giant red stamp drop & slam: frames 65 to 75
  const stampSpring = spring({
    frame: frame - 68,
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const stampY = interpolate(stampSpring, [0, 1], [-500, 0]);

  // Stamp impact shake: frames 70 to 95
  const isImpact = frame >= 70 && frame < 95;
  const shakeX = isImpact ? Math.sin((frame - 70) * 2.5) * 10 * (1 - (frame - 70) / 25) : 0;
  const shakeY = isImpact ? Math.cos((frame - 70) * 2.8) * 8 * (1 - (frame - 70) / 25) : 0;

  // Stickman slump into defeat after stamp: frames 80 to 120
  const defeatProgress = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#F1F5F9",
      }}
    >
      {/* Perspective Checkered Tile Floor */}
      <TiledFloor
        frame={frame}
        perspectiveOrigin="50% 65%"
        horizonY={580}
        color="#CBD5E1"
        lineColor="#94A3B8"
      />

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterSpring,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-xl text-center max-w-3xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: `1.5px solid ${frame >= 70 ? "#EF4444" : "#94A3B8"}`,
            boxShadow: frame >= 70 ? "0 0 35px rgba(239, 68, 68, 0.25)" : "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: frame >= 70 ? "#DC2626" : "#0F172A" }}
          >
            DELUSION OF TOTAL RUIN
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-500">
            Psychotic Depression • Financial Annihilation Delusion
          </p>
        </div>
      </div>

      {/* Main SVG Visuals */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translate(${shakeX}px, ${shakeY}px)` }}
      >
        <defs>
          <filter id="stampShadow84" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#991B1B" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* STICKMAN (Positioned at x=780, y=780) */}
        <g transform="translate(780, 780)">
          {/* Floor Shadow */}
          <ellipse
            cx="0"
            cy="15"
            rx={90 + defeatProgress * 20}
            ry="16"
            fill="#000000"
            opacity={0.2}
          />

          <CuratedStickman
            x={0}
            y={0}
            scale={1.25}
            variant="adult"
            pose={defeatProgress > 0.5 ? "defeat" : "idle"}
            mouth={defeatProgress > 0.5 ? "frown" : isOpened ? "shock" : "neutral"}
            eyes={defeatProgress > 0.5 ? "defeat" : isOpened ? "shock" : "normal"}
            slumpProgress={defeatProgress}
            reachProgress={defeatProgress > 0.5 ? 0 : 0.7}
            frame={frame}
          />
        </g>

        {/* WALLET (Held in hands or on floor if dropped) */}
        <g
          transform={`translate(${interpolate(defeatProgress, [0, 1], [940, 1020])}, ${interpolate(defeatProgress, [0, 1], [650, 780])})`}
        >
          {/* Drop shadow on floor if dropped */}
          {defeatProgress > 0.6 && (
            <ellipse cx="0" cy="15" rx="55" ry="12" fill="#000000" opacity="0.25" />
          )}

          {/* Leather Wallet Body */}
          <rect
            x="-45"
            y="-30"
            width="90"
            height="60"
            rx="8"
            fill="#78350F"
            stroke="#451A03"
            strokeWidth="3"
          />

          {/* Open Flap */}
          <path
            d={`M -45 -30 C -20 ${-30 - openProgress * 40} 20 ${-30 - openProgress * 40} 45 -30`}
            fill="#92400E"
            stroke="#451A03"
            strokeWidth="3"
          />

          {/* Empty Cash Slot Indicator */}
          {openProgress > 0.4 && (
            <ellipse cx="0" cy="-25" rx="28" ry="6" fill="#1C1917" opacity="0.6" />
          )}
        </g>

        {/* FLUTTERING MOTHS FLYING OUT OF THE EMPTY WALLET */}
        {frame >= 45 && (
          <g>
            {[
              { id: "m1", offsetX: 60, offsetY: -80, speed: 2.2, drift: 80 },
              { id: "m2", offsetX: 120, offsetY: -160, speed: 2.8, drift: 120 },
              { id: "m3", offsetX: -40, offsetY: -120, speed: 1.9, drift: -60 },
            ].map((moth) => {
              const mX = 940 + moth.offsetX + Math.sin(frame * 0.15) * moth.drift * mothProgress;
              const mY = 640 + moth.offsetY * mothProgress - mothProgress * 120;
              const wingFlap = Math.sin(frame * moth.speed) * 0.9;

              return (
                <g key={moth.id} transform={`translate(${mX}, ${mY}) scale(0.9)`}>
                  {/* Left Wing */}
                  <ellipse
                    cx="-12"
                    cy="0"
                    rx="14"
                    ry="8"
                    transform={`scale(${wingFlap}, 1)`}
                    fill="#64748B"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />
                  {/* Right Wing */}
                  <ellipse
                    cx="12"
                    cy="0"
                    rx="14"
                    ry="8"
                    transform={`scale(${wingFlap}, 1)`}
                    fill="#64748B"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />
                  {/* Moth Body */}
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        )}

        {/* GIANT RED STAMP INK IMPRINT (Permanent on floor after frame 70) */}
        {frame >= 70 && (
          <g transform="translate(1080, 770) rotate(-8)">
            {/* Outer Inked Box */}
            <rect
              x="-210"
              y="-65"
              width="420"
              height="130"
              rx="12"
              fill="rgba(239, 68, 68, 0.1)"
              stroke="#EF4444"
              strokeWidth="7"
              strokeDasharray="18 6"
            />
            {/* Inner Border */}
            <rect
              x="-195"
              y="-52"
              width="390"
              height="104"
              rx="8"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
            />

            <text
              x="0"
              y="12"
              fill="#DC2626"
              fontSize="48"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="6"
            >
              TOTAL RUIN
            </text>
            <text
              x="0"
              y="38"
              fill="#EF4444"
              fontSize="14"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="3"
            >
              BANKRUPTCY & PENURY DELUSION
            </text>
          </g>
        )}

        {/* GIANT INDUSTRIAL STAMP APPARATUS (Dropping down and bouncing up) */}
        {frame >= 65 && frame <= 100 && (
          <g
            transform={`translate(1080, ${760 + stampY}) rotate(-8)`}
            filter="url(#stampShadow84)"
          >
            {/* Heavy Brass / Metal Handle */}
            <rect x="-25" y="-300" width="50" height="240" rx="14" fill="#475569" stroke="#1E293B" strokeWidth="4" />
            <circle cx="0" cy="-300" r="35" fill="#334155" stroke="#0F172A" strokeWidth="4" />

            {/* Heavy Base Plate */}
            <rect x="-220" y="-60" width="440" height="70" rx="14" fill="#991B1B" stroke="#7F1D1D" strokeWidth="5" />
            <rect x="-210" y="5" width="420" height="15" fill="#EF4444" />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
