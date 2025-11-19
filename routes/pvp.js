const express = require('express');
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get available opponents for matchmaking
router.get('/opponents', authenticateToken, async (req, res) => {
  try {
    const { limit = 20, ratingRange = 200 } = req.query;

    // Get user's rating
    const userResult = await db.query(
      'SELECT rating FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userRating = userResult.rows[0].rating;

    // Find opponents within rating range with recent rosters
    const result = await db.query(
      `SELECT DISTINCT ON (pr.user_id)
        pr.id as roster_id,
        pr.pokemon_data,
        pr.turn_number,
        pr.created_at,
        u.id as user_id,
        u.username,
        u.rating,
        (SELECT COUNT(*) FROM pvp_matches WHERE winner_id = u.id) as wins,
        (SELECT COUNT(*) FROM pvp_matches WHERE (player1_id = u.id OR player2_id = u.id) AND winner_id != u.id) as losses
      FROM pokemon_rosters pr
      JOIN users u ON pr.user_id = u.id
      WHERE pr.user_id != $1
        AND u.rating BETWEEN $2 AND $3
        AND pr.turn_number >= 50
      ORDER BY pr.user_id, pr.created_at DESC
      LIMIT $4`,
      [req.user.userId, userRating - ratingRange, userRating + ratingRange, limit]
    );

    res.json({ opponents: result.rows });
  } catch (error) {
    console.error('Fetch opponents error:', error);
    res.status(500).json({ error: 'Failed to fetch opponents' });
  }
});

// Submit battle result
router.post('/battle', authenticateToken, async (req, res) => {
  try {
    const { opponentRosterId, winnerId, battleData } = req.body;

    if (!opponentRosterId || !winnerId || !battleData) {
      return res.status(400).json({ error: 'Opponent roster, winner, and battle data required' });
    }

    // Get opponent user_id from roster
    const rosterResult = await db.query(
      'SELECT user_id FROM pokemon_rosters WHERE id = $1',
      [opponentRosterId]
    );

    if (rosterResult.rows.length === 0) {
      return res.status(404).json({ error: 'Opponent roster not found' });
    }

    const opponentId = rosterResult.rows[0].user_id;

    // Verify winner is valid
    if (winnerId !== req.user.userId && winnerId !== opponentId) {
      return res.status(400).json({ error: 'Invalid winner ID' });
    }

    // Insert match result
    const matchResult = await db.query(
      `INSERT INTO pvp_matches (player1_id, player2_id, winner_id, replay_data, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id`,
      [req.user.userId, opponentId, winnerId, JSON.stringify(battleData)]
    );

    // Update ratings using ELO system
    const K = 32; // K-factor for ELO calculation

    const playerResult = await db.query('SELECT rating FROM users WHERE id = $1', [req.user.userId]);
    const opponentResult = await db.query('SELECT rating FROM users WHERE id = $1', [opponentId]);

    const playerRating = playerResult.rows[0].rating;
    const opponentRating = opponentResult.rows[0].rating;

    const expectedPlayer = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const expectedOpponent = 1 / (1 + Math.pow(10, (playerRating - opponentRating) / 400));

    const playerScore = winnerId === req.user.userId ? 1 : 0;
    const opponentScore = winnerId === opponentId ? 1 : 0;

    const newPlayerRating = Math.round(playerRating + K * (playerScore - expectedPlayer));
    const newOpponentRating = Math.round(opponentRating + K * (opponentScore - expectedOpponent));

    // Update ratings
    await db.query('UPDATE users SET rating = $1 WHERE id = $2', [newPlayerRating, req.user.userId]);
    await db.query('UPDATE users SET rating = $1 WHERE id = $2', [newOpponentRating, opponentId]);

    res.status(201).json({
      message: 'Battle result recorded',
      matchId: matchResult.rows[0].id,
      ratingChange: {
        player: newPlayerRating - playerRating,
        opponent: newOpponentRating - opponentRating
      },
      newRatings: {
        player: newPlayerRating,
        opponent: newOpponentRating
      }
    });
  } catch (error) {
    console.error('Submit battle error:', error);
    res.status(500).json({ error: 'Failed to submit battle result' });
  }
});

// Get match history
router.get('/matches', authenticateToken, async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const result = await db.query(
      `SELECT 
        pm.id,
        pm.created_at,
        pm.winner_id,
        u1.username as player1_username,
        u2.username as player2_username,
        pm.replay_data
      FROM pvp_matches pm
      JOIN users u1 ON pm.player1_id = u1.id
      JOIN users u2 ON pm.player2_id = u2.id
      WHERE pm.player1_id = $1 OR pm.player2_id = $1
      ORDER BY pm.created_at DESC
      LIMIT $2 OFFSET $3`,
      [req.user.userId, limit, offset]
    );

    res.json({ matches: result.rows });
  } catch (error) {
    console.error('Fetch matches error:', error);
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
});

module.exports = router;
