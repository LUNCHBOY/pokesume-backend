/**
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
