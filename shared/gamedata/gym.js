/**
 * GYM LEADERS AND ELITE FOUR
 * Boss battle Pokemon definitions
 */

const GYM_LEADER_POKEMON = {
  BlaineArcanine: {
    name: 'Arcanine',
    primaryType: 'Fire',
    baseStats: { HP: 130, Attack: 110, Defense: 85, Instinct: 80, Speed: 95 },
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'B', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Flamethrower', 'FireFang', 'FlareBlitz'],
    learnableAbilities: ['FireBlast', 'HyperBeam', 'Crunch']
  },
  MistyStarmie: {
    name: 'Starmie',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 85, Defense: 90, Instinct: 115, Speed: 95 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'A', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Surf', 'Psychic', 'IceBeam'],
    learnableAbilities: ['HydroPump', 'PsychicBlast', 'Thunderbolt']
  },
  ErikaVileplume: {
    name: 'Vileplume',
    primaryType: 'Grass',
    baseStats: { HP: 125, Attack: 90, Defense: 95, Instinct: 100, Speed: 65 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'A', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['GigaDrain', 'SludgeBomb', 'SolarBeam'],
    learnableAbilities: ['LeafStorm', 'SwordsDance', 'Moonblast']
  },
  SurgeRaichu: {
    name: 'Raichu',
    primaryType: 'Electric',
    baseStats: { HP: 110, Attack: 95, Defense: 70, Instinct: 95, Speed: 120 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'B', Psychic: 'C', Electric: 'S', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Thunderbolt', 'Thunder', 'VoltSwitch'],
    learnableAbilities: ['WildCharge', 'FocusBlast', 'Nastyplot']
  },
  AgathaNidoking: {
    name: 'Nidoking',
    primaryType: 'Fighting',
    baseStats: { HP: 125, Attack: 110, Defense: 85, Instinct: 85, Speed: 90 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'B', Psychic: 'A', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Earthquake', 'SludgeBomb', 'IceBeam'],
    learnableAbilities: ['Megahorn', 'Thunderbolt', 'ShadowBall']
  },
  GiovanniRapidash: {
    name: 'Rapidash',
    primaryType: 'Fire',
    baseStats: { HP: 115, Attack: 105, Defense: 75, Instinct: 85, Speed: 115 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'B', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['FlareBlitz', 'Flamethrower', 'IronTail'],
    learnableAbilities: ['Megahorn', 'HyperBeam', 'SolarBeam']
  },
  WallaceLapras: {
    name: 'Lapras',
    primaryType: 'Water',
    baseStats: { HP: 150, Attack: 90, Defense: 95, Instinct: 100, Speed: 65 },
    typeAptitudes: { Fire: 'C', Water: 'S', Grass: 'D', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['HydroPump', 'IceBeam', 'Blizzard'],
    learnableAbilities: ['Surf', 'Thunderbolt', 'IronDefense']
  },
  WattsonElectabuzz: {
    name: 'Electabuzz',
    primaryType: 'Electric',
    baseStats: { HP: 115, Attack: 93, Defense: 67, Instinct: 95, Speed: 115 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'B', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Thunderbolt', 'ThunderShock', 'WildCharge'],
    learnableAbilities: ['Thunder', 'FocusBlast', 'Psychic']
  },
  WillWeezing: {
    name: 'Weezing',
    primaryType: 'Psychic',
    baseStats: { HP: 115, Attack: 95, Defense: 135, Instinct: 85, Speed: 65 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['SludgeBomb', 'ShadowBall', 'DarkPulse'],
    learnableAbilities: ['Flamethrower', 'WillOWisp', 'IronDefense']
  },
  FlanneryMagmar: {
    name: 'Magmar',
    primaryType: 'Fire',
    baseStats: { HP: 115, Attack: 105, Defense: 67, Instinct: 105, Speed: 103 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'B', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Flamethrower', 'LavaPlume', 'FireBlast'],
    learnableAbilities: ['Psychic', 'ThunderPunch', 'CrossChop']
  },
  SabrinaArbok: {
    name: 'Arbok',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 100, Defense: 79, Instinct: 79, Speed: 85 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['SludgeBomb', 'DarkPulse', 'Psychic'],
    learnableAbilities: ['Earthquake', 'Crunch', 'GunkShot']
  },
  JuanVaporeon: {
    name: 'Vaporeon',
    primaryType: 'Water',
    baseStats: { HP: 150, Attack: 75, Defense: 70, Instinct: 115, Speed: 75 },
    typeAptitudes: { Fire: 'C', Water: 'S', Grass: 'D', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['HydroPump', 'Surf', 'IceBeam'],
    learnableAbilities: ['ShadowBall', 'AquaRing', 'AcidArmor']
  },
  WinonaExeggutor: {
    name: 'Exeggutor',
    primaryType: 'Grass',
    baseStats: { HP: 135, Attack: 100, Defense: 90, Instinct: 135, Speed: 55 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'A', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['SolarBeam', 'Psychic', 'GigaDrain'],
    learnableAbilities: ['LeafStorm', 'PsychicBlast', 'SludgeBomb']
  },
  // ============================================================================
  // COMMON TIER SUPPORTS AS GYM LEADERS
  // ============================================================================
  WhitneyMiltank: {
    name: 'Miltank',
    primaryType: 'Normal',
    baseStats: { HP: 140, Attack: 90, Defense: 115, Instinct: 65, Speed: 85 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['BodySlam', 'IronHead', 'Earthquake'],
    learnableAbilities: ['HyperBeam', 'StoneEdge', 'IronDefense']
  },
  ChuckPoliwrath: {
    name: 'Poliwrath',
    primaryType: 'Fighting',
    baseStats: { HP: 130, Attack: 105, Defense: 100, Instinct: 80, Speed: 80 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['CloseCombat', 'Surf', 'IceBeam'],
    learnableAbilities: ['HydroPump', 'Earthquake', 'BulkUp']
  },
  PryceDelibird: {
    name: 'Piloswine',
    primaryType: 'Water',
    baseStats: { HP: 140, Attack: 105, Defense: 95, Instinct: 70, Speed: 65 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Blizzard', 'Earthquake', 'IceBeam'],
    learnableAbilities: ['StoneEdge', 'IronHead', 'AncientPower']
  },

  // ============================================================================
  // UNCOMMON TIER SUPPORTS AS GYM LEADERS
  // ============================================================================
  BrockOnix: {
    name: 'Golem',
    primaryType: 'Fighting',
    baseStats: { HP: 125, Attack: 115, Defense: 140, Instinct: 60, Speed: 55 },
    typeAptitudes: { Fire: 'B', Water: 'D', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Earthquake', 'StoneEdge', 'RockSlide'],
    learnableAbilities: ['IronHead', 'Explosion', 'IronDefense']
  },
  KogaMuk: {
    name: 'Muk',
    primaryType: 'Psychic',
    baseStats: { HP: 145, Attack: 115, Defense: 90, Instinct: 75, Speed: 65 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'B', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'A', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['SludgeBomb', 'DarkPulse', 'ShadowBall'],
    learnableAbilities: ['Explosion', 'Flamethrower', 'IceBeam']
  },
  JasmineSteelix: {
    name: 'Steelix',
    primaryType: 'Fighting',
    baseStats: { HP: 120, Attack: 95, Defense: 200, Instinct: 70, Speed: 40 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'B', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'S', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['IronTail', 'Earthquake', 'StoneEdge'],
    learnableAbilities: ['IronHead', 'DragonTail', 'IronDefense']
  },
  KarenUmbreon: {
    name: 'Umbreon',
    primaryType: 'Psychic',
    baseStats: { HP: 145, Attack: 75, Defense: 130, Instinct: 115, Speed: 75 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'S', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['DarkPulse', 'ShadowBall', 'Psychic'],
    learnableAbilities: ['Moonblast', 'IronDefense', 'Curse']
  },
  MiloEldegoss: {
    name: 'Eldegoss',
    primaryType: 'Grass',
    baseStats: { HP: 115, Attack: 65, Defense: 100, Instinct: 105, Speed: 80 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['GigaDrain', 'LeafStorm', 'SolarBeam'],
    learnableAbilities: ['SludgeBomb', 'CottonGuard', 'Moonblast']
  },
  KabuCentiskorch: {
    name: 'Centiskorch',
    primaryType: 'Fire',
    baseStats: { HP: 140, Attack: 125, Defense: 80, Instinct: 75, Speed: 75 },
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'B', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['FlareBlitz', 'FireBlast', 'Crunch'],
    learnableAbilities: ['LavaPlume', 'PowerWhip', 'HyperBeam']
  },
  MelonyLapras: {
    name: 'Froslass',
    primaryType: 'Water',
    baseStats: { HP: 100, Attack: 90, Defense: 80, Instinct: 110, Speed: 110 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Blizzard', 'ShadowBall', 'IceBeam'],
    learnableAbilities: ['Psychic', 'Thunderbolt', 'DestinyBond']
  },
  GordieCoalossal: {
    name: 'Coalossal',
    primaryType: 'Fire',
    baseStats: { HP: 150, Attack: 95, Defense: 140, Instinct: 65, Speed: 40 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'S', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['FlareBlitz', 'StoneEdge', 'Earthquake'],
    learnableAbilities: ['FireBlast', 'IronHead', 'IronDefense']
  },
  KlaraSlowbro: {
    name: 'Slowbro',
    primaryType: 'Psychic',
    baseStats: { HP: 135, Attack: 85, Defense: 130, Instinct: 105, Speed: 40 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Psychic', 'Surf', 'SludgeBomb'],
    learnableAbilities: ['IceBeam', 'Flamethrower', 'IronDefense']
  },
  AverySlowking: {
    name: 'Slowking',
    primaryType: 'Psychic',
    baseStats: { HP: 135, Attack: 85, Defense: 95, Instinct: 130, Speed: 40 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'S', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'A', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsychicBlast', 'Surf', 'ShadowBall'],
    learnableAbilities: ['IceBeam', 'Flamethrower', 'CalmMind']
  },
  IonoBellibolt: {
    name: 'Bellibolt',
    primaryType: 'Electric',
    baseStats: { HP: 160, Attack: 85, Defense: 100, Instinct: 105, Speed: 45 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'C', Electric: 'S', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Thunder', 'Thunderbolt', 'Surf'],
    learnableAbilities: ['WildCharge', 'SludgeBomb', 'IronDefense']
  },
  GrushaAltaria: {
    name: 'Altaria',
    primaryType: 'Grass',
    baseStats: { HP: 115, Attack: 80, Defense: 105, Instinct: 105, Speed: 85 },
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'B', Psychic: 'C', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['DragonPulse', 'Moonblast', 'IceBeam'],
    learnableAbilities: ['DragonDance', 'SkyAttack', 'Earthquake']
  },

  // ============================================================================
  // RARE TIER SUPPORTS AS GYM LEADERS
  // ============================================================================
  MortyGengar: {
    name: 'Gengar',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 130, Defense: 70, Instinct: 140, Speed: 120 },
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'C', Psychic: 'S', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['ShadowBall', 'Psychic', 'DarkPulse'],
    learnableAbilities: ['SludgeBomb', 'Hypnosis', 'DreamEater']
  },
  IrisHaxorus: {
    name: 'Haxorus',
    primaryType: 'Fighting',
    baseStats: { HP: 120, Attack: 155, Defense: 100, Instinct: 65, Speed: 105 },
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'B', Psychic: 'C', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'D', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['DragonClaw', 'Earthquake', 'IronHead'],
    learnableAbilities: ['DragonDance', 'Outrage', 'StoneEdge']
  },
  BlueBlastoise: {
    name: 'Blastoise',
    primaryType: 'Water',
    baseStats: { HP: 129, Attack: 93, Defense: 120, Instinct: 95, Speed: 88 },
    typeAptitudes: { Fire: 'C', Water: 'S', Grass: 'D', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['HydroPump', 'IceBeam', 'DragonPulse'],
    learnableAbilities: ['Surf', 'Earthquake', 'IronDefense']
  },
  MaxieCamerupt: {
    name: 'Camerupt',
    primaryType: 'Fire',
    baseStats: { HP: 130, Attack: 115, Defense: 90, Instinct: 115, Speed: 45 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Eruption', 'Earthquake', 'LavaPlume'],
    learnableAbilities: ['FlareBlitz', 'StoneEdge', 'IronHead']
  },
  ArchieSharpedo: {
    name: 'Sharpedo',
    primaryType: 'Water',
    baseStats: { HP: 100, Attack: 140, Defense: 55, Instinct: 105, Speed: 105 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'S', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['HydroPump', 'Crunch', 'IceBeam'],
    learnableAbilities: ['Surf', 'DarkPulse', 'Earthquake']
  },
  RaihanDuraludon: {
    name: 'Duraludon',
    primaryType: 'Electric',
    baseStats: { HP: 100, Attack: 105, Defense: 125, Instinct: 135, Speed: 85 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['DragonPulse', 'Thunderbolt', 'IronHead'],
    learnableAbilities: ['FlashCannon', 'DracoMeteor', 'BodyPress']
  },
  MarnieGrimmsnarl: {
    name: 'Grimmsnarl',
    primaryType: 'Psychic',
    baseStats: { HP: 135, Attack: 130, Defense: 75, Instinct: 90, Speed: 70 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['DarkPulse', 'PlayRough', 'ShadowBall'],
    learnableAbilities: ['BulkUp', 'IronHead', 'DrainPunch']
  },
  NessaDrednaw: {
    name: 'Drednaw',
    primaryType: 'Water',
    baseStats: { HP: 130, Attack: 125, Defense: 110, Instinct: 70, Speed: 80 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['HydroPump', 'StoneEdge', 'Crunch'],
    learnableAbilities: ['Surf', 'Earthquake', 'IronDefense']
  },
  BeaSirfetchd: {
    name: 'Sirfetchd',
    primaryType: 'Fighting',
    baseStats: { HP: 112, Attack: 145, Defense: 105, Instinct: 68, Speed: 75 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'B', Psychic: 'D', Electric: 'C', Fighting: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'C', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['CloseCombat', 'LeafBlade', 'BraveBird'],
    learnableAbilities: ['SwordsDance', 'IronHead', 'KnockOff']
  },
  OpalAlcremie: {
    name: 'Alcremie',
    primaryType: 'Psychic',
    baseStats: { HP: 115, Attack: 70, Defense: 85, Instinct: 130, Speed: 75 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'B', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'B', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Moonblast', 'DazzlingGleam', 'Psychic'],
    learnableAbilities: ['CalmMind', 'Recover', 'Encore']
  },
  PiersObstagoon: {
    name: 'Obstagoon',
    primaryType: 'Psychic',
    baseStats: { HP: 128, Attack: 110, Defense: 105, Instinct: 70, Speed: 102 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['DarkPulse', 'CloseCombat', 'ShadowBall'],
    learnableAbilities: ['IronHead', 'IceBeam', 'Earthquake']
  },
  RikaClodsire: {
    name: 'Clodsire',
    primaryType: 'Fighting',
    baseStats: { HP: 175, Attack: 85, Defense: 105, Instinct: 75, Speed: 30 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'B', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'S', Nuker: 'D', Debuffer: 'A', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Earthquake', 'SludgeBomb', 'Surf'],
    learnableAbilities: ['IceBeam', 'IronDefense', 'Recover']
  },
  PoppyTinkaton: {
    name: 'Tinkaton',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 85, Defense: 90, Instinct: 100, Speed: 104 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'B', Electric: 'B', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PlayRough', 'IronHead', 'StoneEdge'],
    learnableAbilities: ['SwordsDance', 'DrainPunch', 'Thunderbolt']
  },

  // ============================================================================
  // LEGENDARY TIER SUPPORTS AS GYM LEADERS
  // ============================================================================
  CynthiaGarchomp: {
    name: 'Garchomp',
    primaryType: 'Fighting',
    baseStats: { HP: 148, Attack: 140, Defense: 105, Instinct: 90, Speed: 112 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['Earthquake', 'DragonClaw', 'StoneEdge'],
    learnableAbilities: ['DragonDance', 'Outrage', 'IronHead']
  },
  RedCharizard: {
    name: 'Charizard',
    primaryType: 'Fire',
    baseStats: { HP: 128, Attack: 94, Defense: 88, Instinct: 115, Speed: 120 },
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'B', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['FlareBlitz', 'AirSlash', 'DragonPulse'],
    learnableAbilities: ['BlastBurn', 'DragonDance', 'Earthquake']
  },
  StevenMetagross: {
    name: 'Metagross',
    primaryType: 'Psychic',
    baseStats: { HP: 130, Attack: 145, Defense: 140, Instinct: 100, Speed: 80 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'B', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['IronHead', 'Psychic', 'Earthquake'],
    learnableAbilities: ['MeteorMash', 'ZenHeadbutt', 'IronDefense']
  },
  NReshiram: {
    name: 'Reshiram',
    primaryType: 'Fire',
    baseStats: { HP: 140, Attack: 135, Defense: 105, Instinct: 145, Speed: 100 },
    typeAptitudes: { Fire: 'S', Water: 'C', Grass: 'C', Psychic: 'B', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'S', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['BlueFlare', 'DragonPulse', 'AncientPower'],
    learnableAbilities: ['DracoMeteor', 'FlareBlitz', 'Psychic']
  },
  ProfessorOakDragonite: {
    name: 'Dragonite',
    primaryType: 'Fighting',
    baseStats: { HP: 141, Attack: 144, Defense: 105, Instinct: 110, Speed: 90 },
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'B', Psychic: 'C', Electric: 'B', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['DragonClaw', 'ExtremeSpeed', 'Earthquake'],
    learnableAbilities: ['DragonDance', 'Outrage', 'IceBeam']
  },
  DianthaDiancie: {
    name: 'Gardevoir',
    primaryType: 'Psychic',
    baseStats: { HP: 118, Attack: 75, Defense: 75, Instinct: 145, Speed: 90 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'S', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['Psychic', 'Moonblast', 'ShadowBall'],
    learnableAbilities: ['DracoMeteor', 'CalmMind', 'Hypnosis']
  },
  LeonCharizardGmax: {
    name: 'Charizard',
    primaryType: 'Fire',
    baseStats: { HP: 138, Attack: 104, Defense: 98, Instinct: 125, Speed: 110 },
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'B', Psychic: 'C', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'S', Debuffer: 'C', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['BlastBurn', 'AirSlash', 'DragonPulse'],
    learnableAbilities: ['FlareBlitz', 'DragonDance', 'SolarBeam']
  },
  SeleneLunala: {
    name: 'Lunala',
    primaryType: 'Psychic',
    baseStats: { HP: 147, Attack: 123, Defense: 99, Instinct: 147, Speed: 107 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'S', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsychicBlast', 'ShadowBall', 'Moonblast'],
    learnableAbilities: ['DracoMeteor', 'IceBeam', 'CalmMind']
  },
  GloriaZacian: {
    name: 'Zacian',
    primaryType: 'Psychic',
    baseStats: { HP: 142, Attack: 150, Defense: 125, Instinct: 90, Speed: 148 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'B', Electric: 'B', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['IronHead', 'PlayRough', 'CloseCombat'],
    learnableAbilities: ['SwordsDance', 'DragonClaw', 'WildCharge']
  },
  NemonaKoraidon: {
    name: 'Koraidon',
    primaryType: 'Fighting',
    baseStats: { HP: 140, Attack: 155, Defense: 100, Instinct: 95, Speed: 155 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'C', Chipper: 'A', MadLad: 'S' },
    defaultAbilities: ['CloseCombat', 'DragonClaw', 'FlareBlitz'],
    learnableAbilities: ['DragonDance', 'Outrage', 'Earthquake']
  },
  MustardUrshifu: {
    name: 'Urshifu',
    primaryType: 'Fighting',
    baseStats: { HP: 140, Attack: 140, Defense: 105, Instinct: 75, Speed: 107 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'B', Electric: 'C', Fighting: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'S', Debuffer: 'C', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['CloseCombat', 'DarkPulse', 'Surf'],
    learnableAbilities: ['DrainPunch', 'IronHead', 'Earthquake']
  },
  VictorCalyrex: {
    name: 'Calyrex',
    primaryType: 'Psychic',
    baseStats: { HP: 140, Attack: 90, Defense: 90, Instinct: 155, Speed: 100 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'B', Psychic: 'S', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Psychic', 'GigaDrain', 'ShadowBall'],
    learnableAbilities: ['CalmMind', 'DracoMeteor', 'Recover']
  },
  ArvenMabosstiff: {
    name: 'Mabosstiff',
    primaryType: 'Psychic',
    baseStats: { HP: 150, Attack: 130, Defense: 95, Instinct: 70, Speed: 75 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['DarkPulse', 'Crunch', 'PlayRough'],
    learnableAbilities: ['CloseCombat', 'IronHead', 'DrainPunch']
  },
  PennySylveon: {
    name: 'Sylveon',
    primaryType: 'Psychic',
    baseStats: { HP: 135, Attack: 75, Defense: 75, Instinct: 140, Speed: 70 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'B', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'B', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['Moonblast', 'Psychic', 'ShadowBall'],
    learnableAbilities: ['CalmMind', 'DrainingKiss', 'HyperVoice']
  },
  SoniaBoltund: {
    name: 'Boltund',
    primaryType: 'Electric',
    baseStats: { HP: 109, Attack: 100, Defense: 70, Instinct: 85, Speed: 131 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['WildCharge', 'Thunderbolt', 'PlayRough'],
    learnableAbilities: ['Thunder', 'Crunch', 'VoltSwitch']
  },
  HopZamazenta: {
    name: 'Zamazenta',
    primaryType: 'Fighting',
    baseStats: { HP: 142, Attack: 140, Defense: 150, Instinct: 90, Speed: 138 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'B', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['CloseCombat', 'IronHead', 'PlayRough'],
    learnableAbilities: ['IronDefense', 'Crunch', 'WildCharge']
  },
  GeetaKingambit: {
    name: 'Kingambit',
    primaryType: 'Psychic',
    baseStats: { HP: 140, Attack: 150, Defense: 130, Instinct: 75, Speed: 50 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'S', Debuffer: 'C', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['IronHead', 'DarkPulse', 'CloseCombat'],
    learnableAbilities: ['SwordsDance', 'StoneEdge', 'Earthquake']
  },
  KieranTerapagos: {
    name: 'Terapagos',
    primaryType: 'Psychic',
    baseStats: { HP: 150, Attack: 100, Defense: 130, Instinct: 120, Speed: 80 },
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'B', Psychic: 'B', Electric: 'B', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'B', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Psychic', 'EarthPower', 'IceBeam'],
    learnableAbilities: ['DracoMeteor', 'Flamethrower', 'Recover']
  },
  CarmineOgerpon: {
    name: 'Ogerpon',
    primaryType: 'Grass',
    baseStats: { HP: 120, Attack: 140, Defense: 100, Instinct: 70, Speed: 130 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'S', Psychic: 'C', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['LeafBlade', 'PlayRough', 'CloseCombat'],
    learnableAbilities: ['SwordsDance', 'PowerWhip', 'DrainPunch']
  },
  DraytonArchaludon: {
    name: 'Archaludon',
    primaryType: 'Electric',
    baseStats: { HP: 120, Attack: 105, Defense: 145, Instinct: 135, Speed: 85 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Thunderbolt', 'DragonPulse', 'IronHead'],
    learnableAbilities: ['DracoMeteor', 'FlashCannon', 'BodyPress']
  },
  LaceyExcadrill: {
    name: 'Excadrill',
    primaryType: 'Fighting',
    baseStats: { HP: 130, Attack: 145, Defense: 70, Instinct: 55, Speed: 108 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'B', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['Earthquake', 'IronHead', 'RockSlide'],
    learnableAbilities: ['SwordsDance', 'StoneEdge', 'DrillRun']
  }
};

const ELITE_FOUR = [
  {
    name: 'Lorelei',
    type: 'Water',
    pokemon: {
      name: 'Cloyster',
      primaryType: 'Water',
      baseStats: { HP: 120, Attack: 100, Defense: 180, Instinct: 90, Speed: 70 },
      typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'B', Electric: 'C', Fighting: 'C' },
      strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
      defaultAbilities: ['HydroPump', 'Blizzard', 'IceBeam'],
      learnableAbilities: ['ShellSmash', 'Surf', 'RockBlast']
    }
  },
  {
    name: 'Bruno',
    type: 'Fighting',
    pokemon: {
      name: 'Machamp',
      primaryType: 'Fighting',
      baseStats: { HP: 140, Attack: 145, Defense: 95, Instinct: 75, Speed: 65 },
      typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'S' },
      strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
      defaultAbilities: ['CloseCombat', 'Earthquake', 'StoneEdge'],
      learnableAbilities: ['DynamicPunch', 'BulkUp', 'KnockOff']
    }
  },
  {
    name: 'Agatha',
    type: 'Psychic',
    pokemon: {
      name: 'Gengar',
      primaryType: 'Psychic',
      baseStats: { HP: 110, Attack: 140, Defense: 70, Instinct: 145, Speed: 130 },
      typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'C', Psychic: 'S', Electric: 'D', Fighting: 'B' },
      strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
      defaultAbilities: ['ShadowBall', 'PsychicBlast', 'DarkPulse'],
      learnableAbilities: ['SludgeBomb', 'FocusBlast', 'Thunderbolt']
    }
  },
  {
    name: 'Lance',
    type: 'Fighting',
    pokemon: {
      name: 'Dragonite',
      primaryType: 'Fighting',
      baseStats: { HP: 145, Attack: 145, Defense: 100, Instinct: 110, Speed: 90 },
      typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'B', Electric: 'A', Fighting: 'S' },
      strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
      defaultAbilities: ['DragonClaw', 'HyperBeam', 'Earthquake'],
      learnableAbilities: ['FireBlast', 'Thunder', 'Outrage']
    }
  }
];

module.exports = {
  GYM_LEADER_POKEMON,
  ELITE_FOUR
};
