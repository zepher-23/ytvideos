import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 104: Pediatric Population diagram
 * Duration: 180 frames (6.0s)
 * Environment: Clinical infographic lineup on dark background (#0B0F19).
 * Transition: Slide-left.
 * Characters & Props: Lineup of Child, Teen, and Adult stickmen; cyan scanner beam highlights Child & Teen in glowing amber (ages 6 to 18) while marking Adult with Red X.
 */
export const Scene104_PediatricPopulationdiagram = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slide-left entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const slideX = interpolate(enterSpring, [0, 1], [60, 0]);
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Cyan scanner beam sweeping across: frames 25 to 95
  const scanX = interpolate(frame, [25, 95], [260, 1660], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isScanning = frame >= 25 && frame <= 105;

  // Activation states based on scanner passage
  const childActive = frame >= 45;
  const teenActive = frame >= 65;
  const adultHit = frame >= 85;

  // Red X stamp spring on adult
  const xSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const xScale = interpolate(xSpring, [0, 1], [2, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#0B0F19",
      }}
    >
      {/* Background Clinical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="grid104" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="3 6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid104)" />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterOpacity,
          transform: `translateX(${slideX}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.9)",
            border: "1.5px solid rgba(245, 158, 11, 0.5)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            PEDIATRIC POPULATION
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-amber-400">
            DMDD Diagnostic Criteria Strictly Confined to Ages 6 to 18
          </p>
        </div>
      </div>

      {/* Main Visual Canvas */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateX(${slideX}px)` }}
      >
        <defs>
          <filter id="amberGlow104" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cyanLaserGlow104" x="-50%" y="-10%" width="200%" height="120%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Floor Horizon Base */}
        <line x1="200" y1="820" x2="1720" y2="820" stroke="#334155" strokeWidth="4" />

        {/* ================================================= */}
        {/* 1. CHILD STICKMAN (Ages 6-11) - Left: x=480       */}
        {/* ================================================= */}
        <g transform="translate(480, 800)">
          {/* Floor Shadow */}
          <ellipse cx="0" cy="18" rx="65" ry="12" fill="#000000" opacity="0.4" />

          {/* Glowing Amber Aura when scanned */}
          {childActive && (
            <ellipse cx="0" cy="-140" rx="95" ry="160" fill="rgba(245, 158, 11, 0.15)" filter="url(#amberGlow104)" />
          )}

          <CuratedStickman
            x={0}
            y={0}
            scale={0.9}
            variant="child"
            pose="idle"
            mouth="frown"
            eyes="normal"
            frame={frame}
          />

          {/* Age Tag */}
          <g transform="translate(0, 55)">
            <rect
              x="-80"
              y="-18"
              width="160"
              height="36"
              rx="8"
              fill={childActive ? "#78350F" : "#1E293B"}
              stroke={childActive ? "#F59E0B" : "#475569"}
              strokeWidth="2"
            />
            <text x="0" y="6" fill={childActive ? "#FEF3C7" : "#94A3B8"} fontSize="15" fontWeight="900" textAnchor="middle">
              CHILD (6–11)
            </text>
          </g>
        </g>

        {/* ================================================= */}
        {/* 2. TEEN STICKMAN (Ages 12-18) - Center: x=960     */}
        {/* ================================================= */}
        <g transform="translate(960, 800)">
          <ellipse cx="0" cy="18" rx="80" ry="14" fill="#000000" opacity="0.4" />

          {teenActive && (
            <ellipse cx="0" cy="-180" rx="110" ry="200" fill="rgba(245, 158, 11, 0.15)" filter="url(#amberGlow104)" />
          )}

          <CuratedStickman
            x={0}
            y={0}
            scale={1.15}
            variant="adult"
            pose="idle"
            mouth="frown"
            eyes="defeat"
            frame={frame}
          />

          <g transform="translate(0, 55)">
            <rect
              x="-80"
              y="-18"
              width="160"
              height="36"
              rx="8"
              fill={teenActive ? "#78350F" : "#1E293B"}
              stroke={teenActive ? "#F59E0B" : "#475569"}
              strokeWidth="2"
            />
            <text x="0" y="6" fill={teenActive ? "#FEF3C7" : "#94A3B8"} fontSize="15" fontWeight="900" textAnchor="middle">
              TEEN (12–18)
            </text>
          </g>
        </g>

        {/* ================================================= */}
        {/* 3. ADULT STICKMAN (>18) - Right: x=1440           */}
        {/* ================================================= */}
        <g transform="translate(1440, 800)">
          <ellipse cx="0" cy="18" rx="90" ry="16" fill="#000000" opacity="0.4" />

          <CuratedStickman
            x={0}
            y={0}
            scale={1.35}
            variant="adult"
            pose="idle"
            mouth="neutral"
            eyes="normal"
            frame={frame}
          />

          <g transform="translate(0, 55)">
            <rect
              x="-85"
              y="-18"
              width="170"
              height="36"
              rx="8"
              fill={adultHit ? "#450A0A" : "#1E293B"}
              stroke={adultHit ? "#EF4444" : "#475569"}
              strokeWidth="2"
            />
            <text x="0" y="6" fill={adultHit ? "#FCA5A5" : "#94A3B8"} fontSize="15" fontWeight="900" textAnchor="middle">
              ADULT (18+)
            </text>
          </g>

          {/* GIANT RED "X" OVER ADULT (INELIGIBLE) */}
          {adultHit && (
            <g transform={`translate(0, -220) scale(${xScale})`}>
              <line x1="-80" y1="-80" x2="80" y2="80" stroke="#EF4444" strokeWidth="16" strokeLinecap="round" />
              <line x1="80" y1="-80" x2="-80" y2="80" stroke="#EF4444" strokeWidth="16" strokeLinecap="round" />
              <rect x="-90" y="95" width="180" height="30" rx="8" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1.5" />
              <text x="0" y="115" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1">
                INELIGIBLE FOR DMDD
              </text>
            </g>
          )}
        </g>

        {/* BLUE ELECTRONIC SCANNER BEAM SWEEP */}
        {isScanning && (
          <g filter="url(#cyanLaserGlow104)">
            <line x1={scanX} y1="200" x2={scanX} y2="880" stroke="#06B6D4" strokeWidth="6" />
            <line x1={scanX} y1="200" x2={scanX} y2="880" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        )}

        {/* PEDIATRIC INCLUSION BRACKET: "AGES 6 TO 18" (Under Child & Teen) */}
        {teenActive && (
          <g transform="translate(720, 940)">
            {/* Horizontal Bracket Line */}
            <path d="M -260 0 L 0 15 L 260 0" fill="none" stroke="#F59E0B" strokeWidth="3" />
            <rect x="-140" y="25" width="280" height="42" rx="10" fill="#78350F" stroke="#F59E0B" strokeWidth="2" filter="url(#amberGlow104)" />
            <text x="0" y="52" fill="#FEF3C7" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="3">
              ✓ AGES 6 TO 18 ONLY
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
