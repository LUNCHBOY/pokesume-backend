# Deploy Pokesume Backend via GitHub to Railway

## 1. Push to GitHub

```bash
# Navigate to backend folder
cd pokesume-backend

# Initialize git (if not already done)
git init

# Set your git identity
git config user.email "your-email@example.com"
git config user.name "Your Name"

# Add all files
git add .

# Commit
git commit -m "Initial backend setup with PostgreSQL and Railway config"

# Add your GitHub repo as remote (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR_USERNAME/pokesume-backend.git

# Push to GitHub
git push -u origin master
```

## 2. Deploy to Railway from GitHub

### A. Create Railway Account
1. Go to https://railway.app
2. Click "Login"
3. Choose "Login with GitHub" ⭐ (Important!)
4. Authorize Railway to access your GitHub

### B. Create New Project from GitHub
1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Click "Configure GitHub App" if needed
4. Select your `pokesume-backend` repository
5. Click "Deploy Now"

Railway will:
- ✅ Auto-detect Node.js project
- ✅ Run `npm install`
- ✅ Start with `npm start`
- ✅ Auto-deploy on every git push

### C. Add PostgreSQL Database
1. In your project, click "+ New"
2. Select "Database"
3. Choose "Add PostgreSQL"
4. Railway auto-connects it to your app

### D. Set Environment Variables
1. Click your web service (not the database)
2. Go to "Variables" tab
3. Add these variables:

```
NODE_ENV=production
JWT_SECRET=generate_random_strong_secret_here_use_password_generator
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

Note: DATABASE_URL is automatically added by Railway from PostgreSQL service

### E. Initialize Database
After first deployment:

**Option 1 - Railway Dashboard:**
1. Click your service → "Settings"
2. Under "Deploy" find "Custom Start Command"
3. Change to: `npm run init-db`
4. Wait for deployment
5. Change back to: `npm start`

**Option 2 - Railway CLI:**
```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Run init
railway run npm run init-db
```

### F. Get Your API URL
1. Click your service
2. Go to "Settings" tab
3. Click "Generate Domain"
4. Copy URL (e.g., `https://pokesume-backend-production.up.railway.app`)

### G. Test API
```bash
# Replace with your Railway URL
curl https://your-app.railway.app/api/health
```

Should return: `{"status":"ok","timestamp":"..."}`

## 3. Future Updates

After making code changes:

```bash
git add .
git commit -m "Your changes"
git push
```

Railway automatically deploys on every push! 🚀

## 4. Update React App

In your React app (Pokesume_v2_85.tsx), you'll add API calls:

```javascript
const API_URL = 'https://your-app.railway.app/api';

// Example: Register user
fetch(`${API_URL}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, email, password })
})
```

## Benefits of GitHub + Railway

✅ Auto-deploy on git push
✅ Version control for backend
✅ Easy rollback to previous versions
✅ Team collaboration ready
✅ Free tier available

## Important Security Notes

- ❌ Never commit `.env` file (already in .gitignore)
- ❌ Never hardcode secrets in code
- ✅ Use Railway environment variables for secrets
- ✅ Keep repository private (has sensitive configs)

## Troubleshooting

**"Module not found" errors:**
- Railway runs `npm install` automatically
- Check package.json is committed

**Database connection errors:**
- Verify PostgreSQL service is running
- Check DATABASE_URL in variables

**Port errors:**
- Server.js already configured for Railway's PORT variable

**CORS errors:**
- Update CLIENT_URL to your React app URL after deploying it
