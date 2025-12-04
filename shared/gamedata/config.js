/**
 * GAME CONFIGURATION
 * Core configuration constants and utility functions
 */

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
  // Base stat multipliers based on evolution potential
  // Two evolutions = baseline, one evolution = 15% stronger, no evolution = 30% stronger
  BASE_STAT_MULTIPLIERS: {
    NO_EVOLUTION: 1.30,
    ONE_EVOLUTION: 1.15,
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
  'Nidoranâ™€': { stage1: 'Nidorina', stage2: 'Nidoqueen', stages: 2 },
  'Nidoranâ™‚': { stage1: 'Nidorino', stage2: 'Nidoking', stages: 2 },
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
    ENEMY_STAT_MULTIPLIER: 1.0,
    // Additional difficulty scaling that accelerates over the career (0% at start, this % at Elite Four)
    DIFFICULTY_SCALING_MAX: 0.10
  },
  TRAINING: {
    ENERGY_COSTS: { HP: 20, Attack: 25, Defense: 15, Instinct: 20, Speed: -5 },
    FAILURE_CHANCE_AT_ZERO_ENERGY: 0.99,
    BASE_STAT_GAINS: { HP: 8, Attack: 5, Defense: 5, Instinct: 4, Speed: 3 },
    SKILL_POINTS_ON_SUCCESS: 3,
    STAT_LOSS_ON_FAILURE: 2,
    FRIENDSHIP_GAIN_PER_TRAINING: 10,
    LEVEL_UP_REQUIREMENT: 4, // Successful trainings needed to level up
    LEVEL_BONUS_MULTIPLIER: 0.50, // 50% bonus per level
    MAX_TRAINING_LEVEL: 5 // Maximum training level cap
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
    Fire: { strong: 'Grass', weak: 'Water' },
    Water: { strong: 'Fire', weak: 'Grass' },
    Grass: { strong: 'Water', weak: 'Fire' },
    Electric: { strong: 'Psychic', weak: 'Psychic' },
    Psychic: { strong: 'Fighting', weak: 'Psychic' },
    Fighting: { strong: 'Electric', weak: 'Psychic' }
  },
  // Valid attack types for aptitudes
  VALID_TYPES: ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Fighting'],
  MOVES: {
    BASE_COST_MULTIPLIER: 3.0,
    HINT_DISCOUNT: 0.15,
    MAX_HINT_DISCOUNT: 0.60
  }
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

module.exports = {
  ICONS,
  EVOLUTION_CONFIG,
  EVOLUTION_CHAINS,
  GAME_CONFIG,
  calculateBaseStats
};
