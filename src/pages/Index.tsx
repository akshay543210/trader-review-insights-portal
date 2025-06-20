
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PropFirmSection from "../components/PropFirmSection";
import Footer from "../components/Footer";
import AdminPanel from "../components/AdminPanel";
import { usePropFirms } from "../hooks/useSupabaseData";
import { PropFirm } from "../types/supabase";

const Index = () => {
  const { propFirms, loading } = usePropFirms();
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('review');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleAddFirm = async (firmData: Partial<PropFirm>) => {
    // This will be handled by admin panel with Supabase
    console.log('Add firm:', firmData);
  };

  const handleUpdateFirm = async (id: string, updates: Partial<PropFirm>) => {
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
        loading={loading}
      />
      <Footer />
    </div>
  );
};

export default Index;
