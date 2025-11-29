/**
 * POKEMON CAREER BATTLE SIMULATOR
 * Extracted from App.jsx to be used server-side
 * This implements the EXACT battle logic from the client
 */

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const GAME_CONFIG = {
  BATTLE: {
    TICK_DURATION_MS: 1000,
    BASE_REST_STAMINA_GAIN: 1,
    SPEED_STAMINA_DENOMINATOR: 15,
    MAX_STAMINA: 100,
    BASE_DODGE_CHANCE: 0.01,
    INSTINCT_DODGE_DENOMINATOR: 2400,
    BASE_CRIT_CHANCE: 0.05,
    INSTINCT_CRIT_DENOMINATOR: 800
  },
  APTITUDE: {
    // Damage multipliers (higher grade = more damage)
    MULTIPLIERS: {
      'F': 0.6, 'F+': 0.65,
      'E': 0.7, 'E+': 0.75,
      'D': 0.8, 'D+': 0.85,
      'C': 0.9, 'C+': 0.95,
      'B': 1.0, 'B+': 1.05,
      'A': 1.1, 'A+': 1.15,
      'S': 1.2, 'S+': 1.225,
      'UU': 1.25, 'UU+': 1.3
    },
    // Stamina cost multipliers (higher grade = LOWER stamina cost)
    STAMINA_COST: {
      'F': 1.3, 'F+': 1.25,
      'E': 1.2, 'E+': 1.15,
      'D': 1.1, 'D+': 1.05,
      'C': 1.0, 'C+': 0.97,
      'B': 0.95, 'B+': 0.92,
      'A': 0.88, 'A+': 0.85,
      'S': 0.8, 'S+': 0.77,
      'UU': 0.75, 'UU+': 0.7
    }
  },
  // Valid strategies (move selection behavior only, no modifiers)
  VALID_STRATEGIES: ['Scaler', 'Nuker', 'Debuffer', 'Chipper', 'MadLad'],
  TYPE_MATCHUPS: {
    Red: { strong: 'Grass', weak: 'Water' },
    Blue: { strong: 'Fire', weak: 'Grass' },
    Green: { strong: 'Water', weak: 'Fire' },
    Yellow: { strong: 'Water', weak: 'Grass' }, // Electric is strong vs Water, weak vs Grass (Ground not in game)
    Purple: { strong: 'Fighting', weak: 'Psychic' },
    Orange: { strong: 'Electric', weak: 'Psychic' }
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
  SludgeBomb: { type: 'Grass', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'poison', chance: 0.4, duration: 4, damage: 4 } },
  IronTail: { type: 'Normal', damage: 32, warmup: 3, cooldown: 4, stamina: 50, cost: 62, effect: { type: 'stun', chance: 0.25, duration: 2 } },
  SteelWing: { type: 'Normal', damage: 24, warmup: 1, cooldown: 3, stamina: 35, cost: 45, effect: null },
  AerialAce: { type: 'Normal', damage: 20, warmup: 0, cooldown: 2, stamina: 28, cost: 38, effect: null },
  DarkPulse: { type: 'Psychic', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: { type: 'confuse', chance: 0.3, duration: 3 } },
  BlueFlare: { type: 'Fire', damage: 40, warmup: 6, cooldown: 7, stamina: 88, cost: 88, effect: { type: 'burn', chance: 0.5, duration: 5, damage: 6 } },
  DiamondStorm: { type: 'Fighting', damage: 33, warmup: 4, cooldown: 5, stamina: 55, cost: 68, effect: null },
  PayDay: { type: 'Normal', damage: 15, warmup: 0, cooldown: 2, stamina: 25, cost: 35, effect: null },
  // Weather moves
  Sandstorm: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_sand', duration: 5 } },
  // Additional moves from support card hints
  AirSlash: { type: 'Normal', damage: 25, warmup: 2, cooldown: 3, stamina: 40, cost: 50, effect: { type: 'confuse', chance: 0.3, duration: 2 } },
  AncientPower: { type: 'Normal', damage: 20, warmup: 2, cooldown: 3, stamina: 35, cost: 45, effect: { type: 'buff_all', chance: 0.1 } },
  AquaRing: { type: 'Water', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'regen', duration: 5, healPercent: 0.02 } },
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
  Screech: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'debuff_defense', duration: 3 } },
  Slash: { type: 'Normal', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 48, effect: { type: 'high_crit' } },
  SleepPowder: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'sleep', chance: 0.75, duration: 3 } },
  SludgeWave: { type: 'Grass', damage: 31, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'poison', chance: 0.3, duration: 4, damage: 4 } },
  Spikes: { type: 'Normal', damage: 0, warmup: 2, cooldown: 6, stamina: 30, cost: 40, effect: { type: 'entry_hazard', layers: 3 } },
  StealthRock: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 30, cost: 40, effect: { type: 'entry_hazard_rock' } },
  SwordsDance: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 4, stamina: 30, cost: 40, effect: { type: 'buff_attack', duration: 4 } },
  Synthesis: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 45, effect: { type: 'heal_self', healPercent: 0.5 } },
  ThunderWave: { type: 'Electric', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'paralyze', chance: 0.9, duration: 5 } },
  Toxic: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'badly_poison', duration: 6 } },
  Transform: { type: 'Normal', damage: 0, warmup: 3, cooldown: 10, stamina: 40, cost: 50, effect: { type: 'copy_opponent' } },
  UTurn: { type: 'Normal', damage: 21, warmup: 1, cooldown: 3, stamina: 32, cost: 42, effect: { type: 'switch_out' } },
  Waterfall: { type: 'Water', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 52, effect: { type: 'stun', chance: 0.2, duration: 1 } },
  WillOWisp: { type: 'Fire', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 40, effect: { type: 'burn', chance: 0.85, duration: 5, damage: 4 } },

  // === CHIPPER MOVES (Low stamina, low cooldown for each type) ===
  FlameCharge: { type: 'Fire', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: { type: 'buff_speed', chance: 1.0, duration: 3 } },
  Incinerate: { type: 'Fire', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: null },
  AquaJet: { type: 'Water', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: null },
  BubbleBeam: { type: 'Water', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'debuff_speed', chance: 0.1, duration: 2 } },
  BulletSeed: { type: 'Grass', damage: 15, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: null },
  MegaDrain: { type: 'Grass', damage: 14, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'drain', chance: 0.3, healPercent: 0.25 } },
  Spark: { type: 'Electric', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'paralyze', chance: 0.15, duration: 2 } },
  ChargeBeam: { type: 'Electric', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: { type: 'buff_instinct', chance: 0.7, duration: 2 } },
  Confusion: { type: 'Psychic', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: { type: 'confuse', chance: 0.1, duration: 2 } },
  HeartStamp: { type: 'Psychic', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'stun', chance: 0.15, duration: 1 } },
  MachPunch: { type: 'Fighting', damage: 14, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: null },
  ForcePalm: { type: 'Fighting', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: { type: 'paralyze', chance: 0.2, duration: 2 } },
  Bite: { type: 'Normal', damage: 15, warmup: 0, cooldown: 2, stamina: 18, cost: 28, effect: { type: 'stun', chance: 0.15, duration: 1 } },
  Swift: { type: 'Normal', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 30, effect: null },

  // === BUFF MOVES (For Scaler strategy) ===
  Agility: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'buff_speed', duration: 4 } },
  Harden: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 20, cost: 30, effect: { type: 'buff_defense', duration: 4 } },
  Meditate: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 35, effect: { type: 'buff_attack', duration: 4 } },
  Sharpen: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 20, cost: 30, effect: { type: 'buff_attack', duration: 3 } },
  WorkUp: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 22, cost: 32, effect: { type: 'buff_attack', duration: 3 } },
  CosmicPower: { type: 'Psychic', damage: 0, warmup: 2, cooldown: 4, stamina: 28, cost: 38, effect: { type: 'buff_defense', duration: 4 } },
  Barrier: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 22, cost: 32, effect: { type: 'buff_defense', duration: 4 } },
  Amnesia: { type: 'Psychic', damage: 0, warmup: 2, cooldown: 4, stamina: 28, cost: 38, effect: { type: 'buff_instinct', duration: 4 } },

  // === DEBUFF MOVES (For Debuffer strategy) ===
  Growl: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_attack', duration: 3 } },
  Leer: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_defense', duration: 3 } },
  TailWhip: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_defense', duration: 3 } },
  SandAttack: { type: 'Fighting', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_accuracy', duration: 3 } },
  Confide: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_instinct', duration: 3 } },
  CharmMove: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 20, cost: 30, effect: { type: 'debuff_attack', duration: 4 } },
  FakeTears: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 20, cost: 30, effect: { type: 'debuff_defense', duration: 4 } },
  ScaryFace: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 20, cost: 30, effect: { type: 'debuff_speed', duration: 4 } },
  StringShot: { type: 'Grass', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_speed', duration: 3 } },
  Smokescreen: { type: 'Fire', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 25, effect: { type: 'debuff_accuracy', duration: 3 } },

  // === WEATHER MOVES ===
  RainDance: { type: 'Water', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_rain', duration: 5 } },
  SunnyDay: { type: 'Fire', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_sun', duration: 5 } },
  Hail: { type: 'Water', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'weather_hail', duration: 5 } },

  // === NEW MID-TIER DAMAGE MOVES ===
  FlameBurst: { type: 'Fire', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 42, effect: null },
  Overheat: { type: 'Fire', damage: 38, warmup: 5, cooldown: 6, stamina: 62, cost: 78, effect: { type: 'debuff_instinct_self', duration: 2 } },
  Scald: { type: 'Water', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 45, effect: { type: 'burn', chance: 0.3, duration: 4, damage: 3 } },
  AquaTail: { type: 'Water', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 55, effect: null },
  Brine: { type: 'Water', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 42, effect: { type: 'double_if_half_hp' } },
  SeedBomb: { type: 'Grass', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 50, effect: null },
  EnergyBall: { type: 'Grass', damage: 30, warmup: 3, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'debuff_defense', chance: 0.1, duration: 2 } },
  WoodHammer: { type: 'Grass', damage: 36, warmup: 4, cooldown: 5, stamina: 55, cost: 70, effect: { type: 'recoil', damagePercent: 0.2 } },
  Discharge: { type: 'Electric', damage: 28, warmup: 2, cooldown: 3, stamina: 42, cost: 50, effect: { type: 'paralyze', chance: 0.25, duration: 3 } },
  ElectroBall: { type: 'Electric', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: null },
  ZapCannon: { type: 'Electric', damage: 36, warmup: 5, cooldown: 6, stamina: 60, cost: 75, effect: { type: 'paralyze', chance: 0.6, duration: 4 } },
  Extrasensory: { type: 'Psychic', damage: 26, warmup: 2, cooldown: 3, stamina: 40, cost: 48, effect: { type: 'stun', chance: 0.15, duration: 1 } },
  PsychoCut: { type: 'Psychic', damage: 24, warmup: 1, cooldown: 3, stamina: 35, cost: 42, effect: { type: 'high_crit' } },
  StoredPower: { type: 'Psychic', damage: 20, warmup: 2, cooldown: 3, stamina: 32, cost: 40, effect: { type: 'buff_boost_damage' } },
  CrossChop: { type: 'Fighting', damage: 32, warmup: 3, cooldown: 4, stamina: 48, cost: 58, effect: { type: 'high_crit' } },
  HammerArm: { type: 'Fighting', damage: 34, warmup: 4, cooldown: 5, stamina: 52, cost: 65, effect: { type: 'debuff_speed_self', duration: 2 } },
  Superpower: { type: 'Fighting', damage: 36, warmup: 4, cooldown: 5, stamina: 55, cost: 70, effect: { type: 'debuff_attack_self', duration: 2 } },
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
  Focus: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 5, stamina: 25, cost: 35, effect: { type: 'buff_crit', duration: 3 } },
  PsychicTerrain: { type: 'Psychic', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'terrain_psychic', duration: 5 } },
  ElectricTerrain: { type: 'Electric', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'terrain_electric', duration: 5 } },
  GrassyTerrain: { type: 'Grass', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 45, effect: { type: 'terrain_grassy', duration: 5 } }
};

