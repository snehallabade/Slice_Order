import { useState } from "react";
import { ShoppingCart, User, Pizza, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import AuthModal from "./auth/AuthModal";
import CartSidebar from "./cart/CartSidebar";
import { Link } from "react-router-dom";

interface HeaderProps {
  currentView: "home" | "builder" | "menu";
  setCurrentView: (view: "home" | "builder" | "menu") => void;
}

const Header = ({ currentView, setCurrentView }: HeaderProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount, mergeLocalCartToServer, items } = useCart();

  const handleOrderNow = () => {
    if (user) {
      setIsCartOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b-4 border-red-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentView("home")}
            >
              <Pizza className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-800">PizzaCraft</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView("home")}
                className={`font-semibold transition-colors ${
                  currentView === "home" ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView("menu")}
                className={`font-semibold transition-colors ${
                  currentView === "menu" ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => setCurrentView("builder")}
                className={`font-semibold transition-colors ${
                  currentView === "builder" ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
              >
                Build Pizza
              </button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem disabled>
                      {user.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
              
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleOrderNow}
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />
    </>
  );
};

export default Header;
