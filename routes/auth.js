const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const db = require('../config/database');

const router = express.Router();

// Initialize Google OAuth client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    // Create user with starting primos
    const result = await db.query(
      `INSERT INTO users (username, email, password_hash, rating, primos, created_at)
       VALUES ($1, $2, $3, 1000, 1000, NOW())
       RETURNING id, username, email, rating, primos, created_at`,
      [username, email, passwordHash]
    );

    const user = result.rows[0];

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
      'SELECT id, username, email, rating FROM users WHERE google_id = $1',
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
        // Generate username from Google name (sanitize and make unique)
        let baseUsername = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 15);
        if (baseUsername.length < 3) {
          baseUsername = 'Trainer' + Math.floor(Math.random() * 10000);
        }

        // Check if username exists, add number if needed
        let username = baseUsername;
        let counter = 1;
        while (true) {
          const existing = await db.query(
            'SELECT id FROM users WHERE username = $1',
            [username]
          );
          if (existing.rows.length === 0) break;
          username = `${baseUsername}${counter}`;
          counter++;
          if (counter > 100) {
            username = `Trainer${Date.now()}`;
            break;
          }
        }

        // Create the new user
        result = await db.query(
          `INSERT INTO users (username, email, google_id, rating, primos, created_at)
           VALUES ($1, $2, $3, 1000, 1000, NOW())
           RETURNING id, username, email, rating, primos, created_at`,
          [username, email, googleId]
        );

        user = result.rows[0];
        isNewUser = true;
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
        rating: user.rating
      },
      isNewUser
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
});

module.exports = router;
