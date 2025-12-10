// scenes/character_creation.js

export const CharacterCreationScenes = {

  name_select: {
    id: "name_select",
    background: "images/backgrounds/test_bg.png",
    text: "Before your journey begins...\n\nTell us your name.",

    choices: [
      {
        type: "name-input"  // special type the engine will handle
      }
    ]
  },

  stat_select: {
    id: "stat_select",
    background: "images/backgrounds/test_bg.png",
    text: (state) =>
      `Very well, ${state.player.name}.\n\nDistribute 10 points among your traits.`,

    choices: [
      {
        type: "stat-allocation"  // special type the engine will handle
      }
    ]
  }
};
