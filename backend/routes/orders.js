const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

// Create order from cart
router.post('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const { customerDetails } = req.body;

    if (!customerDetails) {
      return res.status(400).json({ message: 'Customer details are required' });
    }

    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      total: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      customerDetails
    });

    await order.save();

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user._id
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
