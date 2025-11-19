const express = require('express');
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Save Pokemon roster (career completion)
router.post('/roster', authenticateToken, async (req, res) => {
  try {
    const { pokemonData, turnNumber } = req.body;

    if (!pokemonData || !turnNumber) {
      return res.status(400).json({ error: 'Pokemon data and turn number required' });
    }

    const result = await db.query(
      `INSERT INTO pokemon_rosters (user_id, pokemon_data, turn_number, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, created_at`,
      [req.user.userId, JSON.stringify(pokemonData), turnNumber]
    );

    res.status(201).json({
      message: 'Pokemon roster saved',
      rosterId: result.rows[0].id,
      createdAt: result.rows[0].created_at
    });
  } catch (error) {
    console.error('Save roster error:', error);
    res.status(500).json({ error: 'Failed to save roster' });
  }
});

// Get user's Pokemon rosters
router.get('/rosters', authenticateToken, async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const result = await db.query(
      `SELECT id, pokemon_data, turn_number, created_at
       FROM pokemon_rosters
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [req.user.userId, limit, offset]
    );

    res.json({ rosters: result.rows });
  } catch (error) {
    console.error('Fetch rosters error:', error);
    res.status(500).json({ error: 'Failed to fetch rosters' });
  }
});

// Get specific roster
router.get('/roster/:rosterId', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT pr.*, u.username
       FROM pokemon_rosters pr
       JOIN users u ON pr.user_id = u.id
       WHERE pr.id = $1`,
      [req.params.rosterId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Roster not found' });
    }

    res.json({ roster: result.rows[0] });
  } catch (error) {
    console.error('Fetch roster error:', error);
    res.status(500).json({ error: 'Failed to fetch roster' });
  }
});

// Delete roster
router.delete('/roster/:rosterId', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM pokemon_rosters WHERE id = $1 AND user_id = $2 RETURNING id',
      [req.params.rosterId, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Roster not found or unauthorized' });
    }

    res.json({ message: 'Roster deleted successfully' });
  } catch (error) {
    console.error('Delete roster error:', error);
    res.status(500).json({ error: 'Failed to delete roster' });
  }
});

module.exports = router;
