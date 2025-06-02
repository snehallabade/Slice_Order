import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import OrderStatus from '@/components/order/OrderStatus';

const OrderStatusPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <OrderStatus orderId={orderId} />;
};

export default OrderStatusPage; 