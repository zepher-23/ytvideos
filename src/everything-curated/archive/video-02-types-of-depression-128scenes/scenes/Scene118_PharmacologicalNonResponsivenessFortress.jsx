import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 118: Pharmacological Non-Responsiveness Fortress
 * Duration: 210 frames (7.0s)
 * Environment: Abstract symbolic space.
 * Characters & Props: A towering, impenetrable stone fortress wall, tiny medical pills.
 * Action:
 * - Beginning: A towering, visually dense stone fortress wall labeled "DEPRESSION" completely blocks the screen.
 * - Action / Climax: Hundreds of tiny medical pills, capsules, and syringes fly from the top of the screen at the wall like a massive barrage of arrows.
 * - Ending / Hold: They all hit the solid stone and bounce off completely harmlessly, doing zero damage, and scatter on the ground.
 * Text & Specific Colors: Stone wall slate grey (#475569) with moss green accents. Pills standard clinical colors.
 */
export const Scene118_PharmacologicalNonResponsivenessFortress = () => {
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

  // Wall impact boundary
  const wallX = 980;

  // Barrage projectiles (pills, capsules, syringes)
  const projectiles = [
    { type: "capsule", startX: -50, startY: 120, targetY: 420, delay: 10, speed: 28, color: "#3B82F6" },
    { type: "pill", startX: -80, startY: 240, targetY: 520, delay: 16, speed: 32, color: "#FBBF24" },
    { type: "syringe", startX: -120, startY: 80, targetY: 360, delay: 22, speed: 30, color: "#06B6D4" },
    { type: "capsule", startX: 100, startY: -60, targetY: 480, delay: 28, speed: 29, color: "#EF4444" },
    { type: "pill", startX: -60, startY: 300, targetY: 620, delay: 34, speed: 34, color: "#22C55E" },
    { type: "capsule", startX: 40, startY: -40, targetY: 390, delay: 40, speed: 31, color: "#8B5CF6" },
    { type: "syringe", startX: -150, startY: 150, targetY: 450, delay: 48, speed: 33, color: "#06B6D4" },
    { type: "pill", startX: -90, startY: 200, targetY: 560, delay: 55, speed: 30, color: "#F59E0B" },
    { type: "capsule", startX: 120, startY: -80, targetY: 340, delay: 62, speed: 35, color: "#3B82F6" },
    { type: "pill", startX: -40, startY: 260, targetY: 670, delay: 70, speed: 31, color: "#EC4899" },
    { type: "capsule", startX: -110, startY: 100, targetY: 440, delay: 78, speed: 32, color: "#10B981" },
    { type: "syringe", startX: -70, startY: 180, targetY: 530, delay: 86, speed: 34, color: "#06B6D4" },
    { type: "capsule", startX: -30, startY: 320, targetY: 710, delay: 94, speed: 29, color: "#F97316" },
    { type: "pill", startX: 80, startY: -30, targetY: 380, delay: 102, speed: 33, color: "#FBBF24" },
    { type: "capsule", startX: -130, startY: 140, targetY: 590, delay: 110, speed: 30, color: "#6366F1" },
  ];

  // Stones grid for the massive fortress
  const stoneRows = [
    { y: 220, blocks: [180, 220, 190, 240, 200] },
    { y: 310, blocks: [210, 190, 230, 180, 220] },
    { y: 400, blocks: [190, 230, 200, 210, 200] },
    { y: 490, blocks: [220, 200, 210, 190, 210] },
    { y: 580, blocks: [180, 240, 190, 220, 200] },
    { y: 670, blocks: [230, 190, 220, 200, 190] },
    { y: 760, blocks: [200, 210, 200, 230, 190] },
  ];

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B0F19",
      }}
    >
      {/* Background Ambience */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(30, 41, 59, 0.6) 0%, rgba(11, 15, 25, 1) 85%)",
        }}
      />

      {/* Header Container with Deterministic Containment */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: entranceOpacity,
          transform: `scale(${entranceScale})`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl flex flex-col items-center"
          style={{
            backgroundColor: "rgba(30, 41, 59, 0.85)",
            border: "1.5px solid #475569",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 rounded-full uppercase bg-slate-700 text-slate-300">
              Pharmacological Fortress
            </span>
            <span className="text-xs font-bold tracking-wider text-slate-400">
              Treatment Resistance Pathology
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-wider uppercase m-0 mt-1 leading-tight text-white">
            Monoaminergic Barrage Deflected
          </h1>
          <p className="text-sm font-semibold text-slate-300 m-0">
            Dozens of medications strike the pathophysiology with zero therapeutic penetration
          </p>
        </div>
      </div>

      {/* Main SVG Scene */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20"
      >
        <defs>
          <linearGradient id="stoneBlockGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <filter id="wallShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="-15" dy="0" stdDeviation="20" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* --- TOWERING IMPENETRABLE STONE FORTRESS WALL (x=980 to 1920) --- */}
        <g id="fortressWall" transform="translate(980, 0)" filter="url(#wallShadow)">
          {/* Wall Base Slab */}
          <rect x={0} y={180} width={960} height={700} fill="#1E293B" />

          {/* Stone Blocks Grid */}
          {stoneRows.map((row, rIdx) => {
            let currentX = 0;
            return (
              <g key={rIdx} transform={`translate(0, ${row.y})`}>
                {row.blocks.map((bw, bIdx) => {
                  const bx = currentX;
                  currentX += bw;
                  return (
                    <g key={bIdx} transform={`translate(${bx}, 0)`}>
                      <rect
                        x={2}
                        y={2}
                        width={bw - 4}
                        height={86}
                        rx={6}
                        fill="url(#stoneBlockGrad)"
                        stroke="#1E293B"
                        strokeWidth={3}
                      />
                      {/* Moss Green Accent Patches */}
                      {(rIdx + bIdx) % 3 === 0 && (
                        <path
                          d={`M 8 70 Q ${bw * 0.3} 55 ${bw * 0.5} 75 Q ${bw * 0.8} 60 ${bw - 12} 80`}
                          stroke="#15803D"
                          strokeWidth={4}
                          fill="none"
                          opacity={0.7}
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Battlements along top */}
          {[0, 160, 320, 480, 640, 800].map((batX) => (
            <rect
              key={batX}
              x={batX + 10}
              y={140}
              width={90}
              height={50}
              rx={6}
              fill="#334155"
              stroke="#1E293B"
              strokeWidth={3}
            />
          ))}

          {/* Engraved Deep Stone Header: "DEPRESSION" */}
          <g transform="translate(180, 470)">
            <rect
              x={-20}
              y={-50}
              width={480}
              height={80}
              rx={12}
              fill="rgba(15, 23, 42, 0.85)"
              stroke="#64748B"
              strokeWidth={2}
            />
            <text
              x={220}
              y={6}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize={46}
              fontWeight="900"
              letterSpacing={14}
            >
              DEPRESSION
            </text>
          </g>
        </g>

        {/* --- PROJECTILES BARRAGE & HARMLESS DEFLECTION --- */}
        {projectiles.map((p, idx) => {
          if (frame < p.delay) return null;
          const elapsed = frame - p.delay;

          // Flight distance to wall
          const totalDistanceX = wallX - p.startX;
          const flightFrames = totalDistanceX / p.speed;

          if (elapsed <= flightFrames) {
            // IN FLIGHT (Flying toward wall)
            const flightProgress = elapsed / flightFrames;
            const curX = interpolate(flightProgress, [0, 1], [p.startX, wallX]);
            const curY = interpolate(flightProgress, [0, 1], [p.startY, p.targetY]);
            const angleDeg = (Math.atan2(p.targetY - p.startY, totalDistanceX) * 180) / Math.PI;

            return (
              <g key={idx} transform={`translate(${curX}, ${curY}) rotate(${angleDeg})`}>
                {p.type === "capsule" && (
                  <g>
                    <rect x={-22} y={-8} width={22} height={16} rx={8} fill={p.color} />
                    <rect x={0} y={-8} width={22} height={16} rx={8} fill="#FFFFFF" />
                  </g>
                )}
                {p.type === "pill" && (
                  <ellipse cx={0} cy={0} rx={12} ry={12} fill={p.color} stroke="#FFFFFF" strokeWidth={2} />
                )}
                {p.type === "syringe" && (
                  <g>
                    <line x1={0} y1={0} x2={26} y2={0} stroke="#94A3B8" strokeWidth={2} />
                    <rect x={-28} y={-5} width={28} height={10} rx={2} fill="rgba(6, 182, 212, 0.6)" stroke="#FFFFFF" strokeWidth={1.5} />
                  </g>
                )}
              </g>
            );
          } else {
            // DEFLECTED & BOUNCING OFF TO GROUND (Zero damage)
            const bounceElapsed = elapsed - flightFrames;
            const bounceProgress = Math.min(1, bounceElapsed / 35);
            // Rebound left and down
            const bounceX = wallX - bounceProgress * 90 - (idx % 3) * 15;
            const bounceY = p.targetY + Math.sin(bounceProgress * Math.PI) * -40 + bounceProgress * bounceProgress * 260;
            const spin = bounceElapsed * 24 * (idx % 2 === 0 ? 1 : -1);

            return (
              <g key={idx}>
                {/* Tiny harmless contact spark at impact frame */}
                {bounceElapsed < 6 && (
                  <g transform={`translate(${wallX}, ${p.targetY})`}>
                    <line x1={0} y1={0} x2={-14} y2={-10} stroke="#FDE047" strokeWidth={2.5} />
                    <line x1={0} y1={0} x2={-16} y2={8} stroke="#FDE047" strokeWidth={2.5} />
                  </g>
                )}
                {/* Tumbling projectile */}
                <g transform={`translate(${bounceX}, ${bounceY}) rotate(${spin})`}>
                  {p.type === "capsule" && (
                    <g opacity={0.85}>
                      <rect x={-22} y={-8} width={22} height={16} rx={8} fill={p.color} />
                      <rect x={0} y={-8} width={22} height={16} rx={8} fill="#FFFFFF" />
                    </g>
                  )}
                  {p.type === "pill" && (
                    <ellipse cx={0} cy={0} rx={12} ry={12} fill={p.color} stroke="#FFFFFF" strokeWidth={2} opacity={0.85} />
                  )}
                  {p.type === "syringe" && (
                    <g opacity={0.85}>
                      <line x1={0} y1={0} x2={26} y2={0} stroke="#94A3B8" strokeWidth={2} />
                      <rect x={-28} y={-5} width={28} height={10} rx={2} fill="rgba(6, 182, 212, 0.6)" stroke="#FFFFFF" strokeWidth={1.5} />
                    </g>
                  )}
                </g>
              </g>
            );
          }
        })}

        {/* Scattered pills lying harmlessly on ground */}
        <g transform="translate(740, 840)">
          <ellipse cx={20} cy={10} rx={14} ry={8} fill="#3B82F6" opacity={0.6} />
          <ellipse cx={70} cy={14} rx={10} ry={6} fill="#F59E0B" opacity={0.6} />
          <ellipse cx={120} cy={8} rx={12} ry={7} fill="#10B981" opacity={0.6} />
          <ellipse cx={180} cy={12} rx={15} ry={8} fill="#EF4444" opacity={0.6} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
