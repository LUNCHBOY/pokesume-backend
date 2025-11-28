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
  AI_TIMEOUT_SECONDS: 60,        // Generate AI opponent after 60 seconds
  K_FACTOR: 32                   // Elo K-factor (same for all matches)
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

// Strategies
const STRATEGIES = ['Nuker', 'Balanced', 'Scaler'];
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

// Available moves by type
const MOVES_BY_TYPE = {
  Fire: ['Ember', 'Flamethrower', 'FireBlast', 'FireFang', 'LavaPlume', 'FlareBlitz'],
  Water: ['WaterGun', 'Surf', 'HydroPump', 'IceBeam', 'Waterfall'],
  Grass: ['VineWhip', 'RazorLeaf', 'SolarBeam', 'LeafBlade', 'GigaDrain', 'PowerWhip'],
  Electric: ['ThunderShock', 'Thunderbolt', 'Thunder', 'VoltSwitch', 'WildCharge'],
  Psychic: ['PsyBeam', 'Psychic', 'PsychicBlast', 'Psyshock', 'ShadowBall'],
  Fighting: ['LowKick', 'KarateChop', 'BrickBreak', 'CloseCombat', 'DrainPunch', 'AuraSphere'],
  Normal: ['Tackle', 'QuickAttack', 'BodySlam', 'ExtremeSpeed']
};

let isRunning = false;
let intervalId = null;

/**
 * Calculate Elo rating change
 */
function calculateEloChange(playerRating, opponentRating, won) {
  const K = CONFIG.K_FACTOR;
  const expected = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  const score = won ? 1 : 0;
  return Math.round(K * (score - expected));
}

/**
 * Get rating range based on time in queue
 */
function getRatingRange(secondsInQueue) {
  const expansion = Math.floor(secondsInQueue * CONFIG.RATING_EXPANSION_RATE);
  return Math.min(CONFIG.BASE_RATING_RANGE + expansion, CONFIG.MAX_RATING_RANGE);
}

/**
 * Generate an AI Pokemon with stats similar to reference
 */
function generateAIPokemon(referenceStats, variance = 0.15) {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  const color = TYPE_TO_COLOR[type];
  const strategy = STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)];
  const strategyGrade = STRATEGY_GRADES[Math.floor(Math.random() * STRATEGY_GRADES.length)];

  // Pick a real Pokemon name for this type
  const typeNames = POKEMON_NAMES_BY_TYPE[type] || POKEMON_NAMES_BY_TYPE.Fire;
  const name = typeNames[Math.floor(Math.random() * typeNames.length)];

  // Generate stats with variance
  const generateStat = (baseStat) => {
    const min = Math.floor(baseStat * (1 - variance));
    const max = Math.floor(baseStat * (1 + variance));
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const stats = {
    HP: generateStat(referenceStats.HP || 200),
    Attack: generateStat(referenceStats.Attack || 150),
    Defense: generateStat(referenceStats.Defense || 150),
    Instinct: generateStat(referenceStats.Instinct || 150),
    Speed: generateStat(referenceStats.Speed || 150)
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

  // Select abilities (4 moves)
  const typeMoves = MOVES_BY_TYPE[type] || MOVES_BY_TYPE.Normal;
  const normalMoves = MOVES_BY_TYPE.Normal;
  const allMoves = [...typeMoves, ...normalMoves];
  const abilities = [];
  const usedMoves = new Set();

  while (abilities.length < 4 && abilities.length < allMoves.length) {
    const move = allMoves[Math.floor(Math.random() * allMoves.length)];
    if (!usedMoves.has(move)) {
      abilities.push(move);
      usedMoves.add(move);
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
 * Generate AI team based on player's team stats
 */
function generateAITeam(playerTeam) {
  // Calculate average stats from player's team
  const avgStats = {
    HP: 0,
    Attack: 0,
    Defense: 0,
    Instinct: 0,
    Speed: 0
  };

  playerTeam.forEach(pokemon => {
    if (pokemon && pokemon.stats) {
      avgStats.HP += pokemon.stats.HP || 0;
      avgStats.Attack += pokemon.stats.Attack || 0;
      avgStats.Defense += pokemon.stats.Defense || 0;
      avgStats.Instinct += pokemon.stats.Instinct || 0;
      avgStats.Speed += pokemon.stats.Speed || 0;
    }
  });

  const teamSize = playerTeam.length || 1;
  Object.keys(avgStats).forEach(stat => {
    avgStats[stat] = Math.floor(avgStats[stat] / teamSize);
  });

  // Generate 3 AI Pokemon with similar stats
  return [
    generateAIPokemon(avgStats),
    generateAIPokemon(avgStats),
    generateAIPokemon(avgStats)
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
      // Generate AI team
      player2Team = generateAITeam(player1Team);
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
    const winnerId = player1Won ? entry1.user_id : (isAIMatch ? entry1.user_id : entry2.user_id);

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
        player1Won ? entry1.user_id : (isAIMatch ? entry1.user_id : entry2.user_id),
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