// Type to color mapping for aptitude lookups
const TYPE_TO_COLOR = {
  Fire: 'Red',
  Water: 'Blue',
  Grass: 'Green',
  Electric: 'Yellow',
  Psychic: 'Purple',
  Fighting: 'Orange',
  Normal: 'Colorless'
};

// ============================================================================
// BATTLE SIMULATOR
// ============================================================================

/**
 * Simulates a complete battle between two Pokemon
 * Returns the complete battle log with all tick states
 *
 * @param {Object} player1 - Pokemon 1 data { name, primaryType, stats, abilities, typeAptitudes, strategy, strategyGrade }
 * @param {Object} player2 - Pokemon 2 data
 * @returns {Object} { winner: 1|2, battleLog: [...tick states], finalState: {...} }
 */
function simulateBattle(player1, player2) {
  // Initialize battle state
  const battleState = {
    player1: {
      ...player1,
      currentHP: player1.stats.HP,
      currentStamina: GAME_CONFIG.BATTLE.MAX_STAMINA,
      moveStates: {},
      isResting: false,
      statusEffects: []
    },
    player2: {
      ...player2,
      currentHP: player2.stats.HP,
      currentStamina: GAME_CONFIG.BATTLE.MAX_STAMINA,
      moveStates: {},
      isResting: false,
      statusEffects: []
    },
    tick: 0,
    battleLog: [],
    // Weather state - affects both combatants
    weather: {
      type: null,       // 'sand', 'rain', 'sun', 'hail', etc.
      ticksRemaining: 0,
      caster: null      // 1 or 2 - which player started the weather
    }
  };

  // Simulate battle ticks until one Pokemon faints
  const maxTicks = 1000; // Safety limit
  while (battleState.player1.currentHP > 0 &&
         battleState.player2.currentHP > 0 &&
         battleState.tick < maxTicks) {

    battleState.tick++;

    // Save current state to log
    battleState.battleLog.push({
      tick: battleState.tick,
      player1: {
        name: battleState.player1.name,
        currentHp: battleState.player1.currentHP,
        maxHp: battleState.player1.stats.HP,
        energy: battleState.player1.currentStamina,
        statusEffects: [...battleState.player1.statusEffects]
      },
      player2: {
        name: battleState.player2.name,
        currentHp: battleState.player2.currentHP,
        maxHp: battleState.player2.stats.HP,
        energy: battleState.player2.currentStamina,
        statusEffects: [...battleState.player2.statusEffects]
      },
      weather: battleState.weather.type ? { ...battleState.weather } : null,
      message: null
    });

    // Process player 1
    const p1Message = processCombatantTick(battleState.player1, battleState.player2, 'Player 1', battleState);
    if (p1Message) {
      battleState.battleLog[battleState.battleLog.length - 1].message = p1Message;
    }

    // Process player 2 if still alive
    if (battleState.player2.currentHP > 0) {
      const p2Message = processCombatantTick(battleState.player2, battleState.player1, 'Player 2', battleState);
      if (p2Message) {
        const lastLog = battleState.battleLog[battleState.battleLog.length - 1];
        lastLog.message = lastLog.message ? `${lastLog.message} | ${p2Message}` : p2Message;
      }
    }

    // Process weather effects at end of tick
    if (battleState.weather.type && battleState.weather.ticksRemaining > 0) {
      const weatherMessages = processWeatherEffects(battleState);
      if (weatherMessages.length > 0) {
        const lastLog = battleState.battleLog[battleState.battleLog.length - 1];
        lastLog.message = lastLog.message
          ? `${lastLog.message} | ${weatherMessages.join(' | ')}`
          : weatherMessages.join(' | ');
      }
    }
  }

  // Determine winner
  const winner = battleState.player1.currentHP > 0 ? 1 : 2;

  // Add final message
  battleState.battleLog.push({
    tick: battleState.tick + 1,
    player1: {
      name: battleState.player1.name,
      currentHp: battleState.player1.currentHP,
      maxHp: battleState.player1.stats.HP,
      energy: battleState.player1.currentStamina,
      statusEffects: []
    },
    player2: {
      name: battleState.player2.name,
      currentHp: battleState.player2.currentHP,
      maxHp: battleState.player2.stats.HP,
      energy: battleState.player2.currentStamina,
      statusEffects: []
    },
    message: winner === 1
      ? `Victory! ${player1.name} defeated ${player2.name}!`
      : `Victory! ${player2.name} defeated ${player1.name}!`
  });

  return {
    winner,
    battleLog: battleState.battleLog,
    finalState: {
      player1HP: battleState.player1.currentHP,
      player2HP: battleState.player2.currentHP,
      totalTicks: battleState.tick
    }
  };
}

