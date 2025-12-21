import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, CreditCard, Lock, CheckCircle, 
  AlertCircle, ArrowLeft, Calendar, Tag, XCircle 
} from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Get plan details from navigation state
  const planDetails = location.state || {
    plan: 'starter',
    planName: 'Starter',
    price: 60,
    billingCycle: 'monthly'
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/pricing' } });
    }
  }, [user, navigate]);

  // Coupon codes
  const coupons = {
    'LAUNCH50': { discount: 50, type: 'percentage', description: '50% off first month' },
    'SAVE20': { discount: 20, type: 'percentage', description: '20% off' },
    'ANNUAL100': { discount: 100, type: 'fixed', description: '$100 off annual plan' }
  };

  const calculateTotal = () => {
    let total = planDetails.price;
    
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        total = total - (total * appliedCoupon.discount / 100);
      } else {
        total = total - appliedCoupon.discount;
      }
    }
    
    return Math.max(total, 0);
  };

  const handleApplyCoupon = () => {
    const coupon = coupons[couponCode.toUpperCase()];
    
    if (coupon) {
      setAppliedCoupon(coupon);
      setPaymentError('');
    } else {
      setPaymentError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // PayPal configuration
  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    console.log('Creating PayPal order...');
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: calculateTotal().toFixed(2),
            currency_code: "USD"
          },
          description: `STMS ${planDetails.planName} Plan - ${planDetails.billingCycle}`
        }
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    });
  };

  const onApprove = async (data, actions) => {
    console.log('Payment approved, capturing order...');
    setProcessing(true);
    setPaymentError('');
  
    try {
      // Get fresh token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
      }

      console.log('Using token:', token.substring(0, 20) + '...');

      const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? 'https://smart-traffic-management-system-23fs.onrender.com' 
        : 'http://localhost:5500';

      const requestBody = {
        orderId: data.orderID,
        planId: planDetails.plan,
        planName: planDetails.planName,
        billingCycle: planDetails.billingCycle,
        amount: calculateTotal(),
        paypalOrderId: data.orderID,
        ...(appliedCoupon && { couponCode: couponCode })
      };

      console.log('Sending request to:', `${API_BASE_URL}/api/subscriptions/create`);
      console.log('Request body:', requestBody);

      const response = await fetch(`${API_BASE_URL}/api/subscriptions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const responseText = await response.text();
      console.log('Response body (first 500 chars):', responseText.substring(0, 500));

      // Check if response is HTML (error page)
      if (responseText.trim().startsWith('<!DOCTYPE') || 
          responseText.trim().startsWith('<html>')) {
        throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}. This usually means the backend route doesn't exist or there's a server error.`);
      }

      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Failed to parse server response: ${parseError.message}. Response: ${responseText.substring(0, 200)}`);
      }

      // Check for HTTP errors
      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          throw new Error('Your session has expired. Please log in again.');
        }
        throw new Error(result.message || `Server error: HTTP ${response.status}`);
      }

      // Success!
      console.log('Subscription created:', result);
      setPaymentSuccess(true);

      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            subscriptionCreated: true,
            plan: planDetails.planName 
          } 
        });
      }, 3000);

    } catch (error) {
      console.error('Payment processing error:', error);
      
      let errorMessage = 'Payment processing failed. ';
      
      if (error.message.includes('session has expired')) {
        errorMessage = 'Your session has expired. Redirecting to login...';
        setTimeout(() => navigate('/login'), 2000);
      } else if (error.message.includes('HTML instead of JSON')) {
        errorMessage = 'Server configuration error. Please contact support. (Backend route not found)';
      } else if (error.message.includes('401')) {
        errorMessage = 'Authentication failed. Please log in again.';
        setTimeout(() => navigate('/login'), 2000);
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please check your internet connection.';
      } else {
        errorMessage += error.message;
      }
      
      setPaymentError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const onCancel = (data) => {
    console.log('Payment cancelled by user:', data);
    setPaymentError('Payment was cancelled. Please try again when you\'re ready.');
    setProcessing(false);
  };

  const onError = (err) => {
    console.error('PayPal error:', err);
    
    let errorMessage = 'Payment failed. Please try again.';
    
    if (err.message && err.message.includes('Window closed')) {
      errorMessage = 'Payment window was closed. Click the PayPal button to try again.';
    } else if (err.message && err.message.includes('timeout')) {
      errorMessage = 'Payment timed out. Please check your connection and try again.';
    } else if (err.message) {
      errorMessage = `Payment error: ${err.message}`;
    }
    
    setPaymentError(errorMessage);
    setProcessing(false);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h2>
            
            <p className="text-gray-600 mb-6">
              Welcome to STMS {planDetails.planName} Plan! Your subscription is now active.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold text-gray-900">{planDetails.planName}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Billing:</span>
                <span className="font-semibold text-gray-900 capitalize">{planDetails.billingCycle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-gray-900">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
              <span>Redirecting to dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/pricing')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Pricing
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-semibold text-gray-900">{planDetails.planName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Billing:</span>
                    <span className="font-semibold text-gray-900 capitalize">{planDetails.billingCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold text-gray-900">${planDetails.price.toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span className="font-semibold">
                        -{appliedCoupon.type === 'percentage' 
                          ? `${appliedCoupon.discount}%` 
                          : `$${appliedCoupon.discount}`}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-3xl font-bold text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        14-Day Free Trial
                      </p>
                      <p className="text-xs text-blue-700">
                        You won't be charged until {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="h-4 w-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Complete Your Purchase
                  </h2>
                  <p className="text-gray-600">
                    Start your 14-day free trial of STMS {planDetails.planName}
                  </p>
                </div>

                {/* Error Message */}
                {paymentError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-800 mb-1">Payment Error</p>
                        <p className="text-sm text-red-700">{paymentError}</p>
                      </div>
                      <button 
                        onClick={() => setPaymentError('')}
                        className="text-red-400 hover:text-red-600"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Coupon Code Section */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have a coupon code?
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        disabled={!!appliedCoupon}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none disabled:bg-gray-100"
                      />
                    </div>
                    {appliedCoupon ? (
                      <button
                        onClick={handleRemoveCoupon}
                        className="px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyCoupon}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {appliedCoupon && (
                    <p className="mt-2 text-sm text-emerald-600 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {appliedCoupon.description} applied!
                    </p>
                  )}
                </div>

                {/* User Information */}
                <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">{user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{user?.email}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </h3>
                  
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      Payment Instructions:
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1 ml-4">
                      <li>• Click the PayPal button below</li>
                      <li>• Complete payment in the PayPal window</li>
                      <li>• <strong>Do not close</strong> the window until payment is complete</li>
                      <li>• You'll be redirected back automatically</li>
                    </ul>
                  </div>
                  
                  <div className="border-2 border-gray-200 rounded-xl p-6">
                    {processing ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Processing your payment...</p>
                        <p className="text-sm text-gray-500 mt-2">Please wait, do not refresh the page</p>
                      </div>
                    ) : (
                      <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onCancel={onCancel}
                          onError={onError}
                          style={{
                            layout: "vertical",
                            color: "gold",
                            shape: "rect",
                            label: "paypal"
                          }}
                          disabled={processing}
                        />
                      </PayPalScriptProvider>
                    )}
                  </div>
                </div>

                {/* Security Features */}
                <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <ShieldCheck className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-500">256-bit SSL encryption</p>
                  </div>
                  <div className="text-center">
                    <Lock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Data Protection</p>
                    <p className="text-xs text-gray-500">PCI DSS compliant</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Money Back</p>
                    <p className="text-xs text-gray-500">30-day guarantee</p>
                  </div>
                </div>

                {/* Terms */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    By completing your purchase, you agree to our{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;