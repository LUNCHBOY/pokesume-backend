/**
 * GAME EVENTS
 * Random events and hangout events for career mode
 */

const RANDOM_EVENTS = {
  // Stat increase events (10) - Stats reduced by 50%
  wildEncounter: {
    type: 'stat_increase',
    name: 'Wild Pokemon Spar',
    description: 'A friendly wild Pokemon wants to battle for fun!',
    effect: { HP: 2, Attack: 1, Defense: 1, Instinct: 1, Speed: 1 }
  },
  trainingDummies: {
    type: 'stat_increase',
    name: 'Training Dummies',
    description: 'You find a set of battle training dummies at the Pokemon Center!',
    effect: { HP: 3, Attack: 2, Defense: 2, Instinct: 2, Speed: 1 }
  },
  climbingRocks: {
    type: 'stat_increase',
    name: 'Rock Climb Practice',
    description: 'Practicing Rock Climb on Mt. Moon has toughened you up!',
    effect: { HP: 4, Defense: 2, Speed: 2 }
  },
  psychicMeditation: {
    type: 'stat_increase',
    name: 'Psychic Training',
    description: 'A Psychic-type trainer teaches you meditation techniques!',
    effect: { Instinct: 3, Defense: 1, Speed: 1 }
  },
  cyclingRoad: {
    type: 'stat_increase',
    name: 'Cycling Road Sprint',
    description: 'Racing down Cycling Road has boosted your speed!',
    effect: { Speed: 4, Instinct: 2, HP: 1 }
  },
  fightingDojo: {
    type: 'stat_increase',
    name: 'Fighting Dojo Session',
    description: 'Training with Fighting-types at the dojo increased your power!',
    effect: { Attack: 3, HP: 2, Defense: 1 }
  },
  doubleTeam: {
    type: 'stat_increase',
    name: 'Double Team Training',
    description: 'Practicing evasion techniques has sharpened your reflexes!',
    effect: { Instinct: 2, Speed: 2, Defense: 1 }
  },
  marathonRun: {
    type: 'stat_increase',
    name: 'Route Marathon',
    description: 'Running the entire length of Route 9 built your endurance!',
    effect: { HP: 5, Speed: 2, Defense: 2 }
  },
  strengthBoulders: {
    type: 'stat_increase',
    name: 'Strength Training',
    description: 'Moving massive boulders with Strength dramatically increased your power!',
    effect: { Attack: 4, Defense: 2, HP: 2 }
  },
  balancedWorkout: {
    type: 'stat_increase',
    name: 'Balanced Training',
    description: 'A well-rounded training session at the gym improved all your stats!',
    effect: { HP: 2, Attack: 1, Defense: 1, Instinct: 1, Speed: 1 }
  },
  
  // Choice events with risk/reward (25) - Stats reduced by 50%
  mysteriousItem: {
    type: 'choice',
    name: 'Strange Berry',
    description: 'You found a strange berry on the path! Your Pokemon sniffs it curiously.',
    choices: [
      {
        text: 'Let your Pokemon eat it (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { stats: { HP: 12, Attack: 6, Defense: 6, Instinct: 6, Speed: 6 } }, flavor: 'Jackpot! It was a rare Liechi Berry! Your Pokemon feels incredibly powerful!' },
          { chance: 0.5, effect: { stats: { HP: -4, Attack: -2, Defense: -2 }, energy: -15 }, flavor: 'Ugh! That berry was poisonous! Your Pokemon feels terrible!' }
        ]
      },
      {
        text: 'Save it for later (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 11 }, flavor: 'You preserve it properly for a meal later, recovering energy.' }
        ]
      }
    ]
  },
  crossroads: {
    type: 'choice',
    name: 'Route Split',
    description: 'The route splits ahead. Which path will you and your Pokemon take?',
    choices: [
      {
        text: 'Rocky mountain trail',
        outcomes: [
          { chance: 1.0, effect: { stats: { HP: 8, Defense: 5, Attack: 3 } }, flavor: 'The tough terrain provides excellent training for your Pokemon!' }
        ]
      },
      {
        text: 'Shaded forest path',
        outcomes: [
          { chance: 1.0, effect: { energy: 10, skillPoints: 5 }, flavor: 'The peaceful walk through the forest helps you rest and reflect.' }
        ]
      }
    ]
  },
  strangerGift: {
    type: 'choice',
    name: 'Helpful Trainer',
    description: 'A friendly trainer offers to share some items. Accept their generosity?',
    choices: [
      {
        text: 'Accept the items',
        outcomes: [
          { chance: 1.0, effect: { stats: { HP: 3, Attack: 2, Defense: 2 } }, flavor: 'They gave you protein supplements! Your Pokemon grows stronger!' }
        ]
      },
      {
        text: 'Politely decline',
        outcomes: [
          { chance: 1.0, effect: { energy: 8, skillPoints: 5 }, flavor: 'You maintain your independence and feel energized by self-reliance.' }
        ]
      }
    ]
  },
  ancientRuins: {
    type: 'choice',
    name: 'Ancient Ruins',
    description: 'You discover ancient ruins with mysterious Unown symbols carved into stone. Investigate?',
    choices: [
      {
        text: 'Touch the symbols',
        outcomes: [
          { chance: 1.0, effect: { stats: { HP: 5, Instinct: 4, Speed: 4 } }, flavor: 'The ancient power flows into your Pokemon, awakening hidden potential!' }
        ]
      },
      {
        text: 'Just observe carefully',
        outcomes: [
          { chance: 1.0, effect: { skillPoints: 10, energy: 5 }, flavor: 'You sketch the symbolsâ€”valuable knowledge that grants understanding!' }
        ]
      }
    ]
  },
  trainingOffer: {
    type: 'choice',
    name: 'Veteran Trainer Challenge',
    description: 'A battle-scarred Ace Trainer offers to train with you. It looks intense...',
    choices: [
      {
        text: 'Accept the training (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { stats: { Attack: 12, Speed: 9, Instinct: 6 } }, flavor: 'Incredible training! You learn advanced techniques from the veteran!' },
          { chance: 0.5, effect: { stats: { HP: -6, Defense: -3 }, energy: -22 }, flavor: 'The training was too brutal! Your Pokemon is exhausted and hurt!' }
        ]
      },
      {
        text: 'Train on your own (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 10, skillPoints: 4 }, flavor: 'You follow your own proven training regimen with good results.' }
        ]
      }
    ]
  },
  competitionInvite: {
    type: 'choice',
    name: 'Local Tournament',
    description: 'A Pokemon battle tournament is happening at the local stadium! Entry fee is just your time and energy.',
    choices: [
      {
        text: 'Enter the tournament',
        outcomes: [
          { chance: 1.0, effect: { stats: { Attack: 5, Instinct: 4, Speed: 4 } }, flavor: 'You make it to semifinals! Great battle experience gained!' }
        ]
      },
      {
        text: 'Watch from the stands',
        outcomes: [
          { chance: 1.0, effect: { skillPoints: 10, energy: 8 }, flavor: 'You take notes on advanced strategiesâ€”very educational!' }
        ]
      }
    ]
  },
  mysteriousCave: {
    type: 'choice',
    name: 'Dark Cave',
    description: 'A pitch-black cave entrance looms ahead. Your Pokemon hesitates...',
    choices: [
      {
        text: 'Explore the cave (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { stats: { HP: 9, Attack: 9, Instinct: 9 }, skillPoints: 19 }, flavor: 'You find a hidden chamber with rare evolutionary stones! Incredible!' },
          { chance: 0.5, effect: { stats: { HP: -6, Defense: -4 }, energy: -19 }, flavor: 'Wild Zubat swarm attacks! You barely escape!' }
        ]
      },
      {
        text: 'Camp outside instead (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 14 }, flavor: 'You set up camp and enjoy a peaceful night under the stars.' }
        ]
      }
    ]
  },
  riverCrossing: {
    type: 'choice',
    name: 'Rushing River',
    description: 'A wide river blocks your path. Can your Pokemon help you cross?',
    choices: [
      {
        text: 'Use Surf to cross',
        outcomes: [
          { chance: 1.0, effect: { stats: { HP: 5, Speed: 4, Defense: 4 } }, flavor: 'Your Pokemon powers through the currentâ€”excellent water training!' }
        ]
      },
      {
        text: 'Look for a bridge',
        outcomes: [
          { chance: 1.0, effect: { energy: 8, skillPoints: 5 }, flavor: 'Good thinking! You find a safe bridge and conserve energy.' }
        ]
      }
    ]
  },
  berryBush: {
    type: 'choice',
    name: 'Wild Berry Bush',
    description: 'You spot a bush full of colorful berries your Pokemon seems interested in!',
    choices: [
      {
        text: 'Let Pokemon eat them (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { stats: { HP: 15, Instinct: 7 }, energy: 28 }, flavor: 'They were premium Oran Berries! Your Pokemon is fully revitalized!' },
          { chance: 0.5, effect: { stats: { HP: -4 }, energy: -19 }, flavor: 'Those were bitter Razz Berriesâ€”your Pokemon feels sick!' }
        ]
      },
      {
        text: 'Pick some for later (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 11 }, flavor: 'You harvest several berries for the road ahead.' }
        ]
      }
    ]
  },
  hauntedForest: {
    type: 'choice',
    name: 'Lavender Town Woods',
    description: 'This forest near Lavender Town is rumored to have Ghost-types. Proceed anyway?',
    choices: [
      {
        text: 'Venture through',
        outcomes: [
          { chance: 1.0, effect: { stats: { Instinct: 6, Speed: 4, Attack: 2 } }, flavor: 'Your Pokemon bonds with wild Gastly! What an amazing experience!' }
        ]
      },
      {
        text: 'Take the long route',
        outcomes: [
          { chance: 1.0, effect: { energy: 10, skillPoints: 5 }, flavor: 'Better safe than sorryâ€”you take a safer path and stay fresh.' }
        ]
      }
    ]
  },
  battleTournament: {
    type: 'choice',
    name: 'Battle Frontier',
    description: 'A Battle Frontier facility is holding trials today! Want to participate?',
    choices: [
      {
        text: 'Register and compete',
        outcomes: [
          { chance: 1.0, effect: { stats: { Attack: 5, Speed: 4, Instinct: 4 } }, flavor: 'You win several matches! Great battle experience!' }
        ]
      },
      {
        text: 'Skip it',
        outcomes: [
          { chance: 1.0, effect: { energy: 11 }, flavor: 'You skip it and save your energy for upcoming challenges.' }
        ]
      }
    ]
  },
  picnicArea: {
    type: 'choice',
    name: 'Trainer Picnic',
    description: 'Trainers are having a Pokemon picnic! Join them?',
    choices: [
      {
        text: 'Join the picnic',
        outcomes: [
          { chance: 1.0, effect: { stats: { HP: 6, Defense: 4 } }, flavor: 'The homemade Poffins provide excellent nutrition!' }
        ]
      },
      {
        text: 'Eat moderately',
        outcomes: [
          { chance: 1.0, effect: { energy: 10, skillPoints: 5 }, flavor: 'You snack lightly while chatting with trainersâ€”nice break!' }
        ]
      }
    ]
  },
  trainingManual: {
    type: 'choice',
    name: 'Champion\'s Guide',
    description: 'You find a worn training manual written by a Pokemon Champion. Read it?',
    choices: [
      {
        text: 'Study intensely',
        outcomes: [
          { chance: 1.0, effect: { stats: { Instinct: 6, Attack: 5 } }, flavor: 'The Champion\'s strategies are brilliant! You learn so much!' }
        ]
      },
      {
        text: 'Skim through it',
        outcomes: [
          { chance: 1.0, effect: { skillPoints: 12, energy: 8 }, flavor: 'You pick up several useful battle tips from skimming it.' }
        ]
      }
    ]
  },
  stormWarning: {
    type: 'choice',
    name: 'Incoming Storm',
    description: 'Dark clouds gather. Train in the rain or find shelter at the Pokemon Center?',
    choices: [
      {
        text: 'Train in the rain',
        outcomes: [
          { chance: 1.0, effect: { stats: { HP: 6, Defense: 5, Instinct: 4 } }, flavor: 'Training in the storm tempers your body and mind like steel!' }
        ]
      },
      {
        text: 'Take shelter',
        outcomes: [
          { chance: 1.0, effect: { energy: 15 }, flavor: 'You rest comfortably as the storm rages outside.' }
        ]
      }
    ]
  },
  lostChild: {
    type: 'choice',
    name: 'Lost Child',
    description: 'A child is lost and crying for their Pikachu. Help them search?',
    choices: [
      {
        text: 'Search for the Pokemon',
        outcomes: [
          { chance: 1.0, effect: { stats: { Instinct: 4, HP: 4 }, skillPoints: 8 }, flavor: 'You find their Pikachu! The grateful parent rewards you!' }
        ]
      },
      {
        text: 'Keep moving',
        outcomes: [
          { chance: 1.0, effect: { energy: 8, stats: { Attack: 3, Speed: 3 } }, flavor: 'You focus on your own journey, making steady progress.' }
        ]
      }
    ]
  },
  moveTutor: {
    type: 'choice',
    name: 'Move Tutor',
    description: 'A mysterious Move Tutor offers to teach a powerful move. It might be risky though...',
    choices: [
      {
        text: 'Learn the move (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { stats: { Attack: 12, Instinct: 9 }, skillPoints: 25 }, flavor: 'You master the secret technique! Devastating new power unlocked!' },
          { chance: 0.5, effect: { stats: { HP: -6, Defense: -4, Attack: -3 } }, flavor: 'The technique backfires horribly, leaving you worse than before!' }
        ]
      },
      {
        text: 'Pass on it (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 10, skillPoints: 5 }, flavor: 'You decline the risk, trusting in your proven methods.' }
        ]
      }
    ]
  },
  healingSpring: {
    type: 'choice',
    name: 'Hot Spring',
    description: 'A natural hot spring is said to restore Pokemon vitality. Try it?',
    choices: [
      {
        text: 'Bathe in the spring',
        outcomes: [
          { chance: 1.0, effect: { stats: { HP: 7, Defense: 6 } }, flavor: 'The mineral-rich waters invigorate and strengthen your Pokemon!' }
        ]
      },
      {
        text: 'Rest on the shore',
        outcomes: [
          { chance: 1.0, effect: { energy: 13 }, flavor: 'You rest beside the spring, enjoying the peaceful ambiance.' }
        ]
      }
    ]
  },
  aceTrainerBattle: {
    type: 'choice',
    name: 'Ace Trainer Battle',
    description: 'An Ace Trainer challenges you to a serious practice battle!',
    choices: [
      {
        text: 'Accept the battle',
        outcomes: [
          { chance: 1.0, effect: { stats: { Attack: 6, Defense: 5, Instinct: 5 } }, flavor: 'You hold your own against the elite! Advanced techniques learned!' }
        ]
      },
      {
        text: 'Decline and watch',
        outcomes: [
          { chance: 1.0, effect: { skillPoints: 15, energy: 10 }, flavor: 'You watch carefully, absorbing their masterful technique.' }
        ]
      }
    ]
  },
  itemfinderPing: {
    type: 'choice',
    name: 'Itemfinder Signal',
    description: 'Your Itemfinder is beeping! There might be rare items buried in a dangerous area nearby.',
    choices: [
      {
        text: 'Dig for items (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { skillPoints: 31, stats: { HP: 9 } }, flavor: 'You unearth a cache of Rare Candies and TMs! Amazing find!' },
          { chance: 0.5, effect: { stats: { HP: -7, Defense: -4 }, energy: -22 }, flavor: 'It was a Voltorb nest! You escape but worse for wear!' }
        ]
      },
      {
        text: 'Skip the search (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 11, stats: { Defense: 3 } }, flavor: 'You wisely ignore the too-good-to-be-true signal and stay safe.' }
        ]
      }
    ]
  },
  professorLecture: {
    type: 'choice',
    name: 'Professor\'s Lecture',
    description: 'A renowned Pokemon Professor is giving a lecture on battle strategy!',
    choices: [
      {
        text: 'Attend the lecture',
        outcomes: [
          { chance: 1.0, effect: { stats: { Instinct: 7, Defense: 5 }, skillPoints: 12 }, flavor: 'The Professor\'s wisdom opens your mind to new strategies!' }
        ]
      },
      {
        text: 'Pass on it',
        outcomes: [
          { chance: 1.0, effect: { energy: 10, stats: { Speed: 4 } }, flavor: 'You politely decline and continue training at your own pace.' }
        ]
      }
    ]
  },
  speedChallenge: {
    type: 'choice',
    name: 'Rapidash Race',
    description: 'A trainer with a Rapidash challenges you to a speed contest!',
    choices: [
      {
        text: 'Accept the race',
        outcomes: [
          { chance: 1.0, effect: { stats: { Speed: 7, Instinct: 5 } }, flavor: 'You keep pace with Rapidash, proving your superior speed!' }
        ]
      },
      {
        text: 'Decline politely',
        outcomes: [
          { chance: 1.0, effect: { energy: 11 }, flavor: 'You conserve your energy, knowing when to compete and when to rest.' }
        ]
      }
    ]
  },
  hotSprings: {
    type: 'choice',
    name: 'Lavaridge Hot Springs',
    description: 'The famous Lavaridge hot springs are nearby! They might help your Pokemon recover...',
    choices: [
      {
        text: 'Take a dip (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { stats: { HP: 18, Attack: 12, Instinct: 9 } }, flavor: 'The legendary springs grant your Pokemon incredible power!' },
          { chance: 0.5, effect: { stats: { HP: -6, Attack: -5 }, energy: -19 }, flavor: 'The springs were cursed by a Hex! Your Pokemon weakens!' }
        ]
      },
      {
        text: 'Rest on the shore (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 14, skillPoints: 5 }, flavor: 'You resist temptation and rest safely nearby.' }
        ]
      }
    ]
  },
  toughBattle: {
    type: 'choice',
    name: 'Intense Training Match',
    description: 'A skilled trainer offers an intense practice battle! It will push you hard.',
    choices: [
      {
        text: 'Maximum effort',
        outcomes: [
          { chance: 1.0, effect: { stats: { Speed: 6, Attack: 5, Instinct: 5 } }, flavor: 'You complete the match flawlessly, proving your capabilities!' }
        ]
      },
      {
        text: 'Moderate pace',
        outcomes: [
          { chance: 1.0, effect: { energy: 11, stats: { HP: 4, Defense: 4 } }, flavor: 'Slow and steady wins the raceâ€”you train safely.' }
        ]
      }
    ]
  },
  luckyEgg: {
    type: 'choice',
    name: 'Lucky Egg Vendor',
    description: 'A vendor is selling a mysterious Lucky Egg. Worth trying?',
    choices: [
      {
        text: 'Buy the Lucky Egg',
        outcomes: [
          { chance: 1.0, effect: { stats: { Instinct: 5, HP: 5 }, skillPoints: 10 }, flavor: 'The Lucky Egg works! You feel fortune smiling upon you!' }
        ]
      },
      {
        text: 'Don\'t buy it',
        outcomes: [
          { chance: 1.0, effect: { skillPoints: 8, energy: 8 }, flavor: 'You save your resources, trusting in your own abilities.' }
        ]
      }
    ]
  },
  wildcardEvent: {
    type: 'choice',
    name: 'Random Encounter',
    description: 'Something unexpected happens ahead! What could it be?',
    choices: [
      {
        text: 'Investigate (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { stats: { HP: 15, Attack: 12, Defense: 9, Instinct: 9, Speed: 9 } }, flavor: 'Fortune favors the bold! Everything goes perfectly!' },
          { chance: 0.5, effect: { stats: { HP: -8, Attack: -6, Defense: -5 }, energy: -22 }, flavor: 'Your gamble backfires spectacularlyâ€”sometimes caution is best!' }
        ]
      },
      {
        text: 'Ignore it (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 11, stats: { HP: 4, Defense: 3 } }, flavor: 'You choose the safe path, making modest but reliable progress.' }
        ]
      }
    ]
  },
  
  // Battle events (5) - Difficulty between 1.0x and 1.25x of baseline wild pokemon
  // Win: no energy cost, gain +15 to all stats. Loss: costs 20 energy.
  championChallenge: {
    type: 'battle',
    name: 'Champion Challenge',
    description: 'A powerful wandering Champion challenges you!',
    difficulty: 1.15
  },
  eliteWarrior: {
    type: 'battle',
    name: 'Elite Four Member',
    description: 'An Elite Four member is training here and wants to battle!',
    difficulty: 1.20
  },
  legendaryPokemon: {
    type: 'battle',
    name: 'Legendary Pokemon',
    description: 'A legendary Pokemon appears before you!',
    difficulty: 1.25
  },
  rivalAppears: {
    type: 'battle',
    name: 'Rival Battle',
    description: 'Your rival shows up demanding a battle!',
    difficulty: 1.05
  },
  ancientGuardian: {
    type: 'battle',
    name: 'Ruin Guardian',
    description: 'An ancient guardian Golem awakens to test you!',
    difficulty: 1.20
  },

  // Negative events (10) - Stats reduced by 50%
  injury: {
    type: 'negative',
    name: 'Training Injury',
    description: 'You pushed too hard and your Pokemon got injured!',
    effect: { stats: { HP: -3, Attack: -2, Defense: -2 }, energy: -11 }
  },
  fatigue: {
    type: 'negative',
    name: 'Exhaustion',
    description: 'The intense training has left you and your Pokemon exhausted.',
    effect: { energy: -19 }
  },
  pokerus: {
    type: 'negative',
    name: 'Pokerus Infection',
    description: 'Your Pokemon caught a mild case of Pokerus and needs rest.',
    effect: { stats: { HP: -4, Speed: -2 }, energy: -15 }
  },
  badFood: {
    type: 'negative',
    name: 'Spoiled Berries',
    description: 'You ate spoiled berries and feel terrible.',
    effect: { stats: { HP: -5, Defense: -2 }, energy: -22 }
  },
  accident: {
    type: 'negative',
    name: 'Training Accident',
    description: 'A training accident with your Pokemon has set you back.',
    effect: { stats: { HP: -6, Attack: -3 }, energy: -15 }
  },
  weatherDelay: {
    type: 'negative',
    name: 'Sandstorm',
    description: 'A terrible sandstorm prevents proper training.',
    effect: { energy: -22 }
  },
  equipmentBreak: {
    type: 'negative',
    name: 'Broken TM',
    description: 'Your TM breaks during training!',
    effect: { stats: { Attack: -2, Defense: -2 }, skillPoints: -5 }
  },
  distraction: {
    type: 'negative',
    name: 'Wild Pokemon Swarm',
    description: 'A swarm of wild Zubat has wasted your time.',
    effect: { energy: -15, skillPoints: -3 }
  },
  badLuck: {
    type: 'negative',
    name: 'Unlucky Day',
    description: 'Everything seems to go wrong today.',
    effect: { stats: { HP: -2, Attack: -1, Defense: -1, Instinct: -1, Speed: -1 } }
  },
  overtraining: {
    type: 'negative',
    name: 'Overtraining',
    description: 'You overtrained your Pokemon and it needs serious rest.',
    effect: { stats: { HP: -4, Speed: -3 }, energy: -26 }
  }
};

