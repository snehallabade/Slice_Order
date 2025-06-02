
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    customizations: {
      base: String,
      sauce: String,
      cheese: String,
      veggies: [String],
      meat: [String]
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
