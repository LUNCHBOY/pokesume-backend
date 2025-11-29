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
        pm.player1_id,
        pm.player2_id,
        u1.username as player1_username,
        u1.profile_icon as player1_profile_icon,
        u2.username as player2_username,
        u2.profile_icon as player2_profile_icon,
        pm.replay_data,
        pm.match_type,
        pm.player1_rating_change,
        pm.player2_rating_change,
        pm.battles_won_p1,
        pm.battles_won_p2
      FROM pvp_matches pm
      JOIN users u1 ON pm.player1_id = u1.id
      LEFT JOIN users u2 ON pm.player2_id = u2.id
      WHERE pm.player1_id = $1 OR pm.player2_id = $1
      ORDER BY pm.created_at DESC
      LIMIT $2 OFFSET $3`,
      [req.user.userId, limit, offset]
    );

    // Process results to use fake AI usernames
    const processedMatches = result.rows.map(match => {
      const isAIMatch = match.player1_id === match.player2_id;
      let player2Username = match.player2_username;
      let player2ProfileIcon = match.player2_profile_icon || 'pikachu';

      if (isAIMatch) {
        // Parse replay_data to get AI username
        let replayData = match.replay_data;
        if (typeof replayData === 'string') {
          try {
            replayData = JSON.parse(replayData);
          } catch (e) {
            replayData = {};
          }
        }
        player2Username = replayData?.aiOpponentUsername || 'Trainer';
        player2ProfileIcon = 'pikachu'; // Default icon for AI opponents
      }

      return {
        ...match,
        player1_profile_icon: match.player1_profile_icon || 'pikachu',
        player2_username: player2Username,
        player2_profile_icon: player2ProfileIcon,
        replay_data: undefined // Don't send full replay data in list
      };
    });

    res.json({ matches: processedMatches });
  } catch (error) {
    console.error('Fetch matches error:', error);
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
});

// ============================================================================
// MATCHMAKING QUEUE ENDPOINTS
// ============================================================================

// Join matchmaking queue
router.post('/queue', authenticateToken, async (req, res) => {
  try {
    const { pokemon1RosterId, pokemon2RosterId, pokemon3RosterId } = req.body;

    if (!pokemon1RosterId || !pokemon2RosterId || !pokemon3RosterId) {
      return res.status(400).json({ error: 'Three Pokemon rosters required' });
    }

    // Check if user already in queue
    const existingQueue = await db.query(
      'SELECT id FROM pvp_queue WHERE user_id = $1 AND status = $2',
      [req.user.userId, 'waiting']
    );

    if (existingQueue.rows.length > 0) {
      return res.status(400).json({ error: 'Already in matchmaking queue' });
    }

    // Verify user owns all three rosters
    const rostersResult = await db.query(
      'SELECT id FROM pokemon_rosters WHERE user_id = $1 AND id IN ($2, $3, $4)',
      [req.user.userId, pokemon1RosterId, pokemon2RosterId, pokemon3RosterId]
    );

    if (rostersResult.rows.length !== 3) {
      return res.status(400).json({ error: 'Invalid roster IDs or rosters not owned by user' });
    }

    // Get user's current rating
    const userResult = await db.query(
      'SELECT rating FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userRating = userResult.rows[0].rating;

    // Clear any old completed/matched entries for this user
    await db.query(
      'DELETE FROM pvp_queue WHERE user_id = $1',
      [req.user.userId]
    );

    // Insert into queue
    const result = await db.query(
      `INSERT INTO pvp_queue
        (user_id, pokemon1_roster_id, pokemon2_roster_id, pokemon3_roster_id, rating_at_queue, queued_at, status)
       VALUES ($1, $2, $3, $4, $5, NOW(), 'waiting')
       RETURNING id, queued_at`,
      [req.user.userId, pokemon1RosterId, pokemon2RosterId, pokemon3RosterId, userRating]
    );

    // Get queue position
    const positionResult = await db.query(
      `SELECT COUNT(*) as position FROM pvp_queue WHERE status = 'waiting' AND queued_at <= $1`,
      [result.rows[0].queued_at]
    );

    res.status(201).json({
      message: 'Joined matchmaking queue',
      queueId: result.rows[0].id,
      position: parseInt(positionResult.rows[0].position),
      queuedAt: result.rows[0].queued_at
    });
  } catch (error) {
    console.error('Join queue error:', error);
    res.status(500).json({ error: 'Failed to join matchmaking queue' });
  }
});

// Check queue status
router.get('/queue/status', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT
        pq.id,
        pq.status,
        pq.queued_at,
        pq.match_id,
        pq.matched_with_id
      FROM pvp_queue pq
      WHERE pq.user_id = $1
      ORDER BY pq.queued_at DESC
      LIMIT 1`,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.json({ status: 'not_in_queue' });
    }

    const queueEntry = result.rows[0];

    if (queueEntry.status === 'waiting') {
      // Calculate time in queue
      const queueTime = Math.floor((Date.now() - new Date(queueEntry.queued_at).getTime()) / 1000);

      // Get queue position
      const positionResult = await db.query(
        `SELECT COUNT(*) as position FROM pvp_queue WHERE status = 'waiting' AND queued_at <= $1`,
        [queueEntry.queued_at]
      );

      return res.json({
        status: 'waiting',
        queueId: queueEntry.id,
        position: parseInt(positionResult.rows[0].position),
        queueTime
      });
    }

    if (queueEntry.status === 'matched' || queueEntry.status === 'completed') {
      // Get match details
      if (queueEntry.match_id) {
        const matchResult = await db.query(
          `SELECT
            pm.id,
            pm.player1_id,
            pm.player2_id,
            pm.winner_id,
            pm.replay_data,
            pm.player1_rating_change,
            pm.player2_rating_change,
            pm.battles_won_p1,
            pm.battles_won_p2,
            u1.username as player1_username,
            u1.rating as player1_rating,
            u1.profile_icon as player1_profile_icon,
            u2.username as player2_username,
            u2.rating as player2_rating,
            u2.profile_icon as player2_profile_icon
          FROM pvp_matches pm
          JOIN users u1 ON pm.player1_id = u1.id
          LEFT JOIN users u2 ON pm.player2_id = u2.id
          WHERE pm.id = $1`,
          [queueEntry.match_id]
        );

        if (matchResult.rows.length > 0) {
          const match = matchResult.rows[0];
          const isPlayer1 = match.player1_id === req.user.userId;

          // Check if AI match and get fake username
          const isAIMatch = match.player1_id === match.player2_id;
          let opponentUsername = isPlayer1 ? match.player2_username : match.player1_username;

          if (isAIMatch) {
            let replayData = match.replay_data;
            if (typeof replayData === 'string') {
              try {
                replayData = JSON.parse(replayData);
              } catch (e) {
                replayData = {};
              }
            }
            opponentUsername = replayData?.aiOpponentUsername || 'Trainer';
          }

          const opponentProfileIcon = isAIMatch ? 'pikachu' : (isPlayer1 ? match.player2_profile_icon : match.player1_profile_icon) || 'pikachu';

          return res.json({
            status: 'matched',
            matchId: match.id,
            opponent: {
              username: opponentUsername,
              rating: isPlayer1 ? match.player2_rating : match.player1_rating,
              profileIcon: opponentProfileIcon
            },
            result: {
              // Use battles_won to determine winner (handles AI matches where winner_id may be null)
              winner: (isPlayer1 ? (match.battles_won_p1 || 0) > (match.battles_won_p2 || 0) : (match.battles_won_p2 || 0) > (match.battles_won_p1 || 0)) ? 'you' : 'opponent',
              yourBattlesWon: isPlayer1 ? match.battles_won_p1 : match.battles_won_p2,
              opponentBattlesWon: isPlayer1 ? match.battles_won_p2 : match.battles_won_p1,
              ratingChange: isPlayer1 ? match.player1_rating_change : match.player2_rating_change
            }
          });
        }
      }

      return res.json({
        status: queueEntry.status,
        matchId: queueEntry.match_id
      });
    }

    res.json({ status: queueEntry.status });
  } catch (error) {
    console.error('Queue status error:', error);
    res.status(500).json({ error: 'Failed to get queue status' });
  }
});

