import cron from 'node-cron';
import { processTournaments } from './services/tournamentProcessor.js';
import matchmaker from './services/matchmaker.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import pokemonRoutes from './routes/pokemon.js';
import pvpRoutes from './routes/pvp.js';
import leaderboardRoutes from './routes/leaderboard.js';
import tournamentRoutes from './routes/tournaments.js';
import careerRoutes from './routes/career.js';
import inventoryRoutes from './routes/inventory.js';
import profileRoutes from './routes/profile.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/pvp', pvpRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/profile', profileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

// Start tournament processor with cron
cron.schedule('*/5 * * * *', async () => {
  console.log('[Cron] Running tournament processor...');
  await processTournaments();
});
console.log('[Cron] Tournament processor scheduled (every 5 minutes)');

// Start matchmaker service
matchmaker.start();

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Pokesume backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export { app, io };
