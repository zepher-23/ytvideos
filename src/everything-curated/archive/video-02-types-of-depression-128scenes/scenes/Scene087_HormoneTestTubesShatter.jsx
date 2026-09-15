import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 87: Hormone Test Tubes Shatter
 * Duration: 180 frames (6.0s)
 * Environment: Inside a dark biological abstraction (#090D1A).
 * Transition: Fast zoom-out.
 * Characters & Props: Wooden rack holding glowing pink & yellow test tubes, shattering into flying shards & splashing glowing liquid, flashing red SYSTEM FAILURE alert.
 */
export const Scene087_HormoneTestTubesShatter = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fast zoom-out entrance spring
  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 110 },
  });
  const zoomScale = interpolate(zoomSpring, [0, 1], [1.25, 1]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Shatter trigger at frame 50
  const isShattered = frame >= 50;
  const shatterProgress = interpolate(frame, [50, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact screen shake: frames 50 to 80
  const isImpact = frame >= 50 && frame < 80;
  const shakeX = isImpact ? Math.sin((frame - 50) * 2.8) * 14 * (1 - (frame - 50) / 30) : 0;
  const shakeY = isImpact ? Math.cos((frame - 50) * 3.2) * 12 * (1 - (frame - 50) / 30) : 0;

  // SYSTEM FAILURE alert entrance: frame 85
  const alertSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const alertScale = interpolate(alertSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Alert flash pulse
  const alertFlash = isShattered ? (Math.sin((frame - 85) * 0.4) > 0 ? 1 : 0.35) : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#090D1A",
      }}
    >
      {/* Background Subtle Bio Mesh */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="bioMesh87" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 50 M 0 0 L 50 50" stroke="#38BDF8" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bioMesh87)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `scale(${zoomScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: `1.5px solid ${isShattered ? "#EF4444" : "rgba(236, 72, 153, 0.4)"}`,
            boxShadow: isShattered ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: isShattered ? "#F87171" : "#FFFFFF" }}
          >
            UNPRECEDENTED DROP
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Neuroendocrine Precipice • Receptor De-synchronization
          </p>
        </div>
      </div>

      {/* Main SVG Visualization */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `scale(${zoomScale}) translate(${shakeX}px, ${shakeY}px)`,
          transformOrigin: "960px 650px",
        }}
      >
        <defs>
          <filter id="splashGlow87" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="pinkFluid87" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>

          <linearGradient id="yellowFluid87" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        {/* WOODEN TEST TUBE RACK STAND (x=960, y=760) */}
        <g transform="translate(960, 760)">
          {/* Floor base */}
          <rect x="-420" y="0" width="840" height="35" rx="8" fill="#78350F" stroke="#451A03" strokeWidth="4" />
          {/* Top shelf with tube holes */}
          <rect x="-380" y="-140" width="760" height="24" rx="6" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          {/* Wooden upright side posts */}
          <rect x="-370" y="-140" width="25" height="140" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          <rect x="345" y="-140" width="25" height="140" fill="#78350F" stroke="#451A03" strokeWidth="3" />
        </g>

        {/* INTACT TEST TUBES (Before frame 50) */}
        {!isShattered && (
          <g transform="translate(960, 760)">
            {[
              { label: "ESTROGEN", x: -240, color: "url(#pinkFluid87)", stroke: "#EC4899" },
              { label: "ESTROGEN", x: -80, color: "url(#pinkFluid87)", stroke: "#EC4899" },
              { label: "PROGESTERONE", x: 80, color: "url(#yellowFluid87)", stroke: "#FDE047" },
              { label: "PROGESTERONE", x: 240, color: "url(#yellowFluid87)", stroke: "#FDE047" },
            ].map((tube, i) => (
              <g key={i} transform={`translate(${tube.x}, -20)`}>
                {/* Glass Tube Body */}
                <rect
                  x="-30"
                  y="-260"
                  width="60"
                  height="260"
                  rx="22"
                  fill="rgba(255, 255, 255, 0.08)"
                  stroke="#E2E8F0"
                  strokeWidth="3.5"
                />
                {/* Lip */}
                <ellipse cx="0" cy="-260" rx="35" ry="8" fill="#334155" stroke="#E2E8F0" strokeWidth="2.5" />
                {/* Liquid column */}
                <rect
                  x="-25"
                  y="-220"
                  width="50"
                  height="215"
                  rx="18"
                  fill={tube.color}
                  filter="url(#splashGlow87)"
                  opacity="0.9"
                />
              </g>
            ))}
          </g>
        )}

        {/* SHATTERED GLASS PARTICLES & EXPLODING FLUID SPLASH (After frame 50) */}
        {isShattered && (
          <g transform="translate(960, 740)">
            {/* SPILLED FLUID POOLS ON BASE */}
            <ellipse
              cx="-160"
              cy="10"
              rx={180 * shatterProgress}
              ry={35 * shatterProgress}
              fill="url(#pinkFluid87)"
              filter="url(#splashGlow87)"
              opacity="0.85"
            />
            <ellipse
              cx="160"
              cy="10"
              rx={180 * shatterProgress}
              ry={35 * shatterProgress}
              fill="url(#yellowFluid87)"
              filter="url(#splashGlow87)"
              opacity="0.85"
            />

            {/* FLYING EXPLOSIVE LIQUID SPLASH DROPS */}
            <g filter="url(#splashGlow87)">
              {/* Pink Splashes */}
              {[
                { dx: -260, dy: -320, r: 16 },
                { dx: -180, dy: -420, r: 22 },
                { dx: -340, dy: -180, r: 14 },
                { dx: -90, dy: -360, r: 18 },
                { dx: -20, dy: -280, r: 12 },
              ].map((p, i) => (
                <circle
                  key={`p-${i}`}
                  cx={p.dx * shatterProgress}
                  cy={p.dy * shatterProgress + shatterProgress * shatterProgress * 150}
                  r={p.r * (1 - shatterProgress * 0.3)}
                  fill="url(#pinkFluid87)"
                />
              ))}

              {/* Yellow Splashes */}
              {[
                { dx: 260, dy: -340, r: 18 },
                { dx: 170, dy: -440, r: 24 },
                { dx: 330, dy: -200, r: 15 },
                { dx: 110, dy: -380, r: 19 },
                { dx: 40, dy: -300, r: 14 },
              ].map((y, i) => (
                <circle
                  key={`y-${i}`}
                  cx={y.dx * shatterProgress}
                  cy={y.dy * shatterProgress + shatterProgress * shatterProgress * 150}
                  r={y.r * (1 - shatterProgress * 0.3)}
                  fill="url(#yellowFluid87)"
                />
              ))}
            </g>

            {/* SHATTERED GLASS SHARDS FLYING OUTWARD */}
            <g stroke="#E2E8F0" strokeWidth="2" fill="rgba(255, 255, 255, 0.4)">
              {[
                { x: -280, y: -260, rot: 120, pts: "0,0 25,-40 10,-60" },
                { x: -160, y: -380, rot: -90, pts: "0,0 35,-20 20,-50" },
                { x: -380, y: -140, rot: 45, pts: "0,0 40,-15 15,-40" },
                { x: 180, y: -390, rot: 80, pts: "0,0 -30,-25 -15,-55" },
                { x: 290, y: -270, rot: -110, pts: "0,0 -25,-35 -5,-65" },
                { x: 390, y: -150, rot: -40, pts: "0,0 -35,-15 -20,-45" },
              ].map((shard, i) => (
                <g
                  key={`shard-${i}`}
                  transform={`
                    translate(${shard.x * shatterProgress}, ${shard.y * shatterProgress + shatterProgress * shatterProgress * 200})
                    rotate(${shard.rot * shatterProgress})
                  `}
                >
                  <polygon points={shard.pts} />
                </g>
              ))}
            </g>
          </g>
        )}

        {/* GIANT FLASHING "SYSTEM FAILURE" OVERLAY ALERT */}
        {frame >= 85 && (
          <g
            transform={`translate(960, 480) scale(${alertScale})`}
            opacity={alertFlash}
          >
            {/* Outer Box */}
            <rect
              x="-360"
              y="-100"
              width="720"
              height="200"
              rx="24"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="7"
              style={{
                filter: "drop-shadow(0 0 35px #EF4444)",
              }}
            />
            <rect x="-345" y="-85" width="690" height="170" rx="16" fill="#450A0A" opacity="0.95" />

            <text
              x="0"
              y="10"
              fill="#FFFFFF"
              fontSize="68"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="6"
            >
              SYSTEM FAILURE
            </text>

            <text
              x="0"
              y="52"
              fill="#FECACA"
              fontSize="20"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="4"
            >
              CRITICAL NEUROENDOCRINE SHUTDOWN
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
