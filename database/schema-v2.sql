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
    primos INTEGER DEFAULT 1000 NOT NULL,
    profile_icon VARCHAR(50) DEFAULT 'pikachu' NOT NULL,
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
    player2_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- NULL for AI opponents
    winner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    replay_data JSONB NOT NULL,
    match_type VARCHAR(20) DEFAULT 'quick' NOT NULL,
    is_ai_opponent BOOLEAN DEFAULT false NOT NULL,
    player1_rating_change INTEGER,
    player2_rating_change INTEGER,
    battles_won_p1 INTEGER DEFAULT 0,
    battles_won_p2 INTEGER DEFAULT 0,
    player1_team JSONB,
    player2_team JSONB,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT pvp_matches_player1_id_fkey FOREIGN KEY (player1_id) REFERENCES users(id),
    CONSTRAINT pvp_matches_player2_id_fkey FOREIGN KEY (player2_id) REFERENCES users(id),
    CONSTRAINT pvp_matches_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES users(id)
);

-- PVP matchmaking queue table
CREATE TABLE IF NOT EXISTS pvp_queue (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon1_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    pokemon2_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    pokemon3_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    rating_at_queue INTEGER NOT NULL,
    queued_at TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(20) DEFAULT 'waiting' NOT NULL,
    match_id INTEGER REFERENCES pvp_matches(id) ON DELETE SET NULL,
    matched_with_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT unique_user_in_queue UNIQUE (user_id),
    CONSTRAINT status_check CHECK (status IN ('waiting', 'matched', 'completed')),
    CONSTRAINT pvp_queue_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT pvp_queue_pokemon1_roster_id_fkey FOREIGN KEY (pokemon1_roster_id) REFERENCES pokemon_rosters(id),
    CONSTRAINT pvp_queue_pokemon2_roster_id_fkey FOREIGN KEY (pokemon2_roster_id) REFERENCES pokemon_rosters(id),
    CONSTRAINT pvp_queue_pokemon3_roster_id_fkey FOREIGN KEY (pokemon3_roster_id) REFERENCES pokemon_rosters(id)
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
CREATE INDEX IF NOT EXISTS idx_pvp_matches_match_type ON pvp_matches(match_type);
CREATE INDEX IF NOT EXISTS idx_pvp_queue_user_id ON pvp_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_pvp_queue_status ON pvp_queue(status);
CREATE INDEX IF NOT EXISTS idx_pvp_queue_queued_at ON pvp_queue(queued_at);
CREATE INDEX IF NOT EXISTS idx_tournaments_start_time ON tournaments(start_time);
CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_tournament_entries_tournament ON tournament_entries(tournament_id);
CREATE INDEX IF NOT EXISTS idx_tournament_entries_user ON tournament_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_tournament_matches_tournament ON tournament_matches(tournament_id);
CREATE INDEX IF NOT EXISTS idx_tournament_matches_round ON tournament_matches(tournament_id, round);
