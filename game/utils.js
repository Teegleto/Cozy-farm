// ==================== utils.js ====================
// Deterministic pseudo-random + simple noise helpers for terrain

export function hash(x, y, seed = 1337) {
  // A tiny 2-D integer hash that always gives the same result for the same x,y
  let h = x * 374761393 + y * 668265263 + seed * 982451653;
  h = (h ^ (h >> 13)) * 1274126177;
  return (h ^ (h >> 16)) >>> 0;
}

export function randomSeeded(x, y, seed = 1337) {
  return hash(x, y, seed) / 0xffffffff;
}

export function heightNoise(x, y) {
  // smooth “fake Perlin” using trig mix — good enough for procedural map
  const v =
    Math.sin(x * 0.0023) * 0.5 +
    Math.cos(y * 0.0023) * 0.5 +
    Math.sin((x + y) * 0.0017) * 0.3;
  // scale 0-1
  return (v + 1.3) / 2.6;
}

// clamp helper
export function clamp(v, min, max) {
  return v < min ? min : v > max ? max : v;
}
