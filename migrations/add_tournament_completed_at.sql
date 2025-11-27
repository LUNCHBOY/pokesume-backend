-- Add completed_at column to tournaments table for cleanup tracking
-- Run this migration to enable automatic tournament cleanup

ALTER TABLE tournaments
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP;

-- Create index for efficient cleanup queries
CREATE INDEX IF NOT EXISTS idx_tournaments_completed_at
ON tournaments(completed_at)
WHERE status = 'completed';

-- Add comment explaining the column
COMMENT ON COLUMN tournaments.completed_at IS 'Timestamp when tournament was completed, used for cleanup scheduling';
