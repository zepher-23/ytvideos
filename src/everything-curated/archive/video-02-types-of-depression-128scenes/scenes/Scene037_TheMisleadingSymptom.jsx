import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman, MedicalPill } from "../../shared";

/**
 * Scene 37: The Misleading Symptom
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Sterile doctor's examination room with cracked glass floor (#0B132B).
 * - Characters & Props: Sad stickman patient, massive magnified vector stethoscope, doctor's offering hand with Blue Pill.
 * - Beginning (0-40f): Stickman sits slumping on examination stool.
 * - Action/Climax (40-110f): Giant stethoscope swoops in and listens to stickman's chest.
 *   Inside the stethoscope bell, a glowing sad face and depression telemetry signal appear.
 * - Ending/Hold (110-180f): Doctor's hand enters from right, extending the Blue Pill (SSRI) as monotherapy.
 */
export const Scene037_TheMisleadingSymptom = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Stethoscope entrance motion (slides from top-left to chest)
  const stethProgress = interpolate(frame, [35, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const stethX = interpolate(stethProgress, [0, 1], [400, 750]);
  const stethY = interpolate(stethProgress, [0, 1], [220, 610]);
  const stethScale = interpolate(stethProgress, [0, 1], [0.5, 1]);

  // Doctor's hand holding pill enters from right at frame 105
  const doctorProgress = interpolate(frame, [105, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const doctorX = interpolate(doctorProgress, [0, 1], [1950, 1180]);

  // Telemetry pulse inside stethoscope
  const pulseScale = frame >= 65 ? 1 + Math.sin((frame - 65) * 0.25) * 0.08 : 0;
  const pulseOpacity = interpolate(frame, [65, 80], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill className="bg-[#0B132B] overflow-hidden select-none font-sans text-white">
      {/* Background Clinical Wall Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="clinic-grid-s37" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" />
          </pattern>
        </defs>
        <rect width="100%" height="800" fill="url(#clinic-grid-s37)" />
      </svg>

      {/* Cracked Glass Floor at y=800 */}
      <div className="absolute top-[800px] left-0 right-0 bottom-0 bg-[#0F172A] border-t-2 border-cyan-500/40">
        <svg className="w-full h-full opacity-35" viewBox="0 0 1920 280">
          {/* Glass fracture cracks */}
          <path d="M 300 0 L 450 120 L 420 180 M 450 120 L 590 140 M 820 0 L 890 90 L 860 210 M 890 90 L 1020 120 M 1300 0 L 1420 150 L 1380 240 M 1420 150 L 1550 130" stroke="#38BDF8" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Top Header */}
      <div
        className="absolute top-10 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-8 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 shadow-2xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-1">
            INITIAL CONSULTATION
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-wide text-white m-0 uppercase">
            THE MISLEADING SYMPTOM
          </h1>
        </div>
      </div>

      {/* Examination Stool & CuratedStickman Patient */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* Examination Stool under Stickman */}
        <g transform="translate(800, 780)">
          {/* Stool Seat */}
          <ellipse cx="0" cy="0" rx="90" ry="24" fill="#334155" stroke="#64748B" strokeWidth="4" />
          {/* Chrome Stem & 4 Base Legs */}
          <line x1="0" y1="0" x2="0" y2="70" stroke="#94A3B8" strokeWidth="12" />
          <line x1="0" y1="70" x2="-80" y2="100" stroke="#64748B" strokeWidth="8" strokeLinecap="round" />
          <line x1="0" y1="70" x2="80" y2="100" stroke="#64748B" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* Canonical CuratedStickman sitting in deep depressive slump */}
        <g transform="translate(800, 770)">
          <CuratedStickman
            x={0}
            y={0}
            scale={1.1}
            pose="defeat"
            mouth="frown"
            eyes="defeat"
            slumpProgress={0.8}
            frame={frame}
          />
        </g>

        {/* MAGNIFIED VECTOR STETHOSCOPE */}
        <g
          transform={`translate(${stethX}, ${stethY}) scale(${stethScale})`}
          style={{ opacity: interpolate(frame, [30, 42], [0, 1], { extrapolateRight: "clamp" }) }}
        >
          {/* Flexible Rubber Tubing coming from upper left */}
          <path
            d="M -500 -400 C -250 -200, -100 -50, 0 0"
            fill="none"
            stroke="#1E293B"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M -500 -400 C -250 -200, -100 -50, 0 0"
            fill="none"
            stroke="#0284C7"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Stethoscope Head Connector Stem */}
          <rect x="-10" y="-25" width="20" height="30" rx="4" fill="#CBD5E1" stroke="#64748B" strokeWidth="3" />

          {/* Stethoscope Chrome Bell (Chestpiece) */}
          <circle cx="0" cy="0" r="80" fill="#0F172A" stroke="#E2E8F0" strokeWidth="10" />
          <circle cx="0" cy="0" r="70" fill="#1E293B" stroke="#38BDF8" strokeWidth="3" />

          {/* Stethoscope Telemetry Display Inside Bell */}
          <g opacity={pulseOpacity} transform={`scale(${pulseScale})`}>
            {/* Soft Radial Blue Background */}
            <circle cx="0" cy="0" r="64" fill="#0369A1" opacity="0.4" />

            {/* Glowing Sad Face Vector */}
            <circle cx="0" cy="-6" r="36" fill="none" stroke="#38BDF8" strokeWidth="4" />
            <ellipse cx="-12" cy="-14" rx="4" ry="6" fill="#38BDF8" />
            <ellipse cx="12" cy="-14" rx="4" ry="6" fill="#38BDF8" />
            {/* Sad Frown Arc */}
            <path d="M -18 14 Q 0 0 18 14" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

            {/* EKG pulse line below */}
            <path
              d="M -45 28 L -20 28 L -10 18 L 0 38 L 10 20 L 20 28 L 45 28"
              fill="none"
              stroke="#67E8F9"
              strokeWidth="2.5"
            />
          </g>

          {/* Inspection Callout Tag */}
          <g transform="translate(90, -40)" opacity={pulseOpacity}>
            <rect x="0" y="0" width="220" height="42" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <text x="110" y="26" textAnchor="middle" fill="#38BDF8" fontSize="13" fontWeight="bold" letterSpacing="1">
              REPORT: DEPRESSED MOOD
            </text>
          </g>
        </g>

        {/* DOCTOR'S EXTENDED ARM & HAND OFFERING SSRI PILL */}
        <g transform={`translate(${doctorX}, 620)`}>
          {/* Doctor White Coat Sleeve */}
          <path
            d="M 600 -40 L 60 -15 L 60 40 L 600 70 Z"
            fill="#F8FAFC"
            stroke="#CBD5E1"
            strokeWidth="4"
          />
          {/* Doctor Hand Silhouette */}
          <path
            d="M 60 -15 C 30 -15, 0 -5, -20 15 C 0 35, 35 38, 60 40 Z"
            fill="#FBCFE8"
            stroke="#F472B6"
            strokeWidth="3"
          />

          {/* Offered Clinical 3D MedicalPill */}
          <g transform="translate(-40, 5) scale(0.95)">
            <MedicalPill
              x={0}
              y={0}
              scale={1.05}
              rotation={-20}
              color1="#2563EB"
              color1Dark="#1D4ED8"
              color2="#F8FAFC"
              color2Dark="#CBD5E1"
              imprint="SSRI"
              subImprint="20mg"
              glowing={true}
              glowColor="#38BDF8"
              glowRadius={28}
            />
          </g>
        </g>
      </svg>

      {/* Bottom Medical Warning Card */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-8 py-3 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-bold tracking-wider uppercase text-slate-300">
            DETECTING ONLY THE DEPRESSION: STANDARD SSRI MONOTHERAPY IS PRESCRIBED
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
