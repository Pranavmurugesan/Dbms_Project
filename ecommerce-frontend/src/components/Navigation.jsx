import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navigation() {
  const { isAuthenticated, isAdmin, logout, cart } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-gradient-to-r from-prime-600 to-prime-700 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white hover:text-prime-100 transition-colors duration-200 flex items-center gap-2"
          >
            🛍️ <span>Store</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`font-semibold transition-all duration-200 px-3 py-2 rounded-lg ${
                    isActive('/')
                      ? 'bg-white text-prime-700 shadow-md'
                      : 'text-white hover:bg-prime-500 hover:text-prime-50'
                  }`}
                >
                  🛒 Shop
                </Link>

                {isAdmin ? (
                  <Link
                    to="/admin"
                    className={`font-semibold transition-all duration-200 px-3 py-2 rounded-lg ${
                      isActive('/admin')
                        ? 'bg-white text-prime-700 shadow-md'
                        : 'text-white hover:bg-prime-500 hover:text-prime-50'
                    }`}
                  >
                    🛡️ Admin
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className={`font-semibold transition-all duration-200 px-3 py-2 rounded-lg ${
                      isActive('/dashboard')
                        ? 'bg-white text-prime-700 shadow-md'
                        : 'text-white hover:bg-prime-500 hover:text-prime-50'
                    }`}
                  >
                    👤 Dashboard
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="bg-accent-600 hover:bg-accent-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover-scale shadow-md"
                >
                  Logout
                </button>

                {!isAdmin && cart.length > 0 && (
                  <span className="bg-accent-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                    {cart.length}
                  </span>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`font-semibold transition-all duration-200 px-3 py-2 rounded-lg ${
                    isActive('/login')
                      ? 'bg-white text-prime-700 shadow-md'
                      : 'text-white hover:bg-prime-500 hover:text-prime-50'
                  }`}
                >
                  🔐 Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-prime-700 hover:bg-prime-50 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover-scale shadow-md"
                >
                  ✨ Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-prime-500 space-y-2 animate-slide-in-right">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block font-semibold px-4 py-2 rounded-lg transition-all ${
                    isActive('/')
                      ? 'bg-white text-prime-700'
                      : 'text-white hover:bg-prime-500'
                  }`}
                >
                  🛒 Shop
                </Link>

                {isAdmin ? (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-semibold px-4 py-2 rounded-lg transition-all ${
                      isActive('/admin')
                        ? 'bg-white text-prime-700'
                        : 'text-white hover:bg-prime-500'
                    }`}
                  >
                    🛡️ Admin
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-semibold px-4 py-2 rounded-lg transition-all ${
                      isActive('/dashboard')
                        ? 'bg-white text-prime-700'
                        : 'text-white hover:bg-prime-500'
                    }`}
                  >
                    👤 Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left bg-accent-600 hover:bg-accent-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-semibold px-4 py-2 text-white hover:bg-prime-500 rounded-lg transition"
                >
                  🔐 Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-semibold px-4 py-2 bg-white text-prime-700 rounded-lg transition"
                >
                  ✨ Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
