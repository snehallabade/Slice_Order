
const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: '🍕'
  },
  popular: {
    type: Boolean,
    default: false
  },
  vegetarian: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pizza', pizzaSchema);
