/**
 * Career Management Routes
 * Handles active career state and progression
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const authenticateToken = require('../middleware/auth');
const { simulateBattle } = require('../services/battleSimulator');
const { LEGENDARY_POKEMON, GYM_LEADER_POKEMON, ELITE_FOUR, POKEMON, GAME_CONFIG, RANDOM_EVENTS, HANGOUT_EVENTS, SUPPORT_CARDS, EVOLUTION_CHAINS } = require('../shared/gameData');

// Helper function to get all Pokemon in the same evolution chain
const getEvolutionChainMembers = (pokemonName) => {
  if (EVOLUTION_CHAINS[pokemonName]) {
    const chain = EVOLUTION_CHAINS[pokemonName];
    const members = [pokemonName, chain.stage1];
    if (chain.stage2) members.push(chain.stage2);
    return members;
  }

  for (const [basePokemon, chain] of Object.entries(EVOLUTION_CHAINS)) {
    if (chain.stage1 === pokemonName || chain.stage2 === pokemonName) {
      const members = [basePokemon, chain.stage1];
      if (chain.stage2) members.push(chain.stage2);
      return members;
    }
  }

  return [pokemonName];
};

// Helper function to check if two Pokemon are in the same evolution chain
const areInSameEvolutionChain = (pokemon1Name, pokemon2Name) => {
  if (pokemon1Name === pokemon2Name) return true;
  const chain1 = getEvolutionChainMembers(pokemon1Name);
  return chain1.includes(pokemon2Name);
};

// Helper function to generate gym leaders
// Pool includes all Support Card trainers EXCEPT Elite Four members (Lorelei, Bruno, Agatha, Lance)
const generateGymLeaders = () => {
  const allGymLeaders = [
    // Original Gym Leaders (kept from original pool, minus Elite Four)
    { name: 'Blaine', type: 'Fire', pokemon: GYM_LEADER_POKEMON.BlaineArcanine },
    { name: 'Misty', type: 'Water', pokemon: GYM_LEADER_POKEMON.MistyStarmie },
    { name: 'Erika', type: 'Grass', pokemon: GYM_LEADER_POKEMON.ErikaVileplume },
    { name: 'Lt. Surge', type: 'Electric', pokemon: GYM_LEADER_POKEMON.SurgeRaichu },
    { name: 'Giovanni', type: 'Fire', pokemon: GYM_LEADER_POKEMON.GiovanniRapidash },
    { name: 'Wallace', type: 'Water', pokemon: GYM_LEADER_POKEMON.WallaceLapras },
    { name: 'Wattson', type: 'Electric', pokemon: GYM_LEADER_POKEMON.WattsonElectabuzz },
    { name: 'Flannery', type: 'Fire', pokemon: GYM_LEADER_POKEMON.FlanneryMagmar },
    { name: 'Sabrina', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.SabrinaArbok },
    { name: 'Winona', type: 'Grass', pokemon: GYM_LEADER_POKEMON.WinonaExeggutor },

    // Common Tier Supports
    { name: 'Whitney', type: 'Normal', pokemon: GYM_LEADER_POKEMON.WhitneyMiltank },
    { name: 'Chuck', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.ChuckPoliwrath },
    { name: 'Pryce', type: 'Water', pokemon: GYM_LEADER_POKEMON.PryceDelibird },

    // Uncommon Tier Supports
    { name: 'Brock', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.BrockOnix },
    { name: 'Koga', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.KogaMuk },
    { name: 'Jasmine', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.JasmineSteelix },
    { name: 'Karen', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.KarenUmbreon },
    { name: 'Milo', type: 'Grass', pokemon: GYM_LEADER_POKEMON.MiloEldegoss },
    { name: 'Kabu', type: 'Fire', pokemon: GYM_LEADER_POKEMON.KabuCentiskorch },
    { name: 'Melony', type: 'Water', pokemon: GYM_LEADER_POKEMON.MelonyLapras },
    { name: 'Gordie', type: 'Fire', pokemon: GYM_LEADER_POKEMON.GordieCoalossal },
    { name: 'Klara', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.KlaraSlowbro },
    { name: 'Avery', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.AverySlowking },
    { name: 'Iono', type: 'Electric', pokemon: GYM_LEADER_POKEMON.IonoBellibolt },
    { name: 'Grusha', type: 'Grass', pokemon: GYM_LEADER_POKEMON.GrushaAltaria },

    // Rare Tier Supports
    { name: 'Morty', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.MortyGengar },
    { name: 'Iris', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.IrisHaxorus },
    { name: 'Blue', type: 'Water', pokemon: GYM_LEADER_POKEMON.BlueBlastoise },
    { name: 'Maxie', type: 'Fire', pokemon: GYM_LEADER_POKEMON.MaxieCamerupt },
    { name: 'Archie', type: 'Water', pokemon: GYM_LEADER_POKEMON.ArchieSharpedo },
    { name: 'Raihan', type: 'Electric', pokemon: GYM_LEADER_POKEMON.RaihanDuraludon },
    { name: 'Marnie', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.MarnieGrimmsnarl },
    { name: 'Nessa', type: 'Water', pokemon: GYM_LEADER_POKEMON.NessaDrednaw },
    { name: 'Bea', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.BeaSirfetchd },
    { name: 'Opal', type: 'Normal', pokemon: GYM_LEADER_POKEMON.OpalAlcremie },
    { name: 'Piers', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.PiersObstagoon },
    { name: 'Rika', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.RikaClodsire },
    { name: 'Poppy', type: 'Normal', pokemon: GYM_LEADER_POKEMON.PoppyTinkaton },

    // Legendary Tier Supports
    { name: 'Cynthia', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.CynthiaGarchomp },
    { name: 'Red', type: 'Fire', pokemon: GYM_LEADER_POKEMON.RedCharizard },
    { name: 'Steven', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.StevenMetagross },
    { name: 'N', type: 'Fire', pokemon: GYM_LEADER_POKEMON.NReshiram },
    { name: 'Professor Oak', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.ProfessorOakDragonite },
    { name: 'Diantha', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.DianthaDiancie },
    { name: 'Leon', type: 'Fire', pokemon: GYM_LEADER_POKEMON.LeonCharizardGmax },
    { name: 'Selene', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.SeleneLunala },
    { name: 'Gloria', type: 'Normal', pokemon: GYM_LEADER_POKEMON.GloriaZacian },
    { name: 'Nemona', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.NemonaKoraidon },
    { name: 'Mustard', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.MustardUrshifu },
    { name: 'Victor', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.VictorCalyrex },
    { name: 'Arven', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.ArvenMabosstiff },
    { name: 'Penny', type: 'Normal', pokemon: GYM_LEADER_POKEMON.PennySylveon },
    { name: 'Sonia', type: 'Electric', pokemon: GYM_LEADER_POKEMON.SoniaBoltund },
    { name: 'Hop', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.HopZamazenta },
    { name: 'Geeta', type: 'Psychic', pokemon: GYM_LEADER_POKEMON.GeetaKingambit },
    { name: 'Kieran', type: 'Normal', pokemon: GYM_LEADER_POKEMON.KieranTerapagos },
    { name: 'Carmine', type: 'Grass', pokemon: GYM_LEADER_POKEMON.CarmineOgerpon },
    { name: 'Drayton', type: 'Electric', pokemon: GYM_LEADER_POKEMON.DraytonArchaludon },
    { name: 'Lacey', type: 'Fighting', pokemon: GYM_LEADER_POKEMON.LaceyExcadrill }
  ];

  // Randomly shuffle and pick 4 gym leaders (Elite 4 on turns 60-63)
  const shuffled = [...allGymLeaders].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
};

// Helper function to calculate difficulty multiplier based on turn
// TRUE ACCELERATION: Percentage increase grows over time (5% → 24%)
const calculateDifficultyMultiplier = (turn) => {
  const enemyStatMult = GAME_CONFIG.CAREER.ENEMY_STAT_MULTIPLIER || 1.0;

  // Scale from turn 1 to turn 59 with accelerating growth
  // Progress from 0 to 1 over 59 turns
  const progress = (turn - 1) / 59;
  // Quartic curve: 1.0 + 1.7p⁴ + 0.4p³ + 0.3p² + 0.6p
  // Provides true acceleration - percentage increase grows from ~5% to ~24% over time
  // Peaks at ~3.85x at turn 59, then smooth transition to Elite Four at 4.5x (Lorelei)
  const baseMultiplier = 1.0 + (1.7 * Math.pow(progress, 4)) + (0.4 * Math.pow(progress, 3)) + (0.3 * progress * progress) + (0.6 * progress);
  return baseMultiplier * enemyStatMult;
};

// Elite Four fixed base multipliers (used instead of turn-based scaling)
// With ENEMY_STAT_MULTIPLIER at 1.0 and updated base stats (400 total), these values ensure Lance reaches S+ grade
// Elite Four now use calculateBaseStats which gives them 400 total base stats
// Cascades smoothly from turn 59 (3.99x) to Lance at S+ grade (2150 stats)
const ELITE_FOUR_BASE_MULTIPLIERS = {
  0: 4.50,  // Lorelei (turn 60) - 1800 stats (B+ to A range)
  1: 4.875, // Bruno (turn 61) - 1950 stats (A to S range)
  2: 5.125, // Agatha (turn 62) - 2050 stats (S range)
  3: 5.375  // Lance (turn 63) - 2150 stats (S+ grade, Champion)
};

// Get Elite Four multiplier with ENEMY_STAT_MULTIPLIER applied
const getEliteFourMultiplier = (index) => {
  const baseMult = ELITE_FOUR_BASE_MULTIPLIERS[index] || 4.25;
  const enemyStatMult = GAME_CONFIG.CAREER.ENEMY_STAT_MULTIPLIER || 1.0;
  return baseMult * enemyStatMult;
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

// Grade ranking for strategy comparison
const GRADE_RANK = { 'S': 5, 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };

// Helper function to derive strategy and grade from strategyAptitudes
// Returns the strategy with the best aptitude grade
const deriveStrategyFromAptitudes = (strategyAptitudes) => {
  if (!strategyAptitudes || typeof strategyAptitudes !== 'object') {
    return { strategy: 'Chipper', strategyGrade: 'C' };
  }

  let bestStrategy = 'Chipper';
  let bestGrade = 'C';
  let bestRank = GRADE_RANK[bestGrade] || 0;

  for (const [strategy, grade] of Object.entries(strategyAptitudes)) {
    const rank = GRADE_RANK[grade] || 0;
    if (rank > bestRank) {
      bestStrategy = strategy;
      bestGrade = grade;
      bestRank = rank;
    }
  }

  return { strategy: bestStrategy, strategyGrade: bestGrade };
};

// Helper function to calculate max energy including support card bonuses
const calculateMaxEnergy = (careerState) => {
  let maxEnergy = GAME_CONFIG.CAREER.MAX_ENERGY;
  if (careerState.selectedSupports) {
    careerState.selectedSupports.forEach(supportName => {
      const supportCard = SUPPORT_CARDS[supportName];
      if (supportCard?.specialEffect?.maxEnergyBonus) {
        maxEnergy += supportCard.specialEffect.maxEnergyBonus;
      }
    });
  }
  return maxEnergy;
};

// Helper function to generate wild battles
const generateWildBattles = (turn) => {
  const gymLeaderMult = calculateDifficultyMultiplier(turn);
  // Wild pokemon are 25% stronger than gym leaders at the same turn
  const wildMult = gymLeaderMult * 1.25;

  console.log(`[Wild Battle] Turn ${turn}: gymLeaderMult=${gymLeaderMult.toFixed(2)}, wildMult=${wildMult.toFixed(2)}`);

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

    // Scale stats based on wild difficulty (25% stronger than gym leaders)
    const scaledStats = {};
    Object.keys(pokemon.baseStats).forEach(stat => {
      scaledStats[stat] = Math.floor(pokemon.baseStats[stat] * wildMult);
    });

    console.log(`[Wild Battle] ${pokemon.name} base HP: ${pokemon.baseStats.HP}, scaled HP: ${scaledStats.HP}`);

    // Derive strategy from strategyAptitudes
    const derivedStrategy = deriveStrategyFromAptitudes(pokemon.strategyAptitudes);

    return {
      name: pokemon.name,
      primaryType: pokemon.primaryType,
      stats: scaledStats,
      abilities: availableAbilities,
      typeAptitudes: pokemon.typeAptitudes,
      strategy: derivedStrategy.strategy,
      strategyGrade: derivedStrategy.strategyGrade
    };
  });
};

// Helper function to determine gym leader/Elite Four abilities based on turn
// Turn 12: 3 moves (defaults), Turn 60: 6 moves (all defaults + learnables)
const getGymLeaderAbilities = (pokemon, turn, isEliteFour = false) => {
  const defaultAbilities = pokemon.defaultAbilities || [];
  const learnableAbilities = pokemon.learnableAbilities || [];

  // Elite Four always get all 6 moves
  if (isEliteFour) {
    return [...defaultAbilities, ...learnableAbilities];
  }

  // Gym leaders scale from 3 moves at turn 12 to 6 moves at turn 60
  // Linear scaling: (turn - 12) / (60 - 12) = progress from 0 to 1
  // At turn 12: 3 moves, at turn 36: ~4-5 moves, at turn 60: 6 moves
  let availableAbilities = [...defaultAbilities]; // Start with 3 default moves

  if (turn >= 20 && learnableAbilities.length > 0) {
    availableAbilities.push(learnableAbilities[0]); // 4th move at turn 20
  }
  if (turn >= 35 && learnableAbilities.length > 1) {
    availableAbilities.push(learnableAbilities[1]); // 5th move at turn 35
  }
  if (turn >= 50 && learnableAbilities.length > 2) {
    availableAbilities.push(learnableAbilities[2]); // 6th move at turn 50
  }

  return availableAbilities;
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

// Helper function to get support card attributes
// Uses actual card values from trainingBonus, appearanceRate, and typeMatchPreference
const getSupportCardAttributes = (card) => {
  // Extract training bonuses from card's trainingBonus object
  const trainingBonus = card.trainingBonus || {};

  return {
    ...card,
    // Map card's trainingBonus to the expected property names
    typeBonusTraining: trainingBonus.typeMatch || 5,
    generalBonusTraining: trainingBonus.otherStats || 1,
    friendshipBonusTraining: trainingBonus.maxFriendshipTypeMatch || 10,
    // Use card's actual appearance settings
    appearanceChance: card.appearanceRate || 0.40,
    typeAppearancePriority: 1 + (card.typeMatchPreference || 0.10) * 10, // Convert preference to priority multiplier
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

/**
 * Helper function to check if an event should occur after an action (train/rest/battle)
 * Returns { pendingEvent, currentTrainingOptions } - one will be set, the other null
 * Events have 50% chance to occur, and skip on inspiration turns and turn 1
 */
