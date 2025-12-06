import express from 'express';
import * as db from '../config/database.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Get global leaderboard
router.get('/', async (req, res) => {
  try {
    const { limit = 100, offset = 0 } = req.query;

    const result = await db.query(
      `SELECT
        u.id,
        u.username,
        u.rating,
        (SELECT COUNT(*) FROM pvp_matches WHERE winner_id = u.id) as wins,
        (SELECT COUNT(*) FROM pvp_matches WHERE (player1_id = u.id OR player2_id = u.id) AND winner_id != u.id) as losses,
        ROW_NUMBER() OVER (ORDER BY u.rating DESC) as rank
      FROM users u
      WHERE (SELECT COUNT(*) FROM pvp_matches WHERE player1_id = u.id OR player2_id = u.id) > 0
      ORDER BY u.rating DESC
      LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({ leaderboard: result.rows });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user's rank
router.get('/rank', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `WITH ranked_users AS (
        SELECT
          u.id,
          u.username,
          u.rating,
          (SELECT COUNT(*) FROM pvp_matches WHERE winner_id = u.id) as wins,
          (SELECT COUNT(*) FROM pvp_matches WHERE (player1_id = u.id OR player2_id = u.id) AND winner_id != u.id) as losses,
          ROW_NUMBER() OVER (ORDER BY u.rating DESC) as rank
        FROM users u
        WHERE (SELECT COUNT(*) FROM pvp_matches WHERE player1_id = u.id OR player2_id = u.id) > 0
      )
      SELECT * FROM ranked_users WHERE id = $1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.json({
        rank: null,
        message: 'User not ranked (no PVP matches played)'
      });
    }

    res.json({ userRank: result.rows[0] });
  } catch (error) {
    console.error('Rank error:', error);
    res.status(500).json({ error: 'Failed to fetch rank' });
  }
});

// Get top players by wins
router.get('/top-wins', async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const result = await db.query(
      `SELECT
        u.id,
        u.username,
        u.rating,
        COUNT(*) as total_wins
      FROM pvp_matches pm
      JOIN users u ON pm.winner_id = u.id
      GROUP BY u.id, u.username, u.rating
      ORDER BY total_wins DESC, u.rating DESC
      LIMIT $1`,
      [limit]
    );

    res.json({ topWinners: result.rows });
  } catch (error) {
    console.error('Top wins error:', error);
    res.status(500).json({ error: 'Failed to fetch top winners' });
  }
});

export default router;
