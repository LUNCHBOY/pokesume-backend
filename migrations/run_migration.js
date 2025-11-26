/**
 * Migration Runner Script
 *
 * Runs the database migration to add inventory tables
 */

const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

async function runMigration() {
  try {
    console.log('🔄 Starting database migration...\n');

    // Read the migration file
    const migrationPath = path.join(__dirname, '001_add_inventory_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    // Execute the migration
    await pool.query(migrationSQL);

    console.log('✅ Migration completed successfully!\n');
    console.log('The following tables have been created/updated:');
    console.log('  - pokemon_inventory');
    console.log('  - support_inventory');
    console.log('  - active_careers');
    console.log('  - users (added primos column)\n');

    // Verify tables exist
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('pokemon_inventory', 'support_inventory', 'active_careers')
    `);

    if (result.rows.length === 3) {
      console.log('✅ Verification passed: All tables exist\n');
    } else {
      console.warn('⚠️  Warning: Only', result.rows.length, 'of 3 tables found\n');
    }

    // Check primos column
    const primosCheck = await pool.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'users'
      AND column_name = 'primos'
    `);

    if (primosCheck.rows.length === 1) {
      console.log('✅ Verification passed: primos column exists in users table\n');
    } else {
      console.warn('⚠️  Warning: primos column not found in users table\n');
    }

    console.log('🎉 Migration complete! Your database is ready for the new architecture.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration();
