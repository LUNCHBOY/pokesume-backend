# Database Migration Guide

## Option 1: Run Migration via psql (Recommended)

If you have direct database access:

```bash
# Navigate to backend directory
cd "c:\pokesume\pokesume backend\pokesume-backend"

# Run the migration
psql -U your_username -d your_database_name -f migrations/001_add_inventory_tables.sql
```

Replace `your_username` and `your_database_name` with your actual PostgreSQL credentials.

---

## Option 2: Run via Node.js Script

Create and run this migration script:

```bash
# Create the migration runner
node migrations/run_migration.js
```

---

## Option 3: Copy-Paste SQL Directly

If you're using a database GUI (like pgAdmin, DBeaver, or Supabase dashboard):

1. Open your database query editor
2. Copy the SQL from `migrations/001_add_inventory_tables.sql`
3. Paste and execute

---

## What This Migration Does

✅ Adds `primos` column to `users` table (for currency)
✅ Creates `pokemon_inventory` table (for gacha Pokemon)
✅ Creates `support_inventory` table (for gacha Support cards)
✅ Creates `active_careers` table (for in-progress careers)
✅ Creates necessary indexes for performance
✅ Gives existing users 500 starting primos

---

## Verify Migration Success

Run this query to verify all tables exist:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('pokemon_inventory', 'support_inventory', 'active_careers');
```

Should return 3 rows.

---

## Check if primos Column Exists

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name = 'primos';
```

Should return 1 row with type `integer`.
