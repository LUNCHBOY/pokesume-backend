/**
 * SUPPORT CARDS
 * Support card definitions, gacha pools, and limit break progressions
 */

const SUPPORT_CARDS = {
  // ============================================================================
  // LEGENDARY TIER (Power Budget: ~95-105)
  // High variance with different specializations
  // Cards with statGainMultiplier have reduced base stats (~60-70% of normal)
  // ============================================================================
  Cynthia: {
    name: 'Cynthia',
    trainer: 'Cynthia',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 22, Defense: 0, Instinct: 50, Speed: 11 },
    trainingBonus: { typeMatch: 15, otherStats: 2, maxFriendshipTypeMatch: 37 },
    initialFriendship: 10,
    appearanceRate: 0.38,
    typeMatchPreference: 0.05,
    specialEffect: { statGainMultiplier: 1.25 },
    moveHints: ['Earthquake', 'DragonClaw', 'Outrage', 'StoneEdge', 'SwordsDance'],
    description: 'The Sinnoh Champion grants overwhelming growth potential'
  },
  Red: {
    name: 'Red',
    trainer: 'Red',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 65, Defense: 0, Instinct: 10, Speed: 13 },
    trainingBonus: { typeMatch: 13, otherStats: 1, maxFriendshipTypeMatch: 36 },
    initialFriendship: 0,
    appearanceRate: 0.28,
    typeMatchPreference: 0.55,
    specialEffect: null,
    moveHints: ['FlareBlitz', 'DragonDance', 'AirSlash', 'HeatWave', 'BlastBurn'],
    description: 'The legendary trainer pushes limits to the extreme'
  },
  Steven: {
    name: 'Steven',
    trainer: 'Steven',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 30, Attack: 0, Defense: 60, Instinct: 10, Speed: 0 },
    trainingBonus: { typeMatch: 7, otherStats: 4, maxFriendshipTypeMatch: 20 },
    initialFriendship: 40,
    appearanceRate: 0.52,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.15 },
    moveHints: ['MeteorMash', 'ZenHeadbutt', 'BulletPunch', 'IronDefense', 'Earthquake'],
    description: 'The Hoenn Champion fortifies iron defenses'
  },
  N: {
    name: 'N',
    trainer: 'N',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 15, Defense: 0, Instinct: 65, Speed: 15 },
    trainingBonus: { typeMatch: 6, otherStats: 4, maxFriendshipTypeMatch: 17 },
    initialFriendship: 60,
    appearanceRate: 0.45,
    typeMatchPreference: 0.50,
    specialEffect: { friendshipGainBonus: 8 },
    moveHints: ['BlueFlare', 'FusionFlare', 'DragonPulse', 'DracoMeteor', 'Psychic'],
    description: 'The King of Team Plasma bonds through truth'
  },
  ProfessorOak: {
    name: 'Professor Oak',
    trainer: 'Professor Oak',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 20, Attack: 15, Defense: 15, Instinct: 35, Speed: 15 },
    trainingBonus: { typeMatch: 6, otherStats: 5, maxFriendshipTypeMatch: 17 },
    initialFriendship: 55,
    appearanceRate: 0.58,
    typeMatchPreference: 0.10,
    specialEffect: { skillPointMultiplier: 1.5, friendshipGainBonus: 7 },
    moveHints: ['Psychic', 'AuraSphere', 'Transform', 'Metronome', 'AncientPower'],
    description: 'The Professor grants knowledge and wisdom'
  },
  Diantha: {
    name: 'Diantha',
    trainer: 'Diantha',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 15, Attack: 0, Defense: 20, Instinct: 47, Speed: 5 },
    trainingBonus: { typeMatch: 9, otherStats: 3, maxFriendshipTypeMatch: 23 },
    initialFriendship: 25,
    appearanceRate: 0.42,
    typeMatchPreference: 0.15,
    specialEffect: { statGainMultiplier: 1.2, failRateReduction: 0.10 },
    moveHints: ['DiamondStorm', 'Moonblast', 'DazzlingGleam', 'RockPolish', 'Reflect'],
    description: 'The Kalos Champion radiates brilliance and growth'
  },
  Leon: {
    name: 'Leon',
    trainer: 'Leon',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 60, Defense: 0, Instinct: 10, Speed: 20 },
    trainingBonus: { typeMatch: 12, otherStats: 2, maxFriendshipTypeMatch: 31 },
    initialFriendship: 15,
    appearanceRate: 0.40,
    typeMatchPreference: 0.10,
    specialEffect: { failRateReduction: 0.10 },
    moveHints: ['GMaxWildfire', 'FlareBlitz', 'AirSlash', 'DragonPulse', 'AncientPower'],
    description: 'The undefeated Galar Champion unleashes fiery power'
  },
  Selene: {
    name: 'Selene',
    trainer: 'Selene',
    rarity: 'Legendary',
    supportType: 'Instinct',
    baseStats: { HP: 15, Attack: 0, Defense: 10, Instinct: 60, Speed: 15 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 21 },
    initialFriendship: 30,
    appearanceRate: 0.45,
    typeMatchPreference: 0.20,
    specialEffect: { friendshipGainBonus: 7, skillPointMultiplier: 1.3 },
    moveHints: ['MoongeistBeam', 'Psychic', 'ShadowBall', 'Moonblast', 'Roost'],
    description: 'The Alola Champion channels moonlight power'
  },
  Gloria: {
    name: 'Gloria',
    trainer: 'Gloria',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 65, Defense: 10, Instinct: 5, Speed: 18 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 23 },
    initialFriendship: 25,
    appearanceRate: 0.42,
    typeMatchPreference: 0.15,
    specialEffect: { failRateReduction: 0.12 },
    moveHints: ['BehemothBlade', 'PlayRough', 'CloseCombat', 'SwordsDance', 'SacredSword'],
    description: 'The Galar Champion wields the legendary blade'
  },
  Nemona: {
    name: 'Nemona',
    trainer: 'Nemona',
    rarity: 'Legendary',
    supportType: 'Speed',
    baseStats: { HP: 10, Attack: 25, Defense: 0, Instinct: 10, Speed: 55 },
    trainingBonus: { typeMatch: 7, otherStats: 4, maxFriendshipTypeMatch: 20 },
    initialFriendship: 60,
    appearanceRate: 0.55,
    typeMatchPreference: 0.10,
    specialEffect: { friendshipGainBonus: 10, energyRegenBonus: 8 },
    moveHints: ['CollisionCourse', 'Outrage', 'FlareBlitz', 'DrainPunch', 'DragonDance'],
    description: 'The battle-loving Champion befriends with enthusiasm'
  },
  Mustard: {
    name: 'Mustard',
    trainer: 'Mustard',
    rarity: 'Legendary',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 62, Defense: 10, Instinct: 5, Speed: 10 },
    trainingBonus: { typeMatch: 10, otherStats: 1, maxFriendshipTypeMatch: 28 },
    initialFriendship: 5,
    appearanceRate: 0.30,
    typeMatchPreference: 0.45,
    specialEffect: { failRateReduction: 0.12 },
    moveHints: ['WickedBlow', 'SurgingStrikes', 'CloseCombat', 'Uturn', 'PoisonJab'],
    description: 'The former Champion masters martial arts'
  },
  Victor: {
    name: 'Victor',
    trainer: 'Victor',
    rarity: 'Rare',
    supportType: 'Instinct',
    baseStats: { HP: 10, Attack: 8, Defense: 0, Instinct: 42, Speed: 10 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 20 },
    initialFriendship: 30,
    appearanceRate: 0.42,
    typeMatchPreference: 0.25,
    specialEffect: { maxEnergyBonus: 10 },
    moveHints: ['DynamaxCannon', 'CrossPoison', 'DragonPulse', 'Flamethrower', 'Recover'],
    description: 'The Galar Champion harnesses infinite potential'
  },
  Arven: {
    name: 'Arven',
    trainer: 'Arven',
    rarity: 'Legendary',
    supportType: 'HP',
    baseStats: { HP: 55, Attack: 20, Defense: 15, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 6, otherStats: 4, maxFriendshipTypeMatch: 17 },
    initialFriendship: 50,
    appearanceRate: 0.55,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 18, restBonus: 8 },
    moveHints: ['Crunch', 'PlayRough', 'Reversal', 'Psychicfangs', 'Rest'],
    description: 'The culinary expert nurtures with care'
  },
  Penny: {
    name: 'Penny',
    trainer: 'Penny',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 22, Attack: 10, Defense: 18, Instinct: 25, Speed: 18 },
    trainingBonus: { typeMatch: 7, otherStats: 3, maxFriendshipTypeMatch: 20 },
    initialFriendship: 20,
    appearanceRate: 0.38,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.15, friendshipGainBonus: 6 },
    moveHints: ['Moonblast', 'MistyTerrain', 'LightScreen', 'Wish', 'HyperVoice'],
    description: 'The Team Star boss protects her friends'
  },
  Sonia: {
    name: 'Sonia',
    trainer: 'Sonia',
    rarity: 'Rare',
    supportType: 'Instinct',
    baseStats: { HP: 10, Attack: 5, Defense: 5, Instinct: 45, Speed: 10 },
    trainingBonus: { typeMatch: 7, otherStats: 3, maxFriendshipTypeMatch: 18 },
    initialFriendship: 50,
    appearanceRate: 0.52,
    typeMatchPreference: 0.10,
    specialEffect: { skillPointMultiplier: 1.4, friendshipGainBonus: 5 },
    moveHints: ['Spark', 'Nuzzle', 'PlayRough', 'WildCharge', 'Charm'],
    description: 'The new Professor researches with curiosity'
  },
  Hop: {
    name: 'Hop',
    trainer: 'Hop',
    rarity: 'Legendary',
    supportType: 'HP',
    baseStats: { HP: 60, Attack: 10, Defense: 20, Instinct: 5, Speed: 10 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 21 },
    initialFriendship: 55,
    appearanceRate: 0.52,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 15, friendshipGainBonus: 7 },
    moveHints: ['BehemothBash', 'CloseCombat', 'IronDefense', 'Crunch', 'WildCharge'],
    description: 'The aspiring researcher supports with heart'
  },
  Geeta: {
    name: 'Geeta',
    trainer: 'Geeta',
    rarity: 'Uncommon',
    supportType: 'Instinct',
    baseStats: { HP: 5, Attack: 8, Defense: 5, Instinct: 30, Speed: 0 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 18 },
    initialFriendship: 15,
    appearanceRate: 0.40,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['KowtowCleave', 'SuckerPunch', 'IronHead', 'SwordsDance', 'LowKick'],
    description: 'The Paldea Champion leads with strategic growth'
  },
  Kieran: {
    name: 'Kieran',
    trainer: 'Kieran',
    rarity: 'Uncommon',
    supportType: 'Instinct',
    baseStats: { HP: 12, Attack: 0, Defense: 8, Instinct: 28, Speed: 4 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 16 },
    initialFriendship: 20,
    appearanceRate: 0.42,
    typeMatchPreference: 0.25,
    specialEffect: { maxEnergyBonus: 8 },
    moveHints: ['TeraStarstorm', 'EarthPower', 'DarkPulse', 'Psychic', 'Recover'],
    description: 'The Blueberry Champion commands crystalline potential'
  },
  Carmine: {
    name: 'Carmine',
    trainer: 'Carmine',
    rarity: 'Legendary',
    supportType: 'Speed',
    baseStats: { HP: 10, Attack: 25, Defense: 5, Instinct: 5, Speed: 55 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 21 },
    initialFriendship: 20,
    appearanceRate: 0.42,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.10, energyRegenBonus: 6 },
    moveHints: ['IvyCudgel', 'HornLeech', 'PlayRough', 'Uturn', 'SwordsDance'],
    description: 'The Kitakami native dances with masks'
  },
  Drayton: {
    name: 'Drayton',
    trainer: 'Drayton',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 20, Attack: 15, Defense: 55, Instinct: 10, Speed: 0 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 21 },
    initialFriendship: 40,
    appearanceRate: 0.48,
    typeMatchPreference: 0.15,
    specialEffect: { failRateReduction: 0.15 },
    moveHints: ['ElectroDrift', 'FlashCannon', 'DracoMeteor', 'BodyPress', 'IronDefense'],
    description: 'The Dragon Elite bridges power and defense'
  },
  Lacey: {
    name: 'Lacey',
    trainer: 'Lacey',
    rarity: 'Legendary',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 25, Defense: 5, Instinct: 10, Speed: 55 },
    trainingBonus: { typeMatch: 8, otherStats: 3, maxFriendshipTypeMatch: 23 },
    initialFriendship: 35,
    appearanceRate: 0.45,
    typeMatchPreference: 0.20,
    specialEffect: { energyRegenBonus: 7 },
    moveHints: ['Earthquake', 'IronHead', 'RockSlide', 'SwordsDance', 'RapidSpin'],
    description: 'The Blueberry Elite drills with blazing speed'
  },

  // ============================================================================
  // RARE TIER (Power Budget: ~76-84, ~80% of Legendary)
  // Good variance with clear specializations
  // Cards with statGainMultiplier have reduced base stats (~60-70% of normal)
  // ============================================================================
  Lance: {
    name: 'Lance',
    trainer: 'Lance',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 45, Defense: 0, Instinct: 10, Speed: 12 },
    trainingBonus: { typeMatch: 9, otherStats: 2, maxFriendshipTypeMatch: 25 },
    initialFriendship: 15,
    appearanceRate: 0.35,
    typeMatchPreference: 0.10,
    specialEffect: null,
    moveHints: ['DragonDance', 'Outrage', 'ExtremeSpeed', 'DragonRush', 'FirePunch'],
    description: 'The Dragon Master enhances draconic power'
  },
  Sabrina: {
    name: 'Sabrina',
    trainer: 'Sabrina',
    rarity: 'Rare',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 0, Defense: 0, Instinct: 50, Speed: 15 },
    trainingBonus: { typeMatch: 11, otherStats: 2, maxFriendshipTypeMatch: 27 },
    initialFriendship: 10,
    appearanceRate: 0.32,
    typeMatchPreference: 0.15,
    specialEffect: null,
    moveHints: ['Psychic', 'FutureSight', 'FocusBlast', 'CalmMind', 'ShadowBall'],
    description: 'The Saffron Gym Leader sharpens the mind'
  },
  Morty: {
    name: 'Morty',
    trainer: 'Morty',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 10, Defense: 0, Instinct: 15, Speed: 45 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 17 },
    initialFriendship: 35,
    appearanceRate: 0.55,
    typeMatchPreference: 0.50,
    specialEffect: { friendshipGainBonus: 6 },
    moveHints: ['ShadowBall', 'SludgeBomb', 'Hypnosis', 'DreamEater', 'Hex'],
    description: 'The Ecruteak Gym Leader channels ghostly power'
  },
  Wallace: {
    name: 'Wallace',
    trainer: 'Wallace',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 50, Attack: 0, Defense: 15, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 18 },
    initialFriendship: 45,
    appearanceRate: 0.48,
    typeMatchPreference: 0.30,
    specialEffect: { maxEnergyBonus: 12, restBonus: 5 },
    moveHints: ['Surf', 'IceBeam', 'Recover', 'DragonTail', 'AquaRing'],
    description: 'The Hoenn Champion exudes elegance'
  },
  Iris: {
    name: 'Iris',
    trainer: 'Iris',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 58, Defense: 0, Instinct: 7, Speed: 20 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 17 },
    initialFriendship: 50,
    appearanceRate: 0.60,
    typeMatchPreference: 0.20,
    specialEffect: null,
    moveHints: ['DragonDance', 'Outrage', 'Earthquake', 'DragonClaw', 'SwordsDance'],
    description: 'The Unova Champion commands dragons'
  },
  Blue: {
    name: 'Blue',
    trainer: 'Blue',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 18, Attack: 18, Defense: 18, Instinct: 15, Speed: 7 },
    trainingBonus: { typeMatch: 5, otherStats: 4, maxFriendshipTypeMatch: 12 },
    initialFriendship: 25,
    appearanceRate: 0.50,
    typeMatchPreference: 0.05,
    specialEffect: { energyRegenBonus: 5 },
    moveHints: ['Hurricane', 'BraveBird', 'AirSlash', 'Roost', 'UTurn'],
    description: 'The rival trainer pushes limits'
  },
  Giovanni: {
    name: 'Giovanni',
    trainer: 'Giovanni',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 10, Defense: 0, Instinct: 8, Speed: 35 },
    trainingBonus: { typeMatch: 8, otherStats: 1, maxFriendshipTypeMatch: 22 },
    initialFriendship: 0,
    appearanceRate: 0.30,
    typeMatchPreference: 0.55,
    specialEffect: { energyRegenBonus: 4 },
    moveHints: ['Slash', 'Swift', 'Bite', 'NastyPlot', 'Headbutt'],
    description: 'The Rocket Boss commands ruthless speed'
  },
  Maxie: {
    name: 'Maxie',
    trainer: 'Maxie',
    rarity: 'Rare',
    supportType: 'Defense',
    baseStats: { HP: 0, Attack: 54, Defense: 0, Instinct: 12, Speed: 10 },
    trainingBonus: { typeMatch: 7, otherStats: 3, maxFriendshipTypeMatch: 18 },
    initialFriendship: 20,
    appearanceRate: 0.42,
    typeMatchPreference: 0.10,
    specialEffect: null,
    moveHints: ['Earthquake', 'PrecipiceBlades', 'FirePunch', 'BulkUp', 'LavaPlume'],
    description: 'The Magma Leader harnesses earth power'
  },
  Archie: {
    name: 'Archie',
    trainer: 'Archie',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 55, Attack: 0, Defense: 10, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 40,
    appearanceRate: 0.45,
    typeMatchPreference: 0.25,
    specialEffect: { maxEnergyBonus: 10 },
    moveHints: ['OriginPulse', 'HydroPump', 'IceBeam', 'Thunder', 'AquaRing'],
    description: 'The Aqua Leader commands the seas'
  },
  Raihan: {
    name: 'Raihan',
    trainer: 'Raihan',
    rarity: 'Rare',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 15, Defense: 40, Instinct: 5, Speed: 5 },
    trainingBonus: { typeMatch: 7, otherStats: 3, maxFriendshipTypeMatch: 19 },
    initialFriendship: 30,
    appearanceRate: 0.45,
    typeMatchPreference: 0.15,
    specialEffect: { failRateReduction: 0.08 },
    moveHints: ['SteelBeam', 'DracoMeteor', 'FlashCannon', 'Thunderbolt', 'BodyPress'],
    description: 'The Hammerlocke Gym Leader storms with steel defense'
  },
  Marnie: {
    name: 'Marnie',
    trainer: 'Marnie',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 0, Defense: 0, Instinct: 58, Speed: 18 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 25,
    appearanceRate: 0.42,
    typeMatchPreference: 0.25,
    specialEffect: { friendshipGainBonus: 6 },
    moveHints: ['SpiritBreak', 'DarkPulse', 'ThunderWave', 'Taunt', 'BulkUp'],
    description: 'The Spikemuth Gym Leader inspires fierce loyalty'
  },
  Nessa: {
    name: 'Nessa',
    trainer: 'Nessa',
    rarity: 'Rare',
    supportType: 'HP',
    baseStats: { HP: 45, Attack: 15, Defense: 10, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 35,
    appearanceRate: 0.48,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 10 },
    moveHints: ['Liquidation', 'RockTomb', 'JawLock', 'ShellSmash', 'HeadSmash'],
    description: 'The Hulbury Gym Leader builds endurance'
  },
  Bea: {
    name: 'Bea',
    trainer: 'Bea',
    rarity: 'Rare',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 45, Defense: 0, Instinct: 0, Speed: 24 },
    trainingBonus: { typeMatch: 8, otherStats: 1, maxFriendshipTypeMatch: 29 },
    initialFriendship: 10,
    appearanceRate: 0.35,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['CloseCombat', 'CrossChop', 'BulkUp', 'KnockOff', 'IcePunch'],
    description: 'The Stow-on-Side Gym Leader trains relentlessly'
  },
  Opal: {
    name: 'Opal',
    trainer: 'Opal',
    rarity: 'Legendary',
    supportType: 'HP',
    baseStats: { HP: 60, Attack: 0, Defense: 20, Instinct: 20, Speed: 0 },
    trainingBonus: { typeMatch: 8, otherStats: 4, maxFriendshipTypeMatch: 22 },
    initialFriendship: 40,
    appearanceRate: 0.48,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 18, restBonus: 8, statGainMultiplier: 1.12 },
    moveHints: ['DrainingKiss', 'DazzlingGleam', 'Recover', 'CalmMind', 'Encore'],
    description: 'The Ballonlea Gym Leader sweetens training'
  },
  Piers: {
    name: 'Piers',
    trainer: 'Piers',
    rarity: 'Rare',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 20, Defense: 0, Instinct: 5, Speed: 45 },
    trainingBonus: { typeMatch: 5, otherStats: 3, maxFriendshipTypeMatch: 14 },
    initialFriendship: 20,
    appearanceRate: 0.40,
    typeMatchPreference: 0.35,
    specialEffect: { energyRegenBonus: 5 },
    moveHints: ['Overdrive', 'SludgeWave', 'BoomBurst', 'ShiftGear', 'Discharge'],
    description: 'The punk rock Gym Leader amplifies tempo'
  },
  Rika: {
    name: 'Rika',
    trainer: 'Rika',
    rarity: 'Legendary',
    supportType: 'HP',
    baseStats: { HP: 65, Attack: 15, Defense: 15, Instinct: 8, Speed: 0 },
    trainingBonus: { typeMatch: 7, otherStats: 4, maxFriendshipTypeMatch: 20 },
    initialFriendship: 35,
    appearanceRate: 0.45,
    typeMatchPreference: 0.30,
    specialEffect: { maxEnergyBonus: 20, failRateReduction: 0.10 },
    moveHints: ['Earthquake', 'IceBeam', 'Surf', 'ZenHeadbutt', 'Rest'],
    description: 'The Elite Four member interrogates the earth'
  },
  Poppy: {
    name: 'Poppy',
    trainer: 'Poppy',
    rarity: 'Rare',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 20, Defense: 35, Instinct: 5, Speed: 5 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 15 },
    initialFriendship: 55,
    appearanceRate: 0.55,
    typeMatchPreference: 0.20,
    specialEffect: { friendshipGainBonus: 7 },
    moveHints: ['GigatonHammer', 'PlayRough', 'StoneEdge', 'SwordsDance', 'ThunderWave'],
    description: 'The youngest Elite Four hammers with joy'
  },

  // ============================================================================
  // UNCOMMON TIER (Power Budget: ~60-68, ~80% of Rare)
  // Moderate variance with useful specializations
  // Cards with statGainMultiplier have reduced base stats (~60-70% of normal)
  // ============================================================================
  Misty: {
    name: 'Misty',
    trainer: 'Misty',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 30, Attack: 0, Defense: 10, Instinct: 5, Speed: 5 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 15 },
    initialFriendship: 30,
    appearanceRate: 0.48,
    typeMatchPreference: 0.25,
    specialEffect: { energyCostReduction: 2, maxEnergyBonus: 6 },
    moveHints: ['HydroPump', 'Psychic', 'RapidSpin', 'IceBeam', 'Recover'],
    description: 'The Cerulean Gym Leader improves training efficiency'
  },
  Brock: {
    name: 'Brock',
    trainer: 'Brock',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 15, Attack: 0, Defense: 38, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 6, otherStats: 3, maxFriendshipTypeMatch: 18 },
    initialFriendship: 45,
    appearanceRate: 0.55,
    typeMatchPreference: 0.05,
    specialEffect: null,
    moveHints: ['RockSlide', 'IronTail', 'StealthRock', 'Sandstorm', 'Earthquake'],
    description: 'The Pewter Gym Leader hardens defenses'
  },
  Erika: {
    name: 'Erika',
    trainer: 'Erika',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 35, Attack: 0, Defense: 10, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 15 },
    initialFriendship: 40,
    appearanceRate: 0.52,
    typeMatchPreference: 0.30,
    specialEffect: { maxEnergyBonus: 8, restBonus: 4 },
    moveHints: ['GigaDrain', 'SleepPowder', 'EnergyBall', 'SeedBomb', 'StringShot'],
    description: 'The Celadon Gym Leader nurtures vitality'
  },
  Blaine: {
    name: 'Blaine',
    trainer: 'Blaine',
    rarity: 'Uncommon',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 35, Defense: 0, Instinct: 5, Speed: 5 },
    trainingBonus: { typeMatch: 8, otherStats: 2, maxFriendshipTypeMatch: 20 },
    initialFriendship: 15,
    appearanceRate: 0.30,
    typeMatchPreference: 0.10,
    specialEffect: null,
    moveHints: ['FireBlast', 'Flamethrower', 'FlameBurst', 'Overheat', 'Smokescreen'],
    description: 'The Cinnabar Gym Leader ignites fiery passion'
  },
  Koga: {
    name: 'Koga',
    trainer: 'Koga',
    rarity: 'Uncommon',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 2, Defense: 7, Instinct: 5, Speed: 16 },
    trainingBonus: { typeMatch: 6, otherStats: 2, maxFriendshipTypeMatch: 18 },
    initialFriendship: 10,
    appearanceRate: 0.35,
    typeMatchPreference: 0.35,
    specialEffect: { failRateReduction: 0.08, energyRegenBonus: 3 },
    moveHints: ['SludgeBomb', 'Toxic', 'WillOWisp', 'Explosion', 'ShadowBall'],
    description: 'The Fuchsia Gym Leader masters ninja speed'
  },
  Jasmine: {
    name: 'Jasmine',
    trainer: 'Jasmine',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 0, Defense: 35, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 19 },
    initialFriendship: 30,
    appearanceRate: 0.40,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['IronTail', 'Earthquake', 'Screech', 'IronDefense', 'StoneEdge'],
    description: 'The Olivine Gym Leader provides iron defense'
  },
  Winona: {
    name: 'Winona',
    trainer: 'Winona',
    rarity: 'Uncommon',
    supportType: 'Speed',
    baseStats: { HP: 6, Attack: 0, Defense: 6, Instinct: 6, Speed: 37 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 35,
    appearanceRate: 0.58,
    typeMatchPreference: 0.20,
    specialEffect: { energyRegenBonus: 3 },
    moveHints: ['SteelWing', 'BraveBird', 'Spikes', 'Roost', 'AirSlash'],
    description: 'The Fortree Gym Leader soars with grace'
  },
  Karen: {
    name: 'Karen',
    trainer: 'Karen',
    rarity: 'Legendary',
    supportType: 'Defense',
    baseStats: { HP: 18, Attack: 0, Defense: 50, Instinct: 18, Speed: 0 },
    trainingBonus: { typeMatch: 12, otherStats: 3, maxFriendshipTypeMatch: 30 },
    initialFriendship: 10,
    appearanceRate: 0.32,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.15, statGainMultiplier: 1.18 },
    moveHints: ['FoulPlay', 'Moonlight', 'Toxic', 'Curse', 'DarkPulse'],
    description: 'The Elite Four member embraces darkness'
  },
  Agatha: {
    name: 'Agatha',
    trainer: 'Agatha',
    rarity: 'Uncommon',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 8, Defense: 0, Instinct: 32, Speed: 5 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 19 },
    initialFriendship: 20,
    appearanceRate: 0.32,
    typeMatchPreference: 0.40,
    specialEffect: null,
    moveHints: ['ShadowBall', 'SludgeWave', 'DestinyBond', 'Hypnosis', 'DreamEater'],
    description: 'The Elite Four member masters ghosts'
  },
  Milo: {
    name: 'Milo',
    trainer: 'Milo',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 35, Attack: 0, Defense: 10, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 3, maxFriendshipTypeMatch: 11 },
    initialFriendship: 50,
    appearanceRate: 0.58,
    typeMatchPreference: 0.15,
    specialEffect: { maxEnergyBonus: 8, restBonus: 4 },
    moveHints: ['GigaDrain', 'CottonGuard', 'LeechSeed', 'Synthesis', 'PollenPuff'],
    description: 'The Turffield Gym Leader nurtures growth'
  },
  Kabu: {
    name: 'Kabu',
    trainer: 'Kabu',
    rarity: 'Uncommon',
    supportType: 'Attack',
    baseStats: { HP: 5, Attack: 32, Defense: 5, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 18 },
    initialFriendship: 15,
    appearanceRate: 0.38,
    typeMatchPreference: 0.25,
    specialEffect: null,
    moveHints: ['FireLash', 'Flamethrower', 'Crunch', 'Coil', 'PowerWhip'],
    description: 'The Motostoke Gym Leader burns with dedication'
  },
  Melony: {
    name: 'Melony',
    trainer: 'Melony',
    rarity: 'Uncommon',
    supportType: 'HP',
    baseStats: { HP: 40, Attack: 0, Defense: 10, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 45,
    appearanceRate: 0.52,
    typeMatchPreference: 0.20,
    specialEffect: { maxEnergyBonus: 10 },
    moveHints: ['IceBeam', 'Surf', 'FreezeDry', 'SheerCold', 'Sing'],
    description: 'The Circhester Gym Leader provides warmth in cold'
  },
  Gordie: {
    name: 'Gordie',
    trainer: 'Gordie',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 5, Defense: 35, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 25,
    appearanceRate: 0.42,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['TarShot', 'StoneEdge', 'HeatCrash', 'Earthquake', 'StealthRock'],
    description: 'The Circhester Gym Leader stands firm'
  },
  Klara: {
    name: 'Klara',
    trainer: 'Klara',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 15, Attack: 0, Defense: 30, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 12 },
    initialFriendship: 20,
    appearanceRate: 0.40,
    typeMatchPreference: 0.35,
    specialEffect: { failRateReduction: 0.06 },
    moveHints: ['ShellSideArm', 'Psychic', 'SludgeBomb', 'SlackOff', 'Scald'],
    description: 'The aspiring Poison specialist tanks hits'
  },
  Avery: {
    name: 'Avery',
    trainer: 'Avery',
    rarity: 'Legendary',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 18, Defense: 10, Instinct: 18, Speed: 55 },
    trainingBonus: { typeMatch: 10, otherStats: 3, maxFriendshipTypeMatch: 25 },
    initialFriendship: 15,
    appearanceRate: 0.38,
    typeMatchPreference: 0.30,
    specialEffect: { energyRegenBonus: 8, statGainMultiplier: 1.15 },
    moveHints: ['PsychoCut', 'PlayRough', 'HighHorsepower', 'Agility', 'Megahorn'],
    description: 'The aspiring Psychic specialist pursues perfection'
  },
  Iono: {
    name: 'Iono',
    trainer: 'Iono',
    rarity: 'Uncommon',
    supportType: 'Speed',
    baseStats: { HP: 0, Attack: 12, Defense: 0, Instinct: 10, Speed: 23 },
    trainingBonus: { typeMatch: 7, otherStats: 2, maxFriendshipTypeMatch: 18 },
    initialFriendship: 60,
    appearanceRate: 0.60,
    typeMatchPreference: 0.15,
    specialEffect: { friendshipGainBonus: 7, energyRegenBonus: 2 },
    moveHints: ['WildCharge', 'Discharge', 'Spark', 'ElectroBall', 'ChargeBeam'],
    description: 'The streaming Gym Leader electrifies fans'
  },
  Grusha: {
    name: 'Grusha',
    trainer: 'Grusha',
    rarity: 'Uncommon',
    supportType: 'Defense',
    baseStats: { HP: 10, Attack: 0, Defense: 30, Instinct: 10, Speed: 5 },
    trainingBonus: { typeMatch: 4, otherStats: 3, maxFriendshipTypeMatch: 11 },
    initialFriendship: 30,
    appearanceRate: 0.48,
    typeMatchPreference: 0.25,
    specialEffect: { failRateReduction: 0.06 },
    moveHints: ['IceBeam', 'DragonPulse', 'Moonblast', 'CottonGuard', 'Roost'],
    description: 'The former snowboarder glides with grace'
  },

  // ============================================================================
  // COMMON TIER (Power Budget: ~48-55, ~80% of Uncommon)
  // Lower stats but still useful, high variance in specialization
  // Cards with statGainMultiplier have reduced base stats (~60-70% of normal)
  // ============================================================================
  Whitney: {
    name: 'Whitney',
    trainer: 'Whitney',
    rarity: 'Common',
    supportType: 'HP',
    baseStats: { HP: 28, Attack: 0, Defense: 7, Instinct: 0, Speed: 0 },
    trainingBonus: { typeMatch: 5, otherStats: 2, maxFriendshipTypeMatch: 11 },
    initialFriendship: 50,
    appearanceRate: 0.62,
    typeMatchPreference: 0.15,
    specialEffect: null,
    moveHints: ['Rollout', 'BodySlam', 'MilkDrink', 'Attract', 'Stomp'],
    description: 'The Goldenrod Gym Leader boosts endurance'
  },
  Chuck: {
    name: 'Chuck',
    trainer: 'Chuck',
    rarity: 'Common',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 24, Defense: 0, Instinct: 0, Speed: 5 },
    trainingBonus: { typeMatch: 7, otherStats: 1, maxFriendshipTypeMatch: 14 },
    initialFriendship: 5,
    appearanceRate: 0.35,
    typeMatchPreference: 0.30,
    specialEffect: null,
    moveHints: ['CrossChop', 'Waterfall', 'Superpower', 'BulkUp', 'ForcePalm'],
    description: 'The Cianwood Gym Leader builds strength'
  },
  Pryce: {
    name: 'Pryce',
    trainer: 'Pryce',
    rarity: 'Common',
    supportType: 'Defense',
    baseStats: { HP: 20, Attack: 0, Defense: 5, Instinct: 5, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 10 },
    initialFriendship: 45,
    appearanceRate: 0.55,
    typeMatchPreference: 0.10,
    specialEffect: { maxEnergyBonus: 6, restBonus: 4 },
    moveHints: ['Present', 'IceBeam', 'IcePunch', 'Blizzard', 'AerialAce'],
    description: 'The Mahogany Gym Leader aids recovery'
  },
  Wattson: {
    name: 'Wattson',
    trainer: 'Wattson',
    rarity: 'Common',
    supportType: 'Instinct',
    baseStats: { HP: 0, Attack: 0, Defense: 5, Instinct: 25, Speed: 5 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 11 },
    initialFriendship: 35,
    appearanceRate: 0.48,
    typeMatchPreference: 0.25,
    specialEffect: null,
    moveHints: ['Thunderbolt', 'ZapCannon', 'Discharge', 'Spark', 'ElectricTerrain'],
    description: 'The Mauville Gym Leader electrifies training'
  },
  Flannery: {
    name: 'Flannery',
    trainer: 'Flannery',
    rarity: 'Common',
    supportType: 'Attack',
    baseStats: { HP: 0, Attack: 5, Defense: 0, Instinct: 20, Speed: 0 },
    trainingBonus: { typeMatch: 4, otherStats: 2, maxFriendshipTypeMatch: 11 },
    initialFriendship: 15,
    appearanceRate: 0.40,
    typeMatchPreference: 0.35,
    specialEffect: { statGainMultiplier: 1.08, failRateReduction: 0.05 },
    moveHints: ['Eruption', 'EarthPower', 'LavaPlume', 'Earthquake', 'Flamethrower'],
    description: 'The Lavaridge Gym Leader cultivates fiery growth'
  }
};

