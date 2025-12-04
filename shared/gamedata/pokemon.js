/**
 * POKEMON DATABASE
 * All Pokemon definitions with stats, types, abilities, etc.
 */

const { calculateBaseStats } = require('./config');

const POKEMON = {
  // Original 5 starter pokemons
  Charmander: {
    name: 'Charmander',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 93, Attack: 68, Defense: 58, Instinct: 78, Speed: 83 }, 2),
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'C', Psychic: 'B', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam', 'FireBlast', 'WaterGun', 'ThunderShock'],
    isStarter: true
  },
  Squirtle: {
    name: 'Squirtle',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 98, Attack: 59, Defense: 66, Instinct: 81, Speed: 76 }, 2),
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'B', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'C', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam', 'HydroPump', 'VineWhip', 'Ember'],
    isStarter: true
  },
  Bulbasaur: {
    name: 'Bulbasaur',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 100, Attack: 70, Defense: 70, Instinct: 75, Speed: 65 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'B', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam', 'SolarBeam', 'WaterGun', 'PsyBeam'],
    isStarter: true
  },
  Pikachu: {
    name: 'Pikachu',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 82, Attack: 57, Defense: 52, Instinct: 87, Speed: 102 }, 1),
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'B', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Tackle', 'QuickAttack', 'Thunderbolt', 'BodySlam', 'Thunder', 'BrickBreak', 'HyperBeam', 'Ember'],
    isStarter: true
  },
  Gastly: {
    name: 'Gastly',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 96, Attack: 81, Defense: 61, Instinct: 71, Speed: 71 }, 2),
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'C', Debuffer: 'A', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam', 'PsychicBlast', 'VineWhip', 'ThunderShock'],
    isStarter: true
  },
  
  // 25 Additional Wild Pokemons
  Growlithe: {
    name: 'Growlithe',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 88, Attack: 78, Defense: 53, Instinct: 73, Speed: 88 }, 1),
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'C', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Arcanine: {
    name: 'Arcanine',
    primaryType: 'Fire',
    baseStats: { HP: 106, Attack: 86, Defense: 71, Instinct: 61, Speed: 56 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'B', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Golduck: {
    name: 'Golduck',
    primaryType: 'Water',
    baseStats: { HP: 91, Attack: 61, Defense: 76, Instinct: 86, Speed: 66 },
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'E', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'F' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Lapras: {
    name: 'Lapras',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 111, Attack: 66, Defense: 81, Instinct: 76, Speed: 46 }, 0),
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'B', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'D', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Victreebel: {
    name: 'Victreebel',
    primaryType: 'Grass',
    baseStats: { HP: 96, Attack: 76, Defense: 81, Instinct: 66, Speed: 61 },
    typeAptitudes: { Fire: 'E', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Vileplume: {
    name: 'Vileplume',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 66, Defense: 66, Instinct: 81, Speed: 86 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'A', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'A', Chipper: 'E', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Zapdos: {
    name: 'Zapdos',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 76, Attack: 61, Defense: 56, Instinct: 91, Speed: 96 }, 0),
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'C', Psychic: 'B', Electric: 'S', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Raichu: {
    name: 'Raichu',
    primaryType: 'Electric',
    baseStats: { HP: 86, Attack: 71, Defense: 61, Instinct: 81, Speed: 81 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'B', Psychic: 'D', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Arbok: {
    name: 'Arbok',
    primaryType: 'Psychic',
    baseStats: { HP: 91, Attack: 86, Defense: 66, Instinct: 76, Speed: 61 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'D', Psychic: 'A', Electric: 'E', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Nidoking: {
    name: 'Nidoking',
    primaryType: 'Psychic',
    baseStats: { HP: 81, Attack: 91, Defense: 71, Instinct: 66, Speed: 71 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Rapidash: {
    name: 'Rapidash',
    primaryType: 'Fire',
    baseStats: { HP: 96, Attack: 81, Defense: 61, Instinct: 76, Speed: 66 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'B', Psychic: 'C', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'F' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Starmie: {
    name: 'Starmie',
    primaryType: 'Water',
    baseStats: { HP: 86, Attack: 71, Defense: 86, Instinct: 71, Speed: 66 },
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'E', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Exeggutor: {
    name: 'Exeggutor',
    primaryType: 'Grass',
    baseStats: { HP: 91, Attack: 61, Defense: 76, Instinct: 86, Speed: 66 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'A', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Jolteon: {
    name: 'Jolteon',
    primaryType: 'Electric',
    baseStats: { HP: 81, Attack: 64, Defense: 57, Instinct: 87, Speed: 91 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'B', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Muk: {
    name: 'Muk',
    primaryType: 'Psychic',
    baseStats: { HP: 101, Attack: 76, Defense: 66, Instinct: 81, Speed: 56 },
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'C', Psychic: 'A', Electric: 'E', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'B', Chipper: 'E', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Magmar: {
    name: 'Magmar',
    primaryType: 'Fire',
    baseStats: { HP: 99, Attack: 89, Defense: 66, Instinct: 69, Speed: 57 },
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'C', Psychic: 'B', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Vaporeon: {
    name: 'Vaporeon',
    primaryType: 'Water',
    baseStats: { HP: 93, Attack: 69, Defense: 79, Instinct: 79, Speed: 60 },
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'C', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Tangela: {
    name: 'Tangela',
    primaryType: 'Grass',
    baseStats: { HP: 89, Attack: 83, Defense: 69, Instinct: 73, Speed: 66 },
    typeAptitudes: { Fire: 'E', Water: 'C', Grass: 'A', Psychic: 'B', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'A', Chipper: 'E', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Electabuzz: {
    name: 'Electabuzz',
    primaryType: 'Electric',
    baseStats: { HP: 85, Attack: 71, Defense: 61, Instinct: 83, Speed: 80 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Weezing: {
    name: 'Weezing',
    primaryType: 'Psychic',
    baseStats: { HP: 94, Attack: 79, Defense: 69, Instinct: 75, Speed: 63 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'E', Debuffer: 'A', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Flareon: {
    name: 'Flareon',
    primaryType: 'Fire',
    baseStats: { HP: 88, Attack: 84, Defense: 59, Instinct: 73, Speed: 76 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'C', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Cloyster: {
    name: 'Cloyster',
    primaryType: 'Water',
    baseStats: { HP: 92, Attack: 65, Defense: 73, Instinct: 83, Speed: 67 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'B', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'F' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Parasect: {
    name: 'Parasect',
    primaryType: 'Grass',
    baseStats: { HP: 85, Attack: 79, Defense: 73, Instinct: 77, Speed: 66 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'E', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Magneton: {
    name: 'Magneton',
    primaryType: 'Electric',
    baseStats: { HP: 79, Attack: 69, Defense: 55, Instinct: 93, Speed: 94 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'B', Psychic: 'D', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam']
  },
  Tentacruel: {
    name: 'Tentacruel',
    primaryType: 'Psychic',
    baseStats: { HP: 97, Attack: 75, Defense: 71, Instinct: 69, Speed: 68 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'D', Psychic: 'A', Electric: 'E', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Mew: {
    name: 'Mew',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 100, Attack: 100, Defense: 100, Instinct: 100, Speed: 100 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['Tackle', 'Ember'],
    learnableAbilities: ['BodySlam', 'HyperBeam', 'Flamethrower', 'Surf', 'RazorLeaf', 'Thunderbolt', 'Psychic']
  },
  Mewtwo: {
    name: 'Mewtwo',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 106, Attack: 110, Defense: 90, Instinct: 154, Speed: 130 }, 0),
    typeAptitudes: { Fire: 'S', Water: 'S', Grass: 'S', Psychic: 'S', Electric: 'S', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'S', Debuffer: 'A', Chipper: 'B', MadLad: 'A' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['BodySlam', 'HyperBeam', 'Flamethrower', 'FireBlast', 'Surf', 'HydroPump', 'RazorLeaf', 'SolarBeam', 'Thunderbolt', 'Thunder', 'Psychic', 'PsychicBlast']
  },
  Snorlax: {
    name: 'Snorlax',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 160, Attack: 110, Defense: 65, Instinct: 65, Speed: 30 }, 0),
    typeAptitudes: { Fire: 'B', Water: 'B', Grass: 'B', Psychic: 'B', Electric: 'B', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'F', MadLad: 'D' },
    defaultAbilities: ['Tackle', 'BodySlam'],
    learnableAbilities: ['HyperBeam', 'Ember', 'WaterGun', 'VineWhip', 'ThunderShock']
  },
  
  // ============================================================================
  // COMMON TIER GACHA POKEMON
  // Common tier = low end of power variance within evolution tier
  // One evolution Pokemon: use calculateBaseStats with stages=1 (1.15x multiplier)
  // Two evolution Pokemon: use calculateBaseStats with stages=2 (1.00x multiplier)
  // Aptitudes: More C's and D's, one B at most for primary type/strategy
  // ============================================================================

  Rattata: {
    name: 'Rattata',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 65, Attack: 56, Defense: 45, Instinct: 55, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'TailWhip'],
    learnableAbilities: ['BodySlam', 'Swift', 'Return']
  },
  Meowth: {
    name: 'Meowth',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 68, Attack: 55, Defense: 48, Instinct: 58, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'C', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['PayDay', 'Slash', 'Bite'],
    learnableAbilities: ['BodySlam', 'Swift', 'Headbutt']
  },
  Sandshrew: {
    name: 'Sandshrew',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 70, Attack: 65, Defense: 72, Instinct: 48, Speed: 42 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'E', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'D', Chipper: 'F', MadLad: 'D' },
    defaultAbilities: ['Slash', 'Harden', 'SandAttack'],
    learnableAbilities: ['Earthquake', 'RockSlide', 'IronDefense']
  },
  Psyduck: {
    name: 'Psyduck',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 72, Attack: 52, Defense: 52, Instinct: 65, Speed: 56 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'E', Psychic: 'C', Electric: 'E', Fighting: 'E' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'Confusion', 'TailWhip'],
    learnableAbilities: ['Surf', 'Psyshock', 'AquaTail']
  },
  Poliwag: {
    name: 'Poliwag',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 68, Attack: 50, Defense: 50, Instinct: 55, Speed: 72 }, 2),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'BubbleBeam', 'Growl'],
    learnableAbilities: ['Surf', 'HydroPump', 'IceBeam']
  },
  Tentacool: {
    name: 'Tentacool',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 68, Attack: 52, Defense: 48, Instinct: 60, Speed: 70 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'C', Electric: 'E', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'B', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'BubbleBeam', 'Toxic'],
    learnableAbilities: ['Surf', 'AquaTail', 'SludgeBomb']
  },
  Shellder: {
    name: 'Shellder',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 62, Attack: 60, Defense: 85, Instinct: 52, Speed: 38 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'D', Chipper: 'F', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'Harden', 'IcePunch'],
    learnableAbilities: ['Surf', 'IceBeam', 'IronDefense']
  },
  Krabby: {
    name: 'Krabby',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 58, Attack: 78, Defense: 72, Instinct: 42, Speed: 48 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'E', Electric: 'E', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Harden', 'Slash'],
    learnableAbilities: ['Surf', 'Waterfall', 'IronDefense']
  },
  Oddish: {
    name: 'Oddish',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 70, Attack: 52, Defense: 58, Instinct: 62, Speed: 50 }, 2),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'E', Fighting: 'E' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'SleepPowder', 'MegaDrain'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'SludgeBomb']
  },
  Bellsprout: {
    name: 'Bellsprout',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 62, Attack: 68, Defense: 42, Instinct: 62, Speed: 58 }, 2),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'E', Fighting: 'E' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'B', Debuffer: 'D', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'RazorLeaf', 'Toxic'],
    learnableAbilities: ['SeedBomb', 'SolarBeam', 'SludgeBomb']
  },
  Paras: {
    name: 'Paras',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 60, Attack: 68, Defense: 58, Instinct: 55, Speed: 52 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'E', Fighting: 'E' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'Slash'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'CrossPoison']
  },
  Zubat: {
    name: 'Zubat',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 65, Attack: 55, Defense: 48, Instinct: 58, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'E', Grass: 'E', Psychic: 'A', Electric: 'E', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'E', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Confusion', 'Bite', 'Screech'],
    learnableAbilities: ['Psychic', 'ShadowBall', 'DarkPulse']
  },
  Grimer: {
    name: 'Grimer',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 75, Attack: 65, Defense: 52, Instinct: 58, Speed: 48 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'E', Grass: 'E', Psychic: 'A', Electric: 'E', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'C', Chipper: 'E', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Harden', 'Toxic'],
    learnableAbilities: ['Psychic', 'SludgeBomb', 'IronDefense']
  },
  Koffing: {
    name: 'Koffing',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 68, Attack: 60, Defense: 70, Instinct: 55, Speed: 45 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'E', Grass: 'E', Psychic: 'A', Electric: 'E', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Smokescreen', 'Toxic'],
    learnableAbilities: ['Psychic', 'SludgeBomb', 'DarkPulse']
  },
  Voltorb: {
    name: 'Voltorb',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 62, Attack: 50, Defense: 52, Instinct: 58, Speed: 78 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'E', Grass: 'E', Psychic: 'E', Electric: 'A', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'F', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Spark', 'Screech'],
    learnableAbilities: ['Thunderbolt', 'Discharge', 'Swift']
  },
  Magnemite: {
    name: 'Magnemite',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 55, Attack: 55, Defense: 68, Instinct: 72, Speed: 48 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'E', Grass: 'E', Psychic: 'E', Electric: 'A', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'D', Chipper: 'E', MadLad: 'E' },
    defaultAbilities: ['ThunderShock', 'Spark', 'FlashCannon'],
    learnableAbilities: ['Thunderbolt', 'ChargeBeam', 'Discharge']
  },
  Sentret: {
    name: 'Sentret',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 62, Attack: 55, Defense: 48, Instinct: 55, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'TailWhip'],
    learnableAbilities: ['BodySlam', 'Swift', 'Return']
  },
  Zigzagoon: {
    name: 'Zigzagoon',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 64, Attack: 52, Defense: 50, Instinct: 55, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Headbutt', 'Growl'],
    learnableAbilities: ['BodySlam', 'Swift', 'Return']
  },
  Bidoof: {
    name: 'Bidoof',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 72, Attack: 55, Defense: 55, Instinct: 52, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'F', Debuffer: 'D', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'Bite', 'Harden'],
    learnableAbilities: ['BodySlam', 'Waterfall', 'Return']
  },
  Lillipup: {
    name: 'Lillipup',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 68, Attack: 60, Defense: 52, Instinct: 55, Speed: 62 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'E', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'Bite', 'WorkUp'],
    learnableAbilities: ['BodySlam', 'Return', 'PlayRough']
  },
  
  // ============================================================================
  // UNCOMMON TIER GACHA POKEMON
  // Uncommon tier = mid-low range of power variance within evolution tier
  // One evolution Pokemon: use calculateBaseStats with stages=1 (1.15x multiplier)
  // Two evolution Pokemon: use calculateBaseStats with stages=2 (1.00x multiplier)
  // Aptitudes: One A for primary type/strategy, rest B's and C's
  // ============================================================================

  Vulpix: {
    name: 'Vulpix',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 65, Attack: 52, Defense: 48, Instinct: 68, Speed: 65 }, 1),
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'E', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'B', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['Ember', 'FlameBurst', 'Confide'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'WillOWisp']
  },
  Ponyta: {
    name: 'Ponyta',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 68, Attack: 72, Defense: 50, Instinct: 55, Speed: 75 }, 1),
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'B', Debuffer: 'E', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'Headbutt'],
    learnableAbilities: ['Flamethrower', 'FlareBlitz', 'Agility']
  },
  Houndour: {
    name: 'Houndour',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 62, Attack: 62, Defense: 48, Instinct: 68, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'E', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'B', Debuffer: 'D', Chipper: 'D', MadLad: 'C' },
    defaultAbilities: ['Ember', 'FireFang', 'DarkPulse'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'ShadowBall']
  },
  Torchic: {
    name: 'Torchic',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 65, Attack: 62, Defense: 48, Instinct: 62, Speed: 68 }, 2),
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['Ember', 'FlameCharge', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FlareBlitz', 'BrickBreak']
  },
  Chinchou: {
    name: 'Chinchou',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 72, Attack: 52, Defense: 58, Instinct: 62, Speed: 55 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'BubbleBeam', 'Spark'],
    learnableAbilities: ['Surf', 'Scald', 'Thunderbolt']
  },
  Mareep: {
    name: 'Mareep',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 68, Attack: 52, Defense: 48, Instinct: 68, Speed: 62 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'A', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['ThunderShock', 'Spark', 'TailWhip'],
    learnableAbilities: ['Thunderbolt', 'ChargeBeam', 'Discharge']
  },
  Elekid: {
    name: 'Elekid',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 62, Attack: 65, Defense: 48, Instinct: 68, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'E', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Spark', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'WildCharge']
  },
  Hoppip: {
    name: 'Hoppip',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 58, Attack: 48, Defense: 52, Instinct: 72, Speed: 68 }, 2),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'F', Debuffer: 'C', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'Swift'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'SolarBeam']
  },
  Sunkern: {
    name: 'Sunkern',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 65, Attack: 52, Defense: 55, Instinct: 62, Speed: 62 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'F' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'MegaDrain'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Synthesis']
  },
  Spinarak: {
    name: 'Spinarak',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 68, Attack: 62, Defense: 52, Instinct: 58, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['Confusion', 'Toxic', 'Bite'],
    learnableAbilities: ['Psychic', 'Psyshock', 'CrossPoison']
  },
  Skorupi: {
    name: 'Skorupi',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 62, Attack: 62, Defense: 72, Instinct: 55, Speed: 48 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'C', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['Confusion', 'Harden', 'Bite'],
    learnableAbilities: ['Psychic', 'DarkPulse', 'CrossPoison']
  },
  Eevee: {
    name: 'Eevee',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 65, Attack: 58, Defense: 52, Instinct: 68, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'D', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'Swift'],
    learnableAbilities: ['BodySlam', 'Return', 'PlayRough']
  },
  Togepi: {
    name: 'Togepi',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 60, Attack: 48, Defense: 60, Instinct: 72, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['Swift', 'Metronome', 'CharmMove'],
    learnableAbilities: ['DazzlingGleam', 'Moonblast', 'Psychic']
  },
  Snubbull: {
    name: 'Snubbull',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 68, Attack: 72, Defense: 52, Instinct: 55, Speed: 52 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['Bite', 'Headbutt', 'CharmMove'],
    learnableAbilities: ['PlayRough', 'Crunch', 'Return']
  },
  Teddiursa: {
    name: 'Teddiursa',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 68, Attack: 68, Defense: 52, Instinct: 58, Speed: 52 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'E', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['Slash', 'Bite', 'WorkUp'],
    learnableAbilities: ['BodySlam', 'PlayRough', 'Return']
  },

  // Rare Tier Gacha Pokemon (note: Slugma, Skitty are in Uncommon per GACHA_RARITY)
  // Rare tier = high-end stats, S/A aptitudes on primary type/strategy
  Slugma: {
    name: 'Slugma',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 72, Attack: 56, Defense: 58, Instinct: 68, Speed: 54 }, 1),
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'E', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['Ember', 'Incinerate', 'Harden'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'FlameBurst']
  },
  Clefairy: {
    name: 'Clefairy',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 78, Attack: 52, Defense: 56, Instinct: 72, Speed: 62 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['Swift', 'Metronome', 'Moonblast'],
    learnableAbilities: ['BodySlam', 'DazzlingGleam', 'Moonlight']
  },
  Jigglypuff: {
    name: 'Jigglypuff',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 92, Attack: 52, Defense: 50, Instinct: 64, Speed: 52 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['Swift', 'Harden', 'CharmMove'],
    learnableAbilities: ['BodySlam', 'PlayRough', 'IronDefense']
  },
  Phanpy: {
    name: 'Phanpy',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 76, Attack: 68, Defense: 66, Instinct: 54, Speed: 56 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'D', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'Harden', 'Rollout'],
    learnableAbilities: ['BodySlam', 'IronDefense', 'Earthquake']
  },
  Spheal: {
    name: 'Spheal',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 80, Attack: 54, Defense: 58, Instinct: 68, Speed: 50 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'C', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'Harden', 'IcePunch'],
    learnableAbilities: ['Surf', 'IceBeam', 'IronDefense']
  },
  Spoink: {
    name: 'Spoink',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 72, Attack: 54, Defense: 56, Instinct: 74, Speed: 64 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Psyshock', 'Swift'],
    learnableAbilities: ['Psychic', 'ShadowBall', 'PsychicBlast']
  },
  Skitty: {
    name: 'Skitty',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 68, Attack: 54, Defense: 50, Instinct: 68, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'C', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'CharmMove'],
    learnableAbilities: ['BodySlam', 'PlayRough', 'DoubleEdge']
  },
  Deerling: {
    name: 'Deerling',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 70, Attack: 60, Defense: 54, Instinct: 62, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'A', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'SolarBeam']
  },

  // Rare Tier Gacha Pokemon (starter Pokemon - these have isStarter flag)
  // Rare tier = high-end stats, S/A aptitudes on primary type/strategy
  Fletchling: {
    name: 'Fletchling',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 68, Attack: 58, Defense: 48, Instinct: 66, Speed: 78 }, 1),
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'FlareBlitz'],
    isStarter: true
  },
  Bunnelby: {
    name: 'Bunnelby',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 70, Attack: 64, Defense: 48, Instinct: 62, Speed: 74 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'Headbutt', 'Bite'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'HyperBeam'],
    isStarter: true
  },
  Yungoos: {
    name: 'Yungoos',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 72, Attack: 68, Defense: 52, Instinct: 60, Speed: 66 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'Leer'],
    learnableAbilities: ['BodySlam', 'Return', 'Headbutt'],
    isStarter: true
  },
  Wooloo: {
    name: 'Wooloo',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 76, Attack: 54, Defense: 62, Instinct: 64, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'C', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'C', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'Harden', 'TailWhip'],
    learnableAbilities: ['BodySlam', 'IronDefense', 'Return'],
    isStarter: true
  },
  Skwovet: {
    name: 'Skwovet',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 74, Attack: 58, Defense: 54, Instinct: 62, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'C', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Bite', 'TailWhip'],
    learnableAbilities: ['BodySlam', 'Return', 'Headbutt'],
    isStarter: true
  },

  // New Gen 2-6 Pokemon (50 total)
  Cyndaquil: {
    name: 'Cyndaquil',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 95, Attack: 66, Defense: 56, Instinct: 76, Speed: 87 }, 2),
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'D', Psychic: 'B', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FireBlast', 'PsyBeam'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'HyperBeam']
  },
  Totodile: {
    name: 'Totodile',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 100, Attack: 69, Defense: 64, Instinct: 71, Speed: 76 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Chikorita: {
    name: 'Chikorita',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 98, Attack: 59, Defense: 67, Instinct: 78, Speed: 78 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'A', Psychic: 'B', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'PsyBeam'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Bite']
  },
  Mudkip: {
    name: 'Mudkip',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 100, Attack: 63, Defense: 66, Instinct: 73, Speed: 78 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Harden', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'IronDefense']
  },
  Treecko: {
    name: 'Treecko',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 90, Attack: 65, Defense: 61, Instinct: 79, Speed: 85 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'B', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'PsyBeam'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'HyperBeam']
  },
  Piplup: {
    name: 'Piplup',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 97, Attack: 61, Defense: 67, Instinct: 77, Speed: 78 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'B', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'D', Chipper: 'A', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Turtwig: {
    name: 'Turtwig',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 101, Attack: 61, Defense: 70, Instinct: 75, Speed: 73 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'D', Chipper: 'D', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Harden', 'PsyBeam'],
    learnableAbilities: ['LeafBlade', 'SolarBeam', 'IronDefense']
  },
  Chimchar: {
    name: 'Chimchar',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 93, Attack: 66, Defense: 58, Instinct: 78, Speed: 85 }, 2),
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'E', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FireBlast', 'PsyBeam'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'HyperBeam']
  },
  Tepig: {
    name: 'Tepig',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 99, Attack: 68, Defense: 61, Instinct: 71, Speed: 81 }, 2),
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'E', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'PsyBeam'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'Bite']
  },
  Oshawott: {
    name: 'Oshawott',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 97, Attack: 65, Defense: 63, Instinct: 75, Speed: 80 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Snivy: {
    name: 'Snivy',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 91, Attack: 61, Defense: 67, Instinct: 81, Speed: 80 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'A', Psychic: 'B', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'PsyBeam'],
    learnableAbilities: ['LeafBlade', 'SolarBeam', 'Bite']
  },
  // Uncommon Tier Pokemon (Klefki, Gligar, Snorunt, Aron, Ralts, Shinx, Starly)
  Klefki: {
    name: 'Klefki',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 66, Attack: 58, Defense: 72, Instinct: 68, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'C', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'IronDefense', 'Spark'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Harden']
  },
  // Rare Tier Pokemon (Sneasel, Murkrow, Yanma - high-end with S aptitude)
  Sneasel: {
    name: 'Sneasel',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 64, Attack: 72, Defense: 52, Instinct: 66, Speed: 82 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'FireBlast']
  },
  Murkrow: {
    name: 'Murkrow',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 68, Attack: 68, Defense: 48, Instinct: 68, Speed: 84 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  // Uncommon Tier
  Gligar: {
    name: 'Gligar',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 70, Attack: 64, Defense: 68, Instinct: 60, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'D', Debuffer: 'C', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  // Rare Tier
  Yanma: {
    name: 'Yanma',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 66, Attack: 58, Defense: 48, Instinct: 70, Speed: 94 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'C', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Spark'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Thunderbolt']
  },
  // Uncommon Tier
  Snorunt: {
    name: 'Snorunt',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 68, Attack: 56, Defense: 56, Instinct: 66, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'Bite']
  },
  Aron: {
    name: 'Aron',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 68, Attack: 62, Defense: 80, Instinct: 54, Speed: 50 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'D', Chipper: 'E', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Harden']
  },
  Ralts: {
    name: 'Ralts',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 60, Attack: 52, Defense: 52, Instinct: 76, Speed: 74 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Shinx: {
    name: 'Shinx',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 64, Attack: 62, Defense: 54, Instinct: 66, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Spark', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'Bite']
  },
  Starly: {
    name: 'Starly',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 62, Attack: 56, Defense: 46, Instinct: 62, Speed: 88 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'C', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },
  // Rare Tier Pokemon (Buneary, Glameow, Stunky, Croagunk - high-end with S aptitude)
  Buneary: {
    name: 'Buneary',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 66, Attack: 64, Defense: 52, Instinct: 64, Speed: 70 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'PlayRough']
  },
  Glameow: {
    name: 'Glameow',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 64, Attack: 60, Defense: 52, Instinct: 66, Speed: 74 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'B', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'PlayRough']
  },
  Stunky: {
    name: 'Stunky',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 68, Attack: 64, Defense: 52, Instinct: 62, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  Croagunk: {
    name: 'Croagunk',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 64, Attack: 64, Defense: 52, Instinct: 64, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  // Common Tier (Purrloin, Patrat, Roggenrola, Tympole, Venipede, Dwebble, Binacle)
  Purrloin: {
    name: 'Purrloin',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 62, Attack: 60, Defense: 50, Instinct: 66, Speed: 74 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'PlayRough']
  },
  Patrat: {
    name: 'Patrat',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 64, Attack: 60, Defense: 52, Instinct: 62, Speed: 76 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Bite'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },
  Roggenrola: {
    name: 'Roggenrola',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 66, Attack: 60, Defense: 78, Instinct: 50, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'D', Chipper: 'E', MadLad: 'C' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Harden']
  },
  Tympole: {
    name: 'Tympole',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 68, Attack: 54, Defense: 52, Instinct: 64, Speed: 74 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'C', Chipper: 'B', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'Bite']
  },
  Venipede: {
    name: 'Venipede',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 64, Attack: 60, Defense: 62, Instinct: 58, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'Bite']
  },
  // Rare Tier Pokemon (Sandile, Scraggy, Gothita, Litleo, Skiddo, Pancham, Honedge, Inkay, Skrelp, Helioptile, Tyrunt, Amaura, Goomy, Noibat, Dratini)
  Sandile: {
    name: 'Sandile',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 68, Attack: 66, Defense: 52, Instinct: 62, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Dwebble: {
    name: 'Dwebble',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 62, Attack: 60, Defense: 78, Instinct: 54, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'D', Chipper: 'D', MadLad: 'C' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Harden']
  },
  Scraggy: {
    name: 'Scraggy',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 68, Attack: 70, Defense: 72, Instinct: 54, Speed: 52 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'D', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Gothita: {
    name: 'Gothita',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 62, Attack: 52, Defense: 58, Instinct: 74, Speed: 70 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Litleo: {
    name: 'Litleo',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 66, Attack: 60, Defense: 54, Instinct: 70, Speed: 66 }, 1),
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['Ember', 'FlameCharge', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'Bite']
  },
  Skiddo: {
    name: 'Skiddo',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 70, Attack: 62, Defense: 66, Instinct: 60, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'E', Debuffer: 'C', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Harden', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'SolarBeam', 'IronDefense']
  },
  Pancham: {
    name: 'Pancham',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 70, Attack: 72, Defense: 54, Instinct: 58, Speed: 62 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Honedge: {
    name: 'Honedge',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 64, Attack: 72, Defense: 82, Instinct: 56, Speed: 42 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'C', Chipper: 'E', MadLad: 'B' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Inkay: {
    name: 'Inkay',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 64, Attack: 58, Defense: 56, Instinct: 70, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  // Common Tier
  Binacle: {
    name: 'Binacle',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 64, Attack: 64, Defense: 72, Instinct: 58, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'E', Debuffer: 'D', Chipper: 'D', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Harden', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'IronDefense']
  },
  // Rare Tier
  Skrelp: {
    name: 'Skrelp',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 62, Attack: 58, Defense: 72, Instinct: 66, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Harden', 'WaterGun'],
    learnableAbilities: ['Psychic', 'Psyshock', 'IronDefense']
  },
  Helioptile: {
    name: 'Helioptile',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 62, Attack: 54, Defense: 50, Instinct: 70, Speed: 78 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'C', Electric: 'A', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'HyperBeam']
  },
  Tyrunt: {
    name: 'Tyrunt',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 70, Attack: 72, Defense: 58, Instinct: 56, Speed: 60 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'C', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Amaura: {
    name: 'Amaura',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 74, Attack: 52, Defense: 56, Instinct: 68, Speed: 66 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'Bite']
  },
  Goomy: {
    name: 'Goomy',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 64, Attack: 56, Defense: 50, Instinct: 70, Speed: 74 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Bite'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'PlayRough']
  },
  Noibat: {
    name: 'Noibat',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 62, Attack: 54, Defense: 48, Instinct: 68, Speed: 84 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'B', Debuffer: 'D', Chipper: 'A', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Dratini: {
    name: 'Dratini',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 68, Attack: 70, Defense: 52, Instinct: 58, Speed: 66 }, 2),
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'C', Psychic: 'B', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'C', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },

  // Legendary Tier Gacha Pokemon (highest tier - no evolutions, ~30% stronger base stats, S aptitudes)
  Moltres: {
    name: 'Moltres',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 95, Attack: 82, Defense: 60, Instinct: 73, Speed: 65 }, 0),
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'C', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'FireBlast', 'Psychic'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'HyperBeam']
  },
  Articuno: {
    name: 'Articuno',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 98, Attack: 64, Defense: 78, Instinct: 78, Speed: 55 }, 0),
    typeAptitudes: { Fire: 'C', Water: 'S', Grass: 'D', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'B', Chipper: 'A', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'Psychic'],
    learnableAbilities: ['Surf', 'HydroPump', 'IceBeam']
  },
  Celebi: {
    name: 'Celebi',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 100, Attack: 73, Defense: 73, Instinct: 69, Speed: 56 }, 0),
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'S', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'SwordsDance', 'Psychic'],
    learnableAbilities: ['LeafBlade', 'SolarBeam', 'CalmMind']
  },
  Raikou: {
    name: 'Raikou',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 82, Attack: 69, Defense: 56, Instinct: 86, Speed: 82 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'B', Electric: 'S', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'Flamethrower'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'HyperBeam']
  },
  Gengar: {
    name: 'Gengar',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 90, Attack: 78, Defense: 64, Instinct: 73, Speed: 69 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'B', Psychic: 'S', Electric: 'C', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'Flamethrower'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Psyshock']
  },
  Entei: {
    name: 'Entei',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 93, Attack: 84, Defense: 63, Instinct: 71, Speed: 63 }, 0),
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'C', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'FlameCharge', 'Psychic'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'LavaPlume']
  },
  Suicune: {
    name: 'Suicune',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 100, Attack: 63, Defense: 80, Instinct: 76, Speed: 54 }, 0),
    typeAptitudes: { Fire: 'C', Water: 'S', Grass: 'D', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'SwordsDance', 'Psychic'],
    learnableAbilities: ['Surf', 'HydroPump', 'CalmMind']
  },

  // ============================================================================
  // EVOLVED POKEMON - Evolution targets for base Pokemon
  // ============================================================================

  // Ralts -> Kirlia -> Gardevoir
  Kirlia: {
    name: 'Kirlia',
    primaryType: 'Psychic',
    baseStats: { HP: 88, Attack: 73, Defense: 73, Instinct: 106, Speed: 100 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'C', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Psychic', 'CalmMind'],
    learnableAbilities: ['HyperBeam', 'ShadowBall', 'Moonblast']
  },
  Gardevoir: {
    name: 'Gardevoir',
    primaryType: 'Psychic',
    baseStats: { HP: 118, Attack: 85, Defense: 85, Instinct: 145, Speed: 110 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Psychic', 'Moonblast', 'CalmMind'],
    learnableAbilities: ['ShadowBall', 'FocusBlast', 'HyperBeam', 'DrainingKiss']
  },

  // Houndour -> Houndoom
  Houndoom: {
    name: 'Houndoom',
    primaryType: 'Fire',
    baseStats: { HP: 95, Attack: 110, Defense: 65, Instinct: 95, Speed: 95 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'FireBlast', 'Psychic'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'HyperBeam']
  },

  // Sentret -> Furret
  Furret: {
    name: 'Furret',
    primaryType: 'Normal',
    baseStats: { HP: 95, Attack: 86, Defense: 74, Instinct: 85, Speed: 100 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Zigzagoon -> Linoone
  Linoone: {
    name: 'Linoone',
    primaryType: 'Normal',
    baseStats: { HP: 98, Attack: 85, Defense: 71, Instinct: 81, Speed: 105 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Chinchou -> Lanturn
  Lanturn: {
    name: 'Lanturn',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 68, Defense: 78, Instinct: 96, Speed: 73 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'Growl', 'Spark'],
    learnableAbilities: ['Surf', 'HydroPump', 'Thunderbolt']
  },

  // Mareep -> Flaaffy -> Ampharos
  Flaaffy: {
    name: 'Flaaffy',
    primaryType: 'Electric',
    baseStats: { HP: 90, Attack: 70, Defense: 70, Instinct: 95, Speed: 85 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Thunderbolt', 'QuickAttack'],
    learnableAbilities: ['Thunder', 'VoltSwitch', 'HyperBeam']
  },
  Ampharos: {
    name: 'Ampharos',
    primaryType: 'Electric',
    baseStats: { HP: 105, Attack: 85, Defense: 85, Instinct: 115, Speed: 65 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'Harden'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'IronDefense']
  },

  // Hoppip -> Skiploom -> Jumpluff
  Skiploom: {
    name: 'Skiploom',
    primaryType: 'Grass',
    baseStats: { HP: 83, Attack: 65, Defense: 70, Instinct: 90, Speed: 95 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'QuickAttack'],
    learnableAbilities: ['RazorLeaf', 'LeafBlade', 'HyperBeam']
  },
  Jumpluff: {
    name: 'Jumpluff',
    primaryType: 'Grass',
    baseStats: { HP: 95, Attack: 60, Defense: 80, Instinct: 105, Speed: 120 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'HyperBeam']
  },

  // Sunkern -> Sunflora
  Sunflora: {
    name: 'Sunflora',
    primaryType: 'Grass',
    baseStats: { HP: 95, Attack: 95, Defense: 75, Instinct: 105, Speed: 55 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'HyperBeam']
  },

  // Spinarak -> Ariados
  Ariados: {
    name: 'Ariados',
    primaryType: 'Psychic',
    baseStats: { HP: 90, Attack: 100, Defense: 80, Instinct: 75, Speed: 85 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'PsychicBlast', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'HyperBeam']
  },

  // Skorupi -> Drapion
  Drapion: {
    name: 'Drapion',
    primaryType: 'Psychic',
    baseStats: { HP: 90, Attack: 100, Defense: 110, Instinct: 75, Speed: 95 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'SwordsDance', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'CalmMind']
  },

  // Togepi -> Togetic
  Togetic: {
    name: 'Togetic',
    primaryType: 'Psychic',
    baseStats: { HP: 88, Attack: 65, Defense: 95, Instinct: 105, Speed: 82 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },

  // Snubbull -> Granbull
  Granbull: {
    name: 'Granbull',
    primaryType: 'Psychic',
    baseStats: { HP: 100, Attack: 120, Defense: 85, Instinct: 70, Speed: 65 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },

  // Teddiursa -> Ursaring
  Ursaring: {
    name: 'Ursaring',
    primaryType: 'Normal',
    baseStats: { HP: 105, Attack: 130, Defense: 85, Instinct: 85, Speed: 65 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Slugma -> Magcargo
  Magcargo: {
    name: 'Magcargo',
    primaryType: 'Fire',
    baseStats: { HP: 80, Attack: 80, Defense: 120, Instinct: 95, Speed: 45 },
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Ember', 'SwordsDance', 'QuickAttack'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'CalmMind']
  },

  // Clefairy -> Clefable
  Clefable: {
    name: 'Clefable',
    primaryType: 'Psychic',
    baseStats: { HP: 105, Attack: 75, Defense: 83, Instinct: 100, Speed: 70 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },

  // Jigglypuff -> Wigglytuff
  Wigglytuff: {
    name: 'Wigglytuff',
    primaryType: 'Psychic',
    baseStats: { HP: 140, Attack: 75, Defense: 55, Instinct: 90, Speed: 55 },
    typeAptitudes: { Fire: 'C', Water: 'B', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },

  // Phanpy -> Donphan
  Donphan: {
    name: 'Donphan',
    primaryType: 'Fighting',
    baseStats: { HP: 100, Attack: 120, Defense: 120, Instinct: 70, Speed: 60 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'IronDefense']
  },

  // Spoink -> Grumpig
  Grumpig: {
    name: 'Grumpig',
    primaryType: 'Psychic',
    baseStats: { HP: 95, Attack: 70, Defense: 80, Instinct: 110, Speed: 95 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'PsychicBlast', 'Harden'],
    learnableAbilities: ['Psychic', 'Psyshock', 'IronDefense']
  },

  // Skitty -> Delcatty
  Delcatty: {
    name: 'Delcatty',
    primaryType: 'Normal',
    baseStats: { HP: 90, Attack: 75, Defense: 70, Instinct: 65, Speed: 100 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Deerling -> Sawsbuck
  Sawsbuck: {
    name: 'Sawsbuck',
    primaryType: 'Grass',
    baseStats: { HP: 95, Attack: 105, Defense: 75, Instinct: 75, Speed: 105 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'SolarBeam', 'QuickAttack'],
    learnableAbilities: ['LeafBlade', 'GigaDrain', 'HyperBeam']
  },

  // Bunnelby -> Diggersby
  Diggersby: {
    name: 'Diggersby',
    primaryType: 'Normal',
    baseStats: { HP: 95, Attack: 65, Defense: 85, Instinct: 65, Speed: 80 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['QuickAttack', 'Growl', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Leer']
  },

  // Yungoos -> Gumshoos
  Gumshoos: {
    name: 'Gumshoos',
    primaryType: 'Normal',
    baseStats: { HP: 98, Attack: 110, Defense: 70, Instinct: 70, Speed: 75 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'D', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'ExtremeSpeed']
  },

  // Wooloo -> Dubwool
  Dubwool: {
    name: 'Dubwool',
    primaryType: 'Normal',
    baseStats: { HP: 100, Attack: 85, Defense: 100, Instinct: 75, Speed: 88 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'IronDefense']
  },

  // Skwovet -> Greedent
  Greedent: {
    name: 'Greedent',
    primaryType: 'Normal',
    baseStats: { HP: 120, Attack: 95, Defense: 95, Instinct: 60, Speed: 65 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'SwordsDance', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'IronDefense']
  },

  // ============================================================================
  // COMMON TIER - Additional new Pokemon (Gen 2+)
  // Common tier = low end of power variance, modest aptitudes
  // ============================================================================

  Hoothoot: {
    name: 'Hoothoot',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 70, Attack: 52, Defense: 52, Instinct: 62, Speed: 62 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'Swift', 'Confusion'],
    learnableAbilities: ['BodySlam', 'AirSlash', 'Psychic']
  },
  Ledyba: {
    name: 'Ledyba',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 65, Attack: 48, Defense: 52, Instinct: 62, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['BulletSeed', 'Swift', 'Headbutt'],
    learnableAbilities: ['RazorLeaf', 'MegaDrain', 'AirSlash']
  },
  Natu: {
    name: 'Natu',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 62, Attack: 52, Defense: 52, Instinct: 68, Speed: 63 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['Confusion', 'Psyshock', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'ShadowBall', 'AirSlash']
  },
  Marill: {
    name: 'Marill',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 72, Attack: 48, Defense: 52, Instinct: 55, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'BubbleBeam', 'PlayRough'],
    learnableAbilities: ['Surf', 'AquaTail', 'Moonblast']
  },
  Wooper: {
    name: 'Wooper',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 75, Attack: 55, Defense: 55, Instinct: 48, Speed: 62 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'TailWhip'],
    learnableAbilities: ['Surf', 'Earthquake', 'Scald']
  },
  Swinub: {
    name: 'Swinub',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 68, Attack: 55, Defense: 52, Instinct: 52, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['IcePunch', 'AquaJet', 'Headbutt'],
    learnableAbilities: ['IceBeam', 'Earthquake', 'Blizzard']
  },
  Remoraid: {
    name: 'Remoraid',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 60, Attack: 62, Defense: 45, Instinct: 62, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'C', Debuffer: 'E', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'BubbleBeam', 'Swift'],
    learnableAbilities: ['Surf', 'IceBeam', 'Scald']
  },
  Seedot: {
    name: 'Seedot',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 62, Attack: 55, Defense: 52, Instinct: 52, Speed: 72 }, 2),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'Headbutt'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'DarkPulse']
  },
  Lotad: {
    name: 'Lotad',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 68, Attack: 50, Defense: 50, Instinct: 62, Speed: 65 }, 2),
    typeAptitudes: { Fire: 'E', Water: 'C', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BubbleBeam', 'MegaDrain'],
    learnableAbilities: ['RazorLeaf', 'Surf', 'EnergyBall']
  },
  Shroomish: {
    name: 'Shroomish',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 70, Attack: 58, Defense: 58, Instinct: 52, Speed: 55 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'C', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'SleepPowder'],
    learnableAbilities: ['SeedBomb', 'EnergyBall', 'MachPunch']
  },
  Makuhita: {
    name: 'Makuhita',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 78, Attack: 60, Defense: 52, Instinct: 48, Speed: 55 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['LowKick', 'MachPunch', 'BulkUp'],
    learnableAbilities: ['BrickBreak', 'CloseCombat', 'Earthquake']
  },
  Nosepass: {
    name: 'Nosepass',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 58, Attack: 55, Defense: 85, Instinct: 55, Speed: 40 }, 0),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'F', Debuffer: 'D', Chipper: 'F', MadLad: 'E' },
    defaultAbilities: ['Headbutt', 'IronDefense', 'ThunderWave'],
    learnableAbilities: ['StoneEdge', 'Thunderbolt', 'IronHead']
  },
  Gulpin: {
    name: 'Gulpin',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 72, Attack: 55, Defense: 55, Instinct: 58, Speed: 55 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'C', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['PsyBeam', 'Toxic', 'Harden'],
    learnableAbilities: ['Psychic', 'SludgeBomb', 'ShadowBall']
  },
  Numel: {
    name: 'Numel',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 70, Attack: 60, Defense: 55, Instinct: 60, Speed: 50 }, 1),
    typeAptitudes: { Fire: 'A', Water: 'E', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'D', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['Ember', 'FlameCharge', 'Headbutt'],
    learnableAbilities: ['Flamethrower', 'LavaPlume', 'Earthquake']
  },
  Trapinch: {
    name: 'Trapinch',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 62, Attack: 78, Defense: 55, Instinct: 48, Speed: 50 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'C', Debuffer: 'E', Chipper: 'D', MadLad: 'D' },
    defaultAbilities: ['Headbutt', 'SandAttack', 'Bite'],
    learnableAbilities: ['Earthquake', 'RockSlide', 'DragonClaw']
  },
  Baltoy: {
    name: 'Baltoy',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 62, Attack: 52, Defense: 60, Instinct: 68, Speed: 55 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['Confusion', 'CosmicPower', 'RapidSpin'],
    learnableAbilities: ['Psychic', 'Earthquake', 'ShadowBall']
  },
  Barboach: {
    name: 'Barboach',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 68, Attack: 55, Defense: 50, Instinct: 55, Speed: 65 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'TailWhip'],
    learnableAbilities: ['Surf', 'Earthquake', 'Scald']
  },
  Corphish: {
    name: 'Corphish',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 65, Attack: 68, Defense: 60, Instinct: 48, Speed: 52 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'E', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'Slash', 'Harden'],
    learnableAbilities: ['Surf', 'Crunch', 'Waterfall']
  },
  Kricketot: {
    name: 'Kricketot',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 58, Attack: 52, Defense: 52, Instinct: 52, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['BulletSeed', 'StringShot', 'Bite'],
    learnableAbilities: ['RazorLeaf', 'MegaDrain', 'SeedBomb']
  },
  Burmy: {
    name: 'Burmy',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 62, Attack: 48, Defense: 55, Instinct: 55, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['BulletSeed', 'StringShot', 'Harden'],
    learnableAbilities: ['RazorLeaf', 'MegaDrain', 'SeedBomb']
  },
  Combee: {
    name: 'Combee',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 58, Attack: 48, Defense: 52, Instinct: 55, Speed: 82 }, 0),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['BulletSeed', 'Swift', 'Bite'],
    learnableAbilities: ['RazorLeaf', 'AirSlash', 'MegaDrain']
  },
  Cherubi: {
    name: 'Cherubi',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 65, Attack: 55, Defense: 55, Instinct: 58, Speed: 58 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'Synthesis'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'EnergyBall']
  },
  Bronzor: {
    name: 'Bronzor',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 60, Attack: 48, Defense: 78, Instinct: 68, Speed: 42 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'A', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'F', Debuffer: 'D', Chipper: 'F', MadLad: 'E' },
    defaultAbilities: ['Confusion', 'IronDefense', 'Hypnosis'],
    learnableAbilities: ['Psychic', 'FlashCannon', 'ShadowBall']
  },
  Finneon: {
    name: 'Finneon',
    primaryType: 'Water',
    baseStats: calculateBaseStats({ HP: 62, Attack: 52, Defense: 52, Instinct: 62, Speed: 68 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'A', Grass: 'E', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'Swift'],
    learnableAbilities: ['Surf', 'IceBeam', 'Scald']
  },
  Pidove: {
    name: 'Pidove',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 60, Attack: 58, Defense: 48, Instinct: 55, Speed: 72 }, 2),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'D', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'E', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['QuickAttack', 'AirSlash', 'Growl'],
    learnableAbilities: ['BodySlam', 'BraveBird', 'Return']
  },
  Blitzle: {
    name: 'Blitzle',
    primaryType: 'Electric',
    baseStats: calculateBaseStats({ HP: 62, Attack: 58, Defense: 48, Instinct: 58, Speed: 72 }, 1),
    typeAptitudes: { Fire: 'D', Water: 'D', Grass: 'D', Psychic: 'D', Electric: 'A', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'E', Nuker: 'D', Debuffer: 'E', Chipper: 'C', MadLad: 'D' },
    defaultAbilities: ['ThunderShock', 'Spark', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'WildCharge', 'Discharge']
  },
  Sewaddle: {
    name: 'Sewaddle',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 62, Attack: 55, Defense: 55, Instinct: 52, Speed: 68 }, 2),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'StringShot'],
    learnableAbilities: ['RazorLeaf', 'SeedBomb', 'LeafBlade']
  },
  Cottonee: {
    name: 'Cottonee',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 62, Attack: 45, Defense: 58, Instinct: 68, Speed: 62 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'F', Debuffer: 'C', Chipper: 'D', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'CharmMove'],
    learnableAbilities: ['EnergyBall', 'Moonblast', 'GigaDrain']
  },
  Petilil: {
    name: 'Petilil',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 65, Attack: 48, Defense: 48, Instinct: 68, Speed: 66 }, 1),
    typeAptitudes: { Fire: 'E', Water: 'D', Grass: 'A', Psychic: 'D', Electric: 'D', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'E', Debuffer: 'D', Chipper: 'C', MadLad: 'E' },
    defaultAbilities: ['VineWhip', 'MegaDrain', 'SleepPowder'],
    learnableAbilities: ['EnergyBall', 'SolarBeam', 'Synthesis']
  },

  // RARE TIER - 50 new Pokemon (Gen 2+)
  Misdreavus: {
    name: 'Misdreavus',
    primaryType: 'Psychic',
    baseStats: { HP: 81, Attack: 75, Defense: 75, Instinct: 95, Speed: 94 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Psyshock']
  },
  Girafarig: {
    name: 'Girafarig',
    primaryType: 'Psychic',
    baseStats: { HP: 83, Attack: 85, Defense: 69, Instinct: 95, Speed: 88 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Confusion', 'QuickAttack'],
    learnableAbilities: ['Psychic', 'Psyshock', 'HyperBeam']
  },
  Dunsparce: {
    name: 'Dunsparce',
    primaryType: 'Fighting',
    baseStats: { HP: 105, Attack: 79, Defense: 79, Instinct: 75, Speed: 62 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'Harden', 'Swift'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Growl']
  },
  Qwilfish: {
    name: 'Qwilfish',
    primaryType: 'Water',
    baseStats: { HP: 83, Attack: 95, Defense: 85, Instinct: 69, Speed: 88 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'AquaJet', 'PsyBeam'],
    learnableAbilities: ['Surf', 'HydroPump', 'Psychic']
  },
  Shuckle: {
    name: 'Shuckle',
    primaryType: 'Fighting',
    baseStats: { HP: 65, Attack: 35, Defense: 170, Instinct: 35, Speed: 15 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'A', Chipper: 'F', MadLad: 'C' },
    defaultAbilities: ['Headbutt', 'SwordsDance', 'Swift'],
    learnableAbilities: ['BodySlam', 'IronDefense', 'Growl']
  },
  Corsola: {
    name: 'Corsola',
    primaryType: 'Water',
    baseStats: { HP: 89, Attack: 69, Defense: 95, Instinct: 85, Speed: 62 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Harden', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'IronDefense']
  },
  Mantine: {
    name: 'Mantine',
    primaryType: 'Water',
    baseStats: { HP: 89, Attack: 55, Defense: 79, Instinct: 115, Speed: 82 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['WaterGun', 'Growl', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'Leer']
  },
  Larvitar: {
    name: 'Larvitar',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 100, Attack: 74, Defense: 70, Instinct: 65, Speed: 71 }, 2),
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'Ember'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Flamethrower']
  },
  Poochyena: {
    name: 'Poochyena',
    primaryType: 'Psychic',
    baseStats: { HP: 77, Attack: 79, Defense: 59, Instinct: 73, Speed: 92 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['QuickAttack', 'HyperBeam', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DoubleEdge', 'Psychic']
  },
  Wingull: {
    name: 'Wingull',
    primaryType: 'Water',
    baseStats: { HP: 77, Attack: 67, Defense: 57, Instinct: 79, Speed: 100 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'HydroPump', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'HyperBeam']
  },
  Surskit: {
    name: 'Surskit',
    primaryType: 'Water',
    baseStats: { HP: 77, Attack: 65, Defense: 59, Instinct: 87, Speed: 92 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'HydroPump', 'QuickAttack'],
    learnableAbilities: ['Surf', 'IceBeam', 'HyperBeam']
  },
  Electrike: {
    name: 'Electrike',
    primaryType: 'Electric',
    baseStats: { HP: 77, Attack: 73, Defense: 59, Instinct: 85, Speed: 86 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Thunder', 'QuickAttack'],
    learnableAbilities: ['Thunderbolt', 'VoltSwitch', 'HyperBeam']
  },
  Roselia: {
    name: 'Roselia',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 75, Defense: 63, Instinct: 105, Speed: 86 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'BulletSeed', 'PsyBeam'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'Psychic']
  },
  Wailmer: {
    name: 'Wailmer',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 79, Defense: 59, Instinct: 79, Speed: 68 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Torkoal: {
    name: 'Torkoal',
    primaryType: 'Fire',
    baseStats: { HP: 89, Attack: 89, Defense: 130, Instinct: 95, Speed: 37 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Cacnea: {
    name: 'Cacnea',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 95, Defense: 75, Instinct: 75, Speed: 74 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Seviper: {
    name: 'Seviper',
    primaryType: 'Psychic',
    baseStats: { HP: 89, Attack: 105, Defense: 75, Instinct: 95, Speed: 86 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Zangoose: {
    name: 'Zangoose',
    primaryType: 'Fighting',
    baseStats: { HP: 89, Attack: 115, Defense: 69, Instinct: 75, Speed: 102 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'ExtremeSpeed']
  },
  Tropius: {
    name: 'Tropius',
    primaryType: 'Grass',
    baseStats: { HP: 109, Attack: 75, Defense: 91, Instinct: 79, Speed: 66 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Chimecho: {
    name: 'Chimecho',
    primaryType: 'Psychic',
    baseStats: { HP: 89, Attack: 69, Defense: 85, Instinct: 105, Speed: 82 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'C', Debuffer: 'A', Chipper: 'B', MadLad: 'D' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Absol: {
    name: 'Absol',
    primaryType: 'Psychic',
    baseStats: { HP: 89, Attack: 115, Defense: 65, Instinct: 85, Speed: 96 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'ExtremeSpeed']
  },
  Snover: {
    name: 'Snover',
    primaryType: 'Grass',
    baseStats: { HP: 85, Attack: 79, Defense: 69, Instinct: 79, Speed: 68 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'IceBeam', 'BodySlam']
  },
  Riolu: {
    name: 'Riolu',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 80, Attack: 79, Defense: 65, Instinct: 75, Speed: 81 }, 1),
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'B', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['LowKick', 'QuickAttack'],
    learnableAbilities: ['BrickBreak', 'BodySlam']
  },
  Hippopotas: {
    name: 'Hippopotas',
    primaryType: 'Fighting',
    baseStats: { HP: 91, Attack: 79, Defense: 85, Instinct: 65, Speed: 60 },
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'LowKick'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Carnivine: {
    name: 'Carnivine',
    primaryType: 'Grass',
    baseStats: { HP: 89, Attack: 95, Defense: 79, Instinct: 89, Speed: 68 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['PowerWhip', 'SolarBeam', 'BodySlam']
  },
  Mantyke: {
    name: 'Mantyke',
    primaryType: 'Water',
    baseStats: { HP: 79, Attack: 55, Defense: 69, Instinct: 105, Speed: 72 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'BodySlam']
  },
  Sawk: {
    name: 'Sawk',
    primaryType: 'Fighting',
    baseStats: { HP: 85, Attack: 115, Defense: 85, Instinct: 65, Speed: 90 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['LowKick', 'QuickAttack'],
    learnableAbilities: ['BrickBreak', 'CloseCombat', 'BodySlam']
  },
  Throh: {
    name: 'Throh',
    primaryType: 'Fighting',
    baseStats: { HP: 115, Attack: 105, Defense: 95, Instinct: 55, Speed: 70 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['BrickBreak', 'CloseCombat', 'BodySlam']
  },
  Basculin: {
    name: 'Basculin',
    primaryType: 'Water',
    baseStats: { HP: 85, Attack: 95, Defense: 75, Instinct: 85, Speed: 100 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'QuickAttack'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam']
  },
  Darumaka: {
    name: 'Darumaka',
    primaryType: 'Fire',
    baseStats: { HP: 79, Attack: 95, Defense: 59, Instinct: 59, Speed: 88 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'BodySlam']
  },
  Maractus: {
    name: 'Maractus',
    primaryType: 'Grass',
    baseStats: { HP: 85, Attack: 95, Defense: 77, Instinct: 105, Speed: 78 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam']
  },
  Druddigon: {
    name: 'Druddigon',
    primaryType: 'Fire',
    baseStats: { HP: 91, Attack: 115, Defense: 95, Instinct: 75, Speed: 64 },
    typeAptitudes: { Fire: 'A', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Pawniard: {
    name: 'Pawniard',
    primaryType: 'Fighting',
    baseStats: { HP: 77, Attack: 95, Defense: 85, Instinct: 65, Speed: 78 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Rufflet: {
    name: 'Rufflet',
    primaryType: 'Fighting',
    baseStats: { HP: 85, Attack: 91, Defense: 75, Instinct: 65, Speed: 84 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['ExtremeSpeed', 'BodySlam']
  },
  Vullaby: {
    name: 'Vullaby',
    primaryType: 'Psychic',
    baseStats: { HP: 85, Attack: 69, Defense: 95, Instinct: 65, Speed: 86 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'DarkPulse', 'AirSlash']
  },
  Heatmor: {
    name: 'Heatmor',
    primaryType: 'Fire',
    baseStats: { HP: 91, Attack: 105, Defense: 75, Instinct: 105, Speed: 74 },
    typeAptitudes: { Fire: 'A', Water: 'D', Grass: 'C', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam']
  },
  Durant: {
    name: 'Durant',
    primaryType: 'Fighting',
    baseStats: { HP: 77, Attack: 109, Defense: 115, Instinct: 55, Speed: 94 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['StoneEdge', 'BodySlam']
  },
  Deino: {
    name: 'Deino',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 92, Attack: 75, Defense: 60, Instinct: 65, Speed: 68 }, 2),
    typeAptitudes: { Fire: 'B', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'PsyBeam'],
    learnableAbilities: ['BodySlam', 'DarkPulse', 'Psychic']
  },
  Espurr: {
    name: 'Espurr',
    primaryType: 'Psychic',
    baseStats: { HP: 79, Attack: 69, Defense: 59, Instinct: 91, Speed: 82 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'BodySlam']
  },
  Spritzee: {
    name: 'Spritzee',
    primaryType: 'Psychic',
    baseStats: { HP: 85, Attack: 59, Defense: 75, Instinct: 91, Speed: 70 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'PsyBeam'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Swirlix: {
    name: 'Swirlix',
    primaryType: 'Psychic',
    baseStats: { HP: 79, Attack: 75, Defense: 75, Instinct: 75, Speed: 76 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'A', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },
  Bergmite: {
    name: 'Bergmite',
    primaryType: 'Water',
    baseStats: { HP: 83, Attack: 77, Defense: 95, Instinct: 59, Speed: 66 },
    typeAptitudes: { Fire: 'C', Water: 'A', Grass: 'D', Psychic: 'C', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['IceBeam', 'BodySlam']
  },
  Phantump: {
    name: 'Phantump',
    primaryType: 'Grass',
    baseStats: { HP: 79, Attack: 83, Defense: 85, Instinct: 69, Speed: 64 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Pumpkaboo: {
    name: 'Pumpkaboo',
    primaryType: 'Grass',
    baseStats: { HP: 81, Attack: 79, Defense: 85, Instinct: 69, Speed: 66 },
    typeAptitudes: { Fire: 'D', Water: 'C', Grass: 'A', Psychic: 'B', Electric: 'C', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'C', Debuffer: 'D', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'BodySlam']
  },
  Dedenne: {
    name: 'Dedenne',
    primaryType: 'Electric',
    baseStats: { HP: 83, Attack: 67, Defense: 67, Instinct: 91, Speed: 92 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'C', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'B', Debuffer: 'D', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'BodySlam']
  },
  Carbink: {
    name: 'Carbink',
    primaryType: 'Fighting',
    baseStats: { HP: 81, Attack: 55, Defense: 135, Instinct: 95, Speed: 54 },
    typeAptitudes: { Fire: 'C', Water: 'C', Grass: 'C', Psychic: 'D', Electric: 'C', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'F', Debuffer: 'A', Chipper: 'E', MadLad: 'D' },
    defaultAbilities: ['Tackle', 'LowKick'],
    learnableAbilities: ['PlayRough', 'BodySlam']
  },

  // LEGENDARY TIER - 20 new Pokemon (including Mew/Mewtwo which already exist in POKEMON)
  // Note: Mew and Mewtwo are already defined above, just need to add to gacha pool
  // Legendary tier = no evolutions (stage 0), ~30% stat boost, S aptitudes
  HoOh: {
    name: 'Ho-Oh',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 100, Attack: 90, Defense: 69, Instinct: 77, Speed: 60 }, 0),
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'A', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'SacredFire', 'HyperBeam']
  },
  Latias: {
    name: 'Latias',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 82, Attack: 73, Defense: 77, Instinct: 99, Speed: 86 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Latios: {
    name: 'Latios',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 82, Attack: 86, Defense: 73, Instinct: 99, Speed: 86 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Jirachi: {
    name: 'Jirachi',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 90, Attack: 82, Defense: 82, Instinct: 82, Speed: 82 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Deoxys: {
    name: 'Deoxys',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 73, Attack: 116, Defense: 47, Instinct: 116, Speed: 112 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'D', Nuker: 'A', Debuffer: 'C', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Uxie: {
    name: 'Uxie',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 82, Attack: 73, Defense: 90, Instinct: 90, Speed: 73 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Mesprit: {
    name: 'Mesprit',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 82, Attack: 82, Defense: 82, Instinct: 82, Speed: 82 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Azelf: {
    name: 'Azelf',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 73, Attack: 90, Defense: 73, Instinct: 90, Speed: 90 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Heatran: {
    name: 'Heatran',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 90, Attack: 82, Defense: 95, Instinct: 99, Speed: 66 }, 0),
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'A', Psychic: 'A', Electric: 'A', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'LavaPlume', 'HyperBeam']
  },
  Regigigas: {
    name: 'Regigigas',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 99, Attack: 121, Defense: 95, Instinct: 82, Speed: 77 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'A', Electric: 'A', Fighting: 'S' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['BodySlam', 'HyperBeam']
  },
  Cresselia: {
    name: 'Cresselia',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 103, Attack: 64, Defense: 99, Instinct: 103, Speed: 73 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam']
  },
  Darkrai: {
    name: 'Darkrai',
    primaryType: 'Psychic',
    baseStats: calculateBaseStats({ HP: 77, Attack: 86, Defense: 64, Instinct: 103, Speed: 108 }, 0),
    typeAptitudes: { Fire: 'B', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'B', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Hypnosis', 'HyperBeam']
  },
  Shaymin: {
    name: 'Shaymin',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 90, Attack: 82, Defense: 82, Instinct: 82, Speed: 82 }, 0),
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'S', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam', 'HyperBeam']
  },
  Arceus: {
    name: 'Arceus',
    primaryType: 'Normal',
    baseStats: calculateBaseStats({ HP: 103, Attack: 103, Defense: 103, Instinct: 103, Speed: 103 }, 0),
    typeAptitudes: { Fire: 'S', Water: 'S', Grass: 'S', Psychic: 'S', Electric: 'S', Fighting: 'S' },
    strategyAptitudes: { Scaler: 'S', Nuker: 'S', Debuffer: 'A', Chipper: 'S', MadLad: 'A' },
    defaultAbilities: ['Tackle', 'QuickAttack'],
    learnableAbilities: ['HyperBeam', 'BodySlam', 'Flamethrower', 'Surf', 'Thunderbolt', 'Psychic']
  },
  Victini: {
    name: 'Victini',
    primaryType: 'Fire',
    baseStats: calculateBaseStats({ HP: 90, Attack: 86, Defense: 86, Instinct: 86, Speed: 86 }, 0),
    typeAptitudes: { Fire: 'S', Water: 'A', Grass: 'A', Psychic: 'A', Electric: 'A', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'A', Chipper: 'A', MadLad: 'A' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'Psychic', 'HyperBeam']
  },
  Cobalion: {
    name: 'Cobalion',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 90, Attack: 82, Defense: 103, Instinct: 73, Speed: 86 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'B', Electric: 'A', Fighting: 'S' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'B', Debuffer: 'A', Chipper: 'B', MadLad: 'C' },
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['CloseCombat', 'StoneEdge', 'BodySlam', 'HyperBeam']
  },
  Terrakion: {
    name: 'Terrakion',
    primaryType: 'Fighting',
    baseStats: calculateBaseStats({ HP: 90, Attack: 103, Defense: 82, Instinct: 73, Speed: 86 }, 0),
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'B', Electric: 'A', Fighting: 'S' },
    strategyAptitudes: { Scaler: 'B', Nuker: 'A', Debuffer: 'B', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['CloseCombat', 'StoneEdge', 'BodySlam', 'HyperBeam']
  },
  Virizion: {
    name: 'Virizion',
    primaryType: 'Grass',
    baseStats: calculateBaseStats({ HP: 90, Attack: 82, Defense: 73, Instinct: 103, Speed: 86 }, 0),
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'S', Psychic: 'A', Electric: 'A', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'A', Debuffer: 'A', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'LeafBlade', 'SolarBeam', 'HyperBeam']
  }
};

const LEGENDARY_POKEMON = {
  Moltres: {
    name: 'Moltres',
    primaryType: 'Fire',
    baseStats: { HP: 110, Attack: 95, Defense: 70, Instinct: 85, Speed: 75 },
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'B', Psychic: 'A', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam', 'HyperBeam']
  },
  Articuno: {
    name: 'Articuno',
    primaryType: 'Water',
    baseStats: { HP: 115, Attack: 75, Defense: 90, Instinct: 90, Speed: 65 },
    typeAptitudes: { Fire: 'B', Water: 'S', Grass: 'D', Psychic: 'A', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },
  Celebi: {
    name: 'Celebi',
    primaryType: 'Grass',
    baseStats: { HP: 120, Attack: 85, Defense: 85, Instinct: 80, Speed: 65 },
    typeAptitudes: { Fire: 'D', Water: 'B', Grass: 'S', Psychic: 'A', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'BodySlam', 'HyperBeam']
  },
  Raikou: {
    name: 'Raikou',
    primaryType: 'Electric',
    baseStats: { HP: 95, Attack: 80, Defense: 65, Instinct: 100, Speed: 95 },
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'B', Electric: 'S', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam', 'HyperBeam']
  },
  Gengar: {
    name: 'Gengar',
    primaryType: 'Psychic',
    baseStats: { HP: 105, Attack: 90, Defense: 75, Instinct: 85, Speed: 80 },
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'B', Psychic: 'S', Electric: 'D', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  Entei: {
    name: 'Entei',
    primaryType: 'Fire',
    baseStats: { HP: 108, Attack: 98, Defense: 73, Instinct: 83, Speed: 73 },
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'B', Psychic: 'A', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'BodySlam', 'HyperBeam']
  },
  Suicune: {
    name: 'Suicune',
    primaryType: 'Water',
    baseStats: { HP: 118, Attack: 73, Defense: 93, Instinct: 88, Speed: 63 },
    typeAptitudes: { Fire: 'B', Water: 'S', Grass: 'D', Psychic: 'A', Electric: 'A', Fighting: 'C' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'BodySlam', 'HyperBeam']
  },
  Zapdos: {
    name: 'Zapdos',
    primaryType: 'Electric',
    baseStats: { HP: 100, Attack: 88, Defense: 68, Instinct: 98, Speed: 91 },
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'B', Electric: 'S', Fighting: 'D' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['ThunderShock', 'Tackle'],
    learnableAbilities: ['Thunderbolt', 'Thunder', 'BodySlam', 'HyperBeam']
  },
  Lugia: {
    name: 'Lugia',
    primaryType: 'Psychic',
    baseStats: { HP: 125, Attack: 80, Defense: 100, Instinct: 95, Speed: 65 },
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'B', Psychic: 'S', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'BodySlam', 'HyperBeam']
  },
  HoOh: {
    name: 'Ho-Oh',
    primaryType: 'Fire',
    baseStats: { HP: 120, Attack: 105, Defense: 80, Instinct: 90, Speed: 70 },
    typeAptitudes: { Fire: 'S', Water: 'D', Grass: 'A', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'SacredFire', 'HyperBeam']
  },
  Mewtwo: {
    name: 'Mewtwo',
    primaryType: 'Psychic',
    baseStats: { HP: 110, Attack: 105, Defense: 70, Instinct: 105, Speed: 85 },
    typeAptitudes: { Fire: 'B', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'A', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'Psystrike', 'HyperBeam']
  },
  Kyogre: {
    name: 'Kyogre',
    primaryType: 'Water',
    baseStats: { HP: 122, Attack: 98, Defense: 85, Instinct: 95, Speed: 65 },
    typeAptitudes: { Fire: 'C', Water: 'S', Grass: 'D', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'OriginPulse', 'HyperBeam']
  },
  Groudon: {
    name: 'Groudon',
    primaryType: 'Fire',
    baseStats: { HP: 118, Attack: 110, Defense: 95, Instinct: 78, Speed: 64 },
    typeAptitudes: { Fire: 'S', Water: 'E', Grass: 'A', Psychic: 'B', Electric: 'A', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['Ember', 'Tackle'],
    learnableAbilities: ['Flamethrower', 'FireBlast', 'PrecipiceBlades', 'HyperBeam']
  },
  Rayquaza: {
    name: 'Rayquaza',
    primaryType: 'Grass',
    baseStats: { HP: 115, Attack: 105, Defense: 75, Instinct: 105, Speed: 85 },
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'S', Psychic: 'A', Electric: 'A', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['VineWhip', 'Tackle'],
    learnableAbilities: ['RazorLeaf', 'SolarBeam', 'DragonAscent', 'HyperBeam']
  },
  Dialga: {
    name: 'Dialga',
    primaryType: 'Fighting',
    baseStats: { HP: 112, Attack: 103, Defense: 88, Instinct: 88, Speed: 74 },
    typeAptitudes: { Fire: 'A', Water: 'A', Grass: 'A', Psychic: 'B', Electric: 'A', Fighting: 'S' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'B', Debuffer: 'C', Chipper: 'A', MadLad: 'B' },
    defaultAbilities: ['LowKick', 'Tackle'],
    learnableAbilities: ['KarateChop', 'Submission', 'RoarOfTime', 'HyperBeam']
  },
  Palkia: {
    name: 'Palkia',
    primaryType: 'Water',
    baseStats: { HP: 108, Attack: 103, Defense: 78, Instinct: 98, Speed: 78 },
    typeAptitudes: { Fire: 'A', Water: 'S', Grass: 'C', Psychic: 'A', Electric: 'A', Fighting: 'B' },
    strategyAptitudes: { Scaler: 'C', Nuker: 'A', Debuffer: 'C', Chipper: 'B', MadLad: 'B' },
    defaultAbilities: ['WaterGun', 'Tackle'],
    learnableAbilities: ['Surf', 'HydroPump', 'SpacialRend', 'HyperBeam']
  },
  Giratina: {
    name: 'Giratina',
    primaryType: 'Psychic',
    baseStats: { HP: 125, Attack: 93, Defense: 93, Instinct: 93, Speed: 71 },
    typeAptitudes: { Fire: 'B', Water: 'A', Grass: 'A', Psychic: 'S', Electric: 'B', Fighting: 'A' },
    strategyAptitudes: { Scaler: 'A', Nuker: 'D', Debuffer: 'B', Chipper: 'C', MadLad: 'C' },
    defaultAbilities: ['PsyBeam', 'Tackle'],
    learnableAbilities: ['Psychic', 'PsychicBlast', 'ShadowForce', 'HyperBeam']
  }
};

module.exports = {
  POKEMON,
  LEGENDARY_POKEMON
};