/**
 * Process a single combatant's actions for one tick
 * Modifies combatant and opponent states in place
 * Returns message string for battle log
 */
function processCombatantTick(combatant, opponent, name, battleState) {
  const messages = [];

  // Initialize move states on first tick
  combatant.abilities.forEach(moveName => {
    if (!combatant.moveStates[moveName]) {
      const move = MOVES[moveName];
      if (!move) {
        console.error(`[Battle] Move not found: ${moveName}`);
        return;
      }
      combatant.moveStates[moveName] = {
        warmupRemaining: move.warmup,
        cooldownRemaining: 0,
        everCast: false
      };
    }
  });

  // Check for incapacitating status effects
  const isExhausted = combatant.statusEffects.some(e => e.type === 'exhaust');
  const isStunned = combatant.statusEffects.some(e => e.type === 'stun' && e.ticksRemaining > 0);
  const isFrozen = combatant.statusEffects.some(e => e.type === 'freeze' && e.ticksRemaining > 0);
  const isAsleep = combatant.statusEffects.some(e => e.type === 'sleep' && e.ticksRemaining > 0);
  const isInfatuated = combatant.statusEffects.some(e => e.type === 'infatuate' && e.ticksRemaining > 0);

  // Check if incapacitated this turn
  let incapacitated = false;
  let incapacitatedReason = null;

  if (isStunned) {
    incapacitated = true;
    incapacitatedReason = 'stunned';
  } else if (isFrozen) {
    // 20% chance to thaw out each turn (handled in processStatusEffects, but check here too)
    if (Math.random() >= 0.2) {
      incapacitated = true;
      incapacitatedReason = 'frozen';
    }
  } else if (isAsleep) {
    incapacitated = true;
    incapacitatedReason = 'asleep';
  } else if (isInfatuated) {
    // 50% chance to be immobilized by love
    if (Math.random() < 0.5) {
      incapacitated = true;
      incapacitatedReason = 'infatuated';
    }
  }

  // If incapacitated, skip move selection entirely
  if (incapacitated) {
    const incapMessages = {
      stunned: `${name} flinched and couldn't move!`,
      frozen: `${name} is frozen solid!`,
      asleep: `${name} is fast asleep!`,
      infatuated: `${name} is immobilized by love!`
    };
    messages.push(incapMessages[incapacitatedReason] || `${name} can't move!`);

    // Still decrement move timers
    Object.keys(combatant.moveStates).forEach(moveName => {
      const state = combatant.moveStates[moveName];
      if (state.warmupRemaining > 0) state.warmupRemaining--;
      if (state.cooldownRemaining > 0) state.cooldownRemaining--;
    });

    // Process status effects (damage over time, etc.)
    const effectMessages = processStatusEffects(combatant, name);
    messages.push(...effectMessages);

    return messages.join(' | ');
  }

  // Calculate available moves
  const available = combatant.abilities.filter(moveName => {
    const move = MOVES[moveName];
    if (!move) return false;

    const state = combatant.moveStates[moveName];
    // Use STAMINA_COST multipliers (higher aptitude = lower stamina cost)
    const aptitudeMult = GAME_CONFIG.APTITUDE.STAMINA_COST[combatant.strategyGrade] || 1.0;
    const staminaCost = Math.ceil(move.stamina * aptitudeMult);

    return state.warmupRemaining === 0 &&
           state.cooldownRemaining === 0 &&
           combatant.currentStamina >= staminaCost &&
           !isExhausted;
  });

  // Decide if combatant will cast
  let willCast = false;
  let selectedMove = null;

  if (available.length > 0) {
    const castChance = combatant.currentStamina / GAME_CONFIG.BATTLE.MAX_STAMINA;

    if (Math.random() < castChance) {
      willCast = true;
      selectedMove = selectMove(combatant, opponent, available);
    }
  }

  // Execute move or rest
  if (willCast && selectedMove) {
    const moveMessage = executeMove(combatant, opponent, selectedMove, name, battleState);
    messages.push(moveMessage);
  } else {
    // Rest and recover stamina
    const baseRestGain = GAME_CONFIG.BATTLE.BASE_REST_STAMINA_GAIN;
    const speedBonus = Math.floor(combatant.stats.Speed / GAME_CONFIG.BATTLE.SPEED_STAMINA_DENOMINATOR);
    const restGain = baseRestGain + speedBonus;
    combatant.currentStamina = Math.min(GAME_CONFIG.BATTLE.MAX_STAMINA, combatant.currentStamina + restGain);
    combatant.isResting = true;
    messages.push(`${name} is resting... (+${restGain} stamina)`);
  }

  // Decrement move timers
  Object.keys(combatant.moveStates).forEach(moveName => {
    const state = combatant.moveStates[moveName];
    if (state.warmupRemaining > 0) state.warmupRemaining--;
    if (state.cooldownRemaining > 0) state.cooldownRemaining--;
  });

  // Process status effects
  const effectMessages = processStatusEffects(combatant, name);
  messages.push(...effectMessages);

  return messages.join(' | ');
}

/**
 * Helper to categorize moves by their purpose
 */
