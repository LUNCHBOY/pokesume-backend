/**
 * MATCHMAKER SERVICE
 * Background service that processes the PvP matchmaking queue
 * Runs every 5 seconds to match players and simulate battles
 */

const db = require('../config/database');
const { simulateBattle } = require('./battleSimulator');

// Configuration
const CONFIG = {
  POLL_INTERVAL_MS: 5000,        // Check queue every 5 seconds
  BASE_RATING_RANGE: 100,        // Initial rating range for matching
  RATING_EXPANSION_RATE: 2,      // Expand range by 2 per second
  MAX_RATING_RANGE: 500,         // Maximum rating range
  AI_TIMEOUT_SECONDS: 15,        // Generate AI opponent after 15 seconds
  K_FACTOR: 96,                  // Base Elo K-factor (tripled from 32)
  PLATINUM_RATING: 1400,         // Rating where inflation converges to 0
  MAX_INFLATION_BONUS: 0.5       // Max 50% bonus for wins / 50% reduction for losses at low rating
};

// Pokemon types and their colors
const TYPES = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Fighting'];
const TYPE_TO_COLOR = {
  Fire: 'Red',
  Water: 'Blue',
  Grass: 'Green',
  Electric: 'Yellow',
  Psychic: 'Purple',
  Fighting: 'Orange'
};

// Strategies (new paradigm)
const STRATEGIES = ['Scaler', 'Nuker', 'Debuffer', 'Chipper', 'MadLad'];
const STRATEGY_GRADES = ['C', 'B', 'B+', 'A', 'A+', 'S'];

// Pokemon names by type for AI generation
const POKEMON_NAMES_BY_TYPE = {
  Fire: ['Blaziken', 'Charizard', 'Infernape', 'Arcanine', 'Typhlosion', 'Magmortar', 'Houndoom', 'Ninetales', 'Rapidash', 'Flareon', 'Entei', 'Moltres', 'Delphox', 'Talonflame', 'Volcarona'],
  Water: ['Blastoise', 'Feraligatr', 'Swampert', 'Empoleon', 'Gyarados', 'Lapras', 'Vaporeon', 'Milotic', 'Kingdra', 'Starmie', 'Greninja', 'Primarina', 'Samurott', 'Suicune', 'Kyogre'],
  Grass: ['Venusaur', 'Meganium', 'Sceptile', 'Torterra', 'Leafeon', 'Roserade', 'Breloom', 'Serperior', 'Chesnaught', 'Decidueye', 'Vileplume', 'Victreebel', 'Exeggutor', 'Tangrowth', 'Celebi'],
  Electric: ['Pikachu', 'Raichu', 'Jolteon', 'Ampharos', 'Luxray', 'Electivire', 'Magnezone', 'Manectric', 'Zebstrika', 'Eelektross', 'Xurkitree', 'Zeraora', 'Raikou', 'Zapdos', 'Thundurus'],
  Psychic: ['Alakazam', 'Espeon', 'Gardevoir', 'Metagross', 'Reuniclus', 'Gothitelle', 'Delphox', 'Slowking', 'Hypno', 'Exeggutor', 'Starmie', 'Sigilyph', 'Beheeyem', 'Mew', 'Mewtwo'],
  Fighting: ['Machamp', 'Hitmonlee', 'Hitmonchan', 'Lucario', 'Conkeldurr', 'Mienshao', 'Heracross', 'Blaziken', 'Infernape', 'Gallade', 'Hawlucha', 'Kommo-o', 'Pangoro', 'Primeape', 'Poliwrath']
};

// Fake usernames for AI opponents
const AI_USERNAME_PREFIXES = ['Shadow', 'Storm', 'Fire', 'Ice', 'Thunder', 'Dragon', 'Mystic', 'Dark', 'Light', 'Cosmic', 'Cyber', 'Neo', 'Ultra', 'Mega', 'Alpha', 'Omega', 'Prime', 'Elite', 'Master', 'Pro'];
const AI_USERNAME_SUFFIXES = ['Trainer', 'Hunter', 'Master', 'Champion', 'Legend', 'Slayer', 'Knight', 'Warrior', 'Fighter', 'Ace', 'King', 'Queen', 'Lord', 'Boss', 'Hero', 'Star', 'Flash', 'Bolt', 'Blaze', 'Frost'];

