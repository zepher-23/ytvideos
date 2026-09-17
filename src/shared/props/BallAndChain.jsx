import React from "react";

/**
 * BallAndChain - Canonical Giant Prison Steel Ball & Chain Prop
 * 
 * Features:
 * - Giant heavy cast-iron sphere with metallic specular shading and contact floor shadow.
 * - Heavy interlocking steel chain links connecting ball eyelet to target ankle coordinate.
 * - Hinged ankle shackle/cuff with locking bolt and attachment ring.
 * - Floor friction scrape marks behind the dragged ball.
 */
export const BallAndChain = ({
  ballX = 450,
  ballY = 710, // rests on floor at y=800 when radius=90
  radius = 90,
  targetX = 750, // ankle cuff X
  targetY = 790, // ankle cuff Y
  isTaut = true,
  dragProgress = 0,
}) => {
  // Eyelet connection point on the front-top of the giant ball
  const eyeletX = ballX + radius * 0.75;
  const eyeletY = ballY - radius * 0.2;

  // Generate interlocking chain links between eyelet and ankle cuff
  const dx = targetX - eyeletX;
  const dy = targetY - eyeletY;
  const dist = Math.hypot(dx, dy);
  const numLinks = Math.max(5, Math.floor(dist / 32));

  const chainLinks = [];
  for (let i = 0; i <= numLinks; i++) {
    const t = i / numLinks;
    // Catenary dip if not fully taut, or slight natural sag
    const sag = isTaut ? Math.sin(t * Math.PI) * 12 : Math.sin(t * Math.PI) * 35;
    const lx = eyeletX + dx * t;
    const ly = eyeletY + dy * t + sag;

    // Angle of link
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const isOdd = i % 2 === 1;

    chainLinks.push({
      x: lx,
      y: ly,
      angle: isOdd ? angle + 25 : angle - 25,
      isOdd,
    });
  }

  return (
    <g id="canonical-ball-and-chain">
      <defs>
        {/* Cast Iron Ball Shading */}
        <radialGradient id="prison-ball-iron" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="25%" stopColor="#334155" />
          <stop offset="60%" stopColor="#1E293B" />
          <stop offset="90%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>

        {/* Specular Highlight Streak */}
        <linearGradient id="iron-specular" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#CBD5E1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Chain Link Metallic Gradients */}
        <linearGradient id="chain-steel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* ================= FLOOR SCRAPE MARKS (BEHIND BALL) ================= */}
      <g stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.6">
        <line x1={ballX - radius * 1.6} y1={ballY + radius - 2} x2={ballX - radius * 0.4} y2={ballY + radius - 2} strokeDasharray="14 6" />
        <line x1={ballX - radius * 2.2} y1={ballY + radius - 5} x2={ballX - radius * 0.6} y2={ballY + radius - 5} strokeDasharray="20 8" strokeWidth="2.5" />
        <line x1={ballX - radius * 1.2} y1={ballY + radius} x2={ballX - radius * 0.2} y2={ballY + radius} strokeDasharray="10 5" strokeWidth="2" />
      </g>

      {/* ================= BALL FLOOR CONTACT DROP SHADOW ================= */}
      <ellipse
        cx={ballX}
        cy={ballY + radius}
        rx={radius * 0.95}
        ry={14}
        fill="#000000"
        opacity="0.38"
      />

      {/* ================= GIANT STEEL BALL ================= */}
      <g>
        {/* Core Cast Iron Sphere */}
        <circle
          cx={ballX}
          cy={ballY}
          r={radius}
          fill="url(#prison-ball-iron)"
          stroke="#0F172A"
          strokeWidth="6"
        />

        {/* Specular Curved Sheen Highlight */}
        <ellipse
          cx={ballX - radius * 0.32}
          cy={ballY - radius * 0.35}
          rx={radius * 0.28}
          ry={radius * 0.16}
          transform={`rotate(-28 ${ballX - radius * 0.32} ${ballY - radius * 0.35})`}
          fill="url(#iron-specular)"
        />

        {/* Subtle Debossed Weight Rivet Markings */}
        <circle cx={ballX + radius * 0.15} cy={ballY + radius * 0.25} r="4" fill="#0F172A" />
        <circle cx={ballX - radius * 0.15} cy={ballY + radius * 0.35} r="4" fill="#0F172A" />
        <circle cx={ballX} cy={ballY + radius * 0.45} r="4" fill="#0F172A" />

        {/* Welded Heavy Eyelet Ring on Front of Ball */}
        <g transform={`translate(${eyeletX}, ${eyeletY})`}>
          {/* Base weld flange */}
          <rect x="-6" y="-12" width="10" height="24" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
          {/* Eyelet loop */}
          <circle cx="8" cy="0" r="14" fill="none" stroke="#334155" strokeWidth="8" />
          <circle cx="8" cy="0" r="14" fill="none" stroke="#0F172A" strokeWidth="3" />
        </g>
      </g>

      {/* ================= INTERLOCKING STEEL CHAIN LINKS ================= */}
      <g id="steel-chain-links">
        {chainLinks.map((link, idx) => (
          <g
            key={idx}
            transform={`translate(${link.x}, ${link.y}) rotate(${link.angle})`}
          >
            {/* Outer Link Ring */}
            <rect
              x="-16"
              y={link.isOdd ? "-7" : "-10"}
              width="32"
              height={link.isOdd ? "14" : "20"}
              rx={link.isOdd ? "6" : "9"}
              fill="none"
              stroke="url(#chain-steel)"
              strokeWidth={link.isOdd ? "6" : "7.5"}
            />
            {/* Link Inner Dark Hole */}
            <rect
              x="-16"
              y={link.isOdd ? "-7" : "-10"}
              width="32"
              height={link.isOdd ? "14" : "20"}
              rx={link.isOdd ? "6" : "9"}
              fill="none"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </g>
        ))}
      </g>

      {/* ================= ANKLE SHACKLE / CUFF ================= */}
      <g id="ankle-shackle" transform={`translate(${targetX}, ${targetY})`}>
        {/* Attachment D-Ring on cuff */}
        <path
          d="M -16 0 C -26 -8, -26 8, -16 0"
          fill="none"
          stroke="#334155"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Outer Heavy Steel Cuff Band around Ankle */}
        <rect
          x="-14"
          y="-12"
          width="28"
          height="24"
          rx="7"
          fill="#1E293B"
          stroke="#0F172A"
          strokeWidth="4.5"
        />

        {/* Locking Rivet / Bolt Pin */}
        <circle cx="6" cy="0" r="4" fill="#64748B" stroke="#0F172A" strokeWidth="1.5" />
        <rect x="-10" y="-8" width="4" height="16" rx="1.5" fill="#475569" />
      </g>
    </g>
  );
};
