import { WORLD_WIDTH, WORLD_HEIGHT, worldMap } from "./map.js";
import { TILESET } from "./tileset.js";

const worldViewEl = document.getElementById("world-view");

// camera size in characters actually shown on screen at once
// we'll show a square "viewport" of the large world
const VIEW_SIZE = 80; // 80x80 visible slice

// camera top-left in the big 160x160 world
let camX = 0;
let camY = 0;

// simple tick for animation
let tick = 0;

// render loop
function renderFrame() {
  tick++;

  // build lines into a big string with spans per tile
  let out = "";

  for (let row = 0; row < VIEW_SIZE; row++) {
    const worldY = camY + row;
    if (worldY < 0 || worldY >= WORLD_HEIGHT) {
      // off-map safety (shouldn't really happen with cam 0,0)
      out += "\n";
      continue;
    }

    let line = "";

    // build each column in this row
    for (let col = 0; col < VIEW_SIZE; col++) {
      const worldX = camX + col;
      if (worldX < 0 || worldX >= WORLD_WIDTH) {
        line += " ";
        continue;
      }

      const tileCode = worldMap[worldY].charAt(worldX);
      const tileInfo = TILESET[tileCode] || TILESET["?"];

      // pick animation frame A/B based on tick
      const useAlt = (tick % 20 < 10); // slow pulse
      const glyph = useAlt && tileInfo.glyphB ? tileInfo.glyphB : tileInfo.glyphA;
      const color = useAlt && tileInfo.colorB ? tileInfo.colorB : tileInfo.colorA;

      line += `<span style="color:${color}">${glyph}</span>`;
    }

    out += line + "\n";
  }

  worldViewEl.innerHTML = out;
}

// basic game loop
setInterval(renderFrame, 200); // ~5fps vibe flicker, cozy not frantic
renderFrame();

// TODO: later we'll add keyboard listeners to move camera/player
// and update HUD live.
