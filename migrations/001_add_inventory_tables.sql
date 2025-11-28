-- Migration: Add Pokemon and Support Inventory Tables
-- Version: 001
-- Description: Adds pokemon_inventory, support_inventory, and active_careers tables for server-authoritative model

-- Add primos column to users table if it doesn't exist
ALTER TABLE users
ADD COLUMN IF NOT EXISTS primos INTEGER DEFAULT 1000 NOT NULL;

-- Pokemon inventory (gacha pulls)
CREATE TABLE IF NOT EXISTS pokemon_inventory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon_name VARCHAR(50) NOT NULL,
    pokemon_data JSONB NOT NULL,
    acquired_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Support card inventory (gacha pulls)
CREATE TABLE IF NOT EXISTS support_inventory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    support_name VARCHAR(100) NOT NULL,
    support_data JSONB NOT NULL,
    acquired_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Active careers (in-progress)
CREATE TABLE IF NOT EXISTS active_careers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    career_state JSONB NOT NULL,
    last_updated TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT active_careers_user_id_unique UNIQUE (user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_pokemon_inventory_user_id ON pokemon_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_pokemon_inventory_acquired_at ON pokemon_inventory(acquired_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_inventory_user_id ON support_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_support_inventory_acquired_at ON support_inventory(acquired_at DESC);
CREATE INDEX IF NOT EXISTS idx_active_careers_user_id ON active_careers(user_id);

-- Update existing users to have starting primos (only if they don't have any)
UPDATE users SET primos = 500 WHERE primos = 0;
