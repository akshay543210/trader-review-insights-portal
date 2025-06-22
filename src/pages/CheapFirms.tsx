
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FilterSidebar from "../components/FilterSidebar";
import FilteredFirmsList from "../components/FilteredFirmsList";
import Footer from "../components/Footer";
import { usePropFirms } from "../hooks/useSupabaseData";

const CheapFirms = () => {
  const { propFirms, loading } = usePropFirms();
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('price');

  // Filter for cheap firms (price <= $100)
  const cheapFirms = propFirms.filter(firm => firm.price <= 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Cheap Cost Prop Firms</h1>
          <p className="text-gray-300 text-lg">
            Affordable prop trading firms under $100
          </p>
        </div>

        <FilteredFirmsList 
          firms={cheapFirms}
          sortBy={sortBy}
          setSortBy={setSortBy}
          loading={loading}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CheapFirms;
