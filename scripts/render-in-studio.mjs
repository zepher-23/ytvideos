import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Composition registry with structured output directories for videos & stills
const COMPOSITIONS = {
  // --- GSD Channel ---
  'Top-10-Richest-Individuals-Shorts-Vertical': {
    aliases: ['shorts', 'gsd-shorts', 'vertical', 'gsd-vertical', 'richest-shorts'],
    channel: 'GSD-Channel',
    type: 'shorts',
    durationInFrames: 3600,
    outName: 'out/GSD-Channel/shorts/Top-10-Richest-Shorts.mp4',
    stillOutName: 'out/GSD-Channel/stills/Top-10-Richest-Still-Vertical.png',
    fps: 30,
  },
  'Top-10-Richest-Individuals-Adjusted-To-Inflation': {
    aliases: ['gsd', 'normal', 'gsd-normal', 'landscape', 'horizontal', 'gsd-landscape'],
    channel: 'GSD-Channel',
    type: 'normal',
    durationInFrames: 15120,
    outName: 'out/GSD-Channel/normal/Top-10-Richest-Individuals-Adjusted-To-Inflation.mp4',
    stillOutName: 'out/GSD-Channel/stills/Top-10-Richest-Still-Landscape.png',
    fps: 30,
  },
  'Top-10-Richest-Still-Landscape': {
    aliases: ['gsd-still', 'richest-still', 'still-landscape'],
    channel: 'GSD-Channel',
    type: 'stills',
    isStillOnly: true,
    durationInFrames: 1,
    outName: 'out/GSD-Channel/stills/Top-10-Richest-Still-Landscape.png',
    stillOutName: 'out/GSD-Channel/stills/Top-10-Richest-Still-Landscape.png',
    fps: 30,
  },
  'Top-10-Richest-Still-Vertical': {
    aliases: ['shorts-still', 'gsd-shorts-still', 'still-vertical', 'still-shorts'],
    channel: 'GSD-Channel',
    type: 'stills',
    isStillOnly: true,
    durationInFrames: 1,
    outName: 'out/GSD-Channel/stills/Top-10-Richest-Still-Vertical.png',
    stillOutName: 'out/GSD-Channel/stills/Top-10-Richest-Still-Vertical.png',
    fps: 30,
  },

  // --- Everything Curated ---
  'everything-curated': {
    aliases: ['everything', 'curated'],
    channel: 'Everything-Curated',
    type: 'normal',
    durationInFrames: 150,
    outName: 'out/Everything-Curated/normal/everything-curated.mp4',
    stillOutName: 'out/Everything-Curated/stills/everything-curated-still.png',
    fps: 30,
  },
  'everything-curated-still': {
    aliases: ['everything-still', 'curated-still'],
    channel: 'Everything-Curated',
    type: 'stills',
    isStillOnly: true,
    durationInFrames: 1,
    outName: 'out/Everything-Curated/stills/everything-curated-still.png',
    stillOutName: 'out/Everything-Curated/stills/everything-curated-still.png',
    fps: 30,
  },

  // --- Cognify ---
  'cognify': {
    aliases: ['cog'],
    channel: 'Cognify',
    type: 'normal',
    durationInFrames: 150,
    outName: 'out/Cognify/normal/cognify.mp4',
    stillOutName: 'out/Cognify/stills/cognify-still.png',
    fps: 30,
  },
  'cognify-still': {
    aliases: ['cog-still'],
    channel: 'Cognify',
    type: 'stills',
    isStillOnly: true,
    durationInFrames: 1,
    outName: 'out/Cognify/stills/cognify-still.png',
    stillOutName: 'out/Cognify/stills/cognify-still.png',
    fps: 30,
  },

  // --- Synthesized ---
  'synthesized': {
    aliases: ['synth'],
    channel: 'Synthesized',
    type: 'normal',
    durationInFrames: 150,
    outName: 'out/Synthesized/normal/synthesized.mp4',
    stillOutName: 'out/Synthesized/stills/synthesized-still.png',
    fps: 30,
  },
  'synthesized-still': {
    aliases: ['synth-still'],
    channel: 'Synthesized',
    type: 'stills',
    isStillOnly: true,
    durationInFrames: 1,
    outName: 'out/Synthesized/stills/synthesized-still.png',
    stillOutName: 'out/Synthesized/stills/synthesized-still.png',
    fps: 30,
  },

  // --- The Archive ---
  'the-archive': {
    aliases: ['archive'],
    channel: 'The-Archive',
    type: 'normal',
    durationInFrames: 150,
    outName: 'out/The-Archive/normal/the-archive.mp4',
    stillOutName: 'out/The-Archive/stills/the-archive-still.png',
    fps: 30,
  },
  'the-archive-still': {
    aliases: ['archive-still'],
    channel: 'The-Archive',
    type: 'stills',
    isStillOnly: true,
    durationInFrames: 1,
    outName: 'out/The-Archive/stills/the-archive-still.png',
    stillOutName: 'out/The-Archive/stills/the-archive-still.png',
    fps: 30,
  },
};

