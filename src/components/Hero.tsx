
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const location = useLocation();
  const propFirms = location.state?.propFirms || [];

  const navigateToAllFirms = () => {
    window.location.href = '/propfirms';
  };

  const navigateToCompare = () => {
    window.location.href = '/compare';
  };

  return (
    <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find the
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Perfect Prop Trading Firm
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Compare top proprietary trading firms, read verified reviews, and discover the 
            best funding opportunities. Make informed decisions with our comprehensive 
            prop firm directory.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all hover:scale-105"
              onClick={navigateToAllFirms}
            >
              Explore All Firms
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-3 text-lg transition-all hover:scale-105"
              onClick={navigateToCompare}
            >
              Compare Firms
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
            <div className="text-gray-300">Active Traders</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl font-bold text-purple-400 mb-2">$2.5B+</div>
            <div className="text-gray-300">Funded Capital</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
            <div className="text-gray-300">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
