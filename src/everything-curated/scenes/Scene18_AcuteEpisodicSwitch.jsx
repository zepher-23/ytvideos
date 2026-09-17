import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground, CuratedStickman } from "../../shared";

/**
 * User SVG Prop: Gameboy (from gameboy.svg, viewBox 0 0 512 512)
 */
const UserGameboySvg = ({ size = 72 }) => {
  const scale = size / 512;
  return (
    <g transform={`scale(${scale}) translate(-256, -256)`}>
      <path
        fill="#547475"
        d="M153.32,512h-35.848c-13.576,0-24.584-11.008-24.584-24.584V24.584 C92.888,11.007,103.896,0,117.472,0h277.057c13.576,0,24.584,11.007,24.584,24.584v462.832c0,13.576-11.008,24.584-24.584,24.584 H177.803"
      />
      <path
        opacity="0.15"
        fill="#231F20"
        d="M109.737,487.416V24.584C109.737,11.007,120.744,0,134.321,0 h-16.849c-13.576,0-24.584,11.007-24.584,24.584v462.832c0,13.576,11.008,24.584,24.584,24.584h16.849 C120.744,512,109.737,500.992,109.737,487.416z"
      />
      <path
        fill="#53CAF9"
        d="M381.312,275.021c0,7.376-5.98,13.357-13.357,13.357H144.045c-7.376,0-13.357-5.98-13.357-13.357 V51.311c0-7.376,5.98-13.357,13.357-13.357h223.911c7.376,0,13.357,5.98,13.357,13.357V275.021z"
      />
      <circle fill="#EFBA00" cx="360.481" cy="361.561" r="20.822" />
      <circle fill="#EFBA00" cx="320.957" cy="422.244" r="20.822" />
      <path
        fill="#F74848"
        d="M206.182,378.753h-18.92v-18.919c0-4.303-3.488-7.791-7.791-7.791H165.19 c-4.303,0-7.791,3.488-7.791,7.791v18.919h-18.92c-4.303,0-7.791,3.488-7.791,7.791v14.281c0,4.303,3.488,7.791,7.791,7.791h18.92 v18.919c0,4.303,3.488,7.791,7.791,7.791h14.281c4.303,0,7.791-3.488,7.791-7.791v-18.919h18.92c4.303,0,7.791-3.488,7.791-7.791 v-14.281C213.974,382.241,210.485,378.753,206.182,378.753z"
      />
      <path fill="#8AACAD" d="M210.463,488.909c-4.61,0-8.348-3.725-8.348-8.336v-0.025c0-4.61,3.738-8.348,8.348-8.348 c4.61,0,8.348,3.738,8.348,8.348C218.811,485.16,215.072,488.909,210.463,488.909z" />
      <path fill="#8AACAD" d="M301.537,488.909c-4.61,0-8.348-3.725-8.348-8.336v-0.025c0-4.61,3.738-8.348,8.348-8.348 s8.348,3.738,8.348,8.348C309.885,485.16,306.147,488.909,301.537,488.909z" />
      <path fill="#8AACAD" d="M271.179,488.909c-4.61,0-8.348-3.725-8.348-8.336v-0.025c0-4.61,3.738-8.348,8.348-8.348 s8.348,3.738,8.348,8.348C279.526,485.16,275.788,488.909,271.179,488.909z" />
      <path fill="#8AACAD" d="M240.819,488.909c-4.61,0-8.348-3.725-8.348-8.336v-0.025c0-4.61,3.738-8.348,8.348-8.348 s8.348,3.738,8.348,8.348C249.167,485.16,245.429,488.909,240.819,488.909z" />
      <path fill="#8AACAD" d="M302.376,325.195h-92.752c-4.61,0-8.348-3.738-8.348-8.348c0-4.611,3.738-8.348,8.348-8.348h92.752 c4.61,0,8.348,3.736,8.348,8.348C310.724,321.457,306.986,325.195,302.376,325.195z" />
      <path fill="#E5E541" d="M260.093,128.394c0,0.542-0.44,0.982-0.982,0.982H230.33c-0.543,0-0.983-0.44-0.983-0.982V99.613 c0-0.542,0.44-0.983,0.983-0.983h28.781c0.542,0,0.982,0.441,0.982,0.983V128.394z" />
      <path fill="#E5E541" d="M351.186,287.4c0,0.542-0.44,0.982-0.983,0.982h-28.781c-0.542,0-0.982-0.44-0.982-0.982v-28.781 c0-0.542,0.44-0.983,0.982-0.983h28.781c0.543,0,0.983,0.441,0.983,0.983V287.4z" />
      <path fill="#E5E541" d="M290.838,194.613c0,0.728-0.44,1.318-0.981,1.318h-28.782c-0.543,0-0.983-0.589-0.983-1.318v-38.615 c0-0.728,0.44-1.319,0.983-1.319h28.782c0.541,0,0.981,0.59,0.981,1.319L290.838,194.613L290.838,194.613z" />
      <path fill="#E5E541" d="M381.312,257.86c0,0.569-0.44,1.028-0.982,1.028h-28.781c-0.543,0-0.983-0.46-0.983-1.028v-30.152 c0-0.568,0.44-1.03,0.983-1.03h28.781c0.542,0,0.982,0.462,0.982,1.03V257.86z" />
      <path fill="#E5E541" d="M130.688,275.021c0,7.376,5.98,13.357,13.357,13.357h17.389v-30.954h-30.746 C130.688,257.424,130.688,275.021,130.688,275.021z" />
      <rect x="161.436" y="257.425" fill="#EBF25F" width="34.04" height="30.953" />
      <rect x="161.436" y="224.801" fill="#E5E541" width="30.746" height="32.623" />
      <path fill="#EBF25F" d="M290.838,159.14c0,0.542-0.44,0.982-0.981,0.982h-28.782c-0.543,0-0.983-0.44-0.983-0.982v-28.781 c0-0.542,0.44-0.983,0.983-0.983h28.782c0.541,0,0.981,0.441,0.981,0.983L290.838,159.14L290.838,159.14z" />
      <path fill="#EBF25F" d="M290.838,220.631c0,0.542-0.44,0.982-0.981,0.982h-28.782c-0.543,0-0.983-0.44-0.983-0.982V191.85 c0-0.542,0.44-0.983,0.983-0.983h28.782c0.541,0,0.981,0.44,0.981,0.983L290.838,220.631L290.838,220.631z" />
      <path fill="#EBF25F" d="M350.566,288.377h17.389c7.376,0,13.357-5.98,13.357-13.357v-17.596h-30.746V288.377z" />
      <path fill="#EBF25F" d="M192.179,225.695c0,0.542-0.44,0.982-0.982,0.982h-28.781c-0.543,0-0.983-0.44-0.983-0.982v-28.781 c0-0.542,0.439-0.983,0.983-0.983h28.781c0.542,0,0.982,0.44,0.982,0.983V225.695z" />
      <path fill="#E5E541" d="M222.925,287.189c0,0.541-0.44,0.981-0.982,0.981h-28.781c-0.543,0-0.983-0.44-0.983-0.981v-28.781 c0-0.542,0.44-0.983,0.983-0.983h28.781c0.542,0,0.982,0.44,0.982,0.983V287.189z" />
    </g>
  );
};

