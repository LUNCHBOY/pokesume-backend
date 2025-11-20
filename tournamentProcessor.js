// Tournament Processor - Runs every 5 minutes to advance tournaments
// This file should be placed in your backend and called via cron/scheduler

const db = require('./database'); // Your database connection

// Battle simulation configuration
const BATTLE_CONFIG = {
  TICK_DURATION_MS: 100,
  MAX_TICKS: 1000,
  STAMINA_REGEN_PER_TICK: 2,
  BASE_STAMINA: 100
};

// Pokemon moves database (simplified - use full MOVES from game)
const MOVES = {
  'Tackle': { damage: 7, stamina: 5, type: 'Normal' },
  'QuickAttack': { damage: 10, stamina: 8, type: 'Normal' },
  'BodySlam': { damage: 21, stamina: 42, type: 'Normal' },
  'Flamethrower': { damage: 25, stamina: 35, type: 'Fire' },
  'WaterGun': { damage: 20, stamina: 25, type: 'Water' },
  'VineWhip': { damage: 18, stamina: 20, type: 'Grass' },
  'Thunderbolt': { damage: 28, stamina: 40, type: 'Electric' },
  'Psychic': { damage: 30, stamina: 45, type: 'Psychic' },
  'CloseCombat': { damage: 32, stamina: 50, type: 'Fighting' }
};

// Type effectiveness chart
const TYPE_CHART = {
  'Fire': { 'Grass': 2.0, 'Water': 0.5, 'Fire': 0.5 },
  'Water': { 'Fire': 2.0, 'Grass': 0.5, 'Water': 0.5 },
  'Grass': { 'Water': 2.0, 'Fire': 0.5, 'Grass': 0.5 },
  'Electric': { 'Water': 2.0, 'Grass': 0.5 },
  'Psychic': { 'Fighting': 2.0 },
  'Fighting': { 'Normal': 2.0 }
};

function getTypeEffectiveness(attackType, defenseType) {
  if (TYPE_CHART[attackType] && TYPE_CHART[attackType][defenseType]) {
    return TYPE_CHART[attackType][defenseType];
  }
  return 1.0;
}

function selectMove(pokemon, currentStamina) {
  // Get available moves that can be afforded
  const affordableMoves = pokemon.moves.filter(moveName => {
    const move = MOVES[moveName];
    return move && move.stamina <= currentStamina;
  });
  
  if (affordableMoves.length === 0) {
    return null; // Must wait for stamina
  }
  
  // Prefer higher damage moves when stamina allows
  affordableMoves.sort((a, b) => {
    const moveA = MOVES[a];
    const moveB = MOVES[b];
    return (moveB.damage - moveA.damage);
  });
  
  return affordableMoves[0];
}

