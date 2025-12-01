const db = require('../config/database');
const { simulateBattle } = require('./battleSimulator');

// Gym-themed tournament configuration
const GYM_BADGES = [
  { key: 'boulder', name: 'Boulder Badge', gym: 'Pewter Gym', leader: 'Brock', type: 'Rock' },
  { key: 'cascade', name: 'Cascade Badge', gym: 'Cerulean Gym', leader: 'Misty', type: 'Water' },
  { key: 'thunder', name: 'Thunder Badge', gym: 'Vermilion Gym', leader: 'Lt. Surge', type: 'Electric' },
  { key: 'rainbow', name: 'Rainbow Badge', gym: 'Celadon Gym', leader: 'Erika', type: 'Grass' },
  { key: 'soul', name: 'Soul Badge', gym: 'Fuchsia Gym', leader: 'Koga', type: 'Poison' },
  { key: 'marsh', name: 'Marsh Badge', gym: 'Saffron Gym', leader: 'Sabrina', type: 'Psychic' },
  { key: 'volcano', name: 'Volcano Badge', gym: 'Cinnabar Gym', leader: 'Blaine', type: 'Fire' },
  { key: 'earth', name: 'Earth Badge', gym: 'Viridian Gym', leader: 'Giovanni', type: 'Ground' },
  { key: 'zephyr', name: 'Zephyr Badge', gym: 'Violet Gym', leader: 'Falkner', type: 'Flying' },
  { key: 'hive', name: 'Hive Badge', gym: 'Azalea Gym', leader: 'Bugsy', type: 'Bug' },
  { key: 'plain', name: 'Plain Badge', gym: 'Goldenrod Gym', leader: 'Whitney', type: 'Normal' },
  { key: 'fog', name: 'Fog Badge', gym: 'Ecruteak Gym', leader: 'Morty', type: 'Ghost' },
  { key: 'storm', name: 'Storm Badge', gym: 'Cianwood Gym', leader: 'Chuck', type: 'Fighting' },
  { key: 'mineral', name: 'Mineral Badge', gym: 'Olivine Gym', leader: 'Jasmine', type: 'Steel' },
  { key: 'glacier', name: 'Glacier Badge', gym: 'Mahogany Gym', leader: 'Pryce', type: 'Ice' },
  { key: 'rising', name: 'Rising Badge', gym: 'Blackthorn Gym', leader: 'Clair', type: 'Dragon' }
];

const TOURNAMENT_CONFIG = {
  CREATE_INTERVAL_MINUTES: 30, // Create a new tournament every 30 minutes
  REGISTRATION_DURATION_MINUTES: 25, // Registration open for 25 minutes before start
  DEFAULT_MAX_PLAYERS: 64, // Default bracket size
  MIN_PLAYERS_TO_START: 2 // Minimum players required to start tournament
};

// Create a new tournament automatically with gym theme
async function createScheduledTournament() {
  try {
    // Check if there's already an upcoming or registration tournament
    const existingResult = await db.query(
      `SELECT id FROM tournaments
       WHERE status IN ('upcoming', 'registration')
       LIMIT 1`
    );

    if (existingResult.rows.length > 0) {
      console.log('[Tournament Creator] Tournament already scheduled, skipping creation');
      return null;
    }

    // Pick a random gym for the tournament theme
    const gymBadge = GYM_BADGES[Math.floor(Math.random() * GYM_BADGES.length)];
    const tournamentName = `${gymBadge.leader}'s ${gymBadge.type} Challenge`;

    // Set start time to REGISTRATION_DURATION_MINUTES from now
    const startTime = new Date();
    startTime.setMinutes(startTime.getMinutes() + TOURNAMENT_CONFIG.REGISTRATION_DURATION_MINUTES);

    const maxPlayers = TOURNAMENT_CONFIG.DEFAULT_MAX_PLAYERS;
    const totalRounds = Math.log2(maxPlayers);

    const result = await db.query(
      `INSERT INTO tournaments (name, start_time, status, max_players, total_rounds, gym_theme, created_at)
       VALUES ($1, $2, 'registration', $3, $4, $5, NOW())
       RETURNING id, name, start_time, gym_theme`,
      [tournamentName, startTime, maxPlayers, totalRounds, gymBadge.key]
    );

    const tournament = result.rows[0];
    console.log(`[Tournament Creator] Created tournament: ${tournament.name} (ID: ${tournament.id}), gym: ${gymBadge.name}, starts at ${tournament.start_time}`);

    return tournament;
  } catch (error) {
    console.error('[Tournament Creator] Error creating tournament:', error);
    return null;
  }
}

