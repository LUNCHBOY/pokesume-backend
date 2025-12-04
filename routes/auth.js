const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const db = require('../config/database');
const { SUPPORT_CARDS } = require('../shared/gameData');

const router = express.Router();

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Common supports granted to new accounts
const STARTER_SUPPORTS = ['Whitney', 'Chuck', 'Pryce', 'Wattson', 'Flannery'];

// Grant starter supports to a new user
async function grantStarterSupports(userId) {
  try {
    for (const supportName of STARTER_SUPPORTS) {
      const supportData = SUPPORT_CARDS[supportName];
      if (supportData) {
        await db.query(
          `INSERT INTO support_inventory (user_id, support_name, support_data)
           VALUES ($1, $2, $3)`,
          [userId, supportName, JSON.stringify(supportData)]
        );
      }
    }
    console.log(`[Auth] Granted ${STARTER_SUPPORTS.length} starter supports to user ${userId}`);
  } catch (error) {
    console.error('[Auth] Error granting starter supports:', error);
  }
}

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password required' });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: 'Username must be 3-20 characters' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user with starting primos (10000 for new accounts)
    const result = await db.query(
      `INSERT INTO users (username, email, password_hash, rating, primos, created_at)
       VALUES ($1, $2, $3, 1000, 10000, NOW())
       RETURNING id, username, email, rating, primos, created_at`,
      [username, email, passwordHash]
    );

    const user = result.rows[0];

    // Grant starter supports to new user
    await grantStarterSupports(user.id);

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rating: user.rating,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const result = await db.query(
      'SELECT id, username, email, password_hash, rating FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rating: user.rating
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await db.query(
      'SELECT id, username, email, rating FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ valid: true, user: result.rows[0] });
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
});

// Google OAuth login/register
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Google credential required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    // Check if user exists with this Google ID
    let result = await db.query(
      'SELECT id, username, email, rating, needs_username FROM users WHERE google_id = $1',
      [googleId]
    );

    let user;
    let isNewUser = false;

    if (result.rows.length > 0) {
      // Existing Google user - log them in
      user = result.rows[0];
    } else {
      // Check if email already exists (link accounts)
      result = await db.query(
        'SELECT id, username, email, rating, google_id FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length > 0) {
        // Link Google account to existing user
        user = result.rows[0];
        await db.query(
          'UPDATE users SET google_id = $1 WHERE id = $2',
          [googleId, user.id]
        );
      } else {
        // Create new user with Google account
        // Use a temporary username - user will choose their own
        const tempUsername = `Trainer${Date.now()}`;

        // Create the new user with temporary username (10000 starting primos)
        result = await db.query(
          `INSERT INTO users (username, email, google_id, rating, primos, needs_username, created_at)
           VALUES ($1, $2, $3, 1000, 10000, true, NOW())
           RETURNING id, username, email, rating, primos, needs_username, created_at`,
          [tempUsername, email, googleId]
        );

        user = result.rows[0];
        isNewUser = true;

        // Grant starter supports to new user
        await grantStarterSupports(user.id);
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: isNewUser ? 'Account created with Google' : 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rating: user.rating,
        needsUsername: user.needs_username || false
      },
      isNewUser
    });
  } catch (error) {
    console.error('Google auth error:', error.message, error.stack);
    // Return more detailed error for debugging
    const errorMessage = error.message.includes('column')
      ? 'Database schema error - migrations may need to be run'
      : 'Google authentication failed';
    res.status(500).json({ error: errorMessage, details: error.message });
  }
});

// Set username for new Google users
router.post('/set-username', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = req.body;

    // Validate username
    if (!username || username.length < 3 || username.length > 20) {
      return res.status(400).json({ error: 'Username must be 3-20 characters' });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({ error: 'Username can only contain letters, numbers, and underscores' });
    }

    // Check if username is taken
    const existing = await db.query(
      'SELECT id FROM users WHERE username = $1 AND id != $2',
      [username, decoded.userId]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Update username and clear needs_username flag
    const result = await db.query(
      `UPDATE users SET username = $1, needs_username = false
       WHERE id = $2
       RETURNING id, username, email, rating`,
      [username, decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Generate new JWT with updated username
    const newToken = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Username set successfully',
      token: newToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rating: user.rating,
        needsUsername: false
      }
    });
  } catch (error) {
    console.error('Set username error:', error);
    res.status(500).json({ error: 'Failed to set username' });
  }
});

module.exports = router;