function simulateSingleBattle(pokemon1Data, pokemon2Data) {
  const battleLog = [];
  let tick = 0;
  
  // Initialize battle state
  const p1 = {
    name: pokemon1Data.name,
    type: pokemon1Data.type,
    stats: pokemon1Data.stats,
    moves: pokemon1Data.moves,
    currentHP: pokemon1Data.stats.HP,
    maxHP: pokemon1Data.stats.HP,
    currentStamina: BATTLE_CONFIG.BASE_STAMINA,
    maxStamina: BATTLE_CONFIG.BASE_STAMINA
  };
  
  const p2 = {
    name: pokemon2Data.name,
    type: pokemon2Data.type,
    stats: pokemon2Data.stats,
    moves: pokemon2Data.moves,
    currentHP: pokemon2Data.stats.HP,
    maxHP: pokemon2Data.stats.HP,
    currentStamina: BATTLE_CONFIG.BASE_STAMINA,
    maxStamina: BATTLE_CONFIG.BASE_STAMINA
  };
  
  const log = [{ text: 'Battle Start!', type: 'system' }];
  
  // Initial snapshot
  battleLog.push({
    tick: tick++,
    player: {
      name: p1.name,
      currentHP: p1.currentHP,
      maxHP: p1.maxHP,
      currentStamina: p1.currentStamina,
      maxStamina: p1.maxStamina
    },
    opponent: {
      name: p2.name,
      currentHP: p2.currentHP,
      maxHP: p2.maxHP,
      currentStamina: p2.currentStamina,
      maxStamina: p2.maxStamina
    },
    log: [...log]
  });
  
  // Battle simulation loop
  while (p1.currentHP > 0 && p2.currentHP > 0 && tick < BATTLE_CONFIG.MAX_TICKS) {
    // Regenerate stamina
    p1.currentStamina = Math.min(p1.maxStamina, p1.currentStamina + BATTLE_CONFIG.STAMINA_REGEN_PER_TICK);
    p2.currentStamina = Math.min(p2.maxStamina, p2.currentStamina + BATTLE_CONFIG.STAMINA_REGEN_PER_TICK);
    
    // P1 attacks
    const p1Move = selectMove(p1, p1.currentStamina);
    if (p1Move && p1.currentStamina >= MOVES[p1Move].stamina) {
      const move = MOVES[p1Move];
      p1.currentStamina -= move.stamina;
      
      // Calculate damage
      const attackStat = p1.stats.Attack || 50;
      const defenseStat = p2.stats.Defense || 50;
      const speedRatio = (p1.stats.Speed || 50) / (p2.stats.Speed || 50);
      const typeMultiplier = getTypeEffectiveness(move.type, p2.type);
      
      let damage = Math.floor(move.damage * (attackStat / 50) * (50 / defenseStat) * speedRatio * typeMultiplier);
      damage = Math.max(1, damage);
      
      p2.currentHP = Math.max(0, p2.currentHP - damage);
      
      let effectText = '';
      if (typeMultiplier > 1) effectText = ' Super effective!';
      else if (typeMultiplier < 1) effectText = ' Not very effective...';
      
      log.push({
        text: `${p1.name} used ${p1Move}! Dealt ${damage} damage!${effectText}`,
        type: 'damage'
      });
    }
    
    // Check if P2 fainted
    if (p2.currentHP <= 0) {
      log.push({ text: `Victory! ${p1.name} defeated ${p2.name}!`, type: 'victory' });
      battleLog.push({
        tick: tick++,
        player: {
          name: p1.name,
          currentHP: p1.currentHP,
          maxHP: p1.maxHP,
          currentStamina: p1.currentStamina,
          maxStamina: p1.maxStamina
        },
        opponent: {
          name: p2.name,
          currentHP: p2.currentHP,
          maxHP: p2.maxHP,
          currentStamina: p2.currentStamina,
          maxStamina: p2.maxStamina
        },
        log: [...log]
      });
      break;
    }
    
    // P2 attacks
    const p2Move = selectMove(p2, p2.currentStamina);
    if (p2Move && p2.currentStamina >= MOVES[p2Move].stamina) {
      const move = MOVES[p2Move];
      p2.currentStamina -= move.stamina;
      
      // Calculate damage
      const attackStat = p2.stats.Attack || 50;
      const defenseStat = p1.stats.Defense || 50;
      const speedRatio = (p2.stats.Speed || 50) / (p1.stats.Speed || 50);
      const typeMultiplier = getTypeEffectiveness(move.type, p1.type);
      
      let damage = Math.floor(move.damage * (attackStat / 50) * (50 / defenseStat) * speedRatio * typeMultiplier);
      damage = Math.max(1, damage);
      
      p1.currentHP = Math.max(0, p1.currentHP - damage);
      
      let effectText = '';
      if (typeMultiplier > 1) effectText = ' Super effective!';
      else if (typeMultiplier < 1) effectText = ' Not very effective...';
      
      log.push({
        text: `${p2.name} used ${p2Move}! Dealt ${damage} damage!${effectText}`,
        type: 'damage'
      });
    }
    
    // Check if P1 fainted
    if (p1.currentHP <= 0) {
      log.push({ text: `Defeat! ${p1.name} was defeated by ${p2.name}!`, type: 'defeat' });
      battleLog.push({
        tick: tick++,
        player: {
          name: p1.name,
          currentHP: p1.currentHP,
          maxHP: p1.maxHP,
          currentStamina: p1.currentStamina,
          maxStamina: p1.maxStamina
        },
        opponent: {
          name: p2.name,
          currentHP: p2.currentHP,
          maxHP: p2.maxHP,
          currentStamina: p2.currentStamina,
          maxStamina: p2.maxStamina
        },
        log: [...log]
      });
      break;
    }
    
    // Snapshot after this tick
    battleLog.push({
      tick: tick++,
      player: {
        name: p1.name,
        currentHP: p1.currentHP,
        maxHP: p1.maxHP,
        currentStamina: p1.currentStamina,
        maxStamina: p1.maxStamina
      },
      opponent: {
        name: p2.name,
        currentHP: p2.currentHP,
        maxHP: p2.maxHP,
        currentStamina: p2.currentStamina,
        maxStamina: p2.maxStamina
      },
      log: [...log]
    });
  }
  
  // Return winner
  return {
    winner: p1.currentHP > 0 ? 'player1' : 'player2',
    battleLog
  };
}

