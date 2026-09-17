import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

export function parseTimeToSeconds(timeStr) {
  const parts = timeStr.trim().replace(",", ".").split(":");
  if (parts.length === 3) {
    return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
  }
  return 0;
}

/**
 * Parses an SRT file into an array of scenes with frame numbers at the given fps.
 * @param {string} srtPath Relative or absolute path to the video's specific SRT file.
 * @param {number} fps Video frame rate (default 30).
 * @returns {Array} Array of scene timing objects.
 */
export function parseSrtTiming(srtPath, fps = 30) {
  if (!srtPath) {
    return [];
  }

  const resolvedPath = path.isAbsolute(srtPath)
    ? srtPath
    : path.join(ROOT_DIR, srtPath);

  if (!fs.existsSync(resolvedPath)) {
    console.warn(`[srt-timing] SRT file not found: ${resolvedPath}`);
    return [];
  }

  const content = fs.readFileSync(resolvedPath, "utf-8");
  const blocks = content.trim().split(/\r?\n\s*\r?\n/);
  const scenes = [];

  for (const block of blocks) {
    const lines = block.trim().split(/\r?\n/);
    if (lines.length < 2) continue;

    const sceneNumber = parseInt(lines[0].trim(), 10);
    const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,\.]\d{3})/);
    if (!timeMatch) continue;

    const startSeconds = parseTimeToSeconds(timeMatch[1]);
    const endSeconds = parseTimeToSeconds(timeMatch[2]);
    const startFrame = Math.round(startSeconds * fps);
    const endFrame = Math.round(endSeconds * fps);
    const durationInFrames = Math.max(1, endFrame - startFrame);
    const narration = lines.slice(2).join(" ").trim();

    scenes.push({
      sceneNumber,
      startTimeStr: timeMatch[1],
      endTimeStr: timeMatch[2],
      startSeconds,
      endSeconds,
      startFrame,
      endFrame,
      durationInFrames,
      narration,
    });
  }

  return scenes;
}
