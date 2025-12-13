// script.js
import { Chapter1Scenes } from "./scenes/chapter1.js";
import { CharacterCreationScenes } from "./scenes/character_creation.js";

const state = {
  player: {
    name: "Everwood Heir",
    hp: 100,
    strength: 0,
    charisma: 0,
    speed: 0,
    intelligence: 0,
    endurance: 0,
    morality: 0 // hidden
  },
  currentScene: null,
  resolvedScenes: {}
};

const scenes = {
  ...CharacterCreationScenes,
  ...Chapter1Scenes
};

const bgEl = document.getElementById("background");
const textEl = document.getElementById("story-text");
const choicesEl = document.getElementById("choices-container");
const dividerEl = document.getElementById("divider");
const hudBar = document.querySelector(".hud-bar");
const fadeOverlay = document.getElementById("fade-overlay");
const feedbackEl = document.getElementById("feedback");

const hud = {
  name: document.getElementById("hud-name"),
  hp: document.getElementById("hud-hp"),
  strength: document.getElementById("hud-strength"),
  charisma: document.getElementById("hud-charisma"),
  speed: document.getElementById("hud-speed"),
  intelligence: document.getElementById("hud-intelligence"),
  endurance: document.getElementById("hud-endurance")
};

function fadeFull(callback) {
  fadeOverlay.classList.add("active");
  setTimeout(() => {
    callback();
    fadeOverlay.classList.remove("active");
  }, 600);
}

function fadeBackground(callback) {
  bgEl.style.transition = "opacity 0.6s ease";
  bgEl.style.opacity = 0;

  setTimeout(() => {
    callback();
    bgEl.style.opacity = 1;
  }, 600);
}

function goToScene(nextSceneId) {
  const nextScene = scenes[nextSceneId];

  if (!nextScene || !nextScene.transition) {
    renderScene(nextSceneId);
    return;
  }

  if (nextScene.transition === "background") {
    fadeBackground(() => renderScene(nextSceneId));
    return;
  }

  if (nextScene.transition === "full") {
    fadeFull(() => renderScene(nextSceneId));
    return;
  }

  renderScene(nextSceneId);
}

function showHUD() {
  hudBar.style.display = "flex";
}

function hideHUD() {
  hudBar.style.display = "none";
}

function updateHUD() {
  hud.name.textContent = state.player.name;
  hud.hp.textContent = `❤️ ${state.player.hp}`;
  hud.strength.textContent = `⚔️ ${state.player.strength}`;
  hud.charisma.textContent = `💬 ${state.player.charisma}`;
  hud.speed.textContent = `⚡ ${state.player.speed}`;
  hud.intelligence.textContent = `🧠 ${state.player.intelligence}`;
  hud.endurance.textContent = `🛡 ${state.player.endurance}`;
}

function meetsRequirements(req = {}) {
  return Object.entries(req).every(
    ([stat, val]) => state.player[stat] >= val
  );
}

function showFeedback(text) {
  if (!feedbackEl) return;

  feedbackEl.textContent = text;
  feedbackEl.classList.add("show");

  setTimeout(() => {
    feedbackEl.classList.remove("show");
  }, 1800);
}

function applyChoiceEffects(choice) {
    const sceneKey = state.currentScene;

  if (state.resolvedScenes[sceneKey]) return;
  state.resolvedScenes[sceneKey] = true;

  if (choice.gain) {
    for (const stat in choice.gain) {
      state.player[stat] += choice.gain[stat];
      showFeedback(`${capitalize(stat)} +${choice.gain[stat]}`);
    }
  }

  if (choice.hpChange) {
    state.player.hp += choice.hpChange;
    state.player.hp = Math.max(0, Math.min(100, state.player.hp));
    showFeedback(`❤️ HP ${choice.hpChange}`);
  }

  if (choice.morality) {
    state.player.morality += choice.morality;
  }

  updateHUD();
}

