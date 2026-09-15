import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 126: Human operating system crash
 * Duration: 180 frames (6.0s)
 * Environment: Cybernetic/tech UI space.
 * Characters & Props: Wireframe torso, glowing blue components.
 * Action:
 * - Beginning: The red wireframe human torso is centered. Glowing blue vector components (representing Neurotransmitters) are moving along pathways.
 * - Action / Climax: The Blue components stop moving and flicker. One by one, they turn grey and shatter into digital dust. The red wireframe then collapses on itself and dissolves.
 * - Ending / Hold: The screen goes completely dark, leaving only a small flashing green cursor (_) in the corner.
 * Text & Specific Colors: Neurotransmitter components blue (#3B82F6) shifting to grey (#94A3B8). Wireframe Red (#EF4444). Background Navy Blue (#0F172A). Green cursor (#22C55E).
 */
export const Scene126_Humanoperatingsystemcrash = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const entranceScale = interpolate(enterSpring, [0, 1], [0.92, 1]);

  // Neurotransmitter nodes
  const nodes = [
    { id: 0, x: -60, y: -80, pathY: -80, shatterFrame: 70 },
    { id: 1, x: 60, y: -80, pathY: -80, shatterFrame: 78 },
    { id: 2, x: 0, y: -20, pathY: -20, shatterFrame: 86 },
    { id: 3, x: -45, y: 50, pathY: 50, shatterFrame: 94 },
    { id: 4, x: 45, y: 50, pathY: 50, shatterFrame: 102 },
  ];

  // Motion phase: frames 0 to 42 circulating; frame 42+ halted & flickering
  const isMoving = frame < 42;

  // Red wireframe collapse: frames 105 to 140
  const collapseSpring = spring({
    frame: frame - 105,
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const wireframeScale = interpolate(collapseSpring, [0, 1], [1, 0.05]);
  const wireframeOpacity = interpolate(frame, [105, 138], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Green cursor flashing in corner (frame 140 to 180)
  const isCursorActive = frame >= 140;
  const cursorBlink = Math.floor((frame - 140) / 15) % 2 === 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-mono"
      style={{
        backgroundColor: frame >= 140 ? "#000000" : "#0F172A",
      }}
    >
      {/* Header Container (Visible prior to collapse) */}
      {frame < 135 && (
        <div
          className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
          style={{
            opacity: interpolate(frame, [110, 135], [entranceOpacity, 0]),
            transform: `scale(${entranceScale})`,
          }}
        >
          <div
            className="px-8 py-2.5 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-2xl flex flex-col items-center"
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "1.5px solid #EF4444",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-red-600 text-white">
                Core OS Decompilation
              </span>
              <span className="text-xs font-bold tracking-wider text-red-300">
                Neurotransmitter Exhaustion
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-white">
              Human Operating System Crash
            </h1>
          </div>
        </div>
      )}

      {/* Main SVG Center Stage */}
      {wireframeOpacity > 0.01 && (
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
        >
          <defs>
            <filter id="crashGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* --- RED WIREFRAME TORSO (Collapsing inward: scale & opacity) --- */}
          <g
            id="redTorso"
            transform={`translate(960, 540) scale(${wireframeScale})`}
            filter="url(#crashGlow)"
            style={{ opacity: wireframeOpacity }}
          >
            {/* Torso Outer Silhouette Mesh */}
            <path
              d="M -140 -160 L 140 -160 L 90 140 L -90 140 Z"
              fill="none"
              stroke="#EF4444"
              strokeWidth={4.5}
            />

            {/* Internal Ribcage Lattice */}
            {[-110, -60, -10, 40, 90].map((ry, i) => (
              <line
                key={i}
                x1={-130 + Math.abs(ry) * 0.2}
                y1={ry}
                x2={130 - Math.abs(ry) * 0.2}
                y2={ry}
                stroke="#EF4444"
                strokeWidth={2.5}
                strokeDasharray="6 4"
              />
            ))}

            {/* Center Spine Axis */}
            <line x1={0} y1={-160} x2={0} y2={140} stroke="#EF4444" strokeWidth={5} />

            {/* Neural Pathways (Diagonal conduits) */}
            <path d="M -110 -140 L 0 -20 L 110 -140" fill="none" stroke="#EF4444" strokeWidth={2} opacity={0.6} />
            <path d="M -80 120 L 0 -20 L 80 120" fill="none" stroke="#EF4444" strokeWidth={2} opacity={0.6} />

            {/* --- 5 NEUROTRANSMITTER COMPONENTS --- */}
            {nodes.map((node) => {
              const hasShattered = frame >= node.shatterFrame;
              const isGrey = frame >= 42;
              const nodeColor = isGrey ? "#94A3B8" : "#3B82F6";

              // Floating movement when alive
              const curX = isMoving ? node.x + Math.sin(frame * 0.2 + node.id) * 15 : node.x;
              const curY = isMoving ? node.y + Math.cos(frame * 0.2 + node.id) * 12 : node.y;

              if (hasShattered) {
                // Digital dust particles exploding outward
                const dustAge = frame - node.shatterFrame;
                const dustAlpha = Math.max(0, 1 - dustAge / 25);
                if (dustAlpha <= 0) return null;

                return (
                  <g key={node.id} transform={`translate(${curX}, ${curY})`} opacity={dustAlpha}>
                    {[0, 60, 120, 180, 240, 300].map((ang, aIdx) => {
                      const rad = (ang * Math.PI) / 180;
                      const dist = dustAge * 4;
                      return (
                        <rect
                          key={aIdx}
                          x={Math.cos(rad) * dist}
                          y={Math.sin(rad) * dist}
                          width={4}
                          height={4}
                          fill="#94A3B8"
                        />
                      );
                    })}
                  </g>
                );
              }

              return (
                <g key={node.id} transform={`translate(${curX}, ${curY})`}>
                  {/* Glowing Halo */}
                  <circle cx={0} cy={0} r={16} fill={nodeColor} opacity={0.3} />
                  {/* Component Core */}
                  <circle cx={0} cy={0} r={9} fill={nodeColor} stroke="#FFFFFF" strokeWidth={2} />
                </g>
              );
            })}
          </g>
        </svg>
      )}

      {/* --- ENDING FLASHING GREEN CURSOR (_) IN CORNER --- */}
      {isCursorActive && (
        <div className="absolute top-16 left-20 pointer-events-none z-50 flex items-center gap-2">
          <span className="text-2xl font-mono font-bold" style={{ color: "#22C55E" }}>
            {cursorBlink ? "_" : " "}
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};
