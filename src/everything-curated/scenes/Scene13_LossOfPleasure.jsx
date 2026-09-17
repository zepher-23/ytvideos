import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground, CuratedStickman } from "../../shared";

const getIconPath = (type) => {
  switch (type) {
    case "camera":
      return <path d="M4 7h4l2-3h4l2 3h4v12H4V7zm6 6a4 4 0 108 0 4 4 0 00-8 0z" fill="currentColor" />;
    case "music":
      return <path d="M9 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3v-7h6v3h-4v7c0 1.66-1.34 3-3 3z" fill="currentColor" />;
    case "game":
      return <path d="M21 9l-4-4H7L3 9v5c0 1.1.9 2 2 2h3.5l1.5 1.5h4L15.5 16H19c1.1 0 2-.9 2-2V9zm-13 4H6v-2h2v2zm1-3H7V8h2v2zm4 3h-2v-2h2v2zm1-3h-2V8h2v2z" fill="currentColor" />;
    case "art":
      return <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a2 2 0 00-2.83 0L9 10.83l4.17 4.17 7.54-7.54a2 2 0 000-2.83z" fill="currentColor" />;
    case "science":
      return (
        <g stroke="currentColor" strokeWidth="1.5" fill="none">
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(45 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(-45 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </g>
      );
    case "book":
      return <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-1-1 1V4z" fill="currentColor" />;
    default:
      return <circle cx="12" cy="12" r="8" fill="currentColor" />;
  }
};

export const Scene13_LossOfPleasure = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropFrame = 55; 
  const isDead = frame >= dropFrame;

  const ringOpacity = interpolate(frame, [dropFrame, dropFrame + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Radii increased to spread the orbs out wider around the head
  const hobbies = [
    { id: 1, type: "game", color: "#EAB308", ringAngle: 15, rx: 350, ry: 90, speed: 0.04, offset: 0 },
    { id: 2, type: "music", color: "#22C55E", ringAngle: 15, rx: 350, ry: 90, speed: 0.04, offset: Math.PI },
    { id: 3, type: "camera", color: "#EF4444", ringAngle: -25, rx: 320, ry: 120, speed: 0.035, offset: Math.PI / 2 },
    { id: 4, type: "art", color: "#A855F7", ringAngle: -25, rx: 320, ry: 120, speed: 0.035, offset: Math.PI * 1.5 },
    { id: 5, type: "science", color: "#0EA5E9", ringAngle: 65, rx: 290, ry: 140, speed: 0.05, offset: 1 },
    { id: 6, type: "book", color: "#3B82F6", ringAngle: 65, rx: 290, ry: 140, speed: 0.05, offset: 1 + Math.PI },
  ];

  const processedHobbies = hobbies.map((hobby) => {
    const radAngle = (hobby.ringAngle * Math.PI) / 180;
    const dropT = dropFrame * hobby.speed + hobby.offset;
    const t = frame * hobby.speed + hobby.offset;
    
    const dropLocalX = hobby.rx * Math.cos(dropT);
    const dropLocalY = hobby.ry * Math.sin(dropT);
    const dropAbsoluteX = dropLocalX * Math.cos(radAngle) - dropLocalY * Math.sin(radAngle);
    const dropAbsoluteY = dropLocalX * Math.sin(radAngle) + dropLocalY * Math.cos(radAngle);

    let currentX, currentY, zIndex, currentOpacity, currentColor, useGlow;

    if (!isDead) {
      const localX = hobby.rx * Math.cos(t);
      const localY = hobby.ry * Math.sin(t);
      currentX = localX * Math.cos(radAngle) - localY * Math.sin(radAngle);
      currentY = localX * Math.sin(radAngle) + localY * Math.cos(radAngle);
      zIndex = Math.sin(t); 
      currentColor = hobby.color;
      currentOpacity = 1;
      useGlow = true;
    } else {
      const fallTime = frame - dropFrame;
      const gravity = 1.2;
      currentX = dropAbsoluteX;
      currentY = dropAbsoluteY + 0.5 * gravity * fallTime * fallTime;
      zIndex = 1; 
      currentColor = "#94A3B8"; 
      
      currentOpacity = interpolate(currentY, [200, 600], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      useGlow = false;
    }

    return { ...hobby, currentX, currentY, zIndex, currentOpacity, currentColor, useGlow };
  });

  const renderIcon = (hobby) => (
    <g 
      key={`icon-${hobby.id}`}
      transform={`translate(${hobby.currentX}, ${hobby.currentY})`}
      opacity={hobby.currentOpacity}
      filter={hobby.useGlow ? "url(#neon-glow)" : "none"}
    >
      <circle cx="0" cy="0" r="50" fill={hobby.useGlow ? "#FFFFFF" : "#E2E8F0"} stroke={hobby.currentColor} strokeWidth="7" />
      {/* Scale increased to 3.0 and offset adjusted to center perfectly in the larger orb */}
      <g transform="translate(-36, -36) scale(3.0)" color={hobby.currentColor}>
        {getIconPath(hobby.type)}
      </g>
    </g>
  );

  const renderRingArc = (hobby, isFront) => {
    const d = isFront 
      ? `M ${hobby.rx} 0 A ${hobby.rx} ${hobby.ry} 0 0 1 -${hobby.rx} 0` 
      : `M -${hobby.rx} 0 A ${hobby.rx} ${hobby.ry} 0 0 1 ${hobby.rx} 0`; 
      
    return (
      <path
        key={`ring-${hobby.id}-${isFront ? 'front' : 'back'}`}
        d={d}
        fill="none"
        stroke={hobby.color}
        strokeWidth="3.5"
        opacity={ringOpacity * 0.4}
        transform={`rotate(${hobby.ringAngle})`}
      />
    );
  };

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s13" />

      <svg width="0" height="0">
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      <svg viewBox="0 0 1920 1080" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        
        <g transform="translate(960, 360)">
          {processedHobbies.map(h => renderRingArc(h, false))}
          {processedHobbies.filter(h => h.zIndex < 0).map(renderIcon)}
        </g>

        <CuratedStickman
          x={960}
          y={850}
          scale={1.35}
          pose="idle"
          slumpProgress={isDead ? 0.35 : 0}
          eyes="sad-open"
          mouth="flat"
          lookDirection="center"
          frame={frame}
        />

        <g transform="translate(960, 360)">
          {processedHobbies.map(h => renderRingArc(h, true))}
          {processedHobbies.filter(h => h.zIndex >= 0).map(renderIcon)}
        </g>

      </svg>
    </AbsoluteFill>
  );
};