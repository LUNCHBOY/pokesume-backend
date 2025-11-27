const { Pool } = require('pg');

// Only use SSL for production (Railway) - local PostgreSQL typically doesn't support SSL
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000  // Increased to 10 seconds
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  // Don't exit, just log
  console.error('Database error occurred, but server will continue');
});

pool.on('connect', () => {
  console.log('[DB] Connected to PostgreSQL');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