const LEGACY_SUPPORT_NAME_MAP = {
  // Legendary
  CynthiaGarchomp: 'Cynthia',
  RedCharizard: 'Red',
  StevenMetagross: 'Steven',
  NReshiram: 'N',
  ProfessorOakMew: 'ProfessorOak',
  DianthaDiancie: 'Diantha',
  LeonCharizard: 'Leon',
  SeleneLunala: 'Selene',
  GloriaZacian: 'Gloria',
  NemonaKoraidon: 'Nemona',
  MustardUrshifu: 'Mustard',
  VictorCalyrex: 'Victor',
  ArvenMabosstiff: 'Arven',
  PennyEevee: 'Penny',
  SoniaYamper: 'Sonia',
  HopZamazenta: 'Hop',
  GeetaKingambit: 'Geeta',
  KieranOgerpon: 'Kieran',
  CarmineBloodmoon: 'Carmine',
  DraytonArchaludon: 'Drayton',
  LaceyExcadrill: 'Lacey',
  // Rare
  LanceDragonite: 'Lance',
  SabrinaAlakazam: 'Sabrina',
  MortyGengar: 'Morty',
  WallaceMillotic: 'Wallace',
  IrisHaxorus: 'Iris',
  BlueBlastoise: 'Blue',
  GiovanniPersian: 'Giovanni',
  MaxieCamerupt: 'Maxie',
  ArchieSharpedo: 'Archie',
  RaihanDuraludon: 'Raihan',
  MarnieGrimmsnarl: 'Marnie',
  NessaDrednaw: 'Nessa',
  BeaSirfetchd: 'Bea',
  OpalAlcremie: 'Opal',
  PiersObstagoon: 'Piers',
  RikaClodsire: 'Rika',
  PoppyTinkaton: 'Poppy',
  // Uncommon
  MistyStarmie: 'Misty',
  BrockOnix: 'Brock',
  ErikaTangela: 'Erika',
  BlaineMagmar: 'Blaine',
  KogaWeezing: 'Koga',
  JasmineSteelix: 'Jasmine',
  WinonaAltaria: 'Winona',
  KarenUmbreon: 'Karen',
  AgathaGengar: 'Agatha',
  MiloEldegoss: 'Milo',
  KabuCentiskorch: 'Kabu',
  MelonyLapras: 'Melony',
  GordieCoalossal: 'Gordie',
  KlaraSlowbro: 'Klara',
  AverySlowking: 'Avery',
  IonoBellibolt: 'Iono',
  GrushaAltaria: 'Grusha',
  // Common
  WhitneyMiltank: 'Whitney',
  ChuckPoliwrath: 'Chuck',
  PryceDelibird: 'Pryce',
  WattsonMagneton: 'Wattson',
  FlanneryCamerupt: 'Flannery'
};

