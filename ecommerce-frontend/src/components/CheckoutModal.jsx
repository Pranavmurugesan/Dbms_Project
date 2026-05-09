import React, { useState } from 'react'
import { orderAPI } from '../utils/api'

export default function CheckoutModal({ total, onClose, onCheckout }) {
  const [step, setStep] = useState(1) // 1: customer info, 2: payment method, 3: confirmation
  const [showCelebration, setShowCelebration] = useState(false)
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('')
  const [errors, setErrors] = useState({})

  const validateStep1 = () => {
    const newErrors = {}
    if (!customerInfo.name.trim()) newErrors.name = 'Name is required'
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!/^\d{10}$/.test(customerInfo.phone)) newErrors.phone = 'Phone must be 10 digits'
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required'
    if (!customerInfo.pincode.trim()) newErrors.pincode = 'Pincode is required'
    if (!/^\d{6}$/.test(customerInfo.pincode)) newErrors.pincode = 'Pincode must be 6 digits'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    if (!paymentMethod) {
      setErrors({ payment: 'Please select a payment method' })
      return false
    }
    setErrors({})
    return true
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleConfirmCheckout = async () => {
    setLoading(true)
    try {
      // Create order with customer info and payment method
      const orderData = {
        totalAmount: total,
        status: 'PENDING',
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        customerPincode: customerInfo.pincode,
        paymentMethod: paymentMethod,
      }

      // Call API to create order
      await orderAPI.create(orderData)

      // Show celebration popup
      setShowCelebration(true)

      // After 4 seconds, close and trigger checkout
      setTimeout(() => {
        onCheckout()
      }, 4000)
    } catch (err) {
      setErrors({ checkout: err.response?.data?.message || 'Failed to place order' })
    } finally {
      setLoading(false)
    }
  }

  // Celebration Popup Component
  if (showCelebration) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md text-center p-8 animate-fade-in-up">
          {/* Celebration Animation */}
          <div className="mb-6 space-y-4">
            <div className="text-7xl animate-bounce" style={{ animation: 'bounce 1s infinite, float 3s ease-in-out infinite' }}>
              🎉
            </div>
            <div className="flex justify-center gap-4 text-4xl">
              <div className="animate-bounce" style={{ animationDelay: '0s' }}>✨</div>
              <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</div>
              <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>✨</div>
            </div>
          </div>

          {/* Greeting Message */}
          <div className="space-y-4 mb-8">
            <h2 className="text-4xl font-bold gradient-text">Order Confirmed! 🎯</h2>
            <p className="text-xl font-semibold text-slate-900">
              Thank you, {customerInfo.name}! 🙏
            </p>
            <p className="text-slate-600 text-lg">
              Your order has been placed successfully!
            </p>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-prime-50 to-slate-50 rounded-lg p-4 my-6 border-2 border-prime-200">
              <p className="text-sm text-slate-600 mb-2">Order Total</p>
              <p className="text-3xl font-bold gradient-text">${total.toFixed(2)}</p>
              <p className="text-sm text-slate-600 mt-3">📦 We'll deliver to: {customerInfo.address}</p>
            </div>

            {/* Additional Info */}
            <div className="space-y-2 text-left bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-700">
                <span className="font-semibold">✓ Payment Method:</span> {
                  paymentMethod === 'cod' && 'Cash on Delivery' ||
                  paymentMethod === 'upi' && 'UPI Payment' ||
                  paymentMethod === 'banking' && 'Bank Transfer' ||
                  paymentMethod === 'card' && 'Card Payment'
                }
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">✓ Phone:</span> {customerInfo.phone}
              </p>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">✓ Pincode:</span> {customerInfo.pincode}
              </p>
            </div>

            <div className="border-t-2 border-slate-200 pt-4 mt-4">
              <p className="text-sm text-slate-600">
                We've sent a confirmation email and you can track your order in your profile.
              </p>
            </div>
          </div>

          {/* Closing Message */}
          <p className="text-sm text-slate-500 animate-pulse">
            Redirecting you in a moment... ⏳
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-prime-600 to-prime-700 text-white p-8 sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">🛒 Checkout</h2>
            <button
              onClick={onClose}
              className="text-2xl hover:text-prime-100 transition"
            >
              ✕
            </button>
          </div>
          
          {/* Step Indicator */}
          <div className="flex gap-4">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s
                      ? 'bg-white text-prime-600'
                      : 'bg-prime-500 text-white'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-8 h-1 mx-2 transition-all ${
                      step > s ? 'bg-white' : 'bg-prime-500'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-prime-100 mt-3">
            {step === 1 && 'Step 1: Delivery Information'}
            {step === 2 && 'Step 2: Choose Payment Method'}
            {step === 3 && 'Step 3: Confirm Your Order'}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Customer Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-prime-50 border border-prime-200 rounded-lg p-4 mb-6">
                <p className="text-prime-700 text-sm">📦 Order Total: <span className="font-bold text-lg">${total.toFixed(2)}</span></p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`input-field border-2 ${
                    errors.name ? 'border-accent-600 focus:ring-accent-500' : ''
                  }`}
                />
                {errors.name && <p className="text-accent-600 text-sm mt-1">✗ {errors.name}</p>}
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                  className={`input-field border-2 ${
                    errors.phone ? 'border-accent-600 focus:ring-accent-500' : ''
                  }`}
                />
                {errors.phone && <p className="text-accent-600 text-sm mt-1">✗ {errors.phone}</p>}
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">Address</label>
                <textarea
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address (street, city, state)"
                  rows="3"
                  className={`input-field border-2 ${
                    errors.address ? 'border-accent-600 focus:ring-accent-500' : ''
                  }`}
                />
                {errors.address && <p className="text-accent-600 text-sm mt-1">✗ {errors.address}</p>}
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">Pincode</label>
                <input
                  type="tel"
                  name="pincode"
                  value={customerInfo.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit pincode"
                  maxLength="6"
                  className={`input-field border-2 ${
                    errors.pincode ? 'border-accent-600 focus:ring-accent-500' : ''
                  }`}
                />
                {errors.pincode && <p className="text-accent-600 text-sm mt-1">✗ {errors.pincode}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
                <p className="text-slate-700 text-sm">
                  <span className="font-semibold">Delivery To:</span> {customerInfo.name}, {customerInfo.address}, {customerInfo.pincode}
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-900">Select Payment Method</h3>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-prime-600 bg-prime-50 shadow-md'
                      : 'border-slate-200 hover:border-prime-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === 'cod'
                        ? 'border-prime-600 bg-prime-600'
                        : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'cod' && <div className="w-3 h-3 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">💵 Cash on Delivery</p>
                      <p className="text-sm text-slate-600">Pay when you receive your order</p>
                    </div>
                  </div>
                </div>

                {/* UPI */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-prime-600 bg-prime-50 shadow-md'
                      : 'border-slate-200 hover:border-prime-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === 'upi'
                        ? 'border-prime-600 bg-prime-600'
                        : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'upi' && <div className="w-3 h-3 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">📱 UPI Payment</p>
                      <p className="text-sm text-slate-600">Pay via Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                </div>

                {/* Banking */}
                <div
                  onClick={() => setPaymentMethod('banking')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'banking'
                      ? 'border-prime-600 bg-prime-50 shadow-md'
                      : 'border-slate-200 hover:border-prime-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === 'banking'
                        ? 'border-prime-600 bg-prime-600'
                        : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'banking' && <div className="w-3 h-3 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">🏦 Bank Transfer</p>
                      <p className="text-sm text-slate-600">Direct bank transfer / Net Banking</p>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-prime-600 bg-prime-50 shadow-md'
                      : 'border-slate-200 hover:border-prime-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      paymentMethod === 'card'
                        ? 'border-prime-600 bg-prime-600'
                        : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'card' && <div className="w-3 h-3 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">💳 Debit/Credit Card</p>
                      <p className="text-sm text-slate-600">Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                </div>
              </div>

              {errors.payment && (
                <div className="bg-accent-50 border border-accent-200 text-accent-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">✗ {errors.payment}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up text-center">
              <div className="text-6xl mb-4">✓</div>
              
              <div className="bg-gradient-to-br from-prime-50 to-slate-50 rounded-lg p-6 space-y-4 text-left border-2 border-prime-200">
                <div className="pb-4 border-b border-prime-200">
                  <p className="text-slate-600 text-sm">Customer Name</p>
                  <p className="font-bold text-slate-900 text-lg">{customerInfo.name}</p>
                </div>
                
                <div className="pb-4 border-b border-prime-200">
                  <p className="text-slate-600 text-sm">Phone</p>
                  <p className="font-bold text-slate-900 text-lg">{customerInfo.phone}</p>
                </div>

                <div className="pb-4 border-b border-prime-200">
                  <p className="text-slate-600 text-sm">Delivery Address</p>
                  <p className="font-bold text-slate-900 text-lg">{customerInfo.address}, {customerInfo.pincode}</p>
                </div>

                <div className="pb-4 border-b border-prime-200">
                  <p className="text-slate-600 text-sm">Payment Method</p>
                  <p className="font-bold text-slate-900 text-lg">
                    {paymentMethod === 'cod' && '💵 Cash on Delivery'}
                    {paymentMethod === 'upi' && '📱 UPI Payment'}
                    {paymentMethod === 'banking' && '🏦 Bank Transfer'}
                    {paymentMethod === 'card' && '💳 Debit/Credit Card'}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-slate-600 text-sm mb-1">Order Total</p>
                  <p className="text-4xl font-bold gradient-text">${total.toFixed(2)}</p>
                </div>
              </div>

              <p className="text-slate-600">Ready to complete your order?</p>
            </div>
          )}

          {/* Error Messages */}
          {errors.checkout && (
            <div className="bg-accent-50 border border-accent-200 text-accent-700 px-4 py-3 rounded-lg mt-6">
              <p className="text-sm">✗ {errors.checkout}</p>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-slate-200 p-8 bg-slate-50 space-y-3">
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                disabled={loading}
                className="flex-1 btn-secondary disabled:opacity-50"
              >
                ← Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {step === 1 ? 'Continue to Payment →' : 'Review Order →'}
              </button>
            ) : (
              <button
                onClick={handleConfirmCheckout}
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Placing Order...
                  </span>
                ) : (
                  '✓ Confirm & Place Order'
                )}
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="w-full btn-secondary text-slate-700 disabled:opacity-50"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  )
}
