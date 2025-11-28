-- PvP Matchmaking Tables Migration
-- Run this migration to add matchmaking support

-- Matchmaking queue table
CREATE TABLE IF NOT EXISTS pvp_queue (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon1_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    pokemon2_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    pokemon3_roster_id INTEGER NOT NULL REFERENCES pokemon_rosters(id) ON DELETE CASCADE,
    rating_at_queue INTEGER NOT NULL,
    queued_at TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(20) DEFAULT 'waiting' NOT NULL,
    matched_with_id INTEGER REFERENCES pvp_queue(id) ON DELETE SET NULL,
    match_id INTEGER REFERENCES pvp_matches(id) ON DELETE SET NULL,
    CONSTRAINT unique_user_in_queue UNIQUE (user_id),
    CONSTRAINT status_check CHECK (status IN ('waiting', 'matched', 'completed'))
);

-- Extend pvp_matches table with new columns
ALTER TABLE pvp_matches ADD COLUMN IF NOT EXISTS match_type VARCHAR(20) DEFAULT 'quick';
ALTER TABLE pvp_matches ADD COLUMN IF NOT EXISTS is_ai_opponent BOOLEAN DEFAULT false;
ALTER TABLE pvp_matches ADD COLUMN IF NOT EXISTS player1_rating_change INTEGER;
ALTER TABLE pvp_matches ADD COLUMN IF NOT EXISTS player2_rating_change INTEGER;
ALTER TABLE pvp_matches ADD COLUMN IF NOT EXISTS battles_won_p1 INTEGER;
ALTER TABLE pvp_matches ADD COLUMN IF NOT EXISTS battles_won_p2 INTEGER;
ALTER TABLE pvp_matches ADD COLUMN IF NOT EXISTS player1_team JSONB;
ALTER TABLE pvp_matches ADD COLUMN IF NOT EXISTS player2_team JSONB;

-- Indexes for queue performance
CREATE INDEX IF NOT EXISTS idx_pvp_queue_user ON pvp_queue(user_id);
CREATE INDEX IF NOT EXISTS idx_pvp_queue_rating ON pvp_queue(rating_at_queue);
CREATE INDEX IF NOT EXISTS idx_pvp_queue_status ON pvp_queue(status);
CREATE INDEX IF NOT EXISTS idx_pvp_queue_queued_at ON pvp_queue(queued_at);

-- Index for match type queries
CREATE INDEX IF NOT EXISTS idx_pvp_matches_type ON pvp_matches(match_type);