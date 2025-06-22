
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FilterSidebar from "../components/FilterSidebar";
import FilteredFirmsList from "../components/FilteredFirmsList";
import Footer from "../components/Footer";
import { usePropFirms } from "../hooks/useSupabaseData";

const AllPropFirms = () => {
  const { propFirms, loading } = usePropFirms();
  const [sortBy, setSortBy] = useState<'price' | 'review' | 'trust'>('review');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    minReviewScore: 0,
    maxReviewScore: 5,
    minTrustRating: 0,
    maxTrustRating: 5,
    searchTerm: '',
  });

  const filteredFirms = propFirms
    .filter(firm => {
      const matchesPrice = firm.price >= filters.minPrice && firm.price <= filters.maxPrice;
      const matchesReview = firm.review_score >= filters.minReviewScore && firm.review_score <= filters.maxReviewScore;
      const matchesTrust = firm.trust_rating >= filters.minTrustRating && firm.trust_rating <= filters.maxTrustRating;
      const matchesSearch = firm.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           firm.brand?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           firm.description?.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return matchesPrice && matchesReview && matchesTrust && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'review':
          return b.review_score - a.review_score;
        case 'trust':
          return b.trust_rating - a.trust_rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Navbar />
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">All Prop Firms</h1>
          <p className="text-gray-300 text-lg">
            Explore our complete database of prop trading firms
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters}
              propFirms={propFirms}
            />
          </div>
          
          <div className="lg:w-3/4">
            <FilteredFirmsList 
              firms={filteredFirms}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllPropFirms;
