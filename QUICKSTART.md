# Quick Start Guide - Axion E-Commerce

## ⚠️ Common Issues & Solutions

### Issue 1: "Cannot find path backend"
**Problem:** You're in the wrong directory.

**Solution:**
```powershell
# Navigate to the project root first
cd C:\Users\DEVA KUMAR\HELMATE\axion-ecommerce

# Then navigate to backend
cd backend
npm run dev
```

### Issue 2: "Registration failed. Please try again."
**Cause:** Backend server is not running OR MongoDB is not running.

**Solution:**

#### Step 1: Start MongoDB
```powershell
# Option 1: If MongoDB is installed as a service
net start MongoDB

# Option 2: If MongoDB is installed manually
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"

# Option 3: Check if MongoDB is running
Get-Process -Name mongod
```

#### Step 2: Start Backend Server
```powershell
cd C:\Users\DEVA KUMAR\HELMATE\axion-ecommerce\backend
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

#### Step 3: Start Frontend (New Terminal)
```powershell
cd C:\Users\DEVA KUMAR\HELMATE\axion-ecommerce\frontend
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000
```

---

## 🚀 Quick Start Commands

### Terminal 1 - Backend
```powershell
cd C:\Users\DEVA KUMAR\HELMATE\axion-ecommerce\backend
npm run dev
```

### Terminal 2 - Frontend
```powershell
cd C:\Users\DEVA KUMAR\HELMATE\axion-ecommerce\frontend
npm run dev
```

### Terminal 3 - MongoDB (if not running as service)
```powershell
mongod --dbpath="C:\data\db"
```

---

## 📝 Checklist Before Testing

- [ ] MongoDB is running (check with `Get-Process -Name mongod`)
- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 3000
- [ ] No error messages in terminals
- [ ] Visit `http://localhost:3000`

---

## 🔍 Verify Everything Works

1. **Check MongoDB:**
   ```powershell
   Get-Process -Name mongod
   ```
   Should show mongod process

2. **Check Backend:**
   Visit `http://localhost:5000/api/products`
   Should return JSON with products

3. **Check Frontend:**
   Visit `http://localhost:3000`
   Should show homepage with products

---

## 🐛 Debugging Registration Error

If registration still fails after starting MongoDB and backend:

1. **Check browser console** (F12) for errors
2. **Check backend terminal** for error messages
3. **Verify API URL** in frontend `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. **Check if user already exists** - try different email

---

## 📊 Expected Terminal Output

### Backend Terminal (when working):
```
✅ MongoDB Connected
🚀 Server running on port 5000
📍 Environment: development
```

### Frontend Terminal (when working):
```
ready - started server on 0.0.0.0:3000
event - compiled client and server successfully
```

---

## 🆘 Still Having Issues?

1. Restart all servers
2. Clear browser cache
3. Check if ports 3000 and 5000 are available
4. Verify MongoDB data directory exists: `C:\data\db`