const SUPPORT_LIMIT_BREAK_PROGRESSIONS = {
  // ============================================================================
  // LEGENDARY TIER - Dramatic progressions, power locked behind limit breaks
  // ============================================================================

  Cynthia: {
    // LB0: Holding back - weak stats, no special effect
    // LB1: BIG JUMP baseStats (0.40→1.00) - Champion's raw power awakens
    // LB2: BIG JUMP trainingBonus (0.50→1.00) - Training wisdom unlocked
    // LB3: UNLOCK specialEffect (0→1.00) - Champion's stat multiplier aura manifests
    // LB4: BIG JUMP appearanceRate (0.38→0.50) - Full Champion presence
    progression: [
      { baseStats: 0.40, trainingBonus: 0.50, appearanceRate: 0.38, typeMatchPreference: 0.05, initialFriendship: 10, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 0.50, appearanceRate: 0.38, typeMatchPreference: 0.05, initialFriendship: 10, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.05, initialFriendship: 10, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.05, initialFriendship: 10, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.05, initialFriendship: 10, specialEffect: 1.00 }
    ]
  },

  Red: {
    // LB0: Rare and silent - low appearance, already has special effect active
    // LB1: BIG JUMP typeMatchPreference (0.30→0.55) - Type mastery achieved
    // LB2: BIG JUMP baseStats (0.50→1.00) - Silent strength revealed
    // LB3: BIG JUMP trainingBonus (0.60→1.00) - Mt. Silver training wisdom
    // LB4: BIG JUMP appearanceRate (0.15→0.28) - Red appears more often
    progression: [
      { baseStats: 0.50, trainingBonus: 0.60, appearanceRate: 0.15, typeMatchPreference: 0.30, initialFriendship: 0, specialEffect: 1 },
      { baseStats: 0.50, trainingBonus: 0.60, appearanceRate: 0.15, typeMatchPreference: 0.55, initialFriendship: 0, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.15, typeMatchPreference: 0.55, initialFriendship: 0, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.15, typeMatchPreference: 0.55, initialFriendship: 0, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.55, initialFriendship: 0, specialEffect: 1 }
    ]
  },

  Steven: {
    // LB0: Reliable gentleman - partial fail reduction already active
    // LB1: BIG JUMP trainingBonus (0.60→1.00) - Training wisdom unlocked
    // LB2: BIG JUMP appearanceRate (0.38→0.52) - Always there when needed
    // LB3: BIG JUMP initialFriendship (20→40) - Instant deep bond formed
    // LB4: BIG JUMP specialEffect (0.40→1.00) - Fail reduction mastered
    // LB5: BIG JUMP baseStats (0.50→1.00) - Full Steel Champion power
    progression: [
      { baseStats: 0.50, trainingBonus: 0.60, appearanceRate: 0.38, typeMatchPreference: 0.25, initialFriendship: 20, specialEffect: 0.40 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.25, initialFriendship: 20, specialEffect: 0.40 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.25, initialFriendship: 20, specialEffect: 0.40 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.25, initialFriendship: 40, specialEffect: 0.40 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.25, initialFriendship: 40, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.25, initialFriendship: 40, specialEffect: 1.00 }
    ]
  },

  N: {
    // LB0: Already bonds easily - high friendship, partial effect
    // LB1: BIG JUMP typeMatchPreference (0.25→0.50) - Pokemon understanding unlocked
    // LB2: BIG JUMP initialFriendship (40→60) - Deep connection achieved
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Friendship mastery
    // LB4: BIG JUMP trainingBonus (0.55→1.00) - Full Pokemon harmony
    progression: [
      { baseStats: 1.00, trainingBonus: 0.55, appearanceRate: 0.45, typeMatchPreference: 0.25, initialFriendship: 40, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 0.55, appearanceRate: 0.45, typeMatchPreference: 0.50, initialFriendship: 40, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 0.55, appearanceRate: 0.45, typeMatchPreference: 0.50, initialFriendship: 60, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 0.55, appearanceRate: 0.45, typeMatchPreference: 0.50, initialFriendship: 60, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.50, initialFriendship: 60, specialEffect: 1.00 }
    ]
  },

  ProfessorOak: {
    // LB0: Kind mentor - good friend, but skill bonus locked
    // LB1: UNLOCK specialEffect (0→1.00) - Research insights unlocked
    // LB2: BIG JUMP appearanceRate (0.42→0.58) - Always available for guidance
    // LB3: BIG JUMP initialFriendship (35→55) - Mentorship bond deepens
    // LB4: BIG JUMP trainingBonus (0.60→1.00) - Full Professor wisdom
    progression: [
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.42, typeMatchPreference: 0.10, initialFriendship: 35, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.42, typeMatchPreference: 0.10, initialFriendship: 35, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.58, typeMatchPreference: 0.10, initialFriendship: 35, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.58, typeMatchPreference: 0.10, initialFriendship: 55, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.58, typeMatchPreference: 0.10, initialFriendship: 55, specialEffect: 1.00 }
    ]
  },

  Diantha: {
    // LB0: Hidden elegance - power concealed, no special effect
    // LB1: BIG JUMP baseStats (0.45→1.00) - Star power awakens
    // LB2: BIG JUMP trainingBonus (0.50→1.00) - Acting discipline transfers
    // LB3: UNLOCK specialEffect (0→1.00) - Dual effects activate
    // LB4: BIG JUMP appearanceRate (0.30→0.42) - Full Kalos Champion elegance
    progression: [
      { baseStats: 0.45, trainingBonus: 0.50, appearanceRate: 0.30, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 0.50, appearanceRate: 0.30, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 1.00 }
    ]
  },

  Leon: {
    // LB0: Undefeated aura hidden - no special effect yet
    // LB1: UNLOCK specialEffect (0→1.00) - Champion's protection activates
    // LB2: BIG JUMP baseStats (0.50→1.00) - Undefeated strength revealed
    // LB3: BIG JUMP trainingBonus (0.55→1.00) - Battle wisdom acquired
    // LB4: BIG JUMP appearanceRate (0.28→0.40) - Champion time in spotlight
    progression: [
      { baseStats: 0.50, trainingBonus: 0.55, appearanceRate: 0.28, typeMatchPreference: 0.10, initialFriendship: 15, specialEffect: 0 },
      { baseStats: 0.50, trainingBonus: 0.55, appearanceRate: 0.28, typeMatchPreference: 0.10, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.55, appearanceRate: 0.28, typeMatchPreference: 0.10, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.10, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.10, initialFriendship: 15, specialEffect: 1.00 }
    ]
  },

  Selene: {
    // LB0: Mystical presence - partial skill bonus active
    // LB1: BIG JUMP appearanceRate (0.32→0.45) - Moon's guidance always present
    // LB2: BIG JUMP typeMatchPreference (0.10→0.20) - Type intuition doubles
    // LB3: BIG JUMP specialEffect (0.25→1.00) - Skill mastery unlocked
    // LB4: BIG JUMP baseStats (0.50→1.00) - Full Alola Champion power
    progression: [
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.10, initialFriendship: 30, specialEffect: 0.25 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.10, initialFriendship: 30, specialEffect: 0.25 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.20, initialFriendship: 30, specialEffect: 0.25 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.20, initialFriendship: 30, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.20, initialFriendship: 30, specialEffect: 1.00 }
    ]
  },

  Gloria: {
    // LB0: Sword wielder - partial fail reduction already active
    // LB1: BIG JUMP specialEffect (0.40→1.00) - Sword's protection strengthens
    // LB2: BIG JUMP baseStats (0.50→1.00) - Champion growth
    // LB3: BIG JUMP appearanceRate (0.30→0.42) - Reliable presence
    // LB4: BIG JUMP trainingBonus (0.60→1.00) - Full Sword Champion power
    progression: [
      { baseStats: 0.50, trainingBonus: 0.60, appearanceRate: 0.30, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 0.40 },
      { baseStats: 0.50, trainingBonus: 0.60, appearanceRate: 0.30, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.30, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.42, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 1.00 }
    ]
  },

  Nemona: {
    // LB0: Already enthusiastic - high friendship, partial energy bonus
    // LB1: BIG JUMP appearanceRate (0.40→0.55) - Always wants to battle!
    // LB2: BIG JUMP initialFriendship (45→60) - Instant best friend
    // LB3: BIG JUMP specialEffect (0.30→1.00) - Energy mastery unlocked
    // LB4: BIG JUMP baseStats (0.50→1.00) - Full Paldea Champion energy
    progression: [
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.10, initialFriendship: 45, specialEffect: 0.30 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.10, initialFriendship: 45, specialEffect: 0.30 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.10, initialFriendship: 60, specialEffect: 0.30 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.10, initialFriendship: 60, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.10, initialFriendship: 60, specialEffect: 1.00 }
    ]
  },

  Mustard: {
    // LB0: Old master - tough love, low friendship, partial training effect
    // LB1: BIG JUMP typeMatchPreference (0.25→0.45) - Fighting mastery revealed
    // LB2: BIG JUMP baseStats (0.50→1.00) - Former champion power
    // LB3: BIG JUMP specialEffect (0.30→1.00) - Training multiplier mastered
    // LB4: BIG JUMP trainingBonus (0.55→1.00) - Full Dojo Master wisdom
    progression: [
      { baseStats: 0.50, trainingBonus: 0.55, appearanceRate: 0.30, typeMatchPreference: 0.25, initialFriendship: 5, specialEffect: 0.30 },
      { baseStats: 0.50, trainingBonus: 0.55, appearanceRate: 0.30, typeMatchPreference: 0.45, initialFriendship: 5, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 0.55, appearanceRate: 0.30, typeMatchPreference: 0.45, initialFriendship: 5, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 0.55, appearanceRate: 0.30, typeMatchPreference: 0.45, initialFriendship: 5, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.45, initialFriendship: 5, specialEffect: 1.00 }
    ]
  },

  Arven: {
    // LB0: Caring chef - good friendship, partial HP regen effect
    // LB1: BIG JUMP appearanceRate (0.40→0.55) - Always bringing sandwiches
    // LB2: BIG JUMP initialFriendship (35→50) - Deep bond formed
    // LB3: BIG JUMP specialEffect (0.40→1.00) - HP regen mastered
    // LB4: BIG JUMP baseStats (0.50→1.00) - Full potential unlocked
    progression: [
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.20, initialFriendship: 35, specialEffect: 0.40 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.20, initialFriendship: 35, specialEffect: 0.40 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.20, initialFriendship: 50, specialEffect: 0.40 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.20, initialFriendship: 50, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.20, initialFriendship: 50, specialEffect: 1.00 }
    ]
  },

  Penny: {
    // LB0: Shy hacker - low appearance, partial skill effect
    // LB1: BIG JUMP typeMatchPreference (0.12→0.25) - Type analysis unlocked
    // LB2: BIG JUMP appearanceRate (0.25→0.38) - Opens up more
    // LB3: BIG JUMP specialEffect (0.25→1.00) - Full skill bonus active
    // LB4: BIG JUMP baseStats (0.45→1.00) - Hidden potential revealed
    progression: [
      { baseStats: 0.45, trainingBonus: 1.00, appearanceRate: 0.25, typeMatchPreference: 0.12, initialFriendship: 20, specialEffect: 0.25 },
      { baseStats: 0.45, trainingBonus: 1.00, appearanceRate: 0.25, typeMatchPreference: 0.25, initialFriendship: 20, specialEffect: 0.25 },
      { baseStats: 0.45, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.25, initialFriendship: 20, specialEffect: 0.25 },
      { baseStats: 0.45, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.25, initialFriendship: 20, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.25, initialFriendship: 20, specialEffect: 1.00 }
    ]
  },

  Hop: {
    // LB0: Enthusiastic rival - high friendship, partial energy effect
    // LB1: BIG JUMP appearanceRate (0.38→0.52) - Always ready to train
    // LB2: BIG JUMP initialFriendship (40→55) - True best friend
    // LB3: BIG JUMP specialEffect (0.35→1.00) - Energy bonus mastered
    // LB4: BIG JUMP baseStats (0.50→1.00) - Full rival potential
    progression: [
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.20, initialFriendship: 40, specialEffect: 0.35 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.20, initialFriendship: 40, specialEffect: 0.35 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.20, initialFriendship: 55, specialEffect: 0.35 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.20, initialFriendship: 55, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.20, initialFriendship: 55, specialEffect: 1.00 }
    ]
  },

  Carmine: {
    // LB0: Tsundere - low friendship, no special effect, high type focus
    // LB1: UNLOCK specialEffect (0→1.00) - Training boost activates
    // LB2: BIG JUMP typeMatchPreference (0.20→0.45) - Type mastery revealed
    // LB3: BIG JUMP baseStats (0.50→1.00) - True power shown
    // LB4: BIG JUMP appearanceRate (0.28→0.40) - Finally warms up
    progression: [
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.20, initialFriendship: 15, specialEffect: 0 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.20, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.45, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.45, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.45, initialFriendship: 15, specialEffect: 1.00 }
    ]
  },

  Drayton: {
    // LB0: Lazy dragon - decent friendship, partial effect
    // LB1: BIG JUMP initialFriendship (28→45) - Surprisingly warm
    // LB2: BIG JUMP appearanceRate (0.38→0.50) - Shows up more
    // LB3: BIG JUMP specialEffect (0.30→1.00) - Fail reduction mastered
    // LB4: BIG JUMP baseStats (0.50→1.00) - Hidden power unleashed
    progression: [
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.20, initialFriendship: 28, specialEffect: 0.30 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.20, initialFriendship: 45, specialEffect: 0.30 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.20, initialFriendship: 45, specialEffect: 0.30 },
      { baseStats: 0.50, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.20, initialFriendship: 45, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.20, initialFriendship: 45, specialEffect: 1.00 }
    ]
  },

  Lacey: {
    // LB0: Pop idol - good friendship, partial friendship effect
    // LB1: BIG JUMP typeMatchPreference (0.12→0.25) - Fairy type mastery
    // LB2: BIG JUMP initialFriendship (30→45) - Fans adore her
    // LB3: BIG JUMP specialEffect (0.35→1.00) - Friendship bonus mastered
    // LB4: BIG JUMP appearanceRate (0.40→0.52) - Star presence
    progression: [
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.12, initialFriendship: 30, specialEffect: 0.35 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 0.35 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.25, initialFriendship: 45, specialEffect: 0.35 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.25, initialFriendship: 45, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.25, initialFriendship: 45, specialEffect: 1.00 }
    ]
  },

  Karen: {
    // LB0: Dark Elite - cold, low friendship, no special effect
    // LB1: UNLOCK specialEffect (0→0.50) - Instinct boost activates
    // LB2: BIG JUMP typeMatchPreference (0.12→0.25) - Dark mastery
    // LB3: BIG JUMP baseStats (0.45→1.00) - Elite Four power
    // LB4: BIG JUMP trainingBonus (0.55→1.00) - Full dark wisdom
    progression: [
      { baseStats: 0.45, trainingBonus: 0.55, appearanceRate: 0.32, typeMatchPreference: 0.12, initialFriendship: 10, specialEffect: 0 },
      { baseStats: 0.45, trainingBonus: 0.55, appearanceRate: 0.32, typeMatchPreference: 0.12, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 0.45, trainingBonus: 0.55, appearanceRate: 0.32, typeMatchPreference: 0.25, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 0.55, appearanceRate: 0.32, typeMatchPreference: 0.25, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.25, initialFriendship: 10, specialEffect: 1.00 }
    ]
  },

  Opal: {
    // LB0: Eccentric grandma - no special effect, tests you
    // LB1: BIG JUMP typeMatchPreference (0.15→0.30) - Fairy wisdom
    // LB2: BIG JUMP initialFriendship (25→40) - Passes her quiz
    // LB3: UNLOCK specialEffect (0→1.00) - Instinct bonus activates
    // LB4: BIG JUMP appearanceRate (0.38→0.52) - Full pink presence
    progression: [
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.15, initialFriendship: 25, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.30, initialFriendship: 25, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.30, initialFriendship: 40, specialEffect: 0 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.30, initialFriendship: 40, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.30, initialFriendship: 40, specialEffect: 1.00 }
    ]
  },

  Rika: {
    // LB0: Cool Elite - partial fail reduction effect
    // LB1: BIG JUMP appearanceRate (0.35→0.50) - Always around
    // LB2: BIG JUMP initialFriendship (15→35) - Warms up to you
    // LB3: BIG JUMP specialEffect (0.30→1.00) - Fail reduction mastered
    // LB4: BIG JUMP typeMatchPreference (0.12→0.25) - Ground mastery
    progression: [
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.12, initialFriendship: 15, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.12, initialFriendship: 15, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.12, initialFriendship: 35, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.12, initialFriendship: 35, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 1.00 }
    ]
  },

  Avery: {
    // LB0: Haughty psychic - low friendship, no special effect
    // LB1: BIG JUMP typeMatchPreference (0.22→0.40) - Psychic mastery
    // LB2: UNLOCK specialEffect (0→1.00) - Instinct bonus activates
    // LB3: BIG JUMP initialFriendship (5→15) - Finally respects you
    // LB4: BIG JUMP baseStats (0.45→1.00) - Full psychic power
    progression: [
      { baseStats: 0.45, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.22, initialFriendship: 5, specialEffect: 0 },
      { baseStats: 0.45, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.40, initialFriendship: 5, specialEffect: 0 },
      { baseStats: 0.45, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.40, initialFriendship: 5, specialEffect: 1.00 },
      { baseStats: 0.45, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.40, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.40, initialFriendship: 15, specialEffect: 1.00 }
    ]
  },

  // ============================================================================
  // RARE TIER - Moderate progressions, more accessible power
  // ============================================================================

  Lance: {
    // LB0: Dragon master - partial stat multiplier effect
    // LB1: BIG JUMP typeMatchPreference (0.22→0.40) - Dragon mastery
    // LB2: BIG JUMP baseStats (0.55→1.00) - Champion power
    // LB3: BIG JUMP specialEffect (0.35→1.00) - Stat multiplier mastered
    // LB4: BIG JUMP trainingBonus (0.60→1.00) - Full dragon wisdom
    progression: [
      { baseStats: 0.55, trainingBonus: 0.60, appearanceRate: 0.35, typeMatchPreference: 0.22, initialFriendship: 15, specialEffect: 0.35 },
      { baseStats: 0.55, trainingBonus: 0.60, appearanceRate: 0.35, typeMatchPreference: 0.40, initialFriendship: 15, specialEffect: 0.35 },
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.35, typeMatchPreference: 0.40, initialFriendship: 15, specialEffect: 0.35 },
      { baseStats: 1.00, trainingBonus: 0.60, appearanceRate: 0.35, typeMatchPreference: 0.40, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.40, initialFriendship: 15, specialEffect: 1.00 }
    ]
  },

  Sabrina: {
    // LB0: Cold psychic - low friendship, no special effect
    // LB1: UNLOCK specialEffect (0→0.50) - Instinct boost activates
    // LB2: BIG JUMP typeMatchPreference (0.28→0.45) - Psychic mastery
    // LB3: BIG JUMP baseStats (0.55→1.00) - Full psychic power
    // LB4: BIG JUMP appearanceRate (0.22→0.36) - Finally opens up
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.22, typeMatchPreference: 0.28, initialFriendship: 10, specialEffect: 0 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.22, typeMatchPreference: 0.28, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.22, typeMatchPreference: 0.45, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.22, typeMatchPreference: 0.45, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.36, typeMatchPreference: 0.45, initialFriendship: 10, specialEffect: 1.00 }
    ]
  },

  Morty: {
    // LB0: Ghost mystic - partial energy effect, decent friendship
    // LB1: BIG JUMP appearanceRate (0.30→0.45) - Spiritual presence
    // LB2: BIG JUMP typeMatchPreference (0.20→0.35) - Ghost mastery
    // LB3: BIG JUMP specialEffect (0.30→1.00) - Energy mastered
    // LB4: BIG JUMP initialFriendship (18→30) - Deep bond
    progression: [
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.20, initialFriendship: 18, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.20, initialFriendship: 18, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.35, initialFriendship: 18, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.35, initialFriendship: 18, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.35, initialFriendship: 30, specialEffect: 1.00 }
    ]
  },

  Wallace: {
    // LB0: Elegant champion - high friendship, partial HP regen
    // LB1: BIG JUMP appearanceRate (0.38→0.50) - Graceful presence
    // LB2: BIG JUMP initialFriendship (30→45) - Contest bond
    // LB3: BIG JUMP specialEffect (0.45→1.00) - HP regen mastered
    // LB4: BIG JUMP typeMatchPreference (0.18→0.30) - Water mastery
    progression: [
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.18, initialFriendship: 30, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.18, initialFriendship: 30, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.18, initialFriendship: 45, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.18, initialFriendship: 45, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.30, initialFriendship: 45, specialEffect: 1.00 }
    ]
  },

  Iris: {
    // LB0: Young dragon champ - partial friendship bonus, friendly
    // LB1: BIG JUMP typeMatchPreference (0.25→0.40) - Dragon mastery
    // LB2: BIG JUMP appearanceRate (0.35→0.50) - Energetic presence
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Friendship bonus mastered
    // LB4: BIG JUMP baseStats (0.60→1.00) - Full dragon champion power
    progression: [
      { baseStats: 0.60, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 0.50 },
      { baseStats: 0.60, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.40, initialFriendship: 35, specialEffect: 0.50 },
      { baseStats: 0.60, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.40, initialFriendship: 35, specialEffect: 0.50 },
      { baseStats: 0.60, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.40, initialFriendship: 35, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.40, initialFriendship: 35, specialEffect: 1.00 }
    ]
  },

  Blue: {
    // LB0: Arrogant rival - low friendship, partial stat multiplier
    // LB1: BIG JUMP typeMatchPreference (0.25→0.48) - Type versatility mastered
    // LB2: BIG JUMP baseStats (0.55→1.00) - Champion power revealed
    // LB3: BIG JUMP specialEffect (0.30→1.00) - Stat multiplier mastered
    // LB4: BIG JUMP appearanceRate (0.28→0.42) - Respects you now
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.25, initialFriendship: 14, specialEffect: 0.30 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.48, initialFriendship: 14, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.48, initialFriendship: 14, specialEffect: 0.30 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.48, initialFriendship: 14, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.48, initialFriendship: 14, specialEffect: 1.00 }
    ]
  },

  Giovanni: {
    // LB0: Criminal mastermind - cold, calculating, partial power
    // LB1: BIG JUMP specialEffect (0.50→1.00) - Intimidation aura intensifies
    // LB2: BIG JUMP baseStats (0.60→1.00) - Full crime boss power unleashed
    // LB3: BIG JUMP typeMatchPreference (0.30→0.52) - Ground-type mastery perfected
    // LB4: BIG JUMP trainingBonus (0.65→1.00) - Ruthless efficiency maximized
    progression: [
      { baseStats: 0.60, trainingBonus: 0.65, appearanceRate: 0.30, typeMatchPreference: 0.30, initialFriendship: 0, specialEffect: 0.50 },
      { baseStats: 0.60, trainingBonus: 0.65, appearanceRate: 0.30, typeMatchPreference: 0.30, initialFriendship: 0, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.65, appearanceRate: 0.30, typeMatchPreference: 0.30, initialFriendship: 0, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.65, appearanceRate: 0.30, typeMatchPreference: 0.52, initialFriendship: 0, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.52, initialFriendship: 0, specialEffect: 1.00 }
    ]
  },

  Maxie: {
    // LB0: Team Magma leader - scientific, calculating, no special effect yet
    // LB1: UNLOCK specialEffect (0→1.00) - Land expansion theory manifests
    // LB2: BIG JUMP typeMatchPreference (0.25→0.48) - Fire/Ground mastery achieved
    // LB3: BIG JUMP baseStats (0.55→1.00) - Full volcanic power erupts
    // LB4: BIG JUMP trainingBonus (0.58→1.00) - Groudon's blessing complete
    progression: [
      { baseStats: 0.55, trainingBonus: 0.58, appearanceRate: 0.38, typeMatchPreference: 0.25, initialFriendship: 15, specialEffect: 0 },
      { baseStats: 0.55, trainingBonus: 0.58, appearanceRate: 0.38, typeMatchPreference: 0.25, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 0.55, trainingBonus: 0.58, appearanceRate: 0.38, typeMatchPreference: 0.48, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.58, appearanceRate: 0.38, typeMatchPreference: 0.48, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.48, initialFriendship: 15, specialEffect: 1.00 }
    ]
  },

  Archie: {
    // LB0: Team Aqua captain - friendly pirate, loves the sea
    // LB1: BIG JUMP initialFriendship (20→38) - Instantly bonds with you matey!
    // LB2: BIG JUMP appearanceRate (0.32→0.48) - Always ready for adventure
    // LB3: BIG JUMP baseStats (0.55→1.00) - Full sea captain power
    // LB4: BIG JUMP specialEffect (0.45→1.00) - Kyogre's blessing complete
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.40, initialFriendship: 20, specialEffect: 0.45 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.40, initialFriendship: 38, specialEffect: 0.45 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.40, initialFriendship: 38, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.40, initialFriendship: 38, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.40, initialFriendship: 38, specialEffect: 1.00 }
    ]
  },

  Raihan: {
    // LB0: Social media dragon tamer - competitive, approachable
    // LB1: BIG JUMP appearanceRate (0.32→0.48) - Always showing up for content
    // LB2: BIG JUMP typeMatchPreference (0.18→0.36) - Dragon/weather mastery unlocked
    // LB3: BIG JUMP specialEffect (0.35→1.00) - Weather control intensifies
    // LB4: BIG JUMP baseStats (0.55→1.00) - Full rival power unleashed
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.18, initialFriendship: 40, specialEffect: 0.35 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.18, initialFriendship: 40, specialEffect: 0.35 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.36, initialFriendship: 40, specialEffect: 0.35 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.36, initialFriendship: 40, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.36, initialFriendship: 40, specialEffect: 1.00 }
    ]
  },

  Marnie: {
    // LB0: Quiet punk rival - reserved, cool demeanor
    // LB1: BIG JUMP initialFriendship (10→25) - Warms up to you completely
    // LB2: BIG JUMP typeMatchPreference (0.20→0.38) - Dark-type mastery unlocked
    // LB3: BIG JUMP specialEffect (0.30→1.00) - Team Yell's full support
    // LB4: BIG JUMP baseStats (0.55→1.00) - Spikemuth champion power
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.20, initialFriendship: 10, specialEffect: 0.30 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.20, initialFriendship: 25, specialEffect: 0.30 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.38, initialFriendship: 25, specialEffect: 0.30 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.38, initialFriendship: 25, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.38, initialFriendship: 25, specialEffect: 1.00 }
    ]
  },

  Nessa: {
    // LB0: Model and Water gym leader - popular, stylish
    // LB1: BIG JUMP appearanceRate (0.35→0.50) - Always in the spotlight
    // LB2: BIG JUMP initialFriendship (20→35) - Fashion besties now
    // LB3: BIG JUMP typeMatchPreference (0.20→0.35) - Water-type mastery
    // LB4: BIG JUMP specialEffect (0.45→1.00) - Full tidal wave power
    progression: [
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.20, initialFriendship: 20, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.20, initialFriendship: 20, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.20, initialFriendship: 35, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.35, initialFriendship: 35, specialEffect: 0.45 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.35, initialFriendship: 35, specialEffect: 1.00 }
    ]
  },

  Bea: {
    // LB0: Stoic fighting prodigy - focused, disciplined
    // LB1: BIG JUMP trainingBonus (0.60→1.00) - Martial arts training mastery
    // LB2: BIG JUMP typeMatchPreference (0.30→0.48) - Fighting-type perfected
    // LB3: BIG JUMP specialEffect (0.40→1.00) - Iron will intensifies
    // LB4: BIG JUMP baseStats (0.55→1.00) - Peak physical condition
    progression: [
      { baseStats: 0.55, trainingBonus: 0.60, appearanceRate: 0.35, typeMatchPreference: 0.30, initialFriendship: 10, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.30, initialFriendship: 10, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.48, initialFriendship: 10, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.48, initialFriendship: 10, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.48, initialFriendship: 10, specialEffect: 1.00 }
    ]
  },

  Piers: {
    // LB0: Punk rocker gym leader - cool, laid back, Dark-type specialist
    // LB1: BIG JUMP typeMatchPreference (0.25→0.40) - Dark-type mastery
    // LB2: BIG JUMP appearanceRate (0.30→0.46) - Shows up for his fans
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Rock star energy boost
    // LB4: BIG JUMP baseStats (0.55→1.00) - Full Spikemuth power
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 0.50 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.40, initialFriendship: 30, specialEffect: 0.50 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.46, typeMatchPreference: 0.40, initialFriendship: 30, specialEffect: 0.50 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.46, typeMatchPreference: 0.40, initialFriendship: 30, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.46, typeMatchPreference: 0.40, initialFriendship: 30, specialEffect: 1.00 }
    ]
  },

  Victor: {
    // LB0: Shield protagonist - balanced, friendly, fail reduction
    // LB1: BIG JUMP initialFriendship (18→30) - Instant buddy
    // LB2: BIG JUMP appearanceRate (0.30→0.42) - Reliable presence
    // LB3: BIG JUMP specialEffect (0.40→1.00) - Shield protection mastered
    // LB4: BIG JUMP baseStats (0.55→1.00) - Full Shield Champion power
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.25, initialFriendship: 18, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 1.00 }
    ]
  },

  Sonia: {
    // LB0: Friendly researcher - high friendship, skill bonus
    // LB1: BIG JUMP appearanceRate (0.38→0.52) - Always available to help
    // LB2: BIG JUMP initialFriendship (35→50) - Research buddies forever
    // LB3: BIG JUMP specialEffect (0.40→1.00) - Research skill bonus mastered
    // LB4: BIG JUMP baseStats (0.55→1.00) - Full researcher power
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.10, initialFriendship: 35, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.10, initialFriendship: 35, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.10, initialFriendship: 50, specialEffect: 0.40 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.10, initialFriendship: 50, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.10, initialFriendship: 50, specialEffect: 1.00 }
    ]
  },

  Poppy: {
    // LB0: Adorable Elite - very high friendship, Steel specialist
    // LB1: BIG JUMP appearanceRate (0.42→0.55) - Always wants to play
    // LB2: BIG JUMP initialFriendship (40→55) - Becomes your biggest fan
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Elite training mastered
    // LB4: BIG JUMP baseStats (0.55→1.00) - Full Elite Four power
    progression: [
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.20, initialFriendship: 40, specialEffect: 0.50 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.20, initialFriendship: 40, specialEffect: 0.50 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.20, initialFriendship: 55, specialEffect: 0.50 },
      { baseStats: 0.55, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.20, initialFriendship: 55, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.20, initialFriendship: 55, specialEffect: 1.00 }
    ]
  },

  // ============================================================================
  // UNCOMMON TIER - Gentle progressions, more accessible from start
  // ============================================================================

  Misty: {
    // LB0: Fiery Water gym leader - decent friendship, type focus
    // LB1: BIG JUMP typeMatchPreference (0.18→0.25) - Water mastery
    // LB2: BIG JUMP appearanceRate (0.38→0.48) - Shows up more
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Instinct mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full gym leader power
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.18, initialFriendship: 30, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 1.00 }
    ]
  },

  Brock: {
    // LB0: Reliable Rock leader - high friendship, full special effect
    // LB1: BIG JUMP appearanceRate (0.45→0.55) - Reliably there
    // LB2: BIG JUMP initialFriendship (32→45) - Instant best friend
    // LB3: BIG JUMP trainingBonus (0.70→1.00) - Breeder's wisdom
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full gym leader power
    progression: [
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.45, typeMatchPreference: 0.05, initialFriendship: 32, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.55, typeMatchPreference: 0.05, initialFriendship: 32, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.55, typeMatchPreference: 0.05, initialFriendship: 45, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.05, initialFriendship: 45, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.05, initialFriendship: 45, specialEffect: 1 }
    ]
  },

  Erika: {
    // LB0: Elegant Grass leader - gentle, graceful
    // LB1: BIG JUMP typeMatchPreference (0.22→0.30) - Grass mastery
    // LB2: BIG JUMP appearanceRate (0.40→0.52) - Graceful presence
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Training mastered
    // LB4: BIG JUMP initialFriendship (28→40) - Deep bond formed
    progression: [
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.22, initialFriendship: 28, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.30, initialFriendship: 28, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.30, initialFriendship: 28, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.30, initialFriendship: 28, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.52, typeMatchPreference: 0.30, initialFriendship: 40, specialEffect: 1.00 }
    ]
  },

  Blaine: {
    // LB0: Quiz master Fire leader - reclusive, full effect
    // LB1: BIG JUMP appearanceRate (0.22→0.30) - Emerges from volcano
    // LB2: BIG JUMP trainingBonus (0.70→1.00) - Quiz wisdom unlocked
    // LB3: BIG JUMP typeMatchPreference (0.06→0.10) - Fire mastery
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full volcanic power
    progression: [
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.22, typeMatchPreference: 0.06, initialFriendship: 15, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.30, typeMatchPreference: 0.06, initialFriendship: 15, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.06, initialFriendship: 15, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.10, initialFriendship: 15, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.10, initialFriendship: 15, specialEffect: 1 }
    ]
  },

  Koga: {
    // LB0: Ninja master - distant, Poison specialist
    // LB1: BIG JUMP typeMatchPreference (0.25→0.35) - Poison mastery
    // LB2: BIG JUMP appearanceRate (0.25→0.35) - Shadow step presence
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Instinct mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full ninja power
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.25, typeMatchPreference: 0.25, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.25, typeMatchPreference: 0.35, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.35, initialFriendship: 10, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.35, initialFriendship: 10, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.35, initialFriendship: 10, specialEffect: 1.00 }
    ]
  },

  Jasmine: {
    // LB0: Shy Steel leader - timid, caring, full effect
    // LB1: BIG JUMP typeMatchPreference (0.22→0.30) - Steel mastery
    // LB2: BIG JUMP appearanceRate (0.30→0.40) - Opens up more
    // LB3: BIG JUMP initialFriendship (20→30) - Deep bond formed
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full gym leader power
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.22, initialFriendship: 20, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.30, typeMatchPreference: 0.30, initialFriendship: 20, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.30, initialFriendship: 20, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.30, initialFriendship: 30, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.30, initialFriendship: 30, specialEffect: 1 }
    ]
  },

  Winona: {
    // LB0: Graceful Flying leader - high appearance, elegant
    // LB1: BIG JUMP appearanceRate (0.48→0.58) - Soaring presence
    // LB2: BIG JUMP typeMatchPreference (0.14→0.20) - Flying mastery
    // LB3: BIG JUMP specialEffect (0.55→1.00) - Sky training mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full aerial power
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.14, initialFriendship: 35, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.58, typeMatchPreference: 0.14, initialFriendship: 35, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.58, typeMatchPreference: 0.20, initialFriendship: 35, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.58, typeMatchPreference: 0.20, initialFriendship: 35, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.58, typeMatchPreference: 0.20, initialFriendship: 35, specialEffect: 1.00 }
    ]
  },

  Agatha: {
    // LB0: Old Elite Ghost master - reclusive, full effect
    // LB1: BIG JUMP typeMatchPreference (0.30→0.40) - Ghost mastery
    // LB2: BIG JUMP appearanceRate (0.24→0.32) - Emerges from shadows
    // LB3: BIG JUMP trainingBonus (0.70→1.00) - Elite wisdom
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full Elite Four power
    progression: [
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.24, typeMatchPreference: 0.30, initialFriendship: 20, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.24, typeMatchPreference: 0.40, initialFriendship: 20, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.32, typeMatchPreference: 0.40, initialFriendship: 20, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.40, initialFriendship: 20, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.40, initialFriendship: 20, specialEffect: 1 }
    ]
  },

  Milo: {
    // LB0: Friendly farmer Grass leader - very high friendship
    // LB1: BIG JUMP appearanceRate (0.45→0.55) - Always there to help
    // LB2: BIG JUMP initialFriendship (40→52) - Instant farmhand buddy
    // LB3: BIG JUMP specialEffect (0.55→1.00) - Farm training mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full farmer strength
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.25, initialFriendship: 40, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.25, initialFriendship: 40, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.25, initialFriendship: 52, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.25, initialFriendship: 52, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.25, initialFriendship: 52, specialEffect: 1.00 }
    ]
  },

  Kabu: {
    // LB0: Disciplined Fire leader - tough, strict, Fire specialist
    // LB1: BIG JUMP typeMatchPreference (0.30→0.45) - Fire mastery
    // LB2: BIG JUMP appearanceRate (0.28→0.40) - More accessible
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Instinct mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full veteran power
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.30, initialFriendship: 18, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.45, initialFriendship: 18, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.45, initialFriendship: 18, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.45, initialFriendship: 18, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.45, initialFriendship: 18, specialEffect: 1.00 }
    ]
  },

  Melony: {
    // LB0: Motherly Ice leader - warm personality, caring
    // LB1: BIG JUMP appearanceRate (0.42→0.54) - Always there for you
    // LB2: BIG JUMP initialFriendship (35→48) - Instant mom energy
    // LB3: BIG JUMP specialEffect (0.55→1.00) - Training mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full Ice power
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.54, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.54, typeMatchPreference: 0.25, initialFriendship: 48, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.54, typeMatchPreference: 0.25, initialFriendship: 48, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.54, typeMatchPreference: 0.25, initialFriendship: 48, specialEffect: 1.00 }
    ]
  },

  Gordie: {
    // LB0: Cool Rock leader - trendy, confident
    // LB1: BIG JUMP typeMatchPreference (0.22→0.35) - Rock mastery
    // LB2: BIG JUMP appearanceRate (0.32→0.45) - More approachable
    // LB3: BIG JUMP specialEffect (0.55→1.00) - Training mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full Rock power
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.22, initialFriendship: 30, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.35, initialFriendship: 30, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.35, initialFriendship: 30, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.35, initialFriendship: 30, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.45, typeMatchPreference: 0.35, initialFriendship: 30, specialEffect: 1.00 }
    ]
  },

  Geeta: {
    // LB0: Overworked Champion - distant, full effect
    // LB1: BIG JUMP typeMatchPreference (0.22→0.30) - Type versatility
    // LB2: BIG JUMP appearanceRate (0.30→0.40) - Makes time for you
    // LB3: BIG JUMP trainingBonus (0.70→1.00) - Champion wisdom
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full Champion power
    progression: [
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.30, typeMatchPreference: 0.22, initialFriendship: 15, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.30, typeMatchPreference: 0.30, initialFriendship: 15, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 0.70, appearanceRate: 0.40, typeMatchPreference: 0.30, initialFriendship: 15, specialEffect: 1 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.30, initialFriendship: 15, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.30, initialFriendship: 15, specialEffect: 1 }
    ]
  },

  Kieran: {
    // LB0: Shy rival - grows through competition
    // LB1: BIG JUMP typeMatchPreference (0.24→0.40) - Type mastery emerges
    // LB2: BIG JUMP initialFriendship (20→38) - True bond formed
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Instinct mastered
    // LB4: BIG JUMP appearanceRate (0.28→0.42) - Confident presence
    progression: [
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.24, initialFriendship: 20, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.40, initialFriendship: 20, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.40, initialFriendship: 38, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.40, initialFriendship: 38, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.42, typeMatchPreference: 0.40, initialFriendship: 38, specialEffect: 1.00 }
    ]
  },

  Grusha: {
    // LB0: Cool Ice leader - reserved snowboarder
    // LB1: BIG JUMP appearanceRate (0.38→0.48) - Warms up to you
    // LB2: BIG JUMP typeMatchPreference (0.18→0.25) - Ice mastery
    // LB3: BIG JUMP specialEffect (0.55→1.00) - Training mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full snowboarder power
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.38, typeMatchPreference: 0.18, initialFriendship: 30, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.18, initialFriendship: 30, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.25, initialFriendship: 30, specialEffect: 1.00 }
    ]
  },

  Iono: {
    // LB0: Streamer Electric leader - high appearance, popular
    // LB1: BIG JUMP appearanceRate (0.50→0.60) - Always streaming
    // LB2: BIG JUMP initialFriendship (35→48) - Instant chat member
    // LB3: BIG JUMP specialEffect (0.55→1.00) - Training mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full streamer energy
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.50, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.60, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.60, typeMatchPreference: 0.25, initialFriendship: 48, specialEffect: 0.55 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.60, typeMatchPreference: 0.25, initialFriendship: 48, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.60, typeMatchPreference: 0.25, initialFriendship: 48, specialEffect: 1.00 }
    ]
  },

  Klara: {
    // LB0: Scheming Poison trainee - ambitious, competitive
    // LB1: BIG JUMP typeMatchPreference (0.22→0.35) - Poison mastery
    // LB2: BIG JUMP appearanceRate (0.32→0.44) - Shows up more
    // LB3: BIG JUMP specialEffect (0.50→1.00) - Instinct mastered
    // LB4: BIG JUMP baseStats (0.65→1.00) - Full dojo potential
    progression: [
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.22, initialFriendship: 25, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.32, typeMatchPreference: 0.35, initialFriendship: 25, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.44, typeMatchPreference: 0.35, initialFriendship: 25, specialEffect: 0.50 },
      { baseStats: 0.65, trainingBonus: 1.00, appearanceRate: 0.44, typeMatchPreference: 0.35, initialFriendship: 25, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.44, typeMatchPreference: 0.35, initialFriendship: 25, specialEffect: 1.00 }
    ]
  },

  // ============================================================================
  // COMMON TIER - Minimal progressions, usable from the start
  // ============================================================================

  Whitney: {
    // LB0: Goldenrod's Normal gym leader - high friendship, HP support, no special effect
    // LB1: BIG JUMP trainingBonus (0.80→1.00) - Training mastery unlocked
    // LB2: BIG JUMP appearanceRate (0.55→0.62) - Always available
    // LB3: BIG JUMP initialFriendship (40→50) - Instant max friendship
    // LB4: BIG JUMP typeMatchPreference (0.15→0.25) - Type mastery
    progression: [
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.55, typeMatchPreference: 0.15, initialFriendship: 40, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.15, initialFriendship: 40, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.62, typeMatchPreference: 0.15, initialFriendship: 40, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.62, typeMatchPreference: 0.15, initialFriendship: 50, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.62, typeMatchPreference: 0.25, initialFriendship: 50, specialEffect: 1 }
    ]
  },

  Chuck: {
    // LB0: Cianwood's Fighting gym leader - low friendship, Attack support, strong type focus
    // LB1: BIG JUMP typeMatchPreference (0.22→0.30) - Fighting mastery
    // LB2: BIG JUMP trainingBonus (0.80→1.00) - Training intensity peaks
    // LB3: BIG JUMP appearanceRate (0.28→0.35) - More available for training
    // LB4: BIG JUMP initialFriendship (5→15) - Finally warms up
    progression: [
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.28, typeMatchPreference: 0.22, initialFriendship: 5, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.28, typeMatchPreference: 0.30, initialFriendship: 5, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.28, typeMatchPreference: 0.30, initialFriendship: 5, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.30, initialFriendship: 5, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.35, typeMatchPreference: 0.30, initialFriendship: 15, specialEffect: 1 }
    ]
  },

  Pryce: {
    // LB0: Mahogany's Ice gym leader - Defense support, recovery special (maxEnergyBonus, restBonus)
    // LB1: BIG JUMP specialEffect (0.50→1.00) - Recovery power surge
    // LB2: BIG JUMP appearanceRate (0.45→0.55) - More available
    // LB3: BIG JUMP initialFriendship (35→45) - Deep bond formed
    // LB4: BIG JUMP trainingBonus (0.80→1.00) - Full elder wisdom
    progression: [
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.45, typeMatchPreference: 0.10, initialFriendship: 35, specialEffect: 0.50 },
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.45, typeMatchPreference: 0.10, initialFriendship: 35, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.55, typeMatchPreference: 0.10, initialFriendship: 35, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.55, typeMatchPreference: 0.10, initialFriendship: 45, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.55, typeMatchPreference: 0.10, initialFriendship: 45, specialEffect: 1.00 }
    ]
  },

  Wattson: {
    // LB0: Mauville's Electric gym leader - Instinct support, jovial old man, no special effect
    // LB1: BIG JUMP typeMatchPreference (0.18→0.25) - Electric mastery
    // LB2: BIG JUMP trainingBonus (0.80→1.00) - Training expertise
    // LB3: BIG JUMP appearanceRate (0.40→0.48) - Always around laughing
    // LB4: BIG JUMP initialFriendship (35→48) - Best grandpa energy
    progression: [
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.40, typeMatchPreference: 0.18, initialFriendship: 35, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.40, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.25, initialFriendship: 35, specialEffect: 1 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.48, typeMatchPreference: 0.25, initialFriendship: 48, specialEffect: 1 }
    ]
  },

  Flannery: {
    // LB0: Lavaridge's Fire gym leader - Attack support, special (statGainMultiplier, failRateReduction)
    // LB1: BIG JUMP initialFriendship (15→28) - Fiery friendship sparks
    // LB2: BIG JUMP typeMatchPreference (0.26→0.35) - Fire mastery
    // LB3: BIG JUMP appearanceRate (0.32→0.40) - More available
    // LB4: BIG JUMP trainingBonus (0.80→1.00) - Full fiery power
    progression: [
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.32, typeMatchPreference: 0.26, initialFriendship: 15, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.32, typeMatchPreference: 0.26, initialFriendship: 28, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.32, typeMatchPreference: 0.35, initialFriendship: 28, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 0.80, appearanceRate: 0.40, typeMatchPreference: 0.35, initialFriendship: 28, specialEffect: 1.00 },
      { baseStats: 1.00, trainingBonus: 1.00, appearanceRate: 0.40, typeMatchPreference: 0.35, initialFriendship: 28, specialEffect: 1.00 }
    ]
  }
};