// Simulate best-of-3 match between two entries
function simulateBestOf3(entry1, entry2) {
  const battles = [];
  let entry1Wins = 0;
  let entry2Wins = 0;

  // Battle 1: Pokemon1 vs Pokemon1
  const battle1 = simulateBattle(entry1.pokemon1_data, entry2.pokemon1_data);
  battles.push({
    battle: 1,
    pokemon1Name: entry1.pokemon1_data.name,
    pokemon2Name: entry2.pokemon1_data.name,
    pokemon1: {
      name: entry1.pokemon1_data.name,
      primaryType: entry1.pokemon1_data.primaryType,
      stats: entry1.pokemon1_data.stats,
      type: entry1.pokemon1_data.primaryType
    },
    pokemon2: {
      name: entry2.pokemon1_data.name,
      primaryType: entry2.pokemon1_data.primaryType,
      stats: entry2.pokemon1_data.stats,
      type: entry2.pokemon1_data.primaryType
    },
    winner: battle1.winner,
    battleLog: battle1.battleLog
  });
  if (battle1.winner === 1) entry1Wins++;
  else entry2Wins++;

  // Battle 2: Pokemon2 vs Pokemon2 (always play all 3)
  const battle2 = simulateBattle(entry1.pokemon2_data, entry2.pokemon2_data);
  battles.push({
    battle: 2,
    pokemon1Name: entry1.pokemon2_data.name,
    pokemon2Name: entry2.pokemon2_data.name,
    pokemon1: {
      name: entry1.pokemon2_data.name,
      primaryType: entry1.pokemon2_data.primaryType,
      stats: entry1.pokemon2_data.stats,
      type: entry1.pokemon2_data.primaryType
    },
    pokemon2: {
      name: entry2.pokemon2_data.name,
      primaryType: entry2.pokemon2_data.primaryType,
      stats: entry2.pokemon2_data.stats,
      type: entry2.pokemon2_data.primaryType
    },
    winner: battle2.winner,
    battleLog: battle2.battleLog
  });
  if (battle2.winner === 1) entry1Wins++;
  else entry2Wins++;

  // Battle 3: Pokemon3 vs Pokemon3
  const battle3 = simulateBattle(entry1.pokemon3_data, entry2.pokemon3_data);
  battles.push({
    battle: 3,
    pokemon1Name: entry1.pokemon3_data.name,
    pokemon2Name: entry2.pokemon3_data.name,
    pokemon1: {
      name: entry1.pokemon3_data.name,
      primaryType: entry1.pokemon3_data.primaryType,
      stats: entry1.pokemon3_data.stats,
      type: entry1.pokemon3_data.primaryType
    },
    pokemon2: {
      name: entry2.pokemon3_data.name,
      primaryType: entry2.pokemon3_data.primaryType,
      stats: entry2.pokemon3_data.stats,
      type: entry2.pokemon3_data.primaryType
    },
    winner: battle3.winner,
    battleLog: battle3.battleLog
  });
  if (battle3.winner === 1) entry1Wins++;
  else entry2Wins++;

  return {
    battles,
    player1Wins: entry1Wins,
    player2Wins: entry2Wins,
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

    // Calculate actual total rounds based on number of entries
    const actualTotalRounds = Math.ceil(Math.log2(entries.length));

    // Update bracket positions
    for (let i = 0; i < entries.length; i++) {
      await db.query(
        'UPDATE tournament_entries SET bracket_position = $1 WHERE id = $2',
        [i, entries[i].id]
      );
    }

    // Create round 1 matches (pair up entries, handle odd numbers with byes)
    const numMatches = Math.floor(entries.length / 2);
    const byeEntries = []; // Entries that get a bye to round 2

    // If odd number of entries, last entry gets a bye
    if (entries.length % 2 === 1) {
      byeEntries.push(entries[entries.length - 1]);
    }

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

    // Update tournament status and actual total rounds
    await db.query(
      'UPDATE tournaments SET status = $1, current_round = 1, total_rounds = $2 WHERE id = $3',
      ['in_progress', actualTotalRounds, tournamentId]
    );

    console.log(`Bracket generated: ${numMatches} matches in round 1, ${byeEntries.length} byes, ${actualTotalRounds} total rounds`);
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

      // Award 20 primos to the round winner
      const winnerUserId = matchResult.winner === entry1.id ? entry1.user_id : entry2.user_id;
      await db.query(
        'UPDATE users SET primos = primos + 20 WHERE id = $1',
        [winnerUserId]
      );

      winners.push({
        entryId: matchResult.winner,
        position: match.position
      });

      console.log(`Match completed: ${entry1.username} vs ${entry2.username}, Winner: ${matchResult.winner}, +20 primos`);
    }

    return { completed: matches.length, winners };
  } catch (error) {
    console.error('Process round error:', error);
    return { completed: 0, winners: [] };
  }
}