/**
 * User SVG Prop: Video Game Controller (from video game controller.svg, viewBox 0 0 512 512)
 */
const UserControllerSvg = ({ size = 76 }) => {
  const scale = size / 512;
  return (
    <g transform={`scale(${scale}) translate(-256, -256)`}>
      <path fill="#597B91" d="M257.168 163.238c-5.618 0-10.173-4.555-10.173-10.173c0-36.498 20.813-54.804 39.177-70.956c15.669-13.782 29.201-25.685 29.201-47.741c0-5.618 4.555-10.173 10.173-10.173s10.173 4.555 10.173 10.173c0 31.256-19.185 48.13-36.11 63.018c-17.314 15.229-32.268 28.382-32.268 55.679c0 5.619-4.555 10.173-10.173 10.173z" />
      <path fill="#2B3B47" d="M487.031 215.601c-1.038-2.478-2.052-4.918-3.062-7.316c-10.319-37.751-44.857-65.502-85.881-65.502H114.513c-39.032 0-72.195 25.122-84.211 60.076c-1.797 4.109-3.554 8.368-5.387 12.742C-3.73 283.83 1.682 343.923 1.682 426.005c0 52.011 63.792 64.463 90.32 23.754c7.449-11.431 34.763-49.337 61.616-90.604a57.004 57.004 0 0 0 26.98 6.75c47.125 0 47.557-37.37 77.9-37.37c.84 0 1.565-.069 2.211-.184c.646.115 1.37.184 2.211.184c30.344 0 30.776 37.37 77.9 37.37c7.1 0 13.894-1.301 20.168-3.663c26.411 40.058 52.749 76.372 60.012 87.517c26.528 40.708 90.32 26.888 90.32-23.754c.001-82.082 4.356-142.175-24.289-210.404z" />
      <path fill="#132028" d="M470.697 234.687c0 40.842-33.109 73.952-73.952 73.952s-73.952-33.109-73.952-73.952s33.109-73.952 73.952-73.952s73.952 33.109 73.952 73.952zM119.79 160.735c-40.842 0-73.952 33.109-73.952 73.952s33.109 73.952 73.952 73.952s73.952-33.109 73.952-73.952s-33.11-73.952-73.952-73.952z" />
      <circle fill="#00B1FF" cx="398.088" cy="272.234" r="19.664" />
      <circle fill="#FFB636" cx="398.088" cy="198.592" r="19.664" />
      <circle fill="#FF473E" cx="361.267" cy="235.413" r="19.664" />
      <circle fill="#00B89C" cx="434.909" cy="235.413" r="19.664" />
      <path fill="#597B91" d="M240.064 269.17h-24.595a7.694 7.694 0 0 1 0-15.388h24.595a7.694 7.694 0 0 1 0 15.388zm71.367-7.694a7.694 7.694 0 0 0-7.694-7.694h-24.595a7.694 7.694 0 0 0 0 15.388h24.595a7.695 7.695 0 0 0 7.694-7.694zm-130.64 12.956c-18.891 0-34.206 15.314-34.206 34.206c0 18.891 15.315 34.206 34.206 34.206s34.206-15.315 34.206-34.206c-.001-18.891-15.315-34.206-34.206-34.206zm152.755 0c-18.891 0-34.206 15.314-34.206 34.206c0 18.891 15.315 34.206 34.206 34.206c18.891 0 34.206-15.315 34.206-34.206c0-18.891-15.314-34.206-34.206-34.206zM92.079 216.955H65.427c-3.104 0-5.62 3.406-5.62 7.608v18.704c0 4.202 2.516 7.608 5.62 7.608h26.652c1.362 0 2.678-.67 3.703-1.884l7.89-9.352c2.557-3.031 2.557-8.417 0-11.447l-7.89-9.352c-1.026-1.215-2.341-1.885-3.703-1.885zm44.671-8.823V181.48c0-3.104-3.406-5.62-7.608-5.62h-18.704c-4.202 0-7.608 2.516-7.608 5.62v26.652c0 1.362.67 2.678 1.884 3.703l9.352 7.89c3.031 2.557 8.417 2.557 11.447 0l9.352-7.89c1.215-1.025 1.885-2.341 1.885-3.703zm10.751 44.286h26.652c3.104 0 5.62-3.406 5.62-7.608v-18.704c0-4.202-2.516-7.608-5.62-7.608h-26.652c-1.362 0-2.678.67-3.703 1.884l-7.891 9.352c-2.557 3.031-2.557 8.417 0 11.447l7.891 9.352c1.025 1.215 2.341 1.885 3.703 1.885zm-44.671 8.823v26.652c0 3.104 3.406 5.62 7.608 5.62h18.704c4.202 0 7.608-2.516 7.608-5.62v-26.652c0-1.362-.67-2.678-1.884-3.703l-9.352-7.89c-3.031-2.557-8.417-2.557-11.447 0l-9.352 7.89c-1.216 1.026-1.885 2.341-1.885 3.703z" />
    </g>
  );
};