function categorizeMove(move) {
  if (!move) return 'unknown';

  // Buff moves (target self with positive effects)
  const buffEffects = ['buff_attack', 'buff_defense', 'buff_speed', 'buff_instinct',
                       'buff_attack_defense', 'buff_attack_speed', 'buff_all', 'heal_self', 'regen'];
  if (move.effect && buffEffects.includes(move.effect.type)) {
    return 'buff';
  }

  // Debuff moves (target opponent with negative effects, no damage)
  const debuffEffects = ['debuff_attack', 'debuff_defense', 'debuff_speed', 'debuff_instinct',
                         'debuff_accuracy', 'burn', 'poison', 'badly_poison', 'paralyze',
                         'freeze', 'sleep', 'confuse', 'curse'];
  if (move.damage === 0 && move.effect && debuffEffects.includes(move.effect.type)) {
    return 'debuff';
  }

  // Weather moves
  if (move.effect && move.effect.type && move.effect.type.startsWith('weather_')) {
    return 'weather';
  }

  // Chipper moves (low stamina, low cooldown damage moves)
  if (move.damage > 0 && move.stamina <= 22 && move.cooldown <= 2) {
    return 'chipper';
  }

  // Nuker moves (high damage moves)
  if (move.damage >= 30) {
    return 'nuker';
  }

  // Default to damage move
  return 'damage';
}

/**
 * Select which move to use based on strategy
 */
function selectMove(combatant, opponent, available) {
  // Calculate predicted damage and categorize each move
  const movesWithData = available.map(moveName => {
    const move = MOVES[moveName];
    const moveType = move.type;
    const moveColor = TYPE_TO_COLOR[moveType];

    // Aptitude multiplier
    const aptitude = moveType === 'Normal' ? 'B' :
                     (moveColor ? combatant.typeAptitudes[moveColor] : 'B');
    const aptitudeMult = moveType === 'Normal' ? 1.0 :
                         (GAME_CONFIG.APTITUDE.MULTIPLIERS[aptitude] || 1.0);

    // Type matchup bonus
    let typeMatchupMult = 1.0;
    if (moveColor && GAME_CONFIG.TYPE_MATCHUPS[moveColor]) {
      if (GAME_CONFIG.TYPE_MATCHUPS[moveColor].strong === opponent.primaryType) {
        typeMatchupMult = 1.25;
      } else if (GAME_CONFIG.TYPE_MATCHUPS[moveColor].weak === opponent.primaryType) {
        typeMatchupMult = 0.75;
      }
    }

    // Critical hit averaging
    const critChance = GAME_CONFIG.BATTLE.BASE_CRIT_CHANCE +
                       (combatant.stats.Instinct / GAME_CONFIG.BATTLE.INSTINCT_CRIT_DENOMINATOR);
    const avgCritMult = (1 - critChance) * 1 + critChance * 2;

    // Attack/Defense ratio
    const attackDefenseRatio = combatant.stats.Attack / Math.max(1, opponent.stats.Defense);

    // Predicted damage
    const predictedDamage = move.damage * attackDefenseRatio * aptitudeMult * typeMatchupMult * avgCritMult;

    // Use STAMINA_COST multipliers (higher aptitude = lower stamina cost)
    const aptGradeMult = GAME_CONFIG.APTITUDE.STAMINA_COST[combatant.strategyGrade] || 1.0;
    const staminaCost = Math.ceil(move.stamina * aptGradeMult);

    return {
      moveName,
      move,
      category: categorizeMove(move),
      predictedDamage,
      damagePerStamina: move.damage > 0 ? predictedDamage / staminaCost : 0,
      staminaCost,
      cooldown: move.cooldown,
      aptitude
    };
  });

  // Check if combatant has active buffs (for Scaler) or opponent has debuffs (for Debuffer)
  const hasActiveBuff = combatant.statusEffects.some(e =>
    e.type.startsWith('buff_') && e.ticksRemaining > 1
  );
  const opponentHasDebuff = opponent.statusEffects.some(e =>
    e.type.startsWith('debuff_') || ['burn', 'poison', 'badly_poison', 'paralyze', 'freeze', 'sleep', 'confuse', 'curse'].includes(e.type)
  );

  // Strategy-specific move selection
  switch (combatant.strategy) {
    case 'Scaler': {
      // Scaler: buffs first, then powerful moves
      // Priority: Use buff moves if no active buff, otherwise use highest damage
      const buffMoves = movesWithData.filter(m => m.category === 'buff');
      const damageMoves = movesWithData.filter(m => m.predictedDamage > 0);

      // If we don't have an active buff and have buff moves available, use a buff
      if (!hasActiveBuff && buffMoves.length > 0 && Math.random() < 0.85) {
        return buffMoves[Math.floor(Math.random() * buffMoves.length)].moveName;
      }

      // Otherwise, use highest damage move
      if (damageMoves.length > 0) {
        damageMoves.sort((a, b) => b.predictedDamage - a.predictedDamage);
        // Small chance of variation
        if (Math.random() < 0.2 && damageMoves.length > 1) {
          return damageMoves[Math.floor(Math.random() * Math.min(3, damageMoves.length))].moveName;
        }
        return damageMoves[0].moveName;
      }
      break;
    }

    case 'Nuker': {
      // Nuker: saves stamina for most powerful moves
      // Wait until we have enough stamina for high-damage moves
      const nukerMoves = movesWithData.filter(m => m.category === 'nuker' || m.predictedDamage >= 25);
      const allDamageMoves = movesWithData.filter(m => m.predictedDamage > 0);

      // If we have a high-damage move available, use it
      if (nukerMoves.length > 0) {
        nukerMoves.sort((a, b) => b.predictedDamage - a.predictedDamage);
        // High chance to use the most powerful move
        if (Math.random() < 0.85) {
          return nukerMoves[0].moveName;
        }
        return nukerMoves[Math.floor(Math.random() * nukerMoves.length)].moveName;
      }

      // If stamina is high but no nuker moves ready, consider resting (return null)
      if (combatant.currentStamina > 40 && Math.random() < 0.4) {
        return null; // Rest to save for big moves
      }

      // Fallback to any damage move
      if (allDamageMoves.length > 0) {
        return allDamageMoves.sort((a, b) => b.predictedDamage - a.predictedDamage)[0].moveName;
      }
      break;
    }

    case 'Debuffer': {
      // Debuffer: debuffs/weather first, then powerful moves
      const debuffMoves = movesWithData.filter(m => m.category === 'debuff' || m.category === 'weather');
      const damageMoves = movesWithData.filter(m => m.predictedDamage > 0);

      // If opponent doesn't have a debuff and we have debuff moves, apply one
      if (!opponentHasDebuff && debuffMoves.length > 0 && Math.random() < 0.85) {
        return debuffMoves[Math.floor(Math.random() * debuffMoves.length)].moveName;
      }

      // Otherwise use highest damage move
      if (damageMoves.length > 0) {
        damageMoves.sort((a, b) => b.predictedDamage - a.predictedDamage);
        if (Math.random() < 0.2 && damageMoves.length > 1) {
          return damageMoves[Math.floor(Math.random() * Math.min(3, damageMoves.length))].moveName;
        }
        return damageMoves[0].moveName;
      }
      break;
    }

    case 'Chipper': {
      // Chipper: low stamina, low cooldown moves - chip away constantly
      const chipperMoves = movesWithData.filter(m => m.category === 'chipper' || (m.staminaCost <= 25 && m.cooldown <= 3));
      const allMoves = movesWithData.filter(m => m.predictedDamage > 0);

      // Strongly prefer chipper moves
      if (chipperMoves.length > 0 && Math.random() < 0.9) {
        // Pick based on efficiency (damage per stamina)
        chipperMoves.sort((a, b) => b.damagePerStamina - a.damagePerStamina);
        if (Math.random() < 0.3 && chipperMoves.length > 1) {
          return chipperMoves[Math.floor(Math.random() * chipperMoves.length)].moveName;
        }
        return chipperMoves[0].moveName;
      }

      // Fallback to any move, preferring efficiency
      if (allMoves.length > 0) {
        allMoves.sort((a, b) => b.damagePerStamina - a.damagePerStamina);
        return allMoves[0].moveName;
      }
      break;
    }

    case 'MadLad': {
      // Mad Lad: completely random moves
      if (movesWithData.length > 0) {
        return movesWithData[Math.floor(Math.random() * movesWithData.length)].moveName;
      }
      break;
    }

    default: {
      // Fallback: prioritize highest damage moves
      const damageMoves = movesWithData.filter(m => m.predictedDamage > 0);
      if (damageMoves.length > 0) {
        damageMoves.sort((a, b) => b.predictedDamage - a.predictedDamage);
        return damageMoves[0].moveName;
      }
    }
  }

  // Final fallback - pick any available move
  if (movesWithData.length > 0) {
    return movesWithData[0].moveName;
  }
  return null;
}

