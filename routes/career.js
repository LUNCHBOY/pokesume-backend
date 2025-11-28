/**
 * Career Management Routes
 * Handles active career state and progression
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const authenticateToken = require('../middleware/auth');
const { simulateBattle } = require('../services/battleSimulator');
const { LEGENDARY_POKEMON, GYM_LEADER_POKEMON, ELITE_FOUR, POKEMON, GAME_CONFIG, RANDOM_EVENTS, HANGOUT_EVENTS, SUPPORT_CARDS } = require('../shared/gameData');

// Helper function to generate gym leaders (now uses non-legendary signature Pokemon)
const generateGymLeaders = () => {
  const allGymLeaders = [
    { name: 'Blaine', type: 'Fire', pokemon: GYM_LEADER_POKEMON.BlaineArcanine },
    { name: 'Misty', type: 'Water', pokemon: GYM_LEADER_POKEMON.MistyStarmie },
    { name: 'Erika', type: 'Grass', pokemon: GYM_LEADER_POKEMON.ErikaVileplume },
    { name: 'Lt. Surge', type: 'Electric', pokemon: GYM_LEADER_POKEMON.SurgeRaichu },
    { name: 'Agatha', type: 'Poison', pokemon: GYM_LEADER_POKEMON.AgathaNidoking },
    { name: 'Giovanni', type: 'Fire', pokemon: GYM_LEADER_POKEMON.GiovanniRapidash },
    { name: 'Wallace', type: 'Water', pokemon: GYM_LEADER_POKEMON.WallaceLapras },
    { name: 'Wattson', type: 'Electric', pokemon: GYM_LEADER_POKEMON.WattsonElectabuzz },
    { name: 'Will', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.WillWeezing },
    { name: 'Flannery', type: 'Fire', pokemon: GYM_LEADER_POKEMON.FlanneryMagmar },
    { name: 'Sabrina', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.SabrinaArbok },
    { name: 'Juan', type: 'Water', pokemon: GYM_LEADER_POKEMON.JuanVaporeon },
    { name: 'Winona', type: 'Grass', pokemon: GYM_LEADER_POKEMON.WinonaExeggutor },
    { name: 'Bruno', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.BrunoMachamp }
  ];

  // Randomly shuffle and pick 4 gym leaders (Elite 4 on turns 60-63)
  const shuffled = [...allGymLeaders].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
};

// Helper function to calculate difficulty multiplier based on turn
// Scaling: 1.0x until turn 12, then scales to 3.5x at turn 60
const calculateDifficultyMultiplier = (turn) => {
  // No scaling before turn 12
  if (turn < 12) {
    return 1.0;
  }
  // After turn 12, scale from 1.0 to 3.5x at turn 60
  // 48 turns (12 to 60) to go from 1.0 to 3.5 = 2.5 increase over 48 turns
  const growthPerTurn = 2.5 / 48; // ~0.052 per turn
  return 1.0 + ((turn - 12) * growthPerTurn);
};

// Elite Four fixed multipliers (used instead of turn-based scaling)
const ELITE_FOUR_MULTIPLIERS = {
  0: 3.5,   // Lorelei (turn 60)
  1: 3.7,   // Bruno (turn 61)
  2: 3.9,   // Agatha (turn 62)
  3: 4.25   // Lance (turn 63)
};

// Helper function to scale Pokemon stats based on turn difficulty
const scaleStats = (baseStats, turn) => {
  const difficultyMult = calculateDifficultyMultiplier(turn);
  const scaledStats = {};
  Object.keys(baseStats).forEach(stat => {
    scaledStats[stat] = Math.floor(baseStats[stat] * difficultyMult);
  });
  return scaledStats;
};

// Helper function to scale Pokemon stats with a fixed multiplier
const scaleStatsWithMultiplier = (baseStats, multiplier) => {
  const scaledStats = {};
  Object.keys(baseStats).forEach(stat => {
    scaledStats[stat] = Math.floor(baseStats[stat] * multiplier);
  });
  return scaledStats;
};

// Helper function to generate wild battles
const generateWildBattles = (turn) => {
  const gymLeaderMult = calculateDifficultyMultiplier(turn);
  // Wild pokemon are 25% weaker than gym leaders at the same turn
  const wildMult = gymLeaderMult * 0.75;

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

    // Scale stats based on wild difficulty (25% weaker than gym leaders)
    const scaledStats = {};
    Object.keys(pokemon.baseStats).forEach(stat => {
      scaledStats[stat] = Math.floor(pokemon.baseStats[stat] * wildMult);
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

// Helper to migrate old career states
const migrateCareerState = (careerState) => {
  let updated = false;
  const migrated = { ...careerState };

  // Ensure skillPoints is initialized
  if (migrated.skillPoints === undefined || migrated.skillPoints === null || isNaN(migrated.skillPoints)) {
    migrated.skillPoints = 30;
    updated = true;
  }

  // Ensure supportFriendships is initialized
  if (!migrated.supportFriendships || typeof migrated.supportFriendships !== 'object') {
    migrated.supportFriendships = {};
    (migrated.selectedSupports || []).forEach(supportName => {
      migrated.supportFriendships[supportName] = 0;
    });
    updated = true;
  }

  // Ensure all selected supports have friendship entries
  (migrated.selectedSupports || []).forEach(supportName => {
    if (migrated.supportFriendships[supportName] === undefined) {
      migrated.supportFriendships[supportName] = 0;
      updated = true;
    }
  });

  // Ensure completedHangouts exists
  if (!migrated.completedHangouts) {
    migrated.completedHangouts = [];
    updated = true;
  }

  // Ensure moveHints is an object (not array)
  if (!migrated.moveHints || Array.isArray(migrated.moveHints)) {
    migrated.moveHints = {};
    updated = true;
  }

  // Ensure turnLog exists
  if (!migrated.turnLog) {
    migrated.turnLog = [];
    updated = true;
  }

  // Ensure trainingLevels exists
  if (!migrated.trainingLevels) {
    migrated.trainingLevels = { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 };
    updated = true;
  }

  // Ensure trainingProgress exists
  if (!migrated.trainingProgress) {
    migrated.trainingProgress = { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 };
    updated = true;
  }

  // Migrate pokeclockRetries to pokeclocks
  if (migrated.pokeclockRetries !== undefined && migrated.pokeclocks === undefined) {
    migrated.pokeclocks = migrated.pokeclockRetries;
    delete migrated.pokeclockRetries;
    delete migrated.hasUsedPokeclock;
    updated = true;
  }

  // Ensure pokeclocks is initialized
  if (migrated.pokeclocks === undefined) {
    migrated.pokeclocks = 3;
    updated = true;
  }

  return { migrated, updated };
};

// Helper function to get support card attributes with rarity defaults
// Support card training bonuses - rarer cards are STRONGER and appear MORE often
const getSupportCardAttributes = (card) => {
  const rarityDefaults = {
    'Legendary': {
      // Best training bonuses - legendary trainers provide exceptional guidance
      typeBonusTraining: 25,         // +25 when training matching stat type
      generalBonusTraining: 8,       // +8 for non-matching stats
      friendshipBonusTraining: 40,   // +40 at max friendship for matching type
      // Higher appearance = more likely to show up in training options
      appearanceChance: 0.55,        // 55% chance to appear each turn
      typeAppearancePriority: 4.0    // 4x weight for their specialty stat
    },
    'Rare': {
      typeBonusTraining: 20,
      generalBonusTraining: 6,
      friendshipBonusTraining: 32,
      appearanceChance: 0.50,
      typeAppearancePriority: 3.5
    },
    'Uncommon': {
      typeBonusTraining: 15,
      generalBonusTraining: 4,
      friendshipBonusTraining: 24,
      appearanceChance: 0.45,
      typeAppearancePriority: 3.0
    },
    'Common': {
      // Lowest bonuses - but still helpful
      typeBonusTraining: 10,
      generalBonusTraining: 2,
      friendshipBonusTraining: 16,
      appearanceChance: 0.40,
      typeAppearancePriority: 2.5
    }
  };

  const defaults = rarityDefaults[card.rarity] || rarityDefaults['Common'];

  // Use individual card appearanceChance if defined, otherwise use rarity default
  const finalAppearanceChance = card.appearanceChance !== undefined
    ? card.appearanceChance
    : defaults.appearanceChance;

  return {
    ...card,
    ...defaults,
    appearanceChance: finalAppearanceChance,
    supportType: card.type || card.supportType
  };
};

// Helper function to generate training options with appearance chance logic
const generateTrainingOptionsWithAppearanceChance = (selectedSupports, careerState) => {
  const stats = ['HP', 'Attack', 'Defense', 'Instinct', 'Speed'];
  const trainingOptions = {};

  // Initialize empty options for each stat
  stats.forEach(stat => {
    trainingOptions[stat] = {
      supports: [],
      hint: null
    };
  });

  // Process each support with appearance chance
  selectedSupports.forEach(supportName => {
    const supportCard = SUPPORT_CARDS[supportName];
    if (!supportCard) return;

    const support = getSupportCardAttributes(supportCard);

    // Check if support appears this turn
    if (Math.random() < support.appearanceChance) {
      const supportType = support.supportType;

      // Calculate weighted random stat selection
      const weights = stats.map(stat => stat === supportType ? support.typeAppearancePriority : 1);
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      const roll = Math.random() * totalWeight;

      let cumulative = 0;
      let selectedStat = stats[0];
      for (let i = 0; i < stats.length; i++) {
        cumulative += weights[i];
        if (roll < cumulative) {
          selectedStat = stats[i];
          break;
        }
      }

      // Add support to selected stat
      trainingOptions[selectedStat].supports.push(supportName);

      // 15% chance for move hint (if support has move hints)
      const hasHint = Math.random() < 0.15;
      if (hasHint && support.moveHints && support.moveHints.length > 0) {
        const hint = support.moveHints[Math.floor(Math.random() * support.moveHints.length)];
        trainingOptions[selectedStat].hint = { support: supportName, move: hint };
      }
    }
  });

  // Hints only come from support cards - no random fallback hints
  return trainingOptions;
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

    const careerState = result.rows[0].career_state;
    const { migrated, updated } = migrateCareerState(careerState);

    // Save migrated state if updated
    if (updated) {
      await pool.query(
        'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
        [JSON.stringify(migrated), userId]
      );
    }

    res.json({
      hasActiveCareer: true,
      careerState: migrated
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

    // Initialize support friendships with their initial friendship values
    const supportFriendships = {};
    selectedSupports.forEach(supportName => {
      const supportCard = SUPPORT_CARDS[supportName];
      supportFriendships[supportName] = supportCard?.initialFriendship || 0;
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
      pokeclocks: 3,
      gymLeaders,
      currentGymIndex: 0,
      availableBattles,
      currentTrainingOptions: null,
      pendingEvent: null,
      trainingLevels: { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 },
      trainingProgress: { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 }
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

// DEPRECATED: Update career state (INSECURE - replaced by server-authoritative endpoints)
// This endpoint should be removed once all actions are server-authoritative
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

// Process training action (server-authoritative)
router.post('/train', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { stat } = req.body;

    if (!stat || !['HP', 'Attack', 'Defense', 'Instinct', 'Speed'].includes(stat)) {
      return res.status(400).json({ error: 'Valid stat required' });
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

    // Validate training options exist and include this stat
    if (!careerState.currentTrainingOptions || !careerState.currentTrainingOptions[stat]) {
      return res.status(400).json({ error: 'Invalid training selection' });
    }

    const option = careerState.currentTrainingOptions[stat];
    const energyCost = GAME_CONFIG.TRAINING.ENERGY_COSTS[stat];
    const currentEnergy = careerState.energy;

    // Calculate failure chance based on current energy (before deduction)
    let failureChance = 0;
    if (currentEnergy <= 75) {
      if (currentEnergy <= 0) {
        failureChance = 0.891;
      } else if (currentEnergy <= 20) {
        failureChance = 0.891 - ((currentEnergy / 20) * 0.216);
      } else if (currentEnergy <= 30) {
        failureChance = 0.675 - (((currentEnergy - 20) / 10) * 0.225);
      } else if (currentEnergy <= 50) {
        failureChance = 0.45 - (((currentEnergy - 30) / 20) * 0.225);
      } else {
        failureChance = 0.225 - (((currentEnergy - 50) / 25) * 0.225);
      }
    }

    // Speed training has 50% lower fail rate
    if (stat === 'Speed') {
      failureChance *= 0.5;
    }

    const trainingFailed = Math.random() < failureChance;

    if (trainingFailed) {
      // Training failed - failures do NOT progress training levels and do NOT cost energy
      const statLoss = stat === 'Speed' ? 0 : GAME_CONFIG.TRAINING.STAT_LOSS_ON_FAILURE;

      const updatedCareerState = {
        ...careerState,
        currentStats: {
          ...careerState.currentStats,
          [stat]: Math.max(1, careerState.currentStats[stat] - statLoss)
        },
        energy: careerState.energy, // No energy lost on failed training
        turn: careerState.turn + 1,
        turnLog: [{
          turn: careerState.turn,
          type: 'training_fail',
          stat,
          message: stat === 'Speed' ? `Training ${stat} failed! No stat loss.` : `Training ${stat} failed! Lost ${statLoss} ${stat}. No energy lost.`
        }, ...(careerState.turnLog || [])],
        currentTrainingOptions: null,
        // Preserve training levels and progress (failures don't affect them)
        trainingLevels: careerState.trainingLevels || { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 },
        trainingProgress: careerState.trainingProgress || { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 },
        // Regenerate wild battles with new turn's scaling
        availableBattles: generateWildBattles(careerState.turn + 1)
      };

      await pool.query(
        'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
        [JSON.stringify(updatedCareerState), userId]
      );

      return res.json({
        success: true,
        result: 'failure',
        careerState: updatedCareerState
      });
    }

    // Training succeeded - calculate gains
    let statGain = GAME_CONFIG.TRAINING.BASE_STAT_GAINS[stat];
    const friendshipGains = {};

    option.supports.forEach(supportName => {
      const supportCard = SUPPORT_CARDS[supportName];
      if (!supportCard) return;

      const support = getSupportCardAttributes(supportCard);
      const friendship = careerState.supportFriendships[supportName] || 0;
      const isMaxFriendship = friendship >= 100;
      const supportType = support.supportType;

      if (supportType === stat) {
        statGain += isMaxFriendship ? support.friendshipBonusTraining : support.typeBonusTraining;
      } else {
        statGain += support.generalBonusTraining;
      }

      friendshipGains[supportName] = (friendshipGains[supportName] || 0) + GAME_CONFIG.TRAINING.FRIENDSHIP_GAIN_PER_TRAINING;
    });

    // Apply training level bonus
    const currentLevel = careerState.trainingLevels?.[stat] || 0;
    const levelBonus = currentLevel * GAME_CONFIG.TRAINING.LEVEL_BONUS_MULTIPLIER;
    statGain = Math.floor(statGain * (1 + levelBonus));

    // Update training progress and level
    const currentProgress = careerState.trainingProgress?.[stat] || 0;
    const newProgress = currentProgress + 1;
    let newLevel = currentLevel;
    let leveledUp = false;

    if (newProgress >= GAME_CONFIG.TRAINING.LEVEL_UP_REQUIREMENT) {
      newLevel = currentLevel + 1;
      leveledUp = true;
    }

    const newTrainingProgress = {
      ...(careerState.trainingProgress || { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 }),
      [stat]: leveledUp ? 0 : newProgress
    };

    const newTrainingLevels = {
      ...(careerState.trainingLevels || { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 }),
      [stat]: newLevel
    };

    const newFriendships = { ...careerState.supportFriendships };
    Object.keys(friendshipGains).forEach(support => {
      const currentFriendship = newFriendships[support] || 0;
      newFriendships[support] = Math.min(100, currentFriendship + friendshipGains[support]);
    });

    // Handle move hints
    const newMoveHints = { ...careerState.moveHints };
    const newLearnableAbilities = [...(careerState.learnableAbilities || [])];
    if (option.hint) {
      const moveName = option.hint.move;
      newMoveHints[moveName] = (newMoveHints[moveName] || 0) + 1;
      if (!newLearnableAbilities.includes(moveName) && !careerState.knownAbilities.includes(moveName)) {
        newLearnableAbilities.push(moveName);
      }
    }

    const updatedCareerState = {
      ...careerState,
      currentStats: {
        ...careerState.currentStats,
        [stat]: careerState.currentStats[stat] + statGain
      },
      energy: Math.max(0, careerState.energy - energyCost),
      skillPoints: careerState.skillPoints + GAME_CONFIG.TRAINING.SKILL_POINTS_ON_SUCCESS,
      supportFriendships: newFriendships,
      moveHints: newMoveHints,
      learnableAbilities: newLearnableAbilities,
      trainingProgress: newTrainingProgress,
      trainingLevels: newTrainingLevels,
      turn: careerState.turn + 1,
      turnLog: [{
        turn: careerState.turn,
        type: leveledUp ? 'training_levelup' : 'training_success',
        stat,
        statGain,
        level: newLevel,
        message: leveledUp
          ? `Trained ${stat} successfully! Gained ${statGain} ${stat}. ${stat} training leveled up to ${newLevel}!`
          : `Trained ${stat} successfully! Gained ${statGain} ${stat}.`
      }, ...(careerState.turnLog || [])],
      currentTrainingOptions: null,
      // Regenerate wild battles with new turn's scaling
      availableBattles: generateWildBattles(careerState.turn + 1)
    };

    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    res.json({
      success: true,
      result: 'success',
      careerState: updatedCareerState,
      statGain,
      friendshipGains
    });
  } catch (error) {
    console.error('Training error:', error);
    res.status(500).json({ error: 'Failed to process training' });
  }
});

// Process rest action (server-authoritative)
router.post('/rest', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get active career
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    // Calculate energy gain using REST config
    const roll = Math.random();
    let energyGain = GAME_CONFIG.REST.ENERGY_GAINS[1]; // Default: middle value (50)
    if (roll < GAME_CONFIG.REST.PROBMOVES[0]) {
      energyGain = GAME_CONFIG.REST.ENERGY_GAINS[0]; // Low roll: 30
    } else if (roll > 1 - GAME_CONFIG.REST.PROBMOVES[2]) {
      energyGain = GAME_CONFIG.REST.ENERGY_GAINS[2]; // High roll: 70
    }

    const currentEnergy = careerState.energy ?? GAME_CONFIG.CAREER.STARTING_ENERGY;
    const newEnergy = Math.min(GAME_CONFIG.CAREER.MAX_ENERGY, currentEnergy + energyGain);

    const logEntry = {
      turn: careerState.turn,
      type: 'rest',
      energyGain,
      message: `Rested and recovered ${energyGain} energy.`
    };

    const updatedCareerState = {
      ...careerState,
      energy: newEnergy,
      turn: careerState.turn + 1,
      turnLog: [logEntry, ...(careerState.turnLog || [])],
      currentTrainingOptions: null,
      // Regenerate wild battles with new turn's scaling
      availableBattles: generateWildBattles(careerState.turn + 1)
    };

    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    res.json({
      success: true,
      careerState: updatedCareerState,
      energyGain
    });
  } catch (error) {
    console.error('Rest error:', error);
    res.status(500).json({ error: 'Failed to process rest' });
  }
});

// Generate training options (server-authoritative)
router.post('/generate-training', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get active career
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    // Generate training options with appearance chance logic
    const trainingOptions = generateTrainingOptionsWithAppearanceChance(
      careerState.selectedSupports,
      careerState
    );

    const updatedCareerState = {
      ...careerState,
      currentTrainingOptions: trainingOptions
    };

    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    res.json({
      success: true,
      careerState: updatedCareerState
    });
  } catch (error) {
    console.error('Generate training error:', error);
    res.status(500).json({ error: 'Failed to generate training options' });
  }
});

// Trigger random event OR generate training (server-authoritative)
router.post('/trigger-event', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get active career
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    // 50% chance for an event to occur
    if (Math.random() < 0.5) {
      // Check for available hangout events - requires MAX friendship (100)
      const selectedSupports = careerState.selectedSupports;
      const availableHangouts = selectedSupports.filter(supportName => {
        const friendship = careerState.supportFriendships[supportName] || 0;
        // Hangout events only unlock after reaching max friendship (100)
        return friendship >= 100 && !careerState.completedHangouts.includes(supportName);
      });

      let eventToSet = null;

      // If hangouts are available, 50% chance to pick a hangout event
      if (availableHangouts.length > 0 && Math.random() < 0.5) {
        const supportName = availableHangouts[Math.floor(Math.random() * availableHangouts.length)];
        const hangoutEvent = HANGOUT_EVENTS[supportName];
        if (hangoutEvent) {
          eventToSet = {
            type: 'hangout',
            supportName,
            ...hangoutEvent
          };
        }
      }

      if (!eventToSet) {
        // Filter events: 70% chance to exclude negative events
        const eventKeys = Object.keys(RANDOM_EVENTS);
        let filteredKeys = eventKeys;

        if (Math.random() < 0.7) {
          filteredKeys = eventKeys.filter(key => RANDOM_EVENTS[key].type !== 'negative');
        }

        if (filteredKeys.length === 0) {
          filteredKeys = eventKeys;
        }

        const randomKey = filteredKeys[Math.floor(Math.random() * filteredKeys.length)];
        const event = RANDOM_EVENTS[randomKey];

        if (event && event.type && event.name) {
          eventToSet = { ...event, key: randomKey };
        }
      }

      const updatedCareerState = {
        ...careerState,
        pendingEvent: eventToSet
      };

      await pool.query(
        'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
        [JSON.stringify(updatedCareerState), userId]
      );

      res.json({
        success: true,
        careerState: updatedCareerState
      });
    } else {
      // No event - generate training options with appearance chance logic
      const trainingOptions = generateTrainingOptionsWithAppearanceChance(
        careerState.selectedSupports,
        careerState
      );

      const updatedCareerState = {
        ...careerState,
        currentTrainingOptions: trainingOptions,
        pendingEvent: null
      };

      await pool.query(
        'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
        [JSON.stringify(updatedCareerState), userId]
      );

      res.json({
        success: true,
        careerState: updatedCareerState
      });
    }
  } catch (error) {
    console.error('Trigger event error:', error);
    res.status(500).json({ error: 'Failed to trigger event' });
  }
});

// Resolve event (server-authoritative)
router.post('/resolve-event', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { choiceIndex } = req.body; // For choice events

    console.log('[Resolve Event] Request received for user:', userId, 'choiceIndex:', choiceIndex);

    // Get active career
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      console.log('[Resolve Event] No active career found');
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    if (!careerState.pendingEvent) {
      console.log('[Resolve Event] No pending event');
      return res.status(400).json({ error: 'No pending event to resolve' });
    }

    const pendingEvent = careerState.pendingEvent;
    console.log('[Resolve Event] Pending event type:', pendingEvent.type, 'name:', pendingEvent.name);
    let outcome;

    // Determine outcome based on event type
    if (pendingEvent.type === 'stat_increase') {
      console.log('[Resolve Event] Handling stat_increase event');
      outcome = { effect: pendingEvent.effect };
    } else if (pendingEvent.type === 'negative') {
      // Negative events have a direct effect property
      console.log('[Resolve Event] Handling negative event');
      outcome = { effect: pendingEvent.effect };
    } else if (pendingEvent.type === 'choice') {
      console.log('[Resolve Event] Handling choice event');
      if (choiceIndex === undefined || !pendingEvent.choices[choiceIndex]) {
        console.log('[Resolve Event] Invalid choice index');
        return res.status(400).json({ error: 'Invalid choice index' });
      }
      const choice = pendingEvent.choices[choiceIndex];

      // Roll for outcome
      const roll = Math.random();
      let cumulative = 0;
      for (const possibleOutcome of choice.outcomes) {
        cumulative += possibleOutcome.chance;
        if (roll < cumulative) {
          outcome = possibleOutcome;
          break;
        }
      }
    } else if (pendingEvent.type === 'hangout') {
      console.log('[Resolve Event] Handling hangout event');
      // Double hangout bonuses for max friendship rewards
      const baseEffect = pendingEvent.effect;
      const doubledStats = {};
      if (baseEffect.stats) {
        Object.keys(baseEffect.stats).forEach(stat => {
          doubledStats[stat] = baseEffect.stats[stat] * 2;
        });
      }
      outcome = {
        ...baseEffect,
        stats: Object.keys(doubledStats).length > 0 ? doubledStats : baseEffect.stats,
        energy: baseEffect.energy !== undefined ? baseEffect.energy * 2 : undefined,
        skillPoints: baseEffect.skillPoints !== undefined ? baseEffect.skillPoints * 2 : undefined
      };
    } else {
      console.log('[Resolve Event] Unknown event type:', pendingEvent.type);
    }

    if (!outcome) {
      console.log('[Resolve Event] Failed to determine outcome');
      return res.status(400).json({ error: 'Failed to determine outcome' });
    }

    console.log('[Resolve Event] Outcome determined:', outcome);

    const eventResult = outcome.effect || outcome;
    const newStats = { ...careerState.currentStats };
    let energyChange = 0;
    let skillPointsChange = 0;
    const friendshipChanges = {};
    let moveHintReceived = null;

    // Apply stat changes
    if (eventResult.stats) {
      Object.keys(eventResult.stats).forEach(stat => {
        newStats[stat] = Math.max(1, newStats[stat] + eventResult.stats[stat]);
      });
    }

    if (eventResult.energy !== undefined) energyChange = eventResult.energy;
    if (eventResult.skillPoints !== undefined) skillPointsChange = eventResult.skillPoints;
    if (eventResult.friendship && pendingEvent.supportName) {
      friendshipChanges[pendingEvent.supportName] = eventResult.friendship;
    }
    if (eventResult.moveHint) {
      moveHintReceived = eventResult.moveHint;
    }

    const newMoveHints = { ...careerState.moveHints };
    const newLearnableAbilities = [...(careerState.learnableAbilities || [])];
    if (moveHintReceived) {
      newMoveHints[moveHintReceived] = (newMoveHints[moveHintReceived] || 0) + 1;
      if (!newLearnableAbilities.includes(moveHintReceived) && !careerState.knownAbilities.includes(moveHintReceived)) {
        newLearnableAbilities.push(moveHintReceived);
      }
    }

    const newFriendships = { ...careerState.supportFriendships };
    Object.keys(friendshipChanges).forEach(support => {
      const currentFriendship = newFriendships[support] || 0;
      newFriendships[support] = Math.min(100, currentFriendship + friendshipChanges[support]);
    });

    const completedHangouts = (pendingEvent.type === 'hangout' && pendingEvent.supportName)
      ? [...careerState.completedHangouts, pendingEvent.supportName]
      : careerState.completedHangouts;

    const shouldShowResult = pendingEvent.type === 'choice' || pendingEvent.type === 'hangout';

    const updatedCareerState = {
      ...careerState,
      currentStats: newStats,
      energy: Math.max(0, Math.min(GAME_CONFIG.CAREER.MAX_ENERGY, careerState.energy + energyChange)),
      skillPoints: careerState.skillPoints + skillPointsChange,
      supportFriendships: newFriendships,
      moveHints: newMoveHints,
      learnableAbilities: newLearnableAbilities,
      completedHangouts,
      eventResult: shouldShowResult ? {
        stats: eventResult.stats || {},
        energy: energyChange,
        skillPoints: skillPointsChange,
        friendship: friendshipChanges,
        moveHint: moveHintReceived,
        flavor: outcome.flavor || null
      } : null,
      pendingEvent: null,
      currentTrainingOptions: !shouldShowResult ? null : careerState.currentTrainingOptions
    };

    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    res.json({
      success: true,
      careerState: updatedCareerState,
      showResult: shouldShowResult
    });
  } catch (error) {
    console.error('Resolve event error:', error);
    res.status(500).json({ error: 'Failed to resolve event' });
  }
});

// Learn ability (server-authoritative)
router.post('/learn-ability', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { moveName } = req.body;

    if (!moveName) {
      return res.status(400).json({ error: 'Move name required' });
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

    // Validate move exists and is learnable
    const { MOVES } = require('../shared/gameData');
    const move = MOVES[moveName];
    if (!move) {
      return res.status(400).json({ error: 'Invalid move' });
    }

    // Check if already known
    if (careerState.knownAbilities.includes(moveName)) {
      return res.status(400).json({ error: 'Already knows this ability' });
    }

    // Calculate cost with hints
    const hintsReceived = careerState.moveHints[moveName] || 0;
    const discount = Math.min(hintsReceived * GAME_CONFIG.MOVES.HINT_DISCOUNT, GAME_CONFIG.MOVES.MAX_HINT_DISCOUNT);
    const finalCost = Math.ceil(move.cost * (1 - discount));

    // Check if can afford
    if (careerState.skillPoints < finalCost) {
      return res.status(400).json({ error: 'Not enough skill points' });
    }

    const updatedCareerState = {
      ...careerState,
      knownAbilities: [...careerState.knownAbilities, moveName],
      skillPoints: careerState.skillPoints - finalCost
    };

    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    res.json({
      success: true,
      careerState: updatedCareerState,
      cost: finalCost
    });
  } catch (error) {
    console.error('Learn ability error:', error);
    res.status(500).json({ error: 'Failed to learn ability' });
  }
});

// Process battle (server-authoritative)
router.post('/battle', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { opponent, isGymLeader, isEventBattle } = req.body;

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

    // Check energy for wild battles (not gym leaders or event battles)
    if (!isGymLeader && !isEventBattle && careerState.energy <= 0) {
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

    // Prepare opponent Pokemon - normalize to consistent structure
    // All data sources use baseStats, normalize to stats for battle
    // Handle: wild battles (direct stats), gym leaders (baseStats), Elite Four (pokemon.baseStats)
    const pokemonData = opponent.pokemon || opponent; // Elite Four has nested pokemon object

    // Get base stats from opponent data
    let opponentStats = pokemonData.stats || pokemonData.baseStats;

    // Scale gym leader / Elite Four stats based on current turn
    if (isGymLeader && opponentStats) {
      const currentTurn = careerState.turn;
      const eliteFourStartTurn = GAME_CONFIG.CAREER.ELITE_FOUR_START_TURN || 60;

      // Check if this is an Elite Four battle (turn 60+)
      if (currentTurn >= eliteFourStartTurn) {
        const eliteFourIndex = currentTurn - eliteFourStartTurn;
        const multiplier = ELITE_FOUR_MULTIPLIERS[eliteFourIndex] || 4.25; // Default to Lance's multiplier
        opponentStats = scaleStatsWithMultiplier(opponentStats, multiplier);
        console.log('[Battle] Scaled Elite Four stats with multiplier', multiplier, ':', opponentStats);
      } else {
        // Regular gym leader - use turn-based scaling
        opponentStats = scaleStats(opponentStats, currentTurn);
        console.log('[Battle] Scaled gym leader stats for turn', currentTurn, ':', opponentStats);
      }
    }

    const opponentPokemon = {
      name: pokemonData.name || opponent.name,
      primaryType: pokemonData.primaryType || opponent.primaryType,
      stats: opponentStats,
      abilities: pokemonData.abilities || pokemonData.defaultAbilities || [],
      typeAptitudes: pokemonData.typeAptitudes || opponent.typeAptitudes,
      strategy: pokemonData.strategy || opponent.strategy || 'Balanced',
      strategyGrade: pokemonData.strategyGrade || opponent.strategyGrade || 'A'
    };

    // Validate opponent has required fields
    if (!opponentPokemon.stats) {
      console.error('Battle error: Opponent missing stats', { opponent, opponentPokemon });
      return res.status(400).json({ error: 'Invalid opponent data - missing stats' });
    }

    // Simulate battle
    const battleResult = simulateBattle(playerPokemon, opponentPokemon);

    // Determine if player won
    const playerWon = battleResult.winner === 1;

    // Calculate rewards/penalties
    let statGain = 0;
    let skillPoints = 0;
    let energyChange = 0;
    let badge = null;

    if (playerWon) {
      if (isGymLeader) {
        // Gym leader victory - no energy cost
        statGain = 5;
        skillPoints = 10;
        energyChange = 0;
        // Award badge for gym leader defeat
        badge = {
          gymLeaderName: opponent.name,
          defeatedAt: new Date().toISOString()
        };
      } else if (isEventBattle) {
        // Event battle victory - costs 20 energy
        statGain = 15;
        skillPoints = 0;
        energyChange = -20;
      } else {
        // Wild battle victory
        statGain = 15; // 50% increased from base
        skillPoints = 0;
        energyChange = 0; // No energy cost on victory
      }
    } else {
      // Defeat
      if (isGymLeader) {
        // Gym leader defeat ends career - no energy cost
        statGain = 0;
        skillPoints = 0;
        energyChange = 0;
      } else if (isEventBattle) {
        // Event battle defeat - still costs 20 energy
        statGain = 0;
        skillPoints = 0;
        energyChange = -20;
      } else {
        // Wild battle defeat
        energyChange = -5;
      }
    }

    // Apply battle results to career state
    // Event battles do NOT progress the turn - they happen during the current turn
    const updatedCareerState = {
      ...careerState,
      currentStats: {
        ...careerState.currentStats,
        HP: careerState.currentStats.HP + statGain,
        Attack: careerState.currentStats.Attack + statGain,
        Defense: careerState.currentStats.Defense + statGain,
        Instinct: careerState.currentStats.Instinct + statGain,
        Speed: careerState.currentStats.Speed + statGain
      },
      skillPoints: careerState.skillPoints + skillPoints,
      energy: Math.max(0, Math.min(GAME_CONFIG.CAREER.MAX_ENERGY, careerState.energy + energyChange)),
      // Event battles don't progress the turn
      turn: isEventBattle ? careerState.turn : careerState.turn + 1,
      turnLog: [{
        turn: careerState.turn,
        type: isGymLeader ? (playerWon ? 'gym_victory' : 'gym_loss') :
              isEventBattle ? (playerWon ? 'event_battle_victory' : 'event_battle_loss') :
              (playerWon ? 'battle_victory' : 'battle_loss'),
        opponent: opponent.name,
        message: playerWon
          ? `Defeated ${opponent.name}! Gained ${statGain} to all stats${skillPoints > 0 ? ` and ${skillPoints} skill points` : ''}${energyChange < 0 ? `. Cost ${Math.abs(energyChange)} energy.` : ''}`
          : `Lost to ${opponent.name}.${energyChange < 0 ? ` Lost ${Math.abs(energyChange)} energy.` : ''}`
      }, ...(careerState.turnLog || [])],
      // Move to next gym leader if defeated current one
      currentGymIndex: (isGymLeader && playerWon) ? careerState.currentGymIndex + 1 : careerState.currentGymIndex,
      // Generate new wild battles for next turn (but keep current ones for event battles)
      availableBattles: isEventBattle ? careerState.availableBattles : generateWildBattles(careerState.turn + 1),
      // Keep current training options for event battles
      currentTrainingOptions: isEventBattle ? careerState.currentTrainingOptions : null
    };

    // Save updated career state
    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    const responsePayload = {
      success: true,
      battleResult: {
        winner: playerWon ? 'player' : 'opponent',
        battleLog: battleResult.battleLog,
        rewards: {
          statGain,
          skillPoints,
          energyChange,
          badge
        }
      },
      careerState: updatedCareerState
    };

    console.log('[Battle] Sending response - Turn:', updatedCareerState.turn, 'GymIndex:', updatedCareerState.currentGymIndex);
    console.log('[Battle] Response size:', JSON.stringify(responsePayload).length, 'bytes');
    console.log('[Battle] careerState exists in response:', !!responsePayload.careerState);

    res.json(responsePayload);
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
      turnNumber: careerState.turn,
      gymsDefeated: careerState.currentGymIndex || 0
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

// Use pokeclock to retry gym battle
router.post('/use-pokeclock', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get active career
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    // Check if player has pokeclocks
    if (!careerState.pokeclocks || careerState.pokeclocks <= 0) {
      return res.status(400).json({ error: 'No pokeclocks remaining' });
    }

    // Decrement pokeclocks and revert turn to retry gym battle
    const updatedCareerState = {
      ...careerState,
      pokeclocks: careerState.pokeclocks - 1,
      turn: careerState.turn - 1  // Revert turn so gym battle triggers again
    };

    // Save updated career state
    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    console.log('[UsePokeclock] Turn reverted from', careerState.turn, 'to', updatedCareerState.turn, 'Pokeclocks remaining:', updatedCareerState.pokeclocks);

    res.json({
      success: true,
      careerState: updatedCareerState,
      pokeclocksRemaining: updatedCareerState.pokeclocks
    });
  } catch (error) {
    console.error('Use pokeclock error:', error);
    res.status(500).json({ error: 'Failed to use pokeclock' });
  }
});

module.exports = router;
