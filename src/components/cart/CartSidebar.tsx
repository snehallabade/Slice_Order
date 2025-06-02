import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

const CartSidebar = ({ isOpen, onClose, onOpenAuth }: CartSidebarProps) => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      onOpenAuth();
      return;
    }

    if (items.length === 0) {
      toast({
        title: 'Cart is Empty',
        description: 'Add some items to your cart before checkout',
        variant: 'destructive',
      });
      return;
    }

    onClose();
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Your Cart ({items.length})</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <Card key={(item.name || '') + JSON.stringify(item.customizations) + idx}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {item.customizations && (
                        <div className="text-sm text-gray-600 mb-2">
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
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Button
                onClick={handleCheckout}
                className="w-full bg-red-500 hover:bg-red-600"
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Processing...' : user ? 'Checkout' : 'Login to Checkout'}
              </Button>
              
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full"
                >
                  Clear Cart
                </Button>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
