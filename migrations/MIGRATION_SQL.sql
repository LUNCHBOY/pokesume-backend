-- ============================================================================
-- POKESUME DATABASE MIGRATION
-- Version: 001
-- Description: Add inventory tables for server-authoritative model
-- ============================================================================

-- Step 1: Add primos column to users table
-- This adds currency for the gacha system
ALTER TABLE users
ADD COLUMN IF NOT EXISTS primos INTEGER DEFAULT 0 NOT NULL;

-- Step 2: Create pokemon_inventory table
-- Stores Pokemon obtained from gacha pulls
CREATE TABLE IF NOT EXISTS pokemon_inventory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pokemon_name VARCHAR(50) NOT NULL,
    pokemon_data JSONB NOT NULL,
    acquired_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Step 3: Create support_inventory table
-- Stores Support cards obtained from gacha pulls
CREATE TABLE IF NOT EXISTS support_inventory (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    support_name VARCHAR(100) NOT NULL,
    support_data JSONB NOT NULL,
    acquired_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Step 4: Create active_careers table
-- Stores in-progress career state (one per user)
CREATE TABLE IF NOT EXISTS active_careers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    career_state JSONB NOT NULL,
    last_updated TIMESTAMP DEFAULT NOW() NOT NULL,
    CONSTRAINT active_careers_user_id_unique UNIQUE (user_id)
);

-- Step 5: Create performance indexes
CREATE INDEX IF NOT EXISTS idx_pokemon_inventory_user_id ON pokemon_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_pokemon_inventory_acquired_at ON pokemon_inventory(acquired_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_inventory_user_id ON support_inventory(user_id);
CREATE INDEX IF NOT EXISTS idx_support_inventory_acquired_at ON support_inventory(acquired_at DESC);
CREATE INDEX IF NOT EXISTS idx_active_careers_user_id ON active_careers(user_id);

-- Step 6: Give existing users starting currency
UPDATE users SET primos = 500 WHERE primos = 0;

-- ============================================================================
-- VERIFICATION QUERIES (Run these after migration to verify)
-- ============================================================================

-- Verify all tables exist
-- SELECT table_name
-- FROM information_schema.tables
-- WHERE table_schema = 'public'
-- AND table_name IN ('pokemon_inventory', 'support_inventory', 'active_careers');
-- Expected: 3 rows

-- Verify primos column exists
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'users'
-- AND column_name = 'primos';
-- Expected: 1 row (integer type, default 0)

-- Check how many users have primos
-- SELECT COUNT(*), AVG(primos), MIN(primos), MAX(primos) FROM users;
