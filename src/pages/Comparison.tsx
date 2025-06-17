
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComparisonSearch from "../components/ComparisonSearch";
import ComparisonTable from "../components/ComparisonTable";
import { PropFirm } from "../types";

const Comparison = () => {
  const location = useLocation();
  const propFirms = location.state?.propFirms || [];
  
  const [selectedFirms, setSelectedFirms] = useState<PropFirm[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAddFirm = (firm: PropFirm) => {
    if (selectedFirms.length < 3 && !selectedFirms.find(f => f.id === firm.id)) {
      setSelectedFirms([...selectedFirms, firm]);
    }
  };

  const handleRemoveFirm = (firmId: number) => {
    setSelectedFirms(selectedFirms.filter(f => f.id !== firmId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Compare Prop Firms</h1>
          <p className="text-xl text-gray-300 mb-8">
            Select up to 3 firms to compare their features side by side
          </p>
        </div>

        <ComparisonSearch 
          propFirms={propFirms}
          selectedFirms={selectedFirms}
          onAddFirm={handleAddFirm}
        />

        {selectedFirms.length > 0 && (
          <ComparisonTable 
            selectedFirms={selectedFirms}
            onRemoveFirm={handleRemoveFirm}
          />
        )}

        {selectedFirms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Search and select prop firms above to start comparing
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Comparison;
