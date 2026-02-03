# Local Testing Guide - Axion E-Commerce

## 🧪 Complete Testing Checklist

Follow this guide to test all features before deployment.

---

## ✅ Pre-Test Setup

### 1. Start MongoDB
```powershell
# Check if MongoDB is running
Get-Process -Name mongod

# If not running, start it
net start MongoDB
```

### 2. Start Backend
```powershell
cd C:\Users\DEVA KUMAR\HELMATE\axion-ecommerce\backend
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

### 3. Seed Database (First time only)
```powershell
# In backend directory
node seed.js
```

### 4. Start Frontend (New Terminal)
```powershell
cd C:\Users\DEVA KUMAR\HELMATE\axion-ecommerce\frontend
npm run dev
```

**Expected Output:**
```
ready - started server on 0.0.0.0:3000
```

---

## 📋 Testing Checklist

### ✅ Test 1: Products Load from Database

**Steps:**
1. Open browser: `http://localhost:3000`
2. Check homepage loads
3. Verify product cards display
4. Check product images, names, prices

**Expected:**
- ✅ Products visible in grid
- ✅ Product slider works
- ✅ "Add to Cart" buttons visible

**If fails:**
- Check backend is running
- Check MongoDB has products: `node seed.js`
- Check browser console (F12) for errors

---

### ✅ Test 2: User Registration

**Steps:**
1. Navigate to: `http://localhost:3000/register`
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Sign Up"
4. Open browser console (F12)

**Expected:**
- ✅ Redirects to homepage
- ✅ Navbar shows "Hi, Test User"
- ✅ No error messages

**If fails:**
- Check error message in UI
- Check console (F12) for details
- Verify backend is running
- Check MongoDB connection

**Common Errors:**
- "Cannot connect to server" → Backend not running
- "User already exists" → Use different email
- "Registration failed" → Check backend logs

---

### ✅ Test 3: User Login

**Steps:**
1. Logout if logged in
2. Navigate to: `http://localhost:3000/login`
3. Enter credentials:
   - Email: test@example.com
   - Password: test123
4. Click "Sign In"

**Expected:**
- ✅ Redirects to homepage
- ✅ Navbar shows user name
- ✅ User stays logged in after page refresh

**If fails:**
- Check credentials are correct
- Verify user was created in Test 2
- Check backend logs

---

### ✅ Test 4: Cart Functionality

**Steps:**
1. On homepage, click "Add to Cart" on 2-3 products
2. Check navbar cart badge updates
3. Click cart icon or navigate to `/cart`
4. Verify items display correctly
5. Test quantity controls:
   - Click + to increase
   - Click - to decrease
   - Click trash icon to remove
6. Check price calculations

**Expected:**
- ✅ Cart badge shows correct count
- ✅ Cart page shows all items
- ✅ Quantity updates work
- ✅ Subtotal, tax, total calculate correctly
- ✅ Cart persists after page refresh

**Calculations:**
- Subtotal = Sum of (price × quantity)
- Tax = Subtotal × 10%
- Shipping = $10 (or FREE if subtotal > $100)
- Total = Subtotal + Tax + Shipping

---

### ✅ Test 5: Checkout Process

**Steps:**
1. Ensure you're logged in
2. Add items to cart
3. Navigate to `/cart`
4. Click "Proceed to Checkout"
5. Fill shipping form:
   - Full Name: Test User
   - Address: 123 Test St
   - City: Test City
   - Postal Code: 12345
   - Country: USA
   - Phone: 1234567890
6. Select payment method (Card/PayPal/COD)
7. Review order summary
8. Click "Place Order"

**Expected:**
- ✅ Form validates required fields
- ✅ Order summary shows correct totals
- ✅ Redirects to order success page
- ✅ Cart clears after order

**If fails:**
- Check you're logged in
- Verify backend `/api/orders` endpoint
- Check browser console
- Check backend terminal for errors

---

### ✅ Test 6: Order Success Page

**Steps:**
1. After placing order (Test 5)
2. Verify order success page displays
3. Check order details shown

**Expected:**
- ✅ Success message displays
- ✅ Order ID shown
- ✅ Order date displayed
- ✅ Items list correct
- ✅ Total amount correct
- ✅ Shipping address shown

---

### ✅ Test 7: Order History

**Steps:**
1. Navigate to: `http://localhost:3000/orders`
2. Verify orders list displays
3. Check order details

**Expected:**
- ✅ All user orders shown
- ✅ Order status displayed
- ✅ Order dates correct
- ✅ Total amounts shown
- ✅ Items listed per order

**If fails:**
- Ensure you're logged in
- Verify orders were created in Test 5
- Check backend `/api/orders/myorders` endpoint

---

## 🔍 Backend API Testing

### Test Endpoints Directly

**1. Products:**
```powershell
# Browser or curl
http://localhost:5000/api/products
```

**2. Register:**
```powershell
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"API Test","email":"apitest@test.com","password":"test123"}'
```

**3. Login:**
```powershell
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"apitest@test.com","password":"test123"}'
```

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to server"
**Solution:**
- Check backend is running on port 5000
- Verify `frontend/.env.local` has correct API URL
- Check CORS is enabled in backend

### Issue: "Products not loading"
**Solution:**
- Run `node seed.js` in backend
- Check MongoDB is running
- Verify backend logs show "MongoDB Connected"

### Issue: "Registration failed"
**Solution:**
- Check backend terminal for error
- Open browser console (F12)
- Verify MongoDB connection
- Try different email

### Issue: "Cart not persisting"
**Solution:**
- Check browser localStorage (F12 → Application → Local Storage)
- Clear cache and try again

### Issue: "Order not saving"
**Solution:**
- Ensure you're logged in
- Check backend logs
- Verify MongoDB connection
- Check JWT token in localStorage

---

## ✅ Final Checklist

Before deployment, ensure ALL tests pass:

- [ ] MongoDB running
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Products load correctly
- [ ] User can register
- [ ] User can login
- [ ] Cart adds/removes items
- [ ] Cart calculations correct
- [ ] Checkout form works
- [ ] Order saves to database
- [ ] Order success page shows
- [ ] Order history displays
- [ ] No console errors
- [ ] No backend errors

---

## 📊 Test Data

Use these test accounts:

**User 1:**
- Email: test1@example.com
- Password: test123

**User 2:**
- Email: test2@example.com
- Password: test123

**Test Credit Card (for future payment integration):**
- Card: 4242 4242 4242 4242
- Exp: 12/25
- CVC: 123

---

**Status:** Ready for local testing ✅
