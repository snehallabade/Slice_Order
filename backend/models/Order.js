const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
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
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'],
    default: 'Received'
  },
  customerDetails: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    promoCode: String
  }
}, {
  timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD${(count + 1).toString().padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
