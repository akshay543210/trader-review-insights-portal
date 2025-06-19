
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PropFirmSection from "../components/PropFirmSection";
import FilteredFirmsList from "../components/FilteredFirmsList";
import Footer from "../components/Footer";
import AdminPanel from "../components/AdminPanel";
import { usePropFirms } from "../hooks/useSupabaseData";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { propFirms, loading } = usePropFirms();
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('review');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [filterType, setFilterType] = useState<'cheapest' | 'top-rated' | null>(null);

  const handleAddFirm = async (firmData: any) => {
    // This will be handled by admin panel with Supabase
    console.log('Add firm:', firmData);
  };

  const handleUpdateFirm = async (id: string, updates: any) => {
    // This will be handled by admin panel with Supabase
    console.log('Update firm:', id, updates);
  };

  const handleDeleteFirm = async (id: string) => {
    // This will be handled by admin panel with Supabase
    console.log('Delete firm:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      <Hero />
      
      {/* New Filter Buttons */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => window.location.href = '/propfirms'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              Explore All Firms
            </Button>
            <Button
              onClick={() => window.location.href = '/compare'}
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-6 py-3"
            >
              Compare Firms
            </Button>
            <Button
              onClick={() => setFilterType('cheapest')}
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 px-6 py-3"
            >
              📉 Cheapest Cost
            </Button>
            <Button
              onClick={() => setFilterType('top-rated')}
              variant="outline"
              className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-slate-900 px-6 py-3"
            >
              🔥 Top 5 PropFirms
            </Button>
          </div>
        </div>
      </section>

      {/* Filtered Firms Display */}
      <FilteredFirmsList 
        type={filterType} 
        onClose={() => setFilterType(null)} 
      />
      
      {isAdminMode && (
        <AdminPanel 
          propFirms={propFirms}
          onAdd={handleAddFirm}
          onUpdate={handleUpdateFirm}
          onDelete={handleDeleteFirm}
        />
      )}
      
      {!filterType && (
        <PropFirmSection 
          propFirms={propFirms}
          sortBy={sortBy}
          setSortBy={setSortBy}
          loading={loading}
        />
      )}
      <Footer />
    </div>
  );
};

export default Index;
