
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PizzaBuilder from "../components/PizzaBuilder";
import PizzaMenu from "../components/PizzaMenu";
import Footer from "../components/Footer";

const Index = () => {
  const [currentView, setCurrentView] = useState<"home" | "builder" | "menu">("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      {currentView === "home" && (
        <>
          <Hero setCurrentView={setCurrentView} />
          <PizzaMenu />
        </>
      )}
      
      {currentView === "builder" && <PizzaBuilder />}
      {currentView === "menu" && <PizzaMenu />}
      
      <Footer />
    </div>
  );
};

export default Index;
