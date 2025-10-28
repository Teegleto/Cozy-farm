export const WORLD_WIDTH = 160;
export const WORLD_HEIGHT = 160;

// helper to pad/trim a row string to exactly WORLD_WIDTH
function fit(row) {
  if (row.length > WORLD_WIDTH) return row.slice(0, WORLD_WIDTH);
  if (row.length < WORLD_WIDTH) {
    return row + "G".repeat(WORLD_WIDTH - row.length); // fill rest with grass
  }
  return row;
}

/*
Legend:
H = farmhouse block
F = fence
A = animal
B = barn / shed
T = tractor yard
R = roadway / track
D = dirt / tilled soil
C = crops
G = grass / pasture
W = water
@ = player start position (near bottom-ish of main area)
*/

// --- High-detail bands we'll repeat/stack ---

// 1. Farmhouse + yard + fenced animals (top rows)
const farmhouseRow1 =
  "HHHHHHHHHHHHHHHHHHFFFFFGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";
const farmhouseRow2 =
  "HHHHHHHHHHHHHHHHHHF###FGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG".replace(/#/g,"A");
const farmhouseRow3 =
  "HHHHHHHHHHHHHHHHHHF###FGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG".replace(/#/g,"A");
const farmhouseRow4 =
  "HHHHHHHHHHHHHHHHHHFFFFFGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";

// 2. Barn / tractor yard / service area
const barnRow1 =
  "GGGGGBBBBBBBBGGGGGRRRRRGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";
const barnRow2 =
  "GGGGGBBTTTBBBGGGGGRRRRRGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";
const barnRow3 =
  "GGGGGBBBBBBBBGGGGGRRRRRGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";

// 3. Road running vertically with fields
// Mix of dirt rows and planted crops rows
const fieldRowD =
  "DDDDDDDDDDDDDDDDDDDRRRRRDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD" +
  "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDGGGGGGGGGGGGGGGGGGGG";
const fieldRowC =
  "DDDDDDDDDDDDDDDDDDDRRRRRDDDCCCDDCCCDDCCCDDCCCDDCCCDDCCCDDD" +
  "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDGGGGGGGGGGGGGGGGGGGG"
  .padEnd(160,"G")
  .slice(0,160);

// 4. Water / pond edge to the right
const waterRow1 =
  "DDDDDDDDDDDDDDDDDDDRRRRRDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD" +
  "DDDDDDDDDDDDDDDDDDDDDDDDDGGGGGGGGGGGWWWWWWWWWWWWWWWGGGGGGG";
const waterRow2 =
  "GGGGGGGGGGGGGGGGGGGRRRRRGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGWWWLWWWLWWWLWWWLGGGGGGGGG".replace(/L/g,"W");

// 5. Player start row (puts @ somewhere visible-ish)
const playerRow =
  "DDDDDDDDDDDDDDDDDDDRRRRRDDDCCCDDCCCDDCCCDDCCCDDCCCDDCCCDDD" +
  "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDGGGGGGGGGWWWGGGGG@GG"
  .padEnd(160,"G")
  .slice(0,160);

// 6. Fallback pasture / filler rows for bottom extents
const pastureRow =
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG" +
  "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";

// now build the 160 rows
const rows = [];

// Top farmhouse block
rows.push(fit(farmhouseRow1));
rows.push(fit(farmhouseRow2));
rows.push(fit(farmhouseRow3));
rows.push(fit(farmhouseRow4));

// Blend down into barn/tractor block
rows.push(fit(barnRow1));
rows.push(fit(barnRow2));
rows.push(fit(barnRow3));
rows.push(fit(barnRow3));
rows.push(fit(barnRow1));

// Now many rows of alternating dirt/crop/road, some with water edge,
// to build vertical farm depth
for (let i=0; i<20; i++){
  rows.push(fit(fieldRowD));
  rows.push(fit(fieldRowC));
  rows.push(fit(waterRow1));
  rows.push(fit(fieldRowD));
  rows.push(fit(waterRow2));
}

// Put special player row somewhere in the lower-middle
rows.push(fit(playerRow));

// Then fill the rest up to 160 rows with pasture
while (rows.length < WORLD_HEIGHT) {
  rows.push(fit(pastureRow));
}

// If somehow we overshot, trim:
while (rows.length > WORLD_HEIGHT) {
  rows.pop();
}

export const worldMap = rows;
