const { SUPPORT_CARDS, SUPPORT_LIMIT_BREAK_PROGRESSIONS, getSupportAtLimitBreak } = require('../shared/gamedata/supports.js');

/**
 * SUPPORT CARD BALANCE ANALYSIS
 *
 * This script analyzes support card power based on actual game impact.
 *
 * GAME MECHANICS REFERENCE:
 * - Career is 60 turns with ~5 trainings per turn average
 * - Training costs: HP=20, Attack=25, Defense=15, Instinct=20, Speed=-5 (gives energy)
 * - Base stat gains: HP=8, Attack=5, Defense=5, Instinct=4, Speed=3
 * - Base failure at 0 energy: 99%
 * - Max Energy base: 100
 * - Skill points on success: 3
 * - Friendship gain per training: 10
 *
 * ATTRIBUTE IMPACT ANALYSIS:
 *
 * 1. BASE STATS (HP, Attack, Defense, Instinct, Speed)
 *    - Added directly to Pokemon's stats when support appears in training
 *    - Value: Direct stat boost, moderate impact
 *
 * 2. TRAINING BONUS
 *    - typeMatch: Bonus stats when training matches support type (e.g., Fire support on Attack training)
 *    - otherStats: Bonus for non-matching training types
 *    - maxFriendshipTypeMatch: Extra bonus at max friendship
 *    - Value: High impact - affects every training session
 *
 * 3. APPEARANCE RATE (0.30-0.60 typical)
 *    - Probability of appearing in training sessions
 *    - Higher = more consistent stat gains
 *    - Value: VERY HIGH - multiplies all other benefits
 *
 * 4. TYPE MATCH PREFERENCE (0.05-0.55 typical)
 *    - Higher = more likely to appear in type-matching training
 *    - Synergizes with typeMatch bonus
 *    - Value: Medium-High - affects training efficiency
 *
 * 5. INITIAL FRIENDSHIP (0-60 typical)
 *    - Starting friendship level
 *    - Max friendship unlocks maxFriendshipTypeMatch bonus
 *    - Also affects gacha pulls and other systems
 *    - Value: Medium - frontloaded advantage
 *
 * SPECIAL EFFECTS:
 *
 * 6. statGainMultiplier (1.12-1.25 typical)
 *    - Multiplies ALL stat gains from training
 *    - EXTREMELY valuable - affects every training
 *    - Score: (multiplier - 1) * 500 (e.g., 1.25 = 125 points)
 *
 * 7. skillPointMultiplier (1.3-1.5 typical)
 *    - Multiplies skill points earned
 *    - Skill points buy moves - very valuable
 *    - Score: (multiplier - 1) * 200
 *
 * 8. failRateReduction (0.08-0.15 typical)
 *    - Reduces training failure chance
 *    - Critical for consistent training
 *    - Score: reduction * 400 (0.15 = 60 points)
 *
 * 9. friendshipGainBonus (5-10 typical)
 *    - Extra friendship per training
 *    - Reaches max friendship faster
 *    - Score: bonus * 2
 *
 * 10. maxEnergyBonus (6-20 typical)
 *     - Increases max energy pool
 *     - Allows more trainings before rest
 *     - Score: bonus * 3
 *
 * 11. restBonus (4-8 typical)
 *     - Extra energy from resting
 *     - Score: bonus * 4
 *
 * 12. energyRegenBonus (3-8 typical)
 *     - Extra energy from Speed training
 *     - Speed training gives energy instead of costing it
 *     - Score: bonus * 5
 *
 * 13. energyCostReduction (2 typical)
 *     - Reduces training energy costs
 *     - Score: reduction * 15
 */

