import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 102: Neurotoxicity simulation
 * Duration: 180 frames (6.0s)
 * Environment: Macro synaptic cleft space on dark background (#080D1A).
 * Transition: Snap zoom-in from Scene 101.
 * Characters & Props: Smooth molecule touching U-shaped GABA-A receptor, turning spiky red, receptor cracking with red energy shockwaves, flashing "INTOLERANT BRAIN" alert.
 */
export const Scene102_Neurotoxicitysimulation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snap zoom entrance spring
  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 140 },
  });
  const zoomScale = interpolate(zoomSpring, [0, 1], [0.75, 1]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Molecule descent into receptor: frames 0 to 45
  const molY = interpolate(frame, [0, 45], [260, 490], {
    extrapolateRight: "clamp",
  });

  // Docking & violent reaction trigger at frame 45
  const isDocked = frame >= 45;
  const spikeSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 9, stiffness: 220 },
  });
  const spikeFactor = interpolate(spikeSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Violent screen shudder upon docking: frames 45 to 80
  const isShaking = frame >= 45 && frame < 80;
  const shakeX = isShaking ? Math.sin((frame - 45) * 2.8) * 11 * (1 - (frame - 45) / 35) : 0;
  const shakeY = isShaking ? Math.cos((frame - 45) * 3.2) * 9 * (1 - (frame - 45) / 35) : 0;

  // Alert entrance spring at frame 75
  const alertSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 10, stiffness: 180 },
  });
  const alertScale = interpolate(alertSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const alertFlash = isDocked ? (Math.sin((frame - 75) * 0.4) > 0 ? 1 : 0.35) : 0;

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#080D1A",
      }}
    >
      {/* Background Synaptic Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="synapseGrid102" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#64748B" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#synapseGrid102)" />
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
            border: `1.5px solid ${isDocked ? "#EF4444" : "#38BDF8"}`,
            boxShadow: isDocked ? "0 0 35px rgba(239, 68, 68, 0.3)" : "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight"
            style={{ color: isDocked ? "#F87171" : "#FFFFFF" }}
          >
            INTOLERANT BRAIN
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Cellular PMDD Mechanism: Paradoxical GABA-A Receptor Reaction
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `scale(${zoomScale}) translate(${shakeX}px, ${shakeY}px)`,
          transformOrigin: "960px 600px",
        }}
      >
        <defs>
          <filter id="toxicRedGlow102" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* NEURAL MEMBRANE LIPID BILAYER (Horizontally across y=700) */}
        <g transform="translate(0, 700)">
          {/* Membrane Base Bar */}
          <rect x="0" y="0" width="1920" height="380" fill="#0B132B" stroke="#1E293B" strokeWidth="4" />
          <line x1="0" y1="0" x2="1920" y2="0" stroke="#334155" strokeWidth="5" />
          {/* Lipid polar head circles */}
          {Array.from({ length: 32 }).map((_, i) => (
            <circle key={i} cx={30 + i * 60} cy="0" r="10" fill="#475569" />
          ))}
        </g>

        {/* U-SHAPED GABA-A RECEPTOR POCKET (Center: x=960, y=620) */}
        <g transform="translate(960, 620)">
          {/* Receptor Body Contours */}
          <path
            d="
              M -160 80
              L -160 -80
              C -160 -120, -110 -140, -70 -120
              L -70 20
              C -70 60, 70 60, 70 20
              L 70 -120
              C 110 -140, 160 -120, 160 -80
              L 160 80 Z
            "
            fill={isDocked ? "#450A0A" : "#1E293B"}
            stroke={isDocked ? "#EF4444" : "#38BDF8"}
            strokeWidth="6"
            filter={isDocked ? "url(#toxicRedGlow102)" : undefined}
          />

          {/* Receptor Pocket Cavity Floor */}
          <ellipse cx="0" cy="20" rx="70" ry="20" fill="#0F172A" />

          {/* CRACK FRACTURES RADIATING ACROSS RECEPTOR WHEN DOCKED */}
          {isDocked && (
            <g stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round">
              <path d="M -70 20 L -120 40 L -150 10" />
              <path d="M 70 20 L 110 50 L 140 30" />
              <path d="M 0 35 L 0 75 L -30 95" />
              <path d="M 0 75 L 30 95" />
            </g>
          )}

          {/* RADIATING CHAOTIC RED ENERGY WAVES */}
          {isDocked && (
            <g>
              {[1, 2, 3].map((ring) => {
                const r = ((frame * 4 + ring * 50) % 180) + 70;
                const op = Math.max(0, 1 - r / 250);
                return (
                  <circle
                    key={ring}
                    cx="0"
                    cy="0"
                    r={r}
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    opacity={op}
                  />
                );
              })}
            </g>
          )}
        </g>

        {/* NEUROSTEROID MOLECULE (Morphing from smooth yellow to jagged red upon docking) */}
        <g
          transform={`translate(960, ${molY})`}
          filter={isDocked ? "url(#toxicRedGlow102)" : undefined}
        >
          {/* Smooth Molecule Shape (Fades out when spiked) */}
          <circle
            cx="0"
            cy="0"
            r="48"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="4"
            opacity={1 - spikeFactor}
          />

          {/* Jagged Spiky Hostile Red Molecule (Swells in upon docking) */}
          {spikeFactor > 0 && (
            <g opacity={spikeFactor}>
              {/* Spiky Jagged Star Polygon */}
              <polygon
                points="
                  0,-70 18,-35 60,-55 35,-15 70,0
                  35,15 60,55 18,35 0,70
                  -18,35 -60,55 -35,15 -70,0
                  -35,-15 -60,-55 -18,-35
                "
                fill="#EF4444"
                stroke="#B91C1C"
                strokeWidth="4"
              />
              <circle cx="0" cy="0" r="25" fill="#7F1D1D" />
            </g>
          )}

          <text
            x="0"
            y="6"
            fill={isDocked ? "#FFFFFF" : "#713F12"}
            fontSize="16"
            fontWeight="900"
            textAnchor="middle"
          >
            {isDocked ? "TOXIC" : "ALLO"}
          </text>
        </g>

        {/* FLASHING "INTOLERANT BRAIN" ALERT BADGE */}
        {frame >= 75 && (
          <g
            transform={`translate(960, 320) scale(${alertScale})`}
            opacity={alertFlash}
            filter="url(#toxicRedGlow102)"
          >
            <rect
              x="-260"
              y="-60"
              width="520"
              height="120"
              rx="18"
              fill="#7F1D1D"
              stroke="#EF4444"
              strokeWidth="5"
            />
            <rect x="-248" y="-48" width="496" height="96" rx="12" fill="#450A0A" />

            <text
              x="0"
              y="10"
              fill="#FFFFFF"
              fontSize="48"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="5"
            >
              INTOLERANT BRAIN
            </text>
            <text
              x="0"
              y="34"
              fill="#FCA5A5"
              fontSize="14"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="2.5"
            >
              PARADOXICAL EXCITATORY RECEPTOR MUTATION
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
