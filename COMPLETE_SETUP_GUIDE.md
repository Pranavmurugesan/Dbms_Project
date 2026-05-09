# E-Commerce Platform - Complete Setup Guide

## 🎯 Project Overview

A full-stack e-commerce platform with:
- **Backend**: Spring Boot REST API with JWT authentication
- **Frontend**: React + Vite with Tailwind CSS
- **Database**: PostgreSQL
- **Authentication**: JWT tokens with role-based access control

---

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (5173)                     │
│  (Login, Shop, Cart, User Dashboard, Admin Dashboard)       │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
                       │ JWT Auth
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Spring Boot Backend (8080)                │
│  (Auth, Products, Orders, Admin, Analytics)                 │
└──────────────────────┬──────────────────────────────────────┘
                       │ JDBC
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                         │
│  (Users, Products, Orders)                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Prerequisites

Before starting, ensure you have:

1. **Java 17+** - For Spring Boot backend
   ```bash
   java -version
   ```

2. **Maven 3.8.0+** - For dependency management
   ```bash
   mvn -version
   ```

3. **Node.js 16+** - For React frontend
   ```bash
   node -version
   npm -version
   ```

4. **PostgreSQL 12+** - For database
   ```bash
   psql --version
   ```

---

## 🗄️ Step 1: Setup Database

### 1.1 Start PostgreSQL

**Windows:**
```bash
# PostgreSQL should auto-start or use Services
# Or start manually if installed
```

**macOS:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo systemctl start postgresql
```

### 1.2 Create Database

```bash
# Connect to PostgreSQL as admin
psql -U postgres

# In psql shell:
CREATE DATABASE ecommerce_db;

# Verify creation
\l

# Exit
\q
```

✅ **Database ready!**

---

## 🔧 Step 2: Setup & Run Backend

### 2.1 Navigate to Backend

```bash
cd ecommerce-backend
```

### 2.2 Configure Database Connection (if needed)

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=2077  # Change if your PostgreSQL password is different
```

### 2.3 Build Backend

```bash
mvn clean install -DskipTests
```

This downloads all Maven dependencies (~500MB, may take 2-3 minutes).

### 2.4 Run Backend

```bash
mvn spring-boot:run
```

You should see:
```
Started ECommerceBackendApplication in X seconds
Admin account created: admin@store.com / admin123
```

✅ **Backend running on http://localhost:8080**

### 2.5 Test Backend (New Terminal)

```bash
# Get all products (public endpoint, no auth needed)
curl http://localhost:8080/api/public/products

# Response should be:
# {"success":true,"message":"Products retrieved successfully","data":[]}
```

✅ **Backend working!**

---

## 🎨 Step 3: Setup & Run Frontend

### 3.1 Navigate to Frontend (New Terminal)

```bash
cd ecommerce-frontend
```

### 3.2 Install Dependencies

```bash
npm install
```

This installs React, Vite, Tailwind, and other packages (~500MB, may take 2-3 minutes).

### 3.3 Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Frontend running on http://localhost:5173**

---

## 🧪 Step 4: Test the Application

### 4.1 Login as Admin

1. Open http://localhost:5173
2. You should be redirected to `/login`
3. Use credentials:
   - Email: `admin@store.com`
   - Password: `admin123`
4. Click "Sign In"

✅ **Login successful!**

### 4.2 Test Admin Features

1. Click "Admin" in navigation
2. View **Analytics Dashboard** (shows 0 products initially)
3. Go to "Manage Products" tab
4. Add a sample product:
   - Name: Laptop
   - Description: High-performance laptop
   - Price: 999.99
   - Stock: 5
   - Image URL: (leave empty or use any image URL)
5. Click "Add Product"

✅ **Product created!**

### 4.3 Test User Features

1. Logout (button in top-right)
2. Register a new user account:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
3. Click "Create Account"
4. You're now logged in as a regular user
5. See the product you created on the Shop page
6. Click "Add to Cart"
7. Click the cart icon (shows quantity)
8. Click "Proceed to Checkout"
9. See the "Payment Integration Coming Soon" banner ✨

✅ **All features working!**

---

## 📝 Project Folder Structure

```
newwwwwwww/
├── ecommerce-backend/              # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ecommerce/
│   │   │   │   ├── config/         # Security, JWT, Database Seeder
│   │   │   │   ├── controller/     # REST endpoints
│   │   │   │   ├── entity/         # JPA entities
│   │   │   │   ├── service/        # Business logic
│   │   │   │   ├── repository/     # Data access layer
│   │   │   │   ├── dto/            # Data transfer objects
│   │   │   │   ├── exception/      # Custom exceptions
│   │   │   │   └── util/           # JWT utilities
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml                     # Maven dependencies
│   └── README.md
│
├── ecommerce-frontend/             # React + Vite frontend
│   ├── src/
│   │   ├── pages/                  # 5 main pages
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ShopPage.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── components/             # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CheckoutModal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # State management
│   │   ├── hooks/
│   │   │   └── useAuth.js          # Custom auth hook
│   │   ├── utils/
│   │   │   └── api.js              # Axios API client
│   │   ├── App.jsx                 # Main app with routes
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Tailwind CSS
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── README.md
│
├── QUICK_START_BACKEND.md          # Backend setup guide
├── QUICK_START_FRONTEND.md         # Frontend setup guide
└── THIS FILE (SETUP_GUIDE.md)      # Full setup guide
```

