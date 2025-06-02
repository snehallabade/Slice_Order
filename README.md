# 🍕 Slice Order

**Slice Order** is a modern full-stack pizza ordering application featuring a sleek React (Vite) frontend and a robust Node.js/Express/MongoDB backend.

## 🚀 Features

* 🍕 **Customize Your Pizza** – Choose ingredients and create your own pizza
* 🛒 **Cart Management** – Add, update, or remove items from your cart
* 💳 **Checkout** – Enter delivery information and apply promo codes
* 📦 **Live Order Tracking** – Follow your order through stages: Placed, In Kitchen, Out for Delivery, Delivered
* 📜 **Order History** – Access all your past orders anytime
* 🔐 **Authentication** – Secure login and registration
* 💾 **Cart Persistence** – Save cart in `localStorage` for guests and MongoDB for logged-in users
* 📱 **Responsive Design** – Seamless experience across desktop and mobile

## 🛠️ Tech Stack

* **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Router
* **Backend**: Node.js, Express, MongoDB, Mongoose, JWT Authentication

---

## ⚙️ Getting Started

### 📋 Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* MongoDB (local instance or MongoDB Atlas)

### 🔄 Clone the Repository

```bash
git clone https://github.com/snehallabade/Slice_Order.git
cd Slice_Order
```

### 📦 Install Dependencies

#### Frontend

```bash
npm install
# or
yarn
```

#### Backend

```bash
cd backend
npm install
# or
yarn
cd ..
```

### 🔑 Set Up Environment Variables

Create a `.env` file in the `backend` directory with the following:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### ▶️ Run the Backend

```bash
cd backend
npm run dev
# or
yarn dev
```

### ▶️ Run the Frontend

In a separate terminal window from the project root:

```bash
npm run dev
# or
yarn dev
```

* Frontend: [http://localhost:8080](http://localhost:8080)
* API requests will be proxied to the backend.

---

## 🧑‍🍳 How to Use

1. Register or log in to start your pizza journey.
2. Add pizzas to your cart, then proceed to checkout.
3. Monitor your order’s live status.
4. View order history from your user menu.

---

## 🛠️ Customization Guide

* **UI Components**: Modify files in `src/components/`
* **API & Models**: Update logic in the `backend/` directory
* **Proxy Settings**: Change the API proxy in `vite.config.ts` if needed

---

## 🧩 Troubleshooting

* **MongoDB Connection Issues**: Double-check your `MONGODB_URI` and ensure MongoDB is running.
* **Port Conflicts**: Adjust ports in `.env` or `vite.config.ts`.
* **Favicon Not Updating**: Clear your browser cache.
