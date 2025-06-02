import { useEffect, useState } from 'react';

interface Order {
  _id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-gray-600">No orders found.</div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold">Order #{order.orderNumber}</div>
                <div className="text-gray-500 text-sm">Placed: {new Date(order.createdAt).toLocaleString()}</div>
                <div className="text-gray-500 text-sm">Status: <span className="font-medium text-red-500">{order.status}</span></div>
              </div>
              <div className="mt-2 md:mt-0 text-lg font-bold">${order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders; 