# Video-Specific Scene Timing & SRT Narration Synchronization Rule

## Core Directive
SRT files are **strictly scoped to their individual video project**. 
**NEVER** apply or cross-contaminate an SRT file across different videos or channels.

## Scoping & Discovery Protocol
1. **Per-Video Configuration**:
   - Each video project defines its own audio and SRT source in its configuration (e.g. `ACTIVE_SRT_FILE` in `scenes.config.js`) or within the user's prompt.
   - For the current *10 Types of Depression* video (`everything-curated`), the active SRT is `public/Generated_Audio_September_15_2026_-_1_01AM_eng.srt`.
   - When working on another video, check THAT specific video's configuration, prompt, or assets for its designated SRT file.
   - If a video does not use an SRT file, follow the timings and prompts in `scenes.md` or user instructions.

2. **1:1 Scene Mapping (When an SRT is assigned to that video)**:
   - Entry `N` in that video's SRT defines the timing and script for Scene `N` (`Scene01`, `Scene02`, ...).

3. **Deterministic Frame Math (30fps)**:
   - Convert `HH:MM:SS,mmm` to seconds:
     `seconds = HH * 3600 + MM * 60 + SS + mmm / 1000`
   - Calculate exact frames:
     `startFrame = Math.round(startSeconds * 30)`
     `endFrame = Math.round(endSeconds * 30)`
     `durationInFrames = endFrame - startFrame`

4. **Internal Animation Synchronization**:
   - Visual action beats, title animations, text stamps, and stickman emotion changes MUST be synchronized to the exact relative frames of the spoken narration words within that SRT block.

5. **Dynamic Automation**:
   - `scripts/sync-scenes.mjs` only consults an SRT file if `ACTIVE_SRT_FILE` is declared in that video's `scenes.config.js`.