function simulateBestOf3(roster1, roster2) {
  let p1Wins = 0;
  let p2Wins = 0;
  const allBattleLogs = [];
  
  // Each roster has 3 Pokemon - simulate up to 3 battles
  for (let i = 0; i < 3 && p1Wins < 2 && p2Wins < 2; i++) {
    const pokemon1 = roster1[i];
    const pokemon2 = roster2[i];
    
    const result = simulateSingleBattle(pokemon1, pokemon2);
    allBattleLogs.push(result.battleLog);
    
    if (result.winner === 'player1') {
      p1Wins++;
    } else {
      p2Wins++;
    }
  }
  
  return {
    winner: p1Wins > p2Wins ? 'player1' : 'player2',
    score: `${p1Wins}-${p2Wins}`,
    battleLog: allBattleLogs[0] // Use first battle for replay (can extend to show all 3)
  };
}

async function processTournaments() {
  console.log('[Tournament Processor] Starting...');
  
  try {
    // Get all active tournaments
    const tournaments = await db.query(`
      SELECT * FROM tournaments 
      WHERE status IN ('pending', 'active') 
      ORDER BY start_time ASC
    `);
    
    for (const tournament of tournaments.rows) {
      const now = new Date();
      const startTime = new Date(tournament.start_time);
      
      // Check if tournament should start
      if (tournament.status === 'pending' && now >= startTime) {
        console.log(`[Tournament ${tournament.id}] Starting tournament: ${tournament.name}`);
        await startTournament(tournament.id);
      }
      
      // Process active tournament rounds
      if (tournament.status === 'active') {
        console.log(`[Tournament ${tournament.id}] Processing active tournament`);
        await processRound(tournament.id);
      }
    }
    
    console.log('[Tournament Processor] Complete');
  } catch (error) {
    console.error('[Tournament Processor] Error:', error);
  }
}

async function startTournament(tournamentId) {
  // Get all entries
  const entries = await db.query(
    'SELECT * FROM tournament_entries WHERE tournament_id = $1',
    [tournamentId]
  );
  
  if (entries.rows.length < 2) {
    console.log(`[Tournament ${tournamentId}] Not enough players, deleting tournament`);
    await db.query(
      'DELETE FROM tournaments WHERE id = $1',
      [tournamentId]
    );
    return;
  }
  
  // Calculate number of rounds needed
  const playerCount = entries.rows.length;
  const rounds = Math.ceil(Math.log2(playerCount));
  
  // Update tournament status
  await db.query(
    'UPDATE tournaments SET status = $1, current_round = $2, total_rounds = $3 WHERE id = $4',
    ['active', 1, rounds, tournamentId]
  );
  
  // Generate first round bracket
  await generateBracket(tournamentId, entries.rows);
  
  console.log(`[Tournament ${tournamentId}] Bracket generated, ${rounds} rounds`);
}