---

## 🔐 Authentication Flow

```
1. User logs in with email/password
2. Backend validates credentials
3. Backend generates JWT token
4. Frontend stores token in localStorage
5. Frontend includes token in Authorization header for all requests
6. Backend validates token on protected endpoints
7. If token expired, user must login again
```

### JWT Token Contents (example decoded):
```json
{
  "sub": "admin@store.com",
  "role": "ROLE_ADMIN",
  "iat": 1634567890,
  "exp": 1634654290
}
```

---

## 🛒 Key Features

### Public Features (No Login Required)
- Browse products
- View product details
- Register account

### User Features (Login Required)
- Login with credentials
- Add products to cart
- View profile information
- View order history
- Checkout (shows "Coming Soon" banner)

### Admin Features (Login as admin@store.com)
- View sales analytics (total products, users, orders, sales)
- Create new products
- Update product details
- Delete products
- Manage inventory

### Database Schema

**Users Table**
```sql
id BIGINT PRIMARY KEY
name VARCHAR
email VARCHAR UNIQUE
password VARCHAR (hashed)
role ENUM (ROLE_USER, ROLE_ADMIN)
```

**Products Table**
```sql
id BIGINT PRIMARY KEY
name VARCHAR
description TEXT
price DECIMAL
stockQuantity INTEGER
imageUrl VARCHAR
```

**Orders Table**
```sql
id BIGINT PRIMARY KEY
user_id BIGINT FOREIGN KEY
totalAmount DECIMAL
status ENUM (PENDING, COMPLETED, CANCELED)
createdAt TIMESTAMP
```

---

## 🚀 Deployment Checklist

### Before Deploying

- [ ] Change JWT secret in `application.properties` to a long random string
- [ ] Update database password in `application.properties`
- [ ] Update API URL in frontend `src/utils/api.js`
- [ ] Enable HTTPS/SSL
- [ ] Add rate limiting
- [ ] Add input validation
- [ ] Test all features in production environment

### Deploy Backend (Java)

1. Build Spring Boot JAR:
   ```bash
   mvn clean package
   ```

2. Upload to server (Heroku, AWS, DigitalOcean, etc.)

3. Set environment variables

### Deploy Frontend (React)

1. Build optimized production bundle:
   ```bash
   npm run build
   ```

2. Deploy `dist` folder to CDN (Vercel, Netlify, AWS S3, etc.)

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8080 already in use**
```bash
# Change port in application.properties
server.port=8081
```

**PostgreSQL connection error**
- Verify PostgreSQL is running
- Check database exists: `psql -U postgres -l`
- Verify credentials in `application.properties`
- Try resetting PostgreSQL password

**Dependencies not downloading**
```bash
mvn clean install -U -DskipTests
```

### Frontend Issues

**Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

**CORS errors**
- Ensure backend has proper CORS configuration
- Check `SecurityConfig.java` CORS settings
- Verify `cors.allowed-origins` includes frontend URL

**Blank page**
- Open browser DevTools (F12) → Console
- Check for JavaScript errors
- Verify backend is running at `http://localhost:8080`

**Token issues**
- Clear localStorage: `localStorage.clear()` in console
- Login again
- Check token hasn't expired

### Database Issues

**Cannot connect to ecommerce_db**
```bash
# Recreate database
psql -U postgres
DROP DATABASE IF EXISTS ecommerce_db;
CREATE DATABASE ecommerce_db;
\q
```

**Tables not created**
- Backend auto-creates tables on first run
- Check server logs for SQL errors
- Verify Hibernate DDL is enabled in `application.properties`

---

## 📚 Learn More

- **Spring Boot**: https://spring.io/projects/spring-boot
- **React**: https://react.dev
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com
- **JWT Auth**: https://jwt.io
- **PostgreSQL**: https://www.postgresql.org

---

## 🎉 Success!

If you've completed all steps:

✅ Backend running on `http://localhost:8080`  
✅ Frontend running on `http://localhost:5173`  
✅ Database connected and populated  
✅ Authentication working with JWT  
✅ All CRUD operations functioning  
✅ Admin dashboard showing analytics  
✅ Shopping cart and checkout working  

**Congratulations!** You have a fully functional e-commerce platform! 🚀

---

## 📞 Quick Commands Reference

### Backend
```bash
cd ecommerce-backend
mvn clean install -DskipTests
mvn spring-boot:run
```

### Frontend
```bash
cd ecommerce-frontend
npm install
npm run dev
```

### Database
```bash
psql -U postgres
CREATE DATABASE ecommerce_db;
\q
```

---

**Happy coding!** 🎊
