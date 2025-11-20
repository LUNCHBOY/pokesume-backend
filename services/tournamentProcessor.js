const db = require('../config/database');

// Battle simulation logic (matches game's battle system)
function simulateBattle(pokemon1Data, pokemon2Data) {
  // This is a simplified version - you'll need to port the actual battle logic from React
  // For now, returns random winner
  const winner = Math.random() < 0.5 ? 1 : 2;
  return {
    winner,
    pokemon1Health: Math.random() * 100,
    pokemon2Health: Math.random() * 100,
    battleLog: ['Battle simulated']
  };
}

// Simulate best-of-3 match between two entries
function simulateBestOf3(entry1, entry2) {
  const results = [];
  let entry1Wins = 0;
  let entry2Wins = 0;

  // Battle 1: Pokemon1 vs Pokemon1
  const battle1 = simulateBattle(entry1.pokemon1_data, entry2.pokemon1_data);
  results.push({
    battle: 1,
    pokemon1: entry1.pokemon1_data.name,
    pokemon2: entry2.pokemon1_data.name,
    winner: battle1.winner === 1 ? entry1.user_id : entry2.user_id,
    battleLog: battle1.battleLog
  });
  if (battle1.winner === 1) entry1Wins++;
  else entry2Wins++;

  // Battle 2: Pokemon2 vs Pokemon2 (always play all 3)
  const battle2 = simulateBattle(entry1.pokemon2_data, entry2.pokemon2_data);
  results.push({
    battle: 2,
    pokemon1: entry1.pokemon2_data.name,
    pokemon2: entry2.pokemon2_data.name,
    winner: battle2.winner === 1 ? entry1.user_id : entry2.user_id,
    battleLog: battle2.battleLog
  });
  if (battle2.winner === 1) entry1Wins++;
  else entry2Wins++;

  // Battle 3: Pokemon3 vs Pokemon3
  const battle3 = simulateBattle(entry1.pokemon3_data, entry2.pokemon3_data);
  results.push({
    battle: 3,
    pokemon1: entry1.pokemon3_data.name,
    pokemon2: entry2.pokemon3_data.name,
    winner: battle3.winner === 1 ? entry1.user_id : entry2.user_id,
    battleLog: battle3.battleLog
  });
  if (battle3.winner === 1) entry1Wins++;
  else entry2Wins++;

  return {
    results,
    winner: entry1Wins > entry2Wins ? entry1.id : entry2.id,
    score: `${entry1Wins}-${entry2Wins}`
  };
}

// Generate initial bracket when tournament starts
async function generateBracket(tournamentId) {
  try {
    console.log(`Generating bracket for tournament ${tournamentId}`);

    // Get all entries
    const entriesResult = await db.query(
      `SELECT 
        te.id,
        te.user_id,
        u.username,
        pr1.pokemon_data as pokemon1_data,
        pr2.pokemon_data as pokemon2_data,
        pr3.pokemon_data as pokemon3_data
      FROM tournament_entries te
      JOIN users u ON te.user_id = u.id
      JOIN pokemon_rosters pr1 ON te.pokemon1_roster_id = pr1.id
      JOIN pokemon_rosters pr2 ON te.pokemon2_roster_id = pr2.id
      JOIN pokemon_rosters pr3 ON te.pokemon3_roster_id = pr3.id
      WHERE te.tournament_id = $1
      ORDER BY RANDOM()`,
      [tournamentId]
    );

    const entries = entriesResult.rows;

    if (entries.length < 2) {
      throw new Error('Not enough entries to start tournament');
    }

    // Update bracket positions
    for (let i = 0; i < entries.length; i++) {
      await db.query(
        'UPDATE tournament_entries SET bracket_position = $1 WHERE id = $2',
        [i, entries[i].id]
      );
    }

    // Create round 1 matches
    const numMatches = Math.floor(entries.length / 2);
    for (let i = 0; i < numMatches; i++) {
      const player1Entry = entries[i * 2];
      const player2Entry = entries[i * 2 + 1];

      await db.query(
        `INSERT INTO tournament_matches 
          (tournament_id, round, position, player1_entry_id, player2_entry_id)
         VALUES ($1, 1, $2, $3, $4)`,
        [tournamentId, i, player1Entry.id, player2Entry.id]
      );
    }

    // Update tournament status
    await db.query(
      'UPDATE tournaments SET status = $1, current_round = 1 WHERE id = $2',
      ['in_progress', tournamentId]
    );

    console.log(`Bracket generated: ${numMatches} matches in round 1`);
    return true;
  } catch (error) {
    console.error('Generate bracket error:', error);
    return false;
  }
}