/**
 * Generate a fake username for AI opponent
 */
function generateFakeUsername() {
  const prefix = AI_USERNAME_PREFIXES[Math.floor(Math.random() * AI_USERNAME_PREFIXES.length)];
  const suffix = AI_USERNAME_SUFFIXES[Math.floor(Math.random() * AI_USERNAME_SUFFIXES.length)];
  const number = Math.floor(Math.random() * 999) + 1;

  // Various formats to make it look natural
  const formats = [
    `${prefix}${suffix}`,
    `${prefix}${suffix}${number}`,
    `${prefix}_${suffix}`,
    `${prefix.toLowerCase()}${suffix}${number}`,
    `x${prefix}${suffix}x`,
    `The${prefix}${suffix}`,
    `${prefix}${number}`,
    `${suffix}${number}`,
  ];

  return formats[Math.floor(Math.random() * formats.length)];
}

// Moves organized by strategy type
const STRATEGY_MOVES = {
  // Buff moves for Scaler strategy
  Scaler: {
    Fire: ['SwordsDance', 'DragonDance', 'WorkUp'],
    Water: ['AquaRing', 'IronDefense', 'Harden'],
    Grass: ['Synthesis', 'SwordsDance', 'WorkUp'],
    Electric: ['ChargeBeam', 'Agility', 'WorkUp'],
    Psychic: ['CalmMind', 'NastyPlot', 'Meditate', 'Agility', 'CosmicPower'],
    Fighting: ['BulkUp', 'SwordsDance', 'DragonDance', 'RockPolish'],
    Generic: ['Harden', 'Sharpen', 'WorkUp', 'IronDefense']
  },
  // High damage moves for Nuker strategy
  Nuker: {
    Fire: ['FireBlast', 'FlareBlitz', 'BlastBurn', 'BlueFlare', 'Eruption', 'SacredFire'],
    Water: ['HydroPump', 'Blizzard', 'OriginPulse', 'SpacialRend'],
    Grass: ['SolarBeam', 'PowerWhip', 'DragonAscent', 'LeafBlade'],
    Electric: ['Thunder', 'WildCharge', 'Thunderbolt'],
    Psychic: ['PsychicBlast', 'Psystrike', 'FutureSight', 'DreamEater'],
    Fighting: ['CloseCombat', 'FocusBlast', 'RoarOfTime', 'DynamicPunch', 'DiamondStorm'],
    Generic: ['HyperBeam', 'Explosion', 'DoubleEdge', 'BraveBird']
  },
  // Debuff and weather moves for Debuffer strategy
  Debuffer: {
    Fire: ['WillOWisp', 'SunnyDay', 'Screech'],
    Water: ['RainDance', 'Hail', 'ThunderWave'],
    Grass: ['SleepPowder', 'Toxic', 'Screech', 'Leer'],
    Electric: ['ThunderWave', 'Screech', 'Confide'],
    Psychic: ['Hypnosis', 'Curse', 'FakeTearsMove', 'Confide'],
    Fighting: ['Sandstorm', 'SandAttack', 'Screech', 'Leer'],
    Generic: ['Growl', 'Leer', 'TailWhip', 'Screech', 'CharmMove', 'ScaryFace']
  },
  // Low stamina/cooldown moves for Chipper strategy
  Chipper: {
    Fire: ['Ember', 'FlameCharge', 'Incinerate', 'FireFang'],
    Water: ['WaterGun', 'AquaJet', 'BubbleBeam'],
    Grass: ['VineWhip', 'BulletSeed', 'MegaDrain', 'RazorLeaf'],
    Electric: ['ThunderShock', 'Spark', 'ChargeBeam', 'VoltSwitch'],
    Psychic: ['PsyBeam', 'Confusion', 'HeartStamp', 'FeintAttack'],
    Fighting: ['LowKick', 'MachPunch', 'ForceP', 'BulletPunch', 'KarateChop'],
    Generic: ['Tackle', 'QuickAttack', 'AerialAce', 'Slash', 'RapidSpin']
  },
  // Random/varied moves for MadLad strategy
  MadLad: {
    Fire: ['Ember', 'Flamethrower', 'FireBlast', 'WillOWisp', 'FlareBlitz'],
    Water: ['WaterGun', 'Surf', 'HydroPump', 'AquaRing', 'IceBeam'],
    Grass: ['VineWhip', 'RazorLeaf', 'SolarBeam', 'SleepPowder', 'GigaDrain'],
    Electric: ['ThunderShock', 'Thunderbolt', 'Thunder', 'ThunderWave'],
    Psychic: ['PsyBeam', 'Psychic', 'Hypnosis', 'CalmMind', 'ShadowBall'],
    Fighting: ['LowKick', 'BrickBreak', 'CloseCombat', 'BulkUp', 'DrainPunch'],
    Generic: ['Tackle', 'BodySlam', 'HyperBeam', 'Recover', 'Metronome']
  }
};

