import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CuratedStickman } from "../../shared";

/**
 * Scene 79: Spotlight on Worthlessness
 * Duration: 210 frames (7.0s)
 * Environment: Pitch-black room illuminated by a single overhead spotlight.
 * Characters & Props: Stickman crouching, covering ears; jagged accusatory speech bubbles crowding in.
 */
export const Scene079_SpotlightonWorthlessness = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Spotlight flicker turn-on at beginning
  const spotFlicker = interpolate(frame, [0, 4, 8, 12, 16], [0, 0.4, 0.1, 0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shivering stickman
  const shiverX = Math.sin(frame * 1.6) * 3;
  const shiverY = Math.cos(frame * 2.1) * 2;

  // Climax crowding factor: bubbles push inward towards center (frames 130 to 190)
  const crowdProgress = interpolate(frame, [130, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Helper for pop-in of jagged speech bubbles
  const getBubblePop = (startFrame) => {
    const s = spring({
      frame: frame - startFrame,
      fps,
      config: { damping: 10, stiffness: 220 },
    });
    return interpolate(s, [0, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const pop1 = getBubblePop(40);  // FAILURE (Top Left)
  const pop2 = getBubblePop(55);  // WORTHLESS (Top Right)
  const pop3 = getBubblePop(70);  // RUINED (Left)
  const pop4 = getBubblePop(85);  // DISGRACE (Right)
  const pop5 = getBubblePop(100); // NO HOPE (Bottom Left)
  const pop6 = getBubblePop(115); // FRAUD (Bottom Right)
  const pop7 = getBubblePop(130); // WORTHLESS (Top Center)

  return (
    <AbsoluteFill
      className="overflow-hidden select-none font-sans"
      style={{
        backgroundColor: "#020408",
      }}
    >
      {/* OVERHEAD SPOTLIGHT CONE */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" opacity={spotFlicker}>
        <defs>
          <linearGradient id="spotConeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#E2E8F0" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
          </linearGradient>

          <radialGradient id="spotPoolGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#E2E8F0" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#94A3B8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Bubble drop shadow filter */}
          <filter id="bubbleShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Light Beam from ceiling */}
        <polygon
          points="960,0 800,820 1120,820"
          fill="url(#spotConeGrad)"
        />

        {/* Pool of light on floor */}
        <ellipse
          cx="960"
          cy="820"
          rx={interpolate(crowdProgress, [0, 1], [220, 160])}
          ry={interpolate(crowdProgress, [0, 1], [55, 40])}
          fill="url(#spotPoolGrad)"
        />
      </svg>

      {/* Header Container */}
      <div
        className="absolute top-10 left-0 right-0 flex flex-col justify-center items-center pointer-events-none z-30 px-8"
        style={{
          opacity: enterSpring,
          transform: `translateY(${interpolate(enterSpring, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          className="px-8 py-3 rounded-2xl backdrop-blur-md shadow-2xl text-center max-w-4xl"
          style={{
            backgroundColor: "rgba(10, 15, 26, 0.9)",
            border: "1.5px solid rgba(226, 232, 240, 0.2)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black tracking-wider uppercase m-0 leading-tight text-white"
          >
            DELUSIONS OF WORTHLESSNESS
          </h1>
          <p className="text-sm md:text-base font-bold tracking-widest uppercase mt-1 mb-0 text-slate-400">
            Psychotic Depression • Mood-Congruent Persecution
          </p>
        </div>
      </div>

      {/* Main SVG Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        {/* CROUCHING STICKMAN COVERING EARS IN SPOTLIGHT */}
        <g
          transform={`translate(${960 + shiverX}, ${800 + shiverY})`}
          opacity={spotFlicker}
        >
          {/* Floor Contact Shadow */}
          <ellipse cx="0" cy="15" rx="75" ry="14" fill="#000000" opacity="0.75" />

          {/* Stickman crouched in misery */}
          <CuratedStickman
            x={0}
            y={0}
            scale={1.2}
            variant="adult"
            pose="crouch"
            mouth="shock"
            eyes="defeat"
            slumpProgress={0.9}
            frame={frame}
          />

          {/* Hands over ears gesture lines */}
          <circle cx="-38" cy="-145" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
          <circle cx="38" cy="-145" r="14" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />

          {/* Flying sweat droplets from terror */}
          {frame > 60 && (
            <g>
              <circle cx={-50 - (frame % 30) * 1.5} cy={-170 - (frame % 20)} r="4" fill="#38BDF8" opacity="0.8" />
              <circle cx={50 + (frame % 30) * 1.5} cy={-175 - (frame % 25)} r="3.5" fill="#38BDF8" opacity="0.8" />
            </g>
          )}
        </g>

        {/* JAGGED ACCUSATORY SPEECH BUBBLES SURROUNDING HIM */}

        {/* 1. FAILURE (Top Left: x=580, y=420) */}
        {pop1 > 0 && (
          <g
            transform={`translate(${580 + crowdProgress * 110}, ${420 + crowdProgress * 90}) scale(${pop1})`}
            filter="url(#bubbleShadow)"
          >
            {/* Jagged bubble polygon */}
            <polygon
              points="-150,-45 -40,-50 80,-45 150,-20 170,10 140,45 60,40 -20,50 -100,45 -145,15 -170,-15"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="5"
            />
            {/* Pointer spike pointing at stickman */}
            <polygon points="140,35 240,110 100,50" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
            <polygon points="138,33 235,108 102,48" fill="#FFFFFF" />
            <text
              x="0"
              y="12"
              fill="#000000"
              fontSize="34"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              FAILURE
            </text>
          </g>
        )}

        {/* 2. WORTHLESS (Top Right: x=1360, y=400) */}
        {pop2 > 0 && (
          <g
            transform={`translate(${1360 - crowdProgress * 120}, ${400 + crowdProgress * 90}) scale(${pop2})`}
            filter="url(#bubbleShadow)"
          >
            <polygon
              points="-180,-50 -60,-45 60,-55 180,-30 200,10 160,45 80,40 -40,55 -140,40 -190,10"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="5"
            />
            {/* Pointer spike pointing down-left at stickman */}
            <polygon points="-120,40 -230,120 -60,50" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
            <polygon points="-118,38 -225,118 -62,48" fill="#FFFFFF" />
            <text
              x="0"
              y="12"
              fill="#000000"
              fontSize="36"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              WORTHLESS
            </text>
          </g>
        )}

        {/* 3. RUINED (Mid Left: x=480, y=620) */}
        {pop3 > 0 && (
          <g
            transform={`translate(${480 + crowdProgress * 140}, ${620}) scale(${pop3})`}
            filter="url(#bubbleShadow)"
          >
            <polygon
              points="-140,-40 -20,-45 90,-35 150,-10 130,40 50,45 -50,40 -130,45 -160,0"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="5"
            />
            <polygon points="120,20 220,50 110,40" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
            <polygon points="118,18 215,48 108,38" fill="#FFFFFF" />
            <text
              x="0"
              y="12"
              fill="#000000"
              fontSize="32"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              RUINED
            </text>
          </g>
        )}

        {/* 4. DISGRACE (Mid Right: x=1440, y=630) */}
        {pop4 > 0 && (
          <g
            transform={`translate(${1440 - crowdProgress * 140}, ${630}) scale(${pop4})`}
            filter="url(#bubbleShadow)"
          >
            <polygon
              points="-150,-40 -30,-45 80,-35 150,-15 130,40 40,45 -60,40 -140,40 -170,0"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="5"
            />
            <polygon points="-120,20 -220,50 -100,40" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
            <polygon points="-118,18 -215,48 -98,38" fill="#FFFFFF" />
            <text
              x="0"
              y="12"
              fill="#000000"
              fontSize="32"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              DISGRACE
            </text>
          </g>
        )}

        {/* 5. NO HOPE (Bottom Left: x=560, y=820) */}
        {pop5 > 0 && (
          <g
            transform={`translate(${560 + crowdProgress * 110}, ${820 - crowdProgress * 50}) scale(${pop5})`}
            filter="url(#bubbleShadow)"
          >
            <polygon
              points="-140,-35 -30,-40 80,-30 140,-10 130,35 40,40 -50,35 -130,40 -150,-5"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="5"
            />
            <polygon points="100,-20 190,-60 80,0" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
            <polygon points="98,-18 185,-58 78,2" fill="#FFFFFF" />
            <text
              x="0"
              y="10"
              fill="#000000"
              fontSize="30"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              NO HOPE
            </text>
          </g>
        )}

        {/* 6. FRAUD (Bottom Right: x=1370, y=820) */}
        {pop6 > 0 && (
          <g
            transform={`translate(${1370 - crowdProgress * 110}, ${820 - crowdProgress * 50}) scale(${pop6})`}
            filter="url(#bubbleShadow)"
          >
            <polygon
              points="-130,-35 -20,-40 70,-30 130,-10 120,35 30,40 -40,35 -120,40 -140,-5"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="5"
            />
            <polygon points="-90,-20 -180,-60 -70,0" fill="#FFFFFF" stroke="#000000" strokeWidth="5" />
            <polygon points="-88,-18 -175,-58 -68,2" fill="#FFFFFF" />
            <text
              x="0"
              y="10"
              fill="#000000"
              fontSize="30"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="3"
            >
              FRAUD
            </text>
          </g>
        )}

        {/* 7. OVERHEAD GIANT "WORTHLESS" (Top Center: x=960, y=280) */}
        {pop7 > 0 && (
          <g
            transform={`translate(960, ${280 + crowdProgress * 70}) scale(${pop7 * 1.1})`}
            filter="url(#bubbleShadow)"
          >
            <polygon
              points="-210,-55 -80,-50 70,-60 210,-35 230,10 190,50 90,45 -50,60 -160,45 -220,10"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="6"
            />
            {/* Big pointer down */}
            <polygon points="-20,50 0,140 20,50" fill="#FFFFFF" stroke="#000000" strokeWidth="6" />
            <polygon points="-18,48 0,135 18,48" fill="#FFFFFF" />
            <text
              x="0"
              y="14"
              fill="#000000"
              fontSize="42"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="4"
            >
              WORTHLESS
            </text>
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};
