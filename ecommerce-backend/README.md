# E-Commerce Backend - Spring Boot

A fully functional e-commerce REST API built with Spring Boot, PostgreSQL, and JWT authentication.

## Features

- ✅ JWT Authentication & Authorization
- ✅ Role-based access control (ROLE_USER, ROLE_ADMIN)
- ✅ Product Management (CRUD)
- ✅ User Registration & Login
- ✅ Order Management with Analytics
- ✅ Database auto-migration with Hibernate
- ✅ Comprehensive error handling
- ✅ CORS enabled

## Prerequisites

- Java 17 or higher
- Maven 3.8.0 or higher
- PostgreSQL 12 or higher
- Node.js (for frontend, Phase 2)

## Setup Instructions

### 1. Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE ecommerce_db;

# Exit
\q
```

### 2. Clone/Download Backend

The backend is located at `ecommerce-backend/`

### 3. Configure Database Connection

The `application.properties` is already configured with:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=2077
```

If your PostgreSQL password is different, update it in `src/main/resources/application.properties`.

### 4. Build the Project

```bash
cd ecommerce-backend
mvn clean install
```

### 5. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 6. Initialize Admin Account

When the application starts, it automatically creates an admin account:
- **Email:** admin@store.com
- **Password:** admin123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products (Public)
- `GET /api/public/products` - Get all products
- `GET /api/public/products/{id}` - Get product by ID

### Admin Only
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product
- `GET /api/admin/analytics` - Get sales analytics

### User Endpoints
- `GET /api/user/profile` - Get user profile
- `POST /api/user/orders` - Create an order
- `GET /api/user/orders` - Get user's orders

## Testing with cURL/Postman

### 1. Register a User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@store.com",
    "password": "admin123"
  }'
```

Response will contain a JWT token. Use it for authenticated requests:
```bash
curl -X POST http://localhost:8080/api/admin/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High performance laptop",
    "price": 1200.00,
    "stockQuantity": 10,
    "imageUrl": "https://example.com/laptop.jpg"
  }'
```

## Database Schema

### Users Table
- id (PRIMARY KEY)
- name
- email (UNIQUE)
- password
- role (ENUM: ROLE_USER, ROLE_ADMIN)

### Products Table
- id (PRIMARY KEY)
- name
- description
- price
- stockQuantity
- imageUrl

### Orders Table
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- totalAmount
- status (ENUM: PENDING, COMPLETED, CANCELED)
- createdAt

## project Structure

```
ecommerce-backend/
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/
│   │   │   ├── config/
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── DataSeeder.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── ProductController.java
│   │   │   │   ├── UserController.java
│   │   │   │   └── AdminController.java
│   │   │   ├── entity/
│   │   │   │   ├── User.java
│   │   │   │   ├── Product.java
│   │   │   │   └── Order.java
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── ProductService.java
│   │   │   │   └── OrderService.java
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ProductRepository.java
│   │   │   │   └── OrderRepository.java
│   │   │   ├── dto/
│   │   │   ├── exception/
│   │   │   ├── util/
│   │   │   └── ECommerceBackendApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Next Steps (Phase 2)

Once the backend is running successfully, proceed with building the React frontend using the provided Phase 2 prompt.

The frontend will connect to this API via `http://localhost:8080`

## Troubleshooting

### Port 8080 already in use
```bash
# Change the port in application.properties
server.port=8081
```

### Database connection error
- Ensure PostgreSQL is running
- Verify the password in application.properties matches your PostgreSQL password
- Check that the `ecommerce_db` database exists

### JWT Token issues
- The JWT secret is set in application.properties
- For production, change the `jwt.secret` to a long random string (at least 32 characters)
- Token expiration is set to 86400000ms (24 hours)

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**
1. Change the JWT secret in `application.properties` to a long, random string
2. Never commit sensitive passwords to version control
3. Use environment variables for secrets
4. Enable HTTPS
5. Implement rate limiting
6. Add input validation and sanitization

## License

This project is part of a college e-commerce project.
