const { Pool } = require('pg');
const fs = require('fs');

async function migrateBase() {
    const pool = new Pool({
        connectionString: "postgresql://postgres:WzDNXoNBDhBsVXPAodTIJAWlnQlQYIoG@crossover.proxy.rlwy.net:53524/railway",
        ssl: { rejectUnauthorized: false }
    });

    try {
        const sql = fs.readFileSync('tournament_base_schema.sql', 'utf8');
        console.log('Creating base tournament tables...');
        await pool.query(sql);
        console.log('✓ Base schema created successfully!');
    } catch (error) {
        console.error('Migration failed:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

migrateBase();