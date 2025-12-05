const { SUPPORT_CARDS, SUPPORT_LIMIT_BREAK_PROGRESSIONS, getSupportAtLimitBreak } = require('../shared/gamedata/supports.js');

// More balanced weight factors - special effects reduced to avoid overweighting
const WEIGHTS = {
  baseStatTotal: 1.0,           // Total base stats
  trainingTypeMatch: 1.5,       // Type match training
  trainingOther: 1.0,           // Other stats training
  trainingMaxFriend: 0.5,       // Max friendship bonus
  initialFriendship: 0.5,       // Starting friendship
  appearanceRate: 50,           // How often they appear (x100)
  typeMatchPreference: 30,      // Type preference (x100)
  // Special effects (reduced to avoid overweighting)
  statGainMultiplier: 80,       // Per 1% above 1.0 (e.g., 1.25 = 20 points)
  skillPointMultiplier: 50,     // Per 1% above 1.0
  failRateReduction: 80,        // Per 1% (e.g., 0.15 = 12 points)
  friendshipGainBonus: 1.5,     // Per point
  maxEnergyBonus: 1,            // Per point
  restBonus: 1.5,               // Per point
  energyRegenBonus: 2,          // Per point
  energyCostReduction: 2.5      // Per point
};

function calcPowerScore(card) {
  let score = 0;

  // Base stats
  const totalStats = Object.values(card.baseStats).reduce((a, b) => a + b, 0);
  score += totalStats * WEIGHTS.baseStatTotal;

  // Training bonus
  score += card.trainingBonus.typeMatch * WEIGHTS.trainingTypeMatch;
  score += card.trainingBonus.otherStats * WEIGHTS.trainingOther;
  score += card.trainingBonus.maxFriendshipTypeMatch * WEIGHTS.trainingMaxFriend;

  // Friendship and appearance
  score += card.initialFriendship * WEIGHTS.initialFriendship;
  score += card.appearanceRate * WEIGHTS.appearanceRate;
  score += card.typeMatchPreference * WEIGHTS.typeMatchPreference;

  // Special effects
  if (card.specialEffect) {
    for (const [effect, value] of Object.entries(card.specialEffect)) {
      if (effect === 'statGainMultiplier') {
        score += (value - 1) * WEIGHTS.statGainMultiplier;
      } else if (effect === 'skillPointMultiplier') {
        score += (value - 1) * WEIGHTS.skillPointMultiplier;
      } else if (effect === 'failRateReduction') {
        score += value * WEIGHTS.failRateReduction;
      } else if (effect === 'friendshipGainBonus') {
        score += value * WEIGHTS.friendshipGainBonus;
      } else if (effect === 'maxEnergyBonus') {
        score += value * WEIGHTS.maxEnergyBonus;
      } else if (effect === 'restBonus') {
        score += value * WEIGHTS.restBonus;
      } else if (effect === 'energyRegenBonus') {
        score += value * WEIGHTS.energyRegenBonus;
      } else if (effect === 'energyCostReduction') {
        score += value * WEIGHTS.energyCostReduction;
      }
    }
  }

  return Math.round(score);
}

