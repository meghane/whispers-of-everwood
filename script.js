// Basic player stats
const player = {
    name: "Everwood Heir",
    hp: 60,
    strength: 3,
    charisma: 1,
    speed: 2,
    intelligence: 4,
    endurance: 0,
};

// One test scene with requirements
const scenes = {
    forest_clearing: {
        text: "The wind whispers through the Everwood. Shadows stretch across the moss-covered path...",
        choices: [
            {
                text: "Follow the path",
                next: "follow_path",
                requires: null, // always available
            },
            {
                text: "Hide behind a tree",
                next: "hide_tree",
                requires: { speed: 3 }, // needs speed >= 3
            },
            {
                text: "Call out into the woods",
                next: "call_woods",
                requires: { charisma: 2 }, // needs charisma >= 2
            },
        ],
    },

    follow_path: {
        text: "You follow the winding path deeper into the Everwood...",
        choices: [
            { text: "Back", next: "forest_clearing", requires: null },
        ],
    },

    hide_tree: {
        text: "You try to slip behind a tree, but your steps rustle the leaves a bit too loudly.",
        choices: [
            { text: "Back", next: "forest_clearing", requires: null },
        ],
    },

    call_woods: {
        text: "Your voice echoes through the trees. Something stirs in the distance...",
        choices: [
            { text: "Back", next: "forest_clearing", requires: null },
        ],
    },
};

let currentSceneId = "forest_clearing";

// --- HUD UPDATE ---
function updateHUD() {
    document.getElementById("hud-name").textContent = player.name;
    document.getElementById("hud-hp").textContent = player.hp;
    document.getElementById("hud-str").textContent = player.strength;
    document.getElementById("hud-cha").textContent = player.charisma;
    document.getElementById("hud-spd").textContent = player.speed;
    document.getElementById("hud-int").textContent = player.intelligence;
    document.getElementById("hud-end").textContent = player.endurance;
}

// Check if player meets requirements
function meetsRequirements(req) {
    if (!req) return true;
    let ok = true;

    if (req.strength !== undefined) {
        ok = ok && player.strength >= req.strength;
    }
    if (req.charisma !== undefined) {
        ok = ok && player.charisma >= req.charisma;
    }
    if (req.speed !== undefined) {
        ok = ok && player.speed >= req.speed;
    }
    if (req.intelligence !== undefined) {
        ok = ok && player.intelligence >= req.intelligence;
    }
    if (req.endurance !== undefined) {
        ok = ok && player.endurance >= req.endurance;
    }

    return ok;
}

// Turn a requirement object into human text
function formatRequirement(req) {
    if (!req) return "";

    const parts = [];
    if (req.strength !== undefined) {
        parts.push(`Strength ≥ ${req.strength}`);
    }
    if (req.charisma !== undefined) {
        parts.push(`Charisma ≥ ${req.charisma}`);
    }
    if (req.speed !== undefined) {
        parts.push(`Speed ≥ ${req.speed}`);
    }
    if (req.intelligence !== undefined) {
        parts.push(`Intelligence ≥ ${req.intelligence}`);
    }
    if (req.endurance !== undefined) {
        parts.push(`Endurance ≥ ${req.endurance}`);
    }

    return "Requires " + parts.join(" and ");
}

// Render the current scene text + choices
function renderScene() {
    const scene = scenes[currentSceneId];

    const textEl = document.getElementById("scene-text");
    const choicesContainer = document.getElementById("choices");

    textEl.textContent = scene.text;
    choicesContainer.innerHTML = "";

    scene.choices.forEach((choice) => {
        // button wrapper
        const wrapper = document.createElement("div");
        wrapper.style.width = "100%";
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.alignItems = "center";

        // actual button
        const btn = document.createElement("button");
        btn.className = "choice-btn";

        // image + text inside the button
        const img = document.createElement("img");
        img.src = "images/ui/choice.png";
        img.className = "choice-img";

        const span = document.createElement("span");
        span.className = "choice-text";
        span.textContent = choice.text;

        btn.appendChild(img);
        btn.appendChild(span);

        const allowed = meetsRequirements(choice.requires);

        if (!allowed) {
            btn.classList.add("disabled");
            btn.disabled = true;

            const reqText = document.createElement("div");
            reqText.className = "choice-requirement";
            reqText.textContent = formatRequirement(choice.requires);
            wrapper.appendChild(btn);
            wrapper.appendChild(reqText);
        } else {
            btn.addEventListener("click", () => {
                currentSceneId = choice.next;
                renderScene();
            });
            wrapper.appendChild(btn);
        }

        choicesContainer.appendChild(wrapper);
    });

    updateHUD();
}

// Kick everything off
document.addEventListener("DOMContentLoaded", () => {
    renderScene();
});
