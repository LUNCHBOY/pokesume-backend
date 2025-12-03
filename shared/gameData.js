/**
 * POKEMON CAREER GAME - SHARED GAME DATA
 * Complete game data definitions used by both frontend and backend
 * Extracted from App.jsx to ensure consistency across client and server
 */

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const ICONS = {
  SLEEPING: '\u{1F4A4}',
  CHECKMARK: '\u2713',
  CHECK: '\u2713',
  ARROW_RIGHT: '\u2192',
  ARROW_DOUBLE: '\u21D2',
  MULTIPLY: '\u00D7',
  BULLET: '\u2022',
  WARNING: '\u26A0\uFE0F',
  CLOSE: '\u00D7'
};

const EVOLUTION_CONFIG = {
  GRADE_REQUIREMENTS: {
    STAGE_1: 'C',
    STAGE_2: 'A'
  },
  STAT_BOOST: {
    TWO_STAGE: 0.05,
    ONE_STAGE: 0.10
  },
  BASE_STAT_MULTIPLIERS: {
    NO_EVOLUTION: 1.50,
    ONE_EVOLUTION: 1.25,
    TWO_EVOLUTIONS: 1.00
  }
};

const EVOLUTION_CHAINS = {
  'Charmander': { stage1: 'Charmeleon', stage2: 'Charizard', stages: 2 },
  'Squirtle': { stage1: 'Wartortle', stage2: 'Blastoise', stages: 2 },
  'Bulbasaur': { stage1: 'Ivysaur', stage2: 'Venusaur', stages: 2 },
  'Caterpie': { stage1: 'Metapod', stage2: 'Butterfree', stages: 2 },
  'Weedle': { stage1: 'Kakuna', stage2: 'Beedrill', stages: 2 },
  'Pidgey': { stage1: 'Pidgeotto', stage2: 'Pidgeot', stages: 2 },
  'Rattata': { stage1: 'Raticate', stage2: null, stages: 1 },
  'Spearow': { stage1: 'Fearow', stage2: null, stages: 1 },
  'Ekans': { stage1: 'Arbok', stage2: null, stages: 1 },
  'Sandshrew': { stage1: 'Sandslash', stage2: null, stages: 1 },
  'Nidoran♀': { stage1: 'Nidorina', stage2: 'Nidoqueen', stages: 2 },
  'Nidoran♂': { stage1: 'Nidorino', stage2: 'Nidoking', stages: 2 },
  'Vulpix': { stage1: 'Ninetales', stage2: null, stages: 1 },
  'Zubat': { stage1: 'Golbat', stage2: null, stages: 1 },
  'Oddish': { stage1: 'Gloom', stage2: 'Vileplume', stages: 2 },
  'Paras': { stage1: 'Parasect', stage2: null, stages: 1 },
  'Venonat': { stage1: 'Venomoth', stage2: null, stages: 1 },
  'Diglett': { stage1: 'Dugtrio', stage2: null, stages: 1 },
  'Meowth': { stage1: 'Persian', stage2: null, stages: 1 },
  'Psyduck': { stage1: 'Golduck', stage2: null, stages: 1 },
  'Mankey': { stage1: 'Primeape', stage2: null, stages: 1 },
  'Growlithe': { stage1: 'Arcanine', stage2: null, stages: 1 },
  'Poliwag': { stage1: 'Poliwhirl', stage2: 'Poliwrath', stages: 2 },
  'Abra': { stage1: 'Kadabra', stage2: 'Alakazam', stages: 2 },
  'Machop': { stage1: 'Machoke', stage2: 'Machamp', stages: 2 },
  'Bellsprout': { stage1: 'Weepinbell', stage2: 'Victreebel', stages: 2 },
  'Tentacool': { stage1: 'Tentacruel', stage2: null, stages: 1 },
  'Geodude': { stage1: 'Graveler', stage2: 'Golem', stages: 2 },
  'Ponyta': { stage1: 'Rapidash', stage2: null, stages: 1 },
  'Magnemite': { stage1: 'Magneton', stage2: null, stages: 1 },
  'Doduo': { stage1: 'Dodrio', stage2: null, stages: 1 },
  'Seel': { stage1: 'Dewgong', stage2: null, stages: 1 },
  'Grimer': { stage1: 'Muk', stage2: null, stages: 1 },
  'Shellder': { stage1: 'Cloyster', stage2: null, stages: 1 },
  'Gastly': { stage1: 'Haunter', stage2: 'Gengar', stages: 2 },
  'Drowzee': { stage1: 'Hypno', stage2: null, stages: 1 },
  'Krabby': { stage1: 'Kingler', stage2: null, stages: 1 },
  'Voltorb': { stage1: 'Electrode', stage2: null, stages: 1 },
  'Cubone': { stage1: 'Marowak', stage2: null, stages: 1 },
  'Koffing': { stage1: 'Weezing', stage2: null, stages: 1 },
  'Rhyhorn': { stage1: 'Rhydon', stage2: null, stages: 1 },
  'Horsea': { stage1: 'Seadra', stage2: null, stages: 1 },
  'Goldeen': { stage1: 'Seaking', stage2: null, stages: 1 },
  'Staryu': { stage1: 'Starmie', stage2: null, stages: 1 },
  'Magikarp': { stage1: 'Gyarados', stage2: null, stages: 1 },
  'Eevee': { stage1: 'Vaporeon', stage2: null, stages: 1 },
  'Omanyte': { stage1: 'Omastar', stage2: null, stages: 1 },
  'Kabuto': { stage1: 'Kabutops', stage2: null, stages: 1 },
  'Dratini': { stage1: 'Dragonair', stage2: 'Dragonite', stages: 2 },
  'Cyndaquil': { stage1: 'Quilava', stage2: 'Typhlosion', stages: 2 },
  'Totodile': { stage1: 'Croconaw', stage2: 'Feraligatr', stages: 2 },
  'Chikorita': { stage1: 'Bayleef', stage2: 'Meganium', stages: 2 },
  'Torchic': { stage1: 'Combusken', stage2: 'Blaziken', stages: 2 },
  'Mudkip': { stage1: 'Marshtomp', stage2: 'Swampert', stages: 2 },
  'Treecko': { stage1: 'Grovyle', stage2: 'Sceptile', stages: 2 },
  'Piplup': { stage1: 'Prinplup', stage2: 'Empoleon', stages: 2 },
  'Turtwig': { stage1: 'Grotle', stage2: 'Torterra', stages: 2 },
  'Chimchar': { stage1: 'Monferno', stage2: 'Infernape', stages: 2 },
  'Tepig': { stage1: 'Pignite', stage2: 'Emboar', stages: 2 },
  'Oshawott': { stage1: 'Dewott', stage2: 'Samurott', stages: 2 },
  'Snivy': { stage1: 'Servine', stage2: 'Serperior', stages: 2 },
  'Klefki': { stage1: 'Klefking', stage2: null, stages: 1 },
  'Sneasel': { stage1: 'Weavile', stage2: null, stages: 1 },
  'Murkrow': { stage1: 'Honchkrow', stage2: null, stages: 1 },
  'Gligar': { stage1: 'Gliscor', stage2: null, stages: 1 },
  'Yanma': { stage1: 'Yanmega', stage2: null, stages: 1 },
  'Snorunt': { stage1: 'Glalie', stage2: null, stages: 1 },
  'Spheal': { stage1: 'Sealeo', stage2: null, stages: 1 },
  'Aron': { stage1: 'Lairon', stage2: null, stages: 1 },
  'Ralts': { stage1: 'Kirlia', stage2: 'Gardevoir', stages: 2 },
  'Shinx': { stage1: 'Luxio', stage2: null, stages: 1 },
  'Starly': { stage1: 'Staravia', stage2: null, stages: 1 },
  'Bidoof': { stage1: 'Bibarel', stage2: null, stages: 1 },
  'Buneary': { stage1: 'Lopunny', stage2: null, stages: 1 },
  'Glameow': { stage1: 'Purugly', stage2: null, stages: 1 },
  'Stunky': { stage1: 'Skuntank', stage2: null, stages: 1 },
  'Croagunk': { stage1: 'Toxicroak', stage2: null, stages: 1 },
  'Purrloin': { stage1: 'Liepard', stage2: null, stages: 1 },
  'Patrat': { stage1: 'Watchog', stage2: null, stages: 1 },
  'Lillipup': { stage1: 'Herdier', stage2: null, stages: 1 },
  'Roggenrola': { stage1: 'Boldore', stage2: null, stages: 1 },
  'Tympole': { stage1: 'Palpitoad', stage2: null, stages: 1 },
  'Venipede': { stage1: 'Whirlipede', stage2: null, stages: 1 },
  'Sandile': { stage1: 'Krokorok', stage2: null, stages: 1 },
  'Dwebble': { stage1: 'Crustle', stage2: null, stages: 1 },
  'Scraggy': { stage1: 'Scrafty', stage2: null, stages: 1 },
  'Gothita': { stage1: 'Gothorita', stage2: null, stages: 1 },
  'Fletchling': { stage1: 'Fletchinder', stage2: null, stages: 1 },
  'Litleo': { stage1: 'Pyroar', stage2: null, stages: 1 },
  'Skiddo': { stage1: 'Gogoat', stage2: null, stages: 1 },
  'Pancham': { stage1: 'Pangoro', stage2: null, stages: 1 },
  'Honedge': { stage1: 'Doublade', stage2: null, stages: 1 },
  'Inkay': { stage1: 'Malamar', stage2: null, stages: 1 },
  'Binacle': { stage1: 'Barbaracle', stage2: null, stages: 1 },
  'Skrelp': { stage1: 'Dragalge', stage2: null, stages: 1 },
  'Helioptile': { stage1: 'Heliolisk', stage2: null, stages: 1 },
  'Tyrunt': { stage1: 'Tyrantrum', stage2: null, stages: 1 },
  'Amaura': { stage1: 'Aurorus', stage2: null, stages: 1 },
  'Goomy': { stage1: 'Sliggoo', stage2: null, stages: 1 },
  'Noibat': { stage1: 'Noivern', stage2: null, stages: 1 },
  // Additional evolution chains for Pokemon that were missing them
  'Houndour': { stage1: 'Houndoom', stage2: null, stages: 1 },
  'Sentret': { stage1: 'Furret', stage2: null, stages: 1 },
  'Zigzagoon': { stage1: 'Linoone', stage2: null, stages: 1 },
  'Chinchou': { stage1: 'Lanturn', stage2: null, stages: 1 },
  'Mareep': { stage1: 'Flaaffy', stage2: 'Ampharos', stages: 2 },
  'Elekid': { stage1: 'Electabuzz', stage2: null, stages: 1 },
  'Hoppip': { stage1: 'Skiploom', stage2: 'Jumpluff', stages: 2 },
  'Sunkern': { stage1: 'Sunflora', stage2: null, stages: 1 },
  'Spinarak': { stage1: 'Ariados', stage2: null, stages: 1 },
  'Skorupi': { stage1: 'Drapion', stage2: null, stages: 1 },
  'Togepi': { stage1: 'Togetic', stage2: null, stages: 1 },
  'Snubbull': { stage1: 'Granbull', stage2: null, stages: 1 },
  'Teddiursa': { stage1: 'Ursaring', stage2: null, stages: 1 },
  'Slugma': { stage1: 'Magcargo', stage2: null, stages: 1 },
  'Clefairy': { stage1: 'Clefable', stage2: null, stages: 1 },
  'Jigglypuff': { stage1: 'Wigglytuff', stage2: null, stages: 1 },
  'Phanpy': { stage1: 'Donphan', stage2: null, stages: 1 },
  'Spoink': { stage1: 'Grumpig', stage2: null, stages: 1 },
  'Skitty': { stage1: 'Delcatty', stage2: null, stages: 1 },
  'Deerling': { stage1: 'Sawsbuck', stage2: null, stages: 1 },
  'Bunnelby': { stage1: 'Diggersby', stage2: null, stages: 1 },
  'Yungoos': { stage1: 'Gumshoos', stage2: null, stages: 1 },
  'Wooloo': { stage1: 'Dubwool', stage2: null, stages: 1 },
  'Skwovet': { stage1: 'Greedent', stage2: null, stages: 1 },
  'Pikachu': { stage1: 'Raichu', stage2: null, stages: 1 },
  // New Pokemon evolution chains
  'Hoothoot': { stage1: 'Noctowl', stage2: null, stages: 1 },
  'Ledyba': { stage1: 'Ledian', stage2: null, stages: 1 },
  'Natu': { stage1: 'Xatu', stage2: null, stages: 1 },
  'Marill': { stage1: 'Azumarill', stage2: null, stages: 1 },
  'Wooper': { stage1: 'Quagsire', stage2: null, stages: 1 },
  'Swinub': { stage1: 'Piloswine', stage2: null, stages: 1 },
  'Remoraid': { stage1: 'Octillery', stage2: null, stages: 1 },
  'Seedot': { stage1: 'Nuzleaf', stage2: 'Shiftry', stages: 2 },
  'Lotad': { stage1: 'Lombre', stage2: 'Ludicolo', stages: 2 },
  'Shroomish': { stage1: 'Breloom', stage2: null, stages: 1 },
  'Makuhita': { stage1: 'Hariyama', stage2: null, stages: 1 },
  'Gulpin': { stage1: 'Swalot', stage2: null, stages: 1 },
  'Numel': { stage1: 'Camerupt', stage2: null, stages: 1 },
  'Trapinch': { stage1: 'Vibrava', stage2: 'Flygon', stages: 2 },
  'Baltoy': { stage1: 'Claydol', stage2: null, stages: 1 },
  'Barboach': { stage1: 'Whiscash', stage2: null, stages: 1 },
  'Corphish': { stage1: 'Crawdaunt', stage2: null, stages: 1 },
  'Kricketot': { stage1: 'Kricketune', stage2: null, stages: 1 },
  'Burmy': { stage1: 'Wormadam', stage2: null, stages: 1 },
  'Cherubi': { stage1: 'Cherrim', stage2: null, stages: 1 },
  'Bronzor': { stage1: 'Bronzong', stage2: null, stages: 1 },
  'Finneon': { stage1: 'Lumineon', stage2: null, stages: 1 },
  'Pidove': { stage1: 'Tranquill', stage2: 'Unfezant', stages: 2 },
  'Blitzle': { stage1: 'Zebstrika', stage2: null, stages: 1 },
  'Sewaddle': { stage1: 'Swadloon', stage2: 'Leavanny', stages: 2 },
  'Cottonee': { stage1: 'Whimsicott', stage2: null, stages: 1 },
  'Petilil': { stage1: 'Lilligant', stage2: null, stages: 1 },
  'Misdreavus': { stage1: 'Mismagius', stage2: null, stages: 1 },
  'Larvitar': { stage1: 'Pupitar', stage2: 'Tyranitar', stages: 2 },
  'Poochyena': { stage1: 'Mightyena', stage2: null, stages: 1 },
  'Wingull': { stage1: 'Pelipper', stage2: null, stages: 1 },
  'Surskit': { stage1: 'Masquerain', stage2: null, stages: 1 },
  'Electrike': { stage1: 'Manectric', stage2: null, stages: 1 },
  'Roselia': { stage1: 'Roserade', stage2: null, stages: 1 },
  'Wailmer': { stage1: 'Wailord', stage2: null, stages: 1 },
  'Cacnea': { stage1: 'Cacturne', stage2: null, stages: 1 },
  'Snover': { stage1: 'Abomasnow', stage2: null, stages: 1 },
  'Riolu': { stage1: 'Lucario', stage2: null, stages: 1 },
  'Hippopotas': { stage1: 'Hippowdon', stage2: null, stages: 1 },
  'Mantyke': { stage1: 'Mantine', stage2: null, stages: 1 },
  'Darumaka': { stage1: 'Darmanitan', stage2: null, stages: 1 },
  'Pawniard': { stage1: 'Bisharp', stage2: null, stages: 1 },
  'Rufflet': { stage1: 'Braviary', stage2: null, stages: 1 },
  'Vullaby': { stage1: 'Mandibuzz', stage2: null, stages: 1 },
  'Deino': { stage1: 'Zweilous', stage2: 'Hydreigon', stages: 2 },
  'Espurr': { stage1: 'Meowstic', stage2: null, stages: 1 },
  'Spritzee': { stage1: 'Aromatisse', stage2: null, stages: 1 },
  'Swirlix': { stage1: 'Slurpuff', stage2: null, stages: 1 },
  'Bergmite': { stage1: 'Avalugg', stage2: null, stages: 1 },
  'Phantump': { stage1: 'Trevenant', stage2: null, stages: 1 },
  'Pumpkaboo': { stage1: 'Gourgeist', stage2: null, stages: 1 }
};

const GAME_CONFIG = {
  CAREER: {
    TOTAL_TURNS: 60,
    GYM_LEADER_INTERVAL: 12,
    STARTING_ENERGY: 100,
    MAX_ENERGY: 100,
    ELITE_FOUR_START_TURN: 60,
    // Number of abilities for gym leaders/elite four at each battle
    // Gym 1 (turn 12): 3 moves, Gym 2 (turn 24): 4 moves, Gym 3 (turn 36): 4 moves, Gym 4 (turn 48): 5 moves
    // Elite Four (turns 60-63): 6 moves each
    GYM_ABILITY_COUNTS: [3, 4, 4, 5],
    ELITE_FOUR_ABILITY_COUNT: 6,
    // Global multiplier applied to all enemy Pokemon stats (wild, event, gym leaders, Elite Four)
    ENEMY_STAT_MULTIPLIER: 1.0
  },
  TRAINING: {
    ENERGY_COSTS: { HP: 20, Attack: 25, Defense: 15, Instinct: 20, Speed: -5 },
    FAILURE_CHANCE_AT_ZERO_ENERGY: 0.99,
    BASE_STAT_GAINS: { HP: 8, Attack: 5, Defense: 5, Instinct: 4, Speed: 3 },
    SKILL_POINTS_ON_SUCCESS: 3,
    STAT_LOSS_ON_FAILURE: 2,
    FRIENDSHIP_GAIN_PER_TRAINING: 10,
    LEVEL_UP_REQUIREMENT: 4, // Successful trainings needed to level up
    LEVEL_BONUS_MULTIPLIER: 0.10 // 10% bonus per level
  },
  REST: {
    ENERGY_GAINS: [30, 50, 70],
    PROBMOVES: [0.2, 0.6, 0.2]
  },
  BATTLE: {
    TICK_DURATION_MS: 1000,
    BASE_REST_STAMINA_GAIN: 1,
    SPEED_STAMINA_DENOMINATOR: 15,
    MAX_STAMINA: 100,
    BASE_DODGE_CHANCE: 0.01,
    INSTINCT_DODGE_DENOMINATOR: 2786,
    BASE_CRIT_CHANCE: 0.05,
    INSTINCT_CRIT_DENOMINATOR: 800,
    WIN_STAT_GAIN: 5,
    WIN_SKILL_POINTS: 10
  },
  APTITUDE: {
    MULTIPLIERS: {
      'F': 0.6, 'F+': 0.65,
      'E': 0.7, 'E+': 0.75,
      'D': 0.8, 'D+': 0.85,
      'C': 0.9, 'C+': 0.95,
      'B': 1.0, 'B+': 1.05,
      'A': 1.1, 'A+': 1.15,
      'S': 1.2, 'S+': 1.225,
      'UU': 1.25, 'UU+': 1.3
    }
  },
  // Valid strategies (move selection behavior only, no modifiers)
  VALID_STRATEGIES: ['Scaler', 'Nuker', 'Debuffer', 'Chipper', 'MadLad'],
  TYPE_MATCHUPS: {
    Red: { strong: 'Grass', weak: 'Water' },
    Blue: { strong: 'Fire', weak: 'Grass' },
    Green: { strong: 'Water', weak: 'Fire' },
    Yellow: { strong: 'Psychic', weak: 'Psychic' },
    Purple: { strong: 'Fighting', weak: 'Psychic' },
    Orange: { strong: 'Electric', weak: 'Psychic' }
  },
  MOVES: {
    BASE_COST_MULTIPLIER: 3.0,
    HINT_DISCOUNT: 0.15,
    MAX_HINT_DISCOUNT: 0.60
  }
};

