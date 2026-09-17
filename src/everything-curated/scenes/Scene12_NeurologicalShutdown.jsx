import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground, Brain } from "../../shared";

/**
 * DaysOfWeekCalendar - Days of week flip rapidly with dynamic motion blur
 */
const DaysOfWeekCalendar = ({ x = 0, y = 0, scale = 1, frame, flipPeriod = 7 }) => {
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

  const pageIndex = Math.floor(frame / flipPeriod);
  const flipT = (frame % flipPeriod) / flipPeriod;

  const currentDay = days[pageIndex % days.length];
  const nextDay = days[(pageIndex + 1) % days.length];

  // Motion blur intensity peaks mid-flip
  const blurAmount = Math.sin(flipT * Math.PI) * 8;
  const flipScaleY = Math.cos(flipT * Math.PI);
  const isTopHalf = flipT < 0.5;

  const width = 420;
  const height = 380;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <defs>
        <filter id="s12-cal-blur" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={`0 ${blurAmount}`} />
        </filter>
      </defs>

      {/* Drop Shadow */}
      <rect x="14" y="14" width={width} height={height} rx="18" fill="#000000" opacity="0.16" />

      {/* Base Calendar Plate */}
      <rect x="0" y="0" width={width} height={height} rx="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="8" />

      {/* Red Header Bar */}
      <path
        d={`M 0 16 Q 0 0 16 0 L ${width - 16} 0 Q ${width} 0 ${width} 16 L ${width} 84 L 0 84 Z`}
        fill="#EF4444"
        stroke="#0F172A"
        strokeWidth="8"
      />
      <text
        x={width / 2}
        y="54"
        textAnchor="middle"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="32"
        fill="#FFFFFF"
        letterSpacing="4"
      >
        THIS WEEK
      </text>

      {/* Base Next Day */}
      <text
        x={width / 2}
        y={height / 2 + 70}
        textAnchor="middle"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="48"
        fill="#1E293B"
        letterSpacing="2"
      >
        {nextDay}
      </text>

      {/* Rapid Flipping Page with Motion Blur */}
      <g
        transform={`translate(0, 84) scale(1, ${Math.max(-1, Math.min(1, flipScaleY))})`}
        style={{ transformOrigin: "0px 0px" }}
        filter={blurAmount > 1 ? "url(#s12-cal-blur)" : undefined}
      >
        <rect
          x="0"
          y="0"
          width={width}
          height={height - 84}
          fill={isTopHalf ? "#FFFFFF" : "#F8FAFC"}
          stroke="#0F172A"
          strokeWidth="8"
        />
        <text
          x={width / 2}
          y={(height - 84) / 2 + 30}
          textAnchor="middle"
          fontFamily="'Arial Black', 'Impact', sans-serif"
          fontWeight="900"
          fontSize="48"
          fill="#0F172A"
          letterSpacing="2"
        >
          {isTopHalf ? currentDay : nextDay}
        </text>
      </g>

      {/* Flying Page Peel Effect */}
      <g
        transform={`translate(${width - 25 + flipT * 85}, ${115 + flipT * 130}) rotate(${flipT * 35}) scale(${1 - flipT * 0.3})`}
        opacity={Math.max(0, 1 - flipT * 1.2)}
      >
        <rect x="-24" y="-24" width="55" height="70" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        <line x1="-12" y1="-6" x2="16" y2="-6" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <line x1="-12" y1="8" x2="10" y2="8" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Speed & Motion Streaks */}
      <g opacity={Math.min(1, blurAmount * 0.3)}>
        <line x1={width + 12} y1="170" x2={width + 60} y2="165" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
        <line x1={width + 20} y1="240" x2={width + 75} y2="235" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
        <line x1={width + 8} y1="310" x2={width + 55} y2="305" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Spiral Binder Rings */}
      <g>
        <rect x="0" y="0" width={width} height="20" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
        {[45, 120, 195, 270, 345].map((rx, i) => (
          <rect
            key={i}
            x={rx - 9}
            y="-9"
            width="18"
            height="32"
            rx="5"
            fill="#CBD5E1"
            stroke="#0F172A"
            strokeWidth="4"
          />
        ))}
      </g>
    </g>
  );
};

