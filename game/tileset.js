// ==================== tileset.js ====================
// Defines how each terrain symbol is drawn & animated.

export const TILESET = {
  // Water (shimmer)
  "~": {
    frames: [
      { glyph: "~", color: "#1e90ff" },
      { glyph: "≈", color: "#3cb0ff" },
      { glyph: "∽", color: "#61c3ff" },
      { glyph: "〰", color: "#1fa0ff" },
    ],
  },

  // Grass / meadow
  "▓": {
    frames: [
      { glyph: "▓", color: "#00aa00" },
      { glyph: "▓", color: "#00bb00" },
    ],
  },

  // Soil / tilled dirt
  "▒": {
    frames: [
      { glyph: "▒", color: "#8b4513" },
      { glyph: "░", color: "#7a3d12" },
    ],
  },

  // Crops
  "▲": {
    frames: [
      { glyph: "▲", color: "#00cc00" },
      { glyph: "Δ", color: "#00ee00" },
    ],
  },

  // Fence
  "╬": {
    frames: [{ glyph: "╬", color: "#c8c89b" }],
  },

  // Barn / house
  "█": {
    frames: [
      { glyph: "█", color: "#ff5500" },
      { glyph: "█", color: "#ff6a1a" },
    ],
  },

  // Machinery
  "◎": {
    frames: [
      { glyph: "◎", color: "#ffaa33" },
      { glyph: "¤", color: "#ff8800" },
    ],
  },

  // Player
  "@": {
    frames: [
      { glyph: "@", color: "#ffff00" },
      { glyph: "@", color: "#ffff77" },
    ],
  },

  // Fallback
  " ": {
    frames: [{ glyph: " ", color: "#000000" }],
  },
};