/**
 * Execute a move and return battle message
 */
function executeMove(combatant, opponent, moveName, attackerName, battleState) {
  const move = MOVES[moveName];
  // Use STAMINA_COST multipliers (higher aptitude = lower stamina cost)
  const aptGradeMult = GAME_CONFIG.APTITUDE.STAMINA_COST[combatant.strategyGrade] || 1.0;
  const staminaCost = Math.ceil(move.stamina * aptGradeMult);

  // Deduct stamina
  combatant.currentStamina = Math.max(0, combatant.currentStamina - staminaCost);
  combatant.isResting = false;

  // Check for paralysis accuracy penalty
  const isParalyzed = combatant.statusEffects.some(e => e.type === 'paralyze');
  const paralyzePenalty = isParalyzed ? 0.25 : 0;

  // Check for accuracy debuff
  const hasAccuracyDebuff = combatant.statusEffects.some(e => e.type === 'debuff_accuracy');
  const accuracyDebuffPenalty = hasAccuracyDebuff ? 0.15 : 0;

  // Miss chance calculation (0.1125 = 11.25% max miss at 0 stamina)
  const missChance = Math.max(0,
    (GAME_CONFIG.BATTLE.MAX_STAMINA - combatant.currentStamina) /
    GAME_CONFIG.BATTLE.MAX_STAMINA * 0.1125) + paralyzePenalty + accuracyDebuffPenalty;

  // Dodge chance when opponent is resting
  let dodgeChance = opponent.isResting
    ? GAME_CONFIG.BATTLE.BASE_DODGE_CHANCE +
      (opponent.stats.Instinct / GAME_CONFIG.BATTLE.INSTINCT_DODGE_DENOMINATOR)
    : 0;

  // Check for evasion effect (ShadowForce) - greatly increases dodge chance
  const hasEvasion = opponent.statusEffects.some(e => e.type === 'evasion' && e.ticksRemaining > 0);
  if (hasEvasion) {
    dodgeChance += 0.8; // 80% additional dodge chance while in evasion state
  }

  const hitRoll = Math.random();
  const hitChance = 1.0 - dodgeChance - missChance;

  if (hitRoll >= hitChance) {
    // MISS
    const state = combatant.moveStates[moveName];
    state.cooldownRemaining = move.cooldown;
    state.everCast = true;
    return `${attackerName} used ${moveName} but missed!`;
  }

  // HIT - Calculate damage
  const moveType = move.type;
  const moveColor = TYPE_TO_COLOR[moveType];

  // Aptitude multiplier
  const aptitude = moveType === 'Normal' ? 'B' :
                   (moveColor ? combatant.typeAptitudes[moveColor] : 'B');
  const aptitudeMult = moveType === 'Normal' ? 1.0 :
                       (GAME_CONFIG.APTITUDE.MULTIPLIERS[aptitude] || 1.0);

  // Type matchup bonus
  let typeBonus = 1.0;
  if (moveType !== 'Normal' && moveColor && GAME_CONFIG.TYPE_MATCHUPS[moveColor]) {
    if (GAME_CONFIG.TYPE_MATCHUPS[moveColor].strong === opponent.primaryType) {
      typeBonus = 1.2;
    }
  }

  // Check for soak effect - opponent becomes Water type temporarily
  const isSoaked = opponent.statusEffects.some(e => e.type === 'soak' && e.ticksRemaining > 0);
  if (isSoaked) {
    // Grass moves are super effective against soaked targets
    if (moveType === 'Grass') {
      typeBonus = 1.4; // Extra effective since they're now Water type
    }
    // Fire moves are reduced against soaked targets
    else if (moveType === 'Fire') {
      typeBonus = 0.6; // Fire is weak against Water
    }
    // Electric moves are super effective against soaked targets
    else if (moveType === 'Electric') {
      typeBonus = 1.3; // Electric strong against Water
    }
  }

  // Base damage calculation with buff/debuff modifiers
  let attackStat = combatant.stats.Attack;
  let defenseStat = opponent.stats.Defense;

  // Apply attack buffs/debuffs
  combatant.statusEffects.forEach(e => {
    if (e.type === 'buff_attack' && e.multiplier) attackStat *= e.multiplier;
    if (e.type === 'debuff_attack' && e.multiplier) attackStat *= e.multiplier;
  });
  opponent.statusEffects.forEach(e => {
    if (e.type === 'debuff_defense' && e.multiplier) defenseStat *= e.multiplier;
  });

  const baseDamage = move.damage * (attackStat / defenseStat);
  let damage = Math.floor(baseDamage * aptitudeMult * typeBonus);

  // Apply HP-based damage modifier (Eruption)
  if (move.effect && move.effect.type === 'hp_based_damage') {
    const hpPercent = combatant.currentHP / combatant.stats.HP;
    damage = Math.floor(damage * hpPercent);
  }

  // Critical hit calculation with high_crit modifier
  let critChance = GAME_CONFIG.BATTLE.BASE_CRIT_CHANCE +
                   (combatant.stats.Instinct / GAME_CONFIG.BATTLE.INSTINCT_CRIT_DENOMINATOR);

  // High crit moves (Slash) have 3x crit chance
  if (move.effect && move.effect.type === 'high_crit') {
    critChance *= 3;
  }

  // Apply instinct buffs to crit chance
  combatant.statusEffects.forEach(e => {
    if (e.type === 'buff_instinct' && e.multiplier) critChance *= e.multiplier;
  });

  const isCrit = Math.random() < critChance;
  if (isCrit) {
    damage = Math.floor(damage * 2);
  }

  // Handle zero-damage (status/weather) moves differently
  if (move.damage === 0) {
    damage = 0;
  } else {
    damage = Math.max(1, damage);
    opponent.currentHP = Math.max(0, opponent.currentHP - damage);

    // Check for destiny_bond - if opponent faints, attacker faints too
    if (opponent.currentHP <= 0) {
      const hasDestinyBond = opponent.statusEffects.some(e => e.type === 'destiny_bond' && e.ticksRemaining > 0);
      if (hasDestinyBond) {
        combatant.currentHP = 0;
      }
    }
  }

  // Build message
  let message = damage > 0
    ? `${attackerName} used ${moveName}! Dealt ${damage} damage!`
    : `${attackerName} used ${moveName}!`;
  if (isCrit && damage > 0) message += ' *** CRITICAL HIT! ***';
  if (typeBonus > 1.0 && damage > 0) message += ' Super effective!';

  // Check if destiny bond triggered
  if (opponent.currentHP <= 0 && combatant.currentHP <= 0) {
    const hadDestinyBond = opponent.statusEffects.some(e => e.type === 'destiny_bond');
    if (hadDestinyBond) {
      message += ` Destiny Bond took ${attackerName} down too!`;
    }
  }

  // Apply status effects
  if (move.effect) {
    const effect = move.effect;
    const effectApplied = Math.random() < (effect.chance || 1.0);

    // === SELF-TARGETING EFFECTS ===
    if (effect.type === 'exhaust') {
      // Self-exhaust (HyperBeam, BlastBurn, RoarOfTime)
      combatant.statusEffects.push({
        type: 'exhaust',
        duration: effect.duration,
        ticksRemaining: effect.duration
      });
      message += ` ${attackerName} is exhausted!`;
    } else if (effect.type === 'recoil') {
      // Recoil damage (Submission, FlareBlitz, BraveBird, DoubleEdge)
      const recoilDamage = Math.floor(damage * effect.damagePercent);
      combatant.currentHP = Math.max(0, combatant.currentHP - recoilDamage);
      message += ` ${attackerName} took ${recoilDamage} recoil damage!`;
    } else if (effect.type === 'self_ko') {
      // Self KO (Explosion)
      combatant.currentHP = 0;
      message += ` ${attackerName} fainted from the explosion!`;
    } else if (effect.type === 'heal_self') {
      // Self healing (Recover, MilkDrink, Moonlight, Roost, Synthesis)
      const healAmount = Math.floor(combatant.stats.HP * effect.healPercent);
      combatant.currentHP = Math.min(combatant.stats.HP, combatant.currentHP + healAmount);
      message += ` ${attackerName} recovered ${healAmount} HP!`;
    } else if (effect.type === 'buff_attack') {
      // Attack buff (SwordsDance, MeteorMash)
      if (effectApplied) {
        combatant.statusEffects.push({
          type: 'buff_attack',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          multiplier: 1.5
        });
        message += ` ${attackerName}'s Attack rose!`;
      }
    } else if (effect.type === 'buff_defense') {
      // Defense buff (IronDefense)
      combatant.statusEffects.push({
        type: 'buff_defense',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        multiplier: 1.5
      });
      message += ` ${attackerName}'s Defense rose!`;
    } else if (effect.type === 'buff_speed') {
      // Speed buff (RockPolish)
      combatant.statusEffects.push({
        type: 'buff_speed',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        multiplier: 1.5
      });
      message += ` ${attackerName}'s Speed rose!`;
    } else if (effect.type === 'buff_instinct') {
      // Instinct buff (CalmMind, NastyPlot)
      combatant.statusEffects.push({
        type: 'buff_instinct',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        multiplier: 1.5
      });
      message += ` ${attackerName}'s Instinct rose!`;
    } else if (effect.type === 'buff_attack_defense') {
      // Attack + Defense buff (BulkUp)
      combatant.statusEffects.push({
        type: 'buff_attack',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        multiplier: 1.3
      });
      combatant.statusEffects.push({
        type: 'buff_defense',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        multiplier: 1.3
      });
      message += ` ${attackerName}'s Attack and Defense rose!`;
    } else if (effect.type === 'buff_attack_speed') {
      // Attack + Speed buff (DragonDance)
      combatant.statusEffects.push({
        type: 'buff_attack',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        multiplier: 1.3
      });
      combatant.statusEffects.push({
        type: 'buff_speed',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        multiplier: 1.3
      });
      message += ` ${attackerName}'s Attack and Speed rose!`;
    } else if (effect.type === 'buff_all') {
      // All stats buff (AncientPower - 10% chance)
      if (effectApplied) {
        ['buff_attack', 'buff_defense', 'buff_speed', 'buff_instinct'].forEach(buffType => {
          combatant.statusEffects.push({
            type: buffType,
            duration: 4,
            ticksRemaining: 4,
            multiplier: 1.2
          });
        });
        message += ` ${attackerName}'s stats rose!`;
      }
    } else if (effect.type === 'debuff_instinct_self') {
      // Self instinct debuff (DracoMeteor)
      combatant.statusEffects.push({
        type: 'debuff_instinct',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        multiplier: 0.6
      });
      message += ` ${attackerName}'s Instinct fell!`;
    } else if (effect.type === 'confuse_self_after') {
      // Confuse self after attack (Outrage)
      combatant.statusEffects.push({
        type: 'confuse',
        duration: effect.duration,
        ticksRemaining: effect.duration
      });
      message += ` ${attackerName} became confused!`;
    } else if (effect.type === 'regen') {
      // Regeneration over time (AquaRing) - remove existing regen first (no stacking)
      combatant.statusEffects = combatant.statusEffects.filter(e => e.type !== 'regen');
      combatant.statusEffects.push({
        type: 'regen',
        duration: effect.duration,
        ticksRemaining: effect.duration,
        healPercent: effect.healPercent
      });
      message += ` ${attackerName} surrounded itself with water!`;
    } else if (effect.type === 'evasion') {
      // Evasion boost (ShadowForce)
      combatant.statusEffects.push({
        type: 'evasion',
        duration: effect.duration,
        ticksRemaining: effect.duration
      });
      message += ` ${attackerName} vanished!`;

    // === WEATHER EFFECTS ===
    } else if (effect.type.startsWith('weather_')) {
      const weatherType = effect.type.replace('weather_', '');
      const casterNum = attackerName === 'Player 1' ? 1 : 2;
      battleState.weather = {
        type: weatherType,
        ticksRemaining: effect.duration,
        caster: casterNum
      };
      const weatherNames = {
        sand: 'Sandstorm',
        rain: 'Rain',
        sun: 'Harsh Sunlight',
        hail: 'Hail'
      };
      message += ` ${weatherNames[weatherType] || weatherType} started!`;

    // === DRAIN EFFECTS ===
    } else if (effect.type === 'drain' && effectApplied) {
      // HP drain (DrainPunch, GigaDrain)
      const healAmount = Math.floor(damage * effect.healPercent);
      combatant.currentHP = Math.min(combatant.stats.HP, combatant.currentHP + healAmount);
      message += ` ${attackerName} drained ${healAmount} HP!`;
    } else if (effect.type === 'drain_sleep') {
      // Drain only works if opponent is asleep (DreamEater)
      const isAsleep = opponent.statusEffects.some(e => e.type === 'sleep');
      if (isAsleep) {
        const healAmount = Math.floor(damage * effect.healPercent);
        combatant.currentHP = Math.min(combatant.stats.HP, combatant.currentHP + healAmount);
        message += ` ${attackerName} ate the dream and recovered ${healAmount} HP!`;
      }

    // === SPECIAL DAMAGE MODIFIERS ===
    } else if (effect.type === 'high_crit') {
      // High crit handled above in crit calculation - just a marker
      // Already implemented via higher base crit, no additional action needed
    } else if (effect.type === 'hp_based_damage') {
      // Damage based on user HP (Eruption) - already calculated in base damage
      // Effect is that lower HP = less damage, handled by damage calculation
    } else if (effect.type === 'double_if_status') {
      // Double damage if opponent has status (Hex)
      if (opponent.statusEffects.length > 0) {
        const bonusDamage = damage; // Already dealt damage, deal it again
        opponent.currentHP = Math.max(0, opponent.currentHP - bonusDamage);
        message += ` Hex dealt double damage!`;
      }
    } else if (effect.type === 'use_opponent_attack') {
      // Use opponent's Attack stat (FoulPlay) - already calculated with modified formula
      // The damage calculation should use opponent.stats.Attack instead of combatant.stats.Attack
      // For simplicity, we'll add bonus damage based on opponent's Attack
      const attackDiff = opponent.stats.Attack - combatant.stats.Attack;
      if (attackDiff > 0) {
        const bonusDamage = Math.floor(move.damage * (attackDiff / 100));
        opponent.currentHP = Math.max(0, opponent.currentHP - bonusDamage);
        message += ` Foul Play used opponent's strength!`;
      }

    // === OPPONENT STATUS EFFECTS ===
    } else if (effectApplied) {
      // All other effects that apply to opponent
      if (effect.type === 'burn') {
        opponent.statusEffects.push({
          type: 'burn',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          damage: effect.damage || 4
        });
        message += ` Opponent was burned!`;
      } else if (effect.type === 'poison') {
        opponent.statusEffects.push({
          type: 'poison',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          damage: effect.damage || 4
        });
        message += ` Opponent was poisoned!`;
      } else if (effect.type === 'badly_poison') {
        // Toxic - damage increases each turn
        opponent.statusEffects.push({
          type: 'badly_poison',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          damage: 2,
          turnsActive: 0
        });
        message += ` Opponent was badly poisoned!`;
      } else if (effect.type === 'paralyze') {
        opponent.statusEffects.push({
          type: 'paralyze',
          duration: effect.duration,
          ticksRemaining: effect.duration
        });
        message += ` Opponent was paralyzed!`;
      } else if (effect.type === 'freeze') {
        opponent.statusEffects.push({
          type: 'freeze',
          duration: effect.duration,
          ticksRemaining: effect.duration
        });
        message += ` Opponent was frozen!`;
      } else if (effect.type === 'sleep') {
        opponent.statusEffects.push({
          type: 'sleep',
          duration: effect.duration,
          ticksRemaining: effect.duration
        });
        message += ` Opponent fell asleep!`;
      } else if (effect.type === 'confuse') {
        opponent.statusEffects.push({
          type: 'confuse',
          duration: effect.duration,
          ticksRemaining: effect.duration
        });
        message += ` Opponent became confused!`;
      } else if (effect.type === 'stun') {
        opponent.statusEffects.push({
          type: 'stun',
          duration: effect.duration,
          ticksRemaining: effect.duration
        });
        message += ` Opponent flinched!`;
      } else if (effect.type === 'infatuate') {
        opponent.statusEffects.push({
          type: 'infatuate',
          duration: effect.duration,
          ticksRemaining: effect.duration
        });
        message += ` Opponent fell in love!`;
      } else if (effect.type === 'curse') {
        opponent.statusEffects.push({
          type: 'curse',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          damage: effect.damage || 6
        });
        message += ` Opponent was cursed!`;
      } else if (effect.type === 'soak') {
        opponent.statusEffects.push({
          type: 'soak',
          duration: effect.duration,
          ticksRemaining: effect.duration
        });
        message += ` Opponent got soaked!`;
      } else if (effect.type === 'debuff_defense') {
        opponent.statusEffects.push({
          type: 'debuff_defense',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          multiplier: 0.7
        });
        message += ` Opponent's Defense fell!`;
      } else if (effect.type === 'debuff_instinct') {
        opponent.statusEffects.push({
          type: 'debuff_instinct',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          multiplier: 0.7
        });
        message += ` Opponent's Instinct fell!`;
      } else if (effect.type === 'debuff_attack') {
        opponent.statusEffects.push({
          type: 'debuff_attack',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          multiplier: 0.7
        });
        message += ` Opponent's Attack fell!`;
      } else if (effect.type === 'debuff_speed') {
        opponent.statusEffects.push({
          type: 'debuff_speed',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          multiplier: 0.7
        });
        message += ` Opponent's Speed fell!`;
      } else if (effect.type === 'debuff_accuracy') {
        opponent.statusEffects.push({
          type: 'debuff_accuracy',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          multiplier: 0.7
        });
        message += ` Opponent's Accuracy fell!`;
      } else if (effect.type === 'energize') {
        combatant.statusEffects.push({
          type: 'energize',
          duration: effect.duration,
          ticksRemaining: effect.duration,
          staminaBoost: effect.staminaBoost || 5
        });
        message += ` ${attackerName} is energized!`;
      } else if (effect.type === 'destiny_bond') {
        combatant.statusEffects.push({
          type: 'destiny_bond',
          duration: effect.duration,
          ticksRemaining: effect.duration
        });
        message += ` ${attackerName} is ready to take the opponent down with it!`;
      } else if (effect.type === 'delayed_damage') {
        // FutureSight - damage will hit later
        opponent.statusEffects.push({
          type: 'delayed_damage',
          duration: effect.turns,
          ticksRemaining: effect.turns,
          damage: damage // Store the calculated damage
        });
        message += ` ${attackerName} foresaw an attack!`;
      } else if (effect.type === 'entry_hazard' || effect.type === 'entry_hazard_rock') {
        // Entry hazards (Spikes, StealthRock) - simplified: just deal damage now
        const hazardDamage = effect.type === 'entry_hazard_rock' ? 8 : 5;
        opponent.currentHP = Math.max(0, opponent.currentHP - hazardDamage);
        message += ` Hazards dealt ${hazardDamage} damage!`;
      } else if (effect.type === 'remove_hazards') {
        // RapidSpin - clears hazards (simplified: restore some HP)
        const healAmount = 5;
        combatant.currentHP = Math.min(combatant.stats.HP, combatant.currentHP + healAmount);
        message += ` Hazards were cleared!`;
      } else if (effect.type === 'push_back') {
        // DragonTail - resets opponent's move warmups
        Object.values(opponent.moveStates).forEach(state => {
          if (state.warmupRemaining > 0) {
            state.warmupRemaining += 1;
          }
        });
        message += ` Opponent was pushed back!`;
      } else if (effect.type === 'consecutive_boost') {
        // Rollout - tracking consecutive hits (simplified: just normal damage)
        // Would need state tracking across turns for full implementation
      } else if (effect.type === 'random_move') {
        // Metronome - use a random move (simplified: deal random damage)
        const randomDamage = Math.floor(Math.random() * 30) + 10;
        opponent.currentHP = Math.max(0, opponent.currentHP - randomDamage);
        message += ` Metronome used a random move for ${randomDamage} damage!`;
      } else if (effect.type === 'random_damage_or_heal') {
        // Present - random damage or heal
        const roll = Math.random();
        if (roll < 0.4) {
          const presentDamage = Math.floor(Math.random() * 40) + 40;
          opponent.currentHP = Math.max(0, opponent.currentHP - presentDamage);
          message += ` Present dealt ${presentDamage} damage!`;
        } else if (roll < 0.7) {
          const presentDamage = Math.floor(Math.random() * 30) + 10;
          opponent.currentHP = Math.max(0, opponent.currentHP - presentDamage);
          message += ` Present dealt ${presentDamage} damage!`;
        } else {
          const healAmount = Math.floor(opponent.stats.HP * 0.25);
          opponent.currentHP = Math.min(opponent.stats.HP, opponent.currentHP + healAmount);
          message += ` Present healed opponent for ${healAmount}!`;
        }
      } else if (effect.type === 'copy_opponent') {
        // Transform - copy opponent's stats (simplified: boost own stats temporarily)
        combatant.statusEffects.push({
          type: 'transformed',
          duration: 5,
          ticksRemaining: 5
        });
        message += ` ${attackerName} transformed!`;
      } else if (effect.type === 'switch_out') {
        // UTurn - deal damage and gain stamina (simplified since no switching)
        const staminaGain = 10;
        combatant.currentStamina = Math.min(GAME_CONFIG.BATTLE.MAX_STAMINA, combatant.currentStamina + staminaGain);
        message += ` ${attackerName} gained momentum!`;
      }
    }
  }

  // Set cooldown
  const state = combatant.moveStates[moveName];
  state.cooldownRemaining = move.cooldown;
  state.everCast = true;

  return message;
}

