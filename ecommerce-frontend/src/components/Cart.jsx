import React, { useState } from 'react'
import CheckoutModal from './CheckoutModal'
import { useAuth } from '../hooks/useAuth'

export default function Cart({ onClose }) {
  const [showCheckout, setShowCheckout] = useState(false)
  const { cart, removeFromCart, clearCart } = useAuth()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <div className="card p-8 shadow-lg border-t-4 border-prime-600 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">🛒 Shopping Cart</h2>
        <p className="text-slate-600 mb-6">Review your items before checkout</p>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-slate-600 text-lg font-medium mb-6">Your cart is empty</p>
            <button
              onClick={onClose}
              className="btn-primary px-6 py-3"
            >
              🛍️ Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {cart.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-prime-50 rounded-lg border border-prime-200 hover:border-prime-400 transition-all duration-200"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      <span className="inline-block bg-prime-100 text-prime-700 px-2 py-1 rounded mr-2 font-semibold">
                        {item.quantity}x
                      </span>
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold gradient-text text-lg mb-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-accent-600 hover:text-accent-700 font-semibold text-sm hover-scale"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-slate-200 pt-6 mb-6 bg-gradient-to-r from-prime-50 to-slate-50 -mx-8 px-8 -mb-8 pb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-800">Order Total:</span>
                <span className="text-4xl font-bold gradient-text">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowCheckout(true)}
                className="flex-1 btn-primary py-3 rounded-lg font-semibold hover-scale"
              >
                💳 Proceed to Checkout
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-secondary py-3 rounded-lg font-semibold"
              >
                📦 Continue Shopping
              </button>
            </div>

            <button
              onClick={clearCart}
              className="w-full mt-3 text-accent-600 hover:text-accent-700 hover:bg-accent-50 font-semibold py-2 rounded-lg transition-all duration-200"
            >
              🗑️ Clear Cart
            </button>
          </>
        )}
      </div>

      {showCheckout && (
        <CheckoutModal
          total={total}
          onClose={() => setShowCheckout(false)}
          onCheckout={() => {
            setShowCheckout(false)
            clearCart()
            onClose()
          }}
        />
      )}
    </>
  )
}
