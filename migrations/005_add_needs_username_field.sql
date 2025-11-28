-- Migration: Add needs_username field for Google OAuth users
-- This allows new Google users to choose their own username after registration

ALTER TABLE users ADD COLUMN IF NOT EXISTS needs_username BOOLEAN DEFAULT false;

-- Index for quick lookup of users needing username setup
CREATE INDEX IF NOT EXISTS idx_users_needs_username ON users(needs_username) WHERE needs_username = true;