/**
 * User SVG Prop: Football / Soccer Ball (from football.svg, viewBox 0 0 473.654 473.654)
 */
const UserFootballSvg = ({ size = 72 }) => {
  const scale = size / 473.654;
  return (
    <g transform={`scale(${scale}) translate(-236.827, -236.827)`}>
      <path
        fill="#E0E0E0"
        d="M357.058,130.896c-29.89-34.931-74.272-57.103-123.858-57.103 c-90.008,0-162.982,72.97-162.982,162.982c0,51.019,23.455,96.541,60.155,126.428c28.051,22.841,63.831,36.554,102.827,36.554 c90.015,0,162.982-72.967,162.982-162.982C396.182,196.343,381.433,159.381,357.058,130.896z"
      />
      <path
        fill="#FFFFFF"
        d="M308.328,313.156c51.176-51.176,67.918-122.613,48.73-182.256 c-29.89-34.935-74.272-57.107-123.858-57.107c-90.008,0-162.982,72.97-162.982,162.982c0,51.019,23.455,96.541,60.155,126.428 C189.125,380.255,258.382,363.105,308.328,313.156z"
      />
      <g fill="#3A3A39">
        <path d="M144.299,154.845c0,0,21.832-33.925,51.707-41.984c0,0,26.424-1.728,55.727,21.862 c0,0-10.916,54.62-14.36,59.22c0,0-63.775,14.951-67.223,16.678C170.154,210.62,150.043,182.443,144.299,154.845z" />
        <path d="M313.215,95.034v31.629c0,0,36.195,27.026,44.235,51.18l28.724,2.3 C386.171,180.143,369.519,125.519,313.215,95.034z" />
        <path d="M285.632,245.697l58.607-7.475c0,0,13.788,24.15,13.788,59.227c0,0-25.852,35.085-48.263,43.712 l-47.107-28.185L285.632,245.697z" />
        <path d="M147.171,275.023c0,0,25.852,36.221,45.387,51.748l-16.656,39.677c0,0-35.051-4.024-52.279-18.402 c0,0-20.115-24.15-20.115-59.224L147.171,275.023z" />
        <path d="M69.033,232.471h9.772c0,0,2.868-39.684,20.676-64.41v-25.878 C99.48,142.186,73.628,172.671,69.033,232.471z" />
        <path d="M223.698,399.547l0.456-3.77c0,0,52.283-6.903,70.098-17.254l7.195,6.301 C301.447,384.825,269.193,402.277,223.698,399.547z" />
        <path d="M178.77,82.387l16.088,0.572l14.663-7.584C209.517,75.375,193.134,77.211,178.77,82.387z" />
      </g>
    </g>
  );
};

