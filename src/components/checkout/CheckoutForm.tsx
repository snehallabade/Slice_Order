import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  promoCode?: string;
}

const CheckoutForm = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          items,
          total,
          customerDetails: data
        })
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        setOrderPlaced(true);
        toast({
          title: 'Order Placed Successfully!',
          description: `Order #${order.orderNumber} has been placed`,
        });
        setTimeout(() => {
          navigate(`/order-status/${order._id}`);
        }, 1500);
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      toast({
        title: 'Checkout Failed',
        description: 'Please try again',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">Done</h2>
        <p className="text-gray-600">Your order has been placed successfully!</p>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
                placeholder="1234567890"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                {...register('address', { required: 'Address is required' })}
                placeholder="123 Main St, City"
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                {...register('pincode', {
                  required: 'Pincode is required',
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'Please enter a valid 6-digit pincode'
                  }
                })}
                placeholder="123456"
              />
              {errors.pincode && (
                <p className="text-sm text-red-500">{errors.pincode.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="promoCode">Promo Code (Optional)</Label>
              <Input
                id="promoCode"
                {...register('promoCode')}
                placeholder="Enter promo code"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm; 