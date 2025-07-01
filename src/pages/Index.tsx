
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PropFirmSection from "../components/PropFirmSection";
import { usePropFirms } from "../hooks/usePropFirms";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { propFirms: exploreFirms, loading: exploreLoading } = usePropFirms('explore');
  const { propFirms: cheapFirms, loading: cheapLoading } = usePropFirms('cheap');
  const { propFirms: topFirms, loading: topLoading } = usePropFirms('top');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      
      <main>
        <Hero />
        
        {/* Admin Access Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Link to="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Shield className="mr-2 h-4 w-4" />
                Admin Access
              </Button>
            </Link>
          </div>
        </section>
        
        <PropFirmSection 
          title="Top Rated Prop Firms" 
          propFirms={topFirms.slice(0, 3)}
          linkTo="/top-firms"
          loading={topLoading}
        />
        
        <PropFirmSection 
          title="Cheapest Prop Firms" 
          propFirms={cheapFirms.slice(0, 3)}
          linkTo="/cheap-firms"
          loading={cheapLoading}
        />
        
        <PropFirmSection 
          title="All Prop Firms" 
          propFirms={exploreFirms.slice(0, 3)}
          linkTo="/propfirms"
          loading={exploreLoading}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
