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
    INSTINCT_DODGE_DENOMINATOR: 2786,
    BASE_CRIT_CHANCE: 0.05,
    INSTINCT_CRIT_DENOMINATOR: 800
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

// Type to color mapping for aptitude lookups
const TYPE_TO_COLOR = {
  Fire: 'Red',
  Water: 'Blue',
  Grass: 'Green',
  Electric: 'Yellow',
  Psychic: 'Purple',
  Fighting: 'Orange',
  Poison: 'Purple',
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
    battleLog: []
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
      message: null
    });

    // Process player 1
    const p1Message = processCombatantTick(battleState.player1, battleState.player2, 'Player 1');
    if (p1Message) {
      battleState.battleLog[battleState.battleLog.length - 1].message = p1Message;
    }

    // Process player 2 if still alive
    if (battleState.player2.currentHP > 0) {
      const p2Message = processCombatantTick(battleState.player2, battleState.player1, 'Player 2');
      if (p2Message) {
        const lastLog = battleState.battleLog[battleState.battleLog.length - 1];
        lastLog.message = lastLog.message ? `${lastLog.message} | ${p2Message}` : p2Message;
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
function processCombatantTick(combatant, opponent, name) {
  const messages = [];

  // Initialize move states on first tick
  combatant.abilities.forEach(moveName => {
    if (!combatant.moveStates[moveName]) {
      const move = MOVES[moveName];
      if (!move) {
        console.error(`[Battle] Move not found: ${moveName}`);
        return;
      }
      const strategyMult = GAME_CONFIG.STRATEGY[combatant.strategy] || GAME_CONFIG.STRATEGY.Balanced;
      combatant.moveStates[moveName] = {
        warmupRemaining: Math.ceil(move.warmup * strategyMult.warmup_mult),
        cooldownRemaining: 0,
        everCast: false
      };
    }
  });

  // Calculate available moves
  const isExhausted = combatant.statusEffects.some(e => e.type === 'exhaust');
  const available = combatant.abilities.filter(moveName => {
    const move = MOVES[moveName];
    if (!move) return false;

    const state = combatant.moveStates[moveName];
    const strategyMult = GAME_CONFIG.STRATEGY[combatant.strategy] || GAME_CONFIG.STRATEGY.Balanced;
    const aptitudeMult = GAME_CONFIG.APTITUDE.MULTIPLIERS[combatant.strategyGrade] || 1.0;
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
    const moveMessage = executeMove(combatant, opponent, selectedMove, name);
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
 * Select which move to use based on strategy
 */
function selectMove(combatant, opponent, available) {
  // Calculate predicted damage for each move
  const movesWithPredictedDamage = available.map(moveName => {
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

    const strategyMult = GAME_CONFIG.STRATEGY[combatant.strategy] || GAME_CONFIG.STRATEGY.Balanced;
    const aptGradeMult = GAME_CONFIG.APTITUDE.MULTIPLIERS[combatant.strategyGrade] || 1.0;
    const staminaCost = Math.ceil(move.stamina * aptGradeMult);
    const adjustedCooldown = Math.ceil(move.cooldown * strategyMult.cooldown_mult);

    return {
      moveName,
      move,
      predictedDamage,
      damagePerStamina: predictedDamage / staminaCost,
      staminaCost,
      cooldown: adjustedCooldown,
      aptitude
    };
  });

  // Strategy-specific move selection
  if (combatant.strategy === 'Nuker') {
    if (Math.random() < 0.35) {
      return movesWithPredictedDamage[Math.floor(Math.random() * movesWithPredictedDamage.length)].moveName;
    } else {
      return movesWithPredictedDamage.sort((a, b) => b.predictedDamage - a.predictedDamage)[0].moveName;
    }
  } else if (combatant.strategy === 'Scaler') {
    if (Math.random() < 0.35) {
      return movesWithPredictedDamage[Math.floor(Math.random() * movesWithPredictedDamage.length)].moveName;
    } else {
      const opponentHealthPercent = (opponent.currentHP / opponent.stats.HP) * 100;

      if (opponentHealthPercent > 50) {
        const scored = movesWithPredictedDamage.map(m => ({
          ...m,
          score: m.damagePerStamina * 10 - m.cooldown * 2
        }));
        return scored.sort((a, b) => b.score - a.score)[0].moveName;
      } else {
        return movesWithPredictedDamage.sort((a, b) => b.predictedDamage - a.predictedDamage)[0].moveName;
      }
    }
  } else {
    // Balanced
    if (combatant.currentStamina < 30 && Math.random() < 0.5) {
      return null; // Don't cast
    }

    if (Math.random() < 0.35) {
      return movesWithPredictedDamage[Math.floor(Math.random() * movesWithPredictedDamage.length)].moveName;
    } else {
      const scored = movesWithPredictedDamage.map(m => ({
        ...m,
        score: (m.damagePerStamina * 0.6) + (m.predictedDamage / 100 * 0.4)
      }));
      return scored.sort((a, b) => b.score - a.score)[0].moveName;
    }
  }
}

/**
 * Execute a move and return battle message
 */
function executeMove(combatant, opponent, moveName, attackerName) {
  const move = MOVES[moveName];
  const strategyMult = GAME_CONFIG.STRATEGY[combatant.strategy] || GAME_CONFIG.STRATEGY.Balanced;
  const aptGradeMult = GAME_CONFIG.APTITUDE.MULTIPLIERS[combatant.strategyGrade] || 1.0;
  const staminaCost = Math.ceil(move.stamina * aptGradeMult);

  // Deduct stamina
  combatant.currentStamina = Math.max(0, combatant.currentStamina - staminaCost);
  combatant.isResting = false;

  // Check for paralysis accuracy penalty
  const isParalyzed = combatant.statusEffects.some(e => e.type === 'paralyze');
  const paralyzePenalty = isParalyzed ? 0.25 : 0;

  // Miss chance calculation
  const missChance = Math.max(0,
    (GAME_CONFIG.BATTLE.MAX_STAMINA - combatant.currentStamina) /
    GAME_CONFIG.BATTLE.MAX_STAMINA * 0.075) + paralyzePenalty;

  // Dodge chance when opponent is resting
  const dodgeChance = opponent.isResting
    ? GAME_CONFIG.BATTLE.BASE_DODGE_CHANCE +
      (opponent.stats.Instinct / GAME_CONFIG.BATTLE.INSTINCT_DODGE_DENOMINATOR)
    : 0;

  const hitRoll = Math.random();
  const hitChance = 1.0 - dodgeChance - missChance;

  if (hitRoll >= hitChance) {
    // MISS
    const state = combatant.moveStates[moveName];
    state.cooldownRemaining = Math.ceil(move.cooldown * strategyMult.cooldown_mult);
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

  // Base damage calculation
  const attackStat = combatant.stats.Attack;
  const defenseStat = opponent.stats.Defense;
  const baseDamage = move.damage * (attackStat / defenseStat);
  let damage = Math.floor(baseDamage * aptitudeMult * typeBonus);

  // Critical hit
  const critChance = GAME_CONFIG.BATTLE.BASE_CRIT_CHANCE +
                     (combatant.stats.Instinct / GAME_CONFIG.BATTLE.INSTINCT_CRIT_DENOMINATOR);
  const isCrit = Math.random() < critChance;
  if (isCrit) {
    damage = Math.floor(damage * 2);
  }

  damage = Math.max(1, damage);
  opponent.currentHP = Math.max(0, opponent.currentHP - damage);

  // Build message
  let message = `${attackerName} used ${moveName}! Dealt ${damage} damage!`;
  if (isCrit) message += ' *** CRITICAL HIT! ***';
  if (typeBonus > 1.0) message += ' Super effective!';

  // Apply status effects
  if (move.effect) {
    const effect = move.effect;

    if (effect.type === 'exhaust') {
      // Self-exhaust
      combatant.statusEffects.push({
        type: 'exhaust',
        duration: effect.duration,
        ticksRemaining: effect.duration
      });
      message += ` ${attackerName} is exhausted!`;
    } else if (Math.random() < (effect.chance || 1.0)) {
      // Apply effect to opponent
      opponent.statusEffects.push({
        type: effect.type,
        duration: effect.duration,
        ticksRemaining: effect.duration,
        damage: effect.damage,
        staminaBoost: effect.staminaBoost
      });
      message += ` Opponent is ${effect.type}!`;
    }
  }

  // Set cooldown
  const state = combatant.moveStates[moveName];
  state.cooldownRemaining = Math.ceil(move.cooldown * strategyMult.cooldown_mult);
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

    if (effect.type === 'burn' || effect.type === 'poison') {
      combatant.currentHP = Math.max(0, combatant.currentHP - effect.damage);
      messages.push(`${name} takes ${effect.damage} damage from ${effect.type}!`);
    } else if (effect.type === 'energize') {
      combatant.currentStamina = Math.min(GAME_CONFIG.BATTLE.MAX_STAMINA,
                                          combatant.currentStamina + effect.staminaBoost);
    } else if (effect.type === 'stun' && effect.ticksRemaining > 0) {
      messages.push(`${name} is stunned!`);
    }

    return effect.ticksRemaining > 0;
  });

  return messages;
}

module.exports = {
  simulateBattle,
  GAME_CONFIG,
  MOVES,
  TYPE_TO_COLOR
};