// Calculate scores for all cards at different LB levels
const results = [];
for (const [name, card] of Object.entries(SUPPORT_CARDS)) {
  const scores = {};

  for (let lb = 0; lb <= 4; lb++) {
    const lbCard = getSupportAtLimitBreak(name, lb);
    if (lbCard) {
      scores['LB' + lb] = calcPowerScore(lbCard);
    }
  }

  results.push({
    name,
    rarity: card.rarity,
    ...scores
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

// Print table
console.log('='.repeat(90));
console.log('SUPPORT CARD POWER ANALYSIS (Balanced Weights)');
console.log('='.repeat(90));
console.log('');
console.log('+---------------+------------+------+------+------+------+------+');
console.log('| Name          | Rarity     | LB0  | LB1  | LB2  | LB3  | LB4  |');
console.log('+---------------+------------+------+------+------+------+------+');

for (const r of results) {
  const name = r.name.padEnd(13).slice(0, 13);
  const rarity = r.rarity.padEnd(10);
  const lb0 = String(r.LB0 || '-').padStart(4);
  const lb1 = String(r.LB1 || '-').padStart(4);
  const lb2 = String(r.LB2 || '-').padStart(4);
  const lb3 = String(r.LB3 || '-').padStart(4);
  const lb4 = String(r.LB4 || '-').padStart(4);
  console.log('| ' + name + ' | ' + rarity + ' | ' + lb0 + ' | ' + lb1 + ' | ' + lb2 + ' | ' + lb3 + ' | ' + lb4 + ' |');
}
console.log('+---------------+------------+------+------+------+------+------+');

// Calculate averages per rarity at each LB
console.log('');
console.log('AVERAGES BY RARITY:');
console.log('+------------+------+------+------+------+------+');
console.log('| Rarity     | LB0  | LB1  | LB2  | LB3  | LB4  |');
console.log('+------------+------+------+------+------+------+');

for (const rarity of ['Legendary', 'Rare', 'Uncommon', 'Common']) {
  const cards = results.filter(r => r.rarity === rarity);
  const avgs = {};
  for (let lb = 0; lb <= 4; lb++) {
    const key = 'LB' + lb;
    const vals = cards.map(c => c[key]).filter(v => v);
    avgs[key] = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : '-';
  }
  const r = rarity.padEnd(10);
  console.log('| ' + r + ' | ' + String(avgs.LB0).padStart(4) + ' | ' + String(avgs.LB1).padStart(4) + ' | ' + String(avgs.LB2).padStart(4) + ' | ' + String(avgs.LB3).padStart(4) + ' | ' + String(avgs.LB4).padStart(4) + ' |');
}
console.log('+------------+------+------+------+------+------+');

// Key comparisons
const legendaryCards = results.filter(r => r.rarity === 'Legendary');
const rareCards = results.filter(r => r.rarity === 'Rare');
const uncommonCards = results.filter(r => r.rarity === 'Uncommon');
const commonCards = results.filter(r => r.rarity === 'Common');

const avgLeg0 = Math.round(legendaryCards.reduce((a, c) => a + (c.LB0 || 0), 0) / legendaryCards.length);
const avgLeg2 = Math.round(legendaryCards.reduce((a, c) => a + (c.LB2 || 0), 0) / legendaryCards.length);
const avgLeg4 = Math.round(legendaryCards.reduce((a, c) => a + (c.LB4 || 0), 0) / legendaryCards.length);
const avgRare4 = Math.round(rareCards.reduce((a, c) => a + (c.LB4 || 0), 0) / rareCards.length);
const avgUnc4 = Math.round(uncommonCards.reduce((a, c) => a + (c.LB4 || 0), 0) / uncommonCards.length);
const avgCom4 = Math.round(commonCards.reduce((a, c) => a + (c.LB4 || 0), 0) / commonCards.length);

console.log('');
console.log('KEY BALANCE COMPARISONS:');
console.log('-'.repeat(60));
console.log('Current Power Hierarchy:');
console.log('  Legendary LB4: ' + avgLeg4);
console.log('  Legendary LB2: ' + avgLeg2);
console.log('  Legendary LB0: ' + avgLeg0);
console.log('  Rare LB4:      ' + avgRare4);
console.log('  Uncommon LB4:  ' + avgUnc4);
console.log('  Common LB4:    ' + avgCom4);
console.log('');
console.log('BALANCE TARGETS:');
console.log('  LB4 Uncommon (' + avgUnc4 + ') > LB0 Legendary (' + avgLeg0 + '): ' + (avgUnc4 > avgLeg0 ? 'PASS' : 'FAIL (' + (avgLeg0 - avgUnc4) + ' gap)'));
console.log('  LB4 Rare (' + avgRare4 + ') > LB2 Legendary (' + avgLeg2 + '): ' + (avgRare4 > avgLeg2 ? 'PASS' : 'FAIL (' + (avgLeg2 - avgRare4) + ' gap)'));

// Check for LB progression mismatches
console.log('');
console.log('LB PROGRESSION MISMATCHES (base card vs LB4 values):');
console.log('-'.repeat(60));
let mismatches = [];
for (const [name, card] of Object.entries(SUPPORT_CARDS)) {
  const prog = SUPPORT_LIMIT_BREAK_PROGRESSIONS[name];
  if (!prog) continue;
  const lb4 = prog.progression[4];
  if (!lb4) continue;

  const issues = [];
  if (Math.abs(card.appearanceRate - lb4.appearanceRate) > 0.01) {
    issues.push(`appearanceRate: base=${card.appearanceRate} vs LB4=${lb4.appearanceRate}`);
  }
  if (Math.abs(card.typeMatchPreference - lb4.typeMatchPreference) > 0.01) {
    issues.push(`typeMatchPreference: base=${card.typeMatchPreference} vs LB4=${lb4.typeMatchPreference}`);
  }
  if (Math.abs(card.initialFriendship - lb4.initialFriendship) > 1) {
    issues.push(`initialFriendship: base=${card.initialFriendship} vs LB4=${lb4.initialFriendship}`);
  }

  if (issues.length > 0) {
    mismatches.push({ name, issues });
  }
}

if (mismatches.length === 0) {
  console.log('No mismatches found!');
} else {
  for (const m of mismatches) {
    console.log(m.name + ':');
    for (const issue of m.issues) {
      console.log('  - ' + issue);
    }
  }
}
