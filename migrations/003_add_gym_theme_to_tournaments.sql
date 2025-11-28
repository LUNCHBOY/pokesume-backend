-- Migration: Add gym_theme column to tournaments table
-- This column stores the gym theme key for tournament theming (e.g., 'brock', 'misty', etc.)

ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS gym_theme VARCHAR(50);

-- Add an index for potential filtering by gym theme
CREATE INDEX IF NOT EXISTS idx_tournaments_gym_theme ON tournaments(gym_theme);