// High damage moves by type (for non-Chipper strategies to have a powerful attack)
const POWER_MOVES_BY_TYPE = {
  Fire: ['Flamethrower', 'FireBlast', 'FlareBlitz', 'LavaPlume', 'HeatWave'],
  Water: ['Surf', 'HydroPump', 'IceBeam', 'Waterfall', 'Blizzard'],
  Grass: ['RazorLeaf', 'SolarBeam', 'LeafBlade', 'PowerWhip', 'GigaDrain'],
  Electric: ['Thunderbolt', 'Thunder', 'WildCharge', 'VoltSwitch'],
  Psychic: ['Psychic', 'PsychicBlast', 'Psyshock', 'ShadowBall', 'DarkPulse'],
  Fighting: ['BrickBreak', 'CloseCombat', 'AuraSphere', 'DrainPunch', 'Earthquake']
};

let isRunning = false;
let intervalId = null;

/**
 * Get rating tier and corresponding stat ranges for AI generation
 * Rating tiers match frontend: Bronze (<1000), Silver (1000-1199), Gold (1200-1399),
 * Platinum (1400-1599), Diamond (1600-1799), Master (1800+)
 *
 * Grade stat totals (approximate):
 * F: 400-500, E: 500-600, D: 600-750, C: 750-900, B: 900-1050,
 * B+: 1050-1150, A: 1150-1300, A+: 1300-1450, S: 1450-1600, S+: 1600+
 */
function getAIStatsForRating(rating) {
  // Define stat ranges per tier (min total stats, max total stats)
  // Each Pokemon has 5 stats, so divide by 5 for per-stat average
  const tierConfigs = {
    bronze:   { minTotal: 550, maxTotal: 800, strategyGrades: ['C', 'B'] },      // D-C grade
    silver:   { minTotal: 700, maxTotal: 950, strategyGrades: ['B', 'B+'] },     // C-B grade
    gold:     { minTotal: 850, maxTotal: 1100, strategyGrades: ['B', 'B+', 'A'] }, // B-B+ grade
    platinum: { minTotal: 1000, maxTotal: 1250, strategyGrades: ['B+', 'A', 'A+'] }, // B+-A grade
    diamond:  { minTotal: 1150, maxTotal: 1400, strategyGrades: ['A', 'A+', 'S'] }, // A-A+ grade
    master:   { minTotal: 1300, maxTotal: 1550, strategyGrades: ['A+', 'S'] }    // A+-S grade
  };

  let tier;
  if (rating >= 1800) tier = 'master';
  else if (rating >= 1600) tier = 'diamond';
  else if (rating >= 1400) tier = 'platinum';
  else if (rating >= 1200) tier = 'gold';
  else if (rating >= 1000) tier = 'silver';
  else tier = 'bronze';

  const config = tierConfigs[tier];

  // Generate a random total stat within the range
  const totalStats = Math.floor(Math.random() * (config.maxTotal - config.minTotal + 1)) + config.minTotal;

  // Distribute stats with some variance (not perfectly even)
  const basePerStat = totalStats / 5;

  return {
    tier,
    basePerStat,
    totalStats,
    strategyGrades: config.strategyGrades
  };
}

/**
 * Calculate Elo rating change with soft inflation toward Platinum
 * Players below Platinum gain more for wins and lose less for losses
 * This effect diminishes as they approach Platinum and becomes neutral at/above Platinum
 */
