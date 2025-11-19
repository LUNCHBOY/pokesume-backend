-- Pokesume Backend Database Schema
-- PostgreSQL

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rating INTEGER DEFAULT 1000 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    last_login TIMESTAMP,
    CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 20)
);

-- Pokemon rosters table (saved career completions)
CREATE TABLE IF NOT EXISTS pokemon_rosters (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon_data JSONB NOT NULL,
    turn_number INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT turn_number_valid CHECK (turn_number >= 1 AND turn_number <= 60)
);

-- Battle replays table (optional: store individual battle data)
CREATE TABLE IF NOT EXISTS battle_replays (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon_roster_id INTEGER REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    battle_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- PVP matches table
CREATE TABLE IF NOT EXISTS pvp_matches (
    id SERIAL PRIMARY KEY,
    player1_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    player2_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    winner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    replay_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT valid_winner CHECK (winner_id = player1_id OR winner_id = player2_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_rating ON users(rating DESC);
CREATE INDEX IF NOT EXISTS idx_pokemon_rosters_user_id ON pokemon_rosters(user_id);
CREATE INDEX IF NOT EXISTS idx_pokemon_rosters_created_at ON pokemon_rosters(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pokemon_rosters_turn ON pokemon_rosters(turn_number);
CREATE INDEX IF NOT EXISTS idx_battle_replays_user_id ON battle_replays(user_id);
CREATE INDEX IF NOT EXISTS idx_pvp_matches_player1 ON pvp_matches(player1_id);
CREATE INDEX IF NOT EXISTS idx_pvp_matches_player2 ON pvp_matches(player2_id);
CREATE INDEX IF NOT EXISTS idx_pvp_matches_winner ON pvp_matches(winner_id);
CREATE INDEX IF NOT EXISTS idx_pvp_matches_created_at ON pvp_matches(created_at DESC);

-- Sample queries for testing

-- Get user with stats
-- SELECT u.*, 
--   (SELECT COUNT(*) FROM pvp_matches WHERE winner_id = u.id) as wins,
--   (SELECT COUNT(*) FROM pvp_matches WHERE (player1_id = u.id OR player2_id = u.id) AND winner_id != u.id) as losses
-- FROM users u WHERE id = 1;

-- Get leaderboard
-- SELECT 
--   u.id, u.username, u.rating,
--   (SELECT COUNT(*) FROM pvp_matches WHERE winner_id = u.id) as wins,
--   (SELECT COUNT(*) FROM pvp_matches WHERE (player1_id = u.id OR player2_id = u.id) AND winner_id != u.id) as losses,
--   ROW_NUMBER() OVER (ORDER BY u.rating DESC) as rank
-- FROM users u
-- ORDER BY u.rating DESC
-- LIMIT 100;

-- Get available opponents
-- SELECT DISTINCT ON (pr.user_id)
--   pr.id, pr.pokemon_data, pr.turn_number, u.username, u.rating
-- FROM pokemon_rosters pr
-- JOIN users u ON pr.user_id = u.id
-- WHERE pr.user_id != 1
--   AND u.rating BETWEEN 800 AND 1200
--   AND pr.turn_number >= 50
-- ORDER BY pr.user_id, pr.created_at DESC
-- LIMIT 20;
