
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const PizzaMenu = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const pizzas = [
    {
      id: 1,
      name: "Margherita Classic",
      description: "Fresh tomato sauce, mozzarella cheese, fresh basil leaves",
      price: 14.99,
      rating: 4.8,
      image: "🍕",
      popular: true,
      vegetarian: true
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      description: "Pepperoni, mozzarella cheese, tomato sauce",
      price: 17.99,
      rating: 4.9,
      image: "🍕",
      popular: true
    },
    {
      id: 3,
      name: "BBQ Chicken Ranch",
      description: "BBQ sauce, grilled chicken, red onions, cilantro, ranch drizzle",
      price: 19.99,
      rating: 4.7,
      image: "🍕"
    },
    {
      id: 4,
      name: "Veggie Deluxe",
      description: "Bell peppers, mushrooms, onions, black olives, tomatoes",
      price: 16.99,
      rating: 4.6,
      image: "🍕",
      vegetarian: true
    },
    {
      id: 5,
      name: "Meat Lovers",
      description: "Pepperoni, sausage, bacon, ham, ground beef",
      price: 22.99,
      rating: 4.8,
      image: "🍕"
    },
    {
      id: 6,
      name: "Hawaiian Paradise",
      description: "Ham, pineapple, mozzarella cheese, tomato sauce",
      price: 18.99,
      rating: 4.4,
      image: "🍕"
    }
  ];

  const handleAddToCart = (pizza: typeof pizzas[0]) => {
    addItem({
      name: pizza.name,
      price: pizza.price,
      quantity: 1
    });

    toast({
      title: "Added to Cart!",
      description: `${pizza.name} has been added to your cart`,
    });
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Signature Pizzas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handcrafted with the finest ingredients and perfected through years of culinary expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((pizza) => (
            <Card key={pizza.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="relative">
                <div className="text-center">
                  <div className="text-6xl mb-4">{pizza.image}</div>
                  <CardTitle className="text-xl mb-2">{pizza.name}</CardTitle>
                </div>
                
                {pizza.popular && (
                  <Badge className="absolute top-4 right-4 bg-red-500">
                    Popular
                  </Badge>
                )}
                
                {pizza.vegetarian && (
                  <Badge variant="secondary" className="absolute top-4 left-4 bg-green-100 text-green-700">
                    Vegetarian
                  </Badge>
                )}
                
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{pizza.rating}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">{pizza.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-500">
                    ${pizza.price}
                  </span>
                  <Button 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleAddToCart(pizza)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Want something unique? Create your own masterpiece!
          </p>
          <Button size="lg" className="bg-red-500 hover:bg-red-600">
            Build Custom Pizza
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PizzaMenu;
