-- Pokesume Backend Database Schema v2.0
-- Server-Authoritative Model
-- PostgreSQL

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rating INTEGER DEFAULT 1000 NOT NULL,
    primos INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    last_login TIMESTAMP,
    CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 20)
);

-- Pokemon inventory (gacha pulls)
CREATE TABLE IF NOT EXISTS pokemon_inventory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon_name VARCHAR(50) NOT NULL,
    pokemon_data JSONB NOT NULL, -- Full Pokemon data: name, type, baseStats, typeAptitudes, strategy, etc
    acquired_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT pokemon_inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Support card inventory (gacha pulls)
CREATE TABLE IF NOT EXISTS support_inventory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    support_name VARCHAR(100) NOT NULL,
    support_data JSONB NOT NULL, -- Full support card data: trainer, pokemon, rarity, bonuses, etc
    acquired_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT support_inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Trained Pokemon (career completions)
CREATE TABLE IF NOT EXISTS pokemon_rosters (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon_data JSONB NOT NULL, -- Full trained Pokemon: stats, moves, aptitudes, inspirations
    turn_number INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT turn_number_valid CHECK (turn_number >= 1 AND turn_number <= 60),
    CONSTRAINT pokemon_rosters_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Active careers (in-progress)
CREATE TABLE IF NOT EXISTS active_careers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    career_state JSONB NOT NULL, -- Complete career state: pokemon, stats, energy, turn, history, etc
    last_updated TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT active_careers_user_id_unique UNIQUE (user_id),
    CONSTRAINT active_careers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Battle replays table (optional: store individual battle data)
CREATE TABLE IF NOT EXISTS battle_replays (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon_roster_id INTEGER REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    battle_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT battle_replays_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- PVP matches table
CREATE TABLE IF NOT EXISTS pvp_matches (
    id SERIAL PRIMARY KEY,
    player1_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    player2_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    winner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    replay_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT valid_winner CHECK (winner_id = player1_id OR winner_id = player2_id),
    CONSTRAINT pvp_matches_player1_id_fkey FOREIGN KEY (player1_id) REFERENCES users(id),
    CONSTRAINT pvp_matches_player2_id_fkey FOREIGN KEY (player2_id) REFERENCES users(id),
    CONSTRAINT pvp_matches_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES users(id)
);

-- Tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'upcoming' NOT NULL,
    max_players INTEGER DEFAULT 64 NOT NULL,
    current_round INTEGER DEFAULT 0 NOT NULL,
    total_rounds INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT status_check CHECK (status IN ('upcoming', 'registration', 'in_progress', 'completed', 'cancelled')),
    CONSTRAINT max_players_power_of_2 CHECK (max_players IN (4, 8, 16, 32, 64, 128))
);

-- Tournament entries (3-Pokemon teams)
CREATE TABLE IF NOT EXISTS tournament_entries (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon1_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    pokemon2_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    pokemon3_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    bracket_position INTEGER,
    submitted_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_tournament_entry UNIQUE (tournament_id, user_id),
    CONSTRAINT tournament_entries_tournament_id_fkey FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
    CONSTRAINT tournament_entries_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT tournament_entries_pokemon1_roster_id_fkey FOREIGN KEY (pokemon1_roster_id) REFERENCES pokemon_rosters(id),
    CONSTRAINT tournament_entries_pokemon2_roster_id_fkey FOREIGN KEY (pokemon2_roster_id) REFERENCES pokemon_rosters(id),
    CONSTRAINT tournament_entries_pokemon3_roster_id_fkey FOREIGN KEY (pokemon3_roster_id) REFERENCES pokemon_rosters(id)
);

-- Tournament matches (bracket)
CREATE TABLE IF NOT EXISTS tournament_matches (
    id SERIAL PRIMARY KEY,
    tournament_id INTEGER NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    round INTEGER NOT NULL,
    position INTEGER NOT NULL,
    player1_entry_id INTEGER REFERENCES tournament_entries(id) ON DELETE CASCADE,
    player2_entry_id INTEGER REFERENCES tournament_entries(id) ON DELETE CASCADE,
    winner_entry_id INTEGER REFERENCES tournament_entries(id) ON DELETE CASCADE,
    battle_results JSONB,
    completed_at TIMESTAMP,
    CONSTRAINT unique_match UNIQUE (tournament_id, round, position),
    CONSTRAINT tournament_matches_tournament_id_fkey FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
    CONSTRAINT tournament_matches_player1_entry_id_fkey FOREIGN KEY (player1_entry_id) REFERENCES tournament_entries(id),
    CONSTRAINT tournament_matches_player2_entry_id_fkey FOREIGN KEY (player2_entry_id) REFERENCES tournament_entries(id),
    CONSTRAINT tournament_matches_winner_entry_id_fkey FOREIGN KEY (winner_entry_id) REFERENCES tournament_entries(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_rating ON users(rating DESC);
CREATE INDEX IF NOT EXISTS idx_pokemon_inventory_user_id ON pokemon_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_pokemon_inventory_acquired_at ON pokemon_inventory(acquired_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_inventory_user_id ON support_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_support_inventory_acquired_at ON support_inventory(acquired_at DESC);
CREATE INDEX IF NOT EXISTS idx_pokemon_rosters_user_id ON pokemon_rosters(user_id);
CREATE INDEX IF NOT EXISTS idx_pokemon_rosters_created_at ON pokemon_rosters(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pokemon_rosters_turn ON pokemon_rosters(turn_number);
CREATE INDEX IF NOT EXISTS idx_active_careers_user_id ON active_careers(user_id);
CREATE INDEX IF NOT EXISTS idx_battle_replays_user_id ON battle_replays(user_id);
CREATE INDEX IF NOT EXISTS idx_pvp_matches_player1 ON pvp_matches(player1_id);
CREATE INDEX IF NOT EXISTS idx_pvp_matches_player2 ON pvp_matches(player2_id);
CREATE INDEX IF NOT EXISTS idx_pvp_matches_winner ON pvp_matches(winner_id);
CREATE INDEX IF NOT EXISTS idx_pvp_matches_created_at ON pvp_matches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tournaments_start_time ON tournaments(start_time);
CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_tournament_entries_tournament ON tournament_entries(tournament_id);
CREATE INDEX IF NOT EXISTS idx_tournament_entries_user ON tournament_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_tournament_matches_tournament ON tournament_matches(tournament_id);
CREATE INDEX IF NOT EXISTS idx_tournament_matches_round ON tournament_matches(tournament_id, round);
