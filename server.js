const cron = require('node-cron');
const { processTournaments } = require('./services/tournamentProcessor');
const matchmaker = require('./services/matchmaker');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
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
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const pokemonRoutes = require('./routes/pokemon');
const pvpRoutes = require('./routes/pvp');
const leaderboardRoutes = require('./routes/leaderboard');
const tournamentRoutes = require('./routes/tournaments');
const careerRoutes = require('./routes/career');
const inventoryRoutes = require('./routes/inventory');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/pvp', pvpRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/inventory', inventoryRoutes);

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

module.exports = { app, io };