// Leave matchmaking queue
router.delete('/queue', authenticateToken, async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM pvp_queue WHERE user_id = $1 AND status = $2 RETURNING id',
      [req.user.userId, 'waiting']
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not in matchmaking queue' });
    }

    res.json({ message: 'Left matchmaking queue' });
  } catch (error) {
    console.error('Leave queue error:', error);
    res.status(500).json({ error: 'Failed to leave matchmaking queue' });
  }
});

// Get specific match details with full replay
router.get('/match/:matchId', authenticateToken, async (req, res) => {
  try {
    const { matchId } = req.params;

    const result = await db.query(
      `SELECT
        pm.id,
        pm.player1_id,
        pm.player2_id,
        pm.winner_id,
        pm.replay_data,
        pm.is_ai_opponent,
        pm.player1_rating_change,
        pm.player2_rating_change,
        pm.battles_won_p1,
        pm.battles_won_p2,
        pm.player1_team,
        pm.player2_team,
        pm.created_at,
        u1.username as player1_username,
        u1.rating as player1_rating,
        u2.username as player2_username,
        u2.rating as player2_rating
      FROM pvp_matches pm
      JOIN users u1 ON pm.player1_id = u1.id
      LEFT JOIN users u2 ON pm.player2_id = u2.id
      WHERE pm.id = $1
        AND (pm.player1_id = $2 OR pm.player2_id = $2)`,
      [matchId, req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const match = result.rows[0];
    const isPlayer1 = match.player1_id === req.user.userId;

    // Parse replay data
    let replayData = match.replay_data;
    if (typeof replayData === 'string') {
      replayData = JSON.parse(replayData);
    }

    // Use fake AI username if this was an AI match (player2_id equals player1_id means AI)
    const isAIMatch = match.player1_id === match.player2_id;
    const player2Username = isAIMatch
      ? (replayData.aiOpponentUsername || 'Trainer')
      : match.player2_username;

    res.json({
      matchId: match.id,
      createdAt: match.created_at,
      player1: {
        username: match.player1_username,
        rating: match.player1_rating,
        ratingChange: match.player1_rating_change,
        battlesWon: match.battles_won_p1,
        team: match.player1_team
      },
      player2: {
        username: player2Username,
        rating: match.player2_rating,
        ratingChange: match.player2_rating_change,
        battlesWon: match.battles_won_p2,
        team: match.player2_team
      },
      // Determine winner from battles_won (handles AI matches where winner_id may be null)
      winner: (match.battles_won_p1 || 0) > (match.battles_won_p2 || 0) ? 'player1' : 'player2',
      youAre: isPlayer1 ? 'player1' : 'player2',
      battles: replayData.battles || replayData
    });
  } catch (error) {
    console.error('Get match error:', error);
    res.status(500).json({ error: 'Failed to get match details' });
  }
});

// Get user's PvP stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userResult = await db.query(
      'SELECT rating FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const winsResult = await db.query(
      `SELECT COUNT(*) as wins FROM pvp_matches
       WHERE winner_id = $1 AND match_type = 'matchmaking'`,
      [req.user.userId]
    );

    const lossesResult = await db.query(
      `SELECT COUNT(*) as losses FROM pvp_matches
       WHERE (player1_id = $1 OR player2_id = $1)
       AND winner_id != $1
       AND match_type = 'matchmaking'`,
      [req.user.userId]
    );

    res.json({
      rating: userResult.rows[0].rating,
      wins: parseInt(winsResult.rows[0].wins),
      losses: parseInt(lossesResult.rows[0].losses)
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get PvP stats' });
  }
});

module.exports = router;
