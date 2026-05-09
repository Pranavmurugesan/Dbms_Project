import React, { useState, useEffect } from 'react'
import { orderAPI } from '../utils/api'
import { useAuth } from '../hooks/useAuth'

export default function UserDashboard() {
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token, logout } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          orderAPI.getProfile(),
          orderAPI.getMyOrders(),
        ])
        setProfile(profileRes.data.data)
        setOrders(ordersRes.data.data || [])
      } catch (err) {
        setError('Failed to load profile')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchData()
    }
  }, [token])

  const handleLogout = () => {
    logout()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin text-5xl">⚙️</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-prime-50 to-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-bold gradient-text">👤 My Dashboard</h1>
            <p className="text-slate-600 mt-1">Manage your profile and orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary hover:bg-slate-200 px-6 py-2 font-semibold"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-accent-50 border-l-4 border-accent-600 text-accent-700 px-6 py-4 rounded-lg mb-6 animate-slide-in-right shadow-md">
            <p className="font-semibold">✗ Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Profile Section */}
        {profile && (
          <div className="card p-8 mb-8 border-t-4 border-prime-600 shadow-lg animate-fade-in-up">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">👤 Profile Information</h2>
            <p className="text-slate-600 mb-6">Your account details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-prime-50 to-slate-50 p-6 rounded-lg border border-prime-200">
                <p className="text-slate-600 text-sm font-medium mb-1">Full Name</p>
                <p className="text-2xl text-slate-900 font-bold">{profile.name}</p>
              </div>
              <div className="bg-gradient-to-br from-prime-50 to-slate-50 p-6 rounded-lg border border-prime-200">
                <p className="text-slate-600 text-sm font-medium mb-1">Email Address</p>
                <p className="text-lg text-slate-900 font-semibold break-all">{profile.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Section */}
        <div className="card shadow-lg border-t-4 border-prime-600 overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">📋 Order History</h2>
            <p className="text-slate-600 text-sm mt-1">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-slate-600 text-lg font-medium">No orders yet</p>
              <p className="text-slate-500">Your orders will appear here once you make a purchase</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="text-left py-4 px-6 text-slate-700 font-semibold">Order ID</th>
                    <th className="text-left py-4 px-6 text-slate-700 font-semibold">Amount</th>
                    <th className="text-left py-4 px-6 text-slate-700 font-semibold">Status</th>
                    <th className="text-left py-4 px-6 text-slate-700 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr 
                      key={order.id} 
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <td className="py-4 px-6 font-semibold text-prime-600">#{order.id}</td>
                      <td className="py-4 px-6 font-bold text-lg gradient-text">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold inline-block ${
                            order.status === 'COMPLETED'
                              ? 'bg-success-light text-slate-700'
                              : order.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {order.status === 'COMPLETED' && '✓'} {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
