-- Migration: Add Limit Break System
-- Version: 007
-- Description: Adds limit_break_level to inventories and limit_break_shards currency to users

-- Add limit_break_shards currency to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS limit_break_shards INTEGER DEFAULT 0 NOT NULL;

-- Add limit_break_level to pokemon_inventory
ALTER TABLE pokemon_inventory
ADD COLUMN IF NOT EXISTS limit_break_level INTEGER DEFAULT 0 NOT NULL;

-- Add constraint to ensure limit_break_level is between 0 and 4 (use DO block for idempotency)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'pokemon_limit_break_check'
  ) THEN
    ALTER TABLE pokemon_inventory
    ADD CONSTRAINT pokemon_limit_break_check CHECK (limit_break_level >= 0 AND limit_break_level <= 4);
  END IF;
END $$;

-- Add limit_break_level to support_inventory
ALTER TABLE support_inventory
ADD COLUMN IF NOT EXISTS limit_break_level INTEGER DEFAULT 0 NOT NULL;

-- Add constraint to ensure limit_break_level is between 0 and 4 (use DO block for idempotency)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'support_limit_break_check'
  ) THEN
    ALTER TABLE support_inventory
    ADD CONSTRAINT support_limit_break_check CHECK (limit_break_level >= 0 AND limit_break_level <= 4);
  END IF;
END $$;

-- Update starting primos for new accounts (handled in auth.js, this is for documentation)
-- New accounts now start with 5000 primos instead of 1000

-- Create unique constraint on pokemon_inventory (user_id, pokemon_name) to prevent true duplicates
-- This allows us to find and update existing pokemon when pulling duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_pokemon_inventory_user_pokemon
ON pokemon_inventory(user_id, pokemon_name);

-- Create unique constraint on support_inventory (user_id, support_name) to prevent true duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_support_inventory_user_support
ON support_inventory(user_id, support_name);