/**
 * User SVG Prop: Music Notes (from music.svg, viewBox 0 0 1024 1024)
 */
const UserMusicSvg = ({ size = 70 }) => {
  const scale = size / 1024;
  return (
    <g transform={`scale(${scale}) translate(-512, -512)`}>
      <path
        d="M395.502 780.767c-8.246 0-14.934-6.687-14.934-14.934V250.972L837.601 64v585.334c0 8.248-6.687 14.934-14.933 14.934-8.247 0-14.933-6.686-14.933-14.934V108.492l-397.3 162.531v494.81c0 8.246-6.686 14.934-14.933 14.934z"
        fill="#152B3C"
      />
      <path
        d="M414.917 843.501c0 58.249-52.15 116.499-116.5 116.499-64.319 0-116.501-52.162-116.501-116.499 0-64.338 52.181-116.5 116.501-116.5h116.5v116.5zM842.084 688.167c0 58.25-52.15 116.5-116.5 116.5-64.319 0-116.501-52.164-116.501-116.5s52.181-116.501 116.501-116.501h116.5v116.501z"
        fill="#FF3B30"
      />
      <path
        d="M395.509 411.854c-5.884 0-11.463-3.501-13.833-9.29-3.121-7.626 0.54-16.347 8.174-19.476l427.166-174.743c7.626-3.085 16.347 0.547 19.476 8.173 3.121 7.628-0.54 16.349-8.174 19.476L401.153 410.738a14.964 14.964 0 0 1-5.644 1.116z"
        fill="#152B3C"
      />
    </g>
  );
};

