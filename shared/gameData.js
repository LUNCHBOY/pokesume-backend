/**
 * GAME DATA
 *
 * This file re-exports all game data from the split modules in ./gamedata/
 * The data has been split for maintainability:
 *
 * - config.js: ICONS, EVOLUTION_CONFIG, EVOLUTION_CHAINS, GAME_CONFIG, calculateBaseStats
 * - moves.js: MOVES
 * - pokemon.js: POKEMON, LEGENDARY_POKEMON
 * - gym.js: GYM_LEADER_POKEMON, ELITE_FOUR
 * - supports.js: SUPPORT_CARDS, SUPPORT_GACHA_RARITY, LEGACY_SUPPORT_NAME_MAP,
 *                SUPPORT_LIMIT_BREAK_PROGRESSIONS, normalizeSupportName, getSupportAtLimitBreak
 * - events.js: RANDOM_EVENTS, HANGOUT_EVENTS
 * - gacha.js: GACHA_RARITY
 */

export * from './gamedata/index.js';