/**
 * Higher Detailed Desk with 3D Depth, Wood Bevel, Sturdy Steel Legs, and Coffee Mug
 */
const DetailedDesk = ({ x = 440, y = 650 }) => {
  return (
    <g id="detailed-desk" transform={`translate(${x}, ${y})`}>
      {/* Desk Shadow on Floor */}
      <ellipse cx="280" cy="150" rx="290" ry="12" fill="#000000" opacity="0.18" />

      {/* Sturdy Steel Legs (Extending down to floor at y=800) */}
      <g stroke="#0F172A" strokeWidth="8" strokeLinecap="round">
        {/* Left Leg */}
        <line x1="40" y1="16" x2="40" y2="150" />
        {/* Right Leg */}
        <line x1="520" y1="16" x2="520" y2="150" />
        {/* Foot leveling glides on floor */}
        <line x1="28" y1="150" x2="52" y2="150" strokeWidth="6" />
        <line x1="508" y1="150" x2="532" y2="150" strokeWidth="6" />
        {/* Under-desk cross support bar */}
        <line x1="40" y1="110" x2="520" y2="110" stroke="#64748B" strokeWidth="4" />
      </g>

      {/* Front Thickness Apron */}
      <polygon
        points="0,16 560,16 560,32 0,32"
        fill="#CBD5E1"
        stroke="#0F172A"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Main Desktop Surface (3D Perspective Plate at higher y=650) */}
      <polygon
        points="20,0 540,0 560,16 0,16"
        fill="#F8FAFC"
        stroke="#0F172A"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Desk Mat under laptop */}
      <polygon
        points="70,2 340,2 350,14 60,14"
        fill="#334155"
        opacity="0.35"
      />

      {/* Ceramic Coffee Mug */}
      <g transform="translate(470, -22)">
        <ellipse cx="14" cy="38" rx="14" ry="4" fill="#000000" opacity="0.2" />
        <rect x="0" y="6" width="28" height="32" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
        <path d="M 28 14 C 38 14, 38 30, 28 30" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        <path d="M 8 2 Q 12 -6 8 -12" fill="none" stroke="#94A3B8" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        <path d="M 18 2 Q 14 -6 18 -12" fill="none" stroke="#94A3B8" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      </g>
    </g>
  );
};

/**
 * Ergonomic Office Chair (Adjusted to match higher desk)
 */
