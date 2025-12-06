import express from 'express';
import db from '../config/database.js';
import authenticateToken from '../middleware/auth.js';
import { simulateBattle } from '../services/battleSimulator.js';
import { GYM_BADGES } from '../services/tournamentProcessor.js';

const router = express.Router();

// Helper to attach gym badge condition to tournament data
const attachGymCondition = (tournament) => {
  if (!tournament || !tournament.gym_theme) return tournament;
  const gymBadge = GYM_BADGES.find(g => g.key === tournament.gym_theme);
  if (gymBadge) {
    tournament.gymBadge = {
      name: gymBadge.name,
      gym: gymBadge.gym,
      leader: gymBadge.leader,
      type: gymBadge.type,
      condition: gymBadge.condition
    };
  }
  return tournament;
};

// Create tournament (admin only - for now, any authenticated user can create)
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { name, startTime, maxPlayers = 64 } = req.body;

    if (!name || !startTime) {
      return res.status(400).json({ error: 'Name and start time required' });
    }

    // Validate maxPlayers is power of 2
    if (![4, 8, 16, 32, 64, 128].includes(maxPlayers)) {
      return res.status(400).json({ error: 'Max players must be 4, 8, 16, 32, 64, or 128' });
    }

    // Calculate total rounds (log2 of maxPlayers)
    const totalRounds = Math.log2(maxPlayers);

    const result = await db.query(
      `INSERT INTO tournaments (name, start_time, status, max_players, total_rounds, created_at)
       VALUES ($1, $2, 'registration', $3, $4, NOW())
       RETURNING id, name, start_time, status, max_players, total_rounds, created_at`,
      [name, startTime, maxPlayers, totalRounds]
    );

    res.status(201).json({
      message: 'Tournament created',
      tournament: result.rows[0]
    });
  } catch (error) {
    console.error('Create tournament error:', error);
    res.status(500).json({ error: 'Failed to create tournament' });
  }
});

