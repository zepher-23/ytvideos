import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseSrtTiming } from "./srt-timing.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const SCENES_DIR = path.join(ROOT_DIR, "src", "everything-curated", "scenes");
const SCENES_CONFIG_FILE = path.join(ROOT_DIR, "src", "everything-curated", "scenes.config.js");
const SCENES_INDEX_FILE = path.join(SCENES_DIR, "index.js");

export function syncScenes() {
  if (!fs.existsSync(SCENES_DIR)) {
    console.error(`[sync-scenes] Scenes directory not found: ${SCENES_DIR}`);
    return;
  }

  // 1. Read existing scenes.config.js to preserve custom names, durations, and active SRT file
  const existingConfigMap = new Map();
  let totalAudioDuration = 7066;
  let activeSrtFile = null;

  if (fs.existsSync(SCENES_CONFIG_FILE)) {
    try {
      const configRaw = fs.readFileSync(SCENES_CONFIG_FILE, "utf-8");
      
      // Check for video-specific active SRT file
      const srtMatch = configRaw.match(/ACTIVE_SRT_FILE\s*=\s*["']([^"']+)["']/);
      if (srtMatch) {
        activeSrtFile = srtMatch[1];
      }

      // Check total audio duration
      const totalMatch = configRaw.match(/TOTAL_DURATION_IN_FRAMES\s*=\s*(\d+)/);
      if (totalMatch) {
        totalAudioDuration = parseInt(totalMatch[1], 10);
      }

      // Match each object in SCENES array
      const sceneBlockRegex = /\{\s*id:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'],\s*from:\s*\d+,\s*durationInFrames:\s*(\d+)[^}]*\}/g;
      let match;
      while ((match = sceneBlockRegex.exec(configRaw)) !== null) {
        const [, id, name, durationStr] = match;
        existingConfigMap.set(id, {
          name,
          durationInFrames: parseInt(durationStr, 10),
        });
      }
    } catch (e) {
      console.warn("[sync-scenes] Could not parse existing scenes.config.js, will regenerate.", e.message);
    }
  }

  // Load SRT timing ONLY if this specific video config declared an active SRT file
  const srtList = activeSrtFile ? parseSrtTiming(activeSrtFile, 30) : [];
  const srtMap = new Map(srtList.map((item) => [item.sceneNumber, item]));

  // 2. Discover all scene files
  const files = fs.readdirSync(SCENES_DIR);
  const sceneFiles = files.filter((f) => {
    if (f === "index.js" || f === "index.jsx" || f.startsWith(".") || f.startsWith("_")) {
      return false;
    }
    return /\.(jsx?|tsx?)$/.test(f);
  });

  // Sort files numerically by Scene number (e.g. Scene01, Scene02, Scene10)
  sceneFiles.sort((a, b) => {
    const numA = (a.match(/scene\s*0*(\d+)/i) || [])[1];
    const numB = (b.match(/scene\s*0*(\d+)/i) || [])[1];
    if (numA !== undefined && numB !== undefined) {
      const diff = parseInt(numA, 10) - parseInt(numB, 10);
      if (diff !== 0) return diff;
    }
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
  });

  const scenes = [];
  let currentFrom = 0;

  for (const file of sceneFiles) {
    const filePath = path.join(SCENES_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const baseName = path.basename(file, path.extname(file));

    // Find exported component name
    let componentName = baseName;
    const exportMatch = content.match(/export\s+(?:const|function)\s+([A-Za-z0-9_]+)/);
    if (exportMatch) {
      componentName = exportMatch[1];
    }

    // Determine ID (e.g., "Scene10-MajorDepressiveDisorder")
    const id = componentName.replace(/_/g, "-");

    // Check existing config for custom name / duration
    const existing = existingConfigMap.get(id) || existingConfigMap.get(componentName);

    // Extract or build human-readable name
    let name = existing?.name;
    if (!name) {
      // Look for comment like "Scene 10: Major Depressive Disorder"
      const commentMatch = content.match(/\*\s*(Scene\s*\d+[^:\n]*:\s*[^\n*]+)/i) ||
                           content.match(/\/\/\s*(Scene\s*\d+[^:\n]*:\s*[^\n]+)/i);
      if (commentMatch) {
        name = commentMatch[1].trim();
      } else {
        const sceneNumMatch = componentName.match(/^Scene(\d+)[_-]?(.*)$/i);
        if (sceneNumMatch) {
          const num = sceneNumMatch[1];
          const rest = sceneNumMatch[2]
            ? sceneNumMatch[2].replace(/([A-Z])/g, " $1").trim()
            : "";
          name = rest ? `Scene ${num}: ${rest}` : `Scene ${num}`;
        } else {
          name = componentName;
        }
      }
    }

    // Determine duration
    let durationInFrames = existing?.durationInFrames;
    if (!durationInFrames) {
      const durMatch = content.match(/durationInFrames\s*[:=]\s*(\d+)/i) ||
                       content.match(/Duration:\s*(\d+(?:\.\d+)?)\s*seconds?/i);
      if (durMatch) {
        durationInFrames = durMatch[0].includes("second")
          ? Math.round(parseFloat(durMatch[1]) * 30)
          : parseInt(durMatch[1], 10);
      } else {
        // Only consult SRT if this video has an active SRT file declared
        const sceneNum = parseInt((file.match(/scene\s*0*(\d+)/i) || [])[1], 10);
        const srtData = srtMap.get(sceneNum);
        if (srtData) {
          durationInFrames = srtData.durationInFrames;
        } else {
          durationInFrames = 120; // default 4 seconds @ 30fps
        }
      }
    }

    scenes.push({
      fileName: file,
      baseName,
      componentName,
      id,
      name,
      from: currentFrom,
      durationInFrames,
    });

    currentFrom += durationInFrames;
  }

  // 3. Generate src/everything-curated/scenes/index.js
  const indexImports = scenes
    .map((s) => `import { ${s.componentName} } from "./${s.baseName}";`)
    .join("\n");

  const indexExports = scenes
    .map((s) => `  ${s.componentName},`)
    .join("\n");

  const indexDict = scenes
    .map((s) => {
      const lines = [`  "${s.id}": ${s.componentName},`];
      if (s.id !== s.componentName) {
        lines.push(`  ${s.componentName}: ${s.componentName},`);
      }
      return lines.join("\n");
    })
    .join("\n");

  const indexContent = `// Master Scene Barrel Export (Auto-generated by scripts/sync-scenes.mjs)
${indexImports}

export {
${indexExports}
};

export const SCENE_COMPONENTS = {
${indexDict}
};
`;

  fs.writeFileSync(SCENES_INDEX_FILE, indexContent, "utf-8");

  // 4. Generate src/everything-curated/scenes.config.js
  const configScenes = scenes
    .map((s) => {
      const sec = (s.durationInFrames / 30).toFixed(1).replace(/\.0$/, "");
      return `  {
    id: "${s.id}",
    name: "${s.name}",
    from: ${s.from},
    durationInFrames: ${s.durationInFrames}, // ${sec} seconds @ 30fps
  },`;
    })
    .join("\n");

  const srtDeclaration = activeSrtFile ? `export const ACTIVE_SRT_FILE = "${activeSrtFile}";\n` : "";

  const scenesConfigContent = `// Video Composition Configuration (Auto-generated by scripts/sync-scenes.mjs)

${srtDeclaration}export const SCENES = [
${configScenes}
];

export const TOTAL_DURATION_IN_FRAMES = ${totalAudioDuration}; // Total audio duration (${(totalAudioDuration / 30).toFixed(2)}s @ 30fps)
`;

  fs.writeFileSync(SCENES_CONFIG_FILE, scenesConfigContent, "utf-8");

  console.log(`[sync-scenes] Successfully synchronized ${scenes.length} scenes in index.js and scenes.config.js.`);
  return scenes;
}

// If run directly from CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  syncScenes();
}
