
const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
      await cart.save();
    }

    res.json({ items: cart.items });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user's cart
router.put('/', auth, async (req, res) => {
  try {
    const { items } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items });
    } else {
      cart.items = items;
    }

    await cart.save();
    res.json({ message: 'Cart updated successfully', items: cart.items });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
