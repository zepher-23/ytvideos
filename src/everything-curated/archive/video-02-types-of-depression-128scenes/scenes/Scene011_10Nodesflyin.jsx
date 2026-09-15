import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 11: 10 Nodes fly in
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Dark clinical space (#0F172A)
 * - Characters & Props: Central pulsing grey brain icon, 10 distinct colored glowing nodes
 * - Beginning: Central brain icon pulses in center (frames 0-30).
 * - Action/Climax: 10 distinctly colored nodes fly in from screen edges one by one
 *   and attach around the perimeter of the brain (frames 25-110).
 * - Ending/Hold: All 10 nodes pulse independently in slow breathing animation to frame 180.
 */
export const Scene011_10Nodesflyin = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // Central Brain pulse
  const brainPulse = 1 + Math.sin(frame * 0.1) * 0.04;

  // The 10 distinct clinical nodes (representing the 10 types of depression)
  const nodes = [
    { id: 1, name: "MDD", color: "#38BDF8", startAngle: 0, fromX: -200, fromY: 100, delay: 20 },
    { id: 2, name: "PDD", color: "#A855F7", startAngle: 36, fromX: -150, fromY: -300, delay: 28 },
    { id: 3, name: "BIPOLAR", color: "#EF4444", startAngle: 72, fromX: 500, fromY: -400, delay: 36 },
    { id: 4, name: "SAD", color: "#06B6D4", startAngle: 108, fromX: 1200, fromY: -350, delay: 44 },
    { id: 5, name: "ATYPICAL", color: "#EC4899", startAngle: 144, fromX: 2100, fromY: 100, delay: 52 },
    { id: 6, name: "PSYCHOTIC", color: "#F43F5E", startAngle: 180, fromX: 2100, fromY: 600, delay: 60 },
    { id: 7, name: "POSTPARTUM", color: "#F472B6", startAngle: 216, fromX: 1800, fromY: 1200, delay: 68 },
    { id: 8, name: "PMDD", color: "#EAB308", startAngle: 252, fromX: 960, fromY: 1300, delay: 76 },
    { id: 9, name: "DMDD", color: "#F97316", startAngle: 288, fromX: -200, fromY: 1100, delay: 84 },
    { id: 10, name: "TRD", color: "#10B981", startAngle: 324, fromX: -300, fromY: 540, delay: 92 },
  ];

  const brainRadius = 240;

  return (
    <AbsoluteFill className="bg-[#0F172A] overflow-hidden select-none font-sans text-white">
      {/* Background Subtle Radial Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s11" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.5" fill="#38BDF8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s11)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-14 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6"
        style={{ opacity: enterOpacity }}
      >
        <div className="px-10 py-3.5 rounded-2xl bg-[#1E293B]/90 border border-[#38BDF8]/40 shadow-2xl backdrop-blur-md flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#38BDF8] animate-ping" />
          <h1 className="text-white text-3xl md:text-4xl font-black tracking-widest uppercase m-0">
            10 DISTINCT PATHOLOGIES
          </h1>
        </div>
      </div>

      {/* Main SVG Stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 1920 1080"
          className="w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            <filter id="brain-glow-s11" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#64748B" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* CENTRAL MINIMALIST BRAIN ICON (Center 960, 540) */}
          <g
            transform={`translate(960, 540) scale(${brainPulse})`}
            filter="url(#brain-glow-s11)"
          >
            {/* Brain Outer Base */}
            <circle cx="0" cy="0" r="140" fill="#1E293B" stroke="#475569" strokeWidth="6" />
            {/* Two Lobes Silhouette */}
            <path
              d="M -70 -60
                 C -110 -60 -130 -10 -110 40
                 C -90 90 -40 100 0 90
                 C 40 100 90 90 110 40
                 C 130 -10 110 -60 70 -60
                 C 50 -100 -50 -100 -70 -60 Z"
              fill="#334155"
              stroke="#64748B"
              strokeWidth="4"
            />
            {/* Inner Hemispheric divider */}
            <line x1="0" y1="-80" x2="0" y2="85" stroke="#94A3B8" strokeWidth="4" strokeDasharray="6 4" />
            <text x="0" y="8" textAnchor="middle" fill="#CBD5E1" fontSize="16" fontWeight="900" letterSpacing="3">
              CENTRAL AXIS
            </text>
          </g>

          {/* 10 FLYING IN NODES */}
          {nodes.map((node, index) => {
            const hasStarted = frame >= node.delay;
            if (!hasStarted) return null;

            const flySpring = spring({
              frame: frame - node.delay,
              fps,
              config: { damping: 13, stiffness: 140 },
            });

            // Target position on orbit around central brain
            const targetRad = (node.startAngle * Math.PI) / 180;
            const targetX = 960 + Math.cos(targetRad) * brainRadius;
            const targetY = 540 + Math.sin(targetRad) * brainRadius;

            // Interpolate from edge to orbit
            const curX = interpolate(flySpring, [0, 1], [node.fromX, targetX]);
            const curY = interpolate(flySpring, [0, 1], [node.fromY, targetY]);

            // Independent breathing pulse after attaching
            const isAttached = flySpring > 0.95;
            const nodePulse = isAttached ? 1 + Math.sin(frame * 0.12 + index * 0.7) * 0.1 : 1;

            return (
              <g
                key={node.id}
                transform={`translate(${curX}, ${curY}) scale(${flySpring * nodePulse})`}
              >
                {/* Connecting Tether Line to Brain when attached */}
                {isAttached && (
                  <line
                    x1={0}
                    y1={0}
                    x2={960 - curX}
                    y2={540 - curY}
                    stroke={node.color}
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                )}

                {/* Glowing Outer Halo */}
                <circle cx="0" cy="0" r="38" fill={node.color} opacity="0.25" />
                {/* Solid Node Core */}
                <circle cx="0" cy="0" r="26" fill="#1E293B" stroke={node.color} strokeWidth="4.5" />
                <circle cx="0" cy="0" r="14" fill={node.color} />

                {/* Label Badge */}
                {isAttached && (
                  <g transform="translate(0, 48)">
                    <rect
                      x="-55"
                      y="-14"
                      width="110"
                      height="26"
                      rx="6"
                      fill="#0F172A"
                      stroke={node.color}
                      strokeWidth="1.5"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="11"
                      fontWeight="900"
                      letterSpacing="1"
                    >
                      {node.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
