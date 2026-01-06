const express = require('express');
const router = express.Router();
const {
  createSubscription,
  getSubscription,
  cancelSubscription,
  updateSubscription,
  getPaymentHistory,
  handlePayPalWebhook
} = require('../controllers/subscriptionController');
const { auth } = require('../middlewares/auth');

// Protected routes (require authentication)
router.post('/create', auth, createSubscription);
router.get('/current', auth, getSubscription);
router.post('/cancel', auth, cancelSubscription);
router.put('/update', auth, updateSubscription);
router.get('/payment-history', auth, getPaymentHistory);
// Add this route
router.get('/check-status', auth, async (req, res) => {
  try {
    const Subscription = require('../models/Subscription');
    const subscription = await Subscription.findOne({
      userId: req.user.userId,
      status: { $in: ['trial', 'active'] }
    });

    res.json({
      hasActiveSubscription: !!subscription,
      subscription: subscription ? {
        planName: subscription.planName,
        status: subscription.status,
        planId: subscription.planId
      } : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking subscription status' });
  }
});
// Webhook route (no auth, verified by PayPal signature)
router.post('/webhook/paypal', handlePayPalWebhook);

module.exports = router;