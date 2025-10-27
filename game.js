// COZY FARM title screen logic

const state = {
  mode: "title", // "title" | "loadMenu" | "naming" | "game"
  saves: [
    // We'll fill these properly in the next step when we add load selection:
    // { name: "FARM_01", day: 12, coins: 342 },
    // { name: "COW_TOWN", day: 3, coins: 58 },
  ],
};

const loadListEl = document.getElementById("load-list");

// Renders the dropdown under [L] load game
function renderLoadList() {
  if (!state.saves || state.saves.length === 0) {
    loadListEl.textContent = "  (no save files found)";
    return;
  }

  // numbered list like:
  // 1) FARM_01  Day 12  £342
  // 2) ...
  const lines = state.saves.map((sv, i) => {
    return `${i + 1}) ${sv.name}  Day ${sv.day}  £${sv.coins}`;
  });
  loadListEl.textContent = lines.join("\n");
}

// Open load menu (shows dropdown)
function openLoadMenu() {
  state.mode = "loadMenu";
  loadListEl.classList.remove("hidden");
  renderLoadList();
}

// Begin new game flow (naming comes next step)
function startNewGameFlow() {
  state.mode = "naming";
  console.log("NEW GAME: ask player to name farm, then confirm [Y] to start");
  // In next step we'll actually show text input UI on screen.
}

// Key handling
window.addEventListener("keydown", (e) => {
  if (state.mode === "title") {
    if (e.key === "n" || e.key === "N") {
      startNewGameFlow();
    } else if (e.key === "l" || e.key === "L") {
      openLoadMenu();
    }
  } else if (state.mode === "loadMenu") {
    // Player can choose which save by pressing number key.
    if (e.key >= "0" && e.key <= "9") {
      console.log("LOAD SAVE SLOT", e.key);
      // Next step: actually load slot e.key and move to mode "game".
    }
  } else if (state.mode === "naming") {
    // Next step we'll capture text here
    console.log("typing farm name:", e.key);
  }
});

