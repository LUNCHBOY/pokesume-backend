/**
 * Career Management Routes
 * Handles active career state and progression
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const authenticateToken = require('../middleware/auth');
const { simulateBattle } = require('../services/battleSimulator');
const { LEGENDARY_POKEMON, POKEMON } = require('../shared/gameData');

// Helper function to generate gym leaders
const generateGymLeaders = () => {
  const allGymLeaders = [
    { name: 'Blaine', type: 'Fire', pokemon: LEGENDARY_POKEMON.Moltres },
    { name: 'Misty', type: 'Water', pokemon: LEGENDARY_POKEMON.Articuno },
    { name: 'Erika', type: 'Grass', pokemon: LEGENDARY_POKEMON.Celebi },
    { name: 'Lt. Surge', type: 'Electric', pokemon: LEGENDARY_POKEMON.Raikou },
    { name: 'Agatha', type: 'Poison', pokemon: LEGENDARY_POKEMON.Gengar },
    { name: 'Giovanni', type: 'Fire', pokemon: LEGENDARY_POKEMON.Entei },
    { name: 'Wallace', type: 'Water', pokemon: LEGENDARY_POKEMON.Suicune },
    { name: 'Wattson', type: 'Electric', pokemon: LEGENDARY_POKEMON.Zapdos },
    { name: 'Will', type: 'Psychic', pokemon: LEGENDARY_POKEMON.Lugia },
    { name: 'Flannery', type: 'Fire', pokemon: LEGENDARY_POKEMON.HoOh },
    { name: 'Sabrina', type: 'Psychic', pokemon: LEGENDARY_POKEMON.Mewtwo },
    { name: 'Juan', type: 'Water', pokemon: LEGENDARY_POKEMON.Kyogre },
    { name: 'Maxie', type: 'Fire', pokemon: LEGENDARY_POKEMON.Groudon },
    { name: 'Winona', type: 'Grass', pokemon: LEGENDARY_POKEMON.Rayquaza },
    { name: 'Bruno', type: 'Fighting', pokemon: LEGENDARY_POKEMON.Dialga }
  ];

  // Randomly shuffle and pick 5 gym leaders
  const shuffled = [...allGymLeaders].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};

// Helper function to generate wild battles
const generateWildBattles = (turn) => {
  const startMultiplier = 1.0 * 1.04;
  const growthPerTurn = 0.03125 * 1.04 * 1.3 * 1.25;
  const difficultyMult = startMultiplier + (turn * growthPerTurn);

  // Randomly select 2 pokemons from all available pokemons
  const allPokemons = Object.values(POKEMON);
  const shuffled = [...allPokemons].sort(() => Math.random() - 0.5);
  const selectedPokemons = shuffled.slice(0, 2);

  return selectedPokemons.map(pokemon => {
    // Determine move pool based on turn
    let availableAbilities = [...pokemon.defaultAbilities];

    // Add learnable abilities progressively
    if (turn >= 8) {
      availableAbilities.push(...pokemon.learnableAbilities.slice(0, 2));
    }
    if (turn >= 16) {
      availableAbilities.push(...pokemon.learnableAbilities.slice(2, 4));
    }
    if (turn >= 24) {
      availableAbilities.push(...pokemon.learnableAbilities.slice(4));
    }

    // Scale stats based on difficulty
    const scaledStats = {};
    Object.keys(pokemon.baseStats).forEach(stat => {
      scaledStats[stat] = Math.floor(pokemon.baseStats[stat] * difficultyMult);
    });

    return {
      name: pokemon.name,
      primaryType: pokemon.primaryType,
      stats: scaledStats,
      abilities: availableAbilities,
      typeAptitudes: pokemon.typeAptitudes,
      strategy: pokemon.strategy,
      strategyGrade: pokemon.strategyGrade
    };
  });
};

// Get active career state
router.get('/active', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({ hasActiveCareer: false });
    }

    res.json({
      hasActiveCareer: true,
      careerState: result.rows[0].career_state
    });
  } catch (error) {
    console.error('Get active career error:', error);
    res.status(500).json({ error: 'Failed to get active career' });
  }
});

// Start new career
router.post('/start', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { pokemon, selectedSupports } = req.body;

    if (!pokemon || !selectedSupports) {
      return res.status(400).json({ error: 'Pokemon and supports required' });
    }

    // Initialize support friendships
    const supportFriendships = {};
    selectedSupports.forEach(supportName => {
      supportFriendships[supportName] = 0;
    });

    // Generate gym leaders and initial wild battles
    const gymLeaders = generateGymLeaders();
    const availableBattles = generateWildBattles(1);

    // Initialize career state
    const careerState = {
      pokemon,
      selectedSupports,
      basePokemonName: pokemon.name,
      evolutionStage: 0,
      currentStats: { ...pokemon.baseStats },
      energy: 100,
      turn: 1,
      skillPoints: 30,
      knownAbilities: [...pokemon.defaultAbilities],
      learnableAbilities: [...(pokemon.learnableAbilities || [])],
      moveHints: {},
      turnHistory: [],
      turnLog: [],
      inspirations: [],
      supportFriendships,
      completedHangouts: [],
      pokeclockRetries: 3,
      hasUsedPokeclock: false,
      gymLeaders,
      currentGymIndex: 0,
      availableBattles,
      currentTrainingOptions: null,
      pendingEvent: null
    };

    // Check if user already has active career
    const existing = await pool.query(
      'SELECT id FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (existing.rows.length > 0) {
      // Update existing
      await pool.query(
        'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
        [JSON.stringify(careerState), userId]
      );
    } else {
      // Insert new
      await pool.query(
        'INSERT INTO active_careers (user_id, career_state) VALUES ($1, $2)',
        [userId, JSON.stringify(careerState)]
      );
    }

    res.json({ success: true, careerState });
  } catch (error) {
    console.error('Start career error:', error);
    res.status(500).json({ error: 'Failed to start career' });
  }
});

// Update career state
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { careerState } = req.body;

    if (!careerState) {
      return res.status(400).json({ error: 'Career state required' });
    }

    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(careerState), userId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Update career error:', error);
    res.status(500).json({ error: 'Failed to update career' });
  }
});

// Process battle (server-authoritative)
router.post('/battle', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { opponent, isGymLeader } = req.body;

    if (!opponent) {
      return res.status(400).json({ error: 'Opponent required' });
    }

    // Get active career
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    // Check energy for wild battles
    if (!isGymLeader && careerState.energy <= 0) {
      return res.status(400).json({ error: 'Not enough energy for wild battle' });
    }

    // Prepare player Pokemon
    const playerPokemon = {
      name: careerState.pokemon.name,
      primaryType: careerState.pokemon.primaryType,
      stats: { ...careerState.currentStats },
      abilities: careerState.knownAbilities,
      typeAptitudes: careerState.pokemon.typeAptitudes,
      strategy: careerState.pokemon.strategy,
      strategyGrade: careerState.pokemon.strategyGrade
    };

    // Simulate battle
    const battleResult = simulateBattle(playerPokemon, opponent);

    // Determine if player won
    const playerWon = battleResult.winner === 1;

    // Calculate rewards/penalties
    let statGain = 0;
    let skillPoints = 0;
    let energyChange = 0;

    if (playerWon) {
      if (isGymLeader) {
        // Gym leader victory
        statGain = 5;
        skillPoints = 10;
      } else {
        // Wild battle victory
        statGain = 15; // 50% increased from base
        skillPoints = 0;
        energyChange = 0; // No energy cost on victory
      }
    } else {
      // Defeat
      if (isGymLeader) {
        // Gym leader defeat ends career
        statGain = 0;
        skillPoints = 0;
      } else {
        // Wild battle defeat
        energyChange = -5;
      }
    }

    res.json({
      success: true,
      battleResult: {
        winner: playerWon ? 'player' : 'opponent',
        battleLog: battleResult.battleLog,
        rewards: {
          statGain,
          skillPoints,
          energyChange
        }
      }
    });
  } catch (error) {
    console.error('Battle error:', error);
    res.status(500).json({ error: 'Failed to process battle' });
  }
});

// Complete career (save to trained pokemon)
router.post('/complete', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { careerState, completionType } = req.body;

    if (!careerState || !completionType) {
      return res.status(400).json({ error: 'Career state and completion type required' });
    }

    // Save to pokemon_rosters (trained pokemon)
    const pokemonData = {
      name: careerState.pokemon.name,
      primaryType: careerState.pokemon.primaryType,
      stats: careerState.currentStats,
      abilities: careerState.knownAbilities,
      typeAptitudes: careerState.pokemon.typeAptitudes,
      strategy: careerState.pokemon.strategy,
      strategyGrade: careerState.pokemon.strategyGrade,
      inspirations: careerState.inspirations || null,
      completionType,
      turnNumber: careerState.turn
    };

    await pool.query(
      'INSERT INTO pokemon_rosters (user_id, pokemon_data, turn_number) VALUES ($1, $2, $3)',
      [userId, JSON.stringify(pokemonData), careerState.turn]
    );

    // Delete active career
    await pool.query(
      'DELETE FROM active_careers WHERE user_id = $1',
      [userId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Complete career error:', error);
    res.status(500).json({ error: 'Failed to complete career' });
  }
});

// Abandon career
router.delete('/abandon', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    await pool.query(
      'DELETE FROM active_careers WHERE user_id = $1',
      [userId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Abandon career error:', error);
    res.status(500).json({ error: 'Failed to abandon career' });
  }
});

module.exports = router;
