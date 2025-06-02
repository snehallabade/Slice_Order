import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const PizzaBuilder = () => {
  const [selectedBase, setSelectedBase] = useState("thin");
  const [selectedSauce, setSelectedSauce] = useState("tomato");
  const [selectedCheese, setSelectedCheese] = useState("mozzarella");
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);
  const [selectedMeat, setSelectedMeat] = useState<string[]>([]);

  const { addItem } = useCart();
  const { toast } = useToast();

  const bases = [
    { id: "thin", name: "Thin Crust", price: 0 },
    { id: "thick", name: "Thick Crust", price: 2 },
    { id: "stuffed", name: "Stuffed Crust", price: 4 },
    { id: "gluten-free", name: "Gluten Free", price: 3 },
    { id: "whole-wheat", name: "Whole Wheat", price: 2 }
  ];

  const sauces = [
    { id: "tomato", name: "Classic Tomato", price: 0 },
    { id: "white", name: "White Sauce", price: 1 },
    { id: "bbq", name: "BBQ Sauce", price: 1 },
    { id: "pesto", name: "Pesto", price: 2 },
    { id: "buffalo", name: "Buffalo", price: 1 }
  ];

  const cheeses = [
    { id: "mozzarella", name: "Mozzarella", price: 0 },
    { id: "cheddar", name: "Cheddar", price: 1 },
    { id: "parmesan", name: "Parmesan", price: 2 },
    { id: "vegan", name: "Vegan Cheese", price: 2 }
  ];

  const veggies = [
    { id: "mushrooms", name: "Mushrooms", price: 1 },
    { id: "peppers", name: "Bell Peppers", price: 1 },
    { id: "onions", name: "Red Onions", price: 1 },
    { id: "tomatoes", name: "Cherry Tomatoes", price: 1 },
    { id: "olives", name: "Black Olives", price: 1 },
    { id: "spinach", name: "Fresh Spinach", price: 1 }
  ];

  const meats = [
    { id: "pepperoni", name: "Pepperoni", price: 3 },
    { id: "sausage", name: "Italian Sausage", price: 3 },
    { id: "chicken", name: "Grilled Chicken", price: 4 },
    { id: "bacon", name: "Crispy Bacon", price: 3 },
    { id: "ham", name: "Ham", price: 3 }
  ];

  const calculateTotal = () => {
    const basePrice = 12;
    const baseExtra = bases.find(b => b.id === selectedBase)?.price || 0;
    const sauceExtra = sauces.find(s => s.id === selectedSauce)?.price || 0;
    const cheeseExtra = cheeses.find(c => c.id === selectedCheese)?.price || 0;
    const veggieExtra = selectedVeggies.reduce((sum, veggie) => {
      return sum + (veggies.find(v => v.id === veggie)?.price || 0);
    }, 0);
    const meatExtra = selectedMeat.reduce((sum, meat) => {
      return sum + (meats.find(m => m.id === meat)?.price || 0);
    }, 0);
    
    return basePrice + baseExtra + sauceExtra + cheeseExtra + veggieExtra + meatExtra;
  };

  const toggleVeggie = (veggieId: string) => {
    setSelectedVeggies(prev => 
      prev.includes(veggieId) 
        ? prev.filter(v => v !== veggieId)
        : [...prev, veggieId]
    );
  };

  const toggleMeat = (meatId: string) => {
    setSelectedMeat(prev => 
      prev.includes(meatId) 
        ? prev.filter(m => m !== meatId)
        : [...prev, meatId]
    );
  };

  const handleAddToCart = () => {
    const customizations = {
      base: bases.find(b => b.id === selectedBase)?.name || selectedBase,
      sauce: sauces.find(s => s.id === selectedSauce)?.name || selectedSauce,
      cheese: cheeses.find(c => c.id === selectedCheese)?.name || selectedCheese,
      veggies: selectedVeggies.map(v => veggies.find(veggie => veggie.id === v)?.name || v),
      meat: selectedMeat.map(m => meats.find(meat => meat.id === m)?.name || m)
    };

    addItem({
      name: "Custom Pizza",
      price: calculateTotal(),
      quantity: 1,
      customizations
    });

    toast({
      title: "Added to Cart!",
      description: "Your custom pizza has been added to the cart",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Build Your Perfect Pizza</h2>
        <p className="text-gray-600">Customize every ingredient to create your ideal pizza</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Pizza Base */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">1. Choose Your Base</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {bases.map((base) => (
                  <button
                    key={base.id}
                    onClick={() => setSelectedBase(base.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedBase === base.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <div className="font-semibold">{base.name}</div>
                    <div className="text-sm text-gray-600">
                      {base.price === 0 ? "Included" : `+$${base.price}`}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sauce */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">2. Select Your Sauce</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {sauces.map((sauce) => (
                  <button
                    key={sauce.id}
                    onClick={() => setSelectedSauce(sauce.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedSauce === sauce.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <div className="font-semibold">{sauce.name}</div>
                    <div className="text-sm text-gray-600">
                      {sauce.price === 0 ? "Included" : `+$${sauce.price}`}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cheese */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">3. Choose Your Cheese</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {cheeses.map((cheese) => (
                  <button
                    key={cheese.id}
                    onClick={() => setSelectedCheese(cheese.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedCheese === cheese.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <div className="font-semibold">{cheese.name}</div>
                    <div className="text-sm text-gray-600">
                      {cheese.price === 0 ? "Included" : `+$${cheese.price}`}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vegetables */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">4. Add Vegetables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-3">
                {veggies.map((veggie) => (
                  <button
                    key={veggie.id}
                    onClick={() => toggleVeggie(veggie.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedVeggies.includes(veggie.id)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <div className="font-semibold">{veggie.name}</div>
                    <div className="text-sm text-gray-600">+${veggie.price}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meat */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-500">5. Add Meat (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {meats.map((meat) => (
                  <button
                    key={meat.id}
                    onClick={() => toggleMeat(meat.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMeat.includes(meat.id)
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="font-semibold">{meat.name}</div>
                    <div className="text-sm text-gray-600">+${meat.price}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-center">Your Pizza</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-6xl mb-2">🍕</div>
                <p className="text-sm text-gray-600">Pizza Preview</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base:</span>
                  <span className="font-semibold">
                    {bases.find(b => b.id === selectedBase)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sauce:</span>
                  <span className="font-semibold">
                    {sauces.find(s => s.id === selectedSauce)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cheese:</span>
                  <span className="font-semibold">
                    {cheeses.find(c => c.id === selectedCheese)?.name}
                  </span>
                </div>
                
                {selectedVeggies.length > 0 && (
                  <div>
                    <div className="font-semibold mb-1">Vegetables:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedVeggies.map(veggie => (
                        <Badge key={veggie} variant="secondary" className="text-xs">
                          {veggies.find(v => v.id === veggie)?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedMeat.length > 0 && (
                  <div>
                    <div className="font-semibold mb-1">Meat:</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedMeat.map(meat => (
                        <Badge key={meat} variant="secondary" className="text-xs">
                          {meats.find(m => m.id === meat)?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <hr />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-red-500">${calculateTotal()}</span>
              </div>
              
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white" 
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PizzaBuilder;
