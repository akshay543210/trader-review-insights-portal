
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PropFirmSection from "../components/PropFirmSection";
import Footer from "../components/Footer";
import AdminPanel from "../components/AdminPanel";
import { propFirmsData } from "../data/propFirms";
import { PropFirm } from "../types";

const Index = () => {
  const [propFirms, setPropFirms] = useState(propFirmsData);
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('review');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAddFirm = (firmData: Omit<PropFirm, 'id'>) => {
    const newId = Math.max(...propFirms.map(f => f.id)) + 1;
    const newFirm = { ...firmData, id: newId };
    setPropFirms([...propFirms, newFirm]);
  };

  const handleUpdateFirm = (id: number, updates: Partial<PropFirm>) => {
    setPropFirms(propFirms.map(firm => 
      firm.id === id ? { ...firm, ...updates } : firm
    ));
  };

  const handleDeleteFirm = (id: number) => {
    setPropFirms(propFirms.filter(firm => firm.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      <Hero />
      
      {isAdminMode && (
        <AdminPanel 
          propFirms={propFirms}
          onAdd={handleAddFirm}
          onUpdate={handleUpdateFirm}
          onDelete={handleDeleteFirm}
        />
      )}
      
      <PropFirmSection 
        propFirms={propFirms}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Footer />
    </div>
  );
};

export default Index;
