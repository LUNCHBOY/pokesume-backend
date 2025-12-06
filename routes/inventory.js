/**
 * Inventory Management Routes
 * Handles Pokemon and Support Card inventories with Limit Break system
 */

import express from 'express';
import { pool } from '../config/database.js';
import authenticateToken from '../middleware/auth.js';
import { POKEMON, LEGENDARY_POKEMON, GACHA_RARITY, SUPPORT_CARDS, SUPPORT_GACHA_RARITY } from '../shared/gameData.js';

const router = express.Router();

// Limit break shard rewards by rarity (when pulling max limit break duplicates)
const LIMIT_BREAK_SHARD_REWARDS = {
  Common: 1,
  Uncommon: 3,
  Rare: 5,
  Legendary: 20
};

// Max limit break level
const MAX_LIMIT_BREAK = 4;

// ============================================================================
// POKEMON INVENTORY
// ============================================================================

// Get user's Pokemon inventory
router.get('/pokemon', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 100, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT id, pokemon_name, pokemon_data, limit_break_level, acquired_at
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

// Add Pokemon to inventory (gacha pull) with limit break system - SERVER-AUTHORITATIVE
router.post('/pokemon', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { pokemonName } = req.body;

    if (!pokemonName) {
      return res.status(400).json({ error: 'Pokemon name required' });
    }

    // SERVER-AUTHORITATIVE: Validate Pokemon exists and get server data
    // Check both regular and legendary Pokemon pools
    const serverPokemon = POKEMON[pokemonName] || LEGENDARY_POKEMON[pokemonName];

    if (!serverPokemon) {
      console.error('[Inventory] Invalid Pokemon name in gacha:', pokemonName);
      return res.status(400).json({
        error: 'Invalid Pokemon - not found in game data',
        code: 'INVALID_POKEMON'
      });
    }

    // Determine rarity from server data (don't trust client)
    const isLegendary = !!LEGENDARY_POKEMON[pokemonName];
    const rarity = isLegendary ? 'Legendary' : (serverPokemon.rarity || 'Common');

    // Use SERVER's Pokemon data instead of client-sent data
    const pokemonData = {
      name: serverPokemon.name,
      primaryType: serverPokemon.primaryType,
      baseStats: serverPokemon.baseStats,
      defaultAbilities: serverPokemon.defaultAbilities,
      learnableAbilities: serverPokemon.learnableAbilities,
      typeAptitudes: serverPokemon.typeAptitudes,
      strategyAptitudes: serverPokemon.strategyAptitudes,
      rarity: rarity
    };

    // Check if user already owns this Pokemon
    const existingResult = await pool.query(
      'SELECT id, limit_break_level FROM pokemon_inventory WHERE user_id = $1 AND pokemon_name = $2',
      [userId, pokemonName]
    );

    if (existingResult.rows.length > 0) {
      // Pokemon already owned - handle limit break
      const existing = existingResult.rows[0];
      const currentLevel = existing.limit_break_level || 0;

      if (currentLevel >= MAX_LIMIT_BREAK) {
        // Already at max limit break - award shards instead
        const shardReward = LIMIT_BREAK_SHARD_REWARDS[rarity] || LIMIT_BREAK_SHARD_REWARDS.Common;

        await pool.query(
          'UPDATE users SET limit_break_shards = limit_break_shards + $1 WHERE id = $2',
          [shardReward, userId]
        );

        // Get updated shard count
        const shardResult = await pool.query(
          'SELECT limit_break_shards FROM users WHERE id = $1',
          [userId]
        );

        return res.json({
          success: true,
          isDuplicate: true,
          isMaxLimitBreak: true,
          shardsAwarded: shardReward,
          totalShards: shardResult.rows[0].limit_break_shards,
          pokemon: {
            id: existing.id,
            pokemon_name: pokemonName,
            limit_break_level: currentLevel
          }
        });
      } else {
        // Increase limit break level
        const newLevel = currentLevel + 1;
        const updateResult = await pool.query(
          `UPDATE pokemon_inventory
           SET limit_break_level = $1
           WHERE id = $2
           RETURNING id, pokemon_name, pokemon_data, limit_break_level, acquired_at`,
          [newLevel, existing.id]
        );

        return res.json({
          success: true,
          isDuplicate: true,
          isMaxLimitBreak: false,
          limitBreakLevel: newLevel,
          pokemon: updateResult.rows[0]
        });
      }
    }

    // New Pokemon - add to inventory
    const result = await pool.query(
      `INSERT INTO pokemon_inventory (user_id, pokemon_name, pokemon_data, limit_break_level)
       VALUES ($1, $2, $3, 0)
       RETURNING id, pokemon_name, pokemon_data, limit_break_level, acquired_at`,
      [userId, pokemonName, JSON.stringify(pokemonData)]
    );

    res.json({
      success: true,
      isDuplicate: false,
      isMaxLimitBreak: false,
      limitBreakLevel: 0,
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
      `SELECT id, support_name, support_data, limit_break_level, acquired_at
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

// Add Support to inventory (gacha pull) with limit break system - SERVER-AUTHORITATIVE
router.post('/supports', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { supportName } = req.body;

    if (!supportName) {
      return res.status(400).json({ error: 'Support name required' });
    }

    // SERVER-AUTHORITATIVE: Validate Support exists and get server data
    const serverSupport = SUPPORT_CARDS[supportName];

    if (!serverSupport) {
      console.error('[Inventory] Invalid Support name in gacha:', supportName);
      return res.status(400).json({
        error: 'Invalid Support - not found in game data',
        code: 'INVALID_SUPPORT'
      });
    }

    // Determine rarity from server data (don't trust client)
    const rarity = serverSupport.rarity || 'Common';

    // Use SERVER's Support data instead of client-sent data
    const supportData = {
      name: serverSupport.name,
      trainer: serverSupport.trainer,
      rarity: rarity,
      supportType: serverSupport.supportType,
      baseStats: serverSupport.baseStats,
      trainingBonus: serverSupport.trainingBonus,
      initialFriendship: serverSupport.initialFriendship,
      appearanceRate: serverSupport.appearanceRate,
      typeMatchPreference: serverSupport.typeMatchPreference,
      specialEffect: serverSupport.specialEffect,
      moveHints: serverSupport.moveHints,
      description: serverSupport.description
    };

    // Check if user already owns this Support
    const existingResult = await pool.query(
      'SELECT id, limit_break_level FROM support_inventory WHERE user_id = $1 AND support_name = $2',
      [userId, supportName]
    );

    if (existingResult.rows.length > 0) {
      // Support already owned - handle limit break
      const existing = existingResult.rows[0];
      const currentLevel = existing.limit_break_level || 0;

      if (currentLevel >= MAX_LIMIT_BREAK) {
        // Already at max limit break - award shards instead
        const shardReward = LIMIT_BREAK_SHARD_REWARDS[rarity] || LIMIT_BREAK_SHARD_REWARDS.Common;

        await pool.query(
          'UPDATE users SET limit_break_shards = limit_break_shards + $1 WHERE id = $2',
          [shardReward, userId]
        );

        // Get updated shard count
        const shardResult = await pool.query(
          'SELECT limit_break_shards FROM users WHERE id = $1',
          [userId]
        );

        return res.json({
          success: true,
          isDuplicate: true,
          isMaxLimitBreak: true,
          shardsAwarded: shardReward,
          totalShards: shardResult.rows[0].limit_break_shards,
          support: {
            id: existing.id,
            support_name: supportName,
            limit_break_level: currentLevel
          }
        });
      } else {
        // Increase limit break level
        const newLevel = currentLevel + 1;
        const updateResult = await pool.query(
          `UPDATE support_inventory
           SET limit_break_level = $1
           WHERE id = $2
           RETURNING id, support_name, support_data, limit_break_level, acquired_at`,
          [newLevel, existing.id]
        );

        return res.json({
          success: true,
          isDuplicate: true,
          isMaxLimitBreak: false,
          limitBreakLevel: newLevel,
          support: updateResult.rows[0]
        });
      }
    }

    // New Support - add to inventory
    const result = await pool.query(
      `INSERT INTO support_inventory (user_id, support_name, support_data, limit_break_level)
       VALUES ($1, $2, $3, 0)
       RETURNING id, support_name, support_data, limit_break_level, acquired_at`,
      [userId, supportName, JSON.stringify(supportData)]
    );

    res.json({
      success: true,
      isDuplicate: false,
      isMaxLimitBreak: false,
      limitBreakLevel: 0,
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
// USER CURRENCIES (Primos & Limit Break Shards)
// ============================================================================

// Get all user currencies
router.get('/currencies', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT primos, limit_break_shards FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      primos: result.rows[0].primos,
      limitBreakShards: result.rows[0].limit_break_shards || 0
    });
  } catch (error) {
    console.error('Get currencies error:', error);
    res.status(500).json({ error: 'Failed to get currencies' });
  }
});

// Get user's Primos balance (legacy endpoint)
router.get('/primos', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT primos, limit_break_shards FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      primos: result.rows[0].primos,
      limitBreakShards: result.rows[0].limit_break_shards || 0
    });
  } catch (error) {
    console.error('Get Primos error:', error);
    res.status(500).json({ error: 'Failed to get Primos balance' });
  }
});

// ============================================================================
// LIMIT BREAK WITH SHARDS
// ============================================================================

const SHARD_COST_PER_LIMIT_BREAK = 10;

// Limit break a Pokemon using shards
router.post('/pokemon/:id/limit-break', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const pokemonId = req.params.id;

    // Get current Pokemon and user shards
    const pokemonResult = await pool.query(
      'SELECT id, pokemon_name, limit_break_level FROM pokemon_inventory WHERE id = $1 AND user_id = $2',
      [pokemonId, userId]
    );

    if (pokemonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }

    const pokemon = pokemonResult.rows[0];
    const currentLevel = pokemon.limit_break_level || 0;

    if (currentLevel >= MAX_LIMIT_BREAK) {
      return res.status(400).json({ error: 'Pokemon is already at max limit break level' });
    }

    // Check user's shards
    const userResult = await pool.query(
      'SELECT limit_break_shards FROM users WHERE id = $1',
      [userId]
    );

    const currentShards = userResult.rows[0].limit_break_shards || 0;

    if (currentShards < SHARD_COST_PER_LIMIT_BREAK) {
      return res.status(400).json({
        error: 'Not enough limit break shards',
        required: SHARD_COST_PER_LIMIT_BREAK,
        current: currentShards
      });
    }

    // Deduct shards and increase limit break level
    const newLevel = currentLevel + 1;

    await pool.query(
      'UPDATE users SET limit_break_shards = limit_break_shards - $1 WHERE id = $2',
      [SHARD_COST_PER_LIMIT_BREAK, userId]
    );

    await pool.query(
      'UPDATE pokemon_inventory SET limit_break_level = $1 WHERE id = $2',
      [newLevel, pokemonId]
    );

    // Get updated values
    const updatedUserResult = await pool.query(
      'SELECT limit_break_shards FROM users WHERE id = $1',
      [userId]
    );

    res.json({
      success: true,
      pokemon_name: pokemon.pokemon_name,
      newLimitBreakLevel: newLevel,
      shardsSpent: SHARD_COST_PER_LIMIT_BREAK,
      remainingShards: updatedUserResult.rows[0].limit_break_shards
    });
  } catch (error) {
    console.error('Pokemon limit break error:', error);
    res.status(500).json({ error: 'Failed to limit break Pokemon' });
  }
});

// Limit break a Support using shards
router.post('/supports/:id/limit-break', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const supportId = req.params.id;

    // Get current Support and user shards
    const supportResult = await pool.query(
      'SELECT id, support_name, limit_break_level FROM support_inventory WHERE id = $1 AND user_id = $2',
      [supportId, userId]
    );

    if (supportResult.rows.length === 0) {
      return res.status(404).json({ error: 'Support not found' });
    }

    const support = supportResult.rows[0];
    const currentLevel = support.limit_break_level || 0;

    if (currentLevel >= MAX_LIMIT_BREAK) {
      return res.status(400).json({ error: 'Support is already at max limit break level' });
    }

    // Check user's shards
    const userResult = await pool.query(
      'SELECT limit_break_shards FROM users WHERE id = $1',
      [userId]
    );

    const currentShards = userResult.rows[0].limit_break_shards || 0;

    if (currentShards < SHARD_COST_PER_LIMIT_BREAK) {
      return res.status(400).json({
        error: 'Not enough limit break shards',
        required: SHARD_COST_PER_LIMIT_BREAK,
        current: currentShards
      });
    }

    // Deduct shards and increase limit break level
    const newLevel = currentLevel + 1;

    await pool.query(
      'UPDATE users SET limit_break_shards = limit_break_shards - $1 WHERE id = $2',
      [SHARD_COST_PER_LIMIT_BREAK, userId]
    );

    await pool.query(
      'UPDATE support_inventory SET limit_break_level = $1 WHERE id = $2',
      [newLevel, supportId]
    );

    // Get updated values
    const updatedUserResult = await pool.query(
      'SELECT limit_break_shards FROM users WHERE id = $1',
      [userId]
    );

    res.json({
      success: true,
      support_name: support.support_name,
      newLimitBreakLevel: newLevel,
      shardsSpent: SHARD_COST_PER_LIMIT_BREAK,
      remainingShards: updatedUserResult.rows[0].limit_break_shards
    });
  } catch (error) {
    console.error('Support limit break error:', error);
    res.status(500).json({ error: 'Failed to limit break Support' });
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

// ============================================================================
// SUPPORT DECKS
// ============================================================================

const TOTAL_DECKS = 5;
const SLOTS_PER_DECK = 5;

// Get all support decks for user
router.get('/support-decks', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if support_decks column exists in users table, if not return default
    const result = await pool.query(
      'SELECT support_decks FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return existing decks or default empty decks
    const decks = result.rows[0].support_decks ||
      Array(TOTAL_DECKS).fill(null).map(() => Array(SLOTS_PER_DECK).fill(null));

    res.json({ decks });
  } catch (error) {
    // If support_decks column doesn't exist, return default empty decks
    if (error.code === '42703') { // undefined_column error
      console.log('support_decks column not found, returning default');
      return res.json({
        decks: Array(TOTAL_DECKS).fill(null).map(() => Array(SLOTS_PER_DECK).fill(null))
      });
    }
    console.error('Get support decks error:', error);
    res.status(500).json({ error: 'Failed to get support decks' });
  }
});

// Save a specific support deck
router.put('/support-decks/:deckIndex', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const deckIndex = parseInt(req.params.deckIndex);
    const { supports } = req.body;

    // Validate deck index
    if (deckIndex < 0 || deckIndex >= TOTAL_DECKS) {
      return res.status(400).json({ error: 'Invalid deck index' });
    }

    // Validate supports array
    if (!Array.isArray(supports) || supports.length !== SLOTS_PER_DECK) {
      return res.status(400).json({ error: 'Invalid supports array - must have exactly 5 slots' });
    }

    // Get current decks
    const currentResult = await pool.query(
      'SELECT support_decks FROM users WHERE id = $1',
      [userId]
    );

    if (currentResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get existing decks or create default
    let decks = currentResult.rows[0].support_decks ||
      Array(TOTAL_DECKS).fill(null).map(() => Array(SLOTS_PER_DECK).fill(null));

    // Update the specific deck
    decks[deckIndex] = supports;

    // Save updated decks
    const result = await pool.query(
      'UPDATE users SET support_decks = $1 WHERE id = $2 RETURNING support_decks',
      [JSON.stringify(decks), userId]
    );

    res.json({
      success: true,
      decks: result.rows[0].support_decks
    });
  } catch (error) {
    // If support_decks column doesn't exist, we need to create it first
    if (error.code === '42703') { // undefined_column error
      console.error('support_decks column not found - please run database migration');
      return res.status(500).json({
        error: 'Database migration required - support_decks column missing'
      });
    }
    console.error('Save support deck error:', error);
    res.status(500).json({ error: 'Failed to save support deck' });
  }
});

export default router;