const HANGOUT_EVENTS = {
  Cynthia: {
    name: 'Champion\'s Masterclass',
    description: 'Cynthia invites you to train with her!',
    flavor: 'Cynthia demonstrates overwhelming power. "True strength comes from understanding your partner," she says with a serene smile.',
    effect: { stats: { Attack: 15, Instinct: 10 }, moveHint: 'DragonClaw', energy: 20 }
  },
  Fire: {
    name: 'Silent Training',
    description: 'The legendary Red gestures for you to join his training.',
    flavor: 'Red says nothing, but his fierce determination speaks volumes. You feel inspired by his quiet intensity.',
    effect: { stats: { Attack: 16, Instinct: 12 }, moveHint: 'FlareBlitz', skillPoints: 15 }
  },
  Steven: {
    name: 'Stone Analysis Session',
    description: 'Steven shares his geological expertise and defensive tactics.',
    flavor: 'Steven examines rare stones while demonstrating impenetrable defense. "Patience and precision win battles," he explains.',
    effect: { stats: { Defense: 17, Instinct: 10 }, moveHint: 'IronHead', energy: 18 }
  },
  Lance: {
    name: 'Dragon Tamer\'s Wisdom',
    description: 'Lance shares secrets of dragon-type mastery.',
    flavor: 'Lance soars majestically overhead. "Dragons respond to those with true conviction," he declares.',
    effect: { stats: { Attack: 12, Instinct: 14 }, moveHint: 'DragonClaw', skillPoints: 12 }
  },
  Misty: {
    name: 'Water Ballet Practice',
    description: 'Misty teaches elegant water-type techniques.',
    flavor: 'Misty performs graceful aquatic maneuvers. "Water flows effortlesslyâ€”your training should too!" she chirps.',
    effect: { stats: { Instinct: 11, Speed: 8 }, moveHint: 'Surf', energy: 15 }
  },
  Brock: {
    name: 'Rock Solid Defense',
    description: 'Brock demonstrates endurance training.',
    flavor: 'Brock stands unmovable like a mountain. "Defense isn\'t just blockingâ€”it\'s outlasting!" he teaches firmly.',
    effect: { stats: { HP: 12, Defense: 14 }, moveHint: 'RockSlide', energy: 16 }
  },
  Erika: {
    name: 'Garden Meditation',
    description: 'Erika invites you to her peaceful garden training.',
    flavor: 'Surrounded by blooming flowers, Erika teaches harmony with nature. "Growth requires patience," she whispers.',
    effect: { stats: { HP: 14, Defense: 10 }, energy: 20 }
  },
  Sabrina: {
    name: 'Psychic Awakening',
    description: 'Sabrina helps unlock your Pokemon\'s mental potential.',
    flavor: 'Psychic energy fills the room. "The mind is the strongest muscle," Sabrina says cryptically.',
    effect: { stats: { Instinct: 16, Speed: 9 }, moveHint: 'Psychic', skillPoints: 13 }
  },
  Blaine: {
    name: 'Volcanic Training',
    description: 'Blaine\'s fiery enthusiasm ignites your passion!',
    flavor: 'Flames roar as Blaine cackles. "Hot-headed? Maybe! But that heat forges champions!" he bellows.',
    effect: { stats: { Attack: 13, Instinct: 9 }, moveHint: 'Flamethrower', energy: 14 }
  },
  Koga: {
    name: 'Ninja Techniques',
    description: 'Koga teaches tactical maneuvering and precision.',
    flavor: 'Koga moves with ninja precision. "Strike from the shadows," he whispers.',
    effect: { stats: { Instinct: 11, Speed: 10 }, moveHint: 'SludgeBomb', energy: 13 }
  },
  Whitney: {
    name: 'Endurance Run',
    description: 'Whitney challenges you to a stamina-building session!',
    flavor: 'Whitney giggles, "Stamina wins the long gameâ€”just keep going!"',
    effect: { stats: { HP: 10, Defense: 8 }, energy: 16 }
  },
  Morty: {
    name: 'Spirit Connection',
    description: 'Morty communes with ghost-type energies.',
    flavor: 'Morty meditates. "The bond between worlds strengthens the spirit," he murmurs.',
    effect: { stats: { Instinct: 12, Speed: 9 }, moveHint: 'ShadowBall', skillPoints: 11 }
  },
  Chuck: {
    name: 'Waterfall Training',
    description: 'Chuck\'s intense martial arts under a waterfall!',
    flavor: 'Chuck roars, "Strength and disciplineâ€”that\'s the warrior\'s way!"',
    effect: { stats: { HP: 9, Attack: 11 }, moveHint: 'DynamicPunch', energy: 14 }
  },
  Jasmine: {
    name: 'Steel Resolve',
    description: 'Jasmine demonstrates unwavering defensive tactics.',
    flavor: 'Jasmine speaks softly, "True strength means protecting what matters most."',
    effect: { stats: { HP: 10, Defense: 12 }, moveHint: 'IronTail', energy: 15 }
  },
  Pryce: {
    name: 'Gift of Rest',
    description: 'Pryce shares wisdom on recovery and preparation.',
    flavor: 'Pryce smiles warmly. "Rest is not weaknessâ€”it\'s strategic preparation," he advises.',
    effect: { stats: { HP: 8 }, energy: 25 }
  },
  Wallace: {
    name: 'Elegant Performance',
    description: 'Wallace showcases the art of beauty and strength.',
    flavor: 'Wallace beams, "True champions combine elegance with power!"',
    effect: { stats: { HP: 11, Defense: 12 }, moveHint: 'HydroPump', energy: 17 }
  },
  Winona: {
    name: 'Aerial Maneuvers',
    description: 'Winona teaches swift flying techniques.',
    flavor: 'Winona calls out, "Speed and grace dominate the skies!"',
    effect: { stats: { Defense: 10, Speed: 12 }, moveHint: 'SteelWing', energy: 14 }
  },
  Wattson: {
    name: 'Electric Circuit Training',
    description: 'Wattson\'s shocking workout charges you up!',
    flavor: 'Wattson laughs heartily. "Wahahaha! Feel the voltage!" he exclaims.',
    effect: { stats: { Instinct: 10, Speed: 8 }, moveHint: 'Thunderbolt', energy: 13 }
  },
  Flannery: {
    name: 'Explosive Power',
    description: 'Flannery demonstrates volcanic offensive tactics.',
    flavor: 'Flannery pumps her fist. "Burn bright and strike hard!" she shouts enthusiastically.',
    effect: { stats: { HP: 9, Attack: 11 }, moveHint: 'Earthquake', energy: 14 }
  },
  N: {
    name: 'Truth\'s Flame',
    description: 'N shares ideals with legendary power.',
    flavor: 'N speaks passionately, "Only through honesty can Pokemon and trainer unite!"',
    effect: { stats: { Attack: 14, Instinct: 12 }, moveHint: 'BlueFlare', skillPoints: 16 }
  },
  Iris: {
    name: 'Dragon Dance',
    description: 'Iris teaches fierce dragon-type combat techniques.',
    flavor: 'Iris cheers. "Dragons never back downâ€”show your fighting spirit!" she yells excitedly.',
    effect: { stats: { Attack: 14, Speed: 11 }, moveHint: 'DragonClaw', energy: 16 }
  },
  Karen: {
    name: 'Dark Arts Mastery',
    description: 'Karen reveals the strength of dark-type strategy.',
    flavor: 'Karen smirks, "Winning isn\'t about typeâ€”it\'s about strategy and bond."',
    effect: { stats: { Defense: 11, Instinct: 10 }, moveHint: 'DarkPulse', skillPoints: 12 }
  },
  Agatha: {
    name: 'Spectral Training',
    description: 'Agatha teaches ancient ghost-type techniques.',
    flavor: 'Agatha cackles. "Fear is a weaponâ€”use it wisely!" she says ominously.',
    effect: { stats: { Instinct: 12, Speed: 9 }, moveHint: 'ShadowBall', energy: 13 }
  },
  Water: {
    name: 'Rival\'s Challenge',
    description: 'Blue pushes you to exceed your limits.',
    flavor: 'Blue smirks, "Smell ya laterâ€”unless you can actually keep up!" he taunts.',
    effect: { stats: { Attack: 11, Speed: 12 }, moveHint: 'AerialAce', skillPoints: 13 }
  },
  Giovanni: {
    name: 'Ruthless Tactics',
    description: 'Giovanni demonstrates calculated dominance.',
    flavor: 'Giovanni states coldly, "Power respects only power. Show no mercy."',
    effect: { stats: { Attack: 13, Instinct: 10 }, moveHint: 'PayDay', skillPoints: 14 }
  },
  ProfessorOak: {
    name: 'Legendary Research',
    description: 'Professor Oak shares knowledge with you.',
    flavor: 'Oak beams. "The bond between Pokemon and trainer transcends science!" he declares.',
    effect: { stats: { Instinct: 14, Speed: 10 }, skillPoints: 18, energy: 20 }
  },
  Diantha: {
    name: 'Dazzling Showcase',
    description: 'Diantha performs with brilliance.',
    flavor: 'Diantha smiles, "A champion shines brightest under pressureâ€”be dazzling!"',
    effect: { stats: { HP: 12, Defense: 15 }, moveHint: 'DiamondStorm', energy: 18 }
  },
  Maxie: {
    name: 'Land Expansion',
    description: 'Maxie demonstrates earth-shaking power.',
    flavor: 'Maxie declares, "The land itself will bow to our strength!"',
    effect: { stats: { HP: 11, Attack: 13 }, moveHint: 'Earthquake', energy: 16 }
  },
  Archie: {
    name: 'Ocean\'s Depth',
    description: 'Archie channels the power of the seas.',
    flavor: 'Archie roars, "The ocean\'s fury is unstoppableâ€”embrace its power!"',
    effect: { stats: { HP: 13, Defense: 11 }, moveHint: 'HydroPump', energy: 17 }
  },
  // ============================================================================
  // NEW GENERATION TRAINERS (Galar, Paldea, DLC)
  // ============================================================================
  Leon: {
    name: 'Champion Time',
    description: 'Leon demonstrates his undefeated battling style.',
    flavor: 'Leon strikes his signature pose. "Let\'s have a champion time!" he exclaims with infectious enthusiasm.',
    effect: { stats: { Attack: 15, Speed: 10 }, moveHint: 'FlareBlitz', energy: 18 }
  },
  Selene: {
    name: 'Moonlit Training',
    description: 'Selene shares the mystical power of Alola\'s moon.',
    flavor: 'Selene gazes at the moon. "The night reveals hidden strength," she whispers serenely.',
    effect: { stats: { Instinct: 14, Defense: 10 }, moveHint: 'Moonblast', skillPoints: 14 }
  },
  Gloria: {
    name: 'Sword & Shield',
    description: 'Gloria teaches balanced offensive and defensive techniques.',
    flavor: 'Gloria readies her stance. "A true champion masters both attack and defense!" she declares.',
    effect: { stats: { Attack: 14, Defense: 11 }, moveHint: 'BehemothBlade', energy: 16 }
  },
  Nemona: {
    name: 'Battle Enthusiasm',
    description: 'Nemona\'s endless energy is contagious!',
    flavor: 'Nemona bounces excitedly. "Another battle?! Yes! Let\'s go, let\'s GO!" she cheers.',
    effect: { stats: { Speed: 14, Attack: 10 }, moveHint: 'CloseCombat', energy: 20 }
  },
  Mustard: {
    name: 'Dojo Training',
    description: 'Mustard shares ancient martial arts wisdom.',
    flavor: 'Mustard strokes his mustache. "True power flows from inner peace," he teaches calmly.',
    effect: { stats: { Attack: 16, HP: 8 }, moveHint: 'CloseCombat', skillPoints: 14 }
  },
  Victor: {
    name: 'Dynamax Power',
    description: 'Victor demonstrates the power of Dynamax energy.',
    flavor: 'Victor channels Dynamax energy. "Feel the power surge through you!" he shouts.',
    effect: { stats: { Instinct: 12, HP: 12 }, moveHint: 'DynamaxCannon', energy: 18 }
  },
  Arven: {
    name: 'Picnic Break',
    description: 'Arven prepares a restorative meal for you and your Pokemon.',
    flavor: 'Arven serves his signature sandwich. "Food is the best medicineâ€”eat up!" he says warmly.',
    effect: { stats: { HP: 16, Defense: 8 }, energy: 25 }
  },
  Penny: {
    name: 'Team Star Strategy',
    description: 'Penny shares tactical insights from leading Team Star.',
    flavor: 'Penny types rapidly. "Analyzing battle data... found optimal strategy!" she reports.',
    effect: { stats: { Defense: 14, Instinct: 10 }, moveHint: 'Moonblast', skillPoints: 12 }
  },
  Sonia: {
    name: 'Research Session',
    description: 'Sonia shares her latest Pokemon research findings.',
    flavor: 'Sonia\'s eyes light up. "I\'ve discovered something fascinatingâ€”look at this data!" she exclaims.',
    effect: { stats: { Instinct: 15, Speed: 9 }, skillPoints: 18, energy: 16 }
  },
  Hop: {
    name: 'Rival\'s Determination',
    description: 'Hop\'s boundless optimism inspires you to train harder.',
    flavor: 'Hop pumps his fist. "We\'re going to be the greatest! Just you wait!" he declares.',
    effect: { stats: { HP: 14, Attack: 10 }, moveHint: 'BehemothBash', energy: 18 }
  },
  Geeta: {
    name: 'Top Champion\'s Guidance',
    description: 'Geeta provides strategic wisdom from her championship experience.',
    flavor: 'Geeta nods approvingly. "Precision and patience define a true champion," she advises.',
    effect: { stats: { Instinct: 14, Defense: 10 }, moveHint: 'SwordsDance', skillPoints: 15 }
  },
  Kieran: {
    name: 'Crystalline Focus',
    description: 'Kieran channels intense determination into training.',
    flavor: 'Kieran\'s eyes burn with intensity. "I won\'t lose againâ€”not to anyone!" he vows.',
    effect: { stats: { Instinct: 13, Attack: 11 }, moveHint: 'TeraStarstorm', energy: 17 }
  },
  Carmine: {
    name: 'Festival Dance',
    description: 'Carmine teaches the traditional Kitakami festival dances.',
    flavor: 'Carmine spins gracefully. "The mask festival honors our bond with Pokemon!" she explains.',
    effect: { stats: { Speed: 14, Attack: 10 }, moveHint: 'IvyCudgel', energy: 16 }
  },
  Drayton: {
    name: 'Laid-Back Lesson',
    description: 'Drayton shares surprisingly effective lazy training methods.',
    flavor: 'Drayton yawns. "Sometimes the best strategy is to let your opponent tire themselves out," he mumbles.',
    effect: { stats: { Defense: 15, HP: 9 }, moveHint: 'DracoMeteor', energy: 18 }
  },
  Lacey: {
    name: 'Elite Drilling',
    description: 'Lacey demonstrates her high-speed ground techniques.',
    flavor: 'Lacey drills through obstacles. "Speed and precisionâ€”that\'s the Blueberry way!" she shouts.',
    effect: { stats: { Speed: 15, Attack: 9 }, moveHint: 'Earthquake', energy: 15 }
  },
  Raihan: {
    name: 'Weather Control',
    description: 'Raihan teaches weather manipulation strategies.',
    flavor: 'Raihan takes a selfie mid-battle. "The forecast? Total domination!" he grins.',
    effect: { stats: { Defense: 13, Instinct: 11 }, moveHint: 'SteelBeam', skillPoints: 13 }
  },
  Marnie: {
    name: 'Punk Rock Power',
    description: 'Marnie shares the strength that comes from unwavering loyalty.',
    flavor: 'Marnie gives a rare smile. "My Pokemon and fans give me strength," she admits quietly.',
    effect: { stats: { Attack: 13, Defense: 11 }, moveHint: 'DarkPulse', energy: 15 }
  },
  Nessa: {
    name: 'Wave Rider Training',
    description: 'Nessa teaches the flow of water-type combat.',
    flavor: 'Nessa poses elegantly. "Ride the waveâ€”don\'t fight against it!" she advises.',
    effect: { stats: { HP: 14, Speed: 10 }, moveHint: 'Liquidation', energy: 16 }
  },
  Bea: {
    name: 'Fighting Spirit',
    description: 'Bea demonstrates intense martial arts training.',
    flavor: 'Bea\'s expression remains stoic. "Emotions are distractions. Focus only on the fight," she instructs.',
    effect: { stats: { Attack: 15, Speed: 9 }, moveHint: 'CloseCombat', energy: 14 }
  },
  Opal: {
    name: 'Fairy Quiz Time',
    description: 'Opal tests your knowledge with her signature quiz.',
    flavor: 'Opal smiles mischievously. "Answer correctly and receive my blessing!" she chuckles.',
    effect: { stats: { HP: 12, Instinct: 12 }, moveHint: 'DazzlingGleam', energy: 18 }
  },
  Piers: {
    name: 'Midnight Concert',
    description: 'Piers performs an energizing midnight concert.',
    flavor: 'Piers strums his guitar. "Music speaks louder than any battle cry," he sings.',
    effect: { stats: { Speed: 14, Instinct: 10 }, moveHint: 'Overdrive', energy: 17 }
  },
  Rika: {
    name: 'Interrogation Training',
    description: 'Rika questions your battle strategies to find weaknesses.',
    flavor: 'Rika leans in curiously. "Interesting strategy... but have you considered this angle?" she probes.',
    effect: { stats: { HP: 13, Defense: 11 }, moveHint: 'Earthquake', skillPoints: 12 }
  },
  Poppy: {
    name: 'Hammer Time',
    description: 'Poppy playfully demonstrates her hammer techniques.',
    flavor: 'Poppy giggles. "Bonk bonk! That\'s how you win battles!" she cheers innocently.',
    effect: { stats: { Defense: 14, Attack: 10 }, moveHint: 'GigatonHammer', energy: 16 }
  },
  Milo: {
    name: 'Farm Fresh Training',
    description: 'Milo shares wholesome farming-inspired training methods.',
    flavor: 'Milo flexes. "Hard work in the fields builds strength and character!" he beams.',
    effect: { stats: { HP: 13, Defense: 11 }, moveHint: 'GigaDrain', energy: 18 }
  },
  Kabu: {
    name: 'Burning Dedication',
    description: 'Kabu demonstrates his legendary training discipline.',
    flavor: 'Kabu nods solemnly. "Dedication burns hotter than any flame," he teaches.',
    effect: { stats: { Attack: 13, HP: 11 }, moveHint: 'Flamethrower', skillPoints: 12 }
  },
  Melony: {
    name: 'Motherly Care',
    description: 'Melony provides warm encouragement and recovery tips.',
    flavor: 'Melony wraps you in a cozy scarf. "Rest wellâ€”tomorrow we train harder!" she says gently.',
    effect: { stats: { HP: 15, Defense: 9 }, energy: 22 }
  },
  Gordie: {
    name: 'Rock Solid Will',
    description: 'Gordie teaches mental toughness through rock climbing.',
    flavor: 'Gordie adjusts his sunglasses. "Nothing breaks someone who stands firm!" he declares.',
    effect: { stats: { Defense: 14, HP: 10 }, moveHint: 'StoneEdge', energy: 15 }
  },
  Klara: {
    name: 'Toxic Charm',
    description: 'Klara teaches the art of misdirection and poison.',
    flavor: 'Klara winks. "A little poison goes a long way, sweetie!" she giggles deviously.',
    effect: { stats: { Defense: 13, Instinct: 11 }, moveHint: 'SludgeBomb', skillPoints: 11 }
  },
  Avery: {
    name: 'Psychic Elegance',
    description: 'Avery demonstrates refined psychic techniques.',
    flavor: 'Avery poses dramatically. "True elegance requires psychic precision!" he proclaims.',
    effect: { stats: { Speed: 13, Instinct: 11 }, moveHint: 'Psychic', energy: 14 }
  },
  Iono: {
    name: 'Stream Special',
    description: 'Iono turns your training into a viral streaming event!',
    flavor: 'Iono points her phone. "What\'s up, everyone?! Today\'s training is LIVE!" she announces.',
    effect: { stats: { Speed: 13, Instinct: 11 }, moveHint: 'Thunderbolt', energy: 19 }
  },
  Grusha: {
    name: 'Cool Composure',
    description: 'Grusha teaches the value of staying cool under pressure.',
    flavor: 'Grusha speaks calmly. "Panic leads to mistakes. Stay frosty," he advises.',
    effect: { stats: { Defense: 13, Speed: 11 }, moveHint: 'IceBeam', energy: 15 }
  }
};

module.exports = {
  RANDOM_EVENTS,
  HANGOUT_EVENTS
};
