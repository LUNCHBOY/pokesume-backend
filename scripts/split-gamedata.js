/**
 * Split gameData.js into smaller component files
 *
 * Run this once to split the monolithic gameData.js into smaller files.
 * Usage: node scripts/split-gamedata.js
 */

const fs = require('fs');
const path = require('path');

const SOURCE_FILE = path.resolve(__dirname, '../shared/gameData.js');
const OUTPUT_DIR = path.resolve(__dirname, '../shared/gamedata');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('Reading source file...');
let content = fs.readFileSync(SOURCE_FILE, 'utf8');

// Remove BOM if present
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.slice(1);
}

// Helper to extract a section by finding const NAME = and its closing
function extractSection(content, constName, isFunction = false) {
  const patterns = [
    new RegExp(`^(const ${constName}\\s*=\\s*\\{[\\s\\S]*?^\\};?)`, 'gm'),
    new RegExp(`^(const ${constName}\\s*=\\s*\\[[\\s\\S]*?^\\];?)`, 'gm'),
  ];

  if (isFunction) {
    // For functions, match const name = (args) => { ... }; or function name() { ... }
    patterns.push(new RegExp(`^(const ${constName}\\s*=\\s*\\([^)]*\\)\\s*=>\\s*\\{[\\s\\S]*?^\\};?)`, 'gm'));
  }

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return null;
}

// Extract by line ranges since regex is tricky for nested structures
function extractByLineRange(lines, startPattern, endPattern) {
  let startIdx = -1;
  let endIdx = -1;
  let braceDepth = 0;
  let inSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (startPattern.test(line) && !inSection) {
      startIdx = i;
      inSection = true;
      braceDepth = 0;
    }

    if (inSection) {
      braceDepth += (line.match(/\{/g) || []).length;
      braceDepth -= (line.match(/\}/g) || []).length;

      // Check if we've closed all braces and hit a semicolon or just closing brace
      if (braceDepth === 0 && (line.includes('};') || line.trim() === '}')) {
        endIdx = i;
        break;
      }
    }
  }

  if (startIdx !== -1 && endIdx !== -1) {
    return lines.slice(startIdx, endIdx + 1).join('\n');
  }
  return null;
}

const lines = content.split('\n');

// ============================================================================
// 1. CONFIG - ICONS, EVOLUTION_CONFIG, EVOLUTION_CHAINS, GAME_CONFIG, calculateBaseStats
// ============================================================================
console.log('Creating config.js...');

const iconsSection = extractByLineRange(lines, /^const ICONS\s*=/, null);
const evolutionConfigSection = extractByLineRange(lines, /^const EVOLUTION_CONFIG\s*=/, null);
const evolutionChainsSection = extractByLineRange(lines, /^const EVOLUTION_CHAINS\s*=/, null);
const gameConfigSection = extractByLineRange(lines, /^const GAME_CONFIG\s*=/, null);
const calculateBaseStatsSection = extractByLineRange(lines, /^const calculateBaseStats\s*=/, null);

const configContent = `/**
 * GAME CONFIGURATION
 * Core configuration constants and utility functions
 */

${iconsSection}

${evolutionConfigSection}

${evolutionChainsSection}

${gameConfigSection}

${calculateBaseStatsSection}

module.exports = {
  ICONS,
  EVOLUTION_CONFIG,
  EVOLUTION_CHAINS,
  GAME_CONFIG,
  calculateBaseStats
};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'config.js'), configContent);

// ============================================================================
// 2. MOVES
// ============================================================================
console.log('Creating moves.js...');

const movesSection = extractByLineRange(lines, /^const MOVES\s*=/, null);

const movesContent = `/**
 * MOVES DATABASE
 * All move definitions with damage, effects, costs, etc.
 */

${movesSection}

module.exports = { MOVES };
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'moves.js'), movesContent);

// ============================================================================
// 3. POKEMON (imports calculateBaseStats)
// ============================================================================
console.log('Creating pokemon.js...');

const pokemonSection = extractByLineRange(lines, /^const POKEMON\s*=\s*\{/, null);
const legendaryPokemonSection = extractByLineRange(lines, /^const LEGENDARY_POKEMON\s*=/, null);

const pokemonContent = `/**
 * POKEMON DATABASE
 * All Pokemon definitions with stats, types, abilities, etc.
 */

const { calculateBaseStats } = require('./config');

${pokemonSection}

${legendaryPokemonSection}

module.exports = {
  POKEMON,
  LEGENDARY_POKEMON
};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'pokemon.js'), pokemonContent);

// ============================================================================
// 4. GYM / ELITE FOUR
// ============================================================================
console.log('Creating gym.js...');

const gymLeaderSection = extractByLineRange(lines, /^const GYM_LEADER_POKEMON\s*=/, null);
const eliteFourSection = extractByLineRange(lines, /^const ELITE_FOUR\s*=/, null);

const gymContent = `/**
 * GYM LEADERS AND ELITE FOUR
 * Boss battle Pokemon definitions
 */

${gymLeaderSection}

${eliteFourSection}

module.exports = {
  GYM_LEADER_POKEMON,
  ELITE_FOUR
};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'gym.js'), gymContent);

// ============================================================================
// 5. SUPPORT CARDS AND RELATED
// ============================================================================
console.log('Creating supports.js...');