const MOVES = {
  Ember: { type: 'Fire', damage: 12, warmup: 0, cooldown: 2, stamina: 25, cost: 30, effect: null },
  Flamethrower: { type: 'Fire', damage: 26, warmup: 3, cooldown: 4, stamina: 45, cost: 45, effect: { type: 'burn', chance: 0.2, duration: 5, damage: 3 } },
  FireBlast: { type: 'Fire', damage: 35, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'burn', chance: 0.4, duration: 6, damage: 5 } },
  WaterGun: { type: 'Water', damage: 12, warmup: 0, cooldown: 2, stamina: 25, cost: 30, effect: null },
  Surf: { type: 'Water', damage: 26, warmup: 3, cooldown: 4, stamina: 45, cost: 45, effect: null },
  HydroPump: { type: 'Water', damage: 35, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'soak', chance: 0.3, duration: 4 } },
  VineWhip: { type: 'Grass', damage: 14, warmup: 0, cooldown: 2, stamina: 25, cost: 30, effect: null },
  RazorLeaf: { type: 'Grass', damage: 26, warmup: 3, cooldown: 4, stamina: 45, cost: 45, effect: null },
  SolarBeam: { type: 'Grass', damage: 35, warmup: 6, cooldown: 5, stamina: 55, cost: 75, effect: { type: 'energize', chance: 0.25, duration: 3, staminaBoost: 5 } },
  PsyBeam: { type: 'Psychic', damage: 11, warmup: 0, cooldown: 2, stamina: 25, cost: 30, effect: { type: 'confuse', chance: 0.3, duration: 3 } },
  Psychic: { type: 'Psychic', damage: 25, warmup: 3, cooldown: 4, stamina: 45, cost: 45, effect: { type: 'confuse', chance: 0.5, duration: 4 } },
  PsychicBlast: { type: 'Psychic', damage: 34, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'confuse', chance: 0.7, duration: 5 } },
  ThunderShock: { type: 'Electric', damage: 11, warmup: 0, cooldown: 2, stamina: 25, cost: 30, effect: { type: 'paralyze', chance: 0.2, duration: 3 } },
  Thunderbolt: { type: 'Electric', damage: 26, warmup: 3, cooldown: 4, stamina: 45, cost: 45, effect: { type: 'paralyze', chance: 0.3, duration: 4 } },
  Thunder: { type: 'Electric', damage: 35, warmup: 5, cooldown: 6, stamina: 65, cost: 75, effect: { type: 'paralyze', chance: 0.5, duration: 5 } },
  LowKick: { type: 'Fighting', damage: 10, warmup: 0, cooldown: 2, stamina: 20, cost: 25, effect: null },
  KarateChop: { type: 'Fighting', damage: 12, warmup: 0, cooldown: 2, stamina: 25, cost: 30, effect: null },
  Submission: { type: 'Fighting', damage: 28, warmup: 3, cooldown: 4, stamina: 50, cost: 50, effect: { type: 'recoil', damagePercent: 0.1 } },
  BrickBreak: { type: 'Fighting', damage: 26, warmup: 3, cooldown: 4, stamina: 45, cost: 45, effect: null },
  CloseCombat: { type: 'Fighting', damage: 35, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'recoil', damagePercent: 0.15 } },
  Earthquake: { type: 'Fighting', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 55, effect: null },
  AuraSphere: { type: 'Fighting', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 50, effect: null },
  DrainPunch: { type: 'Fighting', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 42, effect: { type: 'drain', chance: 0.5, duration: 1, healPercent: 0.5 } },
  DynamicPunch: { type: 'Fighting', damage: 30, warmup: 4, cooldown: 5, stamina: 50, cost: 60, effect: { type: 'confuse', chance: 0.5, duration: 3 } },
  Tackle: { type: 'Normal', damage: 7, warmup: 1, cooldown: 2, stamina: 20, cost: 30, effect: null },
  BodySlam: { type: 'Normal', damage: 21, warmup: 2, cooldown: 3, stamina: 42, cost: 35, effect: { type: 'stun', chance: 0.2, duration: 2 } },
  HyperBeam: { type: 'Normal', damage: 38, warmup: 8, cooldown: 8, stamina: 65, cost: 80, effect: { type: 'exhaust', duration: 3 } },
  SacredFire: { type: 'Fire', damage: 38, warmup: 6, cooldown: 6, stamina: 85, cost: 80, effect: { type: 'burn', duration: 2 } },
  Psystrike: { type: 'Psychic', damage: 40, warmup: 7, cooldown: 7, stamina: 90, cost: 85, effect: { type: 'confuse', chance: 1.0, duration: 2 } },
  OriginPulse: { type: 'Water', damage: 39, warmup: 7, cooldown: 6, stamina: 90, cost: 85 },
  PrecipiceBlades: { type: 'Fire', damage: 41, warmup: 8, cooldown: 7, stamina: 95, cost: 88 },
  DragonAscent: { type: 'Grass', damage: 40, warmup: 7, cooldown: 7, stamina: 92, cost: 87 },
  RoarOfTime: { type: 'Fighting', damage: 42, warmup: 8, cooldown: 8, stamina: 100, cost: 90, effect: { type: 'exhaust', duration: 2 } },
  SpacialRend: { type: 'Water', damage: 40, warmup: 7, cooldown: 7, stamina: 92, cost: 87 },
  ShadowForce: { type: 'Psychic', damage: 38, warmup: 6, cooldown: 7, stamina: 88, cost: 82, effect: { type: 'evasion', duration: 1 } },
  IceBeam: { type: 'Water', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 50, effect: { type: 'freeze', chance: 0.25, duration: 3 } },
  Blizzard: { type: 'Water', damage: 36, warmup: 5, cooldown: 6, stamina: 65, cost: 80, effect: { type: 'freeze', chance: 0.4, duration: 4 } },
  LeafBlade: { type: 'Grass', damage: 27, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: null },
  GigaDrain: { type: 'Grass', damage: 22, warmup: 3, cooldown: 4, stamina: 35, cost: 45, effect: { type: 'drain', chance: 0.5, duration: 1, healPercent: 0.25 } },
  PowerWhip: { type: 'Grass', damage: 32, warmup: 4, cooldown: 5, stamina: 50, cost: 65, effect: null },
  FireFang: { type: 'Fire', damage: 20, warmup: 1, cooldown: 3, stamina: 30, cost: 40, effect: { type: 'burn', chance: 0.15, duration: 4, damage: 2 } },
  LavaPlume: { type: 'Fire', damage: 30, warmup: 4, cooldown: 5, stamina: 50, cost: 60, effect: { type: 'burn', chance: 0.35, duration: 5, damage: 4 } },
  VoltSwitch: { type: 'Electric', damage: 18, warmup: 1, cooldown: 2, stamina: 25, cost: 35, effect: { type: 'energize', chance: 0.3, duration: 2, staminaBoost: 3 } },
  WildCharge: { type: 'Electric', damage: 32, warmup: 4, cooldown: 5, stamina: 55, cost: 70, effect: { type: 'paralyze', chance: 0.25, duration: 4 } },
  Hypnosis: { type: 'Psychic', damage: 20, warmup: 2, cooldown: 3, stamina: 35, cost: 42, effect: { type: 'sleep', chance: 0.6, duration: 3 } },
  Psyshock: { type: 'Psychic', damage: 28, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: { type: 'confuse', chance: 0.35, duration: 4 } },
  ZenHeadbutt: { type: 'Psychic', damage: 24, warmup: 2, cooldown: 4, stamina: 35, cost: 45, effect: { type: 'confuse', chance: 0.25, duration: 3 } },
  QuickAttack: { type: 'Normal', damage: 10, warmup: 0, cooldown: 2, stamina: 22, cost: 30, effect: null },
  ExtremeSpeed: { type: 'Normal', damage: 19, warmup: 0, cooldown: 3, stamina: 38, cost: 52, effect: null },
  DoubleEdge: { type: 'Normal', damage: 34, warmup: 3, cooldown: 5, stamina: 58, cost: 68, effect: { type: 'recoil', damagePercent: 0.25 } },
  StoneEdge: { type: 'Normal', damage: 27, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: null },
  PlayRough: { type: 'Normal', damage: 24, warmup: 2, cooldown: 4, stamina: 42, cost: 52, effect: { type: 'confuse', chance: 0.2, duration: 2 } },
  DragonClaw: { type: 'Fighting', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: null },
  FlareBlitz: { type: 'Fire', damage: 36, warmup: 4, cooldown: 5, stamina: 58, cost: 72, effect: { type: 'recoil', damagePercent: 0.2 } },
  IronHead: { type: 'Normal', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: { type: 'stun', chance: 0.3, duration: 2 } },
  RockSlide: { type: 'Fighting', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: { type: 'stun', chance: 0.2, duration: 1 } },
  ShadowBall: { type: 'Psychic', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: { type: 'confuse', chance: 0.25, duration: 3 } },
  SludgeBomb: { type: 'Grass', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'poison', chance: 0.4, duration: 4, damage: 4 } },
  IronTail: { type: 'Normal', damage: 32, warmup: 3, cooldown: 4, stamina: 50, cost: 62, effect: { type: 'stun', chance: 0.25, duration: 2 } },
  SteelWing: { type: 'Normal', damage: 24, warmup: 1, cooldown: 3, stamina: 35, cost: 45, effect: null },
  AerialAce: { type: 'Normal', damage: 20, warmup: 0, cooldown: 2, stamina: 28, cost: 38, effect: null },
  DarkPulse: { type: 'Psychic', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: { type: 'confuse', chance: 0.3, duration: 3 } },
  BlueFlare: { type: 'Fire', damage: 40, warmup: 6, cooldown: 7, stamina: 88, cost: 88, effect: { type: 'burn', chance: 0.5, duration: 5, damage: 6 } },
  DiamondStorm: { type: 'Fighting', damage: 33, warmup: 4, cooldown: 5, stamina: 55, cost: 68, effect: null },
  PayDay: { type: 'Normal', damage: 15, warmup: 0, cooldown: 2, stamina: 25, cost: 35, effect: null },

  // Additional moves from support card hints
  AirSlash: { type: 'Normal', damage: 25, warmup: 2, cooldown: 3, stamina: 40, cost: 50, effect: { type: 'confuse', chance: 0.3, duration: 2 } },
  AncientPower: { type: 'Normal', damage: 20, warmup: 2, cooldown: 3, stamina: 35, cost: 45, effect: { type: 'buff_all', chance: 0.1 } },
  AquaRing: { type: 'Water', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'regen', duration: 5, healPercent: 0.06 } },
  Attract: { type: 'Normal', damage: 0, warmup: 1, cooldown: 5, stamina: 25, cost: 35, effect: { type: 'infatuate', chance: 0.5, duration: 3 } },
  BlastBurn: { type: 'Fire', damage: 42, warmup: 6, cooldown: 8, stamina: 68, cost: 85, effect: { type: 'exhaust', duration: 2 } },
  BraveBird: { type: 'Normal', damage: 36, warmup: 4, cooldown: 5, stamina: 58, cost: 72, effect: { type: 'recoil', damagePercent: 0.25 } },
  BulkUp: { type: 'Fighting', damage: 0, warmup: 1, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_attack_defense', duration: 6 } },
  BulletPunch: { type: 'Fighting', damage: 16, warmup: 0, cooldown: 2, stamina: 28, cost: 38, effect: null },
  CalmMind: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_instinct', duration: 6 } },
  Curse: { type: 'Psychic', damage: 0, warmup: 3, cooldown: 6, stamina: 40, cost: 50, effect: { type: 'curse', duration: 5, damage: 6 } },
  DazzlingGleam: { type: 'Normal', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: null },
  DestinyBond: { type: 'Psychic', damage: 0, warmup: 3, cooldown: 8, stamina: 50, cost: 60, effect: { type: 'destiny_bond', duration: 2 } },
  DracoMeteor: { type: 'Fire', damage: 40, warmup: 6, cooldown: 7, stamina: 65, cost: 82, effect: { type: 'debuff_instinct_self', duration: 2 } },
  DragonDance: { type: 'Fighting', damage: 0, warmup: 1, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_attack_speed', duration: 6 } },
  DragonPulse: { type: 'Fire', damage: 29, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: null },
  DragonRush: { type: 'Fighting', damage: 32, warmup: 4, cooldown: 5, stamina: 52, cost: 65, effect: { type: 'stun', chance: 0.2, duration: 1 } },
  DragonTail: { type: 'Fighting', damage: 20, warmup: 2, cooldown: 4, stamina: 35, cost: 45, effect: { type: 'push_back' } },
  DreamEater: { type: 'Psychic', damage: 32, warmup: 4, cooldown: 5, stamina: 48, cost: 60, effect: { type: 'drain_sleep', healPercent: 0.5 } },
  EarthPower: { type: 'Fighting', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'debuff_defense', chance: 0.1, duration: 2 } },
  Eruption: { type: 'Fire', damage: 42, warmup: 6, cooldown: 7, stamina: 70, cost: 85, effect: { type: 'hp_based_damage' } },
  Explosion: { type: 'Normal', damage: 45, warmup: 5, cooldown: 10, stamina: 85, cost: 90, effect: { type: 'self_ko' } },
  FeintAttack: { type: 'Psychic', damage: 20, warmup: 1, cooldown: 2, stamina: 30, cost: 40, effect: null },
  FirePunch: { type: 'Fire', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 48, effect: { type: 'burn', chance: 0.2, duration: 4, damage: 3 } },
  FlashCannon: { type: 'Normal', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'debuff_defense', chance: 0.1, duration: 8 } },
  FocusBlast: { type: 'Fighting', damage: 36, warmup: 5, cooldown: 6, stamina: 58, cost: 72, effect: { type: 'debuff_defense', chance: 0.1, duration: 12 } },
  FoulPlay: { type: 'Psychic', damage: 30, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'use_opponent_attack' } },
  FusionFlare: { type: 'Fire', damage: 38, warmup: 6, cooldown: 6, stamina: 62, cost: 78, effect: { type: 'burn', chance: 0.3, duration: 5, damage: 5 } },
  FutureSight: { type: 'Psychic', damage: 36, warmup: 5, cooldown: 7, stamina: 55, cost: 70, effect: { type: 'delayed_damage', turns: 3 } },
  HeatWave: { type: 'Fire', damage: 31, warmup: 4, cooldown: 5, stamina: 50, cost: 62, effect: { type: 'burn', chance: 0.2, duration: 4, damage: 3 } },
  Hex: { type: 'Psychic', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 45, effect: { type: 'double_if_status' } },
  Hurricane: { type: 'Normal', damage: 36, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'confuse', chance: 0.3, duration: 3 } },
  IcePunch: { type: 'Water', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 48, effect: { type: 'freeze', chance: 0.2, duration: 3 } },
  IronDefense: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_defense', duration: 8 } },
  MeteorMash: { type: 'Normal', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'buff_attack', chance: 0.2, duration: 8 } },
  Metronome: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'random_move' } },
  MilkDrink: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  Moonblast: { type: 'Normal', damage: 31, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'debuff_instinct', chance: 0.3, duration: 8 } },
  Moonlight: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  NastyPlot: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_instinct', duration: 8 } },
  Outrage: { type: 'Fighting', damage: 36, warmup: 4, cooldown: 6, stamina: 58, cost: 72, effect: { type: 'confuse_self_after', duration: 2 } },
  PowerGem: { type: 'Normal', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: null },
  Present: { type: 'Normal', damage: 20, warmup: 1, cooldown: 3, stamina: 30, cost: 40, effect: { type: 'random_damage_or_heal' } },
  RapidSpin: { type: 'Normal', damage: 15, warmup: 1, cooldown: 2, stamina: 25, cost: 35, effect: { type: 'remove_hazards' } },
  Recover: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  RockPolish: { type: 'Fighting', damage: 0, warmup: 1, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_speed', duration: 8 } },
  Rollout: { type: 'Normal', damage: 12, warmup: 1, cooldown: 2, stamina: 25, cost: 35, effect: { type: 'consecutive_boost', maxHits: 5 } },
  Roost: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  Sandstorm: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_sand', duration: 5 } },
  Screech: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 25, cost: 35, effect: { type: 'debuff_defense', duration: 6 } },
  Slash: { type: 'Normal', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 48, effect: { type: 'high_crit' } },
  SleepPowder: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'sleep', chance: 0.75, duration: 3 } },
  SludgeWave: { type: 'Grass', damage: 31, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'poison', chance: 0.3, duration: 4, damage: 4 } },
  Spikes: { type: 'Normal', damage: 0, warmup: 2, cooldown: 6, stamina: 30, cost: 40, effect: { type: 'entry_hazard', layers: 3 } },
  StealthRock: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 30, cost: 40, effect: { type: 'entry_hazard_rock' } },
  SwordsDance: { type: 'Fighting', damage: 0, warmup: 1, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_attack', duration: 8 } },
  Synthesis: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  ThunderWave: { type: 'Electric', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'paralyze', chance: 0.9, duration: 5 } },
  Toxic: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'badly_poison', duration: 6 } },
  Transform: { type: 'Normal', damage: 0, warmup: 3, cooldown: 10, stamina: 40, cost: 50, effect: { type: 'copy_opponent' } },
  UTurn: { type: 'Normal', damage: 21, warmup: 1, cooldown: 3, stamina: 32, cost: 42, effect: { type: 'switch_out' } },
  Waterfall: { type: 'Water', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: { type: 'stun', chance: 0.2, duration: 1 } },
  WillOWisp: { type: 'Fire', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'burn', chance: 0.85, duration: 5, damage: 4 } },

  // === CHIPPER MOVES (Low stamina, low cooldown for each type) ===
  FlameCharge: { type: 'Fire', damage: 12, warmup: 0, cooldown: 3, stamina: 18, cost: 28, effect: { type: 'buff_speed', chance: 1.0, duration: 6 } },
  Incinerate: { type: 'Fire', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: null },
  AquaJet: { type: 'Water', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: null },
  BubbleBeam: { type: 'Water', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'debuff_speed', chance: 0.1, duration: 4 } },
  BulletSeed: { type: 'Grass', damage: 15, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: null },
  MegaDrain: { type: 'Grass', damage: 14, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'drain', chance: 0.3, healPercent: 0.25 } },
  Spark: { type: 'Electric', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'paralyze', chance: 0.15, duration: 2 } },
  ChargeBeam: { type: 'Electric', damage: 12, warmup: 0, cooldown: 3, stamina: 18, cost: 28, effect: { type: 'buff_instinct', chance: 0.7, duration: 6 } },
  Confusion: { type: 'Psychic', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: { type: 'confuse', chance: 0.1, duration: 2 } },
  HeartStamp: { type: 'Psychic', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'stun', chance: 0.15, duration: 1 } },
  MachPunch: { type: 'Fighting', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: null },
  ForcePalm: { type: 'Fighting', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'paralyze', chance: 0.2, duration: 2 } },
  Bite: { type: 'Normal', damage: 15, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: { type: 'stun', chance: 0.15, duration: 1 } },
  Swift: { type: 'Normal', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: null },

  // === BUFF MOVES (For Scaler strategy) ===
  Agility: { type: 'Psychic', damage: 0, warmup: 0, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'buff_speed', duration: 8 } },
  Harden: { type: 'Normal', damage: 0, warmup: 0, cooldown: 4, stamina: 20, cost: 30, effect: { type: 'buff_defense', duration: 8 } },
  Meditate: { type: 'Psychic', damage: 0, warmup: 0, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'buff_attack', duration: 8 } },
  Sharpen: { type: 'Normal', damage: 0, warmup: 0, cooldown: 4, stamina: 20, cost: 30, effect: { type: 'buff_attack', duration: 8 } },
  WorkUp: { type: 'Normal', damage: 0, warmup: 0, cooldown: 4, stamina: 22, cost: 32, effect: { type: 'buff_attack', duration: 8 } },
  CosmicPower: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 28, cost: 38, effect: { type: 'buff_defense', duration: 8 } },
  Barrier: { type: 'Psychic', damage: 0, warmup: 0, cooldown: 4, stamina: 22, cost: 32, effect: { type: 'buff_defense', duration: 8 } },
  Amnesia: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 28, cost: 38, effect: { type: 'buff_instinct', duration: 8 } },

  // === DEBUFF MOVES (For Debuffer strategy) ===
  Growl: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_attack', duration: 6 } },
  Leer: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_defense', duration: 6 } },
  TailWhip: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_defense', duration: 6 } },
  SandAttack: { type: 'Fighting', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_accuracy', duration: 6 } },
  Confide: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_instinct', duration: 6 } },
  CharmMove: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 20, cost: 30, effect: { type: 'debuff_attack', duration: 6 } },
  FakeTears: { type: 'Psychic', damage: 0, warmup: 0, cooldown: 3, stamina: 20, cost: 30, effect: { type: 'debuff_defense', duration: 6 } },
  ScaryFace: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 20, cost: 30, effect: { type: 'debuff_speed', duration: 6 } },
  StringShot: { type: 'Grass', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_speed', duration: 6 } },
  Smokescreen: { type: 'Fire', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_accuracy', duration: 6 } },

  // === WEATHER MOVES ===
  RainDance: { type: 'Water', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_rain', duration: 5 } },
  SunnyDay: { type: 'Fire', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_sun', duration: 5 } },
  Hail: { type: 'Water', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_hail', duration: 5 } },

  // === NEW MID-TIER DAMAGE MOVES ===
  FlameBurst: { type: 'Fire', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 42, effect: null },
  Overheat: { type: 'Fire', damage: 38, warmup: 5, cooldown: 6, stamina: 62, cost: 78, effect: { type: 'debuff_instinct_self', duration: 12 } },
  Scald: { type: 'Water', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 45, effect: { type: 'burn', chance: 0.3, duration: 4, damage: 3 } },
  AquaTail: { type: 'Water', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 55, effect: null },
  Brine: { type: 'Water', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 42, effect: { type: 'double_if_half_hp' } },
  SeedBomb: { type: 'Grass', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 50, effect: null },
  EnergyBall: { type: 'Grass', damage: 30, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'debuff_defense', chance: 0.1, duration: 8 } },
  WoodHammer: { type: 'Grass', damage: 36, warmup: 4, cooldown: 5, stamina: 55, cost: 70, effect: { type: 'recoil', damagePercent: 0.2 } },
  Discharge: { type: 'Electric', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 50, effect: { type: 'paralyze', chance: 0.25, duration: 3 } },
  ElectroBall: { type: 'Electric', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: null },
  ZapCannon: { type: 'Electric', damage: 36, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'paralyze', chance: 0.6, duration: 4 } },
  Extrasensory: { type: 'Psychic', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: { type: 'stun', chance: 0.15, duration: 1 } },
  PsychoCut: { type: 'Psychic', damage: 24, warmup: 1, cooldown: 3, stamina: 35, cost: 42, effect: { type: 'high_crit' } },
  StoredPower: { type: 'Psychic', damage: 20, warmup: 2, cooldown: 3, stamina: 32, cost: 40, effect: { type: 'buff_boost_damage' } },
  CrossChop: { type: 'Fighting', damage: 32, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'high_crit' } },
  HammerArm: { type: 'Fighting', damage: 34, warmup: 4, cooldown: 5, stamina: 52, cost: 65, effect: { type: 'debuff_speed_self', duration: 10 } },
  Superpower: { type: 'Fighting', damage: 36, warmup: 4, cooldown: 5, stamina: 55, cost: 70, effect: { type: 'debuff_attack_self', duration: 10 } },
  VacuumWave: { type: 'Fighting', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: null },
  Headbutt: { type: 'Normal', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 42, effect: { type: 'stun', chance: 0.2, duration: 1 } },
  Facade: { type: 'Normal', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 45, effect: { type: 'double_if_status_self' } },
  Frustration: { type: 'Normal', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: null },
  Return: { type: 'Normal', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: null },
  GigaImpact: { type: 'Normal', damage: 42, warmup: 7, cooldown: 8, stamina: 70, cost: 85, effect: { type: 'exhaust', duration: 2 } },

  // === SIGNATURE/UNIQUE MOVES ===
  SkyAttack: { type: 'Normal', damage: 36, warmup: 4, cooldown: 5, stamina: 58, cost: 72, effect: { type: 'high_crit' } },
  MindBlown: { type: 'Fire', damage: 40, warmup: 5, cooldown: 6, stamina: 65, cost: 80, effect: { type: 'recoil', damagePercent: 0.25 } },
  SheerCold: { type: 'Water', damage: 45, warmup: 6, cooldown: 8, stamina: 75, cost: 88, effect: { type: 'ohko', chance: 0.3 } },
  Frenzy: { type: 'Grass', damage: 42, warmup: 6, cooldown: 8, stamina: 70, cost: 85, effect: { type: 'exhaust', duration: 2 } },
  Focus: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 5, stamina: 25, cost: 35, effect: { type: 'buff_instinct', duration: 10 } },
  PsychicTerrain: { type: 'Psychic', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'terrain_psychic', duration: 5 } },
  ElectricTerrain: { type: 'Electric', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'terrain_electric', duration: 5 } },
  GrassyTerrain: { type: 'Grass', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'terrain_grassy', duration: 5 } },

  // === SUPPORT CARD HINT MOVES (Gen 8-9) ===
  // Zacian/Zamazenta signature moves
  BehemothBlade: { type: 'Normal', damage: 38, warmup: 4, cooldown: 5, stamina: 58, cost: 72, effect: null },
  BehemothBash: { type: 'Normal', damage: 36, warmup: 4, cooldown: 5, stamina: 55, cost: 70, effect: { type: 'buff_defense', chance: 0.3, duration: 10 } },
  SacredSword: { type: 'Fighting', damage: 30, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: null },

  // Eternatus signature move
  DynamaxCannon: { type: 'Psychic', damage: 38, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: null },

  // Terapagos signature move
  TeraStarstorm: { type: 'Normal', damage: 36, warmup: 4, cooldown: 5, stamina: 55, cost: 70, effect: null },

  // Ogerpon signature move
  IvyCudgel: { type: 'Grass', damage: 30, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'high_crit' } },

  // Duraludon signature move
  SteelBeam: { type: 'Normal', damage: 38, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'recoil', damagePercent: 0.25 } },

  // Drednaw moves
  Liquidation: { type: 'Water', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: { type: 'debuff_defense', chance: 0.2, duration: 6 } },
  RockTomb: { type: 'Fighting', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 42, effect: { type: 'debuff_speed', chance: 0.5, duration: 6 } },
  JawLock: { type: 'Psychic', damage: 24, warmup: 2, cooldown: 4, stamina: 40, cost: 48, effect: { type: 'trap', duration: 3 } },
  ShellSmash: { type: 'Normal', damage: 0, warmup: 1, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'buff_attack_speed', duration: 10 } },
  HeadSmash: { type: 'Fighting', damage: 40, warmup: 5, cooldown: 6, stamina: 65, cost: 80, effect: { type: 'recoil', damagePercent: 0.3 } },

  // Toxtricity signature move
  Overdrive: { type: 'Electric', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: null },
  BoomBurst: { type: 'Normal', damage: 36, warmup: 4, cooldown: 5, stamina: 55, cost: 70, effect: null },
  ShiftGear: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_attack_speed', duration: 8 } },

  // Tinkaton signature move
  GigatonHammer: { type: 'Normal', damage: 42, warmup: 5, cooldown: 7, stamina: 68, cost: 85, effect: null },

  // Additional missing moves from Pokemon moveHints
  CrossPoison: { type: 'Grass', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 45, effect: { type: 'poison', chance: 0.2, duration: 4, damage: 3 } },
  HornLeech: { type: 'Grass', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: { type: 'drain', chance: 0.5, healPercent: 0.25 } },
  BodyPress: { type: 'Fighting', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: null },
  Crunch: { type: 'Psychic', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: { type: 'debuff_defense', chance: 0.2, duration: 6 } }
};

