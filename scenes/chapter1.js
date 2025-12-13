// scenes/chapter1.js

export const Chapter1Scenes = {
  chapter1_castle0: {
    background: "images/backgrounds/castle_interior.png",
    transition: "full",
    text: `You awaken suddenly, breathing heavily, sweat running down your forehead. You had another nightmare.
You haven’t slept well in weeks, and it’s starting to drain you—mentally and physically.
You’ve told your father, King Theodore, again and again, but he dismisses you every time.

Today will be different. You need answers. He knows something—you can feel it.`,
    choices: [
      { text: "Continue", next: "chapter1_castle1" }
    ]
  },

  chapter1_castle1: {
    background: "images/backgrounds/castle_interior.png",
    text: `You sit at the dining table, your father across from you. You have barely touched your breakfast.
“Father,” you say, “I had another nightmare. About those woods. About that woman.”
His fork freezes—then slams against the plate.
The housekeepers and butlers all flinch.`,
    choices: [
      { text: "Continue", next: "chapter1_castle2" }
    ]
  },

  chapter1_castle2: {
    background: "images/backgrounds/castle_interior.png",
    text: `"I have told you time and time again not to bring those up!" he roars. "They are fake, and mentioning them does nothing but harm."
“But Father—”
“Enough! You are grounded. Go to your room.
The servants will bring you dinner. That is all.”
He waves you away.`,
    choices: [
      { text: "Continue", next: "chapter1_castle3" }
    ]
  },

  chapter1_castle3: {
    background: "images/backgrounds/castle_interior.png",
    text: `You hurry to your room, heart pounding. Once inside, you lock the door and slump against it. He won't listen, he probably never will. 
You decide-tonight you leave. You gather what little you can carry-clothes, necessities, and the small training dagger you once stole from the armory.
There’s room for one more thing. Something that feels… important. What do you take?`,
    choices: [
      { text: "Take a book", next: "chapter1_castle4", gain: { intelligence: 1 } },
      { text: "Take an extra pair of boots", next: "chapter1_castle4", gain: { speed: 1 } },
      { text: "Take your mother’s locket", next: "chapter1_castle4", gain: { charisma: 1 } }
    ]
  },

  chapter1_castle4: {
    background: "images/backgrounds/castle_interior.png",
    text: `Night falls.
You try to sleep through the rest of the day—unsure when you’ll sleep again.
It’s time to leave. Quietly.
How do you escape?`,
    choices: [
      { text: "Climb out the bedroom window", next: "bedroom_window", requires: { strength: 2 } },
      { text: "Leave through the side entrance", next: "side_entrance" }
    ]
  },

// =====================
//  SIDE ENTRANCE PATH
// =====================

  side_entrance: {
    background: "images/backgrounds/castle_interior.png",
    text: `You slip into the halls, heading toward the side entrance used by staff.
Footsteps echo.
A butler approaches.`,
    choices: [
      { text: "Hide behind a column", next: "hide_butler", requires: { speed: 3 } },
      { text: "Act normal", next: "normal_butler" }
    ]
  },

  normal_butler: {
    background: "images/backgrounds/castle_interior.png",
    text: `The butler stops short.
“Your Highness… I thought you were grounded. I really must help you back to your room.”
His eyes flick nervously down the hall.
What do you do?`,
    choices: [
      { text: "Pull rank and intimidate him", next: "bossy_heir", requires: { charisma: 2 } },
      { text: "Punch him", next: "punch_butler", requires: { strength: 4 } },
      { text: "Lie and ask for water", next: "thirsty_butler" }
    ]
  },

  punch_butler: {
    background: "images/backgrounds/castle_interior.png",
    text: `You strike him.
He collapses to the floor.
You drag him aside and straighten his coat,
hoping no one will look too closely as you slip away.`,
    choices: [
      { text: "Continue", next: "chapter1_escape0" }
    ]
  },

  bossy_heir: {
    background: "images/backgrounds/castle_interior.png",
    text: `Fear flashes across his face.
“Yes—of course, Your Highness. I meant no offense."
He bows hurriedly and retreats down the corridor.
The moment he disappears, you move for the exit.`,
    choices: [
      { text: "Continue", next: "chapter1_escape0" }
    ]
  },

  thirsty_butler: {
    background: "images/backgrounds/castle_interior.png",
    text: `The butler nods.
“I’ll fetch it immediately.”
As soon as he turns away, you slip toward freedom.`,
    choices: [
      { text: "Continue", next: "chapter1_escape0" }
    ]
  },

  hide_butler: {
    background: "images/backgrounds/castle_interior.png",
    text: `You press yourself into the shadows.
The butler passes without a glance.
Once his footsteps fade, you exhale and move on.`,
    choices: [
      { text: "Continue", next: "chapter1_escape0" }
    ]
  },

// =====================
//  BEDROOM WINDOW PATH
// =====================

  bedroom_window: {
    background: "images/backgrounds/leaving_castle.png",
    transition: "background",
    text: `You tie sheets and blankets together and lower yourself down the stone wall.
The drop stings—but you land safely.`,
    choices: [
      { text: "Continue", next: "chapter1_escape0" }
    ]
  },

// =====================
//  ESCAPE
// =====================

  chapter1_escape0: {
    background: "images/backgrounds/outside_castle.png",
    transition: "background",
    text: `You are free.
You don’t know where you’re going—only that you must keep moving towards the town.`,
    choices: [
      { text: "Continue", next: "chapter1_escape1" }
    ]
  },

  chapter1_escape1: {
    background: "images/backgrounds/outside_castle.png",
    text: `Miles pass.
Your bag grows heavier.
Your eyes burn.
You can’t stop—not yet.`,
    choices: [
      { text: "Continue", next: "chapter1_escape2" }
    ]
  },

  chapter1_escape2: {
    background: "images/backgrounds/nature_hills.png",
    transition: "background",
    text: `Your thoughts blur as exhaustion pulls at you.
Then—
A sudden crash snaps you awake.
You tighten your grip on your bag.
Ahead, a small creature stands motionless, watching you.
What do you do?`,
    choices: [
      { text: "Draw your dagger", next: "small_creature_dagger" },
      { text: "Stay still and quiet", next: "small_creature_quiet" },
      { text: "Approach cautiously", next: "small_creature_walk" }
    ]
  },

// =====================
//  SMALL CREATURE PATHS
// =====================

  small_creature_dagger: {
  background: "images/backgrounds/nature_hills.png",
  text: `You draw your dagger and brace yourself.
The creature tilts its head-then launches toward you.`,
  choices: [
    { text: "Slash", next: "small_creature_slash", requires: { strength: 3 } },
    { text: "Dodge", next: "small_creature_dodge", requires: { speed: 3 } },
    { text: "Take the hit", next: "small_creature_hit" }
  ]
},

small_creature_hit: {
  background: "images/backgrounds/nature_hills.png",
  text: `Pain explodes across your chest as it collides with you.
You gasp, staggering back.`,
  choices: [
    { text: "Throw it off", next: "small_creature_throw", requires: { strength: 2 }, hpChange: -10 },
    { text: "Stab it", next: "small_creature_stab", hpChange: -10 }
  ]
},

small_creature_slash: {
  background: "images/backgrounds/nature_hills.png",
  text: `Your blade strikes true.
The creature collapses, wounded and whimpering.
It no longer seems like a threat.`,
  choices: [
    { text: "End its misery", next: "small_creature_misery", morality: 1 },
    { text: "Let it suffer", next: "small_creature_suffer", morality: -1 }
  ]
},

small_creature_misery: {
  background: "images/backgrounds/nature_hills.png",
  text: `You end its pain quickly.
The forest falls silent.`,
  choices: [{ text: "Continue", next: "chapter1_escape3" }]
},

small_creature_suffer: {
  background: "images/backgrounds/nature_hills.png",
  text: `You turn away, leaving it behind.
The forest does not judge.
It remembers.`,
  choices: [{ text: "Continue", next: "chapter1_escape3" }]
},

small_creature_dodge: {
  background: "images/backgrounds/nature_hills.png",
  text: `You twist aside as it flies past you.
It lands, turns, and attacks again.`,
  choices: [
    { text: "Slash", next: "small_creature_slash", requires: { strength: 3 } },
    { text: "Dodge again", next: "small_creature_dodge2", requires: { endurance: 2 } }
  ]
},

small_creature_dodge2: {
  background: "images/backgrounds/nature_hills.png",
  text: `You evade it once more.
This time, it hesitates—then retreats into the trees.`,
  choices: [{ text: "Continue", next: "chapter1_escape3" }]
},

small_creature_throw: {
  background: "images/backgrounds/nature_hills.png",
  text: `You shove it away with a grunt.
It scrambles to its feet and flees into the forest.`,
  choices: [{ text: "Continue", next: "chapter1_escape3" }]
},

small_creature_stab: {
  background: "images/backgrounds/nature_hills.png",
  text: `Your dagger sinks into its side.
It collapses, bleeding, whimpering softly.`,
  choices: [
    { text: "End its misery", next: "small_creature_misery", morality: 1 },
    { text: "Let it suffer", next: "small_creature_suffer", morality: -1 }
  ]
},

small_creature_quiet: {
  background: "images/backgrounds/nature_hills.png",
  text: `You hold perfectly still.
The creature watches you.`,
  choices: [
    { text: "Approach slowly", next: "small_creature_walk" },
    { text: "Stay still", next: "small_creature_stay" }
  ]
},

small_creature_stay: {
  background: "images/backgrounds/nature_hills.png",
  text: `The staring continues.
Minutes stretch uncomfortably.`,
  choices: [
    { text: "Draw your dagger", next: "small_creature_dagger" },
    { text: "Approach", next: "small_creature_walk" },
    { text: "Stay put", next: "small_creature_stay2" }
  ]
},

small_creature_stay2: {
  background: "images/backgrounds/nature_hills.png",
  text: `At last, it shrugs—almost human—and wanders away.`,
  choices: [{ text: "Continue", next: "chapter1_escape3" }]
},

small_creature_walk: {
  background: "images/backgrounds/nature_hills.png",
  text: `You approach slowly.
The creature lowers its ears, almost inviting.`,
  choices: [
    { text: "Pet it", next: "small_creature_pet" },
    { text: "Leave it", next: "small_creature_no_pet" }
  ]
},

small_creature_pet: {
  background: "images/backgrounds/nature_hills.png",
  text: `It purrs softly, then darts away—only to return moments later.
Something drops at your feet.`,
  choices: [
    { text: "Pick it up", next: "small_creature_pickup", gain: { strength: 1, endurance: 1 } },
    { text: "Ignore it", next: "small_creature_ignore" }
  ]
},

small_creature_no_pet: {
  background: "images/backgrounds/nature_hills.png",
  text: `You step back.
The creature looks disappointed—then vanishes into the forest.`,
  choices: [{ text: "Continue", next: "chapter1_escape3" }]
},

small_creature_pickup: {
  background: "images/backgrounds/nature_hills.png",
  text: `You pick it up—a small blade, perfectly balanced.
You slip it into your pack.`,
  choices: [{ text: "Continue", next: "chapter1_escape3" }]
},

small_creature_ignore: {
  background: "images/backgrounds/nature_hills.png",
  text: `You leave it where it lies and move on.`,
  choices: [{ text: "Continue", next: "chapter1_escape3" }]
},

chapter1_escape3: {
  background: "images/backgrounds/pretty_skies.png",
  transition: "background",
  text: `Hours later, buildings rise ahead. The town.
You find shelter and finally allow yourself to rest.
Tomorrow, your journey continues.`,
  choices: [{ text: "Continue", next: "chapter2_town0" }]
}

};