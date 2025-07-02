
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PropFirmSection from "../components/PropFirmSection";
import Footer from "../components/Footer";
import { usePropFirms } from "../hooks/useSupabaseData";
import { PropFirm } from "../types/supabase";

const Index = () => {
  const { propFirms, loading } = usePropFirms();
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('review');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState<PropFirm[] | undefined>(undefined);

  // Optionally, implement search/filter logic here

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <PropFirmSection
          propFirms={searchResults || propFirms}
          loading={loading}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
