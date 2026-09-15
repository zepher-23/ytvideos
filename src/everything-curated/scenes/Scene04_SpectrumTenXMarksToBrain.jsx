import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Neuron, GridBackground } from "../../shared";

/**
 * Scene 04: Central Brain, Surrounding Neurons & Fracture Breakdown
 * 
 * Duration: 5.0 seconds (150 frames @ 30fps)
 * Visual Choreography:
 * 1. Realistic lateral brain positioned directly at the center (x: 960, y: 520).
 * 2. 10 Neurons (from user's neuron.svg) pop around the brain 1 by 1 (frames 10 to 55).
 * 3. Each neuron points a razor-thin arrow inward to a specific cortical location on the brain.
 * 4. Neurons break in half one by one (frames 70 to 125) with jagged fracture splits,
 *    nucleus severance, electric shock flashes, and severed arrow feedback.
 * 5. Full dramatic aftermath hold (frames 125 to 150) revealing systemic neural breakdown.
 */
export const Scene04_SpectrumTenXMarksToBrain = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central Brain Anchor Coordinates
  const brainCenter = { x: 960, y: 520 };

  // Brain ambient idle synaptic breathing bob
  const brainBobY = Math.sin(frame * 0.08) * 3;
  const brainPulse = 1 + Math.sin(frame * 0.12) * 0.025;

  // Center Brain Entrance Animation (Frames 0 to 20)
  const brainEntranceSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });
  const brainScale = interpolate(brainEntranceSpring, [0, 1], [0.75, 1.0]);
  const brainOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 10 Stations: Orbiting around the brain pointing deep into internal cortical regions
  const stations = [
    { id: 0, x: 480,  y: 190, tilt: -12, relX: -110, relY: -90 },  // Upper-Left -> Deep Prefrontal Cortex
    { id: 1, x: 960,  y: 140, tilt: 8,   relX: 15,   relY: -100 }, // Top-Center -> Deep Motor / Central Sulcus
    { id: 2, x: 1440, y: 190, tilt: 15,  relX: 100,  relY: -80 },  // Upper-Right -> Deep Parietal Lobe
    { id: 3, x: 1670, y: 410, tilt: -10, relX: 155,  relY: -30 },  // Right-Upper -> Deep Occipital Cortex
    { id: 4, x: 1620, y: 680, tilt: 14,  relX: 110,  relY: 25 },   // Right-Lower -> Deep Posterior Temporal
    { id: 5, x: 1380, y: 890, tilt: -8,  relX: 90,   relY: 115 },  // Bottom-Right -> Deep Cerebellum Core
    { id: 6, x: 960,  y: 930, tilt: 6,   relX: 25,   relY: 135 },  // Bottom-Center -> Deep Pons / Brainstem
    { id: 7, x: 540,  y: 890, tilt: -15, relX: -70,  relY: 55 },   // Bottom-Left -> Deep Anterior Temporal
    { id: 8, x: 300,  y: 680, tilt: 10,  relX: -135, relY: 15 },   // Left-Lower -> Deep Inferior Frontal
    { id: 9, x: 250,  y: 410, tilt: -6,  relX: -140, relY: -45 },  // Left-Upper -> Deep Dorsolateral Prefrontal
  ];

  // Direct Camera Zoom into Broken Neuron 0 (Frames 130 to 150, 20 frames with snappy ease-out)
  // Accelerates directly toward the neuron and smoothly decelerates into the centered close-up
  const zoomStart = 130;
  const zoomProgress = frame >= zoomStart
    ? interpolate(frame, [zoomStart, 150], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: (t) => 1 - Math.pow(1 - t, 3), // cubic ease-out
      })
    : 0;

  const targetZoomFactor = 5.6; // 0.34 * 5.6 = 1.904 macro scale
  const camScale = 1 + (targetZoomFactor - 1) * zoomProgress;

  // Direct screen trajectory math: eliminates the center-drift artifact
  const curCenterX = stations[0].x - ((stations[0].x - 960) * (1 - zoomProgress)) / camScale;
  const curCenterY = stations[0].y - ((stations[0].y - 540) * (1 - zoomProgress)) / camScale;

  // Glow fades out smoothly to zero as the camera zooms in, ensuring a clean vector transition
  const glowFade = interpolate(zoomProgress, [0, 0.7], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden select-none font-sans">
      {/* Background Clinical Grid */}
      <GridBackground theme="white" id="grid-s4" />

      {/* Main Vector Layer */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          {/* User Neuron Living Gradient */}
          <linearGradient id="user-neuron-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FCA5A5" />
            <stop offset="65%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* User Neuron Damaged/Broken Gradient */}
          <linearGradient id="user-neuron-broken-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>

          {/* Bioluminescent Neuron Glow Filter (Fades out smoothly as camera zooms) */}
          <filter id="neuron-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation={Math.max(0.1, 6 * glowFade)}
              floodColor="#EF4444"
              floodOpacity={0.85 * glowFade}
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation={Math.max(0.1, 2 * glowFade)}
              floodColor="#FFFFFF"
              floodOpacity={0.95 * glowFade}
            />
          </filter>

          {/* Thin Arrowhead Marker (Cyan / Healthy) */}
          <marker
            id="thin-arrowhead-cyan"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 2 L 8 5 L 0 8 Z" fill="#38BDF8" />
          </marker>

          {/* Thin Arrowhead Marker (Red / Severed) */}
          <marker
            id="thin-arrowhead-red"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 2 L 8 5 L 0 8 Z" fill="#EF4444" />
          </marker>

          {/* Brain Lateral Tissue Gradients */}
          <linearGradient id="brain-bg-grad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#FFF4F6" />
            <stop offset="35%" stopColor="#FBDCE1" />
            <stop offset="75%" stopColor="#F7B8C2" />
            <stop offset="100%" stopColor="#E58B98" />
          </linearGradient>

          <linearGradient id="stem-grad" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#F7A8B4" />
            <stop offset="50%" stopColor="#E86E7F" />
            <stop offset="100%" stopColor="#B83A4A" />
          </linearGradient>

          <linearGradient id="cerebellum-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE3E7" />
            <stop offset="60%" stopColor="#F8B5BF" />
            <stop offset="100%" stopColor="#D97583" />
          </linearGradient>

          {/* Soft 3D Gyrus Highlight Filter */}
          <filter id="gyrus-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Brain Outer Drop Shadow Filter for Light Mode */}
          <filter id="brain-halo-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="16" stdDeviation="28" floodColor="#0F172A" floodOpacity="0.14" />
          </filter>

          {/* Contact Spot Spark Filter */}
          <filter id="pin-spark-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.7" />
          </filter>

          <filter id="pin-broken-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#EF4444" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Dynamic Camera Stage (Zooms into Broken Neuron 0 at end of scene) */}
        <g
          id="scene04-camera-stage"
          transform={`translate(960, 540) scale(${camScale}) translate(${-curCenterX}, ${-curCenterY})`}
        >
          {/* ============================================================== */}
          {/* 1. CENTERED LATERAL REALISTIC BRAIN (Matches Reference Image)   */}
          {/* ============================================================== */}
          <g
            id="centered-realistic-brain"
            transform={`translate(${brainCenter.x}, ${brainCenter.y + brainBobY}) scale(${brainScale * brainPulse})`}
            opacity={brainOpacity}
            filter="url(#brain-halo-filter)"
          >
            {/* Outer Radiating Energy Accent Strokes (Slate on white grid) */}
            <g stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" fill="none">
              <line x1="-315" y1="-80" x2="-350" y2="-100" strokeWidth="2.8" />
              <line x1="-285" y1="-170" x2="-315" y2="-210" strokeWidth="2.2" />
              <line x1="-195" y1="-260" x2="-215" y2="-300" strokeWidth="2.2" />
              <line x1="-155" y1="-275" x2="-165" y2="-315" strokeWidth="2.8" />
              <line x1="165" y1="-270" x2="185" y2="-305" strokeWidth="2.2" />
              <line x1="265" y1="-190" x2="300" y2="-215" strokeWidth="2.8" />
              <line x1="335" y1="-40" x2="375" y2="-45" strokeWidth="2.8" />
              <line x1="325" y1="90" x2="360" y2="110" strokeWidth="2.2" />
              <line x1="195" y1="210" x2="220" y2="245" strokeWidth="2.8" />
              <line x1="-85" y1="210" x2="-100" y2="250" strokeWidth="2.2" />
              <line x1="-265" y1="130" x2="-305" y2="155" strokeWidth="2.8" />
            </g>

            {/* Outer Contour Border */}
            <path
              d="M -275 10
                 C -290 -60, -260 -160, -180 -210
                 C -100 -260, 50 -265, 170 -210
                 C 260 -160, 295 -70, 290 20
                 C 285 70, 265 110, 245 130
                 C 225 150, 185 155, 160 145
                 C 145 180, 105 215, 65 200
                 C 50 195, 40 170, 35 150
                 C -10 160, -80 145, -120 125
                 C -170 125, -230 110, -260 60
                 C -270 45, -272 25, -275 10 Z"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />

            {/* BRAIN STEM (Pons & Medulla extending downward) */}
            <g id="brain-stem">
              <path
                d="M 15 85
                   C 25 105, 40 135, 50 165
                   C 58 190, 75 210, 68 225
                   C 60 240, 35 235, 20 215
                   C 5 195, -5 160, -12 125
                   C -15 105, -5 90, 15 85 Z"
                fill="url(#stem-grad)"
                stroke="#A83B46"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M 12 105 C 22 130, 35 165, 45 195 C 48 205, 40 218, 30 212"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.5"
              />
            </g>

            {/* CEREBELLUM (Posterior lower lobe with folia hatching) */}
            <g id="cerebellum">
              <path
                d="M 22 80
                   C 50 65, 100 60, 145 75
                   C 195 90, 235 125, 215 165
                   C 195 195, 135 195, 85 185
                   C 45 175, 25 150, 18 120
                   C 15 100, 16 90, 22 80 Z"
                fill="url(#cerebellum-grad)"
                stroke="#A83B46"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              {/* Cerebellar Division Fissure */}
              <path
                d="M 35 120 C 75 110, 130 115, 185 135"
                fill="none"
                stroke="#A83B46"
                strokeWidth="3"
              />
              {/* Horizontal Folia Hatching Lines */}
              <g stroke="#C25B66" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8">
                <path d="M 45 92 C 80 82, 125 82, 165 92" />
                <path d="M 40 105 C 80 98, 135 98, 180 110" />
                <path d="M 42 132 C 85 128, 140 135, 185 152" />
                <path d="M 48 145 C 85 142, 135 148, 175 165" />
                <path d="M 60 158 C 95 155, 135 160, 160 175" />
                <path d="M 75 170 C 105 168, 130 172, 145 180" />
              </g>
              <path
                d="M 65 78 C 105 72, 155 82, 185 100"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>

            {/* CEREBRAL CORTEX (Main Lobes & Convolutions) */}
            <path
              id="cerebral-cortex-mass"
              d="M -260 0
                 C -275 -65, -245 -150, -175 -195
                 C -105 -240, 35 -245, 155 -195
                 C 235 -150, 275 -70, 270 10
                 C 265 60, 240 100, 205 120
                 C 180 105, 150 75, 115 65
                 C 65 52, 20 62, -15 80
                 C -35 88, -60 92, -85 92
                 C -130 92, -175 105, -210 90
                 C -245 70, -255 35, -260 0 Z"
              fill="url(#brain-bg-grad)"
              stroke="#A83B46"
              strokeWidth="5"
              strokeLinejoin="round"
            />

            {/* Sulcal Fissure Grooves (Warm Terracotta/Dark Red) */}
            <g stroke="#9E3340" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M -245 -25 C -225 -15, -210 -40, -195 -60 C -180 -80, -210 -105, -230 -85" />
              <path d="M -220 -105 C -200 -125, -175 -135, -150 -115 C -130 -95, -145 -65, -170 -60" />
              <path d="M -170 -60 C -150 -55, -135 -75, -115 -80 C -95 -85, -80 -65, -100 -45 C -115 -30, -145 -35, -165 -15" />
              <path d="M -160 -160 C -145 -130, -125 -130, -110 -165 C -95 -190, -75 -170, -60 -140" />
              <path d="M -110 -165 C -85 -145, -65 -135, -50 -110 C -40 -90, -65 -75, -80 -85" />
              <path d="M -50 -195 C -30 -160, -20 -130, -5 -110 C 10 -90, -5 -70, -25 -75" />
              <path d="M 0 -215 C 15 -175, 25 -145, 35 -115 C 45 -85, 20 -70, 0 -60" />
              <path d="M 45 -205 C 65 -165, 80 -140, 95 -110 C 110 -80, 80 -65, 55 -55" />
              <path d="M 95 -185 C 120 -150, 145 -130, 160 -95 C 170 -70, 140 -60, 115 -50" />
              <path d="M 155 -165 C 185 -135, 215 -110, 225 -75 C 235 -40, 205 -35, 175 -40" />
              <path d="M 220 -85 C 245 -55, 245 -20, 230 15 C 215 45, 185 35, 170 10" />
              <path d="M 240 -15 C 255 15, 240 50, 215 65 C 195 78, 175 60, 160 40" />
              <path d="M -235 25 C -195 10, -145 15, -95 10 C -45 5, 10 -10, 60 -15 C 110 -20, 160 0, 205 25" strokeWidth="5.5" stroke="#7A222D" />
              <path d="M -230 45 C -195 38, -155 45, -115 40 C -75 35, -35 25, 10 20 C 50 15, 95 30, 130 50" />
              <path d="M -205 70 C -165 65, -125 70, -85 65 C -45 60, 0 50, 40 45" />
              <path d="M -155 88 C -115 85, -75 88, -35 80 C 5 72, 45 65, 80 62" />
              <path d="M -70 45 C -50 65, -60 85, -80 85" />
              <path d="M 10 35 C 30 55, 15 75, -5 75" />
              <path d="M 70 30 C 95 48, 80 68, 60 65" />
            </g>

            {/* Soft 3D Puffy Gyral Ridge Highlights */}
            <g stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.65" filter="url(#gyrus-soft-glow)">
              <path d="M -230 -40 C -215 -35, -200 -55, -185 -75" />
              <path d="M -200 -120 C -175 -140, -150 -125, -135 -105" />
              <path d="M -145 -155 C -130 -135, -115 -145, -100 -175" strokeWidth="5" />
              <path d="M -85 -180 C -65 -150, -55 -135, -40 -115" />
              <path d="M -40 -205 C -25 -170, -15 -145, 0 -120" strokeWidth="5" />
              <path d="M 15 -215 C 30 -180, 40 -150, 55 -125" strokeWidth="5" />
              <path d="M 60 -205 C 80 -170, 95 -145, 110 -120" />
              <path d="M 110 -185 C 135 -155, 155 -135, 175 -105" />
              <path d="M 175 -155 C 200 -125, 225 -100, 235 -70" strokeWidth="4" />
              <path d="M -215 32 C -175 22, -135 25, -95 22" strokeWidth="4" />
              <path d="M -85 20 C -45 12, 0 2, 45 -2" strokeWidth="4.5" />
              <path d="M 55 -5 C 100 -8, 145 10, 185 30" strokeWidth="4" />
              <path d="M -185 55 C -145 50, -105 52, -65 48" />
              <path d="M -55 45 C -15 38, 25 32, 65 30" />
              <path d="M -130 75 C -95 72, -55 72, -20 65" />
            </g>

            {/* Volumetric Convexity Shading */}
            <ellipse cx="-130" cy="-100" rx="35" ry="16" fill="#FFFFFF" opacity="0.32" transform="rotate(-20 -130 -100)" />
            <ellipse cx="60" cy="-130" rx="45" ry="20" fill="#FFFFFF" opacity="0.32" transform="rotate(25 60 -130)" />
            <ellipse cx="140" cy="-60" rx="40" ry="18" fill="#FFFFFF" opacity="0.28" transform="rotate(-15 140 -60)" />
            <ellipse cx="-30" cy="5" rx="55" ry="16" fill="#FFFFFF" opacity="0.28" />
          </g>

          {/* ============================================================== */}
          {/* 2. THIN ARROWS FROM NEURONS PENETRATING DEEP INSIDE BRAIN      */}
          {/* ============================================================== */}
          {stations.map((st, i) => {
            // Pop timing: frames 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
            const popStart = 10 + i * 5;
            if (frame < popStart) return null;

            // Break timing: frames 70, 76, 82, 88, 94, 100, 106, 112, 118, 124
            const breakStart = 70 + i * 6;
            const isBreaking = frame >= breakStart;

            // Arrow extension progress upon neuron pop (takes ~6 frames to reach deep brain target)
            const arrowProgress = interpolate(frame, [popStart + 1, popStart + 7], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Break progress for this station
            const breakSpring = isBreaking
              ? spring({
                  frame: frame - breakStart,
                  fps,
                  config: { damping: 12, stiffness: 260, mass: 0.7 },
                })
              : 0;
            const breakProgress = interpolate(breakSpring, [0, 1], [0, 1]);

            // Synchronized internal target coordinates locked to brain tissue bob and pulse
            const currentBrainScale = brainScale * brainPulse;
            const targetX = brainCenter.x + st.relX * currentBrainScale;
            const targetY = brainCenter.y + brainBobY + st.relY * currentBrainScale;
            const dx = targetX - st.x;
            const dy = targetY - st.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            // Arrow starts slightly outside the neuron soma (~44px)
            const startX = st.x + Math.cos(angle) * 44;
            const startY = st.y + Math.sin(angle) * 44;

            // Full length penetrates past the border deep into internal brain tissue
            const fullLen = dist - 44;
            const currentLen = fullLen * arrowProgress;

            const currentEndX = startX + Math.cos(angle) * currentLen;
            const currentEndY = startY + Math.sin(angle) * currentLen;

            const arrowColor = breakProgress > 0 ? "#EF4444" : "#38BDF8";
            const arrowOpacity = breakProgress > 0
              ? interpolate(breakProgress, [0, 1], [0.9, 0.45])
              : 0.85;

            // Electric pulse moving along arrow while active and unbroken
            const pulseOffset = breakProgress <= 0 ? (frame * 14 + i * 8) % 36 : 0;

            return (
              <g key={`arrow-${i}`} id={`arrow-${i}`}>
                {/* Thin Arrow Line */}
                <line
                  x1={startX}
                  y1={startY}
                  x2={currentEndX}
                  y2={currentEndY}
                  stroke={arrowColor}
                  strokeWidth={breakProgress > 0 ? "1.5" : "1.8"}
                  strokeDasharray={breakProgress > 0 ? "6 4" : undefined}
                  opacity={arrowOpacity}
                />

                {/* Luminous Synaptic Laser Pulse when unbroken */}
                {breakProgress <= 0 && arrowProgress >= 1 && (
                  <line
                    x1={startX}
                    y1={startY}
                    x2={currentEndX}
                    y2={currentEndY}
                    stroke="#0284C7"
                    strokeWidth="2.8"
                    strokeDasharray="12 28"
                    strokeDashoffset={-pulseOffset}
                    opacity="0.9"
                  />
                )}

                {/* Arrowhead at target tip inside the brain */}
                {arrowProgress > 0.3 && (
                  <g transform={`translate(${currentEndX}, ${currentEndY}) rotate(${(angle * 180) / Math.PI})`}>
                    <polygon
                      points="-9,-3.5 0,0 -9,3.5"
                      fill={arrowColor}
                      opacity={arrowOpacity}
                    />
                  </g>
                )}

                {/* Target Contact Dot Deep Inside Brain Tissue */}
                {arrowProgress >= 1 && (
                  <g transform={`translate(${targetX}, ${targetY})`}>
                    <circle
                      cx="0"
                      cy="0"
                      r={breakProgress > 0 ? "4.5" : "5.5"}
                      fill={breakProgress > 0 ? "#EF4444" : "#FFFFFF"}
                      stroke={breakProgress > 0 ? "#991B1B" : "#38BDF8"}
                      strokeWidth="1.8"
                      filter={breakProgress > 0 ? "url(#pin-broken-glow)" : "url(#pin-spark-glow)"}
                    />
                    {breakProgress <= 0 && (
                      <circle cx="0" cy="0" r="2.2" fill="#38BDF8" />
                    )}
                  </g>
                )}
              </g>
            );
          })}


        {/* ============================================================== */}
        {/* 3. TEN NEURONS AROUND THE BRAIN & BREAK MECHANICS              */}
        {/* ============================================================== */}
        {stations.map((st, i) => {
          // Staggered pop-out: frames 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
          const popStart = 10 + i * 5;
          const hasPopped = frame >= popStart;
          if (!hasPopped) return null;

          const popSpring = spring({
            frame: frame - popStart,
            fps,
            config: { damping: 11, stiffness: 220, mass: 0.6 },
          });
          const popScale = interpolate(popSpring, [0, 1], [0, 1]);
          const popOpacity = interpolate(frame, [popStart, popStart + 4], [0, 1], {
            extrapolateRight: "clamp",
          });

          // Expanding shockwave on initial pop
          const popShockProgress = interpolate(frame, [popStart, popStart + 12], [0, 1], {
            extrapolateRight: "clamp",
          });
          const popShockR = popShockProgress * 30;
          const popShockOp = (1 - popShockProgress) * 0.75;

          // Ambient biological float (damped for station 0 during camera zoom to lock into center)
          const neuronFloatY = Math.sin(frame * 0.12 + i * 1.3) * 3 * (i === 0 ? (1 - zoomProgress) : 1);

          // Staggered break timing: frames 70, 76, 82, 88, 94, 100, 106, 112, 118, 124
          const breakStart = 70 + i * 6;
          const isBreaking = frame >= breakStart;

          const breakSpring = isBreaking
            ? spring({
                frame: frame - breakStart,
                fps,
                config: { damping: 12, stiffness: 260, mass: 0.7 },
              })
            : 0;
          const breakProgress = interpolate(breakSpring, [0, 1], [0, 1]);

          // Fracture shockwave ring on snap
          const breakShockProgress = isBreaking
            ? interpolate(frame, [breakStart, breakStart + 14], [0, 1], { extrapolateRight: "clamp" })
            : 0;
          const breakShockR = breakShockProgress * 42;
          const breakShockOp = (1 - breakShockProgress) * 0.9;

          // Color shifts to damaged state as it breaks
          const neuronFill = breakProgress > 0 ? "url(#user-neuron-broken-grad)" : "url(#user-neuron-grad)";

          return (
            <g key={`neuron-wrapper-${i}`} id={`neuron-station-${i}`}>
              {/* Initial Pop Shockwave Ring */}
              {popShockProgress < 1 && (
                <circle
                  cx={st.x}
                  cy={st.y}
                  r={popShockR}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  opacity={popShockOp}
                />
              )}

              {/* Fracture Break Shockwave Ring */}
              {isBreaking && breakShockProgress < 1 && (
                <circle
                  cx={st.x}
                  cy={st.y}
                  r={breakShockR}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                  opacity={breakShockOp}
                />
              )}

              {/* Small Micro-Fracture Debris Sparks upon breaking */}
              {isBreaking && (
                <g>
                  {[0, 1, 2, 3, 4].map((p) => {
                    const sparkAngle = (p * 1.25) + i * 0.7;
                    const sparkDist = interpolate(breakSpring, [0, 1], [0, 22 + (p % 3) * 8]);
                    const spX = st.x + Math.cos(sparkAngle) * sparkDist;
                    const spY = st.y + Math.sin(sparkAngle) * sparkDist;
                    const spOp = interpolate(breakSpring, [0, 0.4, 1], [0, 1, 0]);
                    const spSize = interpolate(breakSpring, [0, 1], [3.5, 1.2]);

                    return (
                      <circle
                        key={p}
                        cx={spX}
                        cy={spY}
                        r={spSize}
                        fill="#EF4444"
                        opacity={spOp}
                        filter={i === 0 && glowFade <= 0.05 ? undefined : "drop-shadow(0 0 3px #EF4444)"}
                      />
                    );
                  })}
                </g>
              )}

              {/* The Neuron (from user's neuron.svg, breaks in half via breakProgress) */}
              <g
                transform={`translate(${st.x}, ${st.y + neuronFloatY}) scale(${popScale}) rotate(${st.tilt})`}
                opacity={popOpacity}
              >
                <Neuron
                  id={`neuron-s4-${i}`}
                  scale={0.34}
                  fill={neuronFill}
                  stroke="#FFFFFF"
                  strokeWidth={1.2}
                  filter={i === 0 && glowFade <= 0.05 ? "none" : "url(#neuron-glow)"}
                  showNucleus={true}
                  breakProgress={breakProgress}
                  breakCrackColor="#EF4444"
                  crackGlow={i === 0 ? glowFade > 0.1 : true}
                />
              </g>
            </g>
          );
        })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