/**
 * Process status effects and return messages
 */
function processStatusEffects(combatant, name) {
  const messages = [];

  combatant.statusEffects = combatant.statusEffects.filter(effect => {
    effect.ticksRemaining--;

    // === DAMAGE OVER TIME ===
    if (effect.type === 'burn' || effect.type === 'poison') {
      combatant.currentHP = Math.max(0, combatant.currentHP - effect.damage);
      messages.push(`${name} takes ${effect.damage} damage from ${effect.type}!`);
    } else if (effect.type === 'badly_poison') {
      // Toxic damage increases each turn
      effect.turnsActive = (effect.turnsActive || 0) + 1;
      const toxicDamage = effect.damage * effect.turnsActive;
      combatant.currentHP = Math.max(0, combatant.currentHP - toxicDamage);
      messages.push(`${name} takes ${toxicDamage} damage from toxic poison!`);
    } else if (effect.type === 'curse') {
      combatant.currentHP = Math.max(0, combatant.currentHP - effect.damage);
      messages.push(`${name} is hurt by the curse!`);
    } else if (effect.type === 'delayed_damage' && effect.ticksRemaining === 0) {
      // FutureSight damage hits when timer expires
      combatant.currentHP = Math.max(0, combatant.currentHP - effect.damage);
      messages.push(`${name} was hit by the foreseen attack for ${effect.damage} damage!`);
    }

    // === HEALING OVER TIME ===
    else if (effect.type === 'regen') {
      const healAmount = Math.floor(combatant.stats.HP * effect.healPercent);
      combatant.currentHP = Math.min(combatant.stats.HP, combatant.currentHP + healAmount);
      messages.push(`${name} restored ${healAmount} HP!`);
    }

    // === STAMINA EFFECTS ===
    else if (effect.type === 'energize') {
      combatant.currentStamina = Math.min(GAME_CONFIG.BATTLE.MAX_STAMINA,
                                          combatant.currentStamina + effect.staminaBoost);
    }

    // === MOVEMENT IMPAIRMENT ===
    // Note: stun, freeze, sleep, and infatuate are now handled in processCombatantTick
    // before move selection. Here we just handle thawing and confusion self-damage.
    else if (effect.type === 'freeze' && effect.ticksRemaining > 0) {
      // 20% chance to thaw each turn (if they weren't already thawed in processCombatantTick)
      if (Math.random() < 0.2) {
        effect.ticksRemaining = 0;
        messages.push(`${name} thawed out!`);
      }
    } else if (effect.type === 'confuse' && effect.ticksRemaining > 0) {
      // 33% chance to hurt self when confused (even if they can act)
      if (Math.random() < 0.33) {
        const confuseDamage = Math.floor(combatant.stats.Attack * 0.1);
        combatant.currentHP = Math.max(0, combatant.currentHP - confuseDamage);
        messages.push(`${name} hurt itself in confusion for ${confuseDamage} damage!`);
      }
    }

    // === BUFF/DEBUFF EFFECTS (these are passive, checked during damage calc) ===
    // buff_attack, buff_defense, buff_speed, buff_instinct, debuff_defense, debuff_instinct
    // These don't need per-tick processing, they're checked when calculating damage

    // === SPECIAL STATES ===
    else if (effect.type === 'evasion' && effect.ticksRemaining > 0) {
      // Evasion is checked during hit calculation
    } else if (effect.type === 'destiny_bond' && effect.ticksRemaining > 0) {
      // Destiny bond is checked when combatant faints
    } else if (effect.type === 'soak' && effect.ticksRemaining > 0) {
      // Soak changes type effectiveness (simplified: reduces fire damage taken)
    }

    return effect.ticksRemaining > 0;
  });

  return messages;
}