const supportCardsSection = extractByLineRange(lines, /^const SUPPORT_CARDS\s*=/, null);
const legacySupportSection = extractByLineRange(lines, /^const LEGACY_SUPPORT_NAME_MAP\s*=/, null);
const supportLimitBreakSection = extractByLineRange(lines, /^const SUPPORT_LIMIT_BREAK_PROGRESSIONS\s*=/, null);
const supportGachaSection = extractByLineRange(lines, /^const SUPPORT_GACHA_RARITY\s*=/, null);

// Extract normalizeSupportName function
let normalizeFnStart = lines.findIndex(l => /^const normalizeSupportName\s*=/.test(l));
let normalizeFnEnd = normalizeFnStart;
if (normalizeFnStart !== -1) {
  let depth = 0;
  for (let i = normalizeFnStart; i < lines.length; i++) {
    depth += (lines[i].match(/\{/g) || []).length;
    depth -= (lines[i].match(/\}/g) || []).length;
    if (depth === 0 && lines[i].includes(';')) {
      normalizeFnEnd = i;
      break;
    }
  }
}
const normalizeSection = normalizeFnStart !== -1 ? lines.slice(normalizeFnStart, normalizeFnEnd + 1).join('\n') : '';

// Extract getSupportAtLimitBreak function
let getSupportFnStart = lines.findIndex(l => /^const getSupportAtLimitBreak\s*=/.test(l));
let getSupportFnEnd = getSupportFnStart;
if (getSupportFnStart !== -1) {
  let depth = 0;
  for (let i = getSupportFnStart; i < lines.length; i++) {
    depth += (lines[i].match(/\{/g) || []).length;
    depth -= (lines[i].match(/\}/g) || []).length;
    if (depth === 0 && lines[i].includes(';')) {
      getSupportFnEnd = i;
      break;
    }
  }
}
const getSupportSection = getSupportFnStart !== -1 ? lines.slice(getSupportFnStart, getSupportFnEnd + 1).join('\n') : '';

const supportsContent = `/**
 * SUPPORT CARDS
 * Support card definitions, gacha pools, and limit break progressions
 */

${supportCardsSection}

${legacySupportSection}

${supportLimitBreakSection}

${normalizeSection}

${getSupportSection}

${supportGachaSection}

module.exports = {
  SUPPORT_CARDS,
  LEGACY_SUPPORT_NAME_MAP,
  SUPPORT_LIMIT_BREAK_PROGRESSIONS,
  normalizeSupportName,
  getSupportAtLimitBreak,
  SUPPORT_GACHA_RARITY
};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'supports.js'), supportsContent);

// ============================================================================
// 6. EVENTS
// ============================================================================
console.log('Creating events.js...');

const randomEventsSection = extractByLineRange(lines, /^const RANDOM_EVENTS\s*=/, null);
const hangoutEventsSection = extractByLineRange(lines, /^const HANGOUT_EVENTS\s*=/, null);

const eventsContent = `/**
 * GAME EVENTS
 * Random events and hangout events for career mode
 */

${randomEventsSection}

${hangoutEventsSection}

module.exports = {
  RANDOM_EVENTS,
  HANGOUT_EVENTS
};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'events.js'), eventsContent);

// ============================================================================
// 7. GACHA
// ============================================================================
console.log('Creating gacha.js...');

const gachaRaritySection = extractByLineRange(lines, /^const GACHA_RARITY\s*=/, null);

const gachaContent = `/**
 * GACHA POOLS
 * Pokemon gacha rarity definitions
 */

${gachaRaritySection}

module.exports = { GACHA_RARITY };
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'gacha.js'), gachaContent);

// ============================================================================
// 8. Create index.js that re-exports everything
// ============================================================================
console.log('Creating index.js...');

const indexContent = `/**
 * GAME DATA INDEX
 * Re-exports all game data from split modules
 */

const { ICONS, EVOLUTION_CONFIG, EVOLUTION_CHAINS, GAME_CONFIG, calculateBaseStats } = require('./config');
const { MOVES } = require('./moves');
const { POKEMON, LEGENDARY_POKEMON } = require('./pokemon');
const { GYM_LEADER_POKEMON, ELITE_FOUR } = require('./gym');
const { SUPPORT_CARDS, LEGACY_SUPPORT_NAME_MAP, SUPPORT_LIMIT_BREAK_PROGRESSIONS, normalizeSupportName, getSupportAtLimitBreak, SUPPORT_GACHA_RARITY } = require('./supports');
const { RANDOM_EVENTS, HANGOUT_EVENTS } = require('./events');
const { GACHA_RARITY } = require('./gacha');

module.exports = {
  ICONS,
  EVOLUTION_CONFIG,
  EVOLUTION_CHAINS,
  GAME_CONFIG,
  MOVES,
  calculateBaseStats,
  POKEMON,
  LEGENDARY_POKEMON,
  GYM_LEADER_POKEMON,
  ELITE_FOUR,
  SUPPORT_CARDS,
  SUPPORT_GACHA_RARITY,
  GACHA_RARITY,
  RANDOM_EVENTS,
  HANGOUT_EVENTS,
  LEGACY_SUPPORT_NAME_MAP,
  normalizeSupportName,
  SUPPORT_LIMIT_BREAK_PROGRESSIONS,
  getSupportAtLimitBreak
};
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.js'), indexContent);

console.log('Done! Files created in', OUTPUT_DIR);
console.log('\nNext steps:');
console.log('1. Update the main gameData.js to re-export from ./gamedata/index.js');
console.log('2. Update the frontend sync script to handle the new structure');
