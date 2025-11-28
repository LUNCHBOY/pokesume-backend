-- Migration: Add profile_icon column to users table
-- This field stores the user's selected profile avatar icon

ALTER TABLE users
ADD COLUMN IF NOT EXISTS profile_icon VARCHAR(50) DEFAULT 'pikachu' NOT NULL;
