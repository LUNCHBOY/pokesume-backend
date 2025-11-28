/**
 * Inventory Management Routes
 * Handles Pokemon and Support Card inventories
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const authenticateToken = require('../middleware/auth');

// ============================================================================
// POKEMON INVENTORY
// ============================================================================

// Get user's Pokemon inventory
router.get('/pokemon', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 100, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT id, pokemon_name, pokemon_data, acquired_at
       FROM pokemon_inventory
       WHERE user_id = $1
       ORDER BY acquired_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM pokemon_inventory WHERE user_id = $1',
      [userId]
    );

    res.json({
      pokemon: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get Pokemon inventory error:', error);
    res.status(500).json({ error: 'Failed to get Pokemon inventory' });
  }
});

// Add Pokemon to inventory (gacha pull)
router.post('/pokemon', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { pokemonName, pokemonData } = req.body;

    if (!pokemonName || !pokemonData) {
      return res.status(400).json({ error: 'Pokemon name and data required' });
    }

    const result = await pool.query(
      `INSERT INTO pokemon_inventory (user_id, pokemon_name, pokemon_data)
       VALUES ($1, $2, $3)
       RETURNING id, pokemon_name, pokemon_data, acquired_at`,
      [userId, pokemonName, JSON.stringify(pokemonData)]
    );

    res.json({
      success: true,
      pokemon: result.rows[0]
    });
  } catch (error) {
    console.error('Add Pokemon error:', error);
    res.status(500).json({ error: 'Failed to add Pokemon to inventory' });
  }
});

// Delete Pokemon from inventory
router.delete('/pokemon/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const pokemonId = req.params.id;

    const result = await pool.query(
      'DELETE FROM pokemon_inventory WHERE id = $1 AND user_id = $2 RETURNING id',
      [pokemonId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Delete Pokemon error:', error);
    res.status(500).json({ error: 'Failed to delete Pokemon' });
  }
});

// ============================================================================
// SUPPORT INVENTORY
// ============================================================================

// Get user's Support inventory
router.get('/supports', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 100, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT id, support_name, support_data, acquired_at
       FROM support_inventory
       WHERE user_id = $1
       ORDER BY acquired_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM support_inventory WHERE user_id = $1',
      [userId]
    );

    res.json({
      supports: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get Support inventory error:', error);
    res.status(500).json({ error: 'Failed to get Support inventory' });
  }
});

// Add Support to inventory (gacha pull)
router.post('/supports', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { supportName, supportData } = req.body;

    if (!supportName || !supportData) {
      return res.status(400).json({ error: 'Support name and data required' });
    }

    const result = await pool.query(
      `INSERT INTO support_inventory (user_id, support_name, support_data)
       VALUES ($1, $2, $3)
       RETURNING id, support_name, support_data, acquired_at`,
      [userId, supportName, JSON.stringify(supportData)]
    );

    res.json({
      success: true,
      support: result.rows[0]
    });
  } catch (error) {
    console.error('Add Support error:', error);
    res.status(500).json({ error: 'Failed to add Support to inventory' });
  }
});

// Delete Support from inventory
router.delete('/supports/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const supportId = req.params.id;

    const result = await pool.query(
      'DELETE FROM support_inventory WHERE id = $1 AND user_id = $2 RETURNING id',
      [supportId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Support not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Delete Support error:', error);
    res.status(500).json({ error: 'Failed to delete Support' });
  }
});

// ============================================================================
// TRAINED POKEMON (ROSTERS)
// ============================================================================

// Get user's trained Pokemon
router.get('/trained', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 100, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT id, pokemon_data, turn_number, created_at
       FROM pokemon_rosters
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM pokemon_rosters WHERE user_id = $1',
      [userId]
    );

    res.json({
      trainedPokemon: result.rows,
      total: parseInt(countResult.rows[0].count),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('Get trained Pokemon error:', error);
    res.status(500).json({ error: 'Failed to get trained Pokemon' });
  }
});

// Delete trained Pokemon from roster
router.delete('/trained/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const trainedId = req.params.id;

    const result = await pool.query(
      'DELETE FROM pokemon_rosters WHERE id = $1 AND user_id = $2 RETURNING id',
      [trainedId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trained Pokemon not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Delete trained Pokemon error:', error);
    res.status(500).json({ error: 'Failed to delete trained Pokemon' });
  }
});

// ============================================================================
// USER PRIMOS
// ============================================================================

// Get user's Primos balance
router.get('/primos', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT primos FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ primos: result.rows[0].primos });
  } catch (error) {
    console.error('Get Primos error:', error);
    res.status(500).json({ error: 'Failed to get Primos balance' });
  }
});

// Update user's Primos (add or subtract)
router.post('/primos', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount } = req.body;

    if (typeof amount !== 'number') {
      return res.status(400).json({ error: 'Amount must be a number' });
    }

    const result = await pool.query(
      'UPDATE users SET primos = primos + $1 WHERE id = $2 RETURNING primos',
      [amount, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      primos: result.rows[0].primos
    });
  } catch (error) {
    console.error('Update Primos error:', error);
    res.status(500).json({ error: 'Failed to update Primos' });
  }
});

module.exports = router;
