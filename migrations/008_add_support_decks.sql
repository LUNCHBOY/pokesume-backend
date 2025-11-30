-- Migration: Add support_decks column to users table
-- This stores the user's 5 support decks as JSON array

ALTER TABLE users ADD COLUMN IF NOT EXISTS support_decks JSONB DEFAULT NULL;

-- Example structure:
-- [
--   [support1, support2, support3, support4, support5],  -- Deck 1
--   [support1, support2, null, null, null],              -- Deck 2
--   [null, null, null, null, null],                      -- Deck 3 (empty)
--   [null, null, null, null, null],                      -- Deck 4 (empty)
--   [null, null, null, null, null]                       -- Deck 5 (empty)
-- ]
