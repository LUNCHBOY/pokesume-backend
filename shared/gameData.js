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
  'Ralts': { stage1: 'Kirlia', stage2: null, stages: 1 },
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
  'Noibat': { stage1: 'Noivern', stage2: null, stages: 1 }
};

const GAME_CONFIG = {
  CAREER: {
    TOTAL_TURNS: 60,
    GYM_LEADER_INTERVAL: 12,
    STARTING_ENERGY: 100,
    MAX_ENERGY: 100
  },
  TRAINING: {
    ENERGY_COSTS: { HP: 25, Attack: 30, Defense: 20, Instinct: 25, Speed: -5 },
    FAILURE_CHANCE_AT_ZERO_ENERGY: 0.99,
    BASE_STAT_GAINS: { HP: 11, Attack: 7, Defense: 7, Instinct: 5, Speed: 4 },
    SKILL_POINTS_ON_SUCCESS: 3,
    STAT_LOSS_ON_FAILURE: 2,
    FRIENDSHIP_GAIN_PER_TRAINING: 7,
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
  STRATEGY: {
    Nuker: { warmup_mult: 0.6, cooldown_mult: 1.4 },
    Balanced: { warmup_mult: 0.9, cooldown_mult: 0.9 },
    Scaler: { warmup_mult: 1.4, cooldown_mult: 0.6 }
  },
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
  GigaDrain: { type: 'Grass', damage: 22, warmup: 3, cooldown: 4, stamina: 35, cost: 45, effect: { type: 'drain', chance: 0.5, duration: 1, healPercent: 0.5 } },
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
  SludgeBomb: { type: 'Poison', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'poison', chance: 0.4, duration: 4, damage: 4 } },
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
  BulkUp: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_attack_defense', duration: 4 } },
  BulletPunch: { type: 'Fighting', damage: 16, warmup: 0, cooldown: 2, stamina: 28, cost: 38, effect: null },
  CalmMind: { type: 'Psychic', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_instinct', duration: 4 } },
  Curse: { type: 'Psychic', damage: 0, warmup: 3, cooldown: 6, stamina: 40, cost: 50, effect: { type: 'curse', duration: 5, damage: 6 } },
  DazzlingGleam: { type: 'Normal', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: null },
  DestinyBond: { type: 'Psychic', damage: 0, warmup: 3, cooldown: 8, stamina: 50, cost: 60, effect: { type: 'destiny_bond', duration: 2 } },
  DracoMeteor: { type: 'Fire', damage: 40, warmup: 6, cooldown: 7, stamina: 65, cost: 82, effect: { type: 'debuff_instinct_self', duration: 2 } },
  DragonDance: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_attack_speed', duration: 4 } },
  DragonPulse: { type: 'Fire', damage: 29, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: null },
  DragonRush: { type: 'Fighting', damage: 32, warmup: 4, cooldown: 5, stamina: 52, cost: 65, effect: { type: 'stun', chance: 0.2, duration: 1 } },
  DragonTail: { type: 'Fighting', damage: 20, warmup: 2, cooldown: 4, stamina: 35, cost: 45, effect: { type: 'push_back' } },
  DreamEater: { type: 'Psychic', damage: 32, warmup: 4, cooldown: 5, stamina: 48, cost: 60, effect: { type: 'drain_sleep', healPercent: 0.5 } },
  EarthPower: { type: 'Fighting', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'debuff_defense', chance: 0.1, duration: 2 } },
  Eruption: { type: 'Fire', damage: 42, warmup: 6, cooldown: 7, stamina: 70, cost: 85, effect: { type: 'hp_based_damage' } },
  Explosion: { type: 'Normal', damage: 45, warmup: 5, cooldown: 10, stamina: 85, cost: 90, effect: { type: 'self_ko' } },
  FeintAttack: { type: 'Psychic', damage: 20, warmup: 1, cooldown: 2, stamina: 30, cost: 40, effect: null },
  FirePunch: { type: 'Fire', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 48, effect: { type: 'burn', chance: 0.2, duration: 4, damage: 3 } },
  FlashCannon: { type: 'Normal', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'debuff_defense', chance: 0.1, duration: 2 } },
  FocusBlast: { type: 'Fighting', damage: 36, warmup: 5, cooldown: 6, stamina: 58, cost: 72, effect: { type: 'debuff_defense', chance: 0.1, duration: 2 } },
  FoulPlay: { type: 'Psychic', damage: 30, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'use_opponent_attack' } },
  FusionFlare: { type: 'Fire', damage: 38, warmup: 6, cooldown: 6, stamina: 62, cost: 78, effect: { type: 'burn', chance: 0.3, duration: 5, damage: 5 } },
  FutureSight: { type: 'Psychic', damage: 36, warmup: 5, cooldown: 7, stamina: 55, cost: 70, effect: { type: 'delayed_damage', turns: 3 } },
  HeatWave: { type: 'Fire', damage: 31, warmup: 4, cooldown: 5, stamina: 50, cost: 62, effect: { type: 'burn', chance: 0.2, duration: 4, damage: 3 } },
  Hex: { type: 'Psychic', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 45, effect: { type: 'double_if_status' } },
  Hurricane: { type: 'Normal', damage: 36, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'confuse', chance: 0.3, duration: 3 } },
  IcePunch: { type: 'Water', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 48, effect: { type: 'freeze', chance: 0.2, duration: 3 } },
  IronDefense: { type: 'Normal', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_defense', duration: 4 } },
  MeteorMash: { type: 'Normal', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'buff_attack', chance: 0.2, duration: 3 } },
  Metronome: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'random_move' } },
  MilkDrink: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  Moonblast: { type: 'Normal', damage: 31, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'debuff_instinct', chance: 0.3, duration: 2 } },
  Moonlight: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  NastyPlot: { type: 'Psychic', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_instinct', duration: 4 } },
  Outrage: { type: 'Fighting', damage: 36, warmup: 4, cooldown: 6, stamina: 58, cost: 72, effect: { type: 'confuse_self_after', duration: 2 } },
  PowerGem: { type: 'Normal', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: null },
  Present: { type: 'Normal', damage: 20, warmup: 1, cooldown: 3, stamina: 30, cost: 40, effect: { type: 'random_damage_or_heal' } },
  RapidSpin: { type: 'Normal', damage: 15, warmup: 1, cooldown: 2, stamina: 25, cost: 35, effect: { type: 'remove_hazards' } },
  Recover: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  RockPolish: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_speed', duration: 4 } },
  Rollout: { type: 'Normal', damage: 12, warmup: 1, cooldown: 2, stamina: 25, cost: 35, effect: { type: 'consecutive_boost', maxHits: 5 } },
  Roost: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  Sandstorm: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_sand', duration: 5 } },
  Screech: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'debuff_defense', duration: 3 } },
  Slash: { type: 'Normal', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 48, effect: { type: 'high_crit' } },
  SleepPowder: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'sleep', chance: 0.75, duration: 3 } },
  SludgeWave: { type: 'Poison', damage: 31, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'poison', chance: 0.3, duration: 4, damage: 4 } },
  Spikes: { type: 'Normal', damage: 0, warmup: 2, cooldown: 6, stamina: 30, cost: 40, effect: { type: 'entry_hazard', layers: 3 } },
  StealthRock: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 30, cost: 40, effect: { type: 'entry_hazard_rock' } },
  SwordsDance: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_attack', duration: 4 } },
  Synthesis: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  ThunderWave: { type: 'Electric', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'paralyze', chance: 0.9, duration: 5 } },
  Toxic: { type: 'Poison', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'badly_poison', duration: 6 } },
  Transform: { type: 'Normal', damage: 0, warmup: 3, cooldown: 10, stamina: 40, cost: 50, effect: { type: 'copy_opponent' } },
  UTurn: { type: 'Normal', damage: 21, warmup: 1, cooldown: 3, stamina: 32, cost: 42, effect: { type: 'switch_out' } },
  Waterfall: { type: 'Water', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: { type: 'stun', chance: 0.2, duration: 1 } },
  WillOWisp: { type: 'Fire', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'burn', chance: 0.85, duration: 5, damage: 4 } }
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
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam', 'FireBlast', 'WaterGun', 'ThunderShock'],
    isStarter: true
  },
  Squirtle: {
    name: 'Squirtle',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 98, Attack: 59, Defense: 66, Instinct: 81, Speed: 76 }, 2),
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam', 'HydroPump', 'VineWhip', 'Ember'],
    isStarter: true
  },
  Bulbasaur: {
    name: 'Bulbasaur',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 100, Attack: 70, Defense: 70, Instinct: 75, Speed: 65 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam', 'SolarBeam', 'WaterGun', 'PsyBeam'],
    isStarter: true
  },
  Pikachu: {
    name: 'Pikachu',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 82, Attack: 57, Defense: 52, Instinct: 87, Speed: 102 }, 1),
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Tackle', 'QuickAttack', 'Thunderbolt', 'BodySlam', 'Thunder', 'BrickBreak', 'HyperBeam', 'Ember'],
    isStarter: true
  },
  Gastly: {
    name: 'Gastly',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 96, Attack: 81, Defense: 61, Instinct: 71, Speed: 71 }, 2),
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'A',
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
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Arcanine: {
    name: 'Arcanine',
    primaryType: 'Fire',
    baseStats: { HP: 106, Attack: 86, Defense: 71, Instinct: 61, Speed: 56 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'A',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Golduck: {
    name: 'Golduck',
    primaryType: 'Water',
    baseStats: { HP: 91, Attack: 61, Defense: 76, Instinct: 86, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'E', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Lapras: {
    name: 'Lapras',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 111, Attack: 66, Defense: 81, Instinct: 76, Speed: 46 }, 0),
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'A',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Victreebel: {
    name: 'Victreebel',
    primaryType: 'Grass',
    baseStats: { HP: 96, Attack: 76, Defense: 81, Instinct: 66, Speed: 61 },
    typeAptitudes: { Red: 'E', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Vileplume: {
    name: 'Vileplume',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 66, Defense: 66, Instinct: 81, Speed: 86 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Zapdos: {
    name: 'Zapdos',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 76, Attack: 61, Defense: 56, Instinct: 91, Speed: 96 }, 0),
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'B', Yellow: 'A', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Raichu: {
    name: 'Raichu',
    primaryType: 'Electric',
    baseStats: { HP: 86, Attack: 71, Defense: 61, Instinct: 81, Speed: 81 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'D', Yellow: 'S', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'A',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Arbok: {
    name: 'Arbok',
    primaryType: 'Psychic',
    baseStats: { HP: 91, Attack: 86, Defense: 66, Instinct: 76, Speed: 61 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'E', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Nidoking: {
    name: 'Nidoking',
    primaryType: 'Psychic',
    baseStats: { HP: 81, Attack: 91, Defense: 71, Instinct: 66, Speed: 71 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'S', Yellow: 'D', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Rapidash: {
    name: 'Rapidash',
    primaryType: 'Fire',
    baseStats: { HP: 96, Attack: 81, Defense: 61, Instinct: 76, Speed: 66 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Starmie: {
    name: 'Starmie',
    primaryType: 'Water',
    baseStats: { HP: 86, Attack: 71, Defense: 86, Instinct: 71, Speed: 66 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Exeggutor: {
    name: 'Exeggutor',
    primaryType: 'Grass',
    baseStats: { HP: 91, Attack: 61, Defense: 76, Instinct: 86, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'A',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Jolteon: {
    name: 'Jolteon',
    primaryType: 'Electric',
    baseStats: { HP: 81, Attack: 64, Defense: 57, Instinct: 87, Speed: 91 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Muk: {
    name: 'Muk',
    primaryType: 'Psychic',
    baseStats: { HP: 101, Attack: 76, Defense: 66, Instinct: 81, Speed: 56 },
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'E', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Magmar: {
    name: 'Magmar',
    primaryType: 'Fire',
    baseStats: { HP: 99, Attack: 89, Defense: 66, Instinct: 69, Speed: 57 },
    typeAptitudes: { Red: 'S', Blue: 'E', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Vaporeon: {
    name: 'Vaporeon',
    primaryType: 'Water',
    baseStats: { HP: 93, Attack: 69, Defense: 79, Instinct: 79, Speed: 60 },
    typeAptitudes: { Red: 'D', Blue: 'A', Green: 'E', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'A',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Tangela: {
    name: 'Tangela',
    primaryType: 'Grass',
    baseStats: { HP: 89, Attack: 83, Defense: 69, Instinct: 73, Speed: 66 },
    typeAptitudes: { Red: 'E', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Electabuzz: {
    name: 'Electabuzz',
    primaryType: 'Electric',
    baseStats: { HP: 85, Attack: 71, Defense: 61, Instinct: 83, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Weezing: {
    name: 'Weezing',
    primaryType: 'Psychic',
    baseStats: { HP: 94, Attack: 79, Defense: 69, Instinct: 75, Speed: 63 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'D', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'A',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Flareon: {
    name: 'Flareon',
    primaryType: 'Fire',
    baseStats: { HP: 88, Attack: 84, Defense: 59, Instinct: 73, Speed: 76 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Cloyster: {
    name: 'Cloyster',
    primaryType: 'Water',
    baseStats: { HP: 92, Attack: 65, Defense: 73, Instinct: 83, Speed: 67 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Parasect: {
    name: 'Parasect',
    primaryType: 'Grass',
    baseStats: { HP: 85, Attack: 79, Defense: 73, Instinct: 77, Speed: 66 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Magneton: {
    name: 'Magneton',
    primaryType: 'Electric',
    baseStats: { HP: 79, Attack: 69, Defense: 55, Instinct: 93, Speed: 94 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'D', Yellow: 'S', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Tentacruel: {
    name: 'Tentacruel',
    primaryType: 'Psychic',
    baseStats: { HP: 97, Attack: 75, Defense: 71, Instinct: 69, Speed: 68 },
    typeAptitudes: { Red: 'B', Blue: 'A', Green: 'C', Purple: 'A', Yellow: 'E', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Mew: {
    name: 'Mew',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 100, Attack: 100, Defense: 100, Instinct: 100, Speed: 100 }, 0),
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['Tackle', 'Ember'],
    learnableAbilities: ['BodySlam', 'HyperBeam', 'Flamethrower', 'Surf', 'RazorLeaf', 'Thunderbolt', 'Psychic']
  },
  Mewtwo: {
    name: 'Mewtwo',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 106, Attack: 110, Defense: 90, Instinct: 154, Speed: 130 }, 0),
    typeAptitudes: { Red: 'S', Blue: 'S', Green: 'S', Purple: 'S', Yellow: 'S', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'UU',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['BodySlam', 'HyperBeam', 'Flamethrower', 'FireBlast', 'Surf', 'HydroPump', 'RazorLeaf', 'SolarBeam', 'Thunderbolt', 'Thunder', 'Psychic', 'PsychicBlast']
  },
  Snorlax: {
    name: 'Snorlax',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 160, Attack: 110, Defense: 65, Instinct: 65, Speed: 30 }, 0),
    typeAptitudes: { Red: 'B', Blue: 'B', Green: 'B', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'A',
    defaultAbilities: ['Tackle', 'BodySlam'],
    learnableAbilities: ['HyperBeam', 'Ember', 'WaterGun', 'VineWhip', 'ThunderShock']
  },
  
  // Common Tier Gacha Pokemon
  Rattata: {
    name: 'Rattata',
    primaryType: 'Normal',
    baseStats: { HP: 84, Attack: 69, Defense: 59, Instinct: 74, Speed: 94 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Meowth: {
    name: 'Meowth',
    primaryType: 'Normal',
    baseStats: { HP: 85, Attack: 70, Defense: 60, Instinct: 75, Speed: 90 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Sandshrew: {
    name: 'Sandshrew',
    primaryType: 'Normal',
    baseStats: { HP: 88, Attack: 83, Defense: 88, Instinct: 63, Speed: 58 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Psyduck: {
    name: 'Psyduck',
    primaryType: 'Water',
    baseStats: { HP: 91, Attack: 66, Defense: 66, Instinct: 81, Speed: 76 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam']
  },
  Poliwag: {
    name: 'Poliwag',
    primaryType: 'Water',
    baseStats: { HP: 89, Attack: 64, Defense: 64, Instinct: 74, Speed: 89 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam']
  },
  Tentacool: {
    name: 'Tentacool',
    primaryType: 'Water',
    baseStats: { HP: 90, Attack: 68, Defense: 65, Instinct: 72, Speed: 85 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'PsyBeam', 'BodySlam']
  },
  Shellder: {
    name: 'Shellder',
    primaryType: 'Water',
    baseStats: { HP: 82, Attack: 77, Defense: 97, Instinct: 67, Speed: 57 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam']
  },
  Krabby: {
    name: 'Krabby',
    primaryType: 'Water',
    baseStats: { HP: 78, Attack: 98, Defense: 88, Instinct: 58, Speed: 58 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam']
  },
  Oddish: {
    name: 'Oddish',
    primaryType: 'Grass',
    baseStats: { HP: 89, Attack: 69, Defense: 74, Instinct: 79, Speed: 69 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'PsyBeam', 'BodySlam']
  },
  Bellsprout: {
    name: 'Bellsprout',
    primaryType: 'Grass',
    baseStats: { HP: 80, Attack: 85, Defense: 55, Instinct: 80, Speed: 80 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'PsyBeam', 'BodySlam']
  },
  Paras: {
    name: 'Paras',
    primaryType: 'Grass',
    baseStats: { HP: 79, Attack: 84, Defense: 74, Instinct: 74, Speed: 69 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Zubat: {
    name: 'Zubat',
    primaryType: 'Psychic',
    baseStats: { HP: 84, Attack: 69, Defense: 59, Instinct: 74, Speed: 94 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Grimer: {
    name: 'Grimer',
    primaryType: 'Psychic',
    baseStats: { HP: 92, Attack: 82, Defense: 67, Instinct: 77, Speed: 62 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Koffing: {
    name: 'Koffing',
    primaryType: 'Psychic',
    baseStats: { HP: 88, Attack: 78, Defense: 73, Instinct: 73, Speed: 68 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'D', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Voltorb: {
    name: 'Voltorb',
    primaryType: 'Electric',
    baseStats: { HP: 81, Attack: 66, Defense: 66, Instinct: 76, Speed: 91 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'BodySlam']
  },
  Magnemite: {
    name: 'Magnemite',
    primaryType: 'Electric',
    baseStats: { HP: 76, Attack: 71, Defense: 76, Instinct: 81, Speed: 76 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'BodySlam']
  },
  Sentret: {
    name: 'Sentret',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 71, Defense: 66, Instinct: 76, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Zigzagoon: {
    name: 'Zigzagoon',
    primaryType: 'Normal',
    baseStats: { HP: 84, Attack: 68, Defense: 66, Instinct: 76, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Bidoof: {
    name: 'Bidoof',
    primaryType: 'Normal',
    baseStats: { HP: 90, Attack: 73, Defense: 71, Instinct: 70, Speed: 76 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Lillipup: {
    name: 'Lillipup',
    primaryType: 'Normal',
    baseStats: { HP: 85, Attack: 75, Defense: 67, Instinct: 73, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  
  // Uncommon Tier Gacha Pokemon
  Vulpix: {
    name: 'Vulpix',
    primaryType: 'Fire',
    baseStats: { HP: 84, Attack: 64, Defense: 62, Instinct: 84, Speed: 86 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam']
  },
  Ponyta: {
    name: 'Ponyta',
    primaryType: 'Fire',
    baseStats: { HP: 83, Attack: 83, Defense: 63, Instinct: 68, Speed: 83 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam']
  },
  Houndour: {
    name: 'Houndour',
    primaryType: 'Fire',
    baseStats: { HP: 79, Attack: 79, Defense: 59, Instinct: 84, Speed: 79 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'PsyBeam', 'BodySlam']
  },
  Torchic: {
    name: 'Torchic',
    primaryType: 'Fire',
    baseStats: { HP: 81, Attack: 76, Defense: 61, Instinct: 79, Speed: 83 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam']
  },
  Chinchou: {
    name: 'Chinchou',
    primaryType: 'Water',
    baseStats: { HP: 85, Attack: 65, Defense: 73, Instinct: 81, Speed: 76 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'ThunderShock', 'BodySlam']
  },
  Mareep: {
    name: 'Mareep',
    primaryType: 'Electric',
    baseStats: { HP: 83, Attack: 65, Defense: 63, Instinct: 85, Speed: 84 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'BodySlam']
  },
  Elekid: {
    name: 'Elekid',
    primaryType: 'Electric',
    baseStats: { HP: 79, Attack: 77, Defense: 59, Instinct: 81, Speed: 84 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'BodySlam']
  },
  Hoppip: {
    name: 'Hoppip',
    primaryType: 'Grass',
    baseStats: { HP: 77, Attack: 62, Defense: 65, Instinct: 87, Speed: 89 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Sunkern: {
    name: 'Sunkern',
    primaryType: 'Grass',
    baseStats: { HP: 82, Attack: 67, Defense: 72, Instinct: 77, Speed: 82 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Spinarak: {
    name: 'Spinarak',
    primaryType: 'Psychic',
    baseStats: { HP: 85, Attack: 76, Defense: 64, Instinct: 74, Speed: 81 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Skorupi: {
    name: 'Skorupi',
    primaryType: 'Psychic',
    baseStats: { HP: 79, Attack: 77, Defense: 84, Instinct: 69, Speed: 71 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Eevee: {
    name: 'Eevee',
    primaryType: 'Normal',
    baseStats: { HP: 79, Attack: 69, Defense: 66, Instinct: 83, Speed: 83 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Togepi: {
    name: 'Togepi',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 62, Defense: 75, Instinct: 87, Speed: 79 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Snubbull: {
    name: 'Snubbull',
    primaryType: 'Normal',
    baseStats: { HP: 83, Attack: 86, Defense: 66, Instinct: 71, Speed: 74 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Teddiursa: {
    name: 'Teddiursa',
    primaryType: 'Normal',
    baseStats: { HP: 83, Attack: 81, Defense: 66, Instinct: 73, Speed: 77 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  
  // Rare Tier Gacha Pokemon
  Slugma: {
    name: 'Slugma',
    primaryType: 'Fire',
    baseStats: { HP: 89, Attack: 69, Defense: 67, Instinct: 84, Speed: 71 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam']
  },
  Clefairy: {
    name: 'Clefairy',
    primaryType: 'Normal',
    baseStats: { HP: 87, Attack: 61, Defense: 69, Instinct: 84, Speed: 79 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Jigglypuff: {
    name: 'Jigglypuff',
    primaryType: 'Normal',
    baseStats: { HP: 109, Attack: 64, Defense: 62, Instinct: 79, Speed: 66 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Phanpy: {
    name: 'Phanpy',
    primaryType: 'Normal',
    baseStats: { HP: 84, Attack: 79, Defense: 77, Instinct: 67, Speed: 73 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Spheal: {
    name: 'Spheal',
    primaryType: 'Water',
    baseStats: { HP: 93, Attack: 65, Defense: 70, Instinct: 83, Speed: 69 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam']
  },
  Spoink: {
    name: 'Spoink',
    primaryType: 'Normal',
    baseStats: { HP: 83, Attack: 66, Defense: 69, Instinct: 86, Speed: 76 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Skitty: {
    name: 'Skitty',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 65, Defense: 63, Instinct: 83, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam']
  },
  Deerling: {
    name: 'Deerling',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 71, Defense: 67, Instinct: 77, Speed: 84 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  
  // Legendary Tier Gacha Pokemon (already defined as starters)
  Fletchling: {
    name: 'Fletchling',
    primaryType: 'Fire',
    baseStats: { HP: 79, Attack: 69, Defense: 59, Instinct: 81, Speed: 92 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam'],
    isStarter: true
  },
  Bunnelby: {
    name: 'Bunnelby',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 75, Defense: 59, Instinct: 77, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam'],
    isStarter: true
  },
  Yungoos: {
    name: 'Yungoos',
    primaryType: 'Normal',
    baseStats: { HP: 83, Attack: 79, Defense: 65, Instinct: 75, Speed: 78 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam'],
    isStarter: true
  },
  Wooloo: {
    name: 'Wooloo',
    primaryType: 'Normal',
    baseStats: { HP: 89, Attack: 65, Defense: 75, Instinct: 79, Speed: 72 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam'],
    isStarter: true
  },
  Skwovet: {
    name: 'Skwovet',
    primaryType: 'Normal',
    baseStats: { HP: 85, Attack: 69, Defense: 67, Instinct: 77, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['BodySlam'],
    isStarter: true
  },
  
  // New Gen 2-6 Pokemon (50 total)
  Cyndaquil: {
    name: 'Cyndaquil',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 95, Attack: 66, Defense: 56, Instinct: 76, Speed: 87 }, 2),
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FireFang', 'FireBlast']
  },
  Totodile: {
    name: 'Totodile',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 100, Attack: 69, Defense: 64, Instinct: 71, Speed: 76 }, 2),
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'IceBeam', 'HydroPump']
  },
  Chikorita: {
    name: 'Chikorita',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 98, Attack: 59, Defense: 67, Instinct: 78, Speed: 78 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'LeafBlade', 'SolarBeam']
  },
  Torchic: {
    name: 'Torchic',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 91, Attack: 71, Defense: 57, Instinct: 76, Speed: 85 }, 2),
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FireFang', 'LavaPlume']
  },
  Mudkip: {
    name: 'Mudkip',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 100, Attack: 63, Defense: 66, Instinct: 73, Speed: 78 }, 2),
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'IceBeam', 'HydroPump']
  },
  Treecko: {
    name: 'Treecko',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 90, Attack: 65, Defense: 61, Instinct: 79, Speed: 85 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'SolarBeam']
  },
  Piplup: {
    name: 'Piplup',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 97, Attack: 61, Defense: 67, Instinct: 77, Speed: 78 }, 2),
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'IceBeam', 'Blizzard']
  },
  Turtwig: {
    name: 'Turtwig',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 101, Attack: 61, Defense: 70, Instinct: 75, Speed: 73 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['LeafBlade', 'PowerWhip', 'SolarBeam']
  },
  Chimchar: {
    name: 'Chimchar',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 93, Attack: 66, Defense: 58, Instinct: 78, Speed: 85 }, 2),
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'FireBlast']
  },
  Tepig: {
    name: 'Tepig',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 99, Attack: 68, Defense: 61, Instinct: 71, Speed: 81 }, 2),
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireFang', 'LavaPlume']
  },
  Oshawott: {
    name: 'Oshawott',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 97, Attack: 65, Defense: 63, Instinct: 75, Speed: 80 }, 2),
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'HydroPump']
  },
  Snivy: {
    name: 'Snivy',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 91, Attack: 61, Defense: 67, Instinct: 81, Speed: 80 }, 2),
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'B', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'SolarBeam']
  },
  Klefki: {
    name: 'Klefki',
    primaryType: 'Normal',
    baseStats: { HP: 79, Attack: 71, Defense: 85, Instinct: 82, Speed: 83 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Sneasel: {
    name: 'Sneasel',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 85, Defense: 63, Instinct: 79, Speed: 96 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['ExtremeSpeed', 'PlayRough']
  },
  Murkrow: {
    name: 'Murkrow',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 81, Defense: 58, Instinct: 81, Speed: 99 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['ExtremeSpeed', 'BodySlam']
  },
  Gligar: {
    name: 'Gligar',
    primaryType: 'Psychic',
    baseStats: { HP: 83, Attack: 77, Defense: 81, Instinct: 73, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'QuickAttack'],
    learnableAbilities: ['ZenHeadbutt', 'Psyshock']
  },
  Yanma: {
    name: 'Yanma',
    primaryType: 'Normal',
    baseStats: { HP: 78, Attack: 69, Defense: 59, Instinct: 83, Speed: 111 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'B', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['ExtremeSpeed', 'DoubleEdge']
  },
  Snorunt: {
    name: 'Snorunt',
    primaryType: 'Water',
    baseStats: { HP: 81, Attack: 69, Defense: 69, Instinct: 79, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['IceBeam', 'Blizzard']
  },
  Aron: {
    name: 'Aron',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 75, Defense: 95, Instinct: 67, Speed: 62 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Ralts: {
    name: 'Ralts',
    primaryType: 'Normal',
    baseStats: { HP: 73, Attack: 63, Defense: 63, Instinct: 91, Speed: 90 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Shinx: {
    name: 'Shinx',
    primaryType: 'Electric',
    baseStats: { HP: 77, Attack: 75, Defense: 67, Instinct: 79, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['ThunderShock', 'QuickAttack'],
    learnableAbilities: ['VoltSwitch', 'Thunderbolt', 'WildCharge']
  },
  Starly: {
    name: 'Starly',
    primaryType: 'Normal',
    baseStats: { HP: 75, Attack: 69, Defense: 57, Instinct: 75, Speed: 104 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['ExtremeSpeed', 'DoubleEdge']
  },
  Buneary: {
    name: 'Buneary',
    primaryType: 'Normal',
    baseStats: { HP: 79, Attack: 77, Defense: 65, Instinct: 77, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['PlayRough', 'DoubleEdge']
  },
  Glameow: {
    name: 'Glameow',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 73, Defense: 65, Instinct: 79, Speed: 86 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Stunky: {
    name: 'Stunky',
    primaryType: 'Psychic',
    baseStats: { HP: 81, Attack: 77, Defense: 65, Instinct: 75, Speed: 82 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Hypnosis', 'Psychic']
  },
  Croagunk: {
    name: 'Croagunk',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 77, Defense: 65, Instinct: 77, Speed: 84 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'QuickAttack'],
    learnableAbilities: ['Psyshock', 'ZenHeadbutt']
  },
  Purrloin: {
    name: 'Purrloin',
    primaryType: 'Normal',
    baseStats: { HP: 75, Attack: 73, Defense: 62, Instinct: 81, Speed: 89 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Patrat: {
    name: 'Patrat',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 73, Defense: 65, Instinct: 75, Speed: 90 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['ExtremeSpeed', 'BodySlam']
  },
  Roggenrola: {
    name: 'Roggenrola',
    primaryType: 'Normal',
    baseStats: { HP: 79, Attack: 73, Defense: 91, Instinct: 63, Speed: 74 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Tympole: {
    name: 'Tympole',
    primaryType: 'Water',
    baseStats: { HP: 81, Attack: 67, Defense: 65, Instinct: 77, Speed: 90 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'IceBeam']
  },
  Venipede: {
    name: 'Venipede',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 73, Defense: 75, Instinct: 71, Speed: 84 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Hypnosis', 'Psychic']
  },
  Sandile: {
    name: 'Sandile',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 79, Defense: 65, Instinct: 75, Speed: 80 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Dwebble: {
    name: 'Dwebble',
    primaryType: 'Normal',
    baseStats: { HP: 75, Attack: 73, Defense: 91, Instinct: 67, Speed: 74 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Scraggy: {
    name: 'Scraggy',
    primaryType: 'Normal',
    baseStats: { HP: 81, Attack: 83, Defense: 85, Instinct: 67, Speed: 64 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Gothita: {
    name: 'Gothita',
    primaryType: 'Normal',
    baseStats: { HP: 75, Attack: 63, Defense: 71, Instinct: 87, Speed: 84 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Litleo: {
    name: 'Litleo',
    primaryType: 'Fire',
    baseStats: { HP: 79, Attack: 73, Defense: 67, Instinct: 83, Speed: 78 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Ember', 'QuickAttack'],
    learnableAbilities: ['FireFang', 'Flamethrower']
  },
  Skiddo: {
    name: 'Skiddo',
    primaryType: 'Grass',
    baseStats: { HP: 83, Attack: 75, Defense: 79, Instinct: 73, Speed: 70 },
    typeAptitudes: { Red: 'D', Blue: 'C', Green: 'A', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['LeafBlade', 'PowerWhip']
  },
  Pancham: {
    name: 'Pancham',
    primaryType: 'Normal',
    baseStats: { HP: 83, Attack: 85, Defense: 67, Instinct: 71, Speed: 74 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Honedge: {
    name: 'Honedge',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 85, Defense: 95, Instinct: 69, Speed: 54 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Inkay: {
    name: 'Inkay',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 71, Defense: 69, Instinct: 83, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Binacle: {
    name: 'Binacle',
    primaryType: 'Water',
    baseStats: { HP: 77, Attack: 77, Defense: 85, Instinct: 71, Speed: 70 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'IceBeam']
  },
  Skrelp: {
    name: 'Skrelp',
    primaryType: 'Psychic',
    baseStats: { HP: 75, Attack: 71, Defense: 85, Instinct: 79, Speed: 70 },
    typeAptitudes: { Red: 'C', Blue: 'B', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'B',
    defaultAbilities: ['PsyBeam', 'WaterGun'],
    learnableAbilities: ['Hypnosis', 'Psychic']
  },
  Helioptile: {
    name: 'Helioptile',
    primaryType: 'Electric',
    baseStats: { HP: 75, Attack: 67, Defense: 63, Instinct: 83, Speed: 92 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['ThunderShock', 'QuickAttack'],
    learnableAbilities: ['VoltSwitch', 'Thunderbolt']
  },
  Tyrunt: {
    name: 'Tyrunt',
    primaryType: 'Normal',
    baseStats: { HP: 83, Attack: 85, Defense: 71, Instinct: 69, Speed: 72 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['StoneEdge', 'DoubleEdge']
  },
  Amaura: {
    name: 'Amaura',
    primaryType: 'Water',
    baseStats: { HP: 87, Attack: 63, Defense: 69, Instinct: 81, Speed: 80 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['IceBeam', 'Blizzard']
  },
  Goomy: {
    name: 'Goomy',
    primaryType: 'Normal',
    baseStats: { HP: 77, Attack: 69, Defense: 63, Instinct: 83, Speed: 88 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'B',
    defaultAbilities: ['Tackle'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Noibat: {
    name: 'Noibat',
    primaryType: 'Normal',
    baseStats: { HP: 75, Attack: 67, Defense: 59, Instinct: 81, Speed: 98 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'B',
    defaultAbilities: ['QuickAttack', 'Tackle'],
    learnableAbilities: ['ExtremeSpeed', 'DoubleEdge']
  },
  
  // Legendary Pokemon
  Moltres: {
    name: 'Moltres',
    primaryType: 'Fire',
    baseStats: { HP: 110, Attack: 95, Defense: 70, Instinct: 85, Speed: 75 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam', 'HyperBeam']
  },
  Articuno: {
    name: 'Articuno',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 75, Defense: 90, Instinct: 90, Speed: 65 },
    typeAptitudes: { Red: 'B', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },
  Celebi: {
    name: 'Celebi',
    primaryType: 'Grass',
    baseStats: { HP: 120, Attack: 85, Defense: 85, Instinct: 80, Speed: 65 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'S', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'S',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam', 'HyperBeam']
  },
  Raikou: {
    name: 'Raikou',
    primaryType: 'Electric',
    baseStats: { HP: 95, Attack: 80, Defense: 65, Instinct: 100, Speed: 95 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'S', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam', 'HyperBeam']
  },
  Gengar: {
    name: 'Gengar',
    primaryType: 'Psychic',
    baseStats: { HP: 105, Attack: 90, Defense: 75, Instinct: 85, Speed: 80 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'B', Purple: 'S', Yellow: 'D', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Entei: {
    name: 'Entei',
    primaryType: 'Fire',
    baseStats: { HP: 108, Attack: 98, Defense: 73, Instinct: 83, Speed: 73 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam', 'HyperBeam']
  },
  Suicune: {
    name: 'Suicune',
    primaryType: 'Water',
    baseStats: { HP: 118, Attack: 73, Defense: 93, Instinct: 88, Speed: 63 },
    typeAptitudes: { Red: 'B', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'S',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },
  Zapdos: {
    name: 'Zapdos',
    primaryType: 'Electric',
    baseStats: { HP: 98, Attack: 83, Defense: 68, Instinct: 98, Speed: 88 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'S', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam', 'HyperBeam']
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
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam', 'HyperBeam']
  },
  Articuno: {
    name: 'Articuno',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 75, Defense: 90, Instinct: 90, Speed: 65 },
    typeAptitudes: { Red: 'B', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },
  Celebi: {
    name: 'Celebi',
    primaryType: 'Grass',
    baseStats: { HP: 120, Attack: 85, Defense: 85, Instinct: 80, Speed: 65 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'S', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'S',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam', 'HyperBeam']
  },
  Raikou: {
    name: 'Raikou',
    primaryType: 'Electric',
    baseStats: { HP: 95, Attack: 80, Defense: 65, Instinct: 100, Speed: 95 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'S', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam', 'HyperBeam']
  },
  Gengar: {
    name: 'Gengar',
    primaryType: 'Psychic',
    baseStats: { HP: 105, Attack: 90, Defense: 75, Instinct: 85, Speed: 80 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'B', Purple: 'S', Yellow: 'D', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Entei: {
    name: 'Entei',
    primaryType: 'Fire',
    baseStats: { HP: 108, Attack: 98, Defense: 73, Instinct: 83, Speed: 73 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'B', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam', 'HyperBeam']
  },
  Suicune: {
    name: 'Suicune',
    primaryType: 'Water',
    baseStats: { HP: 118, Attack: 73, Defense: 93, Instinct: 88, Speed: 63 },
    typeAptitudes: { Red: 'B', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'S',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },
  Zapdos: {
    name: 'Zapdos',
    primaryType: 'Electric',
    baseStats: { HP: 100, Attack: 88, Defense: 68, Instinct: 98, Speed: 91 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'S', Orange: 'D' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam', 'HyperBeam']
  },
  Lugia: {
    name: 'Lugia',
    primaryType: 'Psychic',
    baseStats: { HP: 125, Attack: 80, Defense: 100, Instinct: 95, Speed: 65 },
    typeAptitudes: { Red: 'A', Blue: 'S', Green: 'B', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategy: 'Scaler',
    strategyGrade: 'S',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  HoOh: {
    name: 'Ho-Oh',
    primaryType: 'Fire',
    baseStats: { HP: 120, Attack: 105, Defense: 80, Instinct: 90, Speed: 70 },
    typeAptitudes: { Red: 'S', Blue: 'D', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'SacredFire', 'HyperBeam']
  },
  Mewtwo: {
    name: 'Mewtwo',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 105, Defense: 70, Instinct: 105, Speed: 85 },
    typeAptitudes: { Red: 'B', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'A', Orange: 'A' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Psystrike', 'HyperBeam']
  },
  Kyogre: {
    name: 'Kyogre',
    primaryType: 'Water',
    baseStats: { HP: 122, Attack: 98, Defense: 85, Instinct: 95, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'A', Yellow: 'A', Orange: 'B' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'OriginPulse', 'HyperBeam']
  },
  Groudon: {
    name: 'Groudon',
    primaryType: 'Fire',
    baseStats: { HP: 118, Attack: 110, Defense: 95, Instinct: 78, Speed: 64 },
    typeAptitudes: { Red: 'S', Blue: 'E', Green: 'A', Purple: 'B', Yellow: 'A', Orange: 'S' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'PrecipiceBlades', 'HyperBeam']
  },
  Rayquaza: {
    name: 'Rayquaza',
    primaryType: 'Grass',
    baseStats: { HP: 115, Attack: 105, Defense: 75, Instinct: 105, Speed: 85 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'S', Purple: 'A', Yellow: 'S', Orange: 'A' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'DragonAscent', 'HyperBeam']
  },
  Dialga: {
    name: 'Dialga',
    primaryType: 'Fighting',
    baseStats: { HP: 112, Attack: 103, Defense: 88, Instinct: 88, Speed: 74 },
    typeAptitudes: { Red: 'A', Blue: 'A', Green: 'A', Purple: 'B', Yellow: 'A', Orange: 'S' },
    strategy: 'Balanced',
    strategyGrade: 'S',
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['KarateChop', 'Submission', 'RoarOfTime', 'HyperBeam']
  },
  Palkia: {
    name: 'Palkia',
    primaryType: 'Water',
    baseStats: { HP: 108, Attack: 103, Defense: 78, Instinct: 98, Speed: 78 },
    typeAptitudes: { Red: 'A', Blue: 'S', Green: 'C', Purple: 'S', Yellow: 'A', Orange: 'B' },
    strategy: 'Nuker',
    strategyGrade: 'S',
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'SpacialRend', 'HyperBeam']
  },
  Giratina: {
    name: 'Giratina',
    primaryType: 'Psychic',
    baseStats: { HP: 125, Attack: 93, Defense: 93, Instinct: 93, Speed: 71 },
    typeAptitudes: { Red: 'B', Blue: 'A', Green: 'A', Purple: 'S', Yellow: 'B', Orange: 'A' },
    strategy: 'Scaler',
    strategyGrade: 'S',
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
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['Flamethrower', 'FireFang', 'FlareBlitz']
  },
  MistyStarmie: {
    name: 'Starmie',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 85, Defense: 90, Instinct: 115, Speed: 95 },
    typeAptitudes: { Red: 'C', Blue: 'A', Green: 'D', Purple: 'A', Yellow: 'B', Orange: 'C' },
    strategy: 'Balanced',
    strategyGrade: 'A',
    defaultAbilities: ['Surf', 'Psychic', 'IceBeam']
  },
  ErikaVileplume: {
    name: 'Vileplume',
    primaryType: 'Grass',
    baseStats: { HP: 125, Attack: 90, Defense: 95, Instinct: 100, Speed: 65 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'A',
    defaultAbilities: ['GigaDrain', 'SludgeBomb', 'SolarBeam']
  },
  SurgeRaichu: {
    name: 'Raichu',
    primaryType: 'Electric',
    baseStats: { HP: 110, Attack: 95, Defense: 70, Instinct: 95, Speed: 120 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'S', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['Thunderbolt', 'Thunder', 'VoltSwitch']
  },
  AgathaNidoking: {
    name: 'Nidoking',
    primaryType: 'Fighting',
    baseStats: { HP: 125, Attack: 110, Defense: 85, Instinct: 85, Speed: 90 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'A', Yellow: 'C', Orange: 'A' },
    strategy: 'Balanced',
    strategyGrade: 'A',
    defaultAbilities: ['Earthquake', 'SludgeBomb', 'IceBeam']
  },
  GiovanniRapidash: {
    name: 'Rapidash',
    primaryType: 'Fire',
    baseStats: { HP: 115, Attack: 105, Defense: 75, Instinct: 85, Speed: 115 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'B', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['FlareBlitz', 'Flamethrower', 'IronTail']
  },
  WallaceLapras: {
    name: 'Lapras',
    primaryType: 'Water',
    baseStats: { HP: 150, Attack: 90, Defense: 95, Instinct: 100, Speed: 65 },
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'A',
    defaultAbilities: ['HydroPump', 'IceBeam', 'Blizzard']
  },
  WattsonElectabuzz: {
    name: 'Electabuzz',
    primaryType: 'Electric',
    baseStats: { HP: 115, Attack: 93, Defense: 67, Instinct: 95, Speed: 115 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'B', Purple: 'C', Yellow: 'A', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['Thunderbolt', 'ThunderShock', 'WildCharge']
  },
  WillWeezing: {
    name: 'Weezing',
    primaryType: 'Psychic',
    baseStats: { HP: 115, Attack: 95, Defense: 135, Instinct: 85, Speed: 65 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'A',
    defaultAbilities: ['SludgeBomb', 'ShadowBall', 'DarkPulse']
  },
  FlanneryMagmar: {
    name: 'Magmar',
    primaryType: 'Fire',
    baseStats: { HP: 115, Attack: 105, Defense: 67, Instinct: 105, Speed: 103 },
    typeAptitudes: { Red: 'A', Blue: 'D', Green: 'B', Purple: 'C', Yellow: 'C', Orange: 'C' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['Flamethrower', 'LavaPlume', 'FireBlast']
  },
  SabrinaArbok: {
    name: 'Arbok',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 100, Defense: 79, Instinct: 79, Speed: 85 },
    typeAptitudes: { Red: 'B', Blue: 'C', Green: 'C', Purple: 'A', Yellow: 'C', Orange: 'B' },
    strategy: 'Balanced',
    strategyGrade: 'A',
    defaultAbilities: ['SludgeBomb', 'DarkPulse', 'Psychic']
  },
  JuanVaporeon: {
    name: 'Vaporeon',
    primaryType: 'Water',
    baseStats: { HP: 150, Attack: 75, Defense: 70, Instinct: 115, Speed: 75 },
    typeAptitudes: { Red: 'C', Blue: 'S', Green: 'D', Purple: 'B', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'A',
    defaultAbilities: ['HydroPump', 'Surf', 'IceBeam']
  },
  WinonaExeggutor: {
    name: 'Exeggutor',
    primaryType: 'Grass',
    baseStats: { HP: 135, Attack: 100, Defense: 90, Instinct: 135, Speed: 55 },
    typeAptitudes: { Red: 'D', Blue: 'B', Green: 'A', Purple: 'A', Yellow: 'C', Orange: 'C' },
    strategy: 'Scaler',
    strategyGrade: 'A',
    defaultAbilities: ['SolarBeam', 'Psychic', 'GigaDrain']
  },
  BrunoMachamp: {
    name: 'Machamp',
    primaryType: 'Fighting',
    baseStats: { HP: 130, Attack: 130, Defense: 85, Instinct: 70, Speed: 60 },
    typeAptitudes: { Red: 'C', Blue: 'C', Green: 'C', Purple: 'D', Yellow: 'C', Orange: 'S' },
    strategy: 'Nuker',
    strategyGrade: 'A',
    defaultAbilities: ['CloseCombat', 'DynamicPunch', 'Earthquake']
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
      strategy: 'Scaler',
      strategyGrade: 'S',
      defaultAbilities: ['HydroPump', 'Blizzard', 'IceBeam']
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
      strategy: 'Nuker',
      strategyGrade: 'S',
      defaultAbilities: ['CloseCombat', 'Earthquake', 'StoneEdge']
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
      strategy: 'Nuker',
      strategyGrade: 'S',
      defaultAbilities: ['ShadowBall', 'PsychicBlast', 'DarkPulse']
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
      strategy: 'Balanced',
      strategyGrade: 'S',
      defaultAbilities: ['DragonClaw', 'HyperBeam', 'Earthquake']
    }
  }
];

// ============================================================================
// SUPPORT CARDS
// ============================================================================

const SUPPORT_CARDS = {
  // ============================================================================
  // LEGENDARY TIER
  // ============================================================================
  CynthiaGarchomp: {
    name: 'Cynthia',
    trainer: 'Cynthia',
    pokemon: 'Garchomp',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 12, Defense: 0, Instinct: 4, Speed: 4 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 15,
    appearanceRate: 0.28,
    typeMatchPreference: 0.00,
    specialEffect: { statGainMultiplier: 1.15 },
    moveHints: ['Earthquake', 'DragonClaw', 'Outrage', 'StoneEdge', 'SwordsDance'],
    description: 'The Sinnoh Champion grants overwhelming power'
  },
  RedCharizard: {
    name: 'Red',
    trainer: 'Red',
    pokemon: 'Charizard',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 14, Defense: 0, Instinct: 3, Speed: 3 },
    trainingBonus: { typeMatch: 10, otherStats: 2, maxFriendshipTypeMatch: 18 },
    initialFriendship: 5,
    appearanceRate: 0.25,
    typeMatchPreference: 0.60,
    specialEffect: null,
    moveHints: ['FlareBlitz', 'DragonDance', 'AirSlash', 'HeatWave', 'BlastBurn'],
    description: 'The legendary trainer pushes limits to the extreme'
  },
  StevenMetagross: {
    name: 'Steven',
    trainer: 'Steven',
    pokemon: 'Metagross',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 5, Attack: 0, Defense: 10, Instinct: 3, Speed: 0 },
    trainingBonus: { typeMatch: 7, otherStats: 4, maxFriendshipTypeMatch: 12 },
    initialFriendship: 50,
    appearanceRate: 0.45,
    typeMatchPreference: 0.30,
    specialEffect: { failRateReduction: 0.10 },
    moveHints: ['MeteorMash', 'ZenHeadbutt', 'BulletPunch', 'IronDefense', 'Earthquake'],
    description: 'The Hoenn Champion fortifies iron defenses'
  },
  NReshiram: {
    name: 'N',
    trainer: 'N',
    pokemon: 'Reshiram',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 4, Defense: 0, Instinct: 10, Speed: 3 },
    trainingBonus: { typeMatch: 5, otherStats: 5, maxFriendshipTypeMatch: 10 },
    initialFriendship: 70,
    appearanceRate: 0.50,
    typeMatchPreference: 0.60,
    specialEffect: { friendshipGainBonus: 5 },
    moveHints: ['BlueFlare', 'FusionFlare', 'DragonPulse', 'DracoMeteor', 'Psychic'],
    description: 'The King of Team Plasma bonds through truth'
  },
  ProfessorOakMew: {
    name: 'Professor Oak',
    trainer: 'Professor Oak',
    pokemon: 'Mew',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 3, Attack: 3, Defense: 3, Instinct: 6, Speed: 3 },
    trainingBonus: { typeMatch: 4, otherStats: 4, maxFriendshipTypeMatch: 8 },
    initialFriendship: 60,
    appearanceRate: 0.55,
    typeMatchPreference: 0.00,
    specialEffect: { skillPointMultiplier: 1.5, friendshipGainBonus: 8 },
    moveHints: ['Psychic', 'AuraSphere', 'Transform', 'Metronome', 'AncientPower'],
    description: 'The Professor grants knowledge and wisdom'
  },
  DianthaDiancie: {
    name: 'Diantha',
    trainer: 'Diantha',
    pokemon: 'Diancie',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 6, Attack: 0, Defense: 8, Instinct: 0, Speed: 2 },
    trainingBonus: { typeMatch: 6, otherStats: 4, maxFriendshipTypeMatch: 11 },
    initialFriendship: 35,
    appearanceRate: 0.35,
    typeMatchPreference: 0.12,
    specialEffect: { statGainMultiplier: 1.20, failRateReduction: 0.15 },
    moveHints: ['DiamondStorm', 'Moonblast', 'DazzlingGleam', 'RockPolish', 'Reflect'],
    description: 'The Kalos Champion radiates brilliance'
  },

  // ============================================================================
  // RARE TIER
  // ============================================================================
  LanceDragonite: {
    name: 'Lance',
    trainer: 'Lance',
    pokemon: 'Dragonite',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 10, Defense: 0, Instinct: 3, Speed: 2 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 10,
    appearanceRate: 0.28,
    typeMatchPreference: 0.00,
    specialEffect: null,
    moveHints: ['DragonDance', 'Outrage', 'ExtremeSpeed', 'DragonRush', 'FirePunch'],
    description: 'The Dragon Master enhances draconic power'
  },
  SabrinaAlakazam: {
    name: 'Sabrina',
    trainer: 'Sabrina',
    pokemon: 'Alakazam',
    rarity: 'Rare',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 0, Defense: 0, Instinct: 12, Speed: 3 },
    trainingBonus: { typeMatch: 8, otherStats: 2, maxFriendshipTypeMatch: 14 },
    initialFriendship: 5,
    appearanceRate: 0.30,
    typeMatchPreference: 0.12,
    specialEffect: null,
    moveHints: ['Psychic', 'FutureSight', 'FocusBlast', 'CalmMind', 'ShadowBall'],
    description: 'The Saffron Gym Leader sharpens the mind'
  },
  MortyGengar: {
    name: 'Morty',
    trainer: 'Morty',
    pokemon: 'Gengar',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 2, Defense: 0, Instinct: 3, Speed: 8 },
    trainingBonus: { typeMatch: 4, otherStats: 3, maxFriendshipTypeMatch: 8 },
    initialFriendship: 45,
    appearanceRate: 0.50,
    typeMatchPreference: 0.60,
    specialEffect: { friendshipGainBonus: 3 },
    moveHints: ['ShadowBall', 'SludgeBomb', 'Hypnosis', 'DreamEater', 'Hex'],
    description: 'The Ecruteak Gym Leader channels ghostly power'
  },
  WallaceMillotic: {
    name: 'Wallace',
    trainer: 'Wallace',
    pokemon: 'Milotic',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 8, Attack: 0, Defense: 3, Instinct: 2, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 9 },
    initialFriendship: 55,
    appearanceRate: 0.42,
    typeMatchPreference: 0.23,
    specialEffect: { maxEnergyBonus: 10, restBonus: 8 },
    moveHints: ['Surf', 'IceBeam', 'Recover', 'DragonTail', 'AquaRing'],
    description: 'The Hoenn Champion exudes elegance'
  },
  CynthiaLucario: {
    name: 'Cynthia',
    trainer: 'Cynthia',
    pokemon: 'Lucario',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 8, Defense: 2, Instinct: 2, Speed: 2 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 11 },
    initialFriendship: 25,
    appearanceRate: 0.35,
    typeMatchPreference: 0.42,
    specialEffect: { statGainMultiplier: 1.10, failRateReduction: 0.08 },
    moveHints: ['AuraSphere', 'CloseCombat', 'ExtremeSpeed', 'BulletPunch', 'SwordsDance'],
    description: 'The Champion refines battle technique'
  },
  IrisHaxorus: {
    name: 'Iris',
    trainer: 'Iris',
    pokemon: 'Haxorus',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 9, Defense: 0, Instinct: 1, Speed: 2 },
    trainingBonus: { typeMatch: 4, otherStats: 3, maxFriendshipTypeMatch: 7 },
    initialFriendship: 60,
    appearanceRate: 0.50,
    typeMatchPreference: 0.18,
    specialEffect: null,
    moveHints: ['DragonDance', 'Outrage', 'Earthquake', 'DragonClaw', 'SwordsDance'],
    description: 'The Unova Champion commands dragons'
  },
  BluePidgeot: {
    name: 'Blue',
    trainer: 'Blue',
    pokemon: 'Pidgeot',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 2, Defense: 0, Instinct: 2, Speed: 8 },
    trainingBonus: { typeMatch: 3, otherStats: 3, maxFriendshipTypeMatch: 6 },
    initialFriendship: 20,
    appearanceRate: 0.55,
    typeMatchPreference: 0.00,
    specialEffect: null,
    moveHints: ['Hurricane', 'BraveBird', 'AirSlash', 'Roost', 'UTurn'],
    description: 'The rival trainer pushes limits'
  },
  GiovanniPersian: {
    name: 'Giovanni',
    trainer: 'Giovanni',
    pokemon: 'Persian',
    rarity: 'Rare',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 5, Defense: 0, Instinct: 7, Speed: 2 },
    trainingBonus: { typeMatch: 8, otherStats: 2, maxFriendshipTypeMatch: 15 },
    initialFriendship: 0,
    appearanceRate: 0.26,
    typeMatchPreference: 0.60,
    specialEffect: { statGainMultiplier: 1.12 },
    moveHints: ['Slash', 'PowerGem', 'FeintAttack', 'NastyPlot', 'PayDay'],
    description: 'The Rocket Boss commands ruthlessly'
  },
  MaxieGroudon: {
    name: 'Maxie',
    trainer: 'Maxie',
    pokemon: 'Groudon',
    rarity: 'Rare',
    supportType: 'Defense',
    baseStats: { HP: 4, Attack: 3, Defense: 6, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 10 },
    initialFriendship: 15,
    appearanceRate: 0.35,
    typeMatchPreference: 0.00,
    specialEffect: null,
    moveHints: ['Earthquake', 'PrecipiceBlades', 'FirePunch', 'BulkUp', 'LavaPlume'],
    description: 'The Magma Leader harnesses earth power'
  },
  ArchieKyogre: {
    name: 'Archie',
    trainer: 'Archie',
    pokemon: 'Kyogre',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 10, Attack: 0, Defense: 2, Instinct: 1, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 3, maxFriendshipTypeMatch: 8 },
    initialFriendship: 50,
    appearanceRate: 0.48,
    typeMatchPreference: 0.23,
    specialEffect: { maxEnergyBonus: 8 },
    moveHints: ['OriginPulse', 'HydroPump', 'IceBeam', 'Thunder', 'AquaRing'],
    description: 'The Aqua Leader commands the seas'
  },

  // ============================================================================
  // UNCOMMON TIER
  // ============================================================================
  MistyStarmie: {
    name: 'Misty',
    trainer: 'Misty',
    pokemon: 'Starmie',
    rarity: 'Uncommon',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 0, Defense: 2, Instinct: 5, Speed: 2 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 7 },
    initialFriendship: 40,
    appearanceRate: 0.52,
    typeMatchPreference: 0.23,
    specialEffect: { statGainMultiplier: 1.08, energyCostReduction: 3 },
    moveHints: ['HydroPump', 'Psychic', 'RapidSpin', 'IceBeam', 'Recover'],
    description: 'The Cerulean Gym Leader improves training efficiency'
  },
  BrockOnix: {
    name: 'Brock',
    trainer: 'Brock',
    pokemon: 'Onix',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 3, Attack: 0, Defense: 6, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 3, otherStats: 3, maxFriendshipTypeMatch: 6 },
    initialFriendship: 50,
    appearanceRate: 0.58,
    typeMatchPreference: 0.00,
    specialEffect: null,
    moveHints: ['RockSlide', 'IronTail', 'StealthRock', 'Sandstorm', 'Earthquake'],
    description: 'The Pewter Gym Leader hardens defenses'
  },
  ErikaTangela: {
    name: 'Erika',
    trainer: 'Erika',
    pokemon: 'Tangela',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 6, Attack: 0, Defense: 2, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 8 },
    initialFriendship: 45,
    appearanceRate: 0.45,
    typeMatchPreference: 0.30,
    specialEffect: { maxEnergyBonus: 8, restBonus: 6 },
    moveHints: ['GigaDrain', 'SleepPowder', 'Synthesis', 'PowerWhip', 'LeafBlade'],
    description: 'The Celadon Gym Leader nurtures vitality'
  },
  BlaineMagmar: {
    name: 'Blaine',
    trainer: 'Blaine',
    pokemon: 'Magmar',
    rarity: 'Uncommon',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 8, Defense: 0, Instinct: 2, Speed: 0 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 11 },
    initialFriendship: 10,
    appearanceRate: 0.32,
    typeMatchPreference: 0.00,
    specialEffect: null,
    moveHints: ['FireBlast', 'Flamethrower', 'FirePunch', 'LavaPlume', 'ThunderPunch'],
    description: 'The Cinnabar Gym Leader ignites fiery passion'
  },
  KogaWeezing: {
    name: 'Koga',
    trainer: 'Koga',
    pokemon: 'Weezing',
    rarity: 'Uncommon',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 0, Defense: 3, Instinct: 5, Speed: 1 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 10 },
    initialFriendship: 5,
    appearanceRate: 0.32,
    typeMatchPreference: 0.33,
    specialEffect: { statGainMultiplier: 1.10, failRateReduction: 0.10 },
    moveHints: ['SludgeBomb', 'Toxic', 'WillOWisp', 'Explosion', 'ShadowBall'],
    description: 'The Fuchsia Gym Leader masters poison tactics'
  },
  JasminSteelix: {
    name: 'Jasmine',
    trainer: 'Jasmine',
    pokemon: 'Steelix',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 3, Attack: 0, Defense: 6, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 9 },
    initialFriendship: 35,
    appearanceRate: 0.45,
    typeMatchPreference: 0.33,
    specialEffect: null,
    moveHints: ['IronTail', 'Earthquake', 'Screech', 'IronDefense', 'StoneEdge'],
    description: 'The Olivine Gym Leader provides iron defense'
  },
  WinonaSkarmory: {
    name: 'Winona',
    trainer: 'Winona',
    pokemon: 'Skarmory',
    rarity: 'Uncommon',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 1, Defense: 3, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 7 },
    initialFriendship: 30,
    appearanceRate: 0.50,
    typeMatchPreference: 0.23,
    specialEffect: null,
    moveHints: ['SteelWing', 'BraveBird', 'Spikes', 'Roost', 'AirSlash'],
    description: 'The Fortree Gym Leader soars with grace'
  },
  ElitesFourKaren: {
    name: 'Karen',
    trainer: 'Karen',
    pokemon: 'Umbreon',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 2, Attack: 0, Defense: 5, Instinct: 3, Speed: 0 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 0,
    appearanceRate: 0.28,
    typeMatchPreference: 0.12,
    specialEffect: null,
    moveHints: ['FoulPlay', 'Moonlight', 'Toxic', 'Curse', 'DarkPulse'],
    description: 'The Elite Four member embraces darkness'
  },
  AgathaGengar: {
    name: 'Agatha',
    trainer: 'Agatha',
    pokemon: 'Gengar',
    rarity: 'Uncommon',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 2, Defense: 0, Instinct: 6, Speed: 1 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 9 },
    initialFriendship: 15,
    appearanceRate: 0.38,
    typeMatchPreference: 0.42,
    specialEffect: null,
    moveHints: ['ShadowBall', 'SludgeWave', 'DestinyBond', 'Hypnosis', 'DreamEater'],
    description: 'The Elite Four member masters ghosts'
  },

  // ============================================================================
  // COMMON TIER
  // ============================================================================
  WhitneyMiltank: {
    name: 'Whitney',
    trainer: 'Whitney',
    pokemon: 'Miltank',
    rarity: 'Common',
    supportType: 'HP',
    baseStats: { HP: 5, Attack: 0, Defense: 1, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 2, otherStats: 2, maxFriendshipTypeMatch: 5 },
    initialFriendship: 55,
    appearanceRate: 0.65,
    typeMatchPreference: 0.12,
    specialEffect: null,
    moveHints: ['Rollout', 'BodySlam', 'MilkDrink', 'Attract', 'Stomp'],
    description: 'The Goldenrod Gym Leader boosts endurance'
  },
  ChuckPoliwrath: {
    name: 'Chuck',
    trainer: 'Chuck',
    pokemon: 'Poliwrath',
    rarity: 'Common',
    supportType: 'Attack',
    baseStats: { HP: 1, Attack: 6, Defense: 0, Instinct: 0, Speed: 1 },
    trainingBonus: { typeMatch: 5, otherStats: 1, maxFriendshipTypeMatch: 9 },
    initialFriendship: 0,
    appearanceRate: 0.30,
    typeMatchPreference: 0.33,
    specialEffect: null,
    moveHints: ['DynamicPunch', 'Waterfall', 'Submission', 'BulkUp', 'IcePunch'],
    description: 'The Cianwood Gym Leader builds strength'
  },
  PryceDelibird: {
    name: 'Pryce',
    trainer: 'Pryce',
    pokemon: 'Delibird',
    rarity: 'Common',
    supportType: 'HP',
    baseStats: { HP: 3, Attack: 0, Defense: 1, Instinct: 1, Speed: 0 },
    trainingBonus: { typeMatch: 3, otherStats: 2, maxFriendshipTypeMatch: 6 },
    initialFriendship: 40,
    appearanceRate: 0.60,
    typeMatchPreference: 0.12,
    specialEffect: { maxEnergyBonus: 10, restBonus: 6 },
    moveHints: ['Present', 'IceBeam', 'IcePunch', 'Blizzard', 'AerialAce'],
    description: 'The Mahogany Gym Leader aids recovery'
  },
  WattsonMagneton: {
    name: 'Wattson',
    trainer: 'Wattson',
    pokemon: 'Magneton',
    rarity: 'Common',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 0, Defense: 2, Instinct: 5, Speed: 1 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 7 },
    initialFriendship: 35,
    appearanceRate: 0.52,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['Thunderbolt', 'ThunderWave', 'FlashCannon', 'VoltSwitch', 'MagnetRise'],
    description: 'The Mauville Gym Leader electrifies training'
  },
  FlanneryCamerupt: {
    name: 'Flannery',
    trainer: 'Flannery',
    pokemon: 'Camerupt',
    rarity: 'Common',
    supportType: 'Attack',
    baseStats: { HP: 1, Attack: 5, Defense: 1, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 9 },
    initialFriendship: 10,
    appearanceRate: 0.35,
    typeMatchPreference: 0.42,
    specialEffect: { statGainMultiplier: 1.08, failRateReduction: 0.06 },
    moveHints: ['Eruption', 'EarthPower', 'LavaPlume', 'Earthquake', 'Flamethrower'],
    description: 'The Lavaridge Gym Leader unleashes volcanic fury'
  }
};


// ============================================================================
// GACHA POOLS
// ============================================================================

// Support Card Gacha Rarity
const SUPPORT_GACHA_RARITY = {
  Common: {
    rate: 0.50,
    supports: ['WhitneyMiltank', 'ChuckPoliwrath', 'PryceDelibird', 'WattsonMagneton', 'FlanneryCamerupt']
  },
  Uncommon: {
    rate: 0.35,
    supports: ['MistyStarmie', 'BrockOnix', 'ErikaTangela', 'BlaineMagmar', 'KogaWeezing', 
               'JasminSteelix', 'WinonaSkarmory', 'ElitesFourKaren', 'AgathaGengar']
  },
  Rare: {
    rate: 0.13,
    supports: ['LanceDragonite', 'SabrinaAlakazam', 'MortyGengar', 'WallaceMillotic', 
               'CynthiaLucario', 'IrisHaxorus', 'BluePidgeot', 'GiovanniPersian', 
               'MaxieGroudon', 'ArchieKyogre']
  },
  Legendary: {
    rate: 0.02,
    supports: ['CynthiaGarchomp', 'RedCharizard', 'StevenMetagross', 'NReshiram', 
               'ProfessorOakMew', 'DianthaDiancie']
  }
};

// Pokemon Gacha Rarity Table
const GACHA_RARITY = {
    Common: {
        rate: 0.60, // 60%
        pokemon: [
            'Rattata', 'Meowth', 'Sandshrew', 'Psyduck', 'Poliwag',
            'Tentacool', 'Shellder', 'Krabby', 'Oddish', 'Bellsprout',
            'Paras', 'Zubat', 'Grimer', 'Koffing', 'Voltorb',
            'Magnemite', 'Sentret', 'Zigzagoon', 'Bidoof', 'Lillipup',
            'Hoppip', 'Sunkern', 'Spinarak', 'Patrat', 'Purrloin',
            'Roggenrola', 'Tympole', 'Venipede', 'Dwebble', 'Binacle'
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
            'Magmar', 'Electabuzz', 'Clefairy', 'Jigglypuff',
            'Phanpy', 'Spheal', 'Spoink', 'Deerling', 'Tangela',
            'Lapras', 'Bunnelby', 'Yungoos', 'Wooloo', 'Skwovet',
            'Sneasel', 'Murkrow', 'Yanma', 'Buneary', 'Glameow',
            'Stunky', 'Croagunk', 'Sandile', 'Scraggy', 'Gothita',
            'Litleo', 'Skiddo', 'Pancham', 'Honedge', 'Inkay',
            'Skrelp', 'Helioptile', 'Tyrunt', 'Amaura', 'Goomy', 'Noibat',
            'Dratini'
        ]
    },
    Legendary: {
        rate: 0.01, // 1%
        pokemon: [
            'Moltres', 'Articuno', 'Zapdos', 'Raikou', 'Entei',
            'Suicune', 'Celebi', 'Lugia'
        ]
    }
};


// ============================================================================
// RANDOM EVENTS
// ============================================================================

const RANDOM_EVENTS = {
  // Stat increase events (10)
  wildEncounter: {
    type: 'stat_increase',
    name: 'Wild Pokemon Spar',
    description: 'A friendly wild Pokemon wants to battle for fun!',
    effect: { HP: 4, Attack: 2, Defense: 2, Instinct: 2, Speed: 2 }
  },
  trainingDummies: {
    type: 'stat_increase',
    name: 'Training Dummies',
    description: 'You find a set of battle training dummies at the Pokemon Center!',
    effect: { HP: 6, Attack: 4, Defense: 3, Instinct: 3, Speed: 2 }
  },
  climbingRocks: {
    type: 'stat_increase',
    name: 'Rock Climb Practice',
    description: 'Practicing Rock Climb on Mt. Moon has toughened you up!',
    effect: { HP: 8, Defense: 4, Speed: 3 }
  },
  psychicMeditation: {
    type: 'stat_increase',
    name: 'Psychic Training',
    description: 'A Psychic-type trainer teaches you meditation techniques!',
    effect: { Instinct: 6, Defense: 2, Speed: 2 }
  },
  cyclingRoad: {
    type: 'stat_increase',
    name: 'Cycling Road Sprint',
    description: 'Racing down Cycling Road has boosted your speed!',
    effect: { Speed: 8, Instinct: 3, HP: 2 }
  },
  fightingDojo: {
    type: 'stat_increase',
    name: 'Fighting Dojo Session',
    description: 'Training with Fighting-types at the dojo increased your power!',
    effect: { Attack: 6, HP: 4, Defense: 2 }
  },
  doubleTeam: {
    type: 'stat_increase',
    name: 'Double Team Training',
    description: 'Practicing evasion techniques has sharpened your reflexes!',
    effect: { Instinct: 4, Speed: 4, Defense: 2 }
  },
  marathonRun: {
    type: 'stat_increase',
    name: 'Route Marathon',
    description: 'Running the entire length of Route 9 built your endurance!',
    effect: { HP: 9, Speed: 4, Defense: 3 }
  },
  strengthBoulders: {
    type: 'stat_increase',
    name: 'Strength Training',
    description: 'Moving massive boulders with Strength dramatically increased your power!',
    effect: { Attack: 8, Defense: 4, HP: 4 }
  },
  balancedWorkout: {
    type: 'stat_increase',
    name: 'Balanced Training',
    description: 'A well-rounded training session at the gym improved all your stats!',
    effect: { HP: 3, Attack: 2, Defense: 2, Instinct: 2, Speed: 2 }
  },
  
  // Choice events with risk/reward (25)
  mysteriousItem: {
    type: 'choice',
    name: 'Strange Berry',
    description: 'You found a strange berry on the path! Your Pokemon sniffs it curiously.',
    choices: [
      { 
        text: 'Let your Pokemon eat it (RISKY)',
        outcomes: [
          { chance: 0.5, effect: { stats: { HP: 23, Attack: 12, Defense: 12, Instinct: 12, Speed: 12 } }, flavor: 'Jackpot! It was a rare Liechi Berry! Your Pokemon feels incredibly powerful!' },
          { chance: 0.5, effect: { stats: { HP: -8, Attack: -4, Defense: -4 }, energy: -15 }, flavor: 'Ugh! That berry was poisonous! Your Pokemon feels terrible!' }
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
          { chance: 1.0, effect: { stats: { HP: 15, Defense: 10, Attack: 5 } }, flavor: 'The tough terrain provides excellent training for your Pokemon!' }
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
          { chance: 1.0, effect: { stats: { HP: 6, Attack: 4, Defense: 4 } }, flavor: 'They gave you protein supplements! Your Pokemon grows stronger!' }
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
          { chance: 1.0, effect: { stats: { HP: 9, Instinct: 8, Speed: 8 } }, flavor: 'The ancient power flows into your Pokemon, awakening hidden potential!' }
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
          { chance: 0.5, effect: { stats: { Attack: 23, Speed: 18, Instinct: 11 } }, flavor: 'Incredible training! You learn advanced techniques from the veteran!' },
          { chance: 0.5, effect: { stats: { HP: -11, Defense: -6 }, energy: -22 }, flavor: 'The training was too brutal! Your Pokemon is exhausted and hurt!' }
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
          { chance: 1.0, effect: { stats: { Attack: 9, Instinct: 8, Speed: 8 } }, flavor: 'You make it to semifinals! Great battle experience gained!' }
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
          { chance: 0.5, effect: { stats: { HP: 18, Attack: 18, Instinct: 18 }, skillPoints: 19 }, flavor: 'You find a hidden chamber with rare evolutionary stones! Incredible!' },
          { chance: 0.5, effect: { stats: { HP: -11, Defense: -8 }, energy: -19 }, flavor: 'Wild Zubat swarm attacks! You barely escape!' }
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
          { chance: 1.0, effect: { stats: { HP: 9, Speed: 8, Defense: 8 } }, flavor: 'Your Pokemon powers through the current—excellent water training!' }
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
          { chance: 0.5, effect: { stats: { HP: 29, Instinct: 14 }, energy: 28 }, flavor: 'They were premium Oran Berries! Your Pokemon is fully revitalized!' },
          { chance: 0.5, effect: { stats: { HP: -8 }, energy: -19 }, flavor: 'Those were bitter Razz Berries—your Pokemon feels sick!' }
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
          { chance: 1.0, effect: { stats: { Instinct: 11, Speed: 8, Attack: 4 } }, flavor: 'Your Pokemon bonds with wild Gastly! What an amazing experience!' }
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
          { chance: 1.0, effect: { stats: { Attack: 9, Speed: 8, Instinct: 8 } }, flavor: 'You win several matches! Great battle experience!' }
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
          { chance: 1.0, effect: { stats: { HP: 11, Defense: 8 } }, flavor: 'The homemade Poffins provide excellent nutrition!' }
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
          { chance: 1.0, effect: { stats: { Instinct: 11, Attack: 10 } }, flavor: 'The Champion\'s strategies are brilliant! You learn so much!' }
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
          { chance: 1.0, effect: { stats: { HP: 11, Defense: 9, Instinct: 8 } }, flavor: 'Training in the storm tempers your body and mind like steel!' }
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
          { chance: 1.0, effect: { stats: { Instinct: 8, HP: 8 }, skillPoints: 8 }, flavor: 'You find their Pikachu! The grateful parent rewards you!' }
        ]
      },
      {
        text: 'Keep moving',
        outcomes: [
          { chance: 1.0, effect: { energy: 8, stats: { Attack: 6, Speed: 6 } }, flavor: 'You focus on your own journey, making steady progress.' }
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
          { chance: 0.5, effect: { stats: { Attack: 23, Instinct: 18 }, skillPoints: 25 }, flavor: 'You master the secret technique! Devastating new power unlocked!' },
          { chance: 0.5, effect: { stats: { HP: -11, Defense: -8, Attack: -6 } }, flavor: 'The technique backfires horribly, leaving you worse than before!' }
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
          { chance: 1.0, effect: { stats: { HP: 14, Defense: 12 } }, flavor: 'The mineral-rich waters invigorate and strengthen your Pokemon!' }
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
          { chance: 1.0, effect: { stats: { Attack: 11, Defense: 9, Instinct: 10 } }, flavor: 'You hold your own against the elite! Advanced techniques learned!' }
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
          { chance: 0.5, effect: { skillPoints: 31, stats: { HP: 18 } }, flavor: 'You unearth a cache of Rare Candies and TMs! Amazing find!' },
          { chance: 0.5, effect: { stats: { HP: -14, Defense: -8 }, energy: -22 }, flavor: 'It was a Voltorb nest! You escape but worse for wear!' }
        ]
      },
      {
        text: 'Skip the search (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 11, stats: { Defense: 6 } }, flavor: 'You wisely ignore the too-good-to-be-true signal and stay safe.' }
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
          { chance: 1.0, effect: { stats: { Instinct: 14, Defense: 10 }, skillPoints: 12 }, flavor: 'The Professor\'s wisdom opens your mind to new strategies!' }
        ]
      },
      {
        text: 'Pass on it',
        outcomes: [
          { chance: 1.0, effect: { energy: 10, stats: { Speed: 8 } }, flavor: 'You politely decline and continue training at your own pace.' }
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
          { chance: 1.0, effect: { stats: { Speed: 14, Instinct: 10 } }, flavor: 'You keep pace with Rapidash, proving your superior speed!' }
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
          { chance: 0.5, effect: { stats: { HP: 36, Attack: 23, Instinct: 18 } }, flavor: 'The legendary springs grant your Pokemon incredible power!' },
          { chance: 0.5, effect: { stats: { HP: -11, Attack: -9 }, energy: -19 }, flavor: 'The springs were cursed by a Hex! Your Pokemon weakens!' }
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
          { chance: 1.0, effect: { stats: { Speed: 11, Attack: 9, Instinct: 10 } }, flavor: 'You complete the match flawlessly, proving your capabilities!' }
        ]
      },
      {
        text: 'Moderate pace',
        outcomes: [
          { chance: 1.0, effect: { energy: 11, stats: { HP: 8, Defense: 8 } }, flavor: 'Slow and steady wins the race—you train safely.' }
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
          { chance: 1.0, effect: { stats: { Instinct: 9, HP: 10 }, skillPoints: 10 }, flavor: 'The Lucky Egg works! You feel fortune smiling upon you!' }
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
          { chance: 0.5, effect: { stats: { HP: 29, Attack: 23, Defense: 18, Instinct: 18, Speed: 18 } }, flavor: 'Fortune favors the bold! Everything goes perfectly!' },
          { chance: 0.5, effect: { stats: { HP: -15, Attack: -11, Defense: -9 }, energy: -22 }, flavor: 'Your gamble backfires spectacularly—sometimes caution is best!' }
        ]
      },
      {
        text: 'Ignore it (SAFE)',
        outcomes: [
          { chance: 1.0, effect: { energy: 11, stats: { HP: 8, Defense: 6 } }, flavor: 'You choose the safe path, making modest but reliable progress.' }
        ]
      }
    ]
  },
  
  // Battle events (5)
  championChallenge: {
    type: 'battle',
    name: 'Champion Challenge',
    description: 'A powerful wandering Champion challenges you!',
    difficulty: 1.5,
    rewards: { stats: { HP: 18, Attack: 12, Defense: 12, Instinct: 12, Speed: 12 }, skillPoints: 30, energy: -22 }
  },
  eliteWarrior: {
    type: 'battle',
    name: 'Elite Four Member',
    description: 'An Elite Four member is training here and wants to battle!',
    difficulty: 1.6,
    rewards: { stats: { Attack: 22, Defense: 15, Instinct: 15 }, skillPoints: 36, energy: -26 }
  },
  legendaryPokemon: {
    type: 'battle',
    name: 'Legendary Pokemon',
    description: 'A legendary Pokemon appears before you!',
    difficulty: 1.8,
    rewards: { stats: { HP: 22, Attack: 18, Defense: 18, Instinct: 18, Speed: 18 }, skillPoints: 50, energy: -30 }
  },
  rivalAppears: {
    type: 'battle',
    name: 'Rival Battle',
    description: 'Your rival shows up demanding a battle!',
    difficulty: 1.4,
    rewards: { stats: { Attack: 15, Instinct: 15, Speed: 12 }, skillPoints: 24, energy: -19 }
  },
  ancientGuardian: {
    type: 'battle',
    name: 'Ruin Guardian',
    description: 'An ancient guardian Golem awakens to test you!',
    difficulty: 1.7,
    rewards: { stats: { HP: 27, Defense: 22, Instinct: 18 }, skillPoints: 40, energy: -28 }
  },
  
  // Negative events (10)
  injury: {
    type: 'negative',
    name: 'Training Injury',
    description: 'You pushed too hard and your Pokemon got injured!',
    effect: { stats: { HP: -6, Attack: -3, Defense: -3 }, energy: -11 }
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
    effect: { stats: { HP: -8, Speed: -4 }, energy: -15 }
  },
  badFood: {
    type: 'negative',
    name: 'Spoiled Berries',
    description: 'You ate spoiled berries and feel terrible.',
    effect: { stats: { HP: -9, Defense: -4 }, energy: -22 }
  },
  accident: {
    type: 'negative',
    name: 'Training Accident',
    description: 'A training accident with your Pokemon has set you back.',
    effect: { stats: { HP: -11, Attack: -6 }, energy: -15 }
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
    effect: { stats: { Attack: -4, Defense: -4 }, skillPoints: -5 }
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
    effect: { stats: { HP: -4, Attack: -2, Defense: -2, Instinct: -2, Speed: -2 } }
  },
  overtraining: {
    type: 'negative',
    name: 'Overtraining',
    description: 'You overtrained your Pokemon and it needs serious rest.',
    effect: { stats: { HP: -8, Speed: -6 }, energy: -26 }
  }
};


// ============================================================================
// HANGOUT EVENTS
// ============================================================================

const HANGOUT_EVENTS = {
  CynthiaGarchomp: {
    name: 'Champion\'s Masterclass',
    description: 'Cynthia invites you to train with her ace Garchomp!',
    flavor: 'Cynthia demonstrates overwhelming power with Garchomp. "True strength comes from understanding your partner," she says with a serene smile.',
    effect: { stats: { Attack: 15, Instinct: 10 }, moveHint: 'DragonClaw', energy: 20 }
  },
  RedCharizard: {
    name: 'Silent Training',
    description: 'The legendary Red gestures for you to join his training.',
    flavor: 'Red says nothing, but his Charizard\'s fierce determination speaks volumes. You feel inspired by his quiet intensity.',
    effect: { stats: { Attack: 16, Instinct: 12 }, moveHint: 'FlareBlitz', skillPoints: 15 }
  },
  StevenMetagross: {
    name: 'Stone Analysis Session',
    description: 'Steven shares his geological expertise and defensive tactics.',
    flavor: 'Steven examines rare stones while Metagross demonstrates impenetrable defense. "Patience and precision win battles," he explains.',
    effect: { stats: { Defense: 17, Instinct: 10 }, moveHint: 'IronHead', energy: 18 }
  },
  LanceDragonite: {
    name: 'Dragon Tamer\'s Wisdom',
    description: 'Lance shares secrets of dragon-type mastery.',
    flavor: 'Lance\'s Dragonite soars majestically overhead. "Dragons respond to those with true conviction," he declares.',
    effect: { stats: { Attack: 12, Instinct: 14 }, moveHint: 'DragonClaw', skillPoints: 12 }
  },
  MistyStarmie: {
    name: 'Water Ballet Practice',
    description: 'Misty teaches elegant water-type techniques.',
    flavor: 'Misty and Starmie perform graceful aquatic maneuvers. "Water flows effortlessly\u2014your training should too!" she chirps.',
    effect: { stats: { Instinct: 11, Speed: 8 }, moveHint: 'Surf', energy: 15 }
  },
  BrockOnix: {
    name: 'Rock Solid Defense',
    description: 'Brock demonstrates endurance training with Onix.',
    flavor: 'Brock\'s Onix stands unmovable like a mountain. "Defense isn\'t just blocking\u2014it\'s outlasting!" he teaches firmly.',
    effect: { stats: { HP: 12, Defense: 14 }, moveHint: 'RockSlide', energy: 16 }
  },
  ErikaTangela: {
    name: 'Garden Meditation',
    description: 'Erika invites you to her peaceful garden training.',
    flavor: 'Surrounded by blooming flowers and Tangela\'s vines, Erika teaches harmony with nature. "Growth requires patience," she whispers.',
    effect: { stats: { HP: 14, Defense: 10 }, energy: 20 }
  },
  SabrinaAlakazam: {
    name: 'Psychic Awakening',
    description: 'Sabrina helps unlock your Pokemon\'s mental potential.',
    flavor: 'Alakazam\'s spoons bend as psychic energy fills the room. "The mind is the strongest muscle," Sabrina says cryptically.',
    effect: { stats: { Instinct: 16, Speed: 9 }, moveHint: 'Psychic', skillPoints: 13 }
  },
  BlaineMagmar: {
    name: 'Volcanic Training',
    description: 'Blaine\'s fiery enthusiasm ignites your passion!',
    flavor: 'Magmar\'s flames roar as Blaine cackles. "Hot-headed? Maybe! But that heat forges champions!" he bellows.',
    effect: { stats: { Attack: 13, Instinct: 9 }, moveHint: 'Flamethrower', energy: 14 }
  },
  KogaWeezing: {
    name: 'Ninja Techniques',
    description: 'Koga teaches tactical maneuvering and precision.',
    flavor: 'Weezing creates concealing smoke as Koga moves with ninja precision. "Strike from the shadows," he whispers.',
    effect: { stats: { Instinct: 11, Speed: 10 }, moveHint: 'SludgeBomb', energy: 13 }
  },
  WhitneyMiltank: {
    name: 'Endurance Run',
    description: 'Whitney challenges you to a stamina-building session!',
    flavor: 'Miltank\'s Rollout never stops! Whitney giggles, "Stamina wins the long game\u2014just keep going!"',
    effect: { stats: { HP: 10, Defense: 8 }, energy: 16 }
  },
  MortyGengar: {
    name: 'Spirit Connection',
    description: 'Morty communes with ghost-type energies.',
    flavor: 'Gengar phases through walls as Morty meditates. "The bond between worlds strengthens the spirit," he murmurs.',
    effect: { stats: { Instinct: 12, Speed: 9 }, moveHint: 'ShadowBall', skillPoints: 11 }
  },
  ChuckPoliwrath: {
    name: 'Waterfall Training',
    description: 'Chuck\'s intense martial arts under a waterfall!',
    flavor: 'Poliwrath punches through cascading water. Chuck roars, "Strength and discipline\u2014that\'s the warrior\'s way!"',
    effect: { stats: { HP: 9, Attack: 11 }, moveHint: 'DynamicPunch', energy: 14 }
  },
  JasminSteelix: {
    name: 'Steel Resolve',
    description: 'Jasmine demonstrates unwavering defensive tactics.',
    flavor: 'Steelix\'s metallic body gleams. Jasmine speaks softly, "True strength means protecting what matters most."',
    effect: { stats: { HP: 10, Defense: 12 }, moveHint: 'IronTail', energy: 15 }
  },
  PryceDelibird: {
    name: 'Gift of Rest',
    description: 'Pryce shares wisdom on recovery and preparation.',
    flavor: 'Delibird delivers treats as Pryce smiles warmly. "Rest is not weakness\u2014it\'s strategic preparation," he advises.',
    effect: { stats: { HP: 8 }, energy: 25 }
  },
  WallaceMillotic: {
    name: 'Elegant Performance',
    description: 'Wallace showcases the art of beauty and strength.',
    flavor: 'Milotic glides gracefully through water. Wallace beams, "True champions combine elegance with power!"',
    effect: { stats: { HP: 11, Defense: 12 }, moveHint: 'HydroPump', energy: 17 }
  },
  WinonaSkarmory: {
    name: 'Aerial Maneuvers',
    description: 'Winona teaches swift flying techniques.',
    flavor: 'Skarmory cuts through the air with razor precision. Winona calls out, "Speed and grace dominate the skies!"',
    effect: { stats: { Defense: 10, Speed: 12 }, moveHint: 'SteelWing', energy: 14 }
  },
  WattsonMagneton: {
    name: 'Electric Circuit Training',
    description: 'Wattson\'s shocking workout charges you up!',
    flavor: 'Magneton crackles with electricity as Wattson laughs heartily. "Wahahaha! Feel the voltage!" he exclaims.',
    effect: { stats: { Instinct: 10, Speed: 8 }, moveHint: 'Thunderbolt', energy: 13 }
  },
  FlanneryCamerupt: {
    name: 'Explosive Power',
    description: 'Flannery demonstrates volcanic offensive tactics.',
    flavor: 'Camerupt erupts with magma as Flannery pumps her fist. "Burn bright and strike hard!" she shouts enthusiastically.',
    effect: { stats: { HP: 9, Attack: 11 }, moveHint: 'Earthquake', energy: 14 }
  },
  CynthiaLucario: {
    name: 'Aura Training',
    description: 'Cynthia helps awaken your Pokemon\'s inner aura.',
    flavor: 'Lucario\'s aura glows brilliantly. Cynthia explains, "True mastery comes from sensing your opponent\'s spirit."',
    effect: { stats: { Attack: 12, Instinct: 10 }, moveHint: 'AuraSphere', skillPoints: 14 }
  },
  NReshiram: {
    name: 'Truth\'s Flame',
    description: 'N shares ideals with Reshiram\'s legendary power.',
    flavor: 'Reshiram\'s flames burn with truth itself. N speaks passionately, "Only through honesty can Pokemon and trainer unite!"',
    effect: { stats: { Attack: 14, Instinct: 12 }, moveHint: 'BlueFlare', skillPoints: 16 }
  },
  IrisHaxorus: {
    name: 'Dragon Dance',
    description: 'Iris teaches fierce dragon-type combat techniques.',
    flavor: 'Haxorus roars powerfully as Iris cheers. "Dragons never back down\u2014show your fighting spirit!" she yells excitedly.',
    effect: { stats: { Attack: 14, Speed: 11 }, moveHint: 'DragonClaw', energy: 16 }
  },
  ElitesFourKaren: {
    name: 'Dark Arts Mastery',
    description: 'Karen reveals the strength of dark-type strategy.',
    flavor: 'Umbreon\'s rings glow in the darkness. Karen smirks, "Winning isn\'t about type\u2014it\'s about strategy and bond."',
    effect: { stats: { Defense: 11, Instinct: 10 }, moveHint: 'DarkPulse', skillPoints: 12 }
  },
  AgathaGengar: {
    name: 'Spectral Training',
    description: 'Agatha teaches ancient ghost-type techniques.',
    flavor: 'Gengar\'s eerie laugh echoes as Agatha cackles. "Fear is a weapon\u2014use it wisely!" she says ominously.',
    effect: { stats: { Instinct: 12, Speed: 9 }, moveHint: 'ShadowBall', energy: 13 }
  },
  BluePidgeot: {
    name: 'Rival\'s Challenge',
    description: 'Blue pushes you to exceed your limits.',
    flavor: 'Pidgeot soars majestically. Blue smirks, "Smell ya later\u2014unless you can actually keep up!" he taunts.',
    effect: { stats: { Attack: 11, Speed: 12 }, moveHint: 'AerialAce', skillPoints: 13 }
  },
  GiovanniPersian: {
    name: 'Ruthless Tactics',
    description: 'Giovanni demonstrates calculated dominance.',
    flavor: 'Persian prowls with predatory grace. Giovanni states coldly, "Power respects only power. Show no mercy."',
    effect: { stats: { Attack: 13, Instinct: 10 }, moveHint: 'PayDay', skillPoints: 14 }
  },
  ProfessorOakMew: {
    name: 'Legendary Research',
    description: 'Professor Oak shares knowledge with Mew\'s assistance.',
    flavor: 'Mew playfully teleports around as Oak beams. "The bond between Pokemon and trainer transcends science!" he declares.',
    effect: { stats: { Instinct: 14, Speed: 10 }, skillPoints: 18, energy: 20 }
  },
  DianthaDiancie: {
    name: 'Dazzling Showcase',
    description: 'Diantha performs with Diancie\'s brilliance.',
    flavor: 'Diancie\'s diamonds sparkle radiantly. Diantha smiles, "A champion shines brightest under pressure\u2014be dazzling!"',
    effect: { stats: { HP: 12, Defense: 15 }, moveHint: 'DiamondStorm', energy: 18 }
  },
  MaxieGroudon: {
    name: 'Land Expansion',
    description: 'Maxie demonstrates earth-shaking power.',
    flavor: 'Groudon\'s presence makes the ground tremble. Maxie declares, "The land itself will bow to our strength!"',
    effect: { stats: { HP: 11, Attack: 13 }, moveHint: 'Earthquake', energy: 16 }
  },
  ArchieKyogre: {
    name: 'Ocean\'s Depth',
    description: 'Archie channels the power of the seas.',
    flavor: 'Kyogre summons massive waves. Archie roars, "The ocean\'s fury is unstoppable\u2014embrace its power!"',
    effect: { stats: { HP: 13, Defense: 11 }, moveHint: 'HydroPump', energy: 17 }
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
  HANGOUT_EVENTS
};