// Process current round (simulate all battles)
async function processRound(tournamentId, round) {
  try {
    console.log(`Processing round ${round} for tournament ${tournamentId}`);

    // Get all matches in this round that haven't been completed
    const matchesResult = await db.query(
      `SELECT 
        tm.id,
        tm.position,
        te1.id as entry1_id,
        te1.user_id as user1_id,
        u1.username as username1,
        pr1_1.pokemon_data as pokemon1_1_data,
        pr1_2.pokemon_data as pokemon1_2_data,
        pr1_3.pokemon_data as pokemon1_3_data,
        te2.id as entry2_id,
        te2.user_id as user2_id,
        u2.username as username2,
        pr2_1.pokemon_data as pokemon2_1_data,
        pr2_2.pokemon_data as pokemon2_2_data,
        pr2_3.pokemon_data as pokemon2_3_data
      FROM tournament_matches tm
      JOIN tournament_entries te1 ON tm.player1_entry_id = te1.id
      JOIN users u1 ON te1.user_id = u1.id
      JOIN pokemon_rosters pr1_1 ON te1.pokemon1_roster_id = pr1_1.id
      JOIN pokemon_rosters pr1_2 ON te1.pokemon2_roster_id = pr1_2.id
      JOIN pokemon_rosters pr1_3 ON te1.pokemon3_roster_id = pr1_3.id
      JOIN tournament_entries te2 ON tm.player2_entry_id = te2.id
      JOIN users u2 ON te2.user_id = u2.id
      JOIN pokemon_rosters pr2_1 ON te2.pokemon1_roster_id = pr2_1.id
      JOIN pokemon_rosters pr2_2 ON te2.pokemon2_roster_id = pr2_2.id
      JOIN pokemon_rosters pr2_3 ON te2.pokemon3_roster_id = pr2_3.id
      WHERE tm.tournament_id = $1 AND tm.round = $2 AND tm.completed_at IS NULL`,
      [tournamentId, round]
    );

    const matches = matchesResult.rows;

    if (matches.length === 0) {
      console.log('No matches to process in this round');
      return { completed: 0, winners: [] };
    }

    const winners = [];

    // Simulate each match
    for (const match of matches) {
      const entry1 = {
        id: match.entry1_id,
        user_id: match.user1_id,
        username: match.username1,
        pokemon1_data: match.pokemon1_1_data,
        pokemon2_data: match.pokemon1_2_data,
        pokemon3_data: match.pokemon1_3_data
      };

      const entry2 = {
        id: match.entry2_id,
        user_id: match.user2_id,
        username: match.username2,
        pokemon1_data: match.pokemon2_1_data,
        pokemon2_data: match.pokemon2_2_data,
        pokemon3_data: match.pokemon2_3_data
      };

      const matchResult = simulateBestOf3(entry1, entry2);

      // Update match with results
      await db.query(
        `UPDATE tournament_matches 
         SET winner_entry_id = $1, battle_results = $2, completed_at = NOW()
         WHERE id = $3`,
        [matchResult.winner, JSON.stringify(matchResult), match.id]
      );

      winners.push({
        entryId: matchResult.winner,
        position: match.position
      });

      console.log(`Match completed: ${entry1.username} vs ${entry2.username}, Winner: ${matchResult.winner}`);
    }

    return { completed: matches.length, winners };
  } catch (error) {
    console.error('Process round error:', error);
    return { completed: 0, winners: [] };
  }
}

