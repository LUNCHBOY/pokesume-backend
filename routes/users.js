import express from 'express';
import * as db from '../config/database.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, username, email, rating, created_at,
       (SELECT COUNT(*) FROM pvp_matches WHERE winner_id = users.id) as wins,
       (SELECT COUNT(*) FROM pvp_matches WHERE (player1_id = users.id OR player2_id = users.id) AND winner_id != users.id) as losses
       FROM users WHERE id = $1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get user stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
        (SELECT COUNT(*) FROM pvp_matches WHERE winner_id = $1) as total_wins,
        (SELECT COUNT(*) FROM pvp_matches WHERE (player1_id = $1 OR player2_id = $1) AND winner_id != $1) as total_losses,
        (SELECT COUNT(*) FROM pokemon_rosters WHERE user_id = $1) as total_pokemon,
        (SELECT rating FROM users WHERE id = $1) as current_rating,
        (SELECT COUNT(*) FROM battle_replays WHERE user_id = $1) as total_battles
      `,
      [req.user.userId]
    );

    res.json({ stats: result.rows[0] });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
