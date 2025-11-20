const { Pool } = require('pg');
const fs = require('fs');

async function migrate() {
    const pool = new Pool({
        connectionString: "postgresql://postgres:WzDNXoNBDhBsVXPAodTIJAWlnQlQYIoG@crossover.proxy.rlwy.net:53524/railway",
        ssl: { rejectUnauthorized: false }
    });

    try {
        const sql = fs.readFileSync('tournament_migration.sql', 'utf8');
        console.log('Adding battle results columns...');
        await pool.query(sql);
        console.log('✓ Migration successful!');
    } catch (error) {
        console.error('Migration failed:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

migrate();