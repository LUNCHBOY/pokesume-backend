const express = require('express');
const db = require('../config/database');
const authenticateToken = require('../middleware/auth');
const { GYM_BADGES } = require('../services/tournamentProcessor');

const router = express.Router();

// Available profile icons
const PROFILE_ICONS = [
  'pikachu',
  'squirtle',
  'charmander',
  'bulbasaur',
  'mewtwo',
  'officer-jenny'
];

// Get user profile with badges and stats
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Get user info - try with profile_icon, fallback without it if column doesn't exist
    let userResult;
    try {
      userResult = await db.query(
        'SELECT id, username, rating, primos, profile_icon, created_at FROM users WHERE id = $1',
        [req.user.userId]
      );
    } catch (dbError) {
      // If profile_icon column doesn't exist, query without it
      if (dbError.message.includes('profile_icon')) {
        userResult = await db.query(
          'SELECT id, username, rating, primos, created_at FROM users WHERE id = $1',
          [req.user.userId]
        );
      } else {
        throw dbError;
      }
    }

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // Get user badges
    const badgesResult = await db.query(
      `SELECT badge_key, level, first_earned_at, last_upgraded_at
       FROM user_badges
       WHERE user_id = $1
       ORDER BY first_earned_at ASC`,
      [req.user.userId]
    );

    // Get most powerful pokemon from roster
    // Stats are nested under pokemon_data.stats
    const topPokemonResult = await db.query(
      `SELECT pokemon_data
       FROM pokemon_rosters
       WHERE user_id = $1
       ORDER BY (
         (pokemon_data->'stats'->>'HP')::int +
         (pokemon_data->'stats'->>'Attack')::int +
         (pokemon_data->'stats'->>'Defense')::int +
         (pokemon_data->'stats'->>'Instinct')::int +
         (pokemon_data->'stats'->>'Speed')::int
       ) DESC
       LIMIT 1`,
      [req.user.userId]
    );

    // Get tournament stats
    const tournamentStatsResult = await db.query(
      `SELECT
         COUNT(DISTINCT te.tournament_id) as tournaments_entered,
         COUNT(DISTINCT CASE WHEN tm.winner_entry_id = te.id THEN tm.id END) as matches_won
       FROM tournament_entries te
       LEFT JOIN tournament_matches tm ON tm.player1_entry_id = te.id OR tm.player2_entry_id = te.id
       WHERE te.user_id = $1`,
      [req.user.userId]
    );

    const stats = tournamentStatsResult.rows[0] || { tournaments_entered: 0, matches_won: 0 };

    res.json({
      user: {
        id: user.id,
        username: user.username,
        rating: user.rating,
        primos: user.primos,
        profileIcon: user.profile_icon || 'pikachu',
        memberSince: user.created_at
      },
      badges: badgesResult.rows,
      topPokemon: topPokemonResult.rows.map(r => r.pokemon_data),
      stats: {
        tournamentsEntered: parseInt(stats.tournaments_entered) || 0,
        matchesWon: parseInt(stats.matches_won) || 0,
        badgesCollected: badgesResult.rows.length
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get available profile icons
router.get('/icons', (req, res) => {
  res.json({ icons: PROFILE_ICONS });
});

// Update profile icon
router.put('/icon', authenticateToken, async (req, res) => {
  try {
    const { icon } = req.body;

    if (!icon || !PROFILE_ICONS.includes(icon)) {
      return res.status(400).json({ error: 'Invalid profile icon' });
    }

    try {
      await db.query(
        'UPDATE users SET profile_icon = $1 WHERE id = $2',
        [icon, req.user.userId]
      );
    } catch (dbError) {
      // If profile_icon column doesn't exist, return success anyway (icon stored client-side only)
      if (dbError.message.includes('profile_icon')) {
        console.warn('profile_icon column does not exist, skipping database update');
        return res.json({ message: 'Profile icon updated (local only)', profileIcon: icon });
      }
      throw dbError;
    }

    res.json({ message: 'Profile icon updated', profileIcon: icon });
  } catch (error) {
    console.error('Update profile icon error:', error);
    res.status(500).json({ error: 'Failed to update profile icon' });
  }
});

// Get all badge definitions
router.get('/badges/all', async (req, res) => {
  try {
    res.json({ badges: GYM_BADGES });
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
});

// Get user's badge collection
router.get('/badges', authenticateToken, async (req, res) => {
  try {
    const badgesResult = await db.query(
      `SELECT badge_key, level, first_earned_at, last_upgraded_at
       FROM user_badges
       WHERE user_id = $1
       ORDER BY first_earned_at ASC`,
      [req.user.userId]
    );

    res.json({
      badges: badgesResult.rows,
      allBadges: GYM_BADGES
    });
  } catch (error) {
    console.error('Get user badges error:', error);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
});

module.exports = router;
