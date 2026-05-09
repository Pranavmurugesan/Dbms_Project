# QUICK START GUIDE - Spring Boot Backend

## Step 1: Verify PostgreSQL is Running

### Windows
1. Open PostgreSQL pgAdmin (comes with PostgreSQL installer)
2. Or use Command Line:
   ```bash
   psql -U postgres
   ```

### macOS
```bash
brew services start postgresql
```

### Linux
```bash
sudo systemctl start postgresql
```

## Step 2: Create the Database

```bash
# Connect as postgres user
psql -U postgres

# In psql shell, run:
CREATE DATABASE ecommerce_db;

# Exit psql
\q
```

## Step 3: Build & Run Backend

Navigate to the backend folder and run:

```bash
cd ecommerce-backend

# Build the project (this downloads dependencies)
mvn clean install

# Run the application
mvn spring-boot:run
```

✅ **Backend Ready!** Server runs on `http://localhost:8080`

## Step 4: Test the API

### Test with cURL - Create Admin Account Automatically
```bash
# The admin account (admin@store.com / admin123) is created automatically on startup
```

### Test with Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@store.com",
    "password": "admin123"
  }'
```

**Response includes JWT token - save this!**

### Test Get Products (No auth needed)
```bash
curl http://localhost:8080/api/public/products
```

### Test Create Product (Admin only)
```bash
curl -X POST http://localhost:8080/api/admin/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wireless Headphones",
    "description": "Premium noise-canceling headphones",
    "price": 299.99,
    "stockQuantity": 25,
    "imageUrl": "https://example.com/headphones.jpg"
  }'
```

## Importing in VS Code/IDE

1. Open VS Code
2. File → Open Folder → Select `ecommerce-backend`
3. Maven project will auto-configure
4. Install recommended extensions (Spring Boot, Maven, etc.) if prompted
5. Run via integrated terminal: `mvn spring-boot:run`

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@store.com | admin123 |

**Note:** Regular users are created via `/api/auth/register` endpoint.

## Common Issues & Solutions

### Issue: Can't connect to database
```
Solution: 
1. Verify PostgreSQL is running
2. Check password is 2077 in application.properties or update it
3. Ensure ecommerce_db database exists
```

### Issue: Port 8080 already in use
```
Solution: Change server.port in application.properties to 8081
```

### Issue: Maven not found
```
Solution: 
1. Install Maven: https://maven.apache.org/install.html
2. Add to PATH environment variable
3. Restart terminal/IDE
```

## Next Phase: React Frontend

Once backend is running and tested, you can proceed with Phase 2 (React frontend).

The React app will call:
- `http://localhost:8080/api/auth/login` for authentication
- `http://localhost:8080/api/public/products` for products
- etc.

All CORS is already configured to allow requests from `localhost:5173` (Vite default) and `localhost:3000` (Create React App).

---

**You're all set!** Backend is ready. Next: Phase 2 - React Frontend.