function calculateEloChange(playerRating, opponentRating, won) {
  const K = CONFIG.K_FACTOR;
  const expected = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  const score = won ? 1 : 0;
  const baseChange = K * (score - expected);

  // Calculate inflation factor based on how far below Platinum the player is
  // At 0 rating: full inflation bonus (MAX_INFLATION_BONUS)
  // At PLATINUM_RATING: no inflation (0)
  // Above PLATINUM_RATING: no inflation (0)
  let inflationFactor = 0;
  if (playerRating < CONFIG.PLATINUM_RATING) {
    // Linear interpolation from MAX_INFLATION_BONUS at rating 0 to 0 at PLATINUM_RATING
    inflationFactor = CONFIG.MAX_INFLATION_BONUS * (1 - playerRating / CONFIG.PLATINUM_RATING);
  }

  let finalChange;
  if (won) {
    // Wins get a bonus (more points gained)
    finalChange = baseChange * (1 + inflationFactor);
  } else {
    // Losses get a reduction (fewer points lost)
    finalChange = baseChange * (1 - inflationFactor);
  }

  return Math.round(finalChange);
}

/**
 * Get rating range based on time in queue
 */
function getRatingRange(secondsInQueue) {
  const expansion = Math.floor(secondsInQueue * CONFIG.RATING_EXPANSION_RATE);
  return Math.min(CONFIG.BASE_RATING_RANGE + expansion, CONFIG.MAX_RATING_RANGE);
}

/**
 * Pick a random move from an array, avoiding duplicates
 */
