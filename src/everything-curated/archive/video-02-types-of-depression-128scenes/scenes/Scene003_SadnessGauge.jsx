import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Scene 3: Sadness Gauge
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Clean infographic dashboard
 * - Gauge: Vertical thermometer-style gauge labeled "SADNESS" (Blue #2563EB)
 * - Liquid: Red (#DC2626)
 * - Beginning: Liquid resting low. Text "TEMPORARY EMOTION" appears next to it.
 * - Action/Climax: Liquid spikes rapidly to the top (frame 30-52), then plummets
 *   down to zero and vanishes into a cloud of steam (frame 55-85).
 * - Ending/Hold: Text "GONE" replaces "TEMPORARY EMOTION", steam drifts, holds to 180.
 */
export const Scene003_SadnessGauge = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance transition (quick fade)
  const sceneOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  // 2. Liquid height progression:
  // - 0 to 30: resting at 15%
  // - 30 to 52: rapid spike up to 95%
  // - 52 to 58: brief peak hold with bubble boil
  // - 58 to 82: violent plummet down to 0%
  // - 82+: empty (0%)
  const liquidFill = interpolate(
    frame,
    [0, 30, 52, 58, 80, 85],
    [0.15, 0.15, 0.95, 0.95, 0.02, 0.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Column height in px
  const gaugeHeight = 440;
  const liquidHeightPx = liquidFill * gaugeHeight;

  // 3. Steam cloud generation at the bottom bulb after plummet (frames 78 to 140)
  const steamActive = frame >= 78;
  const steamProgress = interpolate(frame, [78, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const steamOpacity = interpolate(frame, [78, 90, 125, 145], [0, 0.85, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. Text transition: "TEMPORARY EMOTION" -> "GONE"
  // "TEMPORARY EMOTION" appears frames 10-75
  const tempEmotionOpacity = interpolate(frame, [8, 20, 75, 85], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // "GONE" appears frame 85 onwards with spring pop
  const goneSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const goneOpacity = interpolate(frame, [85, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#0F172A] overflow-hidden select-none font-sans text-white">
      {/* Dashboard Technical Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
        <defs>
          <pattern id="dash-grid-s3" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dash-grid-s3)" />
      </svg>



      {/* Center Thermometer & Infographic Stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[1100px] h-[720px] flex items-center justify-center">
          {/* Main Thermometer SVG */}
          <svg
            viewBox="0 0 400 700"
            className="w-[380px] h-[640px] overflow-visible"
            style={{ opacity: sceneOpacity }}
          >
            <defs>
              {/* Blue Glass Tube Glow */}
              <filter id="glass-glow-s3" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#2563EB" floodOpacity="0.5" />
              </filter>
              {/* Red Liquid Glow */}
              <filter id="red-liquid-glow-s3" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#DC2626" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Gauge Header Badge */}
            <g transform="translate(200, 35)">
              <rect
                x="-90"
                y="-25"
                width="180"
                height="45"
                rx="12"
                fill="#1E293B"
                stroke="#2563EB"
                strokeWidth="2.5"
              />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fill="#60A5FA"
                fontSize="22"
                fontWeight="900"
                letterSpacing="3"
              >
                SADNESS
              </text>
            </g>

            {/* Scale Calibration Ticks (Right Side) */}
            <g stroke="#64748B" strokeWidth="2.5" strokeLinecap="round">
              {[0, 0.25, 0.5, 0.75, 1.0].map((t, idx) => {
                const tickY = 100 + (1 - t) * gaugeHeight;
                const labels = ["0%", "25%", "50%", "75%", "PEAK"];
                return (
                  <g key={idx}>
                    <line x1="245" y1={tickY} x2="265" y2={tickY} />
                    <text
                      x="275"
                      y={tickY + 5}
                      fill="#94A3B8"
                      fontSize="14"
                      fontWeight="700"
                    >
                      {labels[idx]}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Outer Glass Tube Outline (Blue #2563EB) */}
            <rect
              x="160"
              y="90"
              width="80"
              height={gaugeHeight + 20}
              rx="40"
              fill="#0F172A"
              stroke="#2563EB"
              strokeWidth="6"
              filter="url(#glass-glow-s3)"
            />

            {/* Liquid Column Mask */}
            <clipPath id="tube-liquid-clip-s3">
              <rect x="165" y="95" width="70" height={gaugeHeight + 10} rx="35" />
            </clipPath>

            {/* Red Rising/Plummeting Liquid (#DC2626) */}
            <g clipPath="url(#tube-liquid-clip-s3)">
              <rect
                x="165"
                y={95 + gaugeHeight - liquidHeightPx}
                width="70"
                height={liquidHeightPx + 40}
                fill="#DC2626"
                filter="url(#red-liquid-glow-s3)"
              />
              {/* Liquid highlight line */}
              <line
                x1="180"
                y1={95 + gaugeHeight - liquidHeightPx}
                x2="180"
                y2={95 + gaugeHeight + 40}
                stroke="#FCA5A5"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>

            {/* Bottom Bulb Connection */}
            <circle
              cx="200"
              cy={110 + gaugeHeight}
              r="62"
              fill="#0F172A"
              stroke="#2563EB"
              strokeWidth="6"
              filter="url(#glass-glow-s3)"
            />
            {/* Bulb Liquid Fill */}
            <circle
              cx="200"
              cy={110 + gaugeHeight}
              r="54"
              fill="#DC2626"
              opacity={frame < 82 ? 1 : interpolate(frame, [82, 88], [1, 0], { extrapolateRight: "clamp" })}
            />

            {/* Steam Cloud VFX when liquid evaporates */}
            {steamActive && (
              <g
                transform={`translate(200, ${110 + gaugeHeight - steamProgress * 70})`}
                opacity={steamOpacity}
              >
                <circle cx={-18 * steamProgress} cy={-20} r={24 * steamProgress} fill="#E2E8F0" opacity="0.4" />
                <circle cx={14 * steamProgress} cy={-30} r={28 * steamProgress} fill="#CBD5E1" opacity="0.5" />
                <circle cx={0} cy={-45} r={35 * steamProgress} fill="#F8FAFC" opacity="0.6" />
                {/* Dissipating wisps */}
                <path
                  d={`M -20 -40 Q 0 -70 ${25 * steamProgress} -90`}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </g>
            )}
          </svg>

          {/* Right Callout Card Container */}
          <div className="absolute left-[620px] flex flex-col items-start gap-4">
            {/* 1. Initial State: "TEMPORARY EMOTION" */}
            <div
              className="px-8 py-5 rounded-2xl bg-[#1E293B]/90 border-2 border-[#3B82F6] shadow-2xl backdrop-blur-md"
              style={{
                opacity: tempEmotionOpacity,
                display: frame > 80 ? "none" : "block",
              }}
            >
              <span className="text-4xl font-extrabold tracking-wider text-white uppercase block">
                TEMPORARY EMOTION
              </span>
            </div>

            {/* 2. Final State: "GONE" */}
            {frame >= 85 && (
              <div
                className="px-10 py-6 rounded-3xl bg-[#064E3B]/85 border-3 border-[#10B981] shadow-[0_0_50px_rgba(16,185,129,0.5)] backdrop-blur-md"
                style={{
                  opacity: goneOpacity,
                  transform: `scale(${goneSpring})`,
                }}
              >
                <span className="text-6xl font-black tracking-widest text-[#10B981] uppercase block">
                  GONE
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
