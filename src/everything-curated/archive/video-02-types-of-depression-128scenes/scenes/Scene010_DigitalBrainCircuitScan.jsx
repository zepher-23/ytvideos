import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 10: Digital Brain Circuit Scan
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: High-tech digital blueprint aesthetic (#0A0F1D)
 * - Characters & Props: Wireframe head, horizontal laser scanning line (Cyan #22D3EE)
 * - Beginning: Wireframe of human head drawn instantly.
 * - Action/Climax: Horizontal laser moves slowly down (frames 20-110), revealing
 *   intricate intertwined electrical circuits and brightly lit nodes inside brain.
 * - Ending/Hold: Text "KNOW THE PATTERN" types next to head to frame 180.
 */
export const Scene010_DigitalBrainCircuitScan = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance fade & scale
  const enterOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // 2. Laser Scanner Movement (moves from Y=220 to Y=820 between frames 20 and 110)
  const laserProgress = interpolate(frame, [20, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const laserY = 220 + laserProgress * 600;
  const laserActive = frame >= 20 && frame <= 118;

  // 3. Typewriter for "KNOW THE PATTERN" (frames 105 to 145)
  const fullText = "KNOW THE PATTERN";
  const charCount = Math.floor(interpolate(frame, [105, 145], [0, fullText.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  const displayedText = fullText.slice(0, charCount);
  const showCursor = frame >= 105 && frame < 170 ? Math.floor(frame / 6) % 2 === 0 : false;

  return (
    <AbsoluteFill className="bg-[#0A0F1D] overflow-hidden select-none font-sans text-white">
      {/* Blueprint Grid Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid-s10" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="2 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-s10)" />
      </svg>

      {/* Blueprint HUD Framing */}
      <div className="absolute inset-10 border border-[#22D3EE]/25 pointer-events-none flex flex-col justify-between p-4 z-10">
        <div className="flex justify-between items-center text-[#22D3EE] text-xs font-mono tracking-widest opacity-80">
          <span>SCAN // CRANIAL_CIRCUITRY</span>
          <span>CH: 10 // NEURAL_REVEAL</span>
        </div>
        <div className="flex justify-between items-center text-[#22D3EE] text-xs font-mono tracking-widest opacity-80">
          <span>RESOLUTION: ULTRA_VECTOR</span>
          <span>STATUS: SCAN_COMPLETE</span>
        </div>
      </div>

      {/* Main SVG Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* Cyan Circuit Glow */}
          <filter id="circuit-glow-s10" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#22D3EE" floodOpacity="0.9" />
          </filter>

          {/* ClipPath driven by the laser position so circuits are revealed as laser descends */}
          <clipPath id="laser-reveal-clip-s10">
            <rect x="0" y="0" width="1920" height={laserY} />
          </clipPath>
        </defs>

        {/* WIREFRAME HUMAN HEAD SILHOUETTE (Left Center x=720, y=540) */}
        <g transform="translate(720, 540)">
          {/* Profile Contour Line */}
          <path
            d="M 120 -300
               C 0 -300 -160 -240 -200 -120
               C -240 -10 -220 120 -180 200
               L -180 320 L -60 320
               L -60 260
               C -40 260 -20 280 20 280
               C 80 280 120 250 140 210
               L 190 200 L 220 130
               L 160 110 L 220 30
               L 150 10 L 210 -70
               C 210 -150 200 -240 120 -300 Z"
            fill="#0F172A"
            fillOpacity="0.75"
            stroke="#22D3EE"
            strokeWidth="3.5"
            strokeDasharray="5 3"
          />

          {/* INTRICATE NEURAL CIRCUITS (Revealed by Laser ClipPath) */}
          <g clipPath="url(#laser-reveal-clip-s10)" filter="url(#circuit-glow-s10)">
            {/* Bus Lines & Micro-traces */}
            <g stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round">
              <path d="M -120 -180 L -60 -180 L -20 -140 L 60 -140 L 90 -100" fill="none" />
              <path d="M -150 -100 L -90 -100 L -50 -50 L 30 -50 L 70 0" fill="none" />
              <path d="M -110 -20 L -70 30 L 10 30 L 50 80 L 120 80" fill="none" />
              <path d="M -80 -220 L -30 -160 L 40 -160 L 80 -200 L 130 -200" fill="none" />
              <path d="M -40 -80 L 0 -30 L 0 50 L 60 110 L 100 110" fill="none" />
              <path d="M -130 50 L -80 120 L 0 120 L 40 170" fill="none" />
              <path d="M -170 -60 L -120 -20 L -120 60 L -50 130" fill="none" />
            </g>

            {/* Illuminated Nodes (Cyan Glow Dots) */}
            {[
              { cx: -120, cy: -180, r: 6 },
              { cx: -20, cy: -140, r: 7 },
              { cx: 60, cy: -140, r: 5 },
              { cx: 90, cy: -100, r: 8 },
              { cx: -150, cy: -100, r: 6 },
              { cx: -50, cy: -50, r: 8 },
              { cx: 30, cy: -50, r: 6 },
              { cx: 70, cy: 0, r: 7 },
              { cx: -70, cy: 30, r: 8 },
              { cx: 50, cy: 80, r: 6 },
              { cx: 120, cy: 80, r: 7 },
              { cx: -30, cy: -160, r: 6 },
              { cx: 80, cy: -200, r: 7 },
              { cx: 0, cy: -30, r: 8 },
              { cx: 60, cy: 110, r: 7 },
              { cx: -80, cy: 120, r: 6 },
              { cx: 40, cy: 170, r: 7 },
            ].map((node, i) => (
              <g key={i}>
                <circle cx={node.cx} cy={node.cy} r={node.r} fill="#22D3EE" />
                <circle cx={node.cx} cy={node.cy} r={node.r * 1.8} fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="2 2" />
              </g>
            ))}
          </g>

          {/* Glowing Cranial Center Core */}
          <circle
            cx="-30"
            cy="-60"
            r={interpolate(frame, [40, 110], [0, 45], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            fill="none"
            stroke="#22D3EE"
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity="0.75"
          />
        </g>

        {/* Horizontal Laser Scanning Line */}
        {laserActive && (
          <g>
            {/* Diffuse Beam Glow */}
            <line
              x1="360"
              y1={laserY}
              x2="1080"
              y2={laserY}
              stroke="#22D3EE"
              strokeWidth="14"
              opacity="0.4"
            />
            {/* Bright Center Core */}
            <line
              x1="340"
              y1={laserY}
              x2="1100"
              y2={laserY}
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="340" cy={laserY} r="8" fill="#22D3EE" />
            <circle cx="1100" cy={laserY} r="8" fill="#22D3EE" />
          </g>
        )}
      </svg>

      {/* Right Side: Typewriter "KNOW THE PATTERN" */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[620px] flex flex-col items-start pointer-events-none z-20">
        <div className="px-8 py-2 rounded-xl bg-[#1E293B]/80 border border-[#22D3EE]/40 backdrop-blur-md mb-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#22D3EE] uppercase">
            NEUROLOGICAL BLUEPRINT REVEALED
          </span>
        </div>

        <div className="min-h-[90px]">
          <h1 className="text-5xl md:text-6xl font-black tracking-widest uppercase text-white font-mono leading-none m-0">
            {displayedText}
            {showCursor && <span className="text-[#22D3EE]">_</span>}
          </h1>
        </div>

        {frame >= 140 && (
          <div className="mt-4 px-6 py-3 rounded-2xl bg-blue-950/70 border border-blue-500/50 backdrop-blur-md">
            <span className="text-sm font-mono text-[#93C5FD] font-semibold tracking-wider uppercase block">
              10 CLINICAL PATTERNS OF DYSREGULATION IDENTIFIED
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
