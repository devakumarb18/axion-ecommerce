# Axion Helmets E-Commerce

A full-stack e-commerce application for premium racing helmets built with Next.js, Express, and MongoDB.

## 🚀 Features

- **Product Catalog**: Browse premium racing helmets
- **User Authentication**: Secure JWT-based authentication
- **Shopping Cart**: Persistent cart with localStorage
- **Checkout System**: Complete order processing
- **Order Management**: View order history and status
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- Next.js (Pages Router)
- React
- Tailwind CSS
- Axios
- Swiper.js

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt

## 📦 Installation

### Prerequisites
- Node.js >= 16.0.0
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

### Seed Database

```bash
cd backend
node seed.js
```

## 🌐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/axion-helmets
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📚 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/myorders` - Get user's orders

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Backend (Render):**
1. Push to GitHub
2. Create Web Service on Render
3. Add environment variables
4. Deploy

**Frontend (Vercel):**
1. Push to GitHub
2. Import to Vercel
3. Add `NEXT_PUBLIC_API_URL`
4. Deploy

## 📱 Pages

- `/` - Homepage with product catalog
- `/login` - User login
- `/register` - User registration
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/order-success` - Order confirmation
- `/orders` - Order history

## 🧪 Testing

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000` to test the application.

## 📝 License

ISC

## 👤 Author

BATTI DEVAKUMAR

## 🙏 Acknowledgments

- Next.js team
- Express.js community
- MongoDB team
