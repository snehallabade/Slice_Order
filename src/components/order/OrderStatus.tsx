import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Truck, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderStatusProps {
  orderId?: string;
}

interface OrderStatusData {
  _id: string;
  status: 'Received' | 'In Kitchen' | 'Sent to Delivery' | 'Delivered';
  items: Array<{
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
  }>;
  total: number;
  createdAt: string;
}

const OrderStatus = (props: OrderStatusProps) => {
  const params = useParams();
  const orderId = props.orderId || params.orderId;
  const [order, setOrder] = useState<OrderStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          throw new Error('Failed to fetch order');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full">
          <CardContent className="p-6">
            <p className="text-center text-gray-600">Order not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusSteps = [
    { id: 'Received', icon: Clock, label: 'Order Placed' },
    { id: 'In Kitchen', icon: Package, label: 'In Kitchen' },
    { id: 'Sent to Delivery', icon: Truck, label: 'Out for Delivery' },
    { id: 'Delivered', icon: CheckCircle2, label: 'Delivered' }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.id === order.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Status Progress */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`mt-2 text-sm ${
                          isCurrent ? 'text-red-500 font-semibold' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Order Details</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.customizations && (
                        <div className="text-sm text-gray-600">
                          <p>Base: {item.customizations.base}</p>
                          <p>Sauce: {item.customizations.sauce}</p>
                          <p>Cheese: {item.customizations.cheese}</p>
                          {item.customizations.veggies.length > 0 && (
                            <p>Veggies: {item.customizations.veggies.join(', ')}</p>
                          )}
                          {item.customizations.meat.length > 0 && (
                            <p>Meat: {item.customizations.meat.join(', ')}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="flex justify-center pt-6">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStatus; 