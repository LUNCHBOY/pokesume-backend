/**
 * Strategy Simulation Script
 * Tests all 5 strategies against each other to determine balance
 */

const { simulateBattle, MOVES, GAME_CONFIG } = require('../services/battleSimulator');

const STRATEGIES = ['Scaler', 'Nuker', 'Debuffer', 'Chipper', 'MadLad'];
const BATTLES_PER_MATCHUP = 100;

// Create a test Pokemon with given stats and strategy
function createTestPokemon(strategy, level = 50) {
  const stats = {
    HP: 100,
    Attack: 80,
    Defense: 80,
    Instinct: 60,
    Speed: 70
  };

  // All Pokemon get access to a standard move pool
  const abilities = [
    'Ember', 'Flamethrower', 'FireBlast',
    'WaterGun', 'Surf', 'HydroPump',
    'VineWhip', 'RazorLeaf', 'SolarBeam',
    'QuickAttack', 'Tackle', 'BodySlam',
    'SwordsDance', 'IronDefense', 'Agility',
    'Growl', 'Leer', 'Screech',
    'ThunderShock', 'Thunderbolt', 'Thunder'
  ];

  return {
    name: `Test${strategy}`,
    stats,
    level,
    strategy,
    strategyGrade: 'A',
    abilities,
    primaryType: 'Fire',
    typeAptitudes: {
      Fire: 'B',
      Water: 'C',
      Grass: 'C',
      Electric: 'C',
      Psychic: 'C',
      Fighting: 'C',
      Normal: 'B'
    }
  };
}

// Run simulation between two strategies
function simulateMatchup(strategy1, strategy2, numBattles) {
  let wins1 = 0;
  let wins2 = 0;
  let ties = 0;

  for (let i = 0; i < numBattles; i++) {
    const pokemon1 = createTestPokemon(strategy1);
    const pokemon2 = createTestPokemon(strategy2);

    const result = simulateBattle(pokemon1, pokemon2);

    if (result.winner === 1) {
      wins1++;
    } else if (result.winner === 2) {
      wins2++;
    } else {
      ties++;
    }
  }

  return { wins1, wins2, ties };
}

// Main simulation
console.log('='.repeat(60));
console.log('STRATEGY BALANCE SIMULATION (POST-BALANCE PATCH)');
console.log('='.repeat(60));
console.log(`Running ${BATTLES_PER_MATCHUP} battles per matchup...\n`);

const results = {};

// Initialize results object
STRATEGIES.forEach(s => {
  results[s] = { wins: 0, losses: 0, ties: 0, totalBattles: 0 };
});

// Run all matchups
for (let i = 0; i < STRATEGIES.length; i++) {
  for (let j = i + 1; j < STRATEGIES.length; j++) {
    const s1 = STRATEGIES[i];
    const s2 = STRATEGIES[j];

    const { wins1, wins2, ties } = simulateMatchup(s1, s2, BATTLES_PER_MATCHUP);

    console.log(`${s1} vs ${s2}: ${wins1}-${wins2} (${ties} ties)`);

    results[s1].wins += wins1;
    results[s1].losses += wins2;
    results[s1].ties += ties;
    results[s1].totalBattles += BATTLES_PER_MATCHUP;

    results[s2].wins += wins2;
    results[s2].losses += wins1;
    results[s2].ties += ties;
    results[s2].totalBattles += BATTLES_PER_MATCHUP;
  }
}

// Calculate win rates and rank strategies
console.log('\n' + '='.repeat(60));
console.log('FINAL RANKINGS (POST-BALANCE)');
console.log('='.repeat(60));

const rankings = STRATEGIES.map(strategy => {
  const data = results[strategy];
  const winRate = (data.wins / data.totalBattles) * 100;
  return { strategy, ...data, winRate };
}).sort((a, b) => b.winRate - a.winRate);

rankings.forEach((r, idx) => {
  const tier = r.winRate >= 60 ? 'S-Tier' :
               r.winRate >= 50 ? 'A-Tier' :
               r.winRate >= 40 ? 'B-Tier' :
               r.winRate >= 30 ? 'C-Tier' : 'D-Tier';

  console.log(`${idx + 1}. ${r.strategy}: ${r.winRate.toFixed(1)}% win rate (${r.wins}W/${r.losses}L/${r.ties}T) - ${tier}`);
});

console.log('\n' + '='.repeat(60));
console.log('BALANCE ANALYSIS');
console.log('='.repeat(60));

const winRates = rankings.map(r => r.winRate);
const avgWinRate = winRates.reduce((a, b) => a + b, 0) / winRates.length;
const variance = winRates.reduce((sum, wr) => sum + Math.pow(wr - avgWinRate, 2), 0) / winRates.length;
const stdDev = Math.sqrt(variance);

console.log(`Average Win Rate: ${avgWinRate.toFixed(1)}%`);
console.log(`Win Rate Range: ${Math.min(...winRates).toFixed(1)}% - ${Math.max(...winRates).toFixed(1)}%`);
console.log(`Standard Deviation: ${stdDev.toFixed(2)}%`);
console.log(`Balance Score: ${(100 - stdDev * 2).toFixed(1)}/100 (higher is more balanced)`);
