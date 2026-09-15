import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 4: Brain Malfunction blueprint
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Dark digital blueprint aesthetic (Cyan #22D3EE on #0F172A)
 * - Beginning: Detailed brain blueprint drawn instantly. "BIOLOGICAL MALFUNCTION" types above.
 * - Action/Climax: Horizontal laser scanner moves down (frames 35-100). As it passes,
 *   jagged red break icons appear over key neurological pathways.
 * - Ending/Hold: Break icons pulse with red warning glows to frame 180.
 */
export const Scene004_BrainMalfunctionblueprint = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Zoom-in entrance transition
  const enterScale = interpolate(frame, [0, 15], [1.3, 1.0], {
    extrapolateRight: "clamp",
  });
  const enterOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 2. Typewriter for "BIOLOGICAL MALFUNCTION"
  const fullText = "BIOLOGICAL MALFUNCTION";
  const charCount = Math.floor(interpolate(frame, [8, 38], [0, fullText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  const displayedText = fullText.slice(0, charCount);
  const showCursor = frame < 50 ? Math.floor(frame / 6) % 2 === 0 : false;

  // 3. Laser Scanner Line (moves down from Y=220 to Y=780 between frames 35 and 105)
  const laserProgress = interpolate(frame, [35, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const laserY = 220 + laserProgress * 560;
  const laserActive = frame >= 35 && frame <= 110;

  // 4. Break Icons data (triggered as laser reaches their Y position)
  const breakPoints = [
    { id: 1, x: 880, y: 360, label: "PREFRONTAL CORTEX", triggerFrame: 50 },
    { id: 2, x: 1060, y: 440, label: "LIMBIC CIRCUIT", triggerFrame: 65 },
    { id: 3, x: 820, y: 520, label: "AMYGDALA PATHWAY", triggerFrame: 75 },
    { id: 4, x: 990, y: 610, label: "HIPPOCAMPUS AXIS", triggerFrame: 88 },
    { id: 5, x: 1110, y: 560, label: "RAPHE NUCLEI", triggerFrame: 96 },
  ];

  // 5. Ending Pulse of the break icons (frame 100 onwards)
  const pulseScale = 1 + Math.sin(frame * 0.2) * 0.12;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans">
      {/* Blueprint Grid Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
        <defs>
          <pattern id="bp-grid-s4" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bp-grid-s4)" />
      </svg>

      {/* Camera Viewport with Zoom entrance */}
      <div
        className="w-full h-full relative"
        style={{
          transform: `scale(${enterScale})`,
          opacity: enterOpacity,
        }}
      >
        {/* Ending: "SYSTEM ERROR" Types in the Corner */}
        {frame >= 70 && (
          <div className="absolute top-16 right-20 pointer-events-none z-30">
            <div className="px-8 py-3 rounded-2xl bg-[#0F172A]/90 border-2 border-[#EF4444] shadow-[0_0_30px_rgba(239,68,68,0.5)] backdrop-blur-md flex items-center gap-3">
              <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] animate-ping" />
              <h1 className="text-[#EF4444] text-3xl font-black tracking-widest uppercase m-0 font-mono">
                {displayedText}
                {showCursor && <span className="text-white">_</span>}
              </h1>
            </div>
          </div>
        )}

        {/* Main Blueprint Brain SVG Stage */}
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <defs>
            {/* Cyan Glow for Brain Circuits */}
            <filter id="cyan-glow-s4" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22D3EE" floodOpacity="0.75" />
            </filter>
            {/* Red Break Glow */}
            <filter id="red-break-glow-s4" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#EF4444" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Brain Outline & Silhouette (Cyan #22D3EE) */}
          <g filter="url(#cyan-glow-s4)">
            {/* Outer Cortex Silhouette */}
            <path
              d="M 960 250
                 C 820 250 710 330 680 430
                 C 650 530 690 620 740 680
                 C 780 730 840 760 910 770
                 L 930 840 L 990 840 L 1010 770
                 C 1080 760 1140 730 1180 680
                 C 1230 620 1270 530 1240 430
                 C 1210 330 1100 250 960 250 Z"
              fill="#0F172A"
              fillOpacity="0.65"
              stroke="#22D3EE"
              strokeWidth="4"
              strokeDasharray="6 3"
            />

            {/* Inner Hemispheric & Lobular Fissures */}
            <path
              d="M 960 250 Q 960 510 960 770"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="3"
              strokeDasharray="4 4"
            />
            <path
              d="M 740 480 Q 850 430 960 480 Q 1070 430 1180 480"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="2.5"
              strokeDasharray="3 3"
            />
            <path
              d="M 710 590 Q 840 570 960 620 Q 1080 570 1210 590"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="2.5"
              strokeDasharray="3 3"
            />

            {/* Neural Circuit Lines between nodes */}
            <g stroke="#06B6D4" strokeWidth="2" strokeDasharray="3 3" opacity="0.6">
              <line x1="880" y1="360" x2="1060" y2="440" />
              <line x1="880" y1="360" x2="820" y2="520" />
              <line x1="1060" y1="440" x2="1110" y2="560" />
              <line x1="820" y1="520" x2="990" y2="610" />
              <line x1="990" y1="610" x2="1110" y2="560" />
            </g>

            {/* Normal Neural Nodes (Cyan) */}
            <circle cx="880" cy="360" r="10" fill="#22D3EE" />
            <circle cx="1060" cy="440" r="10" fill="#22D3EE" />
            <circle cx="820" cy="520" r="10" fill="#22D3EE" />
            <circle cx="990" cy="610" r="10" fill="#22D3EE" />
            <circle cx="1110" cy="560" r="10" fill="#22D3EE" />
          </g>

          {/* Horizontal Laser Scanning Line */}
          {laserActive && (
            <g>
              {/* Diffuse Laser Beam Glow */}
              <line
                x1="620"
                y1={laserY}
                x2="1300"
                y2={laserY}
                stroke="#22D3EE"
                strokeWidth="12"
                opacity="0.35"
              />
              {/* Sharp Laser Core */}
              <line
                x1="600"
                y1={laserY}
                x2="1320"
                y2={laserY}
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Scanning emitter indicator */}
              <circle cx="600" cy={laserY} r="7" fill="#22D3EE" />
              <circle cx="1320" cy={laserY} r="7" fill="#22D3EE" />
            </g>
          )}

          {/* Jagged Red Break / Fracture Icons */}
          {breakPoints.map((bp) => {
            if (frame < bp.triggerFrame) return null;

            const iconSpring = spring({
              frame: frame - bp.triggerFrame,
              fps,
              config: { damping: 9, stiffness: 200 },
            });
            const scale = interpolate(iconSpring, [0, 1], [0, 1]) * (frame > 100 ? pulseScale : 1);

            return (
              <g
                key={bp.id}
                transform={`translate(${bp.x}, ${bp.y}) scale(${scale})`}
                filter="url(#red-break-glow-s4)"
              >
                {/* Outer warning ring */}
                <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="#EF4444" strokeWidth="3" />
                {/* Jagged Fracture Lightning Icon */}
                <path
                  d="M -3 -16 L -10 2 L 1 2 L -2 16 L 10 -2 L -1 -2 Z"
                  fill="#EF4444"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