const normalizeSupportName = (supportName) => {
  return LEGACY_SUPPORT_NAME_MAP[supportName] || supportName;
};

const getSupportAtLimitBreak = (supportName, limitBreakLevel = 4) => {
  const normalizedName = normalizeSupportName(supportName);
  const baseCard = SUPPORT_CARDS[normalizedName];
  if (!baseCard) return null;

  // Clamp limit break level
  const lb = Math.max(0, Math.min(4, limitBreakLevel));

  // If at max LB or no progression defined, return base card
  const progression = SUPPORT_LIMIT_BREAK_PROGRESSIONS[normalizedName];
  if (lb === 4 || !progression) return baseCard;

  const lbData = progression.progression[lb];
  if (!lbData) return baseCard;

  // Apply multipliers to base stats
  const adjustedBaseStats = {};
  for (const [stat, value] of Object.entries(baseCard.baseStats)) {
    adjustedBaseStats[stat] = Math.floor(value * lbData.baseStats);
  }

  // Apply multipliers to training bonuses
  const adjustedTrainingBonus = {
    typeMatch: Math.floor(baseCard.trainingBonus.typeMatch * lbData.trainingBonus),
    otherStats: Math.max(1, Math.floor(baseCard.trainingBonus.otherStats * lbData.trainingBonus)),
    maxFriendshipTypeMatch: Math.floor(baseCard.trainingBonus.maxFriendshipTypeMatch * lbData.trainingBonus)
  };

  // Handle special effects
  let adjustedSpecialEffect = null;
  if (baseCard.specialEffect && lbData.specialEffect > 0) {
    adjustedSpecialEffect = {};

    // Integer bonus effects that should be rounded
    const integerBonusEffects = ['maxEnergyBonus', 'restBonus', 'friendshipGainBonus', 'energyRegenBonus', 'energyCostReduction'];

    for (const [effect, value] of Object.entries(baseCard.specialEffect)) {
      if (typeof value === 'number') {
        // For multiplier effects, scale the bonus portion
        if (effect.includes('Multiplier')) {
          const bonus = value - 1.0;
          adjustedSpecialEffect[effect] = 1.0 + (bonus * lbData.specialEffect);
        } else if (integerBonusEffects.includes(effect)) {
          // For flat integer bonuses, scale and round
          adjustedSpecialEffect[effect] = Math.round(value * lbData.specialEffect);
        } else {
          // For percentage-based effects (failRateReduction, etc.), keep decimal precision
          adjustedSpecialEffect[effect] = value * lbData.specialEffect;
        }
      } else {
        adjustedSpecialEffect[effect] = value;
      }
    }

    // Check if any effect is meaningful
    const hasSignificantEffect = Object.entries(adjustedSpecialEffect).some(([key, val]) => {
      if (key.includes('Multiplier')) return val > 1.005;
      if (integerBonusEffects.includes(key)) return val > 0;
      return val > 0.001; // For percentage effects, check if > 0.1%
    });
    if (!hasSignificantEffect) adjustedSpecialEffect = null;
  }

  return {
    ...baseCard,
    baseStats: adjustedBaseStats,
    trainingBonus: adjustedTrainingBonus,
    appearanceRate: lbData.appearanceRate,
    typeMatchPreference: lbData.typeMatchPreference,
    initialFriendship: lbData.initialFriendship,
    specialEffect: adjustedSpecialEffect,
    _limitBreakLevel: lb,
    _isMaxLimitBreak: false
  };
};