// Get all tournaments (upcoming, in-progress, recent completed)
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
        t.*,
        (SELECT COUNT(*) FROM tournament_entries WHERE tournament_id = t.id) as entries_count,
        winner_u.id as winner_user_id,
        winner_u.username as winner_username,
        winner_u.profile_icon as winner_profile_icon
      FROM tournaments t
      LEFT JOIN tournament_matches final_match ON final_match.tournament_id = t.id
        AND final_match.round = t.total_rounds
        AND final_match.winner_entry_id IS NOT NULL
      LEFT JOIN tournament_entries winner_te ON winner_te.id = final_match.winner_entry_id
      LEFT JOIN users winner_u ON winner_u.id = winner_te.user_id
      WHERE t.status IN ('upcoming', 'registration', 'in_progress')
        OR (t.status = 'completed' AND t.start_time > NOW() - INTERVAL '24 hours')
      ORDER BY t.start_time ASC`
    );

    // Attach gym badge conditions to each tournament
    const tournaments = result.rows.map(attachGymCondition);
    res.json({ tournaments });
  } catch (error) {
    console.error('Fetch tournaments error:', error);
    res.status(500).json({ error: 'Failed to fetch tournaments' });
  }
});

// Get tournament details
router.get('/:tournamentId', async (req, res) => {
  try {
    const tournamentResult = await db.query(
      `SELECT
        t.*,
        (SELECT COUNT(*) FROM tournament_entries WHERE tournament_id = t.id) as entries_count,
        winner_u.id as winner_user_id,
        winner_u.username as winner_username,
        winner_u.profile_icon as winner_profile_icon
      FROM tournaments t
      LEFT JOIN tournament_matches final_match ON final_match.tournament_id = t.id
        AND final_match.round = t.total_rounds
        AND final_match.winner_entry_id IS NOT NULL
      LEFT JOIN tournament_entries winner_te ON winner_te.id = final_match.winner_entry_id
      LEFT JOIN users winner_u ON winner_u.id = winner_te.user_id
      WHERE t.id = $1`,
      [req.params.tournamentId]
    );

    if (tournamentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    // Attach gym badge condition to tournament
    const tournament = attachGymCondition(tournamentResult.rows[0]);

    // Get entries
    const entriesResult = await db.query(
      `SELECT
        te.id,
        te.bracket_position,
        te.joined_at,
        u.id as user_id,
        u.username,
        u.rating,
        pr1.pokemon_data as pokemon1_data,
        pr2.pokemon_data as pokemon2_data,
        pr3.pokemon_data as pokemon3_data
      FROM tournament_entries te
      JOIN users u ON te.user_id = u.id
      JOIN pokemon_rosters pr1 ON te.pokemon1_roster_id = pr1.id
      JOIN pokemon_rosters pr2 ON te.pokemon2_roster_id = pr2.id
      JOIN pokemon_rosters pr3 ON te.pokemon3_roster_id = pr3.id
      WHERE te.tournament_id = $1
      ORDER BY te.joined_at ASC`,
      [req.params.tournamentId]
    );

    res.json({
      tournament,
      entries: entriesResult.rows
    });
  } catch (error) {
    console.error('Fetch tournament details error:', error);
    res.status(500).json({ error: 'Failed to fetch tournament details' });
  }
});

// Submit team entry
router.post('/:tournamentId/enter', authenticateToken, async (req, res) => {
  try {
    const { pokemon1RosterId, pokemon2RosterId, pokemon3RosterId } = req.body;

    if (!pokemon1RosterId || !pokemon2RosterId || !pokemon3RosterId) {
      return res.status(400).json({ error: 'Three Pokemon rosters required' });
    }

    // Verify tournament exists and is accepting entries
    const tournamentResult = await db.query(
      'SELECT id, status, max_players FROM tournaments WHERE id = $1',
      [req.params.tournamentId]
    );

    if (tournamentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    const tournament = tournamentResult.rows[0];

    if (tournament.status !== 'registration' && tournament.status !== 'upcoming') {
      return res.status(400).json({ error: 'Tournament is not accepting entries' });
    }

    // Check if tournament is full
    const entryCountResult = await db.query(
      'SELECT COUNT(*) as count FROM tournament_entries WHERE tournament_id = $1',
      [req.params.tournamentId]
    );

    if (parseInt(entryCountResult.rows[0].count) >= tournament.max_players) {
      return res.status(400).json({ error: 'Tournament is full' });
    }

    // Verify user owns all three rosters
    const rostersResult = await db.query(
      'SELECT id FROM pokemon_rosters WHERE user_id = $1 AND id IN ($2, $3, $4)',
      [req.user.userId, pokemon1RosterId, pokemon2RosterId, pokemon3RosterId]
    );

    if (rostersResult.rows.length !== 3) {
      return res.status(400).json({ error: 'Invalid roster IDs or rosters not owned by user' });
    }

    // Check if user already entered
    const existingEntry = await db.query(
      'SELECT id FROM tournament_entries WHERE tournament_id = $1 AND user_id = $2',
      [req.params.tournamentId, req.user.userId]
    );

    if (existingEntry.rows.length > 0) {
      return res.status(400).json({ error: 'Already entered in this tournament' });
    }

    // Insert entry
    const result = await db.query(
      `INSERT INTO tournament_entries
        (tournament_id, user_id, pokemon1_roster_id, pokemon2_roster_id, pokemon3_roster_id, joined_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, joined_at`,
      [req.params.tournamentId, req.user.userId, pokemon1RosterId, pokemon2RosterId, pokemon3RosterId]
    );

    res.status(201).json({
      message: 'Tournament entry submitted',
      entryId: result.rows[0].id,
      submittedAt: result.rows[0].joined_at
    });
  } catch (error) {
    console.error('Submit entry error:', error);
    res.status(500).json({ error: 'Failed to submit tournament entry' });
  }
});

// Get bracket for tournament
router.get('/:tournamentId/bracket', async (req, res) => {
  try {
    const matchesResult = await db.query(
      `SELECT
        tm.id,
        tm.round,
        tm.position,
        tm.battle_results,
        tm.completed_at,
        te1.user_id as player1_user_id,
        u1.username as player1_username,
        u1.profile_icon as player1_profile_icon,
        te2.user_id as player2_user_id,
        u2.username as player2_username,
        u2.profile_icon as player2_profile_icon,
        te_winner.user_id as winner_user_id,
        u_winner.username as winner_username
      FROM tournament_matches tm
      LEFT JOIN tournament_entries te1 ON tm.player1_entry_id = te1.id
      LEFT JOIN users u1 ON te1.user_id = u1.id
      LEFT JOIN tournament_entries te2 ON tm.player2_entry_id = te2.id
      LEFT JOIN users u2 ON te2.user_id = u2.id
      LEFT JOIN tournament_entries te_winner ON tm.winner_entry_id = te_winner.id
      LEFT JOIN users u_winner ON te_winner.user_id = u_winner.id
      WHERE tm.tournament_id = $1
      ORDER BY tm.round ASC, tm.position ASC`,
      [req.params.tournamentId]
    );

    // Add default icons where missing
    const bracket = matchesResult.rows.map(match => ({
      ...match,
      player1_profile_icon: match.player1_profile_icon || 'pikachu',
      player2_profile_icon: match.player2_profile_icon || 'pikachu'
    }));

    res.json({ bracket });
  } catch (error) {
    console.error('Fetch bracket error:', error);
    res.status(500).json({ error: 'Failed to fetch bracket' });
  }
});

// Withdraw from tournament (before it starts)
router.delete('/:tournamentId/withdraw', authenticateToken, async (req, res) => {
  try {
    // Check tournament status
    const tournamentResult = await db.query(
      'SELECT status FROM tournaments WHERE id = $1',
      [req.params.tournamentId]
    );

    if (tournamentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    if (tournamentResult.rows[0].status !== 'registration' && tournamentResult.rows[0].status !== 'upcoming') {
      return res.status(400).json({ error: 'Cannot withdraw after tournament has started' });
    }

    // Delete entry
    const result = await db.query(
      'DELETE FROM tournament_entries WHERE tournament_id = $1 AND user_id = $2 RETURNING id',
      [req.params.tournamentId, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json({ message: 'Withdrawn from tournament' });
  } catch (error) {
    console.error('Withdraw error:', error);
    res.status(500).json({ error: 'Failed to withdraw from tournament' });
  }
});

// Simulate tournament match battle (server-authoritative)
router.post('/matches/:matchId/simulate', authenticateToken, async (req, res) => {
  try {
    const matchId = req.params.matchId;

    // Get match details
    const matchResult = await db.query(
      `SELECT
        tm.*,
        te1.pokemon1_roster_id as p1_roster1_id,
        te1.pokemon2_roster_id as p1_roster2_id,
        te1.pokemon3_roster_id as p1_roster3_id,
        te2.pokemon1_roster_id as p2_roster1_id,
        te2.pokemon2_roster_id as p2_roster2_id,
        te2.pokemon3_roster_id as p2_roster3_id
      FROM tournament_matches tm
      JOIN tournament_entries te1 ON tm.player1_entry_id = te1.id
      JOIN tournament_entries te2 ON tm.player2_entry_id = te2.id
      WHERE tm.id = $1`,
      [matchId]
    );

    if (matchResult.rows.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const match = matchResult.rows[0];

    // Check if match already completed
    if (match.winner_entry_id) {
      return res.status(400).json({ error: 'Match already completed' });
    }

    // Get Pokemon roster data for both players
    const rostersResult = await db.query(
      `SELECT id, pokemon_data FROM pokemon_rosters
       WHERE id IN ($1, $2, $3, $4, $5, $6)`,
      [
        match.p1_roster1_id, match.p1_roster2_id, match.p1_roster3_id,
        match.p2_roster1_id, match.p2_roster2_id, match.p2_roster3_id
      ]
    );

    // Parse pokemon_data and organize by player
    const rosters = {};
    rostersResult.rows.forEach(row => {
      rosters[row.id] = typeof row.pokemon_data === 'string'
        ? JSON.parse(row.pokemon_data)
        : row.pokemon_data;
    });

    const player1Team = [
      rosters[match.p1_roster1_id],
      rosters[match.p1_roster2_id],
      rosters[match.p1_roster3_id]
    ];

    const player2Team = [
      rosters[match.p2_roster1_id],
      rosters[match.p2_roster2_id],
      rosters[match.p2_roster3_id]
    ];

    // Simulate 3v3 battles (best of 3 individual battles)
    const battleResults = [];
    let player1Wins = 0;
    let player2Wins = 0;

    for (let i = 0; i < 3; i++) {
      const pokemon1 = player1Team[i];
      const pokemon2 = player2Team[i];

      const battleResult = simulateBattle(pokemon1, pokemon2);

      // Include pokemon data for replay display (sprites, types, stats)
      battleResults.push({
        ...battleResult,
        pokemon1: {
          name: pokemon1.name,
          primaryType: pokemon1.primaryType,
          stats: pokemon1.stats,
          type: pokemon1.primaryType
        },
        pokemon2: {
          name: pokemon2.name,
          primaryType: pokemon2.primaryType,
          stats: pokemon2.stats,
          type: pokemon2.primaryType
        }
      });

      if (battleResult.winner === 1) {
        player1Wins++;
      } else {
        player2Wins++;
      }
    }

    // Determine overall winner (best of 3)
    const matchWinnerEntryId = player1Wins > player2Wins
      ? match.player1_entry_id
      : match.player2_entry_id;

    // Update match with results
    await db.query(
      `UPDATE tournament_matches
       SET winner_entry_id = $1,
           battle_results = $2,
           completed_at = NOW()
       WHERE id = $3`,
      [
        matchWinnerEntryId,
        JSON.stringify({ battles: battleResults, player1Wins, player2Wins }),
        matchId
      ]
    );

    res.json({
      success: true,
      winner: matchWinnerEntryId === match.player1_entry_id ? 'player1' : 'player2',
      battleResults: { battles: battleResults, player1Wins, player2Wins }
    });
  } catch (error) {
    console.error('Simulate match error:', error);
    res.status(500).json({ error: 'Failed to simulate match' });
  }
});

export default router;