const WEIGHTS = {
  // Base stats - direct value, always applies when support appears
  baseStatTotal: 1.0,

  // Training bonuses - core value, applies every training when support appears
  trainingTypeMatch: 1.5,      // Type match training bonus
  trainingOther: 1.0,          // Other stats training bonus
  trainingMaxFriend: 0.5,      // Max friendship bonus (late game)

  // Appearance mechanics - multiplied by 100 since values are 0.30-0.60
  appearanceRate: 50,          // How often they appear
  typeMatchPreference: 30,     // Type preference synergy

  // Friendship - early game advantage
  initialFriendship: 0.5,      // Starting friendship (0-60 range)

  // Special effects - Training effects (only when appearing, so discounted)
  // These are powerful but conditional on appearance (~40% avg)
  statGainMultiplier: 80,      // Per 1% above 1.0 (1.25 = 20 points)
  skillPointMultiplier: 50,    // Per 1% above 1.0 (1.5 = 25 points)
  failRateReduction: 80,       // Per 1% (0.15 = 12 points)
  friendshipGainBonus: 1.5,    // Per point (8 = 12 points)
  energyRegenBonus: 2,         // Per point (8 = 16 points)
  energyCostReduction: 2.5,    // Per point (2 = 5 points)

  // Special effects - Passive effects (always active, so slightly higher value)
  maxEnergyBonus: 1.5,         // Per point (18 = 27 points)
  restBonus: 2                 // Per point (8 = 16 points)
};

function calcPowerScore(card, breakdown = false) {
  const components = {};
  let score = 0;

  // 1. Base stats total
  const totalStats = Object.values(card.baseStats).reduce((a, b) => a + b, 0);
  const baseStatScore = totalStats * WEIGHTS.baseStatTotal;
  components.baseStats = Math.round(baseStatScore);
  score += baseStatScore;

  // 2. Training bonuses
  const typeMatchScore = card.trainingBonus.typeMatch * WEIGHTS.trainingTypeMatch;
  const otherScore = card.trainingBonus.otherStats * WEIGHTS.trainingOther;
  const maxFriendScore = card.trainingBonus.maxFriendshipTypeMatch * WEIGHTS.trainingMaxFriend;
  components.trainingTypeMatch = Math.round(typeMatchScore);
  components.trainingOther = Math.round(otherScore);
  components.trainingMaxFriend = Math.round(maxFriendScore);
  score += typeMatchScore + otherScore + maxFriendScore;

  // 3. Appearance and type preference
  const appearScore = card.appearanceRate * WEIGHTS.appearanceRate;
  const typePrefScore = card.typeMatchPreference * WEIGHTS.typeMatchPreference;
  components.appearanceRate = Math.round(appearScore);
  components.typeMatchPref = Math.round(typePrefScore);
  score += appearScore + typePrefScore;

  // 4. Initial friendship
  const friendScore = card.initialFriendship * WEIGHTS.initialFriendship;
  components.initialFriendship = Math.round(friendScore);
  score += friendScore;

  // 5. Special effects
  components.specialEffects = {};
  if (card.specialEffect) {
    for (const [effect, value] of Object.entries(card.specialEffect)) {
      let effectScore = 0;

      if (effect === 'statGainMultiplier') {
        effectScore = (value - 1) * WEIGHTS.statGainMultiplier;
      } else if (effect === 'skillPointMultiplier') {
        effectScore = (value - 1) * WEIGHTS.skillPointMultiplier;
      } else if (effect === 'failRateReduction') {
        effectScore = value * WEIGHTS.failRateReduction;
      } else if (effect === 'friendshipGainBonus') {
        effectScore = value * WEIGHTS.friendshipGainBonus;
      } else if (effect === 'maxEnergyBonus') {
        effectScore = value * WEIGHTS.maxEnergyBonus;
      } else if (effect === 'restBonus') {
        effectScore = value * WEIGHTS.restBonus;
      } else if (effect === 'energyRegenBonus') {
        effectScore = value * WEIGHTS.energyRegenBonus;
      } else if (effect === 'energyCostReduction') {
        effectScore = value * WEIGHTS.energyCostReduction;
      }

      components.specialEffects[effect] = Math.round(effectScore);
      score += effectScore;
    }
  }

  if (breakdown) {
    return { total: Math.round(score), components };
  }
  return Math.round(score);
}