// Award badge to tournament winner
async function awardBadge(tournamentId, winnerEntryId) {
  try {
    // Get tournament gym theme and winner user_id
    const tournamentResult = await db.query(
      `SELECT t.gym_theme, te.user_id
       FROM tournaments t
       JOIN tournament_entries te ON te.id = $2
       WHERE t.id = $1`,
      [tournamentId, winnerEntryId]
    );

    if (tournamentResult.rows.length === 0 || !tournamentResult.rows[0].gym_theme) {
      console.log('[Badge Award] No gym theme found for tournament');
      return false;
    }

    const { gym_theme, user_id } = tournamentResult.rows[0];

    // Check if user already has this badge
    const existingBadge = await db.query(
      'SELECT id, level FROM user_badges WHERE user_id = $1 AND badge_key = $2',
      [user_id, gym_theme]
    );

    if (existingBadge.rows.length > 0) {
      // Level up existing badge
      await db.query(
        'UPDATE user_badges SET level = level + 1, last_upgraded_at = NOW() WHERE id = $1',
        [existingBadge.rows[0].id]
      );
      console.log(`[Badge Award] User ${user_id} leveled up ${gym_theme} badge to level ${existingBadge.rows[0].level + 1}`);
    } else {
      // Award new badge
      await db.query(
        'INSERT INTO user_badges (user_id, badge_key, level) VALUES ($1, $2, 1)',
        [user_id, gym_theme]
      );
      console.log(`[Badge Award] User ${user_id} earned ${gym_theme} badge!`);
    }

    return true;
  } catch (error) {
    console.error('[Badge Award] Error:', error);
    return false;
  }
}

