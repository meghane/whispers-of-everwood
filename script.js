// script.js

import { Chapter1CastleScenes } from "./scenes/chapter1_castle.js";
import { CharacterCreationScenes } from "./scenes/character_creation.js";


/* =====================
   GAME STATE
===================== */

const state = {
  player: {
    name: "Everwood Heir",
    hp: 60,
    strength: 3,
    charisma: 1,
    speed: 3,
    intelligence: 4,
    endurance: 0
  },
  currentScene: null
};

/* =====================
   SCENE REGISTRY
===================== */

const scenes = {
...CharacterCreationScenes,
  ...Chapter1CastleScenes
};

/* =====================
   DOM REFERENCES
===================== */

const bgEl = document.getElementById("background");
const textEl = document.getElementById("story-text");
const choicesEl = document.getElementById("choices-container");
const dividerEl = document.getElementById("divider");

const hud = {
  name: document.getElementById("hud-name"),
  hp: document.getElementById("hud-hp"),
  strength: document.getElementById("hud-strength"),
  charisma: document.getElementById("hud-charisma"),
  speed: document.getElementById("hud-speed"),
  intelligence: document.getElementById("hud-intelligence"),
  endurance: document.getElementById("hud-endurance")
};

/* =====================
   HUD UPDATE
===================== */

function updateHUD() {
  hud.name.textContent = state.player.name;
  hud.hp.textContent = `❤️ ${state.player.hp}`;
  hud.strength.textContent = `⚔️ ${state.player.strength}`;
  hud.charisma.textContent = `💬 ${state.player.charisma}`;
  hud.speed.textContent = `⚡ ${state.player.speed}`;
  hud.intelligence.textContent = `🧠 ${state.player.intelligence}`;
  hud.endurance.textContent = `🛡 ${state.player.endurance}`;
}

/* =====================
   REQUIREMENT CHECK
===================== */

function meetsRequirements(requirements = {}) {
  return Object.entries(requirements).every(
    ([stat, value]) => state.player[stat] >= value
  );
}

/* =====================
   RENDER SCENE
===================== */

function renderScene(sceneId) {
  const scene = scenes[sceneId];
  if (!scene) {
    console.error("Scene not found:", sceneId);
    return;
  }

  state.currentScene = sceneId;

  /* Background */
  bgEl.style.backgroundImage = `url("${scene.background}")`;

  /* Text */
  textEl.innerHTML =
    typeof scene.text === "function"
      ? scene.text(state).replace(/\n/g, "<br>")
      : scene.text.replace(/\n/g, "<br>");

  /* Clear choices */
  choicesEl.innerHTML = "";

  /* Divider visibility */
  dividerEl.style.display = scene.choices.length ? "block" : "none";

  /* SPECIAL CASES: name input & stat selection */
    if (scene.choices.length === 1 && scene.choices[0].type === "name-input") {
    renderNameInput();
    updateHUD();
    return;
    }

    if (scene.choices.length === 1 && scene.choices[0].type === "stat-allocation") {
    renderStatAllocation();
    updateHUD();
    return;
    }

  /* Build choices */
  scene.choices.forEach((choice) => {
    const wrapper = document.createElement("div");
    wrapper.className = "choice-wrapper";

    const btn = document.createElement("button");
    btn.className = "choice-btn";

    const img = document.createElement("img");
    img.src = "images/ui/stone_small.png";
    img.className = "choice-img";

    const span = document.createElement("span");
    span.className = "choice-text";
    span.textContent = choice.text;

    btn.appendChild(img);
    btn.appendChild(span);

    const allowed = meetsRequirements(choice.requires);

    if (!allowed) {
      btn.classList.add("disabled");

      const req = document.createElement("div");
      req.className = "choice-requirement";

      req.textContent =
        "Requires " +
        Object.entries(choice.requires)
          .map(([k, v]) => `${capitalize(k)} ≥ ${v}`)
          .join(", ");

      wrapper.appendChild(btn);
      wrapper.appendChild(req);
    } else {
      btn.addEventListener("click", () => {
        renderScene(choice.next);
      });
      wrapper.appendChild(btn);
    }

    choicesEl.appendChild(wrapper);
  });

  updateHUD();
}
function renderNameInput() {
  choicesEl.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "choice-wrapper";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your name";
  input.className = "name-input";

  const btn = document.createElement("button");
  btn.className = "choice-btn";
  
  const img = document.createElement("img");
  img.src = "images/ui/stone_small.png";
  img.className = "choice-img";

  const span = document.createElement("span");
  span.className = "choice-text";
  span.textContent = "Continue";

  btn.appendChild(img);
  btn.appendChild(span);

  btn.addEventListener("click", () => {
    const name = input.value.trim();
    if (name.length >= 2) {
      state.player.name = name;
      renderScene("stat_select");
    }
  });

  wrapper.appendChild(input);
  wrapper.appendChild(btn);
  choicesEl.appendChild(wrapper);
}

function renderStatAllocation() {
  choicesEl.innerHTML = "";
  
  const stats = ["strength", "charisma", "speed", "intelligence", "endurance"];

  const totalPoints = 10;
  let spent = 0;

  // Reset stats for creation
  stats.forEach((s) => (state.player[s] = 0));

  const updatePoints = () => {
    pointsDisplay.textContent = `Points Remaining: ${totalPoints - spent}`;
    updateHUD();
    continueBtn.disabled = spent !== totalPoints;
  };

  const wrapper = document.createElement("div");
  wrapper.className = "choice-wrapper";

  // Points Remaining display
  const pointsDisplay = document.createElement("div");
  pointsDisplay.className = "points-display";
  wrapper.appendChild(pointsDisplay);

  // Create each stat row
  stats.forEach((stat) => {
    const row = document.createElement("div");
    row.className = "stat-row";

    const label = document.createElement("span");
    label.textContent = stat.charAt(0).toUpperCase() + stat.slice(1);

    const minus = document.createElement("button");
    minus.textContent = "-";

    const val = document.createElement("span");
    val.textContent = "0";

    const plus = document.createElement("button");
    plus.textContent = "+";

    minus.addEventListener("click", () => {
      if (state.player[stat] > 0) {
        state.player[stat]--;
        spent--;
        val.textContent = state.player[stat];
        updatePoints();
      }
    });

    plus.addEventListener("click", () => {
      if (spent < totalPoints) {
        state.player[stat]++;
        spent++;
        val.textContent = state.player[stat];
        updatePoints();
      }
    });

    row.appendChild(label);
    row.appendChild(minus);
    row.appendChild(val);
    row.appendChild(plus);
    wrapper.appendChild(row);
  });

  // Continue button
  const continueBtn = document.createElement("button");
  continueBtn.className = "choice-btn";
  continueBtn.disabled = true;

  const img = document.createElement("img");
  img.src = "images/ui/stone_small.png";
  img.className = "choice-img";

  const span = document.createElement("span");
  span.className = "choice-text";
  span.textContent = "Begin Your Journey";

  continueBtn.appendChild(img);
  continueBtn.appendChild(span);

  continueBtn.addEventListener("click", () => {
    renderScene("intro"); // jumps into story
  });

  wrapper.appendChild(continueBtn);
  choicesEl.appendChild(wrapper);

  updatePoints();
}

/* =====================
   UTIL
===================== */

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* =====================
   START GAME
===================== */

updateHUD();
renderScene("name_select");