// Calculate scores for all cards at different LB levels
const results = [];
for (const [name, card] of Object.entries(SUPPORT_CARDS)) {
  const scores = {};
  const breakdowns = {};

  for (let lb = 0; lb <= 4; lb++) {
    const lbCard = getSupportAtLimitBreak(name, lb);
    if (lbCard) {
      const result = calcPowerScore(lbCard, true);
      scores['LB' + lb] = result.total;
      breakdowns['LB' + lb] = result.components;
    }
  }

  results.push({
    name,
    rarity: card.rarity,
    supportType: card.supportType,
    ...scores,
    breakdowns
  });
}

// Sort by rarity then LB4 score
const rarityOrder = { 'Legendary': 0, 'Rare': 1, 'Uncommon': 2, 'Common': 3 };
results.sort((a, b) => {
  if (rarityOrder[a.rarity] !== rarityOrder[b.rarity]) {
    return rarityOrder[a.rarity] - rarityOrder[b.rarity];
  }
  return (b.LB4 || 0) - (a.LB4 || 0);
});

// Print main table
console.log('='.repeat(100));
console.log('SUPPORT CARD BALANCE ANALYSIS - Game Impact Weighted');
console.log('='.repeat(100));
console.log('');
console.log('WEIGHT EXPLANATIONS:');
console.log('  Base Stats: 1.0 per point (direct stat contribution)');
console.log('  Training Type Match: 2.0x (frequent, high impact)');
console.log('  Training Other: 1.5x (always active)');
console.log('  Appearance Rate: 120x (0.30-0.60 range, multiplies all benefits)');
console.log('  Type Preference: 50x (synergy bonus)');
console.log('  Initial Friendship: 0.3x (early game advantage)');
console.log('  Special Effects: Varies by game impact');
console.log('');
console.log('+' + '-'.repeat(15) + '+' + '-'.repeat(12) + '+' + '-'.repeat(10) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+');
console.log('| Name          | Rarity     | Type     | LB0   | LB1   | LB2   | LB3   | LB4   |');
console.log('+' + '-'.repeat(15) + '+' + '-'.repeat(12) + '+' + '-'.repeat(10) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+');

for (const r of results) {
  const name = r.name.padEnd(13).slice(0, 13);
  const rarity = r.rarity.padEnd(10);
  const type = (r.supportType || '').padEnd(8).slice(0, 8);
  const lb0 = String(r.LB0 || '-').padStart(5);
  const lb1 = String(r.LB1 || '-').padStart(5);
  const lb2 = String(r.LB2 || '-').padStart(5);
  const lb3 = String(r.LB3 || '-').padStart(5);
  const lb4 = String(r.LB4 || '-').padStart(5);
  console.log('| ' + name + ' | ' + rarity + ' | ' + type + ' | ' + lb0 + ' | ' + lb1 + ' | ' + lb2 + ' | ' + lb3 + ' | ' + lb4 + ' |');
}
console.log('+' + '-'.repeat(15) + '+' + '-'.repeat(12) + '+' + '-'.repeat(10) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+');

// Calculate averages per rarity
console.log('');
console.log('TIER AVERAGES:');
console.log('+' + '-'.repeat(12) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(8) + '+');
console.log('| Rarity     | LB0   | LB1   | LB2   | LB3   | LB4   | Count  |');
console.log('+' + '-'.repeat(12) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(8) + '+');

const tierStats = {};
for (const rarity of ['Legendary', 'Rare', 'Uncommon', 'Common']) {
  const cards = results.filter(r => r.rarity === rarity);
  const avgs = {};
  const mins = {};
  const maxs = {};
  for (let lb = 0; lb <= 4; lb++) {
    const key = 'LB' + lb;
    const vals = cards.map(c => c[key]).filter(v => v);
    avgs[key] = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
    mins[key] = vals.length ? Math.min(...vals) : 0;
    maxs[key] = vals.length ? Math.max(...vals) : 0;
  }
  tierStats[rarity] = { avgs, mins, maxs, count: cards.length };

  const r = rarity.padEnd(10);
  console.log('| ' + r + ' | ' + String(avgs.LB0).padStart(5) + ' | ' + String(avgs.LB1).padStart(5) + ' | ' + String(avgs.LB2).padStart(5) + ' | ' + String(avgs.LB3).padStart(5) + ' | ' + String(avgs.LB4).padStart(5) + ' | ' + String(cards.length).padStart(6) + ' |');
}
console.log('+' + '-'.repeat(12) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(7) + '+' + '-'.repeat(8) + '+');

// Cross-tier balance check
console.log('');
console.log('CROSS-TIER BALANCE CHECK:');
console.log('-'.repeat(70));
const legAvg0 = tierStats.Legendary.avgs.LB0;
const legAvg2 = tierStats.Legendary.avgs.LB2;
const legAvg4 = tierStats.Legendary.avgs.LB4;
const rareAvg4 = tierStats.Rare.avgs.LB4;
const uncAvg4 = tierStats.Uncommon.avgs.LB4;
const comAvg4 = tierStats.Common.avgs.LB4;

console.log('Power Hierarchy (averages):');
console.log('  Legendary LB4: ' + legAvg4);
console.log('  Legendary LB2: ' + legAvg2);
console.log('  Legendary LB0: ' + legAvg0);
console.log('  Rare LB4:      ' + rareAvg4);
console.log('  Uncommon LB4:  ' + uncAvg4);
console.log('  Common LB4:    ' + comAvg4);
console.log('');
console.log('Balance Targets:');
console.log('  LB4 Uncommon (' + uncAvg4 + ') > LB0 Legendary (' + legAvg0 + '): ' + (uncAvg4 > legAvg0 ? 'PASS' : 'FAIL (' + (legAvg0 - uncAvg4) + ' gap)'));
console.log('  LB4 Rare (' + rareAvg4 + ') > LB2 Legendary (' + legAvg2 + '): ' + (rareAvg4 > legAvg2 ? 'PASS' : 'FAIL (' + (legAvg2 - rareAvg4) + ' gap)'));

// Within-tier variance analysis
console.log('');
console.log('WITHIN-TIER VARIANCE (LB4):');
console.log('-'.repeat(70));

for (const rarity of ['Legendary', 'Rare', 'Uncommon', 'Common']) {
  const cards = results.filter(r => r.rarity === rarity);
  const avg = tierStats[rarity].avgs.LB4;
  const min = tierStats[rarity].mins.LB4;
  const max = tierStats[rarity].maxs.LB4;

  console.log('');
  console.log(rarity.toUpperCase() + ' (Avg: ' + avg + ', Range: ' + min + '-' + max + '):');

  // Find outliers (>15% from average)
  const lowThreshold = avg * 0.85;
  const highThreshold = avg * 1.15;

  const weak = cards.filter(c => c.LB4 < lowThreshold).sort((a, b) => a.LB4 - b.LB4);
  const strong = cards.filter(c => c.LB4 > highThreshold).sort((a, b) => b.LB4 - a.LB4);

  if (weak.length > 0) {
    console.log('  WEAK (<' + Math.round(lowThreshold) + '): ' + weak.map(c => c.name + '(' + c.LB4 + ')').join(', '));
  }
  if (strong.length > 0) {
    console.log('  STRONG (>' + Math.round(highThreshold) + '): ' + strong.map(c => c.name + '(' + c.LB4 + ')').join(', '));
  }
  if (weak.length === 0 && strong.length === 0) {
    console.log('  All cards within ±15% of average');
  }
}

// Detailed breakdown for outliers
console.log('');
console.log('='.repeat(100));
console.log('DETAILED BREAKDOWN - OUTLIER CARDS');
console.log('='.repeat(100));

function printBreakdown(card) {
  const lb4Card = getSupportAtLimitBreak(card.name, 4);
  const result = calcPowerScore(lb4Card, true);

  console.log('');
  console.log(card.name + ' (' + card.rarity + ') - Total: ' + result.total);
  console.log('  Base Stats: ' + result.components.baseStats + ' (total: ' + Object.values(lb4Card.baseStats).reduce((a,b)=>a+b,0) + ')');
  console.log('  Training Type Match: ' + result.components.trainingTypeMatch + ' (value: ' + lb4Card.trainingBonus.typeMatch + ')');
  console.log('  Training Other: ' + result.components.trainingOther + ' (value: ' + lb4Card.trainingBonus.otherStats + ')');
  console.log('  Training Max Friend: ' + result.components.trainingMaxFriend + ' (value: ' + lb4Card.trainingBonus.maxFriendshipTypeMatch + ')');
  console.log('  Appearance Rate: ' + result.components.appearanceRate + ' (value: ' + lb4Card.appearanceRate + ')');
  console.log('  Type Match Pref: ' + result.components.typeMatchPref + ' (value: ' + lb4Card.typeMatchPreference + ')');
  console.log('  Initial Friendship: ' + result.components.initialFriendship + ' (value: ' + lb4Card.initialFriendship + ')');

  if (Object.keys(result.components.specialEffects).length > 0) {
    console.log('  Special Effects:');
    for (const [effect, score] of Object.entries(result.components.specialEffects)) {
      console.log('    - ' + effect + ': ' + score + ' (value: ' + lb4Card.specialEffect[effect] + ')');
    }
  } else {
    console.log('  Special Effects: none');
  }
}

// Show top 3 and bottom 3 per tier
for (const rarity of ['Legendary', 'Rare', 'Uncommon', 'Common']) {
  const cards = results.filter(r => r.rarity === rarity).sort((a, b) => b.LB4 - a.LB4);

  console.log('');
  console.log('-'.repeat(50));
  console.log(rarity.toUpperCase() + ' - Top 3:');
  cards.slice(0, 3).forEach(printBreakdown);

  console.log('');
  console.log(rarity.toUpperCase() + ' - Bottom 3:');
  cards.slice(-3).forEach(printBreakdown);
}

// Summary statistics
console.log('');
console.log('='.repeat(100));
console.log('SUMMARY');
console.log('='.repeat(100));
console.log('');
console.log('Total cards analyzed: ' + results.length);
console.log('');
console.log('Score component breakdown (average at LB4):');

const allLB4 = results.filter(r => r.LB4);
const avgComponents = {
  baseStats: 0,
  trainingTypeMatch: 0,
  trainingOther: 0,
  trainingMaxFriend: 0,
  appearanceRate: 0,
  typeMatchPref: 0,
  initialFriendship: 0,
  specialEffects: 0
};

for (const card of allLB4) {
  const lb4Breakdown = card.breakdowns.LB4;
  avgComponents.baseStats += lb4Breakdown.baseStats;
  avgComponents.trainingTypeMatch += lb4Breakdown.trainingTypeMatch;
  avgComponents.trainingOther += lb4Breakdown.trainingOther;
  avgComponents.trainingMaxFriend += lb4Breakdown.trainingMaxFriend;
  avgComponents.appearanceRate += lb4Breakdown.appearanceRate;
  avgComponents.typeMatchPref += lb4Breakdown.typeMatchPref;
  avgComponents.initialFriendship += lb4Breakdown.initialFriendship;
  avgComponents.specialEffects += Object.values(lb4Breakdown.specialEffects).reduce((a, b) => a + b, 0);
}

const count = allLB4.length;
console.log('  Base Stats:         ' + Math.round(avgComponents.baseStats / count) + ' avg');
console.log('  Training TypeMatch: ' + Math.round(avgComponents.trainingTypeMatch / count) + ' avg');
console.log('  Training Other:     ' + Math.round(avgComponents.trainingOther / count) + ' avg');
console.log('  Training MaxFriend: ' + Math.round(avgComponents.trainingMaxFriend / count) + ' avg');
console.log('  Appearance Rate:    ' + Math.round(avgComponents.appearanceRate / count) + ' avg');
console.log('  Type Match Pref:    ' + Math.round(avgComponents.typeMatchPref / count) + ' avg');
console.log('  Initial Friendship: ' + Math.round(avgComponents.initialFriendship / count) + ' avg');
console.log('  Special Effects:    ' + Math.round(avgComponents.specialEffects / count) + ' avg');
