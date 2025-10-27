// COZY FARM STARTUP SCREEN LOGIC
const state = {
  mode: "start",
  menuIndex: 0,
};

const menuOptions = [
  { labelActive: "> NEW WORLD", labelInactive: "  NEW WORLD" },
  { labelActive: "> LOAD", labelInactive: "  LOAD" },
];

const menuOptionEls = document.querySelectorAll(".menu-option");

function renderMenu() {
  menuOptionEls.forEach((el) => {
    const idx = parseInt(el.getAttribute("data-index"), 10);
    const active = idx === state.menuIndex;
    el.textContent = active
      ? menuOptions[idx].labelActive
      : menuOptions[idx].labelInactive;
    el.classList.toggle("active", active);
  });
}

function handleUp() {
  state.menuIndex = (state.menuIndex - 1 + menuOptions.length) % menuOptions.length;
  renderMenu();
}
function handleDown() {
  state.menuIndex = (state.menuIndex + 1) % menuOptions.length;
  renderMenu();
}
function handleSelect() {
  if (state.menuIndex === 0) {
    console.log("Selected: NEW WORLD");
  } else {
    console.log("Selected: LOAD");
  }
}

window.addEventListener("keydown", (e) => {
  if (state.mode !== "start") return;
  if (["ArrowUp", "w", "W"].includes(e.key)) handleUp();
  if (["ArrowDown", "s", "S"].includes(e.key)) handleDown();
  if (e.key === "Enter") handleSelect();
});

renderMenu();