function resolveComposition(input) {
  if (!input) {
    return 'Top-10-Richest-Individuals-Shorts-Vertical';
  }
  const clean = input.trim().toLowerCase();
  for (const [id, config] of Object.entries(COMPOSITIONS)) {
    if (id.toLowerCase() === clean) return id;
    if (config.aliases.some((a) => a.toLowerCase() === clean)) return id;
  }
  return input;
}

// Parse CLI arguments
const args = process.argv.slice(2);
let targetInput = null;
let customOut = null;
let startFrameArg = null;
let endFrameArg = null;
let frameArg = null;
let concurrencyArg = 4;
let port = 3000;
let forceStill = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--comp' || arg === '-c') {
    targetInput = args[++i];
  } else if (arg === '--out' || arg === '-o') {
    customOut = args[++i];
  } else if (arg === '--start' || arg === '-s') {
    startFrameArg = parseInt(args[++i], 10);
  } else if (arg === '--end' || arg === '-e') {
    endFrameArg = parseInt(args[++i], 10);
  } else if (arg === '--frame' || arg === '-f') {
    frameArg = parseInt(args[++i], 10);
  } else if (arg === '--still') {
    forceStill = true;
  } else if (arg === '--type' || arg === '-t') {
    const t = args[++i];
    if (t === 'still' || t === 'stills') forceStill = true;
  } else if (arg === '--concurrency') {
    concurrencyArg = parseInt(args[++i], 10);
  } else if (arg === '--port' || arg === '-p') {
    port = parseInt(args[++i], 10);
  } else if (!arg.startsWith('-') && !targetInput) {
    targetInput = arg;
  }
}

const compId = resolveComposition(targetInput);
const compMeta = COMPOSITIONS[compId];

const isStill = forceStill || (compMeta ? Boolean(compMeta.isStillOnly) : false);
const channel = compMeta ? compMeta.channel : 'Custom';
const type = isStill ? 'stills' : (compMeta ? compMeta.type : 'normal');

function getNextAvailableStillName(baseOutPath) {
  let ext = path.extname(baseOutPath) || '.png';
  let dir = path.dirname(baseOutPath);
  let base = path.basename(baseOutPath, ext);
  const match = base.match(/^(.*?)([-_])(\d+)$/);
  const prefix = match ? match[1] : base;
  const sep = match ? match[2] : '-';
  let num = match ? parseInt(match[3], 10) : 1;
  const absDir = path.resolve(projectRoot, dir);
  if (!fs.existsSync(absDir)) {
    fs.mkdirSync(absDir, { recursive: true });
  }
  let candidate = `${prefix}${sep}${num}${ext}`;
  while (fs.existsSync(path.resolve(absDir, candidate))) {
    num++;
    candidate = `${prefix}${sep}${num}${ext}`;
  }
  return path.join(dir, candidate).replace(/\\/g, '/');
}

let outName;
if (customOut) {
  outName = customOut;
} else if (isStill) {
  const rawStillOut = compMeta?.stillOutName || `out/${channel}/stills/${compId}.png`;
  outName = getNextAvailableStillName(rawStillOut);
} else {
  outName = compMeta?.outName || `out/${channel}/${type}/${compId}.mp4`;
}

const totalFrames = compMeta ? compMeta.durationInFrames : 3600;
const startFrame = startFrameArg !== null ? startFrameArg : 0;
const endFrame = endFrameArg !== null ? endFrameArg : totalFrames - 1;
const stillFrame = frameArg !== null ? frameArg : (startFrameArg !== null ? startFrameArg : 0);