/**
 * Process weather effects at end of each tick
 * Returns array of messages
 */
function processWeatherEffects(battleState) {
  const messages = [];
  const weather = battleState.weather;

  if (!weather.type || weather.ticksRemaining <= 0) {
    return messages;
  }

  // Weather damage configuration
  const WEATHER_DAMAGE = {
    sand: 4,  // Sandstorm deals chip damage
    hail: 4   // Hail also deals chip damage (if added later)
  };

  // Types immune to weather damage
  const WEATHER_IMMUNITY = {
    sand: ['Fighting', 'Ground', 'Rock', 'Steel'],  // In Pokemon, Ground/Rock/Steel are immune to sand
    hail: ['Ice']  // Ice types immune to hail
  };

  // Apply weather damage if applicable
  if (WEATHER_DAMAGE[weather.type]) {
    const damage = WEATHER_DAMAGE[weather.type];
    const immuneTypes = WEATHER_IMMUNITY[weather.type] || [];

    // Check player 1 immunity
    if (!immuneTypes.includes(battleState.player1.primaryType)) {
      battleState.player1.currentHP = Math.max(0, battleState.player1.currentHP - damage);
      messages.push(`${battleState.player1.name} takes ${damage} damage from the ${weather.type === 'sand' ? 'sandstorm' : weather.type}!`);
    }

    // Check player 2 immunity
    if (!immuneTypes.includes(battleState.player2.primaryType)) {
      battleState.player2.currentHP = Math.max(0, battleState.player2.currentHP - damage);
      messages.push(`${battleState.player2.name} takes ${damage} damage from the ${weather.type === 'sand' ? 'sandstorm' : weather.type}!`);
    }
  }

  // Decrement weather duration
  weather.ticksRemaining--;

  // Weather ended message
  if (weather.ticksRemaining <= 0) {
    const weatherNames = {
      sand: 'The sandstorm subsided.',
      rain: 'The rain stopped.',
      sun: 'The harsh sunlight faded.',
      hail: 'The hail stopped.'
    };
    messages.push(weatherNames[weather.type] || `The ${weather.type} ended.`);
    battleState.weather = { type: null, ticksRemaining: 0, caster: null };
  }

  return messages;
}

module.exports = {
  simulateBattle,
  GAME_CONFIG,
  MOVES,
  TYPE_TO_COLOR
};