const checkForEventOrGenerateTraining = (careerState) => {
  const inspirationTurns = [11, 23, 35, 47, 59];
  const nextTurn = careerState.turn; // This is already the NEW turn after action

  // Skip events on turn 1 and inspiration turns
  if (nextTurn === 1 || inspirationTurns.includes(nextTurn)) {
    return {
      pendingEvent: null,
      currentTrainingOptions: generateTrainingOptionsWithAppearanceChance(
        careerState.selectedSupports,
        careerState
      )
    };
  }

  // 50% chance for an event to occur
  if (Math.random() < 0.5) {
    // Check for available hangout events - requires MAX friendship (100)
    const selectedSupports = careerState.selectedSupports || [];
    const availableHangouts = selectedSupports.filter(supportName => {
      const friendship = careerState.supportFriendships?.[supportName] || 0;
      const hasHangoutEvent = !!HANGOUT_EVENTS[supportName];
      const alreadyCompleted = (careerState.completedHangouts || []).includes(supportName);
      return friendship >= 100 && hasHangoutEvent && !alreadyCompleted;
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
      // Pick a random event - 70% chance to exclude negative events
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

    if (eventToSet) {
      return {
        pendingEvent: eventToSet,
        currentTrainingOptions: null
      };
    }
  }

  // No event - generate training options
  return {
    pendingEvent: null,
    currentTrainingOptions: generateTrainingOptionsWithAppearanceChance(
      careerState.selectedSupports,
      careerState
    )
  };
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
    const { pokemon, selectedSupports, selectedInspirations } = req.body; // Add selectedInspirations

    if (!pokemon || !selectedSupports) {
      return res.status(400).json({ error: 'Pokemon and supports required' });
    }

    // SECURITY: Validate Pokemon name and get server-side data
    const pokemonName = pokemon.name;
    const serverPokemonData = POKEMON[pokemonName];
    if (!serverPokemonData) {
      return res.status(400).json({ error: 'Invalid Pokemon' });
    }

    // NEW VALIDATION: Check inspirations
    if (selectedInspirations && selectedInspirations.length > 0) {
      // Validate inspirations don't exceed limit
      if (selectedInspirations.length > 2) {
        return res.status(400).json({ error: 'Maximum 2 inspirations allowed' });
      }

      // Check if any inspiration has the same name as the selected Pokemon
      const hasSameSpecies = selectedInspirations.some(
        inspiration => inspiration.name === pokemonName
      );

      if (hasSameSpecies) {
        return res.status(400).json({
          error: 'Cannot use the same Pokemon species as inspiration'
        });
      }

      // Check if any inspiration is in the same evolution chain as the selected Pokemon
      const hasEvolutionConflict = selectedInspirations.some(
        inspiration => areInSameEvolutionChain(pokemonName, inspiration.name)
      );

      if (hasEvolutionConflict) {
        return res.status(400).json({
          error: 'Cannot use Pokemon from the same evolution line as inspiration'
        });
      }

      // Check if the two inspirations are in the same evolution chain as each other
      if (selectedInspirations.length === 2) {
        const [insp1, insp2] = selectedInspirations;
        if (areInSameEvolutionChain(insp1.name, insp2.name)) {
          return res.status(400).json({
            error: 'Both inspirations cannot be from the same evolution line'
          });
        }
      }

      // TODO: Validate inspiration ownership from user's trained_pokemon table
    }

    // SECURITY: SERVER-SIDE CALCULATION OF INSPIRATION BONUSES
    const calculateInspirationBonuses = () => {
      const aptitudeStars = {};
      const strategyStars = {};
      const statBonuses = {};

      (selectedInspirations || []).forEach(insp => {
        if (!insp.inspirations) return;

        // Type aptitude stars
        if (insp.inspirations.aptitude) {
          const color = insp.inspirations.aptitude.color;
          if (color) {
            aptitudeStars[color] = (aptitudeStars[color] || 0) + (insp.inspirations.aptitude.stars || 0);
          }
        }

        // Strategy stars - track per strategy name
        if (insp.inspirations.strategy) {
          const strategyName = insp.inspirations.strategy.name;
          if (strategyName) {
            strategyStars[strategyName] = (strategyStars[strategyName] || 0) + (insp.inspirations.strategy.stars || 0);
          }
        }

        // Stat bonuses (1★=+10, 2★=+25, 3★=+50)
        if (insp.inspirations.stat) {
          const statName = insp.inspirations.stat.name;
          const stars = insp.inspirations.stat.stars;
          if (statName && stars) {
            const bonus = stars === 1 ? 10 : stars === 2 ? 25 : 50;
            statBonuses[statName] = (statBonuses[statName] || 0) + bonus;
          }
        }
      });

      // Calculate aptitude upgrades: every 2 stars = 1 grade upgrade (max A grade)
      const aptitudeUpgrades = {};
      Object.keys(aptitudeStars).forEach(color => {
        aptitudeUpgrades[color] = Math.floor(aptitudeStars[color] / 2);
      });

      // Calculate strategy upgrades: every 2 stars = 1 grade upgrade per strategy (max A grade)
      const strategyUpgrades = {};
      Object.keys(strategyStars).forEach(strategyName => {
        strategyUpgrades[strategyName] = Math.floor(strategyStars[strategyName] / 2);
      });

      return { aptitudeUpgrades, strategyUpgrades, statBonuses };
    };

    // Apply grade upgrades (capped at A)
    const applyGradeUpgrades = (aptitudes, upgrades) => {
      const gradeOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
      const maxGradeIndex = gradeOrder.indexOf('A');
      const upgraded = { ...aptitudes };

      Object.keys(upgrades).forEach(color => {
        const currentGrade = upgraded[color];
        if (!currentGrade) return;
        const currentIndex = gradeOrder.indexOf(currentGrade);
        const targetIndex = currentIndex + upgrades[color];
        const newIndex = Math.min(targetIndex, maxGradeIndex);
        upgraded[color] = gradeOrder[newIndex];
      });

      return upgraded;
    };

    // Apply strategy grade upgrades (only to specific strategies, capped at A)
    const applyStrategyAptitudesUpgrade = (strategyAptitudes, upgrades) => {
      if (!strategyAptitudes || !upgrades || Object.keys(upgrades).length === 0) return strategyAptitudes;

      const gradeOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
      const maxGradeIndex = gradeOrder.indexOf('A');
      const upgraded = { ...strategyAptitudes };

      for (const [strategyName, upgradeAmount] of Object.entries(upgrades)) {
        if (upgraded[strategyName]) {
          const currentGrade = upgraded[strategyName];
          const currentIndex = gradeOrder.indexOf(currentGrade);
          if (currentIndex !== -1) {
            const targetIndex = currentIndex + upgradeAmount;
            const newIndex = Math.min(targetIndex, maxGradeIndex);
            upgraded[strategyName] = gradeOrder[newIndex];
          }
        }
      }

      return upgraded;
    };

    // Derive best strategy from aptitudes
    const deriveStrategyFromAptitudes = (strategyAptitudes) => {
      const gradeRank = { 'S': 6, 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 };
      let bestStrategy = 'Chipper';
      let bestGrade = 'C';
      let bestRank = 0;

      if (strategyAptitudes) {
        for (const [strategy, grade] of Object.entries(strategyAptitudes)) {
          const rank = gradeRank[grade] || 0;
          if (rank > bestRank) {
            bestStrategy = strategy;
            bestGrade = grade;
            bestRank = rank;
          }
        }
      }

      return { strategy: bestStrategy, strategyGrade: bestGrade };
    };

    // Calculate bonuses from inspirations
    const { aptitudeUpgrades, strategyUpgrades, statBonuses } = calculateInspirationBonuses();

    // Apply bonuses to server-side Pokemon data
    const upgradedAptitudes = applyGradeUpgrades(serverPokemonData.typeAptitudes || {}, aptitudeUpgrades);
    const upgradedStrategyAptitudes = applyStrategyAptitudesUpgrade(serverPokemonData.strategyAptitudes || {}, strategyUpgrades);
    const { strategy: defaultStrategy, strategyGrade: defaultStrategyGrade } = deriveStrategyFromAptitudes(upgradedStrategyAptitudes);

    // Apply initial stat bonuses from inspirations
    const baseStats = serverPokemonData.baseStats || { HP: 150, Attack: 50, Defense: 50, Instinct: 50, Speed: 50 };
    const upgradedBaseStats = { ...baseStats };
    Object.keys(statBonuses).forEach(statName => {
      if (upgradedBaseStats[statName] !== undefined) {
        upgradedBaseStats[statName] += statBonuses[statName];
      }
    });

    // Apply support card base stat bonuses
    selectedSupports.forEach(supportName => {
      const supportCard = SUPPORT_CARDS[supportName];
      if (supportCard && supportCard.baseStats) {
        Object.entries(supportCard.baseStats).forEach(([statName, value]) => {
          if (upgradedBaseStats[statName] !== undefined) {
            upgradedBaseStats[statName] += value;
          }
        });
      }
    });

    // Build validated Pokemon object from server data + bonuses
    const validatedPokemon = {
      ...serverPokemonData,
      name: pokemonName,
      baseStats: upgradedBaseStats,
      typeAptitudes: upgradedAptitudes,
      strategyAptitudes: upgradedStrategyAptitudes,
      strategy: defaultStrategy,
      strategyGrade: defaultStrategyGrade
    };

    // Initialize support friendships with their initial friendship values
    const supportFriendships = {};
    selectedSupports.forEach(supportName => {
      const supportCard = SUPPORT_CARDS[supportName];
      supportFriendships[supportName] = supportCard?.initialFriendship || 0;
    });

    // Generate gym leaders and initial wild battles
    const gymLeaders = generateGymLeaders();
    const availableBattles = generateWildBattles(1);

    // Initialize career state with validated Pokemon
    const careerState = {
      pokemon: validatedPokemon,
      selectedSupports,
      basePokemonName: pokemonName,
      evolutionStage: 0,
      currentStats: { ...validatedPokemon.baseStats },
      energy: 100,
      turn: 1,
      skillPoints: 30,
      knownAbilities: [...serverPokemonData.defaultAbilities],
      learnableAbilities: [...(serverPokemonData.learnableAbilities || [])],
      moveHints: {},
      turnHistory: [],
      turnLog: [],
      inspirations: selectedInspirations || [], // Store inspirations
      supportFriendships,
      completedHangouts: [],
      pokeclocks: 3,
      gymLeaders,
      currentGymIndex: 0,
      availableBattles,
      currentTrainingOptions: null,
      pendingEvent: null,
      trainingLevels: { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 },
      trainingProgress: { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 },
      stateVersion: 1 // Version tracking for idempotency - increments on every action
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
// Apply inspirations to career (server-authoritative)
// This is the ONLY way to update career state - all other updates go through specific endpoints
router.post('/apply-inspirations', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { inspirationUpdates } = req.body;

    if (!inspirationUpdates) {
      return res.status(400).json({ error: 'Inspiration updates required' });
    }

    // Get current career state from server
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    // Validate and apply inspiration updates with caps
    const newStats = { ...careerState.currentStats };
    const newAptitudes = { ...careerState.pokemon.typeAptitudes };
    const newStrategyAptitudes = { ...careerState.pokemon.strategyAptitudes };

    // Apply stat bonus (capped at reasonable values per inspiration)
    if (inspirationUpdates.statBonus) {
      const { stat, amount } = inspirationUpdates.statBonus;
      const validStats = ['HP', 'Attack', 'Defense', 'Instinct', 'Speed'];
      if (validStats.includes(stat) && typeof amount === 'number') {
        // Cap inspiration stat bonus at 50 per application
        const cappedAmount = Math.min(Math.max(0, amount), 50);
        newStats[stat] = (newStats[stat] || 0) + cappedAmount;
      }
    }

    // Apply aptitude upgrade (only one grade level at a time)
    if (inspirationUpdates.aptitudeUpgrade) {
      const { color, newGrade } = inspirationUpdates.aptitudeUpgrade;
      const validColors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
      const gradeOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
      if (validColors.includes(color) && gradeOrder.includes(newGrade)) {
        const currentGrade = newAptitudes[color] || 'F';
        const currentIndex = gradeOrder.indexOf(currentGrade);
        const newIndex = gradeOrder.indexOf(newGrade);
        // Only allow upgrade by one level
        if (newIndex === currentIndex + 1) {
          newAptitudes[color] = newGrade;
        }
      }
    }

    // Apply strategy aptitude upgrade (only one grade level at a time)
    if (inspirationUpdates.strategyUpgrade) {
      const { strategy, newGrade } = inspirationUpdates.strategyUpgrade;
      const validStrategies = ['Scaler', 'Nuker', 'Debuffer', 'Chipper', 'MadLad'];
      const gradeOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
      if (validStrategies.includes(strategy) && gradeOrder.includes(newGrade)) {
        const currentGrade = newStrategyAptitudes[strategy] || 'F';
        const currentIndex = gradeOrder.indexOf(currentGrade);
        const newIndex = gradeOrder.indexOf(newGrade);
        // Only allow upgrade by one level
        if (newIndex === currentIndex + 1) {
          newStrategyAptitudes[strategy] = newGrade;
        }
      }
    }

    const updatedCareerState = {
      ...careerState,
      currentStats: newStats,
      pokemon: {
        ...careerState.pokemon,
        typeAptitudes: newAptitudes,
        strategyAptitudes: newStrategyAptitudes
      },
      stateVersion: (careerState.stateVersion || 0) + 1
    };

    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    res.json({ success: true, careerState: updatedCareerState });
  } catch (error) {
    console.error('Apply inspirations error:', error);
    res.status(500).json({ error: 'Failed to apply inspirations' });
  }
});

// Process training action (server-authoritative)
router.post('/train', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { stat, expectedVersion } = req.body;

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

    // Version check for idempotency - if client sends expectedVersion and it doesn't match,
    // the client's state is stale (likely from a network interruption)
    if (expectedVersion !== undefined && careerState.stateVersion !== expectedVersion) {
      return res.status(409).json({
        error: 'State version mismatch - please refresh',
        code: 'VERSION_MISMATCH',
        currentState: careerState
      });
    }

    // Validate training options exist and include this stat
    if (!careerState.currentTrainingOptions || !careerState.currentTrainingOptions[stat]) {
      // Return current state so client can recover
      return res.status(400).json({
        error: 'Invalid training selection',
        code: 'INVALID_SELECTION',
        currentState: careerState
      });
    }

    const option = careerState.currentTrainingOptions[stat];
    const energyCost = GAME_CONFIG.TRAINING.ENERGY_COSTS[stat];
    const currentEnergy = careerState.energy;

    // Calculate failure chance based on current energy (before deduction)
    // Speed training has a shifted curve starting at 30 energy instead of 50
    let failureChance = 0;
    const failureThreshold = stat === 'Speed' ? 30 : 50;

    if (currentEnergy <= failureThreshold) {
      if (currentEnergy <= 0) {
        failureChance = 0.99;
      } else {
        // Exponential curve: starts gentle at threshold, accelerates dramatically toward 0
        // Formula: 0.10 + 0.89 * (1 - (energy/threshold))^3
        // At threshold energy: 0.10 (10%)
        // At half threshold: ~0.21 (21%)
        // Near 0 energy: ~0.99 (99%)
        const energyRatio = currentEnergy / failureThreshold;
        failureChance = 0.10 + 0.89 * Math.pow(1 - energyRatio, 3);
      }
    }

    const trainingFailed = Math.random() < failureChance;

    if (trainingFailed) {
      // Training failed - failures do NOT progress training levels and do NOT cost energy
      const statLoss = stat === 'Speed' ? 0 : GAME_CONFIG.TRAINING.STAT_LOSS_ON_FAILURE;

      // Build the base updated state first (with new turn number)
      const baseUpdatedState = {
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
        // Preserve training levels and progress (failures don't affect them)
        trainingLevels: careerState.trainingLevels || { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 },
        trainingProgress: careerState.trainingProgress || { HP: 0, Attack: 0, Defense: 0, Instinct: 0, Speed: 0 },
        // Regenerate wild battles with new turn's scaling
        availableBattles: generateWildBattles(careerState.turn + 1),
        stateVersion: (careerState.stateVersion || 0) + 1
      };

      // Check if an event should occur (50% chance) or generate training options
      const { pendingEvent, currentTrainingOptions } = checkForEventOrGenerateTraining(baseUpdatedState);

      const updatedCareerState = {
        ...baseUpdatedState,
        pendingEvent,
        currentTrainingOptions
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
    let energyRegenBonus = 0; // Bonus energy regen for Speed training from support cards

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

      // Collect energy regen bonus for Speed training (only from supports appearing in this training)
      if (stat === 'Speed' && supportCard.specialEffect?.energyRegenBonus) {
        energyRegenBonus += supportCard.specialEffect.energyRegenBonus;
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

    // Calculate max energy (base 100 + any maxEnergyBonus from selected support cards)
    let maxEnergy = GAME_CONFIG.CAREER.MAX_ENERGY;
    careerState.selectedSupports.forEach(supportName => {
      const supportCard = SUPPORT_CARDS[supportName];
      if (supportCard?.specialEffect?.maxEnergyBonus) {
        maxEnergy += supportCard.specialEffect.maxEnergyBonus;
      }
    });

    // Calculate new energy: subtract cost, add bonus for Speed training, cap at maxEnergy
    let newEnergy = careerState.energy - energyCost;
    if (stat === 'Speed') {
      newEnergy += energyRegenBonus; // Add bonus from support cards
    }
    newEnergy = Math.max(0, Math.min(maxEnergy, newEnergy));

    // Build the base updated state first (with new turn number)
    const baseUpdatedState = {
      ...careerState,
      currentStats: {
        ...careerState.currentStats,
        [stat]: careerState.currentStats[stat] + statGain
      },
      energy: newEnergy,
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
      // Regenerate wild battles with new turn's scaling
      availableBattles: generateWildBattles(careerState.turn + 1),
      stateVersion: (careerState.stateVersion || 0) + 1
    };

    // Check if an event should occur (50% chance) or generate training options
    const { pendingEvent, currentTrainingOptions } = checkForEventOrGenerateTraining(baseUpdatedState);

    const updatedCareerState = {
      ...baseUpdatedState,
      pendingEvent,
      currentTrainingOptions
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
    const { expectedVersion } = req.body;

    // Get active career
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    // Version check for idempotency
    if (expectedVersion !== undefined && careerState.stateVersion !== expectedVersion) {
      return res.status(409).json({
        error: 'State version mismatch - please refresh',
        code: 'VERSION_MISMATCH',
        currentState: careerState
      });
    }

    // Calculate energy gain using REST config
    const roll = Math.random();
    let energyGain = GAME_CONFIG.REST.ENERGY_GAINS[1]; // Default: middle value (50)
    if (roll < GAME_CONFIG.REST.PROBMOVES[0]) {
      energyGain = GAME_CONFIG.REST.ENERGY_GAINS[0]; // Low roll: 30
    } else if (roll > 1 - GAME_CONFIG.REST.PROBMOVES[2]) {
      energyGain = GAME_CONFIG.REST.ENERGY_GAINS[2]; // High roll: 70
    }

    // Calculate max energy (base 100 + any maxEnergyBonus from selected support cards)
    let maxEnergy = GAME_CONFIG.CAREER.MAX_ENERGY;
    careerState.selectedSupports.forEach(supportName => {
      const supportCard = SUPPORT_CARDS[supportName];
      if (supportCard?.specialEffect?.maxEnergyBonus) {
        maxEnergy += supportCard.specialEffect.maxEnergyBonus;
      }
    });

    const currentEnergy = careerState.energy ?? GAME_CONFIG.CAREER.STARTING_ENERGY;
    const newEnergy = Math.min(maxEnergy, currentEnergy + energyGain);

    const logEntry = {
      turn: careerState.turn,
      type: 'rest',
      energyGain,
      message: `Rested and recovered ${energyGain} energy.`
    };

    // Build the base updated state first (with new turn number)
    const baseUpdatedState = {
      ...careerState,
      energy: newEnergy,
      turn: careerState.turn + 1,
      turnLog: [logEntry, ...(careerState.turnLog || [])],
      // Regenerate wild battles with new turn's scaling
      availableBattles: generateWildBattles(careerState.turn + 1),
      stateVersion: (careerState.stateVersion || 0) + 1
    };

    // Check if an event should occur (50% chance) or generate training options
    const { pendingEvent, currentTrainingOptions } = checkForEventOrGenerateTraining(baseUpdatedState);

    const updatedCareerState = {
      ...baseUpdatedState,
      pendingEvent,
      currentTrainingOptions
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
      currentTrainingOptions: trainingOptions,
      pendingEvent: null  // Clear any pending event when generating training (e.g., after declining a battle)
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

    // Inspiration turns are reserved - no random events allowed
    const inspirationTurns = [11, 23, 35, 47, 59];
    if (inspirationTurns.includes(careerState.turn)) {
      // On inspiration turns, skip events and just generate training
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
      return res.json({
        success: true,
        careerState: updatedCareerState
      });
    }

    // 50% chance for an event to occur
    if (Math.random() < 0.5) {
      // Check for available hangout events - requires MAX friendship (100)
      const selectedSupports = careerState.selectedSupports || [];
      const availableHangouts = selectedSupports.filter(supportName => {
        const friendship = careerState.supportFriendships?.[supportName] || 0;
        const hasHangoutEvent = !!HANGOUT_EVENTS[supportName];
        const alreadyCompleted = (careerState.completedHangouts || []).includes(supportName);
        // Hangout events only unlock after reaching max friendship (100) AND have a hangout event defined
        return friendship >= 100 && hasHangoutEvent && !alreadyCompleted;
      });

      console.log('[Trigger Event] Hangout check:', {
        selectedSupports,
        friendships: careerState.supportFriendships,
        completedHangouts: careerState.completedHangouts || [],
        availableHangouts,
        hangoutEventKeys: Object.keys(HANGOUT_EVENTS).slice(0, 10) // First 10 keys for debug
      });

      let eventToSet = null;

      // If hangouts are available, 50% chance to pick a hangout event
      if (availableHangouts.length > 0 && Math.random() < 0.5) {
        const supportName = availableHangouts[Math.floor(Math.random() * availableHangouts.length)];
        const hangoutEvent = HANGOUT_EVENTS[supportName];
        console.log('[Trigger Event] Selected hangout:', { supportName, hangoutEvent: !!hangoutEvent });
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

    // Calculate max energy with support bonuses so events don't cap at base 100
    const maxEnergy = calculateMaxEnergy(careerState);

    // Always generate fresh training options after resolving any event
    // This prevents the frontend useEffect from triggering another event when eventResult is cleared
    const trainingOptions = generateTrainingOptionsWithAppearanceChance(
      careerState.selectedSupports,
      careerState
    );

    const updatedCareerState = {
      ...careerState,
      currentStats: newStats,
      energy: Math.max(0, Math.min(maxEnergy, careerState.energy + energyChange)),
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
      currentTrainingOptions: trainingOptions,
      stateVersion: (careerState.stateVersion || 0) + 1
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

// Clear event result (when user clicks Continue on the result screen)
router.post('/clear-event-result', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const careerState = careerResult.rows[0].career_state;

    // Only clear if there's actually an event result to clear
    if (!careerState.eventResult) {
      return res.json({
        success: true,
        careerState: careerState
      });
    }

    const updatedCareerState = {
      ...careerState,
      eventResult: null,
      stateVersion: (careerState.stateVersion || 0) + 1
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
    console.error('Clear event result error:', error);
    res.status(500).json({ error: 'Failed to clear event result' });
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
      skillPoints: careerState.skillPoints - finalCost,
      stateVersion: (careerState.stateVersion || 0) + 1
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
    const { opponent, isGymLeader, isEventBattle, expectedVersion } = req.body;

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

    // Version check for idempotency
    if (expectedVersion !== undefined && careerState.stateVersion !== expectedVersion) {
      return res.status(409).json({
        error: 'State version mismatch - please refresh',
        code: 'VERSION_MISMATCH',
        currentState: careerState
      });
    }

    // Check energy for wild battles (not gym leaders or event battles)
    if (!isGymLeader && !isEventBattle && careerState.energy <= 0) {
      return res.status(400).json({ error: 'Not enough energy for wild battle' });
    }

    // SERVER-AUTHORITATIVE: For wild battles, validate opponent against server's availableBattles
    let validatedOpponent = opponent;
    if (!isGymLeader && !isEventBattle) {
      const availableBattles = careerState.availableBattles || [];
      const opponentName = opponent.name || (opponent.pokemon && opponent.pokemon.name);

      // Find matching battle from server's available battles
      const serverBattle = availableBattles.find(b => b.name === opponentName);

      if (!serverBattle) {
        console.error('[Battle] Wild battle opponent validation failed:', {
          requestedOpponent: opponentName,
          availableBattles: availableBattles.map(b => b.name)
        });
        return res.status(400).json({
          error: 'Invalid wild battle opponent - not in available battles',
          code: 'INVALID_OPPONENT'
        });
      }

      // Use the SERVER's battle data instead of client-sent data
      validatedOpponent = serverBattle;
      console.log('[Battle] Wild battle opponent validated:', serverBattle.name);
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
    // Handle: wild battles (validated server data), gym leaders (baseStats), Elite Four (pokemon.baseStats)
    // Use validatedOpponent for wild battles (server-authoritative), original opponent for gym/event battles
    const pokemonData = validatedOpponent.pokemon || validatedOpponent; // Elite Four has nested pokemon object

    // Get base stats from opponent data
    let opponentStats = pokemonData.stats || pokemonData.baseStats;

    console.log('[Battle] Opponent data:', {
      name: pokemonData.name || validatedOpponent.name,
      isGymLeader,
      isEventBattle,
      hasStats: !!pokemonData.stats,
      hasBaseStats: !!pokemonData.baseStats,
      stats: opponentStats,
      currentTurn: careerState.turn
    });

    // Scale gym leader / Elite Four stats based on current turn
    if (isGymLeader && opponentStats) {
      const currentTurn = careerState.turn;
      const eliteFourStartTurn = GAME_CONFIG.CAREER.ELITE_FOUR_START_TURN || 60;

      // Check if this is an Elite Four battle (turn 60+)
      if (currentTurn >= eliteFourStartTurn) {
        const eliteFourIndex = currentTurn - eliteFourStartTurn;
        const multiplier = getEliteFourMultiplier(eliteFourIndex);
        opponentStats = scaleStatsWithMultiplier(opponentStats, multiplier);
        console.log('[Battle] Scaled Elite Four stats with multiplier', multiplier, '(includes ENEMY_STAT_MULTIPLIER):', opponentStats);
      } else {
        // Regular gym leader - use turn-based scaling
        opponentStats = scaleStats(opponentStats, currentTurn);
        console.log('[Battle] Scaled gym leader stats for turn', currentTurn, ':', opponentStats);
      }
    }

    // Derive opponent strategy from strategyAptitudes if available
    const opponentAptitudes = pokemonData.strategyAptitudes || validatedOpponent.strategyAptitudes;
    const derivedStrategy = opponentAptitudes
      ? deriveStrategyFromAptitudes(opponentAptitudes)
      : { strategy: pokemonData.strategy || validatedOpponent.strategy || 'Chipper', strategyGrade: pokemonData.strategyGrade || validatedOpponent.strategyGrade || 'C' };

    // Determine opponent abilities based on battle type
    let opponentAbilities;
    if (isGymLeader) {
      const currentTurn = careerState.turn;
      const eliteFourStartTurn = GAME_CONFIG.CAREER.ELITE_FOUR_START_TURN || 60;
      const isEliteFour = currentTurn >= eliteFourStartTurn;
      // Scale gym leader/Elite Four abilities based on turn
      opponentAbilities = getGymLeaderAbilities(pokemonData, currentTurn, isEliteFour);
      console.log(`[Battle] ${isEliteFour ? 'Elite Four' : 'Gym leader'} abilities for turn ${currentTurn}:`, opponentAbilities);
    } else {
      // Wild or event battles - use abilities from server-validated data
      opponentAbilities = pokemonData.abilities || pokemonData.defaultAbilities || [];
    }

    const opponentPokemon = {
      name: pokemonData.name || validatedOpponent.name,
      primaryType: pokemonData.primaryType || validatedOpponent.primaryType,
      stats: opponentStats,
      abilities: opponentAbilities,
      typeAptitudes: pokemonData.typeAptitudes || validatedOpponent.typeAptitudes,
      strategy: derivedStrategy.strategy,
      strategyGrade: derivedStrategy.strategyGrade
    };

    // Validate opponent has required fields
    if (!opponentPokemon.stats) {
      console.error('Battle error: Opponent missing stats', { validatedOpponent, opponentPokemon });
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
    let randomStatBoost = null; // For wild battles - only boost one random stat
    let primosReward = 0; // Primos reward for gym leader victories

    if (playerWon) {
      if (isGymLeader) {
        // Check if this is an Elite Four battle (turn 60+)
        const eliteFourStartTurn = GAME_CONFIG.CAREER.ELITE_FOUR_START_TURN || 60;
        const isEliteFour = careerState.turn >= eliteFourStartTurn;

        // Elite Four gives +20 to all stats, regular gym leaders give +10
        statGain = isEliteFour ? 20 : 10;
        skillPoints = 10;
        energyChange = 0;
        // Award badge for gym leader defeat
        badge = {
          gymLeaderName: opponent.name,
          defeatedAt: new Date().toISOString()
        };
        // Award primos for gym leader/Elite Four victory
        primosReward = isEliteFour ? 20 : 10; // 20 for Elite Four, 10 for regular gym leaders
      } else if (isEventBattle) {
        // Event battle victory - +15 to all stats, no energy cost
        statGain = 15;
        skillPoints = 0;
        energyChange = 0;
      } else {
        // Wild battle victory - +15 to random stat, +20 skill points, costs 25 energy
        statGain = 15;
        skillPoints = 20;
        energyChange = -25;
        // Pick a random stat to boost
        const stats = ['HP', 'Attack', 'Defense', 'Instinct', 'Speed'];
        randomStatBoost = stats[Math.floor(Math.random() * stats.length)];
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
        // Wild battle defeat - no penalty (energy was already spent to attempt)
        energyChange = 0;
      }
    }

    // Apply battle results to career state
    // Event battles do NOT progress the turn - they happen during the current turn
    // Wild battles only boost a random stat, others boost all stats
    const newStats = { ...careerState.currentStats };
    if (randomStatBoost) {
      // Wild battle - only boost the random stat
      newStats[randomStatBoost] = newStats[randomStatBoost] + statGain;
    } else {
      // Gym leader or event battle - boost all stats
      newStats.HP = newStats.HP + statGain;
      newStats.Attack = newStats.Attack + statGain;
      newStats.Defense = newStats.Defense + statGain;
      newStats.Instinct = newStats.Instinct + statGain;
      newStats.Speed = newStats.Speed + statGain;
    }

    // Calculate max energy with support bonuses so battles don't cap at base 100
    const maxEnergy = calculateMaxEnergy(careerState);

    // Build the base updated state first
    const baseUpdatedState = {
      ...careerState,
      currentStats: newStats,
      skillPoints: careerState.skillPoints + skillPoints,
      energy: Math.max(0, Math.min(maxEnergy, careerState.energy + energyChange)),
      // Event battles don't progress the turn
      turn: isEventBattle ? careerState.turn : careerState.turn + 1,
      turnLog: [{
        turn: careerState.turn,
        type: isGymLeader ? (playerWon ? 'gym_victory' : 'gym_loss') :
              isEventBattle ? (playerWon ? 'event_battle_victory' : 'event_battle_loss') :
              (playerWon ? 'battle_victory' : 'battle_loss'),
        opponent: opponent.name,
        message: playerWon
          ? (randomStatBoost
              ? `Defeated ${opponent.name}! Gained ${statGain} ${randomStatBoost}${skillPoints > 0 ? ` and ${skillPoints} skill points` : ''}${energyChange < 0 ? `. Cost ${Math.abs(energyChange)} energy.` : ''}`
              : `Defeated ${opponent.name}! Gained ${statGain} to all stats${skillPoints > 0 ? ` and ${skillPoints} skill points` : ''}${energyChange < 0 ? `. Cost ${Math.abs(energyChange)} energy.` : ''}`)
          : `Lost to ${opponent.name}.${energyChange < 0 ? ` Lost ${Math.abs(energyChange)} energy.` : ''}`
      }, ...(careerState.turnLog || [])],
      // Move to next gym leader if defeated current one
      currentGymIndex: (isGymLeader && playerWon) ? careerState.currentGymIndex + 1 : careerState.currentGymIndex,
      // Generate new wild battles for next turn (but keep current ones for event battles)
      availableBattles: isEventBattle ? careerState.availableBattles : generateWildBattles(careerState.turn + 1),
      stateVersion: (careerState.stateVersion || 0) + 1
    };

    // For event battles, keep current training options. For other battles, check for events
    let pendingEvent = null;
    let currentTrainingOptions = null;

    // Check if career just ended (defeated final Elite Four - currentGymIndex is now 9)
    const careerComplete = baseUpdatedState.currentGymIndex >= 9;

    if (careerComplete) {
      // Career is complete - don't generate training options, frontend will call completeCareer
      pendingEvent = null;
      currentTrainingOptions = null;
    } else if (isEventBattle) {
      // Event battles keep current training options
      currentTrainingOptions = careerState.currentTrainingOptions;
    } else {
      // Non-event battles (wild/gym) can trigger events
      const eventOrTraining = checkForEventOrGenerateTraining(baseUpdatedState);
      pendingEvent = eventOrTraining.pendingEvent;
      currentTrainingOptions = eventOrTraining.currentTrainingOptions;
    }

    const updatedCareerState = {
      ...baseUpdatedState,
      pendingEvent,
      currentTrainingOptions
    };

    // Save updated career state
    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    // Award primos for gym leader victories
    if (primosReward > 0) {
      await pool.query(
        'UPDATE users SET primos = primos + $1 WHERE id = $2',
        [primosReward, userId]
      );
    }

    const responsePayload = {
      success: true,
      battleResult: {
        winner: playerWon ? 'player' : 'opponent',
        battleLog: battleResult.battleLog,
        rewards: {
          statGain,
          skillPoints,
          energyChange,
          badge,
          randomStatBoost, // Which stat was boosted for wild battles (null for others)
          primosReward // Primos earned from gym leader victories
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

// Complete career (save to trained pokemon) - SERVER-AUTHORITATIVE
// Uses server's career state, not client data, to prevent stat manipulation
router.post('/complete', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    // Support both formats: { completionType, inspirations } and { careerState, completionType }
    const { completionType, careerState } = req.body;
    const inspirations = req.body.inspirations || careerState?.inspirations || null;

    if (!completionType) {
      return res.status(400).json({ error: 'Completion type required' });
    }

    // Validate completion type
    const validCompletionTypes = ['champion', 'defeat', 'defeated', 'abandon'];
    if (!validCompletionTypes.includes(completionType)) {
      return res.status(400).json({ error: 'Invalid completion type' });
    }

    // Get the ACTUAL career state from the server - don't trust client data
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    const serverCareerState = careerResult.rows[0].career_state;

    // Validate completion type matches game state
    // Champion requires defeating all Elite Four (4 gyms + 4 Elite Four = 8 total, so currentGymIndex >= 8)
    if (completionType === 'champion' && serverCareerState.currentGymIndex < 8) {
      return res.status(400).json({ error: 'Cannot claim champion status - Elite Four not defeated' });
    }

    // Save to pokemon_rosters using SERVER's career state (not client data)
    const pokemonData = {
      name: serverCareerState.pokemon.name,
      primaryType: serverCareerState.pokemon.primaryType,
      stats: serverCareerState.currentStats,  // Use server's stats
      abilities: serverCareerState.knownAbilities,  // Use server's abilities
      typeAptitudes: serverCareerState.pokemon.typeAptitudes,
      strategyAptitudes: serverCareerState.pokemon.strategyAptitudes,
      strategy: serverCareerState.pokemon.strategy,
      strategyGrade: serverCareerState.pokemon.strategyGrade,
      inspirations: inspirations || serverCareerState.inspirations || null,
      completionType,
      turnNumber: serverCareerState.turn,
      gymsDefeated: serverCareerState.currentGymIndex || 0
    };

    await pool.query(
      'INSERT INTO pokemon_rosters (user_id, pokemon_data, turn_number) VALUES ($1, $2, $3)',
      [userId, JSON.stringify(pokemonData), serverCareerState.turn]
    );

    // Delete active career
    await pool.query(
      'DELETE FROM active_careers WHERE user_id = $1',
      [userId]
    );

    // Award primos for career completion
    // Champion (defeated all Elite Four) gets 20 primos bonus
    // Regular completion (gym loss or retirement) gets nothing
    let primosReward = 0;
    if (completionType === 'champion') {
      primosReward = 20;
    }

    if (primosReward > 0) {
      await pool.query(
        'UPDATE users SET primos = primos + $1 WHERE id = $2',
        [primosReward, userId]
      );
    }

    res.json({ success: true, primosReward, trainedPokemon: pokemonData });
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
      turn: careerState.turn - 1,  // Revert turn so gym battle triggers again
      stateVersion: (careerState.stateVersion || 0) + 1
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

// ============================================================================
// STRATEGY SELECTION
// ============================================================================

// Change the Pokemon's active strategy
router.post('/change-strategy', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { strategy } = req.body;

    // Validate strategy
    const validStrategies = ['Scaler', 'Nuker', 'Debuffer', 'Chipper', 'MadLad'];
    if (!strategy || !validStrategies.includes(strategy)) {
      return res.status(400).json({ error: 'Invalid strategy' });
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

    // Ensure pokemon has strategyAptitudes
    if (!careerState.pokemon.strategyAptitudes) {
      return res.status(400).json({ error: 'Pokemon does not have strategy aptitudes' });
    }

    // Get the grade for the selected strategy
    const strategyGrade = careerState.pokemon.strategyAptitudes[strategy] || 'C';

    // Update the pokemon's strategy
    const updatedCareerState = {
      ...careerState,
      pokemon: {
        ...careerState.pokemon,
        strategy: strategy,
        strategyGrade: strategyGrade
      },
      stateVersion: (careerState.stateVersion || 0) + 1
    };

    // Save updated career state
    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    console.log('[ChangeStrategy] Strategy changed to', strategy, '(grade:', strategyGrade, ')');

    res.json({
      success: true,
      careerState: updatedCareerState,
      strategy: strategy,
      strategyGrade: strategyGrade
    });
  } catch (error) {
    console.error('Change strategy error:', error);
    res.status(500).json({ error: 'Failed to change strategy' });
  }
});

// ============================================================================
// FORGET ABILITY
// ============================================================================

// Forget an ability (move from known to learnable)
router.post('/forget-ability', authenticateToken, async (req, res) => {
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

    // Validate move is currently known
    if (!careerState.knownAbilities.includes(moveName)) {
      return res.status(400).json({ error: 'Move is not known' });
    }

    // Remove from known abilities
    const newKnownAbilities = careerState.knownAbilities.filter(m => m !== moveName);

    // Add to learnable abilities if not already there
    const newLearnableAbilities = [...(careerState.learnableAbilities || [])];
    if (!newLearnableAbilities.includes(moveName)) {
      newLearnableAbilities.push(moveName);
    }

    const updatedCareerState = {
      ...careerState,
      knownAbilities: newKnownAbilities,
      learnableAbilities: newLearnableAbilities,
      stateVersion: (careerState.stateVersion || 0) + 1
    };

    await pool.query(
      'UPDATE active_careers SET career_state = $1, last_updated = NOW() WHERE user_id = $2',
      [JSON.stringify(updatedCareerState), userId]
    );

    console.log('[ForgetAbility] Forgot move:', moveName);

    res.json({
      success: true,
      careerState: updatedCareerState
    });
  } catch (error) {
    console.error('Forget ability error:', error);
    res.status(500).json({ error: 'Failed to forget ability' });
  }
});

// ============================================================================
// GENERIC UPDATE (for backward compatibility)
// ============================================================================

// Generic career state update
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { careerState: newCareerState } = req.body;

    if (!newCareerState) {
      return res.status(400).json({ error: 'Career state required' });
    }

    // Get active career to validate
    const careerResult = await pool.query(
      'SELECT career_state FROM active_careers WHERE user_id = $1',
      [userId]
    );

    if (careerResult.rows.length === 0) {
      return res.status(400).json({ error: 'No active career found' });
    }

    // Update with provided state (increment version)
    const updatedCareerState = {
      ...newCareerState,
      stateVersion: (newCareerState.stateVersion || 0) + 1
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
    console.error('Update career error:', error);
    res.status(500).json({ error: 'Failed to update career' });
  }
});

module.exports = router;
