// ==================== game.js ====================
// Main game engine: renders procedural map, handles camera movement,
// draws animated ASCII terrain into <pre id="world-view">.

import { getChunk, WORLD_WIDTH, WORLD_HEIGHT, VIEW_SIZE } from "./map.js";
import { TILESET } from "./tileset.js";
import { clamp } from "./utils.js";

const worldViewEl = document.getElementById("world-view");

// --- camera ---
let camX = 0;
let camY = 0;
const camSpeed = 10; // tiles per key press
const keys = {};

// --- animation ---
let tick = 0;
const FRAME_INTERVAL = 150; // ms per frame

// --- input ---
window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// --- movement update ---
function updateCamera() {
  if (keys["w"] || keys["arrowup"]) camY -= camSpeed;
  if (keys["s"] || keys["arrowdown"]) camY += camSpeed;
  if (keys["a"] || keys["arrowleft"]) camX -= camSpeed;
  if (keys["d"] || keys["arrowright"]) camX += camSpeed;

  camX = clamp(camX, 0, WORLD_WIDTH - VIEW_SIZE);
  camY = clamp(camY, 0, WORLD_HEIGHT - VIEW_SIZE);
}

// --- rendering ---
function renderFrame() {
  tick++;

  updateCamera();

  const chunk = getChunk(camX, camY, VIEW_SIZE);
  const outLines = [];

  // choose animation frame index
  const frameIndex = Math.floor((tick / 5) % 4);

  for (let y = 0; y < chunk.length; y++) {
    const row = chunk[y];
    let line = "";
    for (let x = 0; x < row.length; x++) {
      const symbol = row[x];
      const tile = TILESET[symbol] || TILESET[" "];
      const frames = tile.frames;
      const f = frames[frameIndex % frames.length];
      line += `<span style="color:${f.color}">${f.glyph}</span>`;
    }
    outLines.push(line);
  }

  worldViewEl.innerHTML = outLines.join("\n");
}

// --- main loop ---
setInterval(renderFrame, FRAME_INTERVAL);
renderFrame();
