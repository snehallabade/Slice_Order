
import { Pizza, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Pizza className="h-8 w-8 text-red-500" />
              <h3 className="text-2xl font-bold">PizzaCraft</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Crafting the perfect pizza experience since 2020. 
              Fresh ingredients, fast delivery, unforgettable taste.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Build Pizza</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-PIZZA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>orders@pizzacraft.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Pizza Street, Food City</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <div>
                  <div>Mon-Thu: 11AM-10PM</div>
                  <div>Fri-Sat: 11AM-11PM</div>
                  <div>Sunday: 12PM-9PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="text-center text-gray-400">
          <p>&copy; 2024 PizzaCraft. All rights reserved. Made with ❤️ for pizza lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
