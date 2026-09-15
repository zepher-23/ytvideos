import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 28: Office Stickman Stone Backpack
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Generic vector office cubicle (#0F172A / slate)
 * - Characters & Props: Stickman at computer desk, massive slate grey stone backpack (#475569)
 * - Beginning: Stickman is typing slowly. Text "PERMANENT BASELINE" types above (frames 0-35).
 * - Action/Climax: Shifts shoulders, revealing massive stone backpack crushing office chair (frame 45).
 * - Ending/Hold: Slumps further forward, continues typing endlessly to frame 180.
 */
export const Scene028_OfficeStickmanStoneBackpack = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance fade
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Typing hands motion
  const typingX = Math.sin(frame * 0.6) * 3;
  const typingY = Math.cos(frame * 0.8) * 2;

  // 3. Shoulder shift & chair crush (frames 40 to 80)
  const backpackReveal = interpolate(frame, [40, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slumpForward = interpolate(frame, [45, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chair back squash
  const chairSquashY = 1 - backpackReveal * 0.22;

  // Typewriter for "PERMANENT BASELINE"
  const titleText = "PERMANENT BASELINE";
  const titleChars = Math.floor(interpolate(frame, [10, 42], [0, titleText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Cubicle Background Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
        <defs>
          <pattern id="cubicle-grid-s28" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#64748B" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cubicle-grid-s28)" />
      </svg>

      {/* Floor Line */}
      <div className="absolute bottom-28 left-0 right-0 h-1.5 bg-slate-700/60" />

      {/* Header Container */}
      <div
        className="absolute top-16 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-20 px-6"
        style={{ opacity: enterOpacity }}
      >
        <div className="px-10 py-3.5 rounded-2xl bg-[#0F172A]/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block mb-1">
            HIGH-FUNCTIONING DYSTHYMIA
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-none text-white">
            {titleText.slice(0, titleChars)}
          </h1>
        </div>
      </div>

      {/* Main Office Stage SVG */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="desk-shadow-s28" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* OFFICE DESK & COMPUTER (Right of Stickman, Center x=1180, y=740) */}
        <g transform="translate(1180, 740)" filter="url(#desk-shadow-s28)">
          {/* Desk Surface & Legs */}
          <rect x="-80" y="-120" width="320" height="24" rx="4" fill="#334155" stroke="#475569" strokeWidth="3" />
          <rect x="-60" y="-96" width="16" height="180" fill="#1E293B" />
          <rect x="200" y="-96" width="16" height="180" fill="#1E293B" />

          {/* Computer Monitor */}
          <rect x="-20" y="-240" width="180" height="110" rx="8" fill="#18181B" stroke="#64748B" strokeWidth="4" />
          <rect x="-10" y="-230" width="160" height="90" rx="4" fill="#0284C7" fillOpacity="0.4" />
          {/* Monitor Screen Code lines */}
          <line x1="10" y1="-200" x2="90" y2="-200" stroke="#38BDF8" strokeWidth="3" />
          <line x1="10" y1="-180" x2="130" y2="-180" stroke="#38BDF8" strokeWidth="3" />
          <line x1="10" y1="-160" x2="70" y2="-160" stroke="#38BDF8" strokeWidth="3" />
          {/* Monitor Stand */}
          <rect x="60" y="-130" width="20" height="14" fill="#475569" />
          <rect x="40" y="-116" width="60" height="6" rx="2" fill="#64748B" />

          {/* Keyboard & Mouse */}
          <rect x="-50" y="-126" width="80" height="8" rx="2" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
          <ellipse cx="45" cy="-122" rx="8" ry="5" fill="#475569" />
        </g>

        {/* OFFICE CHAIR (Center x=880, y=740) */}
        <g transform="translate(880, 740)">
          {/* Chair Base & Wheels */}
          <line x1="0" y1="-20" x2="0" y2="70" stroke="#1E293B" strokeWidth="12" />
          <line x1="-50" y1="70" x2="50" y2="70" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
          <circle cx="-50" cy="78" r="8" fill="#000000" />
          <circle cx="50" cy="78" r="8" fill="#000000" />

          {/* Chair Seat Cushion */}
          <rect x="-65" y="-35" width="130" height="24" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="3" />

          {/* Chair Backrest (Squashes when stone backpack pushes against it) */}
          <g transform={`translate(-60, -80) scale(1, ${chairSquashY})`}>
            <rect x="-18" y="-90" width="36" height="140" rx="14" fill="#334155" stroke="#475569" strokeWidth="4" />
          </g>
        </g>

        {/* STICKMAN SITTING & TYPING (Center x=890, y=740) */}
        <g transform={`translate(${slumpForward * 18}, ${slumpForward * 14})`}>
          {/* Canonical CuratedStickman in seated posture */}
          <CuratedStickman
            x={890}
            y={740}
            scale={1.15}
            variant="adult"
            pose="defeat"
            mouth="frown"
            eyes="defeat"
            lookDirection="right"
            slumpProgress={slumpForward}
            frame={frame}
          />

          {/* Typing Hands extending to keyboard */}
          <g transform={`translate(${typingX}, ${typingY})`} stroke="#000000" strokeWidth="6" strokeLinecap="round">
            <line x1="910" y1="675" x2="1120" y2="620" />
            <circle cx="1120" cy="620" r="8" fill="#000000" />
          </g>

          {/* MASSIVE GREY STONE BACKPACK ANCHORED TO HIM (#475569) */}
          <g
            transform={`translate(${810 - backpackReveal * 20}, 620)`}
            filter="drop-shadow(0 12px 18px rgba(0,0,0,0.8))"
          >
            {/* Shoulder Straps wrapping around stickman torso */}
            <path d="M 40 -80 C 70 -60 70 30 40 50" fill="none" stroke="#18181B" strokeWidth="8" strokeLinecap="round" />

            {/* Massive Stone Boulder Shape */}
            <polygon
              points="-90,-110 30,-120 70,-40 60,60 10,110 -70,90 -110,0"
              fill="#475569"
              stroke="#1E293B"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Rock cracks and fissures */}
            <line x1="-50" y1="-80" x2="10" y2="20" stroke="#334155" strokeWidth="4" />
            <line x1="10" y1="20" x2="35" y2="-10" stroke="#334155" strokeWidth="3" />
            <line x1="-30" y1="30" x2="-10" y2="70" stroke="#334155" strokeWidth="3" />

            <text
              x="-20"
              y="10"
              textAnchor="middle"
              fill="#CBD5E1"
              fontSize="18"
              fontFamily="monospace"
              fontWeight="900"
              letterSpacing="2"
            >
              DYSTHYMIA
            </text>
          </g>
        </g>
      </svg>

      {/* Bottom Subtitle Card */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center pointer-events-none z-30">
        <div className="px-10 py-3 rounded-2xl bg-black/95 border border-slate-700 shadow-2xl">
          <span className="font-mono text-sm md:text-base font-black tracking-widest uppercase text-slate-300">
            FUNCTIONING UNDER MONUMENTAL LOAD // NEVER AT ZERO, NEVER FREE
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
