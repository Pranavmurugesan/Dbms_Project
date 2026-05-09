# E-Commerce Frontend - React + Vite

A modern, responsive e-commerce UI built with React, Vite, Tailwind CSS, and React Router with JWT authentication.

## 🎨 Design Features

- **Warm & Neat UI** - Burnt orange primary color (#c44d28) with warm neutral palette
- **Minimalist Layout** - Plenty of whitespace & rounded corners
- **Soft Shadows** - Tailored shadow system for depth
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Smooth Interactions** - Polished transitions and hover effects

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### 1. Install Dependencies

```bash
cd ecommerce-frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
ecommerce-frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── UserDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Cart.jsx
│   │   ├── CheckoutModal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## 🔐 Authentication

- JWT token stored in localStorage
- Automatic token injection in API requests
- Protected routes based on user role (USER/ADMIN)
- Role-based access control (RBAC)

## 📄 Pages

### Public Pages
- **Login** - Sign in with email/password
- **Register** - Create new account

### User Pages
- **Shop** - Browse products and add to cart
- **Dashboard** - View profile and order history
- **Cart** - Manage items before checkout

### Admin Pages
- **Analytics** - View sales stats
- **Manage Products** - Create, read, update, delete products

## 🎯 Key Features

✅ **Responsive** - Mobile-first design  
✅ **State Management** - React Context for auth & cart  
✅ **API Integration** - Axios with interceptors  
✅ **Form Validation** - Basic client-side validation  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Smooth loading indicators  
✅ **Protected Routes** - JWT-based access control  

## 🎨 Color Palette

### Warm Neutrals
- Background: `#faf8f3` (Warm 50)
- Text: `#2c2416` (Warm 800)
- Borders: `#e3dcd0` (Warm 300)

### Burnt Orange (Primary)
- Primary: `#c44d28` (Burnt 700)
- Hover: `#a23a1e` (Burnt 800)
- Light: `#f09f80` (Burnt 500)

## 🔌 API Integration

All API endpoints are configured in `src/utils/api.js`:

```javascript
// Products
GET  /api/public/products
GET  /api/public/products/:id
POST /api/admin/products        (Admin only)
PUT  /api/admin/products/:id    (Admin only)
DELETE /api/admin/products/:id  (Admin only)

// Auth
POST /api/auth/login
POST /api/auth/register

// User
GET  /api/user/profile
POST /api/user/orders
GET  /api/user/orders

// Admin
GET  /api/admin/analytics
```

## 🧪 Testing Accounts

### Admin Account
- Email: `admin@store.com`
- Password: `admin123`

### Create Your Own User
- Use the Register page to create a user account
- Default role: USER

## 🌐 Environment Variables

Create a `.env` file if you need to change the API URL:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **tailwindcss** - Utility-first CSS framework
- **vite** - Build tool

## 🚀 Deployment

### Build the Project
```bash
npm run build
```

This creates a `dist` folder ready for deployment.

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### Important: Update API URL
When deploying, update the API base URL in `src/utils/api.js` to your backend server URL.

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### CORS errors
- Ensure backend has CORS enabled
- Backend should allow `http://localhost:5173`

### Token issues
- Clear localStorage and login again
- Check that backend is running

## 🎯 Next Steps

1. ✅ Frontend is ready
2. Start the dev server: `npm run dev`
3. Login with demo account: `admin@store.com` / `admin123`
4. Test all features (shop, admin panel, etc.)
5. Customize colors, content, and branding

## 📝 Customization

### Change Colors
Edit `tailwind.config.js` to modify the warm and burnt color palettes.

### Change Brand Name
Search and replace "Store" throughout the codebase.

### Add More Pages
Create new pages in `src/pages/` and add routes in `src/App.jsx`.

## 📧 Support

For issues or questions, refer to:
- Vite Docs: https://vitejs.dev/
- React Router: https://reactrouter.com/
- Tailwind CSS: https://tailwindcss.com/
- Axios: https://axios-http.com/

---

**Happy coding!** 🎉
