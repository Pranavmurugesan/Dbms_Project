import React, { useState, useEffect } from 'react'
import { productAPI } from '../utils/api'
import { useAuth } from '../hooks/useAuth'
import Cart from '../components/Cart'

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCart, setShowCart] = useState(false)
  const { cart, addToCart } = useAuth()
  
  // Filter states
  const [searchName, setSearchName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAll()
        setProducts(response.data.data || [])
      } catch (err) {
        setError('Failed to load products')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory
    const matchesPrice = maxPrice === '' || product.price <= parseFloat(maxPrice)
    return matchesName && matchesCategory && matchesPrice
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin text-5xl">⚙️</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-prime-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-bold gradient-text">🛍️ Shop</h1>
            <p className="text-slate-600 mt-2">Discover our premium collection</p>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative btn-primary px-6 py-3 rounded-xl font-semibold"
          >
            🛒 Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-accent-50 border-l-4 border-accent-600 text-accent-700 px-6 py-4 rounded-lg mb-6 animate-slide-in-right shadow-md">
            <p className="font-semibold">✗ Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Filter Section */}
        {!showCart && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in-up border-l-4 border-prime-600">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              🔍 Filter Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search by Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Search by Name</label>
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Type product name..."
                  className="input-field w-full border-2 border-slate-200 focus:border-prime-600"
                />
              </div>

              {/* Filter by Category */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field w-full border-2 border-slate-200 focus:border-prime-600"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Filter by Max Price */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Max Price</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Enter max price..."
                  min="0"
                  step="0.01"
                  className="input-field w-full border-2 border-slate-200 focus:border-prime-600"
                />
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-slate-600 mt-4">
              📊 Showing <span className="font-bold text-prime-600">{filteredProducts.length}</span> of <span className="font-bold">{products.length}</span> products
            </p>
          </div>
        )}

        {showCart ? (
          <Cart onClose={() => setShowCart(false)} />
        ) : (
          <div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl text-slate-600 mb-2">😕 No products found</p>
                <p className="text-slate-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover-scale border-t-4 border-prime-600 animate-fade-in-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="h-48 bg-gradient-to-br from-slate-100 to-prime-100 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-5xl animate-float">📦</div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {product.description || 'Premium quality product'}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold gradient-text">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      product.stockQuantity > 5
                        ? 'bg-success-light text-slate-700'
                        : product.stockQuantity > 0
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stockQuantity === 0 ? 'Out of Stock' : `${product.stockQuantity} left`}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stockQuantity === 0}
                    className={`w-full font-semibold py-3 rounded-lg transition-all duration-200 ${
                      product.stockQuantity === 0
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'btn-primary hover-scale'
                    }`}
                  >
                    {product.stockQuantity === 0 ? '❌ Out of Stock' : '➕ Add to Cart'}
                  </button>
                </div>
              </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
