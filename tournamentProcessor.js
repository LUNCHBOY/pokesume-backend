// Tournament Processor - Runs every 5 minutes to advance tournaments
// This file should be placed in your backend and called via cron/scheduler

const db = require('./config/database'); // Your database connection

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

// Tournament names for auto-generation
const TOURNAMENT_NAMES = [
  'Quick Battle Cup',
  'Lightning League',
  'Rapid Rumble',
  'Flash Tournament',
  'Speed Showdown',
  'Blitz Battle',
  'Swift Clash',
  'Express Championship',
  'Instant Arena',
  'Sprint Series'
];

// Auto-generate a new tournament
async function autoGenerateTournament() {
  try {
    // Check if there's already a tournament in registration with open slots
    const existingRegistration = await db.query(`
      SELECT t.id, t.max_players,
        (SELECT COUNT(*) FROM tournament_entries WHERE tournament_id = t.id) as entries_count
      FROM tournaments t
      WHERE t.status = 'registration'
      ORDER BY t.start_time ASC
      LIMIT 1
    `);

    // If there's already a tournament accepting entries, don't create another
    if (existingRegistration.rows.length > 0) {
      const existing = existingRegistration.rows[0];
      if (existing.entries_count < existing.max_players) {
        console.log('[Auto-Tournament] Registration tournament already exists, skipping generation');
        return null;
      }
    }

    // Generate tournament name with timestamp
    const nameIndex = Math.floor(Math.random() * TOURNAMENT_NAMES.length);
    const timestamp = new Date().toISOString().slice(11, 16).replace(':', ''); // HHMM format
    const tournamentName = `${TOURNAMENT_NAMES[nameIndex]} #${timestamp}`;

    // Start time is 10 minutes from now (gives players time to register)
    const startTime = new Date(Date.now() + 10 * 60 * 1000);

    // Create tournament with 8 max players (quick format)
    const maxPlayers = 8;
    const totalRounds = Math.log2(maxPlayers);

    const result = await db.query(
      `INSERT INTO tournaments (name, start_time, status, max_players, total_rounds, created_at)
       VALUES ($1, $2, 'registration', $3, $4, NOW())
       RETURNING id, name, start_time`,
      [tournamentName, startTime, maxPlayers, totalRounds]
    );

    console.log(`[Auto-Tournament] Created: ${result.rows[0].name} (ID: ${result.rows[0].id}), starts at ${startTime.toISOString()}`);
    return result.rows[0];
  } catch (error) {
    console.error('[Auto-Tournament] Generation error:', error);
    return null;
  }
}

// Cleanup tournaments that failed to start (not enough players) or are old completed tournaments
async function cleanupTournaments() {
  try {
    // 1. Delete registration tournaments that have passed their start time with < 2 players
    const failedTournaments = await db.query(`
      SELECT t.id, t.name,
        (SELECT COUNT(*) FROM tournament_entries WHERE tournament_id = t.id) as entries_count
      FROM tournaments t
      WHERE t.status = 'registration'
        AND t.start_time < NOW()
    `);

    for (const tournament of failedTournaments.rows) {
      if (tournament.entries_count < 2) {
        // Delete entries first (cascade should handle this, but being explicit)
        await db.query('DELETE FROM tournament_entries WHERE tournament_id = $1', [tournament.id]);
        await db.query('DELETE FROM tournament_matches WHERE tournament_id = $1', [tournament.id]);
        await db.query('DELETE FROM tournaments WHERE id = $1', [tournament.id]);
        console.log(`[Cleanup] Deleted failed tournament: ${tournament.name} (ID: ${tournament.id}) - only ${tournament.entries_count} players`);
      }
    }

    // 2. Delete completed tournaments older than 20 minutes
    const oldCompletedResult = await db.query(`
      SELECT id, name FROM tournaments
      WHERE status = 'completed'
        AND (
          completed_at < NOW() - INTERVAL '20 minutes'
          OR (completed_at IS NULL AND created_at < NOW() - INTERVAL '1 hour')
        )
    `);

    for (const tournament of oldCompletedResult.rows) {
      // Delete associated data first
      await db.query('DELETE FROM tournament_matches WHERE tournament_id = $1', [tournament.id]);
      await db.query('DELETE FROM tournament_entries WHERE tournament_id = $1', [tournament.id]);
      await db.query('DELETE FROM tournaments WHERE id = $1', [tournament.id]);
      console.log(`[Cleanup] Deleted old completed tournament: ${tournament.name} (ID: ${tournament.id})`);
    }

    // 3. Delete stale in_progress tournaments (stuck for more than 2 hours)
    const staleTournaments = await db.query(`
      SELECT id, name FROM tournaments
      WHERE status = 'in_progress'
        AND start_time < NOW() - INTERVAL '2 hours'
    `);

    for (const tournament of staleTournaments.rows) {
      await db.query('DELETE FROM tournament_matches WHERE tournament_id = $1', [tournament.id]);
      await db.query('DELETE FROM tournament_entries WHERE tournament_id = $1', [tournament.id]);
      await db.query('DELETE FROM tournaments WHERE id = $1', [tournament.id]);
      console.log(`[Cleanup] Deleted stale tournament: ${tournament.name} (ID: ${tournament.id})`);
    }

  } catch (error) {
    console.error('[Cleanup] Error:', error);
  }
}

