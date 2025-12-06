/**
 * GAME DATA INDEX
 * Re-exports all game data from split modules
 */

export { ICONS, EVOLUTION_CONFIG, EVOLUTION_CHAINS, GAME_CONFIG, calculateBaseStats } from './config.js';
export { MOVES } from './moves.js';
export { POKEMON, LEGENDARY_POKEMON } from './pokemon.js';
export { GYM_LEADER_POKEMON, ELITE_FOUR } from './gym.js';
export { SUPPORT_CARDS, LEGACY_SUPPORT_NAME_MAP, SUPPORT_LIMIT_BREAK_PROGRESSIONS, normalizeSupportName, getSupportAtLimitBreak, SUPPORT_GACHA_RARITY } from './supports.js';
export { RANDOM_EVENTS, HANGOUT_EVENTS } from './events.js';
export { GACHA_RARITY } from './gacha.js';
