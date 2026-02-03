# Axion Helmets - Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying the Axion Helmets e-commerce application to production.

**Stack:**
- Backend: Render (or Railway)
- Frontend: Vercel
- Database: MongoDB Atlas

---

## 📋 Pre-Deployment Checklist

- [ ] Code tested locally
- [ ] Environment variables documented
- [ ] Git repository created
- [ ] MongoDB Atlas account created
- [ ] Render/Railway account created
- [ ] Vercel account created

---

## 1️⃣ Setup MongoDB Atlas

### Create Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Replace `<password>` with your database password

**Example:**
```
mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/axion-helmets?retryWrites=true&w=majority
```

### Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

---

## 2️⃣ Deploy Backend to Render

### Prepare Backend

1. **Create `.gitignore`** (already exists)
   ```
   node_modules/
   .env
   *.log
   .DS_Store
   ```

2. **Update `package.json`** - Add engines:
   ```json
   "engines": {
     "node": ">=16.0.0"
   }
   ```

### Deploy to Render

1. **Push to GitHub:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Render Service:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select `backend` folder (or root if backend is in root)

3. **Configure Service:**
   - **Name:** `axion-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. **Add Environment Variables:**
   ```
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-random-secret-key>
   NODE_ENV=production
   PORT=5000
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL: `https://axion-backend.onrender.com`

### Test Backend

```bash
curl https://axion-backend.onrender.com/api/products
```

Should return product list.

---

## 3️⃣ Deploy Frontend to Vercel

### Prepare Frontend

1. **Create `vercel.json`** (optional):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "framework": "nextjs"
   }
   ```

2. **Update `.gitignore`** (create if needed):
   ```
   node_modules/
   .next/
   .env.local
   .DS_Store
   ```

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin <your-frontend-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select `frontend` folder

3. **Configure Project:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `frontend` (if in subfolder)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

4. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://axion-backend.onrender.com/api
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build (2-5 minutes)
   - Get your live URL: `https://axion-helmets.vercel.app`

---

## 4️⃣ Post-Deployment Testing

### Test Complete Flow

1. **Visit Frontend:**
   - Open `https://axion-helmets.vercel.app`
   - Verify products load

2. **Test Registration:**
   - Create new account
   - Verify JWT token saved

3. **Test Shopping:**
   - Add products to cart
   - Proceed to checkout
   - Complete order

4. **Test Order History:**
   - Navigate to `/orders`
   - Verify order appears

### Common Issues

**Products not loading:**
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running
- Check browser console for CORS errors

**Authentication failing:**
- Verify `JWT_SECRET` is set in backend
- Check token is being sent in headers

**Database errors:**
- Verify MongoDB Atlas connection string
- Check IP whitelist includes 0.0.0.0/0

---

## 5️⃣ Environment Variables Summary

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-here
NODE_ENV=production
PORT=5000
```

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://axion-backend.onrender.com/api
```

---

## 6️⃣ Continuous Deployment

Both Render and Vercel support automatic deployments:

- **Push to `main` branch** → Auto-deploy
- **Pull requests** → Preview deployments
- **Rollback** → One-click in dashboard

---

## 🔒 Security Checklist

- [x] `.env` files in `.gitignore`
- [x] JWT secret is strong and random
- [x] MongoDB credentials secure
- [x] CORS configured properly
- [x] API routes protected with auth middleware

---

## 📊 Monitoring

### Render
- View logs in Render dashboard
- Monitor CPU/memory usage
- Set up alerts

### Vercel
- Analytics in Vercel dashboard
- Error tracking
- Performance metrics

---

## 🎯 Next Steps After Deployment

1. **Custom Domain** (Optional)
   - Add custom domain in Vercel
   - Configure DNS settings

2. **Payment Integration**
   - Add Stripe/Razorpay
   - Test in production

3. **Email Notifications**
   - Order confirmations
   - Password reset

4. **Analytics**
   - Google Analytics
   - User tracking

---

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check logs in Render dashboard
# Verify all env variables are set
# Check MongoDB connection
```

### Frontend build fails
```bash
# Check build logs in Vercel
# Verify all dependencies installed
# Check for TypeScript errors
```

### CORS errors
```bash
# Ensure backend has cors() middleware
# Check NEXT_PUBLIC_API_URL is correct
```

---

**Deployment Status:** Ready for production 🚀
