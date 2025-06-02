
const express = require('express');
const Pizza = require('../models/Pizza');

const router = express.Router();

// Get all pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    console.error('Get pizzas error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create pizza (admin only - simplified for now)
router.post('/', async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    await pizza.save();
    res.status(201).json(pizza);
  } catch (error) {
    console.error('Create pizza error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
