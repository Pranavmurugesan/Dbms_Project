import React, { useState, useEffect } from 'react'
import { productAPI, adminAPI } from '../utils/api'
import { useAuth } from '../hooks/useAuth'

export default function AdminDashboard() {
  const [tab, setTab] = useState('analytics')
  const [products, setProducts] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    imageUrl: '',
  })
  const { logout } = useAuth()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [analyticsRes, productsRes] = await Promise.all([
        adminAPI.getAnalytics(),
        productAPI.getAll(),
      ])
      setAnalytics(analyticsRes.data.data)
      setProducts(productsRes.data.data || [])
    } catch (err) {
      setError('Failed to load data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await productAPI.delete(id)
      setProducts(products.filter((p) => p.id !== id))
      setSuccess('Product deleted successfully')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to delete product')
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product.id)
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stockQuantity: product.stockQuantity.toString(),
      imageUrl: product.imageUrl || '',
    })
    setTab('products')
  }

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.price || !formData.stockQuantity) {
      setError('Please fill in all required fields')
      return
    }

    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
      }

      if (editingProduct) {
        await productAPI.update(editingProduct, submitData)
        setProducts(
          products.map((p) =>
            p.id === editingProduct ? { ...p, ...submitData } : p
          )
        )
        setSuccess('Product updated successfully')
      } else {
        const res = await productAPI.create(submitData)
        setProducts([...products, res.data.data])
        setSuccess('Product created successfully')
      }

      resetForm()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save product')
    }
  }

  const resetForm = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      stockQuantity: '',
      imageUrl: '',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="text-5xl">⚙️</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-prime-50 to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-prime-600 to-prime-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🛡️ Admin Dashboard</h1>
            <p className="text-prime-100 text-sm">Manage products and view analytics</p>
          </div>
          <button
            onClick={logout}
            className="btn-secondary hover:bg-white hover:text-prime-600 px-6 py-2 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-success-light border-l-4 border-success text-slate-700 px-6 py-4 rounded-lg animate-slide-in-right shadow-md">
            <p className="font-semibold">✓ Success</p>
            <p className="text-sm">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-accent-50 border-l-4 border-accent-600 text-accent-700 px-6 py-4 rounded-lg animate-slide-in-right shadow-md">
            <p className="font-semibold">✗ Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 sticky top-20 z-30 bg-white rounded-lg p-2 shadow-md">
          <button
            onClick={() => setTab('analytics')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              tab === 'analytics'
                ? 'bg-gradient-to-r from-prime-600 to-prime-700 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📊 Analytics
          </button>
          <button
            onClick={() => setTab('products')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              tab === 'products'
                ? 'bg-gradient-to-r from-prime-600 to-prime-700 text-white shadow-lg'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            📦 Manage Products
          </button>
        </div>

        {/* Analytics Tab */}
        {tab === 'analytics' && analytics && (
          <div className="animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Products Card */}
              <div className="card p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-prime-600">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Products</p>
                    <p className="text-4xl font-bold gradient-text">{analytics.totalProducts}</p>
                  </div>
                  <span className="text-3xl">📦</span>
                </div>
                <div className="bg-prime-50 rounded-lg px-3 py-1 inline-block text-sm text-prime-700 font-semibold">
                  Active items
                </div>
              </div>

              {/* Total Users Card */}
              <div className="card p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-prime-500">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Users</p>
                    <p className="text-4xl font-bold gradient-text">{analytics.totalUsers}</p>
                  </div>
                  <span className="text-3xl">👥</span>
                </div>
                <div className="bg-prime-50 rounded-lg px-3 py-1 inline-block text-sm text-prime-700 font-semibold">
                  Registered users
                </div>
              </div>

              {/* Total Orders Card */}
              <div className="card p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-prime-400">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Orders</p>
                    <p className="text-4xl font-bold gradient-text">{analytics.totalOrders}</p>
                  </div>
                  <span className="text-3xl">🛒</span>
                </div>
                <div className="bg-prime-50 rounded-lg px-3 py-1 inline-block text-sm text-prime-700 font-semibold">
                  All time
                </div>
              </div>

              {/* Total Sales Card */}
              <div className="card p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-success">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Total Sales</p>
                    <p className="text-4xl font-bold text-success">
                      ${analytics.totalSales?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <span className="text-3xl">💰</span>
                </div>
                <div className="bg-success-light rounded-lg px-3 py-1 inline-block text-sm text-slate-700 font-semibold">
                  Revenue
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {tab === 'products' && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Form Section */}
            <div className="card p-8 shadow-lg border-t-4 border-prime-600">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              <p className="text-slate-600 mb-8">
                {editingProduct ? 'Update product details below' : 'Fill in the details to add a new product'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-2">Product Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Premium Headphones"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Price ($) *</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-2">Stock Quantity *</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-2">Description</label>
                  <textarea
                    placeholder="Describe your product..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field"
                    rows="3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-2">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveProduct}
                  className="btn-primary"
                >
                  {editingProduct ? '💾 Update Product' : '➕ Add Product'}
                </button>
                {editingProduct && (
                  <button
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    ✕ Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Products Table */}
            <div className="card shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900">📋 Products List</h2>
                <p className="text-slate-600 text-sm mt-1">{products.length} product{products.length !== 1 ? 's' : ''}</p>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">📭</p>
                  <p className="text-slate-600 text-lg font-medium">No products yet</p>
                  <p className="text-slate-500">Create your first product using the form above</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="text-left py-4 px-6 text-slate-700 font-semibold">Product Name</th>
                        <th className="text-left py-4 px-6 text-slate-700 font-semibold">Price</th>
                        <th className="text-left py-4 px-6 text-slate-700 font-semibold">Stock</th>
                        <th className="text-left py-4 px-6 text-slate-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, idx) => (
                        <tr 
                          key={product.id} 
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-semibold text-slate-900">{product.name}</p>
                              <p className="text-sm text-slate-600">{product.description?.substring(0, 40)}...</p>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-bold text-prime-600 text-lg">
                              ${product.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              product.stockQuantity > 10
                                ? 'bg-success-light text-slate-700'
                                : product.stockQuantity > 0
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {product.stockQuantity} items
                            </span>
                          </td>
                          <td className="py-4 px-6 flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="bg-gradient-to-r from-prime-100 to-prime-50 hover:from-prime-200 hover:to-prime-100 text-prime-700 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover-scale"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-gradient-to-r from-accent-100 to-accent-50 hover:from-accent-200 hover:to-accent-100 text-accent-700 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover-scale"
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
