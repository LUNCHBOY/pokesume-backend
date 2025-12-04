/**
 * GACHA POOLS
 * Pokemon gacha rarity definitions
 */

const GACHA_RARITY = {
    Common: {
        rate: 0.50, // 50%
        pokemon: [
            // Original 30
            'Rattata', 'Meowth', 'Sandshrew', 'Psyduck', 'Poliwag',
            'Tentacool', 'Shellder', 'Krabby', 'Oddish', 'Bellsprout',
            'Paras', 'Zubat', 'Grimer', 'Koffing', 'Voltorb',
            'Magnemite', 'Sentret', 'Zigzagoon', 'Bidoof', 'Lillipup',
            'Hoppip', 'Sunkern', 'Spinarak', 'Patrat', 'Purrloin',
            'Roggenrola', 'Tympole', 'Venipede', 'Dwebble', 'Binacle',
            // New 30 Common Pokemon (Gen 2+)
            'Hoothoot', 'Ledyba', 'Natu', 'Marill', 'Wooper',
            'Swinub', 'Remoraid', 'Seedot', 'Lotad', 'Shroomish',
            'Makuhita', 'Nosepass', 'Gulpin', 'Numel', 'Trapinch',
            'Baltoy', 'Barboach', 'Corphish', 'Kricketot', 'Burmy',
            'Combee', 'Cherubi', 'Bronzor', 'Finneon', 'Pidove',
            'Blitzle', 'Sewaddle', 'Cottonee', 'Petilil'
        ]
    },
    Uncommon: {
        rate: 0.35, // 35%
        pokemon: [
            'Growlithe', 'Vulpix', 'Ponyta', 'Houndour', 'Torchic',
            'Chinchou', 'Mareep', 'Skorupi', 'Eevee',
            'Togepi', 'Snubbull', 'Teddiursa', 'Slugma', 'Skitty',
            'Pikachu', 'Gastly', 'Fletchling', 'Cyndaquil', 'Totodile',
            'Chikorita', 'Mudkip', 'Treecko', 'Piplup', 'Turtwig',
            'Chimchar', 'Tepig', 'Oshawott', 'Snivy', 'Klefki',
            'Gligar', 'Snorunt', 'Aron', 'Ralts', 'Shinx', 'Starly'
        ]
    },
    Rare: {
        rate: 0.13, // 13%
        pokemon: [
            // Starter Pokemon
            'Charmander', 'Squirtle', 'Bulbasaur',
            // Original 37
            'Magmar', 'Electabuzz', 'Clefairy', 'Jigglypuff',
            'Phanpy', 'Spheal', 'Spoink', 'Deerling', 'Tangela',
            'Lapras', 'Bunnelby', 'Yungoos', 'Wooloo', 'Skwovet',
            'Sneasel', 'Murkrow', 'Yanma', 'Buneary', 'Glameow',
            'Stunky', 'Croagunk', 'Sandile', 'Scraggy', 'Gothita',
            'Litleo', 'Skiddo', 'Pancham', 'Honedge', 'Inkay',
            'Skrelp', 'Helioptile', 'Tyrunt', 'Amaura', 'Goomy', 'Noibat',
            'Dratini',
            // New 50 Rare Pokemon (Gen 2+)
            'Misdreavus', 'Girafarig', 'Dunsparce', 'Qwilfish', 'Shuckle',
            'Corsola', 'Mantine', 'Larvitar', 'Poochyena', 'Wingull',
            'Surskit', 'Electrike', 'Roselia', 'Wailmer', 'Torkoal',
            'Cacnea', 'Seviper', 'Zangoose', 'Tropius', 'Chimecho',
            'Absol', 'Snover', 'Riolu', 'Hippopotas', 'Carnivine',
            'Mantyke', 'Sawk', 'Throh', 'Basculin', 'Darumaka',
            'Maractus', 'Druddigon', 'Pawniard', 'Rufflet', 'Vullaby',
            'Heatmor', 'Durant', 'Deino', 'Espurr', 'Spritzee',
            'Swirlix', 'Bergmite', 'Phantump', 'Pumpkaboo', 'Dedenne',
            'Carbink'
        ]
    },
    Legendary: {
        rate: 0.02, // 2%
        pokemon: [
            // Original 8
            'Moltres', 'Articuno', 'Zapdos', 'Raikou', 'Entei',
            'Suicune', 'Celebi', 'Lugia',
            // New 20 Legendary Pokemon (including Mew and Mewtwo)
            'Mew', 'Mewtwo', 'HoOh', 'Latias', 'Latios',
            'Jirachi', 'Deoxys', 'Uxie', 'Mesprit', 'Azelf',
            'Heatran', 'Regigigas', 'Cresselia', 'Darkrai', 'Shaymin',
            'Arceus', 'Victini', 'Cobalion', 'Terrakion', 'Virizion'
        ]
    }
};

module.exports = { GACHA_RARITY };
