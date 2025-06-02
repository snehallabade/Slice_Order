import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items } = useCart();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if (items.length === 0) {
      navigate('/');
    }
  }, [user, items, navigate]);

  if (!user || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage; 