
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropFirmCard from "../components/PropFirmCard";
import FilterSidebar from "../components/FilterSidebar";
import { usePropFirms } from "../hooks/useSupabaseData";
import { PropFirm } from "../types/supabase";

const AllPropFirms = () => {
  const { propFirms, loading, error } = usePropFirms();
  const [filteredFirms, setFilteredFirms] = useState<PropFirm[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust' | 'payout'>('review');
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Update filtered firms when propFirms changes
  useState(() => {
    setFilteredFirms(propFirms);
  });

  const handleFilterChange = (filters: any) => {
    let filtered = [...propFirms];

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(firm => firm.category_id === filters.category);
    }

    // Apply price range filter
    filtered = filtered.filter(firm => 
      firm.price >= filters.priceRange[0] && firm.price <= filters.priceRange[1]
    );

    // Apply rating filter
    filtered = filtered.filter(firm => firm.review_score >= filters.minRating);

    // Apply trust filter
    filtered = filtered.filter(firm => firm.trust_rating >= filters.minTrust);

    // Apply search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(firm => 
        firm.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (firm.brand && firm.brand.toLowerCase().includes(filters.searchTerm.toLowerCase()))
      );
    }

    setFilteredFirms(filtered);
  };

  const sortedFirms = [...filteredFirms].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'review':
        return b.review_score - a.review_score;
      case 'trust':
        return b.trust_rating - a.trust_rating;
      case 'payout':
        return b.payout_rate - a.payout_rate;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-white text-lg">Loading prop firms...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-400 text-lg">Error: {error}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar isAdminMode={isAdminMode} setIsAdminMode={setIsAdminMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">All Prop Trading Firms</h1>
          <p className="text-xl text-gray-300">Compare and find the perfect prop firm for your trading needs</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar 
              onFilterChange={handleFilterChange}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
          
          <div className="lg:w-3/4">
            <div className="mb-6">
              <p className="text-gray-300">
                Showing {sortedFirms.length} of {propFirms.length} prop firms
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedFirms.map((firm, index) => (
                <PropFirmCard key={firm.id} firm={firm} index={index} />
              ))}
            </div>

            {sortedFirms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No prop firms found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AllPropFirms;
