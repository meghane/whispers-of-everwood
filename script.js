// ===================================
// PLAYER STATE
// ===================================
let player = {
    name: "",
    health: 100,
    traits: {
        strength: 0,
        charisma: 0,
        speed: 0,
        intelligence: 0,
        endurance: 0
    }
};

// DOM references
const nameSection = document.getElementById("name-section");
const traitsSection = document.getElementById("traits-section");
const storySection = document.getElementById("story-section");
const nameInput = document.getElementById("playerName");
const saveNameBtn = document.getElementById("saveNameBtn");
const greeting = document.getElementById("greeting");
const headerStats = document.getElementById("headerStats");


// ===================================
// SAVE CHARACTER NAME
// ===================================
saveNameBtn.onclick = () => {
    let name = nameInput.value.trim();
    if (name.length === 0) return;

    player.name = name;

    greeting.textContent = `Welcome, ${name}! Assign your traits below.`;

    nameSection.style.display = "none";
    traitsSection.style.display = "block";
};


// ===================================
// TRAIT SLIDER LOGIC
// ===================================
const traitSliders = document.querySelectorAll(".traitSlider");
const pointsLeftDisplay = document.getElementById("pointsLeft");
const startBtn = document.getElementById("startBtn");

function updateTraitPoints() {
    let total = 0;

    traitSliders.forEach(slider => {
        let value = parseInt(slider.value);
        total += value;
        slider.nextElementSibling.textContent = value;
    });

    let pointsLeft = 10 - total;
    pointsLeftDisplay.textContent = pointsLeft;

    traitSliders.forEach(slider => {
        if (pointsLeft <= 0) {
            slider.max = slider.value;
        } else {
            slider.max = 10;
        }
    });

    startBtn.disabled = pointsLeft !== 0;
}

traitSliders.forEach(slider => {
    slider.addEventListener("input", updateTraitPoints);
});


// ===================================
// START THE GAME
// ===================================
startBtn.onclick = () => {
    traitSliders.forEach(slider => {
        let trait = slider.dataset.trait;
        player.traits[trait] = parseInt(slider.value);
    });

    traitsSection.style.display = "none";
    storySection.style.display = "block";

    updateHeaderStats();
    loadNode("start");
};


// ===================================
// UPDATE STATS HEADER
// ===================================
function updateHeaderStats() {
    headerStats.textContent =
        `${player.name} | HP: ${player.health} | STR ${player.traits.strength} | CHA ${player.traits.charisma} | SPD ${player.traits.speed} | INT ${player.traits.intelligence} | END ${player.traits.endurance}`;
}


// ===================================
// STORY NODES
// ===================================
const storyNodes = {
    start: {
        text: () => `Your journey begins, ${player.name}. The wind blows softly as your new traits shape your destiny.`,
        choices: [
            { text: "Walk into the forest", next: "forestEntrance" }
        ]
    },

    forestEntrance: {
        text: () => "You reach the edge of a mysterious forest. A hooded figure blocks your path.",
        choices: [
            { 
                text: "Try to intimidate them (requires Strength 3)", 
                next: "intimidateSuccess",
                requiredTrait: { trait: "strength", value: 3 }
            },
            { 
                text: "Charm them (requires Charisma 3)", 
                next: "charmSuccess",
                requiredTrait: { trait: "charisma", value: 3 }
            },
            {
                text: "Sneak around them (requires Speed 3)",
                next: "sneakSuccess",
                requiredTrait: { trait: "speed", value: 3 }
            },
            { text: "Do nothing", next: "standStill" }
        ]
    },

    intimidateSuccess: {
        text: () => "You flex your muscles impressively. The figure steps aside.",
        choices: [
            { text: "Continue forward", next: "end" }
        ]
    },

    charmSuccess: {
        text: () => "You smile warmly. The figure blushes and lets you pass.",
        choices: [
            { text: "Continue forward", next: "end" }
        ]
    },

    sneakSuccess: {
        text: () => "You move silently like a shadow, slipping past unnoticed.",
        choices: [
            { text: "Continue forward", next: "end" }
        ]
    },

    standStill: {
        text: () => "You stand there awkwardly. The figure eventually sighs and leaves.",
        choices: [
            { text: "Continue forward", next: "end" }
        ]
    },

    end: {
        text: () => "This is just the beginning of your adventure...",
        choices: []
    }
};


// ===================================
// STORY ENGINE
// ===================================
const storyDiv = document.getElementById("story");
const choicesDiv = document.getElementById("choices");

function loadNode(name) {
    const node = storyNodes[name];

    storyDiv.textContent =
        typeof node.text === "function" ? node.text() : node.text;

    choicesDiv.innerHTML = "";

    node.choices.forEach(choice => {
        let btn = document.createElement("button");
        btn.textContent = choice.text;

        if (choice.requiredTrait) {
            let { trait, value } = choice.requiredTrait;
            if (player.traits[trait] < value) {
                btn.disabled = true;
                btn.style.opacity = "0.5";
            }
        }

        btn.onclick = () => {
            updateHeaderStats();
            loadNode(choice.next);
        };

        choicesDiv.appendChild(btn);
    });
}