const OfficeChair = ({ x = 385, y = 800, seatY = 654 }) => {
  const liftHeight = 800 - seatY;
  return (
    <g id="ergonomic-office-chair" transform={`translate(${x}, ${y})`}>
      {/* Floor Shadow */}
      <ellipse cx="0" cy="0" rx="55" ry="9" fill="#000000" opacity="0.2" />

      {/* 5-Star Caster Base with Wheels */}
      <g stroke="#0F172A" strokeWidth="6" strokeLinecap="round">
        <line x1="-46" y1="-5" x2="0" y2="-16" />
        <line x1="46" y1="-5" x2="0" y2="-16" />
        <line x1="-20" y1="2" x2="0" y2="-16" />
        <line x1="20" y1="2" x2="0" y2="-16" />
      </g>
      <circle cx="-46" cy="-2" r="5" fill="#1E293B" />
      <circle cx="46" cy="-2" r="5" fill="#1E293B" />
      <circle cx="0" cy="4" r="5" fill="#1E293B" />

      {/* Hydraulic Gas Lift Cylinder */}
      <rect x="-6" y={-liftHeight + 16} width="12" height={liftHeight - 20} rx="3" fill="#0F172A" stroke="#334155" strokeWidth="2" />

      {/* Padded Seat Cushion */}
      <rect x="-60" y={-liftHeight} width="120" height="18" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />

      {/* Ergonomic Curved Mesh Backrest */}
      <path
        d={`M -48 ${-liftHeight} C -64 ${-liftHeight - 50}, -64 ${-liftHeight - 120}, -42 ${-liftHeight - 170}`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={`M -48 ${-liftHeight} C -64 ${-liftHeight - 50}, -64 ${-liftHeight - 120}, -42 ${-liftHeight - 170}`}
        fill="none"
        stroke="#334155"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Armrest */}
      <path
        d={`M -35 ${-liftHeight} L -35 ${-liftHeight - 45} L 5 ${-liftHeight - 45}`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  );
};

/**
 * Side-Angle Laptop with Radiant Display Glow
 * Rendered in authentic profile perspective: keyboard flat on desk, screen opened toward the stickman,
 * casting a vibrant volumetric light cone and glow.
 */
const SideAngleLaptop = ({ x = 540, y = 650, isDimmed = false }) => {
  return (
    <g id="side-angle-laptop" transform={`translate(${x}, ${y})`}>
      <defs>
        {/* Volumetric Display Light Beam shining leftward toward stickman */}
        <linearGradient id="laptop-glow-cone" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.75" />
          <stop offset="35%" stopColor="#0EA5E9" stopOpacity="0.32" />
          <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>

        {/* Soft screen surface bloom */}
        <filter id="screen-bloom" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* VOLUMETRIC SCREEN GLOW CONE (Casting leftward over stickman's hands and face) */}
      {!isDimmed && (
        <polygon
          points="0,0 48,-118 -220,-170 -220,50"
          fill="url(#laptop-glow-cone)"
        />
      )}

      {/* Screen glow reflection on the desk surface */}
      <polygon
        points="-12,0 120,0 140,16 -30,16"
        fill="#38BDF8"
        opacity={isDimmed ? 0.02 : 0.18}
      />

      {/* Laptop Base (Thin tapered wedge in side perspective, flat on desk) */}
      <polygon
        points="-15,0 115,0 110,9 -20,9"
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Side-view Keyboard Area (Recessed key slope) */}
      <polygon
        points="-4,1.5 75,1.5 72,5.5 -8,5.5"
        fill="#0F172A"
      />
      <line x1="-2" y1="3.5" x2="70" y2="3.5" stroke="#475569" strokeWidth="1.8" strokeDasharray="4 2" />

      {/* Laptop Hinge Cylinder */}
      <circle cx="0" cy="0" r="4.5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />

      {/* Back Display Lid (Silver outer spine tilted backward at ~115 degrees) */}
      <path
        d="M 0 0 L 48 -118"
        stroke="#0F172A"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M 2 0 L 50 -118"
        stroke="#CBD5E1"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* RADIANT INNER SCREEN DISPLAY (Facing left toward stickman) */}
      {/* Soft screen bloom */}
      {!isDimmed && (
        <line
          x1="-2"
          y1="-2"
          x2="46"
          y2="-116"
          stroke="#38BDF8"
          strokeWidth="14"
          filter="url(#screen-bloom)"
          opacity="0.65"
          strokeLinecap="round"
        />
      )}

      {/* Crisp cyan screen glass */}
      <line
        x1="-1"
        y1="-2"
        x2="46"
        y2="-116"
        stroke={isDimmed ? "#1E293B" : "#38BDF8"}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Core bright light streak on screen */}
      {!isDimmed && (
        <line
          x1="-1"
          y1="-2"
          x2="46"
          y2="-116"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

/**
 * Seated Stickman seated in office chair at higher desk with arms typing on the laptop
 */
const SeatedStickman = ({
  headX = 430,
  headY = 415,
  deskY = 650,
  typingJitter = 0,
  faceOpacity = 1,
}) => {
  const seatY = deskY + 6; // Hips rest just below desk surface

  return (
    <g id="seated-stickman">
      {/* SEATED LEGS */}
      <g stroke="#000000" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Left Leg: Horizontal thigh to knee, vertical shin to floor at 800 */}
        <path d={`M 375 ${seatY} L 450 ${seatY} L 450 800`} fill="none" />
        {/* Right Leg: Slightly offset */}
        <path d={`M 390 ${seatY} L 468 ${seatY} L 468 800`} fill="none" />
        {/* Stick feet resting on floor */}
        <line x1="450" y1="800" x2="480" y2="800" />
        <line x1="468" y1="800" x2="498" y2="800" />
      </g>

      {/* TUNIC TORSO (Leaning forward toward desk and laptop) */}
      <path
        d={`M 360 ${seatY} L 420 ${seatY} L 458 480 Q 458 472 448 472 L 388 472 Q 378 472 380 480 Z`}
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="7.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* ARMS REACHING TO LAPTOP KEYBOARD */}
      <g stroke="#000000" strokeWidth="7" strokeLinecap="round">
        {/* Far Arm */}
        <path d={`M 402 485 Q 460 570 ${530 + typingJitter} ${deskY - 4}`} fill="none" />
        <circle cx={530 + typingJitter} cy={deskY - 4} r="8.5" fill="#000000" />

        {/* Near Arm */}
        <path d={`M 442 485 Q 495 570 ${560 + typingJitter} ${deskY - 2}`} fill="none" />
        <circle cx={560 + typingJitter} cy={deskY - 2} r="8.5" fill="#000000" />
      </g>

      {/* CANONICAL HEAD CIRCLE */}
      <circle
        cx={headX}
        cy={headY}
        r="68"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="7.5"
      />

      {/* FACIAL FEATURES (Fades out smoothly upon zoom so ZERO overlap over the brain) */}
      {faceOpacity > 0 && (
        <g
          id="stickman-face-features"
          transform={`translate(${headX}, ${headY})`}
          opacity={faceOpacity}
        >
          {/* Defeated closed eyes */}
          <path
            d="M -22 -6 Q -12 2 -2 -6"
            fill="none"
            stroke="#000000"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 6 -6 Q 16 2 26 -6"
            fill="none"
            stroke="#000000"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Distressed sorrowful eyebrows */}
          <path
            d="M -26 -14 Q -16 -22 -6 -20"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 6 -20 Q 16 -22 26 -14"
            fill="none"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Frown mouth */}
          <path
            d="M -16 22 Q 0 12 16 22"
            fill="none"
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Sweat drop on forehead */}
          <ellipse
            cx="-54"
            cy="-28"
            rx="6"
            ry="11"
            transform="rotate(-26 -54 -28)"
            fill="#38BDF8"
            stroke="#000000"
            strokeWidth="2.5"
          />
        </g>
      )}
    </g>
  );
};

