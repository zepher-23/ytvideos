import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { syncScenes } from "./sync-scenes.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const SCENES_DIR = path.join(ROOT_DIR, "src", "everything-curated", "scenes");

console.log("=================================================");
console.log("👀 Remotion Scene Auto-Watcher Started");
console.log(`📁 Watching: ${path.relative(ROOT_DIR, SCENES_DIR)}`);
console.log("⚡ Drop or edit any SceneXX_Name.jsx file to auto-sync!");
console.log("=================================================");

// Initial sync on startup
syncScenes();

let debounceTimer = null;

function handleSceneDirectoryChange(eventType, filename) {
  if (!filename) return;

  // Ignore index.js, temp files, dotfiles, or non-JS/TS files
  if (
    filename === "index.js" ||
    filename === "index.jsx" ||
    filename.startsWith(".") ||
    filename.startsWith("~") ||
    filename.endsWith(".tmp") ||
    !/\.(jsx?|tsx?)$/.test(filename)
  ) {
    return;
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    console.log(`\n🔔 Detected scene change: [${eventType}] ${filename}`);
    try {
      const scenes = syncScenes();
      const updatedScene = scenes.find(
        (s) => s.fileName === filename || s.baseName === path.basename(filename, path.extname(filename))
      );
      if (updatedScene) {
        console.log(`✅ [${updatedScene.id}] is ready! ("${updatedScene.name}", frames: ${updatedScene.from}..${updatedScene.from + updatedScene.durationInFrames})`);
      }
    } catch (err) {
      console.error("❌ Error synchronizing scenes:", err.message);
    }
  }, 250);
}

try {
  const watcher = fs.watch(SCENES_DIR, { persistent: true }, handleSceneDirectoryChange);

  process.on("SIGINT", () => {
    console.log("\nStopping scene watcher...");
    watcher.close();
    process.exit(0);
  });
} catch (err) {
  console.error("Failed to start watcher:", err.message);
}
