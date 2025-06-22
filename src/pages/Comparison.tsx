
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ComparisonSearch from "../components/ComparisonSearch";
import ComparisonTable from "../components/ComparisonTable";
import Footer from "../components/Footer";
import { PropFirm } from "../types/supabase";
import { usePropFirms } from "../hooks/useSupabaseData";

const Comparison = () => {
  const { propFirms } = usePropFirms();
  const [selectedFirms, setSelectedFirms] = useState<PropFirm[]>([]);

  const addFirm = (firm: PropFirm) => {
    if (selectedFirms.length < 3 && !selectedFirms.find(f => f.id === firm.id)) {
      setSelectedFirms([...selectedFirms, firm]);
    }
  };

  const removeFirm = (firmId: string) => {
    setSelectedFirms(selectedFirms.filter(firm => firm.id !== firmId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Compare Prop Firms</h1>
          <p className="text-gray-300 text-lg">
            Select up to 3 firms to compare their features side by side
          </p>
        </div>

        <div className="mb-8">
          <ComparisonSearch
            propFirms={propFirms}
            selectedFirms={selectedFirms}
            onAddFirm={addFirm}
          />
        </div>

        {selectedFirms.length > 0 && (
          <ComparisonTable
            firms={selectedFirms}
            onRemoveFirm={removeFirm}
          />
        )}

        {selectedFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Search and select firms above to start comparing
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Comparison;
