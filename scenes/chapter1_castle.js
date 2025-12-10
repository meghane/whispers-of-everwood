// scenes/chapter1_castle.js

export const Chapter1CastleScenes = {
  intro: {
    id: "intro",
    background: "images/backgrounds/test_bg.png",
    transition: "full",
    text: (state) =>
      `The wind whispers through the Everwood.\n\nYou feel the weight of destiny, ${state.player.name}.`,

    choices: [
      {
        text: "Step onto the forest path",
        next: "path"
      },
      {
        text: "Hide among the trees",
        requires: { speed: 3 },
        next: "hide"
      }
    ]
  },

  path: {
    id: "path",
    background: "images/backgrounds/test_bg.png",
    text:
      "You follow the winding path deeper into the forest. The light grows dim.",

    choices: [
      {
        text: "Continue",
        next: "continue_1"
      }
    ]
  },

  hide: {
    id: "hide",
    background: "images/backgrounds/test_bg.png",
    text:
      "You slip quietly behind the trees. Something watches you from the shadows.",

    choices: [
      {
        text: "Continue",
        next: "continue_1"
      }
    ]
  },

  continue_1: {
    id: "continue_1",
    background: "images/backgrounds/test_bg.png",
    text:
      "This is the end of the demo scene.\n\nThe story will continue...",

    choices: [
      {
        text: "Restart",
        next: "intro"
      }
    ]
  }
};
