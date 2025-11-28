-- Migration: Add Google OAuth fields to users table
-- Allows users to sign in with Google

-- Add google_id column for storing Google's unique user ID
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;

-- Make password_hash nullable for Google OAuth users (they won't have a password)
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Make email not unique (Google users might share email with existing account)
-- Actually, keep email unique but allow linking
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);

-- Add index for Google ID lookups
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);