function pickRandomMove(moveArray, usedMoves) {
  const available = moveArray.filter(m => !usedMoves.has(m));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

/**
 * Generate an AI Pokemon with stats based on player's rating tier
 * Uses new 3-move system: Tackle + 2 strategy-specific moves
 * @param {object} tierConfig - Config from getAIStatsForRating with basePerStat and strategyGrades
 */
function generateAIPokemon(tierConfig) {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  const color = TYPE_TO_COLOR[type];
  const strategy = STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)];
  // Pick strategy grade from tier-appropriate options
  const strategyGrade = tierConfig.strategyGrades[Math.floor(Math.random() * tierConfig.strategyGrades.length)];

  // Pick a real Pokemon name for this type
  const typeNames = POKEMON_NAMES_BY_TYPE[type] || POKEMON_NAMES_BY_TYPE.Fire;
  const name = typeNames[Math.floor(Math.random() * typeNames.length)];

  // Generate stats based on tier with variance
  // Each stat gets ~20% of total with some randomness
  const basePerStat = tierConfig.basePerStat;
  const variance = 0.25; // 25% variance per stat

  const generateStat = () => {
    const min = Math.floor(basePerStat * (1 - variance));
    const max = Math.floor(basePerStat * (1 + variance));
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const stats = {
    HP: generateStat(),
    Attack: generateStat(),
    Defense: generateStat(),
    Instinct: generateStat(),
    Speed: generateStat()
  };

  // Generate type aptitudes
  const aptitudeGrades = ['D', 'C', 'B', 'A', 'S'];
  const typeAptitudes = {};
  Object.keys(TYPE_TO_COLOR).forEach(t => {
    const col = TYPE_TO_COLOR[t];
    typeAptitudes[col] = aptitudeGrades[Math.floor(Math.random() * aptitudeGrades.length)];
  });
  // Boost primary type aptitude
  typeAptitudes[color] = 'A';

  // NEW: Build moves based on strategy (Tackle + 2 strategy-specific moves)
  const abilities = ['Tackle']; // Everyone starts with Tackle
  const usedMoves = new Set(['Tackle']);

  // Get strategy-specific moves for this type
  const strategyMovesForType = STRATEGY_MOVES[strategy];
  const typeSpecificMoves = strategyMovesForType[type] || [];
  const genericMoves = strategyMovesForType.Generic || [];
  const powerMoves = POWER_MOVES_BY_TYPE[type] || [];

  // For Chipper strategy: pick 2 chipper moves (they need low-cost moves)
  if (strategy === 'Chipper') {
    // Pick 2 chipper moves
    const allChipperMoves = [...typeSpecificMoves, ...genericMoves];
    const move1 = pickRandomMove(allChipperMoves, usedMoves);
    if (move1) {
      abilities.push(move1);
      usedMoves.add(move1);
    }
    const move2 = pickRandomMove(allChipperMoves, usedMoves);
    if (move2) {
      abilities.push(move2);
      usedMoves.add(move2);
    }
  }
  // For Nuker strategy: pick 2 high-damage moves
  else if (strategy === 'Nuker') {
    const allNukerMoves = [...typeSpecificMoves, ...genericMoves];
    const move1 = pickRandomMove(allNukerMoves, usedMoves);
    if (move1) {
      abilities.push(move1);
      usedMoves.add(move1);
    }
    const move2 = pickRandomMove(allNukerMoves, usedMoves);
    if (move2) {
      abilities.push(move2);
      usedMoves.add(move2);
    }
  }
  // For Scaler strategy: 1 buff move + 1 power move
  else if (strategy === 'Scaler') {
    const allBuffMoves = [...typeSpecificMoves, ...genericMoves];
    const buffMove = pickRandomMove(allBuffMoves, usedMoves);
    if (buffMove) {
      abilities.push(buffMove);
      usedMoves.add(buffMove);
    }
    // Add a power move for when buffs are up
    const powerMove = pickRandomMove(powerMoves, usedMoves);
    if (powerMove) {
      abilities.push(powerMove);
      usedMoves.add(powerMove);
    }
  }
  // For Debuffer strategy: 1 debuff/weather move + 1 power move
  else if (strategy === 'Debuffer') {
    const allDebuffMoves = [...typeSpecificMoves, ...genericMoves];
    const debuffMove = pickRandomMove(allDebuffMoves, usedMoves);
    if (debuffMove) {
      abilities.push(debuffMove);
      usedMoves.add(debuffMove);
    }
    // Add a power move for after debuffs applied
    const powerMove = pickRandomMove(powerMoves, usedMoves);
    if (powerMove) {
      abilities.push(powerMove);
      usedMoves.add(powerMove);
    }
  }
  // For MadLad strategy: 2 completely random moves
  else if (strategy === 'MadLad') {
    const allMadLadMoves = [...typeSpecificMoves, ...genericMoves, ...powerMoves];
    const move1 = pickRandomMove(allMadLadMoves, usedMoves);
    if (move1) {
      abilities.push(move1);
      usedMoves.add(move1);
    }
    const move2 = pickRandomMove(allMadLadMoves, usedMoves);
    if (move2) {
      abilities.push(move2);
      usedMoves.add(move2);
    }
  }

  // Ensure we have exactly 3 moves - fill with power moves if needed
  while (abilities.length < 3) {
    const fallbackMove = pickRandomMove(powerMoves, usedMoves);
    if (fallbackMove) {
      abilities.push(fallbackMove);
      usedMoves.add(fallbackMove);
    } else {
      // Ultimate fallback - use generic chipper
      const chipperFallback = pickRandomMove(STRATEGY_MOVES.Chipper.Generic, usedMoves);
      if (chipperFallback) {
        abilities.push(chipperFallback);
        usedMoves.add(chipperFallback);
      } else {
        break; // No more moves available
      }
    }
  }

  return {
    name,
    primaryType: type,
    stats,
    abilities,
    typeAptitudes,
    strategy,
    strategyGrade
  };
}

/**
 * Generate AI team based on player's rating tier
 * @param {number} playerRating - The player's current rating
 */
function generateAITeam(playerRating) {
  // Generate 3 AI Pokemon with stats appropriate for the player's tier
  // Each Pokemon gets its own tier config so there's variety in the team
  return [
    generateAIPokemon(getAIStatsForRating(playerRating)),
    generateAIPokemon(getAIStatsForRating(playerRating)),
    generateAIPokemon(getAIStatsForRating(playerRating))
  ];
}

/**
 * Process a match between two players
 */