const SUPPORT_GACHA_RARITY = {
  Common: {
    rate: 0.50,
    supports: ['Whitney', 'Chuck', 'Pryce', 'Wattson', 'Flannery']
  },
  Uncommon: {
    rate: 0.35,
    supports: ['Misty', 'Brock', 'Erika', 'Blaine', 'Koga',
               'Jasmine', 'Winona', 'Agatha', 'Geeta',
               'Milo', 'Kabu', 'Melony', 'Gordie',
               'Klara', 'Kieran', 'Iono', 'Grusha']
  },
  Rare: {
    rate: 0.13,
    supports: ['Lance', 'Sabrina', 'Morty', 'Wallace',
               'Iris', 'Blue', 'Giovanni',
               'Maxie', 'Archie', 'Raihan', 'Marnie',
               'Nessa', 'Bea', 'Victor', 'Piers',
               'Sonia', 'Poppy']
  },
  Legendary: {
    rate: 0.02,
    supports: ['Cynthia', 'Red', 'Steven', 'N',
               'ProfessorOak', 'Diantha', 'Leon', 'Selene',
               'Gloria', 'Nemona', 'Mustard', 'Opal',
               'Arven', 'Penny', 'Rika', 'Hop',
               'Karen', 'Avery', 'Carmine', 'Drayton',
               'Lacey']
  }
};

module.exports = {
  SUPPORT_CARDS,
  LEGACY_SUPPORT_NAME_MAP,
  SUPPORT_LIMIT_BREAK_PROGRESSIONS,
  normalizeSupportName,
  getSupportAtLimitBreak,
  SUPPORT_GACHA_RARITY
};
