// ==================== map.js ====================
// Procedural world generator for Cozy Farm.
// World = 16000 × 16000 tiles, deterministic from noise.
// Only a 160 × 160 window is rendered at a time.

import { heightNoise, randomSeeded } from "./utils.js";

// constants
export const WORLD_WIDTH  = 16000;
export const WORLD_HEIGHT = 16000;
export const VIEW_SIZE    = 160; // visible chunk size

// ----------------------------------------------
// Generate a single tile code for world position (x,y)
// ----------------------------------------------
export function generateTile(x, y) {
  // basic terrain height and randomness
  const h = heightNoise(x, y);
  const r = randomSeeded(x, y);

  // base terrain choice
  if (h < 0.18) return "~"; // deep water
  if (h < 0.22) return "▓"; // grass edge
  if (h < 0.45) {
    // farmland or pasture
    if (r < 0.1) return "▲"; // crops patch
    if (r < 0.12) return "╬"; // fence post
    return "▒"; // soil / dirt
  }
  if (h < 0.55) return "▓"; // grassland
  if (h < 0.65) {
    if (r < 0.01) return "◎"; // tractor/machine
    return "▓";               // pasture
  }
  if (h < 0.75) {
    if (r < 0.02) return "█"; // barn
    if (r < 0.04) return "╬"; // fence
    return "▒";
  }
  if (h < 0.9) {
    if (r < 0.01) return "█"; // farmhouse / building
    return "▓";
  }
  // rare sparkle of machinery at top elevations
  return r < 0.005 ? "◎" : "▓";
}

// ----------------------------------------------
// Get a visible chunk (2D slice) of the world
// ----------------------------------------------
export function getChunk(camX, camY, size = VIEW_SIZE) {
  const chunk = [];
  const startX = Math.floor(camX);
  const startY = Math.floor(camY);

  for (let y = 0; y < size; y++) {
    let row = "";
    for (let x = 0; x < size; x++) {
      const wx = startX + x;
      const wy = startY + y;
      if (wx < 0 || wy < 0 || wx >= WORLD_WIDTH || wy >= WORLD_HEIGHT) {
        row += " ";
      } else {
        row += generateTile(wx, wy);
      }
    }
    chunk.push(row);
  }

  return chunk;
}

// ----------------------------------------------
// Optional helper: wrap coords (infinite feel)
// ----------------------------------------------
export function wrapCoord(v, max) {
  if (v < 0) return max + (v % max);
  if (v >= max) return v % max;
  return v;
}