async function run() {
  const studioUrl = `http://localhost:${port}`;

  console.log(`\n🎬 Remotion Studio Render Trigger`);
  console.log(`──────────────────────────────────────────`);
  console.log(`• Composition ID: ${compId}`);
  console.log(`• Channel:        ${channel}`);
  console.log(`• Type:           ${isStill ? 'STILL (Image)' : `VIDEO (${type})`}`);
  console.log(`• Output File:    ${outName}`);
  if (isStill) {
    console.log(`• Frame:          ${stillFrame}`);
  } else {
    console.log(`• Frame Range:    ${startFrame} → ${endFrame} (${endFrame - startFrame + 1} frames)`);
    console.log(`• Concurrency:    ${concurrencyArg}x`);
  }
  console.log(`• Studio URL:     ${studioUrl}`);
  console.log(`──────────────────────────────────────────`);

  // Ensure output directory exists
  const absOutDir = path.dirname(path.resolve(projectRoot, outName));
  if (!fs.existsSync(absOutDir)) {
    fs.mkdirSync(absOutDir, { recursive: true });
  }

  // Check if Studio is running
  try {
    const configRes = await fetch(`${studioUrl}/__remotion_config`);
    if (!configRes.ok) {
      throw new Error(`Status ${configRes.status}`);
    }
  } catch (err) {
    console.error(`\n❌ Error: Remotion Studio is not running at ${studioUrl}.`);
    console.error(`Please run "npm run dev" first, then retry.\n`);
    process.exit(1);
  }

  let payload;
  if (isStill) {
    payload = {
      type: 'still',
      compositionId: compId,
      outName: outName.replace(/\\/g, '/'),
      imageFormat: outName.endsWith('.jpg') || outName.endsWith('.jpeg') ? 'jpeg' : 'png',
      jpegQuality: 80,
      frame: stillFrame,
      scale: 1,
      logLevel: 'info',
      delayRenderTimeout: 30000,
      offthreadVideoCacheSizeInBytes: null,
      multiProcessOnLinux: true,
      beepOnFinish: false,
      chromeMode: 'headless-shell',
      mediaCacheSizeInBytes: null,
      licenseKey: null,
      metadata: null,
      offthreadVideoThreads: null,
      chromiumOptions: {
        headless: true,
        disableWebSecurity: false,
        ignoreCertificateErrors: false,
        gl: null,
        userAgent: null,
        enableMultiProcessOnLinux: true,
        darkMode: false,
      },
      envVariables: {},
      serializedInputPropsWithCustomSchema: '{}',
    };
  } else {
    payload = {
      type: 'video',
      compositionId: compId,
      outName: outName.replace(/\\/g, '/'),
      codec: 'h264',
      audioCodec: null,
      imageFormat: 'jpeg',
      jpegQuality: 80,
      scale: 1,
      startFrame,
      endFrame,
      concurrency: concurrencyArg,
      logLevel: 'info',
      crf: null,
      gopSize: null,
      muted: false,
      enforceAudioTrack: false,
      proResProfile: null,
      x264Preset: 'medium',
      pixelFormat: 'yuv420p',
      audioBitrate: null,
      videoBitrate: null,
      encodingBufferSize: null,
      encodingMaxRate: null,
      everyNthFrame: 1,
      numberOfGifLoops: null,
      delayRenderTimeout: 30000,
      disallowParallelEncoding: false,
      offthreadVideoCacheSizeInBytes: null,
      offthreadVideoThreads: null,
      colorSpace: 'default',
      multiProcessOnLinux: true,
      beepOnFinish: false,
      repro: false,
      forSeamlessAacConcatenation: false,
      separateAudioTo: null,
      metadata: null,
      hardwareAcceleration: 'disable',
      chromeMode: 'headless-shell',
      mediaCacheSizeInBytes: null,
      sampleRate: 48000,
      licenseKey: null,
      chromiumOptions: {
        headless: true,
        disableWebSecurity: false,
        ignoreCertificateErrors: false,
        gl: null,
        userAgent: null,
        enableMultiProcessOnLinux: true,
        darkMode: false,
      },
      envVariables: {},
      serializedInputPropsWithCustomSchema: '{}',
    };
  }

  try {
    const renderRes = await fetch(`${studioUrl}/api/render`, {
      method: 'POST',
      headers: {
        Host: `localhost:${port}`,
        Origin: `http://localhost:${port}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await renderRes.json();
    if (!data.success) {
      throw new Error(data.error || 'Studio rejected render job');
    }

    console.log(`\n✅ Render successfully queued in Remotion Studio!`);
    console.log(`👉 You can now track the live render progress directly inside the Remotion Studio UI:`);
    console.log(`   ${studioUrl}\n`);
  } catch (err) {
    console.error(`\n❌ Render trigger failed: ${err.message}\n`);
    process.exit(1);
  }
}

run();