async function processMatch(entry1, entry2, isAIMatch = false) {
  console.log(`[Matchmaker] Processing match: ${entry1.user_id} vs ${isAIMatch ? 'AI' : entry2.user_id}`);

  try {
    // Get Pokemon data for entry1
    const rosters1Result = await db.query(
      'SELECT id, pokemon_data FROM pokemon_rosters WHERE id IN ($1, $2, $3)',
      [entry1.pokemon1_roster_id, entry1.pokemon2_roster_id, entry1.pokemon3_roster_id]
    );

    const player1Team = rosters1Result.rows.map(row => {
      const data = typeof row.pokemon_data === 'string'
        ? JSON.parse(row.pokemon_data)
        : row.pokemon_data;
      return data;
    });

    let player2Team;
    let player2Rating;
    let player2Id;

    if (isAIMatch) {
      // Generate AI team based on player's rating tier
      player2Team = generateAITeam(entry1.rating_at_queue);
      player2Rating = entry1.rating_at_queue; // AI matches player's rating
      player2Id = entry1.user_id; // Use same user ID for AI (will be marked as AI)
    } else {
      // Get Pokemon data for entry2
      const rosters2Result = await db.query(
        'SELECT id, pokemon_data FROM pokemon_rosters WHERE id IN ($1, $2, $3)',
        [entry2.pokemon1_roster_id, entry2.pokemon2_roster_id, entry2.pokemon3_roster_id]
      );

      player2Team = rosters2Result.rows.map(row => {
        const data = typeof row.pokemon_data === 'string'
          ? JSON.parse(row.pokemon_data)
          : row.pokemon_data;
        return data;
      });

      player2Rating = entry2.rating_at_queue;
      player2Id = entry2.user_id;
    }

    // Simulate 3 battles (best of 3)
    const battleResults = [];
    let player1Wins = 0;
    let player2Wins = 0;

    for (let i = 0; i < 3; i++) {
      const pokemon1 = player1Team[i];
      const pokemon2 = player2Team[i];

      if (!pokemon1 || !pokemon2) {
        console.error(`[Matchmaker] Missing Pokemon at index ${i}`);
        continue;
      }

      const result = simulateBattle(pokemon1, pokemon2);
      // Include Pokemon data in the battle result for replay display
      battleResults.push({
        ...result,
        pokemon1: pokemon1,
        pokemon2: pokemon2
      });

      if (result.winner === 1) {
        player1Wins++;
      } else {
        player2Wins++;
      }
    }

    // Determine match winner
    const player1Won = player1Wins > player2Wins;
    // For AI matches: if player loses, winner_id should be null to indicate AI won
    // The frontend uses battles_won_p1/p2 to determine the actual winner
    const winnerId = player1Won ? entry1.user_id : (isAIMatch ? null : entry2.user_id);

    // Calculate rating changes (same K-factor for all matches)
    const player1RatingChange = calculateEloChange(
      entry1.rating_at_queue,
      player2Rating,
      player1Won
    );

    const player2RatingChange = isAIMatch ? 0 : calculateEloChange(
      entry2.rating_at_queue,
      entry1.rating_at_queue,
      !player1Won
    );

    // Generate fake username for AI opponent
    const aiUsername = isAIMatch ? generateFakeUsername() : null;

    // Build replay data including AI username if applicable
    const replayData = {
      battles: battleResults,
      player1Wins,
      player2Wins,
      aiOpponentUsername: aiUsername
    };

    // Insert match record (keep is_ai_opponent false to not reveal AI status)
    const matchResult = await db.query(
      `INSERT INTO pvp_matches
        (player1_id, player2_id, winner_id, replay_data, match_type, is_ai_opponent,
         player1_rating_change, player2_rating_change, battles_won_p1, battles_won_p2,
         player1_team, player2_team, created_at)
       VALUES ($1, $2, $3, $4, 'matchmaking', $5, $6, $7, $8, $9, $10, $11, NOW())
       RETURNING id`,
      [
        entry1.user_id,
        isAIMatch ? entry1.user_id : entry2.user_id,
        winnerId,
        JSON.stringify(replayData),
        false, // Always false to hide AI status from frontend
        player1RatingChange,
        player2RatingChange,
        player1Wins,
        player2Wins,
        JSON.stringify(player1Team),
        JSON.stringify(player2Team)
      ]
    );

    const matchId = matchResult.rows[0].id;

    // Update player ratings
    await db.query(
      'UPDATE users SET rating = rating + $1 WHERE id = $2',
      [player1RatingChange, entry1.user_id]
    );

    if (!isAIMatch) {
      await db.query(
        'UPDATE users SET rating = rating + $1 WHERE id = $2',
        [player2RatingChange, entry2.user_id]
      );
    }

    // Award 10 primos to the winner
    if (player1Won) {
      await db.query(
        'UPDATE users SET primos = primos + 10 WHERE id = $1',
        [entry1.user_id]
      );
    } else if (!isAIMatch) {
      // Player 2 won (only award if not AI match)
      await db.query(
        'UPDATE users SET primos = primos + 10 WHERE id = $1',
        [entry2.user_id]
      );
    }

    // Update queue entries
    await db.query(
      `UPDATE pvp_queue SET status = 'completed', match_id = $1 WHERE id = $2`,
      [matchId, entry1.id]
    );

    if (!isAIMatch) {
      await db.query(
        `UPDATE pvp_queue SET status = 'completed', match_id = $1, matched_with_id = $2 WHERE id = $3`,
        [matchId, entry1.id, entry2.id]
      );

      await db.query(
        `UPDATE pvp_queue SET matched_with_id = $1 WHERE id = $2`,
        [entry2.id, entry1.id]
      );
    }

    console.log(`[Matchmaker] Match completed: ${matchId}, Winner: ${player1Won ? 'Player 1' : 'Player 2'}, Score: ${player1Wins}-${player2Wins}`);

    return matchId;
  } catch (error) {
    console.error('[Matchmaker] Error processing match:', error);
    throw error;
  }
}

