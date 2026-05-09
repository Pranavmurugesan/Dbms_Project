# QUICK START - React Frontend

## Step 1: Install Dependencies

```bash
cd ecommerce-frontend
npm install
```

This installs React, Vite, Tailwind CSS, and other dependencies.

## Step 2: Start Development Server

```bash
npm run dev
```

✅ Frontend opens at `http://localhost:5173`

## Step 3: Login with Demo Account

- Email: `admin@store.com`
- Password: `admin123`

## Step 4: Explore Features

### As Admin
- ✅ View Analytics Dashboard
- ✅ Create/Edit/Delete Products
- ✅ Manage inventory

### As User
- ✅ Browse products
- ✅ Add to cart
- ✅ View profile & orders
- ✅ Checkout (Coming Soon banner)

## 🎨 UI Features

- Warm & neat design (burnt orange + warm neutrals)
- Responsive layout (mobile, tablet, desktop)
- Smooth animations & transitions
- Protected routes with JWT auth
- Real-time cart updates

## 🔌 API Connection

Frontend at: `http://localhost:5173`
Backend at: `http://localhost:8080`

Both are configured to communicate automatically via axios.

## 📝 File Structure

- `src/pages/` - 5 main pages (Login, Register, Shop, Dashboards)
- `src/components/` - Reusable components (Cart, Modal, Navigation, etc.)
- `src/context/` - React Context for auth & cart state
- `src/utils/api.js` - All API endpoints configured

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

This creates optimized `dist` folder ready to deploy.

## ✨ Key Points

- Frontend auto-connects to backend on `http://localhost:8080`
- Cart uses localStorage (persists on refresh)
- JWT token stored securely
- Admin dashboard has full product management
- Checkout shows "Coming Soon" banner as requested

---

**Everything is integrated and ready to use!** 🎉

Start the frontend with `npm run dev` and enjoy! 🚀
