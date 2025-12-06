/**
 * MOVES DATABASE
 * All move definitions with damage, effects, costs, etc.
 *
 * DESIGN PHILOSOPHY:
 * - Default moves (on Pokemon): Low cost (25-40), basic but functional
 * - Learnable moves: Higher cost (50-80), stronger with clear trade-offs
 * - Premium moves: Very high cost (100-150), powerful but demanding to acquire
 *
 * Each move should have a UNIQUE IDENTITY - not just damage + status effect
 */

export const MOVES = {
  // ============================================================================
  // STARTER/DEFAULT MOVES (Cost 25-40) - Available on Pokemon by default
  // These are intentionally simple but each has a distinct feel
  // ============================================================================

  // Fire starters - Ember is chip damage, good for wearing down
  Ember: { type: 'Fire', damage: 10, warmup: 0, cooldown: 2, stamina: 20, cost: 25, effect: { type: 'burn', chance: 0.15, duration: 3, damage: 2 } },

  // Water starters - WaterGun is reliable, slightly more damage but no burn
  WaterGun: { type: 'Water', damage: 12, warmup: 0, cooldown: 2, stamina: 22, cost: 25, effect: null },

  // Grass starters - VineWhip has reach, slows enemies
  VineWhip: { type: 'Grass', damage: 11, warmup: 0, cooldown: 2, stamina: 22, cost: 25, effect: { type: 'debuff_speed', chance: 0.25, duration: 4 } },

  // Psychic starters - PsyBeam is tricky, can confuse
  PsyBeam: { type: 'Psychic', damage: 9, warmup: 0, cooldown: 2, stamina: 20, cost: 25, effect: { type: 'confuse', chance: 0.35, duration: 3 } },

  // Electric starters - ThunderShock is fast, can paralyze
  ThunderShock: { type: 'Electric', damage: 10, warmup: 0, cooldown: 2, stamina: 20, cost: 25, effect: { type: 'paralyze', chance: 0.25, duration: 3 } },

  // Fighting starters - LowKick is quick and trips
  LowKick: { type: 'Fighting', damage: 8, warmup: 0, cooldown: 2, stamina: 18, cost: 25, effect: { type: 'debuff_speed', chance: 0.4, duration: 3 } },
  KarateChop: { type: 'Fighting', damage: 11, warmup: 0, cooldown: 2, stamina: 22, cost: 28, effect: { type: 'high_crit' } },

  // Normal starters - Tackle is the most basic move
  Tackle: { type: 'Normal', damage: 8, warmup: 0, cooldown: 2, stamina: 15, cost: 20, effect: null },
  QuickAttack: { type: 'Normal', damage: 9, warmup: 0, cooldown: 1, stamina: 18, cost: 28, effect: { type: 'buff_speed', chance: 0.3, duration: 3 } },

  // ============================================================================
  // MID-TIER LEARNABLE MOVES (Cost 50-80) - Core battle options
  // Each has a distinct strategic purpose
  // ============================================================================

  // === FIRE MID-TIER ===
  // Flamethrower: The standard - reliable damage with burn chance
  Flamethrower: { type: 'Fire', damage: 28, warmup: 2, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'burn', chance: 0.25, duration: 4, damage: 3 } },
  // FireFang: Fast attacker's choice - quick with flinch
  FireFang: { type: 'Fire', damage: 18, warmup: 0, cooldown: 3, stamina: 28, cost: 48, effect: { type: 'flinch', chance: 0.35 } },
  // LavaPlume: Defensive option - spreads burn more reliably
  LavaPlume: { type: 'Fire', damage: 22, warmup: 3, cooldown: 4, stamina: 40, cost: 52, effect: { type: 'burn', chance: 0.5, duration: 5, damage: 4 } },
  // FlameCharge: Speed booster - damage is secondary
  FlameCharge: { type: 'Fire', damage: 14, warmup: 0, cooldown: 3, stamina: 25, cost: 45, effect: { type: 'buff_speed', chance: 1.0, duration: 8 } },

  // === WATER MID-TIER ===
  // Surf: The standard - solid damage, wide coverage
  Surf: { type: 'Water', damage: 28, warmup: 2, cooldown: 4, stamina: 45, cost: 55, effect: null },
  // IceBeam: Utility option - can freeze, slightly less damage
  IceBeam: { type: 'Water', damage: 24, warmup: 3, cooldown: 4, stamina: 48, cost: 60, effect: { type: 'freeze', chance: 0.2, duration: 3 } },
  // Scald: Burn from water! Great for defensive play
  Scald: { type: 'Water', damage: 22, warmup: 2, cooldown: 3, stamina: 38, cost: 55, effect: { type: 'burn', chance: 0.4, duration: 4, damage: 3 } },
  // AquaJet: Fast water move - quick strike with speed boost
  AquaJet: { type: 'Water', damage: 14, warmup: 0, cooldown: 2, stamina: 22, cost: 45, effect: { type: 'buff_speed', chance: 0.3, duration: 3 } },

  // === GRASS MID-TIER ===
  // RazorLeaf: High crit chance - gambler's choice
  RazorLeaf: { type: 'Grass', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 50, effect: { type: 'high_crit' } },
  // GigaDrain: Sustain option - heal while dealing damage
  GigaDrain: { type: 'Grass', damage: 20, warmup: 3, cooldown: 4, stamina: 35, cost: 58, effect: { type: 'drain', chance: 1.0, healPercent: 0.5 } },
  // LeafBlade: Fast and sharp - quick high crit
  LeafBlade: { type: 'Grass', damage: 26, warmup: 1, cooldown: 3, stamina: 40, cost: 55, effect: { type: 'high_crit' } },
  // SleepPowder: Pure utility - no damage but puts to sleep
  SleepPowder: { type: 'Grass', damage: 0, warmup: 2, cooldown: 6, stamina: 30, cost: 52, effect: { type: 'sleep', chance: 0.75, duration: 4 } },

  // === PSYCHIC MID-TIER ===
  // Psychic: The standard - solid damage with defense drop
  Psychic: { type: 'Psychic', damage: 26, warmup: 2, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'debuff_defense', chance: 0.3, duration: 5 } },
  // Psyshock: Psychic hit that ignores some defense - debuffs defense
  Psyshock: { type: 'Psychic', damage: 24, warmup: 2, cooldown: 3, stamina: 40, cost: 52, effect: { type: 'debuff_defense', chance: 0.5, duration: 4 } },
  // Hypnosis: High risk, high reward sleep
  Hypnosis: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 5, stamina: 25, cost: 48, effect: { type: 'sleep', chance: 0.6, duration: 4 } },
  // ShadowBall: Ghost coverage - defense shredder
  ShadowBall: { type: 'Psychic', damage: 24, warmup: 2, cooldown: 3, stamina: 42, cost: 55, effect: { type: 'debuff_defense', chance: 0.35, duration: 6 } },

  // === ELECTRIC MID-TIER ===
  // Thunderbolt: The standard - reliable with paralysis
  Thunderbolt: { type: 'Electric', damage: 26, warmup: 2, cooldown: 4, stamina: 45, cost: 55, effect: { type: 'paralyze', chance: 0.3, duration: 4 } },
  // VoltSwitch: Hit and energize - momentum move
  VoltSwitch: { type: 'Electric', damage: 18, warmup: 0, cooldown: 3, stamina: 28, cost: 48, effect: { type: 'energize', chance: 0.5, staminaBoost: 8 } },
  // Discharge: Spread paralysis - higher chance, less damage
  Discharge: { type: 'Electric', damage: 22, warmup: 2, cooldown: 3, stamina: 40, cost: 52, effect: { type: 'paralyze', chance: 0.45, duration: 4 } },
  // ThunderWave: Pure utility - guaranteed paralysis
  ThunderWave: { type: 'Electric', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 45, effect: { type: 'paralyze', chance: 0.95, duration: 6 } },

  // === FIGHTING MID-TIER ===
  // BrickBreak: Barrier breaker - removes hazards
  BrickBreak: { type: 'Fighting', damage: 24, warmup: 2, cooldown: 3, stamina: 38, cost: 50, effect: { type: 'remove_hazards' } },
  // DrainPunch: Sustain fighter - heal while punching
  DrainPunch: { type: 'Fighting', damage: 20, warmup: 2, cooldown: 3, stamina: 35, cost: 55, effect: { type: 'drain', chance: 1.0, healPercent: 0.5 } },
  // RockSlide: Coverage move - flinch chance
  RockSlide: { type: 'Fighting', damage: 22, warmup: 2, cooldown: 3, stamina: 40, cost: 52, effect: { type: 'flinch', chance: 0.35 } },
  // MachPunch: Fast fighting move - quick strike with speed boost
  MachPunch: { type: 'Fighting', damage: 14, warmup: 0, cooldown: 2, stamina: 22, cost: 45, effect: { type: 'buff_speed', chance: 0.3, duration: 3 } },

  // === NORMAL MID-TIER ===
  // BodySlam: Reliable with paralysis chance
  BodySlam: { type: 'Normal', damage: 24, warmup: 2, cooldown: 3, stamina: 40, cost: 50, effect: { type: 'paralyze', chance: 0.35, duration: 4 } },
  // ExtremeSpeed: Blazing fast attack - guaranteed speed boost
  ExtremeSpeed: { type: 'Normal', damage: 22, warmup: 0, cooldown: 3, stamina: 38, cost: 65, effect: { type: 'buff_speed', chance: 1.0, duration: 4 } },
  // AerialAce: Precise aerial strike - can flinch
  AerialAce: { type: 'Normal', damage: 18, warmup: 0, cooldown: 2, stamina: 28, cost: 42, effect: { type: 'flinch', chance: 0.2 } },
  // PayDay: Makes money... I mean stamina
  PayDay: { type: 'Normal', damage: 14, warmup: 0, cooldown: 2, stamina: 20, cost: 38, effect: { type: 'energize', chance: 0.7, staminaBoost: 8 } },

  // ============================================================================
  // HIGH-TIER MOVES (Cost 80-100) - Powerful but expensive
  // These define endgame builds
  // ============================================================================

  // === FIRE HIGH-TIER ===
  // FireBlast: Raw power with burn - the big gun
  FireBlast: { type: 'Fire', damage: 38, warmup: 4, cooldown: 5, stamina: 60, cost: 85, effect: { type: 'burn', chance: 0.35, duration: 5, damage: 4 } },
  // FlareBlitz: Maximum damage with recoil - glass cannon
  FlareBlitz: { type: 'Fire', damage: 42, warmup: 3, cooldown: 5, stamina: 55, cost: 90, effect: { type: 'recoil', damagePercent: 0.25 } },
  // Overheat: Nuke but weakens you - one-shot potential
  Overheat: { type: 'Fire', damage: 48, warmup: 4, cooldown: 6, stamina: 65, cost: 95, effect: { type: 'debuff_instinct_self', duration: 10 } },

  // === WATER HIGH-TIER ===
  // HydroPump: Raw water power - devastating with small debuff
  HydroPump: { type: 'Water', damage: 40, warmup: 4, cooldown: 5, stamina: 60, cost: 85, effect: { type: 'debuff_defense', chance: 0.25, duration: 4 } },
  // Blizzard: Ice nuke - freeze chance on high damage
  Blizzard: { type: 'Water', damage: 38, warmup: 5, cooldown: 6, stamina: 65, cost: 92, effect: { type: 'freeze', chance: 0.35, duration: 4 } },
  // WaveCrash: Physical water nuke with recoil
  WaveCrash: { type: 'Water', damage: 44, warmup: 3, cooldown: 5, stamina: 58, cost: 90, effect: { type: 'recoil', damagePercent: 0.25 } },

  // === GRASS HIGH-TIER ===
  // SolarBeam: Charge up for massive damage - timing matters
  SolarBeam: { type: 'Grass', damage: 45, warmup: 6, cooldown: 4, stamina: 55, cost: 88, effect: null },
  // PowerWhip: Physical grass nuke - high damage with flinch
  PowerWhip: { type: 'Grass', damage: 38, warmup: 3, cooldown: 5, stamina: 55, cost: 85, effect: { type: 'flinch', chance: 0.4 } },
  // WoodHammer: Maximum grass damage with recoil
  WoodHammer: { type: 'Grass', damage: 44, warmup: 3, cooldown: 5, stamina: 58, cost: 90, effect: { type: 'recoil', damagePercent: 0.25 } },

  // === PSYCHIC HIGH-TIER ===
  // PsychicBlast: Pure psychic devastation - guaranteed confuse
  PsychicBlast: { type: 'Psychic', damage: 38, warmup: 4, cooldown: 5, stamina: 60, cost: 88, effect: { type: 'confuse', chance: 0.8, duration: 5 } },
  // FutureSight: Delayed massive damage - strategic timing
  FutureSight: { type: 'Psychic', damage: 50, warmup: 6, cooldown: 7, stamina: 55, cost: 95, effect: { type: 'delayed_damage', turns: 2 } },
  // DreamEater: Only works on sleeping targets but devastating
  DreamEater: { type: 'Psychic', damage: 40, warmup: 3, cooldown: 5, stamina: 50, cost: 85, effect: { type: 'drain_sleep', healPercent: 0.6 } },

  // === ELECTRIC HIGH-TIER ===
  // Thunder: Raw electric power - paralyzes on hit
  Thunder: { type: 'Electric', damage: 40, warmup: 4, cooldown: 5, stamina: 65, cost: 88, effect: { type: 'paralyze', chance: 0.4, duration: 5 } },
  // WildCharge: Physical electric with recoil
  WildCharge: { type: 'Electric', damage: 38, warmup: 3, cooldown: 5, stamina: 55, cost: 85, effect: { type: 'recoil', damagePercent: 0.2 } },
  // ZapCannon: Slow but near-guaranteed paralysis
  ZapCannon: { type: 'Electric', damage: 42, warmup: 5, cooldown: 6, stamina: 60, cost: 92, effect: { type: 'paralyze', chance: 0.9, duration: 5 } },

  // === FIGHTING HIGH-TIER ===
  // CloseCombat: Maximum fighting damage, lowers your defenses
  CloseCombat: { type: 'Fighting', damage: 44, warmup: 3, cooldown: 5, stamina: 55, cost: 90, effect: { type: 'recoil', damagePercent: 0.15 } },
  // Earthquake: Ground shaking power - massive AoE damage
  Earthquake: { type: 'Fighting', damage: 38, warmup: 4, cooldown: 5, stamina: 52, cost: 85, effect: { type: 'debuff_speed', chance: 0.5, duration: 4 } },
  // AuraSphere: Reliable special fighting - debuffs instinct
  AuraSphere: { type: 'Fighting', damage: 32, warmup: 3, cooldown: 4, stamina: 50, cost: 80, effect: { type: 'debuff_instinct', chance: 0.3, duration: 5 } },
  // DynamicPunch: Guaranteed confuse - powerful but risky
  DynamicPunch: { type: 'Fighting', damage: 36, warmup: 4, cooldown: 5, stamina: 55, cost: 85, effect: { type: 'confuse', chance: 1.0, duration: 4 } },

  // === NORMAL HIGH-TIER ===
  // DoubleEdge: Maximum normal damage with harsh recoil
  DoubleEdge: { type: 'Normal', damage: 42, warmup: 3, cooldown: 5, stamina: 55, cost: 85, effect: { type: 'recoil', damagePercent: 0.3 } },
  // HyperBeam: Ultimate normal nuke - exhausts you after
  HyperBeam: { type: 'Normal', damage: 50, warmup: 6, cooldown: 8, stamina: 70, cost: 95, effect: { type: 'exhaust', duration: 3 } },
  // StoneEdge: Rock coverage - high crit chance
  StoneEdge: { type: 'Normal', damage: 34, warmup: 3, cooldown: 4, stamina: 50, cost: 80, effect: { type: 'high_crit' } },

  // ============================================================================
  // PREMIUM/SIGNATURE MOVES (Cost 100-150) - Elite moves
  // These are the crown jewels - difficult to obtain but game-changing
  // ============================================================================

  // === LEGENDARY FIRE ===
  SacredFire: { type: 'Fire', damage: 45, warmup: 5, cooldown: 6, stamina: 80, cost: 120, effect: { type: 'burn', chance: 0.6, duration: 5, damage: 5 } },
  BlueFlare: { type: 'Fire', damage: 48, warmup: 5, cooldown: 6, stamina: 85, cost: 130, effect: { type: 'burn', chance: 0.5, duration: 5, damage: 6 } },
  BlastBurn: { type: 'Fire', damage: 55, warmup: 6, cooldown: 8, stamina: 75, cost: 140, effect: { type: 'exhaust', duration: 2 } },

  // === LEGENDARY WATER ===
  OriginPulse: { type: 'Water', damage: 48, warmup: 5, cooldown: 6, stamina: 85, cost: 125, effect: { type: 'debuff_defense', chance: 0.4, duration: 5 } },
  SheerCold: { type: 'Water', damage: 75, warmup: 6, cooldown: 10, stamina: 80, cost: 135, effect: { type: 'freeze', chance: 0.6, duration: 5 } },
  SurgingStrikes: { type: 'Water', damage: 35, warmup: 3, cooldown: 5, stamina: 60, cost: 115, effect: { type: 'high_crit' } },

  // === LEGENDARY GRASS ===
  DragonAscent: { type: 'Grass', damage: 50, warmup: 5, cooldown: 6, stamina: 88, cost: 130, effect: { type: 'recoil', damagePercent: 0.15 } },
  Frenzy: { type: 'Grass', damage: 55, warmup: 6, cooldown: 8, stamina: 75, cost: 140, effect: { type: 'exhaust', duration: 2 } },

  // === LEGENDARY PSYCHIC ===
  Psystrike: { type: 'Psychic', damage: 45, warmup: 5, cooldown: 6, stamina: 85, cost: 125, effect: { type: 'debuff_defense', chance: 0.6, duration: 6 } },
  ShadowForce: { type: 'Psychic', damage: 42, warmup: 4, cooldown: 6, stamina: 80, cost: 120, effect: { type: 'evasion', duration: 2 } },
  MoongeistBeam: { type: 'Psychic', damage: 48, warmup: 5, cooldown: 6, stamina: 85, cost: 130, effect: { type: 'debuff_instinct', chance: 0.5, duration: 6 } },

  // === LEGENDARY ELECTRIC ===
  BoltStrike: { type: 'Electric', damage: 48, warmup: 5, cooldown: 6, stamina: 85, cost: 125, effect: { type: 'paralyze', chance: 0.5, duration: 5 } },
  FusionBolt: { type: 'Electric', damage: 45, warmup: 4, cooldown: 5, stamina: 80, cost: 120, effect: { type: 'buff_attack', duration: 6 } },

  // === LEGENDARY FIGHTING ===
  RoarOfTime: { type: 'Fighting', damage: 55, warmup: 7, cooldown: 8, stamina: 95, cost: 145, effect: { type: 'exhaust', duration: 3 } },
  SpacialRend: { type: 'Water', damage: 48, warmup: 5, cooldown: 6, stamina: 85, cost: 125, effect: { type: 'high_crit' } },
  PrecipiceBlades: { type: 'Fighting', damage: 52, warmup: 6, cooldown: 7, stamina: 90, cost: 135, effect: { type: 'debuff_speed', chance: 0.6, duration: 5 } },

  // === LEGENDARY NORMAL ===
  GigaImpact: { type: 'Normal', damage: 55, warmup: 6, cooldown: 8, stamina: 75, cost: 140, effect: { type: 'exhaust', duration: 2 } },
  Explosion: { type: 'Normal', damage: 70, warmup: 5, cooldown: 10, stamina: 90, cost: 150, effect: { type: 'self_ko' } },

  // ============================================================================
  // BUFF/DEBUFF MOVES - Strategic support options
  // ============================================================================

  // === BUFF MOVES ===
  SwordsDance: { type: 'Fighting', damage: 0, warmup: 1, cooldown: 5, stamina: 30, cost: 65, effect: { type: 'buff_attack', duration: 12, strength: 2 } },
  DragonDance: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 75, effect: { type: 'buff_attack_speed', duration: 10 } },
  CalmMind: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 5, stamina: 30, cost: 65, effect: { type: 'buff_instinct', duration: 12 } },
  Agility: { type: 'Psychic', damage: 0, warmup: 0, cooldown: 4, stamina: 25, cost: 55, effect: { type: 'buff_speed', duration: 12, strength: 2 } },
  IronDefense: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 60, effect: { type: 'buff_defense', duration: 12, strength: 2 } },
  NastyPlot: { type: 'Psychic', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 70, effect: { type: 'buff_instinct', duration: 12, strength: 2 } },
  BulkUp: { type: 'Fighting', damage: 0, warmup: 1, cooldown: 5, stamina: 30, cost: 60, effect: { type: 'buff_attack_defense', duration: 10 } },
  ShellSmash: { type: 'Normal', damage: 0, warmup: 2, cooldown: 7, stamina: 40, cost: 85, effect: { type: 'buff_attack_speed', duration: 10 } },

  // === DEBUFF MOVES ===
  Growl: { type: 'Normal', damage: 0, warmup: 0, cooldown: 2, stamina: 12, cost: 25, effect: { type: 'debuff_attack', duration: 6 } },
  Leer: { type: 'Normal', damage: 0, warmup: 0, cooldown: 2, stamina: 12, cost: 25, effect: { type: 'debuff_defense', duration: 6 } },
  ScaryFace: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 18, cost: 32, effect: { type: 'debuff_speed', duration: 8, strength: 2 } },
  Screech: { type: 'Normal', damage: 0, warmup: 0, cooldown: 4, stamina: 22, cost: 40, effect: { type: 'debuff_defense', duration: 8, strength: 2 } },

  // === HEALING MOVES ===
  Recover: { type: 'Normal', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 70, effect: { type: 'heal_self', healPercent: 0.5 } },
  Roost: { type: 'Normal', damage: 0, warmup: 1, cooldown: 5, stamina: 30, cost: 60, effect: { type: 'heal_self', healPercent: 0.4 } },
  Synthesis: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 58, effect: { type: 'heal_self', healPercent: 0.45 } },
  MilkDrink: { type: 'Normal', damage: 0, warmup: 1, cooldown: 5, stamina: 30, cost: 55, effect: { type: 'heal_self', healPercent: 0.4 } },
  Rest: { type: 'Normal', damage: 0, warmup: 3, cooldown: 8, stamina: 50, cost: 75, effect: { type: 'heal_self', healPercent: 0.8 } },

  // === STATUS MOVES ===
  Toxic: { type: 'Grass', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 55, effect: { type: 'badly_poison', duration: 10 } },
  WillOWisp: { type: 'Fire', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 55, effect: { type: 'burn', chance: 0.9, duration: 6, damage: 5 } },

  // === WEATHER MOVES ===
  RainDance: { type: 'Water', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 60, effect: { type: 'weather_rain', duration: 8 } },
  SunnyDay: { type: 'Fire', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 60, effect: { type: 'weather_sun', duration: 8 } },
  Sandstorm: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 60, effect: { type: 'weather_sand', duration: 8 } },
  Hail: { type: 'Water', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 60, effect: { type: 'weather_hail', duration: 8 } },

  // === TERRAIN MOVES ===
  PsychicTerrain: { type: 'Psychic', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 65, effect: { type: 'terrain_psychic', duration: 8 } },
  ElectricTerrain: { type: 'Electric', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 65, effect: { type: 'terrain_electric', duration: 8 } },
  GrassyTerrain: { type: 'Grass', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 65, effect: { type: 'terrain_grassy', duration: 8 } },

  // ============================================================================
  // ADDITIONAL MOVES - Curated selection with raised costs for premium options
  // ============================================================================

  // === CHIPPER/QUICK MOVES (Cost 35-50) - Fast chip damage options ===
  Incinerate: { type: 'Fire', damage: 15, warmup: 0, cooldown: 2, stamina: 22, cost: 38, effect: { type: 'burn', chance: 0.1, duration: 2, damage: 1 } },
  BubbleBeam: { type: 'Water', damage: 16, warmup: 0, cooldown: 2, stamina: 22, cost: 38, effect: { type: 'debuff_speed', chance: 0.15, duration: 4 } },
  BulletSeed: { type: 'Grass', damage: 12, warmup: 0, cooldown: 2, stamina: 20, cost: 35, effect: { type: 'consecutive_boost', maxHits: 5 } },
  MegaDrain: { type: 'Grass', damage: 14, warmup: 0, cooldown: 2, stamina: 22, cost: 40, effect: { type: 'drain', chance: 0.5, healPercent: 0.3 } },
  Spark: { type: 'Electric', damage: 16, warmup: 0, cooldown: 2, stamina: 22, cost: 38, effect: { type: 'paralyze', chance: 0.2, duration: 2 } },
  ChargeBeam: { type: 'Electric', damage: 12, warmup: 0, cooldown: 3, stamina: 20, cost: 42, effect: { type: 'buff_instinct', chance: 0.8, duration: 6 } },
  Confusion: { type: 'Psychic', damage: 14, warmup: 0, cooldown: 2, stamina: 20, cost: 35, effect: { type: 'confuse', chance: 0.15, duration: 2 } },
  ForcePalm: { type: 'Fighting', damage: 16, warmup: 0, cooldown: 2, stamina: 22, cost: 38, effect: { type: 'paralyze', chance: 0.25, duration: 2 } },
  Bite: { type: 'Normal', damage: 16, warmup: 0, cooldown: 2, stamina: 20, cost: 35, effect: { type: 'flinch', chance: 0.25 } },
  Swift: { type: 'Normal', damage: 18, warmup: 0, cooldown: 2, stamina: 24, cost: 42, effect: null },

  // === COVERAGE MOVES (Cost 55-75) - Type coverage and utility ===
  AirSlash: { type: 'Normal', damage: 26, warmup: 2, cooldown: 3, stamina: 42, cost: 58, effect: { type: 'flinch', chance: 0.35 } },
  IcePunch: { type: 'Water', damage: 24, warmup: 2, cooldown: 3, stamina: 40, cost: 55, effect: { type: 'freeze', chance: 0.15, duration: 3 } },
  FirePunch: { type: 'Fire', damage: 24, warmup: 2, cooldown: 3, stamina: 40, cost: 55, effect: { type: 'burn', chance: 0.2, duration: 3, damage: 2 } },
  ThunderFang: { type: 'Electric', damage: 22, warmup: 1, cooldown: 3, stamina: 38, cost: 52, effect: { type: 'paralyze', chance: 0.25, duration: 3 } },
  Crunch: { type: 'Psychic', damage: 26, warmup: 2, cooldown: 3, stamina: 42, cost: 58, effect: { type: 'debuff_defense', chance: 0.25, duration: 6 } },
  CrossChop: { type: 'Fighting', damage: 32, warmup: 3, cooldown: 4, stamina: 50, cost: 68, effect: { type: 'high_crit' } },
  Waterfall: { type: 'Water', damage: 28, warmup: 2, cooldown: 3, stamina: 44, cost: 62, effect: { type: 'flinch', chance: 0.3 } },
  Liquidation: { type: 'Water', damage: 30, warmup: 2, cooldown: 3, stamina: 45, cost: 65, effect: { type: 'debuff_defense', chance: 0.3, duration: 6 } },
  SeedBomb: { type: 'Grass', damage: 28, warmup: 2, cooldown: 3, stamina: 44, cost: 60, effect: null },
  EnergyBall: { type: 'Grass', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 65, effect: { type: 'debuff_defense', chance: 0.15, duration: 8 } },

  // === PUNCHING MOVES (Cost 50-65) - Physical contact options ===
  BulletPunch: { type: 'Fighting', damage: 14, warmup: 0, cooldown: 2, stamina: 22, cost: 48, effect: { type: 'buff_speed', chance: 0.3, duration: 3 } },
  IronHead: { type: 'Normal', damage: 28, warmup: 2, cooldown: 3, stamina: 44, cost: 62, effect: { type: 'flinch', chance: 0.35 } },
  IronTail: { type: 'Normal', damage: 32, warmup: 3, cooldown: 4, stamina: 52, cost: 72, effect: { type: 'debuff_defense', chance: 0.35, duration: 5 } },

  // === DRAGON-THEMED MOVES (Cost 70-95) - Powerful coverage ===
  DragonClaw: { type: 'Fighting', damage: 30, warmup: 2, cooldown: 3, stamina: 45, cost: 68, effect: null },
  DragonPulse: { type: 'Fire', damage: 32, warmup: 3, cooldown: 4, stamina: 48, cost: 72, effect: null },
  DracoMeteor: { type: 'Fire', damage: 48, warmup: 5, cooldown: 6, stamina: 70, cost: 105, effect: { type: 'debuff_instinct_self', duration: 8 } },
  Outrage: { type: 'Fighting', damage: 42, warmup: 4, cooldown: 6, stamina: 60, cost: 95, effect: { type: 'confuse_self_after', duration: 3 } },

  // === ADDITIONAL BUFF MOVES (Cost 40-60) ===
  Harden: { type: 'Normal', damage: 0, warmup: 0, cooldown: 3, stamina: 18, cost: 35, effect: { type: 'buff_defense', duration: 6 } },
  Barrier: { type: 'Psychic', damage: 0, warmup: 0, cooldown: 4, stamina: 25, cost: 48, effect: { type: 'buff_defense', duration: 10 } },
  Amnesia: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 5, stamina: 30, cost: 52, effect: { type: 'buff_instinct', duration: 10 } },
  RockPolish: { type: 'Fighting', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 48, effect: { type: 'buff_speed', duration: 8 } },
  Coil: { type: 'Grass', damage: 0, warmup: 1, cooldown: 5, stamina: 32, cost: 58, effect: { type: 'buff_attack_defense', duration: 8 } },

  // === ADDITIONAL DEBUFF MOVES (Cost 30-45) ===
  TailWhip: { type: 'Normal', damage: 0, warmup: 0, cooldown: 2, stamina: 15, cost: 30, effect: { type: 'debuff_defense', duration: 8 } },
  StringShot: { type: 'Grass', damage: 0, warmup: 0, cooldown: 2, stamina: 12, cost: 28, effect: { type: 'debuff_speed', duration: 6 } },
  Smokescreen: { type: 'Fire', damage: 0, warmup: 0, cooldown: 3, stamina: 18, cost: 35, effect: { type: 'debuff_accuracy', duration: 6 } },
  SandAttack: { type: 'Fighting', damage: 0, warmup: 0, cooldown: 3, stamina: 15, cost: 32, effect: { type: 'debuff_accuracy', duration: 5 } },
  Charm: { type: 'Normal', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 42, effect: { type: 'debuff_attack', duration: 8 } },
  FakeTears: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 4, stamina: 25, cost: 42, effect: { type: 'debuff_defense', duration: 8 } },

  // === HIGH-RISK HIGH-REWARD MOVES (Cost 80-110) ===
  FocusBlast: { type: 'Fighting', damage: 42, warmup: 4, cooldown: 5, stamina: 58, cost: 92, effect: { type: 'debuff_defense', chance: 0.35, duration: 5 } },
  Hurricane: { type: 'Normal', damage: 40, warmup: 4, cooldown: 5, stamina: 60, cost: 90, effect: { type: 'confuse', chance: 0.35, duration: 3 } },
  HammerArm: { type: 'Fighting', damage: 38, warmup: 4, cooldown: 5, stamina: 55, cost: 82, effect: { type: 'debuff_speed_self', duration: 8 } },
  Superpower: { type: 'Fighting', damage: 42, warmup: 4, cooldown: 5, stamina: 58, cost: 88, effect: { type: 'debuff_attack_self', duration: 8 } },
  HeadSmash: { type: 'Fighting', damage: 48, warmup: 5, cooldown: 6, stamina: 68, cost: 100, effect: { type: 'recoil', damagePercent: 0.35 } },
  BraveBird: { type: 'Normal', damage: 42, warmup: 3, cooldown: 5, stamina: 58, cost: 88, effect: { type: 'recoil', damagePercent: 0.25 } },
  VoltTackle: { type: 'Electric', damage: 42, warmup: 4, cooldown: 5, stamina: 60, cost: 92, effect: { type: 'recoil', damagePercent: 0.25, paralyze_chance: 0.2 } },

  // === UNIQUE UTILITY MOVES (Cost 55-85) ===
  Hex: { type: 'Psychic', damage: 22, warmup: 2, cooldown: 3, stamina: 38, cost: 55, effect: { type: 'double_if_status' } },
  Brine: { type: 'Water', damage: 28, warmup: 2, cooldown: 3, stamina: 38, cost: 55, effect: { type: 'debuff_defense', chance: 0.25, duration: 4 } },
  Facade: { type: 'Normal', damage: 28, warmup: 2, cooldown: 3, stamina: 40, cost: 58, effect: null },
  Reversal: { type: 'Fighting', damage: 28, warmup: 1, cooldown: 3, stamina: 35, cost: 52, effect: { type: 'buff_attack', chance: 0.3, duration: 5 } },
  StoredPower: { type: 'Psychic', damage: 22, warmup: 2, cooldown: 3, stamina: 35, cost: 55, effect: { type: 'buff_instinct', chance: 0.3, duration: 5 } },
  Metronome: { type: 'Normal', damage: 0, warmup: 2, cooldown: 5, stamina: 35, cost: 50, effect: { type: 'random_move' } },
  DestinyBond: { type: 'Psychic', damage: 0, warmup: 3, cooldown: 10, stamina: 50, cost: 75, effect: { type: 'destiny_bond', duration: 2 } },
  Curse: { type: 'Psychic', damage: 0, warmup: 3, cooldown: 7, stamina: 45, cost: 65, effect: { type: 'curse', duration: 6, damage: 8 } },

  // === HAZARD MOVES (Cost 50-65) ===
  Spikes: { type: 'Normal', damage: 0, warmup: 2, cooldown: 6, stamina: 32, cost: 55, effect: { type: 'entry_hazard', layers: 3 } },
  StealthRock: { type: 'Fighting', damage: 0, warmup: 2, cooldown: 6, stamina: 32, cost: 58, effect: { type: 'entry_hazard_rock' } },
  RapidSpin: { type: 'Normal', damage: 15, warmup: 1, cooldown: 2, stamina: 25, cost: 45, effect: { type: 'remove_hazards' } },

  // === ADDITIONAL HEAL MOVES (Cost 55-80) ===
  Moonlight: { type: 'Normal', damage: 0, warmup: 3, cooldown: 7, stamina: 45, cost: 65, effect: { type: 'heal_self', healPercent: 0.5 } },
  SlackOff: { type: 'Normal', damage: 0, warmup: 3, cooldown: 7, stamina: 45, cost: 62, effect: { type: 'heal_self', healPercent: 0.5 } },
  LeechSeed: { type: 'Grass', damage: 0, warmup: 2, cooldown: 6, stamina: 30, cost: 52, effect: { type: 'poison', duration: 8, damage: 3, chance: 0.9 } },
  AquaRing: { type: 'Water', damage: 0, warmup: 2, cooldown: 5, stamina: 30, cost: 55, effect: { type: 'regen', duration: 10, healPercent: 0.08 } },
  Wish: { type: 'Normal', damage: 0, warmup: 2, cooldown: 7, stamina: 35, cost: 60, effect: { type: 'delayed_heal', healPercent: 0.5 } },

  // === ADDITIONAL SIGNATURE/PREMIUM MOVES (Cost 100-140) ===
  Eruption: { type: 'Fire', damage: 50, warmup: 5, cooldown: 6, stamina: 75, cost: 115, effect: { type: 'hp_based_damage' } },
  WaterSpout: { type: 'Water', damage: 50, warmup: 5, cooldown: 6, stamina: 75, cost: 115, effect: { type: 'hp_based_damage' } },
  GMaxWildfire: { type: 'Fire', damage: 50, warmup: 5, cooldown: 7, stamina: 80, cost: 125, effect: { type: 'burn', chance: 0.6, duration: 6, damage: 6 } },
  WickedBlow: { type: 'Psychic', damage: 38, warmup: 3, cooldown: 5, stamina: 55, cost: 110, effect: { type: 'high_crit' } },
  DynamaxCannon: { type: 'Psychic', damage: 45, warmup: 5, cooldown: 6, stamina: 70, cost: 115, effect: { type: 'debuff_defense', chance: 0.4, duration: 5 } },
  BehemothBlade: { type: 'Normal', damage: 45, warmup: 4, cooldown: 5, stamina: 65, cost: 115, effect: { type: 'high_crit' } },
  BehemothBash: { type: 'Normal', damage: 42, warmup: 4, cooldown: 5, stamina: 62, cost: 110, effect: { type: 'buff_defense', chance: 0.5, duration: 8 } },
  SacredSword: { type: 'Fighting', damage: 35, warmup: 2, cooldown: 3, stamina: 50, cost: 95, effect: { type: 'debuff_defense', chance: 0.5, duration: 5 } },
  TeraStarstorm: { type: 'Normal', damage: 42, warmup: 4, cooldown: 5, stamina: 65, cost: 110, effect: { type: 'buff_all', chance: 0.25 } },
  GigatonHammer: { type: 'Normal', damage: 52, warmup: 5, cooldown: 8, stamina: 75, cost: 125, effect: { type: 'exhaust', duration: 2 } },
  IvyCudgel: { type: 'Grass', damage: 35, warmup: 3, cooldown: 4, stamina: 50, cost: 92, effect: { type: 'high_crit' } },

  // === MISCELLANEOUS MOVES needed for support cards ===
  Slash: { type: 'Normal', damage: 24, warmup: 2, cooldown: 3, stamina: 40, cost: 52, effect: { type: 'high_crit' } },
  AncientPower: { type: 'Normal', damage: 20, warmup: 2, cooldown: 3, stamina: 38, cost: 55, effect: { type: 'buff_all', chance: 0.12 } },
  Moonblast: { type: 'Normal', damage: 32, warmup: 3, cooldown: 4, stamina: 50, cost: 70, effect: { type: 'debuff_instinct', chance: 0.35, duration: 6 } },
  DazzlingGleam: { type: 'Normal', damage: 28, warmup: 3, cooldown: 4, stamina: 48, cost: 65, effect: { type: 'debuff_instinct', chance: 0.25, duration: 4 } },
  PlayRough: { type: 'Normal', damage: 30, warmup: 2, cooldown: 4, stamina: 48, cost: 68, effect: { type: 'debuff_attack', chance: 0.25, duration: 5 } },
  FlashCannon: { type: 'Normal', damage: 28, warmup: 3, cooldown: 4, stamina: 48, cost: 65, effect: { type: 'debuff_defense', chance: 0.15, duration: 8 } },
  MeteorMash: { type: 'Normal', damage: 32, warmup: 3, cooldown: 4, stamina: 52, cost: 72, effect: { type: 'buff_attack', chance: 0.25, duration: 8 } },
  SteelWing: { type: 'Normal', damage: 24, warmup: 1, cooldown: 3, stamina: 38, cost: 52, effect: { type: 'buff_defense', chance: 0.15, duration: 5 } },
  HeatWave: { type: 'Fire', damage: 32, warmup: 4, cooldown: 5, stamina: 55, cost: 72, effect: { type: 'burn', chance: 0.25, duration: 3, damage: 3 } },
  SludgeBomb: { type: 'Grass', damage: 30, warmup: 3, cooldown: 4, stamina: 50, cost: 68, effect: { type: 'poison', chance: 0.45, duration: 8, damage: 5 } },
  PoisonJab: { type: 'Grass', damage: 28, warmup: 2, cooldown: 3, stamina: 45, cost: 62, effect: { type: 'poison', chance: 0.35, duration: 6, damage: 4 } },
  CrossPoison: { type: 'Grass', damage: 24, warmup: 2, cooldown: 3, stamina: 40, cost: 55, effect: { type: 'poison', chance: 0.2, duration: 6, damage: 3, high_crit: true } },
  DarkPulse: { type: 'Psychic', damage: 28, warmup: 2, cooldown: 3, stamina: 45, cost: 62, effect: { type: 'flinch', chance: 0.25 } },
  KnockOff: { type: 'Psychic', damage: 22, warmup: 1, cooldown: 3, stamina: 38, cost: 52, effect: { type: 'debuff_attack', chance: 0.4, duration: 5 } },
  SuckerPunch: { type: 'Psychic', damage: 26, warmup: 0, cooldown: 3, stamina: 38, cost: 58, effect: { type: 'flinch', chance: 0.3 } },
  FoulPlay: { type: 'Psychic', damage: 30, warmup: 3, cooldown: 4, stamina: 48, cost: 68, effect: { type: 'use_opponent_attack' } },
  BodyPress: { type: 'Fighting', damage: 28, warmup: 3, cooldown: 4, stamina: 48, cost: 68, effect: { type: 'buff_defense', chance: 0.25, duration: 5 } },
  Taunt: { type: 'Psychic', damage: 0, warmup: 0, cooldown: 4, stamina: 22, cost: 42, effect: { type: 'debuff_instinct', duration: 4 } },
  Reflect: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 6, stamina: 30, cost: 55, effect: { type: 'buff_defense', duration: 8, team: true } },
  LightScreen: { type: 'Psychic', damage: 0, warmup: 1, cooldown: 6, stamina: 30, cost: 55, effect: { type: 'buff_instinct', duration: 8, team: true } },
  MistyTerrain: { type: 'Normal', damage: 0, warmup: 2, cooldown: 6, stamina: 35, cost: 65, effect: { type: 'terrain_misty', duration: 8 } },
  HyperVoice: { type: 'Normal', damage: 30, warmup: 2, cooldown: 3, stamina: 48, cost: 65, effect: null },
  UTurn: { type: 'Normal', damage: 22, warmup: 1, cooldown: 3, stamina: 35, cost: 52, effect: { type: 'energize', chance: 0.5, staminaBoost: 8 } },
  Extrasensory: { type: 'Psychic', damage: 26, warmup: 2, cooldown: 3, stamina: 42, cost: 58, effect: { type: 'flinch', chance: 0.15 } },
  ZenHeadbutt: { type: 'Psychic', damage: 28, warmup: 2, cooldown: 4, stamina: 42, cost: 62, effect: { type: 'flinch', chance: 0.25 } },
  PsychoCut: { type: 'Psychic', damage: 24, warmup: 1, cooldown: 3, stamina: 38, cost: 52, effect: { type: 'high_crit' } },
  Nuzzle: { type: 'Electric', damage: 10, warmup: 0, cooldown: 2, stamina: 18, cost: 38, effect: { type: 'paralyze', chance: 1.0, duration: 4 } },
  Electroweb: { type: 'Electric', damage: 18, warmup: 1, cooldown: 3, stamina: 32, cost: 48, effect: { type: 'debuff_speed', chance: 1.0, duration: 5 } },
  ShockWave: { type: 'Electric', damage: 20, warmup: 0, cooldown: 2, stamina: 30, cost: 45, effect: { type: 'paralyze', chance: 0.15, duration: 3 } },
  Overdrive: { type: 'Electric', damage: 28, warmup: 2, cooldown: 3, stamina: 45, cost: 62, effect: { type: 'paralyze', chance: 0.2, duration: 3 } },
  ElectroDrift: { type: 'Electric', damage: 38, warmup: 4, cooldown: 5, stamina: 58, cost: 85, effect: { type: 'buff_speed', chance: 0.35, duration: 5 } },
  FireLash: { type: 'Fire', damage: 28, warmup: 2, cooldown: 3, stamina: 45, cost: 62, effect: { type: 'debuff_defense', chance: 1.0, duration: 6 } },
  HeatCrash: { type: 'Fire', damage: 30, warmup: 2, cooldown: 3, stamina: 48, cost: 65, effect: { type: 'flinch', chance: 0.3 } },
  FreezeDry: { type: 'Water', damage: 24, warmup: 2, cooldown: 3, stamina: 40, cost: 58, effect: { type: 'freeze', chance: 0.15, duration: 3 } },
  Dive: { type: 'Water', damage: 28, warmup: 3, cooldown: 4, stamina: 45, cost: 62, effect: { type: 'evasion', duration: 1 } },
  TripleAxel: { type: 'Water', damage: 28, warmup: 3, cooldown: 4, stamina: 50, cost: 68, effect: { type: 'consecutive_boost', maxHits: 3 } },
  HornLeech: { type: 'Grass', damage: 26, warmup: 2, cooldown: 3, stamina: 42, cost: 58, effect: { type: 'drain', chance: 1.0, healPercent: 0.35 } },
  CottonGuard: { type: 'Grass', damage: 0, warmup: 2, cooldown: 7, stamina: 40, cost: 65, effect: { type: 'buff_defense', duration: 12, strength: 3 } },
  Megahorn: { type: 'Grass', damage: 40, warmup: 4, cooldown: 5, stamina: 58, cost: 85, effect: null },
  Sing: { type: 'Normal', damage: 0, warmup: 1, cooldown: 6, stamina: 25, cost: 45, effect: { type: 'sleep', chance: 0.55, duration: 3 } },
  Attract: { type: 'Normal', damage: 0, warmup: 1, cooldown: 6, stamina: 28, cost: 48, effect: { type: 'infatuate', chance: 0.5, duration: 4 } },
  Encore: { type: 'Normal', damage: 0, warmup: 1, cooldown: 6, stamina: 28, cost: 52, effect: { type: 'confuse', chance: 0.6, duration: 4 } },
  Present: { type: 'Normal', damage: 20, warmup: 1, cooldown: 3, stamina: 32, cost: 45, effect: { type: 'random_damage_or_heal' } },
  Rollout: { type: 'Normal', damage: 12, warmup: 1, cooldown: 2, stamina: 25, cost: 42, effect: { type: 'consecutive_boost', maxHits: 5 } },
  Headbutt: { type: 'Normal', damage: 22, warmup: 2, cooldown: 3, stamina: 38, cost: 52, effect: { type: 'flinch', chance: 0.35 } },
  Stomp: { type: 'Normal', damage: 22, warmup: 1, cooldown: 3, stamina: 38, cost: 52, effect: { type: 'flinch', chance: 0.35 } },
  SkyAttack: { type: 'Normal', damage: 38, warmup: 4, cooldown: 5, stamina: 60, cost: 85, effect: { type: 'high_crit' } },
  SpiritBreak: { type: 'Normal', damage: 28, warmup: 2, cooldown: 3, stamina: 45, cost: 62, effect: { type: 'debuff_instinct', chance: 1.0, duration: 6 } },
  BoomBurst: { type: 'Normal', damage: 38, warmup: 4, cooldown: 5, stamina: 58, cost: 82, effect: null },
  ShiftGear: { type: 'Normal', damage: 0, warmup: 1, cooldown: 5, stamina: 30, cost: 65, effect: { type: 'buff_attack_speed', duration: 10 } },
  DrainingKiss: { type: 'Normal', damage: 18, warmup: 1, cooldown: 3, stamina: 32, cost: 48, effect: { type: 'drain', chance: 1.0, healPercent: 0.6 } },
  RockTomb: { type: 'Fighting', damage: 20, warmup: 2, cooldown: 3, stamina: 38, cost: 52, effect: { type: 'debuff_speed', chance: 1.0, duration: 5 } },
  EarthPower: { type: 'Fighting', damage: 32, warmup: 3, cooldown: 4, stamina: 50, cost: 72, effect: { type: 'debuff_defense', chance: 0.15, duration: 6 } },
  HighHorsepower: { type: 'Fighting', damage: 34, warmup: 3, cooldown: 4, stamina: 52, cost: 75, effect: null },
  CollisionCourse: { type: 'Fighting', damage: 42, warmup: 4, cooldown: 5, stamina: 60, cost: 95, effect: { type: 'recoil', damagePercent: 0.15 } },
  DiamondStorm: { type: 'Fighting', damage: 36, warmup: 4, cooldown: 5, stamina: 58, cost: 88, effect: { type: 'buff_defense', chance: 0.55, duration: 8 } }
};