const calculateBaseStats = (rawStats, evolutionStages) => {
  let multiplier = EVOLUTION_CONFIG.BASE_STAT_MULTIPLIERS.TWO_EVOLUTIONS;

  if (evolutionStages === 0) {
    multiplier = EVOLUTION_CONFIG.BASE_STAT_MULTIPLIERS.NO_EVOLUTION;
  } else if (evolutionStages === 1) {
    multiplier = EVOLUTION_CONFIG.BASE_STAT_MULTIPLIERS.ONE_EVOLUTION;
  }

  const adjustedStats = {};
  for (const [stat, value] of Object.entries(rawStats)) {
    adjustedStats[stat] = Math.round(value * multiplier);
  }

  const total = Object.values(adjustedStats).reduce((sum, val) => sum + val, 0);
  if (total < 300) {
    const scale = 300 / total;
    for (const stat in adjustedStats) {
      adjustedStats[stat] = Math.round(adjustedStats[stat] * scale);
    }
  } else if (total > 400) {
    const scale = 400 / total;
    for (const stat in adjustedStats) {
      adjustedStats[stat] = Math.round(adjustedStats[stat] * scale);
    }
  }

  return adjustedStats;
};

// ============================================================================
// POKEMON DATABASE
// ============================================================================

const POKEMON = {
  // Original 5 starter pokemons
  Charmander: {
    name: 'Charmander',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 93, Attack: 68, Defense: 58, Instinct: 78, Speed: 83 }, 2),
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam', 'FireBlast', 'WaterGun', 'ThunderShock'],
    isStarter: true
  },
  Squirtle: {
    name: 'Squirtle',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 98, Attack: 59, Defense: 66, Instinct: 81, Speed: 76 }, 2),
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'C', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam', 'HydroPump', 'VineWhip', 'Ember'],
    isStarter: true
  },
  Bulbasaur: {
    name: 'Bulbasaur',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 100, Attack: 70, Defense: 70, Instinct: 75, Speed: 65 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam', 'SolarBeam', 'WaterGun', 'PsyBeam'],
    isStarter: true
  },
  Pikachu: {
    name: 'Pikachu',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 82, Attack: 57, Defense: 52, Instinct: 87, Speed: 102 }, 1),
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Tackle', 'QuickAttack', 'Thunderbolt', 'BodySlam', 'Thunder', 'BrickBreak', 'HyperBeam', 'Ember'],
    isStarter: true
  },
  Gastly: {
    name: 'Gastly',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 96, Attack: 81, Defense: 61, Instinct: 71, Speed: 71 }, 2),
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'C', Debuffer: 'A', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam', 'PsychicBlast', 'VineWhip', 'ThunderShock'],
    isStarter: true
  },
  
  // 25 Additional Wild Pokemons
  Growlithe: {
    name: 'Growlithe',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 88, Attack: 78, Defense: 53, Instinct: 73, Speed: 88 }, 1),
    typeAptitudes: { Red: 'A', Blue: 'E', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Arcanine: {
    name: 'Arcanine',
    primaryType: 'Fire',
    baseStats: { HP: 106, Attack: 86, Defense: 71, Instinct: 61, Speed: 56 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Golduck: {
    name: 'Golduck',
    primaryType: 'Water',
    baseStats: { HP: 91, Attack: 61, Defense: 76, Instinct: 86, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'E', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'F' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Lapras: {
    name: 'Lapras',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 111, Attack: 66, Defense: 81, Instinct: 76, Speed: 46 }, 0),
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'D', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Victreebel: {
    name: 'Victreebel',
    primaryType: 'Grass',
    baseStats: { HP: 96, Attack: 76, Defense: 81, Instinct: 66, Speed: 61 },
    typeAptitudes: { Red: 'E', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Vileplume: {
    name: 'Vileplume',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 66, Defense: 66, Instinct: 81, Speed: 86 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'A', Chipper: 'E', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Zapdos: {
    name: 'Zapdos',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 76, Attack: 61, Defense: 56, Instinct: 91, Speed: 96 }, 0),
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'C', Purple: 'B', Yellow: 'S', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Raichu: {
    name: 'Raichu',
    primaryType: 'Electric',
    baseStats: { HP: 86, Attack: 71, Defense: 61, Instinct: 81, Speed: 81 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'D', Yellow: 'S', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Arbok: {
    name: 'Arbok',
    primaryType: 'Psychic',
    baseStats: { HP: 91, Attack: 86, Defense: 66, Instinct: 76, Speed: 61 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'E', Orange: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Nidoking: {
    name: 'Nidoking',
    primaryType: 'Psychic',
    baseStats: { HP: 81, Attack: 91, Defense: 71, Instinct: 66, Speed: 71 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'S', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Rapidash: {
    name: 'Rapidash',
    primaryType: 'Fire',
    baseStats: { HP: 96, Attack: 81, Defense: 61, Instinct: 76, Speed: 66 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'F' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Starmie: {
    name: 'Starmie',
    primaryType: 'Water',
    baseStats: { HP: 86, Attack: 71, Defense: 86, Instinct: 71, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'E', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Exeggutor: {
    name: 'Exeggutor',
    primaryType: 'Grass',
    baseStats: { HP: 91, Attack: 61, Defense: 76, Instinct: 86, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Jolteon: {
    name: 'Jolteon',
    primaryType: 'Electric',
    baseStats: { HP: 81, Attack: 64, Defense: 57, Instinct: 87, Speed: 91 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Muk: {
    name: 'Muk',
    primaryType: 'Psychic',
    baseStats: { HP: 101, Attack: 76, Defense: 66, Instinct: 81, Speed: 56 },
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'E', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'B', Chipper: 'E', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Magmar: {
    name: 'Magmar',
    primaryType: 'Fire',
    baseStats: { HP: 99, Attack: 89, Defense: 66, Instinct: 69, Speed: 57 },
    typeAptitudes: { Red: 'S', Blue: 'E', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Vaporeon: {
    name: 'Vaporeon',
    primaryType: 'Water',
    baseStats: { HP: 93, Attack: 69, Defense: 79, Instinct: 79, Speed: 60 },
    typeAptitudes: { Red: 'E', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'C', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Tangela: {
    name: 'Tangela',
    primaryType: 'Grass',
    baseStats: { HP: 89, Attack: 83, Defense: 69, Instinct: 73, Speed: 66 },
    typeAptitudes: { Red: 'E', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'A', Chipper: 'E', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Electabuzz: {
    name: 'Electabuzz',
    primaryType: 'Electric',
    baseStats: { HP: 85, Attack: 71, Defense: 61, Instinct: 83, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Weezing: {
    name: 'Weezing',
    primaryType: 'Psychic',
    baseStats: { HP: 94, Attack: 79, Defense: 69, Instinct: 75, Speed: 63 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'E', Debuffer: 'A', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Flareon: {
    name: 'Flareon',
    primaryType: 'Fire',
    baseStats: { HP: 88, Attack: 84, Defense: 59, Instinct: 73, Speed: 76 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Cloyster: {
    name: 'Cloyster',
    primaryType: 'Water',
    baseStats: { HP: 92, Attack: 65, Defense: 73, Instinct: 83, Speed: 67 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'F' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Parasect: {
    name: 'Parasect',
    primaryType: 'Grass',
    baseStats: { HP: 85, Attack: 79, Defense: 73, Instinct: 77, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'E', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Magneton: {
    name: 'Magneton',
    primaryType: 'Electric',
    baseStats: { HP: 79, Attack: 69, Defense: 55, Instinct: 93, Speed: 94 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'D', Yellow: 'S', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Tentacruel: {
    name: 'Tentacruel',
    primaryType: 'Psychic',
    baseStats: { HP: 97, Attack: 75, Defense: 71, Instinct: 69, Speed: 68 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'E', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Mew: {
    name: 'Mew',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 100, Attack: 100, Defense: 100, Instinct: 100, Speed: 100 }, 0),
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'A', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['Tackle', 'Ember'],
    learnableAbilities: ['BodySlam', 'HyperBeam', 'Flamethrower', 'Surf', 'RazorLeaf', 'Thunderbolt', 'Psychic']
  },
  Mewtwo: {
    name: 'Mewtwo',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 106, Attack: 110, Defense: 90, Instinct: 154, Speed: 130 }, 0),
    typeAptitudes: { Red: 'S', Blue: 'S', Green: 'S', Purple: 'S', Yellow: 'S', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'S', Debuffer: 'A', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['BodySlam', 'HyperBeam', 'Flamethrower', 'FireBlast', 'Surf', 'HydroPump', 'RazorLeaf', 'SolarBeam', 'Thunderbolt', 'Thunder', 'Psychic', 'PsychicBlast']
  },
  Snorlax: {
    name: 'Snorlax',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 160, Attack: 110, Defense: 65, Instinct: 65, Speed: 30 }, 0),
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'B', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'F', MadLad: 'D' },
    defaultAbilities: ['Tackle', 'BodySlam'],
    learnableAbilities: ['HyperBeam', 'Ember', 'WaterGun', 'VineWhip', 'ThunderShock']
  },
  
  // Common Tier Gacha Pokemon
  // Rule: 3 default moves (primary type basic, strategy move, off-type from best aptitude)
  // Rule: 3 learnable moves (2 primary type, 1 strategy)
  Rattata: {
    name: 'Rattata',
    primaryType: 'Normal',
    baseStats: { HP: 84, Attack: 69, Defense: 59, Instinct: 74, Speed: 94 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Headbutt', 'Bite'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'HyperBeam']
  },
  Meowth: {
    name: 'Meowth',
    primaryType: 'Normal',
    baseStats: { HP: 85, Attack: 70, Defense: 60, Instinct: 75, Speed: 90 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'B', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['PayDay', 'Slash', 'Bite'],
    learnableAbilities: ['BodySlam', 'Swift', 'HyperBeam']
  },
  Sandshrew: {
    name: 'Sandshrew',
    primaryType: 'Fighting',
    baseStats: { HP: 88, Attack: 83, Defense: 88, Instinct: 63, Speed: 58 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'D', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'F', MadLad: 'B' },
    defaultAbilities: ['Slash', 'Harden', 'SandAttack'],
    learnableAbilities: ['BodySlam', 'Headbutt', 'IronDefense']
  },
  Psyduck: {
    name: 'Psyduck',
    primaryType: 'Water',
    baseStats: { HP: 91, Attack: 66, Defense: 66, Instinct: 81, Speed: 76 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'Confusion'],
    learnableAbilities: ['Surf', 'BubbleBeam', 'Scald']
  },
  Poliwag: {
    name: 'Poliwag',
    primaryType: 'Water',
    baseStats: { HP: 89, Attack: 64, Defense: 64, Instinct: 74, Speed: 89 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'D', Yellow: 'B', Orange: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'B', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'BubbleBeam', 'BodySlam'],
    learnableAbilities: ['Surf', 'HydroPump', 'IceBeam']
  },
  Tentacool: {
    name: 'Tentacool',
    primaryType: 'Water',
    baseStats: { HP: 90, Attack: 68, Defense: 65, Instinct: 72, Speed: 85 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'BubbleBeam', 'PsyBeam'],
    learnableAbilities: ['Surf', 'AquaTail', 'HydroPump']
  },
  Shellder: {
    name: 'Shellder',
    primaryType: 'Water',
    baseStats: { HP: 82, Attack: 77, Defense: 97, Instinct: 67, Speed: 57 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'D', Yellow: 'B', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'F', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Harden', 'IcePunch'],
    learnableAbilities: ['Surf', 'IceBeam', 'IronDefense']
  },
  Krabby: {
    name: 'Krabby',
    primaryType: 'Water',
    baseStats: { HP: 78, Attack: 98, Defense: 88, Instinct: 58, Speed: 58 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'E', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Harden', 'ViceGrip'],
    learnableAbilities: ['Surf', 'Waterfall', 'IronDefense']
  },
  Oddish: {
    name: 'Oddish',
    primaryType: 'Grass',
    baseStats: { HP: 89, Attack: 69, Defense: 74, Instinct: 79, Speed: 69 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'PsyBeam'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'MegaDrain']
  },
  Bellsprout: {
    name: 'Bellsprout',
    primaryType: 'Grass',
    baseStats: { HP: 80, Attack: 85, Defense: 55, Instinct: 80, Speed: 80 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['VineWhip', 'RazorLeaf', 'PsyBeam'],
    learnableAbilities: ['SeedBomb', 'SolarBeam', 'SludgeBomb']
  },
  Paras: {
    name: 'Paras',
    primaryType: 'Grass',
    baseStats: { HP: 79, Attack: 84, Defense: 74, Instinct: 74, Speed: 69 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'Slash'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'MegaDrain']
  },
  Zubat: {
    name: 'Zubat',
    primaryType: 'Psychic',
    baseStats: { HP: 84, Attack: 69, Defense: 59, Instinct: 74, Speed: 94 },
    typeAptitudes: { Red: 'C', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'B', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'Bite'],
    learnableAbilities: ['Psychic', 'Psyshock', 'ShadowBall']
  },
  Grimer: {
    name: 'Grimer',
    primaryType: 'Psychic',
    baseStats: { HP: 92, Attack: 82, Defense: 67, Instinct: 77, Speed: 62 },
    typeAptitudes: { Red: 'C', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Harden', 'Bite'],
    learnableAbilities: ['Psychic', 'ShadowBall', 'IronDefense']
  },
  Koffing: {
    name: 'Koffing',
    primaryType: 'Psychic',
    baseStats: { HP: 88, Attack: 78, Defense: 73, Instinct: 73, Speed: 68 },
    typeAptitudes: { Red: 'C', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'Smokescreen'],
    learnableAbilities: ['Psychic', 'ShadowBall', 'DarkPulse']
  },
  Voltorb: {
    name: 'Voltorb',
    primaryType: 'Electric',
    baseStats: { HP: 81, Attack: 66, Defense: 66, Instinct: 76, Speed: 91 },
    typeAptitudes: { Red: 'C', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'F', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['ThunderShock', 'Spark', 'Swift'],
    learnableAbilities: ['Thunderbolt', 'Discharge', 'Thunder']
  },
  Magnemite: {
    name: 'Magnemite',
    primaryType: 'Electric',
    baseStats: { HP: 76, Attack: 71, Defense: 76, Instinct: 81, Speed: 76 },
    typeAptitudes: { Red: 'C', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'D', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['ThunderShock', 'Spark', 'FlashCannon'],
    learnableAbilities: ['Thunderbolt', 'ChargeBeam', 'Discharge']
  },
  Sentret: {
    name: 'Sentret',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 71, Defense: 66, Instinct: 76, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'Headbutt', 'Bite'],
    learnableAbilities: ['BodySlam', 'Swift', 'HyperBeam']
  },
  Zigzagoon: {
    name: 'Zigzagoon',
    primaryType: 'Normal',
    baseStats: { HP: 84, Attack: 68, Defense: 66, Instinct: 76, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'Headbutt', 'Bite'],
    learnableAbilities: ['BodySlam', 'Swift', 'HyperBeam']
  },
  Bidoof: {
    name: 'Bidoof',
    primaryType: 'Normal',
    baseStats: { HP: 90, Attack: 73, Defense: 71, Instinct: 70, Speed: 76 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'Bite', 'Headbutt'],
    learnableAbilities: ['BodySlam', 'Swift', 'Return']
  },
  Lillipup: {
    name: 'Lillipup',
    primaryType: 'Normal',
    baseStats: { HP: 85, Attack: 75, Defense: 67, Instinct: 73, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'WorkUp'],
    learnableAbilities: ['BodySlam', 'Return', 'PlayRough']
  },
  
  // Uncommon Tier Gacha Pokemon
  Vulpix: {
    name: 'Vulpix',
    primaryType: 'Fire',
    baseStats: { HP: 84, Attack: 64, Defense: 62, Instinct: 84, Speed: 86 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'A', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['Ember', 'FlameBurst', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'WillOWisp']
  },
  Ponyta: {
    name: 'Ponyta',
    primaryType: 'Fire',
    baseStats: { HP: 83, Attack: 83, Defense: 63, Instinct: 68, Speed: 83 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'Stomp'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'FlareBlitz']
  },
  Houndour: {
    name: 'Houndour',
    primaryType: 'Fire',
    baseStats: { HP: 79, Attack: 79, Defense: 59, Instinct: 84, Speed: 79 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'A', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['Ember', 'FireFang', 'DarkPulse'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'ShadowBall']
  },
  Torchic: {
    name: 'Torchic',
    primaryType: 'Fire',
    baseStats: { HP: 81, Attack: 76, Defense: 61, Instinct: 79, Speed: 83 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'E', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'FlareBlitz']
  },
  Chinchou: {
    name: 'Chinchou',
    primaryType: 'Water',
    baseStats: { HP: 85, Attack: 65, Defense: 73, Instinct: 81, Speed: 76 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'D', Yellow: 'B', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'BubbleBeam', 'Spark'],
    learnableAbilities: ['Surf', 'Scald', 'Thunderbolt']
  },
  Mareep: {
    name: 'Mareep',
    primaryType: 'Electric',
    baseStats: { HP: 83, Attack: 65, Defense: 63, Instinct: 85, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'A', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['ThunderShock', 'Spark', 'Swift'],
    learnableAbilities: ['Thunderbolt', 'ChargeBeam', 'Discharge']
  },
  Elekid: {
    name: 'Elekid',
    primaryType: 'Electric',
    baseStats: { HP: 79, Attack: 77, Defense: 59, Instinct: 81, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Spark', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'WildCharge']
  },
  Hoppip: {
    name: 'Hoppip',
    primaryType: 'Grass',
    baseStats: { HP: 77, Attack: 62, Defense: 65, Instinct: 87, Speed: 89 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'B', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'Swift'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'SolarBeam']
  },
  Sunkern: {
    name: 'Sunkern',
    primaryType: 'Grass',
    baseStats: { HP: 82, Attack: 67, Defense: 72, Instinct: 77, Speed: 82 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'D', Yellow: 'B', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'F' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'MegaDrain'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'SolarBeam']
  },
  Spinarak: {
    name: 'Spinarak',
    primaryType: 'Psychic',
    baseStats: { HP: 85, Attack: 76, Defense: 64, Instinct: 74, Speed: 81 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'Bite'],
    learnableAbilities: ['Psychic', 'Psyshock', 'ShadowBall']
  },
  Skorupi: {
    name: 'Skorupi',
    primaryType: 'Psychic',
    baseStats: { HP: 79, Attack: 77, Defense: 84, Instinct: 69, Speed: 71 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Harden', 'Bite'],
    learnableAbilities: ['Psychic', 'DarkPulse', 'IronDefense']
  },
  Eevee: {
    name: 'Eevee',
    primaryType: 'Normal',
    baseStats: { HP: 79, Attack: 69, Defense: 66, Instinct: 83, Speed: 83 },
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'B', Purple: 'B', Yellow: 'B', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'Swift'],
    learnableAbilities: ['BodySlam', 'Return', 'PlayRough']
  },
  Togepi: {
    name: 'Togepi',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 62, Defense: 75, Instinct: 87, Speed: 79 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Swift', 'Metronome', 'CharmMove'],
    learnableAbilities: ['BodySlam', 'DazzlingGleam', 'Moonblast']
  },
  Snubbull: {
    name: 'Snubbull',
    primaryType: 'Psychic',
    baseStats: { HP: 83, Attack: 86, Defense: 66, Instinct: 71, Speed: 74 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Bite', 'Headbutt', 'CharmMove'],
    learnableAbilities: ['BodySlam', 'PlayRough', 'Return']
  },
  Teddiursa: {
    name: 'Teddiursa',
    primaryType: 'Normal',
    baseStats: { HP: 83, Attack: 81, Defense: 66, Instinct: 73, Speed: 77 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'E', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['Slash', 'Bite', 'Leer'],
    learnableAbilities: ['BodySlam', 'PlayRough', 'Return']
  },

  // Rare Tier Gacha Pokemon
  Slugma: {
    name: 'Slugma',
    primaryType: 'Fire',
    baseStats: { HP: 89, Attack: 69, Defense: 67, Instinct: 84, Speed: 71 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'D', Chipper: 'B', MadLad: 'F' },
    defaultAbilities: ['Ember', 'Incinerate', 'Harden'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'FlameBurst']
  },
  Clefairy: {
    name: 'Clefairy',
    primaryType: 'Psychic',
    baseStats: { HP: 87, Attack: 61, Defense: 69, Instinct: 84, Speed: 79 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['Swift', 'Metronome', 'Moonblast'],
    learnableAbilities: ['BodySlam', 'DazzlingGleam', 'Moonlight']
  },
  Jigglypuff: {
    name: 'Jigglypuff',
    primaryType: 'Psychic',
    baseStats: { HP: 109, Attack: 64, Defense: 62, Instinct: 79, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'B', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['Swift', 'Harden', 'CharmMove'],
    learnableAbilities: ['BodySlam', 'PlayRough', 'IronDefense']
  },
  Phanpy: {
    name: 'Phanpy',
    primaryType: 'Fighting',
    baseStats: { HP: 84, Attack: 79, Defense: 77, Instinct: 67, Speed: 73 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'Harden', 'Rollout'],
    learnableAbilities: ['BodySlam', 'IronDefense', 'Earthquake']
  },
  Spheal: {
    name: 'Spheal',
    primaryType: 'Water',
    baseStats: { HP: 93, Attack: 65, Defense: 70, Instinct: 83, Speed: 69 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Harden', 'IcePunch'],
    learnableAbilities: ['Surf', 'IceBeam', 'IronDefense']
  },
  Spoink: {
    name: 'Spoink',
    primaryType: 'Psychic',
    baseStats: { HP: 83, Attack: 66, Defense: 69, Instinct: 86, Speed: 76 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Psyshock', 'Swift'],
    learnableAbilities: ['Psychic', 'ShadowBall', 'PsychicBlast']
  },
  Skitty: {
    name: 'Skitty',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 65, Defense: 63, Instinct: 83, Speed: 88 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'B', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'CharmMove'],
    learnableAbilities: ['BodySlam', 'PlayRough', 'DoubleEdge']
  },
  Deerling: {
    name: 'Deerling',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 71, Defense: 67, Instinct: 77, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'SolarBeam']
  },

  // Legendary Tier Gacha Pokemon (already defined as starters)
  Fletchling: {
    name: 'Fletchling',
    primaryType: 'Fire',
    baseStats: { HP: 79, Attack: 69, Defense: 59, Instinct: 81, Speed: 92 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'FlareBlitz'],
    isStarter: true
  },
  Bunnelby: {
    name: 'Bunnelby',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 75, Defense: 59, Instinct: 77, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'E', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'Headbutt', 'Bite'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'HyperBeam'],
    isStarter: true
  },
  Yungoos: {
    name: 'Yungoos',
    primaryType: 'Normal',
    baseStats: { HP: 83, Attack: 79, Defense: 65, Instinct: 75, Speed: 78 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'Leer'],
    learnableAbilities: ['BodySlam', 'Return', 'Headbutt'],
    isStarter: true
  },
  Wooloo: {
    name: 'Wooloo',
    primaryType: 'Normal',
    baseStats: { HP: 89, Attack: 65, Defense: 75, Instinct: 79, Speed: 72 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'Harden', 'TailWhip'],
    learnableAbilities: ['BodySlam', 'IronDefense', 'Return'],
    isStarter: true
  },
  Skwovet: {
    name: 'Skwovet',
    primaryType: 'Normal',
    baseStats: { HP: 85, Attack: 69, Defense: 67, Instinct: 77, Speed: 82 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'Bite', 'TailWhip'],
    learnableAbilities: ['BodySlam', 'Return', 'Headbutt'],
    isStarter: true
  },
  
  // New Gen 2-6 Pokemon (50 total)
  Cyndaquil: {
    name: 'Cyndaquil',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 95, Attack: 66, Defense: 56, Instinct: 76, Speed: 87 }, 2),
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FireBlast', 'PsyBeam'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'HyperBeam']
  },
  Totodile: {
    name: 'Totodile',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 100, Attack: 69, Defense: 64, Instinct: 71, Speed: 76 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Chikorita: {
    name: 'Chikorita',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 98, Attack: 59, Defense: 67, Instinct: 78, Speed: 78 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'PsyBeam'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Bite']
  },
  Mudkip: {
    name: 'Mudkip',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 100, Attack: 63, Defense: 66, Instinct: 73, Speed: 78 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Harden', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'IronDefense']
  },
  Treecko: {
    name: 'Treecko',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 90, Attack: 65, Defense: 61, Instinct: 79, Speed: 85 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'D', Yellow: 'B', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'PsyBeam'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'HyperBeam']
  },
  Piplup: {
    name: 'Piplup',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 97, Attack: 61, Defense: 67, Instinct: 77, Speed: 78 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Turtwig: {
    name: 'Turtwig',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 101, Attack: 61, Defense: 70, Instinct: 75, Speed: 73 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Harden', 'PsyBeam'],
    learnableAbilities: ['LeafBlade', 'SolarBeam', 'IronDefense']
  },
  Chimchar: {
    name: 'Chimchar',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 93, Attack: 66, Defense: 58, Instinct: 78, Speed: 85 }, 2),
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FireBlast', 'PsyBeam'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'HyperBeam']
  },
  Tepig: {
    name: 'Tepig',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 99, Attack: 68, Defense: 61, Instinct: 71, Speed: 81 }, 2),
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'E', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'PsyBeam'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'Bite']
  },
  Oshawott: {
    name: 'Oshawott',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 97, Attack: 65, Defense: 63, Instinct: 75, Speed: 80 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Snivy: {
    name: 'Snivy',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 91, Attack: 61, Defense: 67, Instinct: 81, Speed: 80 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'PsyBeam'],
    learnableAbilities: ['LeafBlade', 'SolarBeam', 'Bite']
  },
  Klefki: {
    name: 'Klefki',
    primaryType: 'Fighting',
    baseStats: { HP: 79, Attack: 71, Defense: 85, Instinct: 82, Speed: 83 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'IronDefense', 'Spark'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Harden']
  },
  Sneasel: {
    name: 'Sneasel',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 85, Defense: 63, Instinct: 79, Speed: 96 },
    typeAptitudes: { Red: 'B', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'FireBlast']
  },
  Murkrow: {
    name: 'Murkrow',
    primaryType: 'Psychic',
    baseStats: { HP: 81, Attack: 81, Defense: 58, Instinct: 81, Speed: 99 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Gligar: {
    name: 'Gligar',
    primaryType: 'Psychic',
    baseStats: { HP: 83, Attack: 77, Defense: 81, Instinct: 73, Speed: 86 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  Yanma: {
    name: 'Yanma',
    primaryType: 'Grass',
    baseStats: { HP: 78, Attack: 69, Defense: 59, Instinct: 83, Speed: 111 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'D', Yellow: 'B', Orange: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Spark'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Thunderbolt']
  },
  Snorunt: {
    name: 'Snorunt',
    primaryType: 'Water',
    baseStats: { HP: 81, Attack: 69, Defense: 69, Instinct: 79, Speed: 82 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'Bite']
  },
  Aron: {
    name: 'Aron',
    primaryType: 'Fighting',
    baseStats: { HP: 81, Attack: 75, Defense: 95, Instinct: 67, Speed: 62 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'F', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Harden']
  },
  Ralts: {
    name: 'Ralts',
    primaryType: 'Psychic',
    baseStats: { HP: 73, Attack: 63, Defense: 63, Instinct: 91, Speed: 90 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Shinx: {
    name: 'Shinx',
    primaryType: 'Electric',
    baseStats: { HP: 77, Attack: 75, Defense: 67, Instinct: 79, Speed: 82 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Spark', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'Bite']
  },
  Starly: {
    name: 'Starly',
    primaryType: 'Normal',
    baseStats: { HP: 75, Attack: 69, Defense: 57, Instinct: 75, Speed: 104 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'F', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },
  Buneary: {
    name: 'Buneary',
    primaryType: 'Normal',
    baseStats: { HP: 79, Attack: 77, Defense: 65, Instinct: 77, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'PlayRough']
  },
  Glameow: {
    name: 'Glameow',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 73, Defense: 65, Instinct: 79, Speed: 86 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'B', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'PlayRough']
  },
  Stunky: {
    name: 'Stunky',
    primaryType: 'Psychic',
    baseStats: { HP: 81, Attack: 77, Defense: 65, Instinct: 75, Speed: 82 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  Croagunk: {
    name: 'Croagunk',
    primaryType: 'Fighting',
    baseStats: { HP: 77, Attack: 77, Defense: 65, Instinct: 77, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  Purrloin: {
    name: 'Purrloin',
    primaryType: 'Psychic',
    baseStats: { HP: 75, Attack: 73, Defense: 62, Instinct: 81, Speed: 89 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'B', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'PlayRough']
  },
  Patrat: {
    name: 'Patrat',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 73, Defense: 65, Instinct: 75, Speed: 90 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Bite'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },
  Roggenrola: {
    name: 'Roggenrola',
    primaryType: 'Fighting',
    baseStats: { HP: 79, Attack: 73, Defense: 91, Instinct: 63, Speed: 74 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'D', Chipper: 'E', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Harden']
  },
  Tympole: {
    name: 'Tympole',
    primaryType: 'Water',
    baseStats: { HP: 81, Attack: 67, Defense: 65, Instinct: 77, Speed: 90 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'B', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Venipede: {
    name: 'Venipede',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 73, Defense: 75, Instinct: 71, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  Sandile: {
    name: 'Sandile',
    primaryType: 'Fighting',
    baseStats: { HP: 81, Attack: 79, Defense: 65, Instinct: 75, Speed: 80 },
    typeAptitudes: { Red: 'B', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Dwebble: {
    name: 'Dwebble',
    primaryType: 'Fighting',
    baseStats: { HP: 75, Attack: 73, Defense: 91, Instinct: 67, Speed: 74 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'D', Chipper: 'E', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Harden']
  },
  Scraggy: {
    name: 'Scraggy',
    primaryType: 'Fighting',
    baseStats: { HP: 81, Attack: 83, Defense: 85, Instinct: 67, Speed: 64 },
    typeAptitudes: { Red: 'B', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Gothita: {
    name: 'Gothita',
    primaryType: 'Psychic',
    baseStats: { HP: 75, Attack: 63, Defense: 71, Instinct: 87, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'Swift', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Litleo: {
    name: 'Litleo',
    primaryType: 'Fire',
    baseStats: { HP: 79, Attack: 73, Defense: 67, Instinct: 83, Speed: 78 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'Bite']
  },
  Skiddo: {
    name: 'Skiddo',
    primaryType: 'Grass',
    baseStats: { HP: 83, Attack: 75, Defense: 79, Instinct: 73, Speed: 70 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'A', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Harden', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'SolarBeam', 'IronDefense']
  },
  Pancham: {
    name: 'Pancham',
    primaryType: 'Fighting',
    baseStats: { HP: 83, Attack: 85, Defense: 67, Instinct: 71, Speed: 74 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Honedge: {
    name: 'Honedge',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 85, Defense: 95, Instinct: 69, Speed: 54 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'F', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Inkay: {
    name: 'Inkay',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 71, Defense: 69, Instinct: 83, Speed: 80 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'Swift', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Binacle: {
    name: 'Binacle',
    primaryType: 'Water',
    baseStats: { HP: 77, Attack: 77, Defense: 85, Instinct: 71, Speed: 70 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Harden', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'IronDefense']
  },
  Skrelp: {
    name: 'Skrelp',
    primaryType: 'Psychic',
    baseStats: { HP: 75, Attack: 71, Defense: 85, Instinct: 79, Speed: 70 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Harden', 'WaterGun'],
    learnableAbilities: ['Psychic', 'Psyshock', 'IronDefense']
  },
  Helioptile: {
    name: 'Helioptile',
    primaryType: 'Electric',
    baseStats: { HP: 75, Attack: 67, Defense: 63, Instinct: 83, Speed: 92 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'B', Yellow: 'A', Orange: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'B', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'HyperBeam']
  },
  Tyrunt: {
    name: 'Tyrunt',
    primaryType: 'Fighting',
    baseStats: { HP: 83, Attack: 85, Defense: 71, Instinct: 69, Speed: 72 },
    typeAptitudes: { Red: 'B', Blue: 'D', Green: 'D', Purple: 'D', Yellow: 'D', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Amaura: {
    name: 'Amaura',
    primaryType: 'Water',
    baseStats: { HP: 87, Attack: 63, Defense: 69, Instinct: 81, Speed: 80 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'Bite']
  },
  Goomy: {
    name: 'Goomy',
    primaryType: 'Water',
    baseStats: { HP: 77, Attack: 69, Defense: 63, Instinct: 83, Speed: 88 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'D', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Bite'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'PlayRough']
  },
  Noibat: {
    name: 'Noibat',
    primaryType: 'Psychic',
    baseStats: { HP: 75, Attack: 67, Defense: 59, Instinct: 81, Speed: 98 },
    typeAptitudes: { Red: 'D', Blue: 'D', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'F', Nuker: 'B', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  
  // Legendary Pokemon
  Moltres: {
    name: 'Moltres',
    primaryType: 'Fire',
    baseStats: { HP: 110, Attack: 95, Defense: 70, Instinct: 85, Speed: 75 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'FireBlast', 'Psychic'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'HyperBeam']
  },
  Articuno: {
    name: 'Articuno',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 75, Defense: 90, Instinct: 90, Speed: 65 },
    typeAptitudes: { Red: 'B', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'Psychic'],
    learnableAbilities: ['Surf', 'HydroPump', 'IceBeam']
  },
  Celebi: {
    name: 'Celebi',
    primaryType: 'Grass',
    baseStats: { HP: 120, Attack: 85, Defense: 85, Instinct: 80, Speed: 65 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'S', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'SwordsDance', 'Psychic'],
    learnableAbilities: ['LeafBlade', 'SolarBeam', 'CalmMind']
  },
  Raikou: {
    name: 'Raikou',
    primaryType: 'Electric',
    baseStats: { HP: 95, Attack: 80, Defense: 65, Instinct: 100, Speed: 95 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'S', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'Flamethrower'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'HyperBeam']
  },
  Gengar: {
    name: 'Gengar',
    primaryType: 'Psychic',
    baseStats: { HP: 105, Attack: 90, Defense: 75, Instinct: 85, Speed: 80 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'B', Purple: 'S', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'Flamethrower'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Psyshock']
  },
  Entei: {
    name: 'Entei',
    primaryType: 'Fire',
    baseStats: { HP: 108, Attack: 98, Defense: 73, Instinct: 83, Speed: 73 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'FlameCharge', 'Psychic'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'LavaPlume']
  },
  Suicune: {
    name: 'Suicune',
    primaryType: 'Water',
    baseStats: { HP: 118, Attack: 73, Defense: 93, Instinct: 88, Speed: 63 },
    typeAptitudes: { Red: 'B', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'SwordsDance', 'Psychic'],
    learnableAbilities: ['Surf', 'HydroPump', 'CalmMind']
  },

  // ============================================================================
  // EVOLVED POKEMON - Evolution targets for base Pokemon
  // ============================================================================

  // Ralts -> Kirlia -> Gardevoir
  Kirlia: {
    name: 'Kirlia',
    primaryType: 'Psychic',
    baseStats: { HP: 88, Attack: 73, Defense: 73, Instinct: 106, Speed: 100 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'C', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Psychic', 'CalmMind'],
    learnableAbilities: ['HyperBeam', 'ShadowBall', 'Moonblast']
  },
  Gardevoir: {
    name: 'Gardevoir',
    primaryType: 'Psychic',
    baseStats: { HP: 118, Attack: 85, Defense: 85, Instinct: 145, Speed: 110 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'S', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Psychic', 'Moonblast', 'CalmMind'],
    learnableAbilities: ['ShadowBall', 'FocusBlast', 'HyperBeam', 'DrainingKiss']
  },

  // Houndour -> Houndoom
  Houndoom: {
    name: 'Houndoom',
    primaryType: 'Fire',
    baseStats: { HP: 95, Attack: 110, Defense: 65, Instinct: 95, Speed: 95 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'FireBlast', 'Psychic'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'HyperBeam']
  },

  // Sentret -> Furret
  Furret: {
    name: 'Furret',
    primaryType: 'Normal',
    baseStats: { HP: 95, Attack: 86, Defense: 74, Instinct: 85, Speed: 100 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Zigzagoon -> Linoone
  Linoone: {
    name: 'Linoone',
    primaryType: 'Normal',
    baseStats: { HP: 98, Attack: 85, Defense: 71, Instinct: 81, Speed: 105 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Chinchou -> Lanturn
  Lanturn: {
    name: 'Lanturn',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 68, Defense: 78, Instinct: 96, Speed: 73 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'Growl', 'Spark'],
    learnableAbilities: ['Surf', 'HydroPump', 'Thunderbolt']
  },

  // Mareep -> Flaaffy -> Ampharos
  Flaaffy: {
    name: 'Flaaffy',
    primaryType: 'Electric',
    baseStats: { HP: 90, Attack: 70, Defense: 70, Instinct: 95, Speed: 85 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Thunderbolt', 'QuickAttack'],
    learnableAbilities: ['Thunder', 'VoltSwitch', 'HyperBeam']
  },
  Ampharos: {
    name: 'Ampharos',
    primaryType: 'Electric',
    baseStats: { HP: 105, Attack: 85, Defense: 85, Instinct: 115, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'S', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'Harden'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'IronDefense']
  },

  // Hoppip -> Skiploom -> Jumpluff
  Skiploom: {
    name: 'Skiploom',
    primaryType: 'Grass',
    baseStats: { HP: 83, Attack: 65, Defense: 70, Instinct: 90, Speed: 95 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'LeafBlade', 'HyperBeam']
  },
  Jumpluff: {
    name: 'Jumpluff',
    primaryType: 'Grass',
    baseStats: { HP: 95, Attack: 60, Defense: 80, Instinct: 105, Speed: 120 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'HyperBeam']
  },

  // Sunkern -> Sunflora
  Sunflora: {
    name: 'Sunflora',
    primaryType: 'Grass',
    baseStats: { HP: 95, Attack: 95, Defense: 75, Instinct: 105, Speed: 55 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'S', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'HyperBeam']
  },

  // Spinarak -> Ariados
  Ariados: {
    name: 'Ariados',
    primaryType: 'Psychic',
    baseStats: { HP: 90, Attack: 100, Defense: 80, Instinct: 75, Speed: 85 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'PsychicBlast', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'HyperBeam']
  },

  // Skorupi -> Drapion
  Drapion: {
    name: 'Drapion',
    primaryType: 'Psychic',
    baseStats: { HP: 90, Attack: 100, Defense: 110, Instinct: 75, Speed: 95 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'S', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'SwordsDance', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'CalmMind']
  },

  // Togepi -> Togetic
  Togetic: {
    name: 'Togetic',
    primaryType: 'Psychic',
    baseStats: { HP: 88, Attack: 65, Defense: 95, Instinct: 105, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },

  // Snubbull -> Granbull
  Granbull: {
    name: 'Granbull',
    primaryType: 'Psychic',
    baseStats: { HP: 100, Attack: 120, Defense: 85, Instinct: 70, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },

  // Teddiursa -> Ursaring
  Ursaring: {
    name: 'Ursaring',
    primaryType: 'Normal',
    baseStats: { HP: 105, Attack: 130, Defense: 85, Instinct: 85, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Slugma -> Magcargo
  Magcargo: {
    name: 'Magcargo',
    primaryType: 'Fire',
    baseStats: { HP: 80, Attack: 80, Defense: 120, Instinct: 95, Speed: 45 },
    typeAptitudes: { Red: 'A', Blue: 'E', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Ember', 'SwordsDance', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'CalmMind']
  },

  // Clefairy -> Clefable
  Clefable: {
    name: 'Clefable',
    primaryType: 'Psychic',
    baseStats: { HP: 105, Attack: 75, Defense: 83, Instinct: 100, Speed: 70 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },

  // Jigglypuff -> Wigglytuff
  Wigglytuff: {
    name: 'Wigglytuff',
    primaryType: 'Psychic',
    baseStats: { HP: 140, Attack: 75, Defense: 55, Instinct: 90, Speed: 55 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },

  // Phanpy -> Donphan
  Donphan: {
    name: 'Donphan',
    primaryType: 'Fighting',
    baseStats: { HP: 100, Attack: 120, Defense: 120, Instinct: 70, Speed: 60 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'IronDefense']
  },

  // Spoink -> Grumpig
  Grumpig: {
    name: 'Grumpig',
    primaryType: 'Psychic',
    baseStats: { HP: 95, Attack: 70, Defense: 80, Instinct: 110, Speed: 95 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'PsychicBlast', 'Harden'],
    learnableAbilities: ['Psychic', 'Psyshock', 'IronDefense']
  },

  // Skitty -> Delcatty
  Delcatty: {
    name: 'Delcatty',
    primaryType: 'Normal',
    baseStats: { HP: 90, Attack: 75, Defense: 70, Instinct: 65, Speed: 100 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Deerling -> Sawsbuck
  Sawsbuck: {
    name: 'Sawsbuck',
    primaryType: 'Grass',
    baseStats: { HP: 95, Attack: 105, Defense: 75, Instinct: 75, Speed: 105 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'HyperBeam']
  },

  // Bunnelby -> Diggersby
  Diggersby: {
    name: 'Diggersby',
    primaryType: 'Normal',
    baseStats: { HP: 95, Attack: 65, Defense: 85, Instinct: 65, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Growl', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Leer']
  },

  // Yungoos -> Gumshoos
  Gumshoos: {
    name: 'Gumshoos',
    primaryType: 'Normal',
    baseStats: { HP: 98, Attack: 110, Defense: 70, Instinct: 70, Speed: 75 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Wooloo -> Dubwool
  Dubwool: {
    name: 'Dubwool',
    primaryType: 'Normal',
    baseStats: { HP: 100, Attack: 85, Defense: 100, Instinct: 75, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'IronDefense']
  },

  // Skwovet -> Greedent
  Greedent: {
    name: 'Greedent',
    primaryType: 'Normal',
    baseStats: { HP: 120, Attack: 95, Defense: 95, Instinct: 60, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'IronDefense']
  },

  // ============================================================================
  // NEW POKEMON ADDITIONS (100 new Pokemon for gacha)
  // ============================================================================

  // COMMON TIER - 30 new Pokemon (Gen 2+)
  Hoothoot: {
    name: 'Hoothoot',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 67, Defense: 67, Instinct: 82, Speed: 83 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'Swift', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Ledyba: {
    name: 'Ledyba',
    primaryType: 'Grass',
    baseStats: { HP: 77, Attack: 62, Defense: 67, Instinct: 79, Speed: 95 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },
  Natu: {
    name: 'Natu',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 69, Defense: 65, Instinct: 85, Speed: 84 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'PsychicBlast', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'HyperBeam']
  },
  Marill: {
    name: 'Marill',
    primaryType: 'Water',
    baseStats: { HP: 85, Attack: 62, Defense: 67, Instinct: 77, Speed: 89 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Wooper: {
    name: 'Wooper',
    primaryType: 'Water',
    baseStats: { HP: 87, Attack: 70, Defense: 70, Instinct: 72, Speed: 81 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Swinub: {
    name: 'Swinub',
    primaryType: 'Water',
    baseStats: { HP: 81, Attack: 73, Defense: 67, Instinct: 73, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'Bite']
  },
  Remoraid: {
    name: 'Remoraid',
    primaryType: 'Water',
    baseStats: { HP: 79, Attack: 77, Defense: 59, Instinct: 77, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'HydroPump', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'HyperBeam']
  },
  Seedot: {
    name: 'Seedot',
    primaryType: 'Grass',
    baseStats: { HP: 79, Attack: 73, Defense: 67, Instinct: 73, Speed: 88 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Bite']
  },
  Lotad: {
    name: 'Lotad',
    primaryType: 'Grass',
    baseStats: { HP: 83, Attack: 67, Defense: 67, Instinct: 79, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'WaterGun'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Surf']
  },
  Shroomish: {
    name: 'Shroomish',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 75, Defense: 75, Instinct: 71, Speed: 78 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Bite']
  },
  Makuhita: {
    name: 'Makuhita',
    primaryType: 'Fighting',
    baseStats: { HP: 91, Attack: 77, Defense: 67, Instinct: 67, Speed: 78 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['LowKick', 'MachPunch', 'QuickAttack'],
    learnableAbilities: ['BrickBreak', 'CloseCombat', 'Bite']
  },
  Nosepass: {
    name: 'Nosepass',
    primaryType: 'Fighting',
    baseStats: { HP: 77, Attack: 73, Defense: 105, Instinct: 73, Speed: 52 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'C', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'Spark'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Thunderbolt']
  },
  Gulpin: {
    name: 'Gulpin',
    primaryType: 'Psychic',
    baseStats: { HP: 89, Attack: 73, Defense: 73, Instinct: 73, Speed: 72 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  Numel: {
    name: 'Numel',
    primaryType: 'Fire',
    baseStats: { HP: 85, Attack: 77, Defense: 71, Instinct: 77, Speed: 70 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'FlameCharge', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'Bite']
  },
  Trapinch: {
    name: 'Trapinch',
    primaryType: 'Fighting',
    baseStats: { HP: 79, Attack: 95, Defense: 73, Instinct: 65, Speed: 68 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Baltoy: {
    name: 'Baltoy',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 67, Defense: 77, Instinct: 85, Speed: 74 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  Barboach: {
    name: 'Barboach',
    primaryType: 'Water',
    baseStats: { HP: 81, Attack: 73, Defense: 67, Instinct: 75, Speed: 84 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Corphish: {
    name: 'Corphish',
    primaryType: 'Water',
    baseStats: { HP: 79, Attack: 85, Defense: 77, Instinct: 67, Speed: 72 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Kricketot: {
    name: 'Kricketot',
    primaryType: 'Grass',
    baseStats: { HP: 75, Attack: 69, Defense: 69, Instinct: 71, Speed: 96 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },
  Burmy: {
    name: 'Burmy',
    primaryType: 'Grass',
    baseStats: { HP: 77, Attack: 63, Defense: 73, Instinct: 77, Speed: 90 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },
  Combee: {
    name: 'Combee',
    primaryType: 'Grass',
    baseStats: { HP: 77, Attack: 63, Defense: 67, Instinct: 79, Speed: 94 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Spark'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Thunderbolt']
  },
  Cherubi: {
    name: 'Cherubi',
    primaryType: 'Grass',
    baseStats: { HP: 79, Attack: 73, Defense: 73, Instinct: 77, Speed: 78 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Bite']
  },
  Bronzor: {
    name: 'Bronzor',
    primaryType: 'Psychic',
    baseStats: { HP: 79, Attack: 59, Defense: 99, Instinct: 85, Speed: 58 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'C', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'IronDefense', 'Spark'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Harden']
  },
  Finneon: {
    name: 'Finneon',
    primaryType: 'Water',
    baseStats: { HP: 77, Attack: 67, Defense: 67, Instinct: 81, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Pidove: {
    name: 'Pidove',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 73, Defense: 63, Instinct: 73, Speed: 94 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },
  Blitzle: {
    name: 'Blitzle',
    primaryType: 'Electric',
    baseStats: { HP: 77, Attack: 73, Defense: 59, Instinct: 77, Speed: 94 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'HyperBeam']
  },
  Sewaddle: {
    name: 'Sewaddle',
    primaryType: 'Grass',
    baseStats: { HP: 77, Attack: 73, Defense: 73, Instinct: 73, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Bite']
  },
  Cottonee: {
    name: 'Cottonee',
    primaryType: 'Grass',
    baseStats: { HP: 77, Attack: 59, Defense: 77, Instinct: 85, Speed: 82 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Bite']
  },
  Petilil: {
    name: 'Petilil',
    primaryType: 'Grass',
    baseStats: { HP: 79, Attack: 65, Defense: 65, Instinct: 87, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Bite']
  },

  // RARE TIER - 50 new Pokemon (Gen 2+)
  Misdreavus: {
    name: 'Misdreavus',
    primaryType: 'Psychic',
    baseStats: { HP: 81, Attack: 75, Defense: 75, Instinct: 95, Speed: 94 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'S', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Psyshock']
  },
  Girafarig: {
    name: 'Girafarig',
    primaryType: 'Psychic',
    baseStats: { HP: 83, Attack: 85, Defense: 69, Instinct: 95, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'HyperBeam']
  },
  Dunsparce: {
    name: 'Dunsparce',
    primaryType: 'Fighting',
    baseStats: { HP: 105, Attack: 79, Defense: 79, Instinct: 75, Speed: 62 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'Harden', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Growl']
  },
  Qwilfish: {
    name: 'Qwilfish',
    primaryType: 'Water',
    baseStats: { HP: 83, Attack: 95, Defense: 85, Instinct: 69, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'Psychic']
  },
  Shuckle: {
    name: 'Shuckle',
    primaryType: 'Fighting',
    baseStats: { HP: 65, Attack: 35, Defense: 170, Instinct: 35, Speed: 15 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'S', Nuker: 'F', Debuffer: 'A', Chipper: 'F', MadLad: 'C' },
    defaultAbilities: ['Headbutt', 'SwordsDance', 'Swift'],
    learnableAbilities: ['BodySlam', 'IronDefense', 'Growl']
  },
  Corsola: {
    name: 'Corsola',
    primaryType: 'Water',
    baseStats: { HP: 89, Attack: 69, Defense: 95, Instinct: 85, Speed: 62 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Harden', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'IronDefense']
  },
  Mantine: {
    name: 'Mantine',
    primaryType: 'Water',
    baseStats: { HP: 89, Attack: 55, Defense: 79, Instinct: 115, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'Growl', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'Leer']
  },
  Larvitar: {
    name: 'Larvitar',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 100, Attack: 74, Defense: 70, Instinct: 65, Speed: 71 }, 2),
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Poochyena: {
    name: 'Poochyena',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 79, Defense: 59, Instinct: 73, Speed: 92 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Wingull: {
    name: 'Wingull',
    primaryType: 'Water',
    baseStats: { HP: 77, Attack: 67, Defense: 57, Instinct: 79, Speed: 100 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'HydroPump', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'HyperBeam']
  },
  Surskit: {
    name: 'Surskit',
    primaryType: 'Water',
    baseStats: { HP: 77, Attack: 65, Defense: 59, Instinct: 87, Speed: 92 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'HydroPump', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'HyperBeam']
  },
  Electrike: {
    name: 'Electrike',
    primaryType: 'Electric',
    baseStats: { HP: 77, Attack: 73, Defense: 59, Instinct: 85, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'HyperBeam']
  },
  Roselia: {
    name: 'Roselia',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 75, Defense: 63, Instinct: 105, Speed: 86 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'PsyBeam'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Psychic']
  },
  Wailmer: {
    name: 'Wailmer',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 79, Defense: 59, Instinct: 79, Speed: 68 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Torkoal: {
    name: 'Torkoal',
    primaryType: 'Fire',
    baseStats: { HP: 89, Attack: 89, Defense: 130, Instinct: 95, Speed: 37 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Cacnea: {
    name: 'Cacnea',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 95, Defense: 75, Instinct: 75, Speed: 74 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Seviper: {
    name: 'Seviper',
    primaryType: 'Psychic',
    baseStats: { HP: 89, Attack: 105, Defense: 75, Instinct: 95, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Zangoose: {
    name: 'Zangoose',
    primaryType: 'Fighting',
    baseStats: { HP: 89, Attack: 115, Defense: 69, Instinct: 75, Speed: 102 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'ExtremeSpeed']
  },
  Tropius: {
    name: 'Tropius',
    primaryType: 'Grass',
    baseStats: { HP: 109, Attack: 75, Defense: 91, Instinct: 79, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Chimecho: {
    name: 'Chimecho',
    primaryType: 'Psychic',
    baseStats: { HP: 89, Attack: 69, Defense: 85, Instinct: 105, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Absol: {
    name: 'Absol',
    primaryType: 'Psychic',
    baseStats: { HP: 89, Attack: 115, Defense: 65, Instinct: 85, Speed: 96 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'ExtremeSpeed']
  },
  Snover: {
    name: 'Snover',
    primaryType: 'Grass',
    baseStats: { HP: 85, Attack: 79, Defense: 69, Instinct: 79, Speed: 68 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'IceBeam', 'BodySlam']
  },
  Riolu: {
    name: 'Riolu',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 80, Attack: 79, Defense: 65, Instinct: 75, Speed: 81 }, 1),
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['LowKick', 'QuickAttack'],
    learnableAbilities: ['BrickBreak', 'BodySlam']
  },
  Hippopotas: {
    name: 'Hippopotas',
    primaryType: 'Fighting',
    baseStats: { HP: 91, Attack: 79, Defense: 85, Instinct: 65, Speed: 60 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Carnivine: {
    name: 'Carnivine',
    primaryType: 'Grass',
    baseStats: { HP: 89, Attack: 95, Defense: 79, Instinct: 89, Speed: 68 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['PowerWhip', 'SolarBeam', 'BodySlam']
  },
  Mantyke: {
    name: 'Mantyke',
    primaryType: 'Water',
    baseStats: { HP: 79, Attack: 55, Defense: 69, Instinct: 105, Speed: 72 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam']
  },
  Sawk: {
    name: 'Sawk',
    primaryType: 'Fighting',
    baseStats: { HP: 85, Attack: 115, Defense: 85, Instinct: 65, Speed: 90 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['LowKick', 'QuickAttack'],
    learnableAbilities: ['BrickBreak', 'CloseCombat', 'BodySlam']
  },
  Throh: {
    name: 'Throh',
    primaryType: 'Fighting',
    baseStats: { HP: 115, Attack: 105, Defense: 95, Instinct: 55, Speed: 70 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'S' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['BrickBreak', 'CloseCombat', 'BodySlam']
  },
  Basculin: {
    name: 'Basculin',
    primaryType: 'Water',
    baseStats: { HP: 85, Attack: 95, Defense: 75, Instinct: 85, Speed: 100 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Darumaka: {
    name: 'Darumaka',
    primaryType: 'Fire',
    baseStats: { HP: 79, Attack: 95, Defense: 59, Instinct: 59, Speed: 88 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam']
  },
  Maractus: {
    name: 'Maractus',
    primaryType: 'Grass',
    baseStats: { HP: 85, Attack: 95, Defense: 77, Instinct: 105, Speed: 78 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Druddigon: {
    name: 'Druddigon',
    primaryType: 'Fire',
    baseStats: { HP: 91, Attack: 115, Defense: 95, Instinct: 75, Speed: 64 },
    typeAptitudes: { Red: 'A', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Pawniard: {
    name: 'Pawniard',
    primaryType: 'Fighting',
    baseStats: { HP: 77, Attack: 95, Defense: 85, Instinct: 65, Speed: 78 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Rufflet: {
    name: 'Rufflet',
    primaryType: 'Fighting',
    baseStats: { HP: 85, Attack: 91, Defense: 75, Instinct: 65, Speed: 84 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['ExtremeSpeed', 'BodySlam']
  },
  Vullaby: {
    name: 'Vullaby',
    primaryType: 'Psychic',
    baseStats: { HP: 85, Attack: 69, Defense: 95, Instinct: 65, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['BodySlam']
  },
  Heatmor: {
    name: 'Heatmor',
    primaryType: 'Fire',
    baseStats: { HP: 91, Attack: 105, Defense: 75, Instinct: 105, Speed: 74 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Durant: {
    name: 'Durant',
    primaryType: 'Fighting',
    baseStats: { HP: 77, Attack: 109, Defense: 115, Instinct: 55, Speed: 94 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Deino: {
    name: 'Deino',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 92, Attack: 75, Defense: 60, Instinct: 65, Speed: 68 }, 2),
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Espurr: {
    name: 'Espurr',
    primaryType: 'Psychic',
    baseStats: { HP: 79, Attack: 69, Defense: 59, Instinct: 91, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Spritzee: {
    name: 'Spritzee',
    primaryType: 'Psychic',
    baseStats: { HP: 85, Attack: 59, Defense: 75, Instinct: 91, Speed: 70 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Swirlix: {
    name: 'Swirlix',
    primaryType: 'Psychic',
    baseStats: { HP: 79, Attack: 75, Defense: 75, Instinct: 75, Speed: 76 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Bergmite: {
    name: 'Bergmite',
    primaryType: 'Water',
    baseStats: { HP: 83, Attack: 77, Defense: 95, Instinct: 59, Speed: 66 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['IceBeam', 'BodySlam']
  },
  Phantump: {
    name: 'Phantump',
    primaryType: 'Grass',
    baseStats: { HP: 79, Attack: 83, Defense: 85, Instinct: 69, Speed: 64 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Pumpkaboo: {
    name: 'Pumpkaboo',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 79, Defense: 85, Instinct: 69, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Dedenne: {
    name: 'Dedenne',
    primaryType: 'Electric',
    baseStats: { HP: 83, Attack: 67, Defense: 67, Instinct: 91, Speed: 92 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'BodySlam']
  },
  Carbink: {
    name: 'Carbink',
    primaryType: 'Fighting',
    baseStats: { HP: 81, Attack: 55, Defense: 135, Instinct: 95, Speed: 54 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'A', Chipper: 'E', MadLad: 'D' },
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },

  // LEGENDARY TIER - 20 new Pokemon (including Mew/Mewtwo which already exist in POKEMON)
  // Note: Mew and Mewtwo are already defined above, just need to add to gacha pool
  HoOh: {
    name: 'Ho-Oh',
    primaryType: 'Fire',
    baseStats: { HP: 120, Attack: 105, Defense: 80, Instinct: 90, Speed: 70 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'SacredFire', 'HyperBeam']
  },
  Latias: {
    name: 'Latias',
    primaryType: 'Psychic',
    baseStats: { HP: 95, Attack: 85, Defense: 90, Instinct: 115, Speed: 100 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Latios: {
    name: 'Latios',
    primaryType: 'Psychic',
    baseStats: { HP: 95, Attack: 100, Defense: 85, Instinct: 115, Speed: 100 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Jirachi: {
    name: 'Jirachi',
    primaryType: 'Psychic',
    baseStats: { HP: 105, Attack: 95, Defense: 95, Instinct: 95, Speed: 95 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Deoxys: {
    name: 'Deoxys',
    primaryType: 'Psychic',
    baseStats: { HP: 85, Attack: 135, Defense: 55, Instinct: 135, Speed: 130 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'S', Debuffer: 'D', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Uxie: {
    name: 'Uxie',
    primaryType: 'Psychic',
    baseStats: { HP: 95, Attack: 85, Defense: 105, Instinct: 105, Speed: 85 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Mesprit: {
    name: 'Mesprit',
    primaryType: 'Psychic',
    baseStats: { HP: 95, Attack: 95, Defense: 95, Instinct: 95, Speed: 95 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Azelf: {
    name: 'Azelf',
    primaryType: 'Psychic',
    baseStats: { HP: 85, Attack: 105, Defense: 85, Instinct: 105, Speed: 105 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Heatran: {
    name: 'Heatran',
    primaryType: 'Fire',
    baseStats: { HP: 105, Attack: 95, Defense: 110, Instinct: 115, Speed: 77 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'A', Purple: 'A', Yellow: 'A', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'LavaPlume', 'HyperBeam']
  },
  Regigigas: {
    name: 'Regigigas',
    primaryType: 'Normal',
    baseStats: { HP: 115, Attack: 140, Defense: 110, Instinct: 95, Speed: 90 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'A', Yellow: 'A', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'HyperBeam']
  },
  Cresselia: {
    name: 'Cresselia',
    primaryType: 'Psychic',
    baseStats: { HP: 120, Attack: 75, Defense: 115, Instinct: 120, Speed: 85 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'A', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Darkrai: {
    name: 'Darkrai',
    primaryType: 'Psychic',
    baseStats: { HP: 90, Attack: 100, Defense: 75, Instinct: 120, Speed: 125 },
    typeAptitudes: { Red: 'B', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'B', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Hypnosis', 'HyperBeam']
  },
  Shaymin: {
    name: 'Shaymin',
    primaryType: 'Grass',
    baseStats: { HP: 105, Attack: 95, Defense: 95, Instinct: 95, Speed: 95 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'S', Purple: 'A', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam', 'HyperBeam']
  },
  Arceus: {
    name: 'Arceus',
    primaryType: 'Normal',
    baseStats: { HP: 120, Attack: 120, Defense: 120, Instinct: 120, Speed: 120 },
    typeAptitudes: { Red: 'S', Blue: 'S', Green: 'S', Purple: 'S', Yellow: 'S', Orange: 'S' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['HyperBeam', 'BodySlam', 'Flamethrower', 'Surf', 'Thunderbolt', 'Psychic']
  },
  Victini: {
    name: 'Victini',
    primaryType: 'Fire',
    baseStats: { HP: 105, Attack: 100, Defense: 100, Instinct: 100, Speed: 100 },
    typeAptitudes: { Red: 'S', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'Psychic', 'HyperBeam']
  },
  Cobalion: {
    name: 'Cobalion',
    primaryType: 'Fighting',
    baseStats: { HP: 105, Attack: 95, Defense: 120, Instinct: 85, Speed: 100 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'A', Orange: 'S' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['CloseCombat', 'StoneEdge', 'BodySlam', 'HyperBeam']
  },
  Terrakion: {
    name: 'Terrakion',
    primaryType: 'Fighting',
    baseStats: { HP: 105, Attack: 120, Defense: 95, Instinct: 85, Speed: 100 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'A', Orange: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['CloseCombat', 'StoneEdge', 'BodySlam', 'HyperBeam']
  },
  Virizion: {
    name: 'Virizion',
    primaryType: 'Grass',
    baseStats: { HP: 105, Attack: 95, Defense: 85, Instinct: 120, Speed: 100 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'S', Purple: 'A', Yellow: 'A', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'LeafBlade', 'SolarBeam', 'HyperBeam']
  }
};

// ============================================================================
// LEGENDARY POKEMON
// ============================================================================

const LEGENDARY_POKEMON = {
  Moltres: {
    name: 'Moltres',
    primaryType: 'Fire',
    baseStats: { HP: 110, Attack: 95, Defense: 70, Instinct: 85, Speed: 75 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam', 'HyperBeam']
  },
  Articuno: {
    name: 'Articuno',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 75, Defense: 90, Instinct: 90, Speed: 65 },
    typeAptitudes: { Red: 'B', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },
  Celebi: {
    name: 'Celebi',
    primaryType: 'Grass',
    baseStats: { HP: 120, Attack: 85, Defense: 85, Instinct: 80, Speed: 65 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'S', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam', 'HyperBeam']
  },
  Raikou: {
    name: 'Raikou',
    primaryType: 'Electric',
    baseStats: { HP: 95, Attack: 80, Defense: 65, Instinct: 100, Speed: 95 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'S', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam', 'HyperBeam']
  },
  Gengar: {
    name: 'Gengar',
    primaryType: 'Psychic',
    baseStats: { HP: 105, Attack: 90, Defense: 75, Instinct: 85, Speed: 80 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'B', Purple: 'S', Yellow: 'D', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Entei: {
    name: 'Entei',
    primaryType: 'Fire',
    baseStats: { HP: 108, Attack: 98, Defense: 73, Instinct: 83, Speed: 73 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam', 'HyperBeam']
  },
  Suicune: {
    name: 'Suicune',
    primaryType: 'Water',
    baseStats: { HP: 118, Attack: 73, Defense: 93, Instinct: 88, Speed: 63 },
    typeAptitudes: { Red: 'B', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },
  Zapdos: {
    name: 'Zapdos',
    primaryType: 'Electric',
    baseStats: { HP: 100, Attack: 88, Defense: 68, Instinct: 98, Speed: 91 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'S', Orange: 'D' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam', 'HyperBeam']
  },
  Lugia: {
    name: 'Lugia',
    primaryType: 'Psychic',
    baseStats: { HP: 125, Attack: 80, Defense: 100, Instinct: 95, Speed: 65 },
    typeAptitudes: { Red: 'A', Blue: 'S', Green: 'B', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  HoOh: {
    name: 'Ho-Oh',
    primaryType: 'Fire',
    baseStats: { HP: 120, Attack: 105, Defense: 80, Instinct: 90, Speed: 70 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'SacredFire', 'HyperBeam']
  },
  Mewtwo: {
    name: 'Mewtwo',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 105, Defense: 70, Instinct: 105, Speed: 85 },
    typeAptitudes: { Red: 'B', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Psystrike', 'HyperBeam']
  },
  Kyogre: {
    name: 'Kyogre',
    primaryType: 'Water',
    baseStats: { HP: 122, Attack: 98, Defense: 85, Instinct: 95, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'OriginPulse', 'HyperBeam']
  },
  Groudon: {
    name: 'Groudon',
    primaryType: 'Fire',
    baseStats: { HP: 118, Attack: 110, Defense: 95, Instinct: 78, Speed: 64 },
    typeAptitudes: { Red: 'S', Blue: 'E', Green: 'A', Purple: 'B', Yellow: 'A', Orange: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'PrecipiceBlades', 'HyperBeam']
  },
  Rayquaza: {
    name: 'Rayquaza',
    primaryType: 'Grass',
    baseStats: { HP: 115, Attack: 105, Defense: 75, Instinct: 105, Speed: 85 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'S', Purple: 'A', Yellow: 'S', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'DragonAscent', 'HyperBeam']
  },
  Dialga: {
    name: 'Dialga',
    primaryType: 'Fighting',
    baseStats: { HP: 112, Attack: 103, Defense: 88, Instinct: 88, Speed: 74 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'A', Orange: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['KarateChop', 'Submission', 'RoarOfTime', 'HyperBeam']
  },
  Palkia: {
    name: 'Palkia',
    primaryType: 'Water',
    baseStats: { HP: 108, Attack: 103, Defense: 78, Instinct: 98, Speed: 78 },
    typeAptitudes: { Red: 'A', Blue: 'S', Green: 'C', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'SpacialRend', 'HyperBeam']
  },
  Giratina: {
    name: 'Giratina',
    primaryType: 'Psychic',
    baseStats: { HP: 125, Attack: 93, Defense: 93, Instinct: 93, Speed: 71 },
    typeAptitudes: { Red: 'B', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'ShadowForce', 'HyperBeam']
  }
};

// ============================================================================
// GYM LEADER POKEMON (for career battles)
// ============================================================================

const GYM_LEADER_POKEMON = {
  BlaineArcanine: {
    name: 'Arcanine',
    primaryType: 'Fire',
    baseStats: { HP: 130, Attack: 110, Defense: 85, Instinct: 80, Speed: 95 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Flamethrower', 'FireFang', 'FlareBlitz'],
    learnableAbilities: ['FireBlast', 'HyperBeam', 'Crunch']
  },
  MistyStarmie: {
    name: 'Starmie',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 85, Defense: 90, Instinct: 115, Speed: 95 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'A', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Surf', 'Psychic', 'IceBeam'],
    learnableAbilities: ['HydroPump', 'PsychicBlast', 'Thunderbolt']
  },
  ErikaVileplume: {
    name: 'Vileplume',
    primaryType: 'Grass',
    baseStats: { HP: 125, Attack: 90, Defense: 95, Instinct: 100, Speed: 65 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['GigaDrain', 'SludgeBomb', 'SolarBeam'],
    learnableAbilities: ['LeafStorm', 'SwordsDance', 'Moonblast']
  },
  SurgeRaichu: {
    name: 'Raichu',
    primaryType: 'Electric',
    baseStats: { HP: 110, Attack: 95, Defense: 70, Instinct: 95, Speed: 120 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'S', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Thunderbolt', 'Thunder', 'VoltSwitch'],
    learnableAbilities: ['WildCharge', 'FocusBlast', 'Nastyplot']
  },
  AgathaNidoking: {
    name: 'Nidoking',
    primaryType: 'Fighting',
    baseStats: { HP: 125, Attack: 110, Defense: 85, Instinct: 85, Speed: 90 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'A', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Earthquake', 'SludgeBomb', 'IceBeam'],
    learnableAbilities: ['Megahorn', 'Thunderbolt', 'ShadowBall']
  },
  GiovanniRapidash: {
    name: 'Rapidash',
    primaryType: 'Fire',
    baseStats: { HP: 115, Attack: 105, Defense: 75, Instinct: 85, Speed: 115 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'B', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['FlareBlitz', 'Flamethrower', 'IronTail'],
    learnableAbilities: ['Megahorn', 'HyperBeam', 'SolarBeam']
  },
  WallaceLapras: {
    name: 'Lapras',
    primaryType: 'Water',
    baseStats: { HP: 150, Attack: 90, Defense: 95, Instinct: 100, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['HydroPump', 'IceBeam', 'Blizzard'],
    learnableAbilities: ['Surf', 'Thunderbolt', 'IronDefense']
  },
  WattsonElectabuzz: {
    name: 'Electabuzz',
    primaryType: 'Electric',
    baseStats: { HP: 115, Attack: 93, Defense: 67, Instinct: 95, Speed: 115 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Thunderbolt', 'ThunderShock', 'WildCharge'],
    learnableAbilities: ['Thunder', 'FocusBlast', 'Psychic']
  },
  WillWeezing: {
    name: 'Weezing',
    primaryType: 'Psychic',
    baseStats: { HP: 115, Attack: 95, Defense: 135, Instinct: 85, Speed: 65 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['SludgeBomb', 'ShadowBall', 'DarkPulse'],
    learnableAbilities: ['Flamethrower', 'WillOWisp', 'IronDefense']
  },
  FlanneryMagmar: {
    name: 'Magmar',
    primaryType: 'Fire',
    baseStats: { HP: 115, Attack: 105, Defense: 67, Instinct: 105, Speed: 103 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Flamethrower', 'LavaPlume', 'FireBlast'],
    learnableAbilities: ['Psychic', 'ThunderPunch', 'CrossChop']
  },
  SabrinaArbok: {
    name: 'Arbok',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 100, Defense: 79, Instinct: 79, Speed: 85 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['SludgeBomb', 'DarkPulse', 'Psychic'],
    learnableAbilities: ['Earthquake', 'Crunch', 'GunkShot']
  },
  JuanVaporeon: {
    name: 'Vaporeon',
    primaryType: 'Water',
    baseStats: { HP: 150, Attack: 75, Defense: 70, Instinct: 115, Speed: 75 },
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['HydroPump', 'Surf', 'IceBeam'],
    learnableAbilities: ['ShadowBall', 'AquaRing', 'AcidArmor']
  },
  WinonaExeggutor: {
    name: 'Exeggutor',
    primaryType: 'Grass',
    baseStats: { HP: 135, Attack: 100, Defense: 90, Instinct: 135, Speed: 55 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['SolarBeam', 'Psychic', 'GigaDrain'],
    learnableAbilities: ['LeafStorm', 'PsychicBlast', 'SludgeBomb']
  },
  // ============================================================================
  // COMMON TIER SUPPORTS AS GYM LEADERS
  // ============================================================================
  WhitneyMiltank: {
    name: 'Miltank',
    primaryType: 'Normal',
    baseStats: { HP: 140, Attack: 90, Defense: 115, Instinct: 65, Speed: 85 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['BodySlam', 'IronHead', 'Earthquake'],
    learnableAbilities: ['HyperBeam', 'StoneEdge', 'IronDefense']
  },
  ChuckPoliwrath: {
    name: 'Poliwrath',
    primaryType: 'Fighting',
    baseStats: { HP: 130, Attack: 105, Defense: 100, Instinct: 80, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['CloseCombat', 'Surf', 'IceBeam'],
    learnableAbilities: ['HydroPump', 'Earthquake', 'BulkUp']
  },
  PryceDelibird: {
    name: 'Piloswine',
    primaryType: 'Water',
    baseStats: { HP: 140, Attack: 105, Defense: 95, Instinct: 70, Speed: 65 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Blizzard', 'Earthquake', 'IceBeam'],
    learnableAbilities: ['StoneEdge', 'IronHead', 'AncientPower']
  },

  // ============================================================================
  // UNCOMMON TIER SUPPORTS AS GYM LEADERS
  // ============================================================================
  BrockOnix: {
    name: 'Golem',
    primaryType: 'Fighting',
    baseStats: { HP: 125, Attack: 115, Defense: 140, Instinct: 60, Speed: 55 },
    typeAptitudes: { Red: 'B', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Earthquake', 'StoneEdge', 'RockSlide'],
    learnableAbilities: ['IronHead', 'Explosion', 'IronDefense']
  },
  KogaMuk: {
    name: 'Muk',
    primaryType: 'Psychic',
    baseStats: { HP: 145, Attack: 115, Defense: 90, Instinct: 75, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'B', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'A', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['SludgeBomb', 'DarkPulse', 'ShadowBall'],
    learnableAbilities: ['Explosion', 'Flamethrower', 'IceBeam']
  },
  JasmineSteelix: {
    name: 'Steelix',
    primaryType: 'Fighting',
    baseStats: { HP: 120, Attack: 95, Defense: 200, Instinct: 70, Speed: 40 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'B', Orange: 'B' },
    strategyAptitudes: { Scaler: 'S', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['IronTail', 'Earthquake', 'StoneEdge'],
    learnableAbilities: ['IronHead', 'DragonTail', 'IronDefense']
  },
  KarenUmbreon: {
    name: 'Umbreon',
    primaryType: 'Psychic',
    baseStats: { HP: 145, Attack: 75, Defense: 130, Instinct: 115, Speed: 75 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'S', Yellow: 'C', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['DarkPulse', 'ShadowBall', 'Psychic'],
    learnableAbilities: ['Moonblast', 'IronDefense', 'Curse']
  },
  MiloEldegoss: {
    name: 'Eldegoss',
    primaryType: 'Grass',
    baseStats: { HP: 115, Attack: 65, Defense: 100, Instinct: 105, Speed: 80 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['GigaDrain', 'LeafStorm', 'SolarBeam'],
    learnableAbilities: ['SludgeBomb', 'CottonGuard', 'Moonblast']
  },
  KabuCentiskorch: {
    name: 'Centiskorch',
    primaryType: 'Fire',
    baseStats: { HP: 140, Attack: 125, Defense: 80, Instinct: 75, Speed: 75 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['FlareBlitz', 'FireBlast', 'Crunch'],
    learnableAbilities: ['LavaPlume', 'PowerWhip', 'HyperBeam']
  },
  MelonyLapras: {
    name: 'Froslass',
    primaryType: 'Water',
    baseStats: { HP: 100, Attack: 90, Defense: 80, Instinct: 110, Speed: 110 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Blizzard', 'ShadowBall', 'IceBeam'],
    learnableAbilities: ['Psychic', 'Thunderbolt', 'DestinyBond']
  },
  GordieCoalossal: {
    name: 'Coalossal',
    primaryType: 'Fire',
    baseStats: { HP: 150, Attack: 95, Defense: 140, Instinct: 65, Speed: 40 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'S', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['FlareBlitz', 'StoneEdge', 'Earthquake'],
    learnableAbilities: ['FireBlast', 'IronHead', 'IronDefense']
  },
  KlaraSlowbro: {
    name: 'Slowbro',
    primaryType: 'Psychic',
    baseStats: { HP: 135, Attack: 85, Defense: 130, Instinct: 105, Speed: 40 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Psychic', 'Surf', 'SludgeBomb'],
    learnableAbilities: ['IceBeam', 'Flamethrower', 'IronDefense']
  },
  AverySlowking: {
    name: 'Slowking',
    primaryType: 'Psychic',
    baseStats: { HP: 135, Attack: 85, Defense: 95, Instinct: 130, Speed: 40 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'S', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'A', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsychicBlast', 'Surf', 'ShadowBall'],
    learnableAbilities: ['IceBeam', 'Flamethrower', 'CalmMind']
  },
  IonoBellibolt: {
    name: 'Bellibolt',
    primaryType: 'Electric',
    baseStats: { HP: 160, Attack: 85, Defense: 100, Instinct: 105, Speed: 45 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'C', Yellow: 'S', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Thunder', 'Thunderbolt', 'Surf'],
    learnableAbilities: ['WildCharge', 'SludgeBomb', 'IronDefense']
  },
  GrushaAltaria: {
    name: 'Altaria',
    primaryType: 'Grass',
    baseStats: { HP: 115, Attack: 80, Defense: 105, Instinct: 105, Speed: 85 },
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['DragonPulse', 'Moonblast', 'IceBeam'],
    learnableAbilities: ['DragonDance', 'SkyAttack', 'Earthquake']
  },

  // ============================================================================
  // RARE TIER SUPPORTS AS GYM LEADERS
  // ============================================================================
  MortyGengar: {
    name: 'Gengar',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 130, Defense: 70, Instinct: 140, Speed: 120 },
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'C', Purple: 'S', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['ShadowBall', 'Psychic', 'DarkPulse'],
    learnableAbilities: ['SludgeBomb', 'Hypnosis', 'DreamEater']
  },
  IrisHaxorus: {
    name: 'Haxorus',
    primaryType: 'Fighting',
    baseStats: { HP: 120, Attack: 155, Defense: 100, Instinct: 65, Speed: 105 },
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'D', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['DragonClaw', 'Earthquake', 'IronHead'],
    learnableAbilities: ['DragonDance', 'Outrage', 'StoneEdge']
  },
  BlueBlastoise: {
    name: 'Blastoise',
    primaryType: 'Water',
    baseStats: { HP: 129, Attack: 93, Defense: 120, Instinct: 95, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['HydroPump', 'IceBeam', 'DragonPulse'],
    learnableAbilities: ['Surf', 'Earthquake', 'IronDefense']
  },
  MaxieCamerupt: {
    name: 'Camerupt',
    primaryType: 'Fire',
    baseStats: { HP: 130, Attack: 115, Defense: 90, Instinct: 115, Speed: 45 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Eruption', 'Earthquake', 'LavaPlume'],
    learnableAbilities: ['FlareBlitz', 'StoneEdge', 'IronHead']
  },
  ArchieSharpedo: {
    name: 'Sharpedo',
    primaryType: 'Water',
    baseStats: { HP: 100, Attack: 140, Defense: 55, Instinct: 105, Speed: 105 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'S', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['HydroPump', 'Crunch', 'IceBeam'],
    learnableAbilities: ['Surf', 'DarkPulse', 'Earthquake']
  },
  RaihanDuraludon: {
    name: 'Duraludon',
    primaryType: 'Electric',
    baseStats: { HP: 100, Attack: 105, Defense: 125, Instinct: 135, Speed: 85 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['DragonPulse', 'Thunderbolt', 'IronHead'],
    learnableAbilities: ['FlashCannon', 'DracoMeteor', 'BodyPress']
  },
  MarnieGrimmsnarl: {
    name: 'Grimmsnarl',
    primaryType: 'Psychic',
    baseStats: { HP: 135, Attack: 130, Defense: 75, Instinct: 90, Speed: 70 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'D' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['DarkPulse', 'PlayRough', 'ShadowBall'],
    learnableAbilities: ['BulkUp', 'IronHead', 'DrainPunch']
  },
  NessaDrednaw: {
    name: 'Drednaw',
    primaryType: 'Water',
    baseStats: { HP: 130, Attack: 125, Defense: 110, Instinct: 70, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['HydroPump', 'StoneEdge', 'Crunch'],
    learnableAbilities: ['Surf', 'Earthquake', 'IronDefense']
  },
  BeaSirfetchd: {
    name: 'Sirfetchd',
    primaryType: 'Fighting',
    baseStats: { HP: 112, Attack: 145, Defense: 105, Instinct: 68, Speed: 75 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'B', Purple: 'D', Yellow: 'C', Orange: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'C', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['CloseCombat', 'LeafBlade', 'BraveBird'],
    learnableAbilities: ['SwordsDance', 'IronHead', 'KnockOff']
  },
  OpalAlcremie: {
    name: 'Alcremie',
    primaryType: 'Psychic',
    baseStats: { HP: 115, Attack: 70, Defense: 85, Instinct: 130, Speed: 75 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Moonblast', 'DazzlingGleam', 'Psychic'],
    learnableAbilities: ['CalmMind', 'Recover', 'Encore']
  },
  PiersObstagoon: {
    name: 'Obstagoon',
    primaryType: 'Psychic',
    baseStats: { HP: 128, Attack: 110, Defense: 105, Instinct: 70, Speed: 102 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['DarkPulse', 'CloseCombat', 'ShadowBall'],
    learnableAbilities: ['IronHead', 'IceBeam', 'Earthquake']
  },
  RikaClodsire: {
    name: 'Clodsire',
    primaryType: 'Fighting',
    baseStats: { HP: 175, Attack: 85, Defense: 105, Instinct: 75, Speed: 30 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'B', Yellow: 'D', Orange: 'B' },
    strategyAptitudes: { Scaler: 'S', Nuker: 'D', Debuffer: 'A', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Earthquake', 'SludgeBomb', 'Surf'],
    learnableAbilities: ['IceBeam', 'IronDefense', 'Recover']
  },
  PoppyTinkaton: {
    name: 'Tinkaton',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 85, Defense: 90, Instinct: 100, Speed: 104 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PlayRough', 'IronHead', 'StoneEdge'],
    learnableAbilities: ['SwordsDance', 'DrainPunch', 'Thunderbolt']
  },

  // ============================================================================
  // LEGENDARY TIER SUPPORTS AS GYM LEADERS
  // ============================================================================
  CynthiaGarchomp: {
    name: 'Garchomp',
    primaryType: 'Fighting',
    baseStats: { HP: 148, Attack: 140, Defense: 105, Instinct: 90, Speed: 112 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['Earthquake', 'DragonClaw', 'StoneEdge'],
    learnableAbilities: ['DragonDance', 'Outrage', 'IronHead']
  },
  RedCharizard: {
    name: 'Charizard',
    primaryType: 'Fire',
    baseStats: { HP: 128, Attack: 94, Defense: 88, Instinct: 115, Speed: 120 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['FlareBlitz', 'AirSlash', 'DragonPulse'],
    learnableAbilities: ['BlastBurn', 'DragonDance', 'Earthquake']
  },
  StevenMetagross: {
    name: 'Metagross',
    primaryType: 'Psychic',
    baseStats: { HP: 130, Attack: 145, Defense: 140, Instinct: 100, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'B', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['IronHead', 'Psychic', 'Earthquake'],
    learnableAbilities: ['MeteorMash', 'ZenHeadbutt', 'IronDefense']
  },
  NReshiram: {
    name: 'Reshiram',
    primaryType: 'Fire',
    baseStats: { HP: 140, Attack: 135, Defense: 105, Instinct: 145, Speed: 100 },
    typeAptitudes: { Red: 'S', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'S', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['BlueFlare', 'DragonPulse', 'AncientPower'],
    learnableAbilities: ['DracoMeteor', 'FlareBlitz', 'Psychic']
  },
  ProfessorOakDragonite: {
    name: 'Dragonite',
    primaryType: 'Fighting',
    baseStats: { HP: 141, Attack: 144, Defense: 105, Instinct: 110, Speed: 90 },
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'B', Purple: 'C', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['DragonClaw', 'ExtremeSpeed', 'Earthquake'],
    learnableAbilities: ['DragonDance', 'Outrage', 'IceBeam']
  },
  DianthaDiancie: {
    name: 'Gardevoir',
    primaryType: 'Psychic',
    baseStats: { HP: 118, Attack: 75, Defense: 75, Instinct: 145, Speed: 90 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'S', Yellow: 'C', Orange: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['Psychic', 'Moonblast', 'ShadowBall'],
    learnableAbilities: ['DracoMeteor', 'CalmMind', 'Hypnosis']
  },
  LeonCharizardGmax: {
    name: 'Charizard',
    primaryType: 'Fire',
    baseStats: { HP: 138, Attack: 104, Defense: 98, Instinct: 125, Speed: 110 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'S', Debuffer: 'C', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['BlastBurn', 'AirSlash', 'DragonPulse'],
    learnableAbilities: ['FlareBlitz', 'DragonDance', 'SolarBeam']
  },
  SeleneLunala: {
    name: 'Lunala',
    primaryType: 'Psychic',
    baseStats: { HP: 147, Attack: 123, Defense: 99, Instinct: 147, Speed: 107 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'S', Yellow: 'C', Orange: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsychicBlast', 'ShadowBall', 'Moonblast'],
    learnableAbilities: ['DracoMeteor', 'IceBeam', 'CalmMind']
  },
  GloriaZacian: {
    name: 'Zacian',
    primaryType: 'Psychic',
    baseStats: { HP: 142, Attack: 150, Defense: 125, Instinct: 90, Speed: 148 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['IronHead', 'PlayRough', 'CloseCombat'],
    learnableAbilities: ['SwordsDance', 'DragonClaw', 'WildCharge']
  },
  NemonaKoraidon: {
    name: 'Koraidon',
    primaryType: 'Fighting',
    baseStats: { HP: 140, Attack: 155, Defense: 100, Instinct: 95, Speed: 155 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'C', Chipper: 'A', MadLad: 'S' },
    defaultAbilities: ['CloseCombat', 'DragonClaw', 'FlareBlitz'],
    learnableAbilities: ['DragonDance', 'Outrage', 'Earthquake']
  },
  MustardUrshifu: {
    name: 'Urshifu',
    primaryType: 'Fighting',
    baseStats: { HP: 140, Attack: 140, Defense: 105, Instinct: 75, Speed: 107 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'C', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['CloseCombat', 'DarkPulse', 'Surf'],
    learnableAbilities: ['DrainPunch', 'IronHead', 'Earthquake']
  },
  VictorCalyrex: {
    name: 'Calyrex',
    primaryType: 'Psychic',
    baseStats: { HP: 140, Attack: 90, Defense: 90, Instinct: 155, Speed: 100 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'B', Purple: 'S', Yellow: 'C', Orange: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Psychic', 'GigaDrain', 'ShadowBall'],
    learnableAbilities: ['CalmMind', 'DracoMeteor', 'Recover']
  },
  ArvenMabosstiff: {
    name: 'Mabosstiff',
    primaryType: 'Psychic',
    baseStats: { HP: 150, Attack: 130, Defense: 95, Instinct: 70, Speed: 75 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['DarkPulse', 'Crunch', 'PlayRough'],
    learnableAbilities: ['CloseCombat', 'IronHead', 'DrainPunch']
  },
  PennySylveon: {
    name: 'Sylveon',
    primaryType: 'Psychic',
    baseStats: { HP: 135, Attack: 75, Defense: 75, Instinct: 140, Speed: 70 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'B', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['Moonblast', 'Psychic', 'ShadowBall'],
    learnableAbilities: ['CalmMind', 'DrainingKiss', 'HyperVoice']
  },
  SoniaBoltund: {
    name: 'Boltund',
    primaryType: 'Electric',
    baseStats: { HP: 109, Attack: 100, Defense: 70, Instinct: 85, Speed: 131 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['WildCharge', 'Thunderbolt', 'PlayRough'],
    learnableAbilities: ['Thunder', 'Crunch', 'VoltSwitch']
  },
  HopZamazenta: {
    name: 'Zamazenta',
    primaryType: 'Fighting',
    baseStats: { HP: 142, Attack: 140, Defense: 150, Instinct: 90, Speed: 138 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['CloseCombat', 'IronHead', 'PlayRough'],
    learnableAbilities: ['IronDefense', 'Crunch', 'WildCharge']
  },
  GeetaKingambit: {
    name: 'Kingambit',
    primaryType: 'Psychic',
    baseStats: { HP: 140, Attack: 150, Defense: 130, Instinct: 75, Speed: 50 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'B', Orange: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'S', Debuffer: 'C', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['IronHead', 'DarkPulse', 'CloseCombat'],
    learnableAbilities: ['SwordsDance', 'StoneEdge', 'Earthquake']
  },
  KieranTerapagos: {
    name: 'Terapagos',
    primaryType: 'Psychic',
    baseStats: { HP: 150, Attack: 100, Defense: 130, Instinct: 120, Speed: 80 },
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'B', Purple: 'B', Yellow: 'B', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Psychic', 'EarthPower', 'IceBeam'],
    learnableAbilities: ['DracoMeteor', 'Flamethrower', 'Recover']
  },
  CarmineOgerpon: {
    name: 'Ogerpon',
    primaryType: 'Grass',
    baseStats: { HP: 120, Attack: 140, Defense: 100, Instinct: 70, Speed: 130 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'S', Purple: 'C', Yellow: 'C', Orange: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['LeafBlade', 'PlayRough', 'CloseCombat'],
    learnableAbilities: ['SwordsDance', 'PowerWhip', 'DrainPunch']
  },
  DraytonArchaludon: {
    name: 'Archaludon',
    primaryType: 'Electric',
    baseStats: { HP: 120, Attack: 105, Defense: 145, Instinct: 135, Speed: 85 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Thunderbolt', 'DragonPulse', 'IronHead'],
    learnableAbilities: ['DracoMeteor', 'FlashCannon', 'BodyPress']
  },
  LaceyExcadrill: {
    name: 'Excadrill',
    primaryType: 'Fighting',
    baseStats: { HP: 130, Attack: 145, Defense: 70, Instinct: 55, Speed: 108 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'B', Orange: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['Earthquake', 'IronHead', 'RockSlide'],
    learnableAbilities: ['SwordsDance', 'StoneEdge', 'DrillRun']
  }
};

// ============================================================================
// ELITE FOUR (for end-game career battles)
// ============================================================================

const ELITE_FOUR = [
  {
    name: 'Lorelei',
    type: 'Water',
    pokemon: {
      name: 'Cloyster',
      primaryType: 'Water',
      baseStats: { HP: 120, Attack: 100, Defense: 180, Instinct: 90, Speed: 70 },
      typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
      strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
      defaultAbilities: ['HydroPump', 'Blizzard', 'IceBeam'],
      learnableAbilities: ['ShellSmash', 'Surf', 'RockBlast']
    }
  },
  {
    name: 'Bruno',
    type: 'Fighting',
    pokemon: {
      name: 'Machamp',
      primaryType: 'Fighting',
      baseStats: { HP: 140, Attack: 145, Defense: 95, Instinct: 75, Speed: 65 },
      typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'S' },
      strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
      defaultAbilities: ['CloseCombat', 'Earthquake', 'StoneEdge'],
      learnableAbilities: ['DynamicPunch', 'BulkUp', 'KnockOff']
    }
  },
  {
    name: 'Agatha',
    type: 'Psychic',
    pokemon: {
      name: 'Gengar',
      primaryType: 'Psychic',
      baseStats: { HP: 110, Attack: 140, Defense: 70, Instinct: 145, Speed: 130 },
      typeAptitudes: { Red: 'B', Blue: 'B', Green: 'C', Purple: 'S', Yellow: 'D', Orange: 'B' },
      strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
      defaultAbilities: ['ShadowBall', 'PsychicBlast', 'DarkPulse'],
      learnableAbilities: ['SludgeBomb', 'FocusBlast', 'Thunderbolt']
    }
  },
  {
    name: 'Lance',
    type: 'Fighting',
    pokemon: {
      name: 'Dragonite',
      primaryType: 'Fighting',
      baseStats: { HP: 145, Attack: 145, Defense: 100, Instinct: 110, Speed: 90 },
      typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'A', Orange: 'S' },
      strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
      defaultAbilities: ['DragonClaw', 'HyperBeam', 'Earthquake'],
      learnableAbilities: ['FireBlast', 'Thunder', 'Outrage']
    }
  }
];

// ============================================================================
// SUPPORT CARDS
// ============================================================================
// Each support card has:
// - name, trainer, pokemon, rarity, supportType: Basic identification
// - baseStats: { HP, Attack, Defense, Instinct, Speed } - Direct stat bonuses
// - trainingBonus: { typeMatch, otherStats, maxFriendshipTypeMatch } - Training bonuses
// - initialFriendship: Starting friendship value (0-100)
// - appearanceRate: How often they appear during training (0.25-0.70)
// - typeMatchPreference: % chance to appear on their training type if they appear (0.00-0.60)
// - specialEffect: Optional special effects (statGainMultiplier, failRateReduction, etc.)
// - moveHints: Array of 3-5 moves they can hint at
// ============================================================================

const SUPPORT_CARDS = {
  // ============================================================================
  // LEGENDARY TIER (Power Budget: ~95-105)
  // High variance with different specializations
  // Cards with statGainMultiplier have reduced base stats (~60-70% of normal)
  // ============================================================================
  Cynthia: {
    name: 'Cynthia',
    trainer: 'Cynthia',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 22, Defense: 0, Instinct: 50, Speed: 11 },
    trainingBonus: { typeMatch: 15, otherStats: 2, maxFriendshipTypeMatch: 37 },
    initialFriendship: 10,
    appearanceRate: 0.38,
    typeMatchPreference: 0.05,
    specialEffect: { statGainMultiplier: 1.25 },
    moveHints: ['Earthquake', 'DragonClaw', 'Outrage', 'StoneEdge', 'SwordsDance'],
    description: 'The Sinnoh Champion grants overwhelming growth potential'
  },
  Red: {
    name: 'Red',
    trainer: 'Red',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 65, Defense: 0, Instinct: 10, Speed: 13 },
    trainingBonus: { typeMatch: 13, otherStats: 1, maxFriendshipTypeMatch: 36 },
    initialFriendship: 0,
    appearanceRate: 0.28,
    typeMatchPreference: 0.55,
    specialEffect: null,
    moveHints: ['FlareBlitz', 'DragonDance', 'AirSlash', 'HeatWave', 'BlastBurn'],
    description: 'The legendary trainer pushes limits to the extreme'
  },
  Steven: {
    name: 'Steven',
    trainer: 'Steven',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 30, Attack: 0, Defense: 60, Instinct: 10, Speed: 0 },
    trainingBonus: { typeMatch: 7, otherStats: 4, maxFriendshipTypeMatch: 20 },
    initialFriendship: 40,
    appearanceRate: 0.52,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.15 },
    moveHints: ['MeteorMash', 'ZenHeadbutt', 'BulletPunch', 'IronDefense', 'Earthquake'],
    description: 'The Hoenn Champion fortifies iron defenses'
  },
  N: {
    name: 'N',
    trainer: 'N',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 15, Defense: 0, Instinct: 65, Speed: 15 },
    trainingBonus: { typeMatch: 6, otherStats: 4, maxFriendshipTypeMatch: 17 },
    initialFriendship: 60,
    appearanceRate: 0.45,
    typeMatchPreference: 0.50,
    specialEffect: { friendshipGainBonus: 8 },
    moveHints: ['BlueFlare', 'FusionFlare', 'DragonPulse', 'DracoMeteor', 'Psychic'],
    description: 'The King of Team Plasma bonds through truth'
  },
  ProfessorOak: {
    name: 'Professor Oak',
    trainer: 'Professor Oak',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 20, Attack: 15, Defense: 15, Instinct: 35, Speed: 15 },
    trainingBonus: { typeMatch: 6, otherStats: 5, maxFriendshipTypeMatch: 17 },
    initialFriendship: 55,
    appearanceRate: 0.58,
    typeMatchPreference: 0.10,
    specialEffect: { skillPointMultiplier: 1.5, friendshipGainBonus: 7 },
    moveHints: ['Psychic', 'AuraSphere', 'Transform', 'Metronome', 'AncientPower'],
    description: 'The Professor grants knowledge and wisdom'
  },
  Diantha: {
    name: 'Diantha',
    trainer: 'Diantha',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 15, Attack: 0, Defense: 20, Instinct: 47, Speed: 5 },
    trainingBonus: { typeMatch: 9, otherStats: 3, maxFriendshipTypeMatch: 23 },
    initialFriendship: 25,
    appearanceRate: 0.42,
    typeMatchPreference: 0.15,
    specialEffect: { statGainMultiplier: 1.2, failRateReduction: 0.10 },
    moveHints: ['DiamondStorm', 'Moonblast', 'DazzlingGleam', 'RockPolish', 'Reflect'],
    description: 'The Kalos Champion radiates brilliance and growth'
  },
  Leon: {
    name: 'Leon',
    trainer: 'Leon',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 60, Defense: 0, Instinct: 10, Speed: 20 },
    trainingBonus: { typeMatch: 12, otherStats: 2, maxFriendshipTypeMatch: 31 },
    initialFriendship: 15,
    appearanceRate: 0.40,
    typeMatchPreference: 0.10,
    specialEffect: { failRateReduction: 0.10 },
    moveHints: ['GMaxWildfire', 'FlareBlitz', 'AirSlash', 'DragonPulse', 'AncientPower'],
    description: 'The undefeated Galar Champion unleashes fiery power'
  },
  Selene: {
    name: 'Selene',
    trainer: 'Selene',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 15, Attack: 0, Defense: 10, Instinct: 60, Speed: 15 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 21 },
    initialFriendship: 30,
    appearanceRate: 0.45,
    typeMatchPreference: 0.20,
    specialEffect: { friendshipGainBonus: 7, skillPointMultiplier: 1.3 },
    moveHints: ['MoongeistBeam', 'Psychic', 'ShadowBall', 'Moonblast', 'Roost'],
    description: 'The Alola Champion channels moonlight power'
  },
  Gloria: {
    name: 'Gloria',
    trainer: 'Gloria',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 65, Defense: 10, Instinct: 5, Speed: 18 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 23 },
    initialFriendship: 25,
    appearanceRate: 0.42,
    typeMatchPreference: 0.15,
    specialEffect: { failRateReduction: 0.12 },
    moveHints: ['BehemothBlade', 'PlayRough', 'CloseCombat', 'SwordsDance', 'SacredSword'],
    description: 'The Galar Champion wields the legendary blade'
  },
  Nemona: {
    name: 'Nemona',
    trainer: 'Nemona',
    rarity: 'Legendary',
    supportType: 'Speed',
    baseStats: { HP: 10, Attack: 25, Defense: 0, Instinct: 10, Speed: 55 },
    trainingBonus: { typeMatch: 7, otherStats: 4, maxFriendshipTypeMatch: 20 },
    initialFriendship: 60,
    appearanceRate: 0.55,
    typeMatchPreference: 0.10,
    specialEffect: { friendshipGainBonus: 10, energyRegenBonus: 8 },
    moveHints: ['CollisionCourse', 'Outrage', 'FlareBlitz', 'DrainPunch', 'DragonDance'],
    description: 'The battle-loving Champion befriends with enthusiasm'
  },
  Mustard: {
    name: 'Mustard',
    trainer: 'Mustard',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 62, Defense: 10, Instinct: 5, Speed: 10 },
    trainingBonus: { typeMatch: 10, otherStats: 1, maxFriendshipTypeMatch: 28 },
    initialFriendship: 5,
    appearanceRate: 0.30,
    typeMatchPreference: 0.45,
    specialEffect: { failRateReduction: 0.12 },
    moveHints: ['WickedBlow', 'SurgingStrikes', 'CloseCombat', 'Uturn', 'PoisonJab'],
    description: 'The former Champion masters martial arts'
  },
  Victor: {
    name: 'Victor',
    trainer: 'Victor',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 15, Attack: 12, Defense: 0, Instinct: 48, Speed: 12 },
    trainingBonus: { typeMatch: 9, otherStats: 4, maxFriendshipTypeMatch: 22 },
    initialFriendship: 35,
    appearanceRate: 0.48,
    typeMatchPreference: 0.30,
    specialEffect: { maxEnergyBonus: 15, statGainMultiplier: 1.15 },
    moveHints: ['DynamaxCannon', 'CrossPoison', 'DragonPulse', 'Flamethrower', 'Recover'],
    description: 'The Galar Champion harnesses infinite potential'
  },
  Arven: {
    name: 'Arven',
    trainer: 'Arven',
    rarity: 'Legendary',
    supportType: 'HP',
    baseStats: { HP: 55, Attack: 20, Defense: 15, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 6, otherStats: 4, maxFriendshipTypeMatch: 17 },
    initialFriendship: 50,
    appearanceRate: 0.55,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 18, restBonus: 8 },
    moveHints: ['Crunch', 'PlayRough', 'Reversal', 'Psychicfangs', 'Rest'],
    description: 'The culinary expert nurtures with care'
  },
  Penny: {
    name: 'Penny',
    trainer: 'Penny',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 22, Attack: 10, Defense: 18, Instinct: 25, Speed: 18 },
    trainingBonus: { typeMatch: 7, otherStats: 3, maxFriendshipTypeMatch: 20 },
    initialFriendship: 20,
    appearanceRate: 0.38,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.15, friendshipGainBonus: 6 },
    moveHints: ['Moonblast', 'MistyTerrain', 'LightScreen', 'Wish', 'HyperVoice'],
    description: 'The Team Star boss protects her friends'
  },
  Sonia: {
    name: 'Sonia',
    trainer: 'Sonia',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 15, Attack: 10, Defense: 10, Instinct: 50, Speed: 15 },
    trainingBonus: { typeMatch: 6, otherStats: 5, maxFriendshipTypeMatch: 17 },
    initialFriendship: 65,
    appearanceRate: 0.60,
    typeMatchPreference: 0.05,
    specialEffect: { skillPointMultiplier: 1.6, friendshipGainBonus: 8 },
    moveHints: ['Spark', 'Nuzzle', 'PlayRough', 'WildCharge', 'Charm'],
    description: 'The new Professor researches with curiosity'
  },
  Hop: {
    name: 'Hop',
    trainer: 'Hop',
    rarity: 'Legendary',
    supportType: 'HP',
    baseStats: { HP: 60, Attack: 10, Defense: 20, Instinct: 5, Speed: 10 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 21 },
    initialFriendship: 55,
    appearanceRate: 0.52,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 15, friendshipGainBonus: 7 },
    moveHints: ['BehemothBash', 'CloseCombat', 'IronDefense', 'Crunch', 'WildCharge'],
    description: 'The aspiring researcher supports with heart'
  },
  Geeta: {
    name: 'Geeta',
    trainer: 'Geeta',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 10, Attack: 15, Defense: 10, Instinct: 40, Speed: 0 },
    trainingBonus: { typeMatch: 14, otherStats: 2, maxFriendshipTypeMatch: 35 },
    initialFriendship: 10,
    appearanceRate: 0.35,
    typeMatchPreference: 0.35,
    specialEffect: { statGainMultiplier: 1.22 },
    moveHints: ['KowtowCleave', 'SuckerPunch', 'IronHead', 'SwordsDance', 'LowKick'],
    description: 'The Paldea Champion leads with strategic growth'
  },
  Kieran: {
    name: 'Kieran',
    trainer: 'Kieran',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 25, Attack: 0, Defense: 12, Instinct: 42, Speed: 6 },
    trainingBonus: { typeMatch: 9, otherStats: 4, maxFriendshipTypeMatch: 22 },
    initialFriendship: 15,
    appearanceRate: 0.38,
    typeMatchPreference: 0.30,
    specialEffect: { maxEnergyBonus: 20, statGainMultiplier: 1.15 },
    moveHints: ['TeraStarstorm', 'EarthPower', 'DarkPulse', 'Psychic', 'Recover'],
    description: 'The Blueberry Champion commands crystalline potential'
  },
  Carmine: {
    name: 'Carmine',
    trainer: 'Carmine',
    rarity: 'Legendary',
    supportType: 'Speed',
    baseStats: { HP: 10, Attack: 25, Defense: 5, Instinct: 5, Speed: 55 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 21 },
    initialFriendship: 20,
    appearanceRate: 0.42,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.10, energyRegenBonus: 6 },
    moveHints: ['IvyCudgel', 'HornLeech', 'PlayRough', 'Uturn', 'SwordsDance'],
    description: 'The Kitakami native dances with masks'
  },
  Drayton: {
    name: 'Drayton',
    trainer: 'Drayton',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 20, Attack: 15, Defense: 55, Instinct: 10, Speed: 0 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 21 },
    initialFriendship: 40,
    appearanceRate: 0.48,
    typeMatchPreference: 0.15,
    specialEffect: { failRateReduction: 0.15 },
    moveHints: ['ElectroDrift', 'FlashCannon', 'DracoMeteor', 'BodyPress', 'IronDefense'],
    description: 'The Dragon Elite bridges power and defense'
  },
  Lacey: {
    name: 'Lacey',
    trainer: 'Lacey',
    rarity: 'Legendary',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 25, Defense: 5, Instinct: 10, Speed: 55 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 23 },
    initialFriendship: 35,
    appearanceRate: 0.45,
    typeMatchPreference: 0.20,
    specialEffect: { energyRegenBonus: 7 },
    moveHints: ['Earthquake', 'IronHead', 'RockSlide', 'SwordsDance', 'RapidSpin'],
    description: 'The Blueberry Elite drills with blazing speed'
  },

  // ============================================================================
  // RARE TIER (Power Budget: ~76-84, ~80% of Legendary)
  // Good variance with clear specializations
  // Cards with statGainMultiplier have reduced base stats (~60-70% of normal)
  // ============================================================================
  Lance: {
    name: 'Lance',
    trainer: 'Lance',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 45, Defense: 0, Instinct: 10, Speed: 12 },
    trainingBonus: { typeMatch: 9, otherStats: 2, maxFriendshipTypeMatch: 25 },
    initialFriendship: 15,
    appearanceRate: 0.35,
    typeMatchPreference: 0.10,
    specialEffect: null,
    moveHints: ['DragonDance', 'Outrage', 'ExtremeSpeed', 'DragonRush', 'FirePunch'],
    description: 'The Dragon Master enhances draconic power'
  },
  Sabrina: {
    name: 'Sabrina',
    trainer: 'Sabrina',
    rarity: 'Rare',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 0, Defense: 0, Instinct: 50, Speed: 15 },
    trainingBonus: { typeMatch: 11, otherStats: 2, maxFriendshipTypeMatch: 27 },
    initialFriendship: 10,
    appearanceRate: 0.32,
    typeMatchPreference: 0.15,
    specialEffect: null,
    moveHints: ['Psychic', 'FutureSight', 'FocusBlast', 'CalmMind', 'ShadowBall'],
    description: 'The Saffron Gym Leader sharpens the mind'
  },
  Morty: {
    name: 'Morty',
    trainer: 'Morty',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 10, Defense: 0, Instinct: 15, Speed: 45 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 17 },
    initialFriendship: 35,
    appearanceRate: 0.55,
    typeMatchPreference: 0.50,
    specialEffect: { friendshipGainBonus: 6 },
    moveHints: ['ShadowBall', 'SludgeBomb', 'Hypnosis', 'DreamEater', 'Hex'],
    description: 'The Ecruteak Gym Leader channels ghostly power'
  },
  Wallace: {
    name: 'Wallace',
    trainer: 'Wallace',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 50, Attack: 0, Defense: 15, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 18 },
    initialFriendship: 45,
    appearanceRate: 0.48,
    typeMatchPreference: 0.30,
    specialEffect: { maxEnergyBonus: 12, restBonus: 5 },
    moveHints: ['Surf', 'IceBeam', 'Recover', 'DragonTail', 'AquaRing'],
    description: 'The Hoenn Champion exudes elegance'
  },
  Iris: {
    name: 'Iris',
    trainer: 'Iris',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 58, Defense: 0, Instinct: 7, Speed: 20 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 17 },
    initialFriendship: 50,
    appearanceRate: 0.60,
    typeMatchPreference: 0.20,
    specialEffect: null,
    moveHints: ['DragonDance', 'Outrage', 'Earthquake', 'DragonClaw', 'SwordsDance'],
    description: 'The Unova Champion commands dragons'
  },
  Blue: {
    name: 'Blue',
    trainer: 'Blue',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 18, Attack: 18, Defense: 18, Instinct: 15, Speed: 7 },
    trainingBonus: { typeMatch: 5, otherStats: 4, maxFriendshipTypeMatch: 12 },
    initialFriendship: 25,
    appearanceRate: 0.50,
    typeMatchPreference: 0.05,
    specialEffect: { energyRegenBonus: 5 },
    moveHints: ['Hurricane', 'BraveBird', 'AirSlash', 'Roost', 'UTurn'],
    description: 'The rival trainer pushes limits'
  },
  Giovanni: {
    name: 'Giovanni',
    trainer: 'Giovanni',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 10, Defense: 0, Instinct: 8, Speed: 35 },
    trainingBonus: { typeMatch: 8, otherStats: 1, maxFriendshipTypeMatch: 22 },
    initialFriendship: 0,
    appearanceRate: 0.30,
    typeMatchPreference: 0.55,
    specialEffect: { energyRegenBonus: 4 },
    moveHints: ['Slash', 'Swift', 'Bite', 'NastyPlot', 'Headbutt'],
    description: 'The Rocket Boss commands ruthless speed'
  },
  Maxie: {
    name: 'Maxie',
    trainer: 'Maxie',
    rarity: 'Rare',
    supportType: 'Defense',
    baseStats: { HP: 0, Attack: 54, Defense: 0, Instinct: 12, Speed: 10 },
    trainingBonus: { typeMatch: 7, otherStats: 3, maxFriendshipTypeMatch: 18 },
    initialFriendship: 20,
    appearanceRate: 0.42,
    typeMatchPreference: 0.10,
    specialEffect: null,
    moveHints: ['Earthquake', 'PrecipiceBlades', 'FirePunch', 'BulkUp', 'LavaPlume'],
    description: 'The Magma Leader harnesses earth power'
  },
  Archie: {
    name: 'Archie',
    trainer: 'Archie',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 55, Attack: 0, Defense: 10, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 40,
    appearanceRate: 0.45,
    typeMatchPreference: 0.25,
    specialEffect: { maxEnergyBonus: 10 },
    moveHints: ['OriginPulse', 'HydroPump', 'IceBeam', 'Thunder', 'AquaRing'],
    description: 'The Aqua Leader commands the seas'
  },
  Raihan: {
    name: 'Raihan',
    trainer: 'Raihan',
    rarity: 'Rare',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 15, Defense: 40, Instinct: 5, Speed: 5 },
    trainingBonus: { typeMatch: 7, otherStats: 3, maxFriendshipTypeMatch: 19 },
    initialFriendship: 30,
    appearanceRate: 0.45,
    typeMatchPreference: 0.15,
    specialEffect: { failRateReduction: 0.08 },
    moveHints: ['SteelBeam', 'DracoMeteor', 'FlashCannon', 'Thunderbolt', 'BodyPress'],
    description: 'The Hammerlocke Gym Leader storms with steel defense'
  },
  Marnie: {
    name: 'Marnie',
    trainer: 'Marnie',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 0, Defense: 0, Instinct: 58, Speed: 18 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 25,
    appearanceRate: 0.42,
    typeMatchPreference: 0.25,
    specialEffect: { friendshipGainBonus: 6 },
    moveHints: ['SpiritBreak', 'DarkPulse', 'ThunderWave', 'Taunt', 'BulkUp'],
    description: 'The Spikemuth Gym Leader inspires fierce loyalty'
  },
  Nessa: {
    name: 'Nessa',
    trainer: 'Nessa',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 45, Attack: 15, Defense: 10, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 35,
    appearanceRate: 0.48,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 10 },
    moveHints: ['Liquidation', 'RockTomb', 'JawLock', 'ShellSmash', 'HeadSmash'],
    description: 'The Hulbury Gym Leader builds endurance'
  },
  Bea: {
    name: 'Bea',
    trainer: 'Bea',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 45, Defense: 0, Instinct: 0, Speed: 24 },
    trainingBonus: { typeMatch: 8, otherStats: 1, maxFriendshipTypeMatch: 29 },
    initialFriendship: 10,
    appearanceRate: 0.35,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['CloseCombat', 'CrossChop', 'BulkUp', 'KnockOff', 'IcePunch'],
    description: 'The Stow-on-Side Gym Leader trains relentlessly'
  },
  Opal: {
    name: 'Opal',
    trainer: 'Opal',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 45, Attack: 0, Defense: 15, Instinct: 15, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 45,
    appearanceRate: 0.52,
    typeMatchPreference: 0.15,
    specialEffect: { maxEnergyBonus: 10, restBonus: 5 },
    moveHints: ['DrainingKiss', 'DazzlingGleam', 'Recover', 'CalmMind', 'Encore'],
    description: 'The Ballonlea Gym Leader sweetens training'
  },
  Piers: {
    name: 'Piers',
    trainer: 'Piers',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 20, Defense: 0, Instinct: 5, Speed: 45 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 20,
    appearanceRate: 0.40,
    typeMatchPreference: 0.35,
    specialEffect: { energyRegenBonus: 5 },
    moveHints: ['Overdrive', 'SludgeWave', 'BoomBurst', 'ShiftGear', 'Discharge'],
    description: 'The punk rock Gym Leader amplifies tempo'
  },
  Rika: {
    name: 'Rika',
    trainer: 'Rika',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 50, Attack: 10, Defense: 10, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 40,
    appearanceRate: 0.50,
    typeMatchPreference: 0.25,
    specialEffect: { maxEnergyBonus: 12 },
    moveHints: ['Earthquake', 'IceBeam', 'Surf', 'ZenHeadbutt', 'Rest'],
    description: 'The Elite Four member interrogates the earth'
  },
  Poppy: {
    name: 'Poppy',
    trainer: 'Poppy',
    rarity: 'Rare',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 20, Defense: 35, Instinct: 5, Speed: 5 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 15 },
    initialFriendship: 55,
    appearanceRate: 0.55,
    typeMatchPreference: 0.20,
    specialEffect: { friendshipGainBonus: 7 },
    moveHints: ['GigatonHammer', 'PlayRough', 'StoneEdge', 'SwordsDance', 'ThunderWave'],
    description: 'The youngest Elite Four hammers with joy'
  },

  // ============================================================================
  // UNCOMMON TIER (Power Budget: ~60-68, ~80% of Rare)
  // Moderate variance with useful specializations
  // Cards with statGainMultiplier have reduced base stats (~60-70% of normal)
  // ============================================================================
  Misty: {
    name: 'Misty',
    trainer: 'Misty',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 30, Attack: 0, Defense: 10, Instinct: 5, Speed: 5 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 15 },
    initialFriendship: 30,
    appearanceRate: 0.48,
    typeMatchPreference: 0.25,
    specialEffect: { energyCostReduction: 2, maxEnergyBonus: 6 },
    moveHints: ['HydroPump', 'Psychic', 'RapidSpin', 'IceBeam', 'Recover'],
    description: 'The Cerulean Gym Leader improves training efficiency'
  },
  Brock: {
    name: 'Brock',
    trainer: 'Brock',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 15, Attack: 0, Defense: 38, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 18 },
    initialFriendship: 45,
    appearanceRate: 0.55,
    typeMatchPreference: 0.05,
    specialEffect: null,
    moveHints: ['RockSlide', 'IronTail', 'StealthRock', 'Sandstorm', 'Earthquake'],
    description: 'The Pewter Gym Leader hardens defenses'
  },
  Erika: {
    name: 'Erika',
    trainer: 'Erika',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 35, Attack: 0, Defense: 10, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 15 },
    initialFriendship: 40,
    appearanceRate: 0.52,
    typeMatchPreference: 0.30,
    specialEffect: { maxEnergyBonus: 8, restBonus: 4 },
    moveHints: ['GigaDrain', 'SleepPowder', 'EnergyBall', 'SeedBomb', 'StringShot'],
    description: 'The Celadon Gym Leader nurtures vitality'
  },
  Blaine: {
    name: 'Blaine',
    trainer: 'Blaine',
    rarity: 'Uncommon',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 35, Defense: 0, Instinct: 5, Speed: 5 },
    trainingBonus: { typeMatch: 8, otherStats: 2, maxFriendshipTypeMatch: 20 },
    initialFriendship: 15,
    appearanceRate: 0.30,
    typeMatchPreference: 0.10,
    specialEffect: null,
    moveHints: ['FireBlast', 'Flamethrower', 'FlameBurst', 'Overheat', 'Smokescreen'],
    description: 'The Cinnabar Gym Leader ignites fiery passion'
  },
  Koga: {
    name: 'Koga',
    trainer: 'Koga',
    rarity: 'Uncommon',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 2, Defense: 7, Instinct: 5, Speed: 16 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 18 },
    initialFriendship: 10,
    appearanceRate: 0.35,
    typeMatchPreference: 0.35,
    specialEffect: { failRateReduction: 0.08, energyRegenBonus: 3 },
    moveHints: ['SludgeBomb', 'Toxic', 'WillOWisp', 'Explosion', 'ShadowBall'],
    description: 'The Fuchsia Gym Leader masters ninja speed'
  },
  Jasmine: {
    name: 'Jasmine',
    trainer: 'Jasmine',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 0, Defense: 35, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 19 },
    initialFriendship: 30,
    appearanceRate: 0.40,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['IronTail', 'Earthquake', 'Screech', 'IronDefense', 'StoneEdge'],
    description: 'The Olivine Gym Leader provides iron defense'
  },
  Winona: {
    name: 'Winona',
    trainer: 'Winona',
    rarity: 'Uncommon',
    supportType: 'Speed',
    baseStats: { HP: 6, Attack: 0, Defense: 6, Instinct: 6, Speed: 37 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 35,
    appearanceRate: 0.58,
    typeMatchPreference: 0.20,
    specialEffect: { energyRegenBonus: 3 },
    moveHints: ['SteelWing', 'BraveBird', 'Spikes', 'Roost', 'AirSlash'],
    description: 'The Fortree Gym Leader soars with grace'
  },
  Karen: {
    name: 'Karen',
    trainer: 'Karen',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 0, Defense: 25, Instinct: 10, Speed: 0 },
    trainingBonus: { typeMatch: 8, otherStats: 2, maxFriendshipTypeMatch: 20 },
    initialFriendship: 5,
    appearanceRate: 0.25,
    typeMatchPreference: 0.15,
    specialEffect: null,
    moveHints: ['FoulPlay', 'Moonlight', 'Toxic', 'Curse', 'DarkPulse'],
    description: 'The Elite Four member embraces darkness'
  },
  Agatha: {
    name: 'Agatha',
    trainer: 'Agatha',
    rarity: 'Uncommon',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 8, Defense: 0, Instinct: 32, Speed: 5 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 19 },
    initialFriendship: 20,
    appearanceRate: 0.32,
    typeMatchPreference: 0.40,
    specialEffect: null,
    moveHints: ['ShadowBall', 'SludgeWave', 'DestinyBond', 'Hypnosis', 'DreamEater'],
    description: 'The Elite Four member masters ghosts'
  },
  Milo: {
    name: 'Milo',
    trainer: 'Milo',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 35, Attack: 0, Defense: 10, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 3, maxFriendshipTypeMatch: 11 },
    initialFriendship: 50,
    appearanceRate: 0.58,
    typeMatchPreference: 0.15,
    specialEffect: { maxEnergyBonus: 8, restBonus: 4 },
    moveHints: ['GigaDrain', 'CottonGuard', 'LeechSeed', 'Synthesis', 'PollenPuff'],
    description: 'The Turffield Gym Leader nurtures growth'
  },
  Kabu: {
    name: 'Kabu',
    trainer: 'Kabu',
    rarity: 'Uncommon',
    supportType: 'Attack',
    baseStats: { HP: 5, Attack: 32, Defense: 5, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 18 },
    initialFriendship: 15,
    appearanceRate: 0.38,
    typeMatchPreference: 0.25,
    specialEffect: null,
    moveHints: ['FireLash', 'Flamethrower', 'Crunch', 'Coil', 'PowerWhip'],
    description: 'The Motostoke Gym Leader burns with dedication'
  },
  Melony: {
    name: 'Melony',
    trainer: 'Melony',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 40, Attack: 0, Defense: 10, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 45,
    appearanceRate: 0.52,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 10 },
    moveHints: ['IceBeam', 'Surf', 'FreezeDry', 'SheerCold', 'Sing'],
    description: 'The Circhester Gym Leader provides warmth in cold'
  },
  Gordie: {
    name: 'Gordie',
    trainer: 'Gordie',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 5, Defense: 35, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 25,
    appearanceRate: 0.42,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['TarShot', 'StoneEdge', 'HeatCrash', 'Earthquake', 'StealthRock'],
    description: 'The Circhester Gym Leader stands firm'
  },
  Klara: {
    name: 'Klara',
    trainer: 'Klara',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 15, Attack: 0, Defense: 30, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 20,
    appearanceRate: 0.40,
    typeMatchPreference: 0.35,
    specialEffect: { failRateReduction: 0.06 },
    moveHints: ['ShellSideArm', 'Psychic', 'SludgeBomb', 'SlackOff', 'Scald'],
    description: 'The aspiring Poison specialist tanks hits'
  },
  Avery: {
    name: 'Avery',
    trainer: 'Avery',
    rarity: 'Uncommon',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 10, Defense: 5, Instinct: 10, Speed: 30 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 11 },
    initialFriendship: 15,
    appearanceRate: 0.45,
    typeMatchPreference: 0.20,
    specialEffect: null,
    moveHints: ['PsychoCut', 'PlayRough', 'HighHorsepower', 'Agility', 'Megahorn'],
    description: 'The aspiring Psychic specialist pursues perfection'
  },
  Iono: {
    name: 'Iono',
    trainer: 'Iono',
    rarity: 'Uncommon',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 12, Defense: 0, Instinct: 10, Speed: 23 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 18 },
    initialFriendship: 60,
    appearanceRate: 0.60,
    typeMatchPreference: 0.15,
    specialEffect: { friendshipGainBonus: 7, energyRegenBonus: 2 },
    moveHints: ['WildCharge', 'Discharge', 'Spark', 'ElectroBall', 'ChargeBeam'],
    description: 'The streaming Gym Leader electrifies fans'
  },
  Grusha: {
    name: 'Grusha',
    trainer: 'Grusha',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 0, Defense: 30, Instinct: 10, Speed: 5 },
    trainingBonus: { typeMatch: 4, otherStats: 3, maxFriendshipTypeMatch: 11 },
    initialFriendship: 30,
    appearanceRate: 0.48,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.06 },
    moveHints: ['IceBeam', 'DragonPulse', 'Moonblast', 'CottonGuard', 'Roost'],
    description: 'The former snowboarder glides with grace'
  },

  // ============================================================================
  // COMMON TIER (Power Budget: ~48-55, ~80% of Uncommon)
  // Lower stats but still useful, high variance in specialization
  // Cards with statGainMultiplier have reduced base stats (~60-70% of normal)
  // ============================================================================
  Whitney: {
    name: 'Whitney',
    trainer: 'Whitney',
    rarity: 'Common',
    supportType: 'HP',
    baseStats: { HP: 28, Attack: 0, Defense: 7, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 11 },
    initialFriendship: 50,
    appearanceRate: 0.62,
    typeMatchPreference: 0.15,
    specialEffect: null,
    moveHints: ['Rollout', 'BodySlam', 'MilkDrink', 'Attract', 'Stomp'],
    description: 'The Goldenrod Gym Leader boosts endurance'
  },
  Chuck: {
    name: 'Chuck',
    trainer: 'Chuck',
    rarity: 'Common',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 24, Defense: 0, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 7, otherStats: 1, maxFriendshipTypeMatch: 14 },
    initialFriendship: 5,
    appearanceRate: 0.35,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['CrossChop', 'Waterfall', 'Superpower', 'BulkUp', 'ForcePalm'],
    description: 'The Cianwood Gym Leader builds strength'
  },
  Pryce: {
    name: 'Pryce',
    trainer: 'Pryce',
    rarity: 'Common',
    supportType: 'Defense',
    baseStats: { HP: 20, Attack: 0, Defense: 5, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 10 },
    initialFriendship: 45,
    appearanceRate: 0.55,
    typeMatchPreference: 0.10,
    specialEffect: { maxEnergyBonus: 6, restBonus: 4 },
    moveHints: ['Present', 'IceBeam', 'IcePunch', 'Blizzard', 'AerialAce'],
    description: 'The Mahogany Gym Leader aids recovery'
  },
  Wattson: {
    name: 'Wattson',
    trainer: 'Wattson',
    rarity: 'Common',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 0, Defense: 5, Instinct: 25, Speed: 5 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 11 },
    initialFriendship: 35,
    appearanceRate: 0.48,
    typeMatchPreference: 0.25,
    specialEffect: null,
    moveHints: ['Thunderbolt', 'ZapCannon', 'Discharge', 'Spark', 'ElectricTerrain'],
    description: 'The Mauville Gym Leader electrifies training'
  },
  Flannery: {
    name: 'Flannery',
    trainer: 'Flannery',
    rarity: 'Common',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 5, Defense: 0, Instinct: 20, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 11 },
    initialFriendship: 15,
    appearanceRate: 0.40,
    typeMatchPreference: 0.35,
    specialEffect: { statGainMultiplier: 1.08, failRateReduction: 0.05 },
    moveHints: ['Eruption', 'EarthPower', 'LavaPlume', 'Earthquake', 'Flamethrower'],
    description: 'The Lavaridge Gym Leader cultivates fiery growth'
  }
};


// ============================================================================
// LEGACY SUPPORT NAME MAPPING
// Maps old support card names (with Pokemon) to new names (trainer only)
// This ensures backwards compatibility with existing database entries
// ============================================================================
const LEGACY_SUPPORT_NAME_MAP = {
  // Legendary
  CynthiaGarchomp: 'Cynthia',
  RedCharizard: 'Red',
  StevenMetagross: 'Steven',
  NReshiram: 'N',
  ProfessorOakMew: 'ProfessorOak',
  DianthaDiancie: 'Diantha',
  LeonCharizard: 'Leon',
  SeleneLunala: 'Selene',
  GloriaZacian: 'Gloria',
  NemonaKoraidon: 'Nemona',
  MustardUrshifu: 'Mustard',
  VictorCalyrex: 'Victor',
  ArvenMabosstiff: 'Arven',
  PennyEevee: 'Penny',
  SoniaYamper: 'Sonia',
  HopZamazenta: 'Hop',
  GeetaKingambit: 'Geeta',
  KieranOgerpon: 'Kieran',
  CarmineBloodmoon: 'Carmine',
  DraytonArchaludon: 'Drayton',
  LaceyExcadrill: 'Lacey',
  // Rare
  LanceDragonite: 'Lance',
  SabrinaAlakazam: 'Sabrina',
  MortyGengar: 'Morty',
  WallaceMillotic: 'Wallace',
  IrisHaxorus: 'Iris',
  BlueBlastoise: 'Blue',
  GiovanniPersian: 'Giovanni',
  MaxieCamerupt: 'Maxie',
  ArchieSharpedo: 'Archie',
  RaihanDuraludon: 'Raihan',
  MarnieGrimmsnarl: 'Marnie',
  NessaDrednaw: 'Nessa',
  BeaSirfetchd: 'Bea',
  OpalAlcremie: 'Opal',
  PiersObstagoon: 'Piers',
  RikaClodsire: 'Rika',
  PoppyTinkaton: 'Poppy',
  // Uncommon
  MistyStarmie: 'Misty',
  BrockOnix: 'Brock',
  ErikaTangela: 'Erika',
  BlaineMagmar: 'Blaine',
  KogaWeezing: 'Koga',
  JasmineSteelix: 'Jasmine',
  WinonaAltaria: 'Winona',
  KarenUmbreon: 'Karen',
  AgathaGengar: 'Agatha',
  MiloEldegoss: 'Milo',
  KabuCentiskorch: 'Kabu',
  MelonyLapras: 'Melony',
  GordieCoalossal: 'Gordie',
  KlaraSlowbro: 'Klara',
  AverySlowking: 'Avery',
  IonoBellibolt: 'Iono',
  GrushaAltaria: 'Grusha',
  // Common
  WhitneyMiltank: 'Whitney',
  ChuckPoliwrath: 'Chuck',
  PryceDelibird: 'Pryce',
  WattsonMagneton: 'Wattson',
  FlanneryCamerupt: 'Flannery'
};

/**
 * Normalizes a support name by converting legacy names to new format
 * @param {string} supportName - The support name (may be legacy or new format)
 * @returns {string} - The normalized support name
 */
const normalizeSupportName = (supportName) => {
  return LEGACY_SUPPORT_NAME_MAP[supportName] || supportName;
};

// ============================================================================
// GACHA POOLS
// ============================================================================

// Support Card Gacha Rarity
const SUPPORT_GACHA_RARITY = {
  Common: {
    rate: 0.50,
    supports: ['Whitney', 'Chuck', 'Pryce', 'Wattson', 'Flannery']
  },
  Uncommon: {
    rate: 0.35,
    supports: ['Misty', 'Brock', 'Erika', 'Blaine', 'Koga',
               'Jasmine', 'Winona', 'Karen', 'Agatha',
               'Milo', 'Kabu', 'Melony', 'Gordie',
               'Klara', 'Avery', 'Iono', 'Grusha']
  },
  Rare: {
    rate: 0.13,
    supports: ['Lance', 'Sabrina', 'Morty', 'Wallace',
               'Iris', 'Blue', 'Giovanni',
               'Maxie', 'Archie', 'Raihan', 'Marnie',
               'Nessa', 'Bea', 'Opal', 'Piers',
               'Rika', 'Poppy']
  },
  Legendary: {
    rate: 0.02,
    supports: ['Cynthia', 'Red', 'Steven', 'N',
               'ProfessorOak', 'Diantha', 'Leon', 'Selene',
               'Gloria', 'Nemona', 'Mustard', 'Victor',
               'Arven', 'Penny', 'Sonia', 'Hop',
               'Geeta', 'Kieran', 'Carmine', 'Drayton',
               'Lacey']
  }
};

// Pokemon Gacha Rarity Table
const GACHA_RARITY = {
    Common: {
        rate: 0.60, // 60%
        pokemon: [
            // Original 30
            'Rattata', 'Meowth', 'Sandshrew', 'Psyduck', 'Poliwag',
            'Tentacool', 'Shellder', 'Krabby', 'Oddish', 'Bellsprout',
            'Paras', 'Zubat', 'Grimer', 'Koffing', 'Voltorb',
            'Magnemite', 'Sentret', 'Zigzagoon', 'Bidoof', 'Lillipup',
            'Hoppip', 'Sunkern', 'Spinarak', 'Patrat', 'Purrloin',
            'Roggenrola', 'Tympole', 'Venipede', 'Dwebble', 'Binacle',
            // New 30 Common Pokemon (Gen 2+)
            'Hoothoot', 'Ledyba', 'Natu', 'Marill', 'Wooper',
            'Swinub', 'Remoraid', 'Seedot', 'Lotad', 'Shroomish',
            'Makuhita', 'Nosepass', 'Gulpin', 'Numel', 'Trapinch',
            'Baltoy', 'Barboach', 'Corphish', 'Kricketot', 'Burmy',
            'Combee', 'Cherubi', 'Bronzor', 'Finneon', 'Pidove',
            'Blitzle', 'Sewaddle', 'Cottonee', 'Petilil'
        ]
    },
    Uncommon: {
        rate: 0.30, // 30%
        pokemon: [
            'Growlithe', 'Vulpix', 'Ponyta', 'Houndour', 'Torchic',
            'Chinchou', 'Mareep', 'Skorupi', 'Eevee',
            'Togepi', 'Snubbull', 'Teddiursa', 'Slugma', 'Skitty',
            'Pikachu', 'Gastly', 'Fletchling', 'Cyndaquil', 'Totodile',
            'Chikorita', 'Mudkip', 'Treecko', 'Piplup', 'Turtwig',
            'Chimchar', 'Tepig', 'Oshawott', 'Snivy', 'Klefki',
            'Gligar', 'Snorunt', 'Aron', 'Ralts', 'Shinx', 'Starly'
        ]
    },
    Rare: {
        rate: 0.09, // 9%
        pokemon: [
            // Starter Pokemon
            'Charmander', 'Squirtle', 'Bulbasaur',
            // Original 37
            'Magmar', 'Electabuzz', 'Clefairy', 'Jigglypuff',
            'Phanpy', 'Spheal', 'Spoink', 'Deerling', 'Tangela',
            'Lapras', 'Bunnelby', 'Yungoos', 'Wooloo', 'Skwovet',
            'Sneasel', 'Murkrow', 'Yanma', 'Buneary', 'Glameow',
            'Stunky', 'Croagunk', 'Sandile', 'Scraggy', 'Gothita',
            'Litleo', 'Skiddo', 'Pancham', 'Honedge', 'Inkay',
            'Skrelp', 'Helioptile', 'Tyrunt', 'Amaura', 'Goomy', 'Noibat',
            'Dratini',
            // New 50 Rare Pokemon (Gen 2+)
            'Misdreavus', 'Girafarig', 'Dunsparce', 'Qwilfish', 'Shuckle',
            'Corsola', 'Mantine', 'Larvitar', 'Poochyena', 'Wingull',
            'Surskit', 'Electrike', 'Roselia', 'Wailmer', 'Torkoal',
            'Cacnea', 'Seviper', 'Zangoose', 'Tropius', 'Chimecho',
            'Absol', 'Snover', 'Riolu', 'Hippopotas', 'Carnivine',
            'Mantyke', 'Sawk', 'Throh', 'Basculin', 'Darumaka',
            'Maractus', 'Druddigon', 'Pawniard', 'Rufflet', 'Vullaby',
            'Heatmor', 'Durant', 'Deino', 'Espurr', 'Spritzee',
            'Swirlix', 'Bergmite', 'Phantump', 'Pumpkaboo', 'Dedenne',
            'Carbink'
        ]
    },
    Legendary: {
        rate: 0.01, // 1%
        pokemon: [
            // Original 8
            'Moltres', 'Articuno', 'Zapdos', 'Raikou', 'Entei',
            'Suicune', 'Celebi', 'Lugia',
            // New 20 Legendary Pokemon (including Mew and Mewtwo)
            'Mew', 'Mewtwo', 'HoOh', 'Latias', 'Latios',
            'Jirachi', 'Deoxys', 'Uxie', 'Mesprit', 'Azelf',
            'Heatran', 'Regigigas', 'Cresselia', 'Darkrai', 'Shaymin',
            'Arceus', 'Victini', 'Cobalion', 'Terrakion', 'Virizion'
        ]
    }
};


// ============================================================================
// RANDOM EVENTS
// ============================================================================

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
          { chance: 1.0, effect: { skillPoints: 10, energy: 5 }, flavor: 'You sketch the symbols—valuable knowledge that grants understanding!' }
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
          { chance: 1.0, effect: { skillPoints: 10, energy: 8 }, flavor: 'You take notes on advanced strategies—very educational!' }
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
          { chance: 1.0, effect: { stats: { HP: 5, Speed: 4, Defense: 4 } }, flavor: 'Your Pokemon powers through the current—excellent water training!' }
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
          { chance: 0.5, effect: { stats: { HP: -4 }, energy: -19 }, flavor: 'Those were bitter Razz Berries—your Pokemon feels sick!' }
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
          { chance: 1.0, effect: { energy: 10, skillPoints: 5 }, flavor: 'Better safe than sorry—you take a safer path and stay fresh.' }
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
          { chance: 1.0, effect: { energy: 10, skillPoints: 5 }, flavor: 'You snack lightly while chatting with trainers—nice break!' }
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
          { chance: 1.0, effect: { energy: 11, stats: { HP: 4, Defense: 4 } }, flavor: 'Slow and steady wins the race—you train safely.' }
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
          { chance: 0.5, effect: { stats: { HP: -8, Attack: -6, Defense: -5 }, energy: -22 }, flavor: 'Your gamble backfires spectacularly—sometimes caution is best!' }
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


// ============================================================================
// HANGOUT EVENTS
// ============================================================================

const HANGOUT_EVENTS = {
  Cynthia: {
    name: 'Champion\'s Masterclass',
    description: 'Cynthia invites you to train with her!',
    flavor: 'Cynthia demonstrates overwhelming power. "True strength comes from understanding your partner," she says with a serene smile.',
    effect: { stats: { Attack: 15, Instinct: 10 }, moveHint: 'DragonClaw', energy: 20 }
  },
  Red: {
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
    flavor: 'Misty performs graceful aquatic maneuvers. "Water flows effortlessly—your training should too!" she chirps.',
    effect: { stats: { Instinct: 11, Speed: 8 }, moveHint: 'Surf', energy: 15 }
  },
  Brock: {
    name: 'Rock Solid Defense',
    description: 'Brock demonstrates endurance training.',
    flavor: 'Brock stands unmovable like a mountain. "Defense isn\'t just blocking—it\'s outlasting!" he teaches firmly.',
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
    flavor: 'Whitney giggles, "Stamina wins the long game—just keep going!"',
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
    flavor: 'Chuck roars, "Strength and discipline—that\'s the warrior\'s way!"',
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
    flavor: 'Pryce smiles warmly. "Rest is not weakness—it\'s strategic preparation," he advises.',
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
    flavor: 'Iris cheers. "Dragons never back down—show your fighting spirit!" she yells excitedly.',
    effect: { stats: { Attack: 14, Speed: 11 }, moveHint: 'DragonClaw', energy: 16 }
  },
  Karen: {
    name: 'Dark Arts Mastery',
    description: 'Karen reveals the strength of dark-type strategy.',
    flavor: 'Karen smirks, "Winning isn\'t about type—it\'s about strategy and bond."',
    effect: { stats: { Defense: 11, Instinct: 10 }, moveHint: 'DarkPulse', skillPoints: 12 }
  },
  Agatha: {
    name: 'Spectral Training',
    description: 'Agatha teaches ancient ghost-type techniques.',
    flavor: 'Agatha cackles. "Fear is a weapon—use it wisely!" she says ominously.',
    effect: { stats: { Instinct: 12, Speed: 9 }, moveHint: 'ShadowBall', energy: 13 }
  },
  Blue: {
    name: 'Rival\'s Challenge',
    description: 'Blue pushes you to exceed your limits.',
    flavor: 'Blue smirks, "Smell ya later—unless you can actually keep up!" he taunts.',
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
    flavor: 'Diantha smiles, "A champion shines brightest under pressure—be dazzling!"',
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
    flavor: 'Archie roars, "The ocean\'s fury is unstoppable—embrace its power!"',
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
    flavor: 'Arven serves his signature sandwich. "Food is the best medicine—eat up!" he says warmly.',
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
    flavor: 'Sonia\'s eyes light up. "I\'ve discovered something fascinating—look at this data!" she exclaims.',
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
    flavor: 'Kieran\'s eyes burn with intensity. "I won\'t lose again—not to anyone!" he vows.',
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
    flavor: 'Lacey drills through obstacles. "Speed and precision—that\'s the Blueberry way!" she shouts.',
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
    flavor: 'Nessa poses elegantly. "Ride the wave—don\'t fight against it!" she advises.',
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
    flavor: 'Melony wraps you in a cozy scarf. "Rest well—tomorrow we train harder!" she says gently.',
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


// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  ICONS,
  EVOLUTION_CONFIG,
  EVOLUTION_CHAINS,
  GAME_CONFIG,
  MOVES,
  calculateBaseStats,
  POKEMON,
  LEGENDARY_POKEMON,
  GYM_LEADER_POKEMON,
  ELITE_FOUR,
  SUPPORT_CARDS,
  SUPPORT_GACHA_RARITY,
  GACHA_RARITY,
  RANDOM_EVENTS,
  HANGOUT_EVENTS,
  LEGACY_SUPPORT_NAME_MAP,
  normalizeSupportName
};