// Advance to next round
async function advanceToNextRound(tournamentId, currentRound, winners) {
  try {
    console.log(`Advancing tournament ${tournamentId} to round ${currentRound + 1}`);

    // For round 1, also include entries that got a bye (weren't in any match)
    let allAdvancing = [...winners];

    if (currentRound === 1) {
      // Find entries that weren't in any round 1 match (bye entries)
      const byeEntriesResult = await db.query(
        `SELECT te.id as entry_id
         FROM tournament_entries te
         WHERE te.tournament_id = $1
         AND te.id NOT IN (
           SELECT player1_entry_id FROM tournament_matches WHERE tournament_id = $1 AND round = 1
           UNION
           SELECT player2_entry_id FROM tournament_matches WHERE tournament_id = $1 AND round = 1
         )`,
        [tournamentId]
      );

      for (const bye of byeEntriesResult.rows) {
        allAdvancing.push({ entryId: bye.entry_id, position: allAdvancing.length });
      }

      if (byeEntriesResult.rows.length > 0) {
        console.log(`Including ${byeEntriesResult.rows.length} bye entries in round 2`);
      }
    }

    if (allAdvancing.length < 2) {
      // Tournament complete - only 1 winner
      // Award badge and 100 primos bonus to the winner
      if (allAdvancing.length === 1) {
        await awardBadge(tournamentId, allAdvancing[0].entryId);

        // Get winner's user_id and award 100 primos for winning the tournament
        const winnerResult = await db.query(
          'SELECT user_id FROM tournament_entries WHERE id = $1',
          [allAdvancing[0].entryId]
        );
        if (winnerResult.rows.length > 0) {
          await db.query(
            'UPDATE users SET primos = primos + 100 WHERE id = $1',
            [winnerResult.rows[0].user_id]
          );
          console.log(`Tournament winner awarded 100 primos bonus!`);
        }
      }

      await db.query(
        'UPDATE tournaments SET status = $1 WHERE id = $2',
        ['completed', tournamentId]
      );
      console.log('Tournament completed!');
      return true;
    }

    // Create matches for next round
    const numMatches = Math.floor(allAdvancing.length / 2);
    for (let i = 0; i < numMatches; i++) {
      const player1 = allAdvancing[i * 2];
      const player2 = allAdvancing[i * 2 + 1];

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

// Cancel a tournament that didn't get enough players
async function cancelTournament(tournamentId, reason) {
  try {
    await db.query(
      'UPDATE tournaments SET status = $1 WHERE id = $2',
      ['cancelled', tournamentId]
    );
    console.log(`[Tournament Processor] Tournament ${tournamentId} cancelled: ${reason}`);
    return true;
  } catch (error) {
    console.error('[Tournament Processor] Error cancelling tournament:', error);
    return false;
  }
}

// Main processor - check for tournaments that need processing
async function processTournaments() {
  try {
    console.log('[Tournament Processor] Checking for tournaments...');

    // Check for tournaments that should start
    const tournamentsToStartResult = await db.query(
      `SELECT t.id, (SELECT COUNT(*) FROM tournament_entries WHERE tournament_id = t.id) as entries_count
       FROM tournaments t
       WHERE t.status IN ('registration', 'upcoming')
       AND t.start_time <= NOW()`
    );

    for (const tournament of tournamentsToStartResult.rows) {
      const entryCount = parseInt(tournament.entries_count);

      if (entryCount < TOURNAMENT_CONFIG.MIN_PLAYERS_TO_START) {
        // Not enough players - cancel the tournament
        console.log(`[Tournament Processor] Tournament ${tournament.id} has only ${entryCount} entries, cancelling...`);
        await cancelTournament(tournament.id, `Not enough players (${entryCount}/${TOURNAMENT_CONFIG.MIN_PLAYERS_TO_START} required)`);
      } else {
        // Enough players - start the tournament
        console.log(`Starting tournament ${tournament.id} with ${entryCount} entries`);
        await generateBracket(tournament.id);
      }
    }

    // After handling expired tournaments, ensure there's always an upcoming tournament
    await createScheduledTournament();

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

// Run every 15 seconds (fast tournament processing for responsive gameplay)
function startTournamentProcessor() {
  console.log('[Tournament Processor] Starting...');

  // Run immediately on start
  processTournaments();

  // Then every 15 seconds for fast tournament progression
  setInterval(processTournaments, 15 * 1000);
}

module.exports = { startTournamentProcessor, processTournaments, createScheduledTournament, GYM_BADGES };
