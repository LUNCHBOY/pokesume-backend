# Pokesume Backend API

Backend server for Pokesume PVP game with PostgreSQL database.

## Setup

### Prerequisites
- Node.js 16+
- PostgreSQL 12+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Edit `.env` with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pokesume
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_random_secret_key
```

4. Create PostgreSQL database:
```bash
createdb pokesume
```

5. Initialize database schema:
```bash
npm run init-db
```

6. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `GET /api/users/stats` - Get user stats (requires auth)

### Pokemon
- `POST /api/pokemon/roster` - Save Pokemon roster (requires auth)
- `GET /api/pokemon/rosters` - Get user's rosters (requires auth)
- `GET /api/pokemon/roster/:rosterId` - Get specific roster
- `DELETE /api/pokemon/roster/:rosterId` - Delete roster (requires auth)

### PVP
- `GET /api/pvp/opponents` - Get available opponents (requires auth)
- `POST /api/pvp/battle` - Submit battle result (requires auth)
- `GET /api/pvp/matches` - Get match history (requires auth)

### Leaderboard
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/rank` - Get user's rank (requires auth)
- `GET /api/leaderboard/top-wins` - Get top players by wins

## Database Schema

Tables:
- `users` - User accounts with rating
- `pokemon_rosters` - Saved career Pokemon states
- `battle_replays` - Individual battle data
- `pvp_matches` - PVP match results
- ELO rating system for competitive ranking

## Development

Run with auto-reload:
```bash
npm run dev
```

## Project Structure
```
pokesume-backend/
├── config/
│   └── database.js       # DB connection config
├── database/
│   ├── schema.sql        # DB schema
│   └── init.js           # DB initialization script
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── users.js          # User routes
│   ├── pokemon.js        # Pokemon roster routes
│   ├── pvp.js            # PVP match routes
│   └── leaderboard.js    # Leaderboard routes
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment variables template
├── package.json
├── server.js             # Main server file
└── README.md
```
