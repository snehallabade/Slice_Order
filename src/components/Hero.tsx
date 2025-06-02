
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Truck } from "lucide-react";

interface HeroProps {
  setCurrentView: (view: "builder" | "menu") => void;
}

const Hero = ({ setCurrentView }: HeroProps) => {
  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Craft Your Perfect
            <span className="text-red-500 block">Pizza Experience</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build custom pizzas with fresh ingredients, track your order in real-time, 
            and enjoy the best pizza delivery experience in town.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg"
              onClick={() => setCurrentView("builder")}
            >
              Build Your Pizza
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50 px-8 py-4 text-lg"
              onClick={() => setCurrentView("menu")}
            >
              View Menu
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <Clock className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">30 minutes or less guaranteed</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Track your order every step</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  ★
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-gray-600">Fresh ingredients every time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
