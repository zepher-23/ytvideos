import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 83: melting Organs diagram
 * Duration: 180 frames (6.0s)
 * Environment: Dark biological abstraction with clinical lab rack.
 * Transition: Fast zoom-in.
 * Characters & Props: Rack of 3 test tubes ("LUNGS", "HEART", "LIVER") violently melting into bubbling green liquid under invisible acid; "PHYSICAL ROT" banner.
 */
export const Scene083_meltingOrgansdiagram = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fast zoom-in entrance spring
  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const zoomScale = interpolate(zoomSpring, [0, 1], [0.8, 1]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Acid splash & violent melting progression: frames 45 to 110
  const meltProgress = interpolate(frame, [45, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Green sludge pooling progression: frames 60 to 130
  const poolProgress = interpolate(frame, [60, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "PHYSICAL ROT" banner entrance at frame 115
  const bannerSpring = spring({
    frame: frame - 115,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const bannerScale = interpolate(bannerSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tube heights collapsing from 320px to 40px
  const tubeHeight = interpolate(meltProgress, [0, 1], [320, 50]);

  // Color transition from vibrant organ pink (#F43F5E) to toxic green (#10B981)
  const isMelting = frame >= 45;
  const liquidColor = meltProgress > 0.4 ? "#10B981" : "#F43F5E";
  const liquidGlow = meltProgress > 0.4 ? "#34D399" : "#FB7185";

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#060A14",
      }}
    >
      {/* Bio-grid blueprint background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="bioGrid-83" width="70" height="70" patternUnits="userSpaceOnUse">
            <rect width="70" height="70" fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="4 8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bioGrid-83)" />
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
            backgroundColor: "rgba(10, 15, 26, 0.9)",
            border: `1.5px solid ${meltProgress > 0.5 ? "rgba(16, 185, 129, 0.6)" : "rgba(244, 63, 94, 0.5)"}`,
            boxShadow: meltProgress > 0.5 ? "0 0 35px rgba(16, 185, 129, 0.3)" : "0 10px 30px rgba(0,0,0,0.6)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: meltProgress > 0.5 ? "#34D399" : "#FFFFFF" }}
          >
            ORGANIC DISSOLUTION
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Somatic Nihilism • Biological Annihilation
          </p>
        </div>
      </div>

      {/* Main Visual Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `scale(${zoomScale})`, transformOrigin: "960px 600px" }}
      >
        <defs>
          <filter id="toxicFilter83" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="pinkFluidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>

          <linearGradient id="greenFluidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* STEEL LABORATORY BENCH & RACK STAND */}
        <g transform="translate(960, 780)">
          {/* Bench Surface */}
          <rect x="-650" y="0" width="1300" height="120" fill="#0B132B" stroke="#1E293B" strokeWidth="4" />
          <line x1="-650" y1="0" x2="650" y2="0" stroke="#475569" strokeWidth="4" />

          {/* Test Tube Rack Frame */}
          <rect x="-480" y="-80" width="960" height="20" rx="6" fill="#334155" stroke="#64748B" strokeWidth="2" />
          <line x1="-460" y1="-80" x2="-460" y2="0" stroke="#475569" strokeWidth="8" />
          <line x1="460" y1="-80" x2="460" y2="0" stroke="#475569" strokeWidth="8" />

          {/* SPREADING PUDDLES OF BUBBLING TOXIC SLUDGE ON RACK BASE */}
          {poolProgress > 0 && (
            <g filter="url(#toxicFilter83)">
              {/* Giant merged puddle */}
              <ellipse
                cx="0"
                cy="-5"
                rx={poolProgress * 420}
                ry={poolProgress * 32}
                fill="url(#greenFluidGrad)"
                opacity={Math.min(poolProgress * 1.5, 0.95)}
              />

              {/* Bubbles popping in the puddle */}
              <circle cx={-240 + Math.sin(frame * 0.4) * 20} cy={-10 - ((frame * 2) % 25)} r="6" fill="#A7F3D0" />
              <circle cx={0 + Math.cos(frame * 0.5) * 25} cy={-12 - (((frame + 15) * 2) % 28)} r="7.5" fill="#A7F3D0" />
              <circle cx={250 + Math.sin(frame * 0.45) * 20} cy={-10 - (((frame + 8) * 2) % 22)} r="5.5" fill="#A7F3D0" />
            </g>
          )}
        </g>

        {/* 3 TEST TUBES (x = 660, 960, 1260; Base at y = 700) */}
        {[
          { label: "LUNGS", x: 660, desc: "RESPIRATORY FAIL" },
          { label: "HEART", x: 960, desc: "CIRCULATORY HALT" },
          { label: "LIVER", x: 1260, desc: "METABOLIC COLLAPSE" },
        ].map((tube, i) => {
          // Individual melt wobble
          const tubeMelt = Math.min(1, Math.max(0, meltProgress * 1.3 - i * 0.15));
          const currentH = interpolate(tubeMelt, [0, 1], [320, 50]);
          const wobble = tubeMelt > 0 && tubeMelt < 1 ? Math.sin((frame + i * 20) * 0.6) * 12 * tubeMelt : 0;

          return (
            <g key={tube.label} transform={`translate(${tube.x + wobble}, 700)`}>
              {/* Glass Tube Contour */}
              {tubeMelt < 0.95 && (
                <g>
                  {/* Tube Body */}
                  <rect
                    x="-45"
                    y={-currentH}
                    width="90"
                    height={currentH}
                    rx="25"
                    fill="rgba(148, 163, 184, 0.08)"
                    stroke={tubeMelt > 0.4 ? "#34D399" : "#E2E8F0"}
                    strokeWidth="3.5"
                    opacity={1 - tubeMelt * 0.5}
                  />

                  {/* Top Lip of test tube */}
                  <ellipse
                    cx="0"
                    cy={-currentH}
                    rx="50"
                    ry="10"
                    fill="#1E293B"
                    stroke={tubeMelt > 0.4 ? "#34D399" : "#E2E8F0"}
                    strokeWidth="3.5"
                  />

                  {/* Fluid inside tube */}
                  <rect
                    x="-40"
                    y={-currentH + 40}
                    width="80"
                    height={Math.max(currentH - 45, 10)}
                    rx="20"
                    fill={tubeMelt > 0.3 ? "url(#greenFluidGrad)" : "url(#pinkFluidGrad)"}
                    filter="url(#toxicFilter83)"
                    opacity="0.9"
                  />

                  {/* Organ Label Tag */}
                  {tubeMelt < 0.6 && (
                    <g transform={`translate(0, ${-currentH / 2})`} opacity={1 - tubeMelt * 1.5}>
                      <rect
                        x="-60"
                        y="-18"
                        width="120"
                        height="36"
                        rx="8"
                        fill="#0F172A"
                        stroke="#475569"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="6"
                        fill="#FFFFFF"
                        fontSize="16"
                        fontWeight="900"
                        textAnchor="middle"
                        letterSpacing="2"
                      >
                        {tube.label}
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* Melting Acid Splashes & Sizzle Vapor */}
              {isMelting && tubeMelt > 0.1 && tubeMelt < 0.9 && (
                <g opacity="0.8">
                  {/* Sizzle particles */}
                  <circle cx={-20 + (frame % 15)} cy={-currentH - (frame % 20)} r="3" fill="#34D399" />
                  <circle cx={15 - (frame % 18)} cy={-currentH - 10 - (frame % 25)} r="3.5" fill="#A7F3D0" />
                </g>
              )}
            </g>
          );
        })}

        {/* "PHYSICAL ROT" TYPEWRITER BANNER (Above the puddle) */}
        {frame >= 115 && (
          <g
            transform={`translate(960, 430) scale(${bannerScale})`}
            filter="url(#toxicFilter83)"
          >
            {/* Banner Backing */}
            <rect
              x="-260"
              y="-55"
              width="520"
              height="110"
              rx="18"
              fill="#064E3B"
              stroke="#10B981"
              strokeWidth="4"
            />
            <rect
              x="-250"
              y="-45"
              width="500"
              height="90"
              rx="12"
              fill="#022C22"
              opacity="0.95"
            />

            <text
              x="0"
              y="5"
              fill="#34D399"
              fontSize="52"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="6"
              style={{
                filter: "drop-shadow(0 0 12px #10B981)",
              }}
            >
              PHYSICAL ROT
            </text>

            <text
              x="0"
              y="32"
              fill="#A7F3D0"
              fontSize="14"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="3"
            >
              DELUSION OF SOMATIC PUTREFACTION
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
