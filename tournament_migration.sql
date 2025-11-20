-- Migration: Add battle results support to tournament matches
-- Run this on your database

-- Add columns for tracking tournament rounds
ALTER TABLE tournaments 
ADD COLUMN IF NOT EXISTS current_round INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_rounds INTEGER DEFAULT 0;

-- Add battle_results column to store detailed replay data
ALTER TABLE tournament_matches 
ADD COLUMN IF NOT EXISTS battle_results JSONB;

-- Add index for faster bracket queries
CREATE INDEX IF NOT EXISTS idx_tournament_matches_round 
ON tournament_matches(tournament_id, round);

-- Add index for player lookups
CREATE INDEX IF NOT EXISTS idx_tournament_matches_players 
ON tournament_matches(player1_user_id, player2_user_id);

-- Update existing tournaments to have round info
UPDATE tournaments 
SET current_round = 1, total_rounds = 0 
WHERE current_round IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN tournament_matches.battle_results IS 
'JSON containing battle replay data: {score, winner, battleLog[{tick, player, opponent, log}]}';

COMMENT ON COLUMN tournaments.current_round IS 
'Current active round (1-indexed)';

COMMENT ON COLUMN tournaments.total_rounds IS 
'Total number of rounds in bracket (calculated from player count)';