/**
 * Scene 12: Neurological Shutdown
 * 
 * Duration: 5.27 seconds (158 frames @ 30fps)
 * Audio Sync: [00:00:39,878 --> 00:00:45,149]
 * "This isn't having a bad week, it's a complete and total neurological shutdown."
 * 
 * Updates Applied:
 * - Higher desk (y=650) with office chair and naturally seated stickman.
 * - Side-angle laptop with prominent glowing display and light cone.
 * - Smooth fade out of eyes/mouth during zoom (zero facial overlap over brain).
 * - Red alert circle removed.
 * - Solid pitch-black animated darkness growing from head to screen edges (no soft fades).
 * - Brain turns completely cold flat GREY at the end.
 * - Text badge at the end removed completely.
 */
export const Scene12_NeurologicalShutdown = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === TIMELINE PHASES ===
  const zoomStart = 72;
  const isZooming = frame >= zoomStart;

  // Typing micro-jitter during frantic work phase
  const typingJitter = !isZooming ? Math.sin(frame * 3.4) * 2.2 : 0;

  // Camera Zoom Spring
  const zoomSpring = isZooming
    ? spring({
        frame: frame - zoomStart,
        fps,
        config: { damping: 14, stiffness: 75, mass: 0.9 },
      })
    : 0;

  // Higher desk coordinate
  const deskY = 650;

  // Exact head center coordinates
  const headX = 432;
  const headY = 412;

  // Camera interpolates smoothly to center directly on stickman's head
  const camScale = interpolate(zoomSpring, [0, 1], [1.0, 3.4]);
  const camX = interpolate(zoomSpring, [0, 1], [960, headX]);
  const camY = interpolate(zoomSpring, [0, 1], [540, headY]);

  // Facial features fade out smoothly during zoom (zero overlap over the brain)
  const faceOpacity = interpolate(zoomSpring, [0.15, 0.75], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Library Anatomical Brain reveals as face fades out
  const brainOpacity = interpolate(zoomSpring, [0.35, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // GROWING SOLID DARKNESS (starts right around head at frame 90 and expands outward to screen edges)
  const darknessStart = 90;
  const isDarknessGrowing = frame >= darknessStart;
  const darknessRadius = isDarknessGrowing
    ? interpolate(frame, [darknessStart, darknessStart + 30], [84, 2400], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Brain turns completely cold dead GREY at the end of the scene (frames 112 to 146)
  const shutdownProgress = interpolate(frame, [112, 146], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s12" />

      {/* Defs for Masking the Growing Darkness */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          {/* Clip path expanding outward from the head */}
          <clipPath id="s12-darkness-clip">
            <circle cx={headX} cy={headY} r={darknessRadius} />
          </clipPath>
        </defs>
      </svg>

      {/* Main World Stage (Camera zooms cleanly into stickman's head) */}
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{
          transform: `translate(960px, 540px) scale(${camScale}) translate(${-camX}px, ${-camY}px)`,
          transformOrigin: "0 0",
        }}
      >
        {/* ================= BACKGROUND ENVIRONMENT ================= */}
        {/* Floor Horizon Guideline */}
        <line x1="0" y1="800" x2="1920" y2="800" stroke="#E2E8F0" strokeWidth="3" />

        {/* ================= CALENDAR ON RIGHT ================= */}
        {!isZooming && (
          <DaysOfWeekCalendar
            x={1180}
            y={290}
            scale={1.12}
            frame={frame}
            flipPeriod={6} // High-speed page flip
          />
        )}

        {/* ================= OFFICE CHAIR ================= */}
        <OfficeChair x={380} y={800} seatY={deskY + 6} />

        {/* ================= SEATED STICKMAN ================= */}
        <SeatedStickman
          headX={headX}
          headY={headY}
          deskY={deskY}
          typingJitter={typingJitter}
          faceOpacity={faceOpacity}
        />

        {/* ================= HIGHER DETAILED DESK ================= */}
        <DetailedDesk x={440} y={deskY} />

        {/* ================= SIDE-ANGLE LAPTOP WITH DISPLAY GLOW ================= */}
        <SideAngleLaptop x={545} y={deskY} isDimmed={isZooming} />

        {/* ================= ANATOMICAL BRAIN FROM LIBRARY ================= */}
        {/* Revealed inside head circle when zoomed in (turns completely GREY at the end) */}
        {brainOpacity > 0 && (
          <g
            id="stickman-head-brain"
            transform={`translate(${headX}, ${headY - 4})`}
            opacity={brainOpacity}
          >
            <Brain
              x={0}
              y={0}
              scale={0.92}
              shutdownProgress={shutdownProgress}
            />
          </g>
        )}

        {/* ================= GROWING SOLID DARKNESS ================= */}
        {/* Starts around his head and grows to the edges of the screen with NO soft fades */}
        {isDarknessGrowing && (
          <path
            d={`
              M -500 -500 L 2500 -500 L 2500 1600 L -500 1600 Z 
              M ${headX} ${headY - 82} 
              A 82 82 0 1 0 ${headX} ${headY + 82} 
              A 82 82 0 1 0 ${headX} ${headY - 82} Z
            `}
            fill="#000000"
            fillRule="evenodd"
            clipPath="url(#s12-darkness-clip)"
          />
        )}
      </svg>
    </AbsoluteFill>
  );
};