/**
 * Scene 18: Acute and Episodic (The Heavy Mechanical Switch)
 * 
 * Duration: 4.27 seconds (128 frames @ 30fps)
 * Audio Sync: [00:00:58,285 --> 00:01:02,543]
 * "The key differentiator here is that it is episodic and acute."
 * 
 * Visual Choreography:
 * 1. Frames 0-24: Stickman stands center screen happy. 4 passion icons (Music, Gameboy,
 *    Football, Video Game Controller) hover cheerfully in a wide halo around his head.
 * 2. Frame 25: A massive heavy mechanical breaker switch beside him aggressively slams into "ON".
 * 3. Frames 25-84 (2 seconds): Acute depressive phase: stickman slumps into sadness with slight
 *    darkness around his head. All 4 icons turn completely grey and drop position slightly.
 * 4. Frame 85: Switch snaps back "OFF", stickman instantly returns to normal (Episodic),
 *    and all icons regain their vibrant original colors and float back up!
 */
export const Scene18_AcuteEpisodicSwitch = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const floorY = 850;
  const stickmanX = 960;
  const stickmanScale = 1.25;

  // === TIMELINE BEATS ===
  const switchOnFrame = 25;
  const switchOffFrame = 85; // Exactly 60 frames (2.0s) after slam
  const isAcute = frame >= switchOnFrame && frame < switchOffFrame;

  // Impact impulse right at the moment of slamming ON
  const onSnapProgress = spring({
    frame: frame - switchOnFrame,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.6 },
  });

  // Release impulse when snapping back OFF
  const offSnapProgress = spring({
    frame: frame - switchOffFrame,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.7 },
  });

  // Lever angle: -42deg (OFF, up) -> +42deg (ON, down)
  let leverAngle = -42;
  if (frame >= switchOnFrame && frame < switchOffFrame) {
    leverAngle = interpolate(onSnapProgress, [0, 1], [-42, 42]);
  } else if (frame >= switchOffFrame) {
    leverAngle = interpolate(offSnapProgress, [0, 1], [42, -42]);
  }

  // Slam screen shockwave vibration
  const slamShake = (frame >= switchOnFrame && frame <= switchOnFrame + 7)
    ? Math.sin((frame - switchOnFrame) * 3) * (7 - (frame - switchOnFrame))
    : (frame >= switchOffFrame && frame <= switchOffFrame + 5)
    ? Math.sin((frame - switchOffFrame) * 3) * (5 - (frame - switchOffFrame))
    : 0;

  // Droop & thread drop when icons go grey
  const dropSpring = spring({
    frame: frame - switchOnFrame,
    fps,
    config: { damping: 13, stiffness: 180, mass: 0.7 },
  });

  const returnSpring = spring({
    frame: frame - switchOffFrame,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.7 },
  });

  let dropY = 0;
  let ambientDarkness = 0;
  if (frame >= switchOnFrame && frame < switchOffFrame) {
    dropY = interpolate(dropSpring, [0, 1], [0, 85]);
    ambientDarkness = interpolate(dropSpring, [0, 1], [0, 0.55]);
  } else if (frame >= switchOffFrame) {
    dropY = interpolate(returnSpring, [0, 1], [85, 0]);
    ambientDarkness = interpolate(returnSpring, [0, 1], [0.55, 0]);
  }

  // Floating gentle hover for icons ONLY when not acute (movement removed when grey)
  const floatBob = isAcute ? 0 : Math.sin(frame * 0.12) * 6;
  const stickmanSlump = isAcute ? 0.75 : 0;

  // === SWITCH POSITION (To the left of stickman) ===
  const switchX = 460;
  const switchY = 620;

  // === ICON ANCHOR ORIGIN POSITIONS ===
  const iconsData = [
    {
      id: "music",
      x: stickmanX - 260,
      y: 310,
      size: 110,
      topOffset: 52,
      bob: floatBob,
      component: <UserMusicSvg size={110} />,
    },
    {
      id: "gameboy",
      x: stickmanX - 130,
      y: 150,
      size: 112,
      topOffset: 55,
      bob: floatBob * 0.9,
      component: <UserGameboySvg size={112} />,
    },
    {
      id: "football",
      x: stickmanX + 130,
      y: 150,
      size: 110,
      topOffset: 54,
      bob: -floatBob * 0.9,
      component: <UserFootballSvg size={110} />,
    },
    {
      id: "controller",
      x: stickmanX + 260,
      y: 310,
      size: 118,
      topOffset: 58,
      bob: -floatBob,
      component: <UserControllerSvg size={118} />,
    },
  ];

  return (
    <AbsoluteFill className="bg-white overflow-hidden select-none font-sans">
      <GridBackground theme="white" id="grid-s18" />

      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ transform: `translateY(${slamShake}px)` }}
      >
        <defs>
          {/* Top-down crushing weight gradient for surrounding darkness */}
          <linearGradient id="crushing-weight-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020617" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#0F172A" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </linearGradient>

          {/* Room perimeter vignette */}
          <radialGradient id="room-perimeter-vignette" cx="50%" cy="45%" r="65%">
            <stop offset="30%" stopColor="#020617" stopOpacity="0" />
            <stop offset="80%" stopColor="#020617" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
          </radialGradient>

          {/* Slight darkness cloud around stickman head in acute phase */}
          <radialGradient id="acute-dark-vignette" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#1E293B" stopOpacity="0.25" />
            <stop offset="75%" stopColor="#334155" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>

          {/* Grayscale filter to turn icons dull grey in acute phase */}
          <filter id="desaturate-acute">
            <feColorMatrix
              type="matrix"
              values="0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0.299 0.587 0.114 0 0
                      0     0     0     0.75 0"
            />
          </filter>

          {/* Switch Box Metallic Gradient */}
          <linearGradient id="switch-box-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Lever Arm Steel Gradient */}
          <linearGradient id="lever-steel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>

        {/* ================= SURROUNDING AMBIENT DARKNESS (WHEN SWITCH IS ON) ================= */}
        {ambientDarkness > 0.01 && (
          <g id="ambient-darkness-surroundings">
            {/* General ambient room tint */}
            <rect
              x="0"
              y="0"
              width="1920"
              height="1080"
              fill="#090D16"
              opacity={ambientDarkness * 0.75}
            />

            {/* Top-down crushing weight shadow */}
            <rect
              x="0"
              y="0"
              width="1920"
              height="850"
              fill="url(#crushing-weight-gradient)"
              opacity={ambientDarkness}
            />

            {/* Perimeter room darkening vignette */}
            <rect
              x="0"
              y="0"
              width="1920"
              height="1080"
              fill="url(#room-perimeter-vignette)"
              opacity={ambientDarkness}
            />
          </g>
        )}

        {/* ================= FLOOR LINE ================= */}
        <line x1="0" y1={floorY} x2="1920" y2={floorY} stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

        {/* ================= HEAVY INDUSTRIAL SWITCH ================= */}
        <g id="massive-switch" transform={`translate(${switchX}, ${switchY})`}>
          {/* Wall Mounting Shadow */}
          <rect x="-110" y="-170" width="220" height="340" rx="20" fill="#000000" opacity="0.12" />

          {/* Heavy Box Base */}
          <rect
            x="-100"
            y="-160"
            width="200"
            height="320"
            rx="16"
            fill="url(#switch-box-grad)"
            stroke="#0F172A"
            strokeWidth="7"
          />

          {/* Industrial Rivets on corners */}
          <circle cx="-80" cy="-140" r="5" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />
          <circle cx="80" cy="-140" r="5" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />
          <circle cx="-80" cy="140" r="5" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />
          <circle cx="80" cy="140" r="5" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />

          {/* Inner Inset Plate */}
          <rect
            x="-72"
            y="-120"
            width="144"
            height="240"
            rx="10"
            fill="#0F172A"
            stroke="#475569"
            strokeWidth="3"
          />

          {/* Status Indicators */}
          {/* "OFF" Status (Top) */}
          <g transform="translate(0, -78)">
            <rect
              x="-48"
              y="-22"
              width="96"
              height="44"
              rx="6"
              fill={!isAcute ? "#10B981" : "#1E293B"}
              stroke="#0F172A"
              strokeWidth="3"
            />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fill={!isAcute ? "#FFFFFF" : "#64748B"}
              fontSize="20"
              fontWeight="900"
              letterSpacing="2"
            >
              OFF
            </text>
          </g>

          {/* "ON" Status (Bottom) */}
          <g transform="translate(0, 78)">
            <rect
              x="-48"
              y="-22"
              width="96"
              height="44"
              rx="6"
              fill={isAcute ? "#EF4444" : "#1E293B"}
              stroke="#0F172A"
              strokeWidth="3"
            />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fill={isAcute ? "#FFFFFF" : "#64748B"}
              fontSize="20"
              fontWeight="900"
              letterSpacing="2"
            >
              ON
            </text>
          </g>

          {/* Central Lever Pivot Hub */}
          <circle cx="0" cy="0" r="32" fill="#334155" stroke="#0F172A" strokeWidth="6" />
          <circle cx="0" cy="0" r="16" fill="#64748B" stroke="#0F172A" strokeWidth="3" />

          {/* Heavy Lever Arm */}
          <g transform={`rotate(${leverAngle})`}>
            {/* Steel Shaft */}
            <rect
              x="-12"
              y="-130"
              width="24"
              height="130"
              rx="6"
              fill="url(#lever-steel)"
              stroke="#0F172A"
              strokeWidth="5"
            />
            {/* Massive Cylindrical Grip Handle */}
            <rect
              x="-24"
              y="-155"
              width="48"
              height="40"
              rx="10"
              fill={isAcute ? "#EF4444" : "#DC2626"}
              stroke="#0F172A"
              strokeWidth="6"
            />
            <circle cx="0" cy="-135" r="7" fill="#FFFFFF" opacity="0.6" />
          </g>

          {/* Impact Spark Lines during ON switch */}
          {frame >= switchOnFrame && frame <= switchOnFrame + 8 && (
            <g stroke="#EF4444" strokeWidth="5" strokeLinecap="round">
              <line x1="40" y1="90" x2="85" y2="120" />
              <line x1="50" y1="70" x2="95" y2="65" />
              <line x1="35" y1="110" x2="70" y2="145" />
            </g>
          )}

          {/* Switch Sub-Label */}
          <text
            x="0"
            y="190"
            textAnchor="middle"
            fill="#475569"
            fontSize="16"
            fontWeight="800"
            letterSpacing="3"
          >
            {isAcute ? "STATUS: ACUTE" : "STATUS: EPISODIC"}
          </text>
        </g>

        {/* ================= SLIGHT DARKNESS AROUND HEAD (IN ACUTE PHASE) ================= */}
        {isAcute && (
          <g transform={`translate(${stickmanX + 24}, 370)`}>
            <circle cx="0" cy="0" r="140" fill="url(#acute-dark-vignette)" />
          </g>
        )}

        {/* ================= CENTER STICKMAN ================= */}
        <CuratedStickman
          x={stickmanX}
          y={floorY}
          scale={stickmanScale}
          pose={isAcute ? "defeat" : "idle"}
          slumpProgress={stickmanSlump}
          eyes={isAcute ? "defeat-closed" : "look-front"}
          mouth={isAcute ? "frown" : "smile"}
          showSweat={isAcute}
          frame={frame}
        />

        {/* ================= PASSION ICONS & HANGING THREADS ================= */}
        {iconsData.map((item) => {
          const currentY = item.y + item.bob + dropY;

          return (
            <g key={item.id}>
              {/* Thread line showing icon hanging limp from original position (only when acute and dropped) */}
              {isAcute && dropY > 4 && (
                <g stroke="#64748B" strokeWidth="2.5" strokeLinecap="round">
                  {/* Anchor pin at original hover position */}
                  <circle cx={item.x} cy={item.y} r="3.5" fill="#475569" />
                  {/* Suspended thread down to top of icon */}
                  <line
                    x1={item.x}
                    y1={item.y}
                    x2={item.x}
                    y2={currentY - item.topOffset}
                  />
                  {/* Knot loop on top of icon */}
                  <circle cx={item.x} cy={currentY - item.topOffset} r="3" fill="#0F172A" />
                </g>
              )}

              {/* Icon SVG */}
              <g
                id={`icon-${item.id}`}
                transform={`translate(${item.x}, ${currentY})`}
                filter={isAcute ? "url(#desaturate-acute)" : "none"}
              >
                {item.component}
              </g>
            </g>
          );
        })}

      </svg>
    </AbsoluteFill>
  );
};