function renderScene(sceneId) {
  const scene = scenes[sceneId];
  if (!scene) {
    console.error("Scene not found:", sceneId);
    return;
  }

  state.currentScene = sceneId;

  // HUD visibility
  if (sceneId === "name_select" || sceneId === "stat_select") {
    hideHUD();
  } else {
    showHUD();
  }

  bgEl.style.backgroundImage = `url("${scene.background}")`;

  textEl.innerHTML =
    typeof scene.text === "function"
      ? scene.text(state).replace(/\n/g, "<br>")
      : scene.text.replace(/\n/g, "<br>");

  choicesEl.innerHTML = "";
  dividerEl.style.display = scene.choices.length ? "block" : "none";

  if (scene.choices.length === 1) {
    const type = scene.choices[0].type;

    if (type === "name-input") {
      renderNameInput();
      return;
    }

    if (type === "stat-allocation") {
      renderStatAllocation();
      return;
    }
  }

  scene.choices.forEach(choice => {
    const wrapper = document.createElement("div");
    wrapper.className = "choice-wrapper";

    const btn = document.createElement("button");
    btn.className = "choice-btn";

    const img = document.createElement("img");
    img.src = "images/ui/stone_small.png";
    img.className = "choice-img";

    const text = document.createElement("span");
    text.className = "choice-text";
    text.textContent = choice.text;

    btn.appendChild(img);
    btn.appendChild(text);

    if (choice.requires && !meetsRequirements(choice.requires)) {
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
        applyChoiceEffects(choice);
        setTimeout(() => {
            goToScene(choice.next);
        }, 300);
});

      wrapper.appendChild(btn);
    }

    choicesEl.appendChild(wrapper);
  });

  updateHUD();
}

function renderNameInput() {
  const wrapper = document.createElement("div");
  wrapper.className = "choice-wrapper";

  const input = document.createElement("input");
  input.className = "name-input";
  input.placeholder = "Enter your name";

  const btn = document.createElement("button");
  btn.className = "choice-btn";

  const img = document.createElement("img");
  img.src = "images/ui/stone_small.png";
  img.className = "choice-img";

  const text = document.createElement("span");
  text.className = "choice-text";
  text.textContent = "Continue";

  btn.appendChild(img);
  btn.appendChild(text);

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
  const stats = ["strength", "charisma", "speed", "intelligence", "endurance"];
  const total = 10;
  let spent = 0;

  stats.forEach(s => (state.player[s] = 0));

  const wrapper = document.createElement("div");
  wrapper.className = "choice-wrapper";

  const remaining = document.createElement("div");
  remaining.className = "points-display";
  wrapper.appendChild(remaining);

  function update() {
    remaining.textContent = `Points Remaining: ${total - spent}`;
    btn.disabled = spent !== total;
    updateHUD();
  }

  stats.forEach(stat => {
    const row = document.createElement("div");
    row.className = "stat-row";

    const label = document.createElement("span");
    label.textContent = capitalize(stat);

    const minus = document.createElement("button");
    minus.textContent = "-";

    const value = document.createElement("span");
    value.className = "stat-value";
    value.textContent = "0";

    const plus = document.createElement("button");
    plus.textContent = "+";

    minus.onclick = () => {
      if (state.player[stat] > 0) {
        state.player[stat]--;
        spent--;
        value.textContent = state.player[stat];
        update();
      }
    };

    plus.onclick = () => {
      if (spent < total) {
        state.player[stat]++;
        spent++;
        value.textContent = state.player[stat];
        update();
      }
    };

    row.append(label, minus, value, plus);
    wrapper.appendChild(row);
  });

  const btn = document.createElement("button");
  btn.className = "choice-btn";
  btn.disabled = true;

  const img = document.createElement("img");
  img.src = "images/ui/stone_small.png";
  img.className = "choice-img";

  const text = document.createElement("span");
  text.className = "choice-text";
  text.textContent = "Begin Your Journey";

  btn.append(img, text);

  btn.onclick = () => {
    goToScene("chapter1_castle0");
  };

  wrapper.appendChild(btn);
  choicesEl.appendChild(wrapper);
  update();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// start game at name selection
renderScene("name_select");
