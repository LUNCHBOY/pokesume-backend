# Railway Deployment Guide for Pokesume Backend

## Step-by-Step Instructions

### 1. Sign Up for Railway
1. Go to https://railway.app
2. Click "Login" → Sign in with GitHub (recommended) or email
3. Verify your email if using email signup

### 2. Create New Project

**Option A: Deploy from Local Files (Recommended for now)**
1. Click "New Project"
2. Select "Empty Project"
3. Click "Create"
4. You'll see an empty project dashboard

**Option B: Deploy from GitHub (If you have a repo)**
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select your pokesume-backend repository
5. Railway will auto-detect Node.js project

### 3. Add PostgreSQL Database
1. In your project, click "+ New"
2. Select "Database"
3. Choose "Add PostgreSQL"
4. Railway will automatically provision a Postgres database
5. Database credentials are auto-generated

### 4. Upload Backend Code (If using Option A)
1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Link to your project:
   ```bash
   cd pokesume-backend
   railway link
   ```
   Select your project from the list

4. Deploy:
   ```bash
   railway up
   ```

### 5. Set Environment Variables
1. Click on your web service (Node.js app)
2. Go to "Variables" tab
3. Add these variables (Railway auto-fills database ones):

**Auto-filled by Railway (from PostgreSQL service):**
- `DATABASE_URL` - Automatically connected

**You must add manually:**
- `NODE_ENV` = `production`
- `JWT_SECRET` = `your_random_secret_here_use_strong_password`
- `JWT_EXPIRES_IN` = `7d`
- `CLIENT_URL` = `http://localhost:3000` (change later when you deploy React app)

**For manual DB variables (if DATABASE_URL not working):**
- Click "Postgres" service → "Variables" tab
- Copy these to your web service:
  - `PGHOST` → `DB_HOST`
  - `PGPORT` → `DB_PORT`
  - `PGDATABASE` → `DB_NAME`
  - `PGUSER` → `DB_USER`
  - `PGPASSWORD` → `DB_PASSWORD`

### 6. Initialize Database Schema
1. In Railway, click on your web service
2. Go to "Deployments" tab
3. Click on latest deployment
4. Click "View Logs"
5. Once deployed, go to "Settings" tab
6. Under "Deploy" section, find "Custom Start Command"
7. Temporarily change to: `npm run init-db`
8. Wait for deployment to complete (watch logs)
9. Change back to: `npm start`

**Alternative - Use Railway CLI:**
```bash
railway run npm run init-db
```

### 7. Get Your API URL
1. Click on your web service
2. Go to "Settings" tab
3. Scroll to "Environment"
4. Click "Generate Domain"
5. Copy your URL (e.g., `https://pokesume-backend-production.up.railway.app`)

### 8. Test Your API
```bash
# Health check
curl https://your-railway-url.railway.app/api/health

# Register test user
curl -X POST https://your-railway-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"password123"}'
```

### 9. Update React App
In your React app, update API URL to your Railway domain:
```javascript
const API_URL = 'https://your-railway-url.railway.app/api';
```

### 10. Enable CORS for Production
Update `CLIENT_URL` environment variable in Railway:
- Set to your React app URL (e.g., Vercel/Netlify URL)
- Or use `*` for testing (not recommended for production)

## Railway Dashboard Features

### Monitoring
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Deployments**: History of all deployments

### Settings
- **Custom Domain**: Add your own domain
- **Environment Variables**: Manage secrets
- **Health Checks**: Configure health check endpoint
- **Restart Policy**: Already configured in railway.json

## Pricing
- **Free Tier**: $5 credit/month (enough for hobby projects)
- **Developer Plan**: $5/month + usage
- **Team Plan**: $20/month + usage

Usage costs:
- ~$0.000231/hour for basic web service (~$5/month if always on)
- PostgreSQL included in compute costs

## Troubleshooting

### Database Connection Issues
1. Check that DATABASE_URL is set
2. Verify Postgres service is running
3. Check logs for connection errors

### Port Issues
Server automatically uses Railway's PORT env variable (configured in server.js)

### Build Failures
1. Check logs in "Deployments" tab
2. Ensure package.json has all dependencies
3. Verify Node version in engines field

### CORS Errors
Update CLIENT_URL in environment variables to match your React app URL

## Quick Commands Reference

```bash
# Deploy latest changes
railway up

# View logs
railway logs

# Run database init
railway run npm run init-db

# Open project in browser
railway open

# Check service status
railway status
```

## Next Steps After Deployment

1. ✅ Note your API URL
2. ✅ Update React app with production API URL
3. ✅ Test all endpoints (auth, roster save, PVP)
4. ✅ Deploy React app to Vercel/Netlify
5. ✅ Update CORS settings with React app URL
6. ✅ Set up custom domain (optional)

## Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV to production
- [ ] Update CLIENT_URL to actual React app URL
- [ ] Enable Railway's built-in security features
- [ ] Monitor logs for suspicious activity

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Project Dashboard: https://railway.app/dashboard