// Advance to next round
async function advanceToNextRound(tournamentId, currentRound, winners) {
  try {
    console.log(`Advancing tournament ${tournamentId} to round ${currentRound + 1}`);

    if (winners.length < 2) {
      // Tournament complete - only 1 winner
      await db.query(
        'UPDATE tournaments SET status = $1 WHERE id = $2',
        ['completed', tournamentId]
      );
      console.log('Tournament completed!');
      return true;
    }

    // Create matches for next round
    const numMatches = Math.floor(winners.length / 2);
    for (let i = 0; i < numMatches; i++) {
      const player1 = winners[i * 2];
      const player2 = winners[i * 2 + 1];

      await db.query(
        `INSERT INTO tournament_matches 
          (tournament_id, round, position, player1_entry_id, player2_entry_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [tournamentId, currentRound + 1, i, player1.entryId, player2.entryId]
      );
    }

    // Update tournament current round
    await db.query(
      'UPDATE tournaments SET current_round = $1 WHERE id = $2',
      [currentRound + 1, tournamentId]
    );

    console.log(`Next round created: ${numMatches} matches`);
    return true;
  } catch (error) {
    console.error('Advance round error:', error);
    return false;
  }
}

// Main processor - check for tournaments that need processing
async function processTournaments() {
  try {
    console.log('[Tournament Processor] Checking for tournaments...');

    // Check for tournaments that should start
    const tournamentsToStartResult = await db.query(
      `SELECT id FROM tournaments 
       WHERE status IN ('registration', 'upcoming') 
       AND start_time <= NOW()`
    );

    for (const tournament of tournamentsToStartResult.rows) {
      console.log(`Starting tournament ${tournament.id}`);
      await generateBracket(tournament.id);
    }

    // Check for in-progress tournaments that need round processing
    const tournamentsInProgressResult = await db.query(
      `SELECT id, current_round, total_rounds FROM tournaments 
       WHERE status = 'in_progress'`
    );

    for (const tournament of tournamentsInProgressResult.rows) {
      // Check if all matches in current round are completed
      const pendingMatchesResult = await db.query(
        `SELECT COUNT(*) as count FROM tournament_matches 
         WHERE tournament_id = $1 AND round = $2 AND completed_at IS NULL`,
        [tournament.id, tournament.current_round]
      );

      if (parseInt(pendingMatchesResult.rows[0].count) === 0) {
        // All matches complete, check if we need to advance
        const completedMatchesResult = await db.query(
          `SELECT 
            tm.id,
            tm.position,
            tm.winner_entry_id
           FROM tournament_matches tm
           WHERE tm.tournament_id = $1 AND tm.round = $2
           ORDER BY tm.position`,
          [tournament.id, tournament.current_round]
        );

        const winners = completedMatchesResult.rows.map(m => ({
          entryId: m.winner_entry_id,
          position: m.position
        }));

        await advanceToNextRound(tournament.id, tournament.current_round, winners);
      } else {
        // Process current round
        const result = await processRound(tournament.id, tournament.current_round);
        console.log(`Processed ${result.completed} matches in round ${tournament.current_round}`);
      }
    }

    console.log('[Tournament Processor] Check complete');
  } catch (error) {
    console.error('[Tournament Processor] Error:', error);
  }
}

// Run every 5 minutes
function startTournamentProcessor() {
  console.log('[Tournament Processor] Starting...');
  
  // Run immediately on start
  processTournaments();
  
  // Then every 5 minutes
  setInterval(processTournaments, 5 * 60 * 1000);
}

module.exports = { startTournamentProcessor, processTournaments };
