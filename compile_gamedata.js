const fs = require('fs');
const path = require('path');

// Read original App.jsx sections
const appJsxPath = path.join(__dirname, '..', '..', 'pokesume frontend', 'pokesume-frontend', 'src', 'App.jsx');
const appJsxContent = fs.readFileSync(appJsxPath, 'utf8');
const lines = appJsxContent.split('\n');

// Extract specific line ranges
const pokemonData = lines.slice(1529, 2916).join('\n'); // POKEMON database
const legendaryData = lines.slice(2920, 3092).join('\n'); // LEGENDARY_POKEMON
const supportData = lines.slice(3096, 3462).join('\n'); // SUPPORT_CARDS
const gachaData = lines.slice(3528, 3596).join('\n'); // GACHA pools
const eventsData = lines.slice(3599, 4246).join('\n'); // RANDOM_EVENTS
const hangoutData = lines.slice(4248, 4430).join('\n'); // HANGOUT_EVENTS

// Create the complete shared module
const gameDataModule = `/**
 * POKEMON CAREER GAME - SHARED GAME DATA
 * Complete game data definitions used by both frontend and backend
 * Extracted from App.jsx to ensure consistency across client and server
 */

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const ICONS = {
  SLEEPING: '\\u{1F4A4}',
  CHECKMARK: '\\u2713',
  CHECK: '\\u2713',
  ARROW_RIGHT: '\\u2192',
  ARROW_DOUBLE: '\\u21D2',
  MULTIPLY: '\\u00D7',
  BULLET: '\\u2022',
  WARNING: '\\u26A0\\uFE0F',
  CLOSE: '\\u00D7'
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
  PayDay: { type: 'Normal', damage: 15, warmup: 0, cooldown: 2, stamina: 25, cost: 35, effect: null }
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

${pokemonData}

// ============================================================================
// LEGENDARY POKEMON
// ============================================================================

${legendaryData}

// ============================================================================
// SUPPORT CARDS
// ============================================================================

${supportData}

// ============================================================================
// GACHA POOLS
// ============================================================================

${gachaData}

// ============================================================================
// RANDOM EVENTS
// ============================================================================

${eventsData}

// ============================================================================
// HANGOUT EVENTS
// ============================================================================

${hangoutData}

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
  SUPPORT_CARDS,
  SUPPORT_GACHA_RARITY,
  GACHA_RARITY,
  RANDOM_EVENTS,
  HANGOUT_EVENTS
};
`;

// Write the compiled module
fs.writeFileSync(path.join(__dirname, 'shared', 'gameData.js'), gameDataModule);

console.log('✅ Game data module created successfully!');
console.log(`📊 Module size: ${(gameDataModule.length / 1024).toFixed(2)} KB`);
console.log(`📁 Location: shared/gameData.js`);
