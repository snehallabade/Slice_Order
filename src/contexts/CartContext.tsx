import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { apiRequest } from '@/config/api';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: {
    base: string;
    sauce: string;
    cheese: string;
    veggies: string[];
    meat: string[];
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  syncCart: () => Promise<void>;
  mergeLocalCartToServer: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user, token } = useAuth();

  useEffect(() => {
    loadCart();
  }, [user]);

  const loadCart = async () => {
    if (user && token) {
      try {
        const response = await apiRequest('/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const cartData = await response.json();
          setItems(cartData.items || []);
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
        // Fallback to localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      }
    } else {
      // Load from localStorage for guests
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    }
  };

  const saveCart = async (newItems: CartItem[]) => {
    if (user && token) {
      try {
        // Remove 'id' field before sending to backend
        const itemsForBackend = newItems.map(({ id, ...rest }) => rest);
        await apiRequest('/api/cart', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ items: itemsForBackend })
        });
      } catch (error) {
        console.error('Failed to save cart to server:', error);
      }
    }
    // Always save to localStorage as backup
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const addItem = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    const newItems = [...items, newItem];
    setItems(newItems);
    saveCart(newItems);
  };

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    saveCart(newItems);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setItems(newItems);
    saveCart(newItems);
  };

  const clearCart = () => {
    setItems([]);
    saveCart([]);
  };

  const syncCart = async () => {
    if (user && token) {
      await loadCart();
    }
  };

  const mergeLocalCartToServer = async () => {
    if (user && token) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const localItems: CartItem[] = JSON.parse(savedCart);
        // Merge local items with server items (avoid duplicates by name/customizations)
        const mergedItems = [...items];
        localItems.forEach(localItem => {
          if (!mergedItems.some(item =>
            item.name === localItem.name &&
            JSON.stringify(item.customizations) === JSON.stringify(localItem.customizations)
          )) {
            mergedItems.push(localItem);
          }
        });
        setItems(mergedItems);
        await saveCart(mergedItems);
        localStorage.removeItem('cart');
      }
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount,
      syncCart,
      mergeLocalCartToServer
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartSyncer = () => {
  const { user } = useAuth();
  const { mergeLocalCartToServer, items } = useCart();

  React.useEffect(() => {
    if (user) {
      mergeLocalCartToServer();
    } else {
      // Save cart to localStorage on logout
      localStorage.setItem('cart', JSON.stringify(items));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return null;
};