async function generateBracket(tournamentId, entries) {
  // Shuffle and pair players
  const shuffled = [...entries].sort(() => Math.random() - 0.5);
  
  let position = 0;
  for (let i = 0; i < shuffled.length; i += 2) {
    const player1 = shuffled[i];
    const player2 = shuffled[i + 1] || null; // Bye if odd number
    
    await db.query(`
      INSERT INTO tournament_matches (
        tournament_id, round, position,
        player1_roster_id, player1_user_id,
        player2_roster_id, player2_user_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      tournamentId, 1, position++,
      player1.roster_id, player1.user_id,
      player2 ? player2.roster_id : null, player2 ? player2.user_id : null
    ]);
  }
}

async function processRound(tournamentId) {
  // Get current round
  const tournament = await db.query(
    'SELECT * FROM tournaments WHERE id = $1',
    [tournamentId]
  );
  
  const currentRound = tournament.rows[0].current_round;
  const totalRounds = tournament.rows[0].total_rounds;
  
  // Get matches for current round
  const matches = await db.query(
    'SELECT * FROM tournament_matches WHERE tournament_id = $1 AND round = $2',
    [tournamentId, currentRound]
  );
  
  // Check if all matches in round are complete
  const incomplete = matches.rows.filter(m => !m.completed_at);
  
  if (incomplete.length > 0) {
    // Simulate incomplete matches
    for (const match of incomplete) {
      await simulateMatch(match);
    }
    return;
  }
  
  // All matches complete - advance to next round
  if (currentRound < totalRounds) {
    console.log(`[Tournament ${tournamentId}] Advancing to round ${currentRound + 1}`);
    await advanceRound(tournamentId, currentRound + 1, matches.rows);
  } else {
    // Tournament complete
    console.log(`[Tournament ${tournamentId}] Tournament complete!`);
    await db.query(
      'UPDATE tournaments SET status = $1 WHERE id = $2',
      ['completed', tournamentId]
    );
  }
}

async function simulateMatch(match) {
  console.log(`[Match ${match.id}] Simulating battle`);
  
  // Handle bye
  if (!match.player2_roster_id) {
    await db.query(`
      UPDATE tournament_matches 
      SET winner_roster_id = $1, winner_user_id = $2, 
          battle_results = $3, completed_at = NOW()
      WHERE id = $4
    `, [
      match.player1_roster_id, match.player1_user_id,
      JSON.stringify({ score: '1-0', winner: 'player1', bye: true }),
      match.id
    ]);
    return;
  }
  
  // Get both rosters with Pokemon data
  const roster1 = await db.query(`
    SELECT r.*, u.username as player_username
    FROM pokemon_rosters r
    JOIN users u ON r.user_id = u.id
    WHERE r.id = $1
  `, [match.player1_roster_id]);
  
  const roster2 = await db.query(`
    SELECT r.*, u.username as player_username
    FROM pokemon_rosters r
    JOIN users u ON r.user_id = u.id
    WHERE r.id = $1
  `, [match.player2_roster_id]);
  
  const p1Data = roster1.rows[0];
  const p2Data = roster2.rows[0];
  
  // Parse Pokemon data (assuming it's stored in pokemon_data JSON field)
  const pokemon1 = JSON.parse(p1Data.pokemon_data);
  const pokemon2 = JSON.parse(p2Data.pokemon_data);
  
  // Create roster arrays (best-of-3 format, but can be single Pokemon)
  const roster1Array = Array.isArray(pokemon1) ? pokemon1 : [pokemon1];
  const roster2Array = Array.isArray(pokemon2) ? pokemon2 : [pokemon2];
  
  // Simulate battle
  const result = simulateBestOf3(roster1Array, roster2Array);
  
  // Determine winner
  const winnerRosterId = result.winner === 'player1' ? match.player1_roster_id : match.player2_roster_id;
  const winnerUserId = result.winner === 'player1' ? match.player1_user_id : match.player2_user_id;
  
  // Store results
  await db.query(`
    UPDATE tournament_matches 
    SET winner_roster_id = $1, winner_user_id = $2, 
        battle_results = $3, completed_at = NOW()
    WHERE id = $4
  `, [
    winnerRosterId, winnerUserId,
    JSON.stringify(result),
    match.id
  ]);
  
  console.log(`[Match ${match.id}] Battle complete: ${result.score}`);
}

async function advanceRound(tournamentId, nextRound, currentMatches) {
  // Get winners from current round
  const winners = currentMatches.filter(m => m.winner_roster_id);
  
  // Pair winners for next round
  let position = 0;
  for (let i = 0; i < winners.length; i += 2) {
    const player1 = winners[i];
    const player2 = winners[i + 1] || null;
    
    await db.query(`
      INSERT INTO tournament_matches (
        tournament_id, round, position,
        player1_roster_id, player1_user_id,
        player2_roster_id, player2_user_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [
      tournamentId, nextRound, position++,
      player1.winner_roster_id, player1.winner_user_id,
      player2 ? player2.winner_roster_id : null, player2 ? player2.winner_user_id : null
    ]);
  }
  
  // Update tournament round
  await db.query(
    'UPDATE tournaments SET current_round = $1 WHERE id = $2',
    [nextRound, tournamentId]
  );
}

// Export for use in scheduler
module.exports = { processTournaments };

// If running directly (for testing)
if (require.main === module) {
  processTournaments().then(() => {
    console.log('Done');
    process.exit(0);
  }).catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}