async function processTournaments() {
  console.log('[Tournament Processor] Starting...');

  try {
    // Step 1: Cleanup old/failed tournaments
    await cleanupTournaments();

    // Step 2: Auto-generate a new tournament if needed
    await autoGenerateTournament();

    // Step 3: Process existing tournaments
    // Get all active tournaments
    const tournaments = await db.query(`
      SELECT * FROM tournaments
      WHERE status IN ('registration', 'upcoming', 'in_progress')
      ORDER BY start_time ASC
    `);

    for (const tournament of tournaments.rows) {
      const now = new Date();
      const startTime = new Date(tournament.start_time);

      // Check if tournament should start
      if (tournament.status === 'registration' && now >= startTime) {
        console.log(`[Tournament ${tournament.id}] Starting tournament: ${tournament.name}`);
        await startTournament(tournament.id);
      }

      // Process active tournament rounds
      if (tournament.status === 'in_progress') {
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
    ['in_progress', 1, rounds, tournamentId]
  );
  
  // Generate first round bracket
  await generateBracket(tournamentId, entries.rows);
  
  console.log(`[Tournament ${tournamentId}] Bracket generated, ${rounds} rounds`);
}

async function generateBracket(tournamentId, entries) {
  // Shuffle and pair players
  const shuffled = [...entries].sort(() => Math.random() - 0.5);
  
  // Set bracket_position for each entry
  for (let i = 0; i < shuffled.length; i++) {
    await db.query(
      'UPDATE tournament_entries SET bracket_position = $1 WHERE id = $2',
      [i, shuffled[i].id]
    );
  }
  
  let position = 0;
  for (let i = 0; i < shuffled.length; i += 2) {
    const player1 = shuffled[i];
    const player2 = shuffled[i + 1] || null; // Bye if odd number
    
    await db.query(`
      INSERT INTO tournament_matches (
        tournament_id, round, position,
        player1_entry_id, player2_entry_id
      ) VALUES ($1, $2, $3, $4, $5)
    `, [
      tournamentId, 1, position++,
      player1.id,
      player2 ? player2.id : null
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
    // Tournament complete - set completed_at timestamp for cleanup tracking
    console.log(`[Tournament ${tournamentId}] Tournament complete!`);
    await db.query(
      'UPDATE tournaments SET status = $1, completed_at = NOW() WHERE id = $2',
      ['completed', tournamentId]
    );
  }
}

async function simulateMatch(match) {
  console.log(`[Match ${match.id}] Simulating battle`);
  
  // Handle bye
  if (!match.player2_entry_id) {
    await db.query(`
      UPDATE tournament_matches 
      SET winner_entry_id = $1, 
          battle_results = $2, completed_at = NOW()
      WHERE id = $3
    `, [
      match.player1_entry_id,
      JSON.stringify({ score: '1-0', winner: 'player1', bye: true }),
      match.id
    ]);
    return;
  }
  
  // Get entry data with rosters
  const entry1 = await db.query(`
    SELECT te.*, u.username,
           pr1.pokemon_data as pokemon1_data,
           pr2.pokemon_data as pokemon2_data,
           pr3.pokemon_data as pokemon3_data
    FROM tournament_entries te
    JOIN users u ON te.user_id = u.id
    JOIN pokemon_rosters pr1 ON te.pokemon1_roster_id = pr1.id
    JOIN pokemon_rosters pr2 ON te.pokemon2_roster_id = pr2.id
    JOIN pokemon_rosters pr3 ON te.pokemon3_roster_id = pr3.id
    WHERE te.id = $1
  `, [match.player1_entry_id]);
  
  const entry2 = await db.query(`
    SELECT te.*, u.username,
           pr1.pokemon_data as pokemon1_data,
           pr2.pokemon_data as pokemon2_data,
           pr3.pokemon_data as pokemon3_data
    FROM tournament_entries te
    JOIN users u ON te.user_id = u.id
    JOIN pokemon_rosters pr1 ON te.pokemon1_roster_id = pr1.id
    JOIN pokemon_rosters pr2 ON te.pokemon2_roster_id = pr2.id
    JOIN pokemon_rosters pr3 ON te.pokemon3_roster_id = pr3.id
    WHERE te.id = $1
  `, [match.player2_entry_id]);
  
  const e1 = entry1.rows[0];
  const e2 = entry2.rows[0];
  
  // Parse Pokemon data (handle both JSON string and object)
  const parsePokemonData = (data) => {
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data; // Already an object
  };
  
  const team1 = [
    parsePokemonData(e1.pokemon1_data),
    parsePokemonData(e1.pokemon2_data),
    parsePokemonData(e1.pokemon3_data)
  ];
  
  const team2 = [
    parsePokemonData(e2.pokemon1_data),
    parsePokemonData(e2.pokemon2_data),
    parsePokemonData(e2.pokemon3_data)
  ];
  
  // Simulate battle
  const result = simulateBestOf3(team1, team2);
  
  // Determine winner entry
  const winnerEntryId = result.winner === 'player1' ? match.player1_entry_id : match.player2_entry_id;
  
  // Store results
  await db.query(`
    UPDATE tournament_matches 
    SET winner_entry_id = $1, 
        battle_results = $2, completed_at = NOW()
    WHERE id = $3
  `, [
    winnerEntryId,
    JSON.stringify(result),
    match.id
  ]);
  
  console.log(`[Match ${match.id}] Battle complete: ${result.score}`);
}

async function advanceRound(tournamentId, nextRound, currentMatches) {
  // Get winners from current round
  const winners = currentMatches.filter(m => m.winner_entry_id);
  
  // Pair winners for next round
  let position = 0;
  for (let i = 0; i < winners.length; i += 2) {
    const player1 = winners[i];
    const player2 = winners[i + 1] || null;
    
    await db.query(`
      INSERT INTO tournament_matches (
        tournament_id, round, position,
        player1_entry_id, player2_entry_id
      ) VALUES ($1, $2, $3, $4, $5)
    `, [
      tournamentId, nextRound, position++,
      player1.winner_entry_id,
      player2 ? player2.winner_entry_id : null
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
