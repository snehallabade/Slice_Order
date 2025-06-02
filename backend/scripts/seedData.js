
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pizza = require('../models/Pizza');

dotenv.config();

const pizzas = [
  {
    name: "Margherita Classic",
    description: "Fresh tomato sauce, mozzarella cheese, fresh basil leaves",
    price: 14.99,
    rating: 4.8,
    image: "🍕",
    popular: true,
    vegetarian: true
  },
  {
    name: "Pepperoni Supreme",
    description: "Pepperoni, mozzarella cheese, tomato sauce",
    price: 17.99,
    rating: 4.9,
    image: "🍕",
    popular: true
  },
  {
    name: "BBQ Chicken Ranch",
    description: "BBQ sauce, grilled chicken, red onions, cilantro, ranch drizzle",
    price: 19.99,
    rating: 4.7,
    image: "🍕"
  },
  {
    name: "Veggie Deluxe",
    description: "Bell peppers, mushrooms, onions, black olives, tomatoes",
    price: 16.99,
    rating: 4.6,
    image: "🍕",
    vegetarian: true
  },
  {
    name: "Meat Lovers",
    description: "Pepperoni, sausage, bacon, ham, ground beef",
    price: 22.99,
    rating: 4.8,
    image: "🍕"
  },
  {
    name: "Hawaiian Paradise",
    description: "Ham, pineapple, mozzarella cheese, tomato sauce",
    price: 18.99,
    rating: 4.4,
    image: "🍕"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizzaApp');
    
    await Pizza.deleteMany({});
    await Pizza.insertMany(pizzas);
    
    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
