-- Base Tournament Schema
-- Run this BEFORE tournament_migration.sql

-- Users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  rating INTEGER DEFAULT 1000,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pokemon Rosters table
CREATE TABLE IF NOT EXISTS pokemon_rosters (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  pokemon_data JSONB NOT NULL,
  turn_number INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  start_time TIMESTAMP NOT NULL,
  max_players INTEGER NOT NULL,
  entries_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tournament Entries table
CREATE TABLE IF NOT EXISTS tournament_entries (
  id SERIAL PRIMARY KEY,
  tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  roster_id INTEGER REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(tournament_id, user_id)
);

-- Tournament Matches table
CREATE TABLE IF NOT EXISTS tournament_matches (
  id SERIAL PRIMARY KEY,
  tournament_id INTEGER REFERENCES tournaments(id) ON DELETE CASCADE,
  round INTEGER NOT NULL,
  position INTEGER NOT NULL,
  player1_roster_id INTEGER REFERENCES pokemon_rosters(id),
  player1_user_id INTEGER REFERENCES users(id),
  player2_roster_id INTEGER REFERENCES pokemon_rosters(id),
  player2_user_id INTEGER REFERENCES users(id),
  winner_roster_id INTEGER REFERENCES pokemon_rosters(id),
  winner_user_id INTEGER REFERENCES users(id),
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tournament_entries_tournament 
ON tournament_entries(tournament_id);

CREATE INDEX IF NOT EXISTS idx_tournament_entries_user 
ON tournament_entries(user_id);

CREATE INDEX IF NOT EXISTS idx_tournaments_status 
ON tournaments(status);

CREATE INDEX IF NOT EXISTS idx_tournaments_start_time 
ON tournaments(start_time);

-- Add username columns to matches for easier display
ALTER TABLE tournament_matches 
ADD COLUMN IF NOT EXISTS player1_username VARCHAR(255),
ADD COLUMN IF NOT EXISTS player2_username VARCHAR(255);

COMMENT ON TABLE tournaments IS 'Tournament competitions';
COMMENT ON TABLE tournament_entries IS 'Players registered for tournaments';
COMMENT ON TABLE tournament_matches IS 'Individual matches in tournament brackets';
