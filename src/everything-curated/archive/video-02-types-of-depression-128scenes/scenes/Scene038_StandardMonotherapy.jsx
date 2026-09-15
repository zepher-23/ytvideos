import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MedicalPill } from "../../shared";

/**
 * Scene 38: Standard Monotherapy
 * Duration: 6 seconds (180 frames)
 * 
 * - Environment: Solid crisp white background (#FFFFFF).
 * - Characters & Props: The Blue Pill (SSRI capsule).
 * - Beginning (0-40f): Central Blue Pill floats alone, glowing with calm blue aura.
 * - Action/Climax (40-95f): Pills multiply into 4 identical capsules in balanced formation labeled "TREATMENT (UNIPOLAR)".
 * - Ending/Hold (95-180f): All pills rotate slowly in synchronized harmony, casting soft ground shadows.
 */
export const Scene038_StandardMonotherapy = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const entranceOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  // Multiplication progression: 1 pill splits into 4 pills
  const splitProgress = interpolate(frame, [45, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Target positions for 4 pills
  const p1X = interpolate(splitProgress, [0, 1], [960, 520]);
  const p2X = interpolate(splitProgress, [0, 1], [960, 810]);
  const p3X = interpolate(splitProgress, [0, 1], [960, 1110]);
  const p4X = interpolate(splitProgress, [0, 1], [960, 1400]);

  const p1Opacity = interpolate(splitProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const p3Opacity = interpolate(splitProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const p4Opacity = interpolate(splitProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  // Synchronized slow 3D rotation
  const baseRot = -25 + frame * 1.8;

  // Floating bob oscillations
  const bob1 = Math.sin(frame * 0.08) * 9;
  const bob2 = Math.sin(frame * 0.08 + 1.2) * 9;
  const bob3 = Math.sin(frame * 0.08 + 2.4) * 9;
  const bob4 = Math.sin(frame * 0.08 + 3.6) * 9;

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans text-slate-900">
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.08)_0%,_rgba(255,255,255,1)_70%)] pointer-events-none" />

      {/* Top Header Card */}
      <div
        className="absolute top-12 left-0 right-0 flex justify-center items-center pointer-events-none z-20 px-8"
        style={{ opacity: entranceOpacity }}
      >
        <div className="px-10 py-4 rounded-3xl bg-slate-50/90 border border-slate-200 shadow-xl backdrop-blur-md text-center">
          <span className="text-xs font-mono tracking-widest text-blue-600 font-bold uppercase block mb-1">
            STANDARD PHARMACOTHERAPY
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-wider text-slate-900 m-0 uppercase">
            TREATMENT (UNIPOLAR)
          </h1>
          <div className="mt-2 inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-widest uppercase">
            SSRI MONOTHERAPY PROTOCOL
          </div>
        </div>
      </div>

      {/* Main Stage SVG: Multiplying Medical Pills */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <radialGradient id="aura-s38" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* PILL 1 (Left Outer) */}
        <g opacity={p1Opacity}>
          <ellipse cx={p1X} cy={540 + 100 + bob1} rx={42} ry={14} fill="#000000" opacity="0.08" />
          <g transform={`translate(0, ${bob1})`}>
            <circle cx={p1X} cy={540} r="100" fill="url(#aura-s38)" />
            <MedicalPill
              x={p1X}
              y={540}
              scale={1.2}
              rotation={baseRot - 10}
              color1="#2563EB"
              color1Dark="#1D4ED8"
              color2="#F8FAFC"
              color2Dark="#CBD5E1"
              imprint="SSRI"
              subImprint="20mg"
              glowing={true}
              glowColor="#3B82F6"
              glowRadius={25}
            />
          </g>
        </g>

        {/* PILL 2 (Center Left - Original Seed Pill) */}
        <g>
          <ellipse cx={p2X} cy={540 + 100 + bob2} rx={46} ry={15} fill="#000000" opacity="0.1" />
          <g transform={`translate(0, ${bob2})`}>
            <circle cx={p2X} cy={540} r="115" fill="url(#aura-s38)" />
            <MedicalPill
              x={p2X}
              y={540}
              scale={1.25}
              rotation={baseRot}
              color1="#2563EB"
              color1Dark="#1D4ED8"
              color2="#F8FAFC"
              color2Dark="#CBD5E1"
              imprint="SSRI"
              subImprint="20mg"
              glowing={true}
              glowColor="#3B82F6"
              glowRadius={30}
            />
          </g>
        </g>

        {/* PILL 3 (Center Right) */}
        <g opacity={p3Opacity}>
          <ellipse cx={p3X} cy={540 + 100 + bob3} rx={46} ry={15} fill="#000000" opacity="0.1" />
          <g transform={`translate(0, ${bob3})`}>
            <circle cx={p3X} cy={540} r="115" fill="url(#aura-s38)" />
            <MedicalPill
              x={p3X}
              y={540}
              scale={1.25}
              rotation={baseRot + 15}
              color1="#2563EB"
              color1Dark="#1D4ED8"
              color2="#F8FAFC"
              color2Dark="#CBD5E1"
              imprint="SSRI"
              subImprint="20mg"
              glowing={true}
              glowColor="#3B82F6"
              glowRadius={30}
            />
          </g>
        </g>

        {/* PILL 4 (Right Outer) */}
        <g opacity={p4Opacity}>
          <ellipse cx={p4X} cy={540 + 100 + bob4} rx={42} ry={14} fill="#000000" opacity="0.08" />
          <g transform={`translate(0, ${bob4})`}>
            <circle cx={p4X} cy={540} r="100" fill="url(#aura-s38)" />
            <MedicalPill
              x={p4X}
              y={540}
              scale={1.2}
              rotation={baseRot + 25}
              color1="#2563EB"
              color1Dark="#1D4ED8"
              color2="#F8FAFC"
              color2Dark="#CBD5E1"
              imprint="SSRI"
              subImprint="20mg"
              glowing={true}
              glowColor="#3B82F6"
              glowRadius={25}
            />
          </g>
        </g>
      </svg>

      {/* Bottom Subtitle Pill */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center pointer-events-none z-30 px-6">
        <div className="px-10 py-3.5 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl text-center">
          <span className="font-mono text-sm md:text-base font-bold tracking-wider uppercase text-slate-200">
            ENGINEERED TO INCREASE SEROTONIN IN UNIPOLAR DEPRESSION SAFELY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