/**
 * Main matchmaking loop
 */
async function processQueue() {
  try {
    // Get all waiting entries ordered by queue time
    const queueResult = await db.query(
      `SELECT
        pq.*,
        u.username,
        EXTRACT(EPOCH FROM (NOW() - pq.queued_at)) as seconds_in_queue
      FROM pvp_queue pq
      JOIN users u ON pq.user_id = u.id
      WHERE pq.status = 'waiting'
      ORDER BY pq.queued_at ASC`
    );

    const waitingEntries = queueResult.rows;

    if (waitingEntries.length === 0) {
      return;
    }

    console.log(`[Matchmaker] Processing ${waitingEntries.length} entries in queue`);

    const processedIds = new Set();

    for (const entry of waitingEntries) {
      // Skip if already processed this cycle
      if (processedIds.has(entry.id)) {
        continue;
      }

      const secondsInQueue = parseFloat(entry.seconds_in_queue);
      const ratingRange = getRatingRange(secondsInQueue);

      // Try to find an opponent
      let opponent = null;

      for (const potentialOpponent of waitingEntries) {
        if (potentialOpponent.id === entry.id) continue;
        if (processedIds.has(potentialOpponent.id)) continue;

        const ratingDiff = Math.abs(entry.rating_at_queue - potentialOpponent.rating_at_queue);

        if (ratingDiff <= ratingRange) {
          opponent = potentialOpponent;
          break;
        }
      }

      if (opponent) {
        // Found a match!
        console.log(`[Matchmaker] Matched ${entry.username} (${entry.rating_at_queue}) vs ${opponent.username} (${opponent.rating_at_queue})`);
        processedIds.add(entry.id);
        processedIds.add(opponent.id);

        await processMatch(entry, opponent, false);
      } else if (secondsInQueue >= CONFIG.AI_TIMEOUT_SECONDS) {
        // No opponent found after timeout, generate AI
        console.log(`[Matchmaker] No opponent found for ${entry.username}, generating AI (waited ${Math.floor(secondsInQueue)}s)`);
        processedIds.add(entry.id);

        await processMatch(entry, null, true);
      }
    }
  } catch (error) {
    console.error('[Matchmaker] Error in queue processing:', error);
  }
}

/**
 * Start the matchmaker service
 */
function start() {
  if (isRunning) {
    console.log('[Matchmaker] Already running');
    return;
  }

  console.log('[Matchmaker] Starting matchmaker service...');
  isRunning = true;

  // Run immediately, then on interval
  processQueue();
  intervalId = setInterval(processQueue, CONFIG.POLL_INTERVAL_MS);

  console.log(`[Matchmaker] Running every ${CONFIG.POLL_INTERVAL_MS / 1000} seconds`);
}

/**
 * Stop the matchmaker service
 */
function stop() {
  if (!isRunning) {
    console.log('[Matchmaker] Not running');
    return;
  }

  console.log('[Matchmaker] Stopping matchmaker service...');
  isRunning = false;

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

module.exports = {
  start,
  stop,
  processQueue,
  CONFIG
};
