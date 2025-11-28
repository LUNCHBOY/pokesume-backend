-- Migration: Add Badges Table
-- Version: 002
-- Description: Adds user_badges table for tracking gym badge collection from tournaments

-- User badges table
CREATE TABLE IF NOT EXISTS user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_key VARCHAR(50) NOT NULL,
    level INTEGER DEFAULT 1 NOT NULL,
    first_earned_at TIMESTAMP DEFAULT NOW() NOT NULL,
    last_upgraded_at TIMESTAMP DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, badge_key)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_badge_key ON user_badges(badge_key);

-- Add gym_theme column to tournaments table
ALTER TABLE tournaments
ADD COLUMN IF NOT EXISTS gym_theme VARCHAR(50);
