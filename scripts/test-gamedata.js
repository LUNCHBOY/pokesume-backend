/**
 * Test that gameData works correctly after the split
 */

const gameData = require('../shared/gameData');

// Test all exports exist
const requiredExports = [
  'ICONS', 'EVOLUTION_CONFIG', 'EVOLUTION_CHAINS', 'GAME_CONFIG',
  'MOVES', 'POKEMON', 'LEGENDARY_POKEMON', 'GYM_LEADER_POKEMON', 'ELITE_FOUR',
  'SUPPORT_CARDS', 'SUPPORT_GACHA_RARITY', 'GACHA_RARITY',
  'RANDOM_EVENTS', 'HANGOUT_EVENTS', 'LEGACY_SUPPORT_NAME_MAP',
  'SUPPORT_LIMIT_BREAK_PROGRESSIONS', 'calculateBaseStats',
  'normalizeSupportName', 'getSupportAtLimitBreak'
];

let allGood = true;
for (const exp of requiredExports) {
  if (!gameData[exp]) {
    console.log('MISSING:', exp);
    allGood = false;
  }
}

// Test calculateBaseStats works (used by POKEMON definitions)
const testStats = gameData.calculateBaseStats({ HP: 100, Attack: 80, Defense: 70, Instinct: 60, Speed: 90 }, 2);
if (!testStats.HP || !testStats.Attack) {
  console.log('ERROR: calculateBaseStats not working');
  allGood = false;
}

// Test getSupportAtLimitBreak works
const cynthiaLB0 = gameData.getSupportAtLimitBreak('Cynthia', 0);
const cynthiaLB4 = gameData.getSupportAtLimitBreak('Cynthia', 4);
if (!cynthiaLB0 || !cynthiaLB4) {
  console.log('ERROR: getSupportAtLimitBreak not working');
  allGood = false;
}

// Test normalizeSupportName works
const normalized = gameData.normalizeSupportName('CynthiaGarchomp');
if (normalized !== 'Cynthia') {
  console.log('ERROR: normalizeSupportName not working, got:', normalized);
  allGood = false;
}

// Test a Pokemon uses calculateBaseStats correctly
const charmander = gameData.POKEMON.Charmander;
if (!charmander || !charmander.baseStats || !charmander.baseStats.HP) {
  console.log('ERROR: POKEMON definitions broken');
  allGood = false;
}

if (allGood) {
  console.log('All backend tests passed!');
  console.log('- POKEMON:', Object.keys(gameData.POKEMON).length);
  console.log('- MOVES:', Object.keys(gameData.MOVES).length);
  console.log('- SUPPORT_CARDS:', Object.keys(gameData.SUPPORT_CARDS).length);
  console.log('- RANDOM_EVENTS:', Object.keys(gameData.RANDOM_EVENTS).length);
  console.log('- GYM_LEADER_POKEMON:', Object.keys(gameData.GYM_LEADER_POKEMON).length);
  console.log('- ELITE_FOUR:', gameData.ELITE_FOUR.length);
  console.log('- Charmander HP:', charmander.baseStats.HP);
  console.log('- Cynthia LB0 Attack:', cynthiaLB0.baseStats.Attack);
  console.log('- Cynthia LB4 Attack:', cynthiaLB4.baseStats.Attack);
} else {
  process.exit(1);
